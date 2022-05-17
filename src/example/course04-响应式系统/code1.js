let bucket = new Set();

const data = { text: 'hello world', age: 1 };

const obj = new Proxy(data, {
  get(target, key) {
    console.log(target, key);
    bucket.add(effect);
    return target[key];
  },
  set(target, key, newVal) {
    console.log(target, key, newVal);
    target[key] = newVal;
    bucket.forEach((fn) => fn());
    return true;
  },
});

function effect() {
  document.body.innerText = obj.text;
}

effect();

setTimeout(() => {
  obj.text = 'hello vue3';
}, 2000);
