'use strict';

module.exports = app => {
  const jwt = require('jsonwebtoken');
  const VERIFY_CODE_PREFIX = 'CODE';
  const {
    User,
  } = app.model;
  class UserService extends app.Service {
    async sendCode() {
      return 2;
    }

    async checkCode() {
      return 2;
    }

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
      // 3.存储用户tel+密码，生成token返回，注册成功
      // todo
      await new User({
        tel,
        password,
      }).save();
      const token = await this.signIn(tel, password);
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
     * 用户登录
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
  }
  return UserService;
};