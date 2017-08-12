'use strict';

const stampit = require('stampit');
const assert = require('chai').assert;
const sinon = require('sinon');

const buttonComponentStamp = require('../../src/components/button');
const nodeEventEmitterStamp = require('../../src/utilities/node-event-emitter-stamp');

describe('Objects created using the `buttonComponentStamp`', function() {
  describe('`exists()`', function() {
    describe('the `button` property is null', function() {
      it('should return false', function() {
        const buttonComponent = buttonComponentStamp();

        assert.equal(buttonComponent.exists(), false);
      });
    });
    describe('the `button` property is set', function() {
      it('should return true', function() {
        const buttonComponent = buttonComponentStamp({button : document.createElement('button')});

        assert.equal(buttonComponent.exists(), true);
      });
    });
  });

  describe('`isSubmitting()`', function() {
    describe('the `button` doesnt exist', function() {
      it('should return false', function() {
        const buttonComponent = buttonComponentStamp();
        assert.equal(buttonComponent.isSubmitting(), false);
      });
    });
    describe('the `button` exists but the `data-submitting` flag is undefined', function() {
      it('should return false', function() {
        const buttonComponent = buttonComponentStamp({button : document.createElement('button')});
        assert.equal(buttonComponent.isSubmitting(), false);
      });
    });
    describe('the `button` exists, the `data-fv-submitting` flag is defined, and set to `1`', function() {
      it('should return true', function() {
        const button = document.createElement('button');
        button.setAttribute('data-fv-submitting', 1);
        const buttonComponent = buttonComponentStamp({button});
        assert.equal(buttonComponent.isSubmitting(), true);
      });
    });
  });

  describe('`setEnabled()`', function() {
    it('enable or disable the `button` based on the `enable` param', function() {
      const buttonComponent = buttonComponentStamp({button : document.createElement('button')});
      assert.equal(buttonComponent.setEnabled(true), buttonComponent);
      assert.equal(buttonComponent.button.hasAttribute('disabled'), false);
      assert.equal(buttonComponent.button.classList.contains('disabled'), false);

      buttonComponent.setEnabled(false);
      assert.equal(buttonComponent.button.getAttribute('disabled'), 'disabled');
      assert.equal(buttonComponent.button.classList.contains('disabled'), true);
    });
  });

  describe('`setSubmitting()`', function() {
    it('set the button to a submitting state when the param is true', function() {
      const buttonComponent = buttonComponentStamp({button : document.createElement('button')});
      assert.equal(buttonComponent.setSubmitting(true), buttonComponent);
      assert.equal(buttonComponent.isSubmitting(), true);
    });
    it('removes the submitting state of the $button when the param is false', function() {
      const buttonComponent = buttonComponentStamp({button : document.createElement('button')});
      assert.equal(buttonComponent.setSubmitting(false), buttonComponent);
      assert.equal(buttonComponent.isSubmitting(), false);
    });
  });

  describe('`addHandleFormSubmitListener()`', function() {
    it('adds a node event that will listen for a form submit event and handle it', function() {
      const nodeEvents = nodeEventEmitterStamp();
      const buttonComponent = buttonComponentStamp({button : document.createElement('button'), nodeEvents});
      const buttonComponentMock = sinon.mock(buttonComponent);
      buttonComponentMock.expects('handleFormSubmitEvent').once();

      assert.equal(buttonComponent.addHandleFormSubmitListener(), buttonComponent);
      nodeEvents.emit(nodeEvents.getNodeFormSubmitEvent());

      buttonComponentMock.verify();
    });
  });

  describe('`handleFormSubmitEvent()`', function() {
    describe('the button does not exist', function() {
      it('does nothing', function () {
        const buttonComponent = buttonComponentStamp({});
        const buttonComponentMock = sinon.mock(buttonComponent);

        buttonComponentMock.expects('log').once().withArgs('handleFormSubmitEvent() called for undefined');
        buttonComponentMock.expects('setEnabled').never();
        buttonComponentMock.expects('setSubmitting').never();

        buttonComponent.handleFormSubmitEvent(document.createEvent('Event'));
        buttonComponentMock.verify();
      });
    });
    describe('the button exists', function() {
      it('disables the button, sets it to submitting state, and triggers the blur event', function () {
        const buttonBlurEventHandler = e => { e.target.setAttribute('triggered', true); };

        const button = document.createElement('button');
        const buttonComponent = buttonComponentStamp({button});
        buttonComponent.button.addEventListener(buttonComponent.getBlurEventName(), buttonBlurEventHandler);
        const buttonComponentMock = sinon.mock(buttonComponent);

        buttonComponentMock.expects('log').once().withArgs('handleFormSubmitEvent() called for [object HTMLButtonElement]');

        buttonComponent.handleFormSubmitEvent(document.createEvent('Event'));
        assert.equal(buttonComponent.isSubmitting(), true);
        assert.equal(button.getAttribute('disabled'), 'disabled');
        assert.equal(button.classList.contains('disabled'), true);
        assert.equal(button.hasAttribute('triggered'), true);
        buttonComponentMock.verify();

        buttonComponent.button.removeEventListener(buttonComponent.getBlurEventName(), buttonBlurEventHandler);
      });
    });
  });

  describe('`setLoadingHTML()`', function() {
    describe('the `button` property is null', function() {
      it('throws an exception', function() {
        let buttonComponent = buttonComponentStamp();

        assert.throws(
          () => { buttonComponent.setLoadingHTML(); },
          Error,
          "Cannot read property 'setAttribute' of null"
        );
      });
    });
    describe('the `button` property is set', function() {
      it('sets the loading text data attribute with the constructed text', function() {
        let buttonComponent = buttonComponentStamp({button: document.createElement('button')});

        assert.equal(buttonComponent.setLoadingHTML(), buttonComponent);
        assert.equal(
          buttonComponent.button.getAttribute(buttonComponent.loadingTextDataKey),
          '<span class="glyphicon glyphicon-repeat spinning"></span> loading'
        );
      });
    });
  });
});
