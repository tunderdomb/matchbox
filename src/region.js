var core = require("./core")

var Region = core(function () {})

module.exports = Region.register

Region.statics(function (Region) {

  Region.subRegion = function (name, select) {
    Region.get(name, function () {
      return this.querySelector(select)
    })
  }
})
