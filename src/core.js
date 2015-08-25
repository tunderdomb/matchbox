var component = require("./component")
var registry = require("./registry")

module.exports = function core(onCreate) {
  var Core = component(onCreate)
  Core.register = registry(Core)

  return Core
}
