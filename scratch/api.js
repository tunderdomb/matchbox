var matchbox = require("matchbox")


// ======================

var User = matchbox.model("User", function (id) {})

User.can("login", function () {
  this.broadcast("login")
})

User.has("name", function () {})
User.has("default", 0)
User.has("defaulgetter", 0, function () {})
User.has("getter", function () {})
User.has("gettersetter", function () {}, function () {})
User.has("options", {
  type: "string",
  default: null,
  get: function () {},
  set: function () {}
})

// ======================

var User = matchbox.model({
  name: "User",

  create: function () {},

  get asd () {}
})

// ======================

var User = matchbox.model("User", function () {})
User.prototype.create = function () {}
User.prototype.hello = function () {}


// ======================

var users = matchbox.collection("User", ["id", "id"])

var user = users.push("id")

user.listen("login", function () {
})

var rogue = users.filter(function (id) {
  return id == null
})

users.listen("set:name", function (user, name) {})

users.listen("push", function (user, name) {})

users.listen("change", function (user, name) {})
