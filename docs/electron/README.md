# Electron

[electron文档](https://www.electronjs.org/zh/docs/latest/)

[electron-vite文档](https://cn-evite.netlify.app/guide/)

[electron-build文档](https://www.electron.build/auto-update)

## 一、主进程

一个`electron`有且只有一个主进程（main文件夹下）

~~~js
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 加载 index.html
  mainWindow.loadFile('index.html')

  // 打开开发工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
~~~

## 二、主进程和渲染进程通讯

通过`contextBridge`在隔离的上下文中创建一个安全的、双向的、同步的桥梁。

通过预加载脚本将api暴露给渲染进程

~~~js
// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)
~~~

- ipcRenderer：在预加载脚本暴露给渲染进程的api，发送消息给到主进程
- ipcMain：在主进程中接收渲染进程的消息

## 三、app

控制应用程序的事件生命周期。

事件：

1. ready：当 Electron 完成初始化时，发出一次。
2. window-all-closed：当所有的窗口都被关闭时触发。
3. before-quit：在程序关闭窗口前发信号。
4. will-quit：当所有窗口被关闭后触发，同时应用程序将退出。 调用 `event.preventDefault()` 将阻止终止应用程序的默认行为。
5. quit：在应用程序退出时发出。

方法：

1. app.quit()：尝试关闭所有窗口 将首先发出 `before-quit` 事件。 如果所有窗口都已成功关闭, 则将发出 `will-quit` 事件, 并且默认情况下应用程序将终止。
2. app.hide()：隐藏所有的应用窗口，不是最小化。
3. app.show()：显示隐藏后的应用程序窗口。 不会使它们自动获得焦点。

## 四、BrowserWindow

1. `new BrowserWindow([options])`：创建并控制浏览器窗口
   1. `width` 整数型 (可选) - 窗口的宽度（以像素为单位）。 默认值为 `800`。
   2. `height` 整数型 (可选) - 窗口的高度（以像素为单位）。 默认值为 `600`。
   3. `x` Interger (可选) - (**必选** 如果使用了y) 窗口相对于屏幕左侧的偏移量。 默认值为将窗口居中。
   4. `y` Integer (可选) - (**必选** 如果使用了x) 窗口相对于屏幕顶端的偏移量。 默认值为将窗口居中。
   5. `center` boolean (可选) - 窗口是否在屏幕居中. 默认值为 `false`.
   6. `frame` boolean (可选) - 设置为 `false` 时可以创建一个[无边框窗口](https://www.electronjs.org/zh/docs/latest/tutorial/window-customization#create-frameless-windows) 默认值为 `true`。

事件：

1. close：在窗口要关闭的时候触发。 它在DOM 的`beforeunload` 和 `unload` 事件之前触发. 调用`event.preventDefault()`将阻止这个操作。
2. blur：当窗口失去焦点时触发
3. focus：当窗口获得焦点时触发
4. show：当窗口显示时触发
5. hide：当窗口隐藏时触发
6. ready-to-show：当页面已经渲染完成(但是还没有显示) 并且窗口可以被显示时触发
7. restore：当窗口从最小化状态恢复时触发
8. resize：调整窗口大小后触发
9. move：窗口移动到新位置时触发

静态方法：

1. BrowserWindow.getAllWindows()：所有打开的窗口的数组
2. BrowserWindow.getFocusedWindow()：此应用程序中当前获得焦点的窗口，如果无就返回 `null`
3. BrowserWindow.fromWebContents(webContents)：返回拥有给定 `webContents`的窗口，否则如果内容不属于一个窗口，返回`null`。
   - event.sender 返回发送消息的 webContents
4. BrowserWindow.fromBrowserView(browserView)：拥有给定 `browserView` 的窗口。 如果给定的视图没有附加到任何窗口，返回 `null`。
5. BrowserWindow.fromId(id)：带有给定 `id` 的窗口。

实例属性：

1. win.webContents：此窗口拥有的 `WebContents` 对象。 所有与网页相关的事件和操作都将通过它完成。
2. win.id：一个 `Integer` 属性代表了窗口的唯一ID。 每个ID在整个Electron应用程序的所有 `BrowserWindow` 实例中都是唯一的。

实例方法：

1. win.destroy()：强制关闭窗口, 除了`closed`之外，`close`，`unload` 和 `beforeunload` 都不会被触发
2. win.close()：尝试关闭窗口。 该方法与用户手动单击窗口的关闭按钮效果相同。 但网页可能会取消这个关闭操作。
3. win.focus()：聚焦于窗口
4. win.blur()：取消窗口的聚焦
5. win.show()：显示并聚焦于窗口
6. win.hide()：隐藏窗口
7. win.maximize()：最大化窗口
8. win.minimize()：最小化窗口

## 五、dialog

显示用于打开和保存文件、警报等的本机系统对话框。

### `dialog.showSaveDialog([browserWindow, ]options)`

- `browserWindow` [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window) (可选)
- 选项对象
  - `title` string (可选) - 对话框标题。 无法在一些 *Linux* 桌面环境中显示。
  - `defaultPath` string (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
  - `buttonLabel` string (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
  - `filters` [FileFilter\[\]](可选)
  - `message` string (可选) *macOS* -显示在对话框上的消息。
  - `nameFieldLabel` string (可选) *macOS* - 文件名输入框对应的自定义标签名。
  - `showsTagField` boolean (可选) *macOS* - 显示标签输入框，默认为 `true`。
  - properties string[]\(可选)
    - `showHiddenFiles`-显示对话框中的隐藏文件。
    - `createDirectory` *macOS* -允许你通过对话框的形式创建新的目录。
    - `treatPackageAsDirectory` *macOS* -将包 (如 `.app `文件夹) 视为目录而不是文件。
    - `showOverwriteConfirmation` *Linux* - 设置如果用户输入了已存在的文件名，是否会向用户显示确认对话框。
    - `dontAddToRecent` *Windows* - 不要将正在保存的项目添加到最近的文档列表中。
  - `securityScopedBookmarks` boolean (可选) *macOS* *MAS* - 在打包提交到Mac App Store时创建 [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) 当该选项被启用且文件尚不存在时，那么在选定的路径下将创建一个空文件。

返回 `Promise<Object>` - resolve包含以下内容的object：

- `canceled` boolean - 对话框是否被取消。
- `filePath` string (可选) - 如果对话框被取消，该值为 `undefined`。
- `bookmark` string(optional) *macOS* *MAS* - 包含了安全作用域的书签数据 Base64 编码的字符串来保存文件。 `securityScopedBookmarks` 必须启用才有效。 (返回值见 [这里的表格](https://www.electronjs.org/zh/docs/latest/api/dialog#bookmarks-array)。)

**注意：** 在macOS上，建议使用异步版本，以避免展开和折叠对话框时出现问题。

### `dialog.showMessageBox([browserWindow, ]options)`

显示一个消息框

- `browserWindow` [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window) (可选)
- 选项对象
  - `message` string - message box 的内容.
  - `type` string (可选) - 可以为 `none`, `info`, `error`, `question` 或者 `warning`. 在 Windows 上, `question` 与`info`显示相同的图标, 除非你使用了 `icon` 选项设置图标。 在 macOS 上, `warning` 和 `error` 显示相同的警告图标
  - `buttons` string[] (可选) - 按钮文本数组。 在 Windows上，一个空数组将导致按钮被标为“OK”。
  - `defaultId` Integer (可选) - 在 message box 对话框打开的时候，设置默认选中的按钮，值为在 buttons 数组中的索引.
  - `signal` AbortSignal (可选) - 通过 [AbortSignal](https://nodejs.org/api/globals.html#globals_class_abortsignal) 信号实例可选地关闭消息框，消息框的行为就像用户点击取消一样。 在 macOS, `signal` 不适用于没有父窗口的消息框。因为平台限制，这些消息框同步运行
  - `title` string (可选) - message box 的标题，一些平台不显示.
  - `detail` string (可选) - 额外信息.
  - `checkboxLabel` string (可选) - 如果使用了，消息框将包含带有给定标签的复选框。
  - `checkboxChecked` boolean (可选) - checkbox 的初始值。 默认值为 `false`
  - `icon` ([NativeImage](https://www.electronjs.org/zh/docs/latest/api/native-image) | string) (可选)
  - `textWidth` Integer (可选) *macOS* - 自定义消息框中文本的宽度
  - `cancelId` Integer (可选) - 用于取消对话框的按钮的索引，例如 `Esc` 键. 默认情况下，它被分配给第一个按钮，文字为 “cancel” 或 “no”。 如果不存在这个标签的按钮，同时该选项又未设置，返回值为`0`。
  - `noLink` boolean (可选) - 在Windows上，应用将尝试找出哪个 `buttons` 是常用按钮(例如 "Cancel" 或 "Yes")，然后在对话框中以链接命令的方式展现其它的按钮。 这可以使对话框以现代Windows应用程序的风格显示。 如果你不喜欢这个行为, 你可以设置 `noLink` 为 `true`.
  - `normalizeAccessKeys` boolean (可选) -规范跨平台的键盘访问键。 默认值为 `false`. 用 `&` 连接和转换键盘访问键, 以便它们在每个平台上正常工作.`&` 字符会在macOS上被删除，在 Linux 上会被转换为 `_`，在 Windows 上保持不变。 例如 `Vie&w` 的按钮标签在 Linux 上会被转换为 `Vie_w`，在 macOS 转换为 `View` 并且可以被选择。而Windows和Linux上表示 `Alt-W` 。

返回 `Promise<Object>` - resolve包含以下属性的promise：

- `response` number - 点击的按钮的索引。
- `checkboxChecked` boolean - 如果设置了 `checkboxLabel`，返回复选框是否被选中的状态。 否则，返回 `false`。

## 六、globalShortcut

在应用程序没有键盘焦点时，监听键盘事件，自定义快捷键。

### `globalShortcut.register(accelerator, callback)`

- `accelerator` [Accelerator](https://www.electronjs.org/zh/docs/latest/api/accelerator)

- `callback` Function

返回`boolean` - 快捷键注册是否成功

注册 `accelerator` 的全局快捷键。 当用户按下注册快捷键时， `callback` 会被调用。

如果指定的快捷键已经被其他应用程序注册掉, 调用会默默失败。 该特性由操作系统定义，因为操作系统不希望多个程序的全局快捷键互相冲突。

在 macOS 10.14 Mojave 下面，如果 app 没有被授权为[可信任使用的客户端](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)，那么下列快捷键会注册失败：

- "Media Play/Pause"
- "Media Next Track"
- "Media Previous Track"
- "Media Stop"

## 七、Menu

1. Menu.buildFromTemplate(template)：定义菜单，`template`是一个`options`类型的数组

   - ~~~js
     Menu.buildFromTemplate([
         {
           label: '退出应用',
           click: (): void => {
             app.quit();
           }
         }
       ]);
     ~~~

2. Menu.getApplicationMenu()：设置菜单

~~~js
const win = new BrowserWindow({ width: 800, height: 1500 })
const wc = win.webContents

wc.on("context-menu",e=>{
	// 右键触发自定义菜单
	contextMenu.popup()
})
~~~

## 八、Tray

添加图标和上下文菜单到系统通知区

~~~js
import { app, Tray, Menu, BrowserWindow } from 'electron';
import { resolve } from 'path';

const createTray = (win: BrowserWindow): void => {
  const tray = new Tray(resolve(__dirname, '../../resources/camera.png'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出应用',
      click: (): void => {
        app.quit();
      }
    }
  ]);

  tray.on('click', () => {
    win.isMinimized() ? win.restore() : win.minimize();
  });

  tray.setToolTip('落日摄像头');
  tray.setContextMenu(contextMenu);
};

export default createTray;
~~~

## 九、clipboard

在系统剪贴板上执行复制和粘贴操作。

方法：

1. clipboard.readText([type])：读取剪贴板中的内容(纯文本)。

   - ~~~js
     const { clipboard } = require('electron')
     
     clipboard.writeText('hello i am a bit of text!')
     
     const text = clipboard.readText()
     console.log(text)
     // hello i am a bit of text!'
     ~~~

2. clipboard.writeText(text[, type])：写入剪贴板中的内容(纯文本)。

   - ~~~js
     const { clipboard } = require('electron')
     
     const text = 'hello i am a bit of text!'
     clipboard.writeText(text)
     ~~~

3. clipboard.readHTML([type])：读取剪贴板中的内容(Html代码)。

   - ~~~js
     const { clipboard } = require('electron')
     
     clipboard.writeHTML('<b>Hi</b>')
     const html = clipboard.readHTML()
     
     console.log(html)
     // <meta charset='utf-8'><b>Hi</b>
     ~~~

4. clipboard.writeHTML(markup[, type])：写入剪贴板中的内容(Html代码)。

   - ~~~js
     const { clipboard } = require('electron')
     
     clipboard.writeHTML('<b>Hi</b>')
     ~~~

5. clipboard.readImage([type])：读取剪贴板中的图像内容。

6. clipboard.writeImage(image[, type])：写入剪贴板中的图像内容。

7. clipboard.clear([type])：清除剪贴板内容。

8. clipboard.has(format[, type])：返回 `boolean` - 剪贴板是否存在指定内容

## 十、nativeImage

### nativeImage.createFromPath(path)

从位于 `path` 的文件创建新的 `NativeImage` 实例。 如果 `path` 不存在，，无法读取或不是有效图像，方法将返回空图像, 。

~~~
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
~~~

#### `image.toPNG([options])`

- options Object (可选)
  - `scaleFactor` Number (可选) - 默认值为 1.0。

返回 `Buffer`-一个包含图像 `PNG` 编码数据的 [Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toJPEG(quality)`

- `quality` Integer - 在 0 - 100 之间

返回 `Buffer`-一个包含图像 `JPEG` 编码数据的 [Buffer ](https://nodejs.org/api/buffer.html#buffer_class_buffer)。

#### `image.toDataURL([options])`

- options Object (可选)
  - `scaleFactor` Number (可选) - 默认值为 1.0。

返回 `string` - 图像的 data URL。

#### `image.getSize([scaleFactor])`

- `scaleFactor` Number (可选) - 默认值为 1.0。

Returns [Size](https://www.electronjs.org/zh/docs/latest/api/structures/size).

如果传递了 `scaleFactor` ，将返回与图像表示最接近的传递值对应的大小。

#### `image.crop(rect)`

- `rect`[Rectangle](https://www.electronjs.org/zh/docs/latest/api/structures/rectangle)-要裁剪的图像区域.

返回 `NativeImage`-裁剪的图像。

## 使用

## 1.可拖动区域设置
-webkit-app-region: drag
会导致接收不到鼠标事件
内部不需要拖动的区域设置css
-webkit-app-region: no-drag

### 2.无边框窗口

BrowserWindow中设置
frame为false

### 3.audio

1. audio 属性
   - src 歌曲的路径
   - preload 是否在页面加载后立即加载（设置 autoplay 后无效）
   - controls 显示 audio 自带的播放控件
   - loop 音频循环
   - autoplay 音频加载后自动播放
   - currentTime 音频当前播放时间
   - duration 音频总长度
   - ended 音频是否结束
   - muted 音频静音为 true
   - volume 当前音频音量
   - readyState 音频当前的就绪状态
2. audio 事件
   - abort 当音频/视频的加载已放弃时
   - canplay 当浏览器可以播放音频/视频时
   - canplaythrough 当浏览器可在不因缓冲而停顿的情况下进行播放时
   - durationchange 当音频/视频的时长已更改时
   - emptied 当目前的播放列表为空时
   - ended 当目前的播放列表已结束时
   - error 当在音频/视频加载期间发生错误时
   - loadeddata 当浏览器已加载音频/视频的当前帧时
   - loadedmetadata 当浏览器已加载音频/视频的元数据时
   - loadstart 当浏览器开始查找音频/视频时
   - pause 当音频/视频已暂停时
   - play 当音频/视频已开始或不再暂停时
   - playing 当音频/视频在已因缓冲而暂停或停止后已就绪时
   - progress 当浏览器正在下载音频/视频时
   - ratechange 当音频/视频的播放速度已更改时
   - seeked 当用户已移动/跳跃到音频/视频中的新位置时
   - seeking 当用户开始移动/跳跃到音频/视频中的新位置时
   - stalled 当浏览器尝试获取媒体数据，但数据不可用时
   - suspend 当浏览器刻意不获取媒体数据时
   - timeupdate 当目前的播放位置已更改时
   - volumechange 当音量已更改时
   - waiting 当视频由于需要缓冲下一帧而停止

### 4.修改请求信息

session.defaultSession.webRequest.onBeforeSendHeaders

### 5.页面宽高属性

- 网页可见区域宽： document.body.clientWidth;
- 网页可见区域高： document.body.clientHeight;
- 网页可见区域宽： document.body.offsetWidth (包括边线的宽);
- 网页可见区域高： document.body.offsetHeight (包括边线的宽);
- 网页正文全文宽： document.body.scrollWidth;
- 网页正文全文高： document.body.scrollHeight;
- 网页被卷去的高： document.body.scrollTop;
- 网页被卷去的左： document.body.scrollLeft;
- 网页正文部分上： window.screenTop;
- 网页正文部分左： window.screenLeft;
- 屏幕分辨率的高： window.screen.height;
- 屏幕分辨率的宽： window.screen.width;
- 屏幕可用工作区高度： window.screen.availHeight;
- 屏幕可用工作区宽度：window.screen.availWidth;
- scrollHeight 获取对象的滚动高度。
- scrollLeft 设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离
- scrollTop 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离
- scrollWidth 获取对象的滚动宽度
- offsetHeight 获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
- offsetLeft 获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置
- offsetTop 获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
- event.clientX 相对文档的水平座标
- event.clientY 相对文档的垂直座标
- event.offsetX 相对容器的水平坐标
- event.offsetY 相对容器的垂直坐标
- document.documentElement.scrollTop 垂直方向滚动的值
- event.clientX+document.documentElement.scrollTop 相对文档的水平座标+垂直方向滚动的量

## 工具

### 1.electron-updater

~~~js
import { is } from '@electron-toolkit/utils';
import { BrowserWindow, dialog, shell } from 'electron';
import { autoUpdater } from 'electron-updater';

// 自动下载更新
autoUpdater.autoDownload = false;
// 退出时自动安装更新
autoUpdater.autoInstallOnAppQuit = false;

export default (win: BrowserWindow): void => {
  // 检查是否有更新
  if (!is.dev) autoUpdater.checkForUpdates();

  // 有新版本
  autoUpdater.on('update-available', (_info) => {
    dialog
      .showMessageBox({
        type: 'info',
        title: '更新信息',
        message: '发现新版本',
        buttons: ['现在更新', '下次一定'],
        cancelId: 1
      })
      .then((res) => {
        if (res.response == 0) {
          // 更新
          autoUpdater.downloadUpdate();
        }
      });
  });

  // 没有新版本
  autoUpdater.on('update-not-available', (_info: any) => {
    win.webContents.send('version', _info.tag);
  });

  // 更新完毕
  autoUpdater.on('update-downloaded', (_info) => {
    // 退出并安装更新
    autoUpdater.quitAndInstall();
  });

  // 更新出错
  autoUpdater.on('error', (_info) => {
    dialog
      .showMessageBox({
        type: 'error',
        title: '更新失败',
        message: '软件更新失败',
        buttons: ['发布页面下载', '取消更新'],
        cancelId: 1
      })
      .then((res) => {
        if (res.response == 0) {
          shell.openExternal('https://starrysky-future.github.io/blog/');
        }
      });
  });

  // 监听下载进度
  autoUpdater.on('download-progress', (progress) => {
    win.webContents.send('downloadProgress', progress);
  });
};
~~~

### 2.@electron-toolkit/preload

在预加载文件向渲染进程暴露方法

~~~js
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
}
~~~

#### API

##### IpcRenderer

- `send`
- `sendTo`
- `sendSync`
- `sendToHost`
- `invoke`
- `postMessage`
- `on`
- `once`
- `removeAllListeners`
- `removeListener`

##### WebFrame

- `insertCSS`
- `setZoomFactor`
- `setZoomLevel`

##### NodeProcess

- `platform` property
- `versions` property
- `env` property

### 3.@electron-toolkit/utils

主进程内使用的工具方法

####APIs

##### is

- dev
  - Type: boolean, `true` when `app.isPackaged` is `false`

##### platform

- isWindows
  - Type: boolean, `true` when `process.platform` is `win32`
- isMacOS
  - Type: boolean, `true` when `process.platform` is `darwin`
- isLinux
  - Type: boolean, `true` when `process.platform` is `linux`

##### electronApp

- setAppUserModelId

  - Type: (id: string): void

  - Platform: win32

    The `id` is used only when the applcation is packaged. otherwise use the `process.execPath` value as id. See https://www.electronjs.org/docs/latest/tutorial/notifications#windows

- setAutoLaunch

  - Type: (auto: boolean) => boolean

  - Platform: darwin,win32

    Set the app automatically open at login or not

- skipProxy

  - Type: () => Promise

  - Kind: async, sequential

    Skip proxy for Electron app

##### ipcHelper

> The Ipc helper can make you easy to manage your main Ipc.

- handle

  - Type: (channel: string, listener: (event: IpcMainInvokeEvent, ...args: any[]) => Promise | any): void
  - Kind: async, sequential

- on

  - Type: () => (channel: string, listener: (event: IpcMainEvent, ...args: any[]) => void): this

- removeAllListeners

  - Type: (): this

    Remove all register ipc listeners

- removeAllHandlers

  - Type: (): void

    Remove all register ipc handlers

- removeListeners

  - Type: (channels: string[]): this

    Remove ipc listeners

- removeHandlers

  - Type: (channels: string[]): void

    Remove ipc handlers

##### optimizer

- watchWindowShortcuts

  - Type: (window: BrowserWindow, shortcutOptions?: shortcutOptions) => void

    Default open or close DevTools by `F12` in development and ignore `CommandOrControl + R` in production. Furthermore, you can use `shortcutOptions` to control more shortcuts.

    Example:

    ```
    import { app } from 'electron'
    import { optimizer } from '@electron-toolkit/utils'
    
    app.whenReady().then(() => {
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })
    })
    ```

- registerFramelessWindowIpc

  - Type: () => void

    If use a frameless window which hide the system's native window controls, we may need to create custom window controls in HTML.

    The frameless window ipc allow the renderer process to control the browser window.

    The ipc channel named **`win:invoke`**.

    Example:

    ```
    // main.js
    import { app } from 'electron'
    import { optimizer } from '@electron-toolkit/utils'
    
    app.whenReady().then(() => {
      optimizer.registerFramelessWindowIpc()
    })
    ```

    ```
    // renderer.js or preload.js
    ipcRenderer.send('win:invoke', 'show')
    ipcRenderer.send('win:invoke', 'showInactive')
    ipcRenderer.send('win:invoke', 'min')
    ipcRenderer.send('win:invoke', 'max')
    ipcRenderer.send('win:invoke', 'close')
    ```
