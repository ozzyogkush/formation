'use strict';

const stampit = require('stampit');
const $ = require('jquery');

const domNavigationStamp = stampit()
  .refs({

    /**
     * The selector used to find a Formation `form` element.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     null
     */
    formationSelector: null,

    /**
     * The CSS selector used to find the form's submit button element.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     data-valid
     */
    validAttrKey : 'data-valid',

    /**
     * The CSS selector used to find an `input` element "linked" to another.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     data-linked-input
     */
    linkedInputAttrKey : 'data-linked-input',

    toggleOverrideTextAttrKey : 'data-toggle-override-text',

    /**
     * The Bootstrap stateful element attribute whose value is used for setting the element's innerHTML
     * when set to the 'loading' state.
     *
     * @access      public
     * @type        String
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     data-submitting
     */
    submittingStateDataKey : 'data-submitting',

    /**
     * The data key used to to store a `formComponent` object on the `form` object.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     formation-form
     */
    formationDataKey : 'formation-form',

    /**
     * The CSS selector used to find the form's optional input elements.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     [data-optional="1"]
     */
    optionalFieldsSelector : '[data-optional="1"]',

    /**
     * The CSS selector used to find the form's preview button element.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     [data-form-preview]
     */
    previewButtonSelector : '[data-form-preview]',

    /**
     * The CSS selector used to find the form's required input elements.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     [data-required="1"]
     */
    requiredFieldsSelector : '[data-required="1"]',

    /**
     * The CSS selector used to find the form's submit button element.
     *
     * @access      private
     * @type        {String}
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     * @default     [data-form-submit]
     */
    submitButtonSelector : '[data-form-submit]'
  })
  .methods({

    /**
     * Return the `form` element in which `$element` resides.
     *
     * @access      public
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     *
     * @returns     {jQuery}       The jQuery wrapped `form` element.
     */
    findCurrentFormByTarget($element) {
      return $element.closest(this.formationSelector);
    },

    /**
     * Find the `formComponent` for the `form` element in which the `$element` resides.
     *
     * @throws      TypeError               if the `formComponent` is undefined, has no `isFormComponent` or `isFormComponent()` returns false
     * @access      public
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}                $element            The jQuery wrapped element for which to find the `formComponent` instance. Required.
     *
     * @returns     {formComponent|null}    formationForm       The `formComponent` if it is there, or null otherwise.
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

    findRequiredFields($form) {
      return $form.find(this.requiredFieldsSelector);
    },

    findOptionalFields($form) {
      return $form.find(this.optionalFieldsSelector);
    },

    findSubmitButton($form) {
      return $form.find(this.submitButtonSelector);
    },

    findPreviewButton($form) {
      return $form.find(this.previewButtonSelector);
    },

    elementIsCustomRadioOrCheckboxWidget($element) {
      let $currentForm = this.findCurrentFormByTarget($element);
      let tbr = false;
      if ($currentForm.length) {
        tbr = ($element.hasClass('btn-checkbox') || $element.hasClass('btn-radio'));
      }
      return tbr;
    },

    /**
     * Find the `label` element in the DOM for the supplied `$input` element.
     *
     * @access      public
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
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
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
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
            `Expected an element with a \`${this.linkedInputAttrKey}\` attribute equal to "\`${linkedElementID}\`".`
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
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $element        The element to enable or disable. Required.
     * @param       {Boolean}       enable          Whether to enable (true) or disable (false) the `$element`. Required.
     *
     * @returns     {domNavigationStamp}
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
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $element        The element to show or hide. Required.
     * @param       {Boolean}       show            Whether to show (true) or hide (false) the `$element`. Required.
     *
     * @returns     {domNavigationStamp}
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
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $element        The element to show or hide. Required.
     * @param       {Boolean}       show            Whether to show (true) or hide (false) the `$element`. Required.
     *
     * @returns     {domNavigationStamp}
     */
    showOrHideLinkedElement($element, show) {
      const $linkedElement = this.getLinkedElement($element);
      if ($linkedElement === null) {
        // no linked element, do nothing
        return;
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
    },

    /**
     * Convenience method which, for the supplied `$linkedElement`, shows and enables
     * it, or hides and disables it, based on the params.
     *
     * Takes into account whether
     *
     * @access      public
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     *
     * @param	      {jQuery}      $linkedElement        jQuery extended text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     enableAndShow         Flag indicating whether to show/enable, or hide/disable, the element. Required.
     * @param       {Boolean}     elementHandlesHidden  Flag indicating whether the element handles its hidden/shown status. Required.
     */
    enableOrDisableLinkedElement($linkedElement, enableAndShow, elementHandlesHidden) {
      if (enableAndShow) {
        this.showEnableLinkedElement($linkedElement, elementHandlesHidden);
      }
      else {
        this.hideDisableLinkedElement($linkedElement, elementHandlesHidden);
      }
    },

    /**
     * Convenience method which, for the supplied `$element`, removes the `disabled` property,
     * and removes the Twitter Bootstrap class of "disabled". If the `includeHidden` parameter
     * is specified and is `true`, also removes the "hidden" class from the element.
     *
     * @access      public
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     *
     * @param	      {jQuery}      $element          jQuery extended text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     removeHidden      Flag indicating whether to remove the 'hidden' class. Required.
     */
    showEnableLinkedElement($element, removeHidden) {
      this.enableOrDisableElement($element, true);
      if (removeHidden) {
        this.showOrHideElement($element, true);
      }
    },

    /**
     * Convenience method which, for the supplied `$element`, disables it and gives it the
     * Twitter Bootstrap class of "disabled". If the `includeHidden` parameter is
     * specified and is `true`, also adds the "hidden" class to the element. By default
     * it will clear the value of the text input and set the `data-valid` attribute to 0 (false),
     * unless the `data-toggle-override-text` is set on the linked input with a value of 0.
     *
     * @access      public
     * @memberOf    {domNavigationStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}      $element          jQuery extended text-based `input` or `textarea` field. Required.
     * @param       {Boolean}     includeHidden     Flag indicating whether to add the 'hidden' class. Required.
     */
    hideDisableLinkedElement($element, includeHidden) {
      const clearValue = (
        $element.attr(this.toggleOverrideTextAttrKey) === undefined ||
        parseInt($element.attr(this.toggleOverrideTextAttrKey)) === 1
      );
      if (clearValue) {
        $element.val('').attr(this.validAttrKey, 0);
      }

      this.enableOrDisableElement($element, false);
      if (includeHidden) {
        this.showOrHideElement($element, false);
      }
    },

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

module.exports = domNavigationStamp;
