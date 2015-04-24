/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
var chai = require('chai');
var assert = chai.assert;
var IsNumber = require('../../src/validators/isNumber');
describe('isNumber', function () {
    it('should get a template message', function () {
        var validator = new IsNumber([], []);
        assert.equal(validator.getTemplateMessage(), '%s deve conter numeros');
    });
    it('should invalid', function () {
        var validatorNotValid = new IsNumber([], ['123a']);
        assert.equal(validatorNotValid.isValid(), false);
    });
    it('should valid', function () {
        var validatorNotValid = new IsNumber([], ['12123']);
        assert.equal(validatorNotValid.isValid(), true);
    });
});
