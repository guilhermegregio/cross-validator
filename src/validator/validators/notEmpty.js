var util = require('../util');

var required = function (value) {
	return !util.isEmpty(value);
};

module.exports = required;