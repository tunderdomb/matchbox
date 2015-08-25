var internals = require("./internals")

module.exports = function component (onCreate) {
  function Matchbox () {
    Matchbox.create(this, arguments)
  }

  internals(Matchbox)
  if (onCreate) Matchbox.onCreate(onCreate)

  return Matchbox
}

