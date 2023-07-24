const { getFile } = require("../utils/utils");

/**
 * 算法目录结构
 */

// 动态规划
const dpChildren = getFile("../../arithmetic/DP", "DP/");
const listNodeChildren = getFile("../../arithmetic/array", "ListNode/");

const arithmetic = [
  "",
  {
    title: "链表",
    children: listNodeChildren,
  },
  {
    title: "动态规划",
    children: dpChildren,
  },
];

/**
 * web目录结构
 */

// Typescript
const tsChildren = getFile("../../web/ts", "ts/");

const web = [
  "html/",
  "css/",
  "js/",
  "writeJs/",
  {
    title: "Typescript",
    children: tsChildren,
  },
];

/**
 * node目录结构
 */

// nestjs
const nestChildren = getFile("../../node/nest", "nest/");

const node = [
  "",
  {
    title: "nest",
    children: nestChildren,
  },
];

/**
 * 杂项目录结构
 */
const miscellanyChild = getFile("../../miscellany");
const miscellany = [...miscellanyChild];

/**
 * 工作日记目录结构
 */
const workingDiaryChild = getFile("../../workingDiary");
const workingDiary = [...workingDiaryChild];

/**
 * electron目录结构
 */
const electron = getFile("../../electron");
const electronDir = [...electron];

module.exports = {
  arithmetic,
  web,
  node,
  miscellany,
  workingDiary,
  electronDir,
};
