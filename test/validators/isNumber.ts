/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import chai = require('chai');
var assert = chai.assert;

import IsNumber = require('../../src/validators/isNumber');

describe('isNumber', () => {
	it('should get a template message', () => {
		var validator = new IsNumber([], []);
		assert.equal(validator.getTemplateMessage(), '%s deve conter numeros');
	});

	it('should invalid', () => {
		var validatorNotValid = new IsNumber([], ['123a']);
		assert.equal(validatorNotValid.isValid(), false);
	});

	it('should valid', () => {
		var validatorNotValid = new IsNumber([], ['12123']);
		assert.equal(validatorNotValid.isValid(), true);
	});
});