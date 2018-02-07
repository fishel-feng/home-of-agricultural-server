'use strict';

module.exports = app => {
  const {
    Question,
    User,
    Tag,
    Chat,
  } = app.model;
  const PAGE_SIZE = 30;
  class QuestionService extends app.Service {

    /**
     * 新建问题
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} tagName 分类标签名
     * @param {String} images 图片地址
     * @return {*} 问题详情数据
     */
    async addQuestion(title, content, tagName, images) {
      const user = this.ctx.user;
      try {
        let desc;
        if (content.length > 30) {
          desc = content.slice(0, 30);
        } else {
          desc = content;
        }
        const tag = await Tag.findOne({
          tagName,
        });
        const question = await new Question({
          title,
          content,
          tag,
          images,
          desc,
          userId: user._id,
          nickName: user.nickName,
          headImage: user.headImage,
          location: user.location,
        }).save();
        await User.findByIdAndUpdate(user._id, {
          $inc: {
            questionCount: 1,
          },
        });
        return {
          question,
        };
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 删除问题
     * @param {String} questionId 问题id
     * @return {*} 成功状态
     */
    async deleteQuestion(questionId) {
      try {
        const res = await Question.remove({
          _id: questionId,
          userId: this.ctx.user._id,
        });
        await User.findByIdAndUpdate(this.ctx.user._id, {
          $inc: {
            questionCount: -1,
          },
        });
        if (res.result.n !== 1) {
          throw new Error();
        }
        return 'success';
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 添加回答
     * @param {String} questionId 问题id
     * @param {String} content 内容
     * @param {String} images 图片地址
     * @return {*} 回答
     */
    async addAnswer(questionId, content, images) {
      const user = this.ctx.user;
      try {
        const question = await Question.findById(questionId);
        await Question.findByIdAndUpdate(questionId, {
          $inc: {
            count: 1,
            answerCount: 1,
          },
          $push: {
            answers: {
              _id: question.count + 1,
              content,
              userId: user._id,
              nickName: user.nickName,
              headImage: user.headImage,
              certification: user.certification,
              images,
            },
          },
        });
        await User.findByIdAndUpdate(this.ctx.user._id, {
          $push: {
            answers: questionId,
          },
          $inc: {
            answerCount: 1,
          },
        });
        const result = await Question.findById(questionId, 'answers');
        return result.answers.id(question.count + 1);
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 删除回答
     * @param {String} questionId 问题id
     * @param {Number} answerId 回答id
     * @return {*} 成功状态
     */
    async deleteAnswer(questionId, answerId) {
      try {
        const res = await Question.update({
          _id: questionId,
        }, {
          $inc: {
            answerCount: -1,
          },
          $pull: {
            answers: {
              _id: answerId,
            },
          },
        });
        await User.findByIdAndUpdate(this.ctx.user._id, {
          $inc: {
            answerCount: -1,
          },
        });
        if (res.nModified !== 1) {
          throw new Error();
        }
        return 'success';
      } catch (e) {
        throw new Error('DELETE_ERROR');
      }
    }

    /**
     * 关注问题
     * @param {String} questionId 问题id
     * @return {*} 成功状态
     */
    async attentionQuestion(questionId) {
      try {
        await Question.findByIdAndUpdate(questionId, {
          $push: {
            attentions: this.ctx.user._id,
          },
        });
        await User.findByIdAndUpdate(this.ctx.user._id, {
          $push: {
            attentions: questionId,
          },
          $inc: {
            attentionCount: 1,
          },
        });
        return 'success';
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 取消关注问题
     * @param {String} questionId 问题id
     * @return {*} 成功状态
     */
    async removeAttentionQuestion(questionId) {
      try {
        await Question.findByIdAndUpdate(questionId, {
          $pull: {
            attentions: this.ctx.user._id,
          },
        });
        await User.findByIdAndUpdate(this.ctx.user._id, {
          $pull: {
            attentions: questionId,
          },
          $inc: {
            attentionCount: -1,
          },
        });
        return 'success';
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 获取专家列表
     * @param {String} tag 标签
     * @return {*} 专家列表
     */
    async getExpertList(tag) {
      try {
        const experts = await User.find({
          certification: tag,
        }, '_id nickName headImage description certification');
        return experts;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 分类获取问题列表
     * @param {String} tag 标签
     * @param {String} last 最后时间
     * @return {*} 问题列表
     */
    async getQuestionList(tag, last) {
      try {
        const res = await Question.find({
          'tag.tagId': tag,
          time: { $lt: last },
        }, '_id desc title images finishState answerCount tag time userId').sort({
          time: 'desc',
        }).limit(PAGE_SIZE)
          .exec();
        return res;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 获取全部问题列表
     * @param {String} last 最后时间
     * @return {*} 问题列表
     */
    async getAllQuestionList(last) {
      try {
        const res = await Question.find({
          time: { $lt: last },
        }, '_id desc title images finishState answerCount tag time userId').sort({
          time: 'desc',
        }).limit(PAGE_SIZE)
          .exec();
        return res;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 获取问题详情
     * @param {String} id 问题id
     * @return {*} 问题列表
     */
    async getQuestion(id) {
      try {
        const res = await Question.findById(id);
        return res;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 获取问题标签
     * @return {*} 问题标签
     */
    async getTags() {
      try {
        const res = await Tag.find({});
        return res;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    async saveTags(tags) {
      try {
        await User.findByIdAndUpdate(this.ctx.user._id, {
          tags,
        });
        return 'success';
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    async getChat(chatId, last) {
      try {
        const messages = await Chat.find({
          chatId,
          time: { $lt: last },
        }).sort({
          time: 'desc',
        }).limit(PAGE_SIZE)
          .exec();
        return messages.reverse();
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }
  }
  return QuestionService;
};
