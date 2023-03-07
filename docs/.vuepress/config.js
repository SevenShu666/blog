module.exports = {
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  title: "小草屋",
  description: "藏点书",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "前端", link: "/web/html/" },
      {
        text: "node",
        ariaLabel: "node Menu",
        items: [{ text: "nest", link: "/node/nest/" }],
      },
      { text: "算法", link: "/arithmetic/" },
      { text: "杂项", link: "/miscellany/" },
    ],
    sidebar: {
      "/web/": ["html/", "css/", "js/", "writeJs/"],
      "/node/nest/": [
        "/",
        "decorator",
        "nestjsCli",
        "RESTful",
        "controller",
        "Providers",
        "module",
        "middleware",
        "interceptor",
        "exceptionFilter",
        "pipe",
        "guard",
        "definitionDecorator",
        "database",
        "entity",
        "CURD",
      ],
      "/miscellany/": ["", "gitOperate", "markDown", "vuepress"],
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
