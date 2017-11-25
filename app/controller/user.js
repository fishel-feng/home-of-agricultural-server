'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {

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

  async resetPassword() {
    //
  }
  async sendVerifyCode() {
    //
  }
  async modifyUserInfo() {
    //
  }
  async getUserInfo() {
    //
  }
  async getUserIndex() {
    //
  }
  async getFavoriteList() {
    //
  }
  async getFollowList() {
    //
  }
}

module.exports = UserController;

