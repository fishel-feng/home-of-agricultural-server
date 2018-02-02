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
    const userToken = this.ctx.args[0];
    const targetId = this.ctx.args[1];
    await this.service.io.like(userToken, targetId);
  }

  /**
   * 评论
   */
  async comment() {
    const userToken = this.ctx.args[0];
    const circleId = this.ctx.args[1];
    const targetId = this.ctx.args[2];
    await this.service.io.comment(userToken, circleId, targetId);
  }

  /**
   * 回答
   */
  async answer() {
    const questionId = this.ctx.args[0];
    await this.service.io.answer(questionId);
  }

  /**
   * 邀请回答
   */
  async invitation() {
    const userToken = this.ctx.args[0];
    const expertId = this.ctx.args[1];
    const questionId = this.ctx.args[2];
    await this.service.io.invitation(userToken, expertId, questionId);
  }

  /**
   * 关注问题有回答
   */
  async attention() {
    //
  }

  /**
   * 关注用户
   */
  async follow() {
    const userToken = this.ctx.args[0];
    const targetId = this.ctx.args[1];
    await this.service.io.follow(userToken, targetId);
  }

  /**
   * 注销
   */
  async exit() {
    //
  }

  async click() {
    // const userToken = this.ctx.args[0];
    // const targetId = this.ctx.args[1];
    // console.log(userToken);
    // console.log(targetId);
    console.log(this.ctx.socket.id);
  }

  async disconnecting() {
    console.log('close');
  }
}

module.exports = IOController;
