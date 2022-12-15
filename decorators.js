// https://zh.javascript.info/call-apply-decorators#yan-shi-zhuang-shi-qi

// 装饰器核心代码
let wrapper = function () {
  return func.apply(this, arguments)
}
return wrapper

// 以下是各种例子

let worker = {
  slow(x, y) {
    console.log(`Called with ${x} and ${y}`)
    return x + y
  },
}

function cachingDecorator(func, hash) {
  const map = new Map()

  return function () {
    let key = hash(arguments)
    if (map.has(key)) {
      console.log(`get result from cache, args: ${[...arguments]}.`)
      return map.get(key)
    }

    // 真正调用主函数的地方
    let result = func.apply(this, arguments)

    console.log(`cache result into cache.`)
    map.set(key, result)
    return result
  }
}

function hash(args) {
  return [...args].join(',')
}

// slow(1)

worker.slow = cachingDecorator(worker.slow, hash)
// worker.slow(2, 5)
// worker.slow(2, 5)

// 间谍装饰器
// 创建一个装饰器 spy(func)，它应该返回一个包装器，该包装器将所有对函数的调用保存在其 calls 属性中。
let work = function (a, b) {
  console.log(a + b) // work 是一个任意的函数或方法
}

function spy(func) {
  function wrapper(...args) {
    wrapper.calls.push(args)
    return func.apply(this, args)
  }

  wrapper.calls = []

  return wrapper
}

work = spy(work)

// work(1, 2) // 3
// work(4, 5) // 9

// for (let args of work.calls) {
//   console.log('call:' + args.join()) // "call:1,2", "call:4,5"
// }

// 延时装饰器
// 创建一个装饰器 delay(f, ms)，该装饰器将 f 的每次调用延时 ms 毫秒。
function f(x) {
  console.log(x)
}

function delay(func, ms) {
  return function () {
    setTimeout(() => {
      func.apply(this, arguments)
    }, ms)
  }
}

// create wrappers
let f1000 = delay(f, 1000)
let f1500 = delay(f, 1500)

// f1000('test') // 在 1000ms 后显示 "test"
// f1500('test') // 在 1500ms 后显示 "test"

// 防抖装饰器
// debounce(f, ms) 装饰器的结果是一个包装器，该包装器将暂停对 f 的调用，直到经过 ms 毫秒的非活动状态（没有函数调用，“冷却期”），然后使用最新的参数调用 f 一次。

function debounce(f, ms) {
  let timer

  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => f.apply(this, arguments), ms)
  }
}

let ff = debounce((x) => console.log(x), 1000)

ff('a')
setTimeout(() => ff('b'), 200)
setTimeout(() => ff('c'), 500)
// 防抖函数从最后一次函数调用以后等待 1000ms，然后执行：alert("c")

// 节流装饰器
// 创建一个“节流”装饰器 throttle(f, ms) —— 返回一个包装器。

// 当被多次调用时，它会在每 ms 毫秒最多将调用传递给 f 一次。

function fff(a) {
  console.log(a)
}

function throttle(func, ms) {
  let isThrottled = false
  let savedThis = null
  let savedArgs = null

  function wrapper() {
    // 如果在节流中
    if (isThrottled) {
      savedThis = this
      savedArgs = arguments // 更新到最新调用的
      return
    }

    // 如果没有节流，直接调用主函数，然后进入节流状态
    func.apply(this, arguments)
    isThrottled = true

    // ms 之后解除节流状态
    setTimeout(() => {
      isThrottled = false
      // 运行最后的调用
      if (savedThis) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }

  return wrapper
}

// f1000 最多每 1000ms 将调用传递给 f 一次
let fff1000 = throttle(fff, 1000)

fff1000(1) // 显示 1
fff1000(2) // (节流，尚未到 1000ms)
fff1000(3) // (节流，尚未到 1000ms)

// 当 1000ms 时间到...
// ...输出 3，中间值 2 被忽略

// P.S. 参数（arguments）和传递给 f1000 的上下文 this 应该被传递给原始的 f。
