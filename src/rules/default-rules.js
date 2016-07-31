'use strict';

const ruleStamp = require('./rule');

const stampit = require('stampit');

const defaultRulesStamp = stampit()
  .init(function() {
    const __rules = [
      ruleStamp({
        name : 'required',
        callback : function($element) {
          return $element.val().trim() !== '';
        }
      })
    ];

    this.getRules = () => {
      return __rules;
    };
  });

module.exports = defaultRulesStamp;
