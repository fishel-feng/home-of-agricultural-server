'use strict';

const Err = require('err1st');

module.exports = () => {
  return async function errorHandler(next) {
    try {
      await next;
    } catch (err) {
      // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
      // 框架会统一监听，并打印对应的错误日志
      this.app.emit('error', err, this);
      // 自定义错误时异常返回的格式
      if (!(err instanceof Err)) {
        err = new Err(err); // eslint-disable-line
      }

      this.status = err.status || 400;

      this.body = {
        code: err.code,
        message: err.message,
        data: err.data || {},
      };
    }
  };
};