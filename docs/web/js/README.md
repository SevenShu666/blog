# js 知识归纳

## 一、堆和栈的区别

- 栈内存主要用于存储基本类型的值和引用类型值的地址
- 堆内存用于保存引用类型的值，可以通过栈内存的引用类型值的地址来获取

## 二、浅拷贝和深拷贝

- 浅拷贝可以简单的理解为，发生在栈中的拷贝行为，只能拷贝基本值和引用值的地址
- 深拷贝可以简单的理解为，同时发生在栈和堆中的拷贝行为，除了拷贝基本值，地址中的对象也会发生拷贝

## 三、数组的方法

### 改变原数组的方法

1. shift:将一个元素删除并且返回删除元素，删除第一项
2. unshift:在原数组的最前端依次添加，并且返回新数组的长度
3. push：在原数组的最后依次添加项，并返回新数组的长度
4. pop：将一个元素移除并返回移除的项，最后一项
5. reverse：反转数组的顺序
6. sort：对数组进行依次排序
7. splice：三个参数。第一个代表开始的下标，第二个代表 要删除的个数，第三个代表要替换的东西，返回被删除的数组

### 不改变原数组的方法

1. concat:拼接，连接多个数组
2. slice:提取，返回被提取的字符
3. join：将数组中所有元素以参数作为分隔符放入一个字符
4. map,filter,some,every 等不改变原数组

## 四、数据类型的检查方案

### typeof

- 优点：快速区分基本数据类型
- 缺点：不能区分 Object、Array 和 Null，都返回 object

### instanceof

- 优点：能够区分 Array、Object 和 Function，适合用于判断自定义的类实例对象
- 缺点：Number，Boolean，String 基本数据类型不能判断

### Object.prototype.toString.call()

- 优点：精准判断数据类型

## 五、字符串的方法

- charAt():返回指定索引位置的字符
- charCodeAt():返回指定索引位置字符的 Unicode 值
- concat():连接两个或多个字符串，返回连接后的字符串
- fromCharCode():将 Unicode 转换为字符串
- indexOf():返回字符串中检索指定字符第一次出现的位置
- lastIndexOf():返回字符串中检索指定字符最后一次出现的位置
- localeCompare():用本地特定的顺序来比较两个字符串
- match():找到一个或多个正则表达式的匹配
- replace():替换与正则表达式匹配的子串
- search():检索与正则表达式相匹配的值
- slice():提取字符串的片断，并在新的字符串中返回被提取的部分
- split():把字符串分割为子字符串数组
- substr():从起始索引号提取字符串中指定数目的字符
- substring():提取字符串中两个指定的索引号之间的字符
- toLocaleLowerCase():根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射
- toLocaleUpperCase():根据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射
- toLowerCase():把字符串转换为小写
- toUpperCase():把字符串转换为大写
- toString():返回字符串对象值
- trim():移除字符串首尾空白
- valueOf():返回某个字符串对象的原始值

## 六、for_in 和 for_for 的区别

### for in

- 获取对象的键名
- ES5 语法标准
- 可遍历普通对象
- 可遍历到原型链上的属性

### for of

- 获取对象的键值
- ES6 语法标准
- 不能遍历普通对象，普通对象是不可迭代的

## 七、indexOf、find、findIndex 的区别

- indexOf:用于输入一个值进行查找，找到了返回值的索引，没找到返回-1
- find:输入一个函数，找到第一个满足条件的值并返回，没有找到返回 undefined
- findIndexOf：输入一个函数，找到第一个满足条件的值并返回值的索引，没有找到返回-1

## 八、JS 继承

### 1.原型链继承

将父类的实例作为子类的原型

- 优点：父类的方法 可以复用

- 缺点：
  1. 父类的所有引用类型，会被所有的子类共享，只要修改其中一个，其他子类也会受到影响
  2. 子类实例不能向父类构造函数传参

```javascript
function Parent() {
  this.info = {
    name: "lisi",
  };
}

Parent.prototype.getName = function () {
  return this.info.name;
};

function Child() {}
Child.prototype = new Parent();
```

### 2.构造函数继承

在子类的构造函数中调用父类，使用 call、apply 方法改变 this

- 优点：
  1. 父类的引用属性不会被共享
  2. 子类实例可以向父类构造函数传参
- 缺点:子类不能访问父类原型上的方法和属性

```javascript
function Parent(name) {
  this.info = {
    name: name,
  };
}

Parent.prototype.getName = function () {
  return this.info.name;
};
Parent.prototype.age = 18;

function Child(name) {
  Parent.call(this, name);
}

const parent = new Parent("bobi");
const child1 = new Child("bobi");
const child2 = new Child("anna");

console.log(parent.age);
console.log(child1.age);
console.log(child2.age);
```

### 3.组合继承

结合了原型链继承和构造函数继承，通过将父类的实例作为子类的原型来获取父类原型上的属性和方法，通过构造函数来获取实例属性

- 优点:
  1. 父类的引用属性不会被共享
  2. 子类的实例可以向父类的构造函数传参
  3. 子类可以访问父类原型上的方法和属性
- 缺点:子类的原型上会多出不需要的父类的方法和属性

```javascript
function Parent(name) {
  this.name = name;
}
Parent.prototype.getNmae = function () {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = new Parent();
```

### 4.原型式继承

对参数对象的一种浅复制

- 优点:父类的方法可以共用
- 缺点:
  1. 子类实例不能向父类传参
  2. 父类的引用属性会被共享

```javascript
function objectCopy(obj) {
  function Fn() {}

  Fn.prototype = obj;
  return new Fn();
}
```

### 5.寄生式组合继承

1. 在子类的构造函数中调用父类的构造函数
2. 将子类的原型设置为父类的原型
3. 将原型上的 constructor 设置为子类

```javascript
function objectCopy(obj) {
  function Fn() {}

  Fn.prototype = obj;
  return new Fn();
}
function inheritPrototype(Child, Parent) {
  const prototype = objectCopy(Parent.prototype);
  prototype.constructor = Child;
  Child.prototype = prototype;
}

function Parent(name) {
  this.name = name;
  this.friends = ["rose", "lily", "tom"];
}
Parent.prototype.getName = function () {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

inheritPrototype(Child, Parent);

let child1 = new Child("anna", 23);
console.log(child1.getName());
console.log(child1.age);
```

## 九、JS 垃圾回收机制

垃圾回收机制：浏览器的 javascript 具有自动的垃圾回收机制，垃圾收集器会定期的找出那些不被继续使用的变量，然后释放其内存

- 标记清除法：当变量进入执行环境时，被标记为"进入环境"，当变量离开执行环境时，被标记为"离开环境"，那么垃圾回收器就会销毁这些离开环境的变量并回收内存
- 计数引用法：内存被引用一次，计数加 1 次，移除引用就减 1，减到 0 时，浏览器就回收它

## 十、JS 异步解决方案

1. 回调函数
   - 优点：解决了同步问题
   - 缺点：回调地狱，不能用 try catch 捕获错误，不能 return
2. Promise
   - 优点：解决了回调地狱
   - 缺点：无法取消 Promsie，错误需要通过回调函数捕获
3. Generator
   - 优点：可以控制函数的执行
4. Async/await
   - 优点：代码清晰，不用像 Promsie 一样写一堆的 then，解决了回调地狱
   - 缺点：异步代码改为同步代码，对于没有依赖性的多个异步操作就会导致性能降低

## 十一、Map 和 Set

### Map

是一组键值对的结构，key 不仅可以是字符串也可以是引用类型

1. 属性：size
2. 方法：has、set、get、delete、clear
3. 遍历方法：keys、values、entries、forEach

### WeakMap

也是一组键值对的结构，key 必须是引用类型，弱引用

1. 没有 size 属性
2. 方法：has、set、get、delete
3. 不可迭代

### Set

对象类似于数组，成员的值都是唯一的

1. 属性：size
2. 方法：has、add、delete、clear
3. 遍历方法：keys、values、entries、forEach

### WeakSet

成员是引用类型，具有唯一性，弱引用，垃圾回收机制不会考虑 set 内的引用

1. 没有 size 属性
2. 方法：has、add、delete
3. 不可迭代

### Map 和 Object 的区别

1. 在 Object 中，key 只能是 Symbol 和 String；而 Map 中 key 可以为任何值
2. 获取 Map 的长度可以通过 size 属性，而 Object 需要循环计算
3. Map 是可迭代对象，而普通对象不可以迭代

## 十二、Object.freeze 和 Object.seal 方法

### Object.seal()

封闭某个对象

1. 阻止添加新元素
2. 现有的属性不可配置
3. 属性值可被修改

### Object.freeze()

冻结某个对象

1. 阻止添加新元素
2. 现有的属性不可配置
3. 属性值不可被修改

## 十三、prototype 和**proto**区别

- \_\_proto\_\_是每个对象都有的一个属性，可以用 Object.getPrototypeOf()代替\_\_proto\_\_
- prototype 是函数才会有的属性

## 十四、setTimeout 和 setInterval 的区别

对于定时器，指定的时间间隔表示何时将定时器的代码添加到执行队列，而不是何时实际执行代码

- setTimeout：单次执行
- setInterval：循环执行

使用 setInterval()创建定时器会有两个问题：

1. 某些间隔会被跳过
2. 多个定时器的代码执行之间的间隔可能会比预期的小

## 十五、闭包

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量，利用闭包可以突破作用域链。

### 闭包的特性

- 内部函数可以引用外层变量
- 变量不会被垃圾回收机制回收

### 优缺点

- 好处：能实现封装和缓存
- 坏处：消耗内存、不正当的使用会导致内存溢出的问题

### 运用场景

- 防抖
- 节流

## 十六、作用域链

- 作用域链是一种用于查找变量和函数的机制，它是由当前执行环境和其所有父级执行环境的变量对象组成的链式结构。当在一个执行环境中访问变量或函数时，会首先在当前执行环境的变量对象中查找，如果找不到，则会沿着作用域链向上查找，直到找到对应变量或函数，或者到达最外层的全局对象。
- 作用域链的创建是在函数定义时确定的，它与函数定义的位置有关。
- 作用域就是变量与函数的可访问范围

## 十七、原型和原型链

- 每个对象都会在内存初始化一个`__proto__`属性，`__proto__`指向就是对象的原型
- 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去到`__proto__`指向的对象上查找，一层层的查找直到找到这个属性，或者找到`object`上的`null`，这样的一条链路就是原型链

## 十八、事件代理

- 将原本需要绑定的事件委托给父元素，让父元素担当事件监听职务。
- 可以大量节省内存占用，减少事件注册
- 原理就是DOM元素的事件冒泡

## 十九、this

- 在全局作用域中，`this`指向全局对象（window）
- 在函数中
  - 如果函数是作为对象的方法调用，`this`指向调用该方法的对象
  - 如果函数是作为普通函数调用，`this`指向全局对象（非严格模式）或`undefined`（严格模式）
  - 如果函数是通过`call`、`apply`或`bind`方法调用，`this`指向`call`、`apply`或`bind`方法的第一个参数
  - 如果函数是作为构造函数调用（使用`new`关键字），`this`指向新创建的对象
- 在箭头函数中，`this`指向继承自外部作用域，它不会因为调用方式的改变而改变

## 二十、事件模型

事件流分为三个阶段：

1. **捕获阶段（Capture Phase）**：事件从最外层的父节点开始向下传递，直到达到目标元素的父节点。在捕获阶段，事件会经过父节点、祖父节点等，但不会触发任何事件处理程序。
2. **目标阶段（Target Phase）**：事件到达目标元素本身，触发目标元素上的事件处理程序。如果事件有多个处理程序绑定在目标元素上，它们会按照添加的顺序依次执行。
3. **冒泡阶段（Bubble Phase）**：事件从目标元素开始向上冒泡，传递到父节点，直到传递到最外层的父节点或根节点。在冒泡阶段，事件会依次触发父节点、祖父节点等的事件处理程序。

## 二十一、new操作符

1. 创建一个新的空对象
2. 将新对象的原型链接到构造函数的原型对象
3. 改变构造函数`this`指向到新对象
4. 执行构造函数，并传入参数
5. 如果构造函数没有显式返回一个对象，则返回新对象

## 二十二、解决跨域

> 同源策略：浏览器的安全策略，同源需要端口、域名和协议三者相同，只要有一个不同就会发生跨域

1. 通过jsonp跨域

   ~~~js
   function jsonp(url, params, callback) {
     // 生成唯一的回调函数名
     const callbackName = 'jsonp_' + Date.now();
   
     // 将参数拼接到 URL 中
     const queryString = Object.keys(params)
       .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
       .join('&');
   
     // 创建 script 元素
     const script = document.createElement('script');
     script.src = url + '?' + queryString + '&callback=' + callbackName;
   
     // 定义回调函数
     window[callbackName] = function(data) {
       // 调用回调函数
       callback(data);
   
       // 删除 script 元素和回调函数
       document.head.removeChild(script);
       delete window[callbackName];
     };
   
     // 将 script 元素添加到页面中
     document.head.appendChild(script);
   }
   ~~~

2. `nginx`代理跨域

3. nodejs中间件代理跨域

   - 使用nodejs构建一个中间件，在服务器代理请求，将跨域请求转发到同源接口，然后将响应返回给前端

4. CORS（跨域资源共享）

   - 在响应头部设置`Access-Control-Allow-Origin`，允许访问的域名

5. `webSocket`

   - `webSocket`不受同源策略限制

## 二十三、模块化开发

1. 立即执行函数模式

   - 使用立即执行函数创建模块，将私有成员放在函数作用域内，不直接暴漏给外部

   - 通过返回一个包含公共方法的对象，使这些方法可以在外部访问

   - ~~~js
     var module = (function() {
       var privateVar = 'Private Variable';
     
       function privateMethod() {
         console.log('This is a private method');
       }
     
       function publicMethod() {
         console.log('This is a public method');
       }
     
       return {
         publicMethod: publicMethod
       };
     })();
     
     module.publicMethod();
     ~~~

2. `commonJS`

   - 使用`require`导入模块，使用`module.exports`或`exports`导出模块
   - 适合nodejs环境

3. ES Modules

   - 使用`import`导入模块，使用`export`导出模块
   - 适用于现代浏览器环境和支持ES6模块的工具链

4. AMD

   - 适用`define`定义模块，通过异步加载模块
   - 适用于浏览器环境和需要按需加载模块的场景

## 二十四、异步加载js

1. 设置`<script>`属性`async`
2. 设置`<script>`属性`defer`
3. 动态创建`script DOM`
4. 异步加载库`LABjs`

## 二十五、内存泄漏操作

> javascript内存泄漏指对象在不需要使用它时仍存在，导致占用的内存不能使用或回收

1. 闭包函数
2. 循环引用
3. 控制台日志
4. 定时器

## 二十六、XML和JSON的区别

`XML`（可扩展标记语言）和`JSON`（javascript对象表示法）是两种常用的数据格式

1. 数据体积方面
   - `JSON`相对于`XML`来说，数据体积小，所以传输的速度更快
2. 数据交互方面
   - `JSON`与javascript的交互更加方便，因为`JSON`数据可以直接被js解析和处理，无需额外的转换步骤
   - `XML`需要使用DOM操作来解析和处理数据，相对而言更加复杂
3. 数据描述方面
   - `XML`对数据的描述性较强，它使用标签来标识数据的结构和含义，可以自定义标签名，使数据更具有可读性和可扩展性

## 二十七、web安全及防护原理

### 1.跨站脚本攻击（XSS）

> 指攻击者在WEB页面里插入恶意HTML标签或者javascript代码

- 防护原理
  - 对用户的输入进行合适的转义和过滤，转义符（\）进行转义
  - CSP白名单设置

### 2.跨站请求伪造（CSRF）

> 利用用户的登录态，发起恶意请求

- 防护原理
  - 请求时带上验证信息，比如token和验证码
  - 验证请求来源

## 二十八、设计模式

1. 工厂模式（Factory Pattern）
   - 优点：封装了对象的创建过程，降低了耦合性，提高了灵活性和可扩展性
   - 缺点：增加了代码的复杂性，需要创建工厂类
   - 使用场景：当需要根据不同条件创建不同对象时，可以使用工厂模式
2. 单例模式（Singleton Pattern）
   - 优点：确保一个类只有一个实例，节省系统资源，提供全局访问点
   - 缺点：可能引入全局状态，并不利于扩展和测试
   - 适用场景：当需要全局唯一的对象实例时，例如日志记录器、全局配置对象等
3. 观察者模式（Observer Pattern）
   - 优点：实现了对象之间的松耦合，支持广播通信，当一个对象状态发生变化时，可以通知依赖它的其他对象进行更新
   - 缺点：可能导致性能问题和内存泄漏，需要合理的管理观察者列表
   - 适用场景：当需要实现对象之间的一对多关系，一个对象改变需要通知其他多个对象
4. 发布订阅模式（Publish-Subscribe Pattern）
   - 优点：解耦了发布者和订阅者，使它们可以独立变化，增加了代码的灵活性和可维护性
   - 缺点：可能会导致发布者过度发布消息，造成性能问题
   - 适用场景：当存在一对多的关系，一个对象的状态变化需要通知多个其他对象时，可以使用发布订阅模式。

### 观察者模式和发布订阅模式

1. 相同之处：
   - 都用于实现对象之间得消息通信和事件处理
   - 都支持解耦，让发布者和订阅者之间相互独立
2. 区别：
   - 关注点不同：观察者模式关注的是一个被观察者对象和多个观察者对象之间的关系。当被观察者对象的状态发生变化时，它会通知所有的观察者对象进行更新。而发布订阅模式关注的是发布者和订阅者之间的关系，发布者将消息发送到事件总线，然后由事件总线将消息发送给所有订阅者。
   - 中间间存在与否：发布订阅模式通常需要一个中间件来管理消息的发布和订阅，这样发布者和订阅者之间的通信通过中间件进行。而观察者模式则直接在被观察者对象和观察者对象之间进行通信，没有中间件参与。
   - 观察者模式中，被观察者对象和观察者对象之间是直接关联的，被观察者对象需要知道每个观察者对象的存在。而在发布订阅模式中，发布者和订阅者之间并不直接关联，它们只与中间件进行通信，发布者和订阅者之间的耦合更加松散。

## 二十九、定义对象的方法

1. 对象字面量：`let obj = {}`
2. 构造函数：`let obj = new Object()`
3. `Object.create()`：`let obj = Object.create(Object.prototype)`

## 三十、jQuery源码的优点

1. 结构清晰，模块化的设计使各个功能模块之间相互独立，易于维护和扩展
2. 采用了很多优化手段，例如缓存DOM查询结果、事件委托等，以提高性能和效率
3. 提供了一致而强大的选择器功能
4. 封装了跨浏览器的解决方案，解决了浏览器的兼容性问题
5. 提供了丰富的DOM操作方法和动画效果

## 三十一、JavaScript的数据类型

1. 原始数据类型：
   - `undefined`： 表示未定义的值
   - `Null`：表示空值
   - `Boolean`：表示布尔值，只有两个取值：`true`和`false`
   - `Number`：表示数字，包括整数和浮点数
   - `String`：表示字符串
   - `Symbol`：表示唯一的、不可变的值
2. 引用数据类型
   - `Object`：表示对象，是一种复合值，可以包含多个键值对
   - `Array`：表示数组，是一种有序的、可变的集合
   - `Function`：表示函数，可以执行特定的任务
   - `Date`：表示日期和时间
   - `RegExp`：表示正则表达式，用于匹配和处理字符串
   - `Error`：表示错误对象，用于捕获和处理异常情况

## 三十二、eval

`eval()`是javascript的一个全局函数，用于将传入的字符串作为javascript代码进行解析和执行

1. 动态执行代码：`eval()`可以将字符串作为javascript代码进行执行，将字符串解析为可执行的javascript代码。这样可以动态生成和执行代码，灵活性较高。
2. 计算字符串表达式：`eval()`可以计算传入的字符串表达式并返回结果
3. 解析JSON：在某些情况下，可以适用`eval()`将JSON字符串解析为javascript对象。

## 三十三、“use strict”

用于告诉javascript解析器在解析代码时采用严格模式

好处：

1. 消除了一些javascript代码的不安全操作，使代码更安全
2. 阻止使用一些不推荐或已废弃的语法和特性
3. 强制执行更严格的语法和错误检查，减少潜在的错误
4. 提高性能，某些优化操作只在严格默模式下生效

限制：

1. 变量必须先声明再使用
2. 禁止使用`with`语句
3. 禁止this指向全局对象

## 三十四、attribute和property

- `attribute`是dom元素在文档中作为html标签拥有的属性
- `property`是dom元素在js中作为对象拥有的属性
- 对于`html`的标准元素来说，`attribute`和`property`同步的，会自动更新

## 三十五、ES6

1. 块级作用域：引入了let和const关键字，允许在块级作用域中声明变量，解决了变量提升和作用域污染问题
2. 箭头函数：自动绑定了this
3. 模板字符串：实现更灵活的字符串拼接和格式化
4. 解构赋值：通过解构赋值语法，可以从数组和对象中提取值，并赋给对应的变量，简化了变量赋值的操作
5. 默认参数：函数可以定义默认参数
6. 扩展运算符：使用三个点（...）进行数组和对象的展开操作
7. Promise：解决了回调地狱
8. 类：class关键字定义类
9. 模块化：import和export语法导入和导出模块

## 三十六、面向对象编程

面向对象编程（Object-Oriented Programming，OOP）是一种编程思想和方法论，其基本思想是以对象为中心，通过封装、继承和多态等机制来组织和管理代码。

优点：

- 易维护性：对象的封装性和模块化使代码易于维护和理解
- 代码重用性：通过继承和组合等机制，可以重用已有的类和代码
- 灵活性和可扩展性：面向对象编程提供了灵活的结构和抽象层次，使得代码易于扩展和修改，适应需求的变化。
- 可靠性：封装和继承等机制可以提高代码的可靠性和可测试性，减少错误的发生和影响范围。
- 可理解性：面向对象的代码通常具有良好的可读性和可理解性，对象和类的设计使得代码更加直观和自然。

## 三十七、JS判断数组

1. `instanceof`：`arr instanceof Array`
2. `constructor`：`arr.constructor === Array`
3. `Object.prototype.toString.call()`：`Object.prototype.toString.call(arr) === '[object Array]'`
4. `isArray()`：`isArray(arr)`

## 三十八、map和forEach

- map和forEach都是遍历数组的方法
- map方法会生成一个新数组，并将每次遍历的返回值顺序放入新数组中。而forEach方法没有返回值，仅用于遍历数组

## 三十九、函数式编程

通过组合和应用函数来进行开发程序

特点：

1. 纯函数：函数的输出只由输入决定，不会产生副作用，对同样的输入始终返回相同的输出。
2. 不可变性：数据一旦创建就不能被修改，任何对数据的修改都会创建一个新的数据副本
3. 高阶函数：函数可以作为参数传递给其他函数，也可以作为返回值返回
4. 函数组合：通过将多个函数组合成一个新的函数，可以实现更复杂的逻辑
5. 惰性计算：只在需要的时候才进行计算，避免是不必要的计算

## 四十、箭头函数和普通函数

1. this指向：箭头函数没有自己的this， 它会捕获所在上下文的this值。普通函数的this是在运行时确定的，根据调用方式决定
2. 不可作为构造函数：箭头函数不能使用new关键字创建实例，它没有自己的`prototype`属性，无法进行实例化
3. 无`arguments`对象：箭头函数没有自己的`arguments`对象，可以使用`Rest`参数来代替

## 四十一、阻止冒泡和默认事件

- 阻止冒泡
  - `event.stopPropagation()`
  - `event.cancelBubble = true`，IE浏览器
- 默认事件
  - `event.preventDefault()`
  - `return false`，IE浏览器

## 四十二、异步编程的方法

1. 回调函数：在异步操作完成后，通过回调函数来处理结果
   - 优点：简单、容易理解
   - 缺点：不利于维护，代码耦合度高
2. Promise：使用Promise对象可以更方便地处理异步操作的结果和错误
   - 优点：可以利用then方法，进行链式写法；可以书写错误时回调函数
   - 缺点：编写和理解，相对困难
3. Generator函数：使用Generator函数可以实现函数体内外的数据交换和错误处理
   - 优点：函数体内外的数据交换、错误处理机制
   - 缺点：流程管理不方便
4. async函数：async函数是Generator函数的语法糖，可以更方便地编写和理解异步代码
   - 优点：内置执行器、更好的语义、更广的适用性、返回的是Promise、结构清晰
   - 缺点：错误处理机制

## 四十三、添加、移除、移动、复制、创建和查找节点

- 创建节点

~~~js
document.createElement(tagName); // 创建一个指定标签名的元素节点
document.createTextNode(text); // 创建一个包含指定文本的文本节点
document.createDocumentFragment(); // 创建一个空的文档片段节点
~~~

- 添加、移除、替换、插入节点

~~~js
parentNode.appendChild(node); // 在父节点的末尾添加一个子节点
parentNode.removeChild(node); // 从父节点中移除指定的子节点
parentNode.replaceChild(newNode, oldNode); // 用新节点替换指定的旧节点
parentNode.insertBefore(newNode, referenceNode); // 在参考节点之前插入一个新节点
~~~

- 查找节点

~~~js
document.getElementsByTagName(tagName); // 返回指定标签名的元素节点集合
document.getElementsByName(name); // 返回具有指定名称的元素节点集合
document.getElementById(id); // 返回具有指定 id 的元素节点
~~~

## 四十四、Javascript全局函数和全局变量

**全局变量**

- `Infinity` 代表正的无穷大的数值。
- `NaN` 指示某个值是不是数字值。
- `undefined` 指示未定义的值。
- `Date` 表示日期和时间的对象。
- `Math` 包含了数学相关的函数和常量。
- `JSON` 用于解析和序列化 JSON 数据的对象。
- `console` 用于在控制台输出信息的对象。
- `document` 表示当前 HTML 文档的对象。
- `window` 表示浏览器窗口的对象。

**全局函数**

- `decodeURI()` 解码某个编码的 `URI`。
- `decodeURIComponent()` 解码一个编码的 `URI` 组件。
- `encodeURI()` 把字符串编码为 URI。
- `encodeURIComponent()` 把字符串编码为 `URI` 组件。
- `escape()` 对字符串进行编码。
- `eval()` 计算 `JavaScript` 字符串，并把它作为脚本代码来执行。
- `isFinite()` 检查某个值是否为有穷大的数。
- `isNaN()` 检查某个值是否是数字。
- `Number()` 把对象的值转换为数字。
- `parseInt()` 解析一个字符串并返回一个整数。
- `String()` 把对象的值转换为字符串。
- `unescape()` 对由`escape()` 编码的字符串进行解码
- `setTimeout()` 在指定的延迟时间后执行一次函数。
- `setInterval()` 每隔指定的时间间隔重复执行函数。
- `clearTimeout()` 取消使用 `setTimeout()` 创建的延迟执行。
- `clearInterval()` 取消使用 `setInterval()` 创建的重复执行。
- `alert()` 在浏览器中显示一个警告框。
- `confirm()` 在浏览器中显示一个确认框。
- `prompt()` 在浏览器中显示一个提示框，接收用户输入

## 四十五、javascript垃圾回收方法

正常情况下，现代的 JavaScript 引擎会使用标记清除（mark and sweep）算法作为主要的垃圾回收方法。引用计数（reference counting）在某些老旧的 JavaScript 引擎中可能会被使用。

### 标记清除

1. 垃圾回收器会在运行时给存储在内存中的所有变量加上标记。
2. 垃圾回收器会从根对象开始，递归遍历所有的引用，标记它们为“进入环境”。
3. 在遍历完成后，垃圾回收器会对未被标记的变量进行清除，即将其回收内存空间。
4. 被清除的内存空间将被重新分配给后续的变量使用。

### 引用计数

1. 对于每个对象，引擎会维护一个引用计数器，用于记录当前有多少个引用指向该对象。
2. 当一个引用指向对象时，引用计数器加一；当一个引用不再指向对象时，引用计数器减一。
3. 当引用计数器为零时，说明该对象没有被引用，可以将其回收内存空间。
4. 引用计数算法容易出现循环引用的问题，即两个或多个对象互相引用，但没有被其他对象引用，导致引用计数器无法归零，造成内存泄漏。

## 四十六、JavaScript数组和对象原生方法

### 数组方法

- `arr.concat(arr1, arr2, arrn)`：连接多个数组并返回新数组。
- `arr.copyWithin(target, start, end)`：将数组的一部分复制到同一数组中的另一个位置。
- `arr.entries()`：返回一个包含数组键值对的迭代器对象。
- `arr.every(callbackFn, thisArg)`：测试数组中的所有元素是否都通过了指定函数的测试。
- `arr.fill(value, start, end)`：用静态值填充数组的一部分。
- `arr.filter(callbackFn, thisArg)`：创建一个新数组，其中包含通过指定函数筛选的所有元素。
- `arr.find(callbackFn, thisArg)`：返回数组中第一个满足测试函数的元素的值。
- `arr.findIndex(callbackFn, thisArg)`：返回数组中第一个满足测试函数的元素的索引。
- `arr.flat(depth)`：将多维数组展平为一维数组。
- `arr.flatMap(callbackFn, thisArg)`：首先使用映射函数映射每个元素，然后将结果展平为一维数组。
- `arr.forEach(callbackFn, thisArg)`：对数组中的每个元素执行指定函数。
- `arr.includes(searchElement, fromIndex)`：判断数组中是否包含指定元素。
- `arr.indexOf(searchElement, fromIndex)`：返回指定元素在数组中首次出现的索引。
- `arr.join(separator)`：将数组元素连接为一个字符串，并使用指定的分隔符。
- `arr.keys()`：返回一个包含数组键的迭代器对象。
- `arr.lastIndexOf(searchElement, fromIndex)`：返回指定元素在数组中最后一次出现的索引。
- `arr.map(callbackFn, thisArg)`：创建一个新数组，其中包含通过指定函数对每个元素进行处理后的结果。
- `arr.pop()`：移除并返回数组的最后一个元素。
- `arr.push(element1, element2, ..., elementN)`：向数组末尾添加一个或多个元素，并返回新的长度。
- `arr.reduce(callbackFn, initialValue)`：对数组中的所有元素执行指定的累积函数，返回累积结果。
- `arr.reduceRight(callbackFn, initialValue)`：对数组中的所有元素执行指定的累积函数（从右到左），返回累积结果。
- `arr.reverse()`：反转数组中元素的顺序。
- `arr.shift()`：移除并返回数组的第一个元素。
- `arr.slice(start, end)`：从数组中提取指定范围的元素，并返回一个新数组。
- `arr.some(callbackFn, thisArg)`：测试数组中的至少一个元素是否通过了指定函数的测试。
- `arr.sort(compareFunction)`：对数组元素进行排序，可以传入自定义的比较函数。
- `arr.splice(start, deleteCount, item1, item2, ...)`：从数组中添加/删除元素，并返回被删除的元素。
- `arr.toLocaleString()`：将数组中的元素转换为字符串，并返回该字符串。
- `arr.toString()`：将数组中的元素转换为字符串，并返回该字符串。
- `arr.unshift(element1, element2, ..., elementN)`：向数组开头添加一个或多个元素，并返回新的长度。
- `arr.values()`：返回一个包含数组值的迭代器对象。

### 对象方法

- `Object.assign(target, ...sources)`：将一个或多个源对象的属性复制到目标对象，并返回目标对象。
- `Object.create(proto, [propertiesObject])`：使用指定的原型对象和属性创建一个新对象。
- `Object.defineProperties(obj, props)`：定义一个或多个对象的新属性或修改现有属性的配置。
- `Object.defineProperty(obj, prop, descriptor)`：定义一个新属性或修改现有属性的配置。
- `Object.entries(obj)`：返回一个包含对象自身可枚举属性的键值对数组。
- `Object.freeze(obj)`：冻结对象，使其属性不可修改。
- `Object.fromEntries(entries)`：将键值对列表转换为对象。
- `Object.getOwnPropertyDescriptor(obj, prop)`：返回对象属性的描述符。
- `Object.getOwnPropertyDescriptors(obj)`：返回对象所有属性的描述符。
- `Object.getOwnPropertyNames(obj)`：返回一个数组，包含对象自身的所有属性名称。
- `Object.getOwnPropertySymbols(obj)`：返回一个数组，包含对象自身的所有Symbol属性。
- `Object.getPrototypeOf(obj)`：返回指定对象的原型。
- `Object.is(value1, value2)`：判断两个值是否相同。
- `Object.isExtensible(obj)`：判断对象是否可扩展。
- `Object.isFrozen(obj)`：判断对象是否已被冻结。
- `Object.isSealed(obj)`：判断对象是否已被密封。
- `Object.keys(obj)`：返回一个数组，包含对象自身的所有可枚举属性名称。
- `Object.preventExtensions(obj)`：阻止对象扩展，使其不可添加新属性。
- `Object.seal(obj)`：将对象密封，使其属性不可添加、删除或配置。
- `Object.setPrototypeOf(obj, prototype)`：设置对象的原型。
- `Object.values(obj)`：返回一个包含对象自身可枚举属性的值的数组。

<Valine></Valine>
