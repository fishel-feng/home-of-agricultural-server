'use strict';

module.exports = app => {
  const path = require('path');
  const sendToWormhole = require('stream-wormhole');
  const awaitWriteStream = require('await-stream-ready').write;
  const fs = require('fs');
  class UploadService extends app.Service {
    async upload(parts, targetDir) {
      const files = [];
      let stream;
      while ((stream = await parts()) != null && stream._readableState.buffer.length) {
        const filename = await this.generateFileName(stream.filename);
        const target = path.join(this.config.baseDir, 'app/public', targetDir, filename);
        const writeStream = fs.createWriteStream(target);
        try {
          await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
          await sendToWormhole(stream);
          throw new Error('UPLOAD_FAILED');
        }
        files.push(filename);
      }
      return files;
    }
    async generateFileName(filename) {
      return new Date().getTime() + '&' + Math.random().toString().slice(2, 6) + filename.slice(filename.lastIndexOf('.'));
    }
  }
  return UploadService;
};
