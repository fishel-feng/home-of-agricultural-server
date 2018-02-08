'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

module.exports = function (_Controller) {
  _inherits(CircleController, _Controller);

  function CircleController() {
    _classCallCheck(this, CircleController);

    return _possibleConstructorReturn(this, (CircleController.__proto__ || Object.getPrototypeOf(CircleController)).apply(this, arguments));
  }

  _createClass(CircleController, [{
    key: 'addCircle',


    /**
     * 发表动态
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ctx$request$body, content, images, circle;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.ctx.validate({
                  content: 'string',
                  images: 'array'
                });
                _ctx$request$body = this.ctx.request.body, content = _ctx$request$body.content, images = _ctx$request$body.images;
                _context.next = 4;
                return this.service.circle.addCircle(content, images);

              case 4:
                circle = _context.sent;

                this.ctx.body = circle;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addCircle() {
        return _ref.apply(this, arguments);
      }

      return addCircle;
    }()

    /**
     * 删除动态
     */

  }, {
    key: 'deleteCircle',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var circleId, status;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.ctx.validate({
                  circleId: 'string'
                });
                circleId = this.ctx.request.body.circleId;
                _context2.next = 4;
                return this.service.circle.deleteCircle(circleId);

              case 4:
                status = _context2.sent;

                this.ctx.body = status;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deleteCircle() {
        return _ref2.apply(this, arguments);
      }

      return deleteCircle;
    }()

    /**
     * 添加评论
     */

  }, {
    key: 'addComment',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _ctx$request$body2, circleId, content, targetId, comment;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.ctx.validate({
                  circleId: 'string',
                  content: 'string',
                  targetId: {
                    type: 'string',
                    required: false,
                    allowEmpty: true
                  }
                });
                _ctx$request$body2 = this.ctx.request.body, circleId = _ctx$request$body2.circleId, content = _ctx$request$body2.content, targetId = _ctx$request$body2.targetId;
                _context3.next = 4;
                return this.service.circle.addComment(circleId, content, targetId);

              case 4:
                comment = _context3.sent;

                this.ctx.body = comment;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addComment() {
        return _ref3.apply(this, arguments);
      }

      return addComment;
    }()

    /**
     * 删除评论
     */

  }, {
    key: 'deleteComment',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ctx$request$body3, circleId, commentId, status;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.ctx.validate({
                  circleId: 'string',
                  commentId: 'integer'
                });
                _ctx$request$body3 = this.ctx.request.body, circleId = _ctx$request$body3.circleId, commentId = _ctx$request$body3.commentId;
                _context4.next = 4;
                return this.service.circle.deleteComment(circleId, commentId);

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

      function deleteComment() {
        return _ref4.apply(this, arguments);
      }

      return deleteComment;
    }()

    /**
     * 点赞
     */

  }, {
    key: 'giveLike',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var circleId, status;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.ctx.validate({
                  circleId: 'string'
                });
                circleId = this.ctx.request.body.circleId;
                _context5.next = 4;
                return this.service.circle.giveLike(circleId);

              case 4:
                status = _context5.sent;

                this.ctx.body = status;

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function giveLike() {
        return _ref5.apply(this, arguments);
      }

      return giveLike;
    }()

    /**
     * 取消赞
     */

  }, {
    key: 'cancelLike',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var circleId, status;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.ctx.validate({
                  circleId: 'string'
                });
                circleId = this.ctx.request.body.circleId;
                _context6.next = 4;
                return this.service.circle.cancelLike(circleId);

              case 4:
                status = _context6.sent;

                this.ctx.body = status;

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function cancelLike() {
        return _ref6.apply(this, arguments);
      }

      return cancelLike;
    }()

    /**
     * 查看关注的人动态
     */

  }, {
    key: 'getAttentionList',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var last, result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                last = this.ctx.params.last;
                _context7.next = 3;
                return this.service.circle.getAttentionList(last);

              case 3:
                result = _context7.sent;

                this.ctx.body = {
                  circleList: result
                };

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getAttentionList() {
        return _ref7.apply(this, arguments);
      }

      return getAttentionList;
    }()

    /**
     * 查看动态
     */

  }, {
    key: 'getCircleList',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var last, result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                last = this.ctx.params.last;
                _context8.next = 3;
                return this.service.circle.getCircleList(last);

              case 3:
                result = _context8.sent;

                this.ctx.body = {
                  circleList: result
                };

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getCircleList() {
        return _ref8.apply(this, arguments);
      }

      return getCircleList;
    }()

    /**
     * 查看评论
     */

  }, {
    key: 'getComment',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var circleId, result;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                circleId = this.ctx.params.circleId;
                _context9.next = 3;
                return this.service.circle.getComment(circleId);

              case 3:
                result = _context9.sent;

                this.ctx.body = result;

              case 5:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getComment() {
        return _ref9.apply(this, arguments);
      }

      return getComment;
    }()

    /**
     * 查看点赞列表
     */

  }, {
    key: 'getLikeList',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var circleId, result;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                circleId = this.ctx.params.circleId;
                _context10.next = 3;
                return this.service.circle.getLikeList(circleId);

              case 3:
                result = _context10.sent;

                this.ctx.body = result;

              case 5:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getLikeList() {
        return _ref10.apply(this, arguments);
      }

      return getLikeList;
    }()
  }]);

  return CircleController;
}(Controller);
//# sourceMappingURL=circle.js.map