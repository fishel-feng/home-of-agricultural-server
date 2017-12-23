'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    tel: String,
    password: String,
    certification: {
      type: Boolean,
      default: false,
    },
    tags: Array,
    nickName: String,
    headImage: String,
    gender: String,
    age: Number,
    job: String,
    location: String,
    description: String,
    collectionCount: {
      type: Number,
      default: 0,
    },
    collections: [{
      articleId: String,
      title: String,
    }],
    attentionCount: {
      type: Number,
      default: 0,
    },
    attentions: Array,
    followingCount: {
      type: Number,
      default: 0,
    },
    followings: Array,
    followerCount: {
      type: Number,
      default: 0,
    },
    followers: Array,
    questionCount: {
      type: Number,
      default: 0,
    },
    answerCount: {
      type: Number,
      default: 0,
    },
    answers: Array,
    circleCount: {
      type: Number,
      default: 0,
    },
    likes: [{
      circleId: String,
    }],
  });

  return mongoose.model('User', UserSchema);
};
