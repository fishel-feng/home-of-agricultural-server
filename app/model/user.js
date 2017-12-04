'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    tel: String,
    password: String,
    nickName: String,
    headImage: String,
    gender: String,
    age: Number,
    job: String,
    location: String,
    likes: Array,
  });

  return mongoose.model('User', UserSchema);
};
