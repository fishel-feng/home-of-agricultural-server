'use strict';
const error = require('../error');

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.body = error[e.message];
  }
};
