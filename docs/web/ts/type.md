# 四、类型别名和联合类型

## 1.联合类型

```ts
const sayHello = (name: string | undefined) => {
  /* ... */
};
```

这里的 name 可以传入 string 或 undefined

```ts
let num: 1 | 2 = 1;
type EventNames = "click" | "scroll" | "mousemove";
```

## 2.可辨识联合类型

**包含 3 个要点：可辨识、联合类型和类型守卫。**

**如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，那么就可以利用这个公共属性，来创建不同的类型保护区块。**

```ts
enum CarTransmission {
  Automatic = 200,
  Manual = 300,
}

interface Motorcycle {
  vType: "motorcycle"; // discriminant
  make: number; // year
}

interface Car {
  vType: "car"; // discriminant
  transmission: CarTransmission;
}

interface Truck {
  vType: "truck"; // discriminant
  capacity: number; // in tons
}

type Vehicle = Motorcycle | Car | Truck;

const EVALUATION_FACTOR = Math.PI;

function evaluatePrice(vehicle: Vehicle) {
  switch (vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "truck":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}

const myTruck: Truck = { vType: "truck", capacity: 9.5 };
evaluatePrice(myTruck);
```

## 3.类型别名

类型别名用来给一个类型起个新名字。

```ts
type Message = string | string[];

let greet = (message: Message) => {
  // ...
};
```
