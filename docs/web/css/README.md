# CSS知识归纳

CSS菜鸟教程：[菜鸟教程](https://www.runoob.com/css/css-tutorial.html)

# 一、文本隐藏

1. 单行文本隐藏

   ``````css
   overflow：hidden
   text-overflow：ellipsis
   white-space：nowrap
   ``````

2. 多行文本隐藏

   ``````css
   overflow：hidden
   text-overflow：ellipsis
   display：-webkit-box-
   -webkit-box-orient:vertical
   -webkit-line-clamp:2
   ``````

# 二、清除浮动的方法

1. 父元素设置成浮动
2. 父元素设置成`absolute`
3. 父元素设置`overflow：hidden`
4. 父元素设置高度
5. 末尾添加空元素，设置`clear:both`
6. 父元素添加伪元素，设置`clear:both`

# 三、伪类和伪元素的区别

- 伪类：将特殊的效果加到特定选择器，它是向已有元素添加类别，不会产生新的元素。比如:`:hover`,`:first-child`
- 伪元素：在内容元素的前后插入额外的元素，但这些元素实际不在文档中生成。它只在外部显示可见，但在文档的源码中找不到它们。比如:`::after`,`::before`

# 四、BFC

BFC:块级格式化上下文，它决定了内部的元素的排列规则，不会影响到外部元素

BFC的规则：

1. BFC内的块级元素会在垂直方向一个个排列
2. BFC就是页面内的一个独立的容器，容器内的元素不会影响到容器外的元素
3. 垂直方向上的距离由margin决定，同一个BFC的两个相邻的元素的外边距会发生重叠
4. 计算BFC高度时，浮动元素也参与计算

触发BFC:

1. 根元素HTML
2. `float`不为`none`
3. `overflow`不为`visible`
4. `position`为`absolute`或`fixed`
5. `display`为`inline-block`、`table-cell`、`table-caption`

# 五、box-sizing的属性

- 标准盒模型`content-box`：设置的宽高就是元素内容的宽高
- 怪异盒模型`border-box`：设置的宽高包括了元素内容、`pendding`、`border`的总的宽高

# 六、CSS垂直居中的方案

1. 通过绝对定位和负外边距
2. 通过绝对定位和`transform` ` translate`
3. 通过绝对定位上下左右都设置为0，`margin`设置为`auto`
4. 通过flex布局，`justify-content：center`，`align-atimes：cneter`
5. 单行文本，`text-align：center`，`line-height`设置成对应高度

# 七、CSS选择器优先级

1. `!important`最高
2. 内联样式 1000
3. ID选择器 100
4. 类选择器、属性选择器、伪类选择器 10
5. 元素选择器、伪元素选择器 1
6. 关系选择器、通配符选择器 0
   1. 相邻选择器，例:`h1 + p`
   2. 子选择器，例:`ul > li`
   3. 后代选择器，例:`li a`
   4. 通配符选择器，例:`*`

# 八、`display`、`visibility`、`opcity`区别

`display:none`

1. DOM结构：浏览器不会渲染display为none的元素，不占据空间
2. 事件监听：无法进行事件监听
3. 性能：会引起回流，性能较差
4. 继承：不会被子元素继承
5. `transition`：不支持`display`

`visibility:hidden`

1. DOM结构：元素被隐藏，但是会被渲染，占据空间
2. 事件监听：无法进行事件监听
3. 性能：会引起重绘，性能较好
4. 继承：会被子元素继承，子元素可以设置`visibility：visible`
5. `transition`：`visibility`会立即显示，隐藏时会延时

`opcity:0`

1. DOM结构：透明度为100%，元素隐藏，占据空间
2. 事件监听：可以进行DOM事件监听
3. 性能：不会引起重绘
4. 继承：会被子元素继承，子元素不能通过opcity:1来取消隐藏
5. `transition`：`opacity`可以延时显示和隐藏

# 九、flex布局

##### flex容器的6个属性

1. `flex-direction`:row(默认)、row-reverse、column、column-reverse
2. `flex-wrap`:nowrap(默认)、wrap、wrap-reverse
3. `flex-flow`：flex-direction和flex-wrap的简写
4. `justify-content`：flex-start(默认)、flex-end、center、space-around、space-between、space-evenly
5. `align-items`：stretch(默认)、flex-start、flex-end、center、baseline
6. `align-content`：stretch(默认)、flex-start、flex-end、center、space-around、space-between、space-evenly

##### flex-direction：决定主轴的方向

1. row：主轴为水平方向，起点在左端
2. row-reverse：主轴为水平方向，起点在右端
3. column：主轴为垂直方向，起点在上方
4. column-reverse：主轴为垂直方向，起点在下方

##### flex-wrap：决定是否换行以及换行方式

1. nowrap：不换行
2. wrap：换行，第一行在上方
3. wrap-reverse：换行，第一行在下方

###### `flex-flow`：flex-direction和flex-wrap的简写

##### justify-content：决定项目在主轴方向上的对齐方式

1. flex-start：主轴起点对齐
2. flex-end：主轴终点对齐
3. center：主轴居中
4. space-around：每个项目的两侧间隔相等
5. space-between：两端对齐，项目之间的间隔相等
6. space-evenly：每个项目的间隔和容器到项目之间的间隔都是相等的

##### align-items：决定项目在侧轴方向上的对齐方式

1. flex-start：侧轴的起点对齐
2. flex-end：侧轴的终点对齐
3. center：侧轴居中
4. baseline：项目的第一行文字的基线对齐
5. stretch：如果项目未设置高度或设为auto，将占满整个容器的高度

##### align-content：设置换行状态的多个轴线的对齐方式

1. flex-start：与侧轴的起点对齐
2. felx-end：与侧轴的终点对齐
3. center：与侧轴的中点对齐
4. space-around：每个轴线两侧的间隔相等
5. space-between：与侧轴的两端对齐，轴线之间的间隔相等
6. stretch：轴线占满整个侧轴

##### flex子项的6个属性

1. order：默认值是0，改变某一个flex子项的排序位置
2. flex-grow：默认值是0，表示不扩展
3. flex-shrink：默认值是1，表示可以收缩
4. flex-basis：默认值是auto，指定了flex元素在主轴方向上的初始大小
5. flex：flex-grow、flex-shrink、flex-basis的缩写
6. align-self：默认值是auto，控制单独一个子项的垂直对齐方式

