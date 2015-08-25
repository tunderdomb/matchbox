module.exports = function registry(Component) {
  var registry = new Map()

  return function register(name, Sub) {
    if (registry.has(name)) {
      return registry.get(name)
    }

    Component.extend(Sub)
    registry.set(name, Sub)
    return Sub
  }
}
