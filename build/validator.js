(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Validator = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
	'use strict';
	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	window.CrossValidator = require('./');
})();

},{"./":2}],2:[function(require,module,exports){
(function () {
	'use strict';
	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	module.exports = require('./validator/validator');
})();
},{"./validator/validator":6}],3:[function(require,module,exports){
(function () {
	'use strict';
	var util = require('./util');
	var validators = require('./validators');
	var Extractor = require('./extractor');

	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var exec = {
		constrains: [],
		loggerError: {},
		data: {},
		expressions: [],
		itemsToValidate: {}
	};

	var Validate = {
		validate: function () {
			exec.constrains.forEach(function (constrain) {
				exec.expressions = exec.expressions.concat(new Expressions(constrain));
			});

			exec.expressions.forEach(function (expression) {
				validators.exec(expression, exec.loggerError);
			});
		}
	};

	var DataValidator = {
		outErrors: function (error) {
			exec.loggerError = error;

			return this;
		},
		forData: function (data) {
			exec.data = data;

			return Validate;
		}
	};

	var ConstrainsValidator = {
		using: function (constrains) {

			exec.constrains = constrains;
			exec.loggerError = {};
			exec.data = {},
				exec.expressions = [];
			exec.itemsToValidate = {};

			return DataValidator;
		}
	};

	var Expressions = function (constrain) {
		var result = [];
		var items = [];

		var expression = util.expressionToArray(constrain);
		var method = expression.shift();
		var params = expression;

		params.forEach(function (param) {
			if (/^\$/.test(param)) {
				var itemsExtracted = new Extractor(exec.data).extract(param.replace('$', ''));
				items = items.concat(itemsExtracted);
			} else {
				items = items.concat(new LiteralItem(param));
			}
		});

		if (params.length === 1) {

			items.forEach(function (item) {
				result.push(new Expression(item, method));
			});

			return result;
		}

		result.push(new Expression(items, method));

		return result;
	};

	var LiteralItem = function (value) {
		return new Extractor(value).extract('literalvalue');
	};

	var Expression = function (items, method) {
		var expression = {};
		expression.method = method;
		expression.paramsValue = items;

		return expression;
	};

	module.exports = ConstrainsValidator;
})();
},{"./extractor":4,"./util":5,"./validators":8}],4:[function(require,module,exports){
(function () {
	'use strict';

	var util = require('./util');

	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 * @author Bruno M Marques <zaccabruno@gmail.com>
	 */
	var Extractor = function (data) {

		var object = data;

		this.extract = function (path) {
			return extractor(object, path);
		};

		var extractor = function (obj, fullPath, position, path, result) {

			if (fullPath === 'literalvalue') {
				result = [];
				result.push(new Item(fullPath, obj));
				return result;
			}

			var pathArr = fullPath.split('.');
			result = result || [];
			path = path || '';
			position = position || 0;

			obj = obj[pathArr[position]];
			path = path + '.' + pathArr[position];
			path = path.replace(/^\./, '');

			if (pathArr.length - 1 <= position) {
				result.push(new Item(path, obj));
				return result;
			}

			if (Array.isArray(obj)) {

				path = path.concat('[:index]');
				obj.forEach(function (item, index) {
					var newPath = path.replace(':index', index);
					extractor(item, fullPath, position + 1, newPath, result);
				});

				return result;
			}

			return extractor(obj, fullPath, position + 1, path, result);
		};

	};

	var Item = function (key, value) {
		this.key = key;
		this.value = value;
	};

	module.exports = Extractor;
})();
},{"./util":5}],5:[function(require,module,exports){
(function () {
	'use strict';
	/*global toString*/
	/**
	 * @name util
	 * @author Guilherme Mangabeira Gregio <guilherme@gregio.net>
	 */
	var util = {};

	util.isArray = Array.isArray;

	// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Object'].forEach(function (name) {
		util['is' + name] = function (obj) {
			return toString.call(obj) === '[object ' + name + ']';
		};
	});

	util.isEmpty = function (obj) {
		if (util.isArray(obj) || util.isString(obj) || util.isArguments(obj)) {
			return obj.length === 0;
		}

		if (util.isNumber(obj)) {
			return obj === 0;
		}

		for (var key in obj) {
			if (util.has(obj, key)) {
				return false;
			}
		}

		return true;
	};

	util.has = function (obj, key) {
		return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
	};

	util.deep = function (obj, key, value) {
		var keys = key.replace(/\[(["']?)([^\1]+?)\1?\]/g, '.$2').replace(/^\./, '').split('.'),
			root,
			i = 0,
			n = keys.length;

		if (arguments.length > 2) {
			// Set deep value
			root = obj;
			n--;

			while (i < n) {
				key = keys[i++];
				obj = obj[key] = util.isObject(obj[key]) ? obj[key] : {};
			}

			obj[keys[i]] = value;

			value = root;
		} else {
			// Get deep value
			var exec = true;
			while (exec && i < n) {
				exec = (obj = obj[keys[i++]]) != null;
			}
			value = i < n ? void 0 : obj;
		}

		return value;
	};

	util.expressionToArray = function (expression) {
		return expression.replace(/[\(\),]/g, '|').replace(/ /g, '').replace(/\|$/, '').split('|');
	};

	util.clone = function clone(item) {
		if (!item) {
			return item;
		} // null, undefined values check

		var types = [Number, String, Boolean],
			result;

		// normalizing primitives if someone did new String('aaa'), or new Number('444');
		types.forEach(function (type) {
			if (item instanceof type) {
				result = type(item);
			}
		});

		if (typeof result == "undefined") {
			if (Object.prototype.toString.call(item) === "[object Array]") {
				result = [];
				item.forEach(function (child, index, array) {
					result[index] = clone(child);
				});
			} else if (typeof item == "object") {
				// testing that this is DOM
				if (item.nodeType && typeof item.cloneNode == "function") {
					result = item.cloneNode(true);
				} else if (!item.prototype) { // check that this is a literal
					if (item instanceof Date) {
						result = new Date(item);
					} else {
						// it is an object literal
						result = {};
						var keys = Object.keys(item);

						for (var i = 0, itemLength = keys.length; i < itemLength; i++) {
							result[keys[i]] = clone(item[keys[i]]);
						}
					}
				} else {
					// depending what you would like here,
					// just keep the reference, or create new object
					if (false && item.constructor) {
						// would not advice to do that, reason? Read below
						result = new item.constructor();
					} else {
						result = item;
					}
				}
			} else {
				result = item;
			}
		}

		return result;
	};

	module.exports = util;
})();
},{}],6:[function(require,module,exports){
(function () {
	'use strict';
	var util = require('./util');
	var execValidators = require('./execValidators');
	var ValidatorResult = require('./validatorResult');

	/**
	 * Class Validator
	 * @param data Object
	 * @param constrains Array
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var Validator = function (data, constrains) {
		var _data = data;
		var _constrains = constrains;

		verifyData(_data);
		verifyConstrains(_constrains);

		this.getData = function () {
			return _data;
		};

		this.getConstrains = function () {
			return _constrains;
		};

		this.validate = function () {
			var errors = {};
			execValidators.using(this.getConstrains()).outErrors(errors).forData(this.getData()).validate();
			return new ValidatorResult(errors);
		};
	};

	function verifyData(data) {
		if (util.isEmpty(data) || !util.isObject(data)) {
			var message = 'Data is Invalid. Expected an Object not empty, but was given: :result';
			message = message.replace(":result", JSON.stringify(data, null, 4));

			throw new InvalidArguments(message);
		}
	}

	function verifyConstrains(constrains) {
		if (util.isEmpty(constrains) || !util.isArray(constrains)) {
			var message = 'Constrains is Invalid. Expected an Array not empty, but was given: :result';
			message = message.replace(":result", JSON.stringify(constrains, null, 4));

			throw new InvalidArguments(message);
		}
	}

	var InvalidArguments = function (message) {
		var error = new Error(message);
		error.name = 'InvalidArguments';
		throw error;
	};

	module.exports = Validator;
})();
},{"./execValidators":3,"./util":5,"./validatorResult":7}],7:[function(require,module,exports){
(function () {
	'use strict';
	var util = require('./util');
	var validators = require('./validators');

	/**
	 *
	 * @param errors
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var ValidatorResult = function (errors) {
		var _errors = util.clone(errors);

		this.hasErrors = function () {
			return !util.isEmpty(_errors);
		};

		this.getAllFailures = function () {
			return _errors;
		};

		this.getErrorsOf = function (field) {

			return util.deep(_errors, field);
		};

		this.forField = function (field) {
			return new FieldApi(field);
		};

		var FieldApi = function (field) {
			var self = this;
			Object.keys(validators).forEach(function (validator) {
				if (validator === 'exec' || validator === 'defaultMethod') {
					return;
				}

				var name = validator.charAt(0).toUpperCase() + validator.substring(1);

				var method = "has:ValidatorPassed".replace(":Validator", name);
				self[method] = function () {
					return (_errors[field] || []).indexOf(validator) === -1;
				};
			});
		};

	};

	module.exports = ValidatorResult;
})();
},{"./util":5,"./validators":8}],8:[function(require,module,exports){
(function () {
	'use strict';
	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var validators = {
		notEmpty: require('./validators/notEmpty'),
		isEmail: require('./validators/isEmail'),
		isNumber: require('./validators/isNumber'),
		defaultMethod: function () {
			return true;
		},
		exec: function (expression, loggerError) {
			var fn = (validators[expression.method] || validators.defaultMethod);

			if (!fn.call(this, expression.paramsValue)) {
				loggerError[expression.paramsValue.key] = loggerError[expression.paramsValue.key] || [];
				loggerError[expression.paramsValue.key].push(expression.method);
			}
		}
	};

	module.exports = validators;
})();
},{"./validators/isEmail":9,"./validators/isNumber":10,"./validators/notEmpty":11}],9:[function(require,module,exports){
(function () {
	'use strict';
	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var isEmail = function (item) {
		var isMail = /^[a-z0-9_]+@[a-z0-9_]+\.[a-z]{3}(\.[a-z]{2})?$/g;

		return isMail.test(item.value);
	};

	module.exports = isEmail;
})();
},{}],10:[function(require,module,exports){
(function () {
	'use strict';
	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var isNumber = function (item) {
		var isNumber = /^[0-9]+$/g;

		return isNumber.test(item.value);
	};

	module.exports = isNumber;
})();
},{}],11:[function(require,module,exports){
(function () {
	'use strict';
	var util = require('../util');

	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var notEmpty = function (item) {
		return !util.isEmpty(item.value);
	};

	module.exports = notEmpty;
})();
},{"../util":5}]},{},[1])(1)
});