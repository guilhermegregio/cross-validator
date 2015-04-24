import Validator = require('./validator');

class notNull implements Validator {
	private value;

	constructor(params, paramsParsed) {
		this.value = paramsParsed[0];
	}

	isValid() {
		return this.value !== null;
	}

	getTemplateMessage() {
		return '%s não pode ser nulo';
	}
}

export = notNull;