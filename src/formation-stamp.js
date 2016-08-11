'use strict';

const bodyEventsHandlerStamp = require('./event-handlers/body-events-handler');
const consoleLoggerStamp = require('./logging/console');
const domNavigationStamp = require('./utilities/dom-navigation');
const formEventsHandlerStamp = require('./event-handlers/form-events-handler');
const ruleStamp = require('./rules/rule');

const stampit = require('stampit');
const $ = require('jquery');

/**
 * This stamp lets you initialize Formation, and turn debug on or off.
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @class         formationStamp
 * @name          formationStamp
 * @package       Formation
 * @version
 */
const formationStamp = stampit()
  .refs({
    formationDataAttrKey : 'data-formation',

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {eventEmitterStamp}
     * @memberOf    {formationStamp}
     * @since       0.1.0
     * @default     null
     */
    nodeEvents : null
  })
  .methods({

    /**
     * When the DOM is ready, set console logging based on the debug setting and
     * initialize Formation.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @returns     {formationStamp}    this            Return the instance of the generated object so we can chain methods.
     */
    readyDocument() {
      // DOM is ready, so Enter Formation!
      this.enterFormation();

      return this;
    },

    /**
     * Initialization of the Formation forms.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @returns     {formationStamp}    this            Return the instance of the generated object so we can chain methods.
     */
    enterFormation() {
      this.log('Initializing Formation...');

      // First find out which forms should be initialized.
      this.detectForms();

      if (this.get$forms().length === 0) {
        this.info('No Formation forms present, exiting.');
        return this;
      }

      let bodyEventsHandler = bodyEventsHandlerStamp({
        $body: $(document.body),
        nodeEvents : this.nodeEvents,
        formationSelector: this.getFormationSelector()
      });
      this.initBodyEvents(bodyEventsHandler);
      this.initForms();

      return this;
    },

    /**
     * Allow consumers of Formation to initialize forms that may be added
     * to the DOM after auto-initialization of the DOM.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}              $form         The jQuery extended `form` element to be initialized. Required.
     *
     * @returns     {formationStamp}      this
     */
    initForm($form) {
      try {
        // Set up the Form but only if it has the proper DOM.
        let formationComponent = formEventsHandlerStamp({
          formationSelector: this.getFormationSelector(),
          nodeEvents : this.nodeEvents
        }).initLogging(this.getLogConsole());

        formationComponent.initForm($form.eq(0));
        formationComponent.initFormEvents();
      }
      catch (exception) {
        this.error(exception);
      }

      return this;
    },

    getFormationSelector() {
      return `[${this.formationDataAttrKey}="1"]`;
    },

    /**
     * Attempt to register the `ruleName` rule with each form's formComponent.
     * Handle when things go wrong.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @param       {String}      elementType             The type of element to which this rule applies. Required.
     * @param       {String}      ruleName                The name of the rule to be registered. Required.
     * @param       {Function}    ruleCallbackMethod      The callback method to be run when the rule is checked. Required.
     *
     * @returns     {formationStamp}    this
     */
    registerRule(elementType, ruleName, ruleCallbackMethod) {
      if (typeof elementType !== 'string') {
        throw TypeError('Expected `elementType` param to be a `String`, was a `' + typeof elementType + '`.');
      }
      if ($.inArray(elementType, this.getSupportedElementTypes()) === -1) {
        throw TypeError('Specified `elementType` `' + elementType + '` is not supported.');
      }
      if (typeof ruleName !== 'string') {
        throw TypeError('Expected `ruleName` param to be a `String`, was a `' + typeof ruleName + '`.');
      }
      if (typeof ruleCallbackMethod !== 'function') {
        throw TypeError('Expected `ruleCallbackMethod` param to be a `Function`, was a `' + typeof ruleCallbackMethod + '`.');
      }
      this.get$forms().each((index, form) => {
        try {
          const $form = $(form);
          const rule = ruleStamp({name: ruleName, callback: ruleCallbackMethod});
          this.getFormComponentOfCurrentElement($form).registerRule(elementType, rule);
        }
        catch (exception) {
          this.error(exception);
        }
      });

      return this;
    }
  })
  .init(function() {

    /**
     * Flag indicating whether to log debug messages and exceptions.
     *
     * @access      private
     * @type        Boolean
     * @memberOf    {formationStamp}
     * @since       0.1.0
     * @default     false
     */
    let debug = false;

    /**
     * Return the value of the private `debug` flag.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @returns    {Boolean}        debug           Flag indicating whether we're turning debug on or off.
     */
    this.getDebug = () => {
      return debug;
    };

    /**
     * Set the private `debug` flag on the Formation object.
     *
     * @throws      TypeError                         if the `newVal` param is not a boolean.
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @param       {Boolean}         newVal          Flag indicating whether we're turning debug on or off. Required.
     *
     * @returns     {formationStamp}  this            Return the instance of the generated object so we can chain methods.
     */
    this.setDebug = (newVal) => {
      const callStackCurrent = 'formationStamp.setDebug';
      if (typeof newVal !== 'boolean') {
        throw new TypeError(callStackCurrent + '() - Expected `newVal` param to be a Boolean, but is `' + typeof(newVal) + '`.');
      }

      debug = newVal;

      this.nodeEvents.emit(this.nodeEvents.getNodeSetDebugEvent(), newVal);

      // So we can chain methods.
      return this;
    };

    /**
     * A set of jQuery extended `form` elements to be managed by Formation.
     *
     * @access      private
     * @type        jQuery
     * @memberOf    {formationStamp}
     * @since       0.1.0
     * @default     $()
     */
    let $forms = $();

    /**
     * Return the value of the private `$forms` object.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @returns     {jQuery}        $forms           A set of jQuery extended `form` elements to be managed by Formation.
     */
    this.get$forms = () => {
      return $forms;
    };

    /**
     * Find all the `form` elements in the DOM that are to be managed/validated by Formation, and set the private
     * `$forms` property.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @returns     {formationStamp}  this            Return the instance of the generated object so we can chain methods.
     */
    this.detectForms = () => {
      $forms = $('form').filter(this.formFilter);

      // So we can chain methods.
      return this;
    };

    /**
     * Helper function to filter a jQuery set to return only forms to be managed
     * by Formation.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @param       {int}           index         The index of the element in the jQuery set.
     * @param       {jQuery}        element       The DOM element to check.
     *
     * @returns     {boolean}
     */
    this.formFilter = (index, element) => {
      let $element = $(element);
      return (
        $element.prop('tagName').toLowerCase() == 'form' &&
        $element.attr(this.formationDataAttrKey) !== undefined &&
        parseInt($element.attr(this.formationDataAttrKey)) == 1
      );
    };

    /**
     * The types of elements that are supported by Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {Array}
     * @memberOf    {formationStamp}
     * @since       0.1.0
     */
    const __supportedElementTypes = [
      'text',
      'checkbox',
      'radio',
      'select'
    ];

    /**
     * Return the value of the private `__supportedElementTypes` object.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @returns     {Array}       __supportedElementTypes         Types of elements supported by Formation.
     */
    this.getSupportedElementTypes = () => {
      return __supportedElementTypes;
    };

    /**
     * Object composed of a {bodyEventsHandlerStamp} which handles body events.
     *
     * @access      public
     * @type        {Object}
     * @memberOf    {formationStamp}
     * @since       0.1.0
     * @default     null
     */
    let __bodyEventsHandler = null;

    /**
     * Add the default event handlers for the `body` element, iff that has not already taken place.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @param       {bodyEventsHandlerStamp}        bodyEventsHandler     Object which is composed of a `bodyEventsHandlerStamp`. Required.
     *
     * @returns     {formationStamp}
     */
    this.initBodyEvents = (bodyEventsHandler) => {
      this.log('Initializing body events...');

      // TODO - do check on `bodyEventsHandler` before setting `__bodyEventsHandler`
      __bodyEventsHandler = bodyEventsHandler;
      __bodyEventsHandler.initLogging(this.getLogConsole());

      if (__bodyEventsHandler.getEventsInitialized()) {
        this.info('Body events previously initialized, skipping.');
        return this;
      }

      // The events have not yet been added, so do so now.
      __bodyEventsHandler.addDefaultEventHandlers();

      return this;
    };

    /**
     * For each registered Formation `form`, initialize its DOM and the
     * various events which should be handled.
     *
     * @access      public
     * @memberOf    {formationStamp}
     * @since       0.1.0
     *
     * @returns     {formationStamp}
     */
    this.initForms = () => {
      // Set up the individual forms.
      $forms.each((index, form) => {
        let $form = $(form);

        this.initForm($form);
      });

      return this;
    };
  });

const formationLoggerStamp = formationStamp.compose(domNavigationStamp, consoleLoggerStamp);

module.exports = formationLoggerStamp;
