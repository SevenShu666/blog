# 第八章 拦截器

拦截器是使用 `@Injectable()` 装饰器注解的类，拦截器应该实现 `NestInterceptor` 接口。

拦截器具有一系列有用的功能，这些功能受面向切面编程（AOP）技术的启发。它们可以：

- 在函数执行之前/之后绑定**额外的逻辑**
- 转换从函数返回的结果
- **转换**从函数抛出的异常
- 扩展基本函数行为
- 根据所选条件完全重写函数 (例如, 缓存目的)

## 1.统一返回格式

`common/response.ts`

```ts
import { Injectable, NestInterceptor, CallHandler } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

interface data<T> {
  data: T;
}

@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          success: true,
          message: "成功",
        };
      })
    );
  }
}
```

## 2.全局注册

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Response } from "./common/response";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Response());
  await app.listen(3000);
}
bootstrap();
```
