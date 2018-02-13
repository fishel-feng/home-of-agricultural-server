'use strict';

const Controller = require('egg').Controller;

module.exports = class UserController extends Controller {

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
      headImage: {
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
      headImage,
    } = this.ctx.request.body;
    const status = await this.ctx.service.user.modifyUserInfo(nickName, gender, age, job, location, description, headImage);
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
    this.ctx.body = {
      collections,
    };
  }

  /**
   * 查看关注的问题列表
   */
  async getAttentions() {
    const last = this.ctx.params.last;
    const attentions = await this.service.user.getAttentions(last);
    this.ctx.body = {
      questions: attentions,
    };
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
    const last = this.ctx.params.last;
    const questions = await this.service.user.getQuestions(last);
    this.ctx.body = {
      questions,
    };
  }

  /**
   * 查看我的回答记录
   */
  async getAnswers() {
    const last = this.ctx.params.last;
    const answers = await this.service.user.getAnswers(last);
    this.ctx.body = {
      questions: answers,
    };
  }

  /**
   * 查看我发表的动态
   */
  async getCircles() {
    const last = this.ctx.params.last;
    const circles = await this.service.user.getCircles(last);
    this.ctx.body = {
      circleList: circles,
    };
  }

  /**
   * 查看我收到的消息
   */
  async showMessage() {
    const messages = await this.service.user.showMessage();
    this.ctx.body = {
      messages,
    };
  }

  /**
   * 查看最近联系的人
   */
  async getRecent() {
    const recent = await this.service.user.getRecent();
    this.ctx.body = {
      recent,
    };
  }

  /**
   * 申请专家认证
   */
  async applyCertification() {
    this.ctx.validate({
      realName: 'string',
      idCardNumber: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
      urls: 'array',
      tag: 'string',
      message: 'string',
    });
    const {
      realName,
      idCardNumber,
      urls,
      tag,
      message,
    } = this.ctx.request.body;
    const result = await this.service.user.applyCertification(realName, idCardNumber, urls, tag, message);
    this.ctx.body = {
      result,
    };
  }
};
