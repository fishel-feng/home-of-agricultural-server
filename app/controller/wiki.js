'use strict';

const Controller = require('egg').Controller;

module.exports = class WikiController extends Controller {

  async getWiki() {
    const keyWord = this.ctx.params.keyWord;
    const result = await this.service.wiki.getWiki(keyWord);
    this.ctx.body = result;
  }
};
