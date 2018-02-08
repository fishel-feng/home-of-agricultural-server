'use strict';

module.exports = function (app) {
  var verifyAccount = app.middlewares.verifyAccount({});

  // 上传图片
  app.post('/upload/:type', verifyAccount, app.controller.upload.upload);

  // ************用户app接口*************
  // ----------用户模块-----------
  // 用户注册
  app.post('/user/signUp', app.controller.user.signUp);
  // 用户登录
  app.post('/user/signIn', app.controller.user.signIn);
  // 重置密码
  app.post('/user/resetPassword', app.controller.user.resetPassword);
  // 查看用户信息
  app.get('/user/getUserInfo/:userId', app.controller.user.getUserInfo);
  // 发送验证码
  app.post('/user/sendVerifyCode', app.controller.user.sendVerifyCode);
  // 修改用户资料
  app.post('/user/modifyUserInfo', verifyAccount, app.controller.user.modifyUserInfo);
  // 关注用户
  app.post('/user/giveFollow', verifyAccount, app.controller.user.giveFollow);
  // 取消关注用户
  app.post('/user/cancelFollow', verifyAccount, app.controller.user.cancelFollow);
  // 初始化个人信息
  app.get('/user/getUserIndex', verifyAccount, app.controller.user.getUserIndex);
  // 查看收藏文章列表
  app.get('/user/getCollections', verifyAccount, app.controller.user.getCollections);
  // 查看关注问题列表
  app.get('/user/getAttentions/:last', verifyAccount, app.controller.user.getAttentions);
  // 查看关注的人列表
  app.get('/user/getFollowings', verifyAccount, app.controller.user.getFollowings);
  // 查看关注我的人列表
  app.get('/user/getFollowers', verifyAccount, app.controller.user.getFollowers);
  // 查看提问的问题
  app.get('/user/getQuestions/:last', verifyAccount, app.controller.user.getQuestions);
  // 查看回答的问题
  app.get('/user/getAnswers/:last', verifyAccount, app.controller.user.getAnswers);
  // 查看我发表的动态
  app.get('/user/getCircles/:last', verifyAccount, app.controller.user.getCircles);
  // 查看我的消息
  app.get('/user/showMessage', verifyAccount, app.controller.user.showMessage);
  // 查看最近联系的人
  app.get('/user/getRecent', verifyAccount, app.controller.user.getRecent);

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
  // 查看关注的人动态 传末尾时间
  app.get('/circle/getAttentionList/:last', verifyAccount, app.controller.circle.getAttentionList);
  // 查看动态 传末尾时间
  app.get('/circle/getCircleList/:last', app.controller.circle.getCircleList);
  // 查看评论
  app.get('/circle/getComment/:circleId', app.controller.circle.getComment);
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
  // 关注问题
  app.post('/question/attentionQuestion', verifyAccount, app.controller.question.attentionQuestion);
  //  取消关注问题
  app.post('/question/removeAttentionQuestion', verifyAccount, app.controller.question.removeAttentionQuestion);
  // 获取专家列表
  app.get('/question/getExpertList/:tag', app.controller.question.getExpertList);
  // 分类查看问题分类列表 传末尾时间
  app.get('/question/getQuestionList/:tag/:last', app.controller.question.getQuestionList);
  // 查看全部问题列表 传末尾时间
  app.get('/question/getAllQuestionList/:last', app.controller.question.getAllQuestionList);
  // 查看问题详情
  app.get('/question/getQuestion/:questionId', app.controller.question.getQuestion);
  // 获取全部标签
  app.get('/question/getTags', app.controller.question.getTags);
  // 设置tag
  app.post('/question/saveTags', verifyAccount, app.controller.question.saveTags);
  // 分页获取聊天记录
  app.get('/question/getChat/:chatId/:last', verifyAccount, app.controller.question.getChat);

  // socket.io接口
  // 登录
  app.io.route('login', app.io.controller.io.login);
  // 聊天
  app.io.route('chat', app.io.controller.io.chat);
  // 消息已读
  app.io.route('read', app.io.controller.io.read);
  // 点赞
  app.io.route('like', app.io.controller.io.like);
  // 评论
  app.io.route('comment', app.io.controller.io.comment);
  // 回答
  app.io.route('answer', app.io.controller.io.answer);
  // 邀请回答
  app.io.route('invite', app.io.controller.io.invite);
  // 关注用户
  app.io.route('follow', app.io.controller.io.follow);

  // *************管理后台接口************
  // app.post('/admin/login', app.controller.admin.login);
};
//# sourceMappingURL=router.js.map