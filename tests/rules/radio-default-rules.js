'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');

const radioDefaultRulesStamp = require('../../src/rules/radio-default-rules');

describe('Objects created using the `radioDefaultRulesStamp`', function() {
  let radioRulesSet;
  beforeEach(function() {
    radioRulesSet = radioDefaultRulesStamp();
  });
  describe('`dataFvDefault()`', function() {
    describe('checks that at least one is checked', function() {
      describe('when it is', function() {
        it('returns true', function() {
          const radio = document.createElement('input');
          radio.setAttribute('type', 'radio');
          radio.setAttribute('name', 'testcb');
          radio.setAttribute('checked', 'checked');
          radio.checked = 1;
          const form = document.createElement('form');
          form.setAttribute('data-formation', 1);
          form.appendChild(radio);

          assert.equal(radioRulesSet.dataFvDefault(radio, 'data-fv-default'), true);
        });
      });
      describe('when it is not', function() {
        it('returns false', function() {
          const radio = document.createElement('input');
          radio.setAttribute('type', 'radio');
          radio.setAttribute('name', 'testcb');
          const form = document.createElement('form');
          form.setAttribute('data-formation', 1);
          form.appendChild(radio);

          assert.equal(radioRulesSet.dataFvDefault(radio, 'data-fv-default'), false);
        });
      });
    });
  });

  describe('`getRules()`', function() {
    let radioRules;
    beforeEach(function() {
      radioRules = radioRulesSet.getRules();
    });
    it('should return 1 rule', function() {
      assert.strictEqual(radioRules.length, 1);
    });

    describe('the first rule', function() {
      it('should call `dataFvDefault()`', function() {
        const radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'testcb');
        radio.setAttribute('checked', 'checked');
        radio.checked = 1;
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);
        form.appendChild(radio);

        assert.equal(radioRules[0].callback(radio, 'data-fv-default'), true);
      });
    });
  });

  describe('`getAttributeOwner()`', function() {
    it('should return the value returned from `getCheckboxOrRadioContainer()`', function() {
      const radio = document.createElement('input');
      radio.setAttribute('type', 'radio');
      radio.setAttribute('name', 'testcb');
      radio.setAttribute('checked', 'checked');
      radio.checked = 1;

      assert.equal(radioRulesSet.getAttributeOwner(radio), null);

      const radioContainer = document.createElement('div');
      radioContainer.setAttribute('data-fv-group-container', 'testcb');
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);

      radioContainer.appendChild(radio);
      form.appendChild(radioContainer);

      assert.equal(radioRulesSet.getAttributeOwner(radio), radioContainer);
    });
  });
});
