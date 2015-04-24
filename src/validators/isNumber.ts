import Validator = require('./validator');

class IsNumber implements Validator {
	static reNumber = /^[0-9]+$/g;

	private value;

	constructor(params, paramsParsed) {
		this.value = paramsParsed[0];
	}

	isValid() {
		return IsNumber.reNumber.test(this.value);
	}

	getTemplateMessage() {
		return '%s deve conter numeros';
	}
}

export = IsNumber;