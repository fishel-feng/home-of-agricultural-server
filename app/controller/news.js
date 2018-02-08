'use strict';

const Controller = require('egg').Controller;

module.exports = class NewsController extends Controller {

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

  /**
   * 收藏文章
   */
  async addToCollections() {
    this.ctx.validate({
      articleId: 'string',
      title: 'string',
    });
    const {
      articleId,
      title,
    } = this.ctx.request.body;
    const status = await this.service.news.addToCollections(articleId, title);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 取消收藏
   */
  async deleteFromCollections() {
    this.ctx.validate({
      articleId: 'string',
    });
    const {
      articleId,
    } = this.ctx.request.body;
    const status = await this.service.news.deleteFromCollections(articleId);
    this.ctx.body = {
      status,
    };
  }
};
