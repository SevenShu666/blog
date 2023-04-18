# 单词拆分

[力扣题目链接](https://leetcode.cn/problems/word-break/)

## 题目

给你一个字符串 `s` 和一个字符串列表 `wordDict` 作为字典。请你判断是否可以利用字典中出现的单词拼接出 `s` 。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

**示例 1：**

```
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
```

**示例 2：**

```
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
     注意，你可以重复使用字典中的单词。
```

**示例 3：**

```
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```

**提示：**

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` 和 `wordDict[i]` 仅有小写英文字母组成
- `wordDict` 中的所有字符串 **互不相同**

## 思路

### 1.确定dp数组以及下标的含义

dp[i]：字符串长度i如果可以由字典组成，那么dp[i]为true

### 2.确定递推公式

dp[i]要为ture，那么dp[i - word.length]要为ture且i - word.length到i的字符串要在字典中

~~~js
if (dp[i - word.length] && curStr === word) {
   dp[i] = true;
   break;
}
~~~

### 3.dp数组如何初始化

dp[i]由dp[i - word.length]推到出来，dp[0]需要为true，其他都置为false

### 4.确定遍历顺序

**如果求组合数就是外层for循环遍历物品，内层for遍历背包**。

**如果求排列数就是外层for遍历背包，内层for循环遍历物品**。

对于s = "applepenapple", wordDict = ["apple", "pen"]，如果是组合那么"apple" + "pen" + "apple" 、"apple" + "apple" + "pen" 或者 "pen" + "apple" + "apple"都是可以的，但s是固定的，这里求的是排列，所以先遍历背包，再遍历物品。

### 5.举例推导dp[i]

输入: s = "leetcode", wordDict = ["leet", "code"]

| 下标  | 0    | 1     | 2     | 3     | 4    | 5     | 6     | 7     | 8    |
| ----- | ---- | ----- | ----- | ----- | ---- | ----- | ----- | ----- | ---- |
| dp[i] | true | false | false | false | true | false | false | false | true |

## 代码

~~~js
var wordBreak = function (s, wordDict) {
  const wn = wordDict.length;
  const sn = s.length;
  const dp = new Array(sn + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= sn; i++) {
    for (let j = 0; j < wn; j++) {
      const word = wordDict[j];
      if (i >= word.length) {
        let curStr = "";
        for (let k = i - word.length; k < i; k++) {
          curStr += s[k];
        }
        if (dp[i - word.length] && curStr === word) {
          dp[i] = true;
          break;
        }
      }
    }
  }
  return dp[sn];
}
~~~

- 时间复杂度：O(n × m )，单个单词小于等于20，可以忽略不记
- 空间复杂度：O(n)