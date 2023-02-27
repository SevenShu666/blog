# 第七章 中间件

中间件是在路由处理程序 **之前** 调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 `next()` 中间件函数。 `next()` 中间件函数通常由名为 `next` 的变量表示。

Nest 中间件实际上等价于 [express](http://expressjs.com/en/guide/using-middleware.html) 中间件。 下面是 Express 官方文档中所述的中间件功能：

中间件函数可以执行以下任务:

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求-响应周期。
- 调用堆栈中的下一个中间件函数。
- 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 `next()` 将控制传递给下一个中间件函数。否则, 请求将被挂起。

## 1.依赖注入中间件

`logger.middleware.ts`，必须调用 `next()` 将控制传递给下一个中间件函数。否则, 请求将被挂起。

```typescript
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    next();
  }
}
```

使用方法

```ts
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Logger } from "src/middleware";
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes("user");
  }
}
```

可以指定拦截的方法

```ts
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Logger } from "src/middleware";
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Logger)
      .forRoutes({ path: "user", method: RequestMethod.GET });
  }
}
```

## 2.全局中间件

全局中间件只能使用函数模式，可以做白名单拦截之类的

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const whiteList = ["/list"];

function middleWareAll(req, res, next) {
  console.log(req.originalUrl, "全局中间件");

  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send("已被拦截");
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middleWareAll);
  await app.listen(3000);
}
bootstrap();
```

## 3.第三方中间件

cors 处理跨域

```ts
npm install cors

npm install @types/cors -D
```

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
```

<Valine></Valine>
