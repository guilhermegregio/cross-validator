/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
var chai = require('chai');
var assert = chai.assert;
var NotNull = require('../../src/validators/notNull');
describe('notNull', function () {
    it('should get a template message', function () {
        var validator = new NotNull([], []);
        assert.equal(validator.getTemplateMessage(), '%s não pode ser nulo');
    });
    it('should notNull invalid', function () {
        var validatorNotValid = new NotNull([], [null]);
        var validatorNotValid2 = new NotNull([], [undefined]);
        assert.equal(validatorNotValid.isValid(), false);
        assert.equal(validatorNotValid2.isValid(), false);
    });
    it('should notNull valid', function () {
        var validatorNotValid = new NotNull([], ['guilherme']);
        assert.equal(validatorNotValid.isValid(), true);
    });
});
