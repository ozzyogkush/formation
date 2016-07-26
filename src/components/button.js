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
    exists() {
      return (this.$button !== null && this.$button.length > 0);
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
        this.$button
          .prop('disabled', 'disabled')
          .addClass('disabled')
          .attr('data-submitting', 1)
          .button('loading') // TODO - this will throw an error until we get Bootstrap into the mix
          .trigger(this.getBlurEventName());
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
