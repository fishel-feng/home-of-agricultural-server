'use strict';

module.exports = app => {
  const mongoose = app.mongoose;

  const InnerChildSchema = new mongoose.Schema({
    prop1: String,
  });
  const ChildSchema = new mongoose.Schema({
    prop1: String,
    prop2: [ InnerChildSchema ],
  });
  const TestSchema = new mongoose.Schema({
    prop1: String,
    prop2: [ ChildSchema ],
  });
  return mongoose.model('Test', TestSchema);
};
