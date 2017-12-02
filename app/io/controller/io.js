'use strict';
const Controller = require('egg').Controller;
const socketMap = {};

class IOController extends Controller {
  async login() {
    const user = this.ctx.args[0];
    socketMap[user] = this.ctx.socket.id;
  }
  async chat() {
    const from = this.ctx.args[0];
    const to = this.ctx.args[1];
    const message = this.ctx.args[2];
    console.log(from + '发消息给' + to);
    this.ctx.socket.nsp.sockets[socketMap[to]].emit('res', message);
  }
}

module.exports = IOController;
