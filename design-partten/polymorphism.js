// const makeSound = (animal) => {
//   if (animal instanceof Duck) {
//     console.log('嘎嘎嘎')
//   }
//   if (animal instanceof Chicken) {
//     console.log('咯咯咯')
//   }
// }
//
// const Duck = function() {}
// const Chicken = function() {}
//
// makeSound(new Duck())
// makeSound(new Chicken())

// version 2.0，对象的多态

const makeSound = (animal) => {
  animal.sound()
}

const Duck = function () {}

Duck.prototype.sound = () => {
  console.log('嘎嘎嘎')
}

const Chicken = function () {}

Chicken.prototype.sound = () => {
  console.log('咯咯咯')
}

makeSound(new Duck())
makeSound(new Chicken())
