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

## var thingFactory = new ThingFactory(classDir)
`classDir` is the path to where you have stored your class definitions.

Returns an `EventEmitter`

## thingFactory.prepareThingClasses()
must be called first. `ready` event will fire when all classfiles are loaded.

## thingFactory.create(className, spec)
`className` | the name of the class you wish to create

`spec` | object to pass in any specifications for initialization of the instance of your class.

Returns an instance of the class. (`thingState`)


## thingFactory.inheritance(thingState)
Returns the inheritance chain of given `thingState`

## thingFactory.hasAncestor(thingState, ancestor)
`thingState` | instance of a class

`ancestor` | name of class to check if given `thingState` has ancestor of.

Returns `boolean`


# test
```bash
npm test
```

# licence
MIT
