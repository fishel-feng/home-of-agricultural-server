'use strict';

module.exports = app => {
  const fs = require('fs');
  const path = require('path');
  const cryptos = require('cryptos');
  const crypto = require('crypto');

  const {
    User,
  } = app.model;

  const NEW_VERIFY_CODE_PREFIX = 'NEW';
  const RESET_VERIFY_CODE_PREFIX = 'RESET';
  const SALT = 'dcv9u89h93ggf78rth3cng02n';

  class UserService extends app.Service {

    /**
     * 用户注册
     * @param {String} tel 手机号
     * @param {String} password 加密的密码
     * @param {String} code 验证码
     * @return {String} 本次token信息
     */
    async signUp(tel, password, code) {
      const realCode = await app.redis.get(NEW_VERIFY_CODE_PREFIX + tel);
      if (code !== realCode) {
        throw new Error('VERIFY_CODE_ERROR');
      }
      const user = await User.find({
        tel,
      });
      if (user.length) {
        throw new Error('USER_EXIST');
      }
      const realPassword = this.getRealPassword(password);
      const encryptedPassword = this.generateEncryptedPassword(realPassword);
      const newUser = await new User({
        tel,
        password: encryptedPassword,
      }).save();
      const token = this.generateToken(newUser._id);
      return token;
    }

    /**
     * 用户登录
     * @param {String} tel 手机号
     * @param {String} password 加密的密码
     * @return {String} 本次token信息
     */
    async signIn(tel, password) {
      const realPassword = this.getRealPassword(password);
      const encryptedPassword = this.generateEncryptedPassword(realPassword);
      const user = await User.findOne({
        tel,
        password: encryptedPassword,
      });
      if (!user) {
        throw new Error('ERROR_USER');
      }
      const token = this.generateToken(user._id);
      return token;
    }

    /**
     * 重置密码
     * @param {String} tel 手机号
     * @param {String} code 验证码
     * @param {String} password 加密的密码
     * @return {String} 成功状态
     */
    async resetPassword(tel, code, password) {
      const realCode = await app.redis.get(RESET_VERIFY_CODE_PREFIX + tel);
      if (code !== realCode) {
        throw new Error('VERIFY_CODE_ERROR');
      }
      const realPassword = this.getRealPassword(password);
      const encryptedPassword = this.generateEncryptedPassword(realPassword);
      try {
        await User.update({
          tel,
        }, {
          password: encryptedPassword,
        });
        return 'success';
      } catch (e) {
        throw new Error('RESET_PASSWORD_ERROR');
      }
    }

    /**
     * 发送验证码
     * @param {String} tel 用户信息
     * @param {String} reset 是否为重置密码
     * @return {String} 成功状态
     */
    async sendVerifyCode(tel, reset = false) {
      if (reset) {
        const user = await User.findOne({
          tel,
        });
        if (!user) {
          throw new Error('NO_USER');
        }
      }
      try {
        const verifyCode = this.generateVerifyCode();
        if (reset) {
          await app.redis.set(RESET_VERIFY_CODE_PREFIX + tel, verifyCode);
        } else {
          await app.redis.set(NEW_VERIFY_CODE_PREFIX + tel, verifyCode);
        }
        // todo 发短信
        return 'success';
      } catch (e) {
        throw new Error('SEND_CODE_ERROR');
      }
    }

    /**
     * 修改用户资料
     * @param {String} nickName 昵称
     * @param {String} gender 性别
     * @param {Number} age 年龄
     * @param {String} job 职业
     * @param {String} location 地区
     * @param {String} description 个人简介
     * @return {String} 成功状态
     */
    async modifyUserInfo(nickName, gender, age, job, location, description) {
      try {
        await User.update({
          _id: this.ctx.user._id,
        }, {
          nickName,
          gender,
          age,
          job,
          location,
          description,
        });
        return 'success';
      } catch (e) {
        throw new Error('MODIFY_FAIL');
      }
    }

    /**
     * 修改用户头像
     * @param {String} headImage 头像
     * @return {String} 成功状态
     */
    async modifyHeadImage(headImage) {
      try {
        await User.update({
          _id: this.ctx.user._id,
        }, {
          headImage,
        });
        return 'success';
      } catch (e) {
        throw new Error('MODIFY_FAIL');
      }
    }

    /**
     * 获取用户信息
     * @param {String} userId 用户id
     * @return {String} 用户信息
     */
    async getUserInfo(userId) {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('NOT_FOUND');
        }
        return user;
      } catch (e) {
        throw new Error('NOT_FOUND');
      }
    }

    /**
     * 查看我的信息
     * @return {String} 我的信息
     */
    async getUserIndex() {
      try {
        const user = await User.findById(this.ctx.user._id, 'nickName headImage description collectionCount attentionCount');
        if (!user) {
          throw new Error('SOMETHING_ERROR');
        }
        return user;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 生成随机验证码
     * @return {string} 验证码
     */
    generateVerifyCode() {
      return (Math.random() + '').slice(2, 8);
    }

    /**
     * 获取真实密码
     * @param {string} password rsa加密的密码
     * @return {string} 真实密码
     */
    getRealPassword(password) {
      const keyPath = path.join(__dirname, './rsa_private_key.pem');
      const privatePem = fs.readFileSync(keyPath);
      return cryptos.RSADecrypt(password, privatePem);
    }

    /**
     * 生成加密的密码
     * @param {string} password 原密码
     * @return {string} 加密的密码
     */
    generateEncryptedPassword(password) {
      return crypto.createHash('md5').update(password + SALT).digest('hex');
    }

    /**
     * 根据用户 id 生成 token
     * @param {string} userId 用户id
     * @return {string} token
     */
    generateToken(userId) {
      return app.jwt.sign({
        userId,
      }, app.config.jwt.secret);
    }
  }
  return UserService;
};