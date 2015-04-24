var IsNumber = (function () {
    function IsNumber(params, paramsParsed) {
        this.value = paramsParsed[0];
    }
    IsNumber.prototype.isValid = function () {
        return IsNumber.reNumber.test(this.value);
    };
    IsNumber.prototype.getTemplateMessage = function () {
        return '%s deve conter numeros';
    };
    IsNumber.reNumber = /^[0-9]+$/g;
    return IsNumber;
})();
module.exports = IsNumber;
