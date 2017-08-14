'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const buttonComponentStamp = require('../../src/components/button');
const domNavigationStamp = require('../../src/utilities/dom-navigation');
const eventEmitterEventsStamp = require('../../src/utilities/node-event-emitter-stamp');
const formEventsHandlerStamp = require('../../src/event-handlers/form-events-handler');
const ruleSetStamp = require('../../src/rules/rule-set');

describe('Objects created using the `formEventsHandlerStamp`', function() {
  let formEventsHandler;
  let jQueryEvent;
  let formEvent;
  beforeEach(function() {
    jQueryEvent = new $.Event();
    formEvent = document.createEvent('Event');
    formEventsHandler = formEventsHandlerStamp({nodeEvents : eventEmitterEventsStamp()});
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
    describe('nothing should happen', function() {
      it('when the submit button cannot be found for the form', function() {
        const button = buttonComponentStamp({ button: document.createElement('button')});
        const buttonMock = sinon.mock(button);
        const formEventsHandlerMock = sinon.mock(formEventsHandler);

        buttonMock.expects('isSubmitting').never();
        buttonMock.expects('exists').never();
        formEventsHandlerMock.expects('getRequiredFields').never();
        formEventsHandlerMock.expects('getForm').never();

        formEvent.initEvent('check-form-validity', true, true);
        assert.equal(formEventsHandler.checkFormValidityHandler(formEvent), undefined);

        formEventsHandlerMock.verify();
        buttonMock.verify();
      });
      it('when continue button is already in a `submitting` state', function() {
        const button = buttonComponentStamp({ button: document.createElement('button')});
        button.setEnabled(false);
        button.setSubmitting(true);
        const formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('getRequiredFields').never();
        formEventsHandlerMock.expects('getForm').never();

        formEvent.initEvent('check-form-validity', true, true);
        assert.equal(formEventsHandler.checkFormValidityHandler(formEvent), undefined);

        formEventsHandlerMock.verify();
      });
    });
    describe('something should happen', function() {
      let formEventsHandlerMock;
      let form;
      let visibleRequired;
      let submitButton;
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
        submitButton = document.createElement('button');
        submitButton.setAttribute('data-fv-form-submit', 1);
        form.appendChild(submitButton);
      });
      describe('when not all elements are valid', function() {
        it('disables the `submit` button and triggers a `set-validation-flag` event with a `validAfterRuleCheck` = false', function() {
          let validAfterRuleCheck = null;
          visibleRequired[0].setAttribute('type', 'text');
          form.addEventListener('set-validation-flag', e => {
            validAfterRuleCheck = e.detail.validAfterRuleCheck;
          });
          formEventsHandler.initForm(form);
          visibleRequired[0].setAttribute('data-fv-valid', 1);
          formEventsHandler.getSubmitButton().setEnabled(true);
          formEventsHandler.getSubmitButton().setSubmitting(false);
          formEvent.initEvent('check-form-validity', true, true);

          formEventsHandlerMock.expects('getForm').once().returns(form);
          assert.equal(formEventsHandler.checkFormValidityHandler(formEvent), undefined);
          assert.equal(validAfterRuleCheck, false);
          assert.equal(formEventsHandler.getSubmitButton().button.getAttribute('disabled'), 'disabled');
          assert.equal(formEventsHandler.getSubmitButton().button.classList.contains('disabled'), true);

          formEventsHandlerMock.verify();
        });
      });
      describe('when all elements are valid', function() {
        it('enables the `submit` button and triggers a `set-validation-flag` event with a `validAfterRuleCheck` = true', function() {
          let validAfterRuleCheck = null;
          visibleRequired[0].setAttribute('type', 'text');
          form.addEventListener('set-validation-flag', e => {
            validAfterRuleCheck = e.detail.validAfterRuleCheck;
          });
          formEventsHandler.initForm(form);
          visibleRequired.forEach(vr => { vr.setAttribute('data-fv-valid', 1); });
          formEventsHandler.getSubmitButton().setEnabled(false);
          formEventsHandler.getSubmitButton().setSubmitting(false);
          formEvent.initEvent('check-form-validity', true, true);

          formEventsHandlerMock.expects('getForm').once().returns(form);
          assert.equal(formEventsHandler.checkFormValidityHandler(formEvent), undefined);
          assert.equal(validAfterRuleCheck, true);
          assert.equal(formEventsHandler.getSubmitButton().button.hasAttribute('disabled'), false);
          assert.equal(formEventsHandler.getSubmitButton().button.classList.contains('disabled'), false);

          formEventsHandlerMock.verify();
        });
      });
    });
  });

  describe('all the element event handlers', function() {
    let $fnMock;
    beforeEach(function() {
      $fnMock = sinon.mock($.fn);
    });
    afterEach(function() {
      $fnMock.restore();
    });
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

  describe('`setValidationFlagHandler()` sets the current `data-fv-valid` value', function() {
    describe('when the validity flag flips bits/changes values', function() {
      it('triggers the `validity-changed.formation` event', function() {
        jQueryEvent.target = $('<input type="text" data-fv-valid="1" />').get(0);
        let $fnMock = sinon.mock($.fn);
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('getInputType')
          .once().withArgs($(jQueryEvent.target)).returns('text');
        formEventsHandlerMock.expects('getCheckboxOrRadioContainer').never();
        $fnMock.expects('attr').once().withArgs('data-fv-valid').returns('1');
        $fnMock.expects('attr').once().withArgs('data-fv-valid', 0).returns($(jQueryEvent.target));
        $fnMock.expects('trigger').once().withArgs('validity-changed.formation');

        formEventsHandler.setValidationFlagHandler(jQueryEvent, false);

        formEventsHandlerMock.verify();
        $fnMock.verify();
      });
      it('triggers the `validity-changed.formation` event', function() {
        jQueryEvent.target = $('<input type="text" />').get(0);
        let $fnMock = sinon.mock($.fn);
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('getInputType')
          .once().withArgs($(jQueryEvent.target)).returns('text');
        formEventsHandlerMock.expects('getCheckboxOrRadioContainer').never();
        $fnMock.expects('attr').once().withArgs('data-fv-valid').returns('0');
        $fnMock.expects('attr').once().withArgs('data-fv-valid', 1).returns($(jQueryEvent.target));
        $fnMock.expects('trigger').once().withArgs('validity-changed.formation');

        formEventsHandler.setValidationFlagHandler(jQueryEvent, true);

        formEventsHandlerMock.verify();
        $fnMock.verify();
      });
    });
    describe('when the validity flag does not flip bits/change values', function() {
      it('does not trigger the `validity-changed.formation` event', function() {
        jQueryEvent.target = $('<input type="checkbox" data-fv-valid="1" />').get(0);
        let $fnMock = sinon.mock($.fn);
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('getInputType')
          .once().withArgs($(jQueryEvent.target)).returns('checkbox');
        formEventsHandlerMock.expects('getCheckboxOrRadioContainer')
          .once().withArgs($(jQueryEvent.target)).returns($(jQueryEvent.target));
        $fnMock.expects('attr').once().withArgs('data-fv-valid').returns('1');
        $fnMock.expects('attr').once().withArgs('data-fv-valid', 1).returns($(jQueryEvent.target));
        $fnMock.expects('trigger').never().withArgs('validity-changed.formation');

        formEventsHandler.setValidationFlagHandler(jQueryEvent, true);

        formEventsHandlerMock.verify();
        $fnMock.verify();
      });
      it('does not trigger the `validity-changed.formation` event', function() {
        jQueryEvent.target = $('<input type="checkbox" />').get(0);
        let $fnMock = sinon.mock($.fn);
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('getInputType')
          .once().withArgs($(jQueryEvent.target)).returns('checkbox');
        formEventsHandlerMock.expects('getCheckboxOrRadioContainer')
          .once().withArgs($(jQueryEvent.target)).returns($(jQueryEvent.target));
        $fnMock.expects('attr').once().withArgs('data-fv-valid').returns('0');
        $fnMock.expects('attr').once().withArgs('data-fv-valid', 0).returns($(jQueryEvent.target));
        $fnMock.expects('trigger').never().withArgs('validity-changed.formation');

        formEventsHandler.setValidationFlagHandler(jQueryEvent, false);

        formEventsHandlerMock.verify();
        $fnMock.verify();
      });
    });
  });

  describe('`validate()`', function() {
    describe('when the element type is not supported', function() {
      it('warns the user and returns', function() {
        let $el = $('<datalist></datalist>');
        let $elMock = sinon.mock($el);
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        $elMock.expects('prop').once().withArgs('tagName').returns('datalist');
        $elMock.expects('trigger').never();
        formEventsHandlerMock.expects('getInputType').once().withArgs($el).returns(null);
        formEventsHandlerMock.expects('warn').once().withArgs('No rules class exists for the tag `datalist`.')
          .returns(formEventsHandler);
        formEventsHandlerMock.expects('getRuleSetBySupportedElementType').never();
        formEventsHandlerMock.expects('getSetValidationFlagEventName').never();

        formEventsHandler.validate($el);

        $elMock.verify();
        formEventsHandlerMock.verify();
      });
    });
    describe('when the element type is supported', function() {
      it('processes the rules associated with the type, against the element', function() {
        let $el = $('<input type="text" />');
        let $elMock = sinon.mock($el);
        let formEventsHandlerMock = sinon.mock(formEventsHandler);
        let ruleSet = ruleSetStamp();
        let ruleSetMock = sinon.mock(ruleSet);

        $elMock.expects('prop').once().withArgs('tagName').returns('input');
        formEventsHandlerMock.expects('getInputType').once().withArgs($el).returns('text');
        formEventsHandlerMock.expects('warn').never();
        formEventsHandlerMock.expects('getRuleSetBySupportedElementType')
          .once().withArgs('text').returns(ruleSet);
        ruleSetMock.expects('process').once().withArgs($el).returns(true);
        formEventsHandlerMock.expects('getSetValidationFlagEventName').once().returns('set-validation-flag.formation');
        $elMock.expects('trigger').once().withArgs('set-validation-flag.formation', true).returns($el);

        formEventsHandler.validate($el);

        $elMock.verify();
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
      let $el = $('<input type="text" />');
      let $elMock = sinon.mock($el);

      $elMock.expects('prop').once().withArgs('tagName').returns('input');
      $elMock.expects('prop').once().withArgs('type').returns('text');
      assert.equal(formEventsHandler.getInputType($el), 'text');

      $elMock.expects('prop').once().withArgs('tagName').returns('input');
      $elMock.expects('prop').once().withArgs('type').returns('checkbox');
      assert.equal(formEventsHandler.getInputType($el), 'checkbox');

      $elMock.expects('prop').once().withArgs('tagName').returns('input');
      $elMock.expects('prop').once().withArgs('type').returns('radio');
      assert.equal(formEventsHandler.getInputType($el), 'radio');

      $elMock.expects('prop').once().withArgs('tagName').returns('select');
      $elMock.expects('prop').once().withArgs('type').returns('');
      assert.equal(formEventsHandler.getInputType($el), 'select');

      $elMock.expects('prop').once().withArgs('tagName').returns('datalist');
      $elMock.expects('prop').once().withArgs('type').returns('');
      assert.isNull(formEventsHandler.getInputType($el));

      $elMock.verify();
    });
  });

  describe('`initFormEvents()`', function() {
    describe('it is already initialized', function() {
      it('sees that it already initialized and returns', function() {
        let $form = $('<form></form>').data('formation-form', formEventsHandler);
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('getEventsInitialized').once().returns(false);
        formEventsHandlerMock.expects('get$form').once().returns($form);
        formEventsHandlerMock.expects('getFormComponentOfCurrentElement').once().withArgs($form).returns(formEventsHandler);
        formEventsHandlerMock.expects('getEventsInitialized').once().returns(true);
        formEventsHandlerMock.expects('warn').once().withArgs('Form events previously initialized for this form, skipping.');

        assert.equal(formEventsHandler.initFormEvents(), formEventsHandler);

        formEventsHandlerMock.verify();
      });
    });
    describe('it is not yet initialized', function() {
      it('sees that it has not yet initialized, and initializes', function() {
        let $form = $('<form></form>');
        let typeErrMsg = 'The `formation-form` data object is not set.';
        let err = new TypeError(typeErrMsg);
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('getEventsInitialized').once().returns(false);
        formEventsHandlerMock.expects('get$form').once().returns($form);
        formEventsHandlerMock.expects('getFormComponentOfCurrentElement').once().withArgs($form).throws(err);
        formEventsHandlerMock.expects('info').once().withArgs(err);
        formEventsHandlerMock.expects('getLogConsole').once().returns(true);
        formEventsHandlerMock.expects('initLogging').once().withArgs(true).returns(formEventsHandler);
        formEventsHandlerMock.expects('addDefaultEventHandlers').once().returns(formEventsHandler);
        formEventsHandlerMock.expects('triggerValidationCheck').once().returns(formEventsHandler);

        assert.equal(formEventsHandler.initFormEvents(), formEventsHandler);

        formEventsHandlerMock.verify();
      });
    });
  });

  describe('`triggerValidationCheck()`', function() {
    it('should return `false` when the form events have not yet been initialized (as it is by default)', function() {
      let formEventsHandlerMock = sinon.mock(formEventsHandler);
      let $inputs = $();
      let $inputsMock = sinon.mock($inputs);

      formEventsHandlerMock.expects('getAllInputElementsToValidate').once().returns($inputs);
      $inputsMock.expects('trigger').once().withArgs('validation-handler.formation');
      assert.equal(formEventsHandler.triggerValidationCheck(), formEventsHandler);

      formEventsHandlerMock.verify();
      $inputsMock.verify();
    });
  });

  describe('`getAllInputElementsToValidate()`', function() {
    it('should return a set of jQuery-wrapped form input elements', function() {
      let $form = $('<form data-formation="1"></form>');
      let $formMock = sinon.mock($form);
      formEventsHandler = formEventsHandlerStamp();
      let formEventsHandlerMock = sinon.mock(formEventsHandler);

      formEventsHandlerMock.expects('get$form').once().returns($form);
      $formMock.expects('find').once().withArgs('input, textarea, select').returns($());

      formEventsHandler.getAllInputElementsToValidate();

      formEventsHandlerMock.verify();
      $formMock.verify();
    });
  });

  describe('`addDefaultEventHandlers()`', function() {
    describe('when the `$form` object is null', function() {
      it('should throw an Error', function() {
        formEventsHandler = formEventsHandlerStamp();
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('get$form').once().returns(null);
        assert.throws(() => formEventsHandler.addDefaultEventHandlers(), Error);

        formEventsHandlerMock.verify();
      });
    });

    describe('when the `$form` object is set', function() {
      it('should set a bunch of event handlers on various input elements (text, textarea, select, radio, checkbox)', function() {
        let $form = $('<form data-formation="1"></form>');
        let $body = $form.wrap('body').parent();
        let $bodyMock = sinon.mock($body);
        let $formMock = sinon.mock($form);
        formEventsHandler = formEventsHandlerStamp();
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        formEventsHandlerMock.expects('get$form').once().returns($form);

        // See http://stackoverflow.com/questions/38387222/mocking-a-method-which-is-called-using-an-arrow-function-as-a-parameter
        $formMock.expects('submit').once().withArgs(sinon.match.func).returns($form);
        $formMock.expects('on').once()
          .withArgs('change.formation', 'input:checkbox', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('change.formation', 'input:radio', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs(
            'change.formation',
            'input[type="text"], input[type="password"], input[type="email"], input[type="number"], input[type="tel"], textarea',
            sinon.match.func
          )
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('change.formation', 'select', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('keyup.formation', 'input, textarea', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('focus.formation', 'input, textarea, select', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('validation-handler.formation', 'input, textarea, select', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('check-form-validity.formation', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('set-validation-flag.formation', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('set-validation-flag.formation', 'input, textarea, select', sinon.match.func)
          .returns($form);
        $formMock.expects('parent').once().returns($body);
        $bodyMock.expects('on').once()
          .withArgs('mouseenter.formation, mouseleave.formation, touchstart.formation', sinon.match.func)
          .returns($body);

        formEventsHandlerMock.expects('setEventsInitialized').once().withArgs(true).returns(formEventsHandler);

        // Call the SUT
        assert.equal(formEventsHandler.addDefaultEventHandlers(), formEventsHandler);

        $formMock.verify();
        $bodyMock.verify();
        formEventsHandlerMock.verify();
      });
    });
  });
});
