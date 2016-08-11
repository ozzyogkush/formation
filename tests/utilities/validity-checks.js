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

  describe('`isValidZip()`', function() {
    it('should return `false` when the value being tested is not a 5-digit ZIP code or ZIP +4', function() {
      assert.isFalse(validityCheck.isValidZip('1234'));
      assert.isFalse(validityCheck.isValidZip('1234a'));
      assert.isFalse(validityCheck.isValidZip('12345-'));
      assert.isFalse(validityCheck.isValidZip('12345-123'));
      assert.isFalse(validityCheck.isValidZip('12345-123a'));
    });
    it('should return `true` when the value being tested is a 5-digit ZIP code', function() {
      assert.isTrue(validityCheck.isValidZip('12345'));
    });
    it('should return `true` when the value being tested is a 5-digit ZIP code and only that part is specified', function() {
      assert.isTrue(validityCheck.isValidZip('12345', 5));
    });
    it('should return `true` when the value being tested is a 5-digit ZIP code with the 4 digit extension', function() {
      assert.isTrue(validityCheck.isValidZip('12345-1234'));
    });
    it('should return `true` when the value being tested is a 4-digit ZIP+4 code and only that part is specified', function() {
      assert.isTrue(validityCheck.isValidZip('1234', 4));
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
    it('should return `true` when the value being tested is formatted as a US phone number', function() {
      assert.isTrue(validityCheck.isValidPhone('(123) 456-7890'));
      assert.isTrue(validityCheck.isValidPhone('(800) 420-1420'));
    });
    it('should return `true` when the value being tested is in one of a few formats when multi specified', function() {
      assert.isTrue(validityCheck.isValidPhone('(800) 420-1420', true));
      assert.isTrue(validityCheck.isValidPhone('1234567890', true));
      assert.isTrue(validityCheck.isValidPhone('800-420-1420', true));
    });
  });
});
