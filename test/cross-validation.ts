/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import chai = require('chai');
var assert = chai.assert;

import CrossValidation = require('../src/cross-validation');

describe('CrossValidation', () => {
	it('should validate', () => {
		assert.isTrue(CrossValidation.forData({}).using([]).isValid());
	});

	it('should validate is invalid', () => {
		assert.isFalse(CrossValidation.forData({name: null}).using(['notNull($name)']).isValid());
	});

	it('should validate return validator result', () => {
		var errors = [{
			"field": "name",
			"message": "name não pode ser nulo",
			"type": "notNull"
		}];

		var vResult = CrossValidation.forData({name: null}).using(['notNull($name)']).getResult();

		assert.isFalse(vResult.isValid());
		assert.deepEqual(vResult.getAllFailures(), errors);
		assert.deepEqual(vResult.getAllErrors('name'), errors);
		assert.equal(vResult.getError('name', 'notNull'), errors[0].message);
	});
});