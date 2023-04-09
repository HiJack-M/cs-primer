function expect(a) {
  return {
    toBe: function (b) {
      return a === b
    },
    not: {
      toBe: function (b) {
        return a !== b
      },
    },
  }
}

console.log(expect(3).toBe(3))
console.log(expect(3).not.toBe(2))
