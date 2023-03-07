# 第三章 RESTful 风格

## 1.接口

传统接口

http://localhost:8080/api/get_list?id=1

http://localhost:8080/api/delete_list?id=1

http://localhost:8080/api/update_list?id=1

RESTful 接口

http://localhost:8080/api/get_list/1 查询 删除 更新

一个接口完成增删改查，它是通过不同的请求方式来区分对应操作

查询 GET

提交 POST

更新 PUT PATCH

删除 DELETE

![RESTful](/blog/RESTful.png)

## 2.RESTful 版本控制

一般默认第一种，更加语义化

| `URI Versioning`        | 版本将在请求的 URI 中传递（默认） |
| ----------------------- | --------------------------------- |
| `Header Versioning`     | 自定义请求标头将指定版本          |
| `Media Type Versioning` | 请求的`Accept`标头将指定版本      |

main 文件配置

```js
import { NestFactory } from "@nestjs/core";
import { VersioningType } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(3000);
}
bootstrap();
```

controller 文件配置，可以单独配置在一个请求方式上，也可配置在整个路由上

```js
import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({
  path:"user",
  version:'1'
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @Version('1')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
```

<Valine></Valine>
