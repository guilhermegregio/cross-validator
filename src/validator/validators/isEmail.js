/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
var isEmail = function (email) {
	var isMail = /^[a-z0-9_]+@[a-z0-9_]+\.[a-z]{3}(\.[a-z]{2})?$/g;

	return isMail.test(email);
};

module.exports = isEmail;