'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const CircleSchema = new mongoose.Schema({
    userId: String,
    nickName: String,
    headImage: String,
    time: {
      type: Date,
      default: Date.now,
    },
    content: String,
    images: Array,
    count: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    comments: [{
      _id: Number,
      userId: String,
      nickName: String,
      headImage: String,
      time: {
        type: Date,
        default: Date.now,
      },
      content: String,
      targetId: String,
      targetName: String,
    }],
    likeCount: {
      type: Number,
      default: 0,
    },
    likes: [{
      userId: String,
      nickName: String,
      headImage: String,
      description: String,
    }],
  });

  return mongoose.model('Circle', CircleSchema);
};
