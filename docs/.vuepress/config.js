const {
  arithmetic,
  web,
  node,
  miscellany,
  workingDiary,
  electronDir,
} = require("./fileConifg/index.js");

const config = {
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  title: "小草屋",
  description: "藏点书",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "前端", link: "/web/html/" },
      { text: "node", link: "/node/" },
      { text: "算法", link: "/arithmetic/" },
      { text: "杂项", link: "/miscellany/" },
      { text: "工作日记", link: "/workingDiary/" },
      { text: "electron", link: "/electron/" },
    ],
    sidebar: {
      "/web/": web,
      "/node/": node,
      "/arithmetic/": arithmetic,
      "/miscellany/": miscellany,
      "/workingDiary/": workingDiary,
      "/electron/": electronDir,
    },
    sidebarDepth: 2,
    lastUpdated: "Last Updated",
    smoothScroll: true,
  },
  plugins: [
    "@vuepress/back-to-top",
    "@vuepress/active-header-links",
    [
      "@vuepress/register-components",

      {
        componentsDir: "./components",
      },
    ],
  ],
};

module.exports = config;
