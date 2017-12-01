'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    tel: String,
    password: String,
    likes: Array,
  });

  return mongoose.model('User', UserSchema);
};
