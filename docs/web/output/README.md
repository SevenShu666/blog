# 代码输出

## 一、异步&事件循环

### 1.代码输出

~~~js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);
~~~

输出：

~~~
1
2
4
~~~

`promise.then`是微任务，在当前宏任务执行完毕后清空微任务，需要promie内部状态发生变化，内部状态没有发生变化处于pending状态，所以不输出3

### 2.代码输出

~~~js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("start");
    resolve("success");
    console.log("end");
  }, 0);
  console.log(2);
});

promise.then((res) => {
  console.log(res);
});

console.log(3);
~~~

输出：

~~~
1
2
3
start
end
success
~~~

1. 执行代码，遇到`promise`构造函数，先执行内部代码，打印1
2. 遇到`setTimeout`宏任务，放入宏任务队列
3. 向下执行，打印2
4. 遇到`promise.then`微任务，等待`setTimeout`执行后状态变化后执行
5. 此时微任务队列没有需要执行的任务，那么执行下一个宏任务`setTimeout`
6. 首先打印`start`，遇到`resolve`将`promise`状态变更为`FULFILLED`，之后打印`end`
7. 最后执行微任务`promise.then`，打印`success`

### 3.代码输出

~~~js
Promise.resolve().then(() => {
  console.log(1);

  const timer1 = setTimeout(() => {
    console.log(2);
  }, 0);
});

const timer2 = setTimeout(() => {
  console.log(3);
  Promise.resolve().then(() => {
    console.log(4);
  });
});

console.log(5);
~~~

输出：

~~~
5
1
3
4
2
~~~

1. 首先遇到`Promise.resolve().then`，放入任务队列
2. 继续执行，遇到`timer2`宏任务，放入宏任务队列
3. 打印`5`
4. 当前代码执行完毕，查看微任务队列，执行`Promise.resolve().then`
5. 打印`1`，遇到`timer1`宏任务，放入宏任务队列，微任务队列清空了，执行下一个宏任务`timer2`
6. 打印`3`，遇到`Promise.resolve().then`微任务，放入微任务队列，当前宏任务执行完毕，查看微任务队列，执行`Promise.resolve().then`
7. 打印`4`，微任务队列清空了，执行下一个宏任务`timer1`
8. 打印`2`

### 4.代码输出

~~~js
const promise = new Promise((resolve, reject) => {
  resolve("resolve1");
  resolve("reject");
  resolve("resolve2");
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
~~~

输出：

~~~
resolve1
~~~

当`promise`状态发生变化时，就会变成`Fulfilled`，后面两个就不会执行，同时下面的`catch`不会捕获到错误

### 5.代码输出

~~~js
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
~~~

输出：

~~~js
1
~~~

如果`Promise.resolve`方法的参数不是`Promise`，则`Promise.resolve`方法返回一个新的`Promise`，状态是`FULFILLED`，参数也会给到`resolve`函数。`then`方法接收的参数是函数，如果传递的是一个非函数，则会将上一个`Promise`的结果传递到下一个

### 6.代码输出

~~~js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});
const promise2 = promise1.then(() => {
  throw new Error("error");
});

console.log("promise1", promise1);
console.log("promise2", promise2);

setTimeout(() => {
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);
~~~

输出：

~~~js
promise1 Promise {<pending>}
promise2 Promise {<pending>}
Uncaught (in promise) Error: error
Promise {<fulfilled>: 'success'}
Promise {<rejected>: Error: error}
~~~

### 7.代码输出

~~~js
Promise.resolve(1)
  .then((res) => {
    console.log(res);
    return 2;
  })
  .catch((err) => {
    return 3;
  })
  .then((res) => {
    console.log(res);
  });
~~~

输出：

~~~
1
2
~~~

`Promise.resolve(1)`进入第一个`then`，不会走`catch`，一个打印传入的1；`return 2`会被包装成`resolve(2)`，被第二个`then`接收打印

### 8.代码输出

~~~js
Promise.resolve().then(() => {
  return new Error('error')
}).then(res => {
  console.log("res", res)
}).catch(err => {
  console.log("err", err)
})
~~~

输出：

~~~
then:  Error: error
~~~

返回的`error`会被包装成`Promise.resolve(new Error('error'))`，会被下一个`then`捕获

### 9.代码输出

~~~js
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)
~~~

输出：

~~~js
[TypeError: Chaining cycle detected for promise #<Promise>]
~~~

`then`或 `catch`返回的值不能是 promise 本身，否则会造成死循环。

### 10.代码输出

~~~js
Promise.reject("err")
  .then(
    (res) => {
      console.log("success", res);
    },
    (err) => {
      console.log("error", err);
    }
  )
  .catch((err) => {
    console.log("catch", err);
  });
~~~

输出：

~~~js
error err
~~~

`reject`被`(err) => { console.log("error", err) }`捕获错误，不会走到`catch`

### 11.代码输出

~~~js
Promise.resolve("1")
  .then((res) => {
    console.log(res);
  })
  .finally(() => {
    console.log("finally");
  });
Promise.resolve("2")
  .finally(() => {
    console.log("finally2");
    return "finally2的返回";
  })
  .then((res) => {
    console.log("finally2后面的then", res);
  });
~~~

输出：

~~~js
1
finally2
finally
finally2后面的then 2
~~~

1. 第一个微任务队列：`Promise.resolve("1").then`和`Promise.resolve("2")`
2. 第二个微任务队列：1的`finally`和2的`then`

### 12.代码输出

~~~js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}

Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then((res) =>
  console.log(res)
);
~~~

输出：

~~~
1
2
3
[ 1, 2, 3 ]
~~~

### 13.代码输出

~~~js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
~~~

输出：

~~~js
// 1s后输出
1
3
// 2s后输出
2
Error: 2 // Promise.all().catch()的输出，all结束
// 4s后输出
4
~~~

### 14.代码输出

~~~js
function runAsync(x) {
  const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then((res) => console.log("result: ", res))
  .catch((err) => console.log(err));
~~~

输出：

~~~js
1
result:  1
2
3
~~~

