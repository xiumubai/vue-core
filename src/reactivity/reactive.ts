import { track, trigger } from '../reactivity/effect';
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const val = Reflect.get(target, key);
      // 依赖收集
      track(target, key);
      return val;
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value);
      // 触发依赖
      trigger(target, key);
      return res;
    },
  });
}
