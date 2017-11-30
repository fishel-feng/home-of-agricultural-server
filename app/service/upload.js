'use strict';

module.exports = app => {
  const path = require('path');
  const sendToWormhole = require('stream-wormhole');
  class UploadService extends app.Service {
    // async upload(stream) {
    //   const name = 'egg-multipart-test/' + path.basename(stream.filename);
    //   let result;
    //   try {
    //     result = await this.ctx.oss.put(name, stream);
    //   } catch (err) {
    //     await sendToWormhole(stream);
    //     throw err;
    //   }
    //   this.ctx.body = {
    //     url: result.url,
    //     // process form fields by `stream.fields`
    //     fields: stream.fields,
    //   };
    // }
  }
  return UploadService;
};
