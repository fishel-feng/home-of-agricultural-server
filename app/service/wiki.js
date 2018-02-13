'use strict';

const cheerio = require('cheerio');
module.exports = app => {
  const baseUrl = 'https://baike.baidu.com';
  class WikiService extends app.Service {

    /**
     * 根据关键词查询百科
     * @param {string} keyWord 关键词
     * @return {*} 百科
     */
    async getWiki(keyWord) {
      const result = await this.ctx.curl(baseUrl + '/item/' + encodeURI(keyWord), {
        timeout: 3000,
        dataType: 'text',
      });
      let html;
      if (result.data) {
        html = result;
      } else {
        const realLocation = result.headers.location;
        html = await this.ctx.curl(baseUrl + realLocation, {
          timeout: 3000,
          dataType: 'text',
        });
      }
      const $ = cheerio.load(html.data);
      const wiki = [];
      const content = $('.body-wrapper .content-wrapper .content .main-content');
      wiki.push({ type: 'title', content: content.find('.lemmaWgt-lemmaTitle h1').text().trim() });
      $('div', content).each((index, item) => {
        if ($(item).hasClass('para-title')) {
          wiki.push({ type: 'innerTitle', content: $(item).find('h2').text()
            .trim() });
        }
        if ($(item).hasClass('para')) {
          wiki.push({ type: 'main', content: $(item).text().trim() });
        }
      });
      return wiki;
    }
  }
  return WikiService;
};
