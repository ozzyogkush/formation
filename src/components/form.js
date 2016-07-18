'use strict';

const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');
const stampit = require('stampit');
const $ = require('jquery');

const formComponentStamp = stampit()
  .methods({
    shouldBodyKeyPressEventsProgress() {
      this.log(`shouldBodyKeyPressEventsProgress() called`);
      // Does the current form have a submit button?
      // If so, allow the event to proceed.
      // If not, stop the event from propagating.
      const allowKeyEventToProgress = (
        typeof this.getSubmitButton().getButton === 'function' &&
        this.getSubmitButton().getButton().length
      );
      return allowKeyEventToProgress;
    }
  })
  .init(function() {

    /**
     * Helper function that users of this Stamp can use to determine if an object is composed
     * of this Stamp.
     *
     * @access      public
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     *
     * @returns   {Boolean}       true
     */
    this.isFormComponent = () => {
      return true;
    };

    /**
     * The jQuery object containing the initialized form node.
     *
     * @private
     * @access      private
     * @type        {jQuery}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     * @default     $()
     */
    let __$form = $();

    /**
     * The initialization status.
     *
     * @private
     * @access      private
     * @type        {Boolean}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     * @default     false
     */
    let __initialized = false;

    /**
     * Returns the initialization status of this instance.
     *
     * @access      public
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     *
     * @returns     {boolean}       __initialized
     */
    this.initialized = () => {
      return __initialized;
    };

    /**
     * Checks whether this instance has been initialized, or if there is a `formComponent` attached to
     * the `$form` element already which has been initialized.
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $form         The form to check for an attached `formComponent` instance. Required.
     *
     * @returns     {Boolean}                     False iff neither this instance, nor the `formComponent` attached to the `$form`, have been initialized.
     */
    let __formAlreadyInitialized = ($form) => {
      let alreadyInit = this.initialized();
      try {
        let formComponent;
        alreadyInit = (
          alreadyInit || (
            (formComponent = this.getFormComponentOfCurrentElement($form)) !== null &&
            formComponent.initialized()
          )
        );
      }
      catch (e) {
        this.error(e);
      }
      return alreadyInit;
    };

    /**
     * The meat of this Stamp. Will initialize a jQuery wrapped `form` and assign it internally,
     * setting all the required and optional fields, the form buttons (such as submit and preview),
     * and initializing the fields' current validation status. If everything went without error,
     * sets the `__initialized` flag to `true` so that we can't re-initialize the `$form`
     *
     * @access      public
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $form               jQuery wrapped `form` element to be managed by this instance. Required.
     *
     * @returns     {formComponentStamp}
     */
    this.initForm = ($form) => {
      if (__formAlreadyInitialized($form)) {
        this.warn('This `formComponent` is already initialized, skipping.');
        return this;
      }

      // Set the form so we can use it internally elsewhere.
      __$form = $form;

      // Get the required and optional fields, and the submit and preview buttons present in the form.
      __setRequiredFields();
      __setOptionalFields();
      __setFormButtons();
      __initFields();

      // There were no problems initializing the form, set the data and the private vars.
      __$form.data(this.formationDataKey, this);
      __initialized = true;

      return this;
    };

    /**
     * The jQuery object containing the elements in this form that are required to be validated.
     *
     * @private
     * @access      private
     * @type        {jQuery}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     * @default     $()
     */
    let __$requiredFields = $();

    /**
     * Find the required fields and set them to the private `__$requiredFields` var.
     *
     * @throws      Error       iff the set of required fields is empty.
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     */
    let __setRequiredFields = () => {
      __$requiredFields = this.findRequiredFields(__$form);
      if (! __$requiredFields.length) {
        // TODO - use a custom error type here
        throw new Error('No required fields found, cannot proceed.');
      }
    };

    /**
     * The jQuery object containing the elements in this form that are optional to be validated.
     *
     * @private
     * @access      private
     * @type        {jQuery}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     * @default     $()
     */
    let __$optionalFields = $();

    /**
     * Find the optional fields and set them to the private `__$optionalFields` var.
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     */
    let __setOptionalFields = () => {
      __$optionalFields = this.findOptionalFields(__$form);
    };

    /**
     * TODO - this is a stub
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     */
    let __setFormButtons = () => {
      /*this.__submitButton = new Button(
        this.__formContainer.find(this.getSubmitButtonSelector()),
        'Submitting, please wait...'
      );
      this.__previewButton = new Button(
        this.__formContainer.find(this.getPreviewButtonSelector()),
        'Rendering preview, please wait...'
      );*/
    };

    /**
     * TODO - this is a stub
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     */
    let __initFields = () => {
      /*this.__requiredFields.attr(this.getValidAttrKey(), 0);
      this.__optionalFields.attr(this.getValidAttrKey(), 0);*/
    };
  });

module.exports = formComponentStamp.compose(domNavigationStamp, consoleLoggerStamp);
