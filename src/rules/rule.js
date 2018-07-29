'use strict';

const stampit = require('stampit');

/**
 * Defines a rule, which contains a name used to identify when it's used,
 * and a callback function to process the rule against an element.
 *
 * @copyright     Copyright (c) 2016 - 2018, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.rule
 * @mixin         Formation.rule
 */
const ruleStamp = stampit()
  .refs({

    /**
     * The name of the rule, prefixed with `data-fv`, which will be used to
     * reference it in a DOM element.
     *
     * @access      public
     * @type        {String}
     * @memberOf    {Formation.rule}
     * @default     'undefined
     */
    name : 'undefined'
  }).methods({

    /**
     * The method that will attempt to satisfy the rule against `element`.
     *
     * @throws      Error           The method for the rule is not implemented, so alert the user with an error
     * @access      public
     * @memberOf    {Formation.rule}
     * @mixes       {Formation.rule}
     *
     * @param       {Element}       element         The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    callback(element, attribute) {
      throw new Error(`Rule callback for \`${this.name}\` is not implemented`);
    }
  })
  .init(function() {

    /**
     * Helper function that users of this Stamp can use to determine if an object is composed
     * of this Stamp.
     *
     * @access      public
     * @memberOf    {Formation.rule}
     *
     * @returns     {Boolean}       true
     */
    this.isFormationRule = () => {
      return true;
    };
  });

module.exports = ruleStamp;
