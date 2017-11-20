'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511172666978_5691';

  // add your config here
  config.middleware = [];

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

  // config.aliSms = {
  //   client: {
  //     accessKeyId: 'LTAIrJINHCYQmG1z',
  //     secretAccessKey: 'nFj6YLN55ukrEC51nFK2KH8n9yN15h',
  //   },
  // };

  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  return config;
};
