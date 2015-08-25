var extend = require("../util/extend")
var object = require("../util/object")

var constructors = new Set()

module.exports = function internals(Class) {
  var prototype = Class.prototype
  var parents = Class.parents = []
  var statics = Class.statics = []

  constructors.add(Class)

  Class.statics = function (fn) {
    if (Array.isArray(fn)) {
      fn.forEach(function () {
        fn(Class)
        statics.push(fn)
      })
    }
    else {
      fn(Class)
      statics.push(fn)
    }
    return Class
  }

  Class.extend = function (Super) {
    extend(Super, Class)
    internals(Super)
    Super.inherit(Class)
    return Super
  }

  Class.inherit = function (Base) {
    prototype = Class.prototype = Object.create(Base.prototype)
    Class.prototype.constructor = Class
    if (constructors.has(Base)) {
      parents = parents.concat(Base.parents)
      statics = statics.concat(Base.statics)
      Class.statics(statics)
    }
    Class.onCreate(Base)
    return Class
  }

  Class.include = function (Other) {
    Class.proto(Other.prototype)
    Class.onCreate(Other)
    return Class
  }

  Class.augment = function (extensions) {
    function augment(extension) {
      if (typeof extension == "function") {
        extension.call(Class.prototype, Class)
      }
      else {
        Class.proto(extension)
      }
    }
    if (Array.isArray(extensions)) {
      extensions.forEach(augment)
    }
    else {
      augment()
    }
    return Class
  }

  Class.onCreate = function (constructor) {
    if (typeof constructor == "function") {
      parents.push(constructor)
    }
    return Class
  }

  Class.create = function (instance, args) {
    parents.forEach(function (constructor) {
      constructor.apply(instance, args)
    })
    return instance
  }

  Class.method = function (name, fn) {
    object.method(prototype, name, fn)
    return Class
  }

  Class.property = function (name, fn) {
    object.property(prototype, name, fn)
    return Class
  }

  Class.get = function (name, fn) {
    object.defineGetter(prototype, name, fn)
    return Class
  }

  Class.set = function (name, fn) {
    object.defineSetter(prototype, name, fn)
    return Class
  }

  Class.accessor = function (name, get, set) {
    object.accessor(prototype, name, get, set)
    return Class
  }

  Class.proto = function (prototype) {
    for (var prop in prototype) {
      if (prototype.hasOwnProperty(prop)) {
        if (typeof prototype[prop] == "function") {
          if (prop === "onCreate") {
            Class.onCreate(prototype[prop])
          }
          else {
            Class.method(prop, prototype[prop])
          }
        }
        else {
          Class.property(prop, prototype[prop])
        }
      }
    }
    return Class
  }

  return Class
}
