# 第十三章 自定义装饰器

## 1.自定义权限装饰器

生成装饰器

`nest g d [name]`，[name].decorator 文件

```ts
import { SetMetadata } from "@nestjs/common";

export const Role = (role: string[]) => {
  console.log(role, 1);
  return SetMetadata("role", role);
};
```

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
import { Role } from "./role.decorator";

@Controller("guard")
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @Role(["admin"])
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

## 2.自定义参数装饰器返回一个 url

```ts
import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
  applyDecorators,
} from "@nestjs/common";
import type { Request } from "express";

export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.url;
  }
);
```

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
import { Role, ReqUrl } from "./role.decorator";

@Controller("guard")
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @Role(["admin"])
  findAll(@ReqUrl() url) {
    console.log(url);
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
