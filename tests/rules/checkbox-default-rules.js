'use strict';

const $ = require('jquery');
const assert = require('chai').assert;
const sinon = require('sinon');

const checkboxDefaultRulesStamp = require('../../src/rules/checkbox-default-rules');

describe('Objects created using the `checkboxDefaultRulesStamp`', function() {
  let checkboxRulesSet;
  let checkboxRulesSetMock;
  beforeEach(function() {
    checkboxRulesSet = checkboxDefaultRulesStamp();
    checkboxRulesSetMock = sinon.mock(checkboxRulesSet);
  });
  describe('`dataFvDefault()`', function() {
    describe('checks that at least one is checked', function() {
      describe('when it is', function() {
        it('returns true', function () {
          let $checkbox = $('<input type="checkbox" name="test" id="test1" checked="checked" />');
          let $checkboxMock = sinon.mock($checkbox);

          $checkboxMock.expects('attr').once().withArgs('name').returns('test');
          checkboxRulesSetMock.expects('getAllCheckboxesOrRadiosByName')
            .once().withArgs('test')
            .returns($checkbox);
          $checkboxMock.expects('filter').once().withArgs(':checked').returns($checkbox);
          assert.isTrue(checkboxRulesSet.dataFvDefault($checkbox, 'data-fv-default'));

          $checkboxMock.verify();
          checkboxRulesSetMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $checkbox = $('<input type="checkbox" name="test" value="1" />');
          let $checkboxMock = sinon.mock($checkbox);

          $checkboxMock.expects('attr').once().withArgs('name').returns('test');
          checkboxRulesSetMock.expects('getAllCheckboxesOrRadiosByName')
            .once().withArgs('test')
            .returns($checkbox);
          $checkboxMock.expects('filter').once().withArgs(':checked').returns($());
          assert.isFalse(checkboxRulesSet.dataFvDefault($checkbox, 'data-fv-default'));

          $checkboxMock.verify();
          checkboxRulesSetMock.verify();
        });
      });
    });
  });

  describe('`dataFvMinSelected()`', function() {
    describe('checks that number of checkboxes selected in the list is greater or equal to the value specified in the attribute', function() {
      describe('when it is', function() {
        it('returns true', function () {
          let $checkbox = $('<input type="checkbox" name="test" id="test1" data-fv-min-selected="1" checked="checked" />');
          let $checkboxMock = sinon.mock($checkbox);

          $checkboxMock.expects('attr').once().withArgs('data-fv-min-selected').returns('1');
          $checkboxMock.expects('attr').once().withArgs('name').returns('test');
          checkboxRulesSetMock.expects('getAllCheckboxesOrRadiosByName')
            .once().withArgs('test')
            .returns($checkbox);
          assert.isTrue(checkboxRulesSet.dataFvMinSelected($checkbox, 'data-fv-min-selected'));

          $checkboxMock.verify();
          checkboxRulesSetMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $checkbox = $('<input type="checkbox" name="test" id="test1" data-fv-min-selected="2" checked="checked" />');
          let $checkboxMock = sinon.mock($checkbox);

          $checkboxMock.expects('attr').once().withArgs('data-fv-min-selected').returns('2');
          $checkboxMock.expects('attr').once().withArgs('name').returns('test');
          checkboxRulesSetMock.expects('getAllCheckboxesOrRadiosByName')
            .once().withArgs('test')
            .returns($checkbox);
          assert.isFalse(checkboxRulesSet.dataFvMinSelected($checkbox, 'data-fv-min-selected'));

          $checkboxMock.verify();
          checkboxRulesSetMock.verify();
        });
      });
    });
  });

  describe('`dataFvMaxSelected()`', function() {
    describe('checks that number of checkboxes selected in the list is greater or equal to the value specified in the attribute', function() {
      describe('when it is', function() {
        it('returns true', function () {
          let $checkbox = $('<input type="checkbox" name="test" id="test1" data-fv-max-selected="1" checked="checked" />');
          let $checkboxMock = sinon.mock($checkbox);

          $checkboxMock.expects('attr').once().withArgs('data-fv-max-selected').returns('1');
          $checkboxMock.expects('attr').once().withArgs('name').returns('test');
          checkboxRulesSetMock.expects('getAllCheckboxesOrRadiosByName')
            .once().withArgs('test')
            .returns($checkbox);
          assert.isTrue(checkboxRulesSet.dataFvMaxSelected($checkbox, 'data-fv-max-selected'));

          $checkboxMock.verify();
          checkboxRulesSetMock.verify();
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          let $checkbox = $('<input type="checkbox" name="test" id="test1" data-fv-max-selected="0" checked="checked" />');
          let $checkboxMock = sinon.mock($checkbox);

          $checkboxMock.expects('attr').once().withArgs('data-fv-max-selected').returns('0');
          $checkboxMock.expects('attr').once().withArgs('name').returns('test');
          checkboxRulesSetMock.expects('getAllCheckboxesOrRadiosByName')
            .once().withArgs('test')
            .returns($checkbox);
          assert.isFalse(checkboxRulesSet.dataFvMaxSelected($checkbox, 'data-fv-max-selected'));

          $checkboxMock.verify();
          checkboxRulesSetMock.verify();
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let $checkbox;
    let checkboxRules;
    beforeEach(function() {
      $checkbox = $('<input type="checkbox" name="test" id="test1" checked="checked" />');
      checkboxRules = checkboxRulesSet.getRules();
    });
    it('should return 1 rule', function() {
      assert.strictEqual(checkboxRules.length, 3);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        checkboxRulesSetMock.expects('dataFvDefault').once().withArgs($checkbox, 'data-fv-default').returns(true);
        assert.isTrue(checkboxRules[0].callback($checkbox, 'data-fv-default'));

        checkboxRulesSetMock.verify();
      });
    });

    describe('the second rule', function() {
      it('should call `dataFvMinSelected()`', function() {
        checkboxRulesSetMock.expects('dataFvMinSelected').once().withArgs($checkbox, 'data-fv-min-selected').returns(true);
        assert.isTrue(checkboxRules[1].callback($checkbox, 'data-fv-min-selected'));

        checkboxRulesSetMock.verify();
      });
    });

    describe('the third rule', function() {
      it('should call `dataFvMaxSelected()`', function() {
        checkboxRulesSetMock.expects('dataFvMaxSelected').once().withArgs($checkbox, 'data-fv-max-selected').returns(true);
        assert.isTrue(checkboxRules[2].callback($checkbox, 'data-fv-max-selected'));

        checkboxRulesSetMock.verify();
      });
    });
  });
});
