'use strict';
/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
var isEmail = function (item) {
	var isMail = /^[a-z0-9_]+@[a-z0-9_]+\.[a-z]{3}(\.[a-z]{2})?$/g;

	return isMail.test(item.value);
};

module.exports = isEmail;