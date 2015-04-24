interface ErrorResult {
	field:string;
	type:string;
	message:string;
}

class ValidatorResult {
	private errors:Array<ErrorResult>;

	constructor(errors = []) {
		this.errors = errors;
	}

	isValid():boolean {
		return this.errors.length === 0;
	}

	getAllFailures() {
		return this.errors;
	}

	getAllErrors(field:string) {
		return this.errors.filter(function (error) {
			return error.field === field;
		});
	}

	getError(field, type):string {
		var error = this.errors
			.filter(function (error) {
				return error.field === field;
			}).filter(function (error) {
				return error.type === type;
			}).map(function (error) {
				return error.message;
			});


		return error.length !== 0 ? error[0] : '';
	}
}

export = ValidatorResult;