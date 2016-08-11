'use strict';

const eventEmitterStamp = require('./utilities/node-event-emitter-stamp');
const formationLoggerStamp = require('./formation-stamp.js');
const $ = require('jquery');
const jQuery = $;

const eventEmitter = eventEmitterStamp();
const Formation = formationLoggerStamp({nodeEvents : eventEmitter});
Formation.initLogging(Formation.getDebug());

/**
 * Add a document.ready event handler and set Formation to handle the
 * event so it can initialize the DOM.
 */
jQuery(document).ready($.proxy(Formation.readyDocument, Formation));

module.exports = Formation;