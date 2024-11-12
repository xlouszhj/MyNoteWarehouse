[toc]

# Git核心概念总结

## 版本控制

### 什么是版本控制

版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。 除了项目源代码，你可以对任何类型的文件进行版本控制。

### 为什么要版本控制

有了它你就可以将某个文件回溯到之前的状态，甚至将整个项目都回退到过去某个时间点的状态，你可以比较文件的变化细节，查出最后是谁修改了哪个地方，从而找出导致怪异问题出现的原因，又是谁在何时报告了某个功能缺陷等等。

### 本地版本控制系统

许多人习惯用复制整个项目目录的方式来保存不同的版本，或许还会改名加上备份时间以示区别。 这么做唯一的好处就是简单，但是特别容易犯错。 有时候会混淆所在的工作目录，一不小心会写错文件或者覆盖意想外的文件。

为了解决这个问题，人们很久以前就开发了许多种本地版本控制系统，大多都是采用某种简单的数据库来记录文件的历次更新差异。

![](images\本地版本控制系统.png)

### 集中化的版本控制系统

接下来人们又遇到一个问题，如何让在不同系统上的开发者协同工作？ 于是，集中化的版本控制系统（Centralized Version Control Systems，简称 CVCS）应运而生。

集中化的版本控制系统都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。

![](images\集中化的版本控制系统.png)

这么做虽然解决了本地版本控制系统无法让在不同系统上的开发者协同工作的诟病，但也还是存在下面的问题：

- **单点故障：** 中央服务器宕机，则其他人无法使用；如果中心数据库磁盘损坏又没有进行备份，你将丢失所有数据。本地版本控制系统也存在类似问题，只要整个项目的历史记录被保存在单一位置，就有丢失所有历史更新记录的风险。
- **必须联网才能工作：** 受网络状况、带宽影响。

### 分布式版本控制系统

于是分布式版本控制系统（Distributed Version Control System，简称 DVCS）面世了。 Git 就是一个典型的分布式版本控制系统。

这类系统，客户端并不只提取最新版本的文件快照，而是**把代码仓库完整地镜像下来**。 这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。 因为每一次的克隆操作，实际上都是一次对代码仓库的完整备份。

![](images\分布式版本控制系统.png)

分布式版本控制系统可以不用联网就可以工作，因为每个人的电脑上都是完整的版本库，当你修改了某个文件后，你只需要将自己的修改推送给别人就可以了。但是，在实际使用分布式版本控制系统的时候，很少会直接进行推送修改，而是使用一台充当“中央服务器”的东西。这个服务器的作用仅仅是用来方便“交换”大家的修改，没有它大家也一样干活，只是交换修改不方便而已。

分布式版本控制系统的优势不单是不必联网这么简单，后面我们还会看到 Git 极其强大的分支管理等功能。

## 认识 Git

### Git 简史

Linux 内核项目组当时使用分布式版本控制系统 BitKeeper 来管理和维护代码。但是，后来开发 BitKeeper 的商业公司同 Linux 内核开源社区的合作关系结束，他们收回了 Linux 内核社区免费使用 BitKeeper 的权力。 Linux 开源社区（特别是 Linux 的缔造者 Linus Torvalds）基于使用 BitKeeper 时的经验教训，开发出自己的版本系统，而且对新的版本控制系统做了很多改进。

### Git 与其他版本管理系统的主要区别

Git 在保存和对待各种信息的时候与其它版本控制系统有很大差异，尽管操作起来的命令形式非常相近，理解这些差异将有助于防止你使用中的困惑。

下面我们主要说一个关于 Git 与其他版本管理系统的主要差别：**对待数据的方式**。

**Git 采用的是直接记录快照的方式，而非差异比较。我后面会详细介绍这两种方式的差别。**

大部分版本控制系统（CVS、Subversion、Perforce、Bazaar 等等）都是以文件变更列表的方式存储信息，这类系统**将它们保存的信息看作是一组基本文件和每个文件随时间逐步累积的差异。**

具体原理如下图所示，理解起来其实很简单，每当我们提交更新一个文件之后，系统都会记录这个文件做了哪些更新，以增量符号 Δ(Delta)表示。

![](images\2019-3deltas.png)

**我们怎样才能得到一个文件的最终版本呢？**

很简单，高中数学的基本知识，我们只需要将这些原文件和这些增加进行相加就行了。

**这种方式有什么问题呢？**

比如我们的增量特别特别多的话，如果我们要得到最终的文件是不是会耗费时间和性能。

Git 不按照以上方式对待或保存数据。 反之，Git 更像是**把数据看作是对小型文件系统的一组快照**。 每次你提交更新，或在 Git 中保存项目状态时，它主要对当时的全部文件制作一个快照并保存这个快照的索引。 为了高效，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 **快照流**。

![](images\2019-3snapshots.png)

### Git 的三种状态

Git 有三种状态，你的文件可能处于其中之一：

1. **已提交（committed）**：数据已经安全的保存在本地数据库中。
2. **已修改（modified）**：已修改表示修改了文件，但还没保存到数据库中。
3. **已暂存（staged）**：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

由此引入 Git 项目的三个工作区域的概念：**Git 仓库(.git directory)**、**工作目录(Working Directory)** 以及 **暂存区域(Staging Area)** 。

![](images\2019-3areas.png)

**基本的 Git 工作流程如下：**

1. 在工作目录中修改文件。
2. 暂存文件，将文件的快照放入暂存区域。
3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。

## Git 使用快速入门

### 获取 Git 仓库

有两种取得 Git 项目仓库的方法。

1. 在现有目录中初始化仓库: 进入项目目录运行 `git init` 命令,该命令将创建一个名为 `.git` 的子目录。
2. 从一个服务器克隆一个现有的 Git 仓库: `git clone [url]` 自定义本地仓库的名字: `git clone [url] directoryname`

### 记录每次更新到仓库

1. **检测当前文件状态** : `git status`
2. **提出更改（把它们添加到暂存区**）：`git add filename` (针对特定文件)、`git add *`(所有文件)、`git add *.txt`（支持通配符，所有 .txt 文件）
3. **忽略文件**：`.gitignore` 文件
4. **提交更新:** `git commit -m "代码提交信息"` （每次准备提交前，先用 `git status` 看下，是不是都已暂存起来了， 然后再运行提交命令 `git commit`）
5. **跳过使用暂存区域更新的方式** : `git commit -a -m "代码提交信息"`。 `git commit` 加上 `-a` 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤。
6. **移除文件**：`git rm filename` （从暂存区域移除，然后提交。）
7. **对文件重命名**：`git mv README.md README`(这个命令相当于`mv README.md README`、`git rm README.md`、`git add README` 这三条命令的集合)

### 一个好的 Git 提交消息

一个好的 Git 提交消息如下：

```plain
标题行：用这一行来描述和解释你的这次提交

主体部分可以是很少的几行，来加入更多的细节来解释提交，最好是能给出一些相关的背景或者解释这个提交能修复和解决什么问题。

主体部分当然也可以有几段，但是一定要注意换行和句子不要太长。因为这样在使用 "git log" 的时候会有缩进比较好看。
```

提交的标题行描述应该尽量的清晰和尽量的一句话概括。这样就方便相关的 Git 日志查看工具显示和其他人的阅读。

### 推送改动到远程仓库

- 如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加：`git remote add origin <server>` ,比如我们要让本地的一个仓库和 GitHub 上创建的一个仓库关联可以这样`git remote add origin https://github.com/Snailclimb/test.git`

- 将这些改动提交到远端仓库：`git push origin master` (可以把 *master* 换成你想要推送的任何分支)

  如此你就能够将你的改动推送到所添加的服务器上去了。

### 远程仓库的移除与重命名

- 将 test 重命名为 test1：`git remote rename test test1`
- 移除远程仓库 test1:`git remote rm test1`

### 查看提交历史

在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史。 完成这个任务最简单而又有效的工具是 `git log` 命令。`git log` 会按提交时间列出所有的更新，最近的更新排在最上面。

**可以添加一些参数来查看自己希望看到的内容：**

只看某个人的提交记录：

```bash
git log --author=bob
```

### 撤销操作

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以运行带有 `--amend` 选项的提交命令尝试重新提交：

```bash
git commit --amend
```

取消暂存的文件

```bash
git reset filename
```

撤消对文件的修改:

```bash
git checkout -- filename
```

假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它：

```bash
git fetch origin
git reset --hard origin/master
```

### 分支

分支是用来将特性开发绝缘开来的。在你创建仓库的时候，*master* 是“默认”的分支。在其他分支上进行开发，完成后再将它们合并到主分支上。

我们通常在开发新功能、修复一个紧急 bug 等等时候会选择创建分支。单分支开发好还是多分支开发好，还是要看具体场景来说。

创建一个名字叫做 test 的分支

```bash
git branch test
```

切换当前分支到 test（当你切换分支的时候，Git 会重置你的工作目录，使其看起来像回到了你在那个分支上最后一次提交的样子。 Git 会自动添加、删除、修改文件以确保此时你的工作目录和这个分支最后一次提交时的样子一模一样）

```bash
git checkout test
```

![](images\2019-3切换分支.png)

你也可以直接这样创建分支并切换过去(上面两条命令的合写)

```bash
git checkout -b feature_x
```

切换到主分支

```bash
git checkout master
```

合并分支(可能会有冲突)

```bash
 git merge test
```

把新建的分支删掉

```bash
git branch -d feature_x
```

将分支推送到远端仓库（推送成功后其他人可见）：

```bash
git push origin
```

## 学习资料推荐

**在线演示学习工具：**

「补充，来自[issue729](https://github.com/Snailclimb/JavaGuide/issues/729)」Learn Git Branching [https://oschina.gitee.io/learn-git-branching/](https://oschina.gitee.io/learn-git-branching/) 。该网站可以方便的演示基本的 git 操作，讲解得明明白白。每一个基本命令的作用和结果。

**推荐阅读：**

- [Git 入门图文教程(1.5W 字 40 图)](https://www.cnblogs.com/anding/p/16987769.html)：超用心的一篇文章，内容全面且附带详细的图解，强烈推荐！
- [Git - 简明指南](https://rogerdudler.github.io/git-guide/index.zh.html)：涵盖 Git 常见操作，非常清晰。
- [图解 Git](https://marklodato.github.io/visual-git-guide/index-zh-cn.html)：图解 Git 中的最常用命令。如果你稍微理解 git 的工作原理，这篇文章能够让你理解的更透彻。
- [猴子都能懂得 Git 入门](https://backlog.com/git-tutorial/cn/intro/intro1_1.html)：有趣的讲解。
- [Pro Git book](https://git-scm.com/book/zh/v2)：国外的一本 Git 书籍，被翻译成多国语言，质量很高。

# Github实用小技巧总结

我使用 Github 已经有 6 年多了，今天毫无保留地把自己觉得比较有用的 Github 小技巧送给关注 JavaGuide 的各位小伙伴。

## 一键生成 Github 简历 & Github 年报

通过 [https://resume.github.io/](https://resume.github.io/) 这个网站你可以一键生成一个在线的 Github 简历。

当时我参加的校招的时候，个人信息那里就放了一个在线的 Github 简历。我觉得这样会让面试官感觉你是一个内行，会提高一些印象分。

但是，如果你的 Github 没有什么项目的话还是不要放在简历里面了。生成后的效果如下图所示。

![](images\image-20201108192205620.png)

通过 [https://www.githubtrends.io/wrapped](https://www.githubtrends.io/wrapped) 这个网站，你可以生成一份 Github 个人年报，这个年报会列举出你在这一年的项目贡献情况、最常使用的编程语言、详细的贡献信息。

![](images\image-20211226144607457.png)

## 个性化 Github 首页

Github 目前支持在个人主页自定义展示一些内容。展示效果如下图所示。

![](images\image-20210616221212259.png)

想要做到这样非常简单，你只需要创建一个和你的 Github 账户同名的仓库，然后自定义`README.md`的内容即可。

展示在你主页的自定义内容就是`README.md`的内容（*不会 Markdown 语法的小伙伴自行面壁 5 分钟*）。

![](images\image-20201107110309341.png)

这个也是可以玩出花来的！比如说：通过 [github-readme-stats](https://hellogithub.com/periodical/statistics/click/?target=https://github.com/anuraghazra/github-readme-stats) 这个开源项目，你可以 README 中展示动态生成的 GitHub 统计信息。展示效果如下图所示。

![](images\image-20210616221312426.png)

关于个性化首页这个就不多提了，感兴趣的小伙伴自行研究一下。

## 自定义项目徽章

你在 Github 上看到的项目徽章都是通过 [https://shields.io/](https://shields.io/) 这个网站生成的。我的 JavaGuide 这个项目的徽章如下图所示。

![](images\image-20201107143136559.png)

并且，你不光可以生成静态徽章，[shield.io](http://shield.io/) 还可以动态读取你项目的状态并生成对应的徽章。

![](images\image-20201107143502356.png)

生成的描述项目状态的徽章效果如下图所示。

![](images\image-20201107143752642.png)

## 自动为项目添加贡献情况图标

通过 repobeats 这个工具可以为 Github 项目添加如下图所示的项目贡献基本情况图表，挺不错的 👍

![](images\repobeats.png)

地址：[https://repobeats.axiom.co/](https://repobeats.axiom.co/) 。

## Github 表情

![](images\image-20201107162254582.png)

如果你想要在 Github 使用表情的话，可以在这里找找：[www.webfx.com/tools/emoji-cheat-sheet/](https://www.webfx.com/tools/emoji-cheat-sheet/)。

![](images\image-20201107162432941.png)

## 高效阅读 Github 项目的源代码

Github 前段时间推出的 Codespaces 可以提供类似 VS Code 的在线 IDE，不过目前还没有完全开发使用。

简单介绍几种我最常用的阅读 Github 项目源代码的方式。

### Chrome 插件 Octotree

这个已经老生常谈了，是我最喜欢的一种方式。使用了 Octotree 之后网页侧边栏会按照树形结构展示项目，为我们带来 IDE 般的阅读源代码的感受。

![](images\image-20201107144944798.png)

### Chrome 插件 SourceGraph

我不想将项目 clone 到本地的时候一般就会使用这种方式来阅读项目源代码。SourceGraph 不仅可以让我们在 Github 优雅的查看代码，它还支持一些骚操作，比如：类之间的跳转、代码搜索等功能。

当你下载了这个插件之后，你的项目主页会多出一个小图标如下图所示。点击这个小图标即可在线阅读项目源代码。

![](images\image-20201107145749659.png)

使用 SourceGraph 阅读代码的就像下面这样，同样是树形结构展示代码，但是我个人感觉没有 Octotree 的手感舒服。不过，SourceGraph 内置了很多插件，而且还支持类之间的跳转！

![](images\image-20201107150307314.png)

### 克隆项目到本地

先把项目克隆到本地，然后使用自己喜欢的 IDE 来阅读。可以说是最酸爽的方式了！

如果你想要深入了解某个项目的话，首选这种方式。一个`git clone` 就完事了。

## 扩展 Github 的功能

**Enhanced GitHub** 可以让你的 Github 更好用。这个 Chrome 插件可以可视化你的 Github 仓库大小，每个文件的大小并且可以让你快速下载单个文件。

![](images\image-20201107160817672.png)

## 自动为 Markdown 文件生成目录

如果你想为 Github 上的 Markdown 文件生成目录的话，通过 VS Code 的 **Markdown Preview Enhanced** 这个插件就可以了。

生成的目录效果如下图所示。你直接点击目录中的链接即可跳转到文章对应的位置，可以优化阅读体验。

![](images\iShot2020-11-07 16.14.14 (1).png)

不过，目前 Github 已经自动为 Markdown 文件生成了目录，只是需要通过点击的方式才能显示出来。

![](images\image-20211227093215005.png)

## 善用 Github Explore

其实，Github 自带的 Explore 是一个非常强大且好用的功能。不过，据我观察，国内很多 Github 用户都不知道这个到底是干啥的。

简单来说，Github Explore 可以为你带来下面这些服务：

1. 可以根据你的个人兴趣为你推荐项目；
2. Githunb Topics 按照类别/话题将一些项目进行了分类汇总。比如 [Data visualization](https://github.com/topics/data-visualization) 汇总了数据可视化相关的一些开源项目，[Awesome Lists](https://github.com/topics/awesome) 汇总了 Awesome 系列的仓库；
3. 通过 Github Trending 我们可以看到最近比较热门的一些开源项目，我们可以按照语言类型以及时间维度对项目进行筛选；
4. Github Collections 类似一个收藏夹集合。比如 [Teaching materials for computational social science](https://github.com/collections/teaching-computational-social-science) 这个收藏夹就汇总了计算机课程相关的开源资源，[Learn to Code](https://github.com/collections/learn-to-code) 这个收藏夹就汇总了对你学习编程有帮助的一些仓库；
5. ……

![](images\github-explore.png)

## GitHub Actions 很强大

你可以简单地将 GitHub Actions 理解为 Github 自带的 CI/CD ，通过 GitHub Actions 你可以直接在 GitHub 构建、测试和部署代码，你还可以对代码进行审查、管理 API、分析项目依赖项。总之，GitHub Actions 可以自动化地帮你完成很多事情。

关于 GitHub Actions 的详细介绍，推荐看一下阮一峰老师写的 [GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html) 。

GitHub Actions 有一个官方市场，上面有非常多别人提交的 Actions ，你可以直接拿来使用。

![](images\image-20211227100147433.png)

## 后记

这一篇文章，我毫无保留地把自己这些年总结的 Github 小技巧分享了出来，真心希望对大家有帮助，真心希望大家一定要利用好 Github 这个专属程序员的宝藏。

另外，这篇文章中，我并没有提到 Github 搜索技巧。在我看来，Github 搜索技巧不必要记网上那些文章说的各种命令啥的，真没啥卵用。你会发现你用的最多的还是关键字搜索以及 Github 自带的筛选功能。

