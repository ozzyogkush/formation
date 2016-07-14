'use strict';

const formationLoggerStamp = require('./formation-stamp.js');
const $ = require('jquery');
const jQuery = $;

const Formation = formationLoggerStamp();

/**
 * Add a document.ready event handler and set Formation to handle the
 * event so it can initialize the DOM.
 */
jQuery(document).ready($.proxy(Formation.readyDocument, Formation));

module.exports = Formation;
