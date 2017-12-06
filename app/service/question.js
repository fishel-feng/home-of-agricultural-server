'use strict';

module.exports = app => {
  const {
    Question,
    User,
  } = app.model;
  class QuestionService extends app.Service {

    /**
     * 发表动态
     * @param {String} title 标题
     * @param {String} content 内容
     * @param {String} tags 分类标签
     * @param {String} images 图片地址
     * @return {*} 问题详情数据
     */
    async addQuestion(title, content, tags, images) {
      const user = this.ctx.user;
      try {
        const question = await new Question({
          title,
          content,
          tags,
          images,
          userId: user._id,
          nickName: user.nickName,
          headImage: user.headImage,
        }).save();
        return {
          question,
        };
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    async deleteQuestion() {
      //
    }
    async addAnswer() {
      //
    }
    async deleteAnswer() {
      //
    }
    async acceptAnswer() {
      //
    }
    async getExpertList() {
      //
    }
    async getQuestionList() {
      //
    }
  }
  return QuestionService;
};
