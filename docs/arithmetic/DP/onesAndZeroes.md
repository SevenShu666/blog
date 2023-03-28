# 一和零

## 题目

给你一个二进制字符串数组 `strs` 和两个整数 `m` 和 `n` 。

请你找出并返回 `strs` 的最大子集的长度，该子集中 **最多** 有 `m` 个 `0` 和 `n` 个 `1` 。

如果 `x` 的所有元素也是 `y` 的元素，集合 `x` 是集合 `y` 的 **子集** 。

**示例 1：**

```
输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
输出：4
解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。
```

**示例 2：**

```
输入：strs = ["10", "0", "1"], m = 1, n = 1
输出：2
解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
```

**提示：**

- `1 <= strs.length <= 600`
- `1 <= strs[i].length <= 100`
- `strs[i]` 仅由 `'0'` 和 `'1'` 组成
- `1 <= m, n <= 100`

## 思路

## 1.确定dp数组以及下标的含义

dp\[i][j]:最多有i个0和j个1的strs的最大子集的大小为dp\[i][j]

## 2.确定递推公式

当前字符串的0个数zeroNum，1的个数oneNum，那么dp\[i][j]取dp\[i][j]和dp\[i - zeroNum][j - oneNum] + 1之间的最大值。

~~~js
dp[i][j] = Math.max(dp[i][j], dp[i - zeroNum][j - oneNum] + 1)
~~~

## 3.dp数组如何初始化

dp\[0][0] = 0

## 4.确定遍历顺序

[01背包遍历顺序](http://localhost:8080/blog/arithmetic/DP/linearArray.html)，一维dp的遍历，nums放在外循环，target在内循环，且内循环倒序。背包的最大容量为m和n

~~~js
for (let i = 0; i < len; i++) {
    let zeroNum = 0;
    let oneNum = 0;
    for (let j = 0; j < strs[i].length; j++) {
      if (strs[i][j] === "1") {
        oneNum++;
      } else {
        zeroNum++;
      }
    }

    for (let i = zeroNum; i <= m; i++) {
      for (let j = oneNum; j <= n; j++) {
        dp[i][j] = Math.max(dp[i][j], dp[i - zeroNum][j - oneNum] + 1);
        console.log(dp);
      }
    }
  }
~~~

## 5.举例推导dp数组

输入：["10","0001","111001","1","0"]，m = 3，n = 3

| dp\[i][j] | 0    | 1    | 2    | 3    |
| --------- | ---- | ---- | ---- | ---- |
| 0         | 0    | 1    | 1    | 1    |
| 1         | 1    | 2    | 2    | 2    |
| 2         | 1    | 2    | 3    | 3    |
| 3         | 1    | 2    | 3    | 3    |

## 代码

~~~js
var findMaxForm = function (strs, m, n) {
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  const len = strs.length;

  for (let i = 0; i < len; i++) {
    let zeroNum = 0;
    let oneNum = 0;
    for (let j = 0; j < strs[i].length; j++) {
      if (strs[i][j] === "1") {
        oneNum++;
      } else {
        zeroNum++;
      }
    }

    for (let i = m; i >= zeroNum; i--) {
      for (let j = n; j >= oneNum; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - zeroNum][j - oneNum] + 1);
      }
    }
  }

  return dp[m][n];
};
~~~

