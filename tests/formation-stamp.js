'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const formationStamp = require('../src/formation-stamp');

describe('Objects created using the `formationStamp`', function() {
  let formation;
  beforeEach(function() {
    formation = formationStamp();
  });

  describe('`readyDocument()`', function() {
    it('should enable logging when debugging is enabled, Enter Formation, and return itself', function() {
      let formationMock = sinon.mock(formation);

      formationMock.expects('getDebug').once().returns(true);
      formationMock.expects('setLogConsole').once().withArgs(true);
      formationMock.expects('enterFormation').once();

      assert.equal(formation.readyDocument(), formation);

      formationMock.verify();
    });
    it('should disable logging when debugging is disable, Enter Formation, and return itself', function() {
      let formationMock = sinon.mock(formation);

      formationMock.expects('getDebug').once().returns(false);
      formationMock.expects('setLogConsole').once().withArgs(false);
      formationMock.expects('enterFormation').once();

      assert.equal(formation.readyDocument(), formation);

      formationMock.verify();
    });
  });

  describe('`enterFormation()`', function() {
    it('should log initialization and return itself', function() {
      let formationMock = sinon.mock(formation);

      formationMock.expects('log').once().withArgs('Initializing Formation...');
      formationMock.expects('detectForms').once();

      assert.equal(formation.enterFormation(), formation);

      formationMock.verify();
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

  describe('`detectForms()`', function() {
    it('look for `form` elements in the DOM, filter them, and return itself', function() {
      let jQueryMock = sinon.mock($.fn);
      jQueryMock.expects('filter').once().withArgs(formation.formFilter).returns($);

      assert.equal(formation.detectForms(), formation);

      jQueryMock.verify();
    });
  });

  describe('`formFilter()`', function() {
    it('returns false when the DOM element is not a `form` node', function() {
      let jQueryMock = sinon.mock($.fn);
      jQueryMock.expects('prop').once().withArgs('tagName').returns('div');
      jQueryMock.expects('attr').never();

      let $div = $('<div></div>');

      assert.isFalse(formation.formFilter(0, $div.get(0)));

      jQueryMock.verify();
    });
    it('returns false when the DOM element is a `form` node, but has no `data-formation` attribute', function() {
      let jQueryMock = sinon.mock($.fn);
      jQueryMock.expects('prop').once().withArgs('tagName').returns('form');
      jQueryMock.expects('attr').once().withArgs('data-formation').returns(undefined);

      let $form = $('<form></form>');

      assert.isFalse(formation.formFilter(0, $form.get(0)));

      jQueryMock.verify();
    });
    it('returns false when the DOM element is a `form` node, has a `data-formation` attribute, but the value is not `1`', function() {
      let jQueryMock = sinon.mock($.fn);
      jQueryMock.expects('prop').once().withArgs('tagName').returns('form');
      jQueryMock.expects('attr').twice().withArgs('data-formation').returns('0');

      let $form = $('<form data-formation="0"></form>');

      assert.isFalse(formation.formFilter(0, $form.get(0)));

      jQueryMock.verify();
    });
    it('returns true when the DOM element is a `form` node, has a `data-formation` attribute, and the value is `1`', function() {
      let jQueryMock = sinon.mock($.fn);
      jQueryMock.expects('prop').once().withArgs('tagName').returns('form');
      jQueryMock.expects('attr').twice().withArgs('data-formation').returns('1');

      let $form = $('<form data-formation="1"></form>');

      assert.isTrue(formation.formFilter(0, $form.get(0)));

      jQueryMock.verify();
    });
  });
});
