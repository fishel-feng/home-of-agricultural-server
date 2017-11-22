'use strict';

module.exports = app => {
  // const verifyAccount = app.middlewares.verifyAccount({});
  // const appendUserDetail = app.middlewares.auth.appendUserDetail({});
  app.get('/', app.controller.user.index);
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

  // app.get('/news/getAll', app.controller.news.getAll);

  // app.get('/wiki/getAll', app.controller.wiki.getAll);

  // app.post('/admin/login', app.controller.admin.login);

};
