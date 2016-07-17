'use strict';

const consoleLoggerStamp = require('../logging/console');
const stampit = require('stampit');
const $ = require('jquery');
const keyCodes = require('../utilities/key-code-set');

const bodyEventsHandlerStamp = stampit()
  .refs({

    /**
     * The jQuery extended `body` element.
     *
     * @access      public
     * @type        {jQuery}
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     * @default     null
     */
    $body : null,

    /**
     * The selector used to find a Formation `form`.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     * @default     null
     */
    formationSelector : null,

    /**
     * The data key used to to store a FormationForm object on the `form` object.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     * @default     formation-form
     */
    formationDataKey : 'formation-form',

    /**
     * The `keypress` event name specific to Formation.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     * @default     keypress.formation
     */
    keyPressEventName : 'keypress.formation',

    /**
     * The `keyup` event name specific to Formation.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     * @default     keyup.formation
     */
    keyUpEventName : 'keyup.formation'
  })
  .methods({

    /**
     * Adds a default event handler for both the `keypress` and `keyup` events
     * and sets the initialized flag to be `true`.
     *
     * @access      public
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns     {bodyEventsHandlerStamp}
     */
    addDefaultEventHandlers() {
      this.$body
        .on(this.keyPressEventName, (event) => this.bodyKeyPressHandler(event))
        .on(this.keyUpEventName, (event) => this.bodyKeyUpHandler(event));

      this.setBodyEventsInitialized(true);

      return this;
    },

    /**
     * When the user presses the ENTER key inside an `input` element of a Formation `form`,
     * return whether the `form` should allow the body key press event to progress.
     *
     * The `this` object is expected to refer to an instance of this class.
     *
     * @access      public
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
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
        let $currentForm = $target.closest(this.formationSelector);
        if ($currentForm.length) {
          let formationForm = $currentForm.data(this.formationDataKey);
          allowKeyEventToProgress = (
            typeof formationForm.shouldBodyKeyPressEventsProgress === 'function' &&
            formationForm.shouldBodyKeyPressEventsProgress()
          );
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
     * @since       0.1.0
     *
     * @param       {Event}       event       jQuery `keyup` event object. Required.
     */
    bodyKeyUpHandler(event) {
      if ($.inArray(event.which, [keyCodes.ENTER, keyCodes.SPACE]) === -1) {
        return false;
      }
      let $target = $(event.target);
      if ($target.closest(this.formationSelector).length) {
        if ($target.hasClass('btn-checkbox') || $target.hasClass('btn-radio')) {
          $target.trigger('click');
        }
      }
    }
  })
  .init(function() {

    /**
     * Flag indicating whether the body event handlers have been added.
     *
     * @access      private
     * @type        Boolean
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     * @default     false
     */
    let __bodyEventsInitialized = false;

    /**
     * Return the value of the private `__bodyEventsInitialized` flag.
     *
     * @access      public
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     *
     * @returns    {Boolean}        __bodyEventsInitialized           Flag indicating whether the body event handlers have been added.
     */
    this.getBodyEventsInitialized = () => {
      return __bodyEventsInitialized;
    };

    /**
     * Set the private `__bodyEventsInitialized` flag on the object.
     *
     * @throws      TypeError                               if the `newVal` param is not a boolean.
     * @access      public
     * @memberOf    {bodyEventsHandlerStamp}
     * @since       0.1.0
     *
     * @param       {Boolean}                   newVal      Flag indicating whether the body event handlers have been added. Required.
     *
     * @returns     {bodyEventsHandlerStamp}    this        Return the instance of the generated object so we can chain methods.
     */
    this.setBodyEventsInitialized = (newVal) => {
      const callStackCurrent = 'bodyEventsHandlerStamp.setBodyEventsInitialized';
      if (typeof newVal !== 'boolean') {
        throw new TypeError(callStackCurrent + '() - Expected `newVal` param to be a Boolean, but is `' + typeof(newVal) + '`.');
      }

      __bodyEventsInitialized = newVal;

      // So we can chain methods.
      return this;
    };
  });

module.exports = bodyEventsHandlerStamp.compose(consoleLoggerStamp);
