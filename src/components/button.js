'use strict';

const consoleLoggerStamp = require('../logging/console');
const domNavigationStamp = require('../utilities/dom-navigation');
const eventDefinitionsStamp = require('../event-handlers/event-definitions-stamp');

const stampit = require('stampit');

const buttonComponentStamp = stampit()
  .refs({
    $button : null,

    /**
     * A singleton passed along so we have some semblance of
     * a global Formation event emitter.
     *
     * @access      public
     * @type        {eventEmitterStamp}
     * @memberOf    {buttonComponentStamp}
     * @since       0.1.0
     * @default     null
     */
    nodeEvents : null,
    loadingText : 'loading',
    loadingTextDataKey : 'data-loading-text'
  })
  .methods({

    /**
     * Check whether the `$button` represents a non-empty jQuery object.
     *
     * @access      public
     * @memberOf    {buttonComponentStamp}
     * @since       0.1.0
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
     * @memberOf    {buttonComponentStamp}
     * @since       0.1.0
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
     * @memberOf    {buttonComponentStamp}
     * @since       0.1.0
     *
     * @param       {Boolean}       enable          Whether to enable (true) or disable (false) the `$button`. Required.
     *
     * @returns     {buttonComponentStamp}
     */
    setEnabled(enable) {
      if (enable) {
        this.$button.removeProp('disabled').removeClass('disabled');
      }
      else {
        this.$button.prop('disabled', 'disabled').addClass('disabled');
      }

      return this;
    },

    /**
     * Will set the `$button` to a `submitting` state or undo it depending on
     * the `submitting` param.
     *
     * @access      public
     * @memberOf    {buttonComponentStamp}
     * @since       0.1.0
     *
     * @param       {Boolean}       submitting      Whether to set the `$button` to a submitting state (true) or not (false). Required.
     *
     * @returns     {buttonComponentStamp}
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
     * @memberOf    {buttonComponentStamp}
     * @since       0.1.0
     *
     * @param       {Event}       event       jQuery `submit` event object. Required.
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
    let __continueButtonSpinnerHTML = '<span class="glyphicon glyphicon-repeat spinning"></span>';

    let getButtonLoadingTextWithSpinnerHTML = () => {
      return `${__continueButtonSpinnerHTML} ${this.loadingText}`;
    };

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
