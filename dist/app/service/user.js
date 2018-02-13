'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (app) {
  var fs = require('fs');
  var path = require('path');
  var cryptos = require('cryptos');
  var crypto = require('crypto');

  var _app$model = app.model,
      User = _app$model.User,
      Circle = _app$model.Circle,
      Question = _app$model.Question,
      Message = _app$model.Message,
      Expert = _app$model.Expert;

  var PAGE_SIZE = 30;

  var RECENT = 'RECENT';
  var NEW_MESSAGE = 'NEW_MESSAGE';

  var NEW_VERIFY_CODE_PREFIX = 'NEW';
  var RESET_VERIFY_CODE_PREFIX = 'RESET';
  var SALT = 'dcv9u89h93ggf78rth3cng02n';

  var UserService = function (_app$Service) {
    _inherits(UserService, _app$Service);

    function UserService() {
      _classCallCheck(this, UserService);

      return _possibleConstructorReturn(this, (UserService.__proto__ || Object.getPrototypeOf(UserService)).apply(this, arguments));
    }

    _createClass(UserService, [{
      key: 'signUp',


      /**
       * 用户注册
       * @param {String} tel 手机号
       * @param {String} password 加密的密码
       * @param {String} code 验证码
       * @return {String} 本次token信息
       */
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tel, password, code) {
          var realCode, user, realPassword, encryptedPassword, newUser, token;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return app.redis.get(NEW_VERIFY_CODE_PREFIX + tel);

                case 2:
                  realCode = _context.sent;

                  if (!(code !== realCode)) {
                    _context.next = 5;
                    break;
                  }

                  throw new Error('VERIFY_CODE_ERROR');

                case 5:
                  _context.next = 7;
                  return User.find({
                    tel: tel
                  });

                case 7:
                  user = _context.sent;

                  if (!user.length) {
                    _context.next = 10;
                    break;
                  }

                  throw new Error('USER_EXIST');

                case 10:
                  realPassword = this.getRealPassword(password);
                  encryptedPassword = this.generateEncryptedPassword(realPassword);
                  _context.next = 14;
                  return new User({
                    tel: tel,
                    password: encryptedPassword
                  }).save();

                case 14:
                  newUser = _context.sent;
                  token = this.generateToken(newUser._id);
                  return _context.abrupt('return', token);

                case 17:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function signUp(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return signUp;
      }()

      /**
       * 用户登录
       * @param {String} tel 手机号
       * @param {String} password 加密的密码
       * @return {String} 本次token信息
       */

    }, {
      key: 'signIn',
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tel, password) {
          var realPassword, encryptedPassword, user, token;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  realPassword = this.getRealPassword(password);
                  encryptedPassword = this.generateEncryptedPassword(realPassword);
                  _context2.next = 4;
                  return User.findOne({
                    tel: tel,
                    password: encryptedPassword
                  });

                case 4:
                  user = _context2.sent;

                  if (user) {
                    _context2.next = 7;
                    break;
                  }

                  throw new Error('ERROR_USER');

                case 7:
                  token = this.generateToken(user._id);
                  return _context2.abrupt('return', token);

                case 9:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function signIn(_x4, _x5) {
          return _ref2.apply(this, arguments);
        }

        return signIn;
      }()

      /**
       * 重置密码
       * @param {String} tel 手机号
       * @param {String} code 验证码
       * @param {String} password 加密的密码
       * @return {String} 成功状态
       */

    }, {
      key: 'resetPassword',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(tel, code, password) {
          var realCode, realPassword, encryptedPassword;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return app.redis.get(RESET_VERIFY_CODE_PREFIX + tel);

                case 2:
                  realCode = _context3.sent;

                  if (!(code !== realCode)) {
                    _context3.next = 5;
                    break;
                  }

                  throw new Error('VERIFY_CODE_ERROR');

                case 5:
                  realPassword = this.getRealPassword(password);
                  encryptedPassword = this.generateEncryptedPassword(realPassword);
                  _context3.prev = 7;
                  _context3.next = 10;
                  return User.update({
                    tel: tel
                  }, {
                    password: encryptedPassword
                  });

                case 10:
                  return _context3.abrupt('return', 'success');

                case 13:
                  _context3.prev = 13;
                  _context3.t0 = _context3['catch'](7);
                  throw new Error('RESET_PASSWORD_ERROR');

                case 16:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[7, 13]]);
        }));

        function resetPassword(_x6, _x7, _x8) {
          return _ref3.apply(this, arguments);
        }

        return resetPassword;
      }()

      /**
       * 发送验证码
       * @param {String} tel 用户信息
       * @param {boolean} reset 是否为重置密码
       * @return {String} 成功状态
       */

    }, {
      key: 'sendVerifyCode',
      value: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(tel) {
          var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var user, verifyCode;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return User.findOne({
                    tel: tel
                  });

                case 2:
                  user = _context4.sent;

                  if (!reset) {
                    _context4.next = 8;
                    break;
                  }

                  if (user) {
                    _context4.next = 6;
                    break;
                  }

                  throw new Error('NO_USER');

                case 6:
                  _context4.next = 10;
                  break;

                case 8:
                  if (!user) {
                    _context4.next = 10;
                    break;
                  }

                  throw new Error('USER_EXIST');

                case 10:
                  _context4.prev = 10;
                  verifyCode = this.generateVerifyCode();

                  if (!reset) {
                    _context4.next = 17;
                    break;
                  }

                  _context4.next = 15;
                  return app.redis.set(RESET_VERIFY_CODE_PREFIX + tel, verifyCode);

                case 15:
                  _context4.next = 19;
                  break;

                case 17:
                  _context4.next = 19;
                  return app.redis.set(NEW_VERIFY_CODE_PREFIX + tel, verifyCode);

                case 19:
                  return _context4.abrupt('return', 'success');

                case 22:
                  _context4.prev = 22;
                  _context4.t0 = _context4['catch'](10);
                  throw new Error('SEND_CODE_ERROR');

                case 25:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[10, 22]]);
        }));

        function sendVerifyCode(_x10) {
          return _ref4.apply(this, arguments);
        }

        return sendVerifyCode;
      }()

      /**
       * 修改用户资料
       * @param {String} nickName 昵称
       * @param {String} gender 性别
       * @param {Number} age 年龄
       * @param {String} job 职业
       * @param {String} location 地区
       * @param {String} description 个人简介
       * @param {String} headImage 头像
       * @return {String} 成功状态
       */

    }, {
      key: 'modifyUserInfo',
      value: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(nickName, gender, age, job, location, description, headImage) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return User.update({
                    _id: this.ctx.user._id
                  }, {
                    nickName: nickName,
                    gender: gender,
                    age: age,
                    job: job,
                    location: location,
                    description: description,
                    headImage: headImage
                  });

                case 3:
                  return _context5.abrupt('return', 'success');

                case 6:
                  _context5.prev = 6;
                  _context5.t0 = _context5['catch'](0);
                  throw new Error('MODIFY_FAIL');

                case 9:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 6]]);
        }));

        function modifyUserInfo(_x11, _x12, _x13, _x14, _x15, _x16, _x17) {
          return _ref5.apply(this, arguments);
        }

        return modifyUserInfo;
      }()

      /**
       * 关注用户
       * @param {String} targetId 目标用户id
       * @return {String} 成功状态
       */

    }, {
      key: 'giveFollow',
      value: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(targetId) {
          var targetUser;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return User.findById(targetId);

                case 3:
                  targetUser = _context6.sent;
                  _context6.next = 6;
                  return User.update({
                    _id: this.ctx.user._id
                  }, {
                    $push: {
                      followings: {
                        userId: targetId,
                        certification: targetUser.certification,
                        nickName: targetUser.nickName,
                        headImage: targetUser.headImage,
                        description: targetUser.description
                      }
                    },
                    $inc: {
                      followingCount: 1
                    }
                  });

                case 6:
                  _context6.next = 8;
                  return User.update({
                    _id: targetId
                  }, {
                    $push: {
                      followers: {
                        userId: this.ctx.user._id,
                        nickName: this.ctx.user.nickName,
                        headImage: this.ctx.user.headImage,
                        description: this.ctx.user.description,
                        certification: this.ctx.user.certification
                      }
                    },
                    $inc: {
                      followerCount: 1
                    }
                  });

                case 8:
                  return _context6.abrupt('return', 'success');

                case 11:
                  _context6.prev = 11;
                  _context6.t0 = _context6['catch'](0);
                  throw new Error('MODIFY_FAIL');

                case 14:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 11]]);
        }));

        function giveFollow(_x18) {
          return _ref6.apply(this, arguments);
        }

        return giveFollow;
      }()

      /**
       * 取消关注用户
       * @param {String} targetId 目标用户id
       * @return {String} 成功状态
       */

    }, {
      key: 'cancelFollow',
      value: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(targetId) {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return User.findByIdAndUpdate(this.ctx.user._id, {
                    $pull: {
                      followings: {
                        userId: targetId
                      }
                    },
                    $inc: {
                      followingCount: -1
                    }
                  });

                case 3:
                  _context7.next = 5;
                  return User.findByIdAndUpdate(targetId, {
                    $pull: {
                      followers: {
                        userId: this.ctx.user._id
                      }
                    },
                    $inc: {
                      followerCount: -1
                    }
                  });

                case 5:
                  return _context7.abrupt('return', 'success');

                case 8:
                  _context7.prev = 8;
                  _context7.t0 = _context7['catch'](0);
                  throw new Error('MODIFY_FAIL');

                case 11:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 8]]);
        }));

        function cancelFollow(_x19) {
          return _ref7.apply(this, arguments);
        }

        return cancelFollow;
      }()

      /**
       * 获取用户信息
       * @param {String} userId 用户id
       * @return {String} 用户信息
       */

    }, {
      key: 'getUserInfo',
      value: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(userId) {
          var user;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return User.findById(userId, 'certification nickName headImage description gender age questionCount answerCount circleCount job location followerCount followingCount');

                case 3:
                  user = _context8.sent;

                  if (user) {
                    _context8.next = 6;
                    break;
                  }

                  throw new Error('NOT_FOUND');

                case 6:
                  return _context8.abrupt('return', user);

                case 9:
                  _context8.prev = 9;
                  _context8.t0 = _context8['catch'](0);
                  throw new Error('NOT_FOUND');

                case 12:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[0, 9]]);
        }));

        function getUserInfo(_x20) {
          return _ref8.apply(this, arguments);
        }

        return getUserInfo;
      }()

      /**
       * 查看我的信息
       * @return {*} 我的信息
       */

    }, {
      key: 'getUserIndex',
      value: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
          var user;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.prev = 0;
                  _context9.next = 3;
                  return User.findById(this.ctx.user._id);

                case 3:
                  user = _context9.sent;

                  if (user) {
                    _context9.next = 6;
                    break;
                  }

                  throw new Error('SOMETHING_ERROR');

                case 6:
                  return _context9.abrupt('return', user);

                case 9:
                  _context9.prev = 9;
                  _context9.t0 = _context9['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 12:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, this, [[0, 9]]);
        }));

        function getUserIndex() {
          return _ref9.apply(this, arguments);
        }

        return getUserIndex;
      }()

      /**
       * 查看收藏的文章列表
       * @return {*} 收藏的文章
       */

    }, {
      key: 'getCollections',
      value: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
          var collections, result;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.prev = 0;
                  _context10.next = 3;
                  return User.findById(this.ctx.user._id, 'collections');

                case 3:
                  collections = _context10.sent;

                  if (collections) {
                    _context10.next = 6;
                    break;
                  }

                  throw new Error('SOMETHING_ERROR');

                case 6:
                  result = collections.collections.reverse();
                  return _context10.abrupt('return', result);

                case 10:
                  _context10.prev = 10;
                  _context10.t0 = _context10['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 13:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, this, [[0, 10]]);
        }));

        function getCollections() {
          return _ref10.apply(this, arguments);
        }

        return getCollections;
      }()

      /**
       * 查看关注的问题列表
       * @param {String} last 最后时间
       * @return {*} 关注的问题
       */

    }, {
      key: 'getAttentions',
      value: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(last) {
          var attentions;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.prev = 0;
                  _context11.next = 3;
                  return Question.find({
                    _id: {
                      $in: this.ctx.user.attentions
                    },
                    time: { $lt: last }
                  }, '_id desc title images finishState answerCount tag time').sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

                case 3:
                  attentions = _context11.sent;

                  if (attentions) {
                    _context11.next = 6;
                    break;
                  }

                  throw new Error('SOMETHING_ERROR');

                case 6:
                  return _context11.abrupt('return', attentions);

                case 9:
                  _context11.prev = 9;
                  _context11.t0 = _context11['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 12:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, this, [[0, 9]]);
        }));

        function getAttentions(_x21) {
          return _ref11.apply(this, arguments);
        }

        return getAttentions;
      }()

      /**
       * 查看关注的人列表
       * @return {*} 关注的人
       */

    }, {
      key: 'getFollowings',
      value: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
          var followings;
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.prev = 0;
                  _context12.next = 3;
                  return User.find({
                    _id: {
                      $in: [this.ctx.user.followings]
                    }
                  }, '_id nickName headImage');

                case 3:
                  followings = _context12.sent;
                  return _context12.abrupt('return', followings);

                case 7:
                  _context12.prev = 7;
                  _context12.t0 = _context12['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context12.stop();
              }
            }
          }, _callee12, this, [[0, 7]]);
        }));

        function getFollowings() {
          return _ref12.apply(this, arguments);
        }

        return getFollowings;
      }()

      /**
       * 查看关注我的人列表
       * @return {*} 关注我的人
       */

    }, {
      key: 'getFollowers',
      value: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
          var followers;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.prev = 0;
                  _context13.next = 3;
                  return User.find({
                    _id: {
                      $in: [this.ctx.user.followers]
                    }
                  }, '_id nickName headImage');

                case 3:
                  followers = _context13.sent;
                  return _context13.abrupt('return', followers);

                case 7:
                  _context13.prev = 7;
                  _context13.t0 = _context13['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, this, [[0, 7]]);
        }));

        function getFollowers() {
          return _ref13.apply(this, arguments);
        }

        return getFollowers;
      }()

      /**
       * 查看我的提问记录
       * @param {String} last 最后时间
       * @return {*} 我的提问
       */

    }, {
      key: 'getQuestions',
      value: function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(last) {
          var questions;
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  _context14.prev = 0;
                  _context14.next = 3;
                  return Question.find({
                    userId: this.ctx.user._id,
                    time: { $lt: last }
                  }, '_id desc title images finishState answerCount tag time').sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

                case 3:
                  questions = _context14.sent;

                  if (questions) {
                    _context14.next = 6;
                    break;
                  }

                  throw new Error('SOMETHING_ERROR');

                case 6:
                  return _context14.abrupt('return', questions);

                case 9:
                  _context14.prev = 9;
                  _context14.t0 = _context14['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 12:
                case 'end':
                  return _context14.stop();
              }
            }
          }, _callee14, this, [[0, 9]]);
        }));

        function getQuestions(_x22) {
          return _ref14.apply(this, arguments);
        }

        return getQuestions;
      }()

      /**
       * 查看我的回答记录
       * @param {String} last 最后时间
       * @return {*} 我的回答
       */

    }, {
      key: 'getAnswers',
      value: function () {
        var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(last) {
          var answers;
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  _context15.prev = 0;
                  _context15.next = 3;
                  return Question.find({
                    _id: {
                      $in: this.ctx.user.answers
                    },
                    time: { $lt: last }
                  }, '_id desc title images finishState answerCount tag time').sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

                case 3:
                  answers = _context15.sent;

                  if (answers) {
                    _context15.next = 6;
                    break;
                  }

                  throw new Error('SOMETHING_ERROR');

                case 6:
                  return _context15.abrupt('return', answers);

                case 9:
                  _context15.prev = 9;
                  _context15.t0 = _context15['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 12:
                case 'end':
                  return _context15.stop();
              }
            }
          }, _callee15, this, [[0, 9]]);
        }));

        function getAnswers(_x23) {
          return _ref15.apply(this, arguments);
        }

        return getAnswers;
      }()

      /**
       * 查看我发表的动态
       * @param {String} last 最后时间
       * @return {*} 我发表的动态
       */

    }, {
      key: 'getCircles',
      value: function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(last) {
          var circles;
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  _context16.prev = 0;
                  _context16.next = 3;
                  return Circle.find({
                    userId: this.ctx.user._id,
                    time: { $lt: last }
                  }, 'userId nickName headImage likeCount content images commentCount time').sort({
                    time: 'desc'
                  });

                case 3:
                  circles = _context16.sent;

                  if (circles) {
                    _context16.next = 6;
                    break;
                  }

                  throw new Error('SOMETHING_ERROR');

                case 6:
                  return _context16.abrupt('return', circles);

                case 9:
                  _context16.prev = 9;
                  _context16.t0 = _context16['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 12:
                case 'end':
                  return _context16.stop();
              }
            }
          }, _callee16, this, [[0, 9]]);
        }));

        function getCircles(_x24) {
          return _ref16.apply(this, arguments);
        }

        return getCircles;
      }()
    }, {
      key: 'showMessage',
      value: function () {
        var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
          var messages;
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  _context17.prev = 0;
                  _context17.next = 3;
                  return Message.find({
                    myId: this.ctx.user._id
                  }).sort({
                    time: 'desc'
                  });

                case 3:
                  messages = _context17.sent;

                  if (messages) {
                    _context17.next = 6;
                    break;
                  }

                  throw new Error('SOMETHING_ERROR');

                case 6:
                  return _context17.abrupt('return', messages);

                case 9:
                  _context17.prev = 9;
                  _context17.t0 = _context17['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 12:
                case 'end':
                  return _context17.stop();
              }
            }
          }, _callee17, this, [[0, 9]]);
        }));

        function showMessage() {
          return _ref17.apply(this, arguments);
        }

        return showMessage;
      }()
    }, {
      key: 'getRecent',
      value: function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
          var res, recent, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, user, temp;

          return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  _context18.prev = 0;
                  res = [];
                  _context18.next = 4;
                  return app.redis.zrangebyscore(RECENT + this.ctx.user._id, 0, Date.now());

                case 4:
                  recent = _context18.sent;

                  if (recent.length) {
                    _context18.next = 7;
                    break;
                  }

                  return _context18.abrupt('return', res);

                case 7:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context18.prev = 10;
                  _iterator = recent[Symbol.iterator]();

                case 12:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context18.next = 29;
                    break;
                  }

                  item = _step.value;
                  _context18.next = 16;
                  return User.findById(item, 'certification nickName headImage description');

                case 16:
                  user = _context18.sent;
                  temp = {
                    userId: item,
                    certification: user.certification,
                    nickName: user.nickName,
                    headImage: user.headImage,
                    description: user.description,
                    newMessage: false
                  };
                  _context18.next = 20;
                  return app.redis.sismember(NEW_MESSAGE + this.ctx.user._id, item);

                case 20:
                  if (!_context18.sent) {
                    _context18.next = 25;
                    break;
                  }

                  temp.newMessage = true;
                  res.unshift(temp);
                  _context18.next = 26;
                  break;

                case 25:
                  res.unshift(temp);

                case 26:
                  _iteratorNormalCompletion = true;
                  _context18.next = 12;
                  break;

                case 29:
                  _context18.next = 35;
                  break;

                case 31:
                  _context18.prev = 31;
                  _context18.t0 = _context18['catch'](10);
                  _didIteratorError = true;
                  _iteratorError = _context18.t0;

                case 35:
                  _context18.prev = 35;
                  _context18.prev = 36;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }

                case 38:
                  _context18.prev = 38;

                  if (!_didIteratorError) {
                    _context18.next = 41;
                    break;
                  }

                  throw _iteratorError;

                case 41:
                  return _context18.finish(38);

                case 42:
                  return _context18.finish(35);

                case 43:
                  return _context18.abrupt('return', res);

                case 46:
                  _context18.prev = 46;
                  _context18.t1 = _context18['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 49:
                case 'end':
                  return _context18.stop();
              }
            }
          }, _callee18, this, [[0, 46], [10, 31, 35, 43], [36,, 38, 42]]);
        }));

        function getRecent() {
          return _ref18.apply(this, arguments);
        }

        return getRecent;
      }()
    }, {
      key: 'applyCertification',
      value: function () {
        var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(realName, idCardNumber, urls, tag, message) {
          var expert;
          return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  _context19.next = 2;
                  return Expert.findOne({ idCardNumber: idCardNumber });

                case 2:
                  expert = _context19.sent;

                  if (!expert) {
                    _context19.next = 5;
                    break;
                  }

                  throw new Error('REPEAT');

                case 5:
                  _context19.prev = 5;
                  _context19.next = 8;
                  return new Expert({
                    userId: this.ctx.user._id,
                    realName: realName,
                    idCardNumber: idCardNumber,
                    urls: urls,
                    tag: tag,
                    message: message
                  }).save();

                case 8:
                  return _context19.abrupt('return', 'success');

                case 11:
                  _context19.prev = 11;
                  _context19.t0 = _context19['catch'](5);
                  throw new Error('SOMETHING_ERROR');

                case 14:
                case 'end':
                  return _context19.stop();
              }
            }
          }, _callee19, this, [[5, 11]]);
        }));

        function applyCertification(_x25, _x26, _x27, _x28, _x29) {
          return _ref19.apply(this, arguments);
        }

        return applyCertification;
      }()

      /**
       * 生成随机验证码
       * @return {string} 验证码
       */

    }, {
      key: 'generateVerifyCode',
      value: function generateVerifyCode() {
        return (Math.random() + '').slice(2, 8);
      }

      /**
       * 获取真实密码
       * @param {string} password rsa加密的密码
       * @return {string} 真实密码
       */

    }, {
      key: 'getRealPassword',
      value: function getRealPassword(password) {
        var keyPath = path.join(__dirname, './rsa_private_key.pem');
        var privatePem = fs.readFileSync(keyPath);
        return cryptos.RSADecrypt(password, privatePem);
      }

      /**
       * 生成加密的密码
       * @param {string} password 原密码
       * @return {string} 加密的密码
       */

    }, {
      key: 'generateEncryptedPassword',
      value: function generateEncryptedPassword(password) {
        return crypto.createHash('md5').update(password + SALT).digest('hex');
      }

      /**
       * 根据用户 id 生成 token
       * @param {string} userId 用户id
       * @return {string} token
       */

    }, {
      key: 'generateToken',
      value: function generateToken(userId) {
        return app.jwt.sign({
          userId: userId
        }, app.config.jwt.secret);
      }
    }]);

    return UserService;
  }(app.Service);

  return UserService;
};
//# sourceMappingURL=user.js.map