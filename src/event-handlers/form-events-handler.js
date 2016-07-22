'use strict';

const consoleLoggerStamp = require('../logging/console');
const keyCodes = require('../utilities/key-code-set');

const stampit = require('stampit');
const $ = require('jquery');

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
    $form : null
  })
  .methods({
    formSubmitHandler(event) {

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
     * Flag indicating whether the form's event handlers have been added.
     *
     * @access      private
     * @type        Boolean
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     * @default     false
     */
    let __formEventsInitialized = false;

    /**
     * Return the value of the private `__formEventsInitialized` flag.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {Boolean}        __formEventsInitialized           Flag indicating whether the form's event handlers have been added.
     */
    this.getFormEventsInitialized = () => {
      return __formEventsInitialized;
    };

    /**
     * Set the private `__formEventsInitialized` flag on the object.
     *
     * @throws      TypeError                               if the `newVal` param is not a boolean.
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Boolean}                   newVal      Flag indicating whether the form's event handlers have been added. Required.
     *
     * @returns     {formEventsHandlerStamp}    this        Return the instance of the generated object so we can chain methods.
     */
    this.setFormEventsInitialized = (newVal) => {
      const callStackCurrent = 'formEventsHandlerStamp.setFormEventsInitialized';
      if (typeof newVal !== 'boolean') {
        throw new TypeError(callStackCurrent + '() - Expected `newVal` param to be a Boolean, but is `' + typeof(newVal) + '`.');
      }

      __formEventsInitialized = newVal;

      // So we can chain methods.
      return this;
    };

    /**
     * The event name for checking validation of the entire `form`.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __checkFormValidityEventName = 'check-form-validity.formation';

    /**
     * Returns the private `__checkFormValidityEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __checkFormValidityEventName      The private `__checkFormValidityEventName` property.
     */
    this.getCheckFormValidityEventName = () => {
      return __checkFormValidityEventName;
    };

    /**
     * Element 'onchange' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __changeEventName = 'change.formation';

    /**
     * Returns the private `__changeEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __changeEventName       The private `__changeEventName` property.
     */
    this.getChangeEventName = () => {
      return __changeEventName;
    };

    /**
     * Element 'onkeyup' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __keyUpEventName = 'keyup.formation';

    /**
     * Returns the private `__keyUpEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __keyUpEventName        The private `__keyUpEventName` property.
     */
    this.getKeyUpEventName = () => {
      return __keyUpEventName;
    };

    /**
     * Element 'onfocus' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __focusEventName = 'focus.formation';

    /**
     * Returns the private `__focusEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __focusEventName        The private `__focusEventName` property.
     */
    this.getFocusEventName = () => {
      return __focusEventName;
    };

    /**
     * Element 'onblur' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __blurEventName = 'blur.formation';

    /**
     * Returns the private `__blurEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __blurEventName       The private `__blurEventName` property.
     */
    this.getBlurEventName = () => {
      return __blurEventName;
    };

    /**
     * Element 'onmouseenter' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __mouseEnterEventName = 'mouseenter.formation';

    /**
     * Returns the private `__mouseEnterEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __mouseEnterEventName       The private `__mouseEnterEventName` property.
     */
    this.getMouseEnterEventName = () => {
      return __mouseEnterEventName;
    };

    /**
     * Element 'onmouseleave' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __mouseLeaveEventName = 'mouseleave.formation';

    /**
     * Returns the private `__mouseLeaveEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __mouseLeaveEventName       The private `__mouseLeaveEventName` property.
     */
    this.getMouseLeaveEventName = () => {
      return __mouseLeaveEventName;
    };

    /**
     * Element 'ontouchstart' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __touchStartEventName = 'touchstart.formation';

    /**
     * Returns the private `__touchStartEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __touchStartEventName         The private `__touchStartEventName` property.
     */
    this.getTouchStartEventName = () => {
      return __touchStartEventName;
    };

    /**
     * All input events get a handler which can handle this event, which is
     * for triggering validation checking on the target element.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     */
    const __validationEventName = 'validation-handler.formation';

    /**
     * Returns the private `__validationEventName` property.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {String}      __validationEventName     The private `__validationEventName` property.
     */
    this.getValidationEventName = () => {
      return __validationEventName;
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
      const mouseMoveTouchEvents = [__mouseEnterEventName, __mouseLeaveEventName, __touchStartEventName].join(', ');

      this.$form
        .submit((event) => this.formSubmitHandler(event))
        .on(__checkFormValidityEventName, (event) => this.checkFormValidityHandler(event))
        .on(__changeEventName, 'input:checkbox', (event) => this.checkBoxChangeHandler(event))
        .on(__changeEventName, 'input:radio', (event) => this.radioChangeHandler(event))
        .on(__changeEventName, 'select', (event) => this.selectChangeHandler(event))
        .on(__keyUpEventName, 'input, textarea', (event) => this.inputTextareaKeyUpHandler(event))
        .on(__validationEventName, allInputElementsSelector, (event) => this.formValidationHandler(event))
        .on(__focusEventName, allInputElementsSelector, (event) => this.inputFocusHandler(event))
        .on(mouseMoveTouchEvents, (event) => this.validateFormFields(event));

      this.setFormEventsInitialized(true);

      return this;
    };
  });

module.exports = formEventsHandlerStamp.compose(consoleLoggerStamp);
