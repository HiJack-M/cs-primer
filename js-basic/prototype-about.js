// 使用 Object.create 来实现比复制 for..in 循环中的属性更强大的对象克隆方式：
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))

// 此调用可以对 obj 进行真正准确地拷贝，包括所有的属性：可枚举和不可枚举的，数据属性和 setters/getters —— 包括所有内容，并带有正确的 [[Prototype]]。

// pure dictionary   very plain object
let obj = Object.create(null)
// 没有原型，使得可以用 __proto__ 作键名
// 缺点是这样的对象没有任何内建的对象的方法
