var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
suite('execValidators', function () {
	var execValidators = require(source.concat('/execValidators'));

	test('should added errors on object errors', function () {
		var constrains = ['notEmpty($name)'];
		var errors = {};
		var data = {};

		new execValidators.using(constrains).outErrors(errors).forData(data).validate();

		assert.deepEqual({name: ['notEmpty']}, errors);
	});

    test('should validate a list and added errors on object errors', function () {
        var constrains = ['notEmpty($deposits.name)'];
        var errors = {};
        var data = {};

        var deposit = {};
        var deposit2 = {};

        data.deposits = [];

        data.deposits.push(deposit);
        data.deposits.push(deposit2);

        new execValidators.using(constrains).outErrors(errors).forData(data).validate();

        assert.deepEqual({'deposits[0].name': ['notEmpty'], 'deposits[1].name': ['notEmpty']}, errors);
    });

});