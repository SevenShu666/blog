# Vite

## 一、Vite是什么？

`Vite`是新一代的前端构建工具，其主要利用浏览器的`ESM`特性导入组织代码，在服务器端按需编译返回，完全跳过打包这个概念，服务器随其随用。生产中利用`Rollup`作为打包工具。

## 二、Vite的特点

- 快速的冷启动: `No Bundle` + `esbuild` 预构建
- 即时的模块热更新: 基于`ESM`的`HMR`，同时利用浏览器缓存策略提升速度
- 真正的按需加载: 利用浏览器`ESM`支持，实现真正的按需加载

## 三、ESM

`ESM`是`javascript`提出的官方标准化模块系统，浏览器原生支持，可以直接在浏览器中执行`import`，动态引入我们需要的模块，而不是所有模块打包在一起。

当我们在使用模块开发时，其实就是在构建一张模块依赖关系图，当模块加载时，就会从入口文件开始，最终生成完整的模块实例图。

`ESM`的执行可以分为三个步骤：

- 构建: 确定从哪里下载该模块文件、下载并将所有的文件解析为模块记录
- 实例化: 将模块记录转换为一个模块实例，为所有的模块分配内存空间，依照导出、导入语句把模块指向对应的内存地址。
- 运行：运行代码，将内存空间填充

## 四、Esbuild

[官方文档](https://esbuild.github.io/)

`Vite`底层使用`Esbuild`对`.ts`、`.jsx`、`.js`代码文件的转化。

`Esbuild`是一个打包和压缩工具，它提供了和`webpack`、`Rollup`等工具相似的资源打包能力，打包速度是其他工具的10~100倍。

目前支持的功能：

- 加载器
- 压缩
- 打包
- `Tree shaking`
- `Source map`生成

`esbuild`总共提供了四个函数：`transform`、`build`、`buildSync`、`Service`

## 五、Rollup

在生产环境下，`Vite`使用`Rollup`来进行打包

在生产环境，由于嵌套导入会导致发送大量的网络请求，即使使用HTTP2.x（多路复用、首部压缩），在生产环境中发布未打包的ESM仍然性能低下。因此，对比在开发环境`Vite`使用`esbuild`来构建依赖，生产环境`Vite`则使用了更加成熟的Rollup来完成整个打包过程。因为`esbuild`虽然快，但针对应用级别的代码分割、CSS处理仍然不够稳定，同时也未能兼容一些未提供ESM的SDK。

`Rollup`是基于`ESM`的`JavaScript`打包工具。相比于其他打包工具如`Webpack`，他总是能打出更小、更快的包。因为 `Rollup` 基于 `ESM` 模块，比 `Webpack` 和 `Browserify` 使用的 `CommonJS`模块机制更高效。`Rollup`的亮点在于同一个地方，一次性加载。能针对源码进行 `Tree Shaking`(去除那些已被定义但没被使用的代码)，以及 `Scope Hoisting` 以减小输出文件大小提升运行性能。

`Rollup`分为`build`（构建）阶段和`output generate`（输出生成）阶段。主要过程如下：

- 获取入口文件的内容，包装成`module`，生成抽象语法树
- 对入口文件抽象语法树进行依赖解析
- 生成最终代码
- 写入目标文件

## 六、核心原理

`Vite`其核心原理是利用浏览器现在已经支持`ES6`的`import`,碰见`import`就会发送一个`HTTP`请求去加载文件，`Vite`启动一个 `koa` 服务器拦截这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再以`ESM`格式返回返回给浏览器。`Vite`整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的`webpack`开发编译速度快出许多！

## 七、HMR热更新

主要是通过`WebSocket`创建浏览器和服务器的通信监听文件的改变，当文件被修改时，服务端发送消息通知客户端修改相应的代码，客户端对应不同的文件进行不同的操作的更新。

## 八、优化：浏览器的缓存策略提高响应速度

`Vite` 利用`HTTP`加速整个页面的重新加载。设置响应头使得依赖模块(`dependency module`)进行强缓存，而源码文件通过设置 `304 Not Modified` 而变成可依据条件而进行更新。

若需要对依赖代码模块做改动可手动操作使缓存失效:

```text
vite --force
```

或者手动删除 `node_modules/.``vite` 中的缓存文件。

## 九、Tree Shaking

分为三个阶段：

1. make阶段：收集模块导出变量并记录到模块依赖关系图中
2. seal阶段：遍历模块依赖关系图标记模块导出变量有没有被使用
3. 生成代码阶段：使用DCE工具删除Dead Code

Dead Code

- 代码不会被执行，不可到达
- 代码的执行结果不会被用到
- 代码只会影响到死变量（只写不读）

## 十、vite.config

### 1.修改文件输出名

~~~js
export default defineConfig(({ command, mode }) => {
	return {
		build: {
			outDir: "build",
		}
	}
}
~~~

### 2.生产环境去除console

~~~js
export default defineConfig(({ command, mode }) => {
	const config = loadEnv(mode, __dirname);

	return {
		build: {
			terserOptions: {
              compress: {
                drop_console: command === "build" && config.VITE_ENV === "prod",
                drop_debugger: command === "build" && config.VITE_ENV === "prod",
              },
            },
		}
	}
}
~~~

### 3.alias别名设置

tsconfig.json

~~~js
{
	"compilerOptions":{
		"baseUrl": ".",
        "paths": {
          "@/*":["src/*"],
          "@api/*":["src/api/*"]
        }
	}
	"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx"],
  	"exclude": ["node_modules","dist"]
}
~~~

vite.config.ts

~~~js
export default defineConfig(({ command, mode }) => {

	return {
		resolve: {
          alias: [
            { find: "@", replacement: path.resolve(__dirname, "src") },
            { find: "@api", replacement: path.resolve(__dirname, "src/api") },
          ],
        },
	}
}
~~~

### 4.环境变量配置

package.json，在同目录先创建`.env.development`和`.env.production`文件内部变量以**VITE_**开头，如`VITE_ENV="dev"`

~~~js
"scripts": {
    "dev": "vite --mode development",
    "build": "tsc -b && vite build --mode production",
    "lint": "eslint .",
    "preview": "vite preview"
}
~~~

### 5.开发环境代理设置

~~~js
export default defineConfig(({ command, mode }) => {
	const config = loadEnv(mode, __dirname);

	return {
		 server: {
          open: true,
          proxy: {
            "^/api": {
              target: config.VITE_TARGET, // 从环境变量中获取
              changeOrigin: true /* 允许跨域 */,
              rewrite: (path) => path.replace(/^\/api/, ""),
            },
          },
        }
	}
}
~~~

