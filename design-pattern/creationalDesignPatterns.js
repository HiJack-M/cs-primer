/**
 * @description: Singleton
 * @return {*}
 */
// Singleton is a design pattern that ensures that a class has only one immutable instance. Said simply, the singleton pattern consists of an object that can't be copied or modified.

// Using an object literal
const Config = {
  start: () => console.log('App has started.'),
  updated: () => console.log('App has updated.'),
}

Object.freeze(Config)

Config.start()
Config.updated()

Config.name = 'add a property.' // it's not working.
console.log(Config)

// Using classes
class Config1 {
  constructor() {}
  start() {
    console.log('App has started.')
  }
  updated() {
    console.log('App has updated.')
  }
}

let instance1 = new Config1()
Object.freeze(instance1)

/**
 * @description: Factory method pattern
 * @return {*}
 */
// The Factory method pattern provides an interface for creating objects that can be modified after creation.

// Using classes
class Aline {
  constructor(name, phrase) {
    this.name = name
    this.phrase = phrase
    this.species = 'aline'
  }
  fly() {
    console.log('Zzzzzziiiiiinnnnnggggg!!')
  }
  sayPhrase() {
    console.log(this.phrase)
  }
}

const Aline1 = new Aline('Ali', `I'm Ali the Aline!`)
console.log(Aline1.name)
Aline1.sayPhrase()

// Using a factory function
function AlineFunc(name, phrase) {
  this.name = name
  this.phrase = phrase
  this.species = 'aline'
}

AlineFunc.prototype.fly = () => {
  console.log('Zzzzzziiiiiinnnnnggggg!!')
}
// AlineFunc.prototype.sayPhrase = () => {
//   console.log(this.phrase)
// }
AlineFunc.prototype.sayPhrase = function () {
  console.log(this.phrase)
}

const Aline2 = new AlineFunc('Aha', `I'm Aha the Aline!`)
console.log(Aline2.name)
Aline2.sayPhrase()

/**
 * @description: Abstract Factory
 * @return {*}
 */
// The Abstract Factory pattern allows us to produce families of related objects without specifying concrete classes. It's useful in situations where we need to create objects that share only some properties and methods.
// The way it works is by presenting an abstract factory the client interacts with. That abstract factory calls the corresponding concrete factory given the corresponding logic. And that concrete factory is the one that returns the end object.

// We have a class or "concrete factory" for each vehicle type
class Car {
  constructor() {
    this.name = 'Car'
    this.wheels = 4
  }
  turnOn() {
    console.log('Chacabúm!!')
  }
}

class Truck {
  constructor() {
    this.name = 'Truck'
    this.wheels = 8
  }
  turnOn() {
    console.log('RRRRRRRRUUUUUUUUUMMMMMMMMMM!!')
  }
}

class Motorcycle {
  constructor() {
    this.name = 'Motorcycle'
    this.wheels = 2
  }
  turnOn() {
    console.log('sssssssssssssssssssssssssssssshhhhhhhhhhham!!')
  }
}

// And and abstract factory that works as a single point of interaction for our clients
// Given the type parameter it receives, it will call the corresponding concrete factory
const vehicleFactory = {
  createVehicle: function (type) {
    switch (type) {
      case 'car':
        return new Car()
      case 'truck':
        return new Truck()
      case 'motorcycle':
        return new Motorcycle()
      default:
        return null
    }
  },
}

const car = vehicleFactory.createVehicle('car')
car.turnOn()
const truck = vehicleFactory.createVehicle('truck')
truck.turnOn()
const motorcycle = vehicleFactory.createVehicle('motorcycle')
motorcycle.turnOn()

/**
 * @description: Builder Pattern
 * @return {*}
 */
// The Builder pattern is used to create objects in "steps".

// We declare our objects
const bug1 = {
  name: 'Buggy McFly',
  phrase: "Your debugger doesn't work with me!",
}

const bug2 = {
  name: 'Martiniano Buggland',
  phrase: "Can't touch this! Na na na na...",
}

const addFlyingAbility = (obj) => {
  obj.fly = () => console.log(`Now ${obj.name} can fly!`)
}
const addSpokenAbility = (obj) => {
  obj.saySomething = () => console.log(`${obj.name} walks the walk and talks the talk.`)
}

// Finally we call the builder functions passing the objects as parameters
addFlyingAbility(bug1)
bug1.fly()
addSpokenAbility(bug2)
bug2.saySomething()

/**
 * @description: Prototype Pattern
 * @return {*}
 */
// The Prototype pattern allows you to create an object using another object as a blueprint, inheriting its properties and methods.

// We declare our prototype object with two methods
const enemy = {
  attack: () => console.log('Pim Pam Pum!'),
  flyAway: () => console.log('Flyyyy like an eagle!'),
}

// We declare another object that will inherit from our prototype
const bug11 = {
  name: 'Buggy McFly',
  phrase: "Your debugger doesn't work with me!",
}

// With setPrototypeOf we set the prototype of our object
Object.setPrototypeOf(bug11, enemy)

// With getPrototypeOf we read the prototype and confirm the previous has worked
console.log(Object.getPrototypeOf(bug11))
bug11.attack()
bug11.flyAway()
