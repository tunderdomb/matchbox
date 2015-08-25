module.exports = ArrayMap

function ArrayMap () {
  this.map = new Map()
}

ArrayMap.prototype = []
ArrayMap.prototype.add = function (name, item) {
  if (!this.map.has(name)) {
    this.push(item)
    this.map.set(name, item)
  }

  return item
}

ArrayMap.prototype.has = function (name) {
  return this.map.has(name)
}

ArrayMap.prototype.remove = function (name) {
  if (this.map.has(name)) {
    var item = this.map.get(name)
    this.splice(item, this.indexOf(item))
    this.map.remove(name)
  }
}
