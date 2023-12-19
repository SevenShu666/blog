const { getFile } = require("../utils/utils");

/**
 * web目录结构
 */
const tsChildren = getFile("../../web/ts", "ts/");

const web = [
  "html/",
  "css/",
  "js/",
  "http/",
  "writeJs/",
  "output/",
  "regExp/",
  "vue3.0/",
  "vite/",
  {
    title: "Typescript",
    children: tsChildren,
  },
];

module.exports = web;
