# 不同路径II

[力扣题目链接](https://leetcode.cn/problems/unique-paths-ii/)

## 题目

一个机器人位于一个 `m x n` 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

网格中的障碍物和空位置分别用 `1` 和 `0` 来表示。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg)

```
输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg)

```
输入：obstacleGrid = [[0,1],[0,0]]
输出：1
```

**提示：**

- `m == obstacleGrid.length`
- `n == obstacleGrid[i].length`
- `1 <= m, n <= 100`
- `obstacleGrid[i][j]` 为 `0` 或 `1`

## 思路

### 1.确定dp数组（dp table）以及下标的含义

dp[i][j] ：表示从（0 ，0）出发，到(i, j) 有dp[i][j]条不同的路径。

### 2.确定递推公式

dp[i]\[j] = dp[i - 1]\[j] + dp[i]\[j - 1]

因为有路障，(i, j)如果是障碍的话就保持0

~~~js
if (obstacleGrid[i][j] === 1) {
  dp[i][j] = 0;
} else {
  dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
}
~~~

### 3.dp数组如何初始化

如果是路障，保持值为0

~~~js
for (let i = 0; i < n; i++) {
  if (obstacleGrid[i][0] === 1) break;
  dp[i][0] = 1;
}
for (let i = 0; i < m; i++) {
  if (obstacleGrid[0][i] === 1) break;
  dp[0][i] = 1;
}
~~~

### 4.确定遍历顺序

从左到右一层一层遍历

~~~js
for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
    	if (obstacleGrid[i][j] === 1) {
    		dp[i][j] = 0;
        } else {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
}
~~~

### 5.举例推导dp数组

| 1    | 1    | 1    |
| ---- | ---- | ---- |
| 1    | 0    | 1    |
| 1    | 1    | 2    |

## 代码

~~~js
var uniquePathsWithObstacles = function (obstacleGrid) {
  const n = obstacleGrid.length;
  const m = obstacleGrid[0].length;

  const dp = new Array(n).fill(0).map((i) => new Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    if (obstacleGrid[i][0] === 1) break;
    dp[i][0] = 1;
  }
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[0][i] === 1) break;
    dp[0][i] = 1;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[n - 1][m - 1];
};
~~~

- 时间复杂度：O(n × m)
- 空间复杂度：O(n × m)