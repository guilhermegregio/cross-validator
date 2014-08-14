var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

suite('Validators', function () {

	var validators = require(source.concat('/validators'));

	test('should constains core validators, notEmpty, isEmail', function () {
		assert.isDefined(validators.isEmail, 'isEmail has been defined');
		assert.isDefined(validators.notEmpty, 'notEmpty has been defined');
	});

});