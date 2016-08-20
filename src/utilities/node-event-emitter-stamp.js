'use strict';

const stampit = require('stampit');
const EventEmitter = require('events').EventEmitter;

/**
 * Turn a node `EventEmitter` into a Stamp.
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.eventEmitter
 * @mixin         Formation.eventEmitter
 */
const eventEmitterStamp = stampit.convertConstructor(EventEmitter);

/**
 * Provides an interface for defining Formation Node events.
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.eventEmitterEvents
 * @mixin         Formation.eventEmitterEvents
 *
 * @mixes         Formation.eventEmitter
 */
const eventEmitterEventsStamp = stampit()
  .init(function() {

    /**
     * The node event name for turning debug on or off.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventEmitterEvents}
     */
    const __nodeSetDebugEventName = 'formationSetDebug';

    /**
     * Return the value of the private `__nodeSetDebugEventName` flag.
     *
     * @access      public
     * @memberOf    {Formation.eventEmitterEvents}
     *
     * @returns     {String}        __nodeSetDebugEventName
     */
    this.getNodeSetDebugEvent = () => {
      return __nodeSetDebugEventName;
    };

    /**
     * The node event name for when a form is submitted.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventEmitterEvents}
     */
    const __nodeFormSubmitEventName = 'formationFormSubmit';

    /**
     * Return the value of the private `__nodeFormSubmitEventName` flag.
     *
     * @access      public
     * @memberOf    {Formation.eventEmitterEvents}
     *
     * @returns     {String}        __nodeFormSubmitEventName
     */
    this.getNodeFormSubmitEvent = () => {
      return __nodeFormSubmitEventName;
    };
  });

module.exports = eventEmitterEventsStamp.compose(eventEmitterStamp);
