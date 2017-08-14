'use strict';

const stampit = require('stampit');

/**
 * Provides an interface for defining Formation DOM events. 
 *
 * @copyright     Copyright (c) 2016 - 2017, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.eventDefinitions
 * @mixin         Formation.eventDefinitions
 */
const eventDefinitionsStamp = stampit()
  .init(function() {

    /**
     * Flag indicating whether the object's event handlers have been added.
     *
     * @access      private
     * @type        Boolean
     * @memberOf    {Formation.eventDefinitions}
     * @default     false
     */
    let __eventsInitialized = false;

    /**
     * Return the value of the private `__eventsInitialized` flag.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {Boolean}                         __eventsInitialized        Flag indicating whether the event handlers have been added.
     */
    this.getEventsInitialized = () => {
      return __eventsInitialized;
    };

    /**
     * Set the private `__eventsInitialized` flag on the object.
     *
     * @throws      TypeError                                     if the `newVal` param is not a boolean.
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @param       {Boolean}                         newVal      Flag indicating whether the form's event handlers have been added. Required.
     *
     * @returns     {Formation.eventDefinitions}      this        Return the instance of the generated object so we can chain methods.
     */
    this.setEventsInitialized = (newVal) => {
      const callStackCurrent = 'eventDefinitionsStamp.setEventsInitialized';
      if (typeof newVal !== 'boolean') {
        throw new TypeError(callStackCurrent + '() - Expected `newVal` param to be a Boolean, but is `' + typeof(newVal) + '`.');
      }

      __eventsInitialized = newVal;

      // So we can chain methods.
      return this;
    };

    /**
     * The event name for checking validation of the entire `form`.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __checkFormValidityEventName = 'check-form-validity';

    /**
     * Returns the private `__checkFormValidityEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __checkFormValidityEventName      The private `__checkFormValidityEventName` property.
     */
    this.getCheckFormValidityEventName = () => {
      return __checkFormValidityEventName;
    };

    /**
     * Element 'onchange' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __changeEventName = 'change';

    /**
     * Returns the private `__changeEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __changeEventName       The private `__changeEventName` property.
     */
    this.getChangeEventName = () => {
      return __changeEventName;
    };

    /**
     * The `keypress` event name specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __keyPressEventName = 'keypress';

    /**
     * Returns the private `__keyPressEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __keyPressEventName       The private `__keyPressEventName` property.
     */
    this.getKeyPressEventName = () => {
      return __keyPressEventName;
    };

    /**
     * Element 'onkeyup' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __keyUpEventName = 'keyup';

    /**
     * Returns the private `__keyUpEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __keyUpEventName        The private `__keyUpEventName` property.
     */
    this.getKeyUpEventName = () => {
      return __keyUpEventName;
    };

    /**
     * Element 'onfocus' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __focusEventName = 'focus';

    /**
     * Returns the private `__focusEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __focusEventName        The private `__focusEventName` property.
     */
    this.getFocusEventName = () => {
      return __focusEventName;
    };

    /**
     * Element 'onblur' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __blurEventName = 'blur';

    /**
     * Returns the private `__blurEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __blurEventName       The private `__blurEventName` property.
     */
    this.getBlurEventName = () => {
      return __blurEventName;
    };

    /**
     * Element 'onmouseenter' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __mouseEnterEventName = 'mouseenter';

    /**
     * Returns the private `__mouseEnterEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __mouseEnterEventName       The private `__mouseEnterEventName` property.
     */
    this.getMouseEnterEventName = () => {
      return __mouseEnterEventName;
    };

    /**
     * Element 'onmouseleave' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __mouseLeaveEventName = 'mouseleave';

    /**
     * Returns the private `__mouseLeaveEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __mouseLeaveEventName       The private `__mouseLeaveEventName` property.
     */
    this.getMouseLeaveEventName = () => {
      return __mouseLeaveEventName;
    };

    /**
     * Element 'ontouchstart' events specific to Formation.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __touchStartEventName = 'touchstart';

    /**
     * Returns the private `__touchStartEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __touchStartEventName         The private `__touchStartEventName` property.
     */
    this.getTouchStartEventName = () => {
      return __touchStartEventName;
    };

    /**
     * All input events get a handler which can handle this event, which is
     * for triggering validation checking on the target element.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __validationEventName = 'validation-handler';

    /**
     * Returns the private `__validationEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __validationEventName     The private `__validationEventName` property.
     */
    this.getValidationEventName = () => {
      return __validationEventName;
    };

    /**
     * All input events get a handler which can handle this event, which is
     * for setting the flag on the target element indicating whether it is valid.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __setValidationFlagEventName = 'set-validation-flag';

    /**
     * Returns the private `__setValidationFlagEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __setValidationFlagEventName      The private `__setValidationFlagEventName` property.
     */
    this.getSetValidationFlagEventName = () => {
      return __setValidationFlagEventName;
    };

    /**
     * Event specifying when the validity flag for an element has changed.
     *
     * @private
     * @access      private
     * @const
     * @type        {String}
     * @memberOf    {Formation.eventDefinitions}
     */
    const __validityChangedEventName = 'validity-changed';

    /**
     * Returns the private `__validityChangedEventName` property.
     *
     * @access      public
     * @memberOf    {Formation.eventDefinitions}
     *
     * @returns     {String}      __validityChangedEventName     The private `__validityChangedEventName` property.
     */
    this.getValidityChangedEventName = () => {
      return __validityChangedEventName;
    };
  });

module.exports = eventDefinitionsStamp;
