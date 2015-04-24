var NotEmpty = (function () {
    function NotEmpty(params, paramsParsed) {
        this.value = paramsParsed[0];
    }
    NotEmpty.prototype.isValid = function () {
        var stringify = JSON.stringify(this.value);
        return !NotEmpty.reEmpty.test(stringify);
    };
    NotEmpty.prototype.getTemplateMessage = function () {
        return '%s deve ser preenchido';
    };
    NotEmpty.reEmpty = /^""$|^{}$|^\[\]$/;
    return NotEmpty;
})();
module.exports = NotEmpty;
