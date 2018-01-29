'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (app) {
  var SOCKET = 'SOCKET';
  var User = app.model.User;

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
                  userId = this.ctx.app.jwt.verify(token, '123456').userId;
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
    }, {
      key: 'like',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userToken, targetId) {
          var userId, userInfo, targetSocketId;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  userId = this.ctx.app.jwt.verify(userToken, '123456').userId;
                  _context3.next = 3;
                  return User.findById(userId);

                case 3:
                  userInfo = _context3.sent;
                  _context3.next = 6;
                  return app.redis.get(SOCKET + targetId);

                case 6:
                  targetSocketId = _context3.sent;

                  if (targetSocketId) {
                    this.ctx.socket.nsp.sockets[targetSocketId].emit('like', userInfo);
                  }

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function like(_x4, _x5) {
          return _ref3.apply(this, arguments);
        }

        return like;
      }()
    }, {
      key: 'comment',
      value: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userToken, circleId, targetId) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function comment(_x6, _x7, _x8) {
          return _ref4.apply(this, arguments);
        }

        return comment;
      }()
    }, {
      key: 'answer',
      value: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(questionId) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function answer(_x9) {
          return _ref5.apply(this, arguments);
        }

        return answer;
      }()
    }, {
      key: 'invitation',
      value: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userToken, expertId, questionId) {
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

        function invitation(_x10, _x11, _x12) {
          return _ref6.apply(this, arguments);
        }

        return invitation;
      }()
    }, {
      key: 'follow',
      value: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userToken, targetId) {
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

        function follow(_x13, _x14) {
          return _ref7.apply(this, arguments);
        }

        return follow;
      }()
    }]);

    return IOService;
  }(app.Service);

  return IOService;
};
//# sourceMappingURL=io.js.map