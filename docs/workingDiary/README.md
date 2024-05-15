# 问题记录

## 一.前端问题

### 1.calc 不生效问题

在 less 中使用 calc，calc 需要加上~和引号，如：`clac(~"100vw - 14px")`

### 2.ios 时间 NaN

1. 时间格式为 2022-07-14,ios 中时间转换识别不了“-”需要将格式转为“/”，如：2022/07/14
2. 关于时间临界值：对于 00:00:00 和 24:00:00 这两个时间临界值, ios 会转成 NAN
3. 时间格式为 2022/07（年月）,这种在 ios 用 new Date 转换也会变成 NaN，需要补全日期

### 3.replaceAll 方法

低版本手机不支持 replaceAll 方法

### 4.eventBus事件多次触发

eventBus.on注册的页面作为模块多次复用会导致eventBus.emit时注册事件多次触发，如果需要事件只触发一次，可以将事件注册为全局唯一事件

![eventBus注册唯一事件](/blog/workingDiary/frontEnd/error_eventbus_multiple.png)

### 5.vue3的css使用js中变量出现undefined

![error_css_var_undefined_web](/blog/workingDiary/frontEnd/error_css_var_undefined_web.png)

![error_css_var_undefined_code](/blog/workingDiary/frontEnd/error_css_var_undefined_code.png)

vue3在css中引用js中的变量，找不到变量，原因是组件通过Teleport挂载到app元素下导致，改为在内联样式style中使用变量

### 6.eslint行首尾的cr警告

行首尾的cr警告，设置prettierrc文件endOfLine: auto

![error_endOfLine](/blog/workingDiary/eslint/error_endOfLine.png)

### 7.selint开启行尾分号

开启行尾分号在prettierrc文件加入semi: true

![error_semi](/blog/workingDiary/eslint/error_semi.png)

### 8.store使用时pinia还未注册

![error_no_active_pinia](/blog/workingDiary/frontEnd/error_no_active_pinia.png)

store使用时pinia实例可能还没有注册给app，因此需要在使用store的地方手动给store注入pinia实例，例：const setStore = useSetStore(pinia);

## 二.electron问题

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

### 5.vite-plugin-node-polyfills

加入node中的模块，如：crypto

### 6.跨域警告

```
webPreferences:{
	webSecurity:false
}
```

![error_webSecurity](/blog/workingDiary/electron/error_webSecurity.png)

electron开启跨域警告，在vite.config文件配置process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'消除警告;

### 7.electron的hover样式bug

electron的hover样式bug：在最小化后再打开app发现最小化按钮的hover样式还存在着，使用动态加载hover，在最小化时去除hover样式，然后监听最小化按钮的鼠标移动事件动态加入hover

```vue
<div
      ref=""minDom""
      class=""min icon_position""
      :class=""{ minHover: hasHover }""
      @click=""changeWinState('min')""
    >
</div>
```

```vue
<script lang=""ts"" setup>
import { ref, VNodeRef } from 'vue';
const hasHover = ref<boolean>(true);
const minDom = ref<VNodeRef | null>(null);
const changeWinState = (operate: string): void => {
  if (operate === 'min') {
    hasHover.value = false;

    minDom.value.addEventListener('mousemove', () => {
      hasHover.value = true;
      minDom.value.removeEventListener('mousemove', () => {});
    });
  }

  window.api![operate]();
};
</script>
```

## 三.github Action问题

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

### 6. C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\Bin\makensis.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE

```
⨯ C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\Bin\makensis.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE
Exit code:
1
Output:
Command line defined: "APP_ID=com.electron.app"
Command line defined: "APP_GUID=f8941786-352c-5c22-bea5-7886c3ac4a8f"
Command line defined: "UNINSTALL_APP_KEY=f8941786-352c-5c22-bea5-7886c3ac4a8f"
Command line defined: "PRODUCT_NAME=starrysky-music"
Command line defined: "PRODUCT_FILENAME=starrysky-music"
Command line defined: "APP_FILENAME=starrysky-music"
Command line defined: "APP_DESCRIPTION=??????"
Command line defined: "VERSION=1.0.0"
Command line defined: "PROJECT_DIR=D:\a\starrysky-music-desktop\starrysky-music-desktop"
Command line defined: "BUILD_RESOURCES_DIR=D:\a\starrysky-music-desktop\starrysky-music-desktop\build"
Command line defined: "APP_PACKAGE_NAME=starrysky-music-desktop"
Command line defined: "MUI_ICON=D:\a\starrysky-music-desktop\starrysky-music-desktop\resources\icon.ico"
Command line defined: "MUI_UNICON=D:\a\starrysky-music-desktop\starrysky-music-desktop\resources\icon.ico"
Command line defined: "APP_64=D:\a\starrysky-music-desktop\starrysky-music-desktop\dist\starrysky-music-desktop-1.0.0-x64.nsis.7z"
Command line defined: "APP_64_NAME=starrysky-music-desktop-1.0.0-x64.nsis.7z"
Command line defined: "APP_64_HASH=669243A0ED8C749B8E003F23EF44136096E315E9037BAF26A2ADEDDAC7E62F95A05AE04AA229650CC603FC614C1E792C036A54C4968A8DB40802336D6132B8B2"
Command line defined: "APP_64_UNPACKED_SIZE=343317"
Command line defined: "COMPANY_NAME=seven"
Command line defined: "APP_INSTALLER_STORE_FILE=starrysky-music-desktop-updater\installer.exe"
Command line defined: "COMPRESSION_METHOD=7z"
Command line defined: "MULTIUSER_INSTALLMODE_ALLOW_ELEVATION"
Command line defined: "INSTALL_MODE_PER_ALL_USERS_REQUIRED"
Command line defined: "allowToChangeInstallationDirectory"
Command line defined: "SHORTCUT_NAME=starrysky-music"
Command line defined: "UNINSTALL_DISPLAY_NAME=starrysky-music"
Command line defined: "RECREATE_DESKTOP_SHORTCUT"
Command line defined: "MUI_WELCOMEFINISHPAGE_BITMAP=${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp"
Command line defined: "MUI_UNWELCOMEFINISHPAGE_BITMAP=${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp"
Command line defined: "ESTIMATED_SIZE=343317"
Command line defined: "COMPRESS=auto"
Command line defined: "BUILD_UNINSTALLER"
Command line defined: "UNINSTALLER_OUT_FILE=D:\a\starrysky-music-desktop\starrysky-music-desktop\dist\__uninstaller-nsis-starrysky-music-desktop.exe"
Processing config: C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\nsisconf.nsh
Processing script file: "<stdin>" (UTF8)

Error output:
!include: could not open file: "D:\a\starrysky-music-desktop\starrysky-music-desktop\node_modules\.pnpm\app-builder-lib@24.13.3_dmg-builder@24.13.3_electron-builder-squirrel-windows@24.13.3_dmg-bui_lrspnoputfiosacwyigcypdbdi\node_modules\app-builder-lib\templates\nsis\include\allowOnlyOneInstallerInstance.nsh"
Error in script "<stdin>" on line 88 -- aborting creation process
  failedTask=build stackTrace=Error: C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\Bin\makensis.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE
Exit code:
1
Output:
Command line defined: "APP_ID=com.electron.app"
Command line defined: "APP_GUID=f8941786-352c-5c22-bea5-7886c3ac4a8f"
Command line defined: "UNINSTALL_APP_KEY=f8941786-352c-5c22-bea5-7886c3ac4a8f"
Command line defined: "PRODUCT_NAME=starrysky-music"
Command line defined: "PRODUCT_FILENAME=starrysky-music"
Command line defined: "APP_FILENAME=starrysky-music"
Command line defined: "APP_DESCRIPTION=??????"
Command line defined: "VERSION=1.0.0"
Command line defined: "PROJECT_DIR=D:\a\starrysky-music-desktop\starrysky-music-desktop"
Command line defined: "BUILD_RESOURCES_DIR=D:\a\starrysky-music-desktop\starrysky-music-desktop\build"
Command line defined: "APP_PACKAGE_NAME=starrysky-music-desktop"
Command line defined: "MUI_ICON=D:\a\starrysky-music-desktop\starrysky-music-desktop\resources\icon.ico"
Command line defined: "MUI_UNICON=D:\a\starrysky-music-desktop\starrysky-music-desktop\resources\icon.ico"
Command line defined: "APP_64=D:\a\starrysky-music-desktop\starrysky-music-desktop\dist\starrysky-music-desktop-1.0.0-x64.nsis.7z"
Command line defined: "APP_64_NAME=starrysky-music-desktop-1.0.0-x64.nsis.7z"
Command line defined: "APP_64_HASH=669243A0ED8C749B8E003F23EF44136096E315E9037BAF26A2ADEDDAC7E62F95A05AE04AA229650CC603FC614C1E792C036A54C4968A8DB40802336D6132B8B2"
Command line defined: "APP_64_UNPACKED_SIZE=343317"
Command line defined: "COMPANY_NAME=seven"
Command line defined: "APP_INSTALLER_STORE_FILE=starrysky-music-desktop-updater\installer.exe"
Command line defined: "COMPRESSION_METHOD=7z"
Command line defined: "MULTIUSER_INSTALLMODE_ALLOW_ELEVATION"
Command line defined: "INSTALL_MODE_PER_ALL_USERS_REQUIRED"
Command line defined: "allowToChangeInstallationDirectory"
Command line defined: "SHORTCUT_NAME=starrysky-music"
Command line defined: "UNINSTALL_DISPLAY_NAME=starrysky-music"
Command line defined: "RECREATE_DESKTOP_SHORTCUT"
Command line defined: "MUI_WELCOMEFINISHPAGE_BITMAP=${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp"
Command line defined: "MUI_UNWELCOMEFINISHPAGE_BITMAP=${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp"
Command line defined: "ESTIMATED_SIZE=343317"
Command line defined: "COMPRESS=auto"
Command line defined: "BUILD_UNINSTALLER"
Command line defined: "UNINSTALLER_OUT_FILE=D:\a\starrysky-music-desktop\starrysky-music-desktop\dist\__uninstaller-nsis-starrysky-music-desktop.exe"
Processing config: C:\Users\runneradmin\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.1\nsisconf.nsh
Processing script file: "<stdin>" (UTF8)
                                                                        Error output:
!include: could not open file: "D:\a\starrysky-music-desktop\starrysky-music-desktop\node_modules\.pnpm\app-builder-lib@24.13.3_dmg-builder@24.13.3_electron-builder-squirrel-windows@24.13.3_dmg-bui_lrspnoputfiosacwyigcypdbdi\node_modules\app-builder-lib\templates\nsis\include\allowOnlyOneInstallerInstance.nsh"
Error in script "<stdin>" on line 88 -- aborting creation process
                                                                        at ChildProcess.<anonymous> (D:\a\starrysky-music-desktop\starrysky-music-desktop\node_modules\.pnpm\builder-util@24.13.1\node_modules\builder-util\src\util.ts:252:14)
    at Object.onceWrapper (node:events:632:26)
    at ChildProcess.emit (node:events:517:28)
    at ChildProcess.cp.emit (D:\a\starrysky-music-desktop\starrysky-music-desktop\node_modules\.pnpm\cross-spawn@7.0.3\node_modules\cross-spawn\lib\enoent.js:34:29)
    at maybeClose (node:internal/child_process:1098:16)
    at Process.ChildProcess._handle.onexit (node:internal/child_process:303:5)
 ELIFECYCLE  Command failed with exit code 1.
Error: Process completed with exit code 1.
```

升级 electron 30 后 electron-builder 需要降级到 24.9.1，这个冲突只影响 action, 本地构建没事，将electron-builder锁定24.9.1。

<Valine></Valine>
