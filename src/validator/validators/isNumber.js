(function () {
	'use strict';
	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 */
	var isNumber = function (item) {
		var isNumber = /^[0-9]+$/g;

		return isNumber.test(item.value);
	};

	module.exports = isNumber;
})();