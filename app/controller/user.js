'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {

  /**
   * 用户注册
   */
  async signUp() {
    this.ctx.validate({
      tel: 'string',
      password: 'string',
      code: 'string',
    });
    const {
      tel,
      password,
      code,
    } = this.ctx.request.body;
    const token = await this.service.user.signUp(tel, password, code);
    this.ctx.body = token;
  }

  /**
   * 用户登录
   */
  async signIn() {
    this.ctx.validate({
      userInfo: 'string',
      key: 'string',
    });
    const {
      userInfo,
      key,
    } = this.ctx.request.body;
    const token = await this.service.user.signIn(userInfo, key);
    this.ctx.body = {
      token,
    };
  }

  async resetPassword() {
    //
  }

  async sendVerifyCode() {
    this.ctx.validate({
      tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    });
    const {
      tel,
    } = this.ctx.request.body;
    const status = await this.service.user.sendVerifyCode(tel);
    this.ctx.body = {
      status,
    };
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