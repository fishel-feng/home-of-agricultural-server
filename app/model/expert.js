'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const ExpertSchema = new mongoose.Schema({
    userId: String,
    realName: String,
    idCardNumber: String,
    urls: Array,
    tag: String,
    message: String,
  });
  return mongoose.model('Expert', ExpertSchema);
};
