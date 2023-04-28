# VuePress

[vuepress 官网](https://vuepress.vuejs.org/zh/)

## 项目搭建

1.创建 blog 目录

```
mkdir blog
cd blog
```

2.初始化

```
npm init
```

3.将 Vuepress 安装为本地依赖，官网不推荐全局安装

> 注意
>
> 如果你的现有项目依赖了 webpack 3.x，我们推荐使用 Yarn 而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。

4.在 package.json 中, 配置命令

```json
"scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
```

> 如果热更新失效，将 vuepress dev docs 修改为 vuepressdev docs --temp .temp

5.创建 docs 目录用于放置.md 类型的文章

```
mkdir docs
```

6.在 docs 文件夹中创建.vuepress 文件夹放置相关的配置文件

```
cd docs
mkdir .vuepress
```

## 配置首页

在 docs 目录创建 REMADE.md 文档，添加首页内容

```markdown
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
  - title: 简洁至上
    details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  - title: Vue驱动
    details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
  - title: 高性能
    details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

## 配置导航栏

在 config.js 中添加

```js
module.exports = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "External", link: "https://google.com" },
    ],
  },
};
```

外部链接可以添加 target 和 rel

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: "External",
        link: "https://google.com",
        target: "_self",
        rel: "noopener noreferrer",
      },
      { text: "Guide", link: "/guide/", target: "_blank" },
    ],
  },
};
```

> 超链接 a 标签的 rel="noopener noreferrer"属性是一种新特性，它能让网站更安全，超链接添加 rel="noopener noreferrer"来防止钓鱼网站，因为它获取的 window.opener 的值为 null

通过 items 数组可以将单一跳转改为下拉列表，再嵌套 items 可以在列表内分组

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: "Languages",
        items: [
          {
            text: "Group1",
            items: [
              /*  */
            ],
          },
          {
            text: "Group2",
            items: [
              /*  */
            ],
          },
        ],
      },
    ],
  },
};
```

## 配置侧边栏

### 1.自动获取侧边栏

你想要根据当前页面标题自动生成侧边栏，可以在 config.js 中配置

```js
module.exports = {
  themeConfig: {
    sidebar: "auto",
  },
};
```

### 2.展示多个侧边栏

一个目录下可能有多个 md 文件，展示多个侧边栏

```js
module.exports = {
  themeConfig: {
    sidebar: {
      "/foo/": [
        "" /* /foo/ */,
        "one" /* /foo/one.html */,
        "two" /* /foo/two.html */,
      ],

      "/bar/": [
        "" /* /bar/ */,
        "three" /* /bar/three.html */,
        "four" /* /bar/four.html */,
      ],
      "/": [
        {
          title: "Group 1", // 必要的
          path: "/foo/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 1, // 可选的, 默认值是 1
          children: ["/"],
        },
      ],
    },
  },
};
```

### 3. 侧边栏分组

也可以通过对象来分组

```js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: "Group 1", // 必要的
        path: "/foo/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ["/"],
      },
      {
        title: "Group 2",
        children: [
          /* ... */
        ],
        initialOpenGroupIndex: -1, // 可选的, 默认值是 0
      },
    ],
  },
};
```

## 自定义布局内容

如果你想要自定义布局，需要在.vuepress 文件夹下创建 components 文件夹，在 components 下再创建 layout.vue 文件

```
<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'layout'
}
</script>
```

在 config.js 文件中

```js
plugins: [
  {
    name: "page-plugin",
    globalUIComponents: ["layout"],
  },
];
```

globalUIComponents 接受的名字就是.vue 文件名

## 配置插件

这三个是自带的，不需要安装，直接配置就可以

```
  themeConfig:{
  	lastUpdated: "Last Updated",// 最后更新时间
    plugins: [
    "@vuepress/back-to-top",// 返回顶部
    "@vuepress/active-header-links",// 菜单高亮
    ],
  }
```

## 配置评论

这里可以使用 gitTalk 和 valine，这里使用的是 valine，进入[Valine 官网](https://console.leancloud.cn/apps)，需要先注册才能使用，然后创建应用，从设置->应用凭证中可以看到**AppID**和**AppKey**

### 安装插件

```
npm install --save vuepress-plugin-comment
npm install --save valine
```

### 多页面配置

自动为所有页面添加 Valine 功能

```js
module.exports = {
  plugins: [
    [
      "vuepress-plugin-comment",
      {
        choosen: "valine",
        options: {
          el: "#valine-vuepress-comment",
          appId: "Your own appId",
          appKey: "Your own appKey",
        },
      },
    ],
  ],
};
```

### 单页面配置

需要手动动添加到你想加入评论的页面

#### config 配置

```js
plugins: [
  [
    "@vuepress/register-components",
    {
      componentsDir: "./components",
    },
  ],
];
```

### 自定义组件

在.vuepress/components 创建 Valine.vue，使用时需要在 md 文件最后加入`<Valine></Valine>`

```vue
<template>
  <section class="content">
    <div>
      <!-- id将作为查询条件 -->
      <span class="leancloud-visitors" data-flag-title="Your Article Title">
        <em class="post-meta-item-text">阅读量：</em>
        <i class="leancloud-visitors-count"></i>
      </span>
    </div>
    <h3>
      <a href="javascript:;"></a>
      评 论：
    </h3>
    <div id="vcomments"></div>
  </section>
</template>
<script>
export default {
  name: "Valine",
  mounted: function () {
    const Valine = require("valine");
    if (typeof window !== "undefined") {
      document.getElementsByClassName("leancloud-visitors")[0].id =
        window.location.pathname;
      this.window = window;
      window.AV = require("leancloud-storage");
    }

    new Valine({
      el: "#vcomments",
      appId: "yQSZoPRxSRegktqmbDe4RySR-gzGzoHsz",
      appKey: "6laUmSNffVmwOSuouSr7NtTu",
      notify: false,
      verify: false,
      path: window.location.pathname,
      visitor: true,
      avatar: "mm",
      placeholder: "write here",
    });
  },
};
</script>
<style>
.content {
  border-top: 2px solid #eaecef;
  padding-top: 1rem;
  margin-top: 2rem;
}
</style>
```

## 部署

### 创建 github 仓库

在 github 上创建一个名为 blog 的仓库, 并将代码提交到 github 上，创建一个名为 gh-pages 的分支

### 配置仓库名称

配置`docs/.vuepress/config.js`文件中的 base

```js
module.exports = {
  base: "/blog/",
};
```

### 手动部署

在项目根目录中,创建一个脚本文件`deploy.sh`，双击 deploy.sh 运行脚本，在 GitHub 项目点击 Setting 按钮，找到 GitHub Pages - Source，选择 gh-pages 分支，点击 Save 按钮后，静静地等待它部署完成即可

```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# 例如 git push -f git@github.com:starsky-future/blog.git master:gh-pages
cd -
```

### Github Actions 自动部署

#### 1.ACCESS_TOKEN 的创建

点击头像—>settings—>Developer settings—>Personal access tokens，创建的时候名称是 ACCESS_TOKEN

#### 2.将ACCESS_TOKEN配置到仓库

对应代码仓—>setting—>secrets and variables—>actions—>Repository secrets，给个名称 ACCESS_TOKEN

#### 3.创建 action

每个仓库都有一个 Actions，点进去，New workflow，创建一个后缀为.yml 的文件

#### 4.配置 deploy.yml

```yml
# This is a basic workflow to help you get started with Actions

name: Deploy GitHub Pages

# Controls when the action will run. 
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ master ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
          
      # 设置 Node
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
          
      # 生成静态文件
      - name: Build
        run: npm install && yarn build
 
      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          # 部署到 gh-pages 分支
          BRANCH: gh-pages
          # 部署目录为 VuePress 的默认输出目录，这里需要根据项目的目录进行修改
          FOLDER: docs/.vuepress/dist
```

<Valine></Valine>
