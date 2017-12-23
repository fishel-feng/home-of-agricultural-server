'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const TagSchema = new mongoose.Schema({
    tagName: String,
  });

  return mongoose.model('Tag', TagSchema);
};
