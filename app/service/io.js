'use strict';

module.exports = app => {
  const SOCKET = 'SOCKET';
  const MESSAGE = 'MESSAGE';
  const CHAT = 'CHAT';
  const RECENT = 'RECENT';
  const NEW_MESSAGE = 'NEW_MESSAGE';
  const {
    User,
    Question,
    Circle,
    Message,
    Chat,
  } = app.model;

  class IOService extends app.Service {

    /**
     * 登录
     * @param {String} token token
     */
    async login(token) {
      const userId = this.getUserId(token);
      const socketId = this.ctx.socket.id;
      await app.redis.set(SOCKET + userId, socketId);
      const hasNewMessage = !!await app.redis.get(MESSAGE + userId);
      if (hasNewMessage) {
        this.ctx.socket.emit('message');
        await app.redis.del(MESSAGE + userId);
      }
      const userCount = await app.redis.scard(CHAT + userId);
      if (userCount) {
        this.ctx.socket.emit('chatMessage', userCount);
        await app.redis.del(CHAT + userId);
      }
    }

    /**
     * 聊天消息
     * @param {String} userToken token
     * @param {String} targetId 发往id
     * @param {String} content 消息内容
     * @param {String} type 消息类型
     */
    async chat(userToken, targetId, content, type) {
      const userId = this.getUserId(userToken);
      const chatId = targetId < userId ? targetId + userId : userId + targetId;
      await new Chat({
        chatId,
        type,
        content,
        sender: userId,
      }).save();
      await app.redis.zadd(RECENT + targetId, Date.now(), userId);
      await app.redis.sadd(NEW_MESSAGE + targetId, userId);
      await app.redis.zadd(RECENT + userId, Date.now(), targetId);
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId && this.ctx.socket.nsp.sockets[targetSocketId]) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('chat', {
          type,
          content,
          sender: userId,
        });
      } else {
        await app.redis.sadd(CHAT + targetId, chatId);
      }
    }

    /**
     * 消息已读
     * @param {String} userToken token
     * @param {String} targetId 消息作者
     */
    async read(userToken, targetId) {
      const userId = this.getUserId(userToken);
      await app.redis.srem(NEW_MESSAGE + userId, targetId);
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
      await new Message({
        myId: targetId,
        type: 'like',
        userId,
        nickName: user.nickName,
        circleId,
      }).save();
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId && this.ctx.socket.nsp.sockets[targetSocketId]) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('message', {
          type: 'like',
          userId,
          nickName: user.nickName,
          circleId,
        });
      } else {
        await app.redis.set(MESSAGE + targetId, '1');
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
      const circle = await Circle.findById(circleId);
      const authorId = circle.userId;
      await new Message({
        myId: authorId,
        type: 'comment',
        userId,
        nickName: user.nickName,
        circleId,
      }).save();
      const authorSocketId = await app.redis.get(SOCKET + authorId);
      if (authorSocketId && this.ctx.socket.nsp.sockets[authorSocketId]) {
        this.ctx.socket.nsp.sockets[authorSocketId].emit('message', {
          type: 'comment',
          userId,
          nickName: user.nickName,
          circleId,
        });
      } else {
        await app.redis.set(MESSAGE + authorId, '1');
      }
      if (targetId) {
        await new Message({
          myId: targetId,
          type: 'reply',
          userId,
          nickName: user.nickName,
          circleId,
        }).save();
        const targetSocketId = await app.redis.get(SOCKET + targetId);
        if (targetSocketId && this.ctx.socket.nsp.sockets[targetSocketId]) {
          this.ctx.socket.nsp.sockets[targetSocketId].emit('message', {
            type: 'reply',
            userId,
            nickName: user.nickName,
            circleId,
          });
        } else {
          await app.redis.set(MESSAGE + targetId, '1');
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
      const authorId = question.userId;
      await new Message({
        myId: authorId,
        type: 'answer',
        userId,
        nickName: user.nickName,
        questionId: question._id,
        title: question.title,
      }).save();
      const authorSocketId = await app.redis.get(SOCKET + authorId);
      if (authorSocketId && this.ctx.socket.nsp.sockets[authorSocketId]) {
        this.ctx.socket.nsp.sockets[authorSocketId].emit('message', {
          type: 'answer',
          userId,
          nickName: user.nickName,
          questionId: question._id,
          title: question.title,
        });
      } else {
        await app.redis.set(MESSAGE + authorId, '1');
      }
      for (const id of attentions) {
        await new Message({
          myId: id,
          type: 'attention',
          userId,
          nickName: user.nickName,
          questionId: question._id,
          title: question.title,
        }).save();
        const socketId = await app.redis.get(SOCKET + id);
        if (socketId && this.ctx.socket.nsp.sockets[socketId]) {
          this.ctx.socket.nsp.sockets[socketId].emit('message', {
            type: 'attention',
            userId,
            nickName: user.nickName,
            questionId: question._id,
            title: question.title,
          });
        } else {
          await app.redis.set(MESSAGE + id, '1');
        }
      }
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
      await new Message({
        myId: expertId,
        type: 'invite',
        userId,
        nickName: user.nickName,
        questionId: question._id,
        title: question.title,
      }).save();
      const expertSocketId = await app.redis.get(SOCKET + expertId);
      if (expertSocketId && this.ctx.socket.nsp.sockets[expertSocketId]) {
        this.ctx.socket.nsp.sockets[expertSocketId].emit('message', {
          type: 'invite',
          userId,
          nickName: user.nickName,
          questionId: question._id,
          title: question.title,
        });
      } else {
        await app.redis.set(MESSAGE + expertId, '1');
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
      await new Message({
        myId: targetId,
        type: 'follow',
        userId,
        nickName: user.nickName,
      }).save();
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId && this.ctx.socket.nsp.sockets[targetSocketId]) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('message', {
          type: 'follow',
          userId,
          nickName: user.nickName,
        });
      } else {
        await app.redis.set(MESSAGE + targetId, '1');
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
