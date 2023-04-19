# 六、函数

## 1.参数类型和返回类型

~~~ts
function createUserId(name: string, id: number): string {
  return name + id;
}
~~~

## 2.函数类型

~~~ts
let IdGenerator: (chars: string, nums: number) => string;

function createUserId(name: string, id: number): string {
  return name + id;
}

IdGenerator = createUserId;
~~~

## 3.可选参数及默认参数

~~~ts
// 可选参数
function createUserId(name: string, id: number, age?: number): string {
  return name + id;
}

// 默认参数
function createUserId(
  name: string = "semlinker",
  id: number,
  age?: number
): string {
  return name + id;
}
~~~

**在实际使用时，需要注意的是可选参数要放在普通参数的后面，不然会导致编译错误**。

## 4.剩余参数

~~~ts
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
~~~

## 5.函数重载

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。

~~~ts
type Combinable = string | number;
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
~~~

~~~ts
type Combinable = string | number;
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number, b: string): string;
  add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
}

const calculator = new Calculator();
const result = calculator.add("Semlinker", " Kakuqo");
~~~

这里需要注意的是，当 TypeScript 编译器处理函数重载时，它会查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。另外在 Calculator 类中，`add(a: Combinable, b: Combinable){ }` 并不是重载列表的一部分，因此对于 add 成员方法来说，我们只定义了四个重载方法。

