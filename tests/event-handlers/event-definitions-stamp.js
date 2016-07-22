'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const eventDefinitionsStamp = require('../../src/event-handlers/event-definitions-stamp');

describe('Objects created using the `eventDefinitionsStamp`', function() {
  let eventDefinitions;
  beforeEach(function() {
    eventDefinitions = eventDefinitionsStamp();
  });

  describe('`getEventsInitialized()`', function() {
    it('should return `false` when the events have not yet been initialized (as it is by default)', function() {
      assert.isFalse(eventDefinitions.getEventsInitialized());
    });
    it('should return `true` when the events have been initialized', function() {
      eventDefinitions.setEventsInitialized(true);
      assert.isTrue(eventDefinitions.getEventsInitialized());
    });
  });

  describe('`setEventsInitialized()`', function() {
    it('should throw a `TypeError` when the `newVal` param is not a Boolean', function() {
      assert.throws(
        () => eventDefinitions.setEventsInitialized(),
        TypeError,
        'Expected `newVal` param to be a Boolean, but is `undefined`'
      );
      assert.throws(
        () => eventDefinitions.setEventsInitialized('test string'),
        TypeError,
        'Expected `newVal` param to be a Boolean, but is `string`'
      );
    });
    it('should not throw a `TypeError` when the `newVal` param is a Boolean', function() {
      assert.doesNotThrow(() => eventDefinitions.setEventsInitialized(false), TypeError);
      assert.equal(eventDefinitions.setEventsInitialized(true), eventDefinitions);
      assert.isTrue(eventDefinitions.getEventsInitialized());
    });
  });

  describe('`getCheckFormValidityEventName()`', function() {
    it('should return the value of the private `__checkFormValidityEventName` var', function() {
      assert.equal(eventDefinitions.getCheckFormValidityEventName(), 'check-form-validity.formation');
    });
  });

  describe('`getChangeEventName()`', function() {
    it('should return the value of the private `__changeEventName` var', function() {
      assert.equal(eventDefinitions.getChangeEventName(), 'change.formation');
    });
  });

  describe('`getKeyPressEventName()`', function() {
    it('should return the value of the private `__keyPressEventName` var', function() {
      assert.equal(eventDefinitions.getKeyPressEventName(), 'keypress.formation');
    });
  });

  describe('`getKeyUpEventName()`', function() {
    it('should return the value of the private `__keyUpEventName` var', function() {
      assert.equal(eventDefinitions.getKeyUpEventName(), 'keyup.formation');
    });
  });

  describe('`getFocusEventName()`', function() {
    it('should return the value of the private `__focusEventName` var', function() {
      assert.equal(eventDefinitions.getFocusEventName(), 'focus.formation');
    });
  });

  describe('`getBlurEventName()`', function() {
    it('should return the value of the private `__blurEventName` var', function() {
      assert.equal(eventDefinitions.getBlurEventName(), 'blur.formation');
    });
  });

  describe('`getMouseEnterEventName()`', function() {
    it('should return the value of the private `__mouseEnterEventName` var', function() {
      assert.equal(eventDefinitions.getMouseEnterEventName(), 'mouseenter.formation');
    });
  });

  describe('`getMouseLeaveEventName()`', function() {
    it('should return the value of the private `__mouseLeaveEventName` var', function() {
      assert.equal(eventDefinitions.getMouseLeaveEventName(), 'mouseleave.formation');
    });
  });

  describe('`getTouchStartEventName()`', function() {
    it('should return the value of the private `__touchStartEventName` var', function() {
      assert.equal(eventDefinitions.getTouchStartEventName(), 'touchstart.formation');
    });
  });

  describe('`getValidationEventName()`', function() {
    it('should return the value of the private `__validationEventName` var', function() {
      assert.equal(eventDefinitions.getValidationEventName(), 'validation-handler.formation');
    });
  });
});
