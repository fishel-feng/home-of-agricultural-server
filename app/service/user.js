'use strict';

module.exports = app => {
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

    async signup(tel, password, code) {
      if (code !== '2222') {
        throw new Error('验证码错误');
      }
      await new User({
        tel,
        password,
      }).save();
      return await User.find({
        tel,
      });
    }

    async signin(tel, password) {
      const user = await User.find({
        tel,
      });
      if (user.length === 0) {
        return 'no user';
      }
      if (user[0].password === password) {
        return 'success';
      }
      return 'fail';
    }
  }
  return UserService;
};
