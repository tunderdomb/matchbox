var internals = require("./internals")
var object = require("../util/object")

module.exports = core

function core( definition ){
  var registry = new Map()
  return create(definition, registry)
}

function create( definition, registry ){
  var Class = definition.constructor

  internals(Class)

  if( definition.inherit ) Class.inherit(definition.inherit)
  if( definition.prototype ) Class.proto(definition.prototype)
  if( definition.accessor ){
    object.for(definition.accessor, function( name, access ){
      Class.accessor(name, access.get, access.set)
    })
  }
  if( definition.get ){
    object.for(definition.get, function( name, getter ){
      Class.get(name, getter)
    })
  }
  if( definition.set ){
    object.for(definition.set, function( name, getter ){
      Class.set(name, getter)
    })
  }
  if( definition.include ) Class.include(definition.include)
  if( definition.augment ) Class.augment(definition.augment)
  if( definition.static ) object.for(definition.static, function( name, method ){ Class.static(name, method) })
  if( definition.options ){
    Class.setup(function( Class ){
      object.for(definition.options, function( customDefinitionProperty, setupCustomDefinition ){
        setupCustomDefinition(Class, definition[customDefinitionProperty])
      })
    })
  }

  if( registry ){
    Class.__registry = registry
    Class.get("__registry", registry)
    if( definition.name ){
      Class.__name = definition.name
      Class.get("__name", definition.name)
      registry.set(definition.name, Class)
    }
  }

  Class.prototype.constructor = Class

  Class.extend = function( superDefinition ){
    superDefinition.inherit = Class
    return create(superDefinition, registry)
  }

  return Class
}
