'use strict';

module.exports = app => {
  class IOService extends app.Service {
    * login() {
      // console.log(this.ctx.socket.nsp.sockets);
      return 'Helle Man!';
    }
  }
  return IOService;
};
