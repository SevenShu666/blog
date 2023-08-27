(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{288:function(t,s,a){"use strict";a.r(s);var n=a(10),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"_1-回溯算法理论基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-回溯算法理论基础"}},[t._v("#")]),t._v(" 1.回溯算法理论基础")]),t._v(" "),s("h2",{attrs:{id:"回溯法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#回溯法"}},[t._v("#")]),t._v(" 回溯法")]),t._v(" "),s("p",[t._v("回溯是递归的副产品，只要有递归就会有回溯。")]),t._v(" "),s("p",[s("strong",[t._v("递归的实现就是：每一次递归调用都会把函数的局部变量、参数值和返回地址等压入调用栈中")])]),t._v(" "),s("h2",{attrs:{id:"回溯效率"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#回溯效率"}},[t._v("#")]),t._v(" 回溯效率")]),t._v(" "),s("p",[t._v("回溯的本质是穷举，穷举出所有可能，然后选出我们的答案，可以加一些减枝操作")]),t._v(" "),s("h2",{attrs:{id:"回溯理解"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#回溯理解"}},[t._v("#")]),t._v(" 回溯理解")]),t._v(" "),s("p",[s("strong",[t._v("回溯法解决的问题都可以抽象为树形结构")])]),t._v(" "),s("p",[t._v("因为回溯法解决的都是在集合中递归查找子集，"),s("strong",[t._v("集合的大小就构成了树的宽度，递归的深度，都构成的树的深度")]),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"回溯模板"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#回溯模板"}},[t._v("#")]),t._v(" 回溯模板")]),t._v(" "),s("ul",[s("li",[t._v("回溯函数的返回值以及参数")])]),t._v(" "),s("p",[t._v("返回值一般为void")]),t._v(" "),s("p",[t._v("参数需要写逻辑，然后需要什么参数就添加什么参数")]),t._v(" "),s("ul",[s("li",[t._v("回溯函数终止条件")]),t._v(" "),s("li",[t._v("回溯搜索的遍历过程")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("选择：本层集合中元素（树中节点孩子的数量就是集合的大小）"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    处理节点"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("backtracking")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("路径，选择列表"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 递归")]),t._v("\n    回溯，撤销处理结果\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("回溯算法模板框架")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("backtracking")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("参数")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("终止条件"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        存放结果"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("选择：本层集合中元素（树中节点孩子的数量就是集合的大小）"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        处理节点"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("backtracking")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("路径，选择列表"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 递归")]),t._v("\n        回溯，撤销处理结果\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);