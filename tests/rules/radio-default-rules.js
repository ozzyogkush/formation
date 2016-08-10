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
          let $radio = $('<input type="radio" name="test" id="test1" value="1" checked="checked" />');
          let $radioMock = sinon.mock($radio);

          $radioMock.expects('attr').once().withArgs('name').returns('test');
          radioRulesSetMock.expects('getAllCheckboxesOrRadiosByName')
            .once().withArgs('test')
            .returns($radio);
          $radioMock.expects('filter').once().withArgs(':checked').returns($radio);
          assert.isTrue(radioRulesSet.dataFvDefault($radio, 'data-fv-default'));

          $radioMock.verify();
          radioRulesSetMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $radio = $('<input type="radio" name="test" id="test1" value="1" />');
          let $radioMock = sinon.mock($radio);

          $radioMock.expects('attr').once().withArgs('name').returns('test');
          radioRulesSetMock.expects('getAllCheckboxesOrRadiosByName')
            .once().withArgs('test')
            .returns($radio);
          $radioMock.expects('filter').once().withArgs(':checked').returns($());
          assert.isFalse(radioRulesSet.dataFvDefault($radio, 'data-fv-default'));

          $radioMock.verify();
          radioRulesSetMock.verify();
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let $radio;
    let radioRules;
    beforeEach(function() {
      $radio = $('<input type="radio" name="test" id="test1" value="1" checked="checked" />');
      radioRules = radioRulesSet.getRules();
    });
    it('should return 1 rule', function() {
      assert.strictEqual(radioRules.length, 1);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        radioRulesSetMock.expects('dataFvDefault').once().withArgs($radio, 'data-fv-default').returns(true);
        assert.isTrue(radioRules[0].callback($radio, 'data-fv-default'));

        radioRulesSetMock.verify();
      });
    });
  });
});
