'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // todo 发送验证码
  async sendCode() {
    const code = await this.service.user.sendCode();
    console.log(code);
  }

  async signup() {
    const {
      tel,
      password,
      code,
    } = this.ctx.request.body;
    if (!tel || !password || !code) {
      throw new Error('参数错误');
    }
    const user = await this.service.user.signup(tel, password, code);
    this.ctx.body = user;
  }
}

module.exports = UserController;
