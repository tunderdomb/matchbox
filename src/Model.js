var core = require("./core")

var Model = module.exports = core(function () {})

Model.statics(function (Class) {

  Class.can = function (execute, routine) {
    Class.method(execute, routine)
  }

  Class.has = function (property, definition) {
    Class.get(property, definition)
  }
})
