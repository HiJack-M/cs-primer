// 1.4.1 使用克隆的原型模式

let Plane = function () {
  this.blood = 100
  this.attackLevel = 1
  this.defenceLevel = 1
}

let plane = new Plane()
plane.blood = 500
plane.attackLevel = 10
plane.defenceLevel = 7

let clonePlane = Object.create(plane)
console.log('clonePlane: ', clonePlane)

// 在不支持 Object.create 方法的浏览器中，则可以使用以下代码：
Object.create =
  Object.create ||
  function (obj) {
    let F = new (function () {})()
    F.prototype = obj

    return new F()
  }
