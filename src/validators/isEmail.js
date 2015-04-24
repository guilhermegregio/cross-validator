var IsEmail = (function () {
    function IsEmail(params, paramsParsed) {
        this.value = paramsParsed[0];
    }
    IsEmail.prototype.isValid = function () {
        return IsEmail.reMail.test(this.value);
    };
    IsEmail.prototype.getTemplateMessage = function () {
        return '%s deve conter um e-mail válido';
    };
    IsEmail.reMail = /^[a-z0-9_]+@[a-z0-9_]+\.[a-z]{3}(\.[a-z]{2})?$/g;
    return IsEmail;
})();
module.exports = IsEmail;
