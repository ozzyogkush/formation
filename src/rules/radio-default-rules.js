'use strict';

const ruleStamp = require('./rule');
const ruleSetStamp = require('./rule-set');

const stampit = require('stampit');

/**
 * Used for processing a set of `Formation.rule` objects against `input:radio` elements.
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.radioDefaultRules
 * @mixin         Formation.radioDefaultRules
 *
 * @mixes         Formation.ruleSet
 */
const radioDefaultRulesStamp = stampit()
  .methods({

    /**
     * The default radio button elements rule is that at least one of them is checked.
     *
     * @access      public
     * @memberOf    {Formation.radioDefaultRules}
     * @mixes       {Formation.radioDefaultRules}
     *
     * @param       {jQuery}        $radio          The `radio` element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvDefault($radio, attribute) {
      const $checkedRadios = this
        .getAllCheckboxesOrRadiosByName($radio)
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
     * @type        Array
     * @memberOf    {Formation.radioDefaultRules}
     */
    let __rules = [
      ruleStamp({
        name : 'default',
        callback : ($radio, attribute) => this.dataFvDefault($radio, attribute)
      })
    ];

    /**
     * Return the value of the private `__rules` object.
     *
     * @access      public
     * @memberOf    {Formation.radioDefaultRules}
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
     * An ancestor element holds attributes for Radio buttons.
     *
     * @access      public
     * @memberOf    {Formation.radioDefaultRules}
     *
     * @param       {jQuery}    $element      The element to check. Required.
     *
     * @returns     {jQuery}
     */
    this.getAttributeOwner = ($element) => {
      return this.getCheckboxOrRadioContainer($element);
    };
  });

module.exports = ruleSetStamp.compose(radioDefaultRulesStamp);
