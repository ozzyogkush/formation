'use strict';

const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');
const eventDefinitionsStamp = require('./event-definitions-stamp');
const formComponentStamp = require('../components/form');

const stampit = require('stampit');
const $ = require('jquery');

const formEventsHandlerStamp = stampit()
  .refs({

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {eventEmitterStamp}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     * @default     null
     */
    nodeEvents : null
  })
  .methods({

    /**
     * Emit a node event when the form is submitted.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}       event       jQuery `submit` event object. Required.
     *
     * @returns     {Boolean}     true
     */
    formSubmitHandler(event) {
      this.nodeEvents.emit(this.nodeEvents.getNodeFormSubmitEvent(), event);

      return true;
    },

    /**
     * Performs a final check to make sure all visible required fields are validated.
     *
     * Hidden required fields are only * actually * required when they're being displayed
     * to the user. This is generally because an optional field toggles it, and thus
     * only needs to be filled out when the user takes action to show it.
     *
     * If all necessary fields are valid, this will enable the submit button specified
     * for the current form. Otherwise, the submit button is disabled.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}         event         jQuery `check-form-validity` event object. Required.
     */
    checkFormValidityHandler(event) {
      if (event.namespace === undefined || event.namespace !== "formation") {
        return;
      }

      let continueButton = this.getSubmitWithFallbackPreviewButton();
      if (continueButton === null) {
        // We don't have a submit or preview button, so there's really nothing to do.
        return;
      }

      if (continueButton.isSubmitting()) {
        // It's already submitting, don't change the state of the button.
        return;
      }

      // Get the list of required, enabled, and visible fields.
      let $visibleRequiredFields = this.get$requiredFields().filter(this.visibleEnabledFilter);

      // Grab the list of valid visible fields.
      const $validRequiredFields = $visibleRequiredFields.filter(`[${this.validAttrKey}="1"]`);

      // Everything is basically valid if all required fields are valid...
      const everythingValid = ($visibleRequiredFields.length === $validRequiredFields.length);

      continueButton.setEnabled(everythingValid);
    },

    /**
     * Checks for linked input elements and shows/hides them based on the status of the checkbox.
     *
     * Triggers a form validation check on the checkbox whose checked property was just changed.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}       event         jQuery `change` event object. Required.
     */
    checkBoxChangeHandler(event) {
      let $checkbox = $(event.target);

      // Check for linked elements and show/hide them appropriately.
      this.showOrHideLinkedElement($checkbox, $checkbox.is(':checked'));

      // Trigger the form validation event.
      $checkbox.trigger(this.getValidationEventName());
    },

    /**
     * Triggers a form validation check on the radio button whose value was just changed.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}       event         jQuery `change` event object. Required.
     */
    radioChangeHandler(event) {
      const $radio = $(event.target);

      $radio.trigger(this.getValidationEventName());
    },

    /**
     * Triggers a form validation check on the select element whose value was just changed.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}       event         jQuery `change` event object. Required.
     */
    selectChangeHandler(event) {
      const $select = $(event.target);

      $select.trigger(this.getValidationEventName());
    },

    /**
     * Triggers a form validation check on the input or textarea whose value has
     * changed due to the user triggering a `keyup` event.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}       event         jQuery `keyup` event object. Required.
     */
    inputTextareaKeyUpHandler(event) {
      const $target = $(event.target);

      $target.trigger(this.getValidationEventName());
    },

    /**
     * Trigger validation checks when the user focuses on a field.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}       event         jQuery `focus` event object. Required.
     */
    inputFocusHandler(event) {
      const $input = $(event.target);

      $input.trigger(this.getValidationEventName());
    },

    /**
     * For each of the required and optional fields passed in with the event data,
     * trigger the validation handler. This can be used to ensure that the form fields
     * validation is checked even when the field doesn't know it's been changed, eg when
     * a browser's autofill inputs values for known fields.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}       event         jQuery `mouseenter`, `mouseleave`, or `touchstart` event object. Required.
     */
    validateFormFields(event) {
      let $fields = $().add(this.get$requiredFields()).add(this.get$optionalFields());
      $fields.trigger(this.getValidationEventName()); // do we have to loop through these?
    },

    /**
     * For all the inputs we are handling, trigger an event which will trigger
     * element/type specific validation.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {formEventsHandlerStamp}
     */
    triggerValidationCheck() {
      this.getAllInputElementsToValidate().trigger(this.getValidationEventName());

      return this;
    },

    /**
     * Handle the form `validation-handler` event which will trigger a validator for
     * the specific element/type being validated.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Event}         event         jQuery `validation-handler` Formation event object. Required.
     */
    formValidationHandler(event) {
      if (event.namespace === null || event.namespace !== "formation") {
        return;
      }
      let $triggeringFormInput = $(event.target);
      let validator = this.getValidator($triggeringFormInput);

      validator.validate($triggeringFormInput);

      this.get$form().trigger(this.getCheckFormValidityEventName());
    }
  })
  .init(function() {

    /**
     * Checks whether this instance has been initialized, or if there is a `formEventsHandlerStamp` attached to
     * the `$form` element already which has been initialized.
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {Boolean}                     False iff neither this instance, nor the `formComponent` attached to the `$form`, have been initialized.
     */
    let __formEventsAlreadyInitialized = () => {
      let alreadyInit = this.getEventsInitialized();
      try {
        let formEventsHandler;
        const $form = this.get$form();
        alreadyInit = (
          alreadyInit || (
            (formEventsHandler = this.getFormComponentOfCurrentElement($form)) !== null &&
            formEventsHandler.getEventsInitialized()
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
     * Add the default event handlers for a form's various input element,
     * iff that has not already taken place.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {formEventsHandlerStamp}
     */
    this.initFormEvents = () => {
      if (__formEventsAlreadyInitialized()) {
        this.warn('Form events previously initialized for this form, skipping.');
        return this;
      }

      this
        .initLogging(this.getLogConsole())
        .addDefaultEventHandlers()
        .triggerValidationCheck();

      return this;
    };

    /**
     * The form element types which get validated.
     *
     * @private
     * @access      private
     * @const
     * @type        {Array}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __inputElementTypesToValidate = ['input', 'textarea', 'select'];

    /**
     * Finds all form input elements to be validated and returns a
     * jQuery object containing them.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {jQuery}
     */
    this.getAllInputElementsToValidate = () => {
      const inputElementTypesToValidate = __inputElementTypesToValidate.join(', ');
      return this.get$form().find(inputElementTypesToValidate);
    };

    this.getValidator = ($formInputElemet) => {
      // this is a stub
    };

    /**
     * Adds a form submit event handler, as well as various change, keyup, focus, and
     * movement events to the various form input element types, as well as Formation-specific
     * events.
     *
     * Sets the initialized flag to be `true`.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {formEventsHandlerStamp}    this        Return the instance of the generated object so we can chain methods.
     */
    this.addDefaultEventHandlers = () => {
      const allInputElementsSelector = __inputElementTypesToValidate.join(', ');
      const mouseMoveTouchEvents = [
        this.getMouseEnterEventName(),
        this.getMouseLeaveEventName(),
        this.getTouchStartEventName()
      ].join(', ');

      this.get$form()
        .submit((event) => this.formSubmitHandler(event))
        .on(this.getCheckFormValidityEventName(), (event) => this.checkFormValidityHandler(event))
        .on(this.getChangeEventName(), 'input:checkbox', (event) => this.checkBoxChangeHandler(event))
        .on(this.getChangeEventName(), 'input:radio', (event) => this.radioChangeHandler(event))
        .on(this.getChangeEventName(), 'select', (event) => this.selectChangeHandler(event))
        .on(this.getKeyUpEventName(), 'input, textarea', (event) => this.inputTextareaKeyUpHandler(event))
        .on(this.getValidationEventName(), allInputElementsSelector, (event) => this.formValidationHandler(event))
        .on(this.getFocusEventName(), allInputElementsSelector, (event) => this.inputFocusHandler(event))
        .on(mouseMoveTouchEvents, (event) => this.validateFormFields(event));

      this.setEventsInitialized(true);

      return this;
    };
  });

module.exports = formEventsHandlerStamp.compose(
  formComponentStamp,
  eventDefinitionsStamp,
  domNavigationStamp,
  consoleLoggerStamp
);
