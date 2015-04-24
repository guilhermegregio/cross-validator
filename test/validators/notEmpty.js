/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
var chai = require('chai');
var assert = chai.assert;
var NotEmpty = require('../../src/validators/notEmpty');
describe('isNumber', function () {
    it('should get a template message', function () {
        var validator = new NotEmpty([], []);
        assert.equal(validator.getTemplateMessage(), '%s deve ser preenchido');
    });
    it('should invalid', function () {
        var validatorNotValid = new NotEmpty([], ['']);
        assert.equal(validatorNotValid.isValid(), false);
    });
    it('should valid', function () {
        var validatorNotValid = new NotEmpty([], ['test']);
        assert.equal(validatorNotValid.isValid(), true);
    });
});
