'use strict';

const buttonComponentStamp = require('./button');
const checkboxDefaultRulesStamp = require('../rules/checkbox-default-rules');
const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');
const radioDefaultRulesStamp = require('../rules/radio-default-rules');
const selectDefaultRulesStamp = require('../rules/select-default-rules');
const textDefaultRulesStamp = require('../rules/text-default-rules');

const stampit = require('stampit');

/**
 * Provides an interface for form button elements (`button`, `input:submit`, etc).
 *
 * @copyright     Copyright (c) 2016 - 2018, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.formComponent
 * @mixin         Formation.formComponent
 *
 * @mixes         Formation.toggleableConsole
 * @mixes         Formation.domNavigation
 */
const formComponentStamp = stampit()
  .refs({

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {Formation.eventEmitter}
     * @memberOf    {Formation.formComponent}
     * @default     null
     */
    nodeEvents : null,
  })
  .methods({

    /**
     * A method for retrieving the formComponent of an element.
     *
     * @access      public
     * @type        {function}
     * @memberOf    {Formation.formComponent}
     * @mixes       {Formation.formComponent}
     *
     * @returns     {Formation.formComponent}
     */
    getFormComponentOfCurrentElement() {
      return this;
    },

    /**
     * Register a Formation validation rule for the element type specified.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     * @mixes       {Formation.formComponent}
     *
     * @param       {String}                  elementType         The element type to which the rule applies. Required.
     * @param       {Formation.rule}          rule                An instance of the ruleStamp. Required.
     */
    registerRule(elementType, rule) {
      if (typeof rule.isFormationRule !== 'function' || ! rule.isFormationRule()) {
        throw new TypeError('The supplied `rule` object is not built from a `ruleStamp` stamp.');
      }

      this.getRuleSetBySupportedElementType(elementType).add(rule);
    }
  })
  .init(function() {

    /**
     * Helper function that users of this Stamp can use to determine if an object is composed
     * of this Stamp.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {Boolean}       true
     */
    this.isFormComponent = () => true;

    /**
     * The initialized form node.
     *
     * @private
     * @access      private
     * @type        {Element}
     * @memberOf    {Formation.formComponent}
     * @default     null
     */
    let __form = null;

    /**
     * Returns the initialized form node.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {Element}     __form
     */
    this.getForm = () => __form;

    /**
     * Returns whether the current form is in a valid state.
     *
     * @returns {boolean}
     */
    this.isFormValid = () => (this.getForm() && parseInt(this.getForm().getAttribute(this.validAttrKey)) === 1);

    /**
     * The initialization status.
     *
     * @private
     * @access      private
     * @type        {Boolean}
     * @memberOf    {Formation.formComponent}
     * @default     false
     */
    let __initialized = false;

    /**
     * Returns the initialization status of this instance.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {boolean}       __initialized
     */
    this.initialized = () => __initialized;

    /**
     * Checks whether this instance has been initialized, or if there is a `formComponent` attached to
     * the `form` element already which has been initialized.
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {Boolean}                     False iff neither this instance, nor the `formComponent` attached to the `form`, have been initialized.
     */
    const __formAlreadyInitialized = () => {
      let alreadyInit = this.initialized();
      try {
        let formComponent;
        const form = this.getForm();
        alreadyInit = (
          alreadyInit || (
            form !== null &&
            (formComponent = this.getFormComponentOfCurrentElement(form)) !== null &&
            formComponent.initialized()
          )
        );
      }
      catch (e) {
        this.info(e);
      }
      return alreadyInit;
    };

    /**
     * The meat of this Stamp. Will initialize a `form` and assign it internally,
     * setting all the required and optional fields, the form submit button,
     * and initializing the fields' current validation status. If everything went without error,
     * sets the `__initialized` flag to `true` so that we can't re-initialize the `form`.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @param       {Element}         form               The `form` element to be managed by this instance. Required.
     *
     * @returns     {Formation.formComponent}
     */
    this.initForm = form => {
      // Set the form so we can use it internally elsewhere.
      __form = form;

      if (__formAlreadyInitialized()) {
        this.warn('This `formComponent` is already initialized, skipping.');
        return this;
      }

      // Get the required and optional fields, and the submit button present in the form.
      __setRequiredFields();
      __setOptionalFields();
      __initFields();
      __initFormButtons();

      // There were no problems initializing the form, set the private vars.
      __initialized = true;

      return this;
    };

    /**
     * The NodeList containing the elements in this form that are required to be validated.
     *
     * @private
     * @access      private
     * @type        {NodeList}
     * @memberOf    {Formation.formComponent}
     * @default     null
     */
    let __requiredFields = null;

    /**
     * Returns the NodeList containing the elements in this form that are required to be validated.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {NodeList}       __requiredFields
     */
    this.getRequiredFields = () => __requiredFields;

    /**
     * Find the required fields and set them to the private `__requiredFields` var.
     *
     * @throws      Error       iff the set of required fields is empty.
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {Formation.formComponent}
     */
    const __setRequiredFields = () => {
      __requiredFields = this.findRequiredFields(__form);
      if (! __requiredFields.length) {
        // TODO - use a custom error type here
        throw new Error('No required fields found, cannot proceed.');
      }
    };

    /**
     * The NodeList containing the elements in this form that are optional to be validated.
     *
     * @private
     * @access      private
     * @type        {NodeList}
     * @memberOf    {Formation.formComponent}
     * @default     null
     */
    let __optionalFields = null;

    /**
     * Returns the NodeList containing the elements in this form that are optional to be validated.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {NodeList}       __optionalFields
     */
    this.getOptionalFields = () => __optionalFields;

    /**
     * Find the optional fields and set them to the private `__optionalFields` var.
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {Formation.formComponent}
     */
    const __setOptionalFields = () => {
      __optionalFields = this.findOptionalFields(__form);
    };

    /**
     * Initialize (or reset) the validity of the `form`, and the
     * required and optional fields to `false` (0).
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {Formation.formComponent}
     */
    const __initFields = () => {
      this.getForm().setAttribute(this.validAttrKey, 0);
      __requiredFields.forEach(required => { required.setAttribute(this.validAttrKey, 0); });
      __optionalFields.forEach(optional => { optional.setAttribute(this.validAttrKey, 0); });
    };

    /**
     * The `Formation.buttonComponent` object containing the form's submit button.
     *
     * @private
     * @access      private
     * @type        {Formation.buttonComponent}
     * @memberOf    {Formation.formComponent}
     * @default     null
     */
    let __submitButton = null;

    /**
     * Returns the `__submitButton`.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {Formation.buttonComponent}       __submitButton
     */
    this.getSubmitButton = () => __submitButton;

    /**
     * Create new `buttonComponents` to manage the Submit button
     * for this form, and set them to the private `__submitButton` var.
     *
     * TODO - make `setLoadingHTML()` optional with a new `data-fv` attribute on the button
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {Formation.formComponent}
     */
    const __initFormButtons = () => {
      const button = this.findSubmitButton(__form);
      if (button.length) {
        __submitButton = buttonComponentStamp({
          button : button[0],
          loadingText : 'Submitting, please wait...',
          nodeEvents : this.nodeEvents
        }).initLogging(this.getLogConsole())
          .addHandleFormSubmitListener()
          .setLoadingHTML();
      }
    };

    /**
     * The types of elements that are supported by Formation mapped to `querySelectorAll()`
     * compatible selectors.
     *
     * @private
     * @access      private
     * @const
     * @type        {Object}
     * @memberOf    {Formation.formComponent}
     */
    const __supportedElementTypesMap = {
      'text' : 'input:text,input:password,input:email,input:tel,textarea',
      'checkbox' : 'input:checkbox',
      'radio' : 'input:radio',
      'select': 'select'
    };

    /**
     * Return the value of the private `__supportedElementTypesMap` object.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {Object}      __supportedElementTypesMap         Types of elements supported by Formation.
     */
    this.getSupportedElementTypesMap = () => __supportedElementTypesMap;

    /**
     * Rule sets keyed by the supported element types.
     *
     * @private
     * @access      private
     * @type        {Object}
     * @memberOf    {Formation.formComponent}
     */
    const __supportedElementTypesRuleSets = {
      'text' : textDefaultRulesStamp(),
      'checkbox' : checkboxDefaultRulesStamp(),
      'radio' : radioDefaultRulesStamp(),
      'select': selectDefaultRulesStamp()
    };

    /**
     * Get all the supported rule sets.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @returns     {Object}
     */
    this.getSupportedElementTypeRuleSets = () => __supportedElementTypesRuleSets;

    /**
     * Get the rule set to be applied to the specified supported element type.
     *
     * @access      public
     * @memberOf    {formComponent}
     *
     * @param       {String}          type          The supported element type whose rules we want. Required.
     *
     * @returns     {Formation.ruleSet}
     */
    this.getRuleSetBySupportedElementType = type => __supportedElementTypesRuleSets[type];

    /**
     * Set the rule set to be applied to the specified supported element type.
     *
     * @access      public
     * @memberOf    {Formation.formComponent}
     *
     * @param       {String}                    type          The supported element type. Required.
     * @param       {Formation.ruleSet}         rules         The rule set to be applied. Required.
     */
    this.setSupportedElementTypeRuleSet = (type, rules) => {
      __supportedElementTypesRuleSets[type] = rules;
    };
  });

module.exports = formComponentStamp.compose(
  domNavigationStamp,
  consoleLoggerStamp
);
