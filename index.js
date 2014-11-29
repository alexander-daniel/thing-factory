'use strict';
var util = require('./util');
var Findit = require('findit');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

module.exports = ThingFactory;

function ThingFactory (thingDir) {
    EventEmitter.call(this);

    this.classes = {};
    this.THINGDIR = thingDir;
    this.finder = Findit(this.THINGDIR);

    this.prepareThingClasses();
}

util.inherits(ThingFactory, EventEmitter);


var proto = ThingFactory.prototype;

proto.prepareThingClasses = function () {
    var _this = this;
    this.finder.on('file', function (file) {
        var className = path.basename(file).slice(0, -3).toLowerCase();
        if (className === 'test') return;
        // remove the .js and add to class dictionary
        _this.classes[className] = require(file);

        console.log(className, 'loaded successfully');
    });

    this.finder.once('end', function () {
        _this.emit('ready');
    });
};

proto.create = function (thingClassName, spec) {

    thingClassName = thingClassName.toLowerCase();
    var Class = this.classes[thingClassName];
    if (!Class) {
        console.log({err: 'unknown class', Class: thingClassName});
        return null;
    }

    var thingState = new Class(spec);
    return thingState;

};

proto.inheritance = function (thingState) {

    var inheritanceChain = [];
    var proto = Object.getPrototypeOf(thingState);
    var className = proto.constructor.name;
    var Class = this.classes[className.toLowerCase()];

    recurseClass(Class, inheritanceChain);

    return inheritanceChain.reverse();
};

proto.hasAncestor = function (thingState, ancestor) {
    return this.inheritance(thingState).indexOf(ancestor) > -1;
};



proto.pruneTree = function (tree) {

    function getSharedProperties(parent, child) {
        var shared = [];
        for (var key in parent) {
            if (util.deepEqual(parent[key], child[key])) shared.push(key);
        }

        return shared;
    }

    var _this = this;
    var descendants = Object.keys(tree.descendants);
    if (descendants.length === 0) {
        delete tree.descendants;
    }
    descendants.forEach( function (descendant) {
        // tree.descendants[descendant].overSpecified = getSharedProperties(tree, tree.descendants[descendant]);
        _this.pruneTree(tree.descendants[descendant]);
    });

    return tree;

};

proto.chainOfBeing = function () {

    var _this = this;
    var weboflife = {};


    function buildLifeBranch(chain, web) {
        var nextWeb = {'descendants': {}};
        var className = chain.shift();
        if (className in web) {
            nextWeb = web[className];
        } else {
            var thing = _this.create(className, {});
            util.extend(thing, nextWeb);
            web[className] = thing;
        }
        if (!chain.length) return;

        buildLifeBranch(chain, nextWeb.descendants);
    }


    Object.keys(this.classes).forEach( function (cls) {
        var Class = _this.classes[cls.toLowerCase()];
        var chain = [];
        recurseClass(Class, chain);
        chain = chain.reverse();
        buildLifeBranch(chain, weboflife);
    });

    return this.pruneTree(weboflife.Thing);
};

function recurseClass (Class, chain) {
    if (!Class) return void 0;
    else chain.push(Class.name);
    return recurseClass(Class.super_, chain);
}
