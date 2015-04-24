(function () {
	console.log('=========');
	console.log('VALIDOS');
	console.log('=========');
	console.log(CrossValidator.forData({name: 'guilherme'}).using(['notNull($name)']).isValid());
	console.log(CrossValidator.forData({name: 'guilherme'}).using(['notEmpty($name)']).isValid());
	console.log(CrossValidator.forData({name: '1'}).using(['isNumber($name)']).isValid());
	console.log(CrossValidator.forData({name: 'guilherme@gregio.net'}).using(['isEmail($name)']).isValid());
	console.log(CrossValidator.forData({name: 'guilherme'}).using(['isEita($name)']).isValid());
	console.log('=========');
	console.log('INVALIDOS');
	console.log('=========');
	console.log(CrossValidator.forData({name: null}).using(['notNull($name)']).isValid());
	console.log(CrossValidator.forData({name: ''}).using(['notEmpty($name)']).isValid());
	console.log(CrossValidator.forData({name: 'a1'}).using(['isNumber($name)']).isValid());
	console.log(CrossValidator.forData({name: 'guilhermegregio.net'}).using(['isEmail($name)']).isValid());
	console.log(CrossValidator.forData({name: 'guilherme'}).using(['isEita($name)']).isValid());
	console.log('=========');
	console.log('LOOP');
	console.log('=========');
	var start = Date.now();
	for (var i = 10000; i--;) {
		CrossValidator.forData({name: 'guilherme'}).using(['notNull($name)']).isValid();
		CrossValidator.forData({name: 'guilherme'}).using(['notEmpty($name)']).isValid();
		CrossValidator.forData({name: '1'}).using(['isNumber($name)']).isValid();
		CrossValidator.forData({name: 'guilherme@gregio.net'}).using(['isEmail($name)']).isValid();
		CrossValidator.forData({name: 'guilherme'}).using(['isEita($name)']).isValid();

		CrossValidator.forData({name: null}).using(['notNull($name)']).isValid();
		CrossValidator.forData({name: ''}).using(['notEmpty($name)']).isValid();
		CrossValidator.forData({name: 'a1'}).using(['isNumber($name)']).isValid();
		CrossValidator.forData({name: 'guilhermegregio.net'}).using(['isEmail($name)']).isValid();
		CrossValidator.forData({name: 'guilherme'}).using(['isEita($name)']).isValid();
	}
	var end = Date.now();
	console.log('Time: ', end - start);
	console.log('=========');
})();