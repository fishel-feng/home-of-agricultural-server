'use strict';

const Controller = require('egg').Controller;
class NewsController extends Controller {
  async getArticleIndex() {
    const result = await this.service.news.getArticleIndex();
    this.ctx.body = result;
  }
  async getArticleInfo() {
    const articleId = this.ctx.params.id;
    const result = await this.service.news.getArticleInfo(articleId);
    this.ctx.body = result;
  }
  async getAtricleList() {
    const itemName = this.ctx.params.name;
    const result = await this.service.news.getAtricleList(itemName);
    this.ctx.body = result;
  }
}

module.exports = NewsController;
