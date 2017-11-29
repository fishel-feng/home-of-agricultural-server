'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {

  /**
   * 用户注册
   */
  async signUp() {
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
    const token = await this.service.user.signUp(tel, password, code);
    this.ctx.body = token;
  }

  async signIn() {
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
    const token = await this.service.user.signIn(tel, password);
    this.ctx.body = {
      token,
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

