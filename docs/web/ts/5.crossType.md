# 五、交叉类型

在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 `&` 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

~~~ts
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
  x: 1,
  y: 1
}
~~~

## 1.同名基础类型属性的合并

~~~ts
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string;
}

type XY = X & Y;
type YX = Y & X;

let A: XY;
let B: YX;

A = { c: 6, d: "d", e: "e" };
// 不能将类型“number”分配给类型“never”。ts(2322)

B = { c: "c", d: "d", e: "e" };
// 不能将类型“string”分配给类型“never”。ts(2322)
~~~

混入后c的类型可以是`string`类型也可以是`numer`类型，这种类型是不存在的，所有c的类型为never。

## 2.同名非基础类型属性的合并

~~~ts
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};

console.log('abc:', abc);
// abc: { x: { d: true, e: 'semlinker', f: 666 } }
~~~

在混入多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并。