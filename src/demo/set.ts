// Set的用法

/**

Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

let s = new Set() 接受一个数组

s.add() 只能接受一个参数

 */

// 添加值
const s = new Set();
s.add(6);
// 可以添加数组-4不会重复
s.add([1, 2, 3, 4, 4]);
s.add(7);
console.log(...s);

// 支持解构
const [a, b] = s;
console.log(a, b);

// 去除数组的重复元素

let arr = [1, 2, 3, 4, 5, 4, 4, 4];
const newArr = [...new Set(arr)];
console.log('去重以后的元素', newArr);

/**

## Set实例的属性和方法

### 属性
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。


### 操作方法

- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。

Array.from 可以将Set结构转化为数组

### 遍历方法


- Set.prototype.keys()：返回键名的遍历器
- Set.prototype.values()：返回键值的遍历器
- Set.prototype.entries()：返回键值对的遍历器
- Set.prototype.forEach()：使用回调函数遍历每个成员

 */

s.add(1).add(2).add(3);
s.size;
s.has(1);

s.delete(1);
s.clear();

const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

// 数组去重
function dedupe(array) {
  return Array.from(new Set(array));
}

let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
  console.log(item);
}
for (let item of set.values()) {
  console.log(item);
}
for (let item of set.entries()) {
  console.log(item);
}

for (let x of set) {
  console.log(x);
}

set.forEach((value, key) => console.log(key + ' : ' + value));

/**
 
## 

WeakSet 的用法

WeakSet 的成员只能是对象，而不能是其他类型的值
WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
WeakSet 可以接受一个数组或类似数组的对象作为参数


WeakSet 结构有以下三个方法。

- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中

 */
