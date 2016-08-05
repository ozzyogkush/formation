'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');

const ruleStamp = require('../../src/rules/rule');

describe('Objects created using the `ruleStamp`', function() {
  describe('`isFormationRule()`', function() {
    it('should return true', function() {
      let rule = ruleStamp();

      assert.isTrue(rule.isFormationRule());
    });
  });
  describe('`callback()`', function() {
    it('should throw an Error that it is not implemented', function() {
      let rule = ruleStamp();

      assert.throws(
        () => rule.callback(),
        Error,
        'Rule callback for `undefined` is not implemented'
      );
    });
  });
});
