'use strict';

const stampit = require('stampit');

const assert = require('chai').assert;
const sinon = require('sinon');

const validityCheckStamp = require('../../src/utilities/validity-checks');

describe('Objects created using the `validityCheckStamp`', function() {
  let validityCheck;
  beforeEach(function() {
    validityCheck = validityCheckStamp();
  });
  describe('`isValidNumeric()`', function() {
    it('should return `false` when the value being tested has non-numeric characters', function() {
      assert.isFalse(validityCheck.isValidNumeric('abc123'));
      assert.isFalse(validityCheck.isValidNumeric('123abc'));
    });
    it('should return `true` when the value being tested has only numeric characters', function() {
      assert.isTrue(validityCheck.isValidNumeric('1243'));
      assert.isTrue(validityCheck.isValidNumeric('5432523'));
    });
  });

  describe('`isValidEmail()`', function() {
    it('should return `false` when the value being tested is not a valid email address', function() {
      assert.isFalse(validityCheck.isValidEmail('testmissingatsign.com'));
      assert.isFalse(validityCheck.isValidEmail('test@missingdomain'));
    });
    it('should return `true` when the value being tested is a valid email address', function() {
      assert.isTrue(validityCheck.isValidEmail('good.email@address.com'));
      assert.isTrue(validityCheck.isValidEmail('anothergoodemailaddress@some.random.domain.com'));
    });
  });

  describe('`isValidPhone()`', function() {
    it('should return `false` when the value being tested is not formatted as a US phone number', function() {
      assert.isFalse(validityCheck.isValidPhone('gibberish'));
      assert.isFalse(validityCheck.isValidPhone('180012345678'));
      assert.isFalse(validityCheck.isValidPhone('1234567890'));
    });
    it('should return `true` when the value being tested is not formatted as a US phone number', function() {
      assert.isTrue(validityCheck.isValidPhone('(123) 456-7890'));
      assert.isTrue(validityCheck.isValidPhone('(800) 420-1420'));
    });
  });
});
