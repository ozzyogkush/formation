'use strict';

const $ = require('jquery');
const assert = require('chai').assert;
const sinon = require('sinon');

const radioDefaultRulesStamp = require('../../src/rules/radio-default-rules');

describe('Objects created using the `radioDefaultRulesStamp`', function() {
  let radioRulesSet;
  let radioRulesSetMock;
  beforeEach(function() {
    radioRulesSet = radioDefaultRulesStamp();
    radioRulesSetMock = sinon.mock(radioRulesSet);
  });
  describe('`dataFvDefault()`', function() {
    describe('checks that at least one is checked', function() {
      describe('when it is', function() {
        it('returns true', function () {
          let $radios = $('<input type="radio" name="test" id="test1" value="1" checked="checked" />');
          let $radiosMock = sinon.mock($radios);

          $radiosMock.expects('filter').once().withArgs(':checked').returns($radios.eq(0));
          assert.isTrue(radioRulesSet.dataFvDefault($radios, 'data-fv-default'));

          $radiosMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $radios = $('<input type="radio" name="test" id="test1" value="1" />');
          let $radiosMock = sinon.mock($radios);

          $radiosMock.expects('filter').once().withArgs(':checked').returns($());
          assert.isFalse(radioRulesSet.dataFvDefault($radios, 'data-fv-default'));

          $radiosMock.verify();
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let $radios;
    let radioRules;
    beforeEach(function() {
      $radios = $('<input type="radio" name="test" id="test1" value="1" checked="checked" />');
      radioRules = radioRulesSet.getRules();
    });
    it('should return 1 rule', function() {
      assert.strictEqual(radioRules.length, 1);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        radioRulesSetMock.expects('dataFvDefault').once().withArgs($radios, 'data-fv-default');
        assert.strictEqual(radioRules[0].callback($radios, 'data-fv-default'));

        radioRulesSetMock.verify();
      });
    });
  });
});
