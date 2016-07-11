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
 */
const formationStamp = stampit()
  .refs({

    /**
     * A set of jQuery extended `form` elements.
     *
     * @access      public
     * @type        jQuery
     * @memberOf    {formationStamp}
     * @since       0.1.0
     * @default     $()
     */
    $forms : $()
  })
  .methods({

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

      // So we can chain methods.
      return this;
    };
  });

const formationLoggerStamp = stampit().compose(formationStamp, consoleLoggerStamp);

module.exports = formationLoggerStamp;
