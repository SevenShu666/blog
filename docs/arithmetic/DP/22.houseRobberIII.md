# 打家劫舍 III

[力扣题目链接](https://leetcode.cn/problems/house-robber-ii/)

## 题目

小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 `root` 。

除了 `root` 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 **两个直接相连的房子在同一天晚上被打劫** ，房屋将自动报警。

给定二叉树的 `root` 。返回 ***在不触动警报的情况下** ，小偷能够盗取的最高金额* 。

**示例 1:**

![img](https://assets.leetcode.com/uploads/2021/03/10/rob1-tree.jpg)

```
输入: root = [3,2,3,null,3,null,1]
输出: 7 
解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7
```

**示例 2:**

![img](https://assets.leetcode.com/uploads/2021/03/10/rob2-tree.jpg)

```
输入: root = [3,4,5,1,3,null,1]
输出: 9
解释: 小偷一晚能够盗取的最高金额 4 + 5 = 9
```

**提示：**

- 树的节点数在 `[1, 104]` 范围内
- `0 <= Node.val <= 104`

## 思路

对于树就要考虑到遍历方式，前中后序（深度优先搜索）还是层序遍历（广度优先搜索）。

**本题一定是要后序遍历，因为通过递归函数的返回值来做下一步计算**。

如果抢了当前节点，两个孩子就不能动，如果没抢当前节点，就可以**考虑**抢左右孩子（不一定要抢左右孩子，抢和不抢还是根据哪个收益高了来）

### 1.确定递归函数的参数和返回值

入参就是树节点，需要得到一个节点 偷与不偷的两个状态所得到的金钱，那么返回值就是一个长度为2的数组。

~~~js
function robTree(cur) {
  if (!cur) return [0, 0];

  const left = robTree(cur.left);
  const right = robTree(cur.right);

  const val1 = cur.val + left[0] + right[0];
  const val2 = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

  return [val2, val1];
}
~~~

这里的返回数组就是dp数组。

dp数组以及下标的含义：下标为0记录不偷该节点所得到的的最大金钱，下标为1记录偷该节点所得到的的最大金钱。

###  2.确定终止条件

如果遇到空节点的话，无论偷还是不偷都是0

~~~js
if (!cur) return [0, 0];
~~~

### 3.确定遍历顺序

通过递归左节点，得到左节点偷与不偷的金钱。

通过递归右节点，得到右节点偷与不偷的金钱。

~~~js
const left = robTree(cur.left);
const right = robTree(cur.right);
~~~

### 4.确定单层递归的逻辑

如果是偷当前节点，那么左右孩子就不能偷，const val1 = cur.val + left[0] + right[0];

如果不偷当前节点，那么左右孩子就可以偷，至于到底偷不偷一定是选一个最大的，const val2 = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

~~~js
const val1 = cur.val + left[0] + right[0];
const val2 = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
~~~

## 代码

### 深度优先搜索（超时）

~~~js
var rob = function (root) {
  return backTracking(root);
};

function backTracking(cur) {
  if (!cur) return 0;

  let val1 = cur.val;
  if (cur.left) {
    val1 += backTracking(cur.left.left) + backTracking(cur.left.right);
  }
  if (cur.right) {
    val1 += backTracking(cur.right.left) + backTracking(cur.right.right);
  }

  const val2 = backTracking(cur.left) + backTracking(cur.right);

  return Math.max(val1, val2);
}
~~~

- 时间复杂度：O(n^2)，这个时间复杂度不太标准，也不容易准确化，例如越往下的节点重复计算次数就越多
- 空间复杂度：O(log n)，算上递推系统栈的空间

### 动态规划

~~~js
var rob = function (root) {
  const res = robTree(root);

  return Math.max(res[0], res[1]);
};

function robTree(cur) {
  if (!cur) return [0, 0];

  const left = robTree(cur.left);
  const right = robTree(cur.right);

  const val1 = cur.val + left[0] + right[0];
  const val2 = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

  return [val2, val1];
}
~~~

- 时间复杂度：O(n)，每个节点只遍历了一次
- 空间复杂度：O(log n)，算上递推系统栈的空间