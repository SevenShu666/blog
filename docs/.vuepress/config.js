const {
  arithmetic,
  web,
  node,
  miscellany,
  workingDiary,
  electron,
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
      {
        text: "工具",
        items: [
          {
            text: "vue",
            link: "https://cn.vuejs.org/",
            target: "_blank",
          },
          {
            text: "vue-router",
            link: "https://router.vuejs.org/zh/",
            target: "_blank",
          },
          {
            text: "pinia",
            link: "https://pinia.vuejs.org/zh/",
            target: "_blank",
          },
          {
            text: "react",
            link: "https://react.docschina.org/",
            target: "_blank",
          },
          {
            text: "vite",
            link: "https://vitejs.cn/",
            target: "_blank",
          },
          {
            text: "webpack",
            link: "https://webpack.js.org/",
            target: "_blank",
          },
          {
            text: "typescript",
            link: "https://www.typescriptlang.org/zh/",
            target: "_blank",
          },
          {
            text: "electron",
            link: "https://www.electronjs.org/zh/docs/latest/",
            target: "_blank",
          },
          {
            text: "flutter",
            link: "https://flutter.cn/multi-platform/mobile",
            target: "_blank",
          },
          {
            text: "reactnative",
            link: "https://www.reactnative.cn/",
            target: "_blank",
          },
          {
            text: "nestjs",
            link: "https://docs.nestjs.cn/9/firststeps",
            target: "_blank",
          },
          {
            text: "elementUI",
            link: "https://element.faas.ele.me/#/zh-CN",
            target: "_blank",
          },
          {
            text: "antDesign",
            link: "https://ant.design/index-cn",
            target: "_blank",
          },
          {
            text: "vant",
            link: "https://vant-ui.github.io/vant/#/zh-CN/",
            target: "_blank",
          },
          {
            text: "momentjs",
            link: "https://momentjs.cn/",
            target: "_blank",
          },
          {
            text: "即时设计",
            link: "https://js.design/login?by=phone",
            target: "_blank",
          },
        ],
      },
      { text: "electron", link: "/electron/" },
      { text: "杂项", link: "/miscellany/" },
      { text: "工作日记", link: "/workingDiary/" },
    ],
    sidebar: {
      "/web/": web,
      "/node/": node,
      "/arithmetic/": arithmetic,
      "/miscellany/": miscellany,
      "/workingDiary/": workingDiary,
      "/electron/": electron,
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
