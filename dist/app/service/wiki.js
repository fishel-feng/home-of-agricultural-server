'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cheerio = require('cheerio');
module.exports = function (app) {
  var baseUrl = 'https://baike.baidu.com';

  var WikiService = function (_app$Service) {
    _inherits(WikiService, _app$Service);

    function WikiService() {
      _classCallCheck(this, WikiService);

      return _possibleConstructorReturn(this, (WikiService.__proto__ || Object.getPrototypeOf(WikiService)).apply(this, arguments));
    }

    _createClass(WikiService, [{
      key: 'getWiki',


      /**
       * 根据关键词查询百科
       * @param {string} keyWord 关键词
       * @return {*} 百科
       */
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(keyWord) {
          var result, html, realLocation, $, wiki, content;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.ctx.curl(baseUrl + '/item/' + encodeURI(keyWord), {
                    timeout: 3000,
                    dataType: 'text'
                  });

                case 2:
                  result = _context.sent;
                  html = void 0;

                  if (!result.data) {
                    _context.next = 8;
                    break;
                  }

                  html = result;
                  _context.next = 12;
                  break;

                case 8:
                  realLocation = result.headers.location;
                  _context.next = 11;
                  return this.ctx.curl(baseUrl + realLocation, {
                    timeout: 3000,
                    dataType: 'text'
                  });

                case 11:
                  html = _context.sent;

                case 12:
                  $ = cheerio.load(html.data);
                  wiki = [];
                  content = $('.body-wrapper .content-wrapper .content .main-content');

                  wiki.push({ type: 'title', content: content.find('.lemmaWgt-lemmaTitle h1').text().trim() });
                  $('div', content).each(function (index, item) {
                    if ($(item).hasClass('para-title')) {
                      wiki.push({ type: 'innerTitle', content: $(item).find('h2').text().trim() });
                    }
                    if ($(item).hasClass('para')) {
                      wiki.push({ type: 'main', content: $(item).text().trim() });
                    }
                  });
                  return _context.abrupt('return', wiki);

                case 18:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getWiki(_x) {
          return _ref.apply(this, arguments);
        }

        return getWiki;
      }()
    }]);

    return WikiService;
  }(app.Service);

  return WikiService;
};
//# sourceMappingURL=wiki.js.map