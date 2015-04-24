/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import chai = require('chai');
var assert = chai.assert;

import Validators = require('../src/validators');

describe('Validators', () => {
	it('should use noop validator', () => {
		var validator = Validators.getValidator('validatorNotExists', [], []);
		assert.equal(validator.isValid(), true);
		assert.equal(validator.getTemplateMessage(), '');
	});

	it('should use notNull validator', () => {
		var validatorValid = Validators.getValidator('notNull', [], ['guilherme']);
		var validatorNotValid = Validators.getValidator('notNull', [], [null]);

		assert.equal(validatorValid.isValid(), true);
		assert.equal(validatorValid.getTemplateMessage(), '%s não pode ser nulo');
		assert.equal(validatorNotValid.isValid(), false);
	});
});