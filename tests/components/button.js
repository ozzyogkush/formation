'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const buttonComponentStamp = require('../../src/components/button');
const nodeEventEmitterStamp = require('../../src/utilities/node-event-emitter-stamp');

describe('Objects created using the `buttonComponentStamp`', function() {
  describe('`exists()`', function() {
    describe('the `$button` property is null', function() {
      it('should return false', function() {
        let buttonComponent = buttonComponentStamp();

        assert.isFalse(buttonComponent.exists());
      });
    });
    describe('the `$button` property is set to an empty jQuery object', function() {
      it('should return false', function() {
        let buttonComponent = buttonComponentStamp({$button : $()});

        assert.isFalse(buttonComponent.exists());
      });
    });
    describe('the `$button` property is set', function() {
      it('should return true', function() {
        let buttonComponent = buttonComponentStamp({$button : $('<button></button>')});

        assert.isTrue(buttonComponent.exists());
      });
    });
  });

  describe('`isSubmitting()`', function() {
    let buttonComponent;
    let buttonComponentMock;
    let $fnMock;
    beforeEach(function() {
      buttonComponent = buttonComponentStamp({$button : $('<button></button>')});
      buttonComponentMock = sinon.mock(buttonComponent);
      $fnMock = sinon.mock($.fn);
    });
    afterEach(function() {$fnMock.restore();});
    describe('the `$button` doesnt exist', function() {
      it('should return false', function() {
        buttonComponentMock.expects('exists').once().returns(false);
        assert.isFalse(buttonComponent.isSubmitting());

        buttonComponentMock.verify();
      });
    });
    describe('the `$button` exists but the `data-submitting` flag is undefined', function() {
      it('should return false', function() {
        buttonComponentMock.expects('exists').once().returns(true);
        $fnMock.expects('attr').once().withArgs('data-fv-submitting').returns(undefined);
        assert.isFalse(buttonComponent.isSubmitting());

        buttonComponentMock.verify();
        $fnMock.verify();
      });
    });
    describe('the `$button` exists, the `data-submitting` flag is defined, and set to `1`', function() {
      it('should return true', function() {
        buttonComponentMock.expects('exists').once().returns(true);
        $fnMock.expects('attr').twice().withArgs('data-fv-submitting').returns('1');
        assert.isTrue(buttonComponent.isSubmitting());

        buttonComponentMock.verify();
        $fnMock.verify();
      });
    });
  });

  describe('`setEnabled()`', function() {
    it('enable or disable the `$button` based on the `enable` param', function() {
      let buttonComponent = buttonComponentStamp({$button : $('<button></button>')});
      let buttonComponentMock = sinon.mock(buttonComponent);
      buttonComponentMock.expects('enableOrDisableElement')
        .once().withArgs(buttonComponent.$button, true).returns(true);

      assert.equal(buttonComponent.setEnabled(true), buttonComponent);

      buttonComponentMock.verify();
    });
  });

  describe('`setSubmitting()`', function() {
    it('set the $button to a submitting state when the param is true', function() {
      let buttonComponent = buttonComponentStamp({$button : $('<button></button>')});
      let $fnMock = sinon.mock($.fn);

      $fnMock.expects('attr').once().withArgs('data-fv-submitting', 1).returns(buttonComponent.$button);
      //$fnMock.expects('button').once().withArgs('loading').returns(buttonComponent.$button);
      assert.equal(buttonComponent.setSubmitting(true), buttonComponent);

      $fnMock.verify();
    });
    it('removes the submitting state of the $button when the param is false', function() {
      let buttonComponent = buttonComponentStamp({$button : $('<button></button>')});
      let $fnMock = sinon.mock($.fn);

      $fnMock.expects('removeAttr').once().withArgs('data-fv-submitting').returns(buttonComponent.$button);
      //$fnMock.expects('button').once().withArgs('loading').returns(buttonComponent.$button);
      assert.equal(buttonComponent.setSubmitting(false), buttonComponent);

      $fnMock.verify();
    });
  });

  describe('`addHandleFormSubmitListener()`', function() {
    it('adds a node event that will listen for a form submit event and handle it', function() {
      let nodeEvents = nodeEventEmitterStamp();
      let nodeEventsMock = sinon.mock(nodeEvents);
      let buttonComponent = buttonComponentStamp({$button : $('<button></button>'), nodeEvents: nodeEvents});

      nodeEventsMock.expects('on').once().withArgs('formationFormSubmit', sinon.match.func);
      nodeEventsMock.expects('getNodeFormSubmitEvent').once().returns('formationFormSubmit');
      assert.equal(buttonComponent.addHandleFormSubmitListener(), buttonComponent);

      nodeEventsMock.verify();
    });
  });

  describe('`handleFormSubmitEvent()`', function() {
    describe('the button does not exist', function() {
      it('does nothing', function () {
        let buttonComponent = buttonComponentStamp({$button : $('<button></button>')});
        let buttonComponentMock = sinon.mock(buttonComponent);

        buttonComponentMock.expects('log').once().withArgs('handleFormSubmitEvent() called for ');
        buttonComponentMock.expects('exists').once().returns(false);
        buttonComponent.handleFormSubmitEvent($.Event());

        buttonComponentMock.verify();
      });
    });
    describe('the button exists', function() {
      it('disables the $button, sets it to submitting state, and triggers the blur event', function () {
        let buttonComponent = buttonComponentStamp({$button : $('<button></button>')});
        let buttonComponentMock = sinon.mock(buttonComponent);
        let $fnMock = sinon.mock($.fn);

        buttonComponentMock.expects('log')
          .once().withArgs('handleFormSubmitEvent() called for ' + buttonComponent.$button.selector);
        buttonComponentMock.expects('exists').once().returns(true);
        buttonComponentMock.expects('setEnabled').once().withArgs(false).returns(buttonComponent);
        buttonComponentMock.expects('setSubmitting').once().withArgs(true).returns(buttonComponent);
        buttonComponentMock.expects('getBlurEventName').once().returns('blur.formation');
        $fnMock.expects('trigger').once().withArgs('blur.formation');
        buttonComponent.handleFormSubmitEvent($.Event());

        buttonComponentMock.verify();
        $fnMock.verify();
      });
    });
  });

  describe('`setLoadingHTML()`', function() {
    describe('the `$button` property is null', function() {
      it('throws an exception', function() {
        let buttonComponent = buttonComponentStamp();

        assert.throws(
          () => { buttonComponent.setLoadingHTML(); },
          Error,
          "Cannot read property 'attr' of null"
        );
      });
    });
    describe('the `$button` property is set', function() {
      it('sets the loading text data attribute with the constructed text', function() {
        let buttonComponent = buttonComponentStamp({$button : $('<button></button>')});

        assert.equal(buttonComponent.setLoadingHTML(), buttonComponent);
        assert.equal(buttonComponent.$button.attr(buttonComponent.loadingTextDataKey), '<span class="glyphicon glyphicon-repeat spinning"></span> loading');
      });
    });
  });
});
