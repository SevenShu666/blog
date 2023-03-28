# 目标和

[力扣题目链接](https://leetcode.cn/problems/target-sum/)

## 题目

给你一个整数数组 `nums` 和一个整数 `target` 。

向数组中的每个整数前添加 `'+'` 或 `'-'` ，然后串联起所有整数，可以构造一个 **表达式** ：

- 例如，`nums = [2, 1]` ，可以在 `2` 之前添加 `'+'` ，在 `1` 之前添加 `'-'` ，然后串联起来得到表达式 `"+2-1"` 。

返回可以通过上述方法构造的、运算结果等于 `target` 的不同 **表达式** 的数目。

**示例 1：**

```
输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
```

**示例 2：**

```
输入：nums = [1], target = 1
输出：1
```

**提示：**

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 1000`
- `0 <= sum(nums[i]) <= 1000`
- `-1000 <= target <= 1000`

## 思路

假设加法的和为x，那么减法的和为sum-x；那么目标target = x - (sum-x)，可以转化为x=(sum+target)/2，这样就相当于求装满x重量的背包的方案有几种

### 1.确定dp数组以及下标的含义

dp[j]:表示容量为j的背包装满有dp[j]种方案

### 2.确定递推公式

- 有一个1（nums[i]），那么有dp[4]种方式组成5
- 有一个2（nums[i]），那么有dp[3]种方式组成5
- 有一个3（nums[i]），那么有dp[2]种方式组成5
- 有一个4（nums[i]），那么有dp[1]种方式组成5
- 有一个5（nums[i]），那么有dp[0]种方式组成5

那么凑齐dp[5]就是所有的相加，所有求组合类问题的公式，都是类似这种：
~~~js
dp[j] += dp[j - nums[i]]
~~~

### 3.dp数组如何初始化

如果数组[0]，target = 0，那么x = (target + sum) / 2 = 0，所以方案只有一种

### 4.确定遍历顺序

[01背包遍历顺序](/arithmetic/DP/linearArray.html)，一维dp的遍历，nums放在外循环，target在内循环，且内循环倒序。

### 5.举例推导dp数组

输入：nums: [1, 1, 1, 1, 1], S: 3

x = (sum + target) / 2 = (5 + 3) = 4

| 下标i   | 0    | 1    | 2    | 3    | 4    |
| ------- | ---- | ---- | ---- | ---- | ---- |
| nums[0] | 1    | 1    | 0    | 0    | 0    |
| nums[1] | 1    | 2    | 1    | 0    | 0    |
| nums[2] | 1    | 3    | 3    | 1    | 0    |
| nums[3] | 1    | 4    | 6    | 4    | 1    |
| nums[4] | 1    | 5    | 10   | 10   | 5    |

## 代码

### javascript

#### 动态规划

~~~js
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
  }

  if (Math.abs(target) > sum) return 0;
  if ((sum + target) & 1) return 0;

  const add = (sum + target) >> 1;
  const dp = new Array(add + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = add; j >= nums[i]; j--) {
      dp[j] += dp[j - nums[i]];
    }
  }
  return dp[add];
};
~~~

#### 回溯

~~~js
var findTargetSumWays = function (nums, target) {
  let res = 0;
  const n = nums.length;
  function backTracking(target, sum, n, index) {
    if (index === n) {
      if (sum === target) {
        res++;
      }
    } else {
      backTracking(target, sum + nums[index], n, index + 1);
      backTracking(target, sum - nums[index], n, index + 1);
    }
  }
  backTracking(target, 0, n, 0);
  return res;
};
~~~

### typescript

~~~ts
function findTargetSumWays(nums: number[], target: number): number {
  const n: number = nums.length;
  let sum: number = 0;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
  }

  if (Math.abs(target) > sum) return 0;
  if ((sum + target) & 1) return 0;
  const add: number = (sum + target) >> 1;
  const dp: number[] = new Array(add + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = add; j >= nums[i]; j--) {
      dp[j] += dp[j - nums[i]];
    }
  }

  return dp[add];
}
~~~

