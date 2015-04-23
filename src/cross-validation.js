var Util = require('./util/util');
var ValidatorResult = require('./validatorResult');
var Expression = require('./expression');
var CrossValidation = (function () {
    function CrossValidation(data) {
        this.data = data;
    }
    CrossValidation.forData = function (data) {
        return new CrossValidation(data);
    };
    CrossValidation.prototype.using = function (constraints) {
        this.constraints = constraints;
        return this;
    };
    CrossValidation.prototype.isValid = function () {
        return this.getResult().isValid();
    };
    CrossValidation.prototype.getResult = function () {
        var _this = this;
        var errors = Util.concatAll(this.constraints.map(function (constraint) {
            var expr = new Expression(constraint, _this.data);
            return expr.getMessageError();
        }));
        return new ValidatorResult(errors);
    };
    return CrossValidation;
})();
module.exports = CrossValidation;
