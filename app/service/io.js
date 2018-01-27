'use strict';

module.exports = app => {
  const SOCKET = 'SOCKET';
  const {
    User,
  } = app.model;
  class IOService extends app.Service {

    /**
     * 登录
     * @param {String} token token
     * @return {Promise<void>} id
     */
    async login(token) {
      const userId = this.ctx.app.jwt.verify(token, '123456').userId;
      const socketId = this.ctx.socket.id;
      await app.redis.set(SOCKET + userId, socketId);
      return socketId;
    }

    async chat(to, message) {
      const userId = '5a16699d5e58179af45247d0';
      const targetSocketId = await app.redis.get(SOCKET + to);
      if (targetSocketId) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('message', userId, message);
      }
    }

    async like(userToken, targetId) {
      const userId = this.ctx.app.jwt.verify(userToken, '123456').userId;
      const userInfo = await User.findById(userId);
      // todo
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('like', userInfo);
      }
    }

    async comment(userToken, circleId, targetId) {
      // todo
    }

    async answer(questionId) {
      // todo
    }

    async invitation(userToken, expertId, questionId) {
      // todo
    }
  }
  return IOService;
};
