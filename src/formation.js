'use strict';

const formationLoggerStamp = require('./formation-stamp.js');
const $ = require('jquery');
const jQuery = $;

const Formation = formationLoggerStamp();

/**
 * Set the `$forms` property on the Formation object when the DOM is ready, and initialize
 * the plugin for the form elements that are being managed by Formation.
 */
$(document).ready(function() {
  Formation.setLogConsole(Formation.getDebug());
  Formation.$forms = $('form').filter(function() {
    return $(this).attr('data-formation') && parseInt($(this).attr('data-formation')) == 1;
  });

  Formation.enterFormation();
});

module.exports = Formation;
