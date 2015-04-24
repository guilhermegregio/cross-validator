import Util = require('./util/util');
import ValidatorResult = require('./validatorResult');
import Expression = require('./expression');

interface Using {
	using(Array):vResult;
}

interface vResult {
	isValid():boolean;
	getResult():ValidatorResult;
}

class CrossValidation implements Using, vResult {

	private data;
	private constraints;

	static forData(data):Using {
		return new CrossValidation(data);
	}

	constructor(data) {
		this.data = data;
	}

	using(constraints):vResult {
		this.constraints = constraints;

		return this;
	}

	isValid():boolean {
		return this.getResult().isValid();
	}

	getResult():ValidatorResult {
		var errors = Util.concatAll(this.constraints.map(constraint => {
			var expr = new Expression(constraint, this.data);

			return expr.getMessageError();
		}));

		return new ValidatorResult(errors);
	}
}

export = CrossValidation;