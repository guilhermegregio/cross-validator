var Validator = require('cross-validator');
var prompt = require('prompt');

var properties = [
	{
		name: 'username'
	},
	{
		name: 'email'
	}
];

var data = {name: ''};
var constrains = ['notEmpty($username)', 'notEmpty($email)', 'isEmail($email)'];

prompt.start();

var validator = new Validator(data, constrains);

prompt.get(properties, function (err, result) {
	if (err) {
		return onErr(err);
	}

	data.username = result.username;
	data.email = result.email;
	console.log('--------------------------------');
	console.log('Command-line input received:');
	console.log('  Username: ' + data.username);
	console.log('  E-mail: ' + data.email);

	var vResult = validator.validate();

	if (vResult.hasErrors()) {
		console.log('Ocorreu erros:');

		if (!vResult.forField('username').hasNotEmptyPassed()) {
			console.log('  username deve ser preenchido.');
		}

		if (!vResult.forField('email').hasNotEmptyPassed()) {
			console.log('  e-mail deve ser preenchido.');
		}

		if (!vResult.forField('email').hasIsEmailPassed()) {
			console.log('  e-mail deve ser um e-mail valido.');
		}

		console.log('--------------------------------');
		console.log('ValidatorResult JSON');
		console.log('--------------------------------');
		console.log(JSON.stringify(vResult.getAllFailures(), null, 4));
	} else {
		console.log('--------------------------------');
		console.log('Você preencheu tudo corretamente');
	}
	console.log('--------------------------------');
});