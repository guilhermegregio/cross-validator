var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
suite('isEmail', function () {
	var isEmail = require(source.concat('/isEmail'));

	test('should return true if passed valid email', function () {
		assert.isTrue(isEmail({value: 'email@gmail.com'}));
	});

	test('should return false if passed invalid email', function () {
		assert.isFalse(isEmail({value: 'email.com.br'}));
	});
});