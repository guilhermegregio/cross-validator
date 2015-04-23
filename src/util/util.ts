module Util {
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
	var reEscapeChar = /\\(\\)?/g;

	function toObject(value) {
		return isObject(value) ? value : Object(value);
	}

	function isObject(value) {
		return !!value && typeof value == 'object';
	}

	function baseToString(value) {
		if (typeof value == 'string') {
			return value;
		}
		return value == null ? '' : (value + '');
	}

	function toPath(value) {
		if (Array.isArray(value)) {
			return value;
		}
		var result = [];
		baseToString(value).replace(rePropName, function (match, number, quote, string) {
			result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
		});
		return result;
	}

	function baseGet(object, path, pathKey) {
		if (object == null) {
			return;
		}
		if (pathKey !== undefined && pathKey in toObject(object)) {
			path = [pathKey];
		}
		var index = -1,
			length = path.length;

		while (object != null && ++index < length) {
			var result = object = object[path[index]];
		}
		return result;
	}

	export function get(object, path, defaultValue?) {
		var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
		return result === undefined ? defaultValue : result;
	}
}

export = Util;