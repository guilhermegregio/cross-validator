'use strict';
var util = require('../util');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
var notEmpty = function (value) {
    return !util.isEmpty(value);
};

module.exports = notEmpty;