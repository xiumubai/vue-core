## 虚拟 DOM

用一个对象来描述 UI，虚拟 DOM 描述真实的 DOM

```js
const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello vue'),
  },
  children: 'click me',
};
```

## 渲染器

```js
const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello vue'),
  },
  children: 'click me',
};

function renderer(vnode, container) {
  const el = document.createElement(vnode.tag);
  for (const key in vnode.props) {
    // 处理事件
    if (/^on/.test(key)) {
      el.addEventListener(key.substr(2).toLocaleLowerCase(), vnode.props[key]);
    }
  }
  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((child) => renderer(child, el));
  }
  container.appendChild(el);
}

renderer(vnode, document.body);
```

## 组件的本质

组件就是一组 DOM 元素，定义一个函数来代表组件，而函数的返回值就是代表这个组件要渲染的内容，所以我们可以用一个函数来描述一个虚拟 DOM

```js
const MyComponent = function () {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('hello vue'),
    },
    children: 'click me',
  };
};

const vnode = {
  tag: MyComponent,
};

function renderer(vnode, container) {
  console.log(vnode);
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'function') {
    mountComponent(vnode, container);
  }
}

function mountElement(vnode, container) {
  const el = document.createElement(vnode.tag);
  for (const key in vnode.props) {
    // 处理事件
    if (/^on/.test(key)) {
      el.addEventListener(key.substr(2).toLocaleLowerCase(), vnode.props[key]);
    }
  }
  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((child) => renderer(child, el));
  }
  container.appendChild(el);
}

function mountComponent(vnode, container) {
  const subtree = vnode.tag();
  console.log(subtree);
  renderer(subtree, container);
}

renderer(vnode, document.body);
```

也可以用一个对象来表达一个组件

下面的代码做一些改造

```js
const MyComponent = {
  render() {
    return {
      tag: 'div',
      props: {
        onClick: () => alert('hello vue'),
      },
      children: 'click me',
    };
  },
};

function renderer(vnode, container) {
  console.log(vnode);
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'object') {
    mountComponent(vnode, container);
  }
}
function mountComponent(vnode, container) {
  const subtree = vnode.tag.render();
  console.log(subtree);
  renderer(subtree, container);
}
```

## 编译器

```vue
<template>
  <div @click="handle">click me</div>
</template>
<script>
export default {
  data() {},
  methods: {},
};
</script>
```

`<template>`标签里的内容就是模版的内容，编译器会把模版内容编译成渲染函数并且添加到`<script>`标签快的组件对象上，所以最终浏览器里面运行的代码就是：

```vue
<script>
export default {
  data() {},
  methods: {},
  render() {
    return {
      h('div', { omClick: handle }, 'clike me')
    }
  }
}
</script>
```

上面的就是一个基本的组件。无论是使用模版还是直接手写渲染函数，对于一个组件来讲，它所要渲染的内容最终都是通过渲染函数来产生的，然后渲染器再把渲染函数返回的虚拟 DOM 渲染为真实的 DOM，这就是模版的工作原理，也是 Vue.js 渲染页面的流程。

## 渲染器和编译器之间的合作

组件的实现依赖于渲染器，模版的编译依赖于编译器。并且编译后生成的代码是根据渲染器和虚拟的实际来决定的。

那么渲染器和编译器是如何配合工作，并实现性能提升的？

假设我们有下面的这个模版

```html
<div id="foo" :class="cls"></div>
```

```js
render () {
  // return h('div', { id: 'foo', class: 'cls'})
  return {
    tag: 'div',
    props: {
      id: "foo",
      class: "cls"
    }
  }
}
```

从上面的代码我们知道 id 是不会变换的，class 是会变化的。那么编译器能不能在编译的阶段把这些变化的信息提出出来，直接交给渲染器。

在 vue 当中，编译器可以识别出哪些是静态属性，哪些是动态的属性，在编译器生成代码的时候就会附带这些属性。

```js
render () {
  // return h('div', { id: 'foo', class: 'cls'})
  return {
    tag: 'div',
    props: {
      id: "foo",
      class: "cls"
    },
    pathFlags: 1 // 假设数字1代表class树动态的
  }
}
```

渲染器拿到这个代码的时候，就知道 class 这个属性是动态的，不用再重新去寻找变更的点。节省了时间。
