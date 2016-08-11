'use strict';

const ruleStamp = require('./rule');
const ruleSetStamp = require('./rule-set');

const stampit = require('stampit');
const $ = require('jquery');

const selectDefaultRulesStamp = stampit()
  .methods({

    /**
     * The default `select` elements rule is that it's trimmed value
     * must not be empty.
     *
     * @access      public
     * @memberOf    {selectDefaultRulesStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvDefault($element, attribute) {
      return $element.val().trim() !== '';
    }
  })
  .init(function() {

    /**
     * The default, pre-defined rules Formation will check during validation
     * of text-based input elements.
     *
     * @private
     * @access      private
     * @const
     * @type        Array
     * @memberOf    {selectDefaultRulesStamp}
     * @since       0.1.0
     */
    const __rules = [
      ruleStamp({
        name : 'default',
        callback : ($element, attribute) => this.dataFvDefault($element, attribute)
      })
    ];

    /**
     * Return the value of the private `__rules` object.
     *
     * @access      public
     * @memberOf    {selectDefaultRulesStamp}
     * @since       0.1.0
     *
     * @returns     {Array}     __rules     The default rules we've defined.
     */
    this.getRules = () => {
      return __rules;
    };
  });

module.exports = ruleSetStamp.compose(selectDefaultRulesStamp);
