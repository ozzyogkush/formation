'use strict';

const stampit = require('stampit');

const ruleStamp = stampit()
  .refs({
    name : 'undefined',
    callback : function($element) {
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
     * @since       0.1.0
     *
     * @returns     {Boolean}       true
     */
    this.isFormationRule = () => {
      return true;
    };
  });

module.exports = ruleStamp;
