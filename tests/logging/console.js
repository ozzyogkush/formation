'use strict';

const stampit = require('stampit');

const assert = require('chai').assert;
const sinon = require('sinon');

const consoleLoggerStamp = require('../../src/logging/console');

describe('Objects created using the `consoleLoggerStamp`', function() {
  let consoleLogger;
  beforeEach(function() {
    consoleLogger = consoleLoggerStamp();
  });
  describe('`getLogConsole()`', function() {
    it('should return `false` when logging is disabled', function() {
      assert.isFalse(consoleLogger.getLogConsole());
    });
  });

  describe('`setLogConsole()`', function() {
    it('should throw a `TypeError` when the `newVal` param is not a Boolean', function() {
      assert.throws(
        () => consoleLogger.setLogConsole(),
        TypeError,
        'Expected `newVal` param to be a Boolean, but is `undefined`'
      );
      assert.throws(
        () => consoleLogger.setLogConsole('test string'),
        TypeError,
        'Expected `newVal` param to be a Boolean, but is `string`'
      );
    });
    it('should not throw a `TypeError` when the `newVal` param is a Boolean', function() {
      assert.doesNotThrow(() => consoleLogger.setLogConsole(false), TypeError);
      assert.equal(consoleLogger.setLogConsole(true), consoleLogger);
      assert.isTrue(consoleLogger.getLogConsole());
    });
  });

  describe('when logging is disabled', function() {
    it('the various console methods (`error()`, `info()`, `log()`, `warn()`) should never be called', function() {
      consoleLogger.setLogConsole(false);
      let consoleMock = sinon.mock(consoleLogger.console);

      consoleMock.expects('error').never();
      consoleMock.expects('info').never();
      consoleMock.expects('log').never();
      consoleMock.expects('warn').never();

      consoleLogger.error('Testing Error');
      consoleLogger.info('Testing Info');
      consoleLogger.log('Testing Log');
      consoleLogger.warn('Testing Warn');

      consoleMock.verify();
    });
  });

  describe('when logging is enabled', function() {
    it('the various console methods (`error()`, `info()`, `log()`, `warn()`) should be called', function() {
      consoleLogger.setLogConsole(true);
      let consoleMock = sinon.mock(consoleLogger.console);

      consoleMock.expects('error').once().withArgs('Testing Error');
      consoleMock.expects('info').once().withArgs('Testing Info');
      consoleMock.expects('log').once().withArgs('Testing Log');
      consoleMock.expects('warn').once().withArgs('Testing Warn');

      consoleLogger.error('Testing Error');
      consoleLogger.info('Testing Info');
      consoleLogger.log('Testing Log');
      consoleLogger.warn('Testing Warn');

      consoleMock.verify();
    });
  });
});
