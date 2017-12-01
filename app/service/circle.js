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
      const user = this.ctx.user;
      try {
        const circle = await new Circle({
          content,
          images,
          userId: user._id,
          nickName: user.nickName,
          HeadImage: user.HeadImage,
        }).save();
        return {
          circle,
        };
      } catch (e) {
        throw new Error('ADD_CIRCLE_ERROR');
      }
    }
    /**
     * 删除动态
     * @param {String} id 内容id
     * @return {*} 成功状态
     */
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
    /**
     * 添加评论
     * @param {String} id 内容id
     * @param {String} content 内容
     * @return {*} 成功状态
     */
    async addComment(id, content) {
      const user = this.ctx.user;
      try {
        await Circle.update({
          _id: id,
        }, {
          $push: {
            comments: {
              content,
              userId: user._id,
              nickName: user.nickName,
              HeadImage: user.HeadImage,
            },
          },
        });
        return 'success';
      } catch (e) {
        throw new Error('ADD_COMMENT_ERROR');
      }
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