# 一、基础类型

[Typescript 中文官网](https://www.tslang.cn/docs/handbook/basic-types.html)

[Typescript官网](https://www.typescriptlang.org/zh/docs/)

[文章借鉴](https://juejin.cn/post/6872111128135073806#heading-49)

## 1.String 类型

字符串使用 string 定义

```ts
let a: string = "123";
let str: string = `dddd${a}`;
```

## 2.Number 类型

支持十六进制、十进制、八进制和二进制

```ts
let notANumber: number = NaN; //NaN
let num: number = 123; //普通数字
let infinityNumber: number = Infinity; //无穷大
let decimal: number = 6; //十进制
let hex: number = 0xf00d; //十六进制
let binary: number = 0b1010; //二进制
let octal: number = 0o744; //八进制
```

## 3.Boolean 类型

```ts
let booleand: boolean = true; //可以直接使用布尔值
let booleand2: boolean = Boolean(1); //也可以通过函数返回布尔值
```

> 注意，使用构造函数 `Boolean` 创造的对象不是布尔值

## 4.Array 类型

```ts
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
```

## 5.Enum 类型

### 1.数字枚举

```ts
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH; // 0
let dirName = Direction[0]; // NORTH
let dirVal = Direction["NORTH"]; // 0
```

默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。

也可以设置初始值

```ts
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST,
}
```

### 2.字符串枚举

```ts
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
```

### 3.异构枚举

数字和字符串的混合

```ts
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
```

### 4.常量枚举

使用`const `修饰枚举

```ts
const enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH; // 0
let dirVal = Direction["NORTH"]; // 0
```

## 6.Any 类型

任何类型都可以被归为 any 类型，any 类型可以赋值给任何类型。

```ts
let Any: any = 666;
Any = "Semlinker";
Any = false;
```

使用 any 类型会写出类型正确但是运行有问题的代码

```ts
let value: any;

value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK
```

## 7.Unknowm 类型

为了解决 any 类型带来的问题，引入了 unknown 类型，所有类型也都可以赋值给 unknown，但只能赋值给自己和 any 类型

```ts
let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

```ts
let value: unknown;

value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

## 8.Tuple 类型

需要在单个变量中存储不同类型的值，就可以使用元组。

元组是 TypeScript 中特有的类型，其工作方式类似于数组，相当于定义了长度以及值类型的数组。

```ts
let tupleType: [string, boolean];
tupleType = ["string", true];
```

```ts
let tupleType: [string, boolean];
tupleType = ["string"];
// Type '[string]' is not assignable to type '[string, boolean]'.

let tupleType: [string, boolean];
tupleType = ["string", 1];
// Type 'number' is not assignable to type 'boolean'.

let tupleType: [string, boolean];
tupleType = ["string", true];
tupleType[2];
// Tuple type '[string, boolean]' of length '2' has no element at index '2'.
```

## 9.Void 类型

`viod`表示没有任何类型，当一个函数没有返回值时，就可以设置返回值为`viod`

```ts
// 声明函数返回值为void
function voidType(): void {
  console.log("voidType");
}
```

## 10.Null 和 Undefined 类型

```ts
let u: undefined = undefined;
let n: null = null;
```

默认情况下 null 和 undefined 是所有类型的子类型，设置了**`--strictNullChecks`**，那就它们只能赋值给自己

## 11.Never 类型

`never`类型表示的是那些永不存在的值的类型。`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

## 12.Symbol 类型

```ts
const sym = Symbol();
let obj = {
  [sym]: "Symbol",
};

console.log(obj[sym]); // Symbol
```

## 13.object、Object 和{}类型

### 1.object 类型

object 类型是：TypeScript 2.2 引入的新类型，它用于表示非原始类型。

```ts
// node_modules/typescript/lib/lib.es5.d.ts
interface ObjectConstructor {
  create(o: object | null): any;
  // ...
}

const proto = {};

Object.create(proto); // OK
Object.create(null); // OK
Object.create(undefined); // Error
Object.create(1337); // Error
Object.create(true); // Error
Object.create("oops"); // Error
```

### 2.Object 类型

Object 类型：它是所有 Object 类的实例的类型，它由以下两个接口来定义：

#### Object 接口定义了 Object.prototype 原型对象上的属性；

```ts
// node_modules/typescript/lib/lib.es5.d.ts
interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}
```

#### ObjectConstructor 接口定义了 Object 类的属性。

```ts
// node_modules/typescript/lib/lib.es5.d.ts
interface ObjectConstructor {
  /** Invocation via `new` */
  new (value?: any): Object;
  /** Invocation via function calls */
  (value?: any): any;
  readonly prototype: Object;
  getPrototypeOf(o: any): any;
  // ···
}

declare var Object: ObjectConstructor;
```

### 3.{}类型

{} 类型描述了一个没有成员的对象。

访问没有成员的对象的属性会产生编译错误

```ts
// Type {}
const obj = {};

// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";
```

但是仍可以使用 Object 类型上定义的属性和方法

```ts
// Type {}
const obj = {};

// "[object Object]"
obj.toString();
```

<Valine></Valine>
