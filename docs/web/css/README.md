# CSS 知识归纳

CSS 菜鸟教程：[菜鸟教程](https://www.runoob.com/css/css-tutorial.html)

## 一、文本隐藏

1. 单行文本隐藏

   ```css
   overflow：hidden
   text-overflow：ellipsis
   white-space：nowrap
   ```

2. 多行文本隐藏

   ```css
   overflow：hidden
   text-overflow：ellipsis
   display：-webkit-box-
   -webkit-box-orient:vertical
   -webkit-line-clamp:2
   ```

## 二、清除浮动的方法

1. 父元素设置成浮动
2. 父元素设置成`absolute`
3. 父元素设置`overflow：hidden`
4. 父元素设置高度
5. 末尾添加空元素，设置`clear:both`
6. 父元素添加伪元素，设置`clear:both`

## 三、伪类和伪元素的区别

- 伪类：将特殊的效果加到特定选择器，它是向已有元素添加类别，不会产生新的元素。比如:`:hover`,`:first-child`
- 伪元素：在内容元素的前后插入额外的元素，但这些元素实际不在文档中生成。它只在外部显示可见，但在文档的源码中找不到它们。比如:`::after`,`::before`

## 四、BFC

BFC:块级格式化上下文，它决定了内部的元素的排列规则，不会影响到外部元素

BFC 的规则：

1. BFC 内的块级元素会在垂直方向一个个排列
2. BFC 就是页面内的一个独立的容器，容器内的元素不会影响到容器外的元素
3. 垂直方向上的距离由 margin 决定，同一个 BFC 的两个相邻的元素的外边距会发生重叠
4. 计算 BFC 高度时，浮动元素也参与计算

触发 BFC:

1. 根元素 HTML
2. `float`不为`none`
3. `overflow`不为`visible`
4. `position`为`absolute`或`fixed`
5. `display`为`inline-block`、`table-cell`、`table-caption`

## 五、box-sizing 的属性

- 标准盒模型`content-box`：设置的宽高就是元素内容的宽高
- 怪异盒模型`border-box`：设置的宽高包括了元素内容、`pendding`、`border`的总的宽高

## 六、CSS 垂直居中的方案

1. 通过绝对定位和负外边距
2. 通过绝对定位和`transform` ` translate`
3. 通过绝对定位上下左右都设置为 0，`margin`设置为`auto`
4. 通过 flex 布局，`justify-content：center`，`align-atimes：cneter`
5. 单行文本，`text-align：center`，`line-height`设置成对应高度

## 七、CSS 选择器优先级

1. `!important`最高
2. 内联样式 1000
3. ID 选择器 100
4. 类选择器、属性选择器、伪类选择器 10
5. 元素选择器、伪元素选择器 1
6. 关系选择器、通配符选择器 0
   1. 相邻选择器，例:`h1 + p`
   2. 子选择器，例:`ul > li`
   3. 后代选择器，例:`li a`
   4. 通配符选择器，例:`*`

## 八、`display`、`visibility`、`opcity`区别

`display:none`

1. DOM 结构：浏览器不会渲染 display 为 none 的元素，不占据空间
2. 事件监听：无法进行事件监听
3. 性能：会引起回流，性能较差
4. 继承：不会被子元素继承
5. `transition`：不支持`display`

`visibility:hidden`

1. DOM 结构：元素被隐藏，但是会被渲染，占据空间
2. 事件监听：无法进行事件监听
3. 性能：会引起重绘，性能较好
4. 继承：会被子元素继承，子元素可以设置`visibility：visible`
5. `transition`：`visibility`会立即显示，隐藏时会延时

`opcity:0`

1. DOM 结构：透明度为 100%，元素隐藏，占据空间
2. 事件监听：可以进行 DOM 事件监听
3. 性能：不会引起重绘
4. 继承：会被子元素继承，子元素不能通过 opcity:1 来取消隐藏
5. `transition`：`opacity`可以延时显示和隐藏

## 九、flex 布局

### flex 容器的 6 个属性

1. `flex-direction`:row(默认)、row-reverse、column、column-reverse
2. `flex-wrap`:nowrap(默认)、wrap、wrap-reverse
3. `flex-flow`：flex-direction 和 flex-wrap 的简写
4. `justify-content`：flex-start(默认)、flex-end、center、space-around、space-between、space-evenly
5. `align-items`：stretch(默认)、flex-start、flex-end、center、baseline
6. `align-content`：stretch(默认)、flex-start、flex-end、center、space-around、space-between、space-evenly

### flex-direction：决定主轴的方向

1. row：主轴为水平方向，起点在左端
2. row-reverse：主轴为水平方向，起点在右端
3. column：主轴为垂直方向，起点在上方
4. column-reverse：主轴为垂直方向，起点在下方

### flex-wrap：决定是否换行以及换行方式

1. nowrap：不换行
2. wrap：换行，第一行在上方
3. wrap-reverse：换行，第一行在下方

### `flex-flow`：flex-direction 和 flex-wrap 的简写

### justify-content：决定项目在主轴方向上的对齐方式

1. flex-start：主轴起点对齐
2. flex-end：主轴终点对齐
3. center：主轴居中
4. space-around：每个项目的两侧间隔相等
5. space-between：两端对齐，项目之间的间隔相等
6. space-evenly：每个项目的间隔和容器到项目之间的间隔都是相等的

### align-items：决定项目在侧轴方向上的对齐方式

1. flex-start：侧轴的起点对齐
2. flex-end：侧轴的终点对齐
3. center：侧轴居中
4. baseline：项目的第一行文字的基线对齐
5. stretch：如果项目未设置高度或设为 auto，将占满整个容器的高度

### align-content：设置换行状态的多个轴线的对齐方式

1. flex-start：与侧轴的起点对齐
2. felx-end：与侧轴的终点对齐
3. center：与侧轴的中点对齐
4. space-around：每个轴线两侧的间隔相等
5. space-between：与侧轴的两端对齐，轴线之间的间隔相等
6. stretch：轴线占满整个侧轴

### flex 子项的 6 个属性

1. order：默认值是 0，改变某一个 flex 子项的排序位置
2. flex-grow：默认值是 0，表示不扩展
3. flex-shrink：默认值是 1，表示可以收缩
4. flex-basis：默认值是 auto，指定了 flex 元素在主轴方向上的初始大小
5. flex：flex-grow、flex-shrink、flex-basis 的缩写
6. align-self：默认值是 auto，控制单独一个子项的垂直对齐方式

### flex:1

相当于：

- flex-grow：1
- flex-shrink：1
- flex-basis：0

平均分配剩余的可用空间

## 十、`link`与`@import`的区别

1. `<link>`是HTML方式，`@import`是CSS方式。`<link>`标签在HTML文档的`<head>`部分中使用，用于引入外部CSS文件；`@import`是在CSS文件中使用，用于引入其他CSS文件。
2. `<link>`标签最大限度地支持并行下载，浏览器会同时下载多个外部CSS文件；而`@import`引入的CSS文件会导致串行下载，浏览器会按照顺序逐个下载CSS文件，这可能导致页面加载速度变慢，出现FOUC（Flash of Unstyled Content）问题。
3. `<link>`标签可以通过`rel="alternate stylesheet"`指定候选样式表，用户可以在浏览器中切换样式；而`@import`不支持`rel`属性，无法提供候选样式表功能。
4. 浏览器对`<link>`标签的支持早于`@import`，一些古老的浏览器可能不支持`@import`方式引入CSS文件，而可以正确解析`<link>`标签。
5. `@import`必须出现在样式规则之前，而且只能在CSS文件的顶部引用其他文件；而`<link>`标签可以放置在文档的任何位置。
6. 总体来说，`<link>`标签在性能、兼容性和灵活性方面优于`@import`。

## 十一、FOUC

> FOUC（flash of unstyled content）指在页面的加载过程中，由于外部样式表加载比较缓慢或延迟，导致页面以无样式的方式显示，然后突然闪烁出样式的现象。

避免FOUC的方法：

1. 将样式表放置在`<head>`标签中：确保浏览器渲染页面前已经先加载和解析样式表
2. 使用内联样式：将关键的样式直接写在HTML标签的`style`属性中，这样即使外部样式表加载延迟，页面仍然可以有基本的样式展示，避免出现完全无样式的情况。
3. 使用样式预加载：在HTML的`<head>`中使用`<link rel='preload'>`标签，将样式提前预加载
4. 避免过多的样式表和样式文件
5. 使用媒体查询避免不必要的样式加载

## 十二、初始化css样式

1. 浏览器兼容性：不同浏览器对于HTML元素的默认样式存在差异，通过初始化css样式，可以尽量的消除不同浏览器之间的显示差异
2. 统一样式：通过初始化css样式，提供一个统一的基础样式
3. 提高可维护性：避免默认样式的干扰，减少不必要的样式覆盖和调整
4. 优化性能：避免不必要的样式计算和渲染，减少浏览器的工作量，提升页面加载和渲染性能。

## 十三、css3的新特性

### 1.常见新特性

1. 新增选择器：`:first-of-type`、`:last-of-type`等
2. 弹性盒模型：通过`display: flex;`可以创建弹性布局，简化了元素的排列和对齐方式。
3. 媒体查询：通过`@media`可以根据设备的特性和屏幕大小应用不同的样式规则。
4. 多列布局：使用`column-count`和`column-width`等属性可以实现将内容分为多列显示。
5. 个性化文字：使用`@font-face`可以引入自定义字体，并在网页中使用。
6. 颜色透明度：通过`rgba()`可以设置颜色的透明度。
7. 圆角：使用`border-radius`可以给元素添加圆角效果。
8. 渐变：使用`linear-gradient()`可以创建线性渐变背景效果。
9. 阴影：使用`box-shadow`可以为元素添加阴影效果。
10. 倒影：使用`box-reflect`可以为元素添加倒影效果。
11. 文字装饰：使用`text-stroke-color`可以设置文字描边的颜色。
12. 文字溢出：使用`text-overflow`可以处理文字溢出的情况。
13. 背景效果：使用`background-size`可以控制背景图片的大小。
14. 边框效果：使用`border-image`可以为边框使用图片来创建特殊效果。
15. 转换：使用`transform`可以实现元素的旋转、倾斜、位移和缩放等变换效果。
16. 平滑过渡：使用`transition`可以为元素的属性变化添加过渡效果。
17. 动画：通过`@keyframes`和`animation`可以创建元素的动画效果。

### 2.新增的伪类

1. `:nth-child(n)`：选择父元素下的第n个子元素。
2. `:first-child`：选择父元素下的第一个子元素。
3. `:last-child`：选择父元素下的最后一个子元素。
4. `:nth-of-type(n)`：选择父元素下特定类型的第n个子元素。
5. `:first-of-type`：选择父元素下特定类型的第一个子元素。
6. `:last-of-type`：选择父元素下特定类型的最后一个子元素。
7. `:only-child`：选择父元素下仅有的一个子元素。
8. `:only-of-type`：选择父元素下特定类型的唯一一个子元素。
9. `:empty`：选择没有任何子元素或者文本内容的元素。
10. `:target`：选择当前活动的目标元素。
11. `:enabled`：选择可用的表单元素。
12. `:disabled`：选择禁用的表单元素。
13. `:checked`：选择被选中的单选框或复选框。
14. `:focus`：选择当前获取焦点的元素。
15. `:hover`：选择鼠标悬停在上方的元素。
16. `:visited`：选择已访问过的链接。
17. `:not(selector)`：选择不符合给定选择器的元素。

## 十四、display的值

- `block`：将元素转为块元素
- `inline`：将元素转为行内元素
- `inline-block`：将元素转为行内块
- `none`：设置元素不可见

## 十五、position的值

- `static`：默认值，元素在文档中正常定位
- `relative`：生成相对定位的元素，相对其正常位置进行定位
- `absolute`：生成绝对定位的元素，相对最近的非`static`定位的父级元素进行定位
- `fixed`：生成固定定位的元素，相对于浏览器窗口进行定位
- `inherit`：规定从父级元素继承`position`属性的值

## 十六、在网页中的应该使用奇数还是偶数的字体

1. **整数像素对齐：** 偶数字号的字体大小通常是整数像素，而在网页渲染中，整数像素对齐可以提供更锐利和清晰的显示效果。当字号为奇数时，可能需要进行半像素渲染，这可能会导致字体显示模糊或模糊。
2. **比例和对称：** 使用偶数字号的字体可以更容易与其他设计元素形成比例和对称。网页设计通常依赖于一致的比例和对称性，而使用偶数字号的字体可以更好地与网页中的其他元素（如标题、段落、间距等）形成和谐的视觉关系。
3. **浏览器兼容性：** 一些浏览器对于奇数字号字体的渲染效果可能与偶数字号字体略有不同，可能会导致细微的差异。使用偶数字号字体可以减少在不同浏览器上的显示差异。

## 十七、伪元素和伪类

- 伪类（:）：单冒号用于表示伪类。伪类是用于选择元素的特定状态或动作的关键字，例如`:hover`、`:active`、`:focus`等。
- 伪元素（::）：双冒号用于表示伪元素。伪元素用于在文档中生成或插入特定内容的关键字，例如`::before`、`::after`等。

## 十八、手写动画最小时间间隔

- 多数显示器的默认频率是`60HZ`，即1秒刷新60次，所有理论上最小时间间隔为`1/60=16.7ms`
- 设置为`16.7ms`可以保证每帧动画都能够在显示器刷新之前完成
- 如果间隔小于`16.7ms`，就会导致某些帧在显示器刷新之后显示，造成不连续的动画效果，也称为“跳帧”现象

## 十九、CSS在性能方面的优化

1. 压缩和合并CSS
2. 使用`Gzip`压缩
3. 避免使用`@import`，推荐使用`<link>`标签
4. 使用缓存，强缓存和协商缓存

## 二十、transfrom转换

- `translate`移动
- `scale`缩放
- `rotate`旋转
- `skew`倾斜

## 二十一、animation动画

- 通过`@keyframes`规定动画
- `animation`
  - `animation-name`：规定 @keyframes 动画的名称。
  - `animation-duration`：规定动画完成一个周期所花费的秒或毫秒。默认是 0。
  - `animation-timing-function`：规定动画的速度曲线。
    - `linear`：动画从头到尾的速度是相同的
    - `ease`：默认，动画以低速开始，然后加快，结尾变慢
    - `ease-in`：动画以低速开始
    - `ease-out`：动画以低速结束
    - `ease-in-out`：动画以低速开始和结束
  - `animation-delay`：设置动画在启动前的延迟间隔。
  - `animation-iteration-count`： 定义动画的播放次数。
    - n设置次数
    - infinite无限次
  - `animation-direction`： 指定是否应该轮流反向播放动画。
    - `normal`：默认值。动画按正常播放
    - `reverse`：动画反向播放
    - `alternate`：动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
    - `alternate-reverse`：动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。

## 二十二、改变页面布局的属性

- `position`：控制元素的定位方式
- `display`：指定元素的显示方式
- `flota`：是元素浮动到指定位置
- `width`和`height`：控制元素的宽高
- `margin`和`padding`：调整元素的外边距和内边距
- `z-index`：控制元素的层叠顺序
- `overflow`：控制元素溢出时的处理方式
- `box-sizing`：指定元素的盒模型

## 二十三、base64的原理以及优缺点

base64是将一种二进制数据编码为ASCII字符的方法，通过将二进制数据转换为由64个字符组成的可打印字符序列，实现二进制数据的传输和存储。

### 原理

1. 将待编码的数据按每3个字节分为一组
2. 将3个字节转换为4个6为的base64字符
3. 如果最后一组不满3个字节，按照需求进行填充
4. 将转换后的base64字符拼接到一起，形成最终的base64编码结果

### 优点

- 可以将二进制数据转换为文本数据，方便在文本环境中传输和存储
- 减少http请求，可以将小的图片或其他资源直接嵌入到html、css或js代码中，减少对服务器的请求次数

### 缺点

- base64编码会使数据变大
- base64编码是一种可逆的编码方法，虽然可以加密数据，但并不提供真正的安全性
- 编码和解码的过程涉及到字符的转换和处理，消耗了一定的cpu资源

## 二十四、`postcss`的作用

`postcss`是一个用于转换`css`的工具，提供了一个插件化的架构，可以通过加载各种插件来处理`css`

1. 转换`css`：将`css`解析成抽象语法树，并允许开发者编写插件来修改和转换`css`
2. 自动添加浏览器前缀：通过`autoprefixer`插件
3. 代码优化和压缩

## 二十五、`rgba()`和`opacity`的透明效果区别

- `rgba()`和`opacity`都能实现透明的效果，但`opacity`作用于元素和元素内所有的内容
- 而`rgba()`只作用于元素的颜色或背景色

## 二十六、文字垂直和水平方向上重叠的css属性

- 垂直方向：`line-height`
- 水平方向：`letter-spacing`

## 二十七、`css`实现硬件加速

> 硬件加速是指通过创建独立的复合图层，让GPU来渲染这个图层，从而提高性能

一般使用`transform:translate`

## 二十八、重绘和回流

- **重绘（Repaint）** 是指当元素的外观属性（如颜色、背景等）发生改变，但不影响布局时的重新绘制过程。重绘不会影响元素的几何尺寸和位置。
- **回流（Reflow）** 是指当元素的布局属性（如尺寸、位置、隐藏/显示等）发生改变，导致浏览器重新计算元素的几何属性，重新构建渲染树的过程。回流会导致其他相关元素的回流和重绘。

## 二十九、实现小于12px的字体效果

可以使用`transform:scale()`缩放属性，只能应用于具有宽度和高度的元素

## 三十、使用`css`创建一个三角形

1. 创建一个具有宽度和高度为0的元素。
2. 设置元素的边框宽度为一个较大的值，例如 `20px`。
3. 设置元素的边框样式为 `solid`，表示实线边框。
4. 通过调整元素的边框颜色，使得三条边中的一条边有颜色，其余两条边颜色为透明，从而形成三角形的形状。

## 三十一、下载设置

`<a>`标签添加`href`属性来指定图片文件的路径，并使用`download`属性来提示浏览器下载该文件

## 三十二、line-height 三种赋值方式

1. **带单位**：使用像素 (`px`) 或其他单位 (如 `em`) 进行赋值。当使用固定值（如 `px`）时，`line-height` 会直接采用该固定值作为行高。而当使用相对单位（如 `em`）时，`line-height` 会根据元素的父元素的字体大小 (`font-size`) 来计算行高，即乘以相应的倍数。
2. **纯数字**：直接使用数字进行赋值。这种情况下，数字会被传递给后代元素，作为其行高的比例因子。例如，如果父元素的行高为 `1.5`，而子元素的字体大小为 `18px`，那么子元素的行高就会被计算为 `1.5 * 18 = 27px`。
3. **百分比**：使用百分比进行赋值。百分比值会相对于父元素的字体大小进行计算，并将计算后的值传递给后代元素作为其行高。

<Valine></Valine>
