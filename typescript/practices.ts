// https://medium.com/front-end-weekly/4-typescript-coding-challenges-51badc881458

/**
 * @description: Get the variable type
 */

// Using typeof T we can directly get the type of a variable, which is not the same as typeof in JS.

const person = {
  name: '1',
  age: 2,
}

type Person = typeof person

/**
 * @description: Get the key of type
 */
type K = keyof Person

/**
 * @description: Condition type
 */
const wrapper = <F extends Function>(fn: F) => {
  const ret = fn()
  return ret
}

type isNumber<T> = T extends Number ? true : false

type T1 = isNumber<number>
type T2 = isNumber<string>

/**
 * @description: Indexed access types
 * Like getting a value in JavaScript, we can get the type of a value in TypeScript.
 */

type PersonName = Person['name']

/**
 * @description: Type elimination
 * never in TypeScript can be used for type elimination
 */
type CustomExclude<T, U> = T extends U ? never : T

type A = CustomExclude<keyof Person, 'name'> // type A = "age"

/**
 * @description: debounce
 */

const debounce_ts = <F extends (...args: any[]) => void>(func: F, ms: number) => {
  let timer: ReturnType<typeof setTimeout>

  return function (...args: Parameters<F>) {
    if (timer) {
      clearTimeout(timer)
    }
    setTimeout(() => func.apply(this, args), ms)
  }
}

/**
 * @description: throttle
 */
const throttle_ts = <F extends (...args: any[]) => void>(func: F, ms: number) => {
  let isThrottlerd = false
  let savedThis = null
  let savedArgs: Parameters<F> | null = null

  return function (...args: Parameters<F>) {
    if (isThrottlerd) {
      savedThis = this
      savedArgs = args
      return
    }

    func.apply(this, arguments)
    isThrottlerd = true

    setTimeout(() => {
      isThrottlerd = false

      if (savedThis) {
        func.apply(savedThis, savedArgs)
        savedThis = savedArgs = null
      }
    }, ms)
  }
}

/**
 * @description: Expands an array at the specified level
 */
const flatten = <T = any>(arr: T[], depth: number = 1) => {
  const res: T[] = []

  for (let item of arr) {
    if (depth > 0 && Array.isArray(item)) {
      res.push(...flatten(item, depth - 1))
    } else {
      res.push(item)
    }
  }

  return res
}
