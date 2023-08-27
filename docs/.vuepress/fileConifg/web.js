const { getFile } = require("../utils/utils");

/**
 * web目录结构
 */
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

module.exports = web;
