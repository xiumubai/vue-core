// proxy的用法

// proxy 顾名思义就是对对象的行为进行了代理，让我们在对对象进行操作的时候，可以做很多额外的事情

// Reflect 跟Object差不多，把Object的方法放到了它上面，后面会全面取代

var obj = {
  age: 1,
  name: 'janney',
};

var proxy = new Proxy(obj, {
  get: function (target, key) {
    console.log('get:', target, key);
    return Reflect.get(target, key);
  },
  set: function (target, key, val) {
    console.log('set:', target, key, val);
    // 在进行set操作之前会进行一次get操作
    return Reflect.set(target, key, val);
  },
});

proxy.age;
proxy.age++;
