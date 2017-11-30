'use strict';

const Controller = require('egg').Controller;

const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const fs = require('fs');
class TestController extends Controller {
  async upload() {
    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    while ((stream = await parts()) != null) {
      const filename = stream.filename.toLowerCase();
      const target = path.join(this.config.baseDir, 'app/public', filename);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      files.push(filename);
    }

  }
}

module.exports = TestController;
