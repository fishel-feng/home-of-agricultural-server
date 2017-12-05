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
    const comment = await this.service.circle.addComment(circleId, content);
    this.ctx.body = comment;
  }

  async addInnerComment() {
    //
  }

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
    this.ctx.validate({
      circleId: 'string',
    });
    const {
      circleId,
    } = this.ctx.request.body;
    const status = await this.service.circle.cancelLike(circleId);
    this.ctx.body = status;
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
    const circleId = this.ctx.params.circleId;
    const result = await this.service.circle.getLikeList(circleId);
    this.ctx.body = result;
  }
}

module.exports = CircleController;
