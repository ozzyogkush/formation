'use strict';

const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');
const eventDefinitionsStamp = require('../event-handlers/event-definitions-stamp');

const stampit = require('stampit');

/**
 * Provides an interface for form button elements (`button`, `input:submit`, etc).
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.buttonComponent
 * @mixin         Formation.buttonComponent
 *
 * @mixes         Formation.toggleableConsole
 * @mixes         Formation.domNavigation
 * @mixes         Formation.eventDefinitions
 */
const buttonComponentStamp = stampit()
  .refs({

    /**
     * The jQuery `button` (or `input` equivalent) this component will manage.
     *
     * @access      public
     * @type        {jQuery}
     * @memberOf    {Formation.buttonComponent}
     * @default     null
     */
    $button : null,

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {Formation.eventEmitter}
     * @memberOf    {Formation.buttonComponent}
     * @default     null
     */
    nodeEvents : null,

    /**
     * The message that will be shown when this is in a `loading` state.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.buttonComponent}
     * @default     loading
     */
    loadingText : 'loading',

    /**
     * The element attribute in which we store the final `loading` state HTML.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.buttonComponent}
     * @default     data-loading-text
     */
    loadingTextDataKey : 'data-loading-text'
  })
  .methods({

    /**
     * Check whether the `$button` represents a non-empty jQuery object.
     *
     * @access      public
     * @memberOf    {Formation.buttonComponent}
     * @mixes       {Formation.buttonComponent}
     *
     * @returns     {Boolean}
     */
    exists() {
      return (this.$button !== null && this.$button.length > 0);
    },

    /**
     * Check whether the `$button` is currently in a 'submitting' state.
     *
     * @access      public
     * @memberOf    {Formation.buttonComponent}
     * @mixes       {Formation.buttonComponent}
     *
     * @returns     {Boolean}       isSubmitting
     */
    isSubmitting() {
      const isSubmitting = (
        this.exists() &&
        this.$button.attr(this.submittingStateDataKey) !== undefined &&
        parseInt(this.$button.attr(this.submittingStateDataKey)) === 1
      );

      return isSubmitting;
    },

    /**
     * Will enable or disable the `$button` based on the `enable` param.
     *
     * @access      public
     * @memberOf    {Formation.buttonComponent}
     * @mixes       {Formation.buttonComponent}
     *
     * @param       {Boolean}       enable          Whether to enable (true) or disable (false) the `$button`. Required.
     *
     * @returns     {Formation.buttonComponent}
     */
    setEnabled(enable) {
      this.enableOrDisableElement(this.$button, enable);

      return this;
    },

    /**
     * Will set the `$button` to a `submitting` state or undo it depending on
     * the `submitting` param.
     *
     * @access      public
     * @memberOf    {Formation.buttonComponent}
     * @mixes       {Formation.buttonComponent}
     *
     * @param       {Boolean}       submitting      Whether to set the `$button` to a submitting state (true) or not (false). Required.
     *
     * @returns     {Formation.buttonComponent}
     */
    setSubmitting(submitting) {
      // TODO - the `button()` calls will throw an error until we get Bootstrap into the mix.
      if (submitting) {
        this.$button.attr(this.submittingStateDataKey, 1).button('loading');
      }
      else {
        this.$button.removeAttr(this.submittingStateDataKey).button('reset');
      }

      return this;
    },

    /**
     * Add a node event that will listen for a form submit event and handle it.
     *
     * @access      public
     * @memberOf    {Formation.buttonComponent}
     * @mixes       {Formation.buttonComponent}
     *
     * @returns     {Formation.buttonComponent}
     */
    addHandleFormSubmitListener() {
      this.nodeEvents.on(this.nodeEvents.getNodeFormSubmitEvent(), (event) => this.handleFormSubmitEvent(event));

      return this;
    },

    /**
     * Disable the `button` element, indicate that it is submitting, and trigger
     * its `blur` event so the user can't accidentally trigger form submission
     * again with an enter or spacebar keypress.
     *
     * @access      public
     * @memberOf    {Formation.buttonComponent}
     * @mixes       {Formation.buttonComponent}
     *
     * @param       {jQuery.Event}        event       jQuery `submit` event object. Required.
     */
    handleFormSubmitEvent(event) {
      this.log('handleFormSubmitEvent() called for ' + this.$button.selector);
      if (this.exists()) {
        this.setEnabled(false).setSubmitting(true);

        this.$button.trigger(this.getBlurEventName());
      }
    }
  })
  .init(function() {

    /**
     * HTML that will be dynamically added to the element as part of
     * what we show the user in the the button when it is submitting.
     *
     * @private
     * @access      private
     * @type        {String}
     * @memberOf    {Formation.buttonComponent}
     * @default     null
     */
    let __continueButtonSpinnerHTML = '<span class="glyphicon glyphicon-repeat spinning"></span>';

    /**
     * Generates loading text with spinner HTML and returns it.
     *
     * @private
     * @access      private
     * @type        {Function}
     * @memberOf    {Formation.buttonComponent}
     */
    let getButtonLoadingTextWithSpinnerHTML = () => {
      return `${__continueButtonSpinnerHTML} ${this.loadingText}`;
    };

    /**
     * Set the value of the loading text attribute to the constructed value.
     *
     * @access      public
     * @memberOf    {Formation.buttonComponent}
     *
     * @returns     {Formation.buttonComponent}
     */
    this.setLoadingHTML = () => {
      this.$button.attr(this.loadingTextDataKey, getButtonLoadingTextWithSpinnerHTML());

      return this;
    };
  });

module.exports = buttonComponentStamp.compose(
  consoleLoggerStamp,
  domNavigationStamp,
  eventDefinitionsStamp
);
