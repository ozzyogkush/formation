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

      // Grab the list of valid visible required fields.
      const $validRequiredFields = $visibleRequiredFields.filter(`[${this.validAttrKey}="1"]`);

      // Everything is basically valid if all required fields are valid...
      const validAfterRuleCheck = ($visibleRequiredFields.length === $validRequiredFields.length);

      continueButton.setEnabled(validAfterRuleCheck);

      this.get$form().trigger(this.getSetValidationFlagEventName(), validAfterRuleCheck);
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
     *
     * @param       {Event}       event         jQuery `change` event object. Required.
     */
    selectChangeHandler(event) {
      const $select = $(event.target);

      $select.trigger(this.getValidationEventName());
    },

    /**
     * Triggers a form validation check on the input or textarea whose value has
     * changed due to the value of the element changing.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     *
     * @param       {Event}       event         jQuery `change` event object. Required.
     */
    inputTextareaChangeHandler(event) {
      const $target = $(event.target);

      $target.trigger(this.getValidationEventName());
    },

    /**
     * Triggers a form validation check on the input or textarea whose value has
     * changed due to the user triggering a `keyup` event.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
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
     *
     * @param       {Event}         event         jQuery `validation-handler` Formation event object. Required.
     */
    inputElementValidationHandler(event) {
      if (event.namespace === null || event.namespace !== "formation") {
        return;
      }
      let $triggeringFormInput = $(event.target);

      // Validate this element
      this.validate($triggeringFormInput);

      // Check the validity of the whole form
      this.get$form().trigger(this.getCheckFormValidityEventName());
    },

    setValidationFlagHandler(event, validAfterRuleCheck) {
      let $element = $(event.target);
      const type = this.getInputType($element);
      let $elementToCheckAndSetAttr = $element;

      // TODO - re-use `ruleSetStamp.getAttributeOwner()` for this check
      if ($.inArray(type, ['checkbox', 'radio']) !== -1) {
        $elementToCheckAndSetAttr = this.getCheckboxOrRadioContainer($element);
      }

      const validBeforeRuleCheck = (parseInt($elementToCheckAndSetAttr.attr(this.validAttrKey)) === 1);

      // Set the value
      $elementToCheckAndSetAttr.attr(this.validAttrKey, (validAfterRuleCheck === true ? 1 : 0));

      // If the value changed, trigger the validity changed event on the EVENT element
      const validityChanged = (
        (validBeforeRuleCheck && ! validAfterRuleCheck) ||
        (! validBeforeRuleCheck && validAfterRuleCheck)
      );
      if (validityChanged) {
        $element.trigger(this.getValidityChangedEventName());
      }
    },

    validate($element) {
      const lowerTag = $element.prop('tagName').toLowerCase();
      const type = this.getInputType($element);

      if (type === null) {
        this.warn(`No rules class exists for the tag \`${lowerTag}\`.`);
        return;
      }

      const registeredRules = this.getRuleSetBySupportedElementType(type);
      const validAfterRuleCheck = registeredRules.process($element);

      $element.trigger(this.getSetValidationFlagEventName(), validAfterRuleCheck);
    }
  })
  .init(function() {

    /**
     * Types of `input` elements that take in characters from the keyboard.
     *
     * @private
     * @access      private
     * @const
     * @type        {Array}
     * @memberOf    {formEventsHandlerStamp}
     */
    const __inputTypes = ['text', 'password', 'email', 'number', 'tel'];

    /**
     * Return the private `__inputTypes` var.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     *
     * @returns     {Array}       __inputTypes
     */
    this.getInputTypesArr = () => {
      return __inputTypes;
    };

    this.getInputType = ($element) => {
      const lowerTag = $element.prop('tagName').toLowerCase();

      let type = null;
      if (lowerTag === 'textarea' ||
          (lowerTag === 'input' && $.inArray(
            $element.prop('type'),
            this.getInputTypesArr()) !== -1)) {
        type = 'text';
      }
      else if ($element.prop('type') === 'checkbox') {
        type = 'checkbox';
      }
      else if ($element.prop('type') === 'radio') {
        type = 'radio';
      }
      else if (lowerTag === 'select') {
        type = 'select';
      }

      return type;
    };

    /**
     * Checks whether this instance has been initialized, or if there is a `formEventsHandlerStamp` attached to
     * the `$form` element already which has been initialized.
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {formEventsHandlerStamp}
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
     */
    const __inputElementTypesToValidate = ['input', 'textarea', 'select'];

    /**
     * Finds all form input elements to be validated and returns a
     * jQuery object containing them.
     *
     * @access      public
     * @memberOf    {formEventsHandlerStamp}
     *
     * @returns     {jQuery}
     */
    this.getAllInputElementsToValidate = () => {
      const inputElementTypesToValidate = __inputElementTypesToValidate.join(', ');
      return this.get$form().find(inputElementTypesToValidate);
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
     *
     * @returns     {formEventsHandlerStamp}    this        Return the instance of the generated object so we can chain methods.
     */
    this.addDefaultEventHandlers = () => {
      const joinStr = ', ';
      const allInputElementsSelector = __inputElementTypesToValidate.join(joinStr);
      const mouseMoveTouchEvents = [
        this.getMouseEnterEventName(),
        this.getMouseLeaveEventName(),
        this.getTouchStartEventName()
      ].join(joinStr);

      const textElementsSelector = __inputTypes
          .map(type => `input[type="${type}"]`)
          .join(joinStr) + `, textarea`;

      this.get$form()
        .submit((event) => this.formSubmitHandler(event))
        .on(this.getChangeEventName(), 'input:checkbox', (event) => this.checkBoxChangeHandler(event))
        .on(this.getChangeEventName(), 'input:radio', (event) => this.radioChangeHandler(event))
        .on(this.getChangeEventName(), textElementsSelector, (event) => this.inputTextareaChangeHandler(event))
        .on(this.getChangeEventName(), 'select', (event) => this.selectChangeHandler(event))
        .on(this.getKeyUpEventName(), 'input, textarea', (event) => this.inputTextareaKeyUpHandler(event))
        .on(this.getFocusEventName(), allInputElementsSelector, (event) => this.inputFocusHandler(event))
        .on(this.getValidationEventName(),
            allInputElementsSelector,
            (event) => this.inputElementValidationHandler(event))
        .on(this.getCheckFormValidityEventName(),
            (event) => this.checkFormValidityHandler(event))
        .on(this.getSetValidationFlagEventName(),
            (event, isValid) => this.setValidationFlagHandler(event, isValid))
        .on(this.getSetValidationFlagEventName(),
            allInputElementsSelector,
            (event, isValid) => this.setValidationFlagHandler(event, isValid)
        )
        .parent()
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
