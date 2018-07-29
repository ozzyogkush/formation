'use strict';

const eventEmitterStamp = require('./utilities/node-event-emitter-stamp');
const formationLoggerStamp = require('./formation-stamp.js');

const eventEmitter = eventEmitterStamp();
const Formation = formationLoggerStamp({nodeEvents : eventEmitter});
Formation.initLogging(Formation.getDebug());

/**
 * Add a document.ready event handler and set Formation to handle the
 * event so it can initialize the DOM.
 */
document.addEventListener('DOMContentLoaded', function() { Formation.readyDocument(); });

/**
 * Formation!
 *
 * @copyright     Copyright (c) 2016 - 2018, Derek Rosenzweig
 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
 * @package       Formation
 * @module        Formation
 * @namespace     Formation
 */
module.exports = Formation;
