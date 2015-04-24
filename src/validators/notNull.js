var notNull = (function () {
    function notNull(params, paramsParsed) {
        this.value = paramsParsed[0];
    }
    notNull.prototype.isValid = function () {
        return this.value !== null;
    };
    notNull.prototype.getTemplateMessage = function () {
        return '%s não pode ser nulo';
    };
    return notNull;
})();
module.exports = notNull;
