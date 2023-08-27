const { getFile } = require("../utils/utils");

/**
 * 算法目录结构
 */
const dpChildren = getFile("../../arithmetic/DP", "DP/");
const listNodeChildren = getFile("../../arithmetic/ListNode", "ListNode/");
const mapChildren = getFile("../../arithmetic/Map", "Map/");
const stringChildren = getFile("../../arithmetic/String", "String/");
const twoPointersChildren = getFile(
  "../../arithmetic/TwoPointers",
  "TwoPointers/"
);
const stackAndQueueChildren = getFile(
  "../../arithmetic/StackAndQueue",
  "StackAndQueue/"
);
const binaryTreeChildren = getFile(
  "../../arithmetic/BinaryTree",
  "BinaryTree/"
);
const backTrackingChildren = getFile(
  "../../arithmetic/BackTracking",
  "BackTracking/"
);
const greedyAlgorithmChildren = getFile(
  "../../arithmetic/GreedyAlgorithm",
  "GreedyAlgorithm/"
);
const monotoneStackChildren = getFile(
  "../../arithmetic/MonotoneStack",
  "MonotoneStack/"
);

const arithmetic = [
  "",
  {
    title: "链表",
    children: listNodeChildren,
  },
  {
    title: "哈希表",
    children: mapChildren,
  },
  {
    title: "字符串",
    children: stringChildren,
  },
  {
    title: "双指针",
    children: twoPointersChildren,
  },
  {
    title: "栈和队列",
    children: stackAndQueueChildren,
  },
  {
    title: "二叉树",
    children: binaryTreeChildren,
  },
  {
    title: "回溯算法",
    children: backTrackingChildren,
  },
  {
    title: "贪心算法",
    children: greedyAlgorithmChildren,
  },
  {
    title: "动态规划",
    children: dpChildren,
  },
  {
    title: "单调栈",
    children: monotoneStackChildren,
  },
];

module.exports = arithmetic;
