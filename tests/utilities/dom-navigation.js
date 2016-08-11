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
        $form = $('<form data-formation="1"></form>');
        $element.wrap($form);
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

  describe('`findRequiredFields()`', function() {
    describe('when there are no required fields inside the specified `form` node', function() {
      it('should return an empty jQuery set', function() {
        let $input = $('<input type="text" />');
        let $form = $('<form data-formation="1"></form>');
        $input.wrap($form);
        let $formMock = sinon.mock($form);

        $formMock.expects('find').once().withArgs('[data-fv-required="1"]').returns($());
        domNavigation.findRequiredFields($form);

        $formMock.verify();
      });
    });
    describe('when there are required fields inside the specified `form` node', function() {
      it('should return a non-empty jQuery set', function() {
        let $element = $('<input type="text" data-fv-required="1" />');
        let $form = $('<form data-formation="1"></form>');
        $element.wrap($form);
        let $formMock = sinon.mock($form);

        $formMock.expects('find').once().withArgs('[data-fv-required="1"]').returns($element);
        domNavigation.findRequiredFields($form);

        $formMock.verify();
      });
    });
  });

  describe('`findOptionalFields()`', function() {
    describe('when there are no optional fields inside the specified `form` node', function() {
      it('should return an empty jQuery set', function() {
        let $input = $('<input type="text" />');
        let $form = $('<form data-formation="1"></form>');
        $input.wrap($form);
        let $formMock = sinon.mock($form);

        $formMock.expects('find').once().withArgs('[data-fv-optional="1"]').returns($());
        domNavigation.findOptionalFields($form);

        $formMock.verify();
      });
    });
    describe('when there are optional fields inside the specified `form` node', function() {
      it('should return a non-empty jQuery set', function() {
        let $element = $('<input type="text" data-fv-optional="1" />');
        let $form = $('<form data-formation="1"></form>');
        $element.wrap($form);
        let $formMock = sinon.mock($form);

        $formMock.expects('find').once().withArgs('[data-fv-optional="1"]').returns($element);
        domNavigation.findOptionalFields($form);

        $formMock.verify();
      });
    });
  });

  describe('`findSubmitButton()`', function() {
    describe('when there is no Formation submit button inside the specified `form` node', function() {
      it('should return an empty jQuery set', function() {
        let $button = $('<button type="submit">Go</button>');
        let $form = $('<form data-formation="1"></form>');
        $button.wrap($form);
        let $formMock = sinon.mock($form);

        $formMock.expects('find').once().withArgs('[data-fv-form-submit]').returns($());
        domNavigation.findSubmitButton($form);

        $formMock.verify();
      });
    });
    describe('when there is a Formation submit button inside the specified `form` node', function() {
      it('should return a non-empty jQuery set', function() {
        let $button = $('<button type="submit" data-fv-form-submit="1">Go</button>');
        let $form = $('<form data-formation="1"></form>');
        $button.wrap($form);
        let $formMock = sinon.mock($form);

        $formMock.expects('find').once().withArgs('[data-fv-form-submit]').returns($button);
        domNavigation.findSubmitButton($form);

        $formMock.verify();
      });
    });
  });

  describe('`findPreviewButton()`', function() {
    describe('when there is no Formation submit button inside the specified `form` node', function() {
      it('should return an empty jQuery set', function() {
        let $button = $('<button type="button">Preview</button>');
        let $form = $('<form data-formation="1"></form>');
        $button.wrap($form);
        let $formMock = sinon.mock($form);

        $formMock.expects('find').once().withArgs('[data-fv-form-preview]').returns($());
        domNavigation.findPreviewButton($form);

        $formMock.verify();
      });
    });
    describe('when there is a Formation submit button inside the specified `form` node', function() {
      it('should return a non-empty jQuery set', function() {
        let $button = $('<button type="button" data-fv-form-preview="1">Preview</button>');
        let $form = $('<form data-formation="1"></form>');
        $button.wrap($form);
        let $formMock = sinon.mock($form);

        $formMock.expects('find').once().withArgs('[data-fv-form-preview]').returns($button);
        domNavigation.findPreviewButton($form);

        $formMock.verify();
      });
    });
  });

  describe('`elementIsCustomRadioOrCheckboxWidget()`', function() {
    describe('when the element is not inside a Formation `form`', function() {
      it('should return false', function() {
        let $element = $('<div></div>');
        domNavigationMock.expects('findCurrentFormByTarget').once().withArgs($element).returns($());

        domNavigation.elementIsCustomRadioOrCheckboxWidget($element);

        domNavigationMock.verify();
      });
    });
    describe('when the element is inside a Formation `form` but is not a custom radio or checkbox widget', function() {
      it('should return false', function() {
        let $element = $('<div></div>');
        let $elementMock = sinon.mock($element);
        let $form = $('<form></form>');

        $elementMock.expects('hasClass').once().withArgs('btn-checkbox').returns(false);
        $elementMock.expects('hasClass').once().withArgs('btn-radio').returns(false);
        domNavigationMock.expects('findCurrentFormByTarget').once().withArgs($element).returns($form);

        domNavigation.elementIsCustomRadioOrCheckboxWidget($element);

        $elementMock.verify();
        domNavigationMock.verify();
      });
    });
    describe('when the element is inside a Formation `form` and is a custom radio or checkbox widget', function() {
      it('should return true', function() {
        let $element = $('<label class="btn-checkbox"></label>');
        let $elementMock = sinon.mock($element);
        let $form = $('<form></form>');

        $elementMock.expects('hasClass').once().withArgs('btn-checkbox').returns(true);
        $elementMock.expects('hasClass').never().withArgs('btn-radio');
        domNavigationMock.expects('findCurrentFormByTarget').once().withArgs($element).returns($form);

        domNavigation.elementIsCustomRadioOrCheckboxWidget($element);

        $elementMock.verify();
        domNavigationMock.verify();
      });
    });
  });

  describe('`getInputElementLabel()`', function() {
    it('looks for a `label` element for the supplied input', function() {
      let $input = $('<input class="btn-checkbox" id="a" /><label for="a"></label>');
      let $form = $('<form></form>');
      let $formMock = sinon.mock($form);

      domNavigationMock.expects('findCurrentFormByTarget').once().withArgs($input).returns($form);
      $formMock.expects('find').once().withArgs('label[for="a"]').returns($input.siblings('label[for="a"]'));

      domNavigation.getInputElementLabel($input);

      $formMock.verify();
      domNavigationMock.verify();
    });
  });

  describe('`getLinkedElement()`', function() {
    describe('when the linked element is not expected', function() {
      it('returns null', function() {
        let $source = $('<input type="checkbox" />');
        let $sourceMock = sinon.mock($source);

        $sourceMock.expects('attr').once().withArgs('data-fv-linked-input').returns(undefined);

        assert.isNull(domNavigation.getLinkedElement($source));

        $sourceMock.verify();
      });
    });
    describe('when the linked element is expected but not found in the DOM', function() {
      it('throws an error', function() {
        let $source = $('<input type="checkbox" data-fv-linked-input="some-other-id" />');
        let $sourceMock = sinon.mock($source);

        $sourceMock.expects('attr').once().withArgs('data-fv-linked-input').returns('some-other-id');

        assert.throws(
          () => { domNavigation.getLinkedElement($source); },
          Error,
          'Expected an element with a `data-fv-linked-input` attribute equal to "some-other-id".'
        );

        $sourceMock.verify();
      });
    });
    describe('when the linked element is expected and found in the DOM', function() {
      it('returns the linked element', function() {
        let $someOtherElement = $('<input id="some-other-id" />');
        $('body').append($someOtherElement);
        let $source = $('<input type="checkbox" data-fv-linked-input="some-other-id" />');
        let $sourceMock = sinon.mock($source);

        $sourceMock.expects('attr').once().withArgs('data-fv-linked-input').returns('some-other-id');

        assert.deepEqual(domNavigation.getLinkedElement($source), $('#some-other-id'));

        $sourceMock.verify();
      });
    });
  });

  describe('`enableOrDisableElement()`', function() {
    describe('when the `enable` param is true', function() {
      it('removes the `disabled` property and class name from the element', function() {
        let $element = $('<input type="text" disabled="disabled" class="disabled" />');
        let $elementMock = sinon.mock($element);

        $elementMock.expects('removeProp').once().withArgs('disabled').returns($element);
        $elementMock.expects('removeClass').once().withArgs('disabled').returns($element);

        assert.equal(domNavigation.enableOrDisableElement($element, true), domNavigation);

        $elementMock.verify();
      });
    });
    describe('when the `enable` param is false', function() {
      it('sets the `disabled` property and adds the `disabled` class name to the element', function() {
        let $element = $('<input type="text" />');
        let $elementMock = sinon.mock($element);

        $elementMock.expects('prop').once().withArgs('disabled', 'disabled').returns($element);
        $elementMock.expects('addClass').once().withArgs('disabled').returns($element);

        assert.equal(domNavigation.enableOrDisableElement($element, false), domNavigation);

        $elementMock.verify();
      });
    });
  });

  describe('`showOrHideElement()`', function() {
    describe('when the `show` param is true', function() {
      it('removes the `hidden` class name from the element', function() {
        let $element = $('<input type="text" class="hidden" />');
        let $elementMock = sinon.mock($element);

        $elementMock.expects('removeClass').once().withArgs('hidden').returns($element);

        assert.equal(domNavigation.showOrHideElement($element, true), domNavigation);

        $elementMock.verify();
      });
    });
    describe('when the `show` param is false', function() {
      it('adds the `hidden` class name to the element', function() {
        let $element = $('<input type="text" />');
        let $elementMock = sinon.mock($element);

        $elementMock.expects('addClass').once().withArgs('hidden').returns($element);

        assert.equal(domNavigation.showOrHideElement($element, false), domNavigation);

        $elementMock.verify();
      });
    });
  });

  describe('`showOrHideLinkedElement()`', function() {
    describe('when there is no element linked with the `$element` param', function() {
      it('returns from the method', function() {
        let $element = $('<input type="text" />');

        domNavigationMock.expects('getLinkedElement').once().withArgs($element).returns(null);
        assert.equal(domNavigation.showOrHideLinkedElement($element), domNavigation);

        domNavigationMock.verify();
      });
    });
    describe('when there is an element linked with the `$element` param', function() {
      describe('when the linked element is not in a form group', function() {
        it('returns from the method', function() {
          let $element = $('<input type="text" />');
          let $linkedElement = $('<input type="checkbox" />');
          let $linkedElementMock = sinon.mock($linkedElement);

          $linkedElementMock.expects('closest').once().withArgs('.form-group').returns($());
          domNavigationMock.expects('getLinkedElement').once().withArgs($element).returns($linkedElement);
          domNavigationMock.expects('enableOrDisableLinkedElement').once().withArgs($linkedElement, false, true).returns($linkedElement);
          assert.equal(domNavigation.showOrHideLinkedElement($element, false), domNavigation);

          $linkedElementMock.verify();
          domNavigationMock.verify();
        });
      });
      describe('when the linked element is in a form group', function() {
        it('returns from the method', function() {
          let $element = $('<input type="text" />');
          let $linkedElement = $('<input type="checkbox" />');
          let $formGroup = $linkedElement.wrap($('<div class="form-group"></div>'));
          let $linkedElementMock = sinon.mock($linkedElement);

          $linkedElementMock.expects('closest').once().withArgs('.form-group').returns($formGroup);
          domNavigationMock.expects('getLinkedElement').once().withArgs($element).returns($linkedElement);
          domNavigationMock.expects('showOrHideElement').once().withArgs($formGroup, true).returns(domNavigation);
          domNavigationMock.expects('enableOrDisableLinkedElement').once().withArgs($linkedElement, true, false).returns($linkedElement);
          assert.equal(domNavigation.showOrHideLinkedElement($element, true), domNavigation);

          $linkedElementMock.verify();
          domNavigationMock.verify();
        });
      });
    });
  });

  describe('`enableOrDisableLinkedElement()`', function() {
    describe('when the `enableAndShow` param is true', function() {
      it('calls `showEnableLinkedElement()` with the supplied $linkedElement and `elementHandlesHidden` flag', function() {
        let $element = $('<input type="text" />');

        domNavigationMock.expects('showEnableLinkedElement').once().withArgs($element, true).returns(domNavigation);
        assert.equal(domNavigation.enableOrDisableLinkedElement($element, true, true), domNavigation);

        domNavigationMock.verify();
      });
    });
    describe('when the `enableAndShow` param is false', function() {
      it('calls `hideDisableLinkedElement()` with the supplied $linkedElement and `elementHandlesHidden` flag', function() {
        let $element = $('<input type="text" />');

        domNavigationMock.expects('hideDisableLinkedElement').once().withArgs($element, true).returns(domNavigation);
        assert.equal(domNavigation.enableOrDisableLinkedElement($element, false, true), domNavigation);

        domNavigationMock.verify();
      });
    });
  });

  describe('`showEnableLinkedElement()` calls `enableOrDisableElement()` with the supplied $element and `true` flag', function() {
    describe('when the `removeHidden` param is false', function() {
      it('does not call `showOrHideElement()`', function () {
        let $element = $('<input type="text" />');

        domNavigationMock.expects('enableOrDisableElement').once().withArgs($element, true).returns(domNavigation);
        domNavigationMock.expects('showOrHideElement').never();
        assert.equal(domNavigation.showEnableLinkedElement($element, false), domNavigation);

        domNavigationMock.verify();
      });
    });
    describe('when the `removeHidden` param is true', function() {
      it('calls `showOrHideElement()` with the supplied $element and `true` flag', function () {
        let $element = $('<input type="text" />');

        domNavigationMock.expects('enableOrDisableElement').once().withArgs($element, true).returns(domNavigation);
        domNavigationMock.expects('showOrHideElement').once().withArgs($element, true).returns(domNavigation);
        assert.equal(domNavigation.showEnableLinkedElement($element, true), domNavigation);

        domNavigationMock.verify();
      });
    });
  });

  describe('`hideDisableLinkedElement()`', function() {
    describe('when it is not set to clear the value, it does not clear the value or set the valid attribute to 0', function() {
      describe('when the `includeHidden` param is false', function() {
        it('does not call `showOrHideElement()`', function () {
          let $element = $('<input type="text" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').twice().withArgs('data-fv-toggle-override-text').returns('0');
          domNavigationMock.expects('enableOrDisableElement').once().withArgs($element, false).returns(domNavigation);
          domNavigationMock.expects('showOrHideElement').never().returns(domNavigation);
          assert.equal(domNavigation.hideDisableLinkedElement($element, false), domNavigation);

          domNavigationMock.verify();
          $elementMock.verify();
        });
      });
      describe('when the `includeHidden` param is true', function() {
        it('calls `showOrHideElement()` with the supplied $element and `true` flag', function () {
          let $element = $('<input type="text" />');
          let $elementMock = sinon.mock($element);

          $elementMock.expects('attr').twice().withArgs('data-fv-toggle-override-text').returns('0');
          domNavigationMock.expects('enableOrDisableElement').once().withArgs($element, false).returns(domNavigation);
          domNavigationMock.expects('showOrHideElement').once().withArgs($element, false).returns(domNavigation);
          assert.equal(domNavigation.hideDisableLinkedElement($element, true), domNavigation);

          domNavigationMock.verify();
          $elementMock.verify();
        });
      });
    });
    describe('when it is set to clear the value', function() {
      it('clears the value and sets the valid attribute to 0', function () {
        let $element = $('<input type="text" />');
        let $elementMock = sinon.mock($element);

        $elementMock.expects('attr').once().withArgs('data-fv-toggle-override-text').returns(undefined);
        $elementMock.expects('val').once().withArgs('').returns($element);
        $elementMock.expects('trigger').once().withArgs('set-validation-flag.formation', false);
        domNavigationMock.expects('enableOrDisableElement').once().withArgs($element, false).returns(domNavigation);
        domNavigationMock.expects('showOrHideElement').never().returns(domNavigation);
        assert.equal(domNavigation.hideDisableLinkedElement($element, false), domNavigation);

        domNavigationMock.verify();
        $elementMock.verify();
      });
    });
  });

  describe('`visibleEnabledFilter()`', function() {
    let element;
    let $fnMock;
    beforeEach(function() {
      let $element = $('<select></select>');
      $fnMock = sinon.mock($.fn);
      element = $element.get(0);
    });
    describe('when the element is hidden', function() {
      it('returns false', function() {
        $fnMock.expects('hasClass').once().withArgs('hidden').returns(true);
        $fnMock.expects('prop').never();
        assert.isFalse(domNavigation.visibleEnabledFilter(0, element));
        $fnMock.verify();
      });
    });
    describe('when the element is disabled', function() {
      it('returns false', function() {
        $fnMock.expects('hasClass').once().withArgs('hidden').returns(false);
        $fnMock.expects('prop').once().withArgs('disabled').returns('disabled');
        assert.isFalse(domNavigation.visibleEnabledFilter(0, element));
        $fnMock.verify();
      });
      it('returns false', function() {
        $fnMock.expects('hasClass').once().withArgs('hidden').returns(false);
        $fnMock.expects('prop').once().withArgs('disabled').returns(undefined);
        $fnMock.expects('hasClass').once().withArgs('disabled').returns(true);
        assert.isFalse(domNavigation.visibleEnabledFilter(0, element));
        $fnMock.verify();
      });
    });
    describe('when the element is neither disabled nor hidden', function() {
      it('returns true', function() {
        $fnMock.expects('hasClass').once().withArgs('hidden').returns(false);
        $fnMock.expects('prop').once().withArgs('disabled').returns(undefined);
        $fnMock.expects('hasClass').once().withArgs('disabled').returns(false);
        assert.isTrue(domNavigation.visibleEnabledFilter(0, element));
        $fnMock.verify();
      });
    });
  });
});
