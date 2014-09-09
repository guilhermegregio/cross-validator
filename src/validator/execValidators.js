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

    if(params.length === 1) {
        var itemsExtracted = new Extractor(exec.data).extract(params[0].replace('$', ''));

        itemsExtracted.forEach(function (item) {
            result.push(new Expression(item, method));
        });

        return result;
    }

    params.forEach(function (param) {
        var itemsExtracted = new Extractor(exec.data).extract(param.replace('$', ''));
        items = items.concat(itemsExtracted);
    });

    result.push(new Expression(items, method));

    return result;
};

var Expression = function(items, method) {
    var expression = {};
    expression.method = method;
    expression.paramsValue = items;

    return expression;
};

module.exports = ConstrainsValidator;