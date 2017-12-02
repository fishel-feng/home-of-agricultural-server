'use strict';

module.exports = app => {
  const verifyAccount = app.middlewares.verifyAccount({});
  // todo jwt配置
  const socketioJwt = require('socketio-jwt').authorize({
    secret: 'jwtSecret',
    handshake: true,
  });

  app.post('/test/upload', app.controller.test.upload);

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
  // 查看用户信息
  app.get('/user/getUserInfo', app.controller.user.getUserInfo);
  // 查看‘我的’
  app.get('/user/getUserIndex', app.controller.user.getUserIndex);
  // 查看收藏列表
  app.get('/user/getFavoriteList', app.controller.user.getFavoriteList);
  // 查看关注列表
  app.get('/user/getFollowList', app.controller.user.getFollowList);

  // ----------新闻模块-----------
  // 查看‘首页’
  app.get('/news/getArticleIndex', app.controller.news.getArticleIndex);
  // 获取文章详情
  app.get('/news/getArticleInfo/:id', app.controller.news.getArticleInfo);
  // 获取文章列表
  app.get('/news/getArticleList/:name', app.controller.news.getArticleList);

  // ----------百科模块------------
  // app.get('/wiki/getAll', app.controller.wiki.getAll);


  // ----------圈子模块------------
  // 发表动态
  app.post('/circle/addCircle', verifyAccount, app.controller.circle.addCircle);
  // 删除动态
  app.post('/circle/deleteCircle', verifyAccount, app.controller.circle.deleteCircle);
  // 评论动态
  app.post('/circle/addComment', verifyAccount, app.controller.circle.addComment);
  // 回复评论
  app.post('/circle/addInnerComment', verifyAccount, app.controller.circle.addInnerComment);
  // 删除评论
  app.post('/circle/deleteComment', verifyAccount, app.controller.circle.deleteComment);
  // 删除回复评论
  app.post('/circle/deleteInnerComment', verifyAccount, app.controller.circle.deleteInnerComment);
  // 点赞
  app.post('/circle/giveLike', verifyAccount, app.controller.circle.giveLike);
  // 取消赞
  app.post('/circle/cancelLike', verifyAccount, app.controller.circle.cancelLike);
  // 查看动态
  app.get('/circle/getCircleList', app.controller.circle.getCircleList);
  // 查看评论
  app.get('/circle/getComment', app.controller.circle.getComment);
  // 查看回复
  app.get('/circle/getInnerComment', app.controller.circle.getInnerComment);
  // 查看点赞列表
  app.get('/circle/getLikeList/:circleId', app.controller.circle.getLikeList);

  // ----------问答模块------------
  // 获取专家列表
  app.get('/question/getExpertList', app.controller.question.getExpertList);

  // socket.io接口
  // app.io.set('authorization', socketioJwt);
  app.io.route('chat', app.io.controllers.io.login);
  app.io.route('chat', app.io.controllers.io.chat);

  // *************管理后台接口************
  // app.post('/admin/login', app.controller.admin.login);
};
