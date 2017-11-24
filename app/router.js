'use strict';

module.exports = app => {

  // ************用户app接口*************
  // ----------用户模块-----------
  // 用户注册
  app.post('/user/signup', app.controller.user.signup);
  // 用户登录
  app.post('/user/signin', app.controller.user.signin);
  // 重置密码
  // app.post('/user/resetPassword', app.controller.user.resetPassword);
  // 发送验证码
  // app.post('/user/sendCode', verifyAccount, app.controller.user.sendCode);
  // 修改用户资料
  // app.post('/user/modifyUserInfo', app.controller.user.modifyUserInfo);
  // 查看用户信息
  // app.get('/user/getUserInfo', app.controller.user.getUserInfo);
  // 查看‘我的’
  // app.get('/user/getUserIndex', app.controller.user.getUserIndex);

  // ----------新闻模块-----------
  // 查看‘首页’
  app.get('/news/getArticleIndex', app.controller.news.getArticleIndex);
  // 获取文章详情
  app.get('/news/getArticleInfo/:id', app.controller.news.getArticleInfo);
  // 获取文章列表
  app.get('/news/getAtricleList/:name', app.controller.news.getAtricleList);

  // ----------百科模块------------
  // app.get('/wiki/getAll', app.controller.wiki.getAll);


  // ----------圈子模块------------
  // app.post('/circle/addCircle', app.controller.circle.addCircle);
  // app.post('/circle/addComment', app.controller.circle.addComment);
  // app.post('/circle/deleteCircle', app.controller.circle.deleteCircle);
  // app.post('/circle/deleteComment', app.controller.circle.deleteComment);

  // ----------问答模块------------
  // app.post('/question/addQuestion', app.controller.question.addQuestion);
  // app.post('/question/addAnswer', app.controller.question.addAnswer);
  // app.post('/question/deleteQuestion', app.controller.question.deleteQuestion);
  // app.post('/question/deleteAnswer', app.controller.question.deleteAnswer);


  // *************管理后台接口************
  // app.post('/admin/login', app.controller.admin.login);

};
