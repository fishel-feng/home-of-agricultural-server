'use strict';

const Controller = require('egg').Controller;

class CircleController extends Controller {
  async addCircle() {
    this.ctx.validate({});
    // todo
    // const {} = this.ctx.request.body;
  }
  async deleteCircle() {
    this.ctx.validate({
      id: {
        type: 'string',
      },
    });
    const {
      id,
    } = this.ctx.request.body;
    const status = await this.service.circle.deleteCircle(id);
    this.ctx.body = {
      status,
    };
  }
  async addComment() {
    //
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
