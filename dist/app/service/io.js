'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (app) {
  var SOCKET = 'SOCKET';
  var MESSAGE = 'MESSAGE';
  var _app$model = app.model,
      User = _app$model.User,
      Question = _app$model.Question,
      Circle = _app$model.Circle,
      Message = _app$model.Message;

  var IOService = function (_app$Service) {
    _inherits(IOService, _app$Service);

    function IOService() {
      _classCallCheck(this, IOService);

      return _possibleConstructorReturn(this, (IOService.__proto__ || Object.getPrototypeOf(IOService)).apply(this, arguments));
    }

    _createClass(IOService, [{
      key: 'login',


      /**
       * 登录
       * @param {String} token token
       * @return {Promise<void>} id
       */
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
          var userId, socketId;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  userId = this.getUserId(token);
                  socketId = this.ctx.socket.id;
                  _context.next = 4;
                  return app.redis.set(SOCKET + userId, socketId);

                case 4:
                  return _context.abrupt('return', socketId);

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function login(_x) {
          return _ref.apply(this, arguments);
        }

        return login;
      }()
    }, {
      key: 'chat',
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(to, message) {
          var userId, targetSocketId;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // todo
                  userId = '5a16699d5e58179af45247d0';
                  _context2.next = 3;
                  return app.redis.get(SOCKET + to);

                case 3:
                  targetSocketId = _context2.sent;

                  if (targetSocketId) {
                    this.ctx.socket.nsp.sockets[targetSocketId].emit('message', userId, message);
                  }

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function chat(_x2, _x3) {
          return _ref2.apply(this, arguments);
        }

        return chat;
      }()

      /**
       * 点赞
       * @param {String} userToken token
       * @param {String} targetId 被赞的人id
       * @param {String} circleId 动态id
       */

    }, {
      key: 'like',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userToken, targetId, circleId) {
          var userId, user, targetSocketId;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  userId = this.getUserId(userToken);
                  _context3.next = 3;
                  return User.findById(userId);

                case 3:
                  user = _context3.sent;
                  _context3.next = 6;
                  return new Message({
                    myId: targetId,
                    type: 'like',
                    userId: userId,
                    nickName: user.nickName,
                    circleId: circleId
                  }).save();

                case 6:
                  _context3.next = 8;
                  return app.redis.get(SOCKET + targetId);

                case 8:
                  targetSocketId = _context3.sent;

                  if (!targetSocketId) {
                    _context3.next = 13;
                    break;
                  }

                  this.ctx.socket.nsp.sockets[targetSocketId].emit('message', {
                    type: 'like',
                    userId: userId,
                    nickName: user.nickName,
                    circleId: circleId
                  });
                  _context3.next = 15;
                  break;

                case 13:
                  _context3.next = 15;
                  return app.redis.set(MESSAGE + targetId, '1');

                case 15:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function like(_x4, _x5, _x6) {
          return _ref3.apply(this, arguments);
        }

        return like;
      }()

      /**
       * 评论
       * @param {String} userToken token
       * @param {String} circleId 动态id
       * @param {String} targetId 被评论的人id
       */

    }, {
      key: 'comment',
      value: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userToken, circleId, targetId) {
          var userId, user, circle, authorId, authorSocketId, targetSocketId;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  userId = this.getUserId(userToken);
                  _context4.next = 3;
                  return User.findById(userId);

                case 3:
                  user = _context4.sent;
                  _context4.next = 6;
                  return Circle.findById(circleId);

                case 6:
                  circle = _context4.sent;
                  authorId = circle.userId;
                  _context4.next = 10;
                  return new Message({
                    myId: authorId,
                    type: 'comment',
                    userId: userId,
                    nickName: user.nickName,
                    circleId: circleId
                  }).save();

                case 10:
                  _context4.next = 12;
                  return app.redis.get(SOCKET + authorId);

                case 12:
                  authorSocketId = _context4.sent;

                  if (!authorSocketId) {
                    _context4.next = 17;
                    break;
                  }

                  this.ctx.socket.nsp.sockets[authorSocketId].emit('message', {
                    type: 'comment',
                    userId: userId,
                    nickName: user.nickName,
                    circleId: circleId
                  });
                  _context4.next = 19;
                  break;

                case 17:
                  _context4.next = 19;
                  return app.redis.set(MESSAGE + authorId, '1');

                case 19:
                  if (!targetId) {
                    _context4.next = 31;
                    break;
                  }

                  _context4.next = 22;
                  return new Message({
                    myId: targetId,
                    type: 'reply',
                    userId: userId,
                    nickName: user.nickName,
                    circleId: circleId
                  }).save();

                case 22:
                  _context4.next = 24;
                  return app.redis.get(SOCKET + targetId);

                case 24:
                  targetSocketId = _context4.sent;

                  if (!targetSocketId) {
                    _context4.next = 29;
                    break;
                  }

                  this.ctx.socket.nsp.sockets[targetSocketId].emit('message', {
                    type: 'reply',
                    userId: userId,
                    nickName: user.nickName,
                    circleId: circleId
                  });
                  _context4.next = 31;
                  break;

                case 29:
                  _context4.next = 31;
                  return app.redis.set(MESSAGE + targetId, '1');

                case 31:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function comment(_x7, _x8, _x9) {
          return _ref4.apply(this, arguments);
        }

        return comment;
      }()

      /**
       * 回答
       * @param {String} userToken token
       * @param {String} questionId 问题id
       */

    }, {
      key: 'answer',
      value: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userToken, questionId) {
          var _this2 = this;

          var userId, user, question, attentions, authorId, authorSocketId;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  userId = this.getUserId(userToken);
                  _context6.next = 3;
                  return User.findById(userId);

                case 3:
                  user = _context6.sent;
                  _context6.next = 6;
                  return Question.findById(questionId);

                case 6:
                  question = _context6.sent;
                  attentions = question.attentions;
                  authorId = question.userId;
                  _context6.next = 11;
                  return new Message({
                    myId: authorId,
                    type: 'answer',
                    userId: userId,
                    nickName: user.nickName,
                    questionId: question._id,
                    title: question.title
                  }).save();

                case 11:
                  _context6.next = 13;
                  return app.redis.get(SOCKET + authorId);

                case 13:
                  authorSocketId = _context6.sent;

                  if (!authorSocketId) {
                    _context6.next = 18;
                    break;
                  }

                  this.ctx.socket.nsp.sockets[authorSocketId].emit('message', {
                    type: 'answer',
                    userId: userId,
                    nickName: user.nickName,
                    questionId: question._id,
                    title: question.title
                  });
                  _context6.next = 20;
                  break;

                case 18:
                  _context6.next = 20;
                  return app.redis.rpush(MESSAGE + authorId, '1');

                case 20:
                  attentions.forEach(function () {
                    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
                      var socketId;
                      return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              _context5.next = 2;
                              return new Message({
                                myId: id,
                                type: 'attention',
                                userId: userId,
                                nickName: user.nickName,
                                questionId: question._id,
                                title: question.title
                              }).save();

                            case 2:
                              _context5.next = 4;
                              return app.redis.get(SOCKET + id);

                            case 4:
                              socketId = _context5.sent;

                              if (!socketId) {
                                _context5.next = 9;
                                break;
                              }

                              _this2.ctx.socket.nsp.sockets[socketId].emit('message', {
                                type: 'attention',
                                userId: userId,
                                nickName: user.nickName,
                                questionId: question._id,
                                title: question.title
                              });
                              _context5.next = 11;
                              break;

                            case 9:
                              _context5.next = 11;
                              return app.redis.set(MESSAGE + id, '1');

                            case 11:
                            case 'end':
                              return _context5.stop();
                          }
                        }
                      }, _callee5, _this2);
                    }));

                    return function (_x12) {
                      return _ref6.apply(this, arguments);
                    };
                  }());

                case 21:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function answer(_x10, _x11) {
          return _ref5.apply(this, arguments);
        }

        return answer;
      }()

      /**
       * 邀请回答
       * @param {String} userToken token
       * @param {String} expertId 专家id
       * @param {String} questionId 问题id
       */

    }, {
      key: 'invite',
      value: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userToken, expertId, questionId) {
          var userId, user, question, expertSocketId;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  userId = this.getUserId(userToken);
                  _context7.next = 3;
                  return User.findById(userId);

                case 3:
                  user = _context7.sent;
                  _context7.next = 6;
                  return Question.findById(questionId);

                case 6:
                  question = _context7.sent;
                  _context7.next = 9;
                  return new Message({
                    myId: expertId,
                    type: 'invite',
                    userId: userId,
                    nickName: user.nickName,
                    questionId: question._id,
                    title: question.title
                  }).save();

                case 9:
                  _context7.next = 11;
                  return app.redis.get(SOCKET + expertId);

                case 11:
                  expertSocketId = _context7.sent;

                  if (!expertSocketId) {
                    _context7.next = 16;
                    break;
                  }

                  this.ctx.socket.nsp.sockets[expertSocketId].emit('message');
                  _context7.next = 18;
                  break;

                case 16:
                  _context7.next = 18;
                  return app.redis.set(MESSAGE + expertId, '1');

                case 18:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function invite(_x13, _x14, _x15) {
          return _ref7.apply(this, arguments);
        }

        return invite;
      }()

      /**
       * 关注用户
       * @param {String} userToken token
       * @param {String} targetId 被关注的人id
       */

    }, {
      key: 'follow',
      value: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(userToken, targetId) {
          var userId, user, targetSocketId;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  userId = this.getUserId(userToken);
                  _context8.next = 3;
                  return User.findById(userId);

                case 3:
                  user = _context8.sent;
                  _context8.next = 6;
                  return new Message({
                    myId: targetId,
                    type: 'follow',
                    userId: userId,
                    nickName: user.nickName
                  }).save();

                case 6:
                  _context8.next = 8;
                  return app.redis.get(SOCKET + targetId);

                case 8:
                  targetSocketId = _context8.sent;

                  if (!targetSocketId) {
                    _context8.next = 13;
                    break;
                  }

                  this.ctx.socket.nsp.sockets[targetSocketId].emit('message', {
                    type: 'follow',
                    userId: userId,
                    nickName: user.nickName
                  });
                  _context8.next = 15;
                  break;

                case 13:
                  _context8.next = 15;
                  return app.redis.set(MESSAGE + targetId, '1');

                case 15:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function follow(_x16, _x17) {
          return _ref8.apply(this, arguments);
        }

        return follow;
      }()

      /**
       * 从token中获取id
       * @param {String} token token
       * @return {String} userId 用户id
       */

    }, {
      key: 'getUserId',
      value: function getUserId(token) {
        return this.ctx.app.jwt.verify(token, '123456').userId;
      }
    }]);

    return IOService;
  }(app.Service);

  return IOService;
};
//# sourceMappingURL=io.js.map