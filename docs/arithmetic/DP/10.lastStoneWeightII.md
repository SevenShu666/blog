# 最后一块石头的重量 II

[力扣题目链接](https://leetcode.cn/problems/last-stone-weight-ii/)

## 题目

有一堆石头，用整数数组 `stones` 表示。其中 `stones[i]` 表示第 `i` 块石头的重量。

每一回合，从中选出**任意两块石头**，然后将它们一起粉碎。假设石头的重量分别为 `x` 和 `y`，且 `x <= y`。那么粉碎的可能结果如下：

- 如果 `x == y`，那么两块石头都会被完全粉碎；
- 如果 `x != y`，那么重量为 `x` 的石头将会完全粉碎，而重量为 `y` 的石头新重量为 `y-x`。

最后，**最多只会剩下一块** 石头。返回此石头 **最小的可能重量** 。如果没有石头剩下，就返回 `0`。

 

**示例 1：**

```
输入：stones = [2,7,4,1,8,1]
输出：1
解释：
组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]，
组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]，
组合 2 和 1，得到 1，所以数组转化为 [1,1,1]，
组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
```

**示例 2：**

```
输入：stones = [31,26,33,21,40]
输出：5
```

**提示：**

- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 100`

## 思路

### 1.确定dp数组以及下标的含义

dp[j]表示容量（这里说容量更形象，其实就是重量）为j的背包，最多可以背最大重量为dp[j]。

### 2.确定递推公式

dp[j] = max(dp[j], dp[j - stones[i]] + stones[i])

### 3.dp数组如何初始化

dp[0] = 0;

### 4.确定遍历顺序

[01背包遍历顺序](/arithmetic/DP/linearArray.html)，一维dp的遍历，nums放在外循环，target在内循环，且内循环倒序。

### 5.举例推导dp数组

输入：[2,4,1,1]，此时target = (2 + 4 + 1 + 1)/2 = 4 

| 下标j    | 0    | 1    | 2    | 3    | 4    |
| -------- | ---- | ---- | ---- | ---- | ---- |
| store[0] | 0    | 0    | 2    | 2    | 2    |
| store[1] | 0    | 0    | 2    | 2    | 4    |
| store[2] | 0    | 1    | 2    | 3    | 4    |
| store[3] | 0    | 1    | 2    | 3    | 4    |

## 代码

**在计算target的时候，target = sum / 2 因为是向下取整，所以sum - dp[target] 一定是大于等于dp[target]的**。

~~~js
var lastStoneWeightII = function (stones) {
  let sum = 0;
  const n = stones.length;
  for (let i = 0; i < n; i++) {
    sum += stones[i];
  }

  const target = Math.floor(sum / 2);
  const dp = new Array(target + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = target; j >= stones[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - stones[i]] + stones[i]);
    }
  }

  return sum - dp[target] - dp[target];
};
~~~

- 时间复杂度：O(m × n) , m是石头总重量（准确的说是总重量的一半），n为石头块数
- 空间复杂度：O(m)