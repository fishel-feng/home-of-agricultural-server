'use strict';

module.exports = app => {
  const {
    Circle,
    User,
  } = app.model;
  const PAGE_SIZE = 30;
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
          headImage: user.headImage,
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
     * @param {String} targetId 目标用户id
     * @return {*} 评论信息
     */
    async addComment(circleId, content, targetId) {
      const user = this.ctx.user;
      try {
        const circle = await Circle.findById(circleId);
        let targetName;
        if (targetId) {
          const targetUser = await User.findById(targetId, 'nickName');
          targetName = targetUser.nickName;
        }
        await Circle.findByIdAndUpdate(circleId, {
          $inc: {
            count: 1,
            commentCount: 1,
          },
          $push: {
            comments: {
              _id: circle.count + 1,
              content,
              userId: user._id,
              nickName: user.nickName,
              headImage: user.headImage,
              targetId,
              targetName,
            },
          },
        });
        const result = await Circle.findById(circleId, 'comments');
        return result.comments.id(circle.count + 1);
      } catch (e) {
        throw new Error('ADD_COMMENT_ERROR');
      }
    }

    /**
     * 删除评论
     * @param {String} circleId 内容id
     * @param {String} commentId 评论id
     * @return {*} 评论信息
     */
    async deleteComment(circleId, commentId) {
      try {
        const res = await Circle.update({
          _id: circleId,
        }, {
          $inc: {
            commentCount: -1,
          },
          $pull: {
            comments: {
              _id: commentId,
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
            likes: circleId,
          },
        });
        await Circle.update({
          _id: circleId,
        }, {
          $push: {
            likes: {
              userId: user._id,
              nickName: user.nickName,
              headImage: user.headImage,
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
            likes: user._id,
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
            likes: circleId,
          },
        });
        return 'success';
      } catch (e) {
        throw new Error('CANCEL_LIKE_ERROR');
      }
    }

    /**
     * 查看关注的人动态
     * @param {Number} last 最后一位时间
     * @return {*} 关注的人动态
     */
    async getAttentionList(last) {
      const user = this.ctx.user;
      const followings = user.followings;
      const followingIds = [];
      followings.forEach(e => {
        followingIds.push(e.userId);
      });
      try {
        const res = await Circle.find({
          userId: {
            $in: followingIds,
          },
          time: { $lt: last },
        }, 'userId nickName headImage likeCount content images commentCount time').sort({
          time: 'desc',
        }).limit(PAGE_SIZE)
          .exec();
        console.log(res);
        return res;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 查看动态
     * @param {Number} last 最后一位时间
     * @return {*} 动态
     */
    async getCircleList(last) {
      try {
        const res = await Circle.find({ time: { $lt: last } }, 'userId nickName time headImage content images likeCount commentCount').sort({
          time: 'desc',
        }).limit(PAGE_SIZE)
          .exec();
        return res;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 查看评论
     * @param {String} circleId 动态id
     * @return {*} 评论
     */
    async getComment(circleId) {
      try {
        const res = await Circle.findById(circleId, 'comments').sort({
          'comments.time': 'desc',
        });
        return res;
      } catch (e) {
        throw new Error('SOMETHING_ERROR');
      }
    }

    /**
     * 查看点赞列表
     * @param {String} circleId 内容id
     * @return {*} 点赞列表
     */
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
