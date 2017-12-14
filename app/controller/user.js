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
    this.ctx.body = {
      token,
    };
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
   * 关注用户
   */
  async giveFollow() {
    this.ctx.validate({
      targetId: 'string',
    });
    const {
      targetId,
    } = this.ctx.request.body;
    const status = await this.service.user.giveFollow(targetId);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 取消关注用户
   */
  async cancelFollow() {
    this.ctx.validate({
      targetId: 'string',
    });
    const {
      targetId,
    } = this.ctx.request.body;
    const status = await this.service.user.cancelFollow(targetId);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 获取用户信息
   */
  async getUserInfo() {
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
    this.ctx.body = collections;
  }

  /**
   * 查看关注的问题列表
   */
  async getAttentions() {
    const attentions = await this.service.user.getAttentions();
    this.ctx.body = attentions;
  }

  /**
   * 查看关注的人列表
   */
  async getFollowings() {
    const followings = await this.service.user.getFollowings();
    this.ctx.body = {
      followings,
    };
  }

  /**
   * 查看关注我的人列表
   */
  async getFollowers() {
    const followers = await this.service.user.getFollowers();
    this.ctx.body = {
      followers,
    };
  }

  /**
   * 查看我的提问记录
   */
  async getQuestions() {
    const questions = await this.service.user.getQuestions();
    this.ctx.body = questions;
  }

  /**
   * 查看我的回答记录
   */
  async getAnswers() {
    const answers = await this.service.user.getAnswers();
    this.ctx.body = answers;
  }

  /**
   * 查看我发表的动态
   */
  async getCircles() {
    const circles = await this.service.user.getCircles();
    this.ctx.body = circles;
  }
}

module.exports = UserController;