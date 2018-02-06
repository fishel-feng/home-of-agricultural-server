'use strict';

module.exports = function (app) {
  var mongoose = app.mongoose;
  var MessageSchema = new mongoose.Schema({
    myId: String,
    type: String,
    userId: String,
    nickName: String,
    circleId: String,
    questionId: String,
    title: String,
    time: {
      type: Date,
      default: Date.now
    }
  });

  return mongoose.model('Message', MessageSchema);
};
//# sourceMappingURL=message.js.map