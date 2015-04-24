import Validator = require('./validator');

class IsEmail implements Validator {
	static reMail = /^[a-z0-9_]+@[a-z0-9_]+\.[a-z]{3}(\.[a-z]{2})?$/g;

	private value;

	constructor(params, paramsParsed) {
		this.value = paramsParsed[0];
	}

	isValid() {
		return IsEmail.reMail.test(this.value);
	}

	getTemplateMessage() {
		return '%s deve conter um e-mail válido';
	}
}

export = IsEmail;