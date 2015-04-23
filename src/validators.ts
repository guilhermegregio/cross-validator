import Validator = require('./validators/validator');
import Noop = require('./validators/noop');
import notNull = require('./validators/notNull');

var Validators = {
	getValidator,
	notNull
};

function getValidator(method, params, paramsParsed):Validator {
	if (!Validators[method]) {
		return new Noop();
	}

	return new Validators[method](params, paramsParsed);
}

export = Validators;