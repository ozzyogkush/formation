'use strict';

const domNavigationStamp = require('../utilities/dom-navigation');
const eventDefinitionsStamp = require('../event-handlers/event-definitions-stamp');
const ruleStamp = require('./rule');
const validityChecksStamp = require('../utilities/validity-checks');

const stampit = require('stampit');

const ruleSetStamp = stampit()
  .init(function() {

    /**
     * Helper function that users of this Stamp can use to determine if an object is composed
     * of this Stamp.
     *
     * @access      public
     * @memberOf    {ruleSetStamp}
     * @since       0.1.0
     *
     * @returns     {Boolean}       true
     */
    this.isFormationRuleSet = () => {
      return true;
    };

    /**
     * Add a rule to this rule set.
     *
     * @access      public
     * @memberOf    {ruleSetStamp}
     * @since       0.1.0
     *
     * @param       {ruleStamp}         rule        The rule to add to this set. Required.
     *
     * @returns     {ruleSetStamp}      this
     */
    this.add = (rule) => {
      // TODO - warn when the rule has already been added to this set
      this.getRules().push(rule);

      return this;
    };

    /**
     * Return an empty array. This method is a stub.
     *
     * @access      public
     * @memberOf    {ruleSetStamp}
     * @since       0.1.0
     *
     * @returns     {Array}     An empty array;
     */
    this.getRules = () => {
      return [];
    };
  });

module.exports = ruleSetStamp.compose(
  domNavigationStamp,
  eventDefinitionsStamp,
  validityChecksStamp
);
