'use strict';
const Controller = require('egg').Controller;

class QuestionController extends Controller {

  /**
   * 新建问题
   */
  async addQuestion() {
    const parts = this.ctx.multipart({
      autoFields: true,
    });
    const images = await this.service.upload.upload(parts, 'question');
    const {
      title,
      content,
      tags,
    } = parts.field;
    const question = await this.service.question.addQuestion(title, content, tags, images);
    this.ctx.body = question;
  }

  /**
   * 删除问题
   */
  async deleteQuestion() {
    this.ctx.validate({
      questionId: 'string',
    });
    const {
      questionId,
    } = this.ctx.request.body;
    // TODO 删除图片
    const status = await this.service.question.deleteQuestion(questionId);
    this.ctx.body = status;
  }

  /**
   * 添加回答
   */
  async addAnswer() {
    //
  }

  /**
   * 删除回答
   */
  async deleteAnswer() {
    //
  }

  /**
   * 采纳答案
   */
  async acceptAnswer() {
    //
  }

  /**
   * 获取专家列表
   */
  async getExpertList() {
    //
  }

  /**
   * 获取问题列表
   */
  async getQuestionList() {
    //
  }
}

module.exports = QuestionController;
