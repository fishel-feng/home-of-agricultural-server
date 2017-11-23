'use strict';

const Controller = require('egg').Controller;
class NewsController extends Controller {
  async getIndex() {
    const result = await this.service.news.getIndex();
    this.ctx.body = result;
  }
}

module.exports = NewsController;
