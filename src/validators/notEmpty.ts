import Validator = require('./validator');

class NotEmpty implements Validator {
	static reEmpty = /^""$|^{}$|^\[\]$/;

	private value;

	constructor(params, paramsParsed) {
		this.value = paramsParsed[0];
	}

	isValid() {
		var stringify = JSON.stringify(this.value);

		return !NotEmpty.reEmpty.test(stringify);
	}

	getTemplateMessage() {
		return '%s deve ser preenchido';
	}
}

export = NotEmpty;