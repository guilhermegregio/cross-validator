/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
var chai = require('chai');
var assert = chai.assert;
var IsEmail = require('../../src/validators/isEmail');
describe('isEmail', function () {
    it('should get a template message', function () {
        var validator = new IsEmail([], []);
        assert.equal(validator.getTemplateMessage(), '%s deve conter um e-mail válido');
    });
    it('should invalid', function () {
        var validatorNotValid = new IsEmail([], ['guilherme']);
        assert.equal(validatorNotValid.isValid(), false);
    });
    it('should valid', function () {
        var validatorNotValid = new IsEmail([], ['guilherme@gregio.net']);
        assert.equal(validatorNotValid.isValid(), true);
    });
});
