var assert = require('chai').assert;

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 */
suite('Extract', function () {

	function Item(key, value) {
		this.key = key;
		this.value = value;
	}

	function extractor(obj, fullPath, pos, path, itemsOut) {
		var pathArr = fullPath.split('.');
		itemsOut = itemsOut || [];
		path = path || '';
		pos = pos || 0;

		obj = obj[pathArr[pos]];
		path = path + '.' + pathArr[pos];
		path = path.replace(/^\./, '');

		if (pathArr.length - 1 <= pos) {
			itemsOut.push(new Item(path, obj));
			return itemsOut;
		}

		if (Array.isArray(obj)) {

			path = path.concat('[:index]');
			obj.forEach(function (item, index) {
				var newPath = path.replace(':index', index);
				extractor(item, fullPath, pos + 1, newPath, itemsOut);
			});

			return itemsOut;
		}

		return extractor(obj, fullPath, pos + 1, path, itemsOut);
	}

	test('value simple', function () {
		var result = extractor({teste: 'valor'}, 'teste');

		assert.deepEqual(result, [
			{key: 'teste', value: 'valor'}
		]);
	});

	test('value nasted object', function () {
		var result = extractor({user: {person: {name: 'First Name'}}}, 'user.person.name');

		assert.deepEqual(result, [
			{key: 'user.person.name', value: 'First Name'}
		]);
	});

	test('value arrays with nasted object', function () {
		var result = extractor({user: {contacts: [
			{type: 'MAIL', value: 'user@email.com'},
			{type: 'MAIL', value: 'outro@gmail.com'}
		]}}, 'user.contacts.value');

		assert.deepEqual(result, [
			{key: 'user.contacts[0].value', value: 'user@email.com'},
			{key: 'user.contacts[1].value', value: 'outro@gmail.com'}
		]);
	});

	test('value arrays with nasted arrays with object', function () {
		var result = extractor({
			lawsuit: {
				deposits: [
					{
						bank: {
							extract: [
								{
									file: 'upload.png'
								}
							]
						}
					},
					{
						bank: {
							extract: [
								{
									file: 'newUpload.png'
								},
								{
									file: 'outroFile.png'
								}
							]
						}
					}
				]
			}
		}, 'lawsuit.deposits.bank.extract.file');

		assert.deepEqual(result, [
			{key: 'lawsuit.deposits[0].bank.extract[0].file', value: 'upload.png'},
			{key: 'lawsuit.deposits[1].bank.extract[0].file', value: 'newUpload.png'},
			{key: 'lawsuit.deposits[1].bank.extract[1].file', value: 'outroFile.png'}
		]);
	});

});