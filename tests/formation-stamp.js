'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const bodyEventsHandlerStamp = require('../src/event-handlers/body-events-handler');
const eventEmitterStamp = require('../src/utilities/node-event-emitter-stamp');
const formationStamp = require('../src/formation-stamp');
const formEventsHandlerStamp = require('../src/event-handlers/form-events-handler');
const ruleStamp = require('../src/rules/rule');

describe('Objects created using the `formationStamp`', function() {
  let formation;
  beforeEach(function() {
    formation = formationStamp({ nodeEvents: eventEmitterStamp() });
  });

  describe('`readyDocument()`', function() {
    it('should Enter Formation and return itself', function() {
      let formationMock = sinon.mock(formation);

      formationMock.expects('enterFormation').once();

      assert.equal(formation.readyDocument(), formation);

      formationMock.verify();
    });
  });

  describe('`enterFormation()`', function() {
    describe('when zero Formation forms are present on the page', function() {
      it('should log initialization, log that there are no forms, and return itself', function() {
        let formationMock = sinon.mock(formation);

        formationMock.expects('log').once().withArgs('Initializing Formation...');
        formationMock.expects('get$forms').once().returns($());
        formationMock.expects('info').once().withArgs('No Formation forms present, exiting.');
        formationMock.expects('initBodyEvents').never();
        formationMock.expects('initForms').never();

        assert.equal(formation.enterFormation(), formation);

        formationMock.verify();
      });
    });
    describe('when one or more Formation forms are present on the page', function() {
      it('should log initialization, call the initialization methods, and return itself', function() {
        let formationMock = sinon.mock(formation);

        formationMock.expects('log').once().withArgs('Initializing Formation...');
        formationMock.expects('get$forms').once().returns($('<form data-formation="1"></form>'));
        formationMock.expects('initBodyEvents').once().returns(formation);
        formationMock.expects('initForms').once().returns(formation);

        assert.equal(formation.enterFormation(), formation);

        formationMock.verify();
      });
    });
  });

  describe('`initForm()`', function() {
    it('initializes the form component and events', function() {
      let formEventsHandler = formEventsHandlerStamp({
        formationSelector: '[data-formation="1"]',
        nodeEvents : formation.nodeEvents
      });
      let formEventsHandlerMock = sinon.mock(formEventsHandler);
      let $form = $('<form data-formation="1"></form>');
      let $allForms = $();
      let $allFormsMock = sinon.mock($allForms);
      let $formMock = sinon.mock($form);
      let formationMock = sinon.mock(formation);

      formationMock.expects('createFormationComponent').once().returns(formEventsHandler);
      formEventsHandlerMock.expects('initForm').once().withArgs($form);
      formEventsHandlerMock.expects('initFormEvents').once();
      formationMock.expects('get$forms').twice().returns($allForms);
      $formMock.expects('eq').once().withArgs(0).returns($form);
      $allFormsMock.expects('has').once().withArgs($form.get(0)).returns(false);
      $allFormsMock.expects('add').once().withArgs($form);

      formation.initForm($form);

      formationMock.verify();
      $formMock.verify();
      $allFormsMock.verify();
      formEventsHandlerMock.verify();
    });
  });

  describe('`createFormationComponent()`', function() {
    it('generates a `Formation.formEventsHandler`', function() {
      let formationMock = sinon.mock(formation);

      formationMock.expects('getFormationSelector').once().returns('[data-formation="1"]');
      formationMock.expects('getLogConsole').once().returns(true);

      let formEventsHandler = formation.createFormationComponent();
      assert.isTrue(formEventsHandler.isFormEventHandler());

      formationMock.verify();
    });
  });

  describe('`createFormationRule()`', function() {
    it('generates a `Formation.rule`', function() {
      let rule = ruleStamp({name: 'a-good-rule', callback: function() {}});
      let generatedRule = formation.createFormationRule(rule.name, rule.callback);

      assert.isTrue(rule.isFormationRule());
      assert.equal(generatedRule.name, rule.name);
      assert.equal(generatedRule.callback, rule.callback);
    });
  });

  describe('`registerRule()`', function() {
    describe('when parameters are not valid', function() {
      it('throws an error when `elementType` is incorrect', function() {
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
        assert.throws(
          () => formation.registerRule('text'),
          TypeError,
          'Expected `ruleName` param to be a `String`, was a `undefined`.'
        );
      });
      it('throws an error when `ruleCallbackMethod` is incorrect', function() {
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
      it('adds a `document.ready` callback', function() {
        let jQueryMock = sinon.mock($.fn);

        jQueryMock.expects('ready').once().withArgs(sinon.match.func);
        assert.equal(formation.registerRule('text', 'a-good-rule', function() {}), formation);

        jQueryMock.verify();
      });
    });
    describe('when `document.ready` is called', function() {
      // This is more of an integration test, but whatever.
      it('registers the supplied rule for each registered form', function() {
        let formationMock = sinon.mock(formation);
        let $forms = $('<form data-formation="1" id="form1"></form>');
        let formEventsHandler = formEventsHandlerStamp({
          formationSelector: '[data-formation="1"]',
          nodeEvents : formation.nodeEvents
        });
        let formEventsHandlerMock = sinon.mock(formEventsHandler);
        let rule = ruleStamp({name: 'a-good-rule', callback: function() {}});

        formationMock.expects('get$forms').once().returns($forms);
        formationMock.expects('getFormComponentOfCurrentElement').once().withArgs($($forms.get(0))).returns(formEventsHandler);
        formationMock.expects('createFormationRule').once().withArgs('a-good-rule', rule.callback).returns(rule);
        formEventsHandlerMock.expects('registerRule').once().withArgs('text', rule);

        assert.equal(formation.registerRule('text', 'a-good-rule', rule.callback), formation);

        formationMock.verify();
        formEventsHandlerMock.verify();
      });
    });
  });

  describe('`getDebug()`', function() {
    it('should return `false` when logging is disabled (as it is by default)', function() {
      assert.isFalse(formation.getDebug());
    });
    it('should return `true` when logging is enabled', function() {
      formation.setDebug(true);
      assert.isTrue(formation.getDebug());
    });
  });

  describe('`setDebug()`', function() {
    it('should throw a `TypeError` when the `newVal` param is not a Boolean', function() {
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
      assert.doesNotThrow(() => formation.setDebug(false), TypeError);
      assert.equal(formation.setDebug(true), formation);
      assert.isTrue(formation.getDebug());
    });
  });

  describe('`get$forms()`', function() {
    it('returns an empty `jQuery` object by default', function() {
      assert.equal(formation.get$forms().length, 0);
    });
  });

  describe('`detectForms()`', function() {
    it('looks for `form` elements in the DOM, filter them, and return itself', function() {
      let jQueryMock = sinon.mock($.fn);
      jQueryMock.expects('filter').once().withArgs(formation.formFilter).returns($);

      assert.equal(formation.detectForms(), formation);

      jQueryMock.verify();
    });
  });

  describe('`formFilter()`', function() {
    let jQueryMock;
    beforeEach(function() {
      jQueryMock = sinon.mock($.fn);
    });
    afterEach(function() {
      jQueryMock.restore();
    });
    it('returns false when the DOM element is not a `form` node', function() {
      jQueryMock.expects('prop').once().withArgs('tagName').returns('div');
      jQueryMock.expects('attr').never();

      let $div = $('<div></div>');

      assert.isFalse(formation.formFilter(0, $div.get(0)));

      jQueryMock.verify();
    });
    it('returns false when the DOM element is a `form` node, but has no `data-formation` attribute', function() {
      jQueryMock.expects('prop').once().withArgs('tagName').returns('form');
      jQueryMock.expects('attr').once().withArgs('data-formation').returns(undefined);

      let $form = $('<form></form>');

      assert.isFalse(formation.formFilter(0, $form.get(0)));

      jQueryMock.verify();
    });
    it('returns false when the DOM element is a `form` node, has a `data-formation` attribute, but the value is not `1`', function() {
      jQueryMock.expects('prop').once().withArgs('tagName').returns('form');
      jQueryMock.expects('attr').twice().withArgs('data-formation').returns('0');

      let $form = $('<form data-formation="0"></form>');

      assert.isFalse(formation.formFilter(0, $form.get(0)));

      jQueryMock.verify();
    });
    it('returns true when the DOM element is a `form` node, has a `data-formation` attribute, and the value is `1`', function() {
      jQueryMock.expects('prop').once().withArgs('tagName').returns('form');
      jQueryMock.expects('attr').twice().withArgs('data-formation').returns('1');

      let $form = $('<form data-formation="1"></form>');

      assert.isTrue(formation.formFilter(0, $form.get(0)));

      jQueryMock.verify();
    });
  });

  describe.skip('`getSupportedElementTypes()`', function() {});

  describe('`initBodyEvents()`', function() {
    describe('when the body events have not yet been initialized', function() {
      it('logs initialization, and calls `setLogConsole()` and `addDefaultEventHandlers()` on the new instance', function() {
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
      let $forms = $('<form data-formation="1" id="form1"></form>');
      $(document.body).append($forms);
      formation = formationStamp({ nodeEvents: eventEmitterStamp() }).detectForms();
      let formationMock = sinon.mock(formation);

      formationMock.expects('initForm').once().withArgs($($forms.get(0))).returns(formation);

      assert.equal(formation.initForms(), formation);

      formationMock.verify();
    });
  });
});
