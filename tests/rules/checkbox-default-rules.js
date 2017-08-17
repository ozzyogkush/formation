'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');

const checkboxDefaultRulesStamp = require('../../src/rules/checkbox-default-rules');

describe('Objects created using the `checkboxDefaultRulesStamp`', function() {
  let checkboxRulesSet;
  beforeEach(function() {
    checkboxRulesSet = checkboxDefaultRulesStamp();
  });
  describe('`dataFvDefault()`', function() {
    describe('checks that at least one is checked', function() {
      describe('when it is', function() {
        it('returns true', function () {
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('name', 'testcb');
          checkbox.setAttribute('checked', 'checked');
          checkbox.checked = 1;
          const form = document.createElement('form');
          form.setAttribute('data-formation', 1);
          form.appendChild(checkbox);

          assert.equal(checkboxRulesSet.dataFvDefault(checkbox, 'data-fv-default'), true);
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('name', 'testcb');
          const form = document.createElement('form');
          form.setAttribute('data-formation', 1);
          form.appendChild(checkbox);

          assert.equal(checkboxRulesSet.dataFvDefault(checkbox, 'data-fv-default'), false);
        });
      });
    });
  });

  describe('`dataFvMinSelected()`', function() {
    describe('checks that number of checkboxes selected in the list is greater or equal to the value specified in the attribute', function() {
      describe('when it is', function() {
        it('returns true', function () {
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('name', 'testcb');
          checkbox.setAttribute('checked', 'checked');
          checkbox.checked = 1;
          const checkboxContainer = document.createElement('div');
          checkboxContainer.setAttribute('data-fv-group-container', 'testcb');
          checkboxContainer.setAttribute('data-fv-min-selected', 1);
          const form = document.createElement('form');
          form.setAttribute('data-formation', 1);

          checkboxContainer.appendChild(checkbox);
          form.appendChild(checkboxContainer);

          assert.equal(checkboxRulesSet.dataFvMinSelected(checkbox, 'data-fv-min-selected'), true);
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('name', 'testcb');
          checkbox.setAttribute('checked', 'checked');
          checkbox.checked = 1;
          const checkboxContainer = document.createElement('div');
          checkboxContainer.setAttribute('data-fv-group-container', 'testcb');
          checkboxContainer.setAttribute('data-fv-min-selected', 2);
          const form = document.createElement('form');
          form.setAttribute('data-formation', 1);

          checkboxContainer.appendChild(checkbox);
          form.appendChild(checkboxContainer);

          assert.equal(checkboxRulesSet.dataFvMinSelected(checkbox, 'data-fv-min-selected'), false);
        });
      });
    });
  });

  describe('`dataFvMaxSelected()`', function() {
    describe('checks that number of checkboxes selected in the list is greater or equal to the value specified in the attribute', function() {
      describe('when it is', function() {
        it('returns true', function () {
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('name', 'testcb');
          checkbox.setAttribute('checked', 'checked');
          checkbox.checked = 1;
          const checkboxContainer = document.createElement('div');
          checkboxContainer.setAttribute('data-fv-group-container', 'testcb');
          checkboxContainer.setAttribute('data-fv-max-selected', 1);
          const form = document.createElement('form');
          form.setAttribute('data-formation', 1);

          checkboxContainer.appendChild(checkbox);
          form.appendChild(checkboxContainer);

          assert.equal(checkboxRulesSet.dataFvMaxSelected(checkbox, 'data-fv-max-selected'), true);
        });
      });
      describe('when it is not', function() {
        it('returns false', function () {
          const checkbox = document.createElement('input');
          checkbox.setAttribute('type', 'checkbox');
          checkbox.setAttribute('name', 'testcb');
          checkbox.setAttribute('checked', 'checked');
          checkbox.checked = 1;
          const checkboxContainer = document.createElement('div');
          checkboxContainer.setAttribute('data-fv-group-container', 'testcb');
          checkboxContainer.setAttribute('data-fv-max-selected', 0);
          const form = document.createElement('form');
          form.setAttribute('data-formation', 1);

          checkboxContainer.appendChild(checkbox);
          form.appendChild(checkboxContainer);

          assert.equal(checkboxRulesSet.dataFvMaxSelected(checkbox, 'data-fv-max-selected'), false);
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let checkbox;
    let checkboxRules;
    beforeEach(function() {
      checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'testcb');
      checkbox.setAttribute('checked', 'checked');
      checkbox.checked = 1;
      checkboxRules = checkboxRulesSet.getRules();
    });
    it('should return 1 rule', function() {
      assert.strictEqual(checkboxRules.length, 3);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        checkbox.setAttribute('data-fv-required', 1);
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);
        form.appendChild(checkbox);
        assert.equal(checkboxRules[0].callback(checkbox, 'data-fv-default'), true);
      });
    });

    describe('the second rule', function() {
      it('should call `dataFvMinSelected()`', function() {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.setAttribute('data-fv-group-container', 'testcb');
        checkboxContainer.setAttribute('data-fv-min-selected', 1);
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);

        checkboxContainer.appendChild(checkbox);
        form.appendChild(checkboxContainer);
        assert.equal(checkboxRules[1].callback(checkbox, 'data-fv-min-selected'), true);

        checkboxContainer.setAttribute('data-fv-min-selected', 2);
        assert.equal(checkboxRules[1].callback(checkbox, 'data-fv-min-selected'), false);
      });
    });

    describe('the third rule', function() {
      it('should call `dataFvMaxSelected()`', function() {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.setAttribute('data-fv-group-container', 'testcb');
        checkboxContainer.setAttribute('data-fv-max-selected', 1);
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);

        checkboxContainer.appendChild(checkbox);
        form.appendChild(checkboxContainer);

        assert.equal(checkboxRules[2].callback(checkbox, 'data-fv-max-selected'), true);

        checkboxContainer.setAttribute('data-fv-max-selected', 0);
        assert.equal(checkboxRules[2].callback(checkbox, 'data-fv-max-selected'), false);
      });
    });
  });

  describe('`getAttributeOwner()`', function() {
    it('should return the value returned from `getCheckboxOrRadioContainer()`', function() {
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('name', 'testcb');
      checkbox.setAttribute('checked', 'checked');
      checkbox.checked = 1;

      assert.equal(checkboxRulesSet.getAttributeOwner(checkbox), null);

      const checkboxContainer = document.createElement('div');
      checkboxContainer.setAttribute('data-fv-group-container', 'testcb');
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);

      checkboxContainer.appendChild(checkbox);
      form.appendChild(checkboxContainer);

      assert.equal(checkboxRulesSet.getAttributeOwner(checkbox), checkboxContainer);
    });
  });
});
