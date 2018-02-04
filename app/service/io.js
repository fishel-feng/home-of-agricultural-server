'use strict';

module.exports = app => {
  const SOCKET = 'SOCKET';
  const MESSAGE = 'MESSAGE';
  const {
    User,
    Question,
    Circle,
  } = app.model;
  class IOService extends app.Service {

    /**
     * 登录
     * @param {String} token token
     * @return {Promise<void>} id
     */
    async login(token) {
      const userId = this.getUserId(token);
      const socketId = this.ctx.socket.id;
      await app.redis.set(SOCKET + userId, socketId);
      return socketId;
    }

    async chat(to, message) {
      // todo
      const userId = '5a16699d5e58179af45247d0';
      const targetSocketId = await app.redis.get(SOCKET + to);
      if (targetSocketId) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('message', userId, message);
      }
    }

    /**
     * 点赞
     * @param {String} userToken token
     * @param {String} targetId 被赞的人id
     * @param {String} circleId 动态id
     */
    async like(userToken, targetId, circleId) {
      const userId = this.getUserId(userToken);
      const user = await User.findById(userId);
      const content = { userId, nickName: user.nickName, circleId, time: Date.now() };
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('like', content);
      } else {
        await app.redis.rpush(MESSAGE + targetId, JSON.stringify({ type: 'like', content }));
      }
    }

    /**
     * 评论
     * @param {String} userToken token
     * @param {String} circleId 动态id
     * @param {String} targetId 被评论的人id
     */
    async comment(userToken, circleId, targetId) {
      const userId = this.getUserId(userToken);
      const user = await User.findById(userId);
      const content = { userId, nickName: user.nickName, circleId, time: Date.now() };
      const circle = await Circle.findById(circleId);
      const authorId = circle.userId;
      const authorSocketId = await app.redis.get(SOCKET + authorId);
      if (authorSocketId) {
        this.ctx.socket.nsp.sockets[authorSocketId].emit('comment', content);
      } else {
        await app.redis.rpush(MESSAGE + authorId, JSON.stringify({ type: 'comment', content }));
      }
      if (targetId) {
        const targetSocketId = await app.redis.get(SOCKET + targetId);
        if (targetSocketId) {
          this.ctx.socket.nsp.sockets[targetSocketId].emit('reply', content);
        } else {
          await app.redis.rpush(MESSAGE + targetId, JSON.stringify({ type: 'reply', content }));
        }
      }
    }

    /**
     * 回答
     * @param {String} userToken token
     * @param {String} questionId 问题id
     */
    async answer(userToken, questionId) {
      const userId = this.getUserId(userToken);
      const user = await User.findById(userId);
      const question = await Question.findById(questionId);
      const attentions = question.attentions;
      const content = { userId, nickName: user.nickName, questionId: question._id, title: question.title, time: Date.now() };
      const authorId = question.userId;
      const authorSocketId = await app.redis.get(SOCKET + authorId);
      if (authorSocketId) {
        this.ctx.socket.nsp.sockets[authorSocketId].emit('answer', content);
      } else {
        await app.redis.rpush(MESSAGE + authorId, JSON.stringify({ type: 'answer', content }));
      }
      attentions.forEach(async id => {
        const socketId = await app.redis.get(SOCKET + id);
        if (socketId) {
          this.ctx.socket.nsp.sockets[socketId].emit('attention', content);
        } else {
          await app.redis.rpush(MESSAGE + id, JSON.stringify({ type: 'attention', content }));
        }
      });
    }

    /**
     * 邀请回答
     * @param {String} userToken token
     * @param {String} expertId 专家id
     * @param {String} questionId 问题id
     */
    async invite(userToken, expertId, questionId) {
      const userId = this.getUserId(userToken);
      const user = await User.findById(userId);
      const question = await Question.findById(questionId);
      const content = { userId, nickName: user.nickName, questionId: question._id, title: question.title, time: Date.now() };
      const expertSocketId = await app.redis.get(SOCKET + expertId);
      if (expertSocketId) {
        this.ctx.socket.nsp.sockets[expertSocketId].emit('invite', content);
      } else {
        await app.redis.rpush(MESSAGE + expertId, JSON.stringify({ type: 'invite', content }));
      }
    }

    /**
     * 关注用户
     * @param {String} userToken token
     * @param {String} targetId 被关注的人id
     */
    async follow(userToken, targetId) {
      const userId = this.getUserId(userToken);
      const user = await User.findById(userId);
      const content = { userId, nickName: user.nickName, time: Date.now() };
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('follow', content);
      } else {
        await app.redis.rpush(MESSAGE + targetId, JSON.stringify({ type: 'follow', content }));
      }
    }

    /**
     * 从token中获取id
     * @param {String} token token
     * @return {String} userId 用户id
     */
    getUserId(token) {
      return this.ctx.app.jwt.verify(token, '123456').userId;
    }
  }
  return IOService;
};
