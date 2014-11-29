'use strict';

var ExtendedClass = require('./extendedclass');
var util = require('util');

module.exports = SuperClass;

function SuperClass (spec) {
	if (!spec) spec = {};

    ExtendedClass.call(this, spec);
}

util.inherits(SuperClass, ExtendedClass);

