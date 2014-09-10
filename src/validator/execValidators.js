'use strict';
var util = require('./util');
var validators = require('./validators');
var Extractor = require('./extractor');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
var exec = {
    constrains: [],
    loggerError: {},
    data: {},
    expressions: [],
    itemsToValidate: {}
};

var Validate = {
    validate: function () {
        exec.constrains.forEach(function (constrain) {
            exec.expressions = exec.expressions.concat(new Expressions(constrain));
        });

        exec.expressions.forEach(function (expression) {
            validators.exec(expression, exec.loggerError);
        });
    }
};

var DataValidator = {
    outErrors: function (error) {
        exec.loggerError = error;

        return this;
    },
    forData: function (data) {
        exec.data = data;

        return Validate;
    }
};

var ConstrainsValidator = {
    using: function (constrains) {

        exec.constrains = constrains;
        exec.loggerError = {};
        exec.data = {},
        exec.expressions = [];
        exec.itemsToValidate = {};

        return DataValidator;
    }
};

var Expressions = function (constrain) {
    var result = [];
    var items = [];

    var expression = util.expressionToArray(constrain);
    var method = expression.shift();
    var params = expression;

    params.forEach(function (param) {
        if (/^\$/.test(param)) {
            var itemsExtracted = new Extractor(exec.data).extract(param.replace('$', ''));
            items = items.concat(itemsExtracted);
        } else {
            items = items.concat(new LiteralItem(param));
        }
    });

    if(params.length === 1) {

        items.forEach(function(item){
            result.push(new Expression(item, method));
        });

        return result;
    }

    result.push(new Expression(items, method));

    return result;
};

var LiteralItem = function(value) {
    return new Extractor(value).extract('literalvalue');
}

var Expression = function(items, method) {
    var expression = {};
    expression.method = method;
    expression.paramsValue = items;

    return expression;
};

module.exports = ConstrainsValidator;