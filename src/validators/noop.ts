import Validator = require('./validator');

class Noop implements Validator {
	isValid() {
		return true;
	}

	getTemplateMessage() {
		return '';
	}
}

export = Noop;