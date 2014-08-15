var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
suite('ValidatorResult', function () {
	var ValidateResult = require(source.concat('/validatorResult'));

	suite('Definitions', function () {
		var vResult = new ValidateResult();

		test('hasErrors()', function () {
			assert.isDefined(vResult.hasErrors);
		});

		test('getAllFailures()', function () {
			assert.isDefined(vResult.getAllFailures);
		});

		test('getErrorsOf()', function () {
			assert.isDefined(vResult.getErrorsOf);
		});

		test('forField()', function () {
			assert.isDefined(vResult.forField);
		});

		test('forField() should not empty', function () {
			assert.ok(Object.keys(vResult.forField()).length > 0);
		});
	});

	suite('Methods', function () {
		var errors = {
			name: ['notEmpty']
		};

		var vResult = new ValidateResult(errors);

		test('should return an new instance or object errors', function () {
			assert.notEqual(vResult.getAllFailures(), errors);
		});

		test('should return if contains errors', function () {
			assert.isTrue(vResult.hasErrors());
		});

		test('should return error for field', function () {
			assert.deepEqual(vResult.getErrorsOf('name'), ['notEmpty']);
		});

		test('should return error constrain of field', function () {
			assert.deepEqual(vResult.forField('name').hasNotEmptyPassed(), false);
		});
	});

});