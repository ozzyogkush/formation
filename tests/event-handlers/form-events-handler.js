'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const buttonComponentStamp = require('../../src/components/button');
const domNavigationStamp = require('../../src/utilities/dom-navigation');
const eventEmitterEventsStamp = require('../../src/utilities/node-event-emitter-stamp');
const formEventsHandlerStamp = require('../../src/event-handlers/form-events-handler');

describe('Objects created using the `formEventsHandlerStamp`', function() {
  let formEventsHandler;
  let jQueryEvent;
  beforeEach(function() {
    jQueryEvent = new $.Event();
    formEventsHandler = formEventsHandlerStamp();
  });

  describe('`formSubmitHandler()`', function() {
    it('should emit a `formationFormSubmit` node event', function() {
      const nodeEvents = eventEmitterEventsStamp();
      const nodeEventsMock = sinon.mock(nodeEvents);

      nodeEventsMock.expects('emit').once().withArgs('formationFormSubmit', jQueryEvent);
      formEventsHandler = formEventsHandlerStamp({nodeEvents : nodeEvents});

      assert.isTrue(formEventsHandler.formSubmitHandler(jQueryEvent));

      nodeEventsMock.verify();
    });
  });

  describe('`checkFormValidityHandler()`', function() {
    beforeEach(function() { jQueryEvent.namespace = 'formation'; });
    describe('nothing should happen', function() {
      it('when the event namespace is undefined or not `formation`', function() {
        delete jQueryEvent.namespace; // so it's `undefined`
        assert.isUndefined(formEventsHandler.checkFormValidityHandler(jQueryEvent));
        jQueryEvent.namespace = 'randomjibberish';
        assert.isUndefined(formEventsHandler.checkFormValidityHandler(jQueryEvent));
      });
      it('when the continue (submit or preview) button cannot be found for the form', function() {
        let formEventsHandlerMock = sinon.mock(formEventsHandler);
        formEventsHandlerMock.expects('getSubmitWithFallbackPreviewButton').once().returns(null);

        assert.isUndefined(formEventsHandler.checkFormValidityHandler(jQueryEvent));

        formEventsHandlerMock.verify();
      });
      it('when continue button is already in a `submitting` state', function() {
        let formEventsHandlerMock = sinon.mock(formEventsHandler);
        let button = buttonComponentStamp();
        let buttonMock = sinon.mock(button);

        formEventsHandlerMock.expects('getSubmitWithFallbackPreviewButton').once().returns(button);
        buttonMock.expects('isSubmitting').once().returns(true);
        assert.isUndefined(formEventsHandler.checkFormValidityHandler(jQueryEvent));

        formEventsHandlerMock.verify();
        buttonMock.verify();
      });
    });
    describe('something should happen', function() {
      let formEventsHandlerMock;
      let button;
      let buttonMock;
      let $visibleRequired;
      let $visibleRequiredMock;
      beforeEach(function() {
        formEventsHandlerMock = sinon.mock(formEventsHandler);
        button = buttonComponentStamp();
        buttonMock = sinon.mock(button);
        $visibleRequired = $('<input />,<select></select>,<textarea></textarea>');
        $visibleRequiredMock = sinon.mock($visibleRequired);
      });
      describe('when all elements are not valid', function() {
        it('disables the `continue` button', function() {
          let $validRequiredFields = $('<input />,<select></select>');

          formEventsHandlerMock.expects('getSubmitWithFallbackPreviewButton').once().returns(button);
          buttonMock.expects('isSubmitting').once().returns(false);
          formEventsHandlerMock.expects('get$requiredFields').once().returns($visibleRequired);
          $visibleRequiredMock.expects('filter')
            .once().withArgs(domNavigationStamp().visibleEnabledFilter)
            .returns($visibleRequired);
          $visibleRequiredMock.expects('filter')
            .once().withArgs('[data-fv-valid="1"]')
            .returns($validRequiredFields);
          buttonMock.expects('setEnabled').once().withArgs(false);

          formEventsHandler.checkFormValidityHandler(jQueryEvent);

          formEventsHandlerMock.verify();
          buttonMock.verify();
          $visibleRequiredMock.verify();
        });
      });
      describe('when all elements are valid', function() {
        it('enables the `continue` button', function() {
          formEventsHandlerMock.expects('getSubmitWithFallbackPreviewButton').once().returns(button);
          buttonMock.expects('isSubmitting').once().returns(false);
          formEventsHandlerMock.expects('get$requiredFields').once().returns($visibleRequired);
          $visibleRequiredMock.expects('filter')
            .once().withArgs(domNavigationStamp().visibleEnabledFilter)
            .returns($visibleRequired);
          $visibleRequiredMock.expects('filter')
            .once().withArgs('[data-fv-valid="1"]')
            .returns($visibleRequired);
          buttonMock.expects('setEnabled').once().withArgs(true);

          formEventsHandler.checkFormValidityHandler(jQueryEvent);

          formEventsHandlerMock.verify();
          buttonMock.verify();
          $visibleRequiredMock.verify();
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
      it('should trigger the `validation-handler.formation` event on the event target element', function() {
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        jQueryEvent.target = $('<input type="checkbox" />').get(0);
        $fnMock.expects('trigger').once().withArgs('validation-handler.formation').returns($(jQueryEvent.target));
        $fnMock.expects('is').once().withArgs(':checked').returns(false);
        formEventsHandlerMock.expects('showOrHideLinkedElement')
          .once().withArgs($(jQueryEvent.target), false);

        formEventsHandler.checkBoxChangeHandler(jQueryEvent);

        $fnMock.verify();
        formEventsHandlerMock.verify();
      });
    });

    describe('`radioChangeHandler()`', function() {
      it('should trigger the `validation-handler.formation` event on the event target element', function() {
        jQueryEvent.target = $('<input type="radio" />').get(0);
        $fnMock.expects('trigger').once().withArgs('validation-handler.formation').returns($(jQueryEvent.target));

        formEventsHandler.radioChangeHandler(jQueryEvent);
        $fnMock.verify();
      });
    });

    describe('`selectChangeHandler()`', function() {
      it('should trigger the `validation-handler.formation` event on the event target element', function() {
        jQueryEvent.target = $('<select></select>').get(0);
        $fnMock.expects('trigger').once().withArgs('validation-handler.formation').returns($(jQueryEvent.target));

        formEventsHandler.selectChangeHandler(jQueryEvent);
        $fnMock.verify();
      });
    });

    describe('`inputTextareaKeyUpHandler()`', function() {
      it('should trigger the `validation-handler.formation` event on the event target element', function() {
        jQueryEvent.target = $('<textarea></textarea>').get(0);
        $fnMock.expects('trigger').once().withArgs('validation-handler.formation').returns($(jQueryEvent.target));

        formEventsHandler.inputTextareaKeyUpHandler(jQueryEvent);
        $fnMock.verify();
      });
    });

    describe('`inputFocusHandler()`', function() {
      it('should trigger the `validation-handler.formation` event on the event target element', function() {
        jQueryEvent.target = $('<input type="text" />').get(0);
        $fnMock.expects('trigger').once().withArgs('validation-handler.formation').returns($(jQueryEvent.target));

        formEventsHandler.inputFocusHandler(jQueryEvent);
        $fnMock.verify();
      });
    });

    describe('`validateFormFields()`', function() {
      it('should trigger the `validation-handler.formation` event on the event target element', function() {
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        jQueryEvent.target = $('<form></form>').get(0);
        let $requiredFields = $('<input />').add($('<select></select>')).add($('<textarea></textarea>'));
        let $optionalFields = $('<textarea></textarea>').add($('<input type="email" />'));
        formEventsHandlerMock.expects('get$requiredFields').once().returns($requiredFields);
        formEventsHandlerMock.expects('get$optionalFields').once().returns($optionalFields);
        let $fields = $().add($requiredFields).add($optionalFields);
        $fnMock.expects('trigger').once().withArgs('validation-handler.formation').returns($fields);

        formEventsHandler.validateFormFields(jQueryEvent);

        $fnMock.verify();
        formEventsHandlerMock.verify();
      });
    });

    describe('`inputElementValidationHandler()`', function() {
      beforeEach(function() { jQueryEvent.namespace = 'formation'; });
      describe('nothing should happen', function() {
        it('when the event namespace is undefined or not `formation`', function () {
          delete jQueryEvent.namespace; // so it's `undefined`
          assert.isUndefined(formEventsHandler.inputElementValidationHandler(jQueryEvent));
          jQueryEvent.namespace = 'randomjibberish';
          assert.isUndefined(formEventsHandler.inputElementValidationHandler(jQueryEvent));
        });
      });
      describe('something should happen when the event namespace is `formation`', function() {
        it('should attempt to validate the target element and then trigger the forms `check-form-validity` event', function () {
          jQueryEvent.target = $('<input type="tel" />').get(0);
          let validator = { validate : function() {}};
          let $form = $('<form></form>');
          let $formMock = sinon.mock($form);
          let formEventsHandlerMock = sinon.mock(formEventsHandler);

          formEventsHandlerMock.expects('validate').once().withArgs($(jQueryEvent.target));
          formEventsHandlerMock.expects('get$form').once().returns($form);
          $formMock.expects('trigger').once().withArgs('check-form-validity.formation');

          formEventsHandler.inputElementValidationHandler(jQueryEvent);

          $formMock.verify();
          $fnMock.verify();
          formEventsHandlerMock.verify();
        });
      });
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
          .withArgs('change.formation', 'input:text, input:password, input:email, input:tel, textarea', sinon.match.func)
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
