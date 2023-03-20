module.exports = {
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
    ],
    sidebar: {
      "/web/": [
        "html/",
        "css/",
        "js/",
        "writeJs/",
        {
          title: "Typescript",
          children: [
            "ts/",
            "ts/assert",
            "ts/guard",
            "ts/type",
            "ts/crossType",
            "ts/function",
          ],
        },
      ],
      "/node/": [
        "",
        {
          title: "nest",
          children: [
            "nest/",
            "nest/decorator",
            "nest/nestjsCli",
            "nest/RESTful",
            "nest/controller",
            "nest/Providers",
            "nest/module",
            "nest/middleware",
            "nest/interceptor",
            "nest/exceptionFilter",
            "nest/pipe",
            "nest/guard",
            "nest/definitionDecorator",
            "nest/database",
            "nest/entity",
            "nest/CURD",
          ],
        },
      ],
      "/arithmetic/": [
        "",
        {
          title: "动态规划",
          children: [
            "DP/",
            "DP/fibonacci",
            "DP/climbStairs",
            "DP/diffPath",
            "DP/climbStairsII",
            "DP/integerBreak",
            "DP/uniqueBinarySearchTrees",
          ],
        },
      ],
      "/miscellany/": ["", "gitOperate", "markDown", "vuepress"],
      "/workingDiary/": [""],
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
