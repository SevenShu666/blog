# 第十四章 连接数据库

## 1.安装 mysql

[mysql 官网](https://downloads.mysql.com/archives/installer/)
![mysql](/blog/mysql_database.webp)

## 2.安装 mysql

**这里选择是自定义安装，所以直接选择“Custom”，点击“Next”**

“Developer Default”是开发者默认

“Server only”仅作为服务器安装

“Client only”仅作为客户端安装

“Full”是完整安装

“Custom”是自定义安装

![mysql](/blog/mysql_custom.webp)

### 2.1 选择安装的产品和功能

依次点开“MySQL Servers”、“MySQL Servers”、“MySQL Servers 8.0”、“MySQL Servers 8.0.31 -64”，然后点击绿色箭头将选中的版本移植到右边选中框中

### 2.2 安装选项

先选中“MySQL Server 8.0.31” ，之后点击下方的蓝色“Advanced Options

### 2.3 自定义选项

Install Directory:安装路径

Data Directory:数据存放路径

## 3.ORM 框架（typeOrm）

```
npm install --save @nestjs/typeorm typeorm mysql2
```

使用数据可视化工具 DBeaver 新建一个库

在 app.module.ts 注册

```ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListModule } from "./list/list.module";
import { GuardModule } from "./guard/guard.module";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      username: "root",
      password: "******",
      host: "localhost",
      port: 3306,
      database: "lantian",
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true,
    }),
    ListModule,
    GuardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts
    TypeOrmModule.forRoot({
      type: "mysql", //数据库类型
      username: "root", //账号
      password: "123456", //密码
      host: "localhost", //host
      port: 3306, //
      database: "portal", //库名
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize:true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay:500, //重试连接数据库间隔
      retryAttempts:10,//重试连接数据库的次数
      autoLoadEntities:true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
```

定义实体

src/user/entities/user.entity.ts

```ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  desc: string;
}
```

关联实体

src/user/user.module.ts

```ts
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```
