var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
suite('notEmpty', function () {
	var notEmpty = require(source.concat('/notEmpty'));

	test('should return false for empty values of: strings, arrays, objects, etc', function () {
        var item = {};

        item.value = '';
		assert.isFalse(notEmpty(item));

        item.value = [];
		assert.isFalse(notEmpty(item));

        item.value = {};
		assert.isFalse(notEmpty(item));

        item.value = null;
		assert.isTrue(notEmpty(item));

        item.value = undefined;
		assert.isTrue(notEmpty(item));
	});

	test('should return true for not empty values of: strings, arrays, objects, etc', function () {
        var item = {};

        item.value = 'value';
		assert.isTrue(notEmpty(item));

        item.value = [1];
		assert.isTrue(notEmpty(item));

        item.value = {a:1};
		assert.isTrue(notEmpty(item));
	});

});