'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const {
      User,
    } = ctx.app.model;
    const user = await User.findOne({
      tel: '1213zswx2',
    });
    ctx.user = user;
    await next();
  };
};
