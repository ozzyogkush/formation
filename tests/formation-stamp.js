'use strict';

const stampit = require('stampit');

const assert = require('chai').assert;
const sinon = require('sinon');

const formationStamp = require('../src/formation-stamp');

describe('Objects created using the `formationStamp`', function() {
  let formation;
  beforeEach(function() {
    formation = formationStamp();
  });
  describe('`getDebug()`', function() {
    it('should return `false` when logging is disabled (as it is by default)', function() {
      assert.isFalse(formation.getDebug());
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
      assert.equal(formation, formation.setDebug(true));
      assert.isTrue(formation.getDebug());
    });
  });

  describe('`enterFormation()`', function() {
    it('should log initialization and return itself', function() {
      let formationMock = sinon.mock(formation);//.expects('log').once().//sinon.mock(formation {log);

      formationMock.expects('log').once().withArgs('Initializing Formation...');

      assert.equal(formation, formation.enterFormation());

      formationMock.verify();
    });
  });
});
