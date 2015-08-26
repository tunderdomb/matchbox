var matchbox = require("matchbox")

var Header = matchbox.region("Header", function () {
  this.appBar = this.component("appBar")

  this.appBar.hello()
  this.deleage("event", "appBar", function (e, appBar) {
    appBar.hello()
  })
  this.event("click", function () {})

  this.announce("roundtrip", "data", function (intent) {})
  this.react("roundtrip", function (intent, cb) {
    cb()
  })

  this.relay("intent", "data")
  this.receive("intent", function (intent) {})

  this.invoke("app.hello", "data")
  this.invoke("app.async", "data", function (result) {

  })
})

// =======

var header = new Header(null)


var AppBar = matchbox.region("app-bar", function () {
  this.action("click", "element:close", function (e, button) {
    this.relay("")
  })
})

var FilterBar = matchbox.region("filter-bar", function () {
  this.search = this.node(":search", "search")
  this.orderSelect = this.node(":order", "select")
  this.cardList = this.node(":cards", "sortable-list")
  this.cards = this.node(":card")
  this.selects = this.node("select", "select")

  this.action("select", "select", function (e, button) {
    this.relay("")
  })
})


var Select = matchbox.widget("select", {
  onCreate: function () {
    this.label = this.node(":label")
    this.menu = this.node(":menu")
    this.options = this.nodeList(":option", "select-option")

    this.delegate("click", ":option", "selectOption")
  },
  selectOption: function (option) {
    if (this.selectedOption == option) {
      return
    }
    if (this.selectedOption) {
      this.selectedOption.selected = false
    }
    option.selected = true
    this.label.textContent = option.textContent
    this.open = false
    this.dispatch("select")
  },
  selectValue: function (value) {
    var option = this.select(":option", {value: value})
    if (option) {
      this.selectOption(option)
    }
  }
})

Select.attribute("open", false)
Select.attribute("value", function () {
  return this.selectedOption.value
})
Select.get("selectedOption", function () {
  return this.select(":option", {selected: true})
})

