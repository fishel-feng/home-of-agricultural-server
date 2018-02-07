'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

var UserController = function (_Controller) {
  _inherits(UserController, _Controller);

  function UserController() {
    _classCallCheck(this, UserController);

    return _possibleConstructorReturn(this, (UserController.__proto__ || Object.getPrototypeOf(UserController)).apply(this, arguments));
  }

  _createClass(UserController, [{
    key: 'signUp',


    /**
     * 用户注册
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ctx$request$body, tel, password, code, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.ctx.validate({
                  tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                  password: 'string',
                  code: /^\d{6}$/
                });
                _ctx$request$body = this.ctx.request.body, tel = _ctx$request$body.tel, password = _ctx$request$body.password, code = _ctx$request$body.code;
                _context.next = 4;
                return this.service.user.signUp(tel, password, code);

              case 4:
                token = _context.sent;

                this.ctx.body = {
                  token: token
                };

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function signUp() {
        return _ref.apply(this, arguments);
      }

      return signUp;
    }()

    /**
     * 用户登录
     */

  }, {
    key: 'signIn',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ctx$request$body2, tel, password, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.ctx.validate({
                  tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                  password: 'string'
                });
                _ctx$request$body2 = this.ctx.request.body, tel = _ctx$request$body2.tel, password = _ctx$request$body2.password;
                _context2.next = 4;
                return this.service.user.signIn(tel, password);

              case 4:
                token = _context2.sent;

                this.ctx.body = {
                  token: token
                };

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function signIn() {
        return _ref2.apply(this, arguments);
      }

      return signIn;
    }()

    /**
     * 重置密码
     */

  }, {
    key: 'resetPassword',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _ctx$request$body3, tel, code, password, status;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.ctx.validate({
                  tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                  code: /^\d{6}$/,
                  password: 'string'
                });
                _ctx$request$body3 = this.ctx.request.body, tel = _ctx$request$body3.tel, code = _ctx$request$body3.code, password = _ctx$request$body3.password;
                _context3.next = 4;
                return this.service.user.resetPassword(tel, code, password);

              case 4:
                status = _context3.sent;

                this.ctx.body = {
                  status: status
                };

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function resetPassword() {
        return _ref3.apply(this, arguments);
      }

      return resetPassword;
    }()

    /**
     * 发送验证码
     */

  }, {
    key: 'sendVerifyCode',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ctx$request$body4, tel, reset, status;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.ctx.validate({
                  tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                  reset: {
                    type: 'boolean',
                    required: false
                  }
                });
                _ctx$request$body4 = this.ctx.request.body, tel = _ctx$request$body4.tel, reset = _ctx$request$body4.reset;
                _context4.next = 4;
                return this.service.user.sendVerifyCode(tel, reset);

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

      function sendVerifyCode() {
        return _ref4.apply(this, arguments);
      }

      return sendVerifyCode;
    }()

    /**
     * 修改用户信息
     */

  }, {
    key: 'modifyUserInfo',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _ctx$request$body5, nickName, gender, age, job, location, description, status;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.ctx.validate({
                  nickName: {
                    type: 'string',
                    required: true,
                    allowEmpty: true
                  },
                  gender: {
                    type: 'string',
                    required: true,
                    allowEmpty: true
                  },
                  age: {
                    type: 'integer',
                    required: true,
                    allowEmpty: true
                  },
                  job: {
                    type: 'string',
                    required: true,
                    allowEmpty: true
                  },
                  location: {
                    type: 'string',
                    required: true,
                    allowEmpty: true
                  },
                  description: {
                    type: 'string',
                    required: true,
                    allowEmpty: true
                  }
                });
                _ctx$request$body5 = this.ctx.request.body, nickName = _ctx$request$body5.nickName, gender = _ctx$request$body5.gender, age = _ctx$request$body5.age, job = _ctx$request$body5.job, location = _ctx$request$body5.location, description = _ctx$request$body5.description;
                _context5.next = 4;
                return this.ctx.service.user.modifyUserInfo(nickName, gender, age, job, location, description);

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

      function modifyUserInfo() {
        return _ref5.apply(this, arguments);
      }

      return modifyUserInfo;
    }()

    /**
     * 修改用户头像
     */

  }, {
    key: 'modifyHeadImage',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var parts, images, status;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                parts = this.ctx.multipart({
                  autoFields: true
                });
                _context6.next = 3;
                return this.service.upload.upload(parts, 'headImage');

              case 3:
                images = _context6.sent;
                _context6.next = 6;
                return this.service.user.modifyHeadImage(images[0]);

              case 6:
                status = _context6.sent;

                this.ctx.body = {
                  status: status
                };

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function modifyHeadImage() {
        return _ref6.apply(this, arguments);
      }

      return modifyHeadImage;
    }()

    /**
     * 关注用户
     */

  }, {
    key: 'giveFollow',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var targetId, status;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.ctx.validate({
                  targetId: 'string'
                });
                targetId = this.ctx.request.body.targetId;
                _context7.next = 4;
                return this.service.user.giveFollow(targetId);

              case 4:
                status = _context7.sent;

                this.ctx.body = {
                  status: status
                };

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function giveFollow() {
        return _ref7.apply(this, arguments);
      }

      return giveFollow;
    }()

    /**
     * 取消关注用户
     */

  }, {
    key: 'cancelFollow',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var targetId, status;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                this.ctx.validate({
                  targetId: 'string'
                });
                targetId = this.ctx.request.body.targetId;
                _context8.next = 4;
                return this.service.user.cancelFollow(targetId);

              case 4:
                status = _context8.sent;

                this.ctx.body = {
                  status: status
                };

              case 6:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function cancelFollow() {
        return _ref8.apply(this, arguments);
      }

      return cancelFollow;
    }()

    /**
     * 获取用户信息
     */

  }, {
    key: 'getUserInfo',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var userId, user;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                userId = this.ctx.params.userId;
                _context9.next = 3;
                return this.service.user.getUserInfo(userId);

              case 3:
                user = _context9.sent;

                this.ctx.body = {
                  user: user
                };

              case 5:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getUserInfo() {
        return _ref9.apply(this, arguments);
      }

      return getUserInfo;
    }()

    /**
     * 查看我的信息
     */

  }, {
    key: 'getUserIndex',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var user;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.service.user.getUserIndex();

              case 2:
                user = _context10.sent;

                this.ctx.body = {
                  user: user
                };

              case 4:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getUserIndex() {
        return _ref10.apply(this, arguments);
      }

      return getUserIndex;
    }()

    /**
     * 查看收藏的文章列表
     */

  }, {
    key: 'getCollections',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var collections;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.service.user.getCollections();

              case 2:
                collections = _context11.sent;

                this.ctx.body = collections;

              case 4:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getCollections() {
        return _ref11.apply(this, arguments);
      }

      return getCollections;
    }()

    /**
     * 查看关注的问题列表
     */

  }, {
    key: 'getAttentions',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var last, attentions;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                last = this.ctx.params.last;
                _context12.next = 3;
                return this.service.user.getAttentions(last);

              case 3:
                attentions = _context12.sent;

                this.ctx.body = {
                  questions: attentions
                };

              case 5:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getAttentions() {
        return _ref12.apply(this, arguments);
      }

      return getAttentions;
    }()

    /**
     * 查看关注的人列表
     */

  }, {
    key: 'getFollowings',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var followings;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.service.user.getFollowings();

              case 2:
                followings = _context13.sent;

                this.ctx.body = {
                  followings: followings
                };

              case 4:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getFollowings() {
        return _ref13.apply(this, arguments);
      }

      return getFollowings;
    }()

    /**
     * 查看关注我的人列表
     */

  }, {
    key: 'getFollowers',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var followers;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.service.user.getFollowers();

              case 2:
                followers = _context14.sent;

                this.ctx.body = {
                  followers: followers
                };

              case 4:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function getFollowers() {
        return _ref14.apply(this, arguments);
      }

      return getFollowers;
    }()

    /**
     * 查看我的提问记录
     */

  }, {
    key: 'getQuestions',
    value: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var last, questions;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                last = this.ctx.params.last;
                _context15.next = 3;
                return this.service.user.getQuestions(last);

              case 3:
                questions = _context15.sent;

                this.ctx.body = {
                  questions: questions
                };

              case 5:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function getQuestions() {
        return _ref15.apply(this, arguments);
      }

      return getQuestions;
    }()

    /**
     * 查看我的回答记录
     */

  }, {
    key: 'getAnswers',
    value: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var last, answers;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                last = this.ctx.params.last;
                _context16.next = 3;
                return this.service.user.getAnswers(last);

              case 3:
                answers = _context16.sent;

                this.ctx.body = {
                  questions: answers
                };

              case 5:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function getAnswers() {
        return _ref16.apply(this, arguments);
      }

      return getAnswers;
    }()

    /**
     * 查看我发表的动态
     */

  }, {
    key: 'getCircles',
    value: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
        var last, circles;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                last = this.ctx.params.last;
                _context17.next = 3;
                return this.service.user.getCircles(last);

              case 3:
                circles = _context17.sent;

                this.ctx.body = {
                  circleList: circles
                };

              case 5:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function getCircles() {
        return _ref17.apply(this, arguments);
      }

      return getCircles;
    }()

    /**
     * 查看我收到的消息
     */

  }, {
    key: 'showMessage',
    value: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var messages;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return this.service.user.showMessage();

              case 2:
                messages = _context18.sent;

                this.ctx.body = {
                  messages: messages
                };

              case 4:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function showMessage() {
        return _ref18.apply(this, arguments);
      }

      return showMessage;
    }()

    /**
     * 查看最近联系的人
     */

  }, {
    key: 'getRecent',
    value: function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
        var recent;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.next = 2;
                return this.service.user.getRecent();

              case 2:
                recent = _context19.sent;

                this.ctx.body = {
                  recent: recent
                };

              case 4:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function getRecent() {
        return _ref19.apply(this, arguments);
      }

      return getRecent;
    }()
  }]);

  return UserController;
}(Controller);

module.exports = UserController;
//# sourceMappingURL=user.js.map