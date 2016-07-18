'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const assert = require('chai').assert;
const sinon = require('sinon');

const domNavigationStamp = require('../../src/utilities/dom-navigation');
const formComponentStamp = require('../../src/components/form');

describe('Objects created using the `domNavigationStamp`', function() {
  let domNavigation;
  let domNavigationMock;
  beforeEach(function() {
    domNavigation = domNavigationStamp({formationSelector : '[data-formation="1"]'});
    domNavigationMock = sinon.mock(domNavigation);
  });

  describe('`findCurrentFormByTarget()`', function() {
    it('should return the closest jQuery wrapped element in the DOM using the `formationSelector`', function() {
      let $empty = $();
      let $form = $('<form data-formation="1"></form>');
      let $element = $('<div></div>');

      let $fnMock = sinon.mock($.fn);
      $fnMock.expects('closest').once().withArgs('[data-formation="1"]').returns($empty);
      assert.equal(domNavigation.findCurrentFormByTarget($element), $empty);

      $element.wrap($form);
      $fnMock.expects('closest').once().withArgs('[data-formation="1"]').returns($form);
      assert.equal(domNavigation.findCurrentFormByTarget($element), $form);

      $fnMock.verify();
    });
  });

  describe('`getFormComponentOfCurrentElement()`', function() {
    describe('when the element is not inside a Formation `formComponent`', function() {
      it('returns null', function() {
        let $empty = $();
        let $element = $('<div></div>');

        domNavigationMock.expects('findCurrentFormByTarget').once().withArgs($element).returns($empty);
        assert.isNull(domNavigation.getFormComponentOfCurrentElement($element));

        domNavigationMock.verify();
      });
    });
    describe('when the element is inside a Formation `formComponent`', function() {
      let formComponent;
      let formComponentMock;
      let $element;
      let $form;
      let $formMock;
      beforeEach(function() {
        formComponent = formComponentStamp();
        formComponentMock = sinon.mock(formComponent);
        $element = $('<div></div>');
        $element.wrap($form);
        $form = $('<form data-formation="1"></form>');
        $formMock = sinon.mock($form);
      });
      describe('the `formation-form` data object is undefined (ie not set)', function() {
        it('throws a TypeError explaining that it has not yet been set', function() {
          domNavigationMock.expects('findCurrentFormByTarget').once().withArgs($element).returns($form);
          $formMock.expects('data').once().withArgs(domNavigation.formationDataKey).returns(undefined);

          assert.throws(
            () => { domNavigation.getFormComponentOfCurrentElement($element); },
            TypeError,
            'The `formation-form` data object is not set.'
          );

          $formMock.verify();
          domNavigationMock.verify();
        });
      });
      describe('the `formation-form` data object is set but is not a `formComponent`', function() {
        it('throws a TypeError explaining that it is not built from the correct stamp', function() {
          domNavigationMock.expects('findCurrentFormByTarget').once().withArgs($element).returns($form);
          $formMock.expects('data').once().withArgs(domNavigation.formationDataKey).returns(formComponent);
          formComponentMock.expects('isFormComponent').once().returns(false);

          assert.throws(
            () => { domNavigation.getFormComponentOfCurrentElement($element); },
            TypeError,
            'The `formation-form` data object is not built from a `formComponent` stamp.'
          );

          $formMock.verify();
          domNavigationMock.verify();
          formComponentMock.verify();
        });
      });
      describe('the `formation-form` data object is set and is a `formComponent`', function() {
        it('successfully returns the `formComponent` object', function() {
          domNavigationMock.expects('findCurrentFormByTarget').once().withArgs($element).returns($form);
          $formMock.expects('data').once().withArgs(domNavigation.formationDataKey).returns(formComponent);
          formComponentMock.expects('isFormComponent').once().returns(true);

          assert.equal(domNavigation.getFormComponentOfCurrentElement($element), formComponent);

          $formMock.verify();
          domNavigationMock.verify();
          formComponentMock.verify();
        });
      });
    });
  });
  describe('`elementIsCustomRadioOrCheckboxWidget()`', function() {
    describe('when the element is not inside a Formation `form`', function() {
      it('should return false');
    });
    describe('when the element is inside a Formation `form` but is not a custom radio or checkbox widget', function() {
      it('should return false');
    });
    describe('when the element is inside a Formation `form` and is a custom radio or checkbox widget', function() {
      it('should return true');
    });
  });
});
