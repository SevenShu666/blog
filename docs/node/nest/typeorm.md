# typeOrm关系

[TypeORM 中文文档](https://typeorm.biunav.com/zh/)

## 前端代码

### 页面

~~~vue
<template>
  <div class="wraps">
    <div>
      <el-input v-model="search.keyWord" style="width: 300px"></el-input>
      <el-button @click="init" style="margin-left: 10px">搜索</el-button>
      <el-button @click="openDialog" type="primary" style="margin-left: 10px"
        >添加</el-button
      >
    </div>
    <el-table border :data="tableData" style="width: 100%; margin-top: 30px">
      <el-table-column prop="name" label="名字" />
      <el-table-column prop="desc" label="描述" />

      <el-table-column prop="id" label="id" />
      <el-table-column>
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button @click="deleteRow(scope.row)">删除</el-button>
          <el-button @click="(isShowTag = true), (row = scope.row)"
            >添加tag</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="change"
      style="float: right; margin-top: 10px"
      background
      layout="prev, pager, next"
      :total="total"
    />
  </div>

  <el-dialog v-model="dialogVisible" title="弹框" width="50%">
    <el-form :model="form">
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" placeholder="名称" />
      </el-form-item>
      <el-form-item prop="desc" label="描述">
        <el-input v-model="form.desc" placeholder="描述"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="save"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="isShowTag" title="添加tag">
    <el-select style="width: 100%" v-model="tags" multiple>
      <el-option value="tag1">tag1</el-option>
      <el-option value="tag2">tag2</el-option>
      <el-option value="tag3">tag3</el-option>
    </el-select>
    <template #footer>
      <el-button @click="addTa" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { addUser, updateUser, delUser, getList, addTags } from "./server";
const isShowTag = ref<boolean>(false);
const tags = ref<string[]>([]);
const total = ref<number>(0);
const row = ref<{
  id?: number;
  name?: string;
  desc?: string;
  createTime?: Date;
}>({});
const addTa = async () => {
  const res = await addTags({
    tags: tags.value,
    id: row.value.id,
  });
  isShowTag.value = false;
  tags.value = [];
};
//搜索框
const search = reactive({
  keyWord: "",
  page: 1,
  pageSize: 10,
});
//表单
const form = reactive({
  name: "",
  desc: "",
  id: 0,
});
//清空数据
const resetForm = reactive({ ...form });
//表格数据
const tableData = ref([]);
//弹框开关
const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
  Object.assign(form, resetForm);
};
//初始化表格数据
const init = async () => {
  const list = await getList(search);
  tableData.value = list?.data ?? [];
  total.value = list?.total ?? 0;
};
init();
const change = (page) => {
  search.page = page;
  init();
};
//保存 和修改 表格数据
const save = async () => {
  if (form.id) {
    await updateUser(form);
  } else {
    await addUser(form);
  }

  close();
  init();
};
//删除表格数据
const deleteRow = async (row) => {
  await delUser({ id: row.id });
  init();
};
//获取 详情
const edit = (row: any) => {
  dialogVisible.value = true;
  Object.assign(form, row);
};
//关闭弹框
const close = () => {
  dialogVisible.value = false;
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  background: #ccc;
}

.wraps {
  height: 100vh;
  padding: 30px;
}
</style>

~~~

### 接口

~~~ts
import axios from "axios";

interface Id {
  id: number;
}

interface Date extends Id {
  name: string;
  desc: string;
}

interface Search {
  keyWord: string;
  page: number;
  pageSize: number;
}

interface Tags extends Id {
  tags: string[];
}

export const addUser = (data: Date) =>
  axios.post("/api/user", data).then((res) => res.data);

export const getList = (data: Search) =>
  axios.get("/api/user", { params: data }).then((res) => res.data);

export const delUser = (data: Date) =>
  axios.delete(`/api/user/${data.id}`).then((res) => res.data);

export const updateUser = (data: Date) =>
  axios.patch(`/api/user/${data.id}`, data).then((res) => res.data);

//添加tag
export const addTags = (data: Tags) =>
  axios.post(`/api/user/add/tags`, data).then((res) => res.data);

~~~

## 后端Nestjs

### 1.新建一个tags.enity.ts

~~~ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEnity } from './user.entity';

@Entity()
export class TagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tags: string;

  @ManyToOne(() => UserEnity, (UserEnity) => UserEnity.tags)
  @JoinColumn()
  user: UserEnity;
}
~~~

### 2.module关联tag表

~~~ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEnity } from './entities/user.entity';
import { TagsEntity } from './entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEnity, TagsEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
~~~

### 3.user表跟tags表进行关联

~~~ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEnity } from './user.entity';

@Entity()
export class TagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tags: string;

  @ManyToOne(() => UserEnity, (UserEnity) => UserEnity.tags)
  @JoinColumn()
  user: UserEnity;
}
~~~

OneToMany 和 ManyToOne的用法：

- 对于用户来说一个用户可以拥有多个tag 他们的关系是一对多 **OneToMany**

- 对于tag来说他们是多个tag指定单个用户 所以是 **ManyToOne**

 **OneToMany 接受两个参数**

***\*第一个参数是个函数返回关联的类 所以在user表关联tag\****

***\*第二个参数 创建双向关系\****

**ManyToOne 用法一样**

~~~ts
@OneToMany(() => Tags, (tags) => tags.user)
~~~

### 4.Controller文件

增加addTags

~~~ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: { keyWord: string; page: number; pageSize: number }) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/add/tags')
  addTags(@Body() params: { tags: string[]; id: number }) {
    return this.userService.addTags(params);
  }
}
~~~

### 5.service

增加addTags

~~~ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnity } from './entities/user.entity';
import { TagsEntity } from './entities/tags.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEnity) private readonly user: Repository<UserEnity>,
    @InjectRepository(TagsEntity) private readonly tag: Repository<TagsEntity>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const date = new UserEnity();
    date.name = createUserDto.name;
    date.desc = createUserDto.desc;
    return this.user.save(date);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.user.find({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });

    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
    return { data, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }

  async addTags(params: { tags: string[]; id: number }) {
    const userInfo = await this.user.findOne({ where: { id: params.id } });
    const tagsList: TagsEntity[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      let T = new TagsEntity();
      T.tags = params.tags[i];
      await this.tag.save(T);
      tagsList.push(T);
    }
    userInfo.tags = tagsList;

    return this.user.save(userInfo);
  }
}
~~~

