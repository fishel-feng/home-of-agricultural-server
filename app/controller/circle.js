'use strict';

const Controller = require('egg').Controller;

class CircleController extends Controller {

  /**
   * 发表动态
   */
  async addCircle() {
    const parts = this.ctx.multipart({
      autoFields: true,
    });
    const images = await this.service.upload.upload(parts, 'circle');
    const {
      content,
    } = parts.field;
    const circle = await this.service.circle.addCircle(content, images);
    this.ctx.body = circle;
  }

  /**
   * 删除动态
   */
  async deleteCircle() {
    this.ctx.validate({
      circleId: 'string',
    });
    const {
      circleId,
    } = this.ctx.request.body;
    // TODO 删除图片
    const status = await this.service.circle.deleteCircle(circleId);
    this.ctx.body = status;
  }

  /**
   * 添加评论
   */
  async addComment() {
    this.ctx.validate({
      circleId: 'string',
      content: 'string',
      targetId: {
        type: 'string',
        required: false,
      },
    });
    const {
      circleId,
      content,
      targetId,
    } = this.ctx.request.body;
    const comment = await this.service.circle.addComment(circleId, content, targetId);
    this.ctx.body = comment;
  }

  /**
   * 删除评论
   */
  async deleteComment() {
    this.ctx.validate({
      circleId: 'string',
      commentId: 'integer',
    });
    const {
      circleId,
      commentId,
    } = this.ctx.request.body;
    const status = await this.service.circle.deleteComment(circleId, commentId);
    this.ctx.body = {
      status,
    };
  }

  /**
   * 点赞
   */
  async giveLike() {
    this.ctx.validate({
      circleId: 'string',
    });
    const {
      circleId,
    } = this.ctx.request.body;
    const status = await this.service.circle.giveLike(circleId);
    this.ctx.body = status;
  }

  /**
   * 取消赞
   */
  async cancelLike() {
    this.ctx.validate({
      circleId: 'string',
    });
    const {
      circleId,
    } = this.ctx.request.body;
    const status = await this.service.circle.cancelLike(circleId);
    this.ctx.body = status;
  }

  /**
   * 查看动态
   */
  async getCircleList() {
    //
  }

  /**
   * 查看评论
   */
  async getComment() {
    //
  }

  /**
   * 查看点赞列表
   */
  async getLikeList() {
    const circleId = this.ctx.params.circleId;
    const result = await this.service.circle.getLikeList(circleId);
    this.ctx.body = result;
  }
}

module.exports = CircleController;
