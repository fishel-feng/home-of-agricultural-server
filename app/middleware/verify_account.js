'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const token = ctx.header.authorization;
    if (!token) {
      throw new Error('NO_AUTHORIZATION');
    }
    try {
      const userId = ctx.app.jwt.verify(token, '123456').userId;
      const {
        User,
      } = ctx.app.model;
      const user = await User.findById(userId);
      ctx.user = user;
    } catch (e) {
      throw new Error('AUTH_ERROR');
    }
    await next();
  };
};
