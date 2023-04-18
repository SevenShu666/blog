# 零钱兑换 II

[力扣题目链接](https://leetcode.cn/problems/coin-change-ii/)

## 题目

给你一个整数数组 `coins` 表示不同面额的硬币，另给一个整数 `amount` 表示总金额。

请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 `0` 。

假设每一种面额的硬币有无限个。 

题目数据保证结果符合 32 位带符号整数。

**示例 1：**

```
输入：amount = 5, coins = [1, 2, 5]
输出：4
解释：有四种方式可以凑成总金额：
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

**示例 2：**

```
输入：amount = 3, coins = [2]
输出：0
解释：只用面额 2 的硬币不能凑成总金额 3 。
```

**示例 3：**

```
输入：amount = 10, coins = [10] 
输出：1
```

**提示：**

- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`
- `coins` 中的所有值 **互不相同**
- `0 <= amount <= 5000`

## 思路

### 1.确定dp数组以及下标的含义

dp[j]:凑成金额j的组合数有dp[j]

### 2.确定递推公式

- 有1的话，那么凑成金额j的组合数有dp[j-1]
- 有2的话，那么凑成金额j的组合数有dp[j-2]
- 有5的话，那么凑成金额j的组合数有dp[j-5]

那么dp[j]的总组合数有dp[j-1]+dp[j-2]+dp[j-5]，那么递推公式：

~~~js
dp[j]+=dp[j-coins[i]]
~~~

### 3.dp数组如何初始化

如果amount=1，coins=[1],那么dp[1] = dp[1-1] = dp[0]，因此初始化dp[0]=1

### 4.确定遍历顺序

先来看 外层for循环遍历物品（钱币），内层for遍历背包（金钱总额）的情况。

~~~js
for (let i = 0; i < n; i++) {
  for (let j = coins[i]; j <= amount; j++) {
    dp[j] += dp[j - coins[i]];
  }
}
~~~

假设：coins[0] = 1，coins[1] = 5。

那么先是把1加入计算，然后再把5加入计算，得到的方法数量只有{1,5}这种，不会出现{5,1}的情况。

**所以这种遍历顺序中dp[j]里计算的是组合数！**

如果把两个for交换顺序

~~~js
for (let j = 0; j <= amount; j++) {
  for (let i = 0; i < n; i++) {
    if (j - coins[i] >= 0) dp[j] += dp[j - coins[i]];
  }
}
~~~

背包容量的每一个值，都是经过 1 和 5 的计算，包含了{1, 5} 和 {5, 1}两种情况。

**此时dp[j]里算出来的就是排列数！**

### 5.举例推导dp数组

输入: amount = 5, coins = [1, 2, 5] 

| dp[j]     | 0    | 1    | 2    | 3    | 4    | 5    |
| --------- | ---- | ---- | ---- | ---- | ---- | ---- |
| coins [1] | 1    | 1    | 1    | 1    | 1    | 1    |
| coins [2] | 1    | 1    | 2    | 2    | 3    | 3    |
| coins [3] | 1    | 1    | 2    | 2    | 3    | 4    |

## 代码

~~~js
var change = function (amount, coins) {
  const n = coins.length;
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }
  console.log(dp);
  return dp[amount];
};
~~~

- 时间复杂度：O(m × n) , m是amount大小，m其实没有amount大，n为coins的长度
- 空间复杂度：O(m)