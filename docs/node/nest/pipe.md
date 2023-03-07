# 第十章 管道

管道是具有 `@Injectable()` 装饰器的类。管道应实现 `PipeTransform` 接口。

## 1.管道有两个典型的应用场景:

- **转换**：管道将输入数据转换为所需的数据输出(例如，将字符串转换为整数)
- **验证**：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常

## 2.`Nest` 自带九个开箱即用的管道，即

- `ValidationPipe`
- `ParseIntPipe`
- `ParseFloatPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`
- `ParseFilePipe`

他们从 `@nestjs/common` 包中导出。

## 3.管道转换

这确保了我们在 `findOne()` 方法中接收的参数是一个数字

```ts
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

## 4.管道验证

### 4.1 创建一个 pipe

`nest g pi [name]`，如 user 中

```ts
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```

### 4.2 安装验证器

```ts
npm i --save class-validator class-transformer
```

```ts
import { IsNotEmpty, IsString } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  name: string;

  @IsNotEmpty()
  age: number;
}
```

### 4.3 controll 使用管道和定义类型

```ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserPipe } from "./user.pipe";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(UserPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

### 4.4 实现验证 transform

value 就是 前端传过来的数据 metaData 就是元数据 通过 metatype 可以去实例化这个类，实例化 DTO，通过 validate 验证 DTO 返回一个 promise 的错误信息 如果有错误抛出

```ts
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);

    const errors = await validate(DTO);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
```

## 5.全局 DTO 验证管道

```tsx
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Response } from "./common/response";
import { HttpFilter } from "./common/filter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

<Valine></Valine>
