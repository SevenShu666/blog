# 第四章控制器

## 路由

~~~typescript
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
~~~

| @Get()    | 获取数据 |
| --------- | -------- |
| @Post()   | 创建数据 |
| @Patch()  | 更新数据 |
| @Delete() | 删除数据 |

## Request

从@nestjs/common包获取

| @Request()，@Req()      | req                             |
| ----------------------- | ------------------------------- |
| @Response()，@Res()     | res                             |
| @Next()                 | next                            |
| @Session()              | req.session                     |
| @Param(key?: string)    | req.params`/`req.params[key]    |
| @Body(key?: string)     | req.body`/`req.body[key]        |
| @Query(key?: string)    | req.query`/`req.query[key]      |
| @Headers(name?: string) | req.headers`/`req.headers[name] |
| @HttpCode               |                                 |

### 1.获取get请求传参

可以通过Request装饰器或Query装饰器

~~~typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Request, Query, Ip, Header, Headers } from '@nestjs/common';

@Get()
findOne(@Req() req) {
	console.log(req.query);
}

@Get()
findOne(@Query() query) {
	console.log(query);
}
~~~

### 2.获取post请求传参

可以通过Request装饰器或Body装饰器

~~~typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Request, Query, Ip, Header, Headers } from '@nestjs/common';

@Post()
create(@Req() req) {
	console.log(req.body);
}

@Post()
create(@Body() body) {
	console.log(body);
}
~~~

可以直接读取key

~~~typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Request, Query, Ip, Header, Headers } from '@nestjs/common';

@Post()
create(@Body("name") body) {
	console.log(body);
}
~~~

### 3.动态路由

可以通过Request装饰器或Param装饰器

~~~typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Request, Query, Ip, Header, Headers } from '@nestjs/common';

@Get(':id')
findOne (@Req() req) {
	console.log(req.params)
}

@Get(':id')
findOne (@Param() param) {
	console.log(param)
}
~~~

### 4.header信息

~~~typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Request, Query, Ip, Header, Headers } from '@nestjs/common';

@Get(':id')
findOne (@Headers() header) {
	console.log(header)
}
~~~

### 5.状态码

使用 HttpCode 装饰器 控制接口返回的状态码

~~~typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Request, Query, Ip, Header, Headers, HttpCode } from '@nestjs/common';

@Get(':id')
@HttpCode(500)
findOne (@Headers() header) {
    return {
    	code:500
    }
}

~~~

<Valine></Valine>