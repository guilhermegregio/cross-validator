(function () {
	console.log(new CrossValidator({name: ''}, ['notEmpty($name)']).validate().hasErrors());
})();