var component = require("./component")

module.exports = function core (onCreate) {
  var Core = component(onCreate)
  var registry = new Map()

  Core.registry = registry
  Core.register = function register (name, onCreate) {
    if (registry.has(name)) {
      return registry.get(name)
    }

    var Super = component(onCreate)
    Super.inherit(Core)
    Super.get("name", name)
    registry.set(name, Super)
    return Super
  }

  return Core
}
