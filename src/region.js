var core = require("./core")
var Relay = require("./relay")
var Widget = require("./widget")

var Region = module.exports = core({
  inherit: Widget,
  augment: Relay.prototype,

  constructor: function(element, name, parent){
    Relay.call(this, name, parent)
  }
})