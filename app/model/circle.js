'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const CircleSchema = new mongoose.Schema({
    userId: Schema.Types.ObjectId,
    nickName: String,
    HeadImage: String,
    time: {
      type: Date,
      default: Date.now,
    },
    content: String,
    images: Array,
    commentCount: {
      type: Number,
      default: 0,
    },
    comments: [{
      userId: Schema.Types.ObjectId,
      nickName: String,
      HeadImage: String,
      time: {
        type: Date,
        default: Date.now,
      },
      content: String,
      InnerComments: [
        // todo
      ],
    }],
    likeCount: {
      type: Number,
      default: 0,
    },
    likes: [{
      userId: Schema.Types.ObjectId,
      nickName: String,
      HeadImage: String,
    }],
  });

  return mongoose.model('Circle', CircleSchema);
};
