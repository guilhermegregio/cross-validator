(function () {
	'use strict';

	var util = require('./util');

	/**
	 * @author Guilherme M Gregio <guilherme@gregio.net>
	 * @author Bruno M Marques <zaccabruno@gmail.com>
	 */
	var Extractor = function (data) {

		var object = data;

		this.extract = function (path) {
			return extractor(object, path);
		};

		var extractor = function (obj, fullPath, position, path, result) {

			if (fullPath === 'literalvalue') {
				result = [];
				result.push(new Item(fullPath, obj));
				return result;
			}

			var pathArr = fullPath.split('.');
			result = result || [];
			path = path || '';
			position = position || 0;

			obj = obj[pathArr[position]];
			path = path + '.' + pathArr[position];
			path = path.replace(/^\./, '');

			if (pathArr.length - 1 <= position) {
				result.push(new Item(path, obj));
				return result;
			}

			if (Array.isArray(obj)) {

				path = path.concat('[:index]');
				obj.forEach(function (item, index) {
					var newPath = path.replace(':index', index);
					extractor(item, fullPath, position + 1, newPath, result);
				});

				return result;
			}

			return extractor(obj, fullPath, position + 1, path, result);
		};

	};

	var Item = function (key, value) {
		this.key = key;
		this.value = value;
	};

	module.exports = Extractor;
})();