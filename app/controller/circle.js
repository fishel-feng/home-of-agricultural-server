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
      id: 'string',
    });
    const {
      id,
    } = this.ctx.request.body;
    // TODO 删除图片
    const status = await this.service.circle.deleteCircle(id);
    this.ctx.body = status;
  }
  async addComment() {
    this.ctx.validate({
      id: 'string',
      content: 'string',
    });
    const {
      id,
      content,
    } = this.ctx.request.body;
    const status = await this.service.circle.addComment(id, content);
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
    //
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
