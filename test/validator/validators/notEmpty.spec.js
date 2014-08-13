var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

suite('notEmpty', function () {
	var notEmpty = require(source.concat('/notEmpty'));

	test('should return false for empty values of: strings, arrays, objects, etc', function () {
		assert.isFalse(notEmpty(''));
		assert.isFalse(notEmpty([]));
		assert.isFalse(notEmpty({}));
		assert.isFalse(notEmpty(null));
		assert.isFalse(notEmpty(undefined));
	});

	test('should return true for not empty values of: strings, arrays, objects, etc', function () {
		assert.isTrue(notEmpty('value'));
		assert.isTrue(notEmpty([1]));
		assert.isTrue(notEmpty({a:1}));
	});

});