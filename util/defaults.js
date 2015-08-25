var merge = require("./merge")

module.exports = function defaults (options, defaults) {
  var obj = merge({}, defaults)
  for (var prop in defaults) {
    if (defaults.hasOwnProperty(prop) && !options.hasOwnProperty(prop)) {
      obj[prop] = defaults[prop]
    }
  }

  return obj
}
