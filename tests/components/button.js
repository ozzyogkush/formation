'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const buttonComponentStamp = require('../../src/components/button');

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
