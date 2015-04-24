/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var chai = require('chai');
var assert = chai.assert;
var Validators = require('../src/validators');
describe('Validators', function () {
    it('should use noop validator', function () {
        var validator = Validators.getValidator('validatorNotExists', [], []);
        assert.equal(validator.isValid(), true);
        assert.equal(validator.getTemplateMessage(), '');
    });
    it('should use notNull validator', function () {
        var validatorValid = Validators.getValidator('notNull', [], ['guilherme']);
        var validatorNotValid = Validators.getValidator('notNull', [], [null]);
        assert.equal(validatorValid.isValid(), true);
        assert.equal(validatorValid.getTemplateMessage(), '%s não pode ser nulo');
        assert.equal(validatorNotValid.isValid(), false);
    });
});
