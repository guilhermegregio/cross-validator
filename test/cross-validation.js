/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var chai = require('chai');
var assert = chai.assert;
var CrossValidation = require('../src/cross-validation');
describe('CrossValidation', function () {
    it('should validate', function () {
        assert.isTrue(CrossValidation.forData({}).using([]).isValid());
    });
    it('should validate is invalid', function () {
        assert.isFalse(CrossValidation.forData({ name: null }).using(['notNull($name)']).isValid());
    });
    it('should validate return validator result', function () {
        var errors = [{
            "field": "name",
            "message": "Campo não pode ser nulo",
            "type": "notNull"
        }];
        var vResult = CrossValidation.forData({ name: null }).using(['notNull($name)']).getResult();
        assert.isFalse(vResult.isValid());
        assert.deepEqual(vResult.getAllFailures(), errors);
        assert.deepEqual(vResult.getAllErrors('name'), errors);
        assert.equal(vResult.getError('name', 'notNull'), 'Campo não pode ser nulo');
    });
});
