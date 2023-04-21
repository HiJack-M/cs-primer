let target = {}
let proxy = new Proxy(target, {}) // empty handler object

proxy.test = 5
console.log(target.test)

console.log(proxy.test)

for (let key in proxy) {
  console.log(key)
}
