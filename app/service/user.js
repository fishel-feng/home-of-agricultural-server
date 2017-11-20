'use strict';

module.exports = app => {
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
      await new this.ctx.model.User({
        tel,
        password,
      }).save();
      return await this.ctx.model.User.find({
        tel,
      });
    }
  }
  return UserService;
};