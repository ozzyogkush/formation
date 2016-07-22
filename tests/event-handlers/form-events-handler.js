'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const formEventsHandlerStamp = require('../../src/event-handlers/form-events-handler');

describe('Objects created using the `formEventsHandlerStamp`', function() {
  let formEventsHandler;
  beforeEach(function() {
    formEventsHandler = formEventsHandlerStamp();
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
      formEventsHandler = formEventsHandlerStamp({$form: $form});

      $formMock.expects('find').once().withArgs('input, textarea, select').returns($());

      formEventsHandler.getAllInputElementsToValidate();

      $formMock.verify();
    });
  });

  describe('`addDefaultEventHandlers()`', function() {
    describe('when the `$form` object is null', function() {
      it('should throw an Error', function() {
        assert.throws(() => formEventsHandler.addDefaultEventHandlers(), Error);
      });
    });

    describe('when the `$form` object is set', function() {
      it('should set a bunch of event handlers on various input elements (text, textarea, select, radio, checkbox)', function() {
        let $form = $('<form data-formation="1"></form>');
        let $formMock = sinon.mock($form);
        formEventsHandler = formEventsHandlerStamp({$form : $form});
        let formEventsHandlerMock = sinon.mock(formEventsHandler);

        // See http://stackoverflow.com/questions/38387222/mocking-a-method-which-is-called-using-an-arrow-function-as-a-parameter
        $formMock.expects('submit').once().withArgs(sinon.match.func).returns($form);
        $formMock.expects('on').once()
          .withArgs('check-form-validity.formation', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('change.formation', 'input:checkbox', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('change.formation', 'input:radio', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('change.formation', 'select', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('keyup.formation', 'input, textarea', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('validation-handler.formation', 'input, textarea, select', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('focus.formation', 'input, textarea, select', sinon.match.func)
          .returns($form);
        $formMock.expects('on').once()
          .withArgs('mouseenter.formation, mouseleave.formation, touchstart.formation', sinon.match.func)
          .returns($form);

        formEventsHandlerMock.expects('setEventsInitialized').once().withArgs(true).returns(formEventsHandler);

        // Call the SUT
        assert.equal(formEventsHandler.addDefaultEventHandlers(), formEventsHandler);

        $formMock.verify();
        formEventsHandlerMock.verify();
      });
    });
  });
});
