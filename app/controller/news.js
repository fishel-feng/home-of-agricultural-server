'use strict';

const Controller = require('egg').Controller;
class NewsController extends Controller {

  /**
   * 获取新闻首页
   */
  async getArticleIndex() {
    const result = await this.service.news.getArticleIndex();
    this.ctx.body = result;
  }

  /**
   * 查看新闻详情
   */
  async getArticleInfo() {
    const articleId = this.ctx.params.id;
    const result = await this.service.news.getArticleInfo(articleId);
    this.ctx.body = result;
  }

  /**
   * 分页查看新闻列表
   */
  async getArticleListByPage() {
    const itemName = this.ctx.params.name;
    const page = this.ctx.params.page;
    const result = await this.service.news.getArticleListByPage(itemName, page);
    this.ctx.body = result;
  }
}

module.exports = NewsController;
