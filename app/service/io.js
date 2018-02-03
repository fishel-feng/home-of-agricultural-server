'use strict';

module.exports = app => {
  const SOCKET = 'SOCKET';
  const MESSAGE = 'MESSAGE';
  const {
    User,
    Question,
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

    async like(userToken, targetId) {
      const userId = this.getUserId(userToken);
      const user = await User.findById(userId);
      const content = { userId, nickName: user.nickName, time: Date.now() };
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('like', content);
      } else {
        await app.redis.rpush(MESSAGE + targetId, JSON.stringify({ type: 'like', content }));
      }
    }

    async comment(userToken, circleId, targetId) {
      const userId = this.getUserId(userToken);
      // todo
    }

    async answer(questionId) {
      const question = await Question.findById(questionId);
      const attentions = question.attentions;
      const content = { questionId: question._id, title: question.title, time: Date.now() };
      const userId = question.userId;
      const authorSocketId = await app.redis.get(SOCKET + userId);
      if (authorSocketId) {
        this.ctx.socket.nsp.sockets[authorSocketId].emit('answer', content);
      } else {
        await app.redis.rpush(MESSAGE + userId, JSON.stringify({ type: 'answer', content }));
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

    async follow(userToken, targetId) {
      const userId = this.getUserId(userToken);
      // todo
    }

    getUserId(token) {
      return this.ctx.app.jwt.verify(token, '123456').userId;
    }
  }
  return IOService;
};
