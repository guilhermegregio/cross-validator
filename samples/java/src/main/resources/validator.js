//var module = {
//    exports: {}
//};
//
//var require = function (moduleName) {
//    return module.exports[moduleName];
//};
//
//var Validator = function () {
//    var util = require('util');
//    print(util.teste());
//};
//
//var util = {
//    teste: function(){
//        return false;
//    }
//};
//
//module.exports['Validator'] = Validator;
//module.exports['util'] = util;

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Validator=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    'use strict';
    /**
     * @author Guilherme M Gregio <guilherme@gregio.net>
     */
    module.exports = require('./validator/validator');
},{"./validator/validator":4}],2:[function(require,module,exports){
    'use strict';
    var util = require('./util');
    var validators = require('./validators');

    /**
     * @author Guilherme M Gregio <guilherme@gregio.net>
     */
    var exec = {
        constrains: [],
        loggerError: {},
        data: {},
        expressions: []
    };

    var Validate = {
        validate: function () {
            exec.constrains.forEach(function (constrain) {
                exec.expressions.push(new Expression(constrain));
            });

            exec.expressions.forEach(function (expression) {
                if (!validators.exec(expression)) {
                    var param = expression.params[0].replace('$', '');
                    exec.loggerError[param] = exec.loggerError[param] || [];
                    exec.loggerError[param].push(expression.method);
                }
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

            return DataValidator;
        }
    };

    var Expression = function (constrain) {
        var expr = util.expressionToArray(constrain);
        this.method = expr.shift();
        this.params = expr;
        var paramsValue = [];

        this.params.forEach(function (param) {
            if (/^\$/.test(param)) {
                paramsValue.unshift(util.deep(exec.data, param.replace('$', '')));
                return;
            }
            paramsValue.push(param);
        });

        this.paramsValue = paramsValue;
    };

    module.exports = ConstrainsValidator;
},{"./util":3,"./validators":6}],3:[function(require,module,exports){
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
        if (obj == null) {
            return true;
        }

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

        var types = [ Number, String, Boolean ],
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

                        for(var i = 0, itemLength = keys.length; i < itemLength; i++){
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
},{}],4:[function(require,module,exports){
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
},{"./execValidators":2,"./util":3,"./validatorResult":5}],5:[function(require,module,exports){
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
                    return (util.deep(_errors, field) || []).indexOf(validator) === -1;
                };
            });
        };

    };

    module.exports = ValidatorResult;
},{"./util":3,"./validators":6}],6:[function(require,module,exports){
    'use strict';
    /**
     * @author Guilherme M Gregio <guilherme@gregio.net>
     */
    var validators = {
        notEmpty: require('./validators/notEmpty'),
        isEmail: require('./validators/isEmail'),
        defaultMethod: function () {
            return true;
        },
        exec: function (expression) {
            var fn = (validators[expression.method] || validators.defaultMethod);
            return fn.apply(this, expression.paramsValue);
        }
    };

    module.exports = validators;
},{"./validators/isEmail":7,"./validators/notEmpty":8}],7:[function(require,module,exports){
    'use strict';
    /**
     * @author Guilherme M Gregio <guilherme@gregio.net>
     */
    var isEmail = function (email) {
        var isMail = /^[a-z0-9_]+@[a-z0-9_]+\.[a-z]{3}(\.[a-z]{2})?$/g;

        return isMail.test(email);
    };

    module.exports = isEmail;
},{}],8:[function(require,module,exports){
    'use strict';
    var util = require('../util');

    /**
     * @author Guilherme M Gregio <guilherme@gregio.net>
     */
    var notEmpty = function (value) {
        return !util.isEmpty(value);
    };

    module.exports = notEmpty;
},{"../util":3}]},{},[1])(1)
});