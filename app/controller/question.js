'use strict';
const Controller = require('egg').Controller;

class QuestionController extends Controller {

  /**
   * 发表动态
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

  async deleteQuestion() {
    //
  }

  async addAnswer() {
    //
  }
  async deleteAnswer() {
    //
  }
  async acceptAnswer() {
    //
  }
  async getExpertList() {
    //
  }
  async getQuestionList() {
    //
  }
}

module.exports = QuestionController;
