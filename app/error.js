'use strict';

module.exports = {
  NOT_FOUND: {
    code: 404,
    message: '没找到',
  },
  ERROR_NO: 500,
  INVALID_PARAM: {
    code: 422,
    message: '参数错误',
  },
  NO_USER: {
    code: 423,
    message: '用户名或密码错误',
  },
  UPLOAD_FAILED: {
    code: 425,
    message: '图片上传失败',
  },
};
