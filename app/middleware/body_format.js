'use strict';

module.exports = () => async (ctx, next) => {
  await next();
  if (!ctx.body.code) {
    ctx.body = { code: 200, data: ctx.body };
  }
};
