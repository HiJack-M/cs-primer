// 类实现
class GameInfo {
  static getInstance() {
    if (!GameInfo.instance) {
      GameInfo.instance = new GameInfo()
    }
  }
}

const player3 = GameInfo.getInstance()
const player4 = GameInfo.getInstance()

console.log(Object.is(player3, player4))

// 闭包实现
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

console.log(Object.is(dog1, dog2))

// 创建一个独一无二的人
class Raven {
  constructor() {
    this.person = null
    if (!Raven.instance) {
      this.person = {
        desc: 'A super cool girl.',
      }
      this.person.speak = this.speak.bind(this)
      Raven.instance = this.person
    }
    return Raven.instance
  }
  speak() {
    console.log(this.person.desc)
  }
}

const raven1 = new Raven()
const raven2 = new Raven()
console.log('is the same person? ', Object.is(raven1, raven2))
raven1.speak()
raven2.speak()
