'use strict';
const Controller = require('egg').Controller;

class IOController extends Controller {

  /**
   * 登录
   */
  async login() {
    const token = this.ctx.args[0];
    await this.service.io.login(token);
  }

  /**
   * 聊天
   */
  async chat() {
    const userToken = this.ctx.args[0];
    const targetId = this.ctx.args[1];
    const content = this.ctx.args[2];
    const type = this.ctx.args[3];
    await this.service.io.chat(userToken, targetId, content, type);
  }

  /**
   * 消息已读
   */
  async read() {
    const userToken = this.ctx.args[0];
    const targetId = this.ctx.args[1];
    await this.service.io.read(userToken, targetId);
  }

  /**
   * 点赞
   */
  async like() {
    const userToken = this.ctx.args[0];
    const targetId = this.ctx.args[1];
    const circleId = this.ctx.args[2];
    await this.service.io.like(userToken, targetId, circleId);
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
    const userToken = this.ctx.args[0];
    const questionId = this.ctx.args[1];
    await this.service.io.answer(userToken, questionId);
  }

  /**
   * 邀请回答
   */
  async invite() {
    const userToken = this.ctx.args[0];
    const expertId = this.ctx.args[1];
    const questionId = this.ctx.args[2];
    await this.service.io.invite(userToken, expertId, questionId);
  }

  /**
   * 关注用户
   */
  async follow() {
    const userToken = this.ctx.args[0];
    const targetId = this.ctx.args[1];
    await this.service.io.follow(userToken, targetId);
  }
}

module.exports = IOController;
