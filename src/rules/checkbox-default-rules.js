'use strict';

const ruleStamp = require('./rule');
const ruleSetStamp = require('./rule-set');

const stampit = require('stampit');
const $ = require('jquery');

const checkboxDefaultRulesStamp = stampit()
  .methods({

    /**
     * The default checkbox button elements rule is that at least one of them is checked.
     *
     * @access      public
     * @memberOf    {checkboxDefaultRulesStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvDefault($checkbox, attribute) {
      const $checkedCheckboxes = this
        .getAllCheckboxesOrRadiosByName($checkbox.attr('name'))
        .filter(':checked');

      return $checkedCheckboxes.length >= 1;
    },

    /**
     * The default checkbox button elements rule is that at least one of them is checked.
     *
     * @access      public
     * @memberOf    {checkboxDefaultRulesStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvMinSelected($checkbox, attribute) {
      const minSelected = parseInt($checkbox.attr(attribute));
      const $checkedCheckboxes = this
        .getAllCheckboxesOrRadiosByName($checkbox.attr('name'))
        .filter(':checked');

      return isNaN(minSelected) || $checkedCheckboxes.length >= minSelected;
    },

    /**
     * Passes when the number of checked checkboxes is less than or equal to
     * the number specified in the attribute.
     *
     * @access      public
     * @memberOf    {checkboxDefaultRulesStamp}
     * @since       0.1.0
     *
     * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvMaxSelected($checkbox, attribute) {
      const maxSelected = parseInt($checkbox.attr(attribute));
      const $checkedCheckboxes = this
        .getAllCheckboxesOrRadiosByName($checkbox.attr('name'))
        .filter(':checked');

      return isNaN(maxSelected) || $checkedCheckboxes.length <= maxSelected;
    }
  })
  .init(function() {

    /**
     * The default, pre-defined rules Formation will check during validation
     * of checkbox button elements.
     *
     * @private
     * @access      private
     * @const
     * @type        Array
     * @memberOf    {checkboxDefaultRulesStamp}
     * @since       0.1.0
     */
    const __rules = [
      ruleStamp({
        name : 'default',
        callback : ($checkbox, attribute) => this.dataFvDefault($checkbox, attribute)
      }),
      ruleStamp({
        name : 'min-selected',
        callback : ($checkbox, attribute) => this.dataFvMinSelected($checkbox, attribute)
      }),
      ruleStamp({
        name : 'max-selected',
        callback : ($checkbox, attribute) => this.dataFvMaxSelected($checkbox, attribute)
      })
    ];

    /**
     * Return the value of the private `__rules` object.
     *
     * @access      public
     * @memberOf    {checkboxDefaultRulesStamp}
     * @since       0.1.0
     *
     * @returns     {Array}     __rules     The default rules we've defined.
     */
    this.getRules = () => {
      return __rules;
    };
  });

module.exports = ruleSetStamp.compose(checkboxDefaultRulesStamp);
