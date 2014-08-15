'use strict';
/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
var validators = {
	notEmpty: require('./validators/notEmpty'),
	isEmail: require('./validators/isEmail'),
	default: function () {
		return true;
	},
	exec: function (expression) {
		var fn = (validators[expression.method] || validators.default);
		return fn.apply(this, expression.paramsValue);
	}
};

module.exports = validators;