'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const MessageSchema = new mongoose.Schema({
    myId: String,
    type: String,
    userId: String,
    nickName: String,
    circleId: String,
    questionId: String,
    title: String,
    time: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('Message', MessageSchema);
};
