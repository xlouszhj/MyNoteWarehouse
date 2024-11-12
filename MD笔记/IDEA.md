[IDEA 使用指南](https://gitee.com/SnailClimb/awesome-idea-tutorial)  

IDEA 激活 ：[IntelliJ IDEA破解安装激活最新教程（附破解工具及激活码 建议收藏🔥） | 顶尖架构师栈 (arcstack.top)](https://arcstack.top/tools/crash/idea.html)  

# 设置

## 默认启动上次项目

`setting` ---> `Appearance & Behavior` ---> `System Settings` ---> `Reopen projects on startup` 

## 取消自动更新

`setting` ---> `Appearance & Behavior` ---> `System Settings` ---> `Updates`--->`Cheak IDE updates for:`

## 滚轮控制编辑界面字体大小

`setting` --->`Editor` ---> `General` ---> `Mouse Control` 

## 修改编辑界面字体颜色

`setting` --->`Editor` ---> `Language Defaults` ---> 

## 自动导包

`setting` --->`Editor` ---> `General` ---> `Auto Import`

## 设置项目的文件编码

一般使用 UTF-8

项目&文件：`setting` --->`Editor` ---> `File Encodings`   也可以单独为某个包或者模块设置 编码格式。

控制台： `setting` --->`Editor` ---> `General` ---> `Console` ---> `Default Encoding`

## 设置类头的文档注释信息

`setting` --->`Editor` ---> `File and Code Templates` ---> `Includes`  

```java
/**
 * ClassName: ${NAME}
 * Package: ${PACKAGE_NAME}
 * Description: 
 * @Author: ZHJ
 * @Creat: ${DATE} - ${TIME}
 * @Version: 
 * 
*/
```

## 设置自动编译

`setting` ---> `Build,Execution,Deployment` ---> `Compiler` ---> `Build project sutomatically / Compile independent modules in parallel` 

## 关闭双击 shift 搜索

`setting` ---> `Advanced Settings` ---> `User intrface` ---> `Disable double modifier key shortcuts` 

可以使用  `Ctrl + N`    根据输入的 类名 查找类文件

## 设置多行tabs

`setting` --->`Editor` ---> `General` ---> `Editor Tabs` ---> `Show tabs in one row` 

# IDEA 项目结构

> project(项目) --- module(模块) --- pakage(包) --- class(类)
>
> 一个 project 中可以创建多个 module 
>
> 一个 module 中可以创建多个 package
>
> 一个 package 中可以创建多个 class

`File` ---> `Project Structure`

模块之间可以 相互依赖

![image-20240327220343596](images\image-20240327220343596.png)

## 项目和模块的导入

导入已有的模块：

1. 直接文件管理器 复制到 相应文件目录：此时在IDEA里只是普通的文件目录 ---> `File` ---> `Project Structure` ---> `Module` ---> `Import Module` ---> 选中导入的文件目录即可。
2. 也可以在IDEA里新建一个模块 ---> 在IDEA里复制 要导入的模块 粘贴到 新建的模块。

导入包或者类：

直接复制到相应的模块或者包下即可。注意 文件编码是否相同。

## 删除模块

`右键` ---> `Remve Module` : 不会真的删掉文件，只是从模块变成普通的文件目录了 ---> `再次右键` ---> `Delete` ：真的删除了，不走回收站！

## 删除包或者类

 `右键` ---> `Delete`  会直接删除，不走回收站。

## 修改模块或包或类名

`右键` ---> `Refactor` ---> `Rename`  ：IDEA里的名字和文件管理器里的文件名都会改成一样的，会自动修改代码中的名字。

# JDK 的配置

`File` ---> `Project Structure` ---> `SDKs`  可以查看使用的JDK，也可以导入更换 其他版本的 JDK，如果电脑里安装了的话。

`File` ---> `Project Structure` ---> `Project` ---> `SDk:` 当前项目使用的JDK版本，可以进行更换。

`File` ---> `Project Structure` ---> `Project` ---> `Language level:`   当前项目代码的语言规范支持哪一个JDK版本。

`File` ---> `Project Structure` ---> `Project` ---> `Compiler output：` 当前项目编译的**字节码文件**存储目录。

# 快捷键

`ctrl + alt + L`  自动格式化代码
`ctrl + shift + /`  整体注释
`ctrl + P`   查看方法的参数
`ctrl + Alt + M`   自动抽取方法
`Ctrl + D`     复制光标所在行 或 复制选择内容，并把复制内容插入光标位置下面
`Ctrl + Y`     删除光标所在行 或 删除选中的行
`Ctrl + N`    根据输入的 类名 查找类文件
`Ctrl + B`     进入光标所在的方法/变量的接口或是定义处，等效于 Ctrl + 左键单击
`Ctrl + R`     在当前文件进行文本替换
`Ctrl + U`    前往当前光标所在的方法的父类的方法 / 接口定义
`Ctrl + /`    注释光标所在行代码，会根据当前不同文件类型使用不同的注释符号
`Ctrl + Shift + 前/后方向键`   光标放在方法名上，将方法移动到上/下一个方法前面，调整方法排序
`Alt + Shift + 前方向键`    移动光标所在行向上移动
`Alt + Insert`      快捷生成构造方法和get/set方法

# 常见的代码模板

`Settings` ---> `Editor` ---> `General` ---> `Postfix Completion`  后缀补全

`Settings` ---> `Editor` ---> `	Live Templates`  模板

- 创建对象
  - `Xxx.new.var` ： 创建Xxx类的对象，并赋给相应的变量。
  - `Xxx.new.filed` ： 会将方法内刚创建的Xxx对象抽取为一个属性。

- 强转
  - `对象.cast` ： 将对象进行强转。
  - `对象.castvar` ：将对象强转后，并赋值给一个变量。

- 静态常量声明
  - `psf` ： public static final
  - `psfi` ： public static final int
  - `psfs`：public static final String
  - `prsf`：private static final

- 非空判断
  - `变量.null` ：if(变量 == null)
  - `变量.nn` ：if(变量 != null)
  - `变量.notnull` ：if(变量 != null)
  - `ifn` ：if(xx == null)
  - `inn` ：if(xx != null)

- 变量数组或集合
  - `数组或集合变量.fori` ：for循环
  - `数组或集合变量.for` ：增强for循环
  - `数组或集合变量.forr` ：反向for循环
  - `数组或集合变量.iter` ：增强for循环遍历数组或集合

## 自定义代码模板

自定义后缀补全：

![image-20240327230045549](images\image-20240327230045549.png)

```java
Integer.list  ---->  ArrayList<Integer> list = new ArrayList<>();
```





















































