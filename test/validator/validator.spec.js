var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

suite('Validator', function () {

	var Validator = require(source.concat('/validator'));

	suite('Instance Validator', function () {

		test('should throw exception when given invalid data in constructor', function () {
			var iThrow = function () {
				new Validator();
			};
			var expectError = 'Data is Invalid. Expected an Object not empty, but was given:';

			assert.throws(iThrow, Error, expectError);
		});

		test('should throw exception when given invalid constrains in constructor', function () {
			var iThrow = function () {
				new Validator({name: 'a'});
			};
			var expectError = 'Constrains is Invalid. Expected an Array not empty, but was given:';

			assert.throws(iThrow, Error, expectError);
		});
	});
});