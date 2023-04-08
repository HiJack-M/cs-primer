/**
 * @description: Builder Pattern
 */
// The Builder pattern is used to create objects in "steps".
// 在JavaScript中，我们使用构造函数去初始化对象，就是应用了构造器模式。

// 假如你是Riot公司的一名程序员，领导让你使用js重新开发lol这款游戏

// 首先创建一名英雄到系统内
const Aixi = {
  name: '艾希',
  title: '寒冰射手',
  role: '射手',
}

// 创建第二名英雄
const Zhaoxin = {
  name: '赵信',
  title: '德邦总管',
  role: '战士',
}

// 想想还有100多名英雄没创建呢，要加班到深夜呀，于是写个构造函数
// function Hero(name, title, role) {
//   this.name = name
//   this.title = title
//   this.role = role
// }

class Hero {
  constructor(name, title, role) {
    this.name = name
    this.title = title
    this.role = role
  }
}

// 创建英雄就new一下就搞定了
const Jiakesi = new Hero('贾克斯', '武器大师', '战士')
const Yidashi = new Hero('易大师', '无极剑圣', '刺客')
