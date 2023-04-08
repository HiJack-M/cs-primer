/**
 * @description: Singleton
 * @return {*}
 */
// Singleton is a design pattern that ensures that a class has only one immutable instance. Said simply, the singleton pattern consists of an object that can't be copied or modified.

// 用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。

// 单例设计模式的实现：面向对象
var Singleton = function (name) {
  this.name = name
  this.instance = null
}
Singleton.prototype.getName = function () {
  return this.name
}
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance
}

var instance1 = Singleton.getInstance('why')
var instance2 = Singleton.getInstance('www')
console.log('instance1 is instance2 ? ', instance1 === instance2) // 输出 true

// 我们通过 Singleton.getInstance 来获取 Singleton 类的唯一对象，这种方式相对简单，但有一个问题，就是增加了这个类的“不透明性”, Singleton 类的使用者必须知道这是一个单例类，跟以往通过 new XXX 的方式来获取对象不同，这里偏要使用 Singleton.getInstance 来获取对象。

var obj1 = new Singleton('why')
var obj2 = new Singleton('www')

console.log(obj1 === obj2) // 输出 false

console.log(obj1.getName()) // 输出 why
console.log(obj2.getName()) // 输出 www

console.log('---')

// 类实现
console.log('类实现:')
class GameInfo {
  static getInstance() {
    // assign a method to the class as a whole
    if (!GameInfo.instance) {
      GameInfo.instance = new GameInfo()
    }
    return GameInfo.instance
  }
}

const player1 = GameInfo.getInstance()
const player2 = GameInfo.getInstance()

console.log('player1 is player2? ', Object.is(player1, player2))

// 闭包实现
console.log('闭包实现:')
function SingleDog() {}
SingleDog.getInstance = (function () {
  let instance = null
  return function () {
    if (instance === null) {
      instance = new SingleDog()
    }
    return instance
  }
})()

const dog1 = SingleDog.getInstance()
const dog2 = SingleDog.getInstance()

console.log('dog1 is dog2? ', Object.is(dog1, dog2))

console.log('---')

// 创建一个独一无二的人
console.log('创建一个独一无二的人 -- class: ')
class Raven {
  constructor() {
    this.person = null
  }
  getDesc(str) {
    this.person = { desc: str }
  }
  speak() {
    console.log(this.person ? this.person.desc : 'no desc')
  }

  static getInstance() {
    if (!Raven.instance) {
      Raven.instance = new Raven()
    }
    return Raven.instance
  }
}

const raven1 = Raven.getInstance()
const raven2 = Raven.getInstance()
console.log('is the same person? ', Object.is(raven1, raven2))
raven1.getDesc('she is a cool girl.')
raven1.speak()
raven2.speak()

console.log('创建一个独一无二的人 -- closure: ')
function Jovi() {
  this.person = null
}
Jovi.getInstance = (function () {
  let instance = null
  return function () {
    if (!instance) {
      instance = new Jovi()
    }
    return instance
  }
})()
Jovi.prototype.getDesc = function (str) {
  this.person = { desc: str }
}
Jovi.prototype.speak = function () {
  console.log(this.person ? this.person.desc : 'Jovi is null.')
}

let jovi1 = Jovi.getInstance()
let jovi2 = Jovi.getInstance()
console.log('is two jovi a same person? ', Object.is(jovi1, jovi2))
jovi2.getDesc('Jovi is a smart cat.')
jovi1.speak()
jovi2.speak()

console.log('---')

class LoginForm {
  constructor() {
    this.state = 'hide'
  }
  show() {
    if (this.state === 'show') {
      console.log('已经显示')
      return
    }
    this.state = 'show'
    console.log('登录框显示成功')
  }
  hide() {
    if (this.state === 'hide') {
      console.log('已经隐藏')
      return
    }
    this.state = 'hide'
    console.log('登录框隐藏成功')
  }
}
LoginForm.getInstance = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new LoginForm()
    }
    return instance
  }
})()

let obj11 = LoginForm.getInstance()
obj11.show()

let obj21 = LoginForm.getInstance()
obj21.hide()

console.log(obj11 === obj21)
