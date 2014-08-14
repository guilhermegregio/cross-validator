var util = require('../util');

var notEmpty = function (value) {
	return !util.isEmpty(value);
};

module.exports = notEmpty;