/**
 * @description: Factory method pattern
 */
// The Factory method pattern provides an interface for creating objects that can be modified after creation.

// 工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

class Product {
  constructor(name) {
    this.name = name
  }
  init() {
    console.log('init')
  }
  fun() {
    console.log('fun')
  }
}

class Factory {
  create(name) {
    return new Product(name)
  }
}

// use
let factory = new Factory()
let p = factory.create('p1')
p.init()
p.fun()

console.log('---')

// https://juejin.cn/post/7052148234097000462#heading-1
// 为了解决上述问题，把 Hero 拆成两个类别 Shorter 和 Longer

// '射手'
function Longer(name, title, role) {
  this.name = name
  this.title = title
  this.role = role
  this.attackDistance = 500
}

// '战士'
function Shorter(name, title, role) {
  this.name = name
  this.title = title
  this.role = role
  this.attackDistance = 125
}

// 通过一个函数判断英雄角色来使用不同构造器
function handleRole(name, title, role) {
  switch (role) {
    case '射手':
      return new Longer(name, title, role)
    case '战士':
      return new Shorter(name, title, role)
  }
}

// 我们可以这样创建了
const Jiakesi = new handleRole('贾克斯', '武器大师', '战士')
const Aixi = new handleRole('艾希', '寒冰射手', '射手')

// 为了将共性封装地更彻底，也为了将共性与个性分离地更彻底，我可以再把他们整合回 Hero
function Hero(name, title, role, attackDistance) {
  this.name = name
  this.title = title
  this.role = role
  this.attackDistance = attackDistance
}
// 然后写一个生成英雄的函数，因为英雄们就像是从流水线上生产的产品，所以给这个函数取名为“英雄工厂”
function HeroFactory(name, title, role) {
  let attackDistance
  switch (role) {
    case '射手':
      attackDistance = 500
      break
    case '刺客':
      attackDistance = 125
      break
  }
  return new Hero(name, title, role, attackDistance)
}

const Jiakesi1 = new HeroFactory('贾克斯', '武器大师', '战士')
const Aixi1 = new HeroFactory('艾希', '寒冰射手', '射手')
