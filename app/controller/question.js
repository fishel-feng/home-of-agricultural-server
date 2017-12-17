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
    const parts = this.ctx.multipart({
      autoFields: true,
    });
    const images = await this.service.upload.upload(parts, 'answer');
    const {
      questionId,
      content,
    } = parts.field;
    const answer = await this.service.question.addAnswer(questionId, content, images);
    this.ctx.body = answer;
  }

  /**
   * 删除回答
   */
  async deleteAnswer() {
    this.ctx.validate({
      questionId: 'string',
      answerId: 'integer',
    });
    const {
      questionId,
      answerId,
    } = this.ctx.request.body;
    const status = await this.service.question.deleteAnswer(questionId, answerId);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 采纳答案
   */
  async acceptAnswer() {
    this.ctx.validate({
      questionId: 'string',
      answerId: 'integer',
    });
    const {
      questionId,
      answerId,
    } = this.ctx.request.body;
    const status = await this.service.question.acceptAnswer(questionId, answerId);
    this.ctx.body = {
      status,
    };
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
    const page = this.ctx.params.page;
    const result = await this.service.question.getQuestionList(page);
    this.ctx.body = result;
  }

  /**
   * 查看问题详情
   */
  async getQuestion() {
    const id = this.ctx.params.questionId;
    const result = await this.service.question.getQuestion(id);
    this.ctx.body = result;
  }
}

module.exports = QuestionController;
