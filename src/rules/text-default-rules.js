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
 * @namespace     Formation.textDefaultRules
 * @mixin         Formation.textDefaultRules
 *
 * @mixes         Formation.ruleSet
 */
const textDefaultRulesStamp = stampit()
  .methods({

    /**
     * The default text-based input elements rule is that
     * it's trimmed value must not be empty.
     *
     * @access      public
     * @memberOf    {Formation.textDefaultRules}
     * @mixes       {Formation.textDefaultRules}
     *
     * @param       {Element}       element         The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvDefault(element, attribute) {
      return element.value.trim() !== '';
    },

    /**
     * When a field has a minimum length, its trimmed value must be greater than
     * or equal to the specified attribute value.
     *
     * @access      public
     * @memberOf    {Formation.textDefaultRules}
     * @mixes       {Formation.textDefaultRules}
     *
     * @param       {Element}       element         The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvMinLength(element, attribute) {
      const minChars = element.getAttribute(attribute);

      return (element.value.trim().length >= parseInt(minChars));
    },

    /**
     * When a field has a maximum length, its trimmed value must be less than
     * or equal to the specified attribute value.
     *
     * @access      public
     * @memberOf    {Formation.textDefaultRules}
     * @mixes       {Formation.textDefaultRules}
     *
     * @param       {Element}       element         The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}
     */
    dataFvMaxLength(element, attribute) {
      const maxChars = element.getAttribute(attribute);

      return (element.value.trim().length <= parseInt(maxChars));
    },

    /**
     * When a field has a format specified, the value will be checked against
     * that specific format. Some predefined formats include `zip5`, `zip4`,
     * `zip`, `email`, `phone`. You can specify a Regular Expression string
     * if you prefer.
     *
     * @access      public
     * @memberOf    {Formation.textDefaultRules}
     * @mixes       {Formation.textDefaultRules}
     *
     * @param       {Element}       element         The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}       valid
     */
    dataFvFormat(element, attribute) {
      const format = element.getAttribute(attribute);
      let valid = true;
      const trimmedVal = element.value.trim();
      switch (format) {
        case 'zip5' :
          valid = this.isValidZip(trimmedVal, 5);
          break;
        case 'zip4' :
          valid = this.isValidZip(trimmedVal, 4);
          break;
        case 'zip' :
          valid = this.isValidZip(trimmedVal);
          break;
        case 'email' :
          valid = this.isValidEmail(trimmedVal);
          break;
        case 'phone' :
          valid = this.isValidPhone(trimmedVal);
          break;
        case 'phone-multi' :
          valid = this.isValidPhone(trimmedVal, true);
          break;
        default:
          // If it looks like a regex, test the value against it.
          const formatMatch = format.match(/^\/(.*)\/$/);
          if (formatMatch !== null) {
            const formatAsRegex = new RegExp(formatMatch[1]);
            valid = formatAsRegex.test(trimmedVal);
          }
      }

      return valid;
    },

    /**
     * When a field must match another field, check that the value of
     * both fields is identical.
     *
     * @throws      Error           iff the other field to match is not in the DOM
     * @access      public
     * @memberOf    {Formation.textDefaultRules}
     * @mixes       {Formation.textDefaultRules}
     *
     * @param       {Element}       element         The element upon which to apply the rule. Required.
     * @param       {String}        attribute       The data attribute which may contain additional data. Required.
     *
     * @returns     {Boolean}       valid
     */
    dataFvMatchField(element, attribute) {
      const matchOtherFieldID = element.getAttribute(attribute);
      const otherField = document.getElementById(matchOtherFieldID);
      if (otherField === null) {
        throw new Error(`Expected an element with an ID equal to "${matchOtherFieldID}" on this form.`);
      }

      const trimmedVal = element.value.trim();
      const otherFieldTrimmedVal = otherField.value.trim();
      const valid = (trimmedVal === otherFieldTrimmedVal);

      if (parseInt(otherField.getAttribute('data-fv-required')) === 1) {
        // Set the valid flag on the matched field
        const setValidationFlagEvent = new CustomEvent(
          this.getSetValidationFlagEventName(),
          { bubbles: true, cancelable: true, detail: { validAfterRuleCheck: valid } }
        );
        otherField.dispatchEvent(setValidationFlagEvent);
      }

      return valid;
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
     * @memberOf    {Formation.textDefaultRules}
     */
    let __rules = [
      ruleStamp({
        name : 'default',
        callback : (element, attribute) => this.dataFvDefault(element, attribute)
      }),
      ruleStamp({
        name : 'min-length',
        callback : (element, attribute) => this.dataFvMinLength(element, attribute)
      }),
      ruleStamp({
        name : 'max-length',
        callback : (element, attribute) => this.dataFvMaxLength(element, attribute)
      }),
      ruleStamp({
        name : 'format',
        callback : (element, attribute) => this.dataFvFormat(element, attribute)
      }),
      ruleStamp({
        name : 'match-field',
        callback : (element, attribute) => this.dataFvMatchField(element, attribute)
      })
    ];

    /**
     * Return the value of the private `__rules` object.
     *
     * @access      public
     * @memberOf    {Formation.textDefaultRules}
     *
     * @returns     {Array}     __rules     The default rules we've defined.
     */
    this.getRules = () => __rules;
  });

module.exports = ruleSetStamp.compose(textDefaultRulesStamp);
