'use strict';

module.exports = appInfo => {
  const config = exports = {};

  config.keys = 'W6ujBEqz2FtGCoFT';
  config.accountCookieId = 'aid';
  config.cookieDomain = 'localhost';
  config.accountCookieExpires = 2592000;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511172666978_5691';

  // add your config here
  config.middleware = [ 'errorHandler' ];

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/home-of-agricultural',
    options: {},
  };

  config.redis = {
    client: {
      port: 6379,
      host: 'localhost',
      password: '',
      db: 0,
    },
  };

  config.aliSms = {
    client: {
      accessKeyId: 'LTAIC2RTwc2egSTi',
      secretAccessKey: '4UyjdFtn9ubES63V5MJtRW8A7e7QjV',
    },
  };

  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  return config;
};
