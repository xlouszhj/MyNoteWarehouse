import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Samsang的笔记仓库",
  description: "个人笔记分享记录",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '学习笔记', 
        items: [
          {text: 'Git配置连接GitHub', link: '/MD笔记/Git配置连接GitHub'}
        ]
       }
    ],

    sidebar: [
      {
        text: '学习笔记',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Git配置连接GitHub', link: '/MD笔记/Git配置连接GitHub' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xlouszhj' }
    ]
  }
})
