var core = require("./core")
var attributor = require("./attributor")
var delegate = require("./delegate")

var Widget = module.exports = core({
  onCreate: function (element) {
    this.element = element
  },
  node: function (id, type) {
    var selector = id
    if (id[0] == ":") selector = this.name + id

    var element = this.element.querySelector(selector)
    if (!type) return element

    var Class = Widget.registry.get(type)
    if (!Class) throw new Error("Couldn't find widget '%s", type)

    return new Class(element)
  },
  nodeList: function (id, type) {
    var selector = id
    if (id[0] == ":") selector = this.name + id

    var elements = [].slice.call(this.element.querySelectorAll(selector))
    if (!type) return elements

    var Class = Widget.registry.get(type)
    if (!Class) throw new Error("Couldn't find widget '%s", type)

    return elements.map(function (element) { return new Class(element) })
  },
  select: function (selector, criteria) {
    if (selector[0] == ":") selector = this.name + selector

    var extra = ""
    for (var attribute in criteria) {
      if (criteria.hasOwnProperty(attribute)) {
        extra += Widget.creatWidgeteSelector(attribute, criteria[attribute])
      }
    }

    return this.element.querySelector(selector)
  },
  selectAll: function (selector, criteria) {
    if (selector[0] == ":") selector = this.name + selector

    var extra = ""
    for (var attribute in criteria) {
      if (criteria.hasOwnProperty(attribute)) {
        extra += Widget.creatWidgeteSelector(attribute, criteria[attribute])
      }
    }

    return this.element.querySelectorAll(selector)
  },
  delegate: function (options) {
    options.element = this.element
    options.context = options.context || this
    return delegate(options)
  },
  action: function (event, node, callback) {
    var options = {}
    options.event = this.event
    options.element = this.element
    options.context = options.context || this

    var widgetName = this.name
    var selectors = Array.isArray(node) ? node : [node]
    selectors.unshift(widgetName)
    selectors = selectors.map(function (selector) {
      if (selector[0] == ":") selector = widgetName + selector
      return Widget.createWidgetSelector(selector)
    })

    return delegate(options).match(selectors, function (e/*, element, nodes...*/) {
      var args = [e].concat([].slice.call(arguments, 2))
      callback.apply(this, args)
    })
  }
})

Widget.static("createSelector", function selector (attribute, value, operator, extra) {
  value = value && '"' + value + '"'
  operator = value ? operator || "=" : ""
  extra = extra || ""
  return "[" + attribute + operator + value + "]" + extra
})

Widget.static("createWidgetSelector", function (selector, extra) {
  return this.createSelector("widget", selector, "~=", extra)
})

Widget.static("attribute", attributor(Widget, {
  camelCase: true,
  get: function (widget, name) {
    return widget.name.getAttribute(name)
  },
  set: function (widget, name, value) {
    return widget.element.setAttribute(name, value)
  },
  remove: function (widget, name) {
    return widget.element.removeAttribute(name)
  }
}))
