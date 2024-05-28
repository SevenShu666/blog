(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{449:function(_,v,a){"use strict";a.r(v);var t=a(10),o=Object(t.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"正则表达式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#正则表达式"}},[_._v("#")]),_._v(" 正则表达式")]),_._v(" "),v("h2",{attrs:{id:"字符描述"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#字符描述"}},[_._v("#")]),_._v(" 字符描述")]),_._v(" "),v("ol",[v("li",[v("code",[_._v("\\")]),_._v(":将下一个字符标记为一个特殊字符、或一个原义字符、或一个向后引用、或一个八进制转义符。例如，“n”匹配字符“n”。“\\n”匹配一个换行符。串行“\\”匹配“\\”而“(”则匹配“(”。")]),_._v(" "),v("li",[v("code",[_._v("^")]),_._v(":匹配输入字符串的开始位置。如果设置了 RegExp 对象的 Multiline 属性，^也匹配“\\n”或“\\r”之后的位置。")]),_._v(" "),v("li",[v("code",[_._v("$")]),_._v(":匹配输入字符串的结束位置。如果设置了 RegExp 对象的 Multiline 属性，$也匹配“\\n”或“\\r”之前的位置。")]),_._v(" "),v("li",[v("code",[_._v("*")]),_._v(":匹配前面的子表达式零次或多次。例如，zo*能匹配“z”以及“zoo”。*等价于{0,}。")]),_._v(" "),v("li",[v("code",[_._v("+")]),_._v(":匹配前面的子表达式一次或多次。例如，“zo+”能匹配“zo”以及“zoo”，但不能匹配“z”。+等价于{1,}。")]),_._v(" "),v("li",[v("code",[_._v("?")]),_._v(":匹配前面的子表达式零次或一次。例如，“do(es)?”可以匹配“does”或“does”中的“do”。?等价于{0,1}。")]),_._v(" "),v("li",[v("code",[_._v("{n}")]),_._v(":n 是一个非负整数。匹配确定的 n 次。例如，“o{2}”不能匹配“Bob”中的“o”，但是能匹配“food”中的两个 o。")]),_._v(" "),v("li",[v("code",[_._v("{n,}")]),_._v(":n 是一个非负整数。至少匹配 n 次。例如，“o{2,}”不能匹配“Bob”中的“o”，但能匹配“foooood”中的所有 o。“o{1,}”等价于“o+”。“o{0,}”则等价于“o*”。")]),_._v(" "),v("li",[v("code",[_._v("{n,m}")]),_._v(":m 和 n 均为非负整数，其中 n<=m。最少匹配 n 次且最多匹配 m 次。例如，“o{1,3}”将匹配“fooooood”中的前三个 o。“o{0,1}”等价于“o?”。请注意在逗号和两个数之间不能有空格。")]),_._v(" "),v("li",[v("code",[_._v("?")]),_._v(":当该字符紧跟在任何一个其他限制符（*,+,?，{n}，{n,}，{n,m}）后面时，匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，而默认的贪婪模式则尽可能多的匹配所搜索的字符串。例如，对于字符串“oooo”，“o+?”将匹配单个“o”，而“o+”将匹配所有“o”。")]),_._v(" "),v("li",[v("code",[_._v(".")]),_._v(":匹配除“\\n”之外的任何单个字符。要匹配包括“\\n”在内的任何字符，请使用像“(.|\\n)”的模式。")]),_._v(" "),v("li",[v("code",[_._v("(pattern)")]),_._v(":匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到，在 VBScript 中使用 SubMatches 集合，在 JScript 中则使用$0…$9 属性。要匹配圆括号字符，请使用“(”或“)”。")]),_._v(" "),v("li",[v("code",[_._v("(?:pattern)")]),_._v(":匹配 pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用或字符“(|)”来组合一个模式的各个部分是很有用。例如“industr(?:y|ies)”就是一个比“industry|industries”更简略的表达式。")]),_._v(" "),v("li",[v("code",[_._v("(?=pattern)")]),_._v(":正向肯定预查，在任何匹配 pattern 的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，“Windows(?=95|98|NT|2000)”能匹配“Windows2000”中的“Windows”，但不能匹配“Windows3.1”中的“Windows”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。")]),_._v(" "),v("li",[v("code",[_._v("(?!pattern)")]),_._v(": 正向否定预查，在任何不匹配 pattern 的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如“Windows(?!95|98|NT|2000)”能匹配“Windows3.1”中的“Windows”，但不能匹配“Windows2000”中的“Windows”。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始")]),_._v(" "),v("li",[v("code",[_._v("(?<=pattern)")]),_._v(":反向肯定预查，与正向肯定预查类拟，只是方向相反。例如，“(?<=95|98|NT|2000)Windows”能匹配“2000Windows”中的“Windows”，但不能匹配“3.1Windows”中的“Windows”。")]),_._v(" "),v("li",[v("code",[_._v("(?<!pattern)")]),_._v(":反向否定预查，与正向否定预查类拟，只是方向相反。例如“(?<!95|98|NT|2000)Windows”能匹配“3.1Windows”中的“Windows”，但不能匹配“2000Windows”中的“Windows”。")]),_._v(" "),v("li",[v("code",[_._v("x|y")]),_._v(":匹配 x 或 y。例如，“z|food”能匹配“z”或“food”。“(z|f)ood”则匹配“zood”或“food”。")]),_._v(" "),v("li",[v("code",[_._v("[xyz]")]),_._v(":字符集合。匹配所包含的任意一个字符。例如，“[abc]”可以匹配“plain”中的“a”。")]),_._v(" "),v("li",[v("code",[_._v("[^xyz]")]),_._v(": 负值字符集合。匹配未包含的任意字符。例如，“[^abc]”可以匹配“plain”中的“p”。")]),_._v(" "),v("li",[v("code",[_._v("[a-z]")]),_._v(":字符范围。匹配指定范围内的任意字符。例如，“[a-z]”可以匹配“a”到“z”范围内的任意小写字母字符。")]),_._v(" "),v("li",[v("code",[_._v("[^a-z]")]),_._v(" :负值字符范围。匹配任何不在指定范围内的任意字符。例如，“[^a-z]”可以匹配任何不在“a”到“z”范围内的任意字符。")]),_._v(" "),v("li",[v("code",[_._v("\\b")]),_._v(":匹配一个单词边界，也就是指单词和空格间的位置。例如，“er\\b”可以匹配“never”中的“er”，但不能匹配“verb”中的“er”。")]),_._v(" "),v("li",[v("code",[_._v("\\B")]),_._v(":匹配非单词边界。“er\\B”能匹配“verb”中的“er”，但不能匹配“never”中的“er”。")]),_._v(" "),v("li",[v("code",[_._v("\\cx")]),_._v(":匹配由 x 指明的控制字符。例如，\\cM 匹配一个 Control-M 或回车符。x 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的“c”字符。")]),_._v(" "),v("li",[v("code",[_._v("\\d")]),_._v(":匹配一个数字字符。等价于[0-9]。")]),_._v(" "),v("li",[v("code",[_._v("\\D")]),_._v(":匹配一个非数字字符。等价于"),v("code",[_._v("[^0-9]")]),_._v("。")]),_._v(" "),v("li",[v("code",[_._v("\\f")]),_._v(":匹配一个换页符。等价于\\x0c 和\\cL。")]),_._v(" "),v("li",[v("code",[_._v("\\n")]),_._v(":匹配一个换行符。等价于\\x0a 和\\cJ。")]),_._v(" "),v("li",[v("code",[_._v("\\r")]),_._v(":匹配一个回车符。等价于\\x0d 和\\cM。")]),_._v(" "),v("li",[v("code",[_._v("\\s")]),_._v(":匹配任何空白字符，包括空格、制表符、换页符等等。等价于[ \\f\\n\\r\\t\\v]。")]),_._v(" "),v("li",[v("code",[_._v("\\S")]),_._v(":匹配任何非空白字符。等价于[^ \\f\\n\\r\\t\\v]。")]),_._v(" "),v("li",[v("code",[_._v("\\t")]),_._v(":匹配一个制表符。等价于\\x09 和\\cI。")]),_._v(" "),v("li",[v("code",[_._v("\\v")]),_._v(":匹配一个垂直制表符。等价于\\x0b 和\\cK。")]),_._v(" "),v("li",[v("code",[_._v("\\w")]),_._v(":匹配包括下划线的任何单词字符。等价于“[A-Za-z0-9_]”。")]),_._v(" "),v("li",[v("code",[_._v("\\W")]),_._v(":匹配任何非单词字符。等价于“[^a-za-z0-9_]”。")]),_._v(" "),v("li",[v("code",[_._v("\\xn")]),_._v(":匹配 n，其中 n 为十六进制转义值。十六进制转义值必须为确定的两个数字长。例如，“\\x41”匹配“A”。“\\x041”则等价于“\\x04&1”。正则表达式中可以使用 ASCII 编码。.")]),_._v(" "),v("li",[v("code",[_._v("\\num")]),_._v(":匹配 num，其中 num 是一个正整数。对所获取的匹配的引用。例如，“(.)\\1”匹配两个连续的相同字符。")]),_._v(" "),v("li",[v("code",[_._v("\\n")]),_._v(":标识一个八进制转义值或一个向后引用。如果\\n 之前至少 n 个获取的子表达式，则 n 为向后引用。否则，如果 n 为八进制数字（0-7），则 n 为一个八进制转义值。")]),_._v(" "),v("li",[v("code",[_._v("\\nm")]),_._v(":标识一个八进制转义值或一个向后引用。如果\\nm 之前至少有 nm 个获得子表达式，则 nm 为向后引用。如果\\nm 之前至少有 n 个获取，则 n 为一个后跟文字 m 的向后引用。如果前面的条件都不满足，若 n 和 m 均为八进制数字（0-7），则\\nm 将匹配八进制转义值 nm。")]),_._v(" "),v("li",[v("code",[_._v("\\nml")]),_._v(":如果 n 为八进制数字（0-3），且 m 和 l 均为八进制数字（0-7），则匹配八进制转义值 nml。")]),_._v(" "),v("li",[v("code",[_._v("\\un")]),_._v(":匹配 n，其中 n 是一个用四个十六进制数字表示的 Unicode 字符。例如，\\u00A9 匹配版权符号（©）。")])]),_._v(" "),v("h2",{attrs:{id:"常用正则表达式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#常用正则表达式"}},[_._v("#")]),_._v(" 常用正则表达式")]),_._v(" "),v("ol",[v("li",[_._v("用户名 /^[a-z0-9_-]{3,16}$/")]),_._v(" "),v("li",[_._v("密码 /^[a-z0-9_-]{6,18}$/")]),_._v(" "),v("li",[_._v("十六进制值 /^#?([a-f0-9]{6}|[a-f0-9]{3})$/")]),_._v(" "),v("li",[_._v("电子邮箱 /^([a-z0-9_.-]+)@([\\da-z.-]+).([a-z.]{2,6})$/")]),_._v(" "),v("li",[_._v("/^[a-z\\d]+(.[a-z\\d]+)*@("),v("a",{attrs:{href:"-%5B%5Cda-z%5D"}},[_._v("\\da-z")]),_._v("?)+(.{1,2}[a-z]+)+$/")]),_._v(" "),v("li",[_._v("URL /^(https?😕/)?([\\da-z.-]+).([a-z.]{2,6})([/\\w .-]"),v("em",[_._v(")")]),_._v("/?$/")]),_._v(" "),v("li",[_._v("IP 地址 /((2[0-4]\\d|25[0-5]|[01]?\\d\\d?).){3}(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)/")]),_._v(" "),v("li",[_._v("/^(?😦?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/")]),_._v(" "),v("li",[_._v("HTML 标签 /^<([a-z]+)([^<]+)"),v("em",[_._v("(?:>(.")]),_._v(")</\\1>|\\s+/>)$/")]),_._v(" "),v("li",[_._v("删除代码\\注释 (?<!http:|\\S)//.*$")]),_._v(" "),v("li",[_._v("Unicode 编码中的汉字范围 /^[\\u2E80-\\u9FFF]+$/")])]),_._v(" "),v("h2",{attrs:{id:"方法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[_._v("#")]),_._v(" 方法")]),_._v(" "),v("ol",[v("li",[_._v("exec() 方法是一个正则表达式方法，用于检索字符串中的正则表达式的匹配。函数返回一个数组中，其中数组中索引 1 的位置存放匹配的结果；如果未找到匹配，则返回值为 null。")]),_._v(" "),v("li",[_._v("test() 方法是一个正则表达式方法，用于检测一个字符串是否匹配某个模式，")])]),_._v(" "),v("h2",{attrs:{id:"位元算符"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#位元算符"}},[_._v("#")]),_._v(" 位元算符")]),_._v(" "),v("h3",{attrs:{id:"_1-按位与"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-按位与"}},[_._v("#")]),_._v(" 1.& 按位与")]),_._v(" "),v("p",[_._v("&是二元运算符，它以特定的方式的方式组合操作数中对应的位，如果对应的位都为 1，那么结果就是 1， 如果任意一个位是 0 则结果就是 0。")]),_._v(" "),v("p",[_._v("1 & 3 的结果为 1")]),_._v(" "),v("p",[_._v("那我们来看看他是怎么运行的")]),_._v(" "),v("p",[_._v("1 的二进制表示为 0 0 0 0 0 0 1")]),_._v(" "),v("p",[_._v("3 的二进制表示为 0 0 0 0 0 1 1")]),_._v(" "),v("p",[_._v("根据 & 的规则 得到的结果为 0 0 0 0 0 0 0 1,十进制表示就是 1")]),_._v(" "),v("h3",{attrs:{id:"_2-按位或"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-按位或"}},[_._v("#")]),_._v(" 2.| 按位或")]),_._v(" "),v("p",[_._v("|运算符跟&的区别在于如果对应的位中任一个操作数为 1 那么结果就是 1。")]),_._v(" "),v("p",[_._v("1 的二进制表示为 0 0 0 0 0 0 1")]),_._v(" "),v("p",[_._v("3 的二进制表示为 0 0 0 0 0 1 1")]),_._v(" "),v("p",[_._v("所以 1 | 3 的结果为 3")]),_._v(" "),v("h3",{attrs:{id:"_3-按位异或"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-按位异或"}},[_._v("#")]),_._v(" 3.^ 按位异或")]),_._v(" "),v("p",[_._v("^运算符跟|类似，但有一点不同的是 如果两个操作位都为 1 的话，结果产生 0。")]),_._v(" "),v("p",[_._v("1 的二进制表示为 0 0 0 0 0 0 1")]),_._v(" "),v("p",[_._v("3 的二进制表示为 0 0 0 0 0 1 1")]),_._v(" "),v("p",[_._v("所以 1 ^ 3 的结果为 2")]),_._v(" "),v("h3",{attrs:{id:"_4-按位非"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-按位非"}},[_._v("#")]),_._v(" 4.~ 按位非")]),_._v(" "),v("p",[_._v("~运算符是对位求反，1 变 0,0 变 1，也就是求二进制的反码")]),_._v(" "),v("p",[_._v("1 的二进制表示为 0 0 0 0 0 0 1")]),_._v(" "),v("p",[_._v("所以 ~1 的结果是-2")]),_._v(" "),v("h3",{attrs:{id:"_5-右移"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-右移"}},[_._v("#")]),_._v(" 5.>> 右移")]),_._v(" "),v("p",[_._v(">>运算符使指定值的二进制所有位都右移规定的次数，对于其移动规则只需记住符号位不变，左边补上符号位即按二进制形式把所有的数字向右移动对应的位数，低位移出(舍弃)，高位的空位补符号位，即正数补零，负数补 1。")]),_._v(" "),v("p",[_._v("1 的二进制表示为 0 0 0 0 0 0 1")]),_._v(" "),v("p",[_._v("所以 1>>1 的结果为 0")]),_._v(" "),v("h3",{attrs:{id:"_6-左移"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_6-左移"}},[_._v("#")]),_._v(" 6.<< 左移")]),_._v(" "),v("p",[_._v("<<运算符使指定值的二进制所有位都左移规定的次数，对于其移动规则只需记住丢弃最高位，0 补最低位即按二进制形式把所有的数字向左移动对应的位数，高位移出(舍弃)，低位的空位补零。")]),_._v(" "),v("p",[_._v("1 的二进制表示为 0 0 0 0 0 0 1")]),_._v(" "),v("p",[_._v("所以 1<<1 的结果为 2")]),_._v(" "),v("h3",{attrs:{id:"_7-无符号右移"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_7-无符号右移"}},[_._v("#")]),_._v(" 7.>>> 无符号右移")]),_._v(" "),v("p",[_._v(">>>运算符忽略了符号位扩展，0 补最高位，但是只是对 32 位和 64 位的值有意义。")]),_._v(" "),v("h3",{attrs:{id:"_8-位运算符在-js-中的妙用"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_8-位运算符在-js-中的妙用"}},[_._v("#")]),_._v(" 8.位运算符在 js 中的妙用：")]),_._v(" "),v("h4",{attrs:{id:"_1、使用-运算符判断一个数的奇偶"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1、使用-运算符判断一个数的奇偶"}},[_._v("#")]),_._v(" 1、使用&运算符判断一个数的奇偶")]),_._v(" "),v("p",[_._v("偶数 & 1 = 0")]),_._v(" "),v("p",[_._v("奇数 & 1 = 1")]),_._v(" "),v("p",[_._v("那么 0&1=0,1&1=1")]),_._v(" "),v("h4",{attrs:{id:"_2、使用-来取整"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2、使用-来取整"}},[_._v("#")]),_._v(" 2、使用~~，>>,<<,>>>,|来取整")]),_._v(" "),v("p",[_._v("~~3.14 = 3")]),_._v(" "),v("p",[_._v("3.14 >> 0 = 3")]),_._v(" "),v("p",[_._v("3.14 << 0 = 3")]),_._v(" "),v("p",[_._v("3.14 | 0 = 3")]),_._v(" "),v("p",[_._v("3.14 >>> 0 = 3(>>>不可对负数取整)")]),_._v(" "),v("p",[_._v("注意：~~-3.14 = -3 其它的一样")]),_._v(" "),v("h4",{attrs:{id:"_3、使用-来计算乘除"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3、使用-来计算乘除"}},[_._v("#")]),_._v(" 3、使用<<,>>来计算乘除")]),_._v(" "),v("p",[_._v("乘法：")]),_._v(" "),v("p",[_._v("1*2 = 2")]),_._v(" "),v("p",[_._v("1<<1 = 1(2/2 的一次方)")]),_._v(" "),v("h4",{attrs:{id:"_4、利用-来完成比较两个数是否相等"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4、利用-来完成比较两个数是否相等"}},[_._v("#")]),_._v(" 4、利用^来完成比较两个数是否相等")]),_._v(" "),v("p",[_._v("1 ^ 1 = 0")]),_._v(" "),v("p",[_._v("1 ^ 非 1 数 ！=0")]),_._v(" "),v("p",[_._v("所以同一个数……同一个数等于 0，否则不等于 0")]),_._v(" "),v("h4",{attrs:{id:"_5、使用-来完成值交换"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5、使用-来完成值交换"}},[_._v("#")]),_._v(" 5、使用^来完成值交换")]),_._v(" "),v("p",[_._v("a = 1")]),_._v(" "),v("p",[_._v("b = 2")]),_._v(" "),v("p",[_._v("a ^= b")]),_._v(" "),v("p",[_._v("b ^= a")]),_._v(" "),v("p",[_._v("a ^= b")]),_._v(" "),v("p",[_._v("结果 a=2，b=1")])])}),[],!1,null,null,null);v.default=o.exports}}]);