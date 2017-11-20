'use strict';

module.exports = app => {
  // // app.get('/', app.controller.home.index);
  // const verifyAccount = app.middlewares.auth.verifyAccount({});
  // const appendUserDetail = app.middlewares.auth.appendUserDetail({});

  app.post('/user/signup', app.controller.user.signup);
  app.post('/user/signin', app.controller.user.signin);
  // app.post('/user/reset', app.controller.user.resetPassword);
  // app.post('/user/code', app.controller.user.sendCode);

  // app.post('/mobile/sendverifycode', 'mobile.sendVerifyCode');
  // app.post('/mobile/signin', setCookie, 'mobile.signin');
  // app.post('/mobile/signup', setCookie, 'mobile.signup');

  // app.get('/openapi/myApis', verifyAccount, 'openApi.myApis');
  // app.get('/openapi/mySecret', verifyAccount, 'openApi.mySecret');
  // app.get('/openapi/all', verifyAccount, 'openApi.all');
  // app.get('/openapi/global/init', verifyAccount, appendUserDetail, 'openApi.initOpenApis');
  // app.post('/openapi/buy', verifyAccount, 'openApi.buy');
  // app.post('/openapi/currentCount', verifyAccount, 'openApi.currentCount');
};
