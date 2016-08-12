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
     *
     * @param       {jQuery}        $radio          The `radio` element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvDefault($radio, attribute) {
      const $checkedRadios = this
        .getAllCheckboxesOrRadiosByName($radio.attr('name'))
        .filter(':checked');

      return $checkedRadios.length == 1;
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
     */
    const __rules = [
      ruleStamp({
        name : 'default',
        callback : ($radio, attribute) => this.dataFvDefault($radio, attribute)
      })
    ];

    /**
     * Return the value of the private `__rules` object.
     *
     * @access      public
     * @memberOf    {radioDefaultRulesStamp}
     *
     * @returns     {Array}     __rules     The default rules we've defined.
     */
    this.getRules = () => {
      return __rules;
    };
  });

module.exports = ruleSetStamp.compose(radioDefaultRulesStamp);
