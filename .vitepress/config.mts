import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Samsang的笔记仓库",
  description: "个人笔记分享记录",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Git', 
        items: [
          { text: 'Git配置连接GitHub', link: '/MD笔记/Git配置连接GitHub'},
          { text: 'Git常用命令', link: '/MD笔记/Git常用命令' }
        ]
       }
    ],

    sidebar: [
      {
        text: 'Git',
        collapsed: false,
        items: [
          { text: 'Git配置连接GitHub', link: '/MD笔记/Git配置连接GitHub' },
          { text: 'Git常用命令', link: '/MD笔记/Git常用命令' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xlouszhj' }
    ]
  }
})
