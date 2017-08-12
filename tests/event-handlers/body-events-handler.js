'use strict';

const stampit = require('stampit');
const assert = require('chai').assert;
const sinon = require('sinon');

const keyCodes = require('../../src/utilities/key-code-set');
const bodyEventsHandlerStamp = require('../../src/event-handlers/body-events-handler');
const formComponentStamp = require('../../src/components/form');

describe('Objects created using the `bodyEventsHandlerStamp`', function() {
  describe('`bodyKeyPressHandler()`', function() {
    describe('when the key press event is not from the ENTER button', function() {
      it('should allow the keypress event to continue', function() {
        let allowedToContinue = null;
        const bodyEventsHandler = bodyEventsHandlerStamp({body : document.body});
        const testHandler = e => { allowedToContinue = bodyEventsHandler.bodyKeyPressHandler(e); };

        document.body.addEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
        const target = document.createElement('span');
        document.body.appendChild(target);

        const keyPressEvent = new KeyboardEvent(
          bodyEventsHandler.getKeyPressEventName(),
          { bubbles: true, 'key': 'left-arrow' }
        );
        target.dispatchEvent(keyPressEvent);

        assert.equal(allowedToContinue, true);

        document.body.removeChild(target);
        document.body.removeEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
      });
    });
    describe('when the key press event is from the ENTER button', function() {
      describe('when the target element is not an `input` node', function() {
        it('should allow the keypress event to continue', function() {
          let allowedToContinue = null;
          const bodyEventsHandler = bodyEventsHandlerStamp({body : document.body});
          const testHandler = e => { allowedToContinue = bodyEventsHandler.bodyKeyPressHandler(e); };

          document.body.addEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
          const target = document.createElement('span');
          document.body.appendChild(target);

          const keyPressEvent = new KeyboardEvent(
            bodyEventsHandler.getKeyPressEventName(),
            { bubbles: true, 'key': 'enter' }
          );
          target.dispatchEvent(keyPressEvent);

          assert.equal(allowedToContinue, true);

          document.body.removeChild(target);
          document.body.removeEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
        });
      });
      describe('when the target element is an `input` node', function() {
        describe('when the input is a radio', function() {
          it('should allow the keypress event to continue', function() {
            let allowedToContinue = null;
            const bodyEventsHandler = bodyEventsHandlerStamp({body : document.body});
            const testHandler = e => { allowedToContinue = bodyEventsHandler.bodyKeyPressHandler(e); };

            document.body.addEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
            const target = document.createElement('input');
            target.setAttribute('type', 'radio');
            document.body.appendChild(target);

            const keyPressEvent = new KeyboardEvent(
              bodyEventsHandler.getKeyPressEventName(),
              { bubbles: true, 'key': 'enter' }
            );
            target.dispatchEvent(keyPressEvent);

            assert.equal(allowedToContinue, true);

            document.body.removeChild(target);
            document.body.removeEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
          });
        });
        describe('when the input is a checkbox', function() {
          it('should allow the keypress event to continue', function() {
            let allowedToContinue = null;
            const bodyEventsHandler = bodyEventsHandlerStamp({body : document.body});
            const testHandler = e => { allowedToContinue = bodyEventsHandler.bodyKeyPressHandler(e); };

            document.body.addEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
            const target = document.createElement('input');
            target.setAttribute('type', 'checkbox');
            document.body.appendChild(target);

            const keyPressEvent = new KeyboardEvent(
              bodyEventsHandler.getKeyPressEventName(),
              { bubbles: true, 'key': 'enter' }
            );
            target.dispatchEvent(keyPressEvent);

            assert.equal(allowedToContinue, true);

            document.body.removeChild(target);
            document.body.removeEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
          });
        });
        describe('when the input is neither a radio nor a checkbox', function() {
          describe('when the Formation `formComponent` is null', function() {
            it('should allow the keypress event to continue', function() {
              let allowedToContinue = null;
              const bodyEventsHandler = bodyEventsHandlerStamp({
                body : document.body,
                formationSelector : '[data-formation="1"]',
                getFormComponentOfCurrentElement: e => null
              });
              const testHandler = e => { allowedToContinue = bodyEventsHandler.bodyKeyPressHandler(e); };

              document.body.addEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
              const target = document.createElement('input');
              target.setAttribute('type', 'text');
              document.body.appendChild(target);

              const keyPressEvent = new KeyboardEvent(
                bodyEventsHandler.getKeyPressEventName(),
                { bubbles: true, 'key': 'enter' }
              );
              target.dispatchEvent(keyPressEvent);

              assert.equal(allowedToContinue, true);

              document.body.removeChild(target);
              document.body.removeEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
            });
          });
          describe('when the input is inside a Formation `form`', function() {
            describe('when the Form decides the key press event should progress', function() {
              it('should return true', function() {
                let allowedToContinue = null;
                const formComponent = formComponentStamp();
                const formComponentMock = sinon.mock(formComponent);
                const bodyEventsHandler = bodyEventsHandlerStamp({
                  body : document.body,
                  formationSelector : '[data-formation="1"]',
                  getFormComponentOfCurrentElement: e => formComponent
                });
                const testHandler = e => { allowedToContinue = bodyEventsHandler.bodyKeyPressHandler(e); };

                document.body.addEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
                const target = document.createElement('input');
                target.setAttribute('type', 'text');
                document.body.appendChild(target);

                const keyPressEvent = new KeyboardEvent(
                  bodyEventsHandler.getKeyPressEventName(),
                  { bubbles: true, 'key': 'enter' }
                );
                formComponentMock.expects('shouldBodyKeyPressEventsProgress').once().returns(true);
                target.dispatchEvent(keyPressEvent);

                assert.equal(allowedToContinue, true);
                formComponentMock.verify();

                document.body.removeChild(target);
                document.body.removeEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
              });
            });
            describe('when the Form decides the key press event should not progress', function() {
              it('should return false', function() {
                let allowedToContinue = null;
                const formComponent = formComponentStamp();
                const formComponentMock = sinon.mock(formComponent);
                const bodyEventsHandler = bodyEventsHandlerStamp({
                  body : document.body,
                  formationSelector : '[data-formation="1"]',
                  getFormComponentOfCurrentElement: e => formComponent
                });
                const testHandler = e => { allowedToContinue = bodyEventsHandler.bodyKeyPressHandler(e); };
                formComponentMock.expects('shouldBodyKeyPressEventsProgress').once().returns(false);

                document.body.addEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
                const target = document.createElement('input');
                target.setAttribute('type', 'text');
                document.body.appendChild(target);

                const keyPressEvent = new KeyboardEvent(
                  bodyEventsHandler.getKeyPressEventName(),
                  { bubbles: true, 'key': 'enter' }
                );
                target.dispatchEvent(keyPressEvent);

                assert.equal(allowedToContinue, false);
                formComponentMock.verify();

                document.body.removeChild(target);
                document.body.removeEventListener(bodyEventsHandler.getKeyPressEventName(), testHandler);
              });
            });
          });
        });
      });
    });
  });
  describe('`bodyKeyUpHandler()`', function() {
    it('does nothing when the event key is not a space or enter button', function() {
      const bodyEventsHandler = bodyEventsHandlerStamp({body : document.body});
      const bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);
      const target = document.createElement('input');
      const targetMock = sinon.mock(target);

      const testHandler = e => { bodyEventsHandler.bodyKeyUpHandler(e); };
      document.body.appendChild(target);
      document.body.addEventListener(bodyEventsHandler.getKeyUpEventName(), testHandler);

      bodyEventsHandlerMock.expects('elementIsCustomRadioOrCheckboxWidget').never();
      targetMock.expects('click').never();

      const keyUpEvent = new KeyboardEvent(bodyEventsHandler.getKeyUpEventName(), { bubbles: true, 'key': 'tab' });
      target.dispatchEvent(keyUpEvent);

      bodyEventsHandlerMock.verify();
      targetMock.verify();

      document.body.removeChild(target);
      document.body.removeEventListener(bodyEventsHandler.getKeyUpEventName(), testHandler);
    });

    it('does nothing when the event key is a space or enter button but not on a custom bootstrap radio/checkbox', function() {
      const bodyEventsHandler = bodyEventsHandlerStamp({body : document.body});
      const bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);
      const target = document.createElement('input');
      const targetMock = sinon.mock(target);

      const testHandler = e => { bodyEventsHandler.bodyKeyUpHandler(e); };
      document.body.appendChild(target);
      document.body.addEventListener(bodyEventsHandler.getKeyUpEventName(), testHandler);

      bodyEventsHandlerMock.expects('elementIsCustomRadioOrCheckboxWidget').once().withArgs(target).returns(false);
      targetMock.expects('click').never();

      const keyUpEvent = new KeyboardEvent(bodyEventsHandler.getKeyUpEventName(), { bubbles: true, 'key': 'space' });
      target.dispatchEvent(keyUpEvent);

      bodyEventsHandlerMock.verify();
      targetMock.verify();

      document.body.removeChild(target);
      document.body.removeEventListener(bodyEventsHandler.getKeyUpEventName(), testHandler);
    });

    it('triggers the click event on the event target when the key is a space or enter on a custom bootstrap radio/checkbox', function() {
      const bodyEventsHandler = bodyEventsHandlerStamp({body : document.body});
      const bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);
      const target = document.createElement('input');
      const targetMock = sinon.mock(target);

      const testHandler = e => { bodyEventsHandler.bodyKeyUpHandler(e); };
      document.body.appendChild(target);
      document.body.addEventListener(bodyEventsHandler.getKeyUpEventName(), testHandler);

      bodyEventsHandlerMock.expects('elementIsCustomRadioOrCheckboxWidget').once().withArgs(target).returns(true);
      targetMock.expects('click').once();

      const keyUpEvent = new KeyboardEvent(bodyEventsHandler.getKeyUpEventName(), { bubbles: true, 'key': 'enter' });
      target.dispatchEvent(keyUpEvent);

      bodyEventsHandlerMock.verify();
      targetMock.verify();

      document.body.removeChild(target);
      document.body.removeEventListener(bodyEventsHandler.getKeyUpEventName(), testHandler);
    });
  });

  // These have to go last because `addDefaultEventHandlers()` adds handlers that would make it hard to test
  describe('`addDefaultEventHandlers()`', function() {
    describe('when the `body` object is null', function() {
      it('should throw an Error', function() {
        const bodyEventsHandler = bodyEventsHandlerStamp({});
        assert.throws(() => bodyEventsHandler.addDefaultEventHandlers(), Error);
      });
    });

    describe('when the `body` object is set', function() {
      it('should set the body keypress and keyup event handlers', function() {
        const bodyEventsHandler = bodyEventsHandlerStamp({body : document.body});
        const bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);

        bodyEventsHandlerMock.expects('bodyKeyPressHandler').once();
        bodyEventsHandlerMock.expects('bodyKeyUpHandler').once();

        assert.equal(bodyEventsHandler.addDefaultEventHandlers(), bodyEventsHandler);
        const keyPressEvent = document.createEvent('KeyboardEvent');
        keyPressEvent.initEvent(bodyEventsHandler.getKeyPressEventName());
        document.body.dispatchEvent(keyPressEvent);

        const keyUpEvent = document.createEvent('KeyboardEvent');
        keyUpEvent.initEvent(bodyEventsHandler.getKeyUpEventName());
        document.body.dispatchEvent(keyUpEvent);

        bodyEventsHandlerMock.verify();
      });
    });
  });
});
