/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
var chai = require('chai');
var assert = chai.assert;
var NotNull = require('../../src/validators/notNull');
describe('notNull', function () {
    it('should get a template message', function () {
        var validator = new NotNull([], []);
        assert.equal(validator.getTemplateMessage(), 'Campo não pode ser nulo');
    });
    it('should notNull invalid', function () {
        var validatorNotValid = new NotNull([], [null]);
        assert.equal(validatorNotValid.isValid(), false);
    });
    it('should notNull valid', function () {
        var validatorNotValid = new NotNull([], ['guilherme']);
        assert.equal(validatorNotValid.isValid(), true);
    });
});
