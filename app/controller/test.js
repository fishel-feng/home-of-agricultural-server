'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async upload() {
    const parts = this.ctx.multipart({
      autoFields: true,
    });
    const images = await this.service.upload.upload(parts, 'headImg');
    console.log(parts.field);
    const {
      id,
      ps,
    } = parts.field;
    this.ctx.body = {
      images,
      id,
      ps,
    };
  }
}

module.exports = TestController;
