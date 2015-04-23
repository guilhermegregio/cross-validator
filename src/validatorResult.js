var ValidatorResult = (function () {
    function ValidatorResult(errors) {
        if (errors === void 0) { errors = []; }
        this.errors = errors;
    }
    ValidatorResult.prototype.isValid = function () {
        return this.errors.length === 0;
    };
    ValidatorResult.prototype.getAllFailures = function () {
        return this.errors;
    };
    ValidatorResult.prototype.getAllErrors = function (field) {
        return this.errors.filter(function (error) {
            return error.field === field;
        });
    };
    ValidatorResult.prototype.getError = function (field, type) {
        var error = this.errors.filter(function (error) {
            return error.field === field;
        }).filter(function (error) {
            return error.type === type;
        }).map(function (error) {
            return error.message;
        });
        return error.length !== 0 ? error[0] : '';
    };
    return ValidatorResult;
})();
module.exports = ValidatorResult;
