'use strict';
const error = require('../error');

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = error[err.message];
  }
};
