# 分割等和子集

[力扣题目链接](https://leetcode.cn/problems/partition-equal-subset-sum/)

## 题目

给你一个 **只包含正整数** 的 **非空** 数组 `nums` 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

**示例 1：**

```
输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。
```

**示例 2：**

```
输入：nums = [1,2,3,5]
输出：false
解释：数组不能分割成两个元素和相等的子集。
```

**提示：**

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 100`

## 思路

只要找到集合里能够出现 sum / 2 的子集总和，就算是可以分割成两个相同元素和子集了

### 1.确定dp数组以及下标的含义

dp[j]表示：容量为j的背包，所背的物品价值最大可以为dp[j]

### 2.确定递推公式

背包的大小和价值都为nums[i]，所有递推公式为：dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);

### 3.dp 数组如何初始化

空间为0，那么价值也为0，dp[0]=0

### 4.确定遍历顺序

[一维dp数组遍历顺序](/arithmetic/DP/linearArray.html)，一维dp的遍历，nums放在外循环，target在内循环，且内循环倒序。

### 5.举例推导dp数组

输入[1,5,11,5] 

| 下标j | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   |
| ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| dp[j] | 0    | 1    | 1    | 1    | 1    | 5    | 6    | 6    | 6    | 6    | 10   | 11   |

## 代码

~~~js
var canPartition = function (nums) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 & 1) return false;
  const target = sum / 2;
  const dp = new Array(target + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
    }
  }

  return dp[target] === target;
};
~~~

- 时间复杂度：O(n^2)
- 空间复杂度：O(n)