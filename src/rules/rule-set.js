'use strict';

const domNavigationStamp = require('../utilities/dom-navigation');
const eventDefinitionsStamp = require('../event-handlers/event-definitions-stamp');
const validityChecksStamp = require('../utilities/validity-checks');

const stampit = require('stampit');

/**
 * Used for processing a set of `Formation.rule` objects against form DOM elements.
 *
 * @copyright     Copyright (c) 2016 - 2018, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.ruleSet
 * @mixin         Formation.ruleSet
 *
 * @mixes         Formation.domNavigation
 * @mixes         Formation.eventDefinitions
 * @mixes         Formation.validityChecks
 */
const ruleSetStamp = stampit()
  .init(function() {

    /**
     * Helper function that users of this Stamp can use to determine if an object is composed
     * of this Stamp.
     *
     * @access      public
     * @memberOf    {Formation.ruleSet}
     *
     * @returns     {Boolean}       true
     */
    this.isFormationRuleSet = () => true;

    /**
     * An empty set of rules by default.
     *
     * @private
     * @access      private
     * @type        Array
     * @memberOf    {Formation.ruleSet}
     */
    let __rules = [];

    /**
     * Add a rule to this rule set.
     *
     * @access      public
     * @memberOf    {Formation.ruleSet}
     *
     * @param       {Formation.rule}      rule        The rule to add to this set. Required.
     *
     * @returns     {Formation.ruleSet}   this
     */
    this.add = rule => {
      // TODO - warn when the rule has already been added to this set
      this.getRules().push(rule);

      return this;
    };

    /**
     * Return an empty array. This method is a stub.
     *
     * @access      public
     * @memberOf    {Formation.ruleSet}
     *
     * @returns     {Array}     __rules       The empty array of rules.
     */
    this.getRules = () => {
      return __rules;
    };

    /**
     * Return the DOM element that the `formation` rule attributes and validity flag
     * will be attached to for the element provided. By default, it is the
     * element itself.
     *
     * @access      public
     * @memberOf    {Formation.ruleSet}
     *
     * @param       {Element}   element         The element to check. Required.
     *
     * @returns     {Element}   element
     */
    this.getAttributeOwner = element => element;

    /**
     * Process the element against the set of registered rules that are actually being
     * requested by the element's `data-fv` attributes. Return true iff the field passes
     * all rules; false otherwise.
     *
     * @access      public
     * @memberOf    {Formation.ruleSet}
     *
     * @param       {Element}   element                 The element upon which to process the rules. Required.
     *
     * @returns     {boolean}   validAfterRuleCheck     Whether the element passes all specified rules.
     */
    this.process = element => {
      let validAfterRuleCheck = true;
      const attributeOwner = this.getAttributeOwner(element);
      if (attributeOwner !== null) {
        for (const rule of this.getRules()) {
          const ruleAttribute = `data-fv-${rule.name}`;
          if (rule.name === 'default' || attributeOwner.hasAttribute(ruleAttribute)) {
            validAfterRuleCheck = rule.callback(element, ruleAttribute);
            if (! validAfterRuleCheck) {
              break;
            }
          }
        }
      }

      return validAfterRuleCheck;
    };
  });

module.exports = ruleSetStamp.compose(
  domNavigationStamp,
  eventDefinitionsStamp,
  validityChecksStamp
);
