var defaults = require("../util/defaults")

module.exports = function attributor (Class, options) {
  options = defaults(options, {
    camelCase: true,
    get: function (context, name) {},
    set: function (context, name, value) {},
    remove: function (context, name) {}
  })
  
  var attributes = new Set()
  
  return function define (name, def) {
    if (attributes.has(name)) {
      return Class
    }

    var attribute = new Attribute(def)
    attribute.getAttribute = options.get
    attribute.setAttribute = options.set
    attribute.removeAttribute = options.remove
    attributes.set(name, attribute)

    var property = options.camelCase ? camelcase(name) : name
    Object.defineProperty(Class.prototype, property, {
      get: function () {
        return attribute.get(this)
      },
      set: function (value) {
        attribute.set(this, value)
      }
    })

    return Class
  }
}

function Attribute (def) {
  var typeOfDef = typeof def
  var type
  var defaultValue
  var hasDefault

  switch (typeOfDef) {
    // primitive value
    case "boolean":
    case "number":
    case "string":
      type = typeOfDef
      defaultValue = def
      hasDefault = true
      def = {}
      break
    // definition object
    case "object":
    case "undefined":
    default:
      def = def || {}
      defaultValue = def["default"]
      hasDefault = defaultValue != null

      if (typeof def["type"] == "undefined") {
        type = hasDefault ? typeof defaultValue : "string";
      }
      else {
        type = def["type"]
      }
  }

  this.type = type
  this.defaultValue = defaultValue
  this.hasDefault = hasDefault
  this.getter = def["get"]
  this.setter = def["set"]
  this.onchange = def["onchange"]
}

Attribute.prototype.getAttribute = function (name) {}
Attribute.prototype.setAttribute = function (name, value) {}
Attribute.prototype.removeAttribute = function (name) {}

Attribute.prototype.get = function (context, useDefault) {
  if (this.getter) {
    return this.getter.call(context)
  }

  var value = this.getAttribute.call(this, context, this.name)
  if (value == null && useDefault == true) {
    return this.defaultValue
  }
  return parseValue ? parseValue(value) : value
}

Attribute.prototype.set = function (context, value, callOnchange) {
  if (this.setter) {
    this.setter.call(context)
  }

  var old = this.get(context, false)
  if (!has(value)) {
    this.removeAttribute.call(this, context, this.name)
  }
  else if (old === value) {
    return
  }
  else {
    var newValue = stringifyValue ? stringifyValue(value) : value
    this.setAttribute.call(this, context, this.name, newValue)
  }
  this.onchange && callOnchange != false && this.onchange.call(context, old, value)
}
