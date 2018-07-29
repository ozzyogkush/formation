'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');

const eventEmitterEventsStamp = require('../../src/utilities/node-event-emitter-stamp');
const formEventsHandlerStamp = require('../../src/event-handlers/form-events-handler');
const ruleSetStamp = require('../../src/rules/rule-set');

describe('Objects created using the `formEventsHandlerStamp`', function() {
  let formEventsHandler;
  let formEvent;
  beforeEach(function() {
    formEvent = document.createEvent('Event');
    formEventsHandler = formEventsHandlerStamp({ nodeEvents : eventEmitterEventsStamp() });
  });

  describe('`formSubmitHandler()`', function() {
    it('should emit a `formationFormSubmit` node event', function() {
      let eventTriggered = false;
      formEventsHandler.nodeEvents.on('formationFormSubmit', e => {eventTriggered = true;});

      formEvent.initEvent('submit', true, true);
      formEventsHandler.formSubmitHandler(formEvent);

      assert.equal(eventTriggered, true);
    });
  });

  describe('`checkFormValidityHandler()`', function() {
    let formEventsHandlerMock;
    let form;
    let visibleRequired;
    beforeEach(function() {
      formEventsHandlerMock = sinon.mock(formEventsHandler);
      form = document.createElement('form');
      form.setAttribute('data-formation', 1);
      visibleRequired = [
        document.createElement('input'),
        document.createElement('select'),
        document.createElement('textarea')
      ];
      visibleRequired.forEach(vr => {
        vr.setAttribute('data-fv-required', 1);
        form.appendChild(vr);
      });
    });
    describe('when a submit button is included', function() {
      let submitButton;
      let formMock;
      beforeEach(function() {
        submitButton = document.createElement('button');
        submitButton.setAttribute('data-fv-form-submit', 1);
        form.appendChild(submitButton);
        formMock = sinon.mock(form);
        formEventsHandler.initFormComponent(form);
      });
      describe('it is already in a `submitting` state', function() {
        it('nothing happens', function() {
          formEventsHandler.getSubmitButton().setEnabled(false);
          formEventsHandler.getSubmitButton().setSubmitting(true);

          formMock.expects('dispatchEvent').never();

          formEvent.initEvent('check-form-validity', true, true);
          assert.equal(formEventsHandler.checkFormValidityHandler(formEvent), undefined);

          formEventsHandlerMock.verify();
          formMock.verify();
        });
      });
      describe('it is not already in a `submitting` state', function() {
        it('sets the enabled flag of the button and dispatches the `set-validation-flag` event', function() {
          formEventsHandler.getSubmitButton().setEnabled(true);
          formEventsHandler.getSubmitButton().setSubmitting(false);
          const submitButtonMock = sinon.mock(formEventsHandler.getSubmitButton());

          formMock.expects('dispatchEvent').once();
          submitButtonMock.expects('setEnabled').once().withArgs(sinon.match.bool);

          formEvent.initEvent('check-form-validity', true, true);
          assert.equal(formEventsHandler.checkFormValidityHandler(formEvent), undefined);

          formEventsHandlerMock.verify();
          formMock.verify();
          submitButtonMock.verify();
        });
      });
    });
    describe('triggers a `set-validation-flag` event', function() {
      let validAfterRuleCheck;
      beforeEach(function() {
        visibleRequired[0].setAttribute('type', 'text');
        form.addEventListener('set-validation-flag', e => { validAfterRuleCheck = e.detail.validAfterRuleCheck; });
        visibleRequired[0].setAttribute('data-fv-valid', 1);
        formEventsHandler.initFormComponent(form);
        formEvent.initEvent('check-form-validity', true, true);
      });
      describe('when not all elements are valid', function() {
        it('with a `validAfterRuleCheck` = false', function() {
          formEventsHandlerMock.expects('getForm').once().returns(form);
          assert.equal(formEventsHandler.checkFormValidityHandler(formEvent), undefined);
          assert.equal(validAfterRuleCheck, false);

          formEventsHandlerMock.verify();
        });
      });
      describe('when all elements are valid', function() {
        it('with a `validAfterRuleCheck` = true', function() {
          visibleRequired.forEach(vr => { vr.setAttribute('data-fv-valid', 1); });
          formEventsHandlerMock.expects('getForm').once().returns(form);
          assert.equal(formEventsHandler.checkFormValidityHandler(formEvent), undefined);
          assert.equal(validAfterRuleCheck, true);

          formEventsHandlerMock.verify();
        });
      });
    });
  });

  describe('all the element event handlers', function() {
    describe('`checkBoxChangeHandler()`', function() {
      it('should trigger the `validation-handler` event on the event target element', function() {
        let validationEventTriggered = null;
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('checked', 'checked');
        checkbox.addEventListener('validation-handler', e => { validationEventTriggered = true; });

        formEvent.initEvent('change', true, true);
        checkbox.dispatchEvent(formEvent);
        assert.equal(formEventsHandler.checkBoxChangeHandler(formEvent), undefined);
        assert.equal(validationEventTriggered, true);
      });
    });

    describe('`radioChangeHandler()`', function() {
      it('should trigger the `validation-handler` event on the event target element', function() {
        let validationEventTriggered = null;
        const radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('checked', 'checked');
        radio.addEventListener('validation-handler', e => { validationEventTriggered = true; });

        formEvent.initEvent('change', true, true);
        radio.dispatchEvent(formEvent);
        assert.equal(formEventsHandler.radioChangeHandler(formEvent), undefined);
        assert.equal(validationEventTriggered, true);
      });
    });

    describe('`selectChangeHandler()`', function() {
      it('should trigger the `validation-handler` event on the event target element', function() {
        let validationEventTriggered = null;
        const select = document.createElement('select');
        select.addEventListener('validation-handler', e => { validationEventTriggered = true; });

        formEvent.initEvent('change', true, true);
        select.dispatchEvent(formEvent);
        assert.equal(formEventsHandler.selectChangeHandler(formEvent), undefined);
        assert.equal(validationEventTriggered, true);
      });
    });

    describe('`inputTextareaChangeHandler()`', function() {
      it('should trigger the `validation-handler` event on the event target element', function() {
        let validationEventTriggered = null;
        const textarea = document.createElement('textarea');
        textarea.addEventListener('validation-handler', e => { validationEventTriggered = true; });

        formEvent.initEvent('change', true, true);
        textarea.dispatchEvent(formEvent);
        assert.equal(formEventsHandler.inputTextareaChangeHandler(formEvent), undefined);
        assert.equal(validationEventTriggered, true);
      });
    });

    describe('`inputTextareaKeyUpHandler()`', function() {
      it('should trigger the `validation-handler` event on the event target element', function() {
        let validationEventTriggered = null;
        const textarea = document.createElement('textarea');
        textarea.addEventListener('validation-handler', e => { validationEventTriggered = true; });

        formEvent.initEvent('keyup', true, true);
        textarea.dispatchEvent(formEvent);
        assert.equal(formEventsHandler.inputTextareaKeyUpHandler(formEvent), undefined);
        assert.equal(validationEventTriggered, true);
      });
    });

    describe('`inputFocusHandler()`', function() {
      it('should trigger the `validation-handler` event on the event target element', function() {
        let validationEventTriggered = null;
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.addEventListener('validation-handler', e => { validationEventTriggered = true; });

        formEvent.initEvent('focus', true, true);
        input.dispatchEvent(formEvent);
        assert.equal(formEventsHandler.inputFocusHandler(formEvent), undefined);
        assert.equal(validationEventTriggered, true);
      });
    });

    describe('`inputElementValidationHandler()`', function() {
      it('should attempt to validate the target element and then trigger the forms `check-form-validity` event', function () {
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);
        const input = document.createElement('input');
        input.setAttribute('data-fv-required', 1);
        input.value = 'good value';
        form.appendChild(input);
        const submitButton = document.createElement('button');
        submitButton.setAttribute('data-fv-form-submit', 1);
        form.appendChild(submitButton);
        let checkFormValidityEventTriggered = null;

        formEventsHandler.initForm(form);
        const formEventsHandlerMock = sinon.mock(formEventsHandler);

        form.addEventListener('check-form-validity', e => { checkFormValidityEventTriggered = true; });
        formEvent.initEvent('mouseenter', true, true);
        input.dispatchEvent(formEvent);

        formEventsHandlerMock.expects('validate').once().withArgs(input);
        assert.equal(formEventsHandler.inputElementValidationHandler(formEvent), undefined);
        assert.equal(checkFormValidityEventTriggered, true);
        formEventsHandlerMock.verify();
      });
    });
  });

  describe('`setValidationFlagHandler()` sets the new `data-fv-valid` value', function() {
    describe('when the validity flag flips bits/changes values', function() {
      it('triggers the `validity-changed` event on the element', function() {
        let validityChangedEventTriggered = [];
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('data-fv-required', 1);
        input.setAttribute('data-fv-valid', 0);
        input.addEventListener('validity-changed', e => { validityChangedEventTriggered.push(true); });

        const setValidationFlagEvent = new CustomEvent(
          'set-validation-flag',
          { bubbles: true, cancelable: true, detail: {validAfterRuleCheck: true}}
        );
        input.dispatchEvent(setValidationFlagEvent);
        formEventsHandler.setValidationFlagHandler(setValidationFlagEvent);

        assert.equal(parseInt(input.getAttribute('data-fv-valid')), 1);
        assert.equal(validityChangedEventTriggered[0], true);

        const setValidationFlagEvent2 = new CustomEvent(
          'set-validation-flag',
          { bubbles: true, cancelable: true, detail: {validAfterRuleCheck: false}}
        );
        input.dispatchEvent(setValidationFlagEvent2);
        formEventsHandler.setValidationFlagHandler(setValidationFlagEvent2);

        assert.equal(parseInt(input.getAttribute('data-fv-valid')), 0);
        assert.equal(validityChangedEventTriggered[1], true);
        assert.equal(validityChangedEventTriggered.length, 2);
      });
    });
    describe('when the validity flag does not flip bits/change values', function() {
      it('does not trigger the `validity-changed` event on the element', function() {
        let validityChangedEventTriggered = [];
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);
        const checkboxContainer = document.createElement('div');
        checkboxContainer.setAttribute('data-fv-required', 1);
        checkboxContainer.setAttribute('data-fv-valid', 1);
        checkboxContainer.setAttribute('data-fv-group-container', 'test-checkbox');
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', 'test-checkbox');
        input.addEventListener('validity-changed', e => { validityChangedEventTriggered.push(false); });

        checkboxContainer.appendChild(input);
        form.appendChild(checkboxContainer);

        const setValidationFlagEvent = new CustomEvent(
          'set-validation-flag',
          { bubbles: true, cancelable: true, detail: {validAfterRuleCheck: true}}
        );
        input.dispatchEvent(setValidationFlagEvent);
        formEventsHandler.setValidationFlagHandler(setValidationFlagEvent);

        assert.equal(parseInt(checkboxContainer.getAttribute('data-fv-valid')), 1);
        assert.equal(validityChangedEventTriggered[0], undefined);

        const setValidationFlagEvent2 = new CustomEvent(
          'set-validation-flag',
          { bubbles: true, cancelable: true, detail: {validAfterRuleCheck: false}}
        );
        checkboxContainer.setAttribute('data-fv-valid', 0);
        input.dispatchEvent(setValidationFlagEvent2);
        formEventsHandler.setValidationFlagHandler(setValidationFlagEvent2);

        assert.equal(parseInt(checkboxContainer.getAttribute('data-fv-valid')), 0);
        assert.equal(validityChangedEventTriggered[1], undefined);
        assert.equal(validityChangedEventTriggered.length, 0);
      });
    });
  });

  describe('`validateFormFields()`', function() {
    it('should trigger the `validation-handler` event on the event target element', function() {
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);
      const visibleRequired = [
        document.createElement('input'),
        document.createElement('select'),
        document.createElement('textarea')
      ];
      visibleRequired.forEach(vr => {
        vr.setAttribute('data-fv-required', 1);
        form.appendChild(vr);
      });
      const submitButton = document.createElement('button');
      submitButton.setAttribute('data-fv-form-submit', 1);
      form.appendChild(submitButton);
      const validationEventsTriggered = [false, false, false];

      formEventsHandler.initForm(form);
      visibleRequired[0].addEventListener('validation-handler', e => { validationEventsTriggered[0] = true; });
      visibleRequired[1].addEventListener('validation-handler', e => { validationEventsTriggered[1] = true; });
      visibleRequired[2].addEventListener('validation-handler', e => { validationEventsTriggered[2] = true; });
      formEvent.initEvent('mouseenter', true, true);
      visibleRequired[0].dispatchEvent(formEvent);

      assert.equal(formEventsHandler.validateFormFields(formEvent), undefined);
      assert.equal(validationEventsTriggered[0], true);
      assert.equal(validationEventsTriggered[1], true);
      assert.equal(validationEventsTriggered[2], true);
    });
  });

  describe('`triggerValidationCheck()`', function() {
    it('should trigger the `validation-handler` event on the event target element', function() {
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);
      const visibleRequired = [
        document.createElement('input'),
        document.createElement('select'),
        document.createElement('textarea')
      ];
      visibleRequired.forEach(vr => {
        vr.setAttribute('data-fv-required', 1);
        form.appendChild(vr);
      });
      const submitButton = document.createElement('button');
      submitButton.setAttribute('data-fv-form-submit', 1);
      form.appendChild(submitButton);
      const validationEventsTriggered = [false, false, false];

      formEventsHandler.initForm(form);
      visibleRequired[0].addEventListener('validation-handler', e => { validationEventsTriggered[0] = true; });
      visibleRequired[1].addEventListener('validation-handler', e => { validationEventsTriggered[1] = true; });
      visibleRequired[2].addEventListener('validation-handler', e => { validationEventsTriggered[2] = true; });

      assert.equal(formEventsHandler.triggerValidationCheck(), formEventsHandler);
      assert.equal(validationEventsTriggered[0], true);
      assert.equal(validationEventsTriggered[1], true);
      assert.equal(validationEventsTriggered[2], true);
    });
  });

  describe('`validate()`', function() {
    describe('when the element type is not supported', function() {
      it('warns the user and returns', function() {
        const badElement = document.createElement('datalist');
        const badElementMock = sinon.mock(badElement);
        const formEventsHandlerMock = sinon.mock(formEventsHandler);

        badElementMock.expects('dispatchEvent').never();
        formEventsHandlerMock.expects('warn').once().withArgs('No rules class exists for the tag `datalist`.');
        formEventsHandlerMock.expects('getRuleSetBySupportedElementType').never();

        formEventsHandler.validate(badElement);

        badElementMock.verify();
        formEventsHandlerMock.verify();
      });
    });
    describe('when the element type is supported', function() {
      it('processes the rules associated with the type, against the element', function() {
        let elementValidAfterRuleCheck = null;
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'test-radio');
        input.addEventListener('set-validation-flag', e => { elementValidAfterRuleCheck = e.detail.validAfterRuleCheck; });

        const formEventsHandlerMock = sinon.mock(formEventsHandler);
        const ruleSet = ruleSetStamp();
        const ruleSetMock = sinon.mock(ruleSet);

        formEventsHandlerMock.expects('getRuleSetBySupportedElementType').twice().withArgs('radio').returns(ruleSet);
        ruleSetMock.expects('process').once().withArgs(input).returns(true);
        ruleSetMock.expects('process').once().withArgs(input).returns(false);

        formEventsHandler.validate(input);
        assert.equal(elementValidAfterRuleCheck, true);

        formEventsHandler.validate(input);

        assert.equal(elementValidAfterRuleCheck, false);
        formEventsHandlerMock.verify();
        ruleSetMock.verify();
      });
    });
  });

  describe('`getInputTypesArr()`', function() {
    it('returns the private `__inputTypes` var', function() {
      assert.deepEqual(formEventsHandler.getInputTypesArr(), ['text', 'password', 'email', 'number', 'tel']);
    });
  });

  describe('`getInputType()`', function() {
    it('processes the rules associated with the type, against the element', function() {
      const textarea = document.createElement('textarea');
      assert.equal(formEventsHandler.getInputType(textarea), 'text');

      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      assert.equal(formEventsHandler.getInputType(input), 'text');

      input.setAttribute('type', 'checkbox');
      assert.equal(formEventsHandler.getInputType(input), 'checkbox');

      input.setAttribute('type', 'radio');
      assert.equal(formEventsHandler.getInputType(input), 'radio');

      const select = document.createElement('select');
      assert.equal(formEventsHandler.getInputType(select), 'select');

      const invalidElementType = document.createElement('ul');
      assert.equal(formEventsHandler.getInputType(invalidElementType), null);
    });
  });

  describe('`initFormComponent()`', function() {
    describe('it is already initialized', function() {
      it('sees that it already initialized and returns', function() {
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);

        const formEventsHandlerMock = sinon.mock(formEventsHandler);
        formEventsHandler.setEventsInitialized(true);
        formEventsHandlerMock.expects('warn').once().withArgs('Form events previously initialized for this form, skipping.');

        assert.equal(formEventsHandler.initFormComponent(form), formEventsHandler);

        formEventsHandlerMock.verify();
      });
    });
    describe('it is not yet initialized', function() {
      it('sees that it has not yet initialized, and initializes', function() {
        let validationHandlerEventTriggered = null;
        const formContainer = document.createElement('div');
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('data-fv-required', 1);
        input.addEventListener('validation-handler', e => { validationHandlerEventTriggered = true; });

        form.appendChild(input);
        formContainer.appendChild(form);

        assert.equal(formEventsHandler.getEventsInitialized(), false);
        assert.equal(formEventsHandler.initFormComponent(form), formEventsHandler);
        assert.equal(formEventsHandler.getEventsInitialized(), true);
        assert.equal(validationHandlerEventTriggered, true);
      });
    });
  });
});
