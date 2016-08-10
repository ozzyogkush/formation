'use strict';

const ruleStamp = require('./rule');
const ruleSetStamp = require('./rule-set');

const stampit = require('stampit');
const $ = require('jquery');

const radioDefaultRulesStamp = stampit()
  .methods({

    /**
     * The default radio button elements rule is that at least one of them is checked.
     *
     * @access      public
     * @memberOf    {radioDefaultRulesStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $radios         The set of `radio` elements upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvDefault($radios, attribute) {
      const $checkedRadios = $radios.filter(':checked');

      return $checkedRadios.length > 0;
    }
  })
  .init(function() {

    /**
     * The default, pre-defined rules Formation will check during validation
     * of radio button elements.
     *
     * @private
     * @access      private
     * @const
     * @type        Array
     * @memberOf    {radioDefaultRulesStamp}
     * @since       0.1.0
     */
    const __rules = [
      ruleStamp({
        name : 'default',
        callback : ($radios, attribute) => this.dataFvDefault($radios, attribute)
      })
    ];

    /**
     * Return the value of the private `__rules` object.
     *
     * @access      public
     * @memberOf    {radioDefaultRulesStamp}
     * @since       0.1.0
     *
     * @returns     {Array}     __rules     The default rules we've defined.
     */
    this.getRules = () => {
      return __rules;
    };
  });

module.exports = ruleSetStamp.compose(radioDefaultRulesStamp);
