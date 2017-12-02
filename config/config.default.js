'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511172666978_5691';

  // add your config here
  config.middleware = [ 'errorHandler', 'bodyFormat' ];

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/home-of-agricultural',
    options: {},
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
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

  config.multipart = {
    fileSize: '50mb',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: [ 'auth' ],
        packetMiddleware: [],
      },
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  };

  return config;
};
