var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
suite('execValidators', function () {
	var execValidators = require(source.concat('/execValidators'));

	test('', function () {
		var constrains = ['notEmpty($name)'];
		var errors = {};
		var data = {};

		execValidators.using(constrains).outErrors(errors).forData(data).validate();

		assert.deepEqual({name: ['notEmpty']}, errors);
	});

});