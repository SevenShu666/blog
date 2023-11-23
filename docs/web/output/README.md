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

### 15.代码输出

~~~js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
async1();
console.log('start')
~~~

输出：

~~~js
async1 start
async2
start
async1 end
~~~

### 16.代码输出

~~~js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2() {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")
~~~

输出：

~~~
async1 start
async2
start
async1 end
timer2
timer3
timer1
~~~

1. 首先进入async1，打印出async1 start；
2. 之后遇到async2，进入async2，遇到定时器timer2，加入宏任务队列，之后打印async2；
3. 由于async2阻塞了后面代码的执行，所以执行后面的定时器timer3，将其加入宏任务队列，之后打印start；
4. 然后执行async2后面的代码，打印出async1 end，遇到定时器timer1，将其加入宏任务队列；
5. 最后，宏任务队列有三个任务，先后顺序为timer2，timer3，timer1，没有微任务，所以直接所有的宏任务按照先进先出的原则执行。

### 17.代码输出

~~~js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
~~~

输出：

~~~
srcipt start
async1 start
promise1
srcipt end
~~~

### 18.代码输出

~~~js
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise1 resolve')
  }).then(res => console.log(res))
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
~~~

输出：

~~~js
script start
async1 start
promise1
script end
promise1 resolve
async1 success
async1 end
~~~

### 19.代码输出

~~~js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

async1();

new Promise(resolve => {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log('script end')
~~~

输出：

~~~
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
~~~

### 20.代码输出

~~~js
async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))
~~~

输出：

~~~
async2
Uncaught (in promise) error
~~~

async函数中抛出了错误，就会终止错误结果，需要继续执行后面的代码，要用catch来捕获

~~~js
async function async1 () {
  await Promise.reject('error!!!').catch(e => console.log(e))
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')
~~~

输出：

~~~
script start
error!!!
async1
async1 success
~~~

### 21.代码输出

~~~js
const first = () =>
  new Promise((resolve, reject) => {
    console.log(3);
    let p = new Promise((resolve, reject) => {
      console.log(7);
      setTimeout(() => {
        console.log(5);
        resolve(6);
        console.log(p);
      }, 0);
      resolve(1);
    });
    resolve(2);
    p.then((arg) => {
      console.log(arg);
    });
  });
first().then((arg) => {
  console.log(arg);
});
console.log(4);
~~~

输出：

~~~js
3
7
4
1
2
5
Promise { 1 }
~~~

### 22.代码输出

~~~js
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
} 
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)
~~~

输出：

~~~
script start
async1
promise1
script end
1
timer2
timer1
~~~

### 23.代码输出

~~~js
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)  // resolve1
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})
~~~

输出：

~~~
resovle1
finally undefined
timer1
Promise { undefined }
~~~

`then`作为上一个`Promise`没有返回值，所以`finally`和`console.log(p1)`输出`undefined`

### 24.代码输出

~~~js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
~~~

输出：

~~~
1
7
6
8
2
4
3
5
9
11
10
12
~~~

### 25.代码输出

~~~js
console.log(1)

setTimeout(() => {
  console.log(2)
})

new Promise(resolve =>  {
  console.log(3)
  resolve(4)
}).then(d => console.log(d))

setTimeout(() => {
  console.log(5)
  new Promise(resolve =>  {
    resolve(6)
  }).then(d => console.log(d))
})

setTimeout(() => {
  console.log(7)
})

console.log(8)
~~~

输出：

~~~
1
3
8
4
2
5
6
7
~~~

### 26.代码输出

~~~js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
  });
});

new Promise((resolve, reject) => {
  console.log(4);
  resolve(5);
}).then((data) => {
  console.log(data);
});

setTimeout(() => {
  console.log(6);
});

console.log(7);
~~~

输出：

~~~
1
4
7
5
2
3
6
~~~

### 27.代码输出

~~~js
Promise.resolve()
  .then(() => {
    console.log("1");
    throw "Error";
  })
  .then(() => {
    console.log("2");
  })
  .catch(() => {
    console.log("3");
    throw "Error";
  })
  .then(() => {
    console.log("4");
  })
  .catch(() => {
    console.log("5");
  })
  .then(() => {
    console.log("6");
  });
~~~

输出：

~~~
1
3
5
6
~~~

### 28.代码输出

~~~js
setTimeout(function () {
  console.log(1);
}, 100);

new Promise(function (resolve) {
  console.log(2);
  resolve();
  console.log(3);
}).then(function () {
  console.log(4);
  new Promise((resove, reject) => {
    console.log(5);
    setTimeout(() =>  {
      console.log(6);
    }, 10);
  })
});
console.log(7);
console.log(8);
~~~

输出：

~~~
2
3
7
8
4
5
6
1
~~~

