'use strict';

var util = require('./util');

/**
 * @author Bruno z Marques <zaccabruno@gmail.com>
 */
var Extractor = function (data) {

    var object = data;

    this.extract = function (path) {
        var nodes = (path || '').split('.');
        var result = this.getValue(nodes, 0);
        console.log(result.paths());
        return result;
    };

    this.getValue = function (nodes, position) {

        var item = new Item();
        var localCount = 0;
        var finalPath = '';

        if (nodes.length - 1 === position) {
            item.isLast = true;
        }

        while (localCount <= position) {
            finalPath = finalPath + '.' + nodes[localCount];
            localCount++;
        }

        if (util.isArray(object)) {
            var collection = this.collectionObjectFinder(object, nodes, position + 1);
            item.value = collection;
        } else if (util.isObject(object)) {
            object = util.deep(object, nodes[position]);

            if(!item.isLast){
                item.value = this.getValue(nodes, position);
            } else {
                item.value = object;
            }
        }

        item.path = finalPath;
        return item;

    };

    this.collectionObjectFinder = function (obj, nodes, count) {

        var array = [];

        for (var i = 0, attrLen = obj.length; i < attrLen; i++) {
            var object = util.deep(obj[i], nodes[count]);

            var item = new Item();

            item.value = object;
            item.path = nodes[count - 1] + '['+ i + ']' + '.' + nodes[count];
            item.isLast = true;
            array.push(item);
        }

        return array;
    };

};

var Item = function () {

    this.isLast = false;
    this.value = null;
    this.path = null;

    this.paths = function () {
        var result = [];
        if (this.isLast) {
            result.push(this);
        } else {

            if (util.isArray(this.value)) {
                this.value.forEach(function (item) {
                    result = result.concat(item.paths());
                });
            } else if (util.isObject(this.value)){
                result = result.concat(this.value.paths());
            }

        }

        return result;
    }

}


module.exports = Extractor;