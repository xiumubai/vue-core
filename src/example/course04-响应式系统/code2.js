let bucket = new Set();

const data = { text: 'hello world', age: 1 };

const obj = new Proxy(data, {
  get(target, key) {
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set(target, key, newVal) {
    target[key] = newVal;
    bucket.forEach((fn) => fn());
    return true;
  },
});

let activeEffect;

function effect(fn) {
  activeEffect = fn;
  fn();
}

effect(() => {
  document.body.innerText = obj.text;
  console.log('run'); // 被执行了两次
});

setTimeout(() => {
  obj.node = 'node not exist';
}, 2000);
