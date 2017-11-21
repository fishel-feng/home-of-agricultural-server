'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const CircleSchema = new mongoose.Schema({

  });

  return mongoose.model('Circle', CircleSchema);
};
