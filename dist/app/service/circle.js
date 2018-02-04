'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (app) {
  var _app$model = app.model,
      Circle = _app$model.Circle,
      User = _app$model.User;

  var PAGE_SIZE = 30;

  var CircleService = function (_app$Service) {
    _inherits(CircleService, _app$Service);

    function CircleService() {
      _classCallCheck(this, CircleService);

      return _possibleConstructorReturn(this, (CircleService.__proto__ || Object.getPrototypeOf(CircleService)).apply(this, arguments));
    }

    _createClass(CircleService, [{
      key: 'addCircle',


      /**
       * 发表动态
       * @param {String} content 文本内容
       * @param {String} images 图片地址
       * @return {*} 动态详情数据
       */
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(content, images) {
          var user, circle;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  user = this.ctx.user;
                  _context.prev = 1;
                  _context.next = 4;
                  return new Circle({
                    content: content,
                    images: images,
                    userId: user._id,
                    nickName: user.nickName,
                    headImage: user.headImage
                  }).save();

                case 4:
                  circle = _context.sent;
                  return _context.abrupt('return', {
                    circle: circle
                  });

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](1);
                  throw new Error('ADD_CIRCLE_ERROR');

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 8]]);
        }));

        function addCircle(_x, _x2) {
          return _ref.apply(this, arguments);
        }

        return addCircle;
      }()

      /**
       * 删除动态
       * @param {String} circleId 内容id
       * @return {*} 成功状态
       */

    }, {
      key: 'deleteCircle',
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(circleId) {
          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return Circle.remove({
                    _id: circleId,
                    userId: this.ctx.user._id
                  });

                case 3:
                  res = _context2.sent;

                  if (!(res.result.n !== 1)) {
                    _context2.next = 6;
                    break;
                  }

                  throw new Error();

                case 6:
                  return _context2.abrupt('return', 'success');

                case 9:
                  _context2.prev = 9;
                  _context2.t0 = _context2['catch'](0);
                  throw new Error('DELETE_CIRCLE_ERROR');

                case 12:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 9]]);
        }));

        function deleteCircle(_x3) {
          return _ref2.apply(this, arguments);
        }

        return deleteCircle;
      }()

      /**
       * 添加评论
       * @param {String} circleId 内容id
       * @param {String} content 内容
       * @param {String} targetId 目标用户id
       * @return {*} 评论信息
       */

    }, {
      key: 'addComment',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(circleId, content, targetId) {
          var user, circle, targetName, targetUser, result;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  user = this.ctx.user;
                  _context3.prev = 1;
                  _context3.next = 4;
                  return Circle.findById(circleId);

                case 4:
                  circle = _context3.sent;
                  targetName = void 0;

                  if (!targetId) {
                    _context3.next = 11;
                    break;
                  }

                  _context3.next = 9;
                  return User.findById(targetId, 'nickName');

                case 9:
                  targetUser = _context3.sent;

                  targetName = targetUser.nickName;

                case 11:
                  _context3.next = 13;
                  return Circle.findByIdAndUpdate(circleId, {
                    $inc: {
                      count: 1,
                      commentCount: 1
                    },
                    $push: {
                      comments: {
                        _id: circle.count + 1,
                        content: content,
                        userId: user._id,
                        nickName: user.nickName,
                        headImage: user.headImage,
                        targetId: targetId,
                        targetName: targetName
                      }
                    }
                  });

                case 13:
                  _context3.next = 15;
                  return Circle.findById(circleId, 'comments');

                case 15:
                  result = _context3.sent;
                  return _context3.abrupt('return', result.comments.id(circle.count + 1));

                case 19:
                  _context3.prev = 19;
                  _context3.t0 = _context3['catch'](1);
                  throw new Error('ADD_COMMENT_ERROR');

                case 22:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[1, 19]]);
        }));

        function addComment(_x4, _x5, _x6) {
          return _ref3.apply(this, arguments);
        }

        return addComment;
      }()

      /**
       * 删除评论
       * @param {String} circleId 内容id
       * @param {String} commentId 评论id
       * @return {*} 评论信息
       */

    }, {
      key: 'deleteComment',
      value: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(circleId, commentId) {
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return Circle.update({
                    _id: circleId
                  }, {
                    $inc: {
                      commentCount: -1
                    },
                    $pull: {
                      comments: {
                        _id: commentId
                      }
                    }
                  });

                case 3:
                  res = _context4.sent;

                  if (!(res.nModified !== 1)) {
                    _context4.next = 6;
                    break;
                  }

                  throw new Error();

                case 6:
                  return _context4.abrupt('return', 'success');

                case 9:
                  _context4.prev = 9;
                  _context4.t0 = _context4['catch'](0);
                  throw new Error('DELETE_ERROR');

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 9]]);
        }));

        function deleteComment(_x7, _x8) {
          return _ref4.apply(this, arguments);
        }

        return deleteComment;
      }()

      /**
       * 点赞
       * @param {String} circleId 内容id
       * @return {*} 成功状态
       */

    }, {
      key: 'giveLike',
      value: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(circleId) {
          var user;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  user = this.ctx.user;

                  user.likes.forEach(function (element) {
                    if (element.circleId === circleId) {
                      throw new Error('REPEAT_LIKE');
                    }
                  });
                  _context5.prev = 2;
                  _context5.next = 5;
                  return User.update({
                    _id: user._id
                  }, {
                    $push: {
                      likes: circleId
                    }
                  });

                case 5:
                  _context5.next = 7;
                  return Circle.update({
                    _id: circleId
                  }, {
                    $push: {
                      likes: {
                        userId: user._id,
                        nickName: user.nickName,
                        headImage: user.headImage,
                        description: user.description,
                        certification: user.certification
                      }
                    },
                    $inc: {
                      likeCount: 1
                    }
                  });

                case 7:
                  return _context5.abrupt('return', 'success');

                case 10:
                  _context5.prev = 10;
                  _context5.t0 = _context5['catch'](2);
                  throw new Error('GIVE_LIKE_ERROR');

                case 13:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[2, 10]]);
        }));

        function giveLike(_x9) {
          return _ref5.apply(this, arguments);
        }

        return giveLike;
      }()

      /**
       * 取消赞
       * @param {String} circleId 内容id
       * @return {*} 成功状态
       */

    }, {
      key: 'cancelLike',
      value: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(circleId) {
          var user, res;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  // todo 取消赞逻辑
                  user = this.ctx.user;
                  _context6.prev = 1;
                  _context6.next = 4;
                  return Circle.update({
                    _id: circleId,
                    'likes.userId': user._id
                  }, {
                    $pull: {
                      likes: user._id
                    },
                    $inc: {
                      likeCount: -1
                    }
                  });

                case 4:
                  res = _context6.sent;

                  if (res.n) {
                    _context6.next = 7;
                    break;
                  }

                  throw new Error();

                case 7:
                  _context6.next = 9;
                  return User.update({
                    _id: user._id
                  }, {
                    $pull: {
                      likes: circleId
                    }
                  });

                case 9:
                  return _context6.abrupt('return', 'success');

                case 12:
                  _context6.prev = 12;
                  _context6.t0 = _context6['catch'](1);
                  throw new Error('CANCEL_LIKE_ERROR');

                case 15:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[1, 12]]);
        }));

        function cancelLike(_x10) {
          return _ref6.apply(this, arguments);
        }

        return cancelLike;
      }()

      /**
       * 查看关注的人动态
       * @param {Number} last 最后一位时间
       * @return {*} 关注的人动态
       */

    }, {
      key: 'getAttentionList',
      value: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(last) {
          var user, followings, followingIds, res;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  user = this.ctx.user;
                  followings = user.followings;
                  followingIds = [];

                  followings.forEach(function (e) {
                    followingIds.push(e.userId);
                  });
                  _context7.prev = 4;
                  _context7.next = 7;
                  return Circle.find({
                    userId: {
                      $in: followingIds
                    },
                    time: { $lt: last }
                  }, 'userId nickName headImage likeCount content images commentCount time').sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

                case 7:
                  res = _context7.sent;

                  console.log(res);
                  return _context7.abrupt('return', res);

                case 12:
                  _context7.prev = 12;
                  _context7.t0 = _context7['catch'](4);
                  throw new Error('SOMETHING_ERROR');

                case 15:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[4, 12]]);
        }));

        function getAttentionList(_x11) {
          return _ref7.apply(this, arguments);
        }

        return getAttentionList;
      }()

      /**
       * 查看动态
       * @param {Number} last 最后一位时间
       * @return {*} 动态
       */

    }, {
      key: 'getCircleList',
      value: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(last) {
          var res;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return Circle.find({ time: { $lt: last } }, 'userId nickName time headImage content images likeCount commentCount').sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

                case 3:
                  res = _context8.sent;
                  return _context8.abrupt('return', res);

                case 7:
                  _context8.prev = 7;
                  _context8.t0 = _context8['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[0, 7]]);
        }));

        function getCircleList(_x12) {
          return _ref8.apply(this, arguments);
        }

        return getCircleList;
      }()

      /**
       * 查看评论
       * @param {String} circleId 动态id
       * @return {*} 评论
       */

    }, {
      key: 'getComment',
      value: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(circleId) {
          var res;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.prev = 0;
                  _context9.next = 3;
                  return Circle.findById(circleId, 'comments').sort({
                    'comments.time': 'desc'
                  });

                case 3:
                  res = _context9.sent;
                  return _context9.abrupt('return', res);

                case 7:
                  _context9.prev = 7;
                  _context9.t0 = _context9['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context9.stop();
              }
            }
          }, _callee9, this, [[0, 7]]);
        }));

        function getComment(_x13) {
          return _ref9.apply(this, arguments);
        }

        return getComment;
      }()

      /**
       * 查看点赞列表
       * @param {String} circleId 内容id
       * @return {*} 点赞列表
       */

    }, {
      key: 'getLikeList',
      value: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(circleId) {
          var likeList;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.prev = 0;
                  _context10.next = 3;
                  return Circle.findById(circleId, 'likes').sort({
                    'likes.time': 'desc'
                  });

                case 3:
                  likeList = _context10.sent;
                  return _context10.abrupt('return', likeList);

                case 7:
                  _context10.prev = 7;
                  _context10.t0 = _context10['catch'](0);
                  throw new Error('GET_LIKE_LIST_ERROR');

                case 10:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, this, [[0, 7]]);
        }));

        function getLikeList(_x14) {
          return _ref10.apply(this, arguments);
        }

        return getLikeList;
      }()
    }]);

    return CircleService;
  }(app.Service);

  return CircleService;
};
//# sourceMappingURL=circle.js.map