'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('egg').Controller;

var QuestionController = function (_Controller) {
  _inherits(QuestionController, _Controller);

  function QuestionController() {
    _classCallCheck(this, QuestionController);

    return _possibleConstructorReturn(this, (QuestionController.__proto__ || Object.getPrototypeOf(QuestionController)).apply(this, arguments));
  }

  _createClass(QuestionController, [{
    key: 'addQuestion',


    /**
     * 新建问题
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ctx$request$body, title, content, tag, images, question;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.ctx.validate({
                  title: 'string',
                  content: 'string',
                  tag: 'string',
                  images: 'array'
                });
                _ctx$request$body = this.ctx.request.body, title = _ctx$request$body.title, content = _ctx$request$body.content, tag = _ctx$request$body.tag, images = _ctx$request$body.images;
                _context.next = 4;
                return this.service.question.addQuestion(title, content, tag, images);

              case 4:
                question = _context.sent;

                this.ctx.body = question;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addQuestion() {
        return _ref.apply(this, arguments);
      }

      return addQuestion;
    }()

    /**
     * 删除问题
     */

  }, {
    key: 'deleteQuestion',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var questionId, status;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.ctx.validate({
                  questionId: 'string'
                });
                questionId = this.ctx.request.body.questionId;
                // TODO 删除图片

                _context2.next = 4;
                return this.service.question.deleteQuestion(questionId);

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

      function deleteQuestion() {
        return _ref2.apply(this, arguments);
      }

      return deleteQuestion;
    }()

    /**
     * 添加回答
     */

  }, {
    key: 'addAnswer',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var parts, images, _parts$field, questionId, content, answer;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                parts = this.ctx.multipart({
                  autoFields: true
                });
                _context3.next = 3;
                return this.service.upload.upload(parts, 'answer');

              case 3:
                images = _context3.sent;
                _parts$field = parts.field, questionId = _parts$field.questionId, content = _parts$field.content;
                _context3.next = 7;
                return this.service.question.addAnswer(questionId, content, images);

              case 7:
                answer = _context3.sent;

                this.ctx.body = answer;

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addAnswer() {
        return _ref3.apply(this, arguments);
      }

      return addAnswer;
    }()

    /**
     * 删除回答
     */

  }, {
    key: 'deleteAnswer',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _ctx$request$body2, questionId, answerId, status;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.ctx.validate({
                  questionId: 'string',
                  answerId: 'integer'
                });
                _ctx$request$body2 = this.ctx.request.body, questionId = _ctx$request$body2.questionId, answerId = _ctx$request$body2.answerId;
                _context4.next = 4;
                return this.service.question.deleteAnswer(questionId, answerId);

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

      function deleteAnswer() {
        return _ref4.apply(this, arguments);
      }

      return deleteAnswer;
    }()

    /**
     * 采纳答案
     */

  }, {
    key: 'acceptAnswer',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _ctx$request$body3, questionId, answerId, status;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.ctx.validate({
                  questionId: 'string',
                  answerId: 'integer'
                });
                _ctx$request$body3 = this.ctx.request.body, questionId = _ctx$request$body3.questionId, answerId = _ctx$request$body3.answerId;
                _context5.next = 4;
                return this.service.question.acceptAnswer(questionId, answerId);

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

      function acceptAnswer() {
        return _ref5.apply(this, arguments);
      }

      return acceptAnswer;
    }()

    /**
     * 获取专家列表
     */

  }, {
    key: 'getExpertList',
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

      function getExpertList() {
        return _ref6.apply(this, arguments);
      }

      return getExpertList;
    }()
  }, {
    key: 'getQuestionList',


    /**
     * 分类获取问题列表
     */
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var tag, last, questions;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                tag = this.ctx.params.tag;
                last = this.ctx.params.last;
                _context7.next = 4;
                return this.service.question.getQuestionList(tag, last);

              case 4:
                questions = _context7.sent;

                this.ctx.body = {
                  questions: questions
                };

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getQuestionList() {
        return _ref7.apply(this, arguments);
      }

      return getQuestionList;
    }()

    /**
     * 获取全部问题列表
     */

  }, {
    key: 'getAllQuestionList',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var last, questions;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                last = this.ctx.params.last;
                _context8.next = 3;
                return this.service.question.getAllQuestionList(last);

              case 3:
                questions = _context8.sent;

                this.ctx.body = {
                  questions: questions
                };

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getAllQuestionList() {
        return _ref8.apply(this, arguments);
      }

      return getAllQuestionList;
    }()

    /**
     * 查看问题详情
     */

  }, {
    key: 'getQuestion',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var id, result;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                id = this.ctx.params.questionId;
                _context9.next = 3;
                return this.service.question.getQuestion(id);

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

      function getQuestion() {
        return _ref9.apply(this, arguments);
      }

      return getQuestion;
    }()

    /**
     * 获取问题标签
     */

  }, {
    key: 'getTags',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var tags;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.service.question.getTags();

              case 2:
                tags = _context10.sent;

                this.ctx.body = tags;

              case 4:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getTags() {
        return _ref10.apply(this, arguments);
      }

      return getTags;
    }()
  }]);

  return QuestionController;
}(Controller);

module.exports = QuestionController;
//# sourceMappingURL=question.js.map