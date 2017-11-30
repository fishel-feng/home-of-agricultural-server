'use strict';
const error = require('../error');

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      if (e.code === 'invalid_param') {
        ctx.body = error.INVALID_PARAM;
        return;
      }
      ctx.body = error[e.message];
    }
  };
};
