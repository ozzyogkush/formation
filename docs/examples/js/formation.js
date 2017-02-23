webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	module.exports = global["Formation"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const eventEmitterStamp = __webpack_require__(2);
	const formationLoggerStamp = __webpack_require__(69);
	const $ = __webpack_require__(74);
	const jQuery = $;

	const eventEmitter = eventEmitterStamp();
	const Formation = formationLoggerStamp({nodeEvents : eventEmitter});
	Formation.initLogging(Formation.getDebug());

	/**
	 * Add a document.ready event handler and set Formation to handle the
	 * event so it can initialize the DOM.
	 */
	jQuery(document).ready($.proxy(Formation.readyDocument, Formation));

	/**
	 * Formation!
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @module        Formation
	 * @namespace     Formation
	 */
	module.exports = Formation;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stampit = __webpack_require__(3);
	var EventEmitter = __webpack_require__(68).EventEmitter;

	/**
	 * Turn a node `EventEmitter` into a Stamp.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.eventEmitter
	 * @mixin         Formation.eventEmitter
	 */
	var eventEmitterStamp = stampit.convertConstructor(EventEmitter);

	/**
	 * Provides an interface for defining Formation Node events.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.eventEmitterEvents
	 * @mixin         Formation.eventEmitterEvents
	 *
	 * @mixes         Formation.eventEmitter
	 */
	var eventEmitterEventsStamp = stampit().init(function () {

	  /**
	   * The node event name for turning debug on or off.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventEmitterEvents}
	   */
	  var __nodeSetDebugEventName = 'formationSetDebug';

	  /**
	   * Return the value of the private `__nodeSetDebugEventName` flag.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventEmitterEvents}
	   *
	   * @returns     {String}        __nodeSetDebugEventName
	   */
	  this.getNodeSetDebugEvent = function () {
	    return __nodeSetDebugEventName;
	  };

	  /**
	   * The node event name for when a form is submitted.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventEmitterEvents}
	   */
	  var __nodeFormSubmitEventName = 'formationFormSubmit';

	  /**
	   * Return the value of the private `__nodeFormSubmitEventName` flag.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventEmitterEvents}
	   *
	   * @returns     {String}        __nodeFormSubmitEventName
	   */
	  this.getNodeFormSubmitEvent = function () {
	    return __nodeFormSubmitEventName;
	  };
	});

	module.exports = eventEmitterEventsStamp.compose(eventEmitterStamp);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Stampit
	 **
	 * Create objects from reusable, composable behaviors.
	 **
	 * Copyright (c) 2013 Eric Elliott
	 * http://opensource.org/licenses/MIT
	 **/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashCollectionForEach = __webpack_require__(4);

	var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

	var _lodashLangIsFunction = __webpack_require__(15);

	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

	var _lodashLangIsObject = __webpack_require__(11);

	var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

	var _supermixer = __webpack_require__(30);

	var create = Object.create;
	function isThenable(value) {
	  return value && (0, _lodashLangIsFunction2['default'])(value.then);
	}

	function extractFunctions() {
	  var result = [];

	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if ((0, _lodashLangIsFunction2['default'])(args[0])) {
	    (0, _lodashCollectionForEach2['default'])(args, function (fn) {
	      // assuming all the arguments are functions
	      if ((0, _lodashLangIsFunction2['default'])(fn)) {
	        result.push(fn);
	      }
	    });
	  } else if ((0, _lodashLangIsObject2['default'])(args[0])) {
	    (0, _lodashCollectionForEach2['default'])(args, function (obj) {
	      (0, _lodashCollectionForEach2['default'])(obj, function (fn) {
	        if ((0, _lodashLangIsFunction2['default'])(fn)) {
	          result.push(fn);
	        }
	      });
	    });
	  }
	  return result;
	}

	function addMethods(fixed) {
	  for (var _len2 = arguments.length, methods = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    methods[_key2 - 1] = arguments[_key2];
	  }

	  return _supermixer.mixinFunctions.apply(undefined, [fixed.methods].concat(methods));
	}
	function addRefs(fixed) {
	  for (var _len3 = arguments.length, refs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    refs[_key3 - 1] = arguments[_key3];
	  }

	  fixed.refs = fixed.state = _supermixer.mixin.apply(undefined, [fixed.refs].concat(refs));
	  return fixed.refs;
	}
	function addInit(fixed) {
	  for (var _len4 = arguments.length, inits = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    inits[_key4 - 1] = arguments[_key4];
	  }

	  var extractedInits = extractFunctions.apply(undefined, inits);
	  fixed.init = fixed.enclose = fixed.init.concat(extractedInits);
	  return fixed.init;
	}
	function addProps(fixed) {
	  for (var _len5 = arguments.length, propses = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	    propses[_key5 - 1] = arguments[_key5];
	  }

	  return _supermixer.merge.apply(undefined, [fixed.props].concat(propses));
	}
	function addStatic(fixed) {
	  for (var _len6 = arguments.length, statics = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	    statics[_key6 - 1] = arguments[_key6];
	  }

	  return _supermixer.mixin.apply(undefined, [fixed['static']].concat(statics));
	}

	function cloneAndExtend(fixed, extensionFunction) {
	  var stamp = stampit(fixed);

	  for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
	    args[_key7 - 2] = arguments[_key7];
	  }

	  extensionFunction.apply(undefined, [stamp.fixed].concat(args));
	  return stamp;
	}

	function _compose() {
	  var result = stampit();

	  for (var _len8 = arguments.length, factories = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	    factories[_key8] = arguments[_key8];
	  }

	  (0, _lodashCollectionForEach2['default'])(factories, function (source) {
	    if (source && source.fixed) {
	      addMethods(result.fixed, source.fixed.methods);
	      // We might end up having two different stampit modules loaded and used in conjunction.
	      // These || operators ensure that old stamps could be combined with the current version stamps.
	      // 'state' is the old name for 'refs'
	      addRefs(result.fixed, source.fixed.refs || source.fixed.state);
	      // 'enclose' is the old name for 'init'
	      addInit(result.fixed, source.fixed.init || source.fixed.enclose);
	      addProps(result.fixed, source.fixed.props);
	      addStatic(result.fixed, source.fixed['static']);
	    }
	  });
	  return (0, _supermixer.mixin)(result, result.fixed['static']);
	}

	/**
	 * Return a factory function that will produce new objects using the
	 * components that are passed in or composed.
	 *
	 * @param  {Object} [options] Options to build stamp from: `{ methods, refs, init, props }`
	 * @param  {Object} [options.methods] A map of method names and bodies for delegation.
	 * @param  {Object} [options.refs] A map of property names and values to be mixed into each new object.
	 * @param  {Object} [options.init] A closure (function) used to create private data and privileged methods.
	 * @param  {Object} [options.props] An object to be deeply cloned into each newly stamped object.
	 * @param  {Object} [options.static] An object to be mixed into each `this` and derived stamps (not objects!).
	 * @return {Function(refs)} factory A factory to produce objects.
	 * @return {Function(refs)} factory.create Just like calling the factory function.
	 * @return {Object} factory.fixed An object map containing the stamp components.
	 * @return {Function(methods)} factory.methods Add methods to the stamp. Chainable.
	 * @return {Function(refs)} factory.refs Add references to the stamp. Chainable.
	 * @return {Function(Function(context))} factory.init Add a closure which called on object instantiation. Chainable.
	 * @return {Function(props)} factory.props Add deeply cloned properties to the produced objects. Chainable.
	 * @return {Function(stamps)} factory.compose Combine several stamps into single. Chainable.
	 * @return {Function(statics)} factory.static Add properties to the stamp (not objects!). Chainable.
	 */
	var stampit = function stampit(options) {
	  var fixed = { methods: {}, refs: {}, init: [], props: {}, 'static': {} };
	  fixed.state = fixed.refs; // Backward compatibility. 'state' is the old name for 'refs'.
	  fixed.enclose = fixed.init; // Backward compatibility. 'enclose' is the old name for 'init'.
	  if (options) {
	    addMethods(fixed, options.methods);
	    addRefs(fixed, options.refs);
	    addInit(fixed, options.init);
	    addProps(fixed, options.props);
	    addStatic(fixed, options['static']);
	  }

	  var factory = function Factory(refs) {
	    for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	      args[_key9 - 1] = arguments[_key9];
	    }

	    var instance = (0, _supermixer.mixin)(create(fixed.methods), fixed.refs, refs);
	    (0, _supermixer.mergeUnique)(instance, fixed.props); // props are safely merged into refs

	    var nextPromise = null;
	    if (fixed.init.length > 0) {
	      (0, _lodashCollectionForEach2['default'])(fixed.init, function (fn) {
	        if (!(0, _lodashLangIsFunction2['default'])(fn)) {
	          return; // not a function, do nothing.
	        }

	        // Check if we are in the async mode.
	        if (!nextPromise) {
	          // Call the init().
	          var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
	          if (!callResult) {
	            return; // The init() returned nothing. Proceed to the next init().
	          }

	          // Returned value is meaningful.
	          // It will replace the stampit-created object.
	          if (!isThenable(callResult)) {
	            instance = callResult; // stamp is synchronous so far.
	            return;
	          }

	          // This is the sync->async conversion point.
	          // Since now our factory will return a promise, not an object.
	          nextPromise = callResult;
	        } else {
	          // As long as one of the init() functions returned a promise,
	          // now our factory will 100% return promise too.
	          // Linking the init() functions into the promise chain.
	          nextPromise = nextPromise.then(function (newInstance) {
	            // The previous promise might want to return a value,
	            // which we should take as a new object instance.
	            instance = newInstance || instance;

	            // Calling the following init().
	            // NOTE, than `fn` is wrapped to a closure within the forEach loop.
	            var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
	            // Check if call result is truthy.
	            if (!callResult) {
	              // The init() returned nothing. Thus using the previous object instance.
	              return instance;
	            }

	            if (!isThenable(callResult)) {
	              // This init() was synchronous and returned a meaningful value.
	              instance = callResult;
	              // Resolve the instance for the next `then()`.
	              return instance;
	            }

	            // The init() returned another promise. It is becoming our nextPromise.
	            return callResult;
	          });
	        }
	      });
	    }

	    // At the end we should resolve the last promise and
	    // return the resolved value (as a promise too).
	    return nextPromise ? nextPromise.then(function (newInstance) {
	      return newInstance || instance;
	    }) : instance;
	  };

	  var refsMethod = cloneAndExtend.bind(null, fixed, addRefs);
	  var initMethod = cloneAndExtend.bind(null, fixed, addInit);
	  return (0, _supermixer.mixin)(factory, {
	    /**
	     * Creates a new object instance from the stamp.
	     */
	    create: factory,

	    /**
	     * The stamp components.
	     */
	    fixed: fixed,

	    /**
	     * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    methods: cloneAndExtend.bind(null, fixed, addMethods),

	    /**
	     * Take n objects and add them to the references list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    refs: refsMethod,

	    /**
	     * @deprecated since v2.0. Use refs() instead.
	     * Alias to refs().
	     * @return {Function} A new stamp (factory object).
	     */
	    state: refsMethod,

	    /**
	     * Take n functions, an array of functions, or n objects and add
	     * the functions to the initializers list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    init: initMethod,

	    /**
	     * @deprecated since v2.0. User init() instead.
	     * Alias to init().
	     * @return {Function} A new stamp (factory object).
	     */
	    enclose: initMethod,

	    /**
	     * Take n objects and deep merge them to the properties. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    props: cloneAndExtend.bind(null, fixed, addProps),

	    /**
	     * Take n objects and add all props to the factory object. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    'static': function _static() {
	      for (var _len10 = arguments.length, statics = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        statics[_key10] = arguments[_key10];
	      }

	      var newStamp = cloneAndExtend.apply(undefined, [factory.fixed, addStatic].concat(statics));
	      return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
	    },

	    /**
	     * Take one or more factories produced from stampit() and
	     * combine them with `this` to produce and return a new factory.
	     * Combining overrides properties with last-in priority.
	     * @param {[Function]|...Function} factories Stampit factories.
	     * @return {Function} A new stampit factory composed from arguments.
	     */
	    compose: function compose() {
	      for (var _len11 = arguments.length, factories = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
	        factories[_key11] = arguments[_key11];
	      }

	      return _compose.apply(undefined, [factory].concat(factories));
	    }
	  }, fixed['static']);
	};

	// Static methods

	function isStamp(obj) {
	  return (0, _lodashLangIsFunction2['default'])(obj) && (0, _lodashLangIsFunction2['default'])(obj.methods) && (
	  // isStamp can be called for old stampit factory object.
	  // We should check old names (state and enclose) too.
	  (0, _lodashLangIsFunction2['default'])(obj.refs) || (0, _lodashLangIsFunction2['default'])(obj.state)) && ((0, _lodashLangIsFunction2['default'])(obj.init) || (0, _lodashLangIsFunction2['default'])(obj.enclose)) && (0, _lodashLangIsFunction2['default'])(obj.props) && (0, _lodashLangIsFunction2['default'])(obj['static']) && (0, _lodashLangIsObject2['default'])(obj.fixed);
	}

	function convertConstructor(Constructor) {
	  var stamp = stampit();
	  stamp.fixed.refs = stamp.fixed.state = (0, _supermixer.mergeChainNonFunctions)(stamp.fixed.refs, Constructor.prototype);
	  (0, _supermixer.mixin)(stamp, (0, _supermixer.mixin)(stamp.fixed['static'], Constructor));

	  (0, _supermixer.mixinChainFunctions)(stamp.fixed.methods, Constructor.prototype);
	  addInit(stamp.fixed, function (_ref) {
	    var instance = _ref.instance;
	    var args = _ref.args;
	    return Constructor.apply(instance, args);
	  });

	  return stamp;
	}

	function shortcutMethod(extensionFunction) {
	  var stamp = stampit();

	  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
	    args[_key12 - 1] = arguments[_key12];
	  }

	  extensionFunction.apply(undefined, [stamp.fixed].concat(args));

	  return stamp;
	}

	function mixinWithConsoleWarning() {
	  console.log('stampit.mixin(), .mixIn(), .extend(), and .assign() are deprecated.', 'Use Object.assign or _.assign instead');
	  return _supermixer.mixin.apply(this, arguments);
	}

	exports['default'] = (0, _supermixer.mixin)(stampit, {

	  /**
	   * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  methods: shortcutMethod.bind(null, addMethods),

	  /**
	   * Take n objects and add them to the references list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  refs: shortcutMethod.bind(null, addRefs),

	  /**
	   * Take n functions, an array of functions, or n objects and add
	   * the functions to the initializers list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  init: shortcutMethod.bind(null, addInit),

	  /**
	   * Take n objects and deep merge them to the properties. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  props: shortcutMethod.bind(null, addProps),

	  /**
	   * Take n objects and add all props to the factory object. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  'static': function _static() {
	    for (var _len13 = arguments.length, statics = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
	      statics[_key13] = arguments[_key13];
	    }

	    var newStamp = shortcutMethod.apply(undefined, [addStatic].concat(statics));
	    return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
	  },

	  /**
	   * Take two or more factories produced from stampit() and
	   * combine them to produce a new factory.
	   * Combining overrides properties with last-in priority.
	   * @param {[Function]|...Function} factories Stamps produced by stampit().
	   * @return {Function} A new stampit factory composed from arguments.
	   */
	  compose: _compose,

	  /**
	   * @deprecated Since v2.2. Use Object.assign or _.assign instead.
	   * Alias to Object.assign.
	   */
	  mixin: mixinWithConsoleWarning,
	  extend: mixinWithConsoleWarning,
	  mixIn: mixinWithConsoleWarning,
	  assign: mixinWithConsoleWarning,

	  /**
	   * Check if an object is a stamp.
	   * @param {Object} obj An object to check.
	   * @returns {Boolean}
	   */
	  isStamp: isStamp,

	  /**
	   * Take an old-fashioned JS constructor and return a stampit stamp
	   * that you can freely compose with other stamps.
	   * @param  {Function} Constructor
	   * @return {Function} A composable stampit factory (aka stamp).
	   */
	  convertConstructor: convertConstructor
	});
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(5),
	    baseEach = __webpack_require__(6),
	    createForEach = __webpack_require__(27);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);

	module.exports = forEach;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(7),
	    createBaseEach = __webpack_require__(26);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(8),
	    keys = __webpack_require__(12);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(9);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(10);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13),
	    isArrayLike = __webpack_require__(17),
	    isObject = __webpack_require__(11),
	    shimKeys = __webpack_require__(21);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(14);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(15),
	    isObjectLike = __webpack_require__(16);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(18),
	    isLength = __webpack_require__(20);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(19);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(23),
	    isIndex = __webpack_require__(24),
	    isLength = __webpack_require__(20),
	    keysIn = __webpack_require__(25);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(17),
	    isObjectLike = __webpack_require__(16);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(13),
	    isLength = __webpack_require__(20),
	    isObjectLike = __webpack_require__(16);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(22),
	    isArray = __webpack_require__(23),
	    isIndex = __webpack_require__(24),
	    isLength = __webpack_require__(20),
	    isObject = __webpack_require__(11);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(18),
	    isLength = __webpack_require__(20),
	    toObject = __webpack_require__(10);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(28),
	    isArray = __webpack_require__(23);

	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}

	module.exports = createForEach;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(29);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mixer = __webpack_require__(31);

	var _mixer2 = _interopRequireDefault(_mixer);

	var isFunction = function isFunction(val) {
	  return typeof val === 'function';
	};
	var isNotFunction = function isNotFunction(val) {
	  return !isFunction(val);
	};

	/**
	 * Regular mixin function.
	 */
	var mixin = (0, _mixer2['default'])();

	/**
	 * Mixin functions only.
	 */
	var mixinFunctions = (0, _mixer2['default'])({
	  filter: isFunction
	});

	/**
	 * Mixin functions including prototype chain.
	 */
	var mixinChainFunctions = (0, _mixer2['default'])({
	  filter: isFunction,
	  chain: true
	});

	/**
	 * Regular object merge function. Ignores functions.
	 */
	var merge = (0, _mixer2['default'])({
	  deep: true
	});

	/**
	 * Regular object merge function. Ignores functions.
	 */
	var mergeUnique = (0, _mixer2['default'])({
	  deep: true,
	  noOverwrite: true
	});

	/**
	 * Merge objects including prototype chain properties.
	 */
	var mergeChainNonFunctions = (0, _mixer2['default'])({
	  filter: isNotFunction,
	  deep: true,
	  chain: true
	});

	exports['default'] = _mixer2['default'];
	exports.mixin = mixin;
	exports.mixinFunctions = mixinFunctions;
	exports.mixinChainFunctions = mixinChainFunctions;
	exports.merge = merge;
	exports.mergeUnique = mergeUnique;
	exports.mergeChainNonFunctions = mergeChainNonFunctions;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = mixer;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashObjectForOwn = __webpack_require__(32);

	var _lodashObjectForOwn2 = _interopRequireDefault(_lodashObjectForOwn);

	var _lodashObjectForIn = __webpack_require__(55);

	var _lodashObjectForIn2 = _interopRequireDefault(_lodashObjectForIn);

	var _lodashLangCloneDeep = __webpack_require__(57);

	var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

	var _lodashLangIsObject = __webpack_require__(37);

	var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

	var _lodashLangIsUndefined = __webpack_require__(67);

	var _lodashLangIsUndefined2 = _interopRequireDefault(_lodashLangIsUndefined);

	/**
	 * Factory for creating mixin functions of all kinds.
	 *
	 * @param {Object} opts
	 * @param {Function} opts.filter Function which filters value and key.
	 * @param {Function} opts.transform Function which transforms each value.
	 * @param {Boolean} opts.chain Loop through prototype properties too.
	 * @param {Boolean} opts.deep Deep looping through the nested properties.
	 * @param {Boolean} opts.noOverwrite Do not overwrite any existing data (aka first one wins).
	 * @return {Function} A new mix function.
	 */

	function mixer() {
	  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  // We will be recursively calling the exact same function when walking deeper.
	  if (opts.deep && !opts._innerMixer) {
	    opts._innerMixer = true; // avoiding infinite recursion.
	    opts._innerMixer = mixer(opts); // create same mixer for recursion purpose.
	  }

	  /**
	   * Combine properties from the passed objects into target. This method mutates target,
	   * if you want to create a new Object pass an empty object as first param.
	   *
	   * @param {Object} target Target Object
	   * @param {...Object} objects Objects to be combined (0...n objects).
	   * @return {Object} The mixed object.
	   */
	  return function mix(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      sources[_key - 1] = arguments[_key];
	    }

	    // Check if it's us who called the function. See recursion calls are below.
	    if ((0, _lodashLangIsUndefined2['default'])(target) || !opts.noOverwrite && !(0, _lodashLangIsObject2['default'])(target)) {
	      if (sources.length > 1) {
	        // Weird, but someone (not us!) called this mixer with an incorrect first argument.
	        return opts._innerMixer.apply(opts, [{}].concat(sources));
	      }
	      return (0, _lodashLangCloneDeep2['default'])(sources[0]);
	    }

	    if (opts.noOverwrite) {
	      if (!(0, _lodashLangIsObject2['default'])(target) || !(0, _lodashLangIsObject2['default'])(sources[0])) {
	        return target;
	      }
	    }

	    function iteratee(sourceValue, key) {
	      var targetValue = target[key];
	      if (opts.filter && !opts.filter(sourceValue, targetValue, key)) {
	        return;
	      }

	      var result = opts.deep ? opts._innerMixer(targetValue, sourceValue) : sourceValue;
	      target[key] = opts.transform ? opts.transform(result, targetValue, key) : result;
	    }

	    var loop = opts.chain ? _lodashObjectForIn2['default'] : _lodashObjectForOwn2['default'];
	    sources.forEach(function (obj) {
	      loop(obj, iteratee);
	    });

	    return target;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(33),
	    createForOwn = __webpack_require__(52);

	/**
	 * Iterates over own enumerable properties of an object invoking `iteratee`
	 * for each property. The `iteratee` is bound to `thisArg` and invoked with
	 * three arguments: (value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' and 'b' (iteration order is not guaranteed)
	 */
	var forOwn = createForOwn(baseForOwn);

	module.exports = forOwn;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(34),
	    keys = __webpack_require__(38);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(35);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(36);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(37);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(39),
	    isArrayLike = __webpack_require__(43),
	    isObject = __webpack_require__(37),
	    shimKeys = __webpack_require__(47);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(40);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(41),
	    isObjectLike = __webpack_require__(42);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(37);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(44),
	    isLength = __webpack_require__(46);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(45);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(48),
	    isArray = __webpack_require__(49),
	    isIndex = __webpack_require__(50),
	    isLength = __webpack_require__(46),
	    keysIn = __webpack_require__(51);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(43),
	    isObjectLike = __webpack_require__(42);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(39),
	    isLength = __webpack_require__(46),
	    isObjectLike = __webpack_require__(42);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(48),
	    isArray = __webpack_require__(49),
	    isIndex = __webpack_require__(50),
	    isLength = __webpack_require__(46),
	    isObject = __webpack_require__(37);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(53);

	/**
	 * Creates a function for `_.forOwn` or `_.forOwnRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForOwn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee);
	  };
	}

	module.exports = createForOwn;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(54);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(34),
	    createForIn = __webpack_require__(56);

	/**
	 * Iterates over own and inherited enumerable properties of an object invoking
	 * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	 * with three arguments: (value, key, object). Iteratee functions may exit
	 * iteration early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forIn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
	 */
	var forIn = createForIn(baseFor);

	module.exports = forIn;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(53),
	    keysIn = __webpack_require__(51);

	/**
	 * Creates a function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForIn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee, keysIn);
	  };
	}

	module.exports = createForIn;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(58),
	    bindCallback = __webpack_require__(53);

	/**
	 * Creates a deep clone of `value`. If `customizer` is provided it's invoked
	 * to produce the cloned values. If `customizer` returns `undefined` cloning
	 * is handled by the method instead. The `customizer` is bound to `thisArg`
	 * and invoked with up to three argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var deep = _.cloneDeep(users);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.cloneDeep(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(true);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 20
	 */
	function cloneDeep(value, customizer, thisArg) {
	  return typeof customizer == 'function'
	    ? baseClone(value, true, bindCallback(customizer, thisArg, 3))
	    : baseClone(value, true);
	}

	module.exports = cloneDeep;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(59),
	    arrayEach = __webpack_require__(60),
	    baseAssign = __webpack_require__(61),
	    baseForOwn = __webpack_require__(33),
	    initCloneArray = __webpack_require__(63),
	    initCloneByTag = __webpack_require__(64),
	    initCloneObject = __webpack_require__(66),
	    isArray = __webpack_require__(49),
	    isObject = __webpack_require__(37);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[stringTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[mapTag] = cloneableTags[setTag] =
	cloneableTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * The base implementation of `_.clone` without support for argument juggling
	 * and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The object `value` belongs to.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates clones with source counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return arrayCopy(value, result);
	    }
	  } else {
	    var tag = objToString.call(value),
	        isFunc = tag == funcTag;

	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return baseAssign(result, value);
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == value) {
	      return stackB[length];
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate it with its clone.
	  stackA.push(value);
	  stackB.push(result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(62),
	    keys = __webpack_require__(38);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add array properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var bufferClone = __webpack_require__(65);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return bufferClone(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      var buffer = object.buffer;
	      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      var result = new Ctor(object.source, reFlags.exec(object));
	      result.lastIndex = object.lastIndex;
	  }
	  return result;
	}

	module.exports = initCloneByTag;


/***/ },
/* 65 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Native method references. */
	var ArrayBuffer = global.ArrayBuffer,
	    Uint8Array = global.Uint8Array;

	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  var result = new ArrayBuffer(buffer.byteLength),
	      view = new Uint8Array(result);

	  view.set(new Uint8Array(buffer));
	  return result;
	}

	module.exports = bufferClone;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  var Ctor = object.constructor;
	  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	    Ctor = Object;
	  }
	  return new Ctor;
	}

	module.exports = initCloneObject;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}

	module.exports = isUndefined;


/***/ },
/* 68 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var bodyEventsHandlerStamp = __webpack_require__(70);
	var consoleLoggerStamp = __webpack_require__(71);
	var domNavigationStamp = __webpack_require__(72);
	var formEventsHandlerStamp = __webpack_require__(78);
	var ruleStamp = __webpack_require__(82);

	var stampit = __webpack_require__(3);
	var $ = __webpack_require__(74);

	/**
	 * This stamp lets you initialize Formation, and turn debug on or off.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.formation
	 * @mixin         Formation.formation
	 *
	 * @mixes         Formation.domNavigation
	 * @mixes         Formation.toggleableConsole
	 */
	var formationStamp = stampit().refs({

	  /**
	   * The element DOM attribute key which specifies whether a form is managed
	   * by Formation (1) or not (0).
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.formation}
	   * @default     data-formation
	   */
	  formationDataAttrKey: 'data-formation',

	  /**
	   * A singleton passed along so we have some semblance of
	   * a global Formation event emitter.
	   *
	   * @access      public
	   * @type        {Formation.eventEmitter}
	   * @memberOf    {Formation.formation}
	   * @default     null
	   */
	  nodeEvents: null
	}).methods({

	  /**
	   * When the DOM is ready, set console logging based on the debug setting and
	   * initialize Formation.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   * @mixes       {Formation.formation}
	   *
	   * @returns     {Formation.formation}    this            Return the instance of the generated object so we can chain methods.
	   */
	  readyDocument: function readyDocument() {
	    // DOM is ready, so Enter Formation!
	    this.enterFormation();

	    return this;
	  },


	  /**
	   * Initialization of the Formation forms.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   * @mixes       {Formation.formation}
	   *
	   * @returns     {Formation.formation}    this            Return the instance of the generated object so we can chain methods.
	   */
	  enterFormation: function enterFormation() {
	    this.log('Initializing Formation...');

	    // First find out which forms should be initialized.
	    this.detectForms();

	    if (this.get$forms().length === 0) {
	      this.info('No Formation forms present, exiting.');
	      return this;
	    }

	    var bodyEventsHandler = bodyEventsHandlerStamp({
	      $body: $(document.body),
	      nodeEvents: this.nodeEvents,
	      formationSelector: this.getFormationSelector()
	    });
	    this.initBodyEvents(bodyEventsHandler);
	    this.initForms();

	    return this;
	  },


	  /**
	   * Allow consumers of Formation to initialize forms that may be added
	   * to the DOM after auto-initialization of the DOM.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   * @mixes       {Formation.formation}
	   *
	   * @param       {jQuery}                  $form         The jQuery extended `form` element to be initialized. Required.
	   *
	   * @returns     {Formation.formation}     this
	   */
	  initForm: function initForm($form) {
	    try {
	      // Set up the Form but only if it has the proper DOM.
	      var formationComponent = this.createFormationComponent();
	      var $singleForm = $form.eq(0);

	      formationComponent.initForm($singleForm);
	      formationComponent.initFormEvents();

	      if (!this.get$forms().has($form.get(0))) {
	        this.get$forms().add($singleForm);
	      }
	    } catch (exception) {
	      this.error(exception);
	    }

	    return this;
	  },


	  /**
	   * Simple factory function to create a new `Formation.formEventsHandler`
	   * instance - this is purely for ease of unit testing.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   * @mixes       {Formation.formation}
	   *
	   * @returns     {Formation.formEventsHandler}
	   */
	  createFormationComponent: function createFormationComponent() {
	    return formEventsHandlerStamp({
	      formationSelector: this.getFormationSelector(),
	      nodeEvents: this.nodeEvents
	    }).initLogging(this.getLogConsole());
	  },


	  /**
	   * Simple factory function to create a new `Formation.formEventsHandler`
	   * instance - this is purely for ease of unit testing.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   * @mixes       {Formation.formation}
	   *
	   * @returns     {Formation.rule}
	   */
	  createFormationRule: function createFormationRule(name, callback) {
	    return ruleStamp({ name: name, callback: callback });
	  },


	  /**
	   * Construct a CSS selector used to find Formation forms.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   * @mixes       {Formation.formation}
	   *
	   * @returns     {String}
	   */
	  getFormationSelector: function getFormationSelector() {
	    return '[' + this.formationDataAttrKey + '="1"]';
	  },


	  /**
	   * Attempt to register the `ruleName` rule with each form's formComponent.
	   * Handle when things go wrong. Adds a new `document.ready` method so it
	   * happens after initialization.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   * @mixes       {Formation.formation}
	   *
	   * @param       {String}      elementType             The type of element to which this rule applies. Required.
	   * @param       {String}      ruleName                The name of the rule to be registered. Required.
	   * @param       {Function}    ruleCallbackMethod      The callback method to be run when the rule is checked. Required.
	   *
	   * @returns     {Formation.formation}    this
	   */
	  registerRule: function registerRule(elementType, ruleName, ruleCallbackMethod) {
	    var _this = this;

	    if (typeof elementType !== 'string') {
	      throw TypeError('Expected `elementType` param to be a `String`, was a `' + (typeof elementType === 'undefined' ? 'undefined' : _typeof(elementType)) + '`.');
	    }
	    if ($.inArray(elementType, this.getSupportedElementTypes()) === -1) {
	      throw TypeError('Specified `elementType` `' + elementType + '` is not supported.');
	    }
	    if (typeof ruleName !== 'string') {
	      throw TypeError('Expected `ruleName` param to be a `String`, was a `' + (typeof ruleName === 'undefined' ? 'undefined' : _typeof(ruleName)) + '`.');
	    }
	    if (typeof ruleCallbackMethod !== 'function') {
	      throw TypeError('Expected `ruleCallbackMethod` param to be a `Function`, was a `' + (typeof ruleCallbackMethod === 'undefined' ? 'undefined' : _typeof(ruleCallbackMethod)) + '`.');
	    }

	    // Add the new DOMREADY event.
	    $(document).ready(function () {
	      _this.get$forms().each(function (index, form) {
	        var $form = $(form);
	        var rule = _this.createFormationRule(ruleName, ruleCallbackMethod);
	        _this.getFormComponentOfCurrentElement($form).registerRule(elementType, rule);
	      });
	    });

	    return this;
	  }
	}).init(function () {
	  var _this2 = this;

	  /**
	   * Flag indicating whether to log debug messages and exceptions.
	   *
	   * @access      private
	   * @type        Boolean
	   * @memberOf    {Formation.formation}
	   * @default     false
	   */
	  var debug = false;

	  /**
	   * Return the value of the private `debug` flag.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   *
	   * @returns     {Boolean}        debug           Flag indicating whether we're turning debug on or off.
	   */
	  this.getDebug = function () {
	    return debug;
	  };

	  /**
	   * Set the private `debug` flag on the Formation object.
	   *
	   * @throws      TypeError                         if the `newVal` param is not a boolean.
	   * @access      public
	   * @memberOf    {Formation.formation}
	   *
	   * @param       {Boolean}               newVal          Flag indicating whether we're turning debug on or off. Required.
	   *
	   * @returns     {Formation.formation}   this            Return the instance of the generated object so we can chain methods.
	   */
	  this.setDebug = function (newVal) {
	    var callStackCurrent = 'Formation.formation.setDebug';
	    if (typeof newVal !== 'boolean') {
	      throw new TypeError(callStackCurrent + '() - Expected `newVal` param to be a Boolean, but is `' + (typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) + '`.');
	    }

	    debug = newVal;

	    _this2.nodeEvents.emit(_this2.nodeEvents.getNodeSetDebugEvent(), newVal);

	    // So we can chain methods.
	    return _this2;
	  };

	  /**
	   * A set of jQuery extended `form` elements to be managed by Formation.
	   *
	   * @access      private
	   * @type        jQuery
	   * @memberOf    {Formation.formation}
	   * @default     $()
	   */
	  var __$forms = $();

	  /**
	   * Return the value of the private `__$forms` object.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   *
	   * @returns     {jQuery}        __$forms           A set of jQuery extended `form` elements to be managed by Formation.
	   */
	  this.get$forms = function () {
	    return __$forms;
	  };

	  /**
	   * Find all the `form` elements in the DOM that are to be managed/validated by Formation, and set the private
	   * `$forms` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   *
	   * @returns     {Formation.formation}  this            Return the instance of the generated object so we can chain methods.
	   */
	  this.detectForms = function () {
	    __$forms = $('form').filter(_this2.formFilter);

	    // So we can chain methods.
	    return _this2;
	  };

	  /**
	   * Helper function to filter a jQuery set to return only forms to be managed
	   * by Formation.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   *
	   * @param       {int}           index         The index of the element in the jQuery set.
	   * @param       {jQuery}        element       The DOM element to check.
	   *
	   * @returns     {Boolean}
	   */
	  this.formFilter = function (index, element) {
	    var $element = $(element);
	    return $element.prop('tagName').toLowerCase() == 'form' && $element.attr(_this2.formationDataAttrKey) !== undefined && parseInt($element.attr(_this2.formationDataAttrKey)) == 1;
	  };

	  /**
	   * The types of elements that are supported by Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {Array}
	   * @memberOf    {Formation.formation}
	   */
	  var __supportedElementTypes = ['text', 'checkbox', 'radio', 'select'];

	  /**
	   * Return the value of the private `__supportedElementTypes` object.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   *
	   * @returns     {Array}       __supportedElementTypes         Types of elements supported by Formation.
	   */
	  this.getSupportedElementTypes = function () {
	    return __supportedElementTypes;
	  };

	  /**
	   * Object composed of a {bodyEventsHandlerStamp} which handles body events.
	   *
	   * @access      public
	   * @type        {Object}
	   * @memberOf    {Formation.formation}
	   * @default     null
	   */
	  var __bodyEventsHandler = null;

	  /**
	   * Add the default event handlers for the `body` element, iff that has not already taken place.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   *
	   * @param       {Formation.bodyEventsHandler}     bodyEventsHandler     Object which is composed of a `bodyEventsHandlerStamp`. Required.
	   *
	   * @returns     {Formation.formation}
	   */
	  this.initBodyEvents = function (bodyEventsHandler) {
	    _this2.log('Initializing body events...');

	    // TODO - do check on `bodyEventsHandler` before setting `__bodyEventsHandler`
	    __bodyEventsHandler = bodyEventsHandler;
	    __bodyEventsHandler.initLogging(_this2.getLogConsole());

	    if (__bodyEventsHandler.getEventsInitialized()) {
	      _this2.info('Body events previously initialized, skipping.');
	      return _this2;
	    }

	    // The events have not yet been added, so do so now.
	    __bodyEventsHandler.addDefaultEventHandlers();

	    return _this2;
	  };

	  /**
	   * For each registered Formation `form`, initialize its DOM and the
	   * various events which should be handled.
	   *
	   * @access      public
	   * @memberOf    {Formation.formation}
	   *
	   * @returns     {Formation.formation}
	   */
	  this.initForms = function () {
	    // Set up the individual forms.
	    __$forms.each(function (index, form) {
	      var $form = $(form);

	      _this2.initForm($form);
	    });

	    return _this2;
	  };
	});

	var formationLoggerStamp = formationStamp.compose(domNavigationStamp, consoleLoggerStamp);

	module.exports = formationLoggerStamp;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var consoleLoggerStamp = __webpack_require__(71);
	var domNavigationStamp = __webpack_require__(72);
	var eventDefinitionsStamp = __webpack_require__(73);
	var keyCodes = __webpack_require__(77);
	var stampit = __webpack_require__(3);
	var $ = __webpack_require__(74);

	/**
	 * Provide an interface for managing body events.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.bodyEventsHandler
	 * @mixin         Formation.bodyEventsHandler
	 *
	 * @mixes         Formation.toggleableConsole
	 * @mixes         Formation.domNavigation
	 * @mixes         Formation.eventDefinitions
	 */
	var bodyEventsHandlerStamp = stampit().refs({

	  /**
	   * The jQuery extended `body` element.
	   *
	   * @access      public
	   * @type        {jQuery}
	   * @memberOf    {Formation.bodyEventsHandler}
	   * @default     null
	   */
	  $body: null,

	  /**
	   * A singleton passed along so we have some semblance of
	   * a global Formation event emitter.
	   *
	   * @access      public
	   * @type        {Formation.eventEmitterStamp}
	   * @memberOf    {Formation.bodyEventsHandler}
	   * @default     null
	   */
	  nodeEvents: null
	}).methods({

	  /**
	   * Adds a default event handler for both the `keypress` and `keyup` events
	   * and sets the initialized flag to be `true`.
	   *
	   * @access      public
	   * @memberOf    {Formation.bodyEventsHandler}
	   * @mixes       {Formation.bodyEventsHandler}
	   *
	   * @returns     {Formation.bodyEventsHandler}
	   */
	  addDefaultEventHandlers: function addDefaultEventHandlers() {
	    var _this = this;

	    this.$body.on(this.getKeyPressEventName(), function (event) {
	      return _this.bodyKeyPressHandler(event);
	    }).on(this.getKeyUpEventName(), function (event) {
	      return _this.bodyKeyUpHandler(event);
	    });

	    this.setEventsInitialized(true);

	    return this;
	  },


	  /**
	   * When the user presses the ENTER key inside an `input` element of a Formation `form`,
	   * return whether the `formComponent` should allow the body key press event to progress.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.bodyEventsHandler}
	   * @mixes       {Formation.bodyEventsHandler}
	   *
	   * @param       {jQuery.Event}        event       jQuery `keypress` event object. Required.
	   *
	   * @returns     {Boolean}             allowKeyEventToProgress
	   */
	  bodyKeyPressHandler: function bodyKeyPressHandler(event) {
	    var $target = $(event.target);
	    var userPressedEnterInInputField = event.which === keyCodes.ENTER && $target.prop('tagName').toLowerCase() === 'input' && $.inArray($target.prop('type'), ['radio', 'checkbox']) === -1;

	    var allowKeyEventToProgress = true;

	    if (userPressedEnterInInputField) {
	      var formComponent = this.getFormComponentOfCurrentElement($target);
	      if (formComponent !== null) {
	        allowKeyEventToProgress = formComponent.shouldBodyKeyPressEventsProgress();
	      }
	    }

	    return allowKeyEventToProgress;
	  },


	  /**
	   * If the user presses the ENTER or SPACEBAR keys while a checkbox or radio
	   * Bootstrap form label is in focus, this will trigger the `click` event in
	   * order to select/deselect the focused form element. This is primarily for
	   * labels which visually encompass a hidden checkbox or radio field.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.bodyEventsHandler}
	   * @mixes       {Formation.bodyEventsHandler}
	   *
	   * @param       {jQuery.Event}        event       jQuery `keyup` event object. Required.
	   */
	  bodyKeyUpHandler: function bodyKeyUpHandler(event) {
	    if ($.inArray(event.which, [keyCodes.ENTER, keyCodes.SPACE]) === -1) {
	      return false;
	    }
	    var $target = $(event.target);
	    if (this.elementIsCustomRadioOrCheckboxWidget($target)) {
	      $target.trigger('click');
	    }
	  }
	});

	module.exports = bodyEventsHandlerStamp.compose(eventDefinitionsStamp, domNavigationStamp, consoleLoggerStamp);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var stampit = __webpack_require__(3);

	/**
	 * Provides a wrapper for the `console` log functions that takes into account a flag that can
	 * be set based on any arbitrary reason (e.g. environment, existence of a module, etc).
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.toggleableConsole
	 * @mixin         Formation.toggleableConsole
	 */
	var toggleableConsoleStamp = stampit().refs({

	  /**
	   * The original `console` object which we are wrapping.
	   *
	   * @access      public
	   * @type        {Object}
	   * @memberOf    {Formation.toggleableConsole}
	   * @default     console
	   */
	  console: console,

	  /**
	   * A singleton passed along so we have some semblance of
	   * a global Formation event emitter.
	   *
	   * @access      public
	   * @type        {Formation.eventEmitter}
	   * @memberOf    {Formation.toggleableConsole}
	   * @default     null
	   */
	  nodeEvents: null
	}).methods({

	  /**
	   * If console logging is enabled, output an `error` message to the console.
	   *
	   * @access      public
	   * @memberOf    {Formation.toggleableConsole}
	   * @mixes       {Formation.toggleableConsole}
	   *
	   * @param       {*}           message         The message/object/array/whatever to log as an error. Required.
	   */
	  error: function error(message) {
	    if (this.getLogConsole()) {
	      this.console.error(message);
	    }
	  },


	  /**
	   * If console logging is enabled, output an `info` message to the console.
	   *
	   * @access      public
	   * @memberOf    {Formation.toggleableConsole}
	   * @mixes       {Formation.toggleableConsole}
	   *
	   * @param       {*}           message         The message/object/array/whatever to log as information. Required.
	   */
	  info: function info(message) {
	    if (this.getLogConsole()) {
	      this.console.info(message);
	    }
	  },


	  /**
	   * If console logging is enabled, output a message to the console.
	   *
	   * @access      public
	   * @memberOf    {Formation.toggleableConsole}
	   * @mixes       {Formation.toggleableConsole}
	   *
	   * @param       {*}           message         The message/object/array/whatever to log as a message. Required.
	   */
	  log: function log(message) {
	    if (this.getLogConsole()) {
	      this.console.log(message);
	    }
	  },


	  /**
	   * If console logging is enabled, output a `warn` message to the console.
	   *
	   * @access      public
	   * @memberOf    {Formation.toggleableConsole}
	   * @mixes       {Formation.toggleableConsole}
	   *
	   * @param       {*}           message         The message/object/array/whatever to log as a warning. Required.
	   */
	  warn: function warn(message) {
	    if (this.getLogConsole()) {
	      this.console.warn(message);
	    }
	  }
	}).init(function () {
	  var _this = this;

	  /**
	   * Flag indicating whether or not to call the wrapped method.
	   *
	   * @access      private
	   * @type        Boolean
	   * @memberOf    {Formation.toggleableConsole}
	   * @default     false
	   */
	  var logConsole = false;

	  /**
	   * Return the value of the private `logConsole` flag.
	   *
	   * @access      public
	   * @memberOf    {Formation.toggleableConsole}
	   *
	   * @returns     {Boolean}        debug           Flag indicating whether we're using the console logging methods.
	   */
	  this.getLogConsole = function () {
	    return logConsole;
	  };

	  /**
	   * Set the private `logConsole` flag on the Formation object.
	   *
	   * @throws      TypeError                               if the `newVal` param is not a boolean.
	   * @access      public
	   * @memberOf    {Formation.toggleableConsole}
	   *
	   * @param       {Boolean}                         newVal      Flag indicating whether we're turning console logging on or off. Required.
	   *
	   * @returns     {Formation.toggleableConsole}     this        Return the instance of the generated object so we can chain methods.
	   */
	  this.setLogConsole = function (newVal) {
	    var callStackCurrent = 'toggleableConsoleStamp.setLogConsole';
	    if (typeof newVal !== 'boolean') {
	      throw new TypeError(callStackCurrent + '() - Expected `newVal` param to be a Boolean, but is `' + (typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) + '`.');
	    }

	    logConsole = newVal;

	    // So we can chain methods.
	    return _this;
	  };

	  /**
	   * Helper function that sets initial console logging and listens for an
	   * event which can turn it on or off.
	   *
	   * @access      public
	   * @memberOf    {Formation.toggleableConsole}
	   *
	   * @param       {Boolean}                         initial     Initial console logging flag. Required.
	   *
	   * @returns     {Formation.toggleableConsole}     this        Return the instance of the generated object so we can chain methods.
	   */
	  this.initLogging = function (initial) {
	    _this.setLogConsole(initial);
	    _this.nodeEvents.on(_this.nodeEvents.getNodeSetDebugEvent(), _this.setLogConsole);

	    return _this;
	  };
	});

	module.exports = toggleableConsoleStamp;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eventDefinitionsStamp = __webpack_require__(73);

	var stampit = __webpack_require__(3);
	var $ = __webpack_require__(74);

	/**
	 * Formation-specific DOM navigation and modification.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.domNavigation
	 * @mixin         Formation.domNavigation
	 *
	 * @mixes         Formation.eventDefinitions
	 */
	var domNavigationStamp = stampit().refs({

	  /**
	   * The element DOM attribute key which specifies whether a form is managed
	   * by Formation (1) or not (0).
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     data-fv-valid
	   */
	  formationDataAttrKey: 'data-formation',

	  /**
	   * The selector used to find a Formation `form` element.
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     null
	   */
	  formationSelector: null,

	  /**
	   * The element DOM attribute key which specifies whether the element
	   * is valid (1) or not (0).
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     data-fv-valid
	   */
	  validAttrKey: 'data-fv-valid',

	  /**
	   * The element DOM attribute key which specifies an `input` element "linked" to another.
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     data-fv-linked-input
	   */
	  linkedInputAttrKey: 'data-fv-linked-input',

	  /**
	   * The element DOM attribute key which specifies whether to clear the value
	   * of the element when it is hidden (1) or not (0).
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     data-fv-toggle-override-text
	   */
	  toggleOverrideTextAttrKey: 'data-fv-toggle-override-text',

	  /**
	   * The element DOM attribute key which specifies a group of input elements
	   * by the set's name (eg checkboxes or radios with the same name).
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     data-fv-group-container
	   */
	  groupedElementsContainerAttrKey: 'data-fv-group-container',

	  /**
	   * The Bootstrap stateful element attribute whose value is used for setting the element's innerHTML
	   * when set to the 'loading' state.
	   *
	   * @access      public
	   * @type        String
	   * @memberOf    {Formation.domNavigation}
	   * @default     data-fv-submitting
	   */
	  submittingStateDataKey: 'data-fv-submitting',

	  /**
	   * The data key used to to store a `formComponent` object on the `form` object.
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     formation-form
	   */
	  formationDataKey: 'formation-form',

	  /**
	   * The CSS selector used to find the form's optional input elements.
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     [data-fv-optional="1"]
	   */
	  optionalFieldsSelector: '[data-fv-optional="1"]',

	  /**
	   * The CSS selector used to find the form's preview button element.
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     [data-fv-form-preview]
	   */
	  previewButtonSelector: '[data-fv-form-preview]',

	  /**
	   * The CSS selector used to find the form's required input elements.
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     [data-fv-required="1"]
	   */
	  requiredFieldsSelector: '[data-fv-required="1"]',

	  /**
	   * The CSS selector used to find the form's submit button element.
	   *
	   * @access      private
	   * @type        {String}
	   * @memberOf    {Formation.domNavigation}
	   * @default     [data-fv-form-submit]
	   */
	  submitButtonSelector: '[data-fv-form-submit]'
	}).methods({

	  /**
	   * Return the `form` element in which `$element` resides.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @returns     {jQuery}       The jQuery wrapped `form` element.
	   */
	  findCurrentFormByTarget: function findCurrentFormByTarget($element) {
	    if ($element.prop('tagName').toLowerCase() === 'form' && $element.attr(this.formationDataAttrKey) !== undefined) {
	      return $element;
	    }
	    return $element.closest(this.formationSelector);
	  },


	  /**
	   * Find the `formComponent` for the `form` element in which the `$element` resides.
	   *
	   * @throws      TypeError                         if the `formComponent` is undefined, has no `isFormComponent` or `isFormComponent()` returns false
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}                          $element            The jQuery wrapped element for which to find the `formComponent` instance. Required.
	   *
	   * @returns     {Formation.formComponent|null}    formationForm       The `formComponent` if it is there, or null otherwise.
	   */
	  getFormComponentOfCurrentElement: function getFormComponentOfCurrentElement($element) {
	    var $currentForm = this.findCurrentFormByTarget($element);
	    var formComponent = null;

	    // if the element is not inside a formation form, don't bother checking the data, and return null.
	    if ($currentForm.length) {
	      formComponent = $currentForm.data(this.formationDataKey);
	      // TODO - use custom error classes
	      if (formComponent === undefined) {
	        throw new TypeError('The `' + this.formationDataKey + '` data object is not set.');
	      } else if (typeof formComponent.isFormComponent !== 'function' || !formComponent.isFormComponent()) {
	        throw new TypeError('The `' + this.formationDataKey + '` data object is not built from a `formComponent` stamp.');
	      }
	    }

	    return formComponent;
	  },


	  /**
	   * Find the required fields in the specified `$form` element.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}                $form               The jQuery wrapped `form` element. Required.
	   *
	   * @returns     {jQuery}                The set of required fields in the $form.
	   */
	  findRequiredFields: function findRequiredFields($form) {
	    return $form.find(this.requiredFieldsSelector);
	  },


	  /**
	   * Find the optional fields in the specified `$form` element.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}                $form               The jQuery wrapped `form` element. Required.
	   *
	   * @returns     {jQuery}                The set of optional fields in the $form.
	   */
	  findOptionalFields: function findOptionalFields($form) {
	    return $form.find(this.optionalFieldsSelector);
	  },


	  /**
	   * Find the Formation submit button in the specified `$form` element.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}                $form               The jQuery wrapped `form` element. Required.
	   *
	   * @returns     {jQuery}                The Formation submit button in the $form.
	   */
	  findSubmitButton: function findSubmitButton($form) {
	    return $form.find(this.submitButtonSelector);
	  },


	  /**
	   * Find the Formation preview button in the specified `$form` element.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}      $form               The jQuery wrapped `form` element. Required.
	   *
	   * @returns     {jQuery}      The Formation preview button in the $form.
	   */
	  findPreviewButton: function findPreviewButton($form) {
	    return $form.find(this.previewButtonSelector);
	  },


	  /**
	   * Check whether `$element` is a custom Formation Bootstrap Radio or Checkbox widget.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}      $element          The jQuery wrapped `form` element. Required.
	   *
	   * @returns     {Boolean}     tbr               Whether the element is a custom widget.
	   */
	  elementIsCustomRadioOrCheckboxWidget: function elementIsCustomRadioOrCheckboxWidget($element) {
	    var $currentForm = this.findCurrentFormByTarget($element);
	    var tbr = false;
	    if ($currentForm.length) {
	      tbr = $element.hasClass('btn-checkbox') || $element.hasClass('btn-radio');
	    }
	    return tbr;
	  },


	  /**
	   * Find the DOM element which acts as a container for a set of input elements
	   * with the same name as `$element`.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}        $element        The element whose container we want to find. Required.
	   *
	   * @returns     {jQuery}
	   */
	  getCheckboxOrRadioContainer: function getCheckboxOrRadioContainer($element) {
	    return this.findCurrentFormByTarget($element).find('[' + this.groupedElementsContainerAttrKey + '="' + $element.attr('name') + '"]');
	  },


	  /**
	   * Find all input elements in the current form with the same name as `$element`.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}        $element        The element whose name we want to find all elements for. Required.
	   *
	   * @returns     {jQuery}
	   */
	  getAllCheckboxesOrRadiosByName: function getAllCheckboxesOrRadiosByName($element) {
	    return this.findCurrentFormByTarget($element).find('input[name="' + $element.attr('name') + '"]');
	  },


	  /**
	   * Find the `label` element in the DOM for the supplied `$input` element.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}        $input      The source element used to find a `label` element. Required.
	   *
	   * @returns     {jQuery}        $inputLabel
	   */
	  getInputElementLabel: function getInputElementLabel($input) {
	    var $inputLabel = this.findCurrentFormByTarget($input).find('label[for="' + $input.prop('id') + '"]');

	    return $inputLabel;
	  },


	  /**
	   * Find the element in the DOM linked to `$source` and return it.
	   *
	   * @throws      Error                       iff the linked element is not found in the DOM when expected
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}        $source     The source element used to find a linked element. Required.
	   *
	   * @returns     {null|jQuery}   $tbr        The linked element if found, null otherwise.
	   */
	  getLinkedElement: function getLinkedElement($source) {
	    //let $checkboxLabel = this.getInputElementLabel($source);
	    var $tbr = null;
	    var linkedElementID = $source.attr(this.linkedInputAttrKey);
	    if (linkedElementID !== undefined) {
	      var $linkedElement = $('#' + linkedElementID);
	      if ($linkedElement.length === 0) {
	        throw new Error('Expected an element with a `' + this.linkedInputAttrKey + '` attribute equal to "' + linkedElementID + '".');
	      }

	      $tbr = $linkedElement;
	    }

	    return $tbr;
	  },


	  /**
	   * Will enable or disable the `$element` based on the `enable` param.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}        $element        The element to enable or disable. Required.
	   * @param       {Boolean}       enable          Whether to enable (true) or disable (false) the `$element`. Required.
	   *
	   * @returns     {Formation.domNavigation}
	   */
	  enableOrDisableElement: function enableOrDisableElement($element, enable) {
	    if (enable) {
	      $element.removeProp('disabled').removeClass('disabled');
	    } else {
	      $element.prop('disabled', 'disabled').addClass('disabled');
	    }

	    return this;
	  },


	  /**
	   * Will add or remove the `hidden` class of the `$element` based on the `show` param.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}        $element        The element to show or hide. Required.
	   * @param       {Boolean}       show            Whether to show (true) or hide (false) the `$element`. Required.
	   *
	   * @returns     {Formation.domNavigation}
	   */
	  showOrHideElement: function showOrHideElement($element, show) {
	    if (show) {
	      $element.removeClass('hidden');
	    } else {
	      $element.addClass('hidden');
	    }

	    return this;
	  },


	  /**
	   * Will show or hide the element linked to `$element` based on the `show` param.
	   * Handles when the linked element is in a Bootstrap `form-group`, as well as
	   * when it is not.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}        $element        The element to show or hide. Required.
	   * @param       {Boolean}       show            Whether to show (true) or hide (false) the `$element`. Required.
	   *
	   * @returns     {Formation.domNavigation}
	   */
	  showOrHideLinkedElement: function showOrHideLinkedElement($element, show) {
	    var $linkedElement = this.getLinkedElement($element);
	    if ($linkedElement === null) {
	      // no linked element, do nothing
	      return this;
	    }
	    var $linkedInputFormGroup = $linkedElement.closest('.form-group');

	    // The linked input may be part of a form group which contains other elements that need to be shown
	    // or hidden along with the linked element. If that's the case, the 'hidden' class only applies
	    // to the form group. If that's not the case, the linked element itself applies the 'hidden' class.
	    var hasFormGroup = $linkedInputFormGroup.length > 0;
	    if (hasFormGroup) {
	      this.showOrHideElement($linkedInputFormGroup, show);
	    }

	    // show and enable, or hide and disable, the $linkedElement.
	    this.enableOrDisableLinkedElement($linkedElement, show, !hasFormGroup);

	    return this;
	  },


	  /**
	   * Convenience method which, for the supplied `$linkedElement`, shows and enables
	   * it, or hides and disables it, based on the params.
	   *
	   * Takes into account whether
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param	      {jQuery}      $linkedElement        jQuery extended text-based `input` or `textarea` field. Required.
	   * @param       {Boolean}     enableAndShow         Flag indicating whether to show/enable, or hide/disable, the element. Required.
	   * @param       {Boolean}     elementHandlesHidden  Flag indicating whether the element handles its hidden/shown status. Required.
	   *
	   * @returns     {Formation.domNavigation}
	   */
	  enableOrDisableLinkedElement: function enableOrDisableLinkedElement($linkedElement, enableAndShow, elementHandlesHidden) {
	    if (enableAndShow) {
	      this.showEnableLinkedElement($linkedElement, elementHandlesHidden);
	    } else {
	      this.hideDisableLinkedElement($linkedElement, elementHandlesHidden);
	    }

	    return this;
	  },


	  /**
	   * Convenience method which, for the supplied `$element`, removes the `disabled` property,
	   * and removes the Twitter Bootstrap class of "disabled". If the `includeHidden` parameter
	   * is specified and is `true`, also removes the "hidden" class from the element.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param	      {jQuery}      $element          jQuery extended text-based `input` or `textarea` field. Required.
	   * @param       {Boolean}     removeHidden      Flag indicating whether to remove the 'hidden' class. Required.
	   *
	   * @returns     {Formation.domNavigation}
	   */
	  showEnableLinkedElement: function showEnableLinkedElement($element, removeHidden) {
	    this.enableOrDisableElement($element, true);
	    if (removeHidden) {
	      this.showOrHideElement($element, true);
	    }

	    return this;
	  },


	  /**
	   * Convenience method which, for the supplied `$element`, disables it and gives it the
	   * Twitter Bootstrap class of "disabled". If the `includeHidden` parameter is
	   * specified and is `true`, also adds the "hidden" class to the element. By default
	   * it will clear the value of the text input and set the `data-fv-valid` attribute to 0 (false),
	   * unless the `data-fv-toggle-override-text` is set on the linked input with a value of 0.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {jQuery}      $element          jQuery extended text-based `input` or `textarea` field. Required.
	   * @param       {Boolean}     includeHidden     Flag indicating whether to add the 'hidden' class. Required.
	   *
	   * @returns     {Formation.domNavigation}
	   */
	  hideDisableLinkedElement: function hideDisableLinkedElement($element, includeHidden) {
	    var clearValue = $element.attr(this.toggleOverrideTextAttrKey) === undefined || parseInt($element.attr(this.toggleOverrideTextAttrKey)) === 1;
	    if (clearValue) {
	      $element.val('').trigger(this.getSetValidationFlagEventName(), false);
	    }

	    this.enableOrDisableElement($element, false);
	    if (includeHidden) {
	      this.showOrHideElement($element, false);
	    }

	    return this;
	  },


	  /**
	   * Helper function to filter a jQuery set to return only elements that are
	   * not hidden nor disabled.
	   *
	   * @access      public
	   * @memberOf    {Formation.domNavigation}
	   * @mixes       {Formation.domNavigation}
	   *
	   * @param       {int}           index         The index of the element in the jQuery set.
	   * @param       {jQuery}        element       The DOM element to check.
	   *
	   * @returns     {Boolean}
	   */
	  visibleEnabledFilter: function visibleEnabledFilter(index, element) {
	    var $element = $(element);
	    var hiddenOrDisabled = $element.hasClass('hidden') || $element.prop('disabled') === "disabled" || $element.hasClass('disabled');
	    return !hiddenOrDisabled;
	  }
	});

	module.exports = domNavigationStamp.compose(eventDefinitionsStamp);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var stampit = __webpack_require__(3);

	/**
	 * Provides an interface for defining Formation DOM events. 
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.eventDefinitions
	 * @mixin         Formation.eventDefinitions
	 */
	var eventDefinitionsStamp = stampit().init(function () {
	  var _this = this;

	  /**
	   * Flag indicating whether the object's event handlers have been added.
	   *
	   * @access      private
	   * @type        Boolean
	   * @memberOf    {Formation.eventDefinitions}
	   * @default     false
	   */
	  var __eventsInitialized = false;

	  /**
	   * Return the value of the private `__eventsInitialized` flag.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {Boolean}                         __eventsInitialized        Flag indicating whether the event handlers have been added.
	   */
	  this.getEventsInitialized = function () {
	    return __eventsInitialized;
	  };

	  /**
	   * Set the private `__eventsInitialized` flag on the object.
	   *
	   * @throws      TypeError                                     if the `newVal` param is not a boolean.
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @param       {Boolean}                         newVal      Flag indicating whether the form's event handlers have been added. Required.
	   *
	   * @returns     {Formation.eventDefinitions}      this        Return the instance of the generated object so we can chain methods.
	   */
	  this.setEventsInitialized = function (newVal) {
	    var callStackCurrent = 'eventDefinitionsStamp.setEventsInitialized';
	    if (typeof newVal !== 'boolean') {
	      throw new TypeError(callStackCurrent + '() - Expected `newVal` param to be a Boolean, but is `' + (typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) + '`.');
	    }

	    __eventsInitialized = newVal;

	    // So we can chain methods.
	    return _this;
	  };

	  /**
	   * The event name for checking validation of the entire `form`.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __checkFormValidityEventName = 'check-form-validity.formation';

	  /**
	   * Returns the private `__checkFormValidityEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __checkFormValidityEventName      The private `__checkFormValidityEventName` property.
	   */
	  this.getCheckFormValidityEventName = function () {
	    return __checkFormValidityEventName;
	  };

	  /**
	   * Element 'onchange' events specific to Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __changeEventName = 'change.formation';

	  /**
	   * Returns the private `__changeEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __changeEventName       The private `__changeEventName` property.
	   */
	  this.getChangeEventName = function () {
	    return __changeEventName;
	  };

	  /**
	   * The `keypress` event name specific to Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __keyPressEventName = 'keypress.formation';

	  /**
	   * Returns the private `__keyPressEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __keyPressEventName       The private `__keyPressEventName` property.
	   */
	  this.getKeyPressEventName = function () {
	    return __keyPressEventName;
	  };

	  /**
	   * Element 'onkeyup' events specific to Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __keyUpEventName = 'keyup.formation';

	  /**
	   * Returns the private `__keyUpEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __keyUpEventName        The private `__keyUpEventName` property.
	   */
	  this.getKeyUpEventName = function () {
	    return __keyUpEventName;
	  };

	  /**
	   * Element 'onfocus' events specific to Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __focusEventName = 'focus.formation';

	  /**
	   * Returns the private `__focusEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __focusEventName        The private `__focusEventName` property.
	   */
	  this.getFocusEventName = function () {
	    return __focusEventName;
	  };

	  /**
	   * Element 'onblur' events specific to Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __blurEventName = 'blur.formation';

	  /**
	   * Returns the private `__blurEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __blurEventName       The private `__blurEventName` property.
	   */
	  this.getBlurEventName = function () {
	    return __blurEventName;
	  };

	  /**
	   * Element 'onmouseenter' events specific to Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __mouseEnterEventName = 'mouseenter.formation';

	  /**
	   * Returns the private `__mouseEnterEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __mouseEnterEventName       The private `__mouseEnterEventName` property.
	   */
	  this.getMouseEnterEventName = function () {
	    return __mouseEnterEventName;
	  };

	  /**
	   * Element 'onmouseleave' events specific to Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __mouseLeaveEventName = 'mouseleave.formation';

	  /**
	   * Returns the private `__mouseLeaveEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __mouseLeaveEventName       The private `__mouseLeaveEventName` property.
	   */
	  this.getMouseLeaveEventName = function () {
	    return __mouseLeaveEventName;
	  };

	  /**
	   * Element 'ontouchstart' events specific to Formation.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __touchStartEventName = 'touchstart.formation';

	  /**
	   * Returns the private `__touchStartEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __touchStartEventName         The private `__touchStartEventName` property.
	   */
	  this.getTouchStartEventName = function () {
	    return __touchStartEventName;
	  };

	  /**
	   * All input events get a handler which can handle this event, which is
	   * for triggering validation checking on the target element.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __validationEventName = 'validation-handler.formation';

	  /**
	   * Returns the private `__validationEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __validationEventName     The private `__validationEventName` property.
	   */
	  this.getValidationEventName = function () {
	    return __validationEventName;
	  };

	  /**
	   * All input events get a handler which can handle this event, which is
	   * for setting the flag on the target element indicating whether it is valid.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __setValidationFlagEventName = 'set-validation-flag.formation';

	  /**
	   * Returns the private `__setValidationFlagEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __setValidationFlagEventName      The private `__setValidationFlagEventName` property.
	   */
	  this.getSetValidationFlagEventName = function () {
	    return __setValidationFlagEventName;
	  };

	  /**
	   * Event specifying when the validity flag for an element has changed.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {String}
	   * @memberOf    {Formation.eventDefinitions}
	   */
	  var __validityChangedEventName = 'validity-changed.formation';

	  /**
	   * Returns the private `__validityChangedEventName` property.
	   *
	   * @access      public
	   * @memberOf    {Formation.eventDefinitions}
	   *
	   * @returns     {String}      __validityChangedEventName     The private `__validityChangedEventName` property.
	   */
	  this.getValidityChangedEventName = function () {
	    return __validityChangedEventName;
	  };
	});

	module.exports = eventDefinitionsStamp;

/***/ },
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A set of keyboard event codes mapped to useful names.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.KeyCodeSet
	 */

	var KeyCodeSet = {
	  BACKSPACE: 8,
	  COMMA: 188,
	  DELETE: 46,
	  DOWN: 40,
	  END: 35,
	  ENTER: 13,
	  ESCAPE: 27,
	  HOME: 36,
	  LEFT: 37,
	  PAGE_DOWN: 34,
	  PAGE_UP: 33,
	  PERIOD: 190,
	  RIGHT: 39,
	  SPACE: 32,
	  TAB: 9,
	  UP: 38
	};

	module.exports = KeyCodeSet;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var consoleLoggerStamp = __webpack_require__(71);
	var domNavigationStamp = __webpack_require__(72);
	var eventDefinitionsStamp = __webpack_require__(73);
	var formComponentStamp = __webpack_require__(79);

	var stampit = __webpack_require__(3);
	var $ = __webpack_require__(74);

	/**
	 * Provides an interface for managing form element events
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.formEventsHandler
	 * @mixin         Formation.formEventsHandler
	 *
	 * @mixes         Formation.formComponent
	 * @mixes         Formation.domNavigation
	 * @mixes         Formation.toggleableConsole
	 * @mixes         Formation.eventDefinitions
	 */
	var formEventsHandlerStamp = stampit().refs({

	  /**
	   * A singleton passed along so we have some semblance of
	   * a global Formation event emitter.
	   *
	   * @access      public
	   * @type        {Formation.eventEmitter}
	   * @memberOf    {Formation.formEventsHandler}
	   * @default     null
	   */
	  nodeEvents: null
	}).methods({

	  /**
	   * Emit a node event when the form is submitted.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}       event       jQuery `submit` event object. Required.
	   *
	   * @returns     {Boolean}     true
	   */
	  formSubmitHandler: function formSubmitHandler(event) {
	    this.nodeEvents.emit(this.nodeEvents.getNodeFormSubmitEvent(), event);

	    return true;
	  },


	  /**
	   * Performs a final check to make sure all visible required fields are validated.
	   *
	   * Hidden required fields are only * actually * required when they're being displayed
	   * to the user. This is generally because an optional field toggles it, and thus
	   * only needs to be filled out when the user takes action to show it.
	   *
	   * If all necessary fields are valid, this will enable the submit button specified
	   * for the current form. Otherwise, the submit button is disabled.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}         event         jQuery `check-form-validity` event object. Required.
	   */
	  checkFormValidityHandler: function checkFormValidityHandler(event) {
	    if (event.namespace === undefined || event.namespace !== "formation") {
	      return;
	    }

	    var continueButton = this.getSubmitWithFallbackPreviewButton();
	    if (continueButton === null) {
	      // We don't have a submit or preview button, so there's really nothing to do.
	      return;
	    }

	    if (continueButton.isSubmitting()) {
	      // It's already submitting, don't change the state of the button.
	      return;
	    }

	    // Get the list of required, enabled, and visible fields.
	    var $visibleRequiredFields = this.get$requiredFields().filter(this.visibleEnabledFilter);

	    // Grab the list of valid visible required fields.
	    var $validRequiredFields = $visibleRequiredFields.filter('[' + this.validAttrKey + '="1"]');

	    // Everything is basically valid if all required fields are valid...
	    var validAfterRuleCheck = $visibleRequiredFields.length === $validRequiredFields.length;

	    continueButton.setEnabled(validAfterRuleCheck);

	    this.get$form().trigger(this.getSetValidationFlagEventName(), validAfterRuleCheck);
	  },


	  /**
	   * Checks for linked input elements and shows/hides them based on the status of the checkbox.
	   *
	   * Triggers a form validation check on the checkbox whose checked property was just changed.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}       event         jQuery `change` event object. Required.
	   */
	  checkBoxChangeHandler: function checkBoxChangeHandler(event) {
	    var $checkbox = $(event.target);

	    // Check for linked elements and show/hide them appropriately.
	    this.showOrHideLinkedElement($checkbox, $checkbox.is(':checked'));

	    // Trigger the form validation event.
	    $checkbox.trigger(this.getValidationEventName());
	  },


	  /**
	   * Checks for linked input elements and shows/hides them based on the status of the radio.
	   *
	   * Triggers a form validation check on the radio button whose value was just changed.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}       event         jQuery `change` event object. Required.
	   */
	  radioChangeHandler: function radioChangeHandler(event) {
	    var _this = this;

	    var $radio = $(event.target);

	    // Check for linked elements and show/hide them appropriately.
	    this.getAllCheckboxesOrRadiosByName($radio).each(function (index, radio) {
	      var $r = $(radio);
	      _this.showOrHideLinkedElement($r, $r.is(':checked'));
	    });

	    $radio.trigger(this.getValidationEventName());
	  },


	  /**
	   * Triggers a form validation check on the select element whose value was just changed.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}       event         jQuery `change` event object. Required.
	   */
	  selectChangeHandler: function selectChangeHandler(event) {
	    var $select = $(event.target);

	    $select.trigger(this.getValidationEventName());
	  },


	  /**
	   * Triggers a form validation check on the input or textarea whose value has
	   * changed due to the value of the element changing.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}       event         jQuery `change` event object. Required.
	   */
	  inputTextareaChangeHandler: function inputTextareaChangeHandler(event) {
	    var $target = $(event.target);

	    $target.trigger(this.getValidationEventName());
	  },


	  /**
	   * Triggers a form validation check on the input or textarea whose value has
	   * changed due to the user triggering a `keyup` event.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}       event         jQuery `keyup` event object. Required.
	   */
	  inputTextareaKeyUpHandler: function inputTextareaKeyUpHandler(event) {
	    var $target = $(event.target);

	    $target.trigger(this.getValidationEventName());
	  },


	  /**
	   * Trigger validation checks when the user focuses on a field.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}       event         jQuery `focus` event object. Required.
	   */
	  inputFocusHandler: function inputFocusHandler(event) {
	    var $input = $(event.target);

	    $input.trigger(this.getValidationEventName());
	  },


	  /**
	   * For each of the required and optional fields passed in with the event data,
	   * trigger the validation handler. This can be used to ensure that the form fields
	   * validation is checked even when the field doesn't know it's been changed, eg when
	   * a browser's autofill inputs values for known fields.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}       event         jQuery `mouseenter`, `mouseleave`, or `touchstart` event object. Required.
	   */
	  validateFormFields: function validateFormFields(event) {
	    var $fields = $().add(this.get$requiredFields()).add(this.get$optionalFields());
	    $fields.trigger(this.getValidationEventName()); // do we have to loop through these?
	  },


	  /**
	   * For all the inputs we are handling, trigger an event which will trigger
	   * element/type specific validation.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @returns     {Formation.formEventsHandler}
	   */
	  triggerValidationCheck: function triggerValidationCheck() {
	    this.getAllInputElementsToValidate().trigger(this.getValidationEventName());

	    return this;
	  },


	  /**
	   * Handle the form `validation-handler` event which will trigger a validator for
	   * the specific element/type being validated.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}         event         jQuery `validation-handler` Formation event object. Required.
	   */
	  inputElementValidationHandler: function inputElementValidationHandler(event) {
	    if (event.namespace === null || event.namespace !== "formation") {
	      return;
	    }
	    var $triggeringFormInput = $(event.target);

	    // Validate this element
	    this.validate($triggeringFormInput);

	    // Check the validity of the whole form
	    this.get$form().trigger(this.getCheckFormValidityEventName());
	  },


	  /**
	   * Set the state of validation on the element with the new value.
	   *
	   * If the validity state actually changes, trigger the `validity-changed` event.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery.Event}          event                   jQuery `set-validation-flag` Formation event object. Required.
	   * @param       {Boolean}               validAfterRuleCheck     Flag indicating whether the event target is now valid. Required.
	   */
	  setValidationFlagHandler: function setValidationFlagHandler(event, validAfterRuleCheck) {
	    var $element = $(event.target);
	    var type = this.getInputType($element);
	    var $elementToCheckAndSetAttr = $element;

	    // TODO - re-use `ruleSetStamp.getAttributeOwner()` for this check
	    if ($.inArray(type, ['checkbox', 'radio']) !== -1) {
	      $elementToCheckAndSetAttr = this.getCheckboxOrRadioContainer($element);
	    }

	    var validBeforeRuleCheck = parseInt($elementToCheckAndSetAttr.attr(this.validAttrKey)) === 1;

	    // Set the value
	    $elementToCheckAndSetAttr.attr(this.validAttrKey, validAfterRuleCheck === true ? 1 : 0);

	    // If the value changed, trigger the validity changed event on the EVENT element
	    var validityChanged = validBeforeRuleCheck && !validAfterRuleCheck || !validBeforeRuleCheck && validAfterRuleCheck;
	    if (validityChanged) {
	      $element.trigger(this.getValidityChangedEventName());
	    }
	  },


	  /**
	   * Attempt to validate the specified form element. When done, trigger an event
	   * to set the state of validation on the element with the result of the check.
	   *
	   * The `this` object is expected to refer to an instance of this class.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @param       {jQuery}            $element      The jQuery wrapped element to validate. Required.
	   */
	  validate: function validate($element) {
	    var lowerTag = $element.prop('tagName').toLowerCase();
	    var type = this.getInputType($element);

	    if (type === null) {
	      this.warn('No rules class exists for the tag `' + lowerTag + '`.');
	      return;
	    }

	    var registeredRules = this.getRuleSetBySupportedElementType(type);
	    var validAfterRuleCheck = registeredRules.process($element);

	    $element.trigger(this.getSetValidationFlagEventName(), validAfterRuleCheck);
	  }
	}).init(function () {
	  var _this2 = this;

	  /**
	   * Helper function that users of this Stamp can use to determine if an object is composed
	   * of this Stamp.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   *
	   * @returns     {Boolean}       true
	   */
	  this.isFormEventHandler = function () {
	    return true;
	  };

	  /**
	   * Types of `input` elements that take in characters from the keyboard.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {Array}
	   * @memberOf    {Formation.formEventsHandler}
	   */
	  var __inputTypes = ['text', 'password', 'email', 'number', 'tel'];

	  /**
	   * Return the private `__inputTypes` var.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   *
	   * @returns     {Array}       __inputTypes
	   */
	  this.getInputTypesArr = function () {
	    return __inputTypes;
	  };

	  /**
	   * Return a Formation-friendly string indicating the type of an element.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   *
	   * @param       {jQuery}            $element      The jQuery wrapped element to check. Required.
	   *
	   * @returns     {String|null}       type          The determined input type.
	   */
	  this.getInputType = function ($element) {
	    var lowerTag = $element.prop('tagName').toLowerCase();
	    var elementType = $element.prop('type');

	    var type = null;
	    if (lowerTag === 'textarea' || lowerTag === 'input' && $.inArray(elementType, _this2.getInputTypesArr()) !== -1) {
	      type = 'text';
	    } else if (elementType === 'checkbox') {
	      type = 'checkbox';
	    } else if (elementType === 'radio') {
	      type = 'radio';
	    } else if (lowerTag === 'select') {
	      type = 'select';
	    }

	    return type;
	  };

	  /**
	   * Checks whether this instance has been initialized, or if there is a `formEventsHandlerStamp` attached to
	   * the `$form` element already which has been initialized.
	   *
	   * @private
	   * @access      private
	   * @type        {Function}
	   * @memberOf    {Formation.formEventsHandler}
	   *
	   * @returns     {Boolean}                     False iff neither this instance, nor the `formComponent` attached to the `$form`, have been initialized.
	   */
	  var __formEventsAlreadyInitialized = function __formEventsAlreadyInitialized() {
	    var alreadyInit = _this2.getEventsInitialized();
	    try {
	      var formEventsHandler = void 0;
	      var $form = _this2.get$form();
	      alreadyInit = alreadyInit || (formEventsHandler = _this2.getFormComponentOfCurrentElement($form)) !== null && formEventsHandler.getEventsInitialized();
	    } catch (e) {
	      // TODO - handle this as a custom error thrown by `getFormComponentOfCurrentElement()`
	      _this2.info(e);
	    }
	    return alreadyInit;
	  };

	  /**
	   * Add the default event handlers for a form's various input element,
	   * iff that has not already taken place.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   *
	   * @returns     {Formation.formEventsHandler}
	   */
	  this.initFormEvents = function () {
	    if (__formEventsAlreadyInitialized()) {
	      _this2.warn('Form events previously initialized for this form, skipping.');
	      return _this2;
	    }

	    _this2.initLogging(_this2.getLogConsole()).addDefaultEventHandlers().triggerValidationCheck();

	    return _this2;
	  };

	  /**
	   * The form element types which get validated.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {Array}
	   * @memberOf    {Formation.formEventsHandler}
	   */
	  var __inputElementTypesToValidate = ['input', 'textarea', 'select'];

	  /**
	   * Finds all form input elements to be validated and returns a
	   * jQuery object containing them.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   *
	   * @returns     {jQuery}
	   */
	  this.getAllInputElementsToValidate = function () {
	    var inputElementTypesToValidate = __inputElementTypesToValidate.join(', ');

	    return _this2.get$form().find(inputElementTypesToValidate);
	  };

	  /**
	   * Adds a form submit event handler, as well as various change, keyup, focus, and
	   * movement events to the various form input element types, as well as Formation-specific
	   * events.
	   *
	   * Sets the initialized flag to be `true`.
	   *
	   * @access      public
	   * @memberOf    {Formation.formEventsHandler}
	   * @mixes       {Formation.formEventsHandler}
	   *
	   * @returns     {Formation.formEventsHandler}     this        Return the instance of the generated object so we can chain methods.
	   */
	  this.addDefaultEventHandlers = function () {
	    var joinStr = ', ';
	    var allInputElementsSelector = __inputElementTypesToValidate.join(joinStr);
	    var mouseMoveTouchEvents = [_this2.getMouseEnterEventName(), _this2.getMouseLeaveEventName(), _this2.getTouchStartEventName()].join(joinStr);

	    var textElementsSelector = __inputTypes.map(function (type) {
	      return 'input[type="' + type + '"]';
	    }).join(joinStr) + ', textarea';

	    _this2.get$form().submit(function (event) {
	      return _this2.formSubmitHandler(event);
	    }).on(_this2.getChangeEventName(), 'input:checkbox', function (event) {
	      return _this2.checkBoxChangeHandler(event);
	    }).on(_this2.getChangeEventName(), 'input:radio', function (event) {
	      return _this2.radioChangeHandler(event);
	    }).on(_this2.getChangeEventName(), textElementsSelector, function (event) {
	      return _this2.inputTextareaChangeHandler(event);
	    }).on(_this2.getChangeEventName(), 'select', function (event) {
	      return _this2.selectChangeHandler(event);
	    }).on(_this2.getKeyUpEventName(), 'input, textarea', function (event) {
	      return _this2.inputTextareaKeyUpHandler(event);
	    }).on(_this2.getFocusEventName(), allInputElementsSelector, function (event) {
	      return _this2.inputFocusHandler(event);
	    }).on(_this2.getValidationEventName(), allInputElementsSelector, function (event) {
	      return _this2.inputElementValidationHandler(event);
	    }).on(_this2.getCheckFormValidityEventName(), function (event) {
	      return _this2.checkFormValidityHandler(event);
	    }).on(_this2.getSetValidationFlagEventName(), function (event, isValid) {
	      return _this2.setValidationFlagHandler(event, isValid);
	    }).on(_this2.getSetValidationFlagEventName(), allInputElementsSelector, function (event, isValid) {
	      return _this2.setValidationFlagHandler(event, isValid);
	    }).parent().on(mouseMoveTouchEvents, function (event) {
	      return _this2.validateFormFields(event);
	    });

	    _this2.setEventsInitialized(true);

	    return _this2;
	  };
	});

	module.exports = formEventsHandlerStamp.compose(formComponentStamp, eventDefinitionsStamp, domNavigationStamp, consoleLoggerStamp);

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var buttonComponentStamp = __webpack_require__(80);
	var checkboxDefaultRulesStamp = __webpack_require__(81);
	var consoleLoggerStamp = __webpack_require__(71);
	var domNavigationStamp = __webpack_require__(72);
	var radioDefaultRulesStamp = __webpack_require__(85);
	var ruleSetStamp = __webpack_require__(83);
	var selectDefaultRulesStamp = __webpack_require__(86);
	var textDefaultRulesStamp = __webpack_require__(87);

	var stampit = __webpack_require__(3);
	var $ = __webpack_require__(74);

	/**
	 * Provides an interface for form button elements (`button`, `input:submit`, etc).
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.formComponent
	 * @mixin         Formation.formComponent
	 *
	 * @mixes         Formation.toggleableConsole
	 * @mixes         Formation.domNavigation
	 */
	var formComponentStamp = stampit().refs({

	  /**
	   * A singleton passed along so we have some semblance of
	   * a global Formation event emitter.
	   *
	   * @access      public
	   * @type        {Formation.eventEmitter}
	   * @memberOf    {Formation.formComponent}
	   * @default     null
	   */
	  nodeEvents: null
	}).methods({

	  /**
	   * Checks whether the Formation body keypress event should progress. If
	   * there is a submit button registered to the form, then we allow it;
	   * otherwise we do not.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   * @mixes       {Formation.formComponent}
	   *
	   * @returns     {Boolean}       allowKeyEventToProgress
	   */
	  shouldBodyKeyPressEventsProgress: function shouldBodyKeyPressEventsProgress() {
	    var allowKeyEventToProgress = this.getSubmitButton() !== null && this.getSubmitButton().exists();
	    return allowKeyEventToProgress;
	  },


	  /**
	   * Register a Formation validation rule for the element type specified.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   * @mixes       {Formation.formComponent}
	   *
	   * @param       {String}                  elementType         The element type to which the rule applies. Required.
	   * @param       {Formation.rule}          rule                An instance of the ruleStamp. Required.
	   */
	  registerRule: function registerRule(elementType, rule) {
	    if (typeof rule.isFormationRule !== 'function' || !rule.isFormationRule()) {
	      throw new TypeError('The supplied `rule` object is not built from a `ruleStamp` stamp.');
	    }

	    this.getRuleSetBySupportedElementType(elementType).add(rule);
	  }
	}).init(function () {
	  var _this = this;

	  /**
	   * Helper function that users of this Stamp can use to determine if an object is composed
	   * of this Stamp.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {Boolean}       true
	   */
	  this.isFormComponent = function () {
	    return true;
	  };

	  /**
	   * The jQuery object containing the initialized form node.
	   *
	   * @private
	   * @access      private
	   * @type        {jQuery}
	   * @memberOf    {Formation.formComponent}
	   * @default     $()
	   */
	  var __$form = $();

	  /**
	   * Returns the jQuery object containing the initialized form node.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {jQuery}       __$form
	   */
	  this.get$form = function () {
	    return __$form;
	  };

	  /**
	   * The initialization status.
	   *
	   * @private
	   * @access      private
	   * @type        {Boolean}
	   * @memberOf    {Formation.formComponent}
	   * @default     false
	   */
	  var __initialized = false;

	  /**
	   * Returns the initialization status of this instance.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {boolean}       __initialized
	   */
	  this.initialized = function () {
	    return __initialized;
	  };

	  /**
	   * Checks whether this instance has been initialized, or if there is a `formComponent` attached to
	   * the `$form` element already which has been initialized.
	   *
	   * @private
	   * @access      private
	   * @type        {Function}
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {Boolean}                     False iff neither this instance, nor the `formComponent` attached to the `$form`, have been initialized.
	   */
	  var __formAlreadyInitialized = function __formAlreadyInitialized() {
	    var alreadyInit = _this.initialized();
	    try {
	      var formComponent = void 0;
	      var $form = _this.get$form();
	      alreadyInit = alreadyInit || (formComponent = _this.getFormComponentOfCurrentElement($form)) !== null && formComponent.initialized();
	    } catch (e) {
	      // TODO - handle this as a custom error thrown by `getFormComponentOfCurrentElement()`
	      _this.info(e);
	    }
	    return alreadyInit;
	  };

	  /**
	   * The meat of this Stamp. Will initialize a jQuery wrapped `form` and assign it internally,
	   * setting all the required and optional fields, the form buttons (such as submit and preview),
	   * and initializing the fields' current validation status. If everything went without error,
	   * sets the `__initialized` flag to `true` so that we can't re-initialize the `$form`.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @param       {jQuery}        $form               jQuery wrapped `form` element to be managed by this instance. Required.
	   *
	   * @returns     {Formation.formComponent}
	   */
	  this.initForm = function ($form) {
	    // Set the form so we can use it internally elsewhere.
	    __$form = $form;

	    if (__formAlreadyInitialized()) {
	      _this.warn('This `formComponent` is already initialized, skipping.');
	      return _this;
	    }

	    // Get the required and optional fields, and the submit and preview buttons present in the form.
	    __setRequiredFields();
	    __setOptionalFields();
	    __initFields();
	    __initFormButtons();
	    __initDefaultRules();

	    // There were no problems initializing the form, set the data and the private vars.
	    __$form.data(_this.formationDataKey, _this);
	    __initialized = true;

	    return _this;
	  };

	  /**
	   * The jQuery object containing the elements in this form that are required to be validated.
	   *
	   * @private
	   * @access      private
	   * @type        {jQuery}
	   * @memberOf    {Formation.formComponent}
	   * @default     $()
	   */
	  var __$requiredFields = $();

	  /**
	   * Returns the jQuery object containing the elements in this form that are required to be validated.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {jQuery}       __$requiredFields
	   */
	  this.get$requiredFields = function () {
	    return __$requiredFields;
	  };

	  /**
	   * Find the required fields and set them to the private `__$requiredFields` var.
	   *
	   * @throws      Error       iff the set of required fields is empty.
	   * @private
	   * @access      private
	   * @type        {Function}
	   * @memberOf    {Formation.formComponent}
	   */
	  var __setRequiredFields = function __setRequiredFields() {
	    __$requiredFields = _this.findRequiredFields(__$form);
	    if (!__$requiredFields.length) {
	      // TODO - use a custom error type here
	      throw new Error('No required fields found, cannot proceed.');
	    }
	  };

	  /**
	   * The jQuery object containing the elements in this form that are optional to be validated.
	   *
	   * @private
	   * @access      private
	   * @type        {jQuery}
	   * @memberOf    {Formation.formComponent}
	   * @default     $()
	   */
	  var __$optionalFields = $();

	  /**
	   * Returns the jQuery object containing the elements in this form that are optional to be validated.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {jQuery}       __$optionalFields
	   */
	  this.get$optionalFields = function () {
	    return __$optionalFields;
	  };

	  /**
	   * Find the optional fields and set them to the private `__$optionalFields` var.
	   *
	   * @private
	   * @access      private
	   * @type        {Function}
	   * @memberOf    {Formation.formComponent}
	   */
	  var __setOptionalFields = function __setOptionalFields() {
	    __$optionalFields = _this.findOptionalFields(__$form);
	  };

	  /**
	   * Initialize (or reset) the validity of the `form`, and the
	   * required and optional fields to `false` (0).
	   *
	   * @private
	   * @access      private
	   * @type        {Function}
	   * @memberOf    {Formation.formComponent}
	   */
	  var __initFields = function __initFields() {
	    _this.get$form().attr(_this.validAttrKey, 0);
	    __$requiredFields.attr(_this.validAttrKey, 0);
	    __$optionalFields.attr(_this.validAttrKey, 0);
	  };

	  /**
	   * The jQuery object containing the form's submit button.
	   *
	   * @private
	   * @access      private
	   * @type        {buttonComponent}
	   * @memberOf    {Formation.formComponent}
	   * @default     null
	   */
	  var __submitButton = null;

	  /**
	   * Returns the `__submitButton`.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {Formation.buttonComponent}       __submitButton
	   */
	  this.getSubmitButton = function () {
	    return __submitButton;
	  };

	  /**
	   * The jQuery object containing the form's optional preview button.
	   *
	   * @private
	   * @access      private
	   * @type        {Formation.buttonComponent}
	   * @memberOf    {Formation.formComponent}
	   * @default     null
	   */
	  var __previewButton = null;

	  /**
	   * Returns the `__previewButton`.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {Formation.buttonComponent}       __previewButton
	   */
	  this.getPreviewButton = function () {
	    return __previewButton;
	  };

	  /**
	   * Get the submit button if it exists, otherwise get the preview button, if it exists.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {Formation.buttonComponent|null}
	   */
	  this.getSubmitWithFallbackPreviewButton = function () {
	    var submitButton = _this.getSubmitButton();
	    if (submitButton !== null && submitButton.exists()) {
	      return submitButton;
	    }
	    var previewButton = _this.getPreviewButton();
	    if (previewButton !== null && previewButton.exists()) {
	      return previewButton;
	    }

	    // We don't have a submit or preview button, so there's really nothing to do.
	    return null;
	  };

	  /**
	   * Create new `buttonComponents` to manage the Submit and Preview buttons
	   * for this form, and set them to the private `__submitButton` and
	   * `__previewButton` vars respectively.
	   *
	   * TODO - make `setLoadingHTML()` optional with a new `data-fv` attribute on the button
	   *
	   * @private
	   * @access      private
	   * @type        {Function}
	   * @memberOf    {Formation.formComponent}
	   */
	  var __initFormButtons = function __initFormButtons() {
	    __submitButton = buttonComponentStamp({
	      $button: _this.findSubmitButton(__$form),
	      loadingText: 'Submitting, please wait...',
	      nodeEvents: _this.nodeEvents
	    }).initLogging(_this.getLogConsole()).addHandleFormSubmitListener().setLoadingHTML();

	    __previewButton = buttonComponentStamp({
	      $button: _this.findPreviewButton(__$form),
	      loadingText: 'Rendering preview, please wait...',
	      nodeEvents: _this.nodeEvents
	    }).initLogging(_this.getLogConsole()).addHandleFormSubmitListener().setLoadingHTML();
	  };

	  /**
	   * The types of elements that are supported by Formation mapped to jQuery
	   * compatible selectors.
	   *
	   * @private
	   * @access      private
	   * @const
	   * @type        {Object}
	   * @memberOf    {Formation.formComponent}
	   */
	  var __supportedElementTypesMap = {
	    'text': 'input:text,input:password,input:email,input:tel,textarea',
	    'checkbox': 'input:checkbox',
	    'radio': 'input:radio',
	    'select': 'select'
	  };

	  /**
	   * Return the value of the private `__supportedElementTypesMap` object.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {Object}      __supportedElementTypesMap         Types of elements supported by Formation.
	   */
	  this.getSupportedElementTypesMap = function () {
	    return __supportedElementTypesMap;
	  };

	  /**
	   * Rule sets keyed by the supported element types.
	   *
	   * @private
	   * @access      private
	   * @type        {Object}
	   * @memberOf    {Formation.formComponent}
	   */
	  var __supportedElementTypesRuleSets = {
	    'text': ruleSetStamp(),
	    'checkbox': ruleSetStamp(),
	    'radio': ruleSetStamp(),
	    'select': ruleSetStamp()
	  };

	  /**
	   * Create default rule instances for the supported element types.
	   *
	   * @private
	   * @access      private
	   * @type        {Function}
	   * @memberOf    {Formation.formComponent}
	   */
	  var __initDefaultRules = function __initDefaultRules() {
	    var formationSelector = _this.formationSelector;
	    __supportedElementTypesRuleSets = {
	      'text': textDefaultRulesStamp({ formationSelector: formationSelector }),
	      'checkbox': checkboxDefaultRulesStamp({ formationSelector: formationSelector }),
	      'radio': radioDefaultRulesStamp({ formationSelector: formationSelector }),
	      'select': selectDefaultRulesStamp({ formationSelector: formationSelector })
	    };
	  };

	  /**
	   * Get all the supported rule sets.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @returns     {Object}
	   */
	  this.getSupportedElementTypeRuleSets = function () {
	    return __supportedElementTypesRuleSets;
	  };

	  /**
	   * Get the rule set to be applied to the specified supported element type.
	   *
	   * @access      public
	   * @memberOf    {formComponent}
	   *
	   * @param       {String}          type          The supported element type whose rules we want. Required.
	   *
	   * @returns     {Formation.ruleSet}
	   */
	  this.getRuleSetBySupportedElementType = function (type) {
	    return __supportedElementTypesRuleSets[type];
	  };

	  /**
	   * Set the rule set to be applied to the specified supported element type.
	   *
	   * @access      public
	   * @memberOf    {Formation.formComponent}
	   *
	   * @param       {String}                    type          The supported element type. Required.
	   * @param       {Formation.ruleSet}         rules         The rule set to be applied. Required.
	   */
	  this.setSupportedElementTypeRuleSet = function (type, rules) {
	    __supportedElementTypesRuleSets[type] = rules;
	  };
	});

	module.exports = formComponentStamp.compose(domNavigationStamp, consoleLoggerStamp);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var consoleLoggerStamp = __webpack_require__(71);
	var domNavigationStamp = __webpack_require__(72);
	var eventDefinitionsStamp = __webpack_require__(73);

	var stampit = __webpack_require__(3);

	/**
	 * Provides an interface for form button elements (`button`, `input:submit`, etc).
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.buttonComponent
	 * @mixin         Formation.buttonComponent
	 *
	 * @mixes         Formation.toggleableConsole
	 * @mixes         Formation.domNavigation
	 * @mixes         Formation.eventDefinitions
	 */
	var buttonComponentStamp = stampit().refs({

	  /**
	   * The jQuery `button` (or `input` equivalent) this component will manage.
	   *
	   * @access      public
	   * @type        {jQuery}
	   * @memberOf    {Formation.buttonComponent}
	   * @default     null
	   */
	  $button: null,

	  /**
	   * A singleton passed along so we have some semblance of
	   * a global Formation event emitter.
	   *
	   * @access      public
	   * @type        {Formation.eventEmitter}
	   * @memberOf    {Formation.buttonComponent}
	   * @default     null
	   */
	  nodeEvents: null,

	  /**
	   * The message that will be shown when this is in a `loading` state.
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.buttonComponent}
	   * @default     loading
	   */
	  loadingText: 'loading',

	  /**
	   * The element attribute in which we store the final `loading` state HTML.
	   *
	   * @access      public
	   * @type        {String}
	   * @memberOf    {Formation.buttonComponent}
	   * @default     data-loading-text
	   */
	  loadingTextDataKey: 'data-loading-text'
	}).methods({

	  /**
	   * Check whether the `$button` represents a non-empty jQuery object.
	   *
	   * @access      public
	   * @memberOf    {Formation.buttonComponent}
	   * @mixes       {Formation.buttonComponent}
	   *
	   * @returns     {Boolean}
	   */
	  exists: function exists() {
	    return this.$button !== null && this.$button.length > 0;
	  },


	  /**
	   * Check whether the `$button` is currently in a 'submitting' state.
	   *
	   * @access      public
	   * @memberOf    {Formation.buttonComponent}
	   * @mixes       {Formation.buttonComponent}
	   *
	   * @returns     {Boolean}       isSubmitting
	   */
	  isSubmitting: function isSubmitting() {
	    var isSubmitting = this.exists() && this.$button.attr(this.submittingStateDataKey) !== undefined && parseInt(this.$button.attr(this.submittingStateDataKey)) === 1;

	    return isSubmitting;
	  },


	  /**
	   * Will enable or disable the `$button` based on the `enable` param.
	   *
	   * @access      public
	   * @memberOf    {Formation.buttonComponent}
	   * @mixes       {Formation.buttonComponent}
	   *
	   * @param       {Boolean}       enable          Whether to enable (true) or disable (false) the `$button`. Required.
	   *
	   * @returns     {Formation.buttonComponent}
	   */
	  setEnabled: function setEnabled(enable) {
	    this.enableOrDisableElement(this.$button, enable);

	    return this;
	  },


	  /**
	   * Will set the `$button` to a `submitting` state or undo it depending on
	   * the `submitting` param.
	   *
	   * @access      public
	   * @memberOf    {Formation.buttonComponent}
	   * @mixes       {Formation.buttonComponent}
	   *
	   * @param       {Boolean}       submitting      Whether to set the `$button` to a submitting state (true) or not (false). Required.
	   *
	   * @returns     {Formation.buttonComponent}
	   */
	  setSubmitting: function setSubmitting(submitting) {
	    // TODO - the `button()` calls will throw an error until we get Bootstrap into the mix.
	    if (submitting) {
	      this.$button.attr(this.submittingStateDataKey, 1); //.button('loading');
	    } else {
	      this.$button.removeAttr(this.submittingStateDataKey); //.button('reset');
	    }

	    return this;
	  },


	  /**
	   * Add a node event that will listen for a form submit event and handle it.
	   *
	   * @access      public
	   * @memberOf    {Formation.buttonComponent}
	   * @mixes       {Formation.buttonComponent}
	   *
	   * @returns     {Formation.buttonComponent}
	   */
	  addHandleFormSubmitListener: function addHandleFormSubmitListener() {
	    var _this = this;

	    this.nodeEvents.on(this.nodeEvents.getNodeFormSubmitEvent(), function (event) {
	      return _this.handleFormSubmitEvent(event);
	    });

	    return this;
	  },


	  /**
	   * Disable the `button` element, indicate that it is submitting, and trigger
	   * its `blur` event so the user can't accidentally trigger form submission
	   * again with an enter or spacebar keypress.
	   *
	   * @access      public
	   * @memberOf    {Formation.buttonComponent}
	   * @mixes       {Formation.buttonComponent}
	   *
	   * @param       {jQuery.Event}        event       jQuery `submit` event object. Required.
	   */
	  handleFormSubmitEvent: function handleFormSubmitEvent(event) {
	    this.log('handleFormSubmitEvent() called for ' + this.$button.selector);
	    if (this.exists()) {
	      this.setEnabled(false).setSubmitting(true);

	      this.$button.trigger(this.getBlurEventName());
	    }
	  }
	}).init(function () {
	  var _this2 = this;

	  /**
	   * HTML that will be dynamically added to the element as part of
	   * what we show the user in the the button when it is submitting.
	   *
	   * @private
	   * @access      private
	   * @type        {String}
	   * @memberOf    {Formation.buttonComponent}
	   * @default     null
	   */
	  var __continueButtonSpinnerHTML = '<span class="glyphicon glyphicon-repeat spinning"></span>';

	  /**
	   * Generates loading text with spinner HTML and returns it.
	   *
	   * @private
	   * @access      private
	   * @type        {Function}
	   * @memberOf    {Formation.buttonComponent}
	   */
	  var getButtonLoadingTextWithSpinnerHTML = function getButtonLoadingTextWithSpinnerHTML() {
	    return __continueButtonSpinnerHTML + ' ' + _this2.loadingText;
	  };

	  /**
	   * Set the value of the loading text attribute to the constructed value.
	   *
	   * @access      public
	   * @memberOf    {Formation.buttonComponent}
	   *
	   * @returns     {Formation.buttonComponent}
	   */
	  this.setLoadingHTML = function () {
	    _this2.$button.attr(_this2.loadingTextDataKey, getButtonLoadingTextWithSpinnerHTML());

	    return _this2;
	  };
	});

	module.exports = buttonComponentStamp.compose(consoleLoggerStamp, domNavigationStamp, eventDefinitionsStamp);

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ruleStamp = __webpack_require__(82);
	var ruleSetStamp = __webpack_require__(83);

	var stampit = __webpack_require__(3);

	/**
	 * Used for processing a set of `Formation.rule` objects against `input:checkbox` elements.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.checkboxDefaultRules
	 * @mixin         Formation.checkboxDefaultRules
	 *
	 * @mixes         Formation.ruleSet
	 */
	var checkboxDefaultRulesStamp = stampit().methods({

	  /**
	   * The default checkbox button elements rule is that at least one of them is checked.
	   *
	   * @access      public
	   * @memberOf    {Formation.checkboxDefaultRules}
	   * @mixes       {Formation.checkboxDefaultRules}
	   *
	   * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  dataFvDefault: function dataFvDefault($checkbox, attribute) {
	    var $checkedCheckboxes = this.getAllCheckboxesOrRadiosByName($checkbox).filter(':checked');

	    return $checkedCheckboxes.length >= 1;
	  },


	  /**
	   * The default checkbox button elements rule is that at least one of them is checked.
	   *
	   * @access      public
	   * @memberOf    {Formation.checkboxDefaultRules}
	   * @mixes       {Formation.checkboxDefaultRules}
	   *
	   * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  dataFvMinSelected: function dataFvMinSelected($checkbox, attribute) {
	    var minSelected = parseInt(this.getAttributeOwner($checkbox).attr(attribute));

	    var $checkedCheckboxes = this.getAllCheckboxesOrRadiosByName($checkbox).filter(':checked');

	    return isNaN(minSelected) || $checkedCheckboxes.length >= minSelected;
	  },


	  /**
	   * Passes when the number of checked checkboxes is less than or equal to
	   * the number specified in the attribute.
	   *
	   * @access      public
	   * @memberOf    {Formation.checkboxDefaultRules}
	   * @mixes       {Formation.checkboxDefaultRules}
	   *
	   * @param       {jQuery}        $checkbox       The `checkbox` element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  dataFvMaxSelected: function dataFvMaxSelected($checkbox, attribute) {
	    var maxSelected = parseInt(this.getAttributeOwner($checkbox).attr(attribute));

	    var $checkedCheckboxes = this.getAllCheckboxesOrRadiosByName($checkbox).filter(':checked');

	    return isNaN(maxSelected) || $checkedCheckboxes.length <= maxSelected;
	  }
	}).init(function () {
	  var _this = this;

	  /**
	   * The default, pre-defined rules Formation will check during validation
	   * of checkbox button elements.
	   *
	   * @private
	   * @access      private
	   * @type        Array
	   * @memberOf    {Formation.checkboxDefaultRules}
	   */
	  var __rules = [ruleStamp({
	    name: 'default',
	    callback: function callback($checkbox, attribute) {
	      return _this.dataFvDefault($checkbox, attribute);
	    }
	  }), ruleStamp({
	    name: 'min-selected',
	    callback: function callback($checkbox, attribute) {
	      return _this.dataFvMinSelected($checkbox, attribute);
	    }
	  }), ruleStamp({
	    name: 'max-selected',
	    callback: function callback($checkbox, attribute) {
	      return _this.dataFvMaxSelected($checkbox, attribute);
	    }
	  })];

	  /**
	   * Return the value of the private `__rules` object.
	   *
	   * @access      public
	   * @memberOf    {Formation.checkboxDefaultRules}
	   *
	   * @returns     {Array}     __rules     The default rules we've defined.
	   */
	  this.getRules = function () {
	    return __rules;
	  };

	  /**
	   * Return the DOM element that the `formation` rule attributes and validity flag
	   * will be attached to for the element provided.
	   *
	   * An ancestor element holds attributes for Checkbox buttons.
	   *
	   * @access      public
	   * @memberOf    {Formation.checkboxDefaultRules}
	   *
	   * @param       {jQuery}    $element      The element to check. Required.
	   *
	   * @returns     {jQuery}
	   */
	  this.getAttributeOwner = function ($element) {
	    return _this.getCheckboxOrRadioContainer($element);
	  };
	});

	module.exports = ruleSetStamp.compose(checkboxDefaultRulesStamp);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stampit = __webpack_require__(3);

	/**
	 * Defines a rule, which contains a name used to identify when it's used,
	 * and a callback function to process the rule against an element.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.rule
	 * @mixin         Formation.rule
	 */
	var ruleStamp = stampit().refs({

	  /**
	   * The name of the rule, prefixed with `data-fv`, which will be used to
	   * reference it in a DOM element
	   *
	   * @throws      Error           The method for the rule is not implemented, so alert the user with an error
	   * @access      public
	   * @memberOf    {Formation.rule}
	   *
	   * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  name: 'undefined'
	}).methods({

	  /**
	   * The method that will attempt to satisfy the rule against `$element`.
	   *
	   * @throws      Error           The method for the rule is not implemented, so alert the user with an error
	   * @access      public
	   * @memberOf    {Formation.rule}
	   * @mixes       {Formation.rule}
	   *
	   * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  callback: function callback($element, attribute) {
	    throw new Error('Rule callback for `' + this.name + '` is not implemented');
	  }
	}).init(function () {

	  /**
	   * Helper function that users of this Stamp can use to determine if an object is composed
	   * of this Stamp.
	   *
	   * @access      public
	   * @memberOf    {Formation.rule}
	   *
	   * @returns     {Boolean}       true
	   */
	  this.isFormationRule = function () {
	    return true;
	  };
	});

	module.exports = ruleStamp;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var domNavigationStamp = __webpack_require__(72);
	var eventDefinitionsStamp = __webpack_require__(73);
	var validityChecksStamp = __webpack_require__(84);

	var stampit = __webpack_require__(3);

	/**
	 * Used for processing a set of `Formation.rule` objects against form DOM elements.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.ruleSet
	 * @mixin         Formation.ruleSet
	 *
	 * @mixes         Formation.domNavigation
	 * @mixes         Formation.eventDefinitions
	 * @mixes         Formation.validityChecks
	 */
	var ruleSetStamp = stampit().init(function () {
	  var _this = this;

	  /**
	   * Helper function that users of this Stamp can use to determine if an object is composed
	   * of this Stamp.
	   *
	   * @access      public
	   * @memberOf    {Formation.ruleSet}
	   *
	   * @returns     {Boolean}       true
	   */
	  this.isFormationRuleSet = function () {
	    return true;
	  };

	  /**
	   * Add a rule to this rule set.
	   *
	   * @access      public
	   * @memberOf    {Formation.ruleSet}
	   *
	   * @param       {Formation.rule}      rule        The rule to add to this set. Required.
	   *
	   * @returns     {Formation.ruleSet}   this
	   */
	  this.add = function (rule) {
	    // TODO - warn when the rule has already been added to this set
	    _this.getRules().push(rule);

	    return _this;
	  };

	  /**
	   * Return an empty array. This method is a stub.
	   *
	   * @access      public
	   * @memberOf    {Formation.ruleSet}
	   *
	   * @returns     {Array}     An empty array;
	   */
	  this.getRules = function () {
	    return [];
	  };

	  /**
	   * Return the DOM element that the `formation` rule attributes and validity flag
	   * will be attached to for the element provided. By default, it is the
	   * element itself.
	   *
	   * @access      public
	   * @memberOf    {Formation.ruleSet}
	   *
	   * @param       {jQuery}    $element      The element to check. Required.
	   *
	   * @returns     {jQuery}    $element
	   */
	  this.getAttributeOwner = function ($element) {
	    return $element;
	  };

	  /**
	   * Process the element against the set of registered rules that are actually being
	   * requested by the element's `data-fv` attributes. Return true iff the field passes
	   * all rules; false otherwise.
	   *
	   * @access      public
	   * @memberOf    {Formation.ruleSet}
	   *
	   * @param       {jQuery}    $element                The element upon which to process the rules. Required.
	   *
	   * @returns     {boolean}   validAfterRuleCheck     Whether the element passes all specified rules.
	   */
	  this.process = function ($element) {
	    var validAfterRuleCheck = true;
	    var $attributeOwner = _this.getAttributeOwner($element);
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = _this.getRules()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var rule = _step.value;

	        var ruleAttribute = 'data-fv-' + rule.name;
	        if (rule.name === 'default' || $attributeOwner.attr(ruleAttribute) !== undefined) {
	          validAfterRuleCheck = rule.callback($element, ruleAttribute);
	          if (!validAfterRuleCheck) {
	            break;
	          }
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return validAfterRuleCheck;
	  };
	});

	module.exports = ruleSetStamp.compose(domNavigationStamp, eventDefinitionsStamp, validityChecksStamp);

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stampit = __webpack_require__(3);

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
	var validityCheckStamp = stampit().methods({
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
	  isValidNumeric: function isValidNumeric(strToTest) {
	    var filter = /^(\d*)$/;

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
	  isValidZip: function isValidZip(strToTest) {
	    var part = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	    // satisfies `12345` and `12345-1234`
	    var filter = /^(\d{5})((\-(\d{4}))?)$/;

	    if (part === 4) {
	      filter = /^(\d{4})$/;
	    } else if (part === 5) {
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
	  isValidEmail: function isValidEmail(strToTest) {
	    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

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
	  isValidPhone: function isValidPhone(strToTest) {
	    var multi = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    var filter = /^\((\d{3})\)(\s)(\d{3})-(\d{4})$/;
	    if (multi) {
	      filter = /^(\d{10})|(\((\d{3})\)(\s)(\d{3})-(\d{4}))|((\d{3})-(\d{3})-(\d{4}))$/;
	    }

	    return filter.test(strToTest);
	  }
	});

	module.exports = validityCheckStamp;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ruleStamp = __webpack_require__(82);
	var ruleSetStamp = __webpack_require__(83);

	var stampit = __webpack_require__(3);

	/**
	 * Used for processing a set of `Formation.rule` objects against `input:radio` elements.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.radioDefaultRules
	 * @mixin         Formation.radioDefaultRules
	 *
	 * @mixes         Formation.ruleSet
	 */
	var radioDefaultRulesStamp = stampit().methods({

	  /**
	   * The default radio button elements rule is that at least one of them is checked.
	   *
	   * @access      public
	   * @memberOf    {Formation.radioDefaultRules}
	   * @mixes       {Formation.radioDefaultRules}
	   *
	   * @param       {jQuery}        $radio          The `radio` element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  dataFvDefault: function dataFvDefault($radio, attribute) {
	    var $checkedRadios = this.getAllCheckboxesOrRadiosByName($radio).filter(':checked');

	    return $checkedRadios.length == 1;
	  }
	}).init(function () {
	  var _this = this;

	  /**
	   * The default, pre-defined rules Formation will check during validation
	   * of radio button elements.
	   *
	   * @private
	   * @access      private
	   * @type        Array
	   * @memberOf    {Formation.radioDefaultRules}
	   */
	  var __rules = [ruleStamp({
	    name: 'default',
	    callback: function callback($radio, attribute) {
	      return _this.dataFvDefault($radio, attribute);
	    }
	  })];

	  /**
	   * Return the value of the private `__rules` object.
	   *
	   * @access      public
	   * @memberOf    {Formation.radioDefaultRules}
	   *
	   * @returns     {Array}     __rules     The default rules we've defined.
	   */
	  this.getRules = function () {
	    return __rules;
	  };

	  /**
	   * Return the DOM element that the `formation` rule attributes and validity flag
	   * will be attached to for the element provided.
	   *
	   * An ancestor element holds attributes for Radio buttons.
	   *
	   * @access      public
	   * @memberOf    {Formation.radioDefaultRules}
	   *
	   * @param       {jQuery}    $element      The element to check. Required.
	   *
	   * @returns     {jQuery}
	   */
	  this.getAttributeOwner = function ($element) {
	    return _this.getCheckboxOrRadioContainer($element);
	  };
	});

	module.exports = ruleSetStamp.compose(radioDefaultRulesStamp);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ruleStamp = __webpack_require__(82);
	var ruleSetStamp = __webpack_require__(83);

	var stampit = __webpack_require__(3);

	/**
	 * Used for processing a set of `Formation.rule` objects against `select` elements.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.selectDefaultRules
	 * @mixin         Formation.selectDefaultRules
	 *
	 * @mixes         Formation.ruleSet
	 */
	var selectDefaultRulesStamp = stampit().methods({

	  /**
	   * The default `select` elements rule is that it's trimmed value
	   * must not be empty.
	   *
	   * @access      public
	   * @memberOf    {Formation.selectDefaultRules}
	   * @mixes       {Formation.selectDefaultRules}
	   *
	   * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  dataFvDefault: function dataFvDefault($element, attribute) {
	    return $element.val().trim() !== '';
	  }
	}).init(function () {
	  var _this = this;

	  /**
	   * The default, pre-defined rules Formation will check during validation
	   * of text-based input elements.
	   *
	   * @private
	   * @access      private
	   * @type        Array
	   * @memberOf    {Formation.selectDefaultRules}
	   */
	  var __rules = [ruleStamp({
	    name: 'default',
	    callback: function callback($element, attribute) {
	      return _this.dataFvDefault($element, attribute);
	    }
	  })];

	  /**
	   * Return the value of the private `__rules` object.
	   *
	   * @access      public
	   * @memberOf    {Formation.selectDefaultRules}
	   *
	   * @returns     {Array}     __rules     The default rules we've defined.
	   */
	  this.getRules = function () {
	    return __rules;
	  };
	});

	module.exports = ruleSetStamp.compose(selectDefaultRulesStamp);

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ruleStamp = __webpack_require__(82);
	var ruleSetStamp = __webpack_require__(83);

	var stampit = __webpack_require__(3);
	var $ = __webpack_require__(74);

	/**
	 * Used for processing a set of `Formation.rule` objects against `select` elements.
	 *
	 * @copyright     Copyright (c) 2016, Derek Rosenzweig
	 * @author        Derek Rosenzweig <derek.rosenzweig@gmail.com>
	 * @package       Formation
	 * @namespace     Formation.textDefaultRules
	 * @mixin         Formation.textDefaultRules
	 *
	 * @mixes         Formation.ruleSet
	 */
	var textDefaultRulesStamp = stampit().methods({

	  /**
	   * The default text-based input elements rule is that
	   * it's trimmed value must not be empty.
	   *
	   * @access      public
	   * @memberOf    {Formation.textDefaultRules}
	   * @mixes       {Formation.textDefaultRules}
	   *
	   * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  dataFvDefault: function dataFvDefault($element, attribute) {
	    return $element.val().trim() !== '';
	  },


	  /**
	   * When a field has a minimum length, its trimmed value must be greater than
	   * or equal to the specified attribute value.
	   *
	   * @access      public
	   * @memberOf    {Formation.textDefaultRules}
	   * @mixes       {Formation.textDefaultRules}
	   *
	   * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  dataFvMinLength: function dataFvMinLength($element, attribute) {
	    var minChars = $element.attr(attribute);

	    return $element.val().trim().length >= parseInt(minChars);
	  },


	  /**
	   * When a field has a maximum length, its trimmed value must be less than
	   * or equal to the specified attribute value.
	   *
	   * @access      public
	   * @memberOf    {Formation.textDefaultRules}
	   * @mixes       {Formation.textDefaultRules}
	   *
	   * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}
	   */
	  dataFvMaxLength: function dataFvMaxLength($element, attribute) {
	    var maxChars = $element.attr(attribute);

	    return $element.val().trim().length <= parseInt(maxChars);
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
	   * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}       valid
	   */
	  dataFvFormat: function dataFvFormat($element, attribute) {
	    var format = $element.attr(attribute);
	    var valid = true;
	    var trimmedVal = $element.val().trim();
	    switch (format) {
	      case 'zip5':
	        valid = this.isValidZip(trimmedVal, 5);
	        break;
	      case 'zip4':
	        valid = this.isValidZip(trimmedVal, 4);
	        break;
	      case 'zip':
	        valid = this.isValidZip(trimmedVal);
	        break;
	      case 'email':
	        valid = this.isValidEmail(trimmedVal);
	        break;
	      case 'phone':
	        valid = this.isValidPhone(trimmedVal);
	        break;
	      case 'phone-multi':
	        valid = this.isValidPhone(trimmedVal, true);
	        break;
	      default:
	        // If it looks like a regex, test the value against it.
	        var formatMatch = format.match(/^\/(.*)\/$/);
	        if (formatMatch !== null) {
	          var formatAsRegex = new RegExp(formatMatch[1]);
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
	   * @param       {jQuery}        $element        The element upon which to apply the rule. Required.
	   * @param       {String}        attribute       The data attribute which may contain additional data. Required.
	   *
	   * @returns     {Boolean}       valid
	   */
	  dataFvMatchField: function dataFvMatchField($element, attribute) {
	    var matchOtherFieldID = $element.attr(attribute);
	    var $otherField = $('#' + matchOtherFieldID);
	    if ($otherField.length === 0) {
	      throw new Error('Expected an element with an ID equal to "' + matchOtherFieldID + '" on this form.');
	    }

	    var trimmedVal = $element.val().trim();
	    var otherFieldTrimmedVal = $otherField.val().trim();
	    var valid = trimmedVal === otherFieldTrimmedVal;

	    if (parseInt($otherField.attr('data-fv-required')) === 1) {
	      // Set the valid flag on the matched field
	      $otherField.trigger(this.getSetValidationFlagEventName(), valid);
	    }

	    return valid;
	  }
	}).init(function () {
	  var _this = this;

	  /**
	   * The default, pre-defined rules Formation will check during validation
	   * of text-based input elements.
	   *
	   * @private
	   * @access      private
	   * @type        Array
	   * @memberOf    {Formation.textDefaultRules}
	   */
	  var __rules = [ruleStamp({
	    name: 'default',
	    callback: function callback($element, attribute) {
	      return _this.dataFvDefault($element, attribute);
	    }
	  }), ruleStamp({
	    name: 'min-length',
	    callback: function callback($element, attribute) {
	      return _this.dataFvMinLength($element, attribute);
	    }
	  }), ruleStamp({
	    name: 'max-length',
	    callback: function callback($element, attribute) {
	      return _this.dataFvMaxLength($element, attribute);
	    }
	  }), ruleStamp({
	    name: 'format',
	    callback: function callback($element, attribute) {
	      return _this.dataFvFormat($element, attribute);
	    }
	  }), ruleStamp({
	    name: 'match-field',
	    callback: function callback($element, attribute) {
	      return _this.dataFvMatchField($element, attribute);
	    }
	  })];

	  /**
	   * Return the value of the private `__rules` object.
	   *
	   * @access      public
	   * @memberOf    {Formation.textDefaultRules}
	   *
	   * @returns     {Array}     __rules     The default rules we've defined.
	   */
	  this.getRules = function () {
	    return __rules;
	  };
	});

	module.exports = ruleSetStamp.compose(textDefaultRulesStamp);

/***/ }
]);