'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  // async index() {
  //   throw new Error('NOT_FOUND');
  //   // this.ctx.body = 'Hello world';
  // }
  // todo 发送验证码
  async sendCode() {
    const code = 0;
    if (code === 0) {
      throw new Error('BIND_CONFLICT');
    }
    console.log(code);
  }

  /**
   * 用户注册
   */
  async signup() {
    const {
      tel,
      password,
      code,
    } = this.ctx.request.body;
    if (!tel || !password || !code) {
      throw new Error('参数错误');
    }
    const token = await this.service.user.signup(tel, password, code);
    this.ctx.body = token;
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
