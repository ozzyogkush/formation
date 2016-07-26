'use strict';

const buttonComponentStamp = require('./button');
const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');

const stampit = require('stampit');
const $ = require('jquery');

const formComponentStamp = stampit()
  .refs({

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {eventEmitterStamp}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     * @default     null
     */
    nodeEvents : null
  })
  .methods({
    shouldBodyKeyPressEventsProgress() {
      // Does the current form have a submit button?
      // If so, allow the event to proceed.
      // If not, stop the event from propagating.
      const allowKeyEventToProgress = (
        this.getSubmitButton() !== null && this.getSubmitButton().exists()
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
        // TODO - handle this as a custom error thrown by `getFormComponentOfCurrentElement()`
        this.info(e);
      }
      return alreadyInit;
    };

    /**
     * The meat of this Stamp. Will initialize a jQuery wrapped `form` and assign it internally,
     * setting all the required and optional fields, the form buttons (such as submit and preview),
     * and initializing the fields' current validation status. If everything went without error,
     * sets the `__initialized` flag to `true` so that we can't re-initialize the `$form`.
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
      __initFields();
      __initFormButtons();

      // There were no problems initializing the form, set the data and the private vars.
      __$form.data(this.formationDataKey, this);
      __initialized = true;

      return this;
    };

    /**
     * Object composed of a {formEventsHandlerStamp} which handles form input element events.
     *
     * @access      public
     * @type        {Object}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     * @default     null
     */
    let __formEventsHandler = null;

    /**
     * Add the default event handlers for a form's various input element,
     * iff that has not already taken place.
     *
     * @access      public
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     *
     * @param       {formEventsHandlerStamp}        formEventsHandler     Object which is composed of a `formEventsHandlerStamp`. Required.
     *
     * @returns     {formComponentStamp}
     */
    this.initFormEvents = (formEventsHandler) => {
      this.log('Initializing form events...');

      if (formEventsHandler.getEventsInitialized()) {
        this.info('Form events previously initialized for this form, skipping.');
        return this;
      }
      __formEventsHandler = formEventsHandler;

      __formEventsHandler
        .initLogging(this.getLogConsole())
        .addDefaultEventHandlers()
        .triggerValidationCheck();

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
     * Initialize (or reset) the validity of the required and optional fields to `false` (0).
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     */
    let __initFields = () => {
      __$requiredFields.attr(this.validAttrKey, 0);
      __$optionalFields.attr(this.validAttrKey, 0);
    };

    /**
     * The jQuery object containing the form's submit button.
     *
     * @private
     * @access      private
     * @type        {buttonComponentStamp}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     * @default     null
     */
    let __submitButton = null;

    /**
     * Returns the `__submitButton`.
     *
     * @access      public
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     *
     * @returns     {buttonComponentStamp}       __submitButton
     */
    this.getSubmitButton = () => {
      return __submitButton;
    };

    /**
     * The jQuery object containing the form's optional preview button.
     *
     * @private
     * @access      private
     * @type        {buttonComponentStamp}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     * @default     null
     */
    let __previewButton = null;

    /**
     * Returns the `__previewButton`.
     *
     * @access      public
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     *
     * @returns     {buttonComponentStamp}       __previewButton
     */
    this.getPreviewButton = () => {
      return __previewButton;
    };

    /**
     * Create new `buttonComponents` to manage the Submit and Preview buttons
     * for this form, and set them to the private `__submitButton` and
     * `__previewButton` vars respectively.
     *
     * TODO - make `setLoadingHTML()` optional
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formComponentStamp}
     * @since       0.1.0
     */
    let __initFormButtons = () => {
      __submitButton = buttonComponentStamp({
        $button : this.findSubmitButton(__$form),
        loadingText : 'Submitting, please wait...',
        nodeEvents : this.nodeEvents
      }).initLogging(this.getLogConsole())
        .addHandleFormSubmitListener()
        .setLoadingHTML();
      __previewButton = buttonComponentStamp({
        $button : this.findPreviewButton(__$form),
        loadingText : 'Rendering preview, please wait...',
        nodeEvents : this.nodeEvents
      }).initLogging(this.getLogConsole())
        .addHandleFormSubmitListener()
        .setLoadingHTML();
    };
  });

module.exports = formComponentStamp.compose(
  domNavigationStamp,
  consoleLoggerStamp
);
