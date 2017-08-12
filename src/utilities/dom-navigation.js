'use strict';

const eventDefinitionsStamp = require('../event-handlers/event-definitions-stamp');
const stampit = require('stampit');

/**
 * Formation-specific DOM navigation and modification.
 *
 * @copyright     Copyright (c) 2016 - 2017, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.domNavigation
 * @mixin         Formation.domNavigation
 *
 * @mixes         Formation.eventDefinitions
 */
const domNavigationStamp = stampit()
  .refs({

    /**
     * The element DOM attribute key which specifies whether a form is managed
     * by Formation (1) or not (0).
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     data-fv-valid
     */
    formationDataAttrKey : 'data-formation',

    /**
     * The selector used to find a Formation `form` element.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     null
     */
    formationSelector: null,

    /**
     * The element DOM attribute key which specifies whether the element
     * is valid (1) or not (0).
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     data-fv-valid
     */
    validAttrKey : 'data-fv-valid',

    /**
     * The element DOM attribute key which specifies an `input` element "linked" to another.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     data-fv-linked-input
     */
    linkedInputAttrKey : 'data-fv-linked-input',

    /**
     * The element DOM attribute key which specifies whether to clear the value
     * of the element when it is hidden (1) or not (0).
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     data-fv-toggle-override-text
     */
    toggleOverrideTextAttrKey : 'data-fv-toggle-override-text',

    /**
     * The element DOM attribute key which specifies a group of input elements
     * by the set's name (eg checkboxes or radios with the same name).
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     data-fv-group-container
     */
    groupedElementsContainerAttrKey : 'data-fv-group-container',

    /**
     * The Bootstrap stateful element attribute whose value is used for setting the element's innerHTML
     * when set to the 'loading' state.
     *
     * @access      public
     * @type        String
     * @memberOf    {Formation.domNavigation}
     * @default     data-fv-submitting
     */
    submittingStateDataKey : 'data-fv-submitting',

    /**
     * The data key used to to store a `formComponent` object on the `form` object.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     formation-form
     */
    formationDataKey : 'formation-form',

    /**
     * The CSS selector used to find the form's optional input elements.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     [data-fv-optional="1"]
     */
    optionalFieldsSelector : '[data-fv-optional="1"]',

    /**
     * The CSS selector used to find the form's preview button element.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     [data-fv-form-preview]
     */
    previewButtonSelector : '[data-fv-form-preview]',

    /**
     * The CSS selector used to find the form's required input elements.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     [data-fv-required="1"]
     */
    requiredFieldsSelector : '[data-fv-required="1"]',

    /**
     * The CSS selector used to find the form's submit button element.
     *
     * @access      private
     * @type        {String}
     * @memberOf    {Formation.domNavigation}
     * @default     [data-fv-form-submit]
     */
    submitButtonSelector : '[data-fv-form-submit]'
  })
  .methods({

    /**
     * Ascends the ancestor tree of `element` until it matches the supplied `selector`.
     *
     * If no matching element is found, returns null; otherwise returns the matched element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}     element       The element whose ancestors we want to ascend. Required.
     * @param       {String}      selector      The CSS selector to match against the ancestors. Required.
     *
     * @returns     {Element|null}
     */
    closest(element, selector) {
      if (element.nodeType !== element.ELEMENT_NODE ||
          element.tagName.toLowerCase() === 'html') {
        return null;
      }
      if (element.matches(selector)) {
        return element;
      }

      const parent = element.parentNode;
      if (parent === null) {
        return null;
      }

      return this.closest(parent, selector);
    },

    /**
     * Return the `form` element in which `element` resides.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}    element      A `Form` element.
     *
     * @returns     {Element|null}            The form the supplied `element` is in, or null if not found.
     */
    findCurrentFormByTarget(element) {
      if (element.tagName.toLowerCase() === 'form' && element.matches(this.formationSelector)) {
        return element;
      }

      return this.closest(element, this.formationSelector);
    },

    /**
     * Find the `formComponent` for the `form` element in which the `$element` resides.
     *
     * @throws      TypeError                         if the `formComponent` is undefined, has no `isFormComponent` or `isFormComponent()` returns false
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}                          $element            The jQuery wrapped element for which to find the `formComponent` instance. Required.
     *
     * @returns     {Formation.formComponent|null}    formationForm       The `formComponent` if it is there, or null otherwise.
     */
    getFormComponentOfCurrentElement($element) {
      let $currentForm = this.findCurrentFormByTarget($element);
      let formComponent = null;

      // if the element is not inside a formation form, don't bother checking the data, and return null.
      if ($currentForm.length) {
        formComponent = $currentForm.data(this.formationDataKey);
        // TODO - use custom error classes
        if (formComponent === undefined) {
          throw new TypeError(`The \`${this.formationDataKey}\` data object is not set.`);
        }
        else if (typeof formComponent.isFormComponent !== 'function' || ! formComponent.isFormComponent()) {
          throw new TypeError(`The \`${this.formationDataKey}\` data object is not built from a \`formComponent\` stamp.`);
        }
      }

      return formComponent;
    },

    /**
     * Find the required fields in the specified `form` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}               form                The `form` element. Required.
     *
     * @returns     {NodeList}              The set of required fields in the form.
     */
    findRequiredFields(form) {
      return form.querySelectorAll(this.requiredFieldsSelector);
    },

    /**
     * Find the optional fields in the specified `form` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}               form               The `form` element. Required.
     *
     * @returns     {NodeList}              The set of optional fields in the form.
     */
    findOptionalFields(form) {
      return form.querySelectorAll(this.optionalFieldsSelector);
    },

    /**
     * Find the Formation submit button in the specified `form` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}               form               The `form` element. Required.
     *
     * @returns     {NodeList}              The Formation submit button in the form.
     */
    findSubmitButton(form) {
      return form.querySelectorAll(this.submitButtonSelector);
    },

    /**
     * Find the Formation preview button in the specified `form` element.
     *
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}               form               The `form` element. Required.
     *
     * @returns     {NodeList}              The Formation preview button in the form.
     */
    findPreviewButton(form) {
      return form.querySelectorAll(this.previewButtonSelector);
    },

    /**
     * Check whether `element` is a custom Formation Bootstrap Radio or Checkbox widget.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}     element           The jQuery wrapped `form` element. Required.
     *
     * @returns     {Boolean}     tbr               Whether the element is a custom widget.
     */
    elementIsCustomRadioOrCheckboxWidget(element) {
      const currentForm = this.findCurrentFormByTarget(element);
      if (currentForm === null) {
        return false;
      }

      return (element.classList.contains('btn-checkbox') || element.classList.contains('btn-radio'));
    },

    /**
     * Find the DOM element which acts as a container for a set of input elements
     * with the same name as `element`.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}       element        The element whose container we want to find. Required.
     *
     * @returns     {NodeList|null}
     */
    getCheckboxOrRadioContainer(element) {
      const currentForm = this.findCurrentFormByTarget(element);
      if (currentForm === null) { return null; }

      return currentForm.querySelectorAll(`[${this.groupedElementsContainerAttrKey}="${element.getAttribute('name')}"]`);
    },

    /**
     * Find all input elements in the current form with the same name as `element`.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}       element        The element whose name we want to find all elements for. Required.
     *
     * @returns     {NodeList|null}
     */
    getAllCheckboxesOrRadiosByName(element) {
      const currentForm = this.findCurrentFormByTarget(element);
      if (currentForm === null) { return null; }

      return currentForm.querySelectorAll(`input[name="${element.getAttribute('name')}"]`);
    },

    /**
     * Find the `label` element in the DOM for the supplied `input` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}       input      The source element used to find a `label` element. Required.
     *
     * @returns     {NodeList|null}
     */
    getInputElementLabel(input) {
      const currentForm = this.findCurrentFormByTarget(input);
      if (currentForm === null) { return null; }

      return currentForm.querySelectorAll(`label[for="${input.getAttribute('id')}"]`);
    },

    /**
     * Find the element in the DOM linked to `source` and return it.
     *
     * @throws      Error                       iff the linked element is not found in the DOM when expected
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}       source      The source element used to find a linked element. Required.
     *
     * @returns     {Element|null}  tbr         The linked element if found, null otherwise.
     */
    getLinkedElement(source) {
      if (! source.hasAttribute(this.linkedInputAttrKey)) {
        return null;
      }

      const linkedElementID = source.getAttribute(this.linkedInputAttrKey);
      const linkedElement = document.getElementById(linkedElementID);
      if (linkedElement === null) {
        throw new Error(
          `Expected an element with a \`${this.linkedInputAttrKey}\` attribute equal to "${linkedElementID}".`
        );
      }

      return linkedElement;
    },

    /**
     * Will enable or disable the `element` based on the `enable` param.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}       element         The element to enable or disable. Required.
     * @param       {Boolean}       enable          Whether to enable (true) or disable (false) the `element`. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    enableOrDisableElement(element, enable) {
      if (enable) {
        element.removeAttribute('disabled');
        element.classList.remove('disabled');
      }
      else {
        element.setAttribute('disabled', 'disabled');
        element.classList.add('disabled');
      }

      return this;
    },

    /**
     * Will add or remove the `hidden` class of the `element` based on the `show` param.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}       element         The element to show or hide. Required.
     * @param       {Boolean}       show            Whether to show (true) or hide (false) the `element`. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    showOrHideElement(element, show) {
      element.classList.toggle('hidden', !show);

      return this;
    },

    /**
     * Will show or hide the element linked to `element` based on the `show` param.
     * Handles when the linked element is in a Bootstrap `form-group`, as well as
     * when it is not.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}       element         The element to show or hide. Required.
     * @param       {Boolean}       show            Whether to show (true) or hide (false) the `element`. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    showOrHideLinkedElement(element, show) {
      const linkedElement = this.getLinkedElement(element);
      if (linkedElement === null) {
        return this;
      }
      const linkedInputFormGroup = this.closest(linkedElement, '.form-group');

      // The linked input may be part of a form group which contains other elements that need to be shown
      // or hidden along with the linked element. If that's the case, the 'hidden' class only applies
      // to the form group. If that's not the case, the linked element itself applies the 'hidden' class.
      const hasFormGroup = (linkedInputFormGroup !== null);
      if (hasFormGroup) {
        this.showOrHideElement(linkedInputFormGroup, show);
      }

      // show and enable, or hide and disable, the linkedElement.
      this.enableOrDisableLinkedElement(linkedElement, show, !hasFormGroup);

      return this;
    },

    /**
     * Convenience method which, for the supplied `linkedElement`, shows and enables
     * it, or hides and disables it, based on the params.
     *
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param	      {Element}     linkedElement         Text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     enableAndShow         Flag indicating whether to show/enable, or hide/disable, the element. Required.
     * @param       {Boolean}     elementHandlesHidden  Flag indicating whether the element handles its hidden/shown status. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    enableOrDisableLinkedElement(linkedElement, enableAndShow, elementHandlesHidden) {
      if (enableAndShow) {
        this.showEnableLinkedElement(linkedElement, elementHandlesHidden);
      }
      else {
        this.hideDisableLinkedElement(linkedElement, elementHandlesHidden);
      }

      return this;
    },

    /**
     * Convenience method which, for the supplied `element`, removes the `disabled` property,
     * and removes the Twitter Bootstrap class of "disabled". If the `includeHidden` parameter
     * is specified and is `true`, also removes the "hidden" class from the element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param	      {Element}     element           Text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     removeHidden      Flag indicating whether to remove the 'hidden' class. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    showEnableLinkedElement(element, removeHidden) {
      this.enableOrDisableElement(element, true);
      if (removeHidden) {
        this.showOrHideElement(element, true);
      }

      return this;
    },

    /**
     * Convenience method which, for the supplied `element`, disables it and gives it the
     * Twitter Bootstrap class of "disabled". If the `includeHidden` parameter is
     * specified and is `true`, also adds the "hidden" class to the element. By default
     * it will clear the value of the text input and set the `data-fv-valid` attribute to 0 (false),
     * unless the `data-fv-toggle-override-text` is set on the linked input with a value of 0.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}     element           Text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     includeHidden     Flag indicating whether to add the 'hidden' class. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    hideDisableLinkedElement(element, includeHidden) {
      const clearValue = (
        ! element.hasAttribute(this.toggleOverrideTextAttrKey) ||
        parseInt(element.getAttribute(this.toggleOverrideTextAttrKey)) === 1
      );
      if (clearValue) {
        element.value = '';
        const validationEvent = new CustomEvent(
          this.getSetValidationFlagEventName(),
          { bubbles: true, cancelable: true, valid: false }
        );
        element.dispatchEvent(validationEvent);
      }

      this.enableOrDisableElement(element, false);
      if (includeHidden) {
        this.showOrHideElement(element, false);
      }

      return this;
    },

    /**
     * Helper function to filter a NodeList to return only elements that are
     * not hidden nor disabled.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {Element}       element       The DOM element to check.
     *
     * @returns     {Boolean}
     */
    visibleEnabledFilter(element) {
      const hiddenOrDisabled = (
        element.classList.contains('hidden') ||
        element.getAttribute('disabled') === "disabled" ||
        element.classList.contains('disabled')
      );
      return (! hiddenOrDisabled);
    }
  });

module.exports = domNavigationStamp.compose(eventDefinitionsStamp);
