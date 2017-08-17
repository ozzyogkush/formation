'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');

const ruleStamp = require('../../src/rules/rule');
const ruleSetStamp = require('../../src/rules/rule-set');

describe('Objects created using the `ruleSetStamp`', function() {
  let rulesSet;
  let rulesSetMock;
  beforeEach(function() {
    rulesSet = ruleSetStamp();
    rulesSetMock = sinon.mock(rulesSet);
  });
  describe('`isFormationRuleSet()`', function() {
    it('returns true', function() {
      assert.equal(rulesSet.isFormationRuleSet(), true);
    });
  });

  describe('`add()`', function() {
    it('should attempt to push a rule onto the list', function() {
      const newRule = ruleStamp();
      assert.equal(rulesSet.add(newRule), rulesSet);
      assert.equal(rulesSet.getRules().slice(-1)[0], newRule);
    });
  });

  describe('`getRules()`', function() {
    it('should return 0 rules and be an array', function() {
      const rules = rulesSet.getRules();
      assert.isArray(rules);
      assert.strictEqual(rules.length, 0);
    });
  });

  describe('`getAttributeOwner()`', function() {
    it('should return the value passed in', function() {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      assert.equal(rulesSet.getAttributeOwner(input), input);
    });
  });

  describe('`process()`', function() {
    let input;
    beforeEach(function() {
      input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('data-fv-required', 1);
    });
    describe('when a rule fails', function() {
      it('returns false', function() {
        input.setAttribute('data-fv-rule-called', 1);
        const rules = [
          ruleStamp({
            'name' : 'default',
            'callback' : function() { return true; }
          }),
          ruleStamp({
            'name' : 'rule-never-called-1',
            'callback' : function() { throw new Error('should never be called'); }
          }),
          ruleStamp({
            'name' : 'rule-called',
            'callback' : function() { return false; }
          }),
          ruleStamp({
            'name' : 'rule-never-called-2',
            'callback' : function() { throw new Error('should never be called'); }
          })
        ];
        rules.forEach(rule => rulesSet.add(rule));
        assert.equal(rulesSet.process(input), false);
      });
    });
    describe('when all rules pass', function() {
      it('returns true', function() {
        input.setAttribute('data-fv-rule-called', 1);
        input.setAttribute('data-fv-rule-called-2', 1);
        const rules = [
          ruleStamp({
            'name' : 'default',
            'callback' : function() { return true; }
          }),
          ruleStamp({
            'name' : 'rule-called',
            'callback' : function() { return true; }
          }),
          ruleStamp({
            'name' : 'rule-called-2',
            'callback' : function() { return true; }
          })
        ];
        rules.forEach(rule => rulesSet.add(rule));
        assert.equal(rulesSet.process(input), true);
      });
    });
  });
});
