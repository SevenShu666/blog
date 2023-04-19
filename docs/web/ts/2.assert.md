# 二、断言

## 1.类型断言

当你确信某个值是什么类型，可以通过类型断言这种方式告诉编译器。

类型断言有两种形式:

**1.尖括号**

```ts
let val: any = "this is a string";
let strLen: number = (<string>val).length;
```

**2.as**

```ts
let val: any = "this is a string";
let strLen: number = (val as string).length;
```

## 2.非空断言

用于断言操作对象是非 null 和非 undefined 类型。

**1.忽略 undefined 和 null 类型**

```ts
function myFunc(maybeString: string | undefined | null) {
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```

**2.调用函数时忽略 undefined 类型**

```ts
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```

## 3.赋值断言

在实例属性和变量声明后面放置一个 `!` 号，从而告诉 TypeScript 该属性一定会被赋值。

```ts
initialize();
// ts/test.ts(4,17): error TS2454: Variable 'x' is used before being assigned.
console.log(2 * x); // Error

function initialize() {
  x = 10;
}
```

```ts
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```
