'use strict';

const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');
const eventDefinitionsStamp = require('./event-definitions-stamp');
const stampit = require('stampit');

/**
 * Provide an interface for managing body events.
 *
 * @copyright     Copyright (c) 2016 - 2018, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.bodyEventsHandler
 * @mixin         Formation.bodyEventsHandler
 *
 * @mixes         Formation.toggleableConsole
 * @mixes         Formation.domNavigation
 * @mixes         Formation.eventDefinitions
 */
const bodyEventsHandlerStamp = stampit()
  .refs({

    /**
     * The `body` element.
     *
     * @access      public
     * @type        {Element}
     * @memberOf    {Formation.bodyEventsHandler}
     * @default     null
     */
    body : null,

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {Formation.eventEmitterStamp}
     * @memberOf    {Formation.bodyEventsHandler}
     * @default     null
     */
    nodeEvents : null,
  })
  .methods({

    /**
     * Adds a default event handler the `keyup` events and sets the initialized flag to be `true`.
     *
     * @access      public
     * @memberOf    {Formation.bodyEventsHandler}
     * @mixes       {Formation.bodyEventsHandler}
     *
     * @returns     {Formation.bodyEventsHandler}
     */
    addDefaultEventHandlers() {
      this.body.addEventListener(this.getKeyUpEventName(), event => this.bodyKeyUpHandler(event));

      this.setEventsInitialized(true);

      return this;
    },

    /**
     * If the user presses the ENTER or SPACEBAR keys while a checkbox or radio
     * Bootstrap form label is in focus, this will trigger the `click` event in
     * order to select/deselect the focused form element. This is primarily for
     * labels which visually encompass a hidden checkbox or radio field.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {Formation.bodyEventsHandler}
     * @mixes       {Formation.bodyEventsHandler}
     *
     * @param       {KeyboardEvent}       event       The `keyup` event object. Required.
     */
    bodyKeyUpHandler(event) {
      if (['enter', 'space'].indexOf(event.key) !== -1 &&
          this.elementIsCustomRadioOrCheckboxWidget(event.target)) {
        event.target.click();
      }
    }
  });

module.exports = bodyEventsHandlerStamp.compose(eventDefinitionsStamp, domNavigationStamp, consoleLoggerStamp);
