'use strict';

const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');
const eventDefinitionsStamp = require('./event-definitions-stamp');
const formComponentStamp = require('../components/form');

const stampit = require('stampit');

/**
 * Provides an interface for managing form element events
 *
 * @copyright     Copyright (c) 2016 - 2017, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.formEventsHandler
 * @mixin         Formation.formEventsHandler
 *
 * @mixes         Formation.formComponent
 * @mixes         Formation.domNavigation
 * @mixes         Formation.toggleableConsole
 * @mixes         Formation.eventDefinitions
 */
const formEventsHandlerStamp = stampit()
  .refs({

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {Formation.eventEmitter}
     * @memberOf    {Formation.formEventsHandler}
     * @default     null
     */
    nodeEvents : null,

    /**
     * A method for retrieving the formComponent of an element.
     *
     * @access      public
     * @type        {function}
     * @memberOf    {Formation.formEventsHandler}
     * @default     null
     */
    getFormComponentOfCurrentElement : null
  })
  .methods({

    /**
     * Emit a node event when the form is submitted.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}       event       The `submit` event object. Required.
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
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}         event         The `check-form-validity` event object. Required.
     */
    checkFormValidityHandler(event) {
      const submitButton = this.getSubmitButton();
      if (submitButton === null || ! submitButton.exists()) {
        return;
      }

      if (submitButton.isSubmitting()) {
        // It's already submitting, don't change the state of the button.
        return;
      }

      // Get the list of required, enabled, and visible fields.
      let visibleRequiredFields = this.getRequiredFields().filter(this.visibleEnabledFilter);

      // Grab the list of valid visible required fields.
      const validRequiredFields = visibleRequiredFields.filter(e => e.matches(`[${this.validAttrKey}="1"]`));

      // Everything is basically valid if all required fields are valid...
      const validAfterRuleCheck = (visibleRequiredFields.length === validRequiredFields.length);

      submitButton.setEnabled(validAfterRuleCheck);

      const setValidationFlagEvent = new CustomEvent(
        this.getSetValidationFlagEventName(),
        { bubbles: true, cancelable: true, detail: { validAfterRuleCheck: validAfterRuleCheck } }
      );
      this.getForm().dispatchEvent(setValidationFlagEvent);
    },

    /**
     * Checks for linked input elements and shows/hides them based on the status of the checkbox.
     *
     * Triggers a form validation check on the checkbox whose checked property was just changed.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}       event         The `change` event object. Required.
     */
    checkBoxChangeHandler(event) {
      const checkbox = event.target;

      // Check for linked elements and show/hide them appropriately.
      this.showOrHideLinkedElement(checkbox, (checkbox.hasAttribute('checked') && checkbox.checked));

      // Trigger the form validation event.
      const validationEvent = new CustomEvent(this.getValidationEventName(), { bubbles: true, cancelable: true });
      checkbox.dispatchEvent(validationEvent);
    },

    /**
     * Checks for linked input elements and shows/hides them based on the status of the radio.
     *
     * Triggers a form validation check on the radio button whose value was just changed.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}       event         The `change` event object. Required.
     */
    radioChangeHandler(event) {
      const radio = event.target;

      // Check for linked elements and show/hide them appropriately.
      this.getAllCheckboxesOrRadiosByName(radio).forEach(r => {
        this.showOrHideLinkedElement(r, (r.hasAttribute('checked') && r.checked));
      });

      const validationEvent = new CustomEvent(this.getValidationEventName(), { bubbles: true, cancelable: true });
      radio.dispatchEvent(validationEvent);
    },

    /**
     * Triggers a form validation check on the select element whose value was just changed.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}       event         The `change` event object. Required.
     */
    selectChangeHandler(event) {
      const select = event.target;

      const validationEvent = new CustomEvent(this.getValidationEventName(), { bubbles: true, cancelable: true });
      select.dispatchEvent(validationEvent);
    },

    /**
     * Triggers a form validation check on the input or textarea whose value has
     * changed due to the value of the element changing.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}       event         The `change` event object. Required.
     */
    inputTextareaChangeHandler(event) {
      const target = event.target;

      const validationEvent = new CustomEvent(this.getValidationEventName(), { bubbles: true, cancelable: true });
      target.dispatchEvent(validationEvent);
    },

    /**
     * Triggers a form validation check on the input or textarea whose value has
     * changed due to the user triggering a `keyup` event.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}       event         The `keyup` event object. Required.
     */
    inputTextareaKeyUpHandler(event) {
      const target = event.target;

      const validationEvent = new CustomEvent(this.getValidationEventName(), { bubbles: true, cancelable: true });
      target.dispatchEvent(validationEvent);
    },

    /**
     * Trigger validation checks when the user focuses on a field.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}       event         The `focus` event object. Required.
     */
    inputFocusHandler(event) {
      const input = event.target;

      const validationEvent = new CustomEvent(this.getValidationEventName(), { bubbles: true, cancelable: true });
      input.dispatchEvent(validationEvent);
    },

    /**
     * Handle the form `validation-handler` event which will trigger a validator for
     * the specific element/type being validated.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}         event         The `validation-handler` Formation event object. Required.
     */
    inputElementValidationHandler(event) {
      const triggeringFormInput = event.target;

      // Validate this element
      this.validate(triggeringFormInput);

      // Check the validity of the whole form
      const checkValidityEvent = new CustomEvent(this.getCheckFormValidityEventName(), { bubbles: true, cancelable: true });
      this.getForm().dispatchEvent(checkValidityEvent);
    },

    /**
     * Set the state of validation on the element with the new value.
     *
     * If the validity state actually changes, trigger the `validity-changed` event.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}                 event                   The `set-validation-flag` Formation event object. Required.
     */
    setValidationFlagHandler(event) {
      const element = event.target;
      const validAfterRuleCheck = event.detail.validAfterRuleCheck;
      const type = this.getInputType(element);
      const elementToCheckAndSetAttr = (
        ['checkbox', 'radio'].indexOf(type) === -1 ? element : this.getCheckboxOrRadioContainer(element)
      );

      const validBeforeRuleCheck = (parseInt(elementToCheckAndSetAttr.getAttribute(this.validAttrKey)) === 1);

      // Set the value
      elementToCheckAndSetAttr.setAttribute(this.validAttrKey, (validAfterRuleCheck === true ? 1 : 0));

      // If the value changed, trigger the validity changed event on the EVENT element
      const validityChanged = (validBeforeRuleCheck ^ validAfterRuleCheck);
      if (validityChanged) {
        const validityChangedEvent = new CustomEvent(
          this.getValidityChangedEventName(),
          { bubbles: true, cancelable: true }
        );
        element.dispatchEvent(validityChangedEvent);
      }
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
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Event}       event         The `mouseenter`, `mouseleave`, or `touchstart` event object. Required.
     */
    validateFormFields(event) {
      const fields = Array.from(this.getRequiredFields()).concat(Array.from(this.getOptionalFields()));
      fields.forEach(field => {
        const validationEvent = new CustomEvent(this.getValidationEventName(), { bubbles: true, cancelable: true });
        field.dispatchEvent(validationEvent);
      });
    },

    /**
     * For all the inputs we are handling, trigger an event which will trigger
     * element/type specific validation.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @returns     {Formation.formEventsHandler}
     */
    triggerValidationCheck() {
      this.getAllInputElementsToValidate().forEach(field => {
        const validationEvent = new CustomEvent(this.getValidationEventName(), { bubbles: true, cancelable: true });
        field.dispatchEvent(validationEvent);
      });

      return this;
    },

    /**
     * Attempt to validate the specified form element. When done, trigger an event
     * to set the state of validation on the element with the result of the check.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @param       {Element}       element      The element to validate. Required.
     */
    validate(element) {
      const lowerTag = element.tagName.toLowerCase();
      const type = this.getInputType(element);

      if (type === null) {
        this.warn(`No rules class exists for the tag \`${lowerTag}\`.`);
        return;
      }

      const registeredRules = this.getRuleSetBySupportedElementType(type);
      const validAfterRuleCheck = registeredRules.process(element);

      const setValidationFlagEvent = new CustomEvent(
        this.getSetValidationFlagEventName(),
        { bubbles: true, cancelable: true, detail: { validAfterRuleCheck: validAfterRuleCheck } }
      );

      element.dispatchEvent(setValidationFlagEvent);
    }
  })
  .init(function() {

    /**
     * Helper function that users of this Stamp can use to determine if an object is composed
     * of this Stamp.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     *
     * @returns     {Boolean}       true
     */
    this.isFormEventHandler = () => true;

    /**
     * Types of `input` elements that take in characters from the keyboard.
     *
     * @private
     * @access      private
     * @const
     * @type        {Array}
     * @memberOf    {Formation.formEventsHandler}
     */
    const __inputTypes = ['text', 'password', 'email', 'number', 'tel'];

    /**
     * Return the private `__inputTypes` var.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     *
     * @returns     {Array}       __inputTypes
     */
    this.getInputTypesArr = () => __inputTypes;

    /**
     * Return a Formation-friendly string indicating the type of an element.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     *
     * @param       {Element}           element       The element to check. Required.
     *
     * @returns     {String|null}       type          The determined input type.
     */
    this.getInputType = element => {
      const lowerTag = element.tagName.toLowerCase();
      const elementType = element.getAttribute('type');

      let type = null;
      if (lowerTag === 'textarea' ||
          (lowerTag === 'input' && this.getInputTypesArr().indexOf(elementType) !== -1)) {
        type = 'text';
      }
      else if (elementType === 'checkbox') {
        type = 'checkbox';
      }
      else if (elementType === 'radio') {
        type = 'radio';
      }
      else if (lowerTag === 'select') {
        type = 'select';
      }

      return type;
    };

    /**
     * Checks whether this instance has been initialized, or if there is a `formEventsHandlerStamp` attached to
     * the `form` element already which has been initialized.
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {Formation.formEventsHandler}
     *
     * @returns     {Boolean}                     False iff neither this instance, nor the `formComponent` attached to the `form`, have been initialized.
     */
    let __formEventsAlreadyInitialized = () => {
      let alreadyInit = this.getEventsInitialized();
      try {
        let formEventsHandler;
        const form = this.getForm();
        alreadyInit = (
          alreadyInit || (
            form !== null &&
            (formEventsHandler = this.getFormComponentOfCurrentElement(form)) !== null &&
            formEventsHandler.getEventsInitialized()
          )
        );
      }
      catch (e) {
        this.info(e);
      }
      return alreadyInit;
    };

    this.formEventsAlreadyInitialized = __formEventsAlreadyInitialized;

    /**
     * Add the default event handlers for a form's various input element,
     * iff that has not already taken place.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     *
     * @returns     {Formation.formEventsHandler}
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
     * @memberOf    {Formation.formEventsHandler}
     */
    const __inputElementTypesToValidate = ['input', 'textarea', 'select'];

    /**
     * Finds all form input elements to be validated and returns a NodeList containing them.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     *
     * @returns     {Array}
     */
    this.getAllInputElementsToValidate = () => {
      const inputElementTypesToValidate = __inputElementTypesToValidate.join(', ');

      return Array.from(this.getForm().querySelectorAll(inputElementTypesToValidate));
    };

    /**
     * Adds a form submit event handler, as well as various change, keyup, focus, and
     * movement events to the various form input element types, as well as Formation-specific
     * events.
     *
     * Sets the initialized flag to be `true`.
     *
     * @access      public
     * @memberOf    {Formation.formEventsHandler}
     * @mixes       {Formation.formEventsHandler}
     *
     * @returns     {Formation.formEventsHandler}     this        Return the instance of the generated object so we can chain methods.
     */
    this.addDefaultEventHandlers = () => {
      const joinStr = ', ';
      const allInputElementsSelector = __inputElementTypesToValidate.join(joinStr);
      const textElementsSelector = __inputTypes
          .map(type => `input[type="${type}"]`)
          .join(joinStr) + `, textarea`;

      // Add normal form and element listeners
      this.getForm().addEventListener('submit', event => this.formSubmitHandler(event));
      this.getForm().addEventListener(this.getChangeEventName(), event => {
        const target = event.target;
        if (target.tagName.toLowerCase() === 'input' && target.getAttribute('type') === 'checkbox') {
          this.checkBoxChangeHandler(event);
        }
        else if (target.tagName.toLowerCase() === 'input' && target.getAttribute('type') === 'radio') {
          this.radioChangeHandler(event);
        }
        else if (target.matches(textElementsSelector)) {
          this.inputTextareaChangeHandler(event);
        }
        else if (target.tagName.toLowerCase() === 'select') {
          this.selectChangeHandler(event);
        }
      });
      this.getForm().addEventListener(this.getKeyUpEventName(), event => {
        if (['input', 'textarea'].indexOf(event.target.tagName.toLowerCase()) !== -1) {
          this.inputTextareaKeyUpHandler(event);
        }
      });
      this.getForm().addEventListener(this.getFocusEventName(), event => {
        if (event.target.matches(allInputElementsSelector)) {
          this.inputFocusHandler(event);
        }
      });

      // Add event listeners for detecting validation events and setting the validation flag
      this.getForm().addEventListener(this.getValidationEventName(), event => {
        if (event.target.matches(allInputElementsSelector)) {
          this.inputElementValidationHandler(event);
        }
      });
      this.getForm().addEventListener(this.getCheckFormValidityEventName(), event => this.checkFormValidityHandler(event));
      this.getForm().addEventListener(this.getSetValidationFlagEventName(), event => {
        if (event.target === this.getForm() || event.target.matches(allInputElementsSelector)) {
          this.setValidationFlagHandler(event);
        }
      });

      const mouseMoveTouchEvents = [
        this.getMouseEnterEventName(),
        this.getMouseLeaveEventName(),
        this.getTouchStartEventName()
      ];

      mouseMoveTouchEvents.forEach(mte => {
        this.getForm().parentNode.addEventListener(mte, event => this.validateFormFields(event));
      });

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
