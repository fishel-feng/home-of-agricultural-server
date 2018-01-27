'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

var IOController = function (_Controller) {
  _inherits(IOController, _Controller);

  function IOController() {
    _classCallCheck(this, IOController);

    return _possibleConstructorReturn(this, (IOController.__proto__ || Object.getPrototypeOf(IOController)).apply(this, arguments));
  }

  _createClass(IOController, [{
    key: 'login',


    /**
     * 登录
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var token, socketId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = this.ctx.args[0];
                _context.next = 3;
                return this.service.io.login(token);

              case 3:
                socketId = _context.sent;

                console.log(socketId);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login() {
        return _ref.apply(this, arguments);
      }

      return login;
    }()

    /**
     * 聊天
     */

  }, {
    key: 'chat',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var to, message;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                to = this.ctx.args[0];
                message = this.ctx.args[1];
                _context2.next = 4;
                return this.service.io.chat(to, message);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function chat() {
        return _ref2.apply(this, arguments);
      }

      return chat;
    }()

    /**
     * 点赞
     */

  }, {
    key: 'like',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var userToken, targetId;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userToken = this.ctx.args[0];
                targetId = this.ctx.args[1];
                _context3.next = 4;
                return this.service.io.like(userToken, targetId);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function like() {
        return _ref3.apply(this, arguments);
      }

      return like;
    }()

    /**
     * 评论
     */

  }, {
    key: 'comment',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var userToken, circleId, targetId;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userToken = this.ctx.args[0];
                circleId = this.ctx.args[1];
                targetId = this.ctx.args[2];
                _context4.next = 5;
                return this.service.io.comment(userToken, circleId, targetId);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function comment() {
        return _ref4.apply(this, arguments);
      }

      return comment;
    }()

    /**
     * 回答
     */

  }, {
    key: 'answer',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var questionId;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                questionId = this.ctx.args[0];
                _context5.next = 3;
                return this.service.io.answer(questionId);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function answer() {
        return _ref5.apply(this, arguments);
      }

      return answer;
    }()

    /**
     * 邀请回答
     */

  }, {
    key: 'invitation',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function invitation() {
        return _ref6.apply(this, arguments);
      }

      return invitation;
    }()
  }, {
    key: 'attention',


    /**
     * 关注问题有回答
     */
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function attention() {
        return _ref7.apply(this, arguments);
      }

      return attention;
    }()
  }, {
    key: 'follow',


    /**
     * 关注用户
     */
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function follow() {
        return _ref8.apply(this, arguments);
      }

      return follow;
    }()
  }, {
    key: 'exit',


    /**
     * 注销
     */
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function exit() {
        return _ref9.apply(this, arguments);
      }

      return exit;
    }()
  }]);

  return IOController;
}(Controller);

module.exports = IOController;
//# sourceMappingURL=io.js.map