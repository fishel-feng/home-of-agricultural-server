'use strict';

const Controller = require('egg').Controller;

class CircleController extends Controller {
  async addCircle() {
    this.ctx.validate({});
    // todo
    // const {} = this.ctx.request.body;
  }
  async deleteCircle() {
    //
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
