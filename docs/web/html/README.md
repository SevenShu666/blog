# HTML 知识归纳

## 一、标准模式和兼容模式

- 标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行
- 在兼容模式中，页面以宽松的向后兼容的方式显示模拟老的浏览器防止站点无法工作

## 二、defer 和 async 的区别

相同点：这两个都是用来异步加载脚本的

区别：

1. async 属性的脚本会在下载完成后立即执行，同时会在 load 事件之前执行， 而且因为是下载完成之后立即执行，所以多个 async 的脚本不是按照顺序执行
2. defer 属性的脚本是在文档解析完成之后，DOMContentLoaded 事件之前执行，而且多个 defer 是按照原来的顺序执行的

## 三、DOMContentLoaded 和 Load 区别

- DOMContentLoaded:文档被完全加载和解析完成之后执行
- Load:页面被完全加载之后执行，也就是 html、css、js、图片等资源已经完全加载了才会触发 load 事件

## 四、html 语义化的理解

1. 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效的信息，有利于 SEO
2. 对开发者友好，使用语义标签增强了可读性，结构更加清晰，便于团队的开发和维护

## 五、link 和@import 有什么区别

1. 从属关系区别，@import 是 css 提供的语法规则，只能用于导入样式表；link 是 html 的标签，不仅可以用来加载 css 文件，也可以做其他操作，比如引入网站图标
2. 加载顺序的区别。加载页面时，link 引入的 css 被同时加载，而@import 引入的 css 会在页面加载完毕之后被加载

## 六、从浏览器地址栏输入url到显示页面的步骤

1. 在浏览器地址栏输入url
2. 浏览器去查看是否有缓存，缓存分为强缓存和协商缓存
   1. 首先检查强缓存，HTTP1.0使用的是Expires，HTTP1.1使用的是Cache-Control
   2. Expires过期时间，时间是相对于服务器时间而言，存在于服务端返回的响应头中，在这个时间过期之前都可以直接从缓存中获取数据，无需再次请求。**问题：服务器的时间和浏览器的时间可能不一致**
   3. Cache-Control过期时长，设置max-age，更高优先级
   4. 没有命中强缓存，就会去检查协商缓存，协商缓存每次都会发起请求去到服务端验证，HTTP1.0使用的Last-modified，HTTP1.1使用的是Etag
   5. Last-modified就是文件的最后的修改时间，获取数据时服务端会在响应头中添加Last-modified，浏览器在验证协商缓存时就会发起请求在请求头添加if-Modified-Since属性，属性值就是上次返回的Last-modified。服务端就会拿这个值和资源的最后修改时间做比对，如果资源没有修改，就会返回304状态码，让客户端使用本地资源，否则返回最新的资源。**Last-modified的最后修改时间只能精确到秒级，如果资源在1秒内被多次改动，那么就会导致资源修改了最后修改时间没变，导致资源命中不准确**
   6. Etag资源唯一标识，浏览器发起请求会将上次服务端返回的响应头中Etag值放入到请求头If-None-Match中，服务器拿到If-None-Match就会于资源的Etag进行比对，一致就会返回304，告诉浏览器直接使用缓存。如果不一样，就返回新的资源
3. DNS域名解析，找到真实的IP地址
4. 通过三次握手，建立起TCP连接，然后发起HTTP请求
5. 服务器接收到请求，进行解析，获取相应数据返回给浏览器
6. 浏览器接收到数据后，通过四次挥手关闭TCP连接或者保留重用
7. 如果资源可以缓存，就进行缓存
8. 浏览器进行资源解析，解析HTML文档，构建DOM树，解析css文件，构建CSSOM树。通过这两个树去构建渲染树
9. js的解析，遇到async的script，下载脚本和解析文档同时进行，下载完成就执行，没有顺序。遇到defer的script，下载脚本和解析文档同时进行，会按照在文档出现的顺序进行执行
10. 最后将渲染树渲染成屏幕的像素

## 七、前端SEO

1. 合理的title、description、keywords
2. 语义化的HTML代码
3. 重要的内容放在最前
4. 重要内容不要用js输出
5. 少用iframe
6. 非装饰图片必须加alt
7. 提高网站速度

## 八、语义化

- 让页面的内容结构化，便于浏览器、搜索引擎解析
- 在没有css情况下，也以一种文档格式显示
- 便于搜索引擎抓取，有利于SEO
- 便于维护人员阅读和理解

## 九、浏览器内核

主要分为两个部分：渲染引擎和js引擎

- 渲染引擎：负责解析网站的HTML、XML、图像等内容，对网页进行布局、样式计算、绘制等任务，最后渲染成屏幕像素展示给用户。不同的浏览器内核对网页的解析和渲染方式可能会有差异，因此不同浏览器的渲染效果也会有不同。
  - webkit：主要用于safari和chrome浏览器
  - gecko：主要用于firefox浏览器
  - Trident：主要用于旧版的IE浏览器
  - Blink：基于webkit，用于chrome、Opera
  - presto：用于之前的Opera
- js引擎：负责解析和执行网页中的js代码，实现网页的动态交互和功能。不同浏览器的 JavaScript 引擎性能和特性也可能存在差异。
  - v8：用于chrome和Opera浏览器，具有高性能和快速执行速度
  - spiderMonkey：用于firefox浏览器
  - javascriptCore：用于safari浏览器

## 十、html5

- 新增功能
  - 新增选择器：`document.querySelector`、`document.querySelectorAll`
  - 拖拽释放(`Drag and drop`)API
  - 媒体播放`video`和`audio`
  - 本地存储`localStorage`和`sessionStorage`
  - 离线应用`manifest`
  - 桌面通知`Notifications`
  - 语义化的标签`article`、`footer`、`header`、`nav`、`section`
  - 增强表单控件`calendar`、`date`、`email`、`time`、`url`、`search`
  - 地理位置`Geolocation`
  - 多任务`webworker`
  - 全双工通信协议 `websocket`
  - 历史管理`history`
  - 跨域资源共享(CORS)`Access-Control-Allow-Origin`
  - 页面可见性改变事件`visibilitychange`
  - 跨窗口通信`PostMessage`
  - `Form Data`对象
  - 绘画`canvas`
- 移除的元素
  - 纯表现元素：`basefont`、`big`、`center`、`font`、`s`、`strike`、`tt`、`u`
  - 对可用性产生负面影响的元素：`frame`、`frameset`、`noframes`

## 十一、HTML5的离线存储

- 在用户没有联网时，可以正常访问网站或应用，在用户联网时，更新用户设备上的缓存文件
- 原理：`HTML5`的离线存储是基于一个新建的.appcache文件的缓存机制，通过这个文件上的解析清单离线存储资源，这些资源会像`cookie`一样被保存下来。
- 使用
  - 页面头部加入一个`manifest`属性
  - 在`cache.manifest`文件编写离线存储的资源
  - 在离线状态时，操作`window.applicationCache`进行需求实现
- 管理：
  - 在线的情况下，浏览器发现`html`头部有`manifest`属性，它会请求`manifest`文件，如果是第一次访问`app`，那么浏览器就会根据`manifest`文件的内容下载相应的资源并进行离线存储。如果已经访问过`app`并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后会对新的`manifest`文件和旧的`manifest`文件，如果文件没有发生变化，就不做任何操作，如果文件改变了，那么就会重新下载文件中资源并离线存储。

<Valine></Valine>
