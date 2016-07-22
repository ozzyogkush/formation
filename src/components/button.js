'use strict';

const domNavigationStamp = require('../utilities/dom-navigation');
const stampit = require('stampit');

const buttonComponentStamp = stampit()
  .refs({
    $button : null,
    loadingText : 'loading',
    loadingTextDataKey : 'data-loading-text'
  })
  .methods({
    exists() {
      return (this.$button !== null && this.$button.length > 0);
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

module.exports = buttonComponentStamp.compose(domNavigationStamp);
