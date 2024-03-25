const { getFile } = require("../utils/utils");

/**
 * node目录结构
 */
const nodeChildren = getFile("../../node/node", "node/");
const nestChildren = getFile("../../node/nest", "nest/");

const node = [
  "",
  {
    title: "node",
    children: nodeChildren,
  },
  {
    title: "nest",
    children: nestChildren,
  },
];

module.exports = node;
