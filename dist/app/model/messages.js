'use strict';

module.exports = function (app) {
  var mongoose = app.mongoose;
  var TagSchema = new mongoose.Schema({
    tagName: String
  });

  return mongoose.model('Message', TagSchema);
};
//# sourceMappingURL=message.js.map