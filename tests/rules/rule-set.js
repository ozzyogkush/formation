'use strict';

const $ = require('jquery');
const assert = require('chai').assert;
const sinon = require('sinon');

const ruleStamp = require('../../src/rules/rule');
const ruleSetStamp = require('../../src/rules/rule-set');

describe('Objects created using the `ruleSetStamp`', function() {
  let radioRulesSet;
  let radioRulesSetMock;
  beforeEach(function() {
    radioRulesSet = ruleSetStamp();
    radioRulesSetMock = sinon.mock(radioRulesSet);
  });
  describe('`isFormationRuleSet()`', function() {
    it('returns true', function() {
      assert.isTrue(radioRulesSet.isFormationRuleSet());
    });
  });

  describe('`add()`', function() {
    it('should attempt to push a rule onto the list', function() {
      const newRule = ruleStamp();
      let rules = [];
      let rulesMock = sinon.mock(rules);

      radioRulesSetMock.expects('getRules').once().returns(rules);
      rulesMock.expects('push').once().withArgs(newRule);
      assert.equal(radioRulesSet.add(newRule), radioRulesSet);

      radioRulesSetMock.verify();
    });
  });

  describe('`getRules()`', function() {
    it('should return 0 rules and be an array', function() {
      const rules = radioRulesSet.getRules();
      assert.isArray(rules);
      assert.strictEqual(rules.length, 0);
    });
  });
});
