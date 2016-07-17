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
          .withArgs(
            bodyEventsHandler.keyPressEventName,
            sinon.match.func // this passes the test but does not fulfill code coverage
          ).returns($body);
        $bodyMock.expects('on').once()
          .withArgs(
            bodyEventsHandler.keyUpEventName,
            sinon.match.func // this passes the test but does not fulfill code coverage
          ).returns($body);

        bodyEventsHandlerMock.expects('setBodyEventsInitialized').once().withArgs(true).returns(bodyEventsHandler);

        // Call the SUT
        assert.equal(bodyEventsHandler.addDefaultEventHandlers(), bodyEventsHandler);

        $bodyMock.verify();
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
          describe('when the input is not inside a Formation `form`', function() {
            it('should allow the keypress event to continue', function() {
              let $empty = $();
              let event = {target: $('<input type="text" />').get(0), which: keyCodes.ENTER};

              $Mock.expects('inArray').once().withArgs('text', ['radio', 'checkbox']).returns(-1);

              $fnMock.expects('prop').once().withArgs('tagName').returns('input');
              $fnMock.expects('prop').once().withArgs('type').returns('text');
              $fnMock.expects('closest').once().withArgs('[data-formation="1"]').returns($empty);

              bodyEventsHandler = bodyEventsHandlerStamp({formationSelector : '[data-formation="1"]'});
              assert.isTrue(bodyEventsHandler.bodyKeyPressHandler(event));

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
            beforeEach(function() {
              bodyEventsHandler = bodyEventsHandlerStamp({formationSelector : '[data-formation="1"]'});
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
                $fnMock.expects('closest').once().withArgs('[data-formation="1"]').returns($form);
                $formMock.expects('data').once().withArgs(bodyEventsHandler.formationDataKey).returns(formComponent);
                formComponentMock.expects('shouldBodyKeyPressEventsProgress').once().returns(true);

                assert.isTrue(bodyEventsHandler.bodyKeyPressHandler(event));

                $fnMock.verify();
                $Mock.verify();
                $formMock.verify();
                formComponentMock.verify();
              });
            });
            describe('when the Form decides the key press event should not progress', function() {
              it('should return false', function() {
                $Mock.expects('inArray').once().withArgs('text', ['radio', 'checkbox']).returns(-1);
                $fnMock.expects('prop').once().withArgs('tagName').returns('input');
                $fnMock.expects('prop').once().withArgs('type').returns('text');
                $fnMock.expects('closest').once().withArgs('[data-formation="1"]').returns($form);
                $formMock.expects('data').once().withArgs(bodyEventsHandler.formationDataKey).returns(formComponent);
                formComponentMock.expects('shouldBodyKeyPressEventsProgress').once().returns(false);

                assert.isFalse(bodyEventsHandler.bodyKeyPressHandler(event));

                $fnMock.verify();
                $Mock.verify();
                $formMock.verify();
                formComponentMock.verify();
              });
            });
          });
        });
      });
    });
  });

  describe('`getBodyEventsInitialized()`', function() {
    it('should return `false` when the body events have not yet been initialized (as it is by default)', function() {
      assert.isFalse(bodyEventsHandler.getBodyEventsInitialized());
    });
    it('should return `true` when the body events have been initialized', function() {
      bodyEventsHandler.setBodyEventsInitialized(true);
      assert.isTrue(bodyEventsHandler.getBodyEventsInitialized());
    });
  });

  describe('`setBodyEventsInitialized()`', function() {
    it('should throw a `TypeError` when the `newVal` param is not a Boolean', function() {
      assert.throws(
        () => bodyEventsHandler.setBodyEventsInitialized(),
        TypeError,
        'Expected `newVal` param to be a Boolean, but is `undefined`'
      );
      assert.throws(
        () => bodyEventsHandler.setBodyEventsInitialized('test string'),
        TypeError,
        'Expected `newVal` param to be a Boolean, but is `string`'
      );
    });
    it('should not throw a `TypeError` when the `newVal` param is a Boolean', function() {
      assert.doesNotThrow(() => bodyEventsHandler.setBodyEventsInitialized(false), TypeError);
      assert.equal(bodyEventsHandler.setBodyEventsInitialized(true), bodyEventsHandler);
      assert.isTrue(bodyEventsHandler.getBodyEventsInitialized());
    });
  });
});
