'use strict';

const stampit = require('stampit');
const assert = require('chai').assert;
const sinon = require('sinon');

const domNavigationStamp = require('../../src/utilities/dom-navigation');

describe('Objects created using the `domNavigationStamp`', function() {
  let domNavigation;
  let domNavigationMock;
  beforeEach(function() {
    domNavigation = domNavigationStamp({formationSelector : '[data-formation="1"]'});
    domNavigationMock = sinon.mock(domNavigation);
  });

  describe('`findCurrentFormByTarget()`', function() {
    it('should return the same form element if it is what we are looking for', function() {
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);

      assert.equal(domNavigation.findCurrentFormByTarget(form), form);
    });
    it('should return the closest form element in the DOM using the `formationSelector`, or null if not found', function() {
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);

      const div = document.createElement('div');
      assert.equal(domNavigation.findCurrentFormByTarget(div), null);

      form.appendChild(div);
      assert.equal(domNavigation.findCurrentFormByTarget(div), form);
    });
  });

  describe('`findRequiredFields()`', function() {
    describe('when there are no required fields inside the specified `form` node', function() {
      it('should return an empty NodeList', function() {
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        form.appendChild(input);

        assert.equal(domNavigation.findRequiredFields(form).length, 0);
      });
    });
    describe('when there are required fields inside the specified `form` node', function() {
      it('should return a non-empty NodeList', function() {
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('data-fv-required', '1');
        form.appendChild(input);

        assert.equal(domNavigation.findRequiredFields(form).length, 1);
        assert.equal(domNavigation.findRequiredFields(form)[0], input);
      });
    });
  });

  describe('`findOptionalFields()`', function() {
    describe('when there are no optional fields inside the specified `form` node', function() {
      it('should return an empty NodeList', function() {
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        form.appendChild(input);

        assert.equal(domNavigation.findOptionalFields(form).length, 0);
      });
    });
    describe('when there are optional fields inside the specified `form` node', function() {
      it('should return a non-empty NodeList', function() {
        const form = document.createElement('form');
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('data-fv-optional', '1');
        form.appendChild(input);

        assert.equal(domNavigation.findOptionalFields(form).length, 1);
        assert.equal(domNavigation.findOptionalFields(form)[0], input);
      });
    });
  });

  describe('`findSubmitButton()`', function() {
    describe('when there is no Formation submit button inside the specified `form` node', function() {
      it('should return an empty NodeList', function() {
        const form = document.createElement('form');
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        form.appendChild(button);

        assert.equal(domNavigation.findSubmitButton(form).length, 0);
      });
    });
    describe('when there is a Formation submit button inside the specified `form` node', function() {
      it('should return a non-empty NodeList', function() {
        const form = document.createElement('form');
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('data-fv-form-submit', '1');
        form.appendChild(button);

        assert.equal(domNavigation.findSubmitButton(form).length, 1);
        assert.equal(domNavigation.findSubmitButton(form)[0], button);
      });
    });
  });

  describe('`elementIsCustomRadioOrCheckboxWidget()`', function() {
    describe('when the element is not inside a Formation `form`', function() {
      it('should return false', function() {
        const element = document.createElement('div');
        assert.equal(domNavigation.elementIsCustomRadioOrCheckboxWidget(element), false);
      });
    });
    describe('when the element is inside a Formation `form` but is not a custom radio or checkbox widget', function() {
      it('should return false', function() {
        const element = document.createElement('div');
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);
        form.appendChild(element);

        assert.equal(domNavigation.elementIsCustomRadioOrCheckboxWidget(element), false);
      });
    });
    describe('when the element is inside a Formation `form` and is a custom radio or checkbox widget', function() {
      it('should return true', function() {
        const element = document.createElement('div');
        element.classList.add('btn-checkbox');
        const form = document.createElement('form');
        form.setAttribute('data-formation', 1);
        form.appendChild(element);

        assert.equal(domNavigation.elementIsCustomRadioOrCheckboxWidget(element), true);

        element.classList.replace('btn-checkbox', 'btn-radio');
        assert.equal(domNavigation.elementIsCustomRadioOrCheckboxWidget(element), true);
      });
    });
  });

  describe('`getCheckboxOrRadioContainer()` looks for the DOM element container for a set of input elements with the same name as `input`', function() {
    it('returns null when the DOM element is not in a Formation `form`', function() {
      const input = document.createElement('input');
      input.classList.add('btn-checkbox');
      input.setAttribute('name', 'checkboxes');
      input.setAttribute('id', 'a');

      assert.equal(domNavigation.getCheckboxOrRadioContainer(input), null);
    });

    it('returns null when the DOM element is not found in the current form', function() {
      const input = document.createElement('input');
      input.classList.add('btn-checkbox');
      input.setAttribute('name', 'checkboxes');
      input.setAttribute('id', 'a');

      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);

      form.appendChild(input);
      assert.equal(domNavigation.getCheckboxOrRadioContainer(input), null);
    });

    it('returns the DOM element when it is found', function() {
      const input = document.createElement('input');
      input.classList.add('btn-checkbox');
      input.setAttribute('name', 'checkboxes');
      input.setAttribute('id', 'a');
      const groupContainer = document.createElement('div');
      groupContainer.setAttribute('data-fv-group-container', 'checkboxes');
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);

      groupContainer.appendChild(input);
      form.appendChild(groupContainer);
      assert.equal(domNavigation.getCheckboxOrRadioContainer(input), groupContainer);
    });
  });

  describe('`getAllCheckboxesOrRadiosByName()` looks for all input elements in the current form with the same name as `input`', function() {
    it('returns an empty array when the DOM element is not in a Formation `form`', function() {
      const input = document.createElement('input');
      input.classList.add('btn-checkbox');
      input.setAttribute('name', 'checkboxes');
      input.setAttribute('id', 'a');

      assert.deepEqual(domNavigation.getAllCheckboxesOrRadiosByName(input), []);
    });

    it('returns an array with the matching DOM elements when they are found', function() {
      const input = document.createElement('input');
      input.classList.add('btn-checkbox');
      input.setAttribute('name', 'checkboxes');
      input.setAttribute('id', 'a');
      const input2 = document.createElement('input');
      input2.classList.add('btn-checkbox');
      input2.setAttribute('name', 'checkboxes');
      input2.setAttribute('id', 'b');
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);

      form.appendChild(input);
      form.appendChild(input2);
      assert.equal(domNavigation.getAllCheckboxesOrRadiosByName(input).length, 2);
      assert.equal(domNavigation.getAllCheckboxesOrRadiosByName(input)[0], input);
      assert.equal(domNavigation.getAllCheckboxesOrRadiosByName(input)[1], input2);
    });
  });

  describe('`getInputElementLabel()` looks for a `label` element for the supplied input', function() {
    it('returns an empty array when the DOM element is not in a Formation `form`', function() {
      const input = document.createElement('input');
      input.classList.add('btn-checkbox');
      input.setAttribute('name', 'checkboxes');
      input.setAttribute('id', 'a');

      assert.deepEqual(domNavigation.getInputElementLabel(input), []);
    });

    it('returns an array with the matching DOM element(s) when they are found', function() {
      const input = document.createElement('input');
      input.classList.add('btn-checkbox');
      input.setAttribute('name', 'checkboxes');
      input.setAttribute('id', 'a');
      const label = document.createElement('label');
      label.setAttribute('for', 'a');
      const form = document.createElement('form');
      form.setAttribute('data-formation', 1);

      form.appendChild(input);
      form.appendChild(label);
      assert.equal(domNavigation.getInputElementLabel(input).length, 1);
      assert.equal(domNavigation.getInputElementLabel(input)[0], label);
    });
  });

  describe('`getLinkedElement()`', function() {
    describe('when the linked element is not expected', function() {
      it('returns null', function() {
        const source = document.createElement('input');
        source.setAttribute('type', 'checkbox');

        assert.equal(domNavigation.getLinkedElement(source), null);
      });
    });
    describe('when the linked element is expected but not found in the DOM', function() {
      it('throws an error', function() {
        const source = document.createElement('input');
        source.setAttribute('type', 'checkbox');
        source.setAttribute('data-fv-linked-input', 'linked');
        const form = document.createElement('form');

        form.appendChild(source);
        document.body.appendChild(form);

        assert.throws(
          () => { domNavigation.getLinkedElement(source); },
          Error,
          'Expected an element with a `data-fv-linked-input` attribute equal to "linked".'
        );
        document.body.removeChild(form);
      });
    });
    describe('when the linked element is expected and found in the DOM', function() {
      it('returns the linked element', function() {
        const source = document.createElement('input');
        source.setAttribute('type', 'checkbox');
        source.setAttribute('data-fv-linked-input', 'linked');
        const linkedElement = document.createElement('input');
        linkedElement.setAttribute('id', 'linked');
        const form = document.createElement('form');

        form.appendChild(source);
        form.appendChild(linkedElement);
        document.body.appendChild(form);

        assert.equal(domNavigation.getLinkedElement(source), linkedElement);
        document.body.removeChild(form);
      });
    });
  });

  describe('`enableOrDisableElement()`', function() {
    describe('when the `enable` param is true', function() {
      it('removes the `disabled` property and class name from the element', function() {
        const input = document.createElement('input');
        input.classList.add('disabled');
        input.setAttribute('disabled', 'disabled');

        assert.equal(domNavigation.enableOrDisableElement(input, true), domNavigation);
        assert.equal(input.hasAttribute('disabled'), false);
        assert.equal(input.classList.contains('disabled'), false);
      });
    });
    describe('when the `enable` param is false', function() {
      it('sets the `disabled` property and adds the `disabled` class name to the element', function() {
        const input = document.createElement('input');

        assert.equal(domNavigation.enableOrDisableElement(input, false), domNavigation);
        assert.equal(input.getAttribute('disabled'), 'disabled');
        assert.equal(input.classList.contains('disabled'), true);
      });
    });
  });

  describe('`showOrHideElement()`', function() {
    describe('when the `show` param is true', function() {
      it('removes the `hidden` class name from the element', function() {
        const input = document.createElement('input');
        input.classList.add('hidden');

        assert.equal(domNavigation.showOrHideElement(input, true), domNavigation);
        assert.equal(input.classList.contains('hidden'), false);
      });
    });
    describe('when the `show` param is false', function() {
      it('adds the `hidden` class name to the element', function() {
        const input = document.createElement('input');

        assert.equal(domNavigation.showOrHideElement(input, false), domNavigation);
        assert.equal(input.classList.contains('hidden'), true);
      });
    });
  });

  describe('`showOrHideLinkedElement()`', function() {
    describe('when there is no element linked with the `element` param', function() {
      it('takes no action', function() {
        const input = document.createElement('input');

        domNavigationMock.expects('closest').never();
        domNavigationMock.expects('showOrHideElement').never();
        domNavigationMock.expects('enableOrDisableLinkedElement').never();

        assert.equal(domNavigation.showOrHideLinkedElement(input), domNavigation);

        domNavigationMock.verify();
      });
    });
    describe('when there is an element linked with the `element` param', function() {
      describe('when the linked element is not in a form group', function() {
        it('enables or disables the linked element', function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'checkbox');
          input.setAttribute('data-fv-linked-input', 'linked');
          const linkedElement = document.createElement('input');
          linkedElement.setAttribute('id', 'linked');
          const form = document.createElement('form');

          form.appendChild(input);
          form.appendChild(linkedElement);
          document.body.appendChild(form);

          assert.equal(domNavigation.showOrHideLinkedElement(input, true), domNavigation);
          assert.equal(linkedElement.hasAttribute('disabled'), false);
          assert.equal(linkedElement.classList.contains('disabled'), false);

          domNavigation.showOrHideLinkedElement(input, false);
          assert.equal(linkedElement.getAttribute('disabled'), 'disabled');
          assert.equal(linkedElement.classList.contains('disabled'), true);

          document.body.removeChild(form);
        });
      });
      describe('when the linked element is in a form group', function() {
        it('enables or disables the linked element and linked form group', function() {
          const input = document.createElement('input');
          input.setAttribute('type', 'checkbox');
          input.setAttribute('data-fv-linked-input', 'linked');
          const linkedElement = document.createElement('input');
          linkedElement.setAttribute('id', 'linked');
          const formGroup = document.createElement('div');
          formGroup.classList.add('form-group');
          const form = document.createElement('form');

          formGroup.appendChild(linkedElement);
          form.appendChild(input);
          form.appendChild(formGroup);
          document.body.appendChild(form);

          assert.equal(domNavigation.showOrHideLinkedElement(input, true), domNavigation);
          assert.equal(formGroup.classList.contains('hidden'), false);
          assert.equal(linkedElement.hasAttribute('disabled'), false);
          assert.equal(linkedElement.classList.contains('disabled'), false);
          assert.equal(linkedElement.classList.contains('hidden'), false);

          domNavigation.showOrHideLinkedElement(input, false);
          assert.equal(formGroup.classList.contains('hidden'), true);
          assert.equal(linkedElement.getAttribute('disabled'), 'disabled');
          assert.equal(linkedElement.classList.contains('disabled'), true);
          assert.equal(linkedElement.classList.contains('hidden'), false);

          document.body.removeChild(form);
        });
      });
    });
  });

  describe('`enableOrDisableLinkedElement()`', function() {
    describe('when the `enableAndShow` param is true', function() {
      it('calls `showEnableLinkedElement()` with the supplied linkedElement and `elementHandlesHidden` flag', function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');

        assert.equal(domNavigation.enableOrDisableLinkedElement(input, true, true), domNavigation);
        assert.equal(input.hasAttribute('disabled'), false);
        assert.equal(input.classList.contains('disabled'), false);
        assert.equal(input.classList.contains('hidden'), false);
      });
    });
    describe('when the `enableAndShow` param is false', function() {
      it('calls `hideDisableLinkedElement()` with the supplied linkedElement and `elementHandlesHidden` flag', function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');

        assert.equal(domNavigation.enableOrDisableLinkedElement(input, false, true), domNavigation);
        assert.equal(input.getAttribute('disabled'), 'disabled');
        assert.equal(input.classList.contains('disabled'), true);
        assert.equal(input.classList.contains('hidden'), true);
      });
    });
  });

  describe('`showEnableLinkedElement()` calls `enableOrDisableElement()` with the supplied $element and `true` flag', function() {
    describe('when the `removeHidden` param is false', function() {
      it('does not call `showOrHideElement()`', function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.classList.add('hidden');

        assert.equal(domNavigation.showEnableLinkedElement(input, false), domNavigation);
        assert.equal(input.hasAttribute('disabled'), false);
        assert.equal(input.classList.contains('disabled'), false);
        assert.equal(input.classList.contains('hidden'), true);
      });
    });
    describe('when the `removeHidden` param is true', function() {
      it('calls `showOrHideElement()` with the supplied element and `true` flag', function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.classList.add('hidden');

        assert.equal(domNavigation.showEnableLinkedElement(input, true), domNavigation);
        assert.equal(input.hasAttribute('disabled'), false);
        assert.equal(input.classList.contains('disabled'), false);
        assert.equal(input.classList.contains('hidden'), false);
      });
    });
  });

  describe('`hideDisableLinkedElement()`', function() {
    const listenerHandler = e => { console.log('listenerHandler() called');e.currentTarget.setAttribute('eventTriggered', true); };

    describe('when it is not set to clear the value, it does not clear the value or dispatch the validation event', function() {
      describe('when the `includeHidden` param is false', function() {
        it('does not attempt to show or hide the element', function() {
          const input = document.createElement('input');
          input.value = 'TESTING';
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-toggle-override-text', 0);
          input.addEventListener(domNavigation.getSetValidationFlagEventName(), listenerHandler);
          document.body.appendChild(input);

          assert.equal(domNavigation.hideDisableLinkedElement(input, false), domNavigation);
          assert.equal(input.hasAttribute('eventTriggered'), false);
          assert.equal(input.value, 'TESTING');
          assert.equal(input.getAttribute('disabled'), 'disabled');
          assert.equal(input.classList.contains('disabled'), true);
          assert.equal(input.classList.contains('hidden'), false);

          input.removeEventListener(domNavigation.getSetValidationFlagEventName(), listenerHandler);
          document.body.innerHTML = '';
        });
      });
      describe('when the `includeHidden` param is true', function() {
        it('attempts to show or hide the element', function() {
          const input = document.createElement('input');
          input.value = 'TESTING';
          input.setAttribute('type', 'text');
          input.setAttribute('data-fv-toggle-override-text', 0);
          input.addEventListener(domNavigation.getSetValidationFlagEventName(), listenerHandler);
          document.body.appendChild(input);

          assert.equal(domNavigation.hideDisableLinkedElement(input, true), domNavigation);
          assert.equal(input.hasAttribute('eventTriggered'), false);
          assert.equal(input.value, 'TESTING');
          assert.equal(input.getAttribute('disabled'), 'disabled');
          assert.equal(input.classList.contains('disabled'), true);
          assert.equal(input.classList.contains('hidden'), true);

          input.removeEventListener(domNavigation.getSetValidationFlagEventName(), listenerHandler);
          document.body.innerHTML = '';
        });
      });
    });
    describe('when it is set to clear the value', function() {
      it('clears the value and sets the valid attribute to 0', function() {
        const input = document.createElement('input');
        input.value = 'TESTING';
        input.setAttribute('type', 'text');
        input.setAttribute('data-fv-toggle-override-text', 1);
        input.addEventListener(domNavigation.getSetValidationFlagEventName(), listenerHandler);
        document.body.appendChild(input);

        assert.equal(domNavigation.hideDisableLinkedElement(input, false), domNavigation);
        assert.equal(input.hasAttribute('eventTriggered'), true);
        assert.equal(input.value, '');
        assert.equal(input.getAttribute('disabled'), 'disabled');
        assert.equal(input.classList.contains('disabled'), true);
        assert.equal(input.classList.contains('hidden'), false);

        input.removeEventListener(domNavigation.getSetValidationFlagEventName(), listenerHandler);
        document.body.innerHTML = '';
      });
    });
  });

  describe('`visibleEnabledFilter()`', function() {
    let input;
    beforeEach(function() {
      input = document.createElement('select');
    });
    describe('when the element is hidden', function() {
      it('returns false', function() {
        input.classList.add('hidden');

        assert.equal(domNavigation.visibleEnabledFilter(input), false);
      });
    });
    describe('when the element is disabled', function() {
      it('returns false', function() {
        input.setAttribute('disabled', 'disabled');

        assert.equal(domNavigation.visibleEnabledFilter(input), false);
      });
      it('returns false', function() {
        input.classList.add('disabled');

        assert.equal(domNavigation.visibleEnabledFilter(input), false);
      });
    });
    describe('when the element is neither disabled nor hidden', function() {
      it('returns true', function() {
        assert.equal(domNavigation.visibleEnabledFilter(input), true);
      });
    });
  });
});
