/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import chai = require('chai');
var assert = chai.assert;

import Expression = require('../src/expression');

describe('Expression', () => {
	it('should valid expression', () => {
		var data = {
			name: 'guilherme'
		};

		var expr = new Expression('notNull($name)', data);

		assert.isTrue(expr.isValid());

		assert.deepEqual(expr.getMessageError(), []);
	});

	it('should invalid expression', () => {
		var data = {
			name: null
		};

		var expr = new Expression('notNull($name)', data);

		assert.isFalse(expr.isValid());

		assert.deepEqual(expr.getMessageError(), [{
			"field": "name",
			"message": "name não pode ser nulo",
			"type": "notNull"
		}]);
	});

	it('should valid with value literal', () => {
		var expr = new Expression('notNull(guilherme)', {});

		assert.isTrue(expr.isValid());
	});
});