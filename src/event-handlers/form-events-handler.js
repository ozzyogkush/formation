'use strict';

const consoleLoggerStamp = require('../logging/console');
const eventDefinitionsStamp = require('./event-definitions-stamp');

const stampit = require('stampit');

const formEventsHandlerStamp = stampit()
  .refs({

    /**
     * The jQuery extended `form` element.
     *
     * @access      public
     * @type        {jQuery}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     * @default     null
     */
    $form : null,

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

    checkFormValidityHandler(event) {

    },

    checkBoxChangeHandler(event) {

    },

    radioChangeHandler(event) {

    },

    selectChangeHandler(event) {

    },

    inputTextareaKeyUpHandler(event) {

    },

    formValidationHandler(event) {

    },

    inputFocusHandler(event) {

    },

    validateFormFields(event) {

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
    }
  })
  .init(function() {

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
      return this.$form.find(inputElementTypesToValidate);
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

      this.$form
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

module.exports = formEventsHandlerStamp.compose(eventDefinitionsStamp, consoleLoggerStamp);
