'use strict';

const Controller = require('egg').Controller;

class CircleController extends Controller {
  async addCircle() {
    // const id = this.ctx.params.id;
    // if (!id) {
    //   this.ctx.body = {
    //     index: 1,
    //   };
    //   return;
    // }
    // this.ctx.body = {
    //   index: 2,
    // };
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
