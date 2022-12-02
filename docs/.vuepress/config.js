module.exports = {
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  title: "小草屋",
  description: "藏点书",
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      {
        text: "前端",
        link: "/web/html/",
      },
      { text: "node", link: "/node/" },
      { text: "算法", link: "/arithmetic/" },
      { text: "MD", link: "/markDown/" },
    ],
    sidebar: {
      "/web/": [
        {
          title: "", // 必要的
          // path: "/web/html/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: [
            ["html/", "第一个"],
            ["html/one", "第二个"],
            ["html/two", "第三个"],
          ],
        },
        {
          title: "", // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          sidebarDepth: 2, // 可选的, 默认值是 1
          children: ["css/"],
        },
      ],
      "/markDown/": [
        {
          title: "",
          collapsable: false,
          sidebarDepth: 2,
          children: [""],
        },
      ],
    },
    lastUpdated: "Last Updated",
    smoothScroll: true,
  },
  plugins: ["@vuepress/back-to-top"],
};
