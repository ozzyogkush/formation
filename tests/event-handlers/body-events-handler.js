'use strict';

const stampit = require('stampit');
const assert = require('chai').assert;
const sinon = require('sinon');

const bodyEventsHandlerStamp = require('../../src/event-handlers/body-events-handler');
const formComponentStamp = require('../../src/components/form');

describe('Objects created using the `bodyEventsHandlerStamp`', function() {
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

        bodyEventsHandlerMock.expects('bodyKeyUpHandler').once();

        assert.equal(bodyEventsHandler.addDefaultEventHandlers(), bodyEventsHandler);

        const keyUpEvent = document.createEvent('KeyboardEvent');
        keyUpEvent.initEvent(bodyEventsHandler.getKeyUpEventName());
        document.body.dispatchEvent(keyUpEvent);

        bodyEventsHandlerMock.verify();
      });
    });
  });
});
