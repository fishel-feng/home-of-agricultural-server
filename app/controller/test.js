'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
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
  async index() {
    const content = 'password';
    const md5 = crypto.createHash('md5');
    md5.update(content);
    const d = md5.digest('hex');
    const b = new Buffer(d);
    console.log(b.toString('base64'));
    this.ctx.body = {
      hello: 'duck',
    };
  }

}

module.exports = TestController;
