'use strict';

module.exports = function (app) {
  var mongoose = app.mongoose;
  var ChatSchema = new mongoose.Schema({
    chatId: String,
    type: String,
    content: String,
    sender: String,
    time: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('Chat', ChatSchema);
};
//# sourceMappingURL=chat.js.map