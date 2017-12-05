'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {

  /**
   * 用户注册
   */
  async signUp() {
    this.ctx.validate({
      tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      password: 'string',
      code: /^\d{6}$/,
    });
    const {
      tel,
      password,
      code,
    } = this.ctx.request.body;
    const token = await this.service.user.signUp(tel, password, code);
    this.ctx.body = token;
  }

  /**
   * 用户登录
   */
  async signIn() {
    this.ctx.validate({
      tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      password: 'string',
    });
    const {
      tel,
      password,
    } = this.ctx.request.body;
    const token = await this.service.user.signIn(tel, password);
    this.ctx.body = {
      token,
    };
  }

  /**
   * 重置密码
   */
  async resetPassword() {
    this.ctx.validate({
      tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      code: /^\d{6}$/,
      password: 'string',
    });
    const {
      tel,
      code,
      password,
    } = this.ctx.request.body;
    const status = await this.service.user.resetPassword(tel, code, password);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 发送验证码
   */
  async sendVerifyCode() {
    this.ctx.validate({
      tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      reset: {
        type: 'boolean',
        required: false,
      },
    });
    const {
      tel,
      reset,
    } = this.ctx.request.body;
    const status = await this.service.user.sendVerifyCode(tel, reset);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 修改用户信息
   */
  async modifyUserInfo() {
    this.ctx.validate({
      nickName: {
        type: 'string',
        required: true,
        allowEmpty: true,
      },
      gender: {
        type: 'string',
        required: true,
        allowEmpty: true,
      },
      age: {
        type: 'integer',
        required: true,
        allowEmpty: true,
      },
      job: {
        type: 'string',
        required: true,
        allowEmpty: true,
      },
      location: {
        type: 'string',
        required: true,
        allowEmpty: true,
      },
      description: {
        type: 'string',
        required: true,
        allowEmpty: true,
      },
    });
    const {
      nickName,
      gender,
      age,
      job,
      location,
      description,
    } = this.ctx.request.body;
    const status = await this.ctx.service.user.modifyUserInfo(nickName, gender, age, job, location, description);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 修改用户头像
   */
  async modifyHeadImage() {
    const parts = this.ctx.multipart({
      autoFields: true,
    });
    const images = await this.service.upload.upload(parts, 'headImage');
    const status = await this.service.user.modifyHeadImage(images[0]);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    // todo
    const userId = this.ctx.params.userId;
    const user = await this.service.user.getUserInfo(userId);
    this.ctx.body = {
      user,
    };
  }

  /**
   * 查看我的信息
   */
  async getUserIndex() {
    // todo
    const user = await this.service.user.getUserIndex();
    this.ctx.body = {
      user,
    };
  }

  /**
   * 查看收藏的文章列表
   */
  async getCollections() {
    const collections = await this.service.user.getCollections();
    this.ctx.body = {
      collections,
    };
  }

  /**
   * 查看关注的问题列表
   */
  async getAttentions() {
    const attentions = await this.service.user.getAttentions();
    this.ctx.body = {
      attentions,
    };
  }

  /**
   * 查看关注的人列表
   */
  async getFollowings() {
    //
  }

  /**
   * 查看关注我的人列表
   */
  async getFollowers() {
    //
  }

  /**
   * 查看我的提问记录
   */
  async getQuestions() {
    //
  }

  /**
   * 查看我的回答记录
   */
  async getAnswers() {
    //
  }
}

module.exports = UserController;
