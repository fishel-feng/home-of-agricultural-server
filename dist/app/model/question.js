'use strict';

module.exports = function (app) {
  var mongoose = app.mongoose;
  var QuestionSchema = new mongoose.Schema({
    userId: String,
    nickName: String,
    headImage: String,
    location: String,
    content: String,
    desc: String,
    title: String,
    images: Array,
    tag: {
      tagName: String,
      tagId: String
    },
    time: {
      type: Date,
      default: Date.now
    },
    count: {
      type: Number,
      default: 0
    },
    answerCount: {
      type: Number,
      default: 0
    },
    answers: [{
      _id: Number,
      userId: String,
      nickName: String,
      headImage: String,
      certification: String,
      images: Array,
      time: {
        type: Date,
        default: Date.now
      },
      content: String
    }],
    attentions: Array
  });

  return mongoose.model('Question', QuestionSchema);
};
//# sourceMappingURL=question.js.map