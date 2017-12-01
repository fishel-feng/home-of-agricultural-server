'use strict';

module.exports = app => {
  const {
    Circle,
    User,
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
     * @param {String} circleId 内容id
     * @return {*} 成功状态
     */
    async deleteCircle(circleId) {
      try {
        const res = await Circle.remove({
          _id: circleId,
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
     * @param {String} circleId 内容id
     * @param {String} content 内容
     * @return {*} 成功状态
     */
    async addComment(circleId, content) {
      const user = this.ctx.user;
      try {
        await Circle.update({
          _id: circleId,
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

    /**
     * 点赞
     * @param {String} circleId 内容id
     * @return {*} 成功状态
     */
    async giveLike(circleId) {
      const user = this.ctx.user;
      user.likes.forEach(element => {
        if (element.circleId === circleId) {
          throw new Error('REPEAT_LIKE');
        }
      });
      try {
        await User.update({
          _id: user._id,
        }, {
          $push: {
            likes: {
              circleId,
            },
          },
        });
        await Circle.update({
          _id: circleId,
        }, {
          $push: {
            likes: {
              userId: user._id,
              nickName: user.nickName,
              HeadImage: user.HeadImage,
            },
          },
          $inc: {
            likeCount: 1,
          },
        });
        return 'success';
      } catch (e) {
        throw new Error('GIVE_LIKE_ERROR');
      }
    }

    /**
     * 取消赞
     * @param {String} circleId 内容id
     * @return {*} 成功状态
     */
    async cancelLike(circleId) {
      const user = this.ctx.user;
      try {
        const res = await Circle.update({
          _id: circleId,
          'likes.userId': user._id,
        }, {
          $pull: {
            likes: {
              userId: user._id,
            },
          },
          $inc: {
            likeCount: -1,
          },
        });
        if (!res.n) {
          throw new Error();
        }
        await User.update({
          _id: user._id,
        }, {
          $pull: {
            likes: {
              circleId,
            },
          },
        });
        return 'success';
      } catch (e) {
        throw new Error('CANCEL_LIKE_ERROR');
      }
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

    async getLikeList(circleId) {
      try {
        const likeList = await Circle.findById(circleId, 'likes');
        return likeList;
      } catch (e) {
        throw new Error('GET_LIKE_LIST_ERROR');
      }
    }
  }
  return CircleService;
};