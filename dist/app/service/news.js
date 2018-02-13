'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cheerio = require('cheerio');
module.exports = function (app) {
  var baseUrl = 'http://news.wugu.com.cn/';
  var User = app.model.User;

  var UserService = function (_app$Service) {
    _inherits(UserService, _app$Service);

    function UserService() {
      _classCallCheck(this, UserService);

      return _possibleConstructorReturn(this, (UserService.__proto__ || Object.getPrototypeOf(UserService)).apply(this, arguments));
    }

    _createClass(UserService, [{
      key: 'getArticleIndex',


      /**
       * 获取新闻首页
       * @return {*} 导航栏，轮播图，今日热点
       */
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _this2 = this;

          var result, $, navItem, scroll, todayNews;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.ctx.curl(baseUrl, {
                    timeout: 3000,
                    dataType: 'text'
                  });

                case 2:
                  result = _context.sent;
                  $ = cheerio.load(result.data);
                  navItem = [];
                  scroll = [];
                  todayNews = [];

                  $('.nav_item').each(function (index, element) {
                    var itemName = $(element).find('a').text();
                    var navUrl = $(element).find('a').attr('href').slice(1);
                    navItem.push({
                      itemName: itemName,
                      navUrl: navUrl
                    });
                  });
                  navItem.splice(8, 1);
                  $('.iscroll_li').each(function (index, element) {
                    var title = $(element).find('.banner_title').text().trim();
                    var imageUrl = $(element).find('img').data('url');
                    var articleUrl = $(element).find('a').attr('href');
                    var articleId = _this2.getArticleId(articleUrl);
                    scroll.push({
                      title: title,
                      imageUrl: imageUrl,
                      articleId: articleId
                    });
                  });
                  $('.focus_contain a').each(function (index, element) {
                    var title = $(element).attr('title');
                    var articleUrl = $(element).attr('href');
                    var articleId = _this2.getArticleId(articleUrl);
                    todayNews.push({
                      rank: index + 1,
                      title: title,
                      articleId: articleId
                    });
                  });
                  return _context.abrupt('return', {
                    navItem: navItem,
                    scroll: scroll,
                    todayNews: todayNews
                  });

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getArticleIndex() {
          return _ref.apply(this, arguments);
        }

        return getArticleIndex;
      }()

      /**
       * 获取文章内容
       * @param {string} articleId 新闻id
       * @return {*} 新闻详情
       */

    }, {
      key: 'getArticleInfo',
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(articleId) {
          var url, result, $, content, images, articles, title, from, time, read, desc, imageUrl, articleInfo, index;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  url = baseUrl + 'article/' + articleId + '.html';
                  _context2.next = 3;
                  return this.ctx.curl(url, {
                    timeout: 3000,
                    dataType: 'text'
                  });

                case 3:
                  result = _context2.sent;
                  $ = cheerio.load(result.data);
                  content = [];
                  images = [];
                  articles = $('.articles');
                  title = $('.la', articles).text();
                  from = $('.words_author', articles).text();
                  time = $('.time', articles).text();
                  read = $('.reyd', articles).text();
                  desc = $('.ddcon', articles).text();
                  imageUrl = void 0;

                  $('.wd p', articles).each(function (index, element) {
                    imageUrl = $(element).find('img').data('url');
                    if (imageUrl) {
                      images.push(imageUrl);
                    }
                    content.push($(element).text().trim());
                  });
                  articleInfo = [];
                  index = 0;

                  content.forEach(function (element) {
                    if (element !== '') {
                      articleInfo.push({
                        type: 'word',
                        content: element
                      });
                    } else {
                      if (index < images.length) {
                        articleInfo.push({
                          type: 'image',
                          content: images[index++]
                        });
                      } else {
                        articleInfo.push({
                          type: 'word',
                          content: ''
                        });
                      }
                    }
                  });
                  return _context2.abrupt('return', {
                    title: title,
                    from: from,
                    time: time,
                    read: read,
                    desc: desc,
                    articleInfo: articleInfo
                  });

                case 19:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function getArticleInfo(_x) {
          return _ref2.apply(this, arguments);
        }

        return getArticleInfo;
      }()

      /**
       * 分页查询新闻列表
       * @param {string} itemName 列表项导航
       * @param {string} page 页码
       * @return {string} 列表信息
       */

    }, {
      key: 'getArticleListByPage',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(itemName, page) {
          var _this3 = this;

          var url, result, $, articles;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  url = '' + baseUrl + itemName + '_' + page + '.html';
                  _context3.next = 3;
                  return this.ctx.curl(url, {
                    timeout: 3000,
                    dataType: 'text'
                  });

                case 3:
                  result = _context3.sent;
                  $ = cheerio.load(result.data);
                  articles = [];

                  $('.recommend_item').each(function (index, element) {
                    var articleUrl = $(element).find('a').attr('href');
                    var articleId = _this3.getArticleId(articleUrl);
                    var title = $(element).find('a').text().trim();
                    var imageUrl = $(element).find('img').data('url');
                    var desc = $(element).find('.recommend_explain').text().trim();
                    var date = $(element).find('.recommend_date').text();
                    var read = $(element).find('.recommend_read').text();
                    articles.push({
                      articleId: articleId,
                      title: title,
                      imageUrl: imageUrl,
                      desc: desc,
                      date: date,
                      read: read
                    });
                  });
                  return _context3.abrupt('return', {
                    articles: articles
                  });

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function getArticleListByPage(_x2, _x3) {
          return _ref3.apply(this, arguments);
        }

        return getArticleListByPage;
      }()

      /**
       * 收藏文章
       * @param {string} articleId 新闻id
       * @param {string} title 新闻标题
       * @return {string} 成功状态
       */

    }, {
      key: 'addToCollections',
      value: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(articleId, title) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return User.update({
                    _id: this.ctx.user._id
                  }, {
                    $push: {
                      collections: {
                        articleId: articleId,
                        title: title
                      }
                    },
                    $inc: {
                      collectionCount: 1
                    }
                  });

                case 3:
                  return _context4.abrupt('return', 'success');

                case 6:
                  _context4.prev = 6;
                  _context4.t0 = _context4['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 9:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 6]]);
        }));

        function addToCollections(_x4, _x5) {
          return _ref4.apply(this, arguments);
        }

        return addToCollections;
      }()

      /**
       * 取消收藏
       * @param {string} articleId 新闻id
       * @return {string} 成功状态
       */

    }, {
      key: 'deleteFromCollections',
      value: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(articleId) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return User.update({
                    _id: this.ctx.user._id
                  }, {
                    $pull: {
                      collections: {
                        articleId: articleId
                      }
                    },
                    $inc: {
                      collectionCount: -1
                    }
                  });

                case 3:
                  return _context5.abrupt('return', 'success');

                case 6:
                  _context5.prev = 6;
                  _context5.t0 = _context5['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 9:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 6]]);
        }));

        function deleteFromCollections(_x6) {
          return _ref5.apply(this, arguments);
        }

        return deleteFromCollections;
      }()

      /**
       * 获取新闻id
       * @param {string} articleUrl 新闻url
       * @return {string} 新闻id
       */

    }, {
      key: 'getArticleId',
      value: function getArticleId(articleUrl) {
        return articleUrl.slice(articleUrl.lastIndexOf('/') + 1, -5);
      }
    }]);

    return UserService;
  }(app.Service);

  return UserService;
};
//# sourceMappingURL=news.js.map