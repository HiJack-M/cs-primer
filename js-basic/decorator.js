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

// Debounce decorator

// The result of debounce(f, ms) decorator is a wrapper that suspends calls to f until there’s ms milliseconds of inactivity (no calls, “cooldown period”), then invokes f once with the latest arguments.

// In other words, debounce is like a secretary that accepts “phone calls”, and waits until there’s ms milliseconds of being quiet. And only then it transfers the latest call information to “the boss” (calls the actual f).

// For instance, we had a function f and replaced it with f = debounce(f, 1000).

// Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there are no calls, then the actual f will be only called once, at 1500ms. That is: after the cooldown period of 1000ms from the last call.

// …And it will get the arguments of the very last call, other calls are ignored.

// Here’s the code for it (uses the debounce decorator from the Lodash library):

let f_debounce = debounce(function (x) {
  console.log(x)
}, 1000)

f_debounce('a')
setTimeout(() => f_debounce('b'), 200)
setTimeout(() => f_debounce('c'), 500)
// debounced function waits 1000ms after the last call and then runs: alert("c")

function debounce(func, ms) {
  let timer

  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, arguments), ms)
  }
}

// Throttle decorator

// Create a “throttling” decorator throttle(f, ms) – that returns a wrapper.

// throttle runs it not more often than given ms time. Good for regular updates that shouldn’t be very often.

// In other words, throttle is like a secretary that accepts phone calls, but bothers the boss (calls the actual f) not more often than once per ms milliseconds.

function f_throttle(a) {
  console.log(a)
}

// f1000 passes calls to f at maximum once per 1000 ms
let ff1000 = throttle(f_throttle, 1000)

ff1000(1) // shows 1
ff1000(2) // (throttling, 1000ms not out yet)
ff1000(3) // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored

function throttle(func, ms) {
  let isThrottled = false
  let savedThis
  let savedArgs

  return function () {
    if (isThrottled) {
      savedThis = this
      savedArgs = arguments
      return
    }
    isThrottled = true

    func.apply(this, arguments)

    setTimeout(() => {
      if (savedArgs) {
        isThrottled = false
        func.apply(savedThis, savedArgs)
        savedThis = null
        savedArgs = null
      }
    }, ms)
  }
}
