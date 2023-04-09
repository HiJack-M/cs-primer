/**
 * @description: Sum with closures
 * @return {*}
 */

// Write function sum that works like this: sum(a)(b) = a+b.

// Yes, exactly this way, using double parentheses (not a mistype).

// For instance:

// sum(1)(2) = 3
// sum(5)(-1) = 4

function sum(a) {
  return function (b) {
    return a + b
  }
}

console.log(sum(1)(2))
console.log(sum(5)(-1))

console.log('---')

/**
 * @description: Filter through function
 */

// We have a built-in method arr.filter(f) for arrays. It filters all elements through the function f. If it returns true, then that element is returned in the resulting array.

// Make a set of “ready to use” filters:

// inBetween(a, b) – between a and b or equal to them (inclusively).
// inArray([...]) – in the given array.

// The usage must be like this:

// arr.filter(inBetween(3,6)) – selects only values between 3 and 6.
// arr.filter(inArray([1,2,3])) – selects only elements matching with one of the members of [1,2,3].

function inBetween(a, b) {
  return function (x) {
    return x >= a && x <= b
  }
}

function inArray(arr) {
  return function (x) {
    return arr.includes(x)
  }
}

/* .. your code for inBetween and inArray */
let arr = [1, 2, 3, 4, 5, 6, 7]

console.log(arr.filter(inBetween(3, 6))) // 3,4,5,6
console.log(arr.filter(inArray([1, 2, 10]))) // 1,2

console.log('---')

/**
 * @description: Sort by field
 */
// We’ve got an array of objects to sort:

let users = [
  { name: 'John', age: 20, surname: 'Johnson' },
  { name: 'Pete', age: 18, surname: 'Peterson' },
  { name: 'Ann', age: 19, surname: 'Hathaway' },
]
// The usual way to do that would be:

// by name (Ann, John, Pete)
users.sort((a, b) => (a.name > b.name ? 1 : -1))

// by age (Pete, Ann, John)
users.sort((a, b) => (a.age > b.age ? 1 : -1))
// Can we make it even less verbose
// So, instead of writing a function, just put byField(fieldName).
// Write the function byField that can be used for that.

function byField(field) {
  return function (a, b) {
    return a[field] > b[field] ? 1 : -1
  }
}

users.sort(byField('name'))
console.log(users)
users.sort(byField('age'))
console.log(users)

console.log('---')

/**
 * @description: Army of functions
 */

// The following code creates an array of shooters.

// Every function is meant to output its number. But something is wrong…
