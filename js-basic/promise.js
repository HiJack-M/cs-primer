let promise = new Promise((resovle, reject) => {
  // setTimeout(() => resovle('done'), 1000)
  setTimeout(() => reject("I don't want to work."), 1000)
})

promise.then(
  (value) => {
    console.log(value)
  },
  (reason) => {
    console.log(reason)
  }
)
