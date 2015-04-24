var Util = require('./util/util');
var Validators = require('./validators');
var Expression = (function () {
    function Expression(expression, data) {
        this.separeteMethodParams(expression);
        this.parseParams(data);
        this.validator = Validators.getValidator(this.method, this.params, this.paramsParsed);
    }
    Expression.prototype.isValid = function () {
        return this.validator.isValid();
    };
    Expression.prototype.getMessageError = function () {
        var _this = this;
        if (this.isValid()) {
            return [];
        }
        return this.params.map(function (param) {
            return {
                field: param.replace(Expression.erStartWithDollar, ''),
                type: _this.method,
                message: _this.compileMessage()
            };
        });
    };
    Expression.prototype.separeteMethodParams = function (expression) {
        var result = expression.match(Expression.erSepareMethodParams);
        this.method = result[1];
        this.params = result[2].replace(Expression.erSpaces, '').split(',');
    };
    Expression.prototype.parseParams = function (data) {
        this.paramsParsed = this.params.map(function (param) {
            if (Expression.erStartWithDollar.test(param)) {
                return Util.get(data, param.replace(Expression.erStartWithDollar, ''));
            }
            return param;
        });
    };
    Expression.prototype.compileMessage = function () {
        var message = this.validator.getTemplateMessage();
        this.params.forEach(function (param) {
            message = message.replace('%s', param.replace(Expression.erStartWithDollar, ''));
        });
        return message;
    };
    Expression.erStartWithDollar = /^\$/;
    Expression.erSepareMethodParams = /([a-zA-Z]+)\(([a-zA-Z0-9,$ ]+)\)+/;
    Expression.erSpaces = /[ ]/g;
    return Expression;
})();
module.exports = Expression;
