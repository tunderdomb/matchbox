var internals = require("./src/internals")
var registry = require("./src/registry")
var core = require("./src/core")
var component = require("./src/component")

var intent = require("./src/intent")
var IntentFilter = require("./src/IntentFilter")
var Transmission = require("./src/Transmission")
var relay = require("./src/relay")

var radio = require("./src/radio")
var channel = require("./src/channel")

var region = require("./src/region")
var element = require("./src/element")

var model = require("./src/Model")

var matchbox = module.exports = {}

matchbox.relay = relay
matchbox.region = relay
matchbox.element = element
matchbox.model = model
matchbox.radio = radio
matchbox.channel = channel
