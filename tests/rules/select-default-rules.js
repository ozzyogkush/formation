'use strict';

const $ = require('jquery');
const assert = require('chai').assert;
const sinon = require('sinon');

const selectDefaultRulesStamp = require('../../src/rules/select-default-rules');

describe('Objects created using the `selectDefaultRulesStamp`', function() {
  let selectRulesSet;
  let selectRulesSetMock;
  beforeEach(function() {
    selectRulesSet = selectDefaultRulesStamp();
    selectRulesSetMock = sinon.mock(selectRulesSet);
  });
  describe('`dataFvDefault()`', function() {
    describe('checks that the trimmed value is not empty', function() {
      describe('when it is', function() {
        it('returns true', function () {
          let $element = $('<input type="text" value="some value"/>');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('val').once().returns('some value   ');
          assert.isTrue(selectRulesSet.dataFvDefault($element, 'data-fv-default'));

          $elementMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $element = $('<input type="text" value="    "/>');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('val').once().returns('   ');
          assert.isFalse(selectRulesSet.dataFvDefault($element, 'data-fv-default'));

          $elementMock.verify();
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let $element;
    let selectRules;
    beforeEach(function() {
      $element = $('<select><option value="">null</option><option value="bong">BONG</option></select>');
      selectRules = selectRulesSet.getRules();
    });
    it('should return 1 rules', function() {
      assert.strictEqual(selectRules.length, 1);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        selectRulesSetMock.expects('dataFvDefault').once().withArgs($element, 'data-fv-default').returns(true);
        assert.isTrue(selectRules[0].callback($element, 'data-fv-default'));

        selectRulesSetMock.verify();
      });
    });
  });
});
