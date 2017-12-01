'use strict';

module.exports = app => {
  class ChatController extends app.Controller {
    * index() {
      const message = this.ctx.args[0];
      console.log('chat :', message + ' : ' + process.pid);
      const say = 'hello';
      this.ctx.socket.emit('res', say);
    }
  }
  return ChatController;
};
