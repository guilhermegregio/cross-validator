(function () {
	'use strict';
	var util = require('../util');

	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var notNull = function (item) {
		return item.value !== null && item.value !== undefined;
	};

	module.exports = notNull;
})();