'use strict';

module.exports = app => {
  const {
    Test,
  } = app.model;

  class TestService extends app.Service {
    async index() {
      const res = await Test.findOne({
        prop1: 2,
      }).populate({
        path: 'prop2',
        select: 'prop1',
      });
      console.log(res);
    }
  }
  return TestService;
};
