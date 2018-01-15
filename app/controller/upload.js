'use strict';
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const type = this.ctx.params.type;
    const parts = this.ctx.multipart({
      autoFields: true,
    });
    const images = await this.service.upload.upload(parts, type);
    this.ctx.body = images;
  }
}

module.exports = UploadController;