/**
 * @description: Prototype Pattern
 * @return {*}
 */
// The Prototype pattern allows you to create an object using another object as a blueprint, inheriting its properties and methods.

// basic concept:

// 在 JavaScript 中，对象有一个特殊的隐藏属性 [[Prototype]]（如规范中所命名的），它要么为 null，要么就是对另一个对象的引用。
// 属性 [[Prototype]] 是内部的而且是隐藏的，但是这儿有很多设置它的方式。
// 其中之一就是使用特殊的名字 __proto__。

let animal = {
  eats: true,
}
let rabbit = {
  jumps: true,
}

rabbit.__proto__ = animal // 设置 rabbit.[[Prototype]] = animal

// __proto__ 是 [[Prototype]] 的因历史原因而留下来的 getter/setter
// Object.getPrototypeOf/Object.setPrototypeOf 来取代 __proto__ 去 get/set 原型。

// F.prototype

// 可以使用诸如 new F() 这样的构造函数来创建一个新对象。
// 如果 F.prototype 是一个对象，那么 new 操作符会使用它为新对象设置 [[Prototype]]。

// 设置 Rabbit.prototype = animal 的字面意思是：“当创建了一个 new Rabbit 时，把它的 [[Prototype]] 赋值为 animal”。
// F.prototype 属性仅在 new F 被调用时使用，它为新对象的 [[Prototype]] 赋值。

// 默认的 F.prototype，构造器属性
// 每个函数都有 "prototype" 属性，即使我们没有提供它。

// 默认的 "prototype" 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身。

function Rabbit() {}

/* 默认的 prototype 
Rabbit.prototype = { constructor: Rabbit }
 */

// summary:

// F.prototype 属性（不要把它与 [[Prototype]] 弄混了）在 new F 被调用时为新对象的 [[Prototype]] 赋值。
// F.prototype 的值要么是一个对象，要么就是 null：其他值都不起作用。
// "prototype" 属性仅当设置在一个构造函数上，并通过 new 调用时，才具有这种特殊的影响。

/**
 * @description: creational design pattern - prototype
 */

// 创建一个 Dog 构造函数
function Dog(name, age) {
  this.name = name
  this.age = age
}

Dog.prototype.eat = function () {
  console.log('骨头真好吃')
}

const dog1 = new Dog('旺财', 3)
dog1.eat()

//实现一个深拷贝
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj

  let copy = {}
  if (obj instanceof Array) {
    copy = []
  }

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key])
    }
  }

  return copy
}
