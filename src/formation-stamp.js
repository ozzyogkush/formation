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
 * @package       Formation
 * @namespace     Formation.formation
 * @mixin         Formation.formation
 *
 * @mixes         Formation.domNavigation
 * @mixes         Formation.toggleableConsole
 */
const formationStamp = stampit()
  .refs({

    /**
     * The element DOM attribute key which specifies whether a form is managed
     * by Formation (1) or not (0).
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.formation}
     * @default     data-formation
     */
    formationDataAttrKey : 'data-formation',

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {Formation.eventEmitter}
     * @memberOf    {Formation.formation}
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
     * @memberOf    {Formation.formation}
     * @mixes       {Formation.formation}
     *
     * @returns     {Formation.formation}    this            Return the instance of the generated object so we can chain methods.
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
     * @memberOf    {Formation.formation}
     * @mixes       {Formation.formation}
     *
     * @returns     {Formation.formation}    this            Return the instance of the generated object so we can chain methods.
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
     * @memberOf    {Formation.formation}
     * @mixes       {Formation.formation}
     *
     * @param       {jQuery}                  $form         The jQuery extended `form` element to be initialized. Required.
     *
     * @returns     {Formation.formation}     this
     */
    initForm($form) {
      try {
        // Set up the Form but only if it has the proper DOM.
        let formationComponent = this.createFormationComponent();
        const $singleForm = $form.eq(0);

        formationComponent.initForm($singleForm);
        formationComponent.initFormEvents();

        if (! this.get$forms().has($form.get(0))) {
          this.get$forms().add($singleForm);
        }
      }
      catch (exception) {
        this.error(exception);
      }

      return this;
    },

    /**
     * Simple factory function to create a new `Formation.formEventsHandler`
     * instance - this is purely for ease of unit testing.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     * @mixes       {Formation.formation}
     *
     * @returns     {Formation.formEventsHandler}
     */
    createFormationComponent() {
      return formEventsHandlerStamp({
        formationSelector: this.getFormationSelector(),
        nodeEvents : this.nodeEvents
      }).initLogging(this.getLogConsole());
    },

    /**
     * Simple factory function to create a new `Formation.formEventsHandler`
     * instance - this is purely for ease of unit testing.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     * @mixes       {Formation.formation}
     *
     * @returns     {Formation.rule}
     */
    createFormationRule(name, callback) {
      return ruleStamp({name: name, callback: callback});
    },

    /**
     * Construct a CSS selector used to find Formation forms.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     * @mixes       {Formation.formation}
     *
     * @returns     {String}
     */
    getFormationSelector() {
      return `[${this.formationDataAttrKey}="1"]`;
    },

    /**
     * Attempt to register the `ruleName` rule with each form's formComponent.
     * Handle when things go wrong. Adds a new `document.ready` method so it
     * happens after initialization.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     * @mixes       {Formation.formation}
     *
     * @param       {String}      elementType             The type of element to which this rule applies. Required.
     * @param       {String}      ruleName                The name of the rule to be registered. Required.
     * @param       {Function}    ruleCallbackMethod      The callback method to be run when the rule is checked. Required.
     *
     * @returns     {Formation.formation}    this
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

      // Add the new DOMREADY event.
      $(document).ready(() => {
        this.get$forms().each((index, form) => {
          const $form = $(form);
          const rule = this.createFormationRule(ruleName, ruleCallbackMethod);
          this.getFormComponentOfCurrentElement($form).registerRule(elementType, rule);
        });
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
     * @memberOf    {Formation.formation}
     * @default     false
     */
    let debug = false;

    /**
     * Return the value of the private `debug` flag.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     *
     * @returns     {Boolean}        debug           Flag indicating whether we're turning debug on or off.
     */
    this.getDebug = () => {
      return debug;
    };

    /**
     * Set the private `debug` flag on the Formation object.
     *
     * @throws      TypeError                         if the `newVal` param is not a boolean.
     * @access      public
     * @memberOf    {Formation.formation}
     *
     * @param       {Boolean}               newVal          Flag indicating whether we're turning debug on or off. Required.
     *
     * @returns     {Formation.formation}   this            Return the instance of the generated object so we can chain methods.
     */
    this.setDebug = (newVal) => {
      const callStackCurrent = 'Formation.formation.setDebug';
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
     * @memberOf    {Formation.formation}
     * @default     $()
     */
    let __$forms = $();

    /**
     * Return the value of the private `__$forms` object.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     *
     * @returns     {jQuery}        __$forms           A set of jQuery extended `form` elements to be managed by Formation.
     */
    this.get$forms = () => {
      return __$forms;
    };

    /**
     * Find all the `form` elements in the DOM that are to be managed/validated by Formation, and set the private
     * `$forms` property.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     *
     * @returns     {Formation.formation}  this            Return the instance of the generated object so we can chain methods.
     */
    this.detectForms = () => {
      __$forms = $('form').filter(this.formFilter);

      // So we can chain methods.
      return this;
    };

    /**
     * Helper function to filter a jQuery set to return only forms to be managed
     * by Formation.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     *
     * @param       {int}           index         The index of the element in the jQuery set.
     * @param       {jQuery}        element       The DOM element to check.
     *
     * @returns     {Boolean}
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
     * @memberOf    {Formation.formation}
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
     * @memberOf    {Formation.formation}
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
     * @memberOf    {Formation.formation}
     * @default     null
     */
    let __bodyEventsHandler = null;

    /**
     * Add the default event handlers for the `body` element, iff that has not already taken place.
     *
     * @access      public
     * @memberOf    {Formation.formation}
     *
     * @param       {Formation.bodyEventsHandler}     bodyEventsHandler     Object which is composed of a `bodyEventsHandlerStamp`. Required.
     *
     * @returns     {Formation.formation}
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
     * @memberOf    {Formation.formation}
     *
     * @returns     {Formation.formation}
     */
    this.initForms = () => {
      // Set up the individual forms.
      __$forms.each((index, form) => {
        let $form = $(form);

        this.initForm($form);
      });

      return this;
    };
  });

const formationLoggerStamp = formationStamp.compose(domNavigationStamp, consoleLoggerStamp);

module.exports = formationLoggerStamp;
