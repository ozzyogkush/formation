'use strict';

const stampit = require('stampit');
const EventEmitter = require('events').EventEmitter;

const eventEmitterStamp = stampit.convertConstructor(EventEmitter);
const eventEmitterEventsStamp = stampit()
  .init(function() {
    const __nodeSetDebugEventName = 'formationSetDebug';
    this.getNodeSetDebugEvent = () => {
      return __nodeSetDebugEventName;
    };

    const __nodeFormSubmitEventName = 'formationFormSubmit';
    this.getNodeFormSubmitEvent = () => {
      return __nodeFormSubmitEventName;
    };
  });

module.exports = eventEmitterEventsStamp.compose(eventEmitterStamp);
