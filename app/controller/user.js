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
    this.ctx.validate({
      tel: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      code: {
        type: 'string',
      },
    });
    const {
      tel,
      password,
      code,
    } = this.ctx.request.body;
    const token = await this.service.user.signup(tel, password, code);
    this.ctx.body = token;
  }

  async signin() {
    this.ctx.validate({
      tel: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    });
    const {
      tel,
      password,
    } = this.ctx.request.body;
    const status = await this.service.user.signin(tel, password);
    this.ctx.body = {
      status,
    };
  }
}

module.exports = UserController;
