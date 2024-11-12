import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Samsang的笔记仓库",
  description: "个人笔记分享记录",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Java', 
        items: [
          {text: 'Java 01 语法基础', link: '/MD笔记/Java 01 语法基础'},
          {text: 'Java 02 面向对象', link: '/MD笔记/Java 02 面向对象'},
          {text: 'Java 03 常用的API与包装类', link: '/MD笔记/Java 03 常用的API与包装类'},
          {text: 'Java 04 常见算法-查找-排序-lambda表达式', link: '/MD笔记/Java 04 常见算法-查找-排序-lambda表达式'},
          {text: 'Java 05 数据结构&集合进阶(必看👍)&泛型', link: '/MD笔记/Java 05 数据结构&集合进阶(必看👍)&泛型'},
          {text: 'Java 06 Stream流&方法引用', link: '/MD笔记/Java 06 Stream流&方法引用'},
          {text: 'Java 07 异常&File&IO流&设计模式&IO模型', link: '/MD笔记/Java 07 异常&File&IO流&设计模式&IO模型'},
          {text: 'Java 08 多线程(并发编程必看👍)&JUC&JMM', link: '/MD笔记/Java 08 多线程(并发编程必看👍)&JUC&JMM'},
          {text: 'Java 09 反射&动态代理&SPI机制&Unsafe', link: '/MD笔记/Java 09 反射&动态代理&SPI机制&Unsafe'},
          {text: 'Java 10 JVM(必看👍)', link: '/MD笔记/Java 10 JVM(必看👍)'},
          {text: 'Java 11 新特性', link: '/MD笔记/Java 11 新特性'},
          {text: 'Java 12 计算机基础-网络', link: '/MD笔记/Java 12 计算机基础-网络'},
          {text: 'Java 13 计算机基础-操作系统', link: '/MD笔记/Java 13 计算机基础-操作系统'},
          {text: 'Java 14 计算机基础-数据结构&算法', link: '/MD笔记/Java 14 计算机基础-数据结构&算法'},
          {text: 'Java 15 数据库-基础-SQL-1', link: '/MD笔记/Java 15 数据库-基础-SQL-1'},
          {text: 'Java 16 数据库-基础-SQL-2', link: '/MD笔记/Java 16 数据库-基础-SQL-2'},
          {text: 'Java 17 数据库-MySQL(必看👍)', link: '/MD笔记/Java 17 数据库-MySQL(必看👍)'},
          {text: 'Java 18 数据库-Redis(必看👍-更新中)', link: '/MD笔记/Java 18 数据库-Redis(必看👍-更新中)'},
          {text: 'Java 19 数据库-Elasticsearch&MongoDB', link: '/MD笔记/Java 19 数据库-Elasticsearch&MongoDB'},
          {text: 'Java 20 开发工具-Maven', link: '/MD笔记/Java 20 开发工具-Maven'},
          {text: 'Java 21 开发工具-Gradle', link: '/MD笔记/Java 21 开发工具-Gradle'},
          {text: 'Java 22 开发工具-Git', link: '/MD笔记/Java 22 开发工具-Git'},
          {text: 'Java 23 开发工具-Docker', link: '/MD笔记/Java 23 开发工具-Docker'},
          {text: 'Java 24 常用框架-Spring&Spring Boot(必看👍)', link: '/MD笔记/Java 24 常用框架-Spring&Spring Boot(必看👍)'},
          {text: 'Java 25 常用框架-MyBatis&Netty', link: '/MD笔记/Java 25 常用框架-MyBatis&Netty'},
          {text: 'Java 26 系统设计', link: '/MD笔记/Java 26 系统设计'},
          {text: 'Java 27 分布式', link: '/MD笔记/Java 27 分布式'},
          {text: 'Java 28 高性能', link: '/MD笔记/Java 28 高性能'},
          {text: 'Java 29 高可用', link: '/MD笔记/Java 29 高可用'},
          {text: 'Letcode算法总结', link: '/MD笔记/Letcode算法总结'},
          { text: 'Git配置连接GitHub', link: '/MD笔记/Git配置连接GitHub' }
        ]
       }
    ],

    sidebar: [
      {
        text: '学习笔记',
        items: [
          { text: 'Java 01 语法基础', link: '/MD笔记/Java 01 语法基础' },
          { text: 'Java 02 面向对象', link: '/MD笔记/Java 02 面向对象' },
          { text: 'Java 03 常用的API与包装类', link: '/MD笔记/Java 03 常用的API与包装类' },
          { text: 'Java 04 常见算法-查找-排序-lambda表达式', link: '/MD笔记/Java 04 常见算法-查找-排序-lambda表达式' },
          { text: 'Java 05 数据结构&集合进阶(必看👍)&泛型', link: '/MD笔记/Java 05 数据结构&集合进阶(必看👍)&泛型' },
          { text: 'Java 06 Stream流&方法引用', link: '/MD笔记/Java 06 Stream流&方法引用' },
          { text: 'Java 07 异常&File&IO流&设计模式&IO模型', link: '/MD笔记/Java 07 异常&File&IO流&设计模式&IO模型' },
          { text: 'Java 08 多线程(并发编程必看👍)&JUC&JMM', link: '/MD笔记/Java 08 多线程(并发编程必看👍)&JUC&JMM' },
          { text: 'Java 09 反射&动态代理&SPI机制&Unsafe', link: '/MD笔记/Java 09 反射&动态代理&SPI机制&Unsafe' },
          { text: 'Java 10 JVM(必看👍)', link: '/MD笔记/Java 10 JVM(必看👍)' },
          { text: 'Java 11 新特性', link: '/MD笔记/Java 11 新特性' },
          { text: 'Java 12 计算机基础-网络', link: '/MD笔记/Java 12 计算机基础-网络' },
          { text: 'Java 13 计算机基础-操作系统', link: '/MD笔记/Java 13 计算机基础-操作系统' },
          { text: 'Java 14 计算机基础-数据结构&算法', link: '/MD笔记/Java 14 计算机基础-数据结构&算法' },
          { text: 'Java 15 数据库-基础-SQL-1', link: '/MD笔记/Java 15 数据库-基础-SQL-1' },
          { text: 'Java 16 数据库-基础-SQL-2', link: '/MD笔记/Java 16 数据库-基础-SQL-2' },
          { text: 'Java 17 数据库-MySQL(必看👍)', link: '/MD笔记/Java 17 数据库-MySQL(必看👍)' },
          { text: 'Java 18 数据库-Redis(必看👍-更新中)', link: '/MD笔记/Java 18 数据库-Redis(必看👍-更新中)' },
          { text: 'Java 19 数据库-Elasticsearch&MongoDB', link: '/MD笔记/Java 19 数据库-Elasticsearch&MongoDB' },
          { text: 'Java 20 开发工具-Maven', link: '/MD笔记/Java 20 开发工具-Maven' },
          { text: 'Java 21 开发工具-Gradle', link: '/MD笔记/Java 21 开发工具-Gradle' },
          { text: 'Java 22 开发工具-Git', link: '/MD笔记/Java 22 开发工具-Git' },
          { text: 'Java 23 开发工具-Docker', link: '/MD笔记/Java 23 开发工具-Docker' },
          { text: 'Java 24 常用框架-Spring&Spring Boot(必看👍)', link: '/MD笔记/Java 24 常用框架-Spring&Spring Boot(必看👍)' },
          { text: 'Java 25 常用框架-MyBatis&Netty', link: '/MD笔记/Java 25 常用框架-MyBatis&Netty' },
          { text: 'Java 26 系统设计', link: '/MD笔记/Java 26 系统设计' },
          { text: 'Java 27 分布式', link: '/MD笔记/Java 27 分布式' },
          { text: 'Java 28 高性能', link: '/MD笔记/Java 28 高性能' },
          { text: 'Java 29 高可用', link: '/MD笔记/Java 29 高可用' },
          { text: 'Letcode算法总结', link: '/MD笔记/Letcode算法总结' },
          { text: 'Git配置连接GitHub', link: '/MD笔记/Git配置连接GitHub' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xlouszhj' }
    ]
  }
})
