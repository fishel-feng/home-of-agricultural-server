'use strict';

module.exports = app => {
  const jwt = require('jsonwebtoken');
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
     * @param {String} password 密码
     * @param {String} code 验证码
     * @return {String} 本次token信息
     */
    async signUp(tel, password, code) {
      // 注册逻辑
      // 1.取验证码，验证是否正确，不正确直接返回错误信息
      // 2.验证码正确，检索数据库，查看手机号手否存在，存在则返回错误
      // 3.存储用户tel+密码，生成token返回，注册成功
      if (code !== '2222') {
        throw new Error('NOT_FOUND');
      }
      const user = await User.find({
        tel,
      });
      if (user.length) {
        throw new Error('NOT_FOUND');
      }
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
     * @param {String} password 密码
     * @return {String} 本次token信息
     */
    async signIn(tel, password) {
      // 登录逻辑
      // 2.生成token返回，登陆成功
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
  }
  return UserService;
};