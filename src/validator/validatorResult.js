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