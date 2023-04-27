const { defaultTheme } = require('@vuepress/theme-default')
// const moment = require('moment')
const { searchPlugin } = require('@vuepress/plugin-search')
const { copyCodePlugin } = require("vuepress-plugin-copy-code2");

module.exports = {
  lang: 'zh-CN',
  title: '革命尚未成功，同志仍须努力',
  port: 8888,
  description: '逝者如斯夫，不舍昼夜',
  colorModeSwitch: true,
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  theme: defaultTheme({
    lastUpdatedText:'上次更新',
    contributorsText:'作者',
    logo: '/images/logo.png',
    logoDark: '/images/logoDark.png',
    // 默认主题配置
    navbar: [
     
      {
        text: "前端",
        children:[
          {
            text:'JavaScript',
            link: "/Page/JavascriptMd/",
          },
          {
            text:'React相关',
            link: "/Page/ReactMd/",
          }
        ]
      },
      {
        text: "面试",
        link: "/Page/Interview/",
      },
      {
        text: "随笔杂谈",
        link: "/Page/InformalEssay/",
      },
      {
        text: "观书有感",
        link: "/Page/LookBookInspiration/",
      },
      {
        text: "杂七杂八",
        link: "/Page/Clutter/",
      },
    ],
    // 侧边栏
    sidebar: {

      // JavaScript
      "/Page/JavascriptMd/": [
         // JavaScript基础
        {
          text: "JavaScript基础",
          // 可折叠的侧边栏
          collapsible: true,
          children: [
            '/Page/JavascriptMd/jsNote/cookie.md',
            '/Page/JavascriptMd/jsNote/tongyuan.md',
            '/Page/JavascriptMd/jsNote/storage.md',
            '/Page/JavascriptMd/jsNote/history.md',
            '/Page/JavascriptMd/jsNote/Location-URL.md',
            '/Page/JavascriptMd/jsNote/BlobObject.md',
            '/Page/JavascriptMd/jsNote/git.md',
            '/Page/JavascriptMd/jsNote/jsValue.md',
            '/Page/JavascriptMd/jsNote/clone.md',
            '/Page/JavascriptMd/jsNote/trashrecycling.md',
            '/Page/JavascriptMd/jsNote/array.md',
            '/Page/JavascriptMd/jsNote/digui.md',
            '/Page/JavascriptMd/jsNote/proxy.md',
            '/Page/JavascriptMd/jsNote/eventloop.md',
            '/Page/JavascriptMd/jsNote/morphology.md',
          ]
        },

        // es6
        {
          text: "ES6",
          // 可折叠的侧边栏
          collapsible: true,
          children: ["/Page/JavascriptMd/ECMAScript6/"],
        },
        {
          text: "有用的方法",
          collapsible: true,
          children: [
            "/Page/JavascriptMd/beforeuse/"
          ],
        },
        // 踩坑日记
        {
        text: "踩坑日记及日常记录",
        // 可折叠的侧边栏
        collapsible: true,
        children: ["/Page/JavascriptMd/TreadingPit/"],
      },
      ],

      // React
      '/Page/ReactMd/':[
        {
          text: "React",
          // 可折叠的侧边栏
          collapsible: true,
          children: [
            '/Page/ReactMd/State.md',
            '/Page/ReactMd/dva.md',
          ]
        },
      ],
      // 面试
      "/Page/Interview/": [
        {
          text: "面试题",
          // 可折叠的侧边栏
          collapsible: true,
          children: [
            {
              text: 'JavaScript基础',
              link: '/Page/Interview/JSquestion/',
              children: [
                '/Page/Interview/JSquestion/JsInterView/jsInterView1.md',
                '/Page/Interview/JSquestion/JsInterView/jsInterView2.md',
                '/Page/Interview/JSquestion/JsInterView/new.md',
                '/Page/Interview/JSquestion/JsInterView/new.md',
              ],
            },
            {
              text: 'React相关',
              link: '/Page/Interview/ReactQuestion/',
              children: ['/Page/Interview/ReactQuestion/ReactInterView/'],
            },
          ],
        },
      ],
      // 随笔杂谈
      "/Page/InformalEssay/":[
        {
          text: '随笔杂谈',
          link: '/Page/InformalEssay/',
          children: ['/Page/InformalEssay/Life/README.md'],
        },
      ],

      "/Page/LookBookInspiration/":[
        {
          text: '观书有感',
          link: '/Page/LookBookInspiration/',
          children: ['/Page/LookBookInspiration/inspiration/'],
        }
      ]

    },
  }),
  themeConfig: {
    lastUpdated: '上次更新', // string | boolean
  },

  plugins: [
    [
      'vuepress-plugin-helper-live2d', {
          live2d: {
              // 是否启用(关闭请设置为false)(default: true)
              enable: true,
              // 模型名称(default: hibiki)>>>取值请参考：
              // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
              model: 'hibiki',
              display: {
                  position: "right", // 显示位置：left/right(default: 'right')
                  width: 135, // 模型的长度(default: 135)
                  height: 300, // 模型的高度(default: 300)
                  hOffset: 65, //  水平偏移(default: 65)
                  vOffset: 0, //  垂直偏移(default: 0)
              },
              mobile: {
                  show: false // 是否在移动设备上显示(default: false)
              },
              react: {
                  opacity: 0.8 // 模型透明度(default: 0.8)
              } 
          }
      }
  ],
    // 搜索
    searchPlugin({
      // 配置项
      '/': {
        placeholder: 'Search',
      },
      '/zh/': {
        placeholder: '搜索',
      },
      maxSuggestions:10
    }),
    // 复制
    copyCodePlugin({
      // 插件选项
      // pure:true
    }),

  ],

}