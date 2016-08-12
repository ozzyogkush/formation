'use strict';

const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');
const eventDefinitionsStamp = require('./event-definitions-stamp');
const keyCodes = require('../utilities/key-code-set');
const stampit = require('stampit');
const $ = require('jquery');

const bodyEventsHandlerStamp = stampit()
  .refs({

    /**
     * The jQuery extended `body` element.
     *
     * @access      public
     * @type        {jQuery}
     * @memberOf    {bodyEventsHandlerStamp}
     * @default     null
     */
    $body : null,

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {eventEmitterStamp}
     * @memberOf    {bodyEventsHandlerStamp}
     * @default     null
     */
    nodeEvents : null
  })
  .methods({

    /**
     * Adds a default event handler for both the `keypress` and `keyup` events
     * and sets the initialized flag to be `true`.
     *
     * @access      public
     * @memberOf    {bodyEventsHandlerStamp}
     *
     * @returns     {bodyEventsHandlerStamp}
     */
    addDefaultEventHandlers() {
      this.$body
        .on(this.getKeyPressEventName(), (event) => this.bodyKeyPressHandler(event))
        .on(this.getKeyUpEventName(), (event) => this.bodyKeyUpHandler(event));

      this.setEventsInitialized(true);

      return this;
    },

    /**
     * When the user presses the ENTER key inside an `input` element of a Formation `form`,
     * return whether the `formComponent` should allow the body key press event to progress.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {bodyEventsHandlerStamp}
     *
     * @param       {Event}       event       jQuery `keypress` event object. Required.
     *
     * @returns     {Boolean}     allowKeyEventToProgress
     */
    bodyKeyPressHandler(event) {
      const $target = $(event.target);
      let userPressedEnterInInputField = (
        event.which === keyCodes.ENTER &&
        $target.prop('tagName').toLowerCase() === 'input' &&
        $.inArray($target.prop('type'), ['radio', 'checkbox']) === -1
      );

      let allowKeyEventToProgress = true;

      if (userPressedEnterInInputField) {
        let formComponent = this.getFormComponentOfCurrentElement($target);
        if (formComponent !== null) {
          allowKeyEventToProgress = formComponent.shouldBodyKeyPressEventsProgress();
        }
      }

      return allowKeyEventToProgress;
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
     * @memberOf    {bodyEventsHandlerStamp}
     *
     * @param       {Event}       event       jQuery `keyup` event object. Required.
     */
    bodyKeyUpHandler(event) {
      if ($.inArray(event.which, [keyCodes.ENTER, keyCodes.SPACE]) === -1) {
        return false;
      }
      let $target = $(event.target);
      if (this.elementIsCustomRadioOrCheckboxWidget($target)) {
        $target.trigger('click');
      }
    }
  });

module.exports = bodyEventsHandlerStamp.compose(eventDefinitionsStamp, domNavigationStamp, consoleLoggerStamp);
