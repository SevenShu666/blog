# js 手写

## 一、节流防抖

```js
// 防抖
function debounce(fn, delay, immediate) {
  let timer = null;

  return function () {
    const context = this;
    const args = arguments;
    const nowTimer = !timer;
    if (timer) clearTimeout(timer);

    if (immediate) {
      if (nowTimer) fn.apply(context, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}

// 节流-时间戳
function throttle1(fn, delay) {
  let startTime = Date.now();

  return function () {
    const context = this;
    const args = arguments;

    const endTime = Date.now();
    if (endTime - startTime > delay) {
      fn.apply(context, args);
      startTime = Date.now();
    }
  };
}

// 节流-定时器
function throttle2(fn, delay) {
  let timer = null;

  return function () {
    const context = this;
    const args = arguments;

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}
```

## 二、函数柯里化

函数柯里化是指将一个多个参数的函数转化成一系列使用一个参数的函数的技术

```js
function curry(fn, args) {
  const length = fn.length;
  args = args || [];

  return function () {
    const subArgs = args.slice(0);

    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i]);
    }

    if (subArgs.length >= length) {
      return fn.apply(this, subArgs);
    } else {
      return curry.call(this, fn, subArgs);
    }
  };
}

// bind实现
function curry2(fn, ...args) {
  return fn.length <= args.length
    ? fn(...args)
    : curry2.bind(null, fn, ...args);
}
```

## 三、解析 URL

```js
let url =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";

function parseParams(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1];
  const paramsArray = paramsStr.split("&");
  const paramsObj = {};

  paramsArray.forEach((param) => {
    if (/=/.test(param)) {
      let [key, value] = param.split("=");
      value = decodeURIComponent(value); // 解码
      value = /^\d+$/.test(value) ? parseInt(value) : value; // 如果是数字就转换

      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], value);
      } else {
        paramsObj[key] = value;
      }
    } else {
      paramsObj[param] = true;
    }
  });

  return paramsObj;
}

console.log(parseParams(url));
```

## 四、每秒打印 1、2、3、4

```js
// 自执行函数
for (var i = 1; i <= 4; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}

// let

for (let i = 1; i <= 4; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

## 五、日期格式化

```js
function dateFormat(date, format) {
  if (/^\d{13}$/.test(date)) {
    date = new Date(date);
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  format = format.replace("yyyy", year).replace("mm", month).replace("dd", day);
  return format;
}

console.log(dateFormat(new Date("2020-12-01"), "yyyy/mm/dd"));
```

## 六、深浅拷贝方法

```js
/**
 * 浅拷贝的方法
 * 对象
 * 1.Object.assign()
 * 2.扩展运算符 ...
 * 数组
 * 1.slice方法
 * 2.concat方法
 */
function isObject(obj) {
  return (
    Object.prototype.toString.call(obj) === "[object Object]" ||
    Object.prototype.toString.call(obj) === "[object Array]"
  );
}

function shallowCopy(obj) {
  if (!isObject(obj)) return obj;
  const res = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key];
    }
  }

  return res;
}

/**
 * 深拷贝的方法
 * 1.JSON.stringify() JSON.parse()
 * 2.lodash插件cloneDeep()
 */
// map防止循环引用
function cloneDeep(obj, map = new WeakMap()) {
  if (!isObject(obj)) return obj;
  const res = Array.isArray(obj) ? [] : {};

  if (map.has(obj)) {
    return map.get(obj);
  }
  map.set(obj, res);

  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      res[key] = cloneDeep(obj[key], map);
    } else {
      res[key] = obj[key];
    }
  });

  return res;
}

let obj = {
  name: "nami",
  list: [1, 2, 3, 4, 5],
  data: {
    a: 1,
    b: {
      c: 5,
    },
  },
  reg: /\d/g,
  sayName: () => {
    console.log("name");
  },
};

obj.obj = obj;

let obj2 = cloneDeep(obj);
obj2.list = [1, 2, 3];

console.log(obj);
console.log(obj2);
```

## 七、非负大整数相加

```js
function sumBigNumber(a, b) {
  let res = "";
  let temp = 0;

  a = a.split("");
  b = b.split("");

  while (a.length || b.length || temp) {
    temp += ~~a.pop() + ~~b.pop();
    res = (temp % 10) + res;
    temp = temp > 9;
  }

  return res.replace(/^0+/, "");
}

console.log(sumBigNumber("19007199254740992", "9007199254740993"));
```

## 八、类数组转换成数组

```js
let arrayLike = new Set([1, 2, 3, 4]);

// 调用数组的slice方法
arrayLike = Array.prototype.slice.call(arrayLike, 0);

// 调用数组的splice方法
arrayLike = Array.prototype.splice.call(arrayLike, 0);

// 调用数组的concat方法
arrayLike = Array.prototype.concat.apply([], arrayLike);

// 调用Array.from方法
arrayLike = Array.from(arrayLike);
```

## 九、数组的乱序输出

```js
const arr = [1, 2, 3, 4, 5];

// 正序
for (let i = 0; i < arr.length; i++) {
  const randomIndex = Math.round(Math.random() * (arr.length - i - 1)) + i;
  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
}
console.log(arr);

// 倒序
let length = arr.length,
  random,
  temp;

while (length) {
  random = Math.floor(Math.random() * length--);
  temp = arr[length];
  arr[length] = arr[random];
  arr[random] = temp;
}

console.log(arr);
```

## 十、数组的 filter 方法

```js
const arr = [1, 2, 3, 4, 5, 6];

Array.prototype.myFilter = function (fn) {
  if (typeof fn !== "function") {
    throw new TypeError(fn + " not a function");
  }

  const len = this.length;
  const result = [];

  for (let i = 0; i < len; i++) {
    fn(this[i]) && result.push(this[i]);
  }

  return result;
};

console.log(
  arr.myFilter((a) => {
    return a >= 3;
  })
);
```

## 十一、数组的 map 方法

```js
const arr = [1, 2, 3, 4, 5, 6];

Array.prototype.myMap = function (fn, thisValue) {
  if (typeof fn !== "function") {
    throw new TypeError(fn + " not a function");
  }
  const result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(fn.call(thisValue, this[i], i, this));
  }

  return result;
};

console.log(
  arr.myMap((item) => {
    return item + 1;
  })
);
```

## 十二、数组的 push 方法

```js
const arr = [1, 2];

Array.prototype.myPush = function () {
  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
  }

  return this.length;
};

console.log(arr.myPush(1));
```

## 十三、字符串的 repeat 方法

```js
const s = "123";

// join方法
function repeat1(s, n) {
  return new Array(n + 1).join(s);
}

// 递归
function repeat2(s, n) {
  return n > 1 ? repeat2(s, n - 1) + s : s;
}

console.log(repeat2(s, 2));
```

## 十四、字符串的翻转

```js
let str = "123";

function strReverse1(str) {
  return str.split("").reverse().join("");
}

function strReverse2(str, copy, i) {
  if (i === str.length) return copy;

  copy = str[i] + copy;
  return strReverse(str, copy, i + 1);
}


console.log(strReverse1(str));
console.log(strReverse2("12345", "", 0));
```

## 十五、add(1)(2)(3)方法

```js
function curry(fn) {
  let args = [];

  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      return temp;
    } else {
      const val = fn.apply(this, args);
      args = [];
      return val;
    }
  };
}

function add(...args) {
  return args.reduce((a, b) => a + b);
}

const addFn = curry(add);

console.log(addFn(3)(2)(3)());
```

## 十六、实现 ajax 请求

```js
const SERVER_URL = "./server";

let xhr = new XMLHttpRequest();
// 新建一个 http 请求
xhr.open("GET", SERVER_URL, true);
// 设置状态的监听函数
xhr.onreadystatechange = function () {
  if (this.readyState !== 4) return;
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置错误监听函数
xhr.onerror = function () {
  console.error(this.statusText);
};
// 设置响应的数据类型
xhr.responseType = "json";
// 设置请求头信息
xhr.setRequestHeader("Accept", "application/json");
// 发送 http 请求
xhr.send(null);
```

## 十七、flat 方法

```js
function _flat(arr, depth) {
  if (!Array.isArray(arr) || depth <= 0) {
    return arr;
  }

  return arr.reduce((pre, next) => {
    if (Array.isArray(next)) {
      return pre.concat(_flat(next, depth - 1));
    } else {
      return pre.concat(next);
    }
  }, []);
}

const arr = [1, [2, 3], 4, [5, [6, 7]]];

console.log(_flat(arr, Infinity));
```

## 十八、ES5 和 ES6 求函数参数的和

```js
// ES5
function sum1() {
  let sum = 0;

  Array.prototype.forEach.call(arguments, function (item) {
    sum += item * 1;
  });
  return sum;
}

// ES6
function sum2(...args) {
  let sum = 0;
  Array.from(args).forEach((item) => {
    sum += item * 1;
  });
  return sum;
}
console.log(sum2(1, 2, 3, 4, 5));
```

## 十九、使用 Promise 封装 ajax 请求

```js
function getJSON(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    // 新建一个 http 请求
    xhr.open("GET", url, true);
    // 设置状态的监听函数
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return;
      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    // 设置错误监听函数
    xhr.onerror = function () {
      reject(new Error(this.statusText));
    };
    // 设置响应的数据类型
    xhr.responseType = "json";
    // 设置请求头信息
    xhr.setRequestHeader("Accept", "application/json");
    // 发送 http 请求
    xhr.send(null);
  });
}
```

## 二十、事件总线

```js
class EventEmitter {
  constructor() {
    this.cache = {};
  }
  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }
  off(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn || f.callback === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }
  emit(name, ...args) {
    if (this.cache[name]) {
      // 创建副本，如果函数内继续注册相同事件，会造成死循环
      const tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn(...args);
      }
    }
  }
  once(name, fn) {
    const one = (...args) => {
      fn(...args);
      this.off(name, one);
    };
    // 手动移除fn时，防止找不到
    one.callback = fn;
    this.on(name, one);
  }
}

const eventBus = new EventEmitter();
const fn1 = function (name, age) {
  console.log(`${name}${age}`);
};

const fn2 = function (name, age) {
  console.log(`hello,${name}${age}`);
};

eventBus.on("aaa", fn1);
eventBus.on("aaa", fn2);
// eventBus.off("aaa", fn2);
eventBus.emit("aaa", "anna", 20);
```

## 二十一、数字每千分位用逗号隔开

```js
function format(n) {
  let num = n.toString();
  let point = num.indexOf(".");
  let integer = num;
  let decimals = "";

  if (point >= 0) {
    integer = num.slice(0, point);
    decimals = num.slice(point);
  }

  let len = integer.length;
  if (len < 3) {
    return integer + decimals;
  } else {
    let remainder = len % 3;
    if (remainder > 0) {
      return (
        integer.slice(0, remainder) +
        "," +
        integer.slice(remainder).match(/\d{3}/g).join(",") +
        decimals
      );
    } else {
      return integer.match(/\d{3}/g).join(",") + decimals;
    }
  }
}

console.log(format(111222333));
```

## 二十二、数组扁平化方法

```js
const arr = [1, [2, 3], 4, [5, [6, 7]]];

// 递归实现
function flatten1(arr, result = []) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flatten(arr[i], result);
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

// toString方法实现
function flatten2(arr) {
  return arr
    .toString()
    .split(",")
    .map((item) => {
      return Number(item);
    });
}

// reduce方法迭代
function flatten3(arr) {
  return arr.reduce((pre, next) => {
    return pre.concat(Array.isArray(next) ? flatten3(next) : next);
  }, []);
}

// 扩展运算符
function flatten4(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }

  return arr;
}

// ES6的flat方法
function flatten5(arr) {
  return arr.flat(Infinity);
}

console.log(flatten5(arr));
```

## 二十三、数组求和方法

```js
const arr = [1, [2, 3], [4, 5, [6]]];

const sum = arr
  .toString()
  .split(",")
  .reduce((total, i) => (total += Number(i)), 0);

function add(arr) {
  if (arr.length === 1) return arr[0];
  return arr[0] + add(arr.slice(1));
}

console.log(add([1, 2, 3, 4, 5]));
```

## 二十四、数组去重的方法

```js
const arr = [1, 2, 3, 3, 3, 2, 2, 1, 4, 5, 4, 6];

// Set方法
function uniqueArray1(arr) {
  return Array.from(new Set(arr));
}

// map存储
function uniqueArray2(arr) {
  const map = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (!map.hasOwnProperty(arr[i])) {
      map[arr[i]] = i;
      result.push(arr[i]);
    }
  }

  return result;
}

function uniqueArray3(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

console.log(uniqueArray3(arr));
```

## 二十五、字符串模板

~~~js
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/;

  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    return render(template, data);
  }

  return template;
}

let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let person = {
  name: "布兰",
  age: 12,
  sex: "body",
};

console.log(render(template, person));
~~~

## 二十六、循环打印红黄绿灯

```js
function red() {
  console.log("red");
}
function yellow() {
  console.log("yellow");
}
function green() {
  console.log("green");
}
// 用callback实现
const task1 = function (timer, light, callback) {
  setTimeout(() => {
    if (light === "red") {
      red();
    } else if (light === "yellow") {
      yellow();
    } else if (light === "green") {
      green();
    }
    callback();
  }, timer);
};

const step1 = function () {
  task1(3000, "red", () =>
    task1(2000, "yellow", () => task1(1000, "green", step1))
  );
};

// 使用Promise实现
const task2 = function (timer, light) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === "red") {
        red();
      } else if (light === "yellow") {
        yellow();
      } else if (light === "green") {
        green();
      }
      resolve();
    }, timer);
  });
};

const step2 = function () {
  task2(3000, "red")
    .then(() => task2(2000, "yellow"))
    .then(() => task2(1000, "green"))
    .then(step2);
};

// 使用async/await实现
const task3 = function (timer, light) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === "red") {
        red();
      } else if (light === "yellow") {
        yellow();
      } else if (light === "green") {
        green();
      }
      resolve();
    }, timer);
  });
};

const step3 = async () => {
  await task3(3000, "red");
  await task3(2000, "yellow");
  await task3(1000, "green");
  step3();
};
```

## 二十七、a、b 值的交换不用临时变量

```js
function exchange(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;

  return [a, b];
}
```

## 二十八、call、apply、bind 方法

```js
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + " not a function");
  }

  context = context || window;
  const fn = Symbol();

  context[fn] = this;
  const result = context[fn](...args);

  delete context[fn];
  return result;
};

Function.prototype.myApply = function (context, args = []) {
  if (typeof this !== "function") {
    throw new TypeError(this + " not a function");
  }

  context = context || window;
  const fn = Symbol();

  context[fn] = this;
  const result = context[fn](...args);

  delete context[fn];
  return result;
};

// bind之后无法改变this的指向，当执行绑定函数时，this指向与形参在bind方法执行时已经确定了
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + " not a function");
  }

  context = context || window;
  const fn = this;

  return function (...otherArgs) {
    return fn.myApply(context, args.concat(otherArgs));
  };
};
```

## 二十九、instanceof 方法

```js
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;

  while (true) {
    if (!proto) {
      return false;
    }
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}
```

## 三十、js 对象转换成树形结构

```js
// 转换前：
let source = [
  {
    id: 1,
    pid: 0,
    name: "body",
  },
  {
    id: 2,
    pid: 1,
    name: "title",
  },
  {
    id: 3,
    pid: 2,
    name: "div",
  },
];
// 转换为:
let tree = [
  {
    id: 1,
    pid: 0,
    name: "body",
    children: [
      {
        id: 2,
        pid: 1,
        name: "title",
        children: [
          {
            id: 3,
            pid: 1,
            name: "div",
          },
        ],
      },
    ],
  },
];

function jsonToTree(arr) {
  const result = [];
  if (!Array.isArray(arr)) {
    return result;
  }

  const map = {};
  arr.forEach((item) => {
    map[item.id] = item;
  });

  arr.forEach((item) => {
    let parent = map[item.pid];

    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}

let a = jsonToTree(source);

console.log(a[0].children);
```

## 三十一、JSONP

```js
const jsonp = function (url, params, callback) {
  let dataString = url + "?";
  for (const key in params) {
    dataString += `${ket}=${params[key]}&`;
  }

  let callbackName = "my_json_cb" + Math.random().toString().repalce(/\./, "");
  dataString += "callback=" + callbackName;

  let scriptEle = document.createElement("script");
  scriptEle.src = dataString;

  window[callbackName] = function (data) {
    callback(data);
    document.body.removeChild(scriptEle);
  };
  document.body.appendChild(scriptEle);
};
```

## 三十二、new 操作符

```js
function newOperate(ctor) {
  if (typeof ctor !== "function") {
    throw new TypeError(ctor + " not a function");
  }

  newOperate.target = ctor;

  const obj = Object.create(ctor.prototype);
  const args = [].slice.call(arguments, 1);

  const res = ctor.apply(obj, args);

  if (
    typeof res === "function" ||
    (typeof res === "object" && res !== null)
  ) {
    return res;
  }

  return obj;
}

function Person(name) {
  this.name = name;
}

const child = newOperate(Person, "nami");
console.log(child.name);
```

## 三十三、Object.create 方法

```js
function create(obj) {
  function F() {}
  F.prototype = obj;

  return new F();
}
```

## 三十四、Promise

```js
const PENDING = "PENDING";
const FULFILLED = "FULLFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(handle) {
    if (typeof handle !== "function") {
      throw new TypeError(handle + " not a function");
    }

    this._state = PENDING;
    this._value = undefined;
    this._fulfilledQueues = [];
    this._rejectedQueues = [];

    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }
  _resolve(value) {
    if (this._state !== PENDING) return;
    const run = () => {
      const runFulfilled = (val) => {
        this._state = FULFILLED;
        this._value = val;
        let cb;

        while ((cb = this._fulfilledQueues.shift())) {
          cb(val);
        }
      };
      const runRejected = (err) => {
        this._state = REJECTED;
        this._value = err;
        let cb;

        while ((cb = this._rejectedQueues.shift())) {
          cb(err);
        }
      };

      if (value instanceof MyPromise) {
        value.then((res) => {
          runFulfilled(res);
          (err) => {
            runRejected(err);
          };
        });
      } else {
        runFulfilled(value);
      }
    };
    setTimeout(run, 0);
  }
  _reject(error) {
    if (this._state !== PENDING) return;
    const run = () => {
      this._state = REJECTED;
      this._value = error;
      let cb;
      while ((cb = this._rejectedQueues.shift())) {
        cb(error);
      }
    };
    setTimeout(run, 0);
  }
  then(onFulfilled, onRejected) {
    const { _state, _value } = this;
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      const fulfilled = (val) => {
        try {
          if (typeof onFulfilled !== "function") {
            onFulfilledNext(val);
          } else {
            let res = onFulfilled(val);
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(res);
            }
          }
        } catch (error) {
          onRejectedNext(error);
        }
      };
      const rejected = (err) => {
        try {
          if (typeof onRejected !== "function") {
            onRejectedNext(err);
          } else {
            let res = onRejected(err);
            if (res instanceof MyPromise) {
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              onFulfilledNext(res);
            }
          }
        } catch (error) {
          onRejectedNext(error);
        }
      };

      switch (_state) {
        case PENDING:
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }
  static reject(error) {
    return new MyPromise((undefined, reject) => {
      reject(error);
    });
  }
  static all(list) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      const valus = [];
      list.forEach((p, i) => {
        this.resolve(p).then(
          (res) => {
            valus[i] = res;
            count++;

            if (count === list.length) resolve(valus);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
  static race(list) {
    return new MyPromise((resolve, reject) => {
      list.forEach((p) => {
        this.resolve(p).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
  finally(cb) {
    return this.then(
      (res) => MyPromise.resolve(cb()).then(() => res),
      (reason) => {
        MyPromise.resolve(cb()).then(() => {
          throw reason;
        });
      }
    );
  }
}

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("777");
  }, 1000);
});

let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("888");
  }, 1500);
});

let p3 = MyPromise.race([p1, p2]);
p3.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
).finally(() => {
  console.log("finally");
});
```

## 三十五、Promsie.allSettled

```js
Promise.allSettled = function (promiseArray) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;

    promiseArray.forEach((p, i) => {
      this.resolve(p).then(
        (val) => {
          count++;
          result[i] = {
            status: "fulfilled",
            value: val,
          };

          if (count === promiseArray.length) resolve(result);
        },
        (err) => {
          count++;
          result[i] = {
            status: "rejected",
            value: err,
          };

          if (count === promiseArray.length) reject(result);
        }
      );
    });
  });
};

const p1 = Promise.resolve("p1");
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 延时一秒");
  }, 1000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3 延时两秒");
  }, 2000);
});

const p4 = Promise.reject("p4 rejected");

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p5 rejected 延时1.5秒");
  }, 1500);
});

Promise.allSettled([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

Promise.allSettled([p1, p2, p4])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

Promise.allSettled([p4, p5])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

## 三十六、Promise.any

```js
Promise.any = function (promiseArray) {
  return new Promise((resolve, reject) => {
    promiseArray = Array.isArray(promiseArray) ? promiseArray : [];
    const len = promiseArray.length;
    if (len === 0) reject(new AggregateError("All promise were rejected"));
    const errors = [];
    let count = 0;
    promiseArray.forEach((p, i) => {
      this.resolve(p).then(
        (val) => {
          resolve(val);
        },
        (err) => {
          count++;
          errors[i] = err;
          if (count === len)
            reject(errors, new AggregateError("All promise were rejected"));
        }
      );
    });
  });
};
```

## 三十七、setTimeout 模拟 setInterval

```js
function mySetInterval(fn, delay) {
  const timer = {
    flag: true,
  };

  function interval() {
    if (timer.flag) {
      fn();
      setTimeout(interval, delay);
    }
  }

  setTimeout(interval, delay);

  return timer;
}

mySetInterval(() => console.log("1111"), 1000);
```

## 三十八、splice 方法

```js
/**
 * 1.将删除的元素拷贝出来，用以返回
 * 2.移动删除元素的后面的元素，分三种情况，
 * 一：添加元素个数等于删除元素个数，不做移动
 * 二：添加元素个数小于删除元素个数，那后面的元素要向前移动差值
 * 三：添加元素个数大于删除元素个数，那后面的元素要向后移动差值
 * 3.插入新的元素
 * 4.更改数组的length
 * 5。返回删除的元素组成的数组
 */

const sliceDeleteElements = (array, startIndex, deleteCount, deleteArr) => {
  for (let i = 0; i < deleteCount; i++) {
    let index = startIndex + i;
    if (index in array) {
      let current = array[index];
      deleteArr[i] = current;
    }
  }
};

const movePostElements = (array, startIndex, len, deleteCount, addElements) => {
  // 如果添加的元素和删除的元素个数相等，相当于元素的替换，数组长度不变，被删除元素后面的元素不需要挪动
  if (deleteCount === addElements.length) return;
  // 如果添加的元素和删除的元素个数不相等，则移动后面的元素
  else if (deleteCount > addElements.length) {
    // 删除的元素比新增的元素多，那么后面的元素整体向前挪动
    // 一共需要挪动 len - startIndex - deleteCount 个元素
    for (let i = startIndex + deleteCount; i < len; i++) {
      let fromIndex = i;
      // 将要挪动到的目标位置
      let toIndex = i - (deleteCount - addElements.length);
      if (fromIndex in array) {
        array[toIndex] = array[fromIndex];
      } else {
        delete array[toIndex];
      }
    }
    // 注意注意！这里我们把后面的元素向前挪，相当于数组长度减小了，需要删除冗余元素
    // 目前长度为 len + addElements - deleteCount
    for (let i = len - 1; i >= len + addElements.length - deleteCount; i--) {
      delete array[i];
    }
  } else if (deleteCount < addElements.length) {
    // 删除的元素比新增的元素少，那么后面的元素整体向后挪动
    // 思考一下: 这里为什么要从后往前遍历？从前往后会产生什么问题？
    for (let i = len - 1; i >= startIndex + deleteCount; i--) {
      let fromIndex = i;
      // 将要挪动到的目标位置
      let toIndex = i + (addElements.length - deleteCount);
      if (fromIndex in array) {
        array[toIndex] = array[fromIndex];
      } else {
        delete array[toIndex];
      }
    }
  }
};

const computeStartIndex = (startIndex, len) => {
  // 处理索引负数的情况
  if (startIndex < 0) {
    return startIndex + len > 0 ? startIndex + len : 0;
  }
  return startIndex >= len ? len : startIndex;
};

const computeDeleteCount = (startIndex, len, deleteCount, argumentsLen) => {
  // 删除数目没有传，默认删除startIndex及后面所有的
  if (argumentsLen === 1) return len - startIndex;
  // 删除数目过小
  if (deleteCount < 0) return 0;
  // 删除数目过大
  if (deleteCount > len - deleteCount) return len - startIndex;
  return deleteCount;
};

Array.prototype.splice = function (startIndex, deleteCount, ...addElements) {
  let argumentsLen = arguments.length;
  let array = Object(this);
  let len = array.length;
  let deleteArr = new Array(deleteCount);

  startIndex = computeStartIndex(startIndex, len);
  deleteCount = computeDeleteCount(startIndex, len, deleteCount, argumentsLen);

  // 判断 sealed 对象和 frozen 对象, 即 密封对象 和 冻结对象
  if (Object.isSealed(array) && deleteCount !== addElements.length) {
    throw new TypeError("the object is a sealed object!");
  } else if (
    Object.isFrozen(array) &&
    (deleteCount > 0 || addElements.length > 0)
  ) {
    throw new TypeError("the object is a frozen object!");
  }

  // 拷贝删除的元素
  sliceDeleteElements(array, startIndex, deleteCount, deleteArr);
  // 移动删除元素后面的元素
  movePostElements(array, startIndex, len, deleteCount, addElements);

  // 插入新元素
  for (let i = 0; i < addElements.length; i++) {
    array[startIndex + i] = addElements[i];
  }

  array.length = len - deleteCount + addElements.length;

  return deleteArr;
};
```

## 三十九、typeof 方法

```js
function myTypeof(value) {
  const valueClass = Object.prototype.toString.call(value);
  const type = valueClass.split(" ")[1].split("");
  type.pop();

  return type.join("").toLowerCase();
}

console.log(myTypeof(123));
```

## 四十、Object.assign()方法

```js
Object.prototype.myAssign = function (target, ...source) {
  if (typeof target === "undefined" || target === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  source.forEach((obj) => {
    if (obj !== null && typeof obj !== "undefined") {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          target[key] = obj[key];
        }
      }
    }
  });

  return target;
};

let obj1 = Object.myAssign({ a: 1 }, { b: 2 }, { c: 3 });
console.log(obj1);
```

## 四十一、Object.create 方法

```js
Object.prototype.myCreate = function (proto, propertyObject = undefined) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only an Object or null:" + proto);
  }

  if (propertyObject === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  function Fn() {}
  Fn.prototype = proto;
  const obj = new Fn();

  if (propertyObject !== undefined) {
    Object.defineProperties(obj, propertyObject);
  }

  if (proto === null) {
    obj.__proto__ = null;
  }

  return obj;
};

const obj = Object.myCreate({});
console.log(obj);
```

## 四十二、reduce

```js
Array.prototype.myReduce = function (cb, initialValue) {
  const arr = this;
  let total = initialValue || arr[0];

  for (let i = initialValue ? 0 : 1; i < arr.length; i++) {
    total = cb(total, arr[i], i, arr);
  }

  return total;
};

let arr = [1, 2, 3];

console.log(arr.myReduce((a, b) => a + b));
```

## 四十三、trim 方法

```js
function trim(str) {
  return str.replace(/(^\s*)|(\s$)/g, "");
}
```

## 四十四、位运算符

### 1.& 按位与

&是二元运算符，它以特定的方式的方式组合操作数中对应的位，如果对应的位都为1，那么结果就是1， 如果任意一个位是0 则结果就是0。

1 & 3的结果为1

那我们来看看他是怎么运行的

1的二进制表示为 0 0 0 0 0 0 1

3的二进制表示为 0 0 0 0 0 1 1

根据 & 的规则 得到的结果为 0 0 0 0 0 0 0 1,十进制表示就是1

### 2.| 按位或

|运算符跟&的区别在于如果对应的位中任一个操作数为1 那么结果就是1。

1的二进制表示为 0 0 0 0 0 0 1

3的二进制表示为 0 0 0 0 0 1 1

所以 1 | 3的结果为3

### 3.^ 按位异或

^运算符跟|类似，但有一点不同的是 如果两个操作位都为1的话，结果产生0。

1的二进制表示为 0 0 0 0 0 0 1

3的二进制表示为 0 0 0 0 0 1 1

所以 1 ^ 3的结果为2

### 4.~ 按位非

~运算符是对位求反，1变0,0变1，也就是求二进制的反码

1的二进制表示为 0 0 0 0 0 0 1

所以 ~1 的结果是-2

### 5.>> 右移

\>>运算符使指定值的二进制所有位都右移规定的次数，对于其移动规则只需记住符号位不变，左边补上符号位即按二进制形式把所有的数字向右移动对应的位数，低位移出(舍弃)，高位的空位补符号位，即正数补零，负数补1。

1的二进制表示为 0 0 0 0 0 0 1

所以 1>>1的结果为0

### 6.<< 左移

<<运算符使指定值的二进制所有位都左移规定的次数，对于其移动规则只需记住丢弃最高位，0补最低位即按二进制形式把所有的数字向左移动对应的位数，高位移出(舍弃)，低位的空位补零。

1的二进制表示为 0 0 0 0 0 0 1

所以 1<<1的结果为2 

### 7.>>> 无符号右移

\>>>运算符忽略了符号位扩展，0补最高位，但是只是对32位和64位的值有意义。

### 8.位运算符在js中的妙用：

#### 1、使用&运算符判断一个数的奇偶

偶数 & 1 = 0

奇数 & 1 = 1

那么0&1=0,1&1=1

#### 2、使用~~，>>,<<,>>>,|来取整

~~3.14 = 3

3.14 >> 0 = 3

3.14 << 0 = 3 

3.14 | 0 = 3

3.14 >>> 0 = 3(>>>不可对负数取整)

注意：~~-3.14 = -3 其它的一样

#### 3、使用<<,>>来计算乘除

乘法：

1*2 = 2

1<<1 = 1(2/2的一次方)

#### 4、利用^来完成比较两个数是否相等

1 ^ 1 = 0

1 ^ 非1数 ！=0

所以同一个数……同一个数等于0，否则不等于0

#### 5、使用^来完成值交换

a = 1

b = 2

a ^= b

b ^= a

a ^= b

结果a=2，b=1

<Valine></Valine>
