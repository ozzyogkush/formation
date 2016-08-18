'use strict';

const $ = require('jquery');
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
      assert.isTrue(rulesSet.isFormationRuleSet());
    });
  });

  describe('`add()`', function() {
    it('should attempt to push a rule onto the list', function() {
      const newRule = ruleStamp();
      let rules = [];
      let rulesMock = sinon.mock(rules);

      rulesSetMock.expects('getRules').once().returns(rules);
      rulesMock.expects('push').once().withArgs(newRule);
      assert.equal(rulesSet.add(newRule), rulesSet);

      rulesSetMock.verify();
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
    let $input;
    beforeEach(function() {
      $input = $('<input type="text" name="test" id="test1" value="take a test toke" />');
    });

    it('should return the value passed in', function() {
      assert.equal(rulesSet.getAttributeOwner($input), $input);
    });
  });

  describe('`process()`', function() {
    let $input;
    let $inputMock;
    beforeEach(function() {
      $input = $('<input type="text" name="test" id="test1" value="take a test toke" />');
      $inputMock = sinon.mock($input);
    });
    describe('when a rule fails', function() {
      it('returns false', function() {
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

        rulesSetMock.expects('getAttributeOwner').once().withArgs($input).returns($input);
        rulesSetMock.expects('getRules').once().returns(rules);
        $inputMock.expects('attr').never().withArgs('data-fv-default');
        $inputMock.expects('attr').once().withArgs('data-fv-rule-called').returns('1');
        $inputMock.expects('attr').once().withArgs('data-fv-rule-never-called-1').returns(undefined);
        $inputMock.expects('attr').never().withArgs('data-fv-rule-never-called-2');
        assert.isFalse(rulesSet.process($input));

        rulesSetMock.verify();
        $inputMock.verify();
      });
    });
    describe('when all rules pass', function() {
      it('returns true', function() {
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

        rulesSetMock.expects('getAttributeOwner').once().withArgs($input).returns($input);
        rulesSetMock.expects('getRules').once().returns(rules);
        $inputMock.expects('attr').never().withArgs('data-fv-default');
        $inputMock.expects('attr').once().withArgs('data-fv-rule-called').returns('1');
        $inputMock.expects('attr').once().withArgs('data-fv-rule-called-2').returns('1');
        assert.isTrue(rulesSet.process($input));

        rulesSetMock.verify();
        $inputMock.verify();
      });
    });
  });
});
