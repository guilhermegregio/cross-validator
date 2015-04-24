var CrossValidator =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var ValidatorResult = __webpack_require__(2);
	var Expression = __webpack_require__(3);
	var CrossValidation = (function () {
	    function CrossValidation(data) {
	        this.data = data;
	    }
	    CrossValidation.forData = function (data) {
	        return new CrossValidation(data);
	    };
	    CrossValidation.prototype.using = function (constraints) {
	        this.constraints = constraints;
	        return this;
	    };
	    CrossValidation.prototype.isValid = function () {
	        return this.getResult().isValid();
	    };
	    CrossValidation.prototype.getResult = function () {
	        var _this = this;
	        var errors = Util.concatAll(this.constraints.map(function (constraint) {
	            var expr = new Expression(constraint, _this.data);
	            return expr.getMessageError();
	        }));
	        return new ValidatorResult(errors);
	    };
	    return CrossValidation;
	})();
	module.exports = CrossValidation;
	//# sourceMappingURL=cross-validation.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Util;
	(function (Util) {
	    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
	    var reEscapeChar = /\\(\\)?/g;
	    function toObject(value) {
	        return isObject(value) ? value : Object(value);
	    }
	    function isObject(value) {
	        return !!value && typeof value == 'object';
	    }
	    function baseToString(value) {
	        if (typeof value == 'string') {
	            return value;
	        }
	        return value == null ? '' : (value + '');
	    }
	    function toPath(value) {
	        if (Array.isArray(value)) {
	            return value;
	        }
	        var result = [];
	        baseToString(value).replace(rePropName, function (match, number, quote, string) {
	            result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	        });
	        return result;
	    }
	    function baseGet(object, path, pathKey) {
	        if (object == null) {
	            return;
	        }
	        if (pathKey !== undefined && pathKey in toObject(object)) {
	            path = [pathKey];
	        }
	        var index = -1, length = path.length;
	        while (object != null && ++index < length) {
	            var result = object = object[path[index]];
	        }
	        return result;
	    }
	    function get(object, path, defaultValue) {
	        var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
	        return result === undefined ? defaultValue : result;
	    }
	    Util.get = get;
	    function concatAll(array) {
	        var results = [];
	        array.forEach(function (subArray) {
	            subArray.forEach(function (item) {
	                results.push(item);
	            });
	        });
	        return results;
	    }
	    Util.concatAll = concatAll;
	})(Util || (Util = {}));
	module.exports = Util;
	//# sourceMappingURL=util.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var ValidatorResult = (function () {
	    function ValidatorResult(errors) {
	        if (errors === void 0) { errors = []; }
	        this.errors = errors;
	    }
	    ValidatorResult.prototype.isValid = function () {
	        return this.errors.length === 0;
	    };
	    ValidatorResult.prototype.getAllFailures = function () {
	        return this.errors;
	    };
	    ValidatorResult.prototype.getAllErrors = function (field) {
	        return this.errors.filter(function (error) {
	            return error.field === field;
	        });
	    };
	    ValidatorResult.prototype.getError = function (field, type) {
	        var error = this.errors.filter(function (error) {
	            return error.field === field;
	        }).filter(function (error) {
	            return error.type === type;
	        }).map(function (error) {
	            return error.message;
	        });
	        return error.length !== 0 ? error[0] : '';
	    };
	    return ValidatorResult;
	})();
	module.exports = ValidatorResult;
	//# sourceMappingURL=validatorResult.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Validators = __webpack_require__(4);
	var Expression = (function () {
	    function Expression(expression, data) {
	        this.separeteMethodParams(expression);
	        this.parseParams(data);
	        this.validator = Validators.getValidator(this.method, this.params, this.paramsParsed);
	    }
	    Expression.prototype.isValid = function () {
	        return this.validator.isValid();
	    };
	    Expression.prototype.getMessageError = function () {
	        var _this = this;
	        if (this.isValid()) {
	            return [];
	        }
	        return this.params.map(function (param) {
	            return {
	                field: param.replace(Expression.erStartWithDollar, ''),
	                type: _this.method,
	                message: _this.compileMessage()
	            };
	        });
	    };
	    Expression.prototype.separeteMethodParams = function (expression) {
	        var result = expression.match(Expression.erSepareMethodParams);
	        this.method = result[1];
	        this.params = result[2].replace(Expression.erSpaces, '').split(',');
	    };
	    Expression.prototype.parseParams = function (data) {
	        this.paramsParsed = this.params.map(function (param) {
	            if (Expression.erStartWithDollar.test(param)) {
	                return Util.get(data, param.replace(Expression.erStartWithDollar, ''));
	            }
	            return param;
	        });
	    };
	    Expression.prototype.compileMessage = function () {
	        var message = this.validator.getTemplateMessage();
	        this.params.forEach(function (param) {
	            message = message.replace('%s', param.replace(Expression.erStartWithDollar, ''));
	        });
	        return message;
	    };
	    Expression.erStartWithDollar = /^\$/;
	    Expression.erSepareMethodParams = /([a-zA-Z]+)\(([a-zA-Z0-9,$ ]+)\)+/;
	    Expression.erSpaces = /[ ]/g;
	    return Expression;
	})();
	module.exports = Expression;
	//# sourceMappingURL=expression.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Noop = __webpack_require__(5);
	var notNull = __webpack_require__(6);
	var isEmail = __webpack_require__(7);
	var isNumber = __webpack_require__(8);
	var notEmpty = __webpack_require__(9);
	var Validators = {
	    getValidator: getValidator,
	    notNull: notNull,
	    isEmail: isEmail,
	    isNumber: isNumber,
	    notEmpty: notEmpty
	};
	function getValidator(method, params, paramsParsed) {
	    if (!Validators[method]) {
	        return new Noop();
	    }
	    return new Validators[method](params, paramsParsed);
	}
	module.exports = Validators;
	//# sourceMappingURL=validators.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Noop = (function () {
	    function Noop() {
	    }
	    Noop.prototype.isValid = function () {
	        return true;
	    };
	    Noop.prototype.getTemplateMessage = function () {
	        return '';
	    };
	    return Noop;
	})();
	module.exports = Noop;
	//# sourceMappingURL=noop.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var notNull = (function () {
	    function notNull(params, paramsParsed) {
	        this.value = paramsParsed[0];
	    }
	    notNull.prototype.isValid = function () {
	        return this.value !== null;
	    };
	    notNull.prototype.getTemplateMessage = function () {
	        return '%s não pode ser nulo';
	    };
	    return notNull;
	})();
	module.exports = notNull;
	//# sourceMappingURL=notNull.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var IsEmail = (function () {
	    function IsEmail(params, paramsParsed) {
	        this.value = paramsParsed[0];
	    }
	    IsEmail.prototype.isValid = function () {
	        return IsEmail.reMail.test(this.value);
	    };
	    IsEmail.prototype.getTemplateMessage = function () {
	        return '%s deve conter um e-mail válido';
	    };
	    IsEmail.reMail = /^[a-z0-9_.]+@[a-z0-9_]+\.[a-z]{3}(\.[a-z]{2})?$/;
	    return IsEmail;
	})();
	module.exports = IsEmail;
	//# sourceMappingURL=isEmail.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var IsNumber = (function () {
	    function IsNumber(params, paramsParsed) {
	        this.value = paramsParsed[0];
	    }
	    IsNumber.prototype.isValid = function () {
	        return IsNumber.reNumber.test(this.value);
	    };
	    IsNumber.prototype.getTemplateMessage = function () {
	        return '%s deve conter numeros';
	    };
	    IsNumber.reNumber = /^[0-9]+$/g;
	    return IsNumber;
	})();
	module.exports = IsNumber;
	//# sourceMappingURL=isNumber.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var NotEmpty = (function () {
	    function NotEmpty(params, paramsParsed) {
	        this.value = paramsParsed[0];
	    }
	    NotEmpty.prototype.isValid = function () {
	        var stringify = JSON.stringify(this.value);
	        return !NotEmpty.reEmpty.test(stringify);
	    };
	    NotEmpty.prototype.getTemplateMessage = function () {
	        return '%s deve ser preenchido';
	    };
	    NotEmpty.reEmpty = /^""$|^{}$|^\[\]$/;
	    return NotEmpty;
	})();
	module.exports = NotEmpty;
	//# sourceMappingURL=notEmpty.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=cross-validation.js.map