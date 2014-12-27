# thing factory      [![Build Status](https://travis-ci.org/alexander-daniel/thing-factory.svg?branch=master)](https://travis-ci.org/alexander-daniel/thing-factory)

create instances of pseudo classes with inheritance from class definition files.

Populate a directory full of your class definitions (see `things/` for example) and instantiate them using a new `ThingFactory`.

ThingFactory will automatically recurse through the inheritance chain you have specified in the class definition, and inherit appropriate attributes from the classes which supercede it.

## example
```javascript
var thingFactory = new ThingFactory('./classDir');


var SuperState = thingFactory.create('SuperClass', {});
var inheritanceChain = thingFactory.inheritance(SuperState);

console.log(inheritanceChain);
// -> [ 'BaseClass', 'ExtendedClass', 'SuperClass' ]
```


# installation
```bash
npm install thing-factory
```
