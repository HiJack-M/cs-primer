/**
 * @description: Adapter
 * allows two objects with incompatible interfaces to interact with each other.
 * 适配器模式通过把一个类的接口变换成客户端所期待的另一种接口，可以帮我们解决不兼容的问题。不影响现有实现方式，兼容调用旧接口的代码.
 */

class Plug {
  getName() {
    return 'iphone充电头'
  }
}

class Target {
  constructor() {
    this.plug = new Plug()
  }
  getName() {
    return this.plug.getName() + ' 适配器Type-c充电头'
  }
}

let target = new Target()
target.getName() // iphone充电头 适配器转Type-c充电头
