'use strict';
const Err = require('err1st');
const Controller = require('egg').Controller;

class UserController extends Controller {
  // todo 发送验证码
  async sendCode() {
    const code = 0;
    if (code === 0) {
      throw new Err('NOT_FOUND');
    }
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

  async signin() {
    const {
      tel,
      password,
    } = this.ctx.request.body;
    if (!tel || !password) {
      throw new Error('参数错误');
    }
    const status = await this.service.user.signin(tel, password);
    this.ctx.body = {
      status,
    };
  }
}

module.exports = UserController;