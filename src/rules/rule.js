'use strict';

const stampit = require('stampit');

const ruleStamp = stampit()
  .refs({
    name : 'undefined',

    /**
     * The method that will attempt to satisfy the rule against `$element`.
     *
     * @throws      Error           The method for the rule is not implemented, so alert the user with an error
     * @access      public
     * @memberOf    {ruleStamp}
     *
     * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    callback : function($element, attribute) {
      throw new Error(`Rule callback for \`${this.name}\` is not implemented`);
    }
  })
  .init(function() {

    /**
     * Helper function that users of this Stamp can use to determine if an object is composed
     * of this Stamp.
     *
     * @access      public
     * @memberOf    {ruleStamp}
     *
     * @returns     {Boolean}       true
     */
    this.isFormationRule = () => {
      return true;
    };
  });

module.exports = ruleStamp;
