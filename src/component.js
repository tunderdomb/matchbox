var internals = require("./internals")

module.exports = function component (onCreate) {
  function Matchbox () {
    Matchbox.create(this, arguments)
  }

  internals(Matchbox)
  if (typeof onCreate == "function") {
    Matchbox.onCreate(onCreate)
  }
  else {
    Matchbox.proto(onCreate)
  }

  return Matchbox
}

