# 问题记录

## 1.前端问题

### 1.calc 不生效问题

在 less 中使用 calc，calc 需要加上~和引号，如：`clac(~"100vw - 14px")`

### 2.ios 时间 NaN

1. 时间格式为 2022-07-14,ios 中时间转换识别不了“-”需要将格式转为“/”，如：2022/07/14
2. 关于时间临界值：对于 00:00:00 和 24:00:00 这两个时间临界值, ios 会转成 NAN
3. 时间格式为 2022/07（年月）,这种在 ios 用 new Date 转换也会变成 NaN，需要补全日期

### 3.replaceAll 方法

低版本手机不支持 replaceAll 方法

## 2.github Action问题

[github文档](https://docs.github.com/zh/actions/quickstart)

### 1.工作流：digital envelope routines::unsupported

~~~yml
[info] [webpackbar] Compiling Client
[info] [webpackbar] Compiling Server
/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:114
			throw e;
			^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (/home/runner/work/blog/blog/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:471:10)
    at /home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:503:5
    at /home/runner/work/blog/blog/node_modules/webpack/lib/NormalModule.js:358:12
    at /home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at iterateNormalLoaders (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:221:10)
    at /home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:236:3
    at context.callback (/home/runner/work/blog/blog/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at /home/runner/work/blog/blog/node_modules/cache-loader/dist/index.js:134:7
    at /home/runner/work/blog/blog/node_modules/graceful-fs/graceful-fs.js:61:14
    at FSReqCallback.oncomplete (node:fs:198:23) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v18.15.0
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
Error: Process completed with exit code 1.
~~~

node版本过高，deploy.yml文件设置node的版本

~~~yml
# 设置 Node
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
~~~

### 2.工作流release：创建release失败

~~~yml
Run softprops/action-gh-release@v1
  with:
    files: dist/**
    token: ***
  env:
    GITHUB_TOKEN: 
⚠️ Unexpected error fetching GitHub release for tag refs/tags/v1.0.0: HttpError: Resource not accessible by integration
Error: Resource not accessible by integration
~~~

需要根据没有的tags创建release

### 3.工作流Cleanup artifacts for windows：删除文件失败

~~~yml
Run npx del-cli "dist/!(*.exe|*.dmg|latest*.yml)"
  npx del-cli "dist/!(*.exe|*.dmg|latest*.yml)"
  shell: C:\Program Files\PowerShell\7\pwsh.EXE -command ". '{0}'"
'*.dmg' is not recognized as an internal or external command,
operable program or batch file.
Error: Process completed with exit code 1.
~~~

需要在项目内安装del-cli，package.json文件

### 4.工作流release：创建release 403

~~~
Run softprops/action-gh-release@v1
  with:
    files: dist/**
    token: ***
  env:
    GITHUB_TOKEN: 
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 403
undefined
retrying... (2 retries remaining)
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 403
undefined
retrying... (1 retries remaining)
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 403
undefined
retrying... (0 retries remaining)
❌ Too many retries. Aborting...
Error: Too many retries.
~~~

没有将ACCESS_TOKEN放入到项目的设置中

### 5.工作流release：创建release 404

~~~
Run softprops/action-gh-release@v1
  with:
    files: dist/**
    token: ***
  env:
    GITHUB_TOKEN: ***
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 404
undefined
retrying... (2 retries remaining)
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 404
undefined
retrying... (1 retries remaining)
👩‍🏭 Creating new GitHub release for tag v1.0.0...
⚠️ GitHub release failed with status: 404
undefined
retrying... (0 retries remaining)
❌ Too many retries. Aborting...
Error: Too many retries.
~~~

将ACCESS_TOKEN的workflow选项选上

## 3.electron问题

### 1.无法收到鼠标事件（window）

如果当前元素或上级元素设置了-webkit-app-region：drag进行拖拽支持，那么就是导致当前元素无法收到鼠标事件

需要在当前元素设置-[webkit](https://so.csdn.net/so/search?q=webkit&spm=1001.2101.3001.7020)-app-region: no-drag进行解决

### 2.打包报错'window.api' is of type 'unknown'

需要在renderer下的env.d.ts中去声明

~~~ts
declare global {
  interface Window {
    electron: ElectronAPI;
    api: any;
  }
}
~~~

### 3.background-image图片不显示

触发内容安全策略

~~~js
Refused to load the image 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAYnSURBVGiB1ZpPbxvHGcZ/s1wulxRlaXcRNU4F1aUpFYLhwIGDFL24hwIBAufQqh8iOrbuzQoMoUDcU50e6y+h5AsECHxpAwSIEcMQSkpMIreJoXaXpGSJ/5Y7PZCidpekOMswQfIAA3J25nne950/OzO7K7gA7z99cQMpN5DiFsh1YOmi+jPEIYhdhHyEEDt/vJZ/PK6iGHXxwefedaHp28DGd+RgUuzIwN++86r9JF4wFMDfntbeCeDv01hxgyqu9HBldZAHcDSr9yssHGEP8kmhweYfri0+DF+LBPDgqXcXId5LKlzyK5S6FeX6jmaxlipMF4iUW3eu2ffPsoMA/rrrvSOmaPmSX6Hkf5HcEfqB6D9PHIiEzT+t2w+hH8CD3efXQf88iUjJ/4KS/...71Rb9OZ6TjZ5rT+CL+Uv94qpt5tdFhv3ZCtdGZhj6AlU3z+uWkj9bPoSOCQylF4pd3i1mdm9kFKtVTKtXTqYwXrBwFK5dozIchhDzUpWAXgqnfPhZsEyubolJtKvdGwcoOuEnHfBhSiF1dEDySgl9PrQJYOZ2buTwA1YZPxWtQbfiROj1noWCH91TfbisikI+0QAQ7g5VvBsnKpbi5nB8yVnBMCo45MzsISSCCHW0r/+ZjhNyRImCWKY6Z6wu5s5V/87EO4MvOdkpLJXqp/dG/4k/iJtQvXfzg9ze/SLYQ+oG/DaAB3MvffiI0udmbUKpp1lC3LTS5eS9/+8kgAIC75lsPpQi2lMfgrKFoV4pg66751uBtvRbWeDf79n0h2PyhBiAEm+9m374foY3S+nPrw+sptG35A/nYQ8BOl2D7Xua3kz/2COO99gc3ENoGklsSuQ7JV+zpIA8FYhfBI2Sws2X8buznNv8HRQ7I8Ouz4V4AAAAASUVORK5CYII=' because it violates the following Content Security Policy directive: "default-src 'self'". Note that 'img-src' was not explicitly set, so 'default-src' is used as a fallback.
~~~

设置img-src包含data:内容

~~~js
<meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';img-src 'self' data:"
    />
~~~

| 策略指令        | 策略说明                                                     |
| :-------------- | :----------------------------------------------------------- |
| default-src     | 默认加载策略                                                 |
| script-src      | 外部脚本                                                     |
| style-src       | 样式表                                                       |
| img-src         | 图像                                                         |
| media-src       | 媒体文件（音频和视频）                                       |
| font-src        | 字体文件                                                     |
| object-src      | 插件（比如 Flash）                                           |
| child-src       | 框架                                                         |
| frame-ancestors | 嵌入的外部资源（比如`<iframe>`、`<iframe>`、`<embed>`和`<applet>`） |
| connect-src     | HTTP 连接（通过 XHR、WebSockets、EventSource等）             |
| worker-src      | worker脚本                                                   |
| manifest-src    | manifest 文件                                                |

| 指令值                                                       | 指令值说明                                                   |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| *                                                            | 允许任何内容                                                 |
| ‘none’                                                       | 不允许任何内容                                               |
| ‘self’                                                       | 允许来自相同来源的内容（相同的协议、域名和端口）             |
| data:                                                        | 允许 data: 协议（如 base64 编码的图片）                      |
| 例子：[www.Google.com](https://link.juejin.im/?target=http%3A%2F%2Fwww.Google.com) | 允许加载指定域名的资源                                       |
| *.Google.com                                                 | 允许加载 [Google.com](https://link.juejin.im/?target=http%3A%2F%2FGoogle.com) 任何子域的资源 |
| ‘unsafe-inline’                                              | 允许使用内联资源,如内联的 `<script>` 元素、javascript: URL、内联的事件处理函数和内联的 `<style>` 元素.两侧单引号是必须的. |
| ‘unsafe-eval’                                                | 允许使用`eval()`等通过字符串创建代码的方法。两侧单引号是必须的。 |

### 4.electron自定义安装路径

[electon-builder文档](https://www.electron.build/configuration/nsis)

allowToChangeInstallationDirectory = `false`：允许改变安装路径，默认false

开启需要将oneClick设置为false

~~~yml
nsis:
	oneClick:false
	allowToChangeInstallationDirectory:true
~~~

<Valine></Valine>
