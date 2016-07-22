'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const keyCodes = require('../../src/utilities/key-code-set');
const bodyEventsHandlerStamp = require('../../src/event-handlers/body-events-handler');
const formComponentStamp = require('../../src/components/form');

describe('Objects created using the `bodyEventsHandlerStamp`', function() {
  let bodyEventsHandler;
  beforeEach(function() {
    bodyEventsHandler = bodyEventsHandlerStamp();
  });

  describe('`addDefaultEventHandlers()`', function() {
    describe('when the `$body` object is null', function() {
      it('should throw an Error', function() {
        assert.throws(() => bodyEventsHandler.addDefaultEventHandlers(), Error);
      });
    });

    describe('when the `$body` object is set', function() {
      it('should set the body keypress and keyup event handlers', function() {
        let $body = $('<body></body>');
        let $bodyMock = sinon.mock($body);
        bodyEventsHandler = bodyEventsHandlerStamp({$body : $body});
        let bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);

        // See http://stackoverflow.com/questions/38387222/mocking-a-method-which-is-called-using-an-arrow-function-as-a-parameter
        $bodyMock.expects('on').once()
          .withArgs('keypress.formation', sinon.match.func).returns($body);
        $bodyMock.expects('on').once()
          .withArgs('keyup.formation', sinon.match.func).returns($body);

        bodyEventsHandlerMock.expects('setEventsInitialized').once().withArgs(true).returns(bodyEventsHandler);

        // Call the SUT
        assert.equal(bodyEventsHandler.addDefaultEventHandlers(), bodyEventsHandler);

        $bodyMock.verify();
        bodyEventsHandlerMock.verify();
      });
    });
  });

  describe('`bodyKeyPressHandler()`', function() {
    describe('when the key press event is not from the ENTER button', function() {
      it('should allow the keypress event to continue', function() {
        let event = {target : $(), which : keyCodes.LEFT};
        assert.isTrue(bodyEventsHandler.bodyKeyPressHandler(event));
      });
    });
    describe('when the key press event is from the ENTER button', function() {
      let $fnMock;
      let $Mock;
      beforeEach(function() {
        $fnMock = sinon.mock($.fn);
        $Mock = sinon.mock($);
      });
      afterEach(function() {
        $fnMock.restore();
        $Mock.restore();
      });
      describe('when the target element is not an `input` node', function() {
        it('should allow the keypress event to continue', function() {
          let event = {target: $('<div></div>').get(0), which: keyCodes.ENTER};

          $fnMock.expects('prop').once().withArgs('tagName').returns('div');

          assert.isTrue(bodyEventsHandler.bodyKeyPressHandler(event));

          $fnMock.verify();
        });
      });
      describe('when the target element is an `input` node', function() {
        describe('when the input is a radio', function() {
          it('should allow the keypress event to continue', function() {
            let event = {target: $('<input type="radio" />').get(0), which: keyCodes.ENTER};

            $Mock.expects('inArray').once().withArgs('radio', ['radio', 'checkbox']).returns(0);
            $fnMock.expects('prop').once().withArgs('tagName').returns('input');
            $fnMock.expects('prop').once().withArgs('type').returns('radio');

            assert.isTrue(bodyEventsHandler.bodyKeyPressHandler(event));

            $fnMock.verify();
            $Mock.verify();
          });
        });
        describe('when the input is a checkbox', function() {
          it('should allow the keypress event to continue', function() {
            let event = {target: $('<input type="checkbox" />').get(0), which: keyCodes.ENTER};

            $Mock.expects('inArray').once().withArgs('checkbox', ['radio', 'checkbox']).returns(1);
            $fnMock.expects('prop').once().withArgs('tagName').returns('input');
            $fnMock.expects('prop').once().withArgs('type').returns('checkbox');

            assert.isTrue(bodyEventsHandler.bodyKeyPressHandler(event));

            $fnMock.verify();
            $Mock.verify();
          });
        });
        describe('when the input is neither a radio nor a checkbox', function() {
          describe('when the Formation `formComponent` is null', function() {
            it('should allow the keypress event to continue', function() {
              let event = {target: $('<input type="text" />').get(0), which: keyCodes.ENTER};

              $Mock.expects('inArray').once().withArgs('text', ['radio', 'checkbox']).returns(-1);
              $fnMock.expects('prop').once().withArgs('tagName').returns('input');
              $fnMock.expects('prop').once().withArgs('type').returns('text');

              bodyEventsHandler = bodyEventsHandlerStamp({formationSelector : '[data-formation="1"]'});
              let bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);

              bodyEventsHandlerMock.expects('getFormComponentOfCurrentElement').once().withArgs($(event.target)).returns(null);
              assert.isTrue(bodyEventsHandler.bodyKeyPressHandler(event));

              bodyEventsHandlerMock.verify();
              $fnMock.verify();
              $Mock.verify();
            });
          });
          describe('when the input is inside a Formation `form`', function() {
            let $form;
            let $formMock;
            let event;
            let formComponent;
            let formComponentMock;
            let bodyEventsHandlerMock;
            beforeEach(function() {
              bodyEventsHandler = bodyEventsHandlerStamp({formationSelector : '[data-formation="1"]'});
              bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);
              formComponent = formComponentStamp();
              formComponentMock = sinon.mock(formComponent);
              $form = $('<form data-formation="1"></form>').data(bodyEventsHandler.formationDataKey, formComponent);
              $formMock = sinon.mock($form);
              event = {target: $('<input type="text" />').get(0), which: keyCodes.ENTER};
            });
            describe('when the Form decides the key press event should progress', function() {
              it('should return true', function() {
                $Mock.expects('inArray').once().withArgs('text', ['radio', 'checkbox']).returns(-1);
                $fnMock.expects('prop').once().withArgs('tagName').returns('input');
                $fnMock.expects('prop').once().withArgs('type').returns('text');
                bodyEventsHandlerMock.expects('getFormComponentOfCurrentElement').once().withArgs($(event.target)).returns(formComponent);
                formComponentMock.expects('shouldBodyKeyPressEventsProgress').once().returns(true);

                assert.isTrue(bodyEventsHandler.bodyKeyPressHandler(event));

                $fnMock.verify();
                $Mock.verify();
                $formMock.verify();
                bodyEventsHandlerMock.verify();
                formComponentMock.verify();
              });
            });
            describe('when the Form decides the key press event should not progress', function() {
              it('should return false', function() {
                $Mock.expects('inArray').once().withArgs('text', ['radio', 'checkbox']).returns(-1);
                $fnMock.expects('prop').once().withArgs('tagName').returns('input');
                $fnMock.expects('prop').once().withArgs('type').returns('text');
                bodyEventsHandlerMock.expects('getFormComponentOfCurrentElement').once().withArgs($(event.target)).returns(formComponent);
                formComponentMock.expects('shouldBodyKeyPressEventsProgress').once().returns(false);

                assert.isFalse(bodyEventsHandler.bodyKeyPressHandler(event));

                $fnMock.verify();
                $Mock.verify();
                $formMock.verify();
                bodyEventsHandlerMock.verify();
                formComponentMock.verify();
              });
            });
          });
        });
      });
    });
  });
});
