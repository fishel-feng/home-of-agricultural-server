'use strict';

module.exports = app => {
  const {
    Circle,
  } = app.model;
  class CircleService extends app.Service {
    /**
     * 发表动态
     * @param {String} content 文本内容
     * @param {String} images 图片地址
     * @return {*} 动态详情数据
     */
    async addCircle(content, images) {
      try {
        const circle = await new Circle({
          content,
          images,
          userId: this.ctx.user._id,
        }).save();
        return {
          circle,
        };
      } catch (e) {
        throw new Error('ADD_CIRCLE_ERROR');
      }
    }
    async deleteCircle(id) {
      try {
        const res = await Circle.remove({
          _id: id,
          userId: this.ctx.user._id,
        });
        if (res.result.n !== 1) {
          throw new Error();
        }
        return 'success';
      } catch (e) {
        throw new Error('DELETE_CIRCLE_ERROR');
      }
    }
    async addComment() {
      // 添加评论 内容 用户 评论的文章id
    }
    async addInnerComment() {
      //
    }
    async deleteComment() {
      //
    }
    async deleteInnerComment() {
      //
    }
    async giveLike() {
      //
    }
    async cancelLike() {
      //
    }
    async getCircleList() {
      await Circle.find();
      // todo
    }
    async getComment() {
      //
    }
    async getInnerComment() {
      //
    }
    async getLikeList() {
      //
    }
  }
  return CircleService;
};