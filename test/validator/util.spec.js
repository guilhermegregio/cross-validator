var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

suite('Util', function () {
	var util = require(source.concat('/util'));

	test('should return true when object is array', function () {
		assert.isTrue(util.isArray([]));
	});

	test('should return true when value is Arguments, Function, String, Number, Date, RegExp', function () {
		var stringVar = 'string';
		var functionVar = function () {
		};
		var numberVar = 10;
		var dateVar = new Date();
		var erVar = /[a-z]/;
		var expectArguments = function () {
			assert.isTrue(util.isArguments(arguments));
		};
		var objVar = {};

		assert.isTrue(util.isString(stringVar));
		assert.isTrue(util.isFunction(functionVar));
		assert.isTrue(util.isNumber(numberVar));
		assert.isTrue(util.isDate(dateVar));
		assert.isTrue(util.isRegExp(erVar));
		assert.isTrue(util.isObject(objVar));
		expectArguments();
	});

	test('should return true when value is empty : "", 0, [], {}, null, undefined', function () {
		assert.isTrue(util.isEmpty(''));
		assert.isTrue(util.isEmpty([]));
		assert.isTrue(util.isEmpty({}));
		assert.isTrue(util.isEmpty(null));
		assert.isTrue(util.isEmpty(undefined));
		assert.isTrue(util.isEmpty(0));
	});

	test('should return value of deep object', function () {
		var person = {
			name: 'pessoa da silva',
			contacts: [
				{type: 'mail', value: 'email1@gmail.com'},
				{type: 'mail', value: 'email2@gmail.com'},
				{type: 'mail', value: 'email3@gmail.com'}
			],
			address: {
				city: {
					state: {
						country: {
							name: 'Brasil'
						}
					}
				}
			}
		};

		assert.equal(util.deep(person, 'name'), 'pessoa da silva');
		assert.equal(util.deep(person, 'address.city.state.country.name'), 'Brasil');
		assert.equal(util.deep(person, 'contacts[2].value'), 'email3@gmail.com');
	});

	test('should set deep value in object', function () {
		var person = {
			address: {
				street: 'rua street'
			}
		};

		util.deep(person, 'address.street', 'rua xpto');

		assert.deepEqual(person, {
			address: {
				street: 'rua xpto'
			}
		});

	});

	test('should return array when given expression', function () {
		assert.deepEqual(util.expressionToArray('expression(person.name)'), ['expression', 'person.name']);
		assert.deepEqual(util.expressionToArray('expression(path.one, path.two)'), ['expression', 'path.one', 'path.two']);
	});

	test('should return boolean if object contains a key', function () {
		assert.isTrue(util.has({name: 'nome'}, 'name'));
		assert.isFalse(util.has({name: 'nome'}, 'teste'));
	});

	test('should clone object', function () {
		var source = {a: 1, b: 'b', c: {test: true}};
		var target = util.clone(source);

		assert.deepEqual(target, source);
		assert.notEqual(target, source);
	});
});