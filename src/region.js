var core = require("./core")
var Relay = require("./relay")
var Widget = require("./widget")

var Region = module.exports = core({
  onCreate: function (element, parent) {
    this.relay = new Relay(this.name, parent)
  }
})

Region.include(Widget)
