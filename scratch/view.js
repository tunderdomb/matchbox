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


var AppBar = Header.subRegion("appBar", function () {
  this.dispatch("event", "detail")
})

AppBar.prototype.hello = function () {}


// =======

var header = new Header(null)


var AppBar = matchbox.region("app-bar", function () {})
AppBar.action("click", "element:close", function () {

})
