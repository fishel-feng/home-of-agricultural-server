'use strict';

module.exports = function (app) {
  var mongoose = app.mongoose;
  var ExpertSchema = new mongoose.Schema({
    userId: String,
    realName: String,
    idCardNumber: String,
    urls: Array,
    tag: String,
    message: String
  });
  return mongoose.model('Expert', ExpertSchema);
};
//# sourceMappingURL=expert.js.map