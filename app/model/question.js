'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const QuestionSchema = new mongoose.Schema({
    userId: String,
    nickName: String,
    headImage: String,
    content: String,
    title: String,
    images: Array,
    tags: Array,
    time: {
      type: Date,
      default: Date.now,
    },
    finishState: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
    answerCount: {
      type: Number,
      default: 0,
    },
    answers: [{
      _id: Number,
      userId: String,
      nickName: String,
      headImage: String,
      certification: Boolean,
      time: {
        type: Date,
        default: Date.now,
      },
      content: String,
    }],
  });

  return mongoose.model('Question', QuestionSchema);
};
