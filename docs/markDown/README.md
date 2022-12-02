# **MarkDown 基本语法**

## **一、标题**

语法格式：#+空格+标题，一个#是一级标题，两个##是两级标题，以此类推，支持六级标题

## **二、字体**

- **加粗**语法格式：**加粗**
- *斜体*语法格式：_斜体_
- **\*斜体加粗\***语法格式：``***斜体加粗\***`
- 删除线 语法格式：~~删除线~~
- 高亮 语法格式：==高亮==

## **三、引用**

语法格式：>+引用文字

> 我是引用文字

引用也可以嵌套：

> 如加两个>> 三个>>>

支持无线套娃~~

## **四、分割线**

语法格式：三个或者三个以上的 - 或者 \* 都可以，如\*\*\*

## **五、图片**

语法格式：![alt](图片地址 ''title'')

> alt 指的是当图片链接失效时显示的提示文字，可加可不加 title 是图片的标题，当鼠标移到图片上时显示的内容，可加可不加

添加图片注释，不超过 140 字（可选）

如果你想要调整图片大小，有两种方式：

1. 右击图片，选择缩放图片后，语法格式将变成<img src="Typora.assets/32.jpg" alt="32" style="zoom: 20%;" />，20%可自行调整
2. 通过 HTML 调节，格式如下：

```
<center>
    <img style="border-radius: 20px;"
         src="Typora.assets/baymax.jpg"
         alt="baymax"
         width="688" >
</center>
```

- < center >标签设置图片居中对齐
- border-radius 设置圆角
- src 放置图片路径（本地路径或网络路径）
- alt 放置图片链接失效后的显示文字
- width 设置图片宽度（witdh 和 height 只设置一个即可，等比例缩放）

添加图片注释，不超过 140 字（可选）

你也可以通过如下代码为图片添加图注：

```js
<center>
    <img style="border-radius: 20px;"
         src=""
         alt=""
         width="688" >
    <br>
    <div style="color: #999; padding: 2px;">
        图注
    </div>
</center>
```

添加图片注释，不超过 140 字（可选）

Hello,I'm baymax,your healthcare companion.

\> 我使用的博客园主题不支持缩放代码，所以我选择了使用 HTML 的方式调整图片大小。放置上 设置圆角 的代码后我才发现，我使用的主题同样也不支持 border-radius:weary:

## **六、超链接**

语法格式：[ 超链接名 ]\(超链接地址\)

## **七、列表**

- 无序列表

语法格式：无序列表用 - + \* 任何一种都可以，如+ 我是无序列表

> 加号和内容之间需要放置一个空格

- 有序列表

语法格式：数字+点+空格+内容，如 1. 我是有序列表

- 子列表

在子列表前按下 tab 键即可构成子列表。

## **八、表格**

语法格式：

```js
|左对齐|居中对齐|右对齐|
|:----|:----:|---:|
|左|中|右|
```

| 左对齐 | 居中对齐 | 右对齐 |
| ------ | -------- | ------ |
| 左     | 中       | 右     |

> 第二行分割表头和内容，并声明内容的对齐格式。一般而言，不这么用，感觉太费劲了，下面再介绍快捷键。

## **九、代码**

- 行内代码

语法格式：用一个反引号\`\`包起来代码内容，代码会以主题中设置的样式出现在行内，但不会实现代码高亮。

- 多行代码

语法格式：代码之间分别用三个反引号包起来，且两边的反引号单独占一行

> \``` 语言 代码内容 ``` 语言：C、C++、JAVA 等

## **十、高级技巧**

1. 转义

Markdown 使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用转义字符，Markdown 使用反斜杠转义特殊字符：

```js
\   反斜线
`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
```

1. 行内公式（inline）用 $...$ 括起公式，公式会出现在行内。
2. 块间公式（display）用 $$...$$ 括起公式（注意 $$ 后需要换行），公式会默认显示在行中间。

```js
$$;
块间公式;
$$;
```

1. 支持 HTML

## **Typora**

> Typora 是一款轻便简洁的 Markdown 编辑器，支持即时渲染技术，这也是与其他 Markdown 编辑器最显著的区别。即时渲染使得你写 Markdown 就像是写 Word 文档一样流畅自如。个人认为是一款很好用的 MarkDown 编辑器，特来分享给大家 ❤️

## **软件安装**

官网下载：[https://www.typora.io/windows/typora-setup-x64.exe](https://link.zhihu.com/?target=https%3A//www.typora.io/windows/typora-setup-x64.exe)

阿里云：[https://www.aliyundrive.com/s/wwyQpvXCcdS](https://link.zhihu.com/?target=https%3A//www.aliyundrive.com/s/wwyQpvXCcdS)

## **支持正版**

以下内容引用自 Typora 的下载和破解|博客园

1. 软件安装后，下载破解补丁 app.asar，并覆盖至安装路径的 resources 文件夹内，参考路径：

D:\Typora\resources

1. 打开 typora ，点击输入序列号；

添加图片注释，不超过 140 字（可选）

1. 邮箱一栏中任意填写（但须保证邮箱地址格式正确），输入序列号，点击激活。

添加图片注释，不超过 140 字（可选）

可选序列号：

- DZTX2H-6MCQZT-QL4GCT-5EBWFX
- G7LPKN-HP4NLD-FA3BGF-6JDQ5R
- 3MH4Y8-YJWT37-G5JL9Y-UHNQDJ
- 85ZPHY-ELQ9FQ-94J3VP-D92YLU
- VEZ7NV-USYN3G-8TL2N3-DADUG4

![img](https://pic3.zhimg.com/80/v2-88128b66151543ecd9bb47e5133dd9c6_720w.webp)

### **在 Typora 中书写 MarkDown**

![img](https://pic2.zhimg.com/80/v2-76ba0309c246a9e53714ba8b24e741b1_720w.webp)

> TOC 从文档中提取所有标题，其内容将自动更新。

## **图片插入**

插入图片除了使用插入语句外，还可以：

- ctrl+C/V 将网络图片、剪贴板图片复制到文档中
- 拖动本地图片到文档中

Typora 会自动帮你插入符合 Markdown 语法的图片语句，并给它添加 alt。

## **打字机模式和专注模式**

通过 视图 →→ 打字机模式/专注模式 开启或关闭：

- 「打字机模式」使得你所编辑的那一行永远处于屏幕正中央。
- 「专注模式」使你正在编辑的那一行保留颜色，而其他行的字体呈灰色。

## **空格与换行**

- **空格：**在输入连续的空格后，Typora 会在编辑器视图里为你保留这些空格，但当你打印或导出时，这些空格会被省略成一个。你可以在源代码模式下，为每个空格前加一个 \ 转义符，或者直接使用 HTML 风格的 &nbps; 来保持连续的空格。

> 需要说明的是，在 Markdown 语法中，换行（line break）与换段是不同的，且换行分为软换行和硬换行。

- **软换行**：在 Typora 中，你可以通过 shift+enter 完成一次软换行。软换行只在编辑界面可见，当文档被导出时换行会被省略。
- **硬换行：**你可以通过 空格+ 空格+ shift+enter 完成一次硬换行，而这也是许多 Markdown 编辑器所原生支持的。硬换行在文档被导出时将被保留，且没有换段的段后距。
- **换段：**你可以通过 enter 完成一次换段。Typora 会自动帮你完成两次 shift+enter 的软换行，从而完成一次换段。这也意味着在 Markdown 语法下，换段是通过在段与段之间加入空行来实现的。
- **Windows 风格（CR+LF）与 Unix 风格（LF）的换行符：**CR 表示回车\r，即回到一行的开头，而 LF 表示换行\n，即另起一行。所以 Windows 风格的换行符本质是「回车+换行」，而 Unix 风格的换行符是「换行」。这也是为什么 Unix/Mac 系统下的文件，如果在 Windows 系统直接打开会全部在同一行内。你可以在「文件 - 偏好设置 - 编辑器 - 默认换行符」中对此进行切换。

## **支持 emoji 表情**

在 Typora 中，你可以用 :emoji: 的形式来打出 emoji，软件会自动给出图形的提示。

## **Little Tips**

安利一个快捷键提示工具，轻量级+快捷方便。

官网：LittleTips

它本身支持的软件列表并不包含 Typora，但给出了自定义软件快捷键的方式，所以，我就自己捣鼓了一下：

![img](https://pic2.zhimg.com/80/v2-0e8824a1d8f767e8a9a22790d78283c5_720w.webp)

自行选择下载：typora.json

LittleTips 不含开机自启的选项，如果你想要设置成开机自启，可参考如下方法：

1. 将需要自启动软件创建一个快捷方式
2. 按 win+ R，键入 shell:startup，打开 「启动」 文件夹
3. 将需要开机自启动的软件的快捷方式拖到启动文件夹中

## **Typora 设置图片自动上传**

> Typora 固然好用，MarkDown 也固然好用，但图片该怎么处理？总不能自己一张张的上传，然后在复制网络连接吧，也不是不可以

下面介绍两种方式实现自动上传。

## **一、使用 PicGo-Core**

下载 PicGo-Core

- 依次点击 **文件** -> **偏好设置** -> **图像** 来到下图所示界面：

![img](https://pic1.zhimg.com/80/v2-82dbcfe8963d0189876e3f7b6156c2d8_720w.webp)

- 点击**①**位置选择 PicGo-Gore(command line)选项后，点击**②**位置的下载或更新，在弹出的界面中选择下载。

选择 sm.ms 作为图床并配置 token

> 免费版存储容量 5GB，每分钟限制上传 20 张，每小时限制上传 100 张，每天限制上传 200 张，每周限制上传 500 张，每月限制上传 1000 张，单张图片最大 5M。该图床建立于 2015 年，目前免费用户无法使用香港节点因此速度比较慢（白嫖党没这么多事）。

1. 打开官网 [https://sm.ms/](https://link.zhihu.com/?target=https%3A//sm.ms/)，注册后登录。
2. 打开该网址 [https://sm.ms/home/apitoken](https://link.zhihu.com/?target=https%3A//sm.ms/home/apitoken)，生成 token。

![img](https://pic4.zhimg.com/80/v2-3ea710861deac89de6efe8f4f6dad13b_720w.webp)

1. 最后点击**③**位置配置 token，放置如下代码：

```js
{
  "picBed": {
    "uploader": "smms",
    "smms": {
      "token": "xxxxxxxxxxxxxxxxxxxxxx"
    }
  },
  "picgoPlugins": {}
}
```

> token 换成刚刚生成的 sm.ms 的 token。

1. 按照步骤配置好后，点击验证图片上传选项，如果提示验证成功，那么恭喜，你毕业了 ；
2. 拖拽图片到 typora 实现自动上传并更改 url 的功能。

## **二、使用 PicGo 软件**

安装 Node.js

下载地址：

- 阿里云：[https://www.aliyundrive.com/s/W18SWY8Ti8X](https://link.zhihu.com/?target=https%3A//www.aliyundrive.com/s/W18SWY8Ti8X)
- 官网：[https://nodejs.org/en/](https://link.zhihu.com/?target=https%3A//nodejs.org/en/)

安装步骤：

1. 双击``node-v16.14.2-x64.msi`进行安装。
2. 自定义安装路径

![img](https://pic3.zhimg.com/80/v2-ce3220d213431e06754778a7bb5a402e_720w.webp)

> 注意：不要勾选附加选项

1. 安装完成记得**重启电脑**。

Gitee 相关

1. 打开 Gitee（官网：[https://gitee.com/](https://link.zhihu.com/?target=https%3A//gitee.com/)），如果没有账户，新建一个。
2. 新建仓库

![img](https://pic2.zhimg.com/80/v2-250e4caee7512923d3e95d70517455ad_720w.webp)

1. 仓库开源设置

![img](https://pic2.zhimg.com/80/v2-23d0ed9be913290e6eb387d8585d8cb5_720w.webp)

![img](https://pic2.zhimg.com/80/v2-c479271b4001edb6d1d133dc47eb9d75_720w.webp)

1. 生成私人令牌

![img](https://pic1.zhimg.com/80/v2-d581f6314675048d2313708627ef3f7c_720w.webp)

> 注意保存好私人令牌的序列号，只显示这一次。

安装 PicGo

下载地址：

- 阿里云：[https://www.aliyundrive.com/s/GjNGu1SGur1](https://link.zhihu.com/?target=https%3A//www.aliyundrive.com/s/GjNGu1SGur1)
- 官网：[https://github.com/Molunerfinn/PicGo/releases](https://link.zhihu.com/?target=https%3A//github.com/Molunerfinn/PicGo/releases)

> 在官网上下载要选择正式稳定的版本。

安装步骤：

1. 双击 PicGo-Setup-2.3.0-x64.exe 进行安装。
2. 自定义安装路径

![img](https://pic4.zhimg.com/80/v2-69e21024a7bd732d3fb5f9cc56986967_720w.webp)

1. 插件安装，选择 github-plus 或者 gitee-uploader，二者择其一即可，我选择的是 git-plus。

![img](https://pic3.zhimg.com/80/v2-a9f578db1fcdfd901d39b85a7a43aff2_720w.webp)

1. 配置 gitee，并设置为默认图床：

![img](https://pic1.zhimg.com/80/v2-2997eda3e48a09c453106ec579144438_720w.webp)

> token 放置上述过程生成的序列号即可

1. 重启 PicGO 软件（关闭后重新打开）。

Typora 图像配置

重新打开 Typora，选择 文件->偏好设置->图像：

![img](https://pic3.zhimg.com/80/v2-b5bc2a9b085e0022a39e8a0d3fbfd04a_720w.webp)

如果出现如下选项：

![img](https://pic4.zhimg.com/80/v2-0b900bc15498fed69fb374254202aff3_720w.webp)

恭喜你，你拥有了自己的图床了~~

## **三、我的配置**

对于我而言，我更倾向于先将拖拽到 Typora 的图像保存到本地，便于管理：

![img](https://pic4.zhimg.com/80/v2-797062292c0085c432f4c7df180443d7_720w.webp)

最后再统一上传：

![img](https://pic4.zhimg.com/80/v2-cf9b9c975f144dc89b41318f9212e03b_720w.webp)

## **四、注意事项**

1. 自定义的 HTML 中的图片无法上传，只有通过 Typora 创建的图像才可以。
2. 不要在 Typora 上传同名的图片，如果要修改图片内容，去 Gitee 上传。

既然提到了图床，那就顺带安利一个图片压缩工具：

- 在线压缩：TinyPNG – Compress WebP, PNG and JPEG images intelligently
- 可视化工具：[https://download.redisant.com/package/TinyGUI-1.0.5.0.exe](https://link.zhihu.com/?target=https%3A//download.redisant.com/package/TinyGUI-1.0.5.0.exe)
- GitHub 下载：TinyGUI/TinyGUI at main · chenjing1294/TinyGUI · GitHub

> 在获取 API 的时候，如果长时间未收到反馈邮件，去垃圾邮件看看，会有意想不到的收货

## **Typora 主题**

1. 使用 Typora 内置主题：点击状态栏「主题」，选择喜欢的主题样式
2. 自定义主题：通过「文件-偏好设置-外观-打开主题文件夹」打开 Typora 的主题文件夹 Typora\themes，将自定义的 CSS 文件导入到 themes 文件夹中并重启 Typora，在「主题」中选择你导入的主题样式即可

自定义的主题样式：

- mo 主题

![img](https://pic2.zhimg.com/80/v2-0eb8a39eb2e90674a56fb1e778cec0a9_720w.webp)

- mo-dark 主题

![img](https://pic1.zhimg.com/80/v2-3d8e046e591d40fae668ec1861752590_720w.webp)

- pie 主题

![img](https://pic2.zhimg.com/80/v2-c8f176177209adda777786662a2037a1_720w.webp)

- pie-dark 主题

![img](https://pic2.zhimg.com/80/v2-49434e2dc911ee9db76ae15c7de04c65_720w.webp)

我根据他们的样式，在 GitHub 主题的基础上，做了小小的改动 ️

- melephant 主题

![img](https://pic1.zhimg.com/80/v2-1e1135503104c29d709ec87b111a9bd0_720w.webp)

- melephant-2 主题

![img](https://pic4.zhimg.com/80/v2-3fba69be5bc0248809f8057c7df02e5f_720w.webp)
