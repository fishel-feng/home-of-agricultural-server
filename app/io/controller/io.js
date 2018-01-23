'use strict';
const Controller = require('egg').Controller;

class IOController extends Controller {

  /**
   * 登录
   */
  async login() {
    const token = this.ctx.args[0];
    const socketId = await this.service.io.login(token);
    console.log(socketId);
  }

  /**
   * 聊天
   */
  async chat() {
    const to = this.ctx.args[0];
    const message = this.ctx.args[1];
    await this.service.io.chat(to, message);
  }

  /**
   * 点赞
   */
  async like() {
    //
  }

  /**
   * 评论
   */
  async comment() {
    //
  }

  /**
   * 回答
   */
  async answer() {
    //
  }

  /**
   * 邀请回答
   */
  async invitation() {
    //
  }

  /**
   * 关注用户
   */
  async attention() {
    //
  }

  /**
   * 采纳答案
   */
  async accept() {
    //
  }

  /**
   * 注销
   */
  async exit() {
    //
  }
}

module.exports = IOController;
