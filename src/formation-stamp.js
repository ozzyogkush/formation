'use strict';

const consoleLoggerStamp = require('./logging/console.js');
const stampit = require('stampit');
const $ = require('jquery');
const jQuery = $;

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

      const $forms = this.get$forms();
      if ($forms.length === 0) {
        this.info('No Formation forms present, exiting.');
        return this;
      }

      this.initBodyEvents();
      this.initForms();

      return this;
    },

    initBodyEvents() {

    },

    initForms() {

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
     * @param {int} index     The index of the element in the jQuery set.
     * @param {jQuery}  element   The DOM element to check.
     *
     * @returns {boolean}
     */
    this.formFilter = (index, element) => {
      let $element = $(element);
      return (
        $element.prop('tagName').toLowerCase() == 'form' &&
        $element.attr('data-formation') !== undefined &&
        parseInt($element.attr('data-formation')) == 1
      );
    };
  });

const formationLoggerStamp = stampit().compose(formationStamp, consoleLoggerStamp);

module.exports = formationLoggerStamp;
