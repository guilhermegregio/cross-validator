import Util = require('./util/util');
import Validator = require('./validators/validator');
import Validators = require('./validators');

class Expression {
	static erStartWithDollar = /^\$/;
	static erSepareMethodParams = /([a-zA-Z]+)\(([a-zA-Z0-9,$ ]+)\)+/;
	static erSpaces = /[ ]/g;

	private method;
	private params;
	private paramsParsed;
	private validator:Validator;

	constructor(expression:string, data:any) {
		this.separeteMethodParams(expression);
		this.parseParams(data);

		this.validator = Validators.getValidator(this.method, this.params, this.paramsParsed);
	}

	isValid():boolean {
		return this.validator.isValid();
	}

	getMessageError() {

		if (this.isValid()) {
			return [];
		}

		return this.params.map(param => {
			return {
				field: param.replace(Expression.erStartWithDollar, ''),
				type: this.method,
				message: this.compileMessage()
			}
		});
	}

	private separeteMethodParams(expression:string) {


		var result = expression.match(Expression.erSepareMethodParams);

		this.method = result[1];
		this.params = result[2].replace(Expression.erSpaces, '').split(',');
	}

	private parseParams(data) {
		this.paramsParsed = this.params.map(function (param) {
			if (Expression.erStartWithDollar.test(param)) {
				return Util.get(data, param.replace(Expression.erStartWithDollar, ''));
			}
			return param;
		});
	}

	private compileMessage():string {
		var message = this.validator.getTemplateMessage();

		this.params.forEach(function (param) {
			message = message.replace('%s', param.replace(Expression.erStartWithDollar, ''));
		});

		return message;
	}
}

export = Expression;