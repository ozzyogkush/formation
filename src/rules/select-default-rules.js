'use strict';

const ruleStamp = require('./rule');
const ruleSetStamp = require('./rule-set');

const stampit = require('stampit');

/**
 * Used for processing a set of `Formation.rule` objects against `select` elements.
 *
 * @copyright     Copyright (c) 2016 - 2018, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.selectDefaultRules
 * @mixin         Formation.selectDefaultRules
 *
 * @mixes         Formation.ruleSet
 */
const selectDefaultRulesStamp = stampit()
  .methods({

    /**
     * The default `select` elements rule is that it's trimmed value
     * must not be empty.
     *
     * @access      public
     * @memberOf    {Formation.selectDefaultRules}
     * @mixes       {Formation.selectDefaultRules}
     *
     * @param       {Element}       element         The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvDefault(element, attribute) {
      return element.value.trim() !== '';
    }
  })
  .init(function() {

    /**
     * The default, pre-defined rules Formation will check during validation
     * of text-based input elements.
     *
     * @private
     * @access      private
     * @type        Array
     * @memberOf    {Formation.selectDefaultRules}
     */
    let __rules = [
      ruleStamp({
        name : 'default',
        callback : (element, attribute) => this.dataFvDefault(element, attribute)
      })
    ];

    /**
     * Return the value of the private `__rules` object.
     *
     * @access      public
     * @memberOf    {Formation.selectDefaultRules}
     *
     * @returns     {Array}     __rules     The default rules we've defined.
     */
    this.getRules = () => __rules;
  });

module.exports = ruleSetStamp.compose(selectDefaultRulesStamp);
