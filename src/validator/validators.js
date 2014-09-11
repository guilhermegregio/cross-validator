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
	exec: function (expression, loggerError) {
		var fn = (validators[expression.method] || validators.defaultMethod);

        if(!fn.call(this, expression.paramsValue)) {
            loggerError[expression.paramsValue.key] = loggerError[expression.paramsValue.key] || [];
            loggerError[expression.paramsValue.key].push(expression.method);
        }
	}
};

module.exports = validators;