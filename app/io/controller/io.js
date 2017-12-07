'use strict';
const Controller = require('egg').Controller;
const socketMap = {};

class IOController extends Controller {

  /**
   * 登录
   */
  async login() {
    const user = this.ctx.args[0];
    socketMap[user] = this.ctx.socket.id;
  }

  /**
   * 聊天
   */
  async chat() {
    const from = this.ctx.args[0];
    const to = this.ctx.args[1];
    const message = this.ctx.args[2];
    console.log(from + '发消息给' + to);
    this.ctx.socket.nsp.sockets[socketMap[to]].emit('res', message);
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
