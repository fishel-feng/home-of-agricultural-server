'use strict';

module.exports = app => {
  const verifyAccount = app.middlewares.verifyAccount({});
  // todo jwt配置
  // const socketioJwt = require('socketio-jwt').authorize({
  //   secret: 'jwtSecret',
  //   handshake: true,
  // });

  app.post('/test/upload', app.controller.test.upload);
  // app.get('/test/index', app.jwt, app.controller.test.index);
  app.post('/test/index', verifyAccount, app.controller.test.index);

  // ************用户app接口*************
  // ----------用户模块-----------
  // 用户注册
  app.post('/user/signUp', app.controller.user.signUp);
  // 用户登录
  app.post('/user/signIn', app.controller.user.signIn);
  // 重置密码
  app.post('/user/resetPassword', app.controller.user.resetPassword);
  // 发送验证码
  app.post('/user/sendVerifyCode', app.controller.user.sendVerifyCode);
  // 修改用户资料
  app.post('/user/modifyUserInfo', verifyAccount, app.controller.user.modifyUserInfo);
  // 修改头像
  app.post('/user/modifyHeadImage', verifyAccount, app.controller.user.modifyHeadImage);
  // 关注用户
  app.post('/user/giveFollow', verifyAccount, app.controller.user.giveFollow);
  // 取消关注用户
  app.post('/user/cancelFollow', verifyAccount, app.controller.user.cancelFollow);
  // 查看用户信息
  app.get('/user/getUserInfo/:userId', verifyAccount, app.controller.user.getUserInfo);
  // 查看‘我的’
  app.get('/user/getUserIndex', verifyAccount, app.controller.user.getUserIndex);
  // 查看收藏文章列表
  app.get('/user/getCollections', verifyAccount, app.controller.user.getCollections);
  // 查看关注问题列表
  app.get('/user/getAttentions', verifyAccount, app.controller.user.getAttentions);
  // 查看关注的人列表
  app.get('/user/getFollowings', verifyAccount, app.controller.user.getFollowings);
  // 查看关注我的人列表
  app.get('/user/getFollowers', verifyAccount, app.controller.user.getFollowers);
  // 查看提问的问题
  app.get('/user/getQuestions', verifyAccount, app.controller.user.getQuestions);
  // 查看回答的问题
  app.get('/user/getAnswers', verifyAccount, app.controller.user.getAnswers);
  // 查看我发表的动态
  app.get('/user/getCircles', verifyAccount, app.controller.user.getCircles);

  // ----------新闻模块-----------
  // 查看‘首页’
  app.get('/news/getArticleIndex', app.controller.news.getArticleIndex);
  // 获取文章详情
  app.get('/news/getArticleInfo/:id', app.controller.news.getArticleInfo);
  // 获取文章列表
  app.get('/news/getArticleListByPage/:name/:page', app.controller.news.getArticleListByPage);
  // 收藏文章
  app.post('/news/addToCollections', verifyAccount, app.controller.news.addToCollections);
  // 取消收藏
  app.post('/news/deleteFromCollections', verifyAccount, app.controller.news.deleteFromCollections);

  // ----------百科模块------------
  // app.get('/wiki/getAll', app.controller.wiki.getAll);

  // ----------圈子模块------------
  // 发表动态
  app.post('/circle/addCircle', verifyAccount, app.controller.circle.addCircle);
  // 删除动态
  app.post('/circle/deleteCircle', verifyAccount, app.controller.circle.deleteCircle);
  // 评论动态
  app.post('/circle/addComment', verifyAccount, app.controller.circle.addComment);
  // 删除评论
  app.post('/circle/deleteComment', verifyAccount, app.controller.circle.deleteComment);
  // 点赞
  app.post('/circle/giveLike', verifyAccount, app.controller.circle.giveLike);
  // 取消赞
  app.post('/circle/cancelLike', verifyAccount, app.controller.circle.cancelLike);
  // 查看动态
  app.get('/circle/getCircleList', app.controller.circle.getCircleList);
  // 查看评论
  app.get('/circle/getComment', app.controller.circle.getComment);
  // 查看点赞列表
  app.get('/circle/getLikeList/:circleId', app.controller.circle.getLikeList);

  // ----------问答模块------------
  // 发起提问
  app.post('/question/addQuestion', verifyAccount, app.controller.question.addQuestion);
  // 删除问题
  app.post('/question/deleteQuestion', verifyAccount, app.controller.question.deleteQuestion);
  // 回答问题
  app.post('/question/addAnswer', verifyAccount, app.controller.question.addAnswer);
  // 删除回答
  app.post('/question/deleteAnswer', verifyAccount, app.controller.question.deleteAnswer);
  // 采纳答案
  app.post('/question/acceptAnswer', verifyAccount, app.controller.question.acceptAnswer);
  // 获取专家列表
  app.get('/question/getExpertList', app.controller.question.getExpertList);
  // 查看问题列表
  app.get('/question/getQuestionList', app.controller.question.getQuestionList);

  // socket.io接口
  // app.io.set('authorization', socketioJwt);
  app.io.route('chat', app.io.controllers.io.login);
  app.io.route('chat', app.io.controllers.io.chat);

  // *************管理后台接口************
  // app.post('/admin/login', app.controller.admin.login);
};