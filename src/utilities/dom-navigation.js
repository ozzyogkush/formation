'use strict';

const stampit = require('stampit');

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

    elementIsCustomRadioOrCheckboxWidget($element) {
      let $currentForm = this.findCurrentFormByTarget($element);
      let tbr = false;
      if ($currentForm.length) {
        tbr = ($element.hasClass('btn-checkbox') || $element.hasClass('btn-radio'));
      }
      return tbr;
    }
  });

module.exports = domNavigationStamp;