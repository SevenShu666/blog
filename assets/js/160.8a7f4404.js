(window.webpackJsonp=window.webpackJsonp||[]).push([[160],{436:function(t,s,a){"use strict";a.r(s);var n=a(10),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"动静分离"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动静分离"}},[t._v("#")]),t._v(" 动静分离")]),t._v(" "),s("p",[t._v("动静分离是一种在Web服务器架构中常用的优化技术，旨在提高网站的性能和可伸缩性。它基于一个简单的原则：将动态生成的内容（如动态网页、API请求）与静态资源（如HTML、CSS、JavaScript、图像文件）分开处理和分发。")]),t._v(" "),s("p",[t._v("通过将动态内容和静态资源存储在不同的服务器或服务上，并使用不同的处理机制，可以提高网站的处理效率和响应速度。这种分离的好处包括：")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("性能优化：将静态资源与动态内容分离可以提高网站的加载速度。由于静态资源往往是不变的，可以使用缓存机制将其存储在CDN（内容分发网络）或浏览器缓存中，从而减少网络请求和数据传输的开销。")])]),t._v(" "),s("li",[s("p",[t._v("负载均衡：通过将动态请求分发到不同的服务器或服务上，可以平衡服务器的负载，提高整个系统的可伸缩性和容错性。")])]),t._v(" "),s("li",[s("p",[t._v("安全性：将动态请求与静态资源分开处理可以提高系统的安全性。静态资源通常是公开可访问的，而动态请求可能涉及敏感数据或需要特定的身份验证和授权。通过将静态资源与动态内容分离，可以更好地管理访问控制和安全策略。")])])]),t._v(" "),s("p",[t._v("实现动静分离的方法")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("使用反向代理服务器（如Nginx、Apache）将静态请求和动态请求转发到不同的后端服务器或服务。")])]),t._v(" "),s("li",[s("p",[t._v("将静态资源部署到CDN上，通过CDN分发静态资源，减轻源服务器的负载。")])]),t._v(" "),s("li",[s("p",[t._v("使用专门的静态文件服务器（如Amazon S3、Google Cloud Storage）存储和提供静态资源，而将动态请求交给应用服务器处理。")])])]),t._v(" "),s("h2",{attrs:{id:"代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码"}},[t._v("#")]),t._v(" 代码")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" http "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'node:http'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入http模块")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" fs "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'node:fs'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入文件系统模块")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'node:path'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入路径处理模块")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" mime "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mime'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 导入mime模块")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" server "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" http"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createServer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" method "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" req\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理静态资源")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("method "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("startsWith")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/static'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" filePath "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("process"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cwd")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取文件路径")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mimeType "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getType")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filePath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取文件的MIME类型")]),t._v("\n        console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("mimeType"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 打印MIME类型")]),t._v("\n\n        fs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("readFile")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("filePath"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 读取文件内容")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeHead")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("404")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Content-Type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"text/plain"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置响应头为纯文本类型")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'not found'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回404 Not Found")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeHead")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Content-Type"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" mimeType"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置响应头为对应的MIME类型")]),t._v("\n                    "),s("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"Cache-Control"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"public, max-age=3600"')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置缓存控制头")]),t._v("\n                "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                res"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 返回文件内容")]),t._v("\n            "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理动态资源")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("method "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" method "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'POST'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("startsWith")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/api'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...处理动态资源的逻辑")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nserver"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("listen")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 监听端口80")]),t._v("\n")])])]),s("h2",{attrs:{id:"常见mime类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见mime类型"}},[t._v("#")]),t._v(" 常见mime类型")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   文本文件：\n\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("plain：纯文本文件\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("html："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HTML")]),t._v(" 文件\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("css："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("CSS")]),t._v(" 样式表文件\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("javascript：JavaScript 文件\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   application"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("json："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),t._v(" 数据\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   图像文件：\n\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   image"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("jpeg："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JPEG")]),t._v(" 图像\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   image"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("png："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PNG")]),t._v(" 图像\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   image"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("gif："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("GIF")]),t._v(" 图像\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   image"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("svg"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v("xml："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("SVG")]),t._v(" 图像\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   音频文件：\n\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   audio"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("mpeg："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("MPEG")]),t._v(" 音频\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   audio"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("wav："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("WAV")]),t._v(" 音频\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   audio"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("midi："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("MIDI")]),t._v(" 音频\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   视频文件：\n\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   video"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("mp4："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("MP4")]),t._v(" 视频\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   video"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("mpeg："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("MPEG")]),t._v(" 视频\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   video"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("quicktime：QuickTime 视频\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   应用程序文件：\n\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   application"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("pdf："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("PDF")]),t._v(" 文件\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   application"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("zip："),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ZIP")]),t._v(" 压缩文件\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   application"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("x"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("www"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("form"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("urlencoded：表单提交数据\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("   multipart"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("form"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("data：多部分表单数据\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);