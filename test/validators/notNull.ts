/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import chai = require('chai');
var assert = chai.assert;

import NotNull = require('../../src/validators/notNull');

describe('notNull', () => {
	it('should get a template message', () => {
		var validator = new NotNull([], []);
		assert.equal(validator.getTemplateMessage(), '%s não pode ser nulo');
	});

	it('should notNull invalid', () => {
		var validatorNotValid = new NotNull([], [null]);
		var validatorNotValid2 = new NotNull([], [undefined]);
		assert.equal(validatorNotValid.isValid(), false);
		assert.equal(validatorNotValid2.isValid(), false);
	});

	it('should notNull valid', () => {
		var validatorNotValid = new NotNull([], ['guilherme']);
		assert.equal(validatorNotValid.isValid(), true);
	});
});