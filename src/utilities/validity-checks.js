'use strict';

let stampit = require('stampit');

/**
 * A set of methods to check common sting types (eg phone numbers, email addresses, numbers)
 * for validity.
 *
 * @copyright     Copyright (c) 2016, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @class         validityCheckStamp
 * @name          validityCheckStamp
 * @package       Formation
 * @version
 */
const validityCheckStamp = stampit()
  .methods({
    /**
     * Returns true iff the string only contains numeric values.
     *
     * @access      public
     * @memberOf    {validityCheckStamp}
     * @since
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
     * Returns true if the string matches the format of an email address. Returns false otherwise.
     *
     * @access      public
     * @memberOf    {validityCheckStamp}
     * @since
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
     * a number [0-9]. Returns false otherwise.
     *
     * @access      public
     * @memberOf    {validityCheckStamp}
     * @since
     *
     * @param       {String}        strToTest   The string to test. Required.
     *
     * @returns     {Boolean}                   Flag indicating whether the string is a valid phone number.
     */
    isValidPhone(strToTest) {
      let filter = /^\((\d){3}\)(\s)(\d){3}-(\d){4}$/;

      return filter.test(strToTest);
    }
  });

module.exports = validityCheckStamp;
