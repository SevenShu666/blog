# 第六章 模块

模块是具有 `@Module()` 装饰器的类。 `@Module()` 装饰器提供了元数据，Nest 用它来组织应用程序结构。

`@module()` 装饰器接受一个描述模块属性的对象：

| providers   | 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享 |
| ----------- | ---------------------------------------------------------- |
| controllers | 必须创建的一组控制器                                       |
| imports     | 导入模块的列表，这些模块导出了此模块中所需提供者           |
| exports     | 由本模块提供并应在其他模块中可用的提供者的子集。           |

## 1.基本用法

通过 nest g res user 创建一个 CURD 时，nestjs 会自动在 app.module.ts 帮我们引入模块

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 2.共享模块

需要将当前模块 service 共享给其他模块使用时，需要在当前模块的 module 文件将该服务导出

```typescript
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

在需要使用的模块引入

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```typescript
import { UserService } from "./user/user.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.userService.findAll();
  }
}
```

## 3.全局模块

通过添加@Global()注册为全局模块

将 ListService 模块注册为全局模块

```typescript
import { Global, Module } from "@nestjs/common";
import { ListService } from "./list.service";
import { ListController } from "./list.controller";

@Global()
@Module({
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
```

在 user 模块使用不需要在 module 中引入

```typescript
import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { ListService } from "../list/list.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly listService: ListService
  ) {}
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.listService.findOne(+id);
  }
}
```

## 4.动态模块

动态模块主要就是为了给模块传递参数

```typescript
import { Module, DynamicModule, Global } from "@nestjs/common";

interface Options {
  path: string;
}

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: "Config",
          useValue: { baseApi: "/api" + options.path },
        },
      ],
      exports: [
        {
          provide: "Config",
          useValue: { baseApi: "/api" + options.path },
        },
      ],
    };
  }
}
```

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [UserModule, ConfigModule.forRoot({ path: "/nine" })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
