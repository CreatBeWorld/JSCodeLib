/**
 * 实现子类继承父类的方法
 * @param {Function} Parent 父类的构造函数
 * @param {Function} Child 子类的构造函数 
 */
function inherit(Parent, Child) {
    //Object.setPrototypeOf(obj,prototype)设置obj的隐式原型为prototype
    //在原型链上实现继承
    Object.setPrototypeOf(Child.prototype, Parent.prototype);
}