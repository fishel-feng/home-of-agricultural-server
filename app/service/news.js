'use strict';
const cheerio = require('cheerio');
module.exports = app => {
  const baseUrl = 'http://news.wugu.com.cn/';
  class UserService extends app.Service {
    getArticleId(articleUrl) {
      return articleUrl.slice(articleUrl.lastIndexOf('/') + 1, -5);
    }
    async getArticleIndex() {
      const result = await this.ctx.curl(baseUrl, {
        timeout: 3000,
        dataType: 'text',
      });
      const $ = cheerio.load(result.data);
      const navItem = [];
      const scroll = [];
      const todayNews = [];
      $('.nav_item').each((index, element) => {
        const itemName = $(element).find('a').text();
        const navUrl = $(element).find('a').attr('href')
          .slice(1);
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
        const articleId = this.getArticleId(articleUrl);
        scroll.push({
          title,
          imageUrl,
          articleId,
        });
      });
      $('.focus_contain a').each((index, element) => {
        const title = $(element).attr('title');
        const articleUrl = $(element).attr('href');
        const articleId = this.getArticleId(articleUrl);
        todayNews.push({
          rank: index + 1,
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
    async getArticleInfo(articleId) {
      const url = `${baseUrl}article/${articleId}.html`;
      const result = await this.ctx.curl(url, {
        timeout: 3000,
        dataType: 'text',
      });
      const $ = cheerio.load(result.data);
      const content = [];
      const images = [];
      const articles = $('.articles');
      const title = $('.la', articles).text();
      const from = $('.words_author', articles).text();
      const time = $('.time', articles).text();
      const read = $('.reyd', articles).text();
      const desc = $('.ddcon', articles).text();
      let imageUrl;
      $('.wd p', articles).each((index, element) => {
        imageUrl = $(element).find('img').data('url');
        if (imageUrl) {
          images.push(imageUrl);
        }
        content.push($(element).text().trim());
      });
      return {
        title,
        from,
        time,
        read,
        desc,
        images,
        content,
      };
    }
    async getArticleListByPage(itemName, page) {
      const url = `${baseUrl}${itemName}_${page}.html`;
      const result = await this.ctx.curl(url, {
        timeout: 3000,
        dataType: 'text',
      });
      const $ = cheerio.load(result.data);
      const articles = [];
      $('.recommend_item').each((index, element) => {
        const articleUrl = $(element).find('a').attr('href');
        const articleId = this.getArticleId(articleUrl);
        const title = $(element).find('a').text()
          .trim();
        const imageUrl = $(element).find('img').data('url');
        const desc = $(element).find('.recommend_explain').text()
          .trim();
        const date = $(element).find('.recommend_date').text();
        const read = $(element).find('.recommend_read').text();
        articles.push({
          articleId,
          title,
          imageUrl,
          desc,
          date,
          read,
        });
      });
      return {
        articles,
      };
    }
  }
  return UserService;
};
