/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import chai = require('chai');
var assert = chai.assert;

import ValidatorResult = require('../src/validatorResult');

describe('ValidatorResult', () => {
	it('should instanciate a validator result with empty errors', () => {
		var vResult = new ValidatorResult();

		assert.isTrue(vResult.isValid());
		assert.deepEqual(vResult.getAllFailures(), []);
		assert.deepEqual(vResult.getAllErrors('name'), []);
		assert.equal(vResult.getError('name', 'notNull'), '');
	});

	it('should instanciate a validator result with errors', () => {
		var nameError = {field: 'name', type: 'notEmpty', message: 'Campo requerido'};
		var emailError = {field: 'email', type: 'isEmail', message: 'Deve ser um email valido'};

		var errors = [nameError, emailError];

		var vResult = new ValidatorResult(errors);

		assert.isFalse(vResult.isValid());

		assert.deepEqual(vResult.getAllFailures(), errors);

		assert.deepEqual(vResult.getAllErrors('name'), [nameError]);
		assert.deepEqual(vResult.getAllErrors('email'), [emailError]);

		assert.equal(vResult.getError('name', 'notEmpty'), nameError.message);
		assert.equal(vResult.getError('email', 'isEmail'), emailError.message);
	});

	it('should get empty when get error type not exists', () => {
		var nameError = {field: 'name', type: 'notEmpty', message: 'Campo requerido'};
		var emailError = {field: 'email', type: 'isEmail', message: 'Deve ser um email valido'};

		var errors = [nameError, emailError];

		var vResult = new ValidatorResult(errors);

		assert.equal(vResult.getError('name', 'isEmail'), '');
		assert.equal(vResult.getError('email', 'notEmpty'), '');
	});
});