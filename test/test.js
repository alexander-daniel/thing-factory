'use strict';
var ThingFactory = require('../index');
var thingFactory = new ThingFactory(__dirname + '/../things/');
var tape = require('tape');

thingFactory.once('ready', function () {

    tape.test('Base - Extended - Super | inheritance', function (t) {
        t.plan(1);
        var SuperState = thingFactory.create('SuperClass', {});
        var inheritance = thingFactory.inheritance(SuperState);
        t.deepEqual(inheritance, [ 'BaseClass', 'ExtendedClass', 'SuperClass' ],
                   'inheritance chain correct');
        t.end();
    });

    tape.test('Base - Extended - Super | inheritance with no spec', function (t) {
        t.plan(1);
        var SuperState = thingFactory.create('SuperClass');
        var inheritance = thingFactory.inheritance(SuperState);
        t.deepEqual(inheritance, [ 'BaseClass', 'ExtendedClass', 'SuperClass' ],
                   'inheritance chain correct');
        t.end();
    });

    tape.test('Foobar Class', function (t) {
        t.plan(1);
        var SuperState = thingFactory.create('fooclass');
        t.equal(null, SuperState, 'should be null, no fooclass')
        t.end();
    });

});
