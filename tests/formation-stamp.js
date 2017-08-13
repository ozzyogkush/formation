'use strict';

const stampit = require('stampit');
const assert = require('chai').assert;
const sinon = require('sinon');

const bodyEventsHandlerStamp = require('../src/event-handlers/body-events-handler');
const eventEmitterStamp = require('../src/utilities/node-event-emitter-stamp');
const formationStamp = require('../src/formation-stamp');
const ruleStamp = require('../src/rules/rule');

describe('Objects created using the `formationStamp`', function() {
  describe('`readyDocument()`', function() {
    it('should Enter Formation and return itself', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      const formationMock = sinon.mock(formation);

      formationMock.expects('enterFormation').once();

      assert.equal(formation.readyDocument(), formation);

      formationMock.verify();
    });
  });

  describe('`enterFormation()`', function() {
    describe('when zero Formation forms are present on the page', function() {
      it('should log initialization, log that there are no forms, and return itself', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        const formationMock = sinon.mock(formation);

        formationMock.expects('log').once().withArgs('Initializing Formation...');
        formationMock.expects('info').once().withArgs('No Formation forms present, exiting.');
        formationMock.expects('initBodyEvents').never();
        formationMock.expects('initForms').never();

        assert.equal(formation.enterFormation(), formation);

        formationMock.verify();
      });
    });
    describe('when one or more Formation forms are present on the page', function() {
      it('should log initialization, call the initialization methods, and return itself', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        const formNode = document.createElement('form');
        formNode.setAttribute('data-formation', 1);
        document.body.appendChild(formNode);

        assert.equal(formation.enterFormation(), formation);
        document.body.removeChild(formNode);
      });
    });
  });

  describe('`initForm()`', function() {
    it('initializes the form component and events', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      const formNode = document.createElement('form');
      formNode.setAttribute('data-formation', 1);
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('data-fv-required', 1);
      const submit = document.createElement('button');
      submit.setAttribute('type', 'submit');
      submit.setAttribute('data-fv-form-submit', 1);

      formNode.appendChild(input);
      formNode.appendChild(submit);
      document.body.appendChild(formNode);

      assert.equal(formation.initForm(formNode), formation);
      assert.equal(formation.getForms().size, 1);
      assert.equal(formation.getForms().has(formNode), true);
      const formationComponent = formation.getForms().get(formNode);
      assert.equal(formationComponent.formEventsAlreadyInitialized(), true);

      document.body.removeChild(formNode);
    });
  });

  describe('`createFormationComponent()`', function() {
    it('generates a `Formation.formEventsHandler`', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      const formationMock = sinon.mock(formation);

      formationMock.expects('getLogConsole').once().returns(false);

      const formEventsHandler = formation.createFormationComponent();
      assert.equal(formEventsHandler.isFormEventHandler(), true);
      assert.equal(formEventsHandler.getLogConsole(), false);

      formationMock.verify();
    });
  });

  describe('`createFormationRule()`', function() {
    it('generates a `Formation.rule`', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      const rule = ruleStamp({name: 'a-good-rule', callback: function() {}});
      const generatedRule = formation.createFormationRule(rule.name, rule.callback);

      assert.equal(rule.isFormationRule(), true);
      assert.equal(generatedRule.name, rule.name);
      assert.equal(generatedRule.callback, rule.callback);
    });
  });

  describe('`registerRule()`', function() {
    describe('when parameters are not valid', function() {
      it('throws an error when `elementType` is incorrect', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        assert.throws(
          () => formation.registerRule(),
          TypeError,
          'Expected `elementType` param to be a `String`, was a `undefined`.'
        );
        assert.throws(
          () => formation.registerRule('bong'),
          TypeError,
          'Specified `elementType` `bong` is not supported.'
        );
      });
      it('throws an error when `ruleName` is incorrect', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        assert.throws(
          () => formation.registerRule('text'),
          TypeError,
          'Expected `ruleName` param to be a `String`, was a `undefined`.'
        );
      });
      it('throws an error when `ruleCallbackMethod` is incorrect', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        assert.throws(
          () => formation.registerRule('text', 'a-good-rule'),
          TypeError,
          'Expected `ruleCallbackMethod` param to be a `Function`, was a `undefined`.'
        );
        assert.throws(
          () => formation.registerRule('text', 'a-good-rule', 'not-a-function'),
          TypeError,
          'Expected `ruleCallbackMethod` param to be a `Function`, was a `string`.'
        );
      });
    });
    describe('when parameters are valid', function() {
      it('adds a `DOMContentLoaded` callback', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        const documentMock = sinon.mock(document);

        documentMock.expects('addEventListener').once().withArgs('DOMContentLoaded', sinon.match.func);
        assert.equal(formation.registerRule('text', 'a-good-rule', function() {}), formation);

        documentMock.verify();
      });
    });
    describe('when `DOMContentLoaded` is called', function() {
      // This is more of an integration test, but whatever.
      it('registers the supplied rule for each registered form', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        const formationMock = sinon.mock(formation);
        const formNode = document.createElement('form');
        formNode.setAttribute('data-formation', 1);
        formNode.setAttribute('id', 'form1');
        document.body.appendChild(formNode);
        const formComponent = formation.createFormationComponent();

        assert.equal(formation.registerRule('text', 'a-good-rule', function() {}), formation);
        formationMock.expects('getForms').once().returns(new Map([[formNode, formComponent]]));

        const event = document.createEvent('Event');
        event.initEvent('DOMContentLoaded', true, true);
        window.document.dispatchEvent(event);
        assert.equal(formComponent.getRuleSetBySupportedElementType('text').getRules().slice(-1)[0].name, 'a-good-rule');

        formationMock.verify();
        document.body.removeChild(formNode);
      });
    });
  });

  describe('`getDebug()`', function() {
    it('should return `false` when logging is disabled (as it is by default)', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      assert.equal(formation.getDebug(), false);
    });
    it('should return `true` when logging is enabled', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      formation.setDebug(true);
      assert.equal(formation.getDebug(), true);
    });
  });

  describe('`setDebug()`', function() {
    it('should throw a `TypeError` when the `newVal` param is not a Boolean', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      assert.throws(
        () => formation.setDebug(),
        TypeError,
        'Expected `newVal` param to be a Boolean, but is `undefined`'
      );
      assert.throws(
        () => formation.setDebug('test string'),
        TypeError,
        'Expected `newVal` param to be a Boolean, but is `string`'
      );
    });
    it('should not throw a `TypeError` when the `newVal` param is a Boolean', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      assert.doesNotThrow(() => formation.setDebug(false), TypeError);
      assert.equal(formation.setDebug(true), formation);
      assert.equal(formation.getDebug(), true);
    });
  });

  describe('`getForms()`', function() {
    it('returns an empty Map by default', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      assert.equal(formation.getForms().size, 0);
    });
  });

  describe('`detectForms()`', function() {
    it('looks for `form` elements in the DOM, filter them, and return itself', function() {
      const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
      const formNode = document.createElement('form');
      const formNode2 = document.createElement('form');
      const formNode3 = document.createElement('form');
      formNode.setAttribute('data-formation', 1);
      formNode.setAttribute('id', 'form1');
      formNode2.setAttribute('data-formation', 1);
      formNode2.setAttribute('id', 'form2');
      formNode3.setAttribute('id', 'form3');
      document.body.appendChild(formNode);
      document.body.appendChild(formNode2);
      document.body.appendChild(formNode3);

      assert.equal(formation.detectForms(), formation);
      assert.equal(formation.getForms().size, 2);
      assert.equal(formation.getForms().has(formNode), true);
      assert.equal(formation.getForms().has(formNode2), true);
      assert.equal(formation.getForms().has(formNode3), false);
      document.body.removeChild(formNode);
      document.body.removeChild(formNode2);
      document.body.removeChild(formNode3);
    });
  });

  describe('`initBodyEvents()`', function() {
    describe('when the body events have not yet been initialized', function() {
      it('logs initialization, and calls `setLogConsole()` and `addDefaultEventHandlers()` on the new instance', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        let formationMock = sinon.mock(formation);
        let bodyEventsHandler = bodyEventsHandlerStamp({ nodeEvents : eventEmitterStamp() });
        let bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);

        formationMock.expects('log').once().withArgs('Initializing body events...');
        formationMock.expects('getLogConsole').once().returns(true);
        bodyEventsHandlerMock.expects('setLogConsole').once().withArgs(true).returns(bodyEventsHandler);
        bodyEventsHandlerMock.expects('getEventsInitialized').once().returns(false);
        bodyEventsHandlerMock.expects('addDefaultEventHandlers').once().returns(bodyEventsHandler);

        assert.equal(formation.initBodyEvents(bodyEventsHandler), formation);

        formationMock.verify();
        bodyEventsHandlerMock.verify();
      });
    });
    describe('when the body events have been initialized', function() {
      it('logs initialization, calls `setLogConsole()`, but does not call `addDefaultEventHandlers()` on the new instance', function() {
        const formation = formationStamp({ nodeEvents: eventEmitterStamp() });
        let formationMock = sinon.mock(formation);
        let bodyEventsHandler = bodyEventsHandlerStamp({ nodeEvents : eventEmitterStamp() });
        let bodyEventsHandlerMock = sinon.mock(bodyEventsHandler);

        formationMock.expects('log').once().withArgs('Initializing body events...');
        formationMock.expects('info').once().withArgs('Body events previously initialized, skipping.');
        formationMock.expects('getLogConsole').once().returns(true);
        bodyEventsHandlerMock.expects('setLogConsole').once().withArgs(true).returns(bodyEventsHandler);
        bodyEventsHandlerMock.expects('getEventsInitialized').once().returns(true);
        bodyEventsHandlerMock.expects('addDefaultEventHandlers').never();

        assert.equal(formation.initBodyEvents(bodyEventsHandler), formation);

        formationMock.verify();
        bodyEventsHandlerMock.verify();
      });
    });
  });

  describe('`initForms()`', function() {
    it('initialize its DOM and the various events which should be handled for each registered Formation form', function() {
      const formNode = document.createElement('form');
      const formNode2 = document.createElement('form');
      formNode.setAttribute('data-formation', 1);
      formNode2.setAttribute('data-formation', 1);
      document.body.appendChild(formNode);
      document.body.appendChild(formNode2);

      const formation = formationStamp({ nodeEvents: eventEmitterStamp() }).detectForms();
      assert.equal(formation.initForms(), formation);
      assert.equal(formation.getForms().size, 2);
      assert.equal(formation.getForms().has(formNode), true);
      assert.equal(formation.getForms().has(formNode2), true);

      document.body.removeChild(formNode);
      document.body.removeChild(formNode2);
    });
  });
});
