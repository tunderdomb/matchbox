var internals = require("./src/internals")
var core = require("./src/core")
var component = require("./src/component")

var intent = require("./src/intent")
var IntentFilter = require("./src/IntentFilter")
var Transmission = require("./src/Transmission")
var relay = require("./src/relay")

var radio = require("./src/radio")
var channel = require("./src/channel")

var region = require("./src/region")
var widget = require("./src/widget")
var element = require("./src/element")

var model = require("./src/Model")

var matchbox = module.exports = {}

matchbox.relay = relay.register
matchbox.region = region.register
matchbox.widget = widget.register
matchbox.element = element.register
matchbox.model = model.register
matchbox.radio = radio
matchbox.channel = channel
