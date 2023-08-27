const { getFile } = require("../utils/utils");

/**
 * node目录结构
 */
const nestChildren = getFile("../../node/nest", "nest/");

const node = [
  "",
  {
    title: "nest",
    children: nestChildren,
  },
];

module.exports = node;
