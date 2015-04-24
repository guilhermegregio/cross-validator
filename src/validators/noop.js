var Noop = (function () {
    function Noop() {
    }
    Noop.prototype.isValid = function () {
        return true;
    };
    Noop.prototype.getTemplateMessage = function () {
        return '';
    };
    return Noop;
})();
module.exports = Noop;
