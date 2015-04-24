/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var chai = require('chai');
var assert = chai.assert;
var Expression = require('../src/expression');
describe('Expression', function () {
    it('should valid expression', function () {
        var data = {
            name: 'guilherme'
        };
        var expr = new Expression('notNull($name)', data);
        assert.isTrue(expr.isValid());
        assert.deepEqual(expr.getMessageError(), []);
    });
    it('should invalid expression', function () {
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
    it('should valid with value literal', function () {
        var expr = new Expression('notNull(guilherme)', {});
        assert.isTrue(expr.isValid());
    });
});
