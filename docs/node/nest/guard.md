# 第十一章 守卫

守卫是一个使用 `@Injectable()` 装饰器的类。 守卫应该实现 `CanActivate` 接口。

守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。这通常称为授权。在传统的 `Express` 应用程序中，通常由中间件处理授权(以及认证)。中间件是身份验证的良好选择，因为诸如 `token` 验证或添加属性到 `request` 对象上与特定路由(及其元数据)没有强关联。

> 守卫在每个中间件之后执行，但在任何拦截器或管道之前执行。

## 1.创建守卫

`nest g gu [name]`，需要返回布尔值

```ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class GuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

## 2.Controller 使用守卫

使用`UseGuards `控制守卫

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { GuardService } from "./guard.service";
import { CreateGuardDto } from "./dto/create-guard.dto";
import { UpdateGuardDto } from "./dto/update-guard.dto";
import { RoleGuard } from "./role.guard";

@Controller("guard")
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  findAll() {
    return this.guardService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.guardService.remove(+id);
  }
}
```

## 3.全局守卫

main.ts 文件

```ts
app.useGlobalGuards(new RoleGuard());
```

## 4.针对角色控制守卫

`SetMetadata` 装饰器

第一个参数为 key，第二个参数自定义，例如数组存放权限

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
} from "@nestjs/common";
import { GuardService } from "./guard.service";
import { CreateGuardDto } from "./dto/create-guard.dto";
import { UpdateGuardDto } from "./dto/update-guard.dto";

@Controller("guard")
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @SetMetadata("role", ["admin"])
  findAll() {
    return this.guardService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.guardService.remove(+id);
  }
}
```

`guard`使用 `Reflector`反射读取 `setMetaData`的值 去做判断这边例子是从 url 判断有没有 admin 权限

```ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.Reflector.get<string[]>("role", context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    if (admin.includes(request.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
```

<Valine></Valine>
