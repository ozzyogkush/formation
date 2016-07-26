'use strict';

const eventEmitterStamp = require('../utilities/node-event-emitter-stamp');

let stampit = require('stampit');

// A wrapper for the `console` log functions that takes into account a flag that can
// be set based on any arbitrary reason (e.g. environment, existence of a module, etc).
// TODO: refactor methods() to do a loop over a set of method names to wrap (DRY it up).
const toggleableConsoleStamp = stampit()
  .refs({
    console: console,

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {eventEmitterStamp}
     * @memberOf    {toggleableConsoleStamp}
     * @since       0.1.0
     * @default     null
     */
    nodeEvents : null
  })
  .methods({
    error(message) {
      if (this.getLogConsole()) {
        this.console.error(message);
      }
    },
    info(message) {
      if (this.getLogConsole()) {
        this.console.info(message);
      }
    },
    log(message) {
      if (this.getLogConsole()) {
        this.console.log(message);
      }
    },
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
     * @memberOf    {toggleableConsoleStamp}
     * @since       0.1.0
     * @default     false
     */
    let logConsole = false;

    /**
     * Return the value of the private `logConsole` flag.
     *
     * @access      public
     * @memberOf    {toggleableConsoleStamp}
     * @since       0.1.0
     *
     * @returns    {Boolean}        debug           Flag indicating whether we're using the console logging methods.
     */
    this.getLogConsole = () => {
      return logConsole;
    };

    /**
     * Set the private `logConsole` flag on the Formation object.
     *
     * @throws      TypeError                               if the `newVal` param is not a boolean.
     * @access      public
     * @memberOf    {toggleableConsoleStamp}
     * @since       0.1.0
     *
     * @param       {Boolean}                   newVal      Flag indicating whether we're turning console logging on or off. Required.
     *
     * @returns     {toggleableConsoleStamp}    this        Return the instance of the generated object so we can chain methods.
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
     * @memberOf    {toggleableConsoleStamp}
     * @since       0.1.0
     *
     * @param       {Boolean}                   initial     Initial console logging flag. Required.
     *
     * @returns     {toggleableConsoleStamp}    this        Return the instance of the generated object so we can chain methods.
     */
    this.initLogging = (initial) => {
      this.setLogConsole(initial);
      this.nodeEvents.on(this.nodeEvents.getNodeSetDebugEvent(), this.setLogConsole);

      return this;
    };
  });

module.exports = toggleableConsoleStamp;
