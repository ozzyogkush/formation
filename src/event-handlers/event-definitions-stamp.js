'use strict';

const stampit = require('stampit');

const eventDefinitionsStamp = stampit()
  .init(function() {

    /**
     * Flag indicating whether the object's event handlers have been added.
     *
     * @access      private
     * @type        Boolean
     * @memberOf    {eventDefinitionsStamp}
     * @default     false
     */
    let __eventsInitialized = false;

    /**
     * Return the value of the private `__eventsInitialized` flag.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
     *
     * @returns     {Boolean}        __eventsInitialized        Flag indicating whether the event handlers have been added.
     */
    this.getEventsInitialized = () => {
      return __eventsInitialized;
    };

    /**
     * Set the private `__eventsInitialized` flag on the object.
     *
     * @throws      TypeError                               if the `newVal` param is not a boolean.
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
     *
     * @param       {Boolean}                   newVal      Flag indicating whether the form's event handlers have been added. Required.
     *
     * @returns     {eventDefinitionsStamp}     this        Return the instance of the generated object so we can chain methods.
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __checkFormValidityEventName = 'check-form-validity.formation';

    /**
     * Returns the private `__checkFormValidityEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __changeEventName = 'change.formation';

    /**
     * Returns the private `__changeEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __keyPressEventName = 'keypress.formation';

    /**
     * Returns the private `__keyPressEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __keyUpEventName = 'keyup.formation';

    /**
     * Returns the private `__keyUpEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __focusEventName = 'focus.formation';

    /**
     * Returns the private `__focusEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __blurEventName = 'blur.formation';

    /**
     * Returns the private `__blurEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __mouseEnterEventName = 'mouseenter.formation';

    /**
     * Returns the private `__mouseEnterEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __mouseLeaveEventName = 'mouseleave.formation';

    /**
     * Returns the private `__mouseLeaveEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __touchStartEventName = 'touchstart.formation';

    /**
     * Returns the private `__touchStartEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __validationEventName = 'validation-handler.formation';

    /**
     * Returns the private `__validationEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __setValidationFlagEventName = 'set-validation-flag.formation';

    /**
     * Returns the private `__setValidationFlagEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
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
     * @memberOf    {eventDefinitionsStamp}
     */
    const __validityChangedEventName = 'validity-changed.formation';

    /**
     * Returns the private `__validityChangedEventName` property.
     *
     * @access      public
     * @memberOf    {eventDefinitionsStamp}
     *
     * @returns     {String}      __validityChangedEventName     The private `__validityChangedEventName` property.
     */
    this.getValidityChangedEventName = () => {
      return __validityChangedEventName;
    };
  });

module.exports = eventDefinitionsStamp;
