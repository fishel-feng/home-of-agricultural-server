'use strict';

module.exports = app => {
  // // app.get('/', app.controller.home.index);
  // const verifyAccount = app.middlewares.auth.verifyAccount({});
  // const appendUserDetail = app.middlewares.auth.appendUserDetail({});

  app.post('/user/signup', app.controller.user.signup);
  app.post('/user/signin', app.controller.user.signin);
  // app.post('/user/resetPassword', app.controller.user.resetPassword);
  // app.post('/user/sendCode', app.controller.user.sendCode);

  // app.post('/circle/addCircle', app.controller.circle.addCircle);
  // app.post('/circle/addComment', app.controller.addComment);
  // app.post('/circle/deleteCircle', app.controller.circle.deleteCircle);
  // app.post('/circle/deleteComment', app.controller.circle.deleteComment);


};
