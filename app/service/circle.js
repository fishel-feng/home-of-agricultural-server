'use strict';

module.exports = app => {
  const {
    Circle,
  } = app.model;
  class CircleService extends app.Service {

    async addCircle() {
      // 添加圈子记录逻辑
      // 参数 内容 用户 插入数据库
      // 成功提示成功信息 失败返回失败数据
    }
    async deleteCircle(id, userId) {
      // 删除圈子，传入id，删之
      try {
        await Circle.remove({
          _id: app.mongoose.Types.ObjectId(id),
          userId,
        });
        return {
          // todo
        };
      } catch (e) {
        throw new Error('NOT_FOUND');
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
