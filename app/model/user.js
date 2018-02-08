'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    tel: String,
    password: String,
    certification: {
      type: String,
      default: '',
    },
    tags: Array,
    nickName: String,
    headImage: {
      type: String,
      default: 'default.png',
    },
    gender: String,
    age: Number,
    job: String,
    location: String,
    description: {
      type: String,
      default: '这个人很懒，什么都没有留下。',
    },
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
    likes: Array,
  });

  return mongoose.model('User', UserSchema);
};
