(function () {
	'use strict';
	var util = require('../util');

	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var notEmpty = function (item) {
		return !util.isEmpty(item.value);
	};

	module.exports = notEmpty;
})();