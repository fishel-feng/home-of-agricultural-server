'use strict';
const Controller = require('egg').Controller;
class QuestionController extends Controller {

  /**
   * 新建问题
   */
  async addQuestion() {
    this.ctx.validate({
      title: 'string',
      content: 'string',
      tag: 'string',
      images: 'array',
    });
    const {
      title,
      content,
      tag,
      images,
    } = this.ctx.request.body;
    const question = await this.service.question.addQuestion(title, content, tag, images);
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
    this.ctx.validate({
      questionId: 'string',
      content: 'string',
      images: 'array',
    });
    const {
      questionId,
      content,
      images,
    } = this.ctx.request.body;
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
   * 关注问题
   */
  async attentionQuestion() {
    this.ctx.validate({
      questionId: 'string',
    });
    const {
      questionId,
    } = this.ctx.request.body;
    const status = await this.service.question.deleteAnswer(questionId);
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
   * 分类获取问题列表
   */
  async getQuestionList() {
    const tag = this.ctx.params.tag;
    const last = this.ctx.params.last;
    const questions = await this.service.question.getQuestionList(tag, last);
    this.ctx.body = {
      questions,
    };
  }

  /**
   * 获取全部问题列表
   */
  async getAllQuestionList() {
    const last = this.ctx.params.last;
    const questions = await this.service.question.getAllQuestionList(last);
    this.ctx.body = {
      questions,
    };
  }

  /**
   * 查看问题详情
   */
  async getQuestion() {
    const id = this.ctx.params.questionId;
    const result = await this.service.question.getQuestion(id);
    this.ctx.body = result;
  }

  /**
   * 获取问题标签
   */
  async getTags() {
    const tags = await this.service.question.getTags();
    this.ctx.body = tags;
  }
}

module.exports = QuestionController;
