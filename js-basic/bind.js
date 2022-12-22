// bind 核心代码
let boundFunc = func.bind(context, ...args)

// partial (利用装饰器模式和 spread 语法) 【在没有上下文的情况下可用】
function partial(func, ...argsBound) {
  return function (...args) {
    return func.call(this, ...argsBound, ...args)
  }
}
