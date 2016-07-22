'use strict';

const stampit = require('stampit');
const EventEmitter = require('events').EventEmitter;

const eventEmitterStamp = stampit.convertConstructor(EventEmitter);

module.exports = eventEmitterStamp;
