'use strict';

const Controller = require('egg').Controller;

class CircleController extends Controller {
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
  async addComment() {
    this.ctx.validate({
      circleId: 'string',
      content: 'string',
    });
    const {
      circleId,
      content,
    } = this.ctx.request.body;
    const status = await this.service.circle.addComment(circleId, content);
    this.ctx.body = status;
  }
  async addInnerComment() {
    //
  }
  async deleteComment() {
    //
  }
  async deleteInnerComment() {
    //
  }
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
  async cancelLike() {
    //
  }
  async getCircleList() {
    //
  }
  async getComment() {
    //
  }
  async getInnerComment() {
    //
  }
  async getLikeList() {
    //
  }
}

module.exports = CircleController;
