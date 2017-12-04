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
  ERROR_USER: {
    code: 423,
    message: '用户名或密码错误',
  },
  UPLOAD_FAILED: {
    code: 425,
    message: '图片上传失败',
  },
  ADD_CIRCLE_ERROR: {
    code: 466,
    message: '发表动态失败',
  },
  DELETE_CIRCLE_ERROR: {
    code: 488,
    message: '删除动态失败',
  },
  ADD_COMMENT_ERROR: {
    code: 494,
    message: '添加评论动态失败',
  },
  REPEAT_LIKE: {
    code: 499,
    message: '重复点赞',
  },
  GIVE_LIKE_ERROR: {
    code: 459,
    message: '点赞异常',
  },
  CANCEL_LIKE_ERROR: {
    code: 493,
    message: '取消赞异常',
  },
  GET_LIST_ERROR: {
    code: 423,
    message: '获取列表信息',
  },
  SEND_CODE_ERROR: {
    code: 427,
    message: '发送验证码异常',
  },
  VERIFY_CODE_ERROR: {
    code: 457,
    message: '验证码错误',
  },
  USER_EXIST: {
    code: 455,
    message: '此手机号已注册',
  },
  NO_USER: {
    code: 492,
    message: '用户未注册',
  },
  RESET_PASSWORD_ERROR: {
    code: 428,
    message: '重置密码失败',
  },
  NO_AUTHORIZATION: {
    code: 328,
    message: '未认证',
  },
  AUTH_ERROR: {
    code: 328,
    message: '认证错误',
  },
};
