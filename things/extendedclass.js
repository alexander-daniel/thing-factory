'use strict';

var BaseClass = require('./baseclass');
var util = require('util');

module.exports = ExtendedClass;

function ExtendedClass (spec) {
	if (!spec) spec = {};

    BaseClass.call(this, spec);
}

util.inherits(ExtendedClass, BaseClass);
