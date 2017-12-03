'use strict';

module.exports = app => {

  const jwt = require('jsonwebtoken');
  const fs = require('fs');
  const path = require('path');
  const cryptos = require('cryptos');
  const crypto = require('crypto');

  const {
    User,
  } = app.model;

  const VERIFY_CODE_PREFIX = 'CODE';
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
      const realCode = await app.redis.get(VERIFY_CODE_PREFIX + tel);
      if (code !== realCode) {
        throw new Error('VERIFY_CODE_ERROR');
      }
      const user = await User.find({
        tel,
      });
      if (user.length) {
        throw new Error('USER_EXIST');
      }
      const keyPath = path.join(__dirname, './rsa_private_key.pem');
      const privatePem = fs.readFileSync(keyPath);
      const realPassword = cryptos.RSADecrypt(password, privatePem);
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
      // 登录逻辑
      // 1.解密
      // 2.生成token返回，登陆成功
      // todo
      const user = await User.findOne({
        tel,
        password,
      });
      if (!user) {
        throw new Error('NO_USER');
      }
      const token = jwt.sign({
        userId: user._id,
        iat: Math.floor(Date.now() / 1000) - 30,
      }, 'shhhhh');
      // todo
      console.log(jwt.verify(token, 'shhhhh'));
      return token;
    }

    /**
     * 发送验证码
     * @param {String} tel 用户信息
     * @return {String} 验证码
     */
    async sendVerifyCode(tel) {
      try {
        const verifyCode = this.generateVerifyCode();
        await app.redis.set(VERIFY_CODE_PREFIX + tel, verifyCode);
        // todo 发短信
      } catch (e) {
        throw new Error('SEND_CODE_ERROR');
      }
      return 'success';
    }

    /**
     * 生成随机验证码
     * @return {string} 验证码
     */
    generateVerifyCode() {
      return Math.random().toString().slice(2, 8);
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
     * 根据用户id生成token
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
