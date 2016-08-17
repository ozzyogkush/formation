'use strict';

const ruleStamp = require('./rule');
const ruleSetStamp = require('./rule-set');

const stampit = require('stampit');

/**
 * Used for processing a set of `Formation.rule` objects against `input:checkbox` elements.
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.checkboxDefaultRules
 * @mixin         Formation.checkboxDefaultRules
 *
 * @mixes         Formation.ruleSet
 */
const checkboxDefaultRulesStamp = stampit()
  .methods({

    /**
     * The default checkbox button elements rule is that at least one of them is checked.
     *
     * @access      public
     * @memberOf    {Formation.checkboxDefaultRules}
     * @mixes       {Formation.checkboxDefaultRules}
     *
     * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvDefault($checkbox, attribute) {
      const $checkedCheckboxes = this
        .getAllCheckboxesOrRadiosByName($checkbox)
        .filter(':checked');

      return $checkedCheckboxes.length >= 1;
    },

    /**
     * The default checkbox button elements rule is that at least one of them is checked.
     *
     * @access      public
     * @memberOf    {Formation.checkboxDefaultRules}
     * @mixes       {Formation.checkboxDefaultRules}
     *
     * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvMinSelected($checkbox, attribute) {
      const minSelected = parseInt(this.getAttributeOwner($checkbox).attr(attribute));

      const $checkedCheckboxes = this
        .getAllCheckboxesOrRadiosByName($checkbox)
        .filter(':checked');

      return isNaN(minSelected) || $checkedCheckboxes.length >= minSelected;
    },

    /**
     * Passes when the number of checked checkboxes is less than or equal to
     * the number specified in the attribute.
     *
     * @access      public
     * @memberOf    {Formation.checkboxDefaultRules}
     * @mixes       {Formation.checkboxDefaultRules}
     *
     * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvMaxSelected($checkbox, attribute) {
      const maxSelected = parseInt(this.getAttributeOwner($checkbox).attr(attribute));

      const $checkedCheckboxes = this
        .getAllCheckboxesOrRadiosByName($checkbox)
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
     * @type        Array
     * @memberOf    {Formation.checkboxDefaultRules}
     */
    let __rules = [
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
     * @memberOf    {Formation.checkboxDefaultRules}
     *
     * @returns     {Array}     __rules     The default rules we've defined.
     */
    this.getRules = () => {
      return __rules;
    };

    /**
     * Return the DOM element that the `formation` rule attributes and validity flag
     * will be attached to for the element provided.
     *
     * An ancestor element holds attributes for Checkbox buttons.
     *
     * @access      public
     * @memberOf    {Formation.checkboxDefaultRules}
     *
     * @param       {jQuery}    $element      The element to check. Required.
     *
     * @returns     {jQuery}
     */
    this.getAttributeOwner = ($element) => {
      return this.getCheckboxOrRadioContainer($element);
    };
  });

module.exports = ruleSetStamp.compose(checkboxDefaultRulesStamp);
