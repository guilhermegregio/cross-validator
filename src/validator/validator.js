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