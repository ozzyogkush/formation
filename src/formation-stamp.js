'use strict';

const bodyEventsHandlerStamp = require('./event-handlers/body-events-handler');
const consoleLoggerStamp = require('./logging/console');
const formComponentStamp = require('./components/form');

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
    formationDataAttrKey : 'data-formation'
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
     * @returns     this            Return the instance of the generated object so we can chain methods.
     */
    readyDocument() {
      // TODO - refactor setDebug() to emit an event instead that this object listens to in order to call setLogConsole()!
      this.setLogConsole(this.getDebug());

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
     * @returns     this            Return the instance of the generated object so we can chain methods.
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
        formationSelector: this.getFormationSelector()
      });
      this.initBodyEvents(bodyEventsHandler);
      this.initForms();

      return this;
    },

    getFormationSelector() {
      return `[${this.formationDataAttrKey}="1"]`;
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
     * @returns    {jQuery}        $forms           A set of jQuery extended `form` elements to be managed by Formation.
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
     * @returns     {formationStamp}
     */
    this.initBodyEvents = (bodyEventsHandler) => {
      this.log('Initializing body events...');

      __bodyEventsHandler = bodyEventsHandler;
      __bodyEventsHandler.setLogConsole(this.getLogConsole());

      if (__bodyEventsHandler.getBodyEventsInitialized()) {
        this.info('Body events previously initialized, skipping.');
        return this;
      }

      // The events have not yet been added, so do so now.
      __bodyEventsHandler.addDefaultEventHandlers();

      return this;
    };

    this.initForms = () => {
      // Set up the individual forms.
      $forms.each((index, form) => {
        try {
          let $form = $(form);
          // Set up the Form but only if it has the proper DOM.
          let formationComponent = formComponentStamp({
            formationSelector: this.getFormationSelector()
          }).setLogConsole(this.getLogConsole());

          formationComponent.initForm($form);
        }
        catch (exception) {
          this.error(exception);
        }
      });

      return this;
    };
  });

const formationLoggerStamp = formationStamp.compose(consoleLoggerStamp);

module.exports = formationLoggerStamp;
