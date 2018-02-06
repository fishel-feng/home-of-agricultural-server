'use strict';

module.exports = app => {
  const SOCKET = 'SOCKET';
  const MESSAGE = 'MESSAGE';
  const CHAT = 'CHAT';
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
     * @return {Promise<void>} id
     */
    async login(token) {
      const userId = this.getUserId(token);
      const socketId = this.ctx.socket.id;
      await app.redis.set(SOCKET + userId, socketId);
      return socketId;
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
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId) {
        this.ctx.socket.nsp.sockets[targetSocketId].emit('chat', {
          type,
          content,
          sender: userId,
        });
      } else {
        await app.redis.sadd(CHAT + targetId, 'chatId');
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
      await new Message({
        myId: targetId,
        type: 'like',
        userId,
        nickName: user.nickName,
        circleId,
      }).save();
      const targetSocketId = await app.redis.get(SOCKET + targetId);
      if (targetSocketId) {
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
      if (authorSocketId) {
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
        if (targetSocketId) {
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
      if (authorSocketId) {
        this.ctx.socket.nsp.sockets[authorSocketId].emit('message', {
          type: 'answer',
          userId,
          nickName: user.nickName,
          questionId: question._id,
          title: question.title,
        });
      } else {
        await app.redis.rpush(MESSAGE + authorId, '1');
      }
      attentions.forEach(async id => {
        await new Message({
          myId: id,
          type: 'attention',
          userId,
          nickName: user.nickName,
          questionId: question._id,
          title: question.title,
        }).save();
        const socketId = await app.redis.get(SOCKET + id);
        if (socketId) {
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
      await new Message({
        myId: expertId,
        type: 'invite',
        userId,
        nickName: user.nickName,
        questionId: question._id,
        title: question.title,
      }).save();
      const expertSocketId = await app.redis.get(SOCKET + expertId);
      if (expertSocketId) {
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
      if (targetSocketId) {
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
