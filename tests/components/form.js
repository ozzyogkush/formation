'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const buttonComponentStamp = require('../../src/components/button');
const eventEmitterStamp = require('../../src/utilities/node-event-emitter-stamp');
const formComponentStamp = require('../../src/components/form');
const ruleStamp = require('../../src/rules/rule');
const ruleSetStamp = require('../../src/rules/rule-set');

describe('Objects created using the `formComponentStamp`', function() {
  let formComponent;
  let formComponentMock;
  beforeEach(function() {
    formComponent = formComponentStamp({ nodeEvents : eventEmitterStamp() });
    formComponentMock = sinon.mock(formComponent);
  });

  describe('`shouldBodyKeyPressEventsProgress()`', function() {
    describe('the submit button is null', function() {
      it('should return false', function() {
        formComponentMock.expects('getSubmitButton').once().returns(null);
        assert.isFalse(formComponent.shouldBodyKeyPressEventsProgress());
        formComponentMock.verify();
      });
    });
    describe('the submit button is not null but is not linked to a DOM element', function() {
      it('should return false', function() {
        let submitButton = {exists : function(){}};
        let mockSubmitBtn = sinon.mock(submitButton);

        formComponentMock.expects('getSubmitButton').twice().returns(submitButton);
        mockSubmitBtn.expects('exists').once().returns(false);
        assert.isFalse(formComponent.shouldBodyKeyPressEventsProgress());

        formComponentMock.verify();
        mockSubmitBtn.verify();
      });
    });
    describe('the submit button is not null and is linked to a DOM element', function() {
      it('should return true', function() {
        let submitButton = {exists : function(){}};
        let mockSubmitBtn = sinon.mock(submitButton);

        formComponentMock.expects('getSubmitButton').twice().returns(submitButton);
        mockSubmitBtn.expects('exists').once().returns(true);
        assert.isTrue(formComponent.shouldBodyKeyPressEventsProgress());

        formComponentMock.verify();
        mockSubmitBtn.verify();
      });
    });
  });

  describe('`registerRule()`', function() {
    describe('the rule is not an instance of a Formation Rule', function() {
      it('throws an error', function() {
        let rule = ruleStamp();
        let ruleMock = sinon.mock(rule);

        ruleMock.expects('isFormationRule').once().returns(false);

        assert.throws(
          () => {formComponent.registerRule('unimportant', rule);},
          Error,
          'The supplied `rule` object is not built from a `ruleStamp` stamp.'
        );

        ruleMock.verify();
      });
    });
    describe('the rule is an instance of a Formation Rule', function() {
      it('adds the rule to the appropriate supported type rule set', function() {
        let rule = ruleStamp();
        let ruleMock = sinon.mock(rule);
        let ruleSet = ruleSetStamp();
        let ruleSetMock = sinon.mock(ruleSet);

        ruleMock.expects('isFormationRule').once().returns(true);
        formComponentMock.expects('getRuleSetBySupportedElementType').once().withArgs('text').returns(ruleSet);
        ruleSetMock.expects('add').once().withArgs(rule).returns(ruleSet);

        formComponent.registerRule('text', rule);

        ruleMock.verify();
        ruleSetMock.verify();
      });
    });
  });

  describe('`isFormComponent()`', function() {
    it('should return true', function() {
      assert.isTrue(formComponent.isFormComponent());
    });
  });

  describe('`initialized()`', function() {
    describe('it has not been initialized', function() {
      it('should return false', function() {
        assert.isFalse(formComponent.initialized());
      });
    });
  });

  describe('`initForm()`', function() {
    describe('it has not been initialized', function() {
      describe('no required fields are present in the form', function() {
        it('throw an error about missing required fields', function() {
          const formNode = document.createElement('form');
          formNode.setAttribute('data-formation', 1);
          document.body.appendChild(formNode);

          assert.throws(
            () => { formComponent.initForm(formNode);},
            Error,
            'No required fields found, cannot proceed.'
          );

          document.body.removeChild(formNode);
        });
      });
      describe('required fields are present in the form', function() {
        it('sets the required and optional fields and initializes their validity flags, and sets the form buttons (submit, preview, etc)', function() {
          const formNode = document.createElement('form');
          formNode.setAttribute('data-formation', 1);
          const input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-required', 1);
          const optionalInput = document.createElement('input');
          optionalInput.setAttribute('type', 'text');
          optionalInput.setAttribute('data-fv-optional', 1);
          const textarea = document.createElement('textarea');
          textarea.setAttribute('data-fv-required', 1);
          const select = document.createElement('select');
          select.setAttribute('data-fv-required', 1);
          const submit = document.createElement('button');
          submit.setAttribute('type', 'submit');
          submit.setAttribute('data-fv-form-submit', 1);

          formNode.appendChild(input);
          formNode.appendChild(optionalInput);
          formNode.appendChild(textarea);
          formNode.appendChild(select);
          formNode.appendChild(submit);
          document.body.appendChild(formNode);

          assert.equal(formComponent.initForm(formNode), formComponent);
          assert.equal(formNode.getAttribute('data-fv-valid'), '0');
          assert.equal(input.getAttribute('data-fv-valid'), '0');
          assert.equal(optionalInput.getAttribute('data-fv-valid'), '0');
          assert.equal(textarea.getAttribute('data-fv-valid'), '0');
          assert.equal(select.getAttribute('data-fv-valid'), '0');

          document.body.removeChild(formNode);
        });
      });
    });
    describe('it has been initialized', function() {
      it('should log that it was already initialized and return itself', function() {
        const formNode = document.createElement('form');
        formNode.setAttribute('data-formation', 1);
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('data-fv-required', 1);
        input.value = 'test';
        const optionalInput = document.createElement('input');
        optionalInput.setAttribute('type', 'text');
        optionalInput.setAttribute('data-fv-optional', 1);
        const textarea = document.createElement('textarea');
        textarea.setAttribute('data-fv-required', 1);
        const select = document.createElement('select');
        select.setAttribute('data-fv-required', 1);
        const submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('data-fv-form-submit', 1);

        formNode.appendChild(input);
        formNode.appendChild(optionalInput);
        formNode.appendChild(textarea);
        formNode.appendChild(select);
        formNode.appendChild(submit);
        document.body.appendChild(formNode);

        assert.equal(formComponent.initForm(formNode), formComponent);
        assert.equal(formNode.getAttribute('data-fv-valid'), '0');
        assert.equal(input.getAttribute('data-fv-valid'), '0');
        assert.equal(optionalInput.getAttribute('data-fv-valid'), '0');
        assert.equal(textarea.getAttribute('data-fv-valid'), '0');
        assert.equal(select.getAttribute('data-fv-valid'), '0');

        formComponentMock.expects('warn').once().withArgs('This `formComponent` is already initialized, skipping.');
        assert.equal(formComponent.initForm(formNode), formComponent);

        formComponentMock.verify();
        document.body.removeChild(formNode);
      });
    });
  });

  describe('`getRequiredFields()`', function() {
    describe('it has not been set', function() {
      it('should return null', function() {
        assert.equal(formComponent.getRequiredFields(), null);
      });
    });
  });

  describe('`getOptionalFields()`', function() {
    describe('it has not been set', function() {
      it('should return null', function() {
        assert.equal(formComponent.getOptionalFields(), null);
      });
    });
  });

  describe('`getSubmitButton()`', function() {
    describe('it has not been set', function() {
      it('should return null', function() {
        assert.equal(formComponent.getSubmitButton(), null);
      });
    });
  });

  describe('`getSupportedElementTypesMap()`', function() {
    it('returns the value of the private `__supportedElementTypesMap` object', function() {
      assert.deepEqual(
        formComponent.getSupportedElementTypesMap(),
        {
          'text' : 'input:text,input:password,input:email,input:tel,textarea',
          'checkbox' : 'input:checkbox',
          'radio' : 'input:radio',
          'select': 'select'
        }
      );
    });
  });

  describe('`getSupportedElementTypeRuleSets()`', function() {
    it('returns all the supported rule sets', function() {
      const ruleSets = formComponent.getSupportedElementTypeRuleSets();
      assert.property(ruleSets, 'text');
      assert.isTrue(ruleSets.text.isFormationRuleSet());
      assert.property(ruleSets, 'checkbox');
      assert.isTrue(ruleSets.checkbox.isFormationRuleSet());
      assert.property(ruleSets, 'radio');
      assert.isTrue(ruleSets.radio.isFormationRuleSet());
      assert.property(ruleSets, 'select');
      assert.isTrue(ruleSets.select.isFormationRuleSet());
    });
  });

  describe('`getRuleSetBySupportedElementType()`', function() {
    it('returns the rule set of the requested type', function() {
      assert.isTrue(formComponent.getRuleSetBySupportedElementType('text').isFormationRuleSet());
    });
  });

  describe('`setSupportedElementTypeRuleSet()`', function() {
    it('sets the rule set for the requested type', function() {
      let ruleSet = ruleSetStamp();
      formComponent.setSupportedElementTypeRuleSet('checkbox', ruleSet);
      assert.strictEqual(
        formComponent.getRuleSetBySupportedElementType('checkbox'), ruleSet
      );
    });
  });
});
