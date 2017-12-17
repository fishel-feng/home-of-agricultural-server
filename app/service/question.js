'use strict';

module.exports = app => {
  const {
    Question,
    User,
  } = app.model;
  const PAGE_SIZE = 20;
  class QuestionService extends app.Service {

    /**
     * 新建问题
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} tags 分类标签
     * @param {String} images 图片地址
     * @return {*} 问题详情数据
     */
    async addQuestion(title, content, tags, images) {
      const user = this.ctx.user;
      try {
        // todo 无图
        let desc;
        if (content.length > 30) {
          desc = content.slice(0, 30);
        } else {
          desc = content;
        }
        const question = await new Question({
          title,
          content,
          tags,
          images,
          desc,
          userId: user._id,
          nickName: user.nickName,
          headImage: user.headImage,
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
        if (res.nModified !== 1) {
          throw new Error();
        }
        return 'success';
      } catch (e) {
        throw new Error('DELETE_ERROR');
      }
    }

    /**
     * 采纳答案
     * @param {String} questionId 问题id
     * @param {Number} answerId 回答id
     * @return {*} 成功状态
     */
    async acceptAnswer(questionId, answerId) {
      try {
        const res = await Question.update({
          _id: questionId,
          'answers._id': answerId,
        }, {
          $set: {
            'answers.$._id': 0,
          },
        });
        if (res.nModified !== 1) {
          throw new Error();
        }
        console.log(res);
        return 'success';
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    async getExpertList() {
      //
    }

    /**
     * 获取问题列表
     * @param {String} page 页码
     * @return {*} 问题列表
     */
    async getQuestionList(page) {
      try {
        const res = await Question.find({}, '_id desc title content images finishState answerCount').sort({
          time: 'desc',
        }).skip(page * PAGE_SIZE)
          .limit(PAGE_SIZE)
          .exec();
        return res;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }
  }
  return QuestionService;
};
