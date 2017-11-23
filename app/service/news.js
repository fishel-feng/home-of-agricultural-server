'use strict';
const cheerio = require('cheerio');
module.exports = app => {
  class UserService extends app.Service {
    async getIndex() {
      const result = await this.ctx.curl('http://news.wugu.com.cn/', {
        timeout: 3000,
        dataType: 'text',
      });
      const navItem = [];
      const scroll = [];
      const todayNews = [];
      const $ = cheerio.load(result.data);
      $('.nav_item').each((index, element) => {
        const itemName = $(element).find('a').text();
        const navUrl = $(element).find('a').attr('href');
        navItem.push({
          itemName,
          navUrl,
        });
      });
      $('.iscroll_li').each((index, element) => {
        const title = $(element).find('.banner_title').text()
          .trim();
        const imageUrl = $(element).find('img').data('url');
        const articleUrl = $(element).find('a').attr('href');
        const articleId = articleUrl.slice(articleUrl.lastIndexOf('/') + 1, -5);
        scroll.push({
          title,
          imageUrl,
          articleId,
        });
      });
      $('.focus_contain a').each((index, element) => {
        const title = $(element).attr('title');
        const articleUrl = $(element).attr('href');
        const articleId = articleUrl.slice(articleUrl.lastIndexOf('/') + 1, -5);
        todayNews.push({
          title,
          articleId,
        });
      });
      return {
        navItem,
        scroll,
        todayNews,
      };
    }
  }
  return UserService;
};
