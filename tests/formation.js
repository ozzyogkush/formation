'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

describe('The `Formation` object', function() {
  describe('upon creation', function() {
    it('adds a `document.ready` event handler', function() {
      let jQueryMock = sinon.mock($.fn);
      jQueryMock.expects('ready').once().withArgs(sinon.match.func);

      // The package is simply imported and everything should begin.
      require('../src/formation');

      jQueryMock.verify();
    });
  });
});
