// a decorator: a special function that takes another function and alters its behavior.

function slow_v1(x) {
  // there can be a heavy CPU-intensive job here
  console.log(x)
  return x
}

function cachingDecorator_v1(func) {
  let cache = new Map()

  return function (x) {
    if (cache.has(x)) {
      return cache.get(x)
    }

    let result = func(x)

    cache.set(x, result)
    return result
  }
}

// The result of cachingDecorator(func) is a “wrapper”: function(x) that “wraps” the call of func(x) into caching logic

function sayHi() {
  console.log(this.name)
}

let user = { name: 'Marlowe' }

let admin = { name: 'Sherlock' }

sayHi.call(user)
sayHi.call(admin)

let worker = {
  someMethod() {
    return 1
  },
  slow(x) {
    return x * this.someMethod()
  },
}

function cachingDecorator(func) {
  let cache = new Map()

  return function (x) {
    if (cache.has(x)) {
      console.log('get from cache.')
      return cache.get(x)
    }

    let res = func.call(this, x)
    console.log('caching...')
    cache.set(x, res)
    return res
  }
}

worker.slow = cachingDecorator(worker.slow)

console.log(worker.slow(2))
console.log(worker.slow(2))
// When worker.slow(2) is executed, the wrapper gets 2 as an argument and this=worker (it’s the object before dot).
// 我才理解，这个 the object before dot 指的是调用的地方，current this!!!
// func.call(this, x) passes the current this (=worker) and the current argument (=2) to the original method.

// notion：
// Passing all arguments along with the context to another function is called call forwarding.

// notion:
// The trick is called method borrowing.
// We take (borrow) a join method from a regular array ([].join) and use [].join.call to run it in the context of arguments.

function hash() {
  return [].join.call(arguments)
}

// Spy decorator
// Create a decorator spy(func) that should return a wrapper that saves all calls to function in its calls property.

function work(a, b) {
  console.log('from work: ')
  console.log(a + b) // work is an arbitrary function or method
}

function spy(func) {
  function wrapper(...args) {
    // using ...args instead of arguments to store "real" array in wrapper.calls
    wrapper.calls.push(args)
    return func.apply(this, args)
  }

  wrapper.calls = []

  return wrapper
}

work = spy(work)

work(1, 2) // 3
work(4, 5) // 9

for (let args of work.calls) {
  console.log('call:' + args.join()) // "call:1,2", "call:4,5"
}

// Delaying decorator
// Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.

function f(x) {
  console.log(x)
}

// create wrappers
let f1000 = delay(f, 1000)
let f1500 = delay(f, 1500)

f1000('test') // shows "test" after 1000ms
f1500('test') // shows "test" after 1500ms

function delay(func, time) {
  return function (...args) {
    setTimeout(() => func.apply(this, args), time)
  }
}
