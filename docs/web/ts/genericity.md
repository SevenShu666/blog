# 九、泛型

设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：类的实例成员、类的方法、函数参数和函数返回值。

泛型（Generics）是允许同一个函数接受不同类型参数的一种模板。相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型。

## 1.泛型语法

其中 `T` 代表 **Type**，在定义泛型时通常用作第一个类型变量名称。但实际上 `T` 可以用任何有效名称代替。除了 `T` 之外，以下是常见泛型变量代表的意思：

- K（Key）：表示对象中的键类型；
- V（Value）：表示对象中的值类型；
- E（Element）：表示元素类型。

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 `U`，用于扩展我们定义的 `identity` 函数：

~~~ts
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity<Number, string>(68, "Semlinker"));
~~~

除了为类型变量显式设定值之外，一种更常见的做法是使编译器自动选择这些类型，从而使代码更简洁。我们可以完全省略尖括号，比如：

~~~ts
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity(68, "Semlinker"));
~~~

## 2.泛型接口

~~~ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}
~~~

## 3.泛型类

~~~ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
~~~

## 4.泛型工具类型

为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。

### 先介绍相关的操作符

#### 1.typeof

在 TypeScript 中，`typeof` 操作符可以用来获取一个变量声明或对象的类型。

~~~ts
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: 'semlinker', age: 33 };
type Sem= typeof sem; // -> Person

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
~~~

#### 2.keyof

对应任何类型`T`，`keyof T`的结果为该类型上所有公有属性key的联合，其返回类型是联合类型。

~~~ts
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join" 
type K3 = keyof { [x: string]: Person };  // string | number
~~~

在 TypeScript 中支持两种索引签名，数字索引和字符串索引：

~~~ts
interface StringArray {
  // 字符串索引 -> keyof StringArray => string | number
  [index: string]: string; 
}

interface StringArray1 {
  // 数字索引 -> keyof StringArray1 => number
  [index: number]: string;
}
~~~

为了同时支持两种索引类型，就得要求数字索引的返回值必须是字符串索引返回值的子类。**其中的原因就是当使用数值索引时，JavaScript 在执行索引操作时，会先把数值索引先转换为字符串索引**。所以 `keyof { [x: string]: Person }` 的结果会返回 `string | number`。

#### 3.in

`in` 用来遍历枚举类型：

~~~ts
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }
~~~

#### 4.infer

在条件类型语句中，可以用 `infer` 声明一个类型变量并且对它进行使用。

~~~ts
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any;
~~~

以上代码中 `infer R` 就是声明一个变量来承载传入函数签名的返回值类型，**简单说就是用它取到函数返回值的类型方便之后使用**。

#### 5.extends

##### 用于接口，表示继承

~~~ts
interface T1 {
  name: string,
}

interface T2 {
  sex: number,
}

/**
 * @example
 * T3 = {name: string, sex: number, age: number}
 */
interface T3 extends T1, T2 {
  age: number,
}
~~~

注意，接口支持多重继承，语法为逗号隔开。如果是type实现继承，则可以使用交叉类型`type A = B & C & D`。

##### 表示条件类型，可用于条件判断

表示条件判断，如果前面的条件满足，则返回问号后的第一个参数，否则第二个。类似于js的三元运算。

~~~ts
/**
 * @example
 * type A1 = 1
 */
type A1 = 'x' extends 'x' ? 1 : 2;

/**
 * @example
 * type A2 = 2
 */
type A2 = 'x' | 'y' extends 'x' ? 1 : 2;

/**
 * @example
 * type A3 = 1 | 2
 */
type P<T> = T extends 'x' ? 1 : 2;
type A3 = P<'x' | 'y'>
~~~

- 如果用于简单的条件判断，则是直接判断前面的类型是否可分配给后面的类型
- 若`extends`前面的类型是泛型，且泛型传入的是联合类型时，则会依次判断该联合类型的所有子类型是否可分配给extends后面的类型（是一个分发的过程）。

**总结，就是`extends`前面的参数为联合类型时则会分解（依次遍历所有的子类型进行条件判断）联合类型进行判断。然后将最终的结果组成新的联合类型。**

##### 阻止extends关键词对于联合类型的分发特性

如果不想被分解（分发），做法也很简单，可以通过简单的元组类型包裹以下：

~~~ts
type P<T> = [T] extends ['x'] ? 1 : 2;
/**
 * type A4 = 2;
 */
type A4 = P<'x' | 'y'>
~~~

### 类型兼容性

> 集合论中，如果一个集合的所有元素在集合B中都存在，则A是B的子集；
>
> 类型系统中，如果一个类型的属性更具体，则该类型是子类型。（因为属性更少则说明该类型约束的更宽泛，是父类型）

**因此，我们可以得出基本的结论：子类型比父类型更加具体,父类型比子类型更宽泛。** 下面我们也将基于类型的可复制性（可分配性）、协变、逆变、双向协变等进行进一步的讲解。

##### 可赋值性

~~~ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  break(): void;
}

let a: Animal;
let b: Dog;

// 可以赋值，子类型更佳具体，可以赋值给更佳宽泛的父类型
a = b;
// 反过来不行
b = a;
~~~

##### 可赋值性在联合类型中的特性

~~~ts
type A = 1 | 2 | 3;
type B = 2 | 3;
let a: A;
let b: B;

// 不可赋值
b = a;
// 可以赋值
a = b;
~~~

是不是`A`的类型更多，`A`就是子类型呢？恰恰相反，`A`此处类型更多但是其表达的类型更宽泛，所以`A`是父类型，`B`是子类型。

##### 协变

~~~ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  break(): void;
}

let Eg1: Animal;
let Eg2: Dog;
// 兼容，可以赋值
Eg1 = Eg2;

let Eg3: Array<Animal>
let Eg4: Array<Dog>
// 兼容，可以赋值
Eg3 = Eg4
~~~

通过`Eg3`和`Eg4`来看，在`Animal`和`Dog`在变成数组后，`Array<Dog>`依旧可以赋值给`Array<Animal>`，因此对于`type MakeArray = Array<any>`来说就是协变的。

简单说就是，具有父子关系的多个类型，在通过某种构造关系构造成的新的类型，如果还具有父子关系则是协变的，而关系逆转了（子变父，父变子）就是逆变的。

##### 逆变

~~~ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  break(): void;
}

type AnimalFn = (arg: Animal) => void
type DogFn = (arg: Dog) => void

let Eg1: AnimalFn;
let Eg2: DogFn;
// 不再可以赋值了，
// AnimalFn = DogFn不可以赋值了, Animal = Dog是可以的
Eg1 = Eg2;
// 反过来可以
Eg2 = Eg1;
~~~

理论上，`Animal = Dog`是类型安全的，那么`AnimalFn = DogFn`也应该类型安全才对，为什么Ts认为不安全呢？看下面的例子：

~~~ts
let animal: AnimalFn = (arg: Animal) => {}
let dog: DogFn = (arg: Dog) => {
  arg.break();
}

// 假设类型安全可以赋值
animal = dog;
// 那么animal在调用时约束的参数，缺少dog所需的参数，此时会导致错误
animal({name: 'cat'});
~~~

从这个例子看到，如果dog函数赋值给animal函数，那么animal函数在调用时，约束的是参数必须要为Animal类型（而不是Dog），但是animal实际为dog的调用，此时就会出现错误。

因此，`Animal`和`Dog`在进行`type Fn<T> = (arg: T) => void`构造器构造后，父子关系逆转了，此时成为“逆变”。

##### 双向协变

Ts在函数参数的比较中实际上默认采取的策略是双向协变：只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功。

这是不稳定的，因为调用者可能传入了一个具有更精确类型信息的函数，但是调用这个传入的函数的时候却使用了不是那么精确的类型信息（典型的就是上述的逆变）。 但是实际上，这极少会发生错误，并且能够实现很多JavaScript里的常见模式：

~~~~ts
// lib.dom.d.ts中EventListener的接口定义
interface EventListener {
  (evt: Event): void;
}
// 简化后的Event
interface Event {
  readonly target: EventTarget | null;
  preventDefault(): void;
}
// 简化合并后的MouseEvent
interface MouseEvent extends Event {
  readonly x: number;
  readonly y: number;
}

// 简化后的Window接口
interface Window {
  // 简化后的addEventListener
  addEventListener(type: string, listener: EventListener)
}

// 日常使用
window.addEventListener('click', (e: Event) => {});
window.addEventListener('mouseover', (e: MouseEvent) => {});
~~~~

可以看到`Window`的`listener`函数要求参数是`Event`，但是日常使用时更多时候传入的是`Event`子类型。但是这里可以正常使用，正是其默认行为是双向协变的原因。可以通过`tsconfig.js`中修改`strictFunctionType`属性来严格控制协变和逆变。

##### `infer`推导的名称相同并且都处于**逆变**的位置，则推导的结果将会是交叉类型

~~~ts
type Bar<T> = T extends {
  a: (x: infer U) => void;
  b: (x: infer U) => void;
} ? U : never;

// type T1 = string
type T1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;

// type T2 = never
type T2 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;

type a = (x: string) => void;

// 类似
type x = (x: infer U) => void;
type y = (y: string) => void;

let X:x;
let Y:y;

// 不可以，那么X函数在调用时，约束的是参数必须要为X类型（而不是Y），但是X实际为Y的调用
X = Y
// 反过来可以
Y = X
~~~

##### `infer`推导的名称相同并且都处于**协变**的位置，则推导的结果将会是联合类型

### Partial

`Partial<T>`将`T`的所有属性变成可选的。

~~~ts
/**
 * 核心实现就是通过映射类型遍历T上所有的属性，
 * 然后将每个属性设置为可选属性
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
}
~~~

- `[P in keyof T]`通过映射类型，遍历`T`上的所有属性
- `?:`设置为属性为可选的
- `T[P]`设置类型为原来的类型

### Readonly

`Readonly<T>`将`T`的所有属性变成只读的。

~~~ts
/**
 * 主要实现是通过映射遍历所有key，
 * 然后给每个key增加一个readonly修饰符
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
~~~

### Pick

挑选一组属性并组成一个新的类型。

~~~ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
~~~

~~~ts
interface Person {
  name: string;
  age: number;
  isDead: Boolean;
}

type PickPerson = Pick<Person, "name" | "age">;

let p: PickPerson = {
  name: "anna",
  age: 18,
};
~~~

### Record

构造一个`type`，`key`为联合类型中的每个子类型，类型为`T`。

~~~ts
/**
 * 核心实现就是遍历K，将值设置为T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T
}
~~~

~~~ts
/**
 * @example
 * type Eg2 = {a: B, b: B}
 */
interface A {
  a: string,
  b: number,
}
interface B {
  key1: number,
  key2: string,
}
type Eg2 = Record<keyof A, B>
~~~

- 值得注意的是`keyof any`得到的是`string | number | symbol`
- 原因在于类型key的类型只能为`string | number | symbol`

 **同态与非同态**

- `Partial`、`Readonly`和`Pick`都属于同态的，即其实现需要输入类型T来拷贝属性，因此属性修饰符（例如readonly、?:）都会被拷贝。

~~~ts
/**
 * @example
 * type Eg = {readonly a?: string}
 */
type Eg = Pick<{readonly a?: string}, 'a'>
~~~

- `Record`是非同态的，不需要拷贝属性，因此不会拷贝属性修饰符

~~~ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
  [P in K]: T
}
~~~

T为输入的类型，而`keyof T`则遍历了输入类型；而`Record`的实现中，并没有遍历所有输入的类型，K只是约束为`keyof any`的子类型即可。

### Exclude

`Exclude<T, U>`提取存在于`T`，但不存在于`U`的类型组成的联合类型。

~~~ts
/**
 * 遍历T中的所有子类型，如果该子类型约束于U（存在于U、兼容于U），
 * 则返回never类型，否则返回该子类型
 */
type Exclude<T, U> = T extends U ? never : T;
~~~

~~~ts
/**
 * 遍历T中的所有子类型，如果该子类型约束于U（存在于U、兼容于U），
 * 则返回never类型，否则返回该子类型
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * @example
 * type Eg = 'key1'
 */
type Eg = Exclude<'key1' | 'key2', 'key2'>
~~~

- `never`表示一个不存在的类型
- `never`与其他类型的联合后，是没有`never`的

~~~ts
/**
 * @example
 * type Eg2 = string | number
 */
type Eg2 = string | number | never
~~~

### Extract

`Extract<T, U>`提取联合类型T和联合类型U的所有交集。

~~~ts
type Extract<T, U> = T extends U ? T : never;
~~~

~~~ts
/**
 * @example
 *  type Eg = 'key1'
 */
type Eg = Extract<'key1' | 'key2', 'key1'>
~~~

### Omit

`Omit<T, K>`从类型`T`中剔除`K`中的所有属性。

~~~ts
/**
 * 利用Pick实现Omit
 */
type Omit = Pick<T, Exclude<keyof T, K>>;
~~~

### Parameters

Parameters 获取函数的参数类型，将每个参数类型放在一个元组中。

~~~ts
/**
 * @desc 具体实现
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
~~~

~~~ts
/**
 * @example
 * type Eg = [arg1: string, arg2: number];
 */
type Eg = Parameters<(arg1: string, arg2: number) => void>;
~~~

**重点**

- `infer`关键词作用是让Ts自己推导类型，并将推导结果存储在其参数绑定的类型上。Eg:`infer P` 就是将结果存在类型`P`上，供使用。
- `infer`关键词只能在`extends`条件类型上使用，不能在其他地方使用。

**重点**

- 定义元祖的可选项，只能是最后的选项

```ts
/**
 * 普通方式
 */
type Tuple1 = [string, number?];
const a: Tuple1 = ['aa', 11];
const a2: Tuple1 = ['aa'];

/**
 * 具名方式
 */
type Tuple2 = [name: string, age?: number];
const b: Tuple2 = ['aa', 11];
const b2: Tuple2 = ['aa'];
```

扩展：`infer`实现一个推导数组所有元素的类型：

~~~ts
/**
 * 约束参数T为数组类型，
 * 判断T是否为数组，如果是数组类型则推导数组元素的类型
 */
type FalttenArray<T extends Array<any>> = T extends Array<infer P> ? P : never;

/**
 * type Eg1 = number | string;
 */
type Eg1 = FalttenArray<[number, string]>
/**
 * type Eg2 = 1 | 'asd';
 */
type Eg2 = FalttenArray<[1, 'asd']>
~~~

### ReturnType

获取函数的返回值类型。

~~~ts
/**
 * @desc ReturnType的实现其实和Parameters的基本一样
 * 无非是使用infer R的位置不一样。
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
~~~

### ConstructorParameters

获取类的构造函数的参数类型，存在一个元组中。

~~~ts
/**
 * 核心实现还是利用infer进行推导构造函数的参数类型
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
~~~

~~~ts
/**
 * @example
 * type Eg = string;
 */
interface ErrorConstructor {
  new(message?: string): Error;
  (message?: string): Error;
  readonly prototype: Error;
}
type Eg = ConstructorParameters<ErrorConstructor>;

/**
 * @example
 * type Eg2 = [name: string, sex?: number];
 */
class People {
  constructor(public name: string, sex?: number) {}
}
type Eg2 = ConstructorParameters<typeof People>
~~~

- 当把类直接作为类型时，该类型约束的是该类型必须是类的实例；即该类型获取的是该类上的实例属性和实例方法（也叫原型方法）；
- 当把`typeof 类`作为类型时，约束的满足该类的类型；即该类型获取的是该类上的静态属性和方法
- 如果将类型定义为抽象类（抽象构造函数），则既可以赋值为抽象类，也可以赋值为普通类；而反之则不行。

### Ts compiler内部实现的类型

#### Uppercase

~~~ts
/**
 * @desc 构造一个将字符串转大写的类型
 * @example
 * type Eg1 = 'ABCD';
 */
type Eg1 = Uppercase<'abcd'>;
~~~

#### Lowercase

~~~ts
/**
 * @desc 构造一个将字符串转小大写的类型
 * @example
 * type Eg2 = 'abcd';
 */
type Eg2 = Lowercase<'ABCD'>;
~~~

#### Capitalize

~~~ts
/**
 * @desc 构造一个将字符串首字符转大写的类型
 * @example
 * type Eg3 = 'abcd';
 */
type Eg3 = Capitalize<'Abcd'>;
~~~

#### Uncapitalize

~~~ts
/**
 * @desc 构造一个将字符串首字符转小写的类型
 * @example
 * type Eg3 = 'ABCD';
 */
type Eg3 = Uncapitalize<'aBCD'>;
~~~

