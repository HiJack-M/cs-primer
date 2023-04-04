// let promise = new Promise((resovle, reject) => {
//   // setTimeout(() => resovle('done'), 1000)
//   setTimeout(() => reject("I don't want to work."), 1000)
// })

// promise.then(
//   (value) => {
//     console.log(value)
//   },
//   (reason) => {
//     console.log(reason)
//   }
// )

// console.log('hahaha')

// new Promise((resovle, reject) => {
//   setTimeout(() => resovle(1), 1000)
// })
//   .then((result) => {
//     console.log(result)
//     return new Promise((resovle, reject) => {
//       setTimeout(() => resovle(result * 2), 1000)
//     })
//   })
//   .then((result) => {
//     console.log(result)
//     return new Promise((resovle, reject) => {
//       setTimeout(() => resovle(result * 2), 1000)
//     })
//   })
//   .then((result) => {
//     console.log(result)
//   })

// class Thenable {
//   constructor(value) {
//     this.value = value
//   }

//   then(resovle, reject) {
//     console.log('resolve: ', resovle)
//     console.log('value: ', this.value)
//     resovle(this.value)
//   }
// }

// new Promise((resovle, reject) => {
//   resovle(1)
// })
//   .then((result) => {
//     return new Thenable(result)
//   })
//   .then(console.log)

// new Promise((resolve, reject) => {
//   resolve('ok')
// })
//   .then((result) => {
//     nosuchfunction()
//   })
//   .catch((error) => {
//     console.log(error.message)
//   })

// Promise.all([
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
//   new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
//   new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
// ]).then(console.log)

// async function loadJson(url) {
//   let res = await fetch(url)
//   if (res.status == 200) {
//     return await res.json()
//   }
//   throw new Error(res.status)
// }

// loadJson('https://javascript.info/no-such-user.json').catch(alert)

// Tehnable class
class Thenable {
  constructor(num) {
    this.num = num
  }

  // then(resolve, reject) {
  //   setTimeout(() => {
  //     resolve(this.num * 2)
  //   }, 1000)
  // }
  then(resolve, reject) {
    console.log('hahahahah')
    resolve(this.num * 2)
  }
}

new Promise((resolve, reject) => {
  resolve(1)
})
  .then((value) => {
    return new Thenable(value)
  })
  .then((val) => {
    console.log('thenable then: ', val)
  })
