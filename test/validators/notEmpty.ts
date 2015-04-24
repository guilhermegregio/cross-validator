/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import chai = require('chai');
var assert = chai.assert;

import NotEmpty = require('../../src/validators/notEmpty');

describe('isNumber', () => {
	it('should get a template message', () => {
		var validator = new NotEmpty([], []);
		assert.equal(validator.getTemplateMessage(), '%s deve ser preenchido');
	});

	it('should invalid', () => {
		var validatorNotValid = new NotEmpty([], ['']);
		assert.equal(validatorNotValid.isValid(), false);
	});

	it('should valid', () => {
		var validatorNotValid = new NotEmpty([], ['test']);
		assert.equal(validatorNotValid.isValid(), true);
	});
});