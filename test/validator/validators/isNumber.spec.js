var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
suite('isNumber', function () {
	var isNumber = require(source.concat('/isNumber'));

	test('should return true if passed valid number', function () {
		assert.isTrue(isNumber({value: '1'}));
	});

	test('should return false if passed invalid number', function () {
		assert.isFalse(isNumber({value: '123L'}));
	});
});