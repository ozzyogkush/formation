'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');

const selectDefaultRulesStamp = require('../../src/rules/select-default-rules');

describe('Objects created using the `selectDefaultRulesStamp`', function() {
  let selectRulesSet;
  beforeEach(function() {
    selectRulesSet = selectDefaultRulesStamp();
  });
  describe('`dataFvDefault()`', function() {
    describe('checks that the trimmed value is not empty', function() {
      describe('when it is', function() {
        it('returns true', function () {
          const select = document.createElement('select');
          const selectedOption = document.createElement('option');
          selectedOption.setAttribute('selected', 'selected');
          selectedOption.value = 'Good value';
          select.appendChild(selectedOption);

          assert.equal(selectRulesSet.dataFvDefault(select, 'data-fv-default'), true);
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          const select = document.createElement('select');
          const selectedOption = document.createElement('option');
          const unselectedOption = document.createElement('option');
          unselectedOption.value = 'Good value';
          selectedOption.setAttribute('selected', 'selected');
          selectedOption.value = '';
          select.appendChild(unselectedOption);
          select.appendChild(selectedOption);

          assert.equal(selectRulesSet.dataFvDefault(select, 'data-fv-default'), false);
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let selectRules;
    beforeEach(function() {
      selectRules = selectRulesSet.getRules();
    });
    it('should return 1 rules', function() {
      assert.strictEqual(selectRules.length, 1);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        const select = document.createElement('select');
        const selectedOption = document.createElement('option');
        const unselectedOption = document.createElement('option');
        unselectedOption.value = '';
        selectedOption.setAttribute('selected', 'selected');
        selectedOption.value = 'Good value';
        select.appendChild(unselectedOption);
        select.appendChild(selectedOption);

        assert.equal(selectRules[0].callback(select, 'data-fv-default'), true);
      });
    });
  });
});
