var core = require("./core")

var Model = module.exports = core({
  setup: function(Class){

    Class.can = function (execute, routine) {
      Class.method(execute, routine)
      return Class
    }

    Class.has = function (property, definition) {
      Class.get(property, definition)
      return Class
    }
  }
})
