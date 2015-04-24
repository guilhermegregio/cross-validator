/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import chai = require('chai');
var assert = chai.assert;

import IsEmail = require('../../src/validators/isEmail');

describe('isEmail', () => {
	it('should get a template message', () => {
		var validator = new IsEmail([], []);
		assert.equal(validator.getTemplateMessage(), '%s deve conter um e-mail válido');
	});

	it('should invalid', () => {
		var validatorNotValid = new IsEmail([], ['guilherme']);
		assert.equal(validatorNotValid.isValid(), false);
	});

	it('should valid', () => {
		var validatorNotValid = new IsEmail([], ['guilherme@gregio.net']);
		assert.equal(validatorNotValid.isValid(), true);
	});
});