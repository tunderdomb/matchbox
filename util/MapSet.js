module.exports = MapSet

function MapSet () {
  this.map = new Map()
}

MapSet.prototype.add = function (name, item) {
  if (!this.map.has(name)) {
    this.map.set(name, new Set())
  }
  return this.map.get(name).add(item)
}

MapSet.prototype.has = function (name, item) {
  if (this.map.has(name)) {
    if (typeof item != "undefined") {
      return this.map.get(name).has(item)
    }
    return true
  }
  return false
}

MapSet.prototype.remove = function (name, item) {
  if (this.map.has(name)) {
    if (typeof item != "undefined") {
      return this.map.get(name).remove(item)
    }
    else {
      delete this.map.remove(name)
    }
  }
  return false
}
