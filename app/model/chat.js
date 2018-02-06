'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ChatSchema = new mongoose.Schema({
    chatId: String,
    type: String,
    content: String,
    sender: String,
    time: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('Chat', ChatSchema);
};
