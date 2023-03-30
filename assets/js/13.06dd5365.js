(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{291:function(t,s,a){"use strict";a.r(s);var n=a(10),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"零钱兑换-ii"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#零钱兑换-ii"}},[t._v("#")]),t._v(" 零钱兑换 II")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://leetcode.cn/problems/coin-change-ii/",target:"_blank",rel:"noopener noreferrer"}},[t._v("力扣题目链接"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"题目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#题目"}},[t._v("#")]),t._v(" 题目")]),t._v(" "),s("p",[t._v("给你一个整数数组 "),s("code",[t._v("coins")]),t._v(" 表示不同面额的硬币，另给一个整数 "),s("code",[t._v("amount")]),t._v(" 表示总金额。")]),t._v(" "),s("p",[t._v("请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 "),s("code",[t._v("0")]),t._v(" 。")]),t._v(" "),s("p",[t._v("假设每一种面额的硬币有无限个。")]),t._v(" "),s("p",[t._v("题目数据保证结果符合 32 位带符号整数。")]),t._v(" "),s("p",[s("strong",[t._v("示例 1：")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("输入：amount = 5, coins = [1, 2, 5]\n输出：4\n解释：有四种方式可以凑成总金额：\n5=5\n5=2+2+1\n5=2+1+1+1\n5=1+1+1+1+1\n")])])]),s("p",[s("strong",[t._v("示例 2：")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("输入：amount = 3, coins = [2]\n输出：0\n解释：只用面额 2 的硬币不能凑成总金额 3 。\n")])])]),s("p",[s("strong",[t._v("示例 3：")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("输入：amount = 10, coins = [10] \n输出：1\n")])])]),s("p",[s("strong",[t._v("提示：")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("1 <= coins.length <= 300")])]),t._v(" "),s("li",[s("code",[t._v("1 <= coins[i] <= 5000")])]),t._v(" "),s("li",[s("code",[t._v("coins")]),t._v(" 中的所有值 "),s("strong",[t._v("互不相同")])]),t._v(" "),s("li",[s("code",[t._v("0 <= amount <= 5000")])])]),t._v(" "),s("h2",{attrs:{id:"思路"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#思路"}},[t._v("#")]),t._v(" 思路")]),t._v(" "),s("h3",{attrs:{id:"_1-确定dp数组以及下标的含义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-确定dp数组以及下标的含义"}},[t._v("#")]),t._v(" 1.确定dp数组以及下标的含义")]),t._v(" "),s("p",[t._v("dp[j]:凑成金额j的组合数有dp[j]")]),t._v(" "),s("h3",{attrs:{id:"_2-确定递推公式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-确定递推公式"}},[t._v("#")]),t._v(" 2.确定递推公式")]),t._v(" "),s("ul",[s("li",[t._v("有1的话，那么凑成金额j的组合数有dp[j-1]")]),t._v(" "),s("li",[t._v("有2的话，那么凑成金额j的组合数有dp[j-2]")]),t._v(" "),s("li",[t._v("有5的话，那么凑成金额j的组合数有dp[j-5]")])]),t._v(" "),s("p",[t._v("那么dp[j]的总组合数有dp[j-1]+dp[j-2]+dp[j-5]，那么递推公式：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v("dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("coins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),s("h3",{attrs:{id:"_3-dp数组如何初始化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-dp数组如何初始化"}},[t._v("#")]),t._v(" 3.dp数组如何初始化")]),t._v(" "),s("p",[t._v("如果amount=1，coins=[1],那么dp[1] = dp[1-1] = dp[0]，因此初始化dp[0]=1")]),t._v(" "),s("h3",{attrs:{id:"_4-确定遍历顺序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-确定遍历顺序"}},[t._v("#")]),t._v(" 4.确定遍历顺序")]),t._v(" "),s("p",[t._v("先来看 外层for循环遍历物品（钱币），内层for遍历背包（金钱总额）的情况。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" coins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" amount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" coins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("假设：coins[0] = 1，coins[1] = 5。")]),t._v(" "),s("p",[t._v("那么先是把1加入计算，然后再把5加入计算，得到的方法数量只有{1,5}这种，不会出现{5,1}的情况。")]),t._v(" "),s("p",[s("strong",[t._v("所以这种遍历顺序中dp[j]里计算的是组合数！")])]),t._v(" "),s("p",[t._v("如果把两个for交换顺序")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" amount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" coins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" coins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("背包容量的每一个值，都是经过 1 和 5 的计算，包含了{1, 5} 和 {5, 1}两种情况。")]),t._v(" "),s("p",[s("strong",[t._v("此时dp[j]里算出来的就是排列数！")])]),t._v(" "),s("h3",{attrs:{id:"_5-举例推导dp数组"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-举例推导dp数组"}},[t._v("#")]),t._v(" 5.举例推导dp数组")]),t._v(" "),s("p",[t._v("输入: amount = 5, coins = [1, 2, 5]")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("dp[j]")]),t._v(" "),s("th",[t._v("0")]),t._v(" "),s("th",[t._v("1")]),t._v(" "),s("th",[t._v("2")]),t._v(" "),s("th",[t._v("3")]),t._v(" "),s("th",[t._v("4")]),t._v(" "),s("th",[t._v("5")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("coins [1]")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("1")])]),t._v(" "),s("tr",[s("td",[t._v("coins [2]")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("2")]),t._v(" "),s("td",[t._v("2")]),t._v(" "),s("td",[t._v("3")]),t._v(" "),s("td",[t._v("3")])]),t._v(" "),s("tr",[s("td",[t._v("coins [3]")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("2")]),t._v(" "),s("td",[t._v("2")]),t._v(" "),s("td",[t._v("3")]),t._v(" "),s("td",[t._v("4")])])])]),t._v(" "),s("h2",{attrs:{id:"代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码"}},[t._v("#")]),t._v(" 代码")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("change")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("amount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" coins")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" coins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" dp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("amount "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fill")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" coins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" amount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" coins"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("amount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("时间复杂度：O(m × n) , m是amount大小，m其实没有amount大，n为coins的长度")]),t._v(" "),s("li",[t._v("空间复杂度：O(m)")])])])}),[],!1,null,null,null);s.default=r.exports}}]);