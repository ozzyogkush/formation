'use strict';

const eventDefinitionsStamp = require('../event-handlers/event-definitions-stamp');

const stampit = require('stampit');
const $ = require('jquery');

/**
 * Formation-specific DOM navigation and modification.
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
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
     * Return the `form` element in which `$element` resides.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @returns     {jQuery}       The jQuery wrapped `form` element.
     */
    findCurrentFormByTarget($element) {
      if ($element.prop('tagName').toLowerCase() === 'form' &&
          $element.attr(this.formationDataAttrKey) !== undefined) {
        return $element;
      }
      return $element.closest(this.formationSelector);
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
     * Find the required fields in the specified `$form` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}                $form               The jQuery wrapped `form` element. Required.
     *
     * @returns     {jQuery}                The set of required fields in the $form.
     */
    findRequiredFields($form) {
      return $form.find(this.requiredFieldsSelector);
    },

    /**
     * Find the optional fields in the specified `$form` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}                $form               The jQuery wrapped `form` element. Required.
     *
     * @returns     {jQuery}                The set of optional fields in the $form.
     */
    findOptionalFields($form) {
      return $form.find(this.optionalFieldsSelector);
    },

    /**
     * Find the Formation submit button in the specified `$form` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}                $form               The jQuery wrapped `form` element. Required.
     *
     * @returns     {jQuery}                The Formation submit button in the $form.
     */
    findSubmitButton($form) {
      return $form.find(this.submitButtonSelector);
    },

    /**
     * Find the Formation preview button in the specified `$form` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}      $form               The jQuery wrapped `form` element. Required.
     *
     * @returns     {jQuery}      The Formation preview button in the $form.
     */
    findPreviewButton($form) {
      return $form.find(this.previewButtonSelector);
    },

    /**
     * Check whether `$element` is a custom Formation Bootstrap Radio or Checkbox widget.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}      $element          The jQuery wrapped `form` element. Required.
     *
     * @returns     {Boolean}     tbr               Whether the element is a custom widget.
     */
    elementIsCustomRadioOrCheckboxWidget($element) {
      let $currentForm = this.findCurrentFormByTarget($element);
      let tbr = false;
      if ($currentForm.length) {
        tbr = ($element.hasClass('btn-checkbox') || $element.hasClass('btn-radio'));
      }
      return tbr;
    },

    /**
     * Find the DOM element which acts as a container for a set of input elements
     * with the same name as `$element`.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}        $element        The element whose container we want to find. Required.
     *
     * @returns     {jQuery}
     */
    getCheckboxOrRadioContainer($element) {
      return this
        .findCurrentFormByTarget($element)
        .find(`[${this.groupedElementsContainerAttrKey}="${$element.attr('name')}"]`);
    },

    /**
     * Find all input elements in the current form with the same name as `$element`.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}        $element        The element whose name we want to find all elements for. Required.
     *
     * @returns     {jQuery}
     */
    getAllCheckboxesOrRadiosByName($element) {
      return this
        .findCurrentFormByTarget($element)
        .find(`input[name="${$element.attr('name')}"]`);
    },

    /**
     * Find the `label` element in the DOM for the supplied `$input` element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}        $input      The source element used to find a `label` element. Required.
     *
     * @returns     {jQuery}        $inputLabel
     */
    getInputElementLabel($input) {
      const $inputLabel = this
        .findCurrentFormByTarget($input)
        .find(`label[for="${$input.prop('id')}"]`);

      return $inputLabel;
    },

    /**
     * Find the element in the DOM linked to `$source` and return it.
     *
     * @throws      Error                       iff the linked element is not found in the DOM when expected
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}        $source     The source element used to find a linked element. Required.
     *
     * @returns     {null|jQuery}   $tbr        The linked element if found, null otherwise.
     */
    getLinkedElement($source) {
      //let $checkboxLabel = this.getInputElementLabel($source);
      let $tbr = null;
      const linkedElementID = $source.attr(this.linkedInputAttrKey);
      if (linkedElementID !== undefined) {
        const $linkedElement = $(`#${linkedElementID}`);
        if ($linkedElement.length === 0) {
          throw new Error(
            `Expected an element with a \`${this.linkedInputAttrKey}\` attribute equal to "${linkedElementID}".`
          );
        }

        $tbr = $linkedElement;
      }

      return $tbr;
    },

    /**
     * Will enable or disable the `$element` based on the `enable` param.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}        $element        The element to enable or disable. Required.
     * @param       {Boolean}       enable          Whether to enable (true) or disable (false) the `$element`. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    enableOrDisableElement($element, enable) {
      if (enable) {
        $element.removeProp('disabled').removeClass('disabled');
      }
      else {
        $element.prop('disabled', 'disabled').addClass('disabled');
      }

      return this;
    },

    /**
     * Will add or remove the `hidden` class of the `$element` based on the `show` param.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}        $element        The element to show or hide. Required.
     * @param       {Boolean}       show            Whether to show (true) or hide (false) the `$element`. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    showOrHideElement($element, show) {
      if (show) {
        $element.removeClass('hidden');
      }
      else {
        $element.addClass('hidden');
      }

      return this;
    },

    /**
     * Will show or hide the element linked to `$element` based on the `show` param.
     * Handles when the linked element is in a Bootstrap `form-group`, as well as
     * when it is not.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}        $element        The element to show or hide. Required.
     * @param       {Boolean}       show            Whether to show (true) or hide (false) the `$element`. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    showOrHideLinkedElement($element, show) {
      const $linkedElement = this.getLinkedElement($element);
      if ($linkedElement === null) {
        // no linked element, do nothing
        return this;
      }
      const $linkedInputFormGroup = $linkedElement.closest('.form-group');

      // The linked input may be part of a form group which contains other elements that need to be shown
      // or hidden along with the linked element. If that's the case, the 'hidden' class only applies
      // to the form group. If that's not the case, the linked element itself applies the 'hidden' class.
      const hasFormGroup = ($linkedInputFormGroup.length > 0);
      if (hasFormGroup) {
        this.showOrHideElement($linkedInputFormGroup, show);
      }

      // show and enable, or hide and disable, the $linkedElement.
      this.enableOrDisableLinkedElement($linkedElement, show, ! hasFormGroup);

      return this;
    },

    /**
     * Convenience method which, for the supplied `$linkedElement`, shows and enables
     * it, or hides and disables it, based on the params.
     *
     * Takes into account whether
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param	      {jQuery}      $linkedElement        jQuery extended text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     enableAndShow         Flag indicating whether to show/enable, or hide/disable, the element. Required.
     * @param       {Boolean}     elementHandlesHidden  Flag indicating whether the element handles its hidden/shown status. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    enableOrDisableLinkedElement($linkedElement, enableAndShow, elementHandlesHidden) {
      if (enableAndShow) {
        this.showEnableLinkedElement($linkedElement, elementHandlesHidden);
      }
      else {
        this.hideDisableLinkedElement($linkedElement, elementHandlesHidden);
      }

      return this;
    },

    /**
     * Convenience method which, for the supplied `$element`, removes the `disabled` property,
     * and removes the Twitter Bootstrap class of "disabled". If the `includeHidden` parameter
     * is specified and is `true`, also removes the "hidden" class from the element.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param	      {jQuery}      $element          jQuery extended text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     removeHidden      Flag indicating whether to remove the 'hidden' class. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    showEnableLinkedElement($element, removeHidden) {
      this.enableOrDisableElement($element, true);
      if (removeHidden) {
        this.showOrHideElement($element, true);
      }

      return this;
    },

    /**
     * Convenience method which, for the supplied `$element`, disables it and gives it the
     * Twitter Bootstrap class of "disabled". If the `includeHidden` parameter is
     * specified and is `true`, also adds the "hidden" class to the element. By default
     * it will clear the value of the text input and set the `data-fv-valid` attribute to 0 (false),
     * unless the `data-fv-toggle-override-text` is set on the linked input with a value of 0.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {jQuery}      $element          jQuery extended text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     includeHidden     Flag indicating whether to add the 'hidden' class. Required.
     *
     * @returns     {Formation.domNavigation}
     */
    hideDisableLinkedElement($element, includeHidden) {
      const clearValue = (
        $element.attr(this.toggleOverrideTextAttrKey) === undefined ||
        parseInt($element.attr(this.toggleOverrideTextAttrKey)) === 1
      );
      if (clearValue) {
        $element.val('').trigger(this.getSetValidationFlagEventName(), false);
      }

      this.enableOrDisableElement($element, false);
      if (includeHidden) {
        this.showOrHideElement($element, false);
      }

      return this;
    },

    /**
     * Helper function to filter a jQuery set to return only elements that are
     * not hidden nor disabled.
     *
     * @access      public
     * @memberOf    {Formation.domNavigation}
     * @mixes       {Formation.domNavigation}
     *
     * @param       {int}           index         The index of the element in the jQuery set.
     * @param       {jQuery}        element       The DOM element to check.
     *
     * @returns     {Boolean}
     */
    visibleEnabledFilter(index, element) {
      const $element = $(element);
      let hiddenOrDisabled = (
        $element.hasClass('hidden') ||
        $element.prop('disabled') === "disabled" ||
        $element.hasClass('disabled')
      );
      return (! hiddenOrDisabled);
    }
  });

module.exports = domNavigationStamp.compose(eventDefinitionsStamp);
