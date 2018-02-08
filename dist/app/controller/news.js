'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

module.exports = function (_Controller) {
  _inherits(NewsController, _Controller);

  function NewsController() {
    _classCallCheck(this, NewsController);

    return _possibleConstructorReturn(this, (NewsController.__proto__ || Object.getPrototypeOf(NewsController)).apply(this, arguments));
  }

  _createClass(NewsController, [{
    key: 'getArticleIndex',


    /**
     * 获取新闻首页
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.service.news.getArticleIndex();

              case 2:
                result = _context.sent;

                this.ctx.body = result;

              case 4:
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
     * 查看新闻详情
     */

  }, {
    key: 'getArticleInfo',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var articleId, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                articleId = this.ctx.params.id;
                _context2.next = 3;
                return this.service.news.getArticleInfo(articleId);

              case 3:
                result = _context2.sent;

                this.ctx.body = result;

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getArticleInfo() {
        return _ref2.apply(this, arguments);
      }

      return getArticleInfo;
    }()

    /**
     * 分页查看新闻列表
     */

  }, {
    key: 'getArticleListByPage',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var itemName, page, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                itemName = this.ctx.params.name;
                page = this.ctx.params.page;
                _context3.next = 4;
                return this.service.news.getArticleListByPage(itemName, page);

              case 4:
                result = _context3.sent;

                this.ctx.body = result;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getArticleListByPage() {
        return _ref3.apply(this, arguments);
      }

      return getArticleListByPage;
    }()

    /**
     * 收藏文章
     */

  }, {
    key: 'addToCollections',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ctx$request$body, articleId, title, status;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.ctx.validate({
                  articleId: 'string',
                  title: 'string'
                });
                _ctx$request$body = this.ctx.request.body, articleId = _ctx$request$body.articleId, title = _ctx$request$body.title;
                _context4.next = 4;
                return this.service.news.addToCollections(articleId, title);

              case 4:
                status = _context4.sent;

                this.ctx.body = {
                  status: status
                };

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addToCollections() {
        return _ref4.apply(this, arguments);
      }

      return addToCollections;
    }()

    /**
     * 取消收藏
     */

  }, {
    key: 'deleteFromCollections',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var articleId, status;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.ctx.validate({
                  articleId: 'string'
                });
                articleId = this.ctx.request.body.articleId;
                _context5.next = 4;
                return this.service.news.deleteFromCollections(articleId);

              case 4:
                status = _context5.sent;

                this.ctx.body = {
                  status: status
                };

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteFromCollections() {
        return _ref5.apply(this, arguments);
      }

      return deleteFromCollections;
    }()
  }]);

  return NewsController;
}(Controller);
//# sourceMappingURL=news.js.map