'use strict';

module.exports = app => {

  app.get('/news/getIndex', app.controller.news.getIndex);
  app.get('/news/getArticleInfo/:id', app.controller.news.getArticleInfo);
  app.get('/news/getAtricleList/:name', app.controller.news.getAtricleList);

  app.post('/user/signup', app.controller.user.signup);
  app.post('/user/signin', app.controller.user.signin);
  // app.post('/user/resetPassword', app.controller.user.resetPassword);
  // app.post('/user/sendCode', verifyAccount, app.controller.user.sendCode);

  // app.post('/circle/addCircle', app.controller.circle.addCircle);
  // app.post('/circle/addComment', app.controller.circle.addComment);
  // app.post('/circle/deleteCircle', app.controller.circle.deleteCircle);
  // app.post('/circle/deleteComment', app.controller.circle.deleteComment);

  // app.post('/question/addQuestion', app.controller.question.addQuestion);
  // app.post('/question/addAnswer', app.controller.question.addAnswer);
  // app.post('/question/deleteQuestion', app.controller.question.deleteQuestion);
  // app.post('/question/deleteAnswer', app.controller.question.deleteAnswer);

  // app.get('/wiki/getAll', app.controller.wiki.getAll);

  // app.post('/admin/login', app.controller.admin.login);

};
