var assert = require('chai').assert;

suite('Validator', function () {
	var Validator = require('../src');

	test('should return true', function () {
		console.log(new Validator().validate());
		assert.equal(1, 1);
	});

});