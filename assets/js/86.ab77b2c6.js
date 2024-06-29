(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{362:function(t,s,a){"use strict";a.r(s);var n=a(10),r=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"_7-不同的二叉搜索数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-不同的二叉搜索数"}},[t._v("#")]),t._v(" 7.不同的二叉搜索数")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://leetcode.cn/problems/unique-binary-search-trees/",target:"_blank",rel:"noopener noreferrer"}},[t._v("力扣题目链接"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"题目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#题目"}},[t._v("#")]),t._v(" 题目")]),t._v(" "),s("p",[t._v("给你一个整数 "),s("code",[t._v("n")]),t._v(" ，求恰由 "),s("code",[t._v("n")]),t._v(" 个节点组成且节点值从 "),s("code",[t._v("1")]),t._v(" 到 "),s("code",[t._v("n")]),t._v(" 互不相同的 "),s("strong",[t._v("二叉搜索树")]),t._v(" 有多少种？返回满足题意的二叉搜索树的种数。")]),t._v(" "),s("p",[s("strong",[t._v("示例 1：")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg",alt:"img"}})]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("输入：n = 3\n输出：5\n")])])]),s("p",[s("strong",[t._v("示例 2：")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("输入：n = 1\n输出：1\n")])])]),s("p",[s("strong",[t._v("提示：")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("1 <= n <= 19")])])]),t._v(" "),s("h2",{attrs:{id:"思路"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#思路"}},[t._v("#")]),t._v(" 思路")]),t._v(" "),s("p",[t._v("dp[3]，就是 元素 1 为头结点搜索树的数量 + 元素 2 为头结点搜索树的数量 + 元素 3 为头结点搜索树的数量")]),t._v(" "),s("p",[t._v("元素 1 为头结点搜索树的数量 = 右子树有 2 个元素的搜索树数量 * 左子树有 0 个元素的搜索树数量")]),t._v(" "),s("p",[t._v("元素 2 为头结点搜索树的数量 = 右子树有 1 个元素的搜索树数量 * 左子树有 1 个元素的搜索树数量")]),t._v(" "),s("p",[t._v("元素 3 为头结点搜索树的数量 = 右子树有 0 个元素的搜索树数量 * 左子树有 2 个元素的搜索树数量")]),t._v(" "),s("p",[t._v("有 2 个元素的搜索树数量就是 dp[2]。")]),t._v(" "),s("p",[t._v("有 1 个元素的搜索树数量就是 dp[1]。")]),t._v(" "),s("p",[t._v("有 0 个元素的搜索树数量就是 dp[0]。")]),t._v(" "),s("p",[t._v("所以 dp[3] = "),s("code",[t._v("dp[2] * dp[0] + dp[1] * dp[1] + dp[0] * dp[2]")])]),t._v(" "),s("h3",{attrs:{id:"_1-确定-dp-数组以及下标的含义"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-确定-dp-数组以及下标的含义"}},[t._v("#")]),t._v(" 1.确定 dp 数组以及下标的含义")]),t._v(" "),s("p",[s("strong",[t._v("dp[i] ： 1 到 i 为节点组成的二叉搜索树的个数为 dp[i]")]),t._v("。")]),t._v(" "),s("h3",{attrs:{id:"_2-确定递推公式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-确定递推公式"}},[t._v("#")]),t._v(" 2.确定递推公式")]),t._v(" "),s("p",[t._v("dp[i] += dp[以 j 为头结点左子树节点数量] * dp[以 j 为头结点右子树节点数量]")]),t._v(" "),s("p",[t._v("j 相当于是头结点的元素，从 1 遍历到 i 为止。")]),t._v(" "),s("p",[t._v("所以递推公式：dp[i] += dp[j - 1] * dp[i - j]; ，j-1 为 j 为头结点左子树节点数量，i-j 为以 j 为头结点右子树节点数量")]),t._v(" "),s("h3",{attrs:{id:"_3-dp-数组如何初始化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-dp-数组如何初始化"}},[t._v("#")]),t._v(" 3.dp 数组如何初始化")]),t._v(" "),s("p",[t._v("从定义上来讲，空节点也是一棵二叉树，也是一棵二叉搜索树，这是可以说得通的。")]),t._v(" "),s("p",[t._v("从递归公式上来讲，dp[以 j 为头结点左子树节点数量] * dp[以 j 为头结点右子树节点数量] 中以 j 为头结点左子树节点数量为 0，也需要 dp[以 j 为头结点左子树节点数量] = 1， 否则乘法的结果就都变成 0 了。")]),t._v(" "),s("p",[t._v("所以初始化 dp[0] = 1")]),t._v(" "),s("h3",{attrs:{id:"_4-确定遍历顺序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-确定遍历顺序"}},[t._v("#")]),t._v(" 4.确定遍历顺序")]),t._v(" "),s("p",[t._v("从递归公式：dp[i] += dp[j - 1] * dp[i - j]可以看出，节点数为 i 的状态是依靠 i 之前节点数的状态。")]),t._v(" "),s("p",[t._v("那么遍历 i 里面每一个数作为头结点的状态，用 j 来遍历。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"_5-举例推导-dp-数组"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-举例推导-dp-数组"}},[t._v("#")]),t._v(" 5.举例推导 dp 数组")]),t._v(" "),s("p",[t._v("n=5 时")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("下标 i")]),t._v(" "),s("th",[t._v("0")]),t._v(" "),s("th",[t._v("1")]),t._v(" "),s("th",[t._v("2")]),t._v(" "),s("th",[t._v("3")]),t._v(" "),s("th",[t._v("4")]),t._v(" "),s("th",[t._v("5")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("dp[i]")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("1")]),t._v(" "),s("td",[t._v("2")]),t._v(" "),s("td",[t._v("5")]),t._v(" "),s("td",[t._v("14")]),t._v(" "),s("td",[t._v("42")])])])]),t._v(" "),s("h2",{attrs:{id:"代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#代码"}},[t._v("#")]),t._v(" 代码")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("numTrees")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" dp "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("fill")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" j"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" dp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ul",[s("li",[t._v("时间复杂度：O(n^2)")]),t._v(" "),s("li",[t._v("空间复杂度：O(n)")])])])}),[],!1,null,null,null);s.default=r.exports}}]);