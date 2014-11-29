'use strict';
// http://raganwald.com/2014/04/10/mixins-forwarding-delegation.html
//var util = require('util')
var __slice = [].slice;

exports.inherits = require('util').inherits;
exports.deepEqual = require('deep-equal');

/*
 * extend - overwrites consumer keys
 */
exports.extend = function () {
  var consumer = arguments[0],
      providers = __slice.call(arguments, 1),
      key,
      i,
      provider;

  for (i = 0; i < providers.length; ++i) {
    provider = providers[i];
    for (key in provider) {
      if (provider.hasOwnProperty(key)) {
        consumer[key] = provider[key];
      }
    }
  }
  return consumer;
};


exports.forward = function (receiver, methods, toProvider) {
  if (!Array.isArray(methods)) {
      toProvider = methods;
    methods = Object.keys(toProvider);
  }
  methods.forEach(function (methodName) {
    if (typeof toProvider[methodName] !== 'function') return;
      if (!(methodName in toProvider)) return;
    receiver[methodName] = function () {
      return toProvider[methodName].apply(toProvider, arguments);
    };
  });

  return receiver;
};


exports.listen = function (emitter, eventListeners) {
    Object.keys(eventListeners).forEach( function (key) {
        if (key.substr(0,2) === 'on' && typeof eventListeners[key] === 'function') {
            var event = key.substr(2);
            emitter.once(event, eventListeners[key]);
        }
    });
}

exports.delegate = function (receiver, methods, toProvider) {
  methods.forEach(function (methodName) {
    receiver[methodName] = function () {
      return toProvider[methodName].apply(receiver, arguments);
    };
  });

  return receiver;
};

exports.delegateForward = function (receiver, baseState, methods, toProvider) {
    methods.forEach(function (methodName) {
        receiver[methodName] = function () {
            return toProvider[methodName].apply(baseState, arguments);
        };
    });

    return receiver;
};
