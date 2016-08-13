'use strict';

let stampit = require('stampit');

/**
 * A set of methods to check common sting types (eg phone numbers, email addresses, numbers)
 * for validity.
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @namespace     Formation.validityCheck
 * @mixin         Formation.validityCheck
 */
const validityCheckStamp = stampit()
  .methods({
    /**
     * Returns true iff the string only contains numeric values.
     *
     * @access      public
     * @memberOf    {Formation.validityCheck}
     *
     * @param       {String}        strToTest   The string to test. Required.
     *
     * @returns     {Boolean}                   Flag indicating whether the string only contains numbers.
     */
    isValidNumeric(strToTest) {
      let filter = /^(\d*)$/;

      return filter.test(strToTest);
    },

    /**
     * Returns true iff the string is a ZIP code, or the specified part of a ZIP code.
     *
     * @access      public
     * @memberOf    {Formation.validityCheck}
     *
     * @param       {String}        strToTest   The string to test. Required.
     * @param       {int|null}      part        The part of ZIP code to check. Optional. Default null.
     *
     * @returns     {Boolean}                   Flag indicating whether the string only contains numbers.
     */
    isValidZip(strToTest, part = null) {
      // satisfies `12345` and `12345-1234`
      let filter = /^(\d{5})((\-(\d{4}))?)$/;

      if (part === 4) {
        filter = /^(\d{4})$/;
      }
      else if (part === 5) {
        filter = /^(\d{5})$/;
      }

      return filter.test(strToTest);
    },

    /**
     * Returns true if the string matches the format of an email address. Returns false otherwise.
     *
     * @access      public
     * @memberOf    {Formation.validityCheck}
     *
     * @param       {String}        strToTest   The string to test. Required.
     *
     * @returns     {Boolean}                   Flag indicating whether the string is a valid email address.
     */
    isValidEmail(strToTest) {
      let filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

      return filter.test(strToTest);
    },

    /**
     * Returns true if the string matches the format `(xxx) xxx-xxxx` where `x` is
     * a number [0-9]. If the `multi` param is true, allows the formats `xxxxxxxxxx`
     * and `xxx-xxx-xxxx` as well. Returns false otherwise.
     *
     * @access      public
     * @memberOf    {Formation.validityCheck}
     *
     * @param       {String}        strToTest   The string to test. Required.
     * @param       {Boolean}       multi       Flag indicating whether to allow multiple formats. Optional. False.
     *
     * @returns     {Boolean}                   Flag indicating whether the string is a valid phone number.
     */
    isValidPhone(strToTest, multi = false) {
      let filter = /^\((\d{3})\)(\s)(\d{3})-(\d{4})$/;
      if (multi) {
        filter = /^(\d{10})|(\((\d{3})\)(\s)(\d{3})-(\d{4}))|((\d{3})-(\d{3})-(\d{4}))$/;
      }

      return filter.test(strToTest);
    }
  });

module.exports = validityCheckStamp;
