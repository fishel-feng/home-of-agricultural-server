'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (app) {
  var _app$model = app.model,
      Question = _app$model.Question,
      User = _app$model.User,
      Tag = _app$model.Tag,
      Chat = _app$model.Chat;

  var PAGE_SIZE = 30;

  var QuestionService = function (_app$Service) {
    _inherits(QuestionService, _app$Service);

    function QuestionService() {
      _classCallCheck(this, QuestionService);

      return _possibleConstructorReturn(this, (QuestionService.__proto__ || Object.getPrototypeOf(QuestionService)).apply(this, arguments));
    }

    _createClass(QuestionService, [{
      key: 'addQuestion',


      /**
       * 新建问题
       * @param {String} title 标题
       * @param {String} content 内容
       * @param {String} tagName 分类标签名
       * @param {String} images 图片地址
       * @return {*} 问题详情数据
       */
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title, content, tagName, images) {
          var user, desc, tag, question;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  user = this.ctx.user;
                  _context.prev = 1;
                  desc = void 0;

                  if (content.length > 30) {
                    desc = content.slice(0, 30);
                  } else {
                    desc = content;
                  }
                  _context.next = 6;
                  return Tag.findOne({
                    tagName: tagName
                  });

                case 6:
                  tag = _context.sent;
                  _context.next = 9;
                  return new Question({
                    title: title,
                    content: content,
                    tag: tag,
                    images: images,
                    desc: desc,
                    userId: user._id,
                    nickName: user.nickName,
                    headImage: user.headImage,
                    location: user.location
                  }).save();

                case 9:
                  question = _context.sent;
                  _context.next = 12;
                  return User.findByIdAndUpdate(user._id, {
                    $inc: {
                      questionCount: 1
                    }
                  });

                case 12:
                  return _context.abrupt('return', {
                    question: question
                  });

                case 15:
                  _context.prev = 15;
                  _context.t0 = _context['catch'](1);
                  throw new Error('SOMETHING_ERROR');

                case 18:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 15]]);
        }));

        function addQuestion(_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        }

        return addQuestion;
      }()

      /**
       * 删除问题
       * @param {String} questionId 问题id
       * @return {*} 成功状态
       */

    }, {
      key: 'deleteQuestion',
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(questionId) {
          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  _context2.next = 3;
                  return Question.remove({
                    _id: questionId,
                    userId: this.ctx.user._id
                  });

                case 3:
                  res = _context2.sent;
                  _context2.next = 6;
                  return User.findByIdAndUpdate(this.ctx.user._id, {
                    $inc: {
                      questionCount: -1
                    }
                  });

                case 6:
                  if (!(res.result.n !== 1)) {
                    _context2.next = 8;
                    break;
                  }

                  throw new Error();

                case 8:
                  return _context2.abrupt('return', 'success');

                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 14:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[0, 11]]);
        }));

        function deleteQuestion(_x5) {
          return _ref2.apply(this, arguments);
        }

        return deleteQuestion;
      }()

      /**
       * 添加回答
       * @param {String} questionId 问题id
       * @param {String} content 内容
       * @param {String} images 图片地址
       * @return {*} 回答
       */

    }, {
      key: 'addAnswer',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(questionId, content, images) {
          var user, question, result;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  user = this.ctx.user;
                  _context3.prev = 1;
                  _context3.next = 4;
                  return Question.findById(questionId);

                case 4:
                  question = _context3.sent;
                  _context3.next = 7;
                  return Question.findByIdAndUpdate(questionId, {
                    $inc: {
                      count: 1,
                      answerCount: 1
                    },
                    $push: {
                      answers: {
                        _id: question.count + 1,
                        content: content,
                        userId: user._id,
                        nickName: user.nickName,
                        headImage: user.headImage,
                        certification: user.certification,
                        images: images
                      }
                    }
                  });

                case 7:
                  _context3.next = 9;
                  return User.findByIdAndUpdate(this.ctx.user._id, {
                    $push: {
                      answers: questionId
                    },
                    $inc: {
                      answerCount: 1
                    }
                  });

                case 9:
                  _context3.next = 11;
                  return Question.findById(questionId, 'answers');

                case 11:
                  result = _context3.sent;
                  return _context3.abrupt('return', result.answers.id(question.count + 1));

                case 15:
                  _context3.prev = 15;
                  _context3.t0 = _context3['catch'](1);
                  throw new Error('SOMETHING_ERROR');

                case 18:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[1, 15]]);
        }));

        function addAnswer(_x6, _x7, _x8) {
          return _ref3.apply(this, arguments);
        }

        return addAnswer;
      }()

      /**
       * 删除回答
       * @param {String} questionId 问题id
       * @param {Number} answerId 回答id
       * @return {*} 成功状态
       */

    }, {
      key: 'deleteAnswer',
      value: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(questionId, answerId) {
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return Question.update({
                    _id: questionId
                  }, {
                    $inc: {
                      answerCount: -1
                    },
                    $pull: {
                      answers: {
                        _id: answerId
                      }
                    }
                  });

                case 3:
                  res = _context4.sent;
                  _context4.next = 6;
                  return User.findByIdAndUpdate(this.ctx.user._id, {
                    $inc: {
                      answerCount: -1
                    }
                  });

                case 6:
                  if (!(res.nModified !== 1)) {
                    _context4.next = 8;
                    break;
                  }

                  throw new Error();

                case 8:
                  return _context4.abrupt('return', 'success');

                case 11:
                  _context4.prev = 11;
                  _context4.t0 = _context4['catch'](0);
                  throw new Error('DELETE_ERROR');

                case 14:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this, [[0, 11]]);
        }));

        function deleteAnswer(_x9, _x10) {
          return _ref4.apply(this, arguments);
        }

        return deleteAnswer;
      }()

      /**
       * 关注问题
       * @param {String} questionId 问题id
       * @return {*} 成功状态
       */

    }, {
      key: 'attentionQuestion',
      value: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(questionId) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return Question.findByIdAndUpdate(questionId, {
                    $push: {
                      attentions: this.ctx.user._id
                    }
                  });

                case 3:
                  _context5.next = 5;
                  return User.findByIdAndUpdate(this.ctx.user._id, {
                    $push: {
                      attentions: questionId
                    },
                    $inc: {
                      attentionCount: 1
                    }
                  });

                case 5:
                  return _context5.abrupt('return', 'success');

                case 8:
                  _context5.prev = 8;
                  _context5.t0 = _context5['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 11:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 8]]);
        }));

        function attentionQuestion(_x11) {
          return _ref5.apply(this, arguments);
        }

        return attentionQuestion;
      }()

      /**
       * 取消关注问题
       * @param {String} questionId 问题id
       * @return {*} 成功状态
       */

    }, {
      key: 'removeAttentionQuestion',
      value: function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(questionId) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.prev = 0;
                  _context6.next = 3;
                  return Question.findByIdAndUpdate(questionId, {
                    $pull: {
                      attentions: this.ctx.user._id
                    }
                  });

                case 3:
                  _context6.next = 5;
                  return User.findByIdAndUpdate(this.ctx.user._id, {
                    $pull: {
                      attentions: questionId
                    },
                    $inc: {
                      attentionCount: -1
                    }
                  });

                case 5:
                  return _context6.abrupt('return', 'success');

                case 8:
                  _context6.prev = 8;
                  _context6.t0 = _context6['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 11:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this, [[0, 8]]);
        }));

        function removeAttentionQuestion(_x12) {
          return _ref6.apply(this, arguments);
        }

        return removeAttentionQuestion;
      }()

      /**
       * 获取专家列表
       * @param {String} tag 标签
       * @return {*} 专家列表
       */

    }, {
      key: 'getExpertList',
      value: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(tag) {
          var experts;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.prev = 0;
                  _context7.next = 3;
                  return User.find({
                    certification: tag
                  }, '_id nickName headImage description certification');

                case 3:
                  experts = _context7.sent;
                  return _context7.abrupt('return', experts);

                case 7:
                  _context7.prev = 7;
                  _context7.t0 = _context7['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context7.stop();
              }
            }
          }, _callee7, this, [[0, 7]]);
        }));

        function getExpertList(_x13) {
          return _ref7.apply(this, arguments);
        }

        return getExpertList;
      }()

      /**
       * 分类获取问题列表
       * @param {String} tag 标签
       * @param {String} last 最后时间
       * @return {*} 问题列表
       */

    }, {
      key: 'getQuestionList',
      value: function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(tag, last) {
          var res;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return Question.find({
                    'tag.tagId': tag,
                    time: { $lt: last }
                  }, '_id desc title images finishState answerCount tag time userId').sort({
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

        function getQuestionList(_x14, _x15) {
          return _ref8.apply(this, arguments);
        }

        return getQuestionList;
      }()

      /**
       * 获取全部问题列表
       * @param {String} last 最后时间
       * @return {*} 问题列表
       */

    }, {
      key: 'getAllQuestionList',
      value: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(last) {
          var res;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.prev = 0;
                  _context9.next = 3;
                  return Question.find({
                    time: { $lt: last }
                  }, '_id desc title images finishState answerCount tag time userId').sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

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

        function getAllQuestionList(_x16) {
          return _ref9.apply(this, arguments);
        }

        return getAllQuestionList;
      }()

      /**
       * 获取问题详情
       * @param {String} id 问题id
       * @return {*} 问题列表
       */

    }, {
      key: 'getQuestion',
      value: function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(id) {
          var res;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.prev = 0;
                  _context10.next = 3;
                  return Question.findById(id);

                case 3:
                  res = _context10.sent;
                  return _context10.abrupt('return', res);

                case 7:
                  _context10.prev = 7;
                  _context10.t0 = _context10['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context10.stop();
              }
            }
          }, _callee10, this, [[0, 7]]);
        }));

        function getQuestion(_x17) {
          return _ref10.apply(this, arguments);
        }

        return getQuestion;
      }()

      /**
       * 获取问题标签
       * @return {*} 问题标签
       */

    }, {
      key: 'getTags',
      value: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
          var res;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  _context11.prev = 0;
                  _context11.next = 3;
                  return Tag.find({});

                case 3:
                  res = _context11.sent;
                  return _context11.abrupt('return', res);

                case 7:
                  _context11.prev = 7;
                  _context11.t0 = _context11['catch'](0);
                  throw new Error('SOMETHING_ERROR');

                case 10:
                case 'end':
                  return _context11.stop();
              }
            }
          }, _callee11, this, [[0, 7]]);
        }));

        function getTags() {
          return _ref11.apply(this, arguments);
        }

        return getTags;
      }()
    }, {
      key: 'getChat',
      value: function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(chatId, last) {
          var messages;
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.prev = 0;
                  _context12.next = 3;
                  return Chat.find({
                    chatId: chatId,
                    time: { $lt: last }
                  }).sort({
                    time: 'desc'
                  }).limit(PAGE_SIZE).exec();

                case 3:
                  messages = _context12.sent;
                  return _context12.abrupt('return', messages.reverse());

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

        function getChat(_x18, _x19) {
          return _ref12.apply(this, arguments);
        }

        return getChat;
      }()
    }]);

    return QuestionService;
  }(app.Service);

  return QuestionService;
};
//# sourceMappingURL=question.js.map