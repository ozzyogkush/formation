'use strict';

let stampit = require('stampit');

/**
 * Provides a wrapper for the `console` log functions that takes into account a flag that can
 * be set based on any arbitrary reason (e.g. environment, existence of a module, etc).
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.toggleableConsole
 * @mixin         Formation.toggleableConsole
 */
const toggleableConsoleStamp = stampit()
  .refs({

    /**
     * The original `console` object which we are wrapping.
     *
     * @access      public
     * @type        {Object}
     * @memberOf    {Formation.toggleableConsole}
     * @default     console
     */
    console: console,

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {Formation.eventEmitter}
     * @memberOf    {Formation.toggleableConsole}
     * @default     null
     */
    nodeEvents : null
  })
  .methods({

    /**
     * If console logging is enabled, output an `error` message to the console.
     *
     * @access      public
     * @memberOf    {Formation.toggleableConsole}
     * @mixes       {Formation.toggleableConsole}
     *
     * @param       {*}           message         The message/object/array/whatever to log as an error. Required.
     */
    error(message) {
      if (this.getLogConsole()) {
        this.console.error(message);
      }
    },

    /**
     * If console logging is enabled, output an `info` message to the console.
     *
     * @access      public
     * @memberOf    {Formation.toggleableConsole}
     * @mixes       {Formation.toggleableConsole}
     *
     * @param       {*}           message         The message/object/array/whatever to log as information. Required.
     */
    info(message) {
      if (this.getLogConsole()) {
        this.console.info(message);
      }
    },

    /**
     * If console logging is enabled, output a message to the console.
     *
     * @access      public
     * @memberOf    {Formation.toggleableConsole}
     * @mixes       {Formation.toggleableConsole}
     *
     * @param       {*}           message         The message/object/array/whatever to log as a message. Required.
     */
    log(message) {
      if (this.getLogConsole()) {
        this.console.log(message);
      }
    },

    /**
     * If console logging is enabled, output a `warn` message to the console.
     *
     * @access      public
     * @memberOf    {Formation.toggleableConsole}
     * @mixes       {Formation.toggleableConsole}
     *
     * @param       {*}           message         The message/object/array/whatever to log as a warning. Required.
     */
    warn(message) {
      if (this.getLogConsole()) {
        this.console.warn(message);
      }
    }
  })
  .init(function() {

    /**
     * Flag indicating whether or not to call the wrapped method.
     *
     * @access      private
     * @type        Boolean
     * @memberOf    {Formation.toggleableConsole}
     * @default     false
     */
    let logConsole = false;

    /**
     * Return the value of the private `logConsole` flag.
     *
     * @access      public
     * @memberOf    {Formation.toggleableConsole}
     *
     * @returns     {Boolean}        debug           Flag indicating whether we're using the console logging methods.
     */
    this.getLogConsole = () => {
      return logConsole;
    };

    /**
     * Set the private `logConsole` flag on the Formation object.
     *
     * @throws      TypeError                               if the `newVal` param is not a boolean.
     * @access      public
     * @memberOf    {Formation.toggleableConsole}
     *
     * @param       {Boolean}                         newVal      Flag indicating whether we're turning console logging on or off. Required.
     *
     * @returns     {Formation.toggleableConsole}     this        Return the instance of the generated object so we can chain methods.
     */
    this.setLogConsole = (newVal) => {
      const callStackCurrent = 'toggleableConsoleStamp.setLogConsole';
      if (typeof newVal !== 'boolean') {
        throw new TypeError(callStackCurrent + '() - Expected `newVal` param to be a Boolean, but is `' + typeof(newVal) + '`.');
      }

      logConsole = newVal;

      // So we can chain methods.
      return this;
    };

    /**
     * Helper function that sets initial console logging and listens for an
     * event which can turn it on or off.
     *
     * @access      public
     * @memberOf    {Formation.toggleableConsole}
     *
     * @param       {Boolean}                         initial     Initial console logging flag. Required.
     *
     * @returns     {Formation.toggleableConsole}     this        Return the instance of the generated object so we can chain methods.
     */
    this.initLogging = (initial) => {
      this.setLogConsole(initial);
      this.nodeEvents.on(this.nodeEvents.getNodeSetDebugEvent(), this.setLogConsole);

      return this;
    };
  });

module.exports = toggleableConsoleStamp;
