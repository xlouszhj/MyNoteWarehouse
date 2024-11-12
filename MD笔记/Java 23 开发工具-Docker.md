[toc]

# Docker核心概念总结

**本文只是对 Docker 的概念做了较为详细的介绍，并不涉及一些像 Docker 环境的安装以及 Docker 的一些常见操作和命令。**

## 一 认识容器

**Docker 是世界领先的软件容器平台**，所以想要搞懂 Docker 的概念我们必须先从容器开始说起。

### 1.1 什么是容器?

#### 先来看看容器较为官方的解释

**一句话概括容器：容器就是将软件打包成标准化单元，以用于开发、交付和部署。**

- **容器镜像是轻量的、可执行的独立软件包** ，包含软件运行所需的所有内容：代码、运行时环境、系统工具、系统库和设置。
- **容器化软件适用于基于 Linux 和 Windows 的应用，在任何环境中都能够始终如一地运行。**
- **容器赋予了软件独立性**，使其免受外在环境差异（例如，开发和预演环境的差异）的影响，从而有助于减少团队间在相同基础设施上运行不同软件时的冲突。

#### 再来看看容器较为通俗的解释

如果需要通俗地描述容器的话，我觉得容器就是一个存放东西的地方，就像书包可以装各种文具、衣柜可以放各种衣服、鞋架可以放各种鞋子一样。我们现在所说的容器存放的东西可能更偏向于应用比如网站、程序甚至是系统环境。

![](images\container.png)

### 1.2 图解物理机,虚拟机与容器

关于虚拟机与容器的对比在后面会详细介绍到，这里只是通过网上的图片加深大家对于物理机、虚拟机与容器这三者的理解(下面的图片来源于网络)。

**物理机：**

![](images\物理机图解.jpeg)

**虚拟机：**

![](images\虚拟机图解.jpeg)

**容器：**

![](images\image-20211110104003678.png)

通过上面这三张抽象图，我们可以大概通过类比概括出：**容器虚拟化的是操作系统而不是硬件，容器之间是共享同一套操作系统资源的。虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统。因此容器的隔离级别会稍低一些。**

------

**相信通过上面的解释大家对于容器这个既陌生又熟悉的概念有了一个初步的认识，下面我们就来谈谈 Docker 的一些概念。**

## 二 再来谈谈 Docker 的一些概念

### 2.1 什么是 Docker?

说实话关于 Docker 是什么并太好说，下面我通过四点向你说明 Docker 到底是个什么东西。

- **Docker 是世界领先的软件容器平台。**
- **Docker** 使用 Google 公司推出的 **Go 语言** 进行开发实现，基于 **Linux 内核** 提供的 CGroup 功能和 namespace 来实现的，以及 AUFS 类的 **UnionFS** 等技术，**对进程进行封装隔离，属于操作系统层面的虚拟化技术。** 由于隔离的进程独立于宿主和其它的隔离的进程，因此也称其为容器。
- **Docker 能够自动执行重复性任务，例如搭建和配置开发环境，从而解放了开发人员以便他们专注在真正重要的事情上：构建杰出的软件。**
- **用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。**

### 2.2 Docker 思想

- **集装箱**
- **标准化：** ① 运输方式 ② 存储方式 ③ API 接口
- **隔离**

### 2.3 Docker 容器的特点

- **轻量** : 在一台机器上运行的多个 Docker 容器可以共享这台机器的操作系统内核；它们能够迅速启动，只需占用很少的计算和内存资源。镜像是通过文件系统层进行构造的，并共享一些公共文件。这样就能尽量降低磁盘用量，并能更快地下载镜像。
- **标准** : Docker 容器基于开放式标准，能够在所有主流 Linux 版本、Microsoft Windows 以及包括 VM、裸机服务器和云在内的任何基础设施上运行。
- **安全** : Docker 赋予应用的隔离性不仅限于彼此隔离，还独立于底层的基础设施。Docker 默认提供最强的隔离，因此应用出现问题，也只是单个容器的问题，而不会波及到整台机器。

### 2.4 为什么要用 Docker ?

- **Docker 的镜像提供了除内核外完整的运行时环境，确保了应用运行环境一致性，从而不会再出现 “这段代码在我机器上没问题啊” 这类问题；——一致的运行环境**
- **可以做到秒级、甚至毫秒级的启动时间。大大的节约了开发、测试、部署的时间。——更快速的启动时间**
- **避免公用的服务器，资源会容易受到其他用户的影响。——隔离性**
- **善于处理集中爆发的服务器使用压力；——弹性伸缩，快速扩展**
- **可以很轻易的将在一个平台上运行的应用，迁移到另一个平台上，而不用担心运行环境的变化导致应用无法正常运行的情况。——迁移方便**
- **使用 Docker 可以通过定制应用镜像来实现持续集成、持续交付、部署。——持续交付和部署**

------

## 三 容器 VS 虚拟机

**每当说起容器，我们不得不将其与虚拟机做一个比较。就我而言，对于两者无所谓谁会取代谁，而是两者可以和谐共存。**

简单来说：**容器和虚拟机具有相似的资源隔离和分配优势，但功能有所不同，因为容器虚拟化的是操作系统，而不是硬件，因此容器更容易移植，效率也更高。**

### 3.1 两者对比图

传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；而容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，而且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。

![](images\2e2b95eebf60b6d03f6c1476f4d7c697.png)

### 3.2 容器与虚拟机总结

![](images\4ef8691d67eb1eb53217099d0a691eb5.png)

- **容器是一个应用层抽象，用于将代码和依赖资源打包在一起。** **多个容器可以在同一台机器上运行，共享操作系统内核，但各自作为独立的进程在用户空间中运行** 。与虚拟机相比， **容器占用的空间较少**（容器镜像大小通常只有几十兆），**瞬间就能完成启动** 。
- **虚拟机 (VM) 是一个物理硬件层抽象，用于将一台服务器变成多台服务器。** 管理程序允许多个 VM 在一台机器上运行。每个 VM 都包含一整套操作系统、一个或多个应用、必要的二进制文件和库资源，因此 **占用大量空间** 。而且 VM **启动也十分缓慢** 。

通过 Docker 官网，我们知道了这么多 Docker 的优势，但是大家也没有必要完全否定虚拟机技术，因为两者有不同的使用场景。**虚拟机更擅长于彻底隔离整个运行环境**。例如，云服务提供商通常采用虚拟机技术隔离不同的用户。而 **Docker 通常用于隔离不同的应用** ，例如前端，后端以及数据库。

### 3.3 容器与虚拟机两者是可以共存的

就我而言，对于两者无所谓谁会取代谁，而是两者可以和谐共存。

![](images\056c87751b9dd7b56f4264240fe96d00.png)

## 四 Docker 基本概念

**Docker 中有非常重要的三个基本概念，理解了这三个概念，就理解了 Docker 的整个生命周期。**

- **镜像（Image）**
- **容器（Container）**
- **仓库（Repository）**

理解了这三个概念，就理解了 Docker 的整个生命周期

<img src="images\docker基本概念.jpeg" style="zoom:50%;" />

### 4.1 镜像(Image):一个特殊的文件系统

**操作系统分为内核和用户空间**。对于 Linux 而言，内核启动后，会挂载 root 文件系统为其提供用户空间支持。而 Docker 镜像（Image），就相当于是一个 root 文件系统。

**Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。** 镜像不包含任何动态数据，其内容在构建之后也不会被改变。

Docker 设计时，就充分利用 **Union FS** 的技术，将其设计为**分层存储的架构** 。镜像实际是由多层文件系统联合组成。

**镜像构建时，会一层层构建，前一层是后一层的基础。每一层构建完就不会再发生改变，后一层上的任何改变只发生在自己这一层。** 比如，删除前一层文件的操作，实际不是真的删除前一层的文件，而是仅在当前层标记为该文件已删除。在最终容器运行的时候，虽然不会看到这个文件，但是实际上该文件会一直跟随镜像。因此，在构建镜像的时候，需要额外小心，每一层尽量只包含该层需要添加的东西，任何额外的东西应该在该层构建结束前清理掉。

分层存储的特征还使得镜像的复用、定制变的更为容易。甚至可以用之前构建好的镜像作为基础层，然后进一步添加新的层，以定制自己所需的内容，构建新的镜像。

### 4.2 容器(Container):镜像运行时的实体

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，**容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等** 。

**容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间。前面讲过镜像使用的是分层存储，容器也是如此。**

**容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。**

按照 Docker 最佳实践的要求，**容器不应该向其存储层内写入任何数据** ，容器存储层要保持无状态化。**所有的文件写入操作，都应该使用数据卷（Volume）、或者绑定宿主目录**，在这些位置的读写会跳过容器存储层，直接对宿主(或网络存储)发生读写，其性能和稳定性更高。数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此， **使用数据卷后，容器可以随意删除、重新 run ，数据却不会丢失。**

### 4.3 仓库(Repository):集中存放镜像文件的地方

镜像构建完成后，可以很容易的在当前宿主上运行，但是， **如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，Docker Registry 就是这样的服务。**

一个 Docker Registry 中可以包含多个仓库（Repository）；每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像。所以说：**镜像仓库是 Docker 用来集中存放镜像文件的地方类似于我们之前常用的代码仓库。**

通常，**一个仓库会包含同一个软件不同版本的镜像**，而**标签就常用于对应该软件的各个版本** 。我们可以通过`<仓库名>:<标签>`的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 latest 作为默认标签.。

**这里补充一下 Docker Registry 公开服务和私有 Docker Registry 的概念：**

**Docker Registry 公开服务** 是开放给用户使用、允许用户管理镜像的 Registry 服务。一般这类公开服务允许用户免费上传、下载公开的镜像，并可能提供收费服务供用户管理私有镜像。

最常使用的 Registry 公开服务是官方的 **Docker Hub** ，这也是默认的 Registry，并拥有大量的高质量的官方镜像，网址为：[https://hub.docker.com/](https://hub.docker.com/) 。官方是这样介绍 Docker Hub 的：

> Docker Hub 是 Docker 官方提供的一项服务，用于与您的团队查找和共享容器镜像。

比如我们想要搜索自己想要的镜像：

<img src="images\Screen Shot 2019-11-04 at 8.21.39 PM.png" style="zoom:80%;" />

在 Docker Hub 的搜索结果中，有几项关键的信息有助于我们选择合适的镜像：

- **OFFICIAL Image**：代表镜像为 Docker 官方提供和维护，相对来说稳定性和安全性较高。
- **Stars**：和点赞差不多的意思，类似 GitHub 的 Star。
- **Downloads**：代表镜像被拉取的次数，基本上能够表示镜像被使用的频度。

当然，除了直接通过 Docker Hub 网站搜索镜像这种方式外，我们还可以通过 `docker search` 这个命令搜索 Docker Hub 中的镜像，搜索的结果是一致的。

```bash
➜  ~ docker search mysql
NAME                              DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
mysql                             MySQL is a widely used, open-source relation…   8763                [OK]
mariadb                           MariaDB is a community-developed fork of MyS…   3073                [OK]
mysql/mysql-server                Optimized MySQL Server Docker images. Create…   650                                     [OK]
```

在国内访问**Docker Hub** 可能会比较慢，国内也有一些云服务商提供类似于 Docker Hub 的公开服务。比如 [时速云镜像库](https://www.tenxcloud.com/)、[网易云镜像服务](https://www.163yun.com/product/repo)、[DaoCloud 镜像市场](https://www.daocloud.io/)、[阿里云镜像库](https://www.aliyun.com/product/containerservice?utm_content=se_1292836)等

除了使用公开服务外，用户还可以在 **本地搭建私有 Docker Registry** 。Docker 官方提供了 Docker Registry 镜像，可以直接使用做为私有 Registry 服务。开源的 Docker Registry 镜像只提供了 Docker Registry API 的服务端实现，足以支持 docker 命令，不影响使用。但不包含图形界面，以及镜像维护、用户管理、访问控制等高级功能。

## 五 常见命令

### 5.1 基本命令

```bash
docker version # 查看docker版本
docker images # 查看所有已下载镜像，等价于：docker image ls 命令
docker container ls # 查看所有容器
docker ps #查看正在运行的容器
docker ps -a # 查看所有容器
docker image prune # 清理临时的、没有被使用的镜像文件。-a, --all: 删除所有没有用的镜像，而不仅仅是临时文件；
```

### 5.2 拉取镜像

```bash
docker search mysql # 查看mysql相关镜像
docker pull mysql:5.7 # 拉取mysql镜像
docker image ls # 查看所有已下载镜像
```

### 5.3 删除镜像

比如我们要删除我们下载的 mysql 镜像。

通过 `docker rmi [image]` （等价于`docker image rm [image]`）删除镜像之前首先要确保这个镜像没有被容器引用（可以通过标签名称或者镜像 ID 删除）。通过我们前面讲的`docker ps`命令即可查看。

```bash
➜  ~ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
c4cd691d9f80        mysql:5.7           "docker-entrypoint.s…"   7 weeks ago         Up 12 days          0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
```

可以看到 mysql 正在被 id 为 c4cd691d9f80 的容器引用，我们需要首先通过 `docker stop c4cd691d9f80` 或者 `docker stop mysql`暂停这个容器。

然后查看 mysql 镜像的 id

```bash
➜  ~ docker images
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
mysql                   5.7                 f6509bac4980        3 months ago        373MB
```

通过 IMAGE ID 或者 REPOSITORY 名字即可删除

```bash
docker rmi f6509bac4980  #  或者 docker rmi mysql
```

## 六 Build Ship and Run

**Docker 的概念以及常见命令基本上已经讲完，我们再来谈谈：Build, Ship, and Run。**

如果你搜索 Docker 官网，会发现如下的字样：**“Docker - Build, Ship, and Run Any App, Anywhere”**。那么 Build, Ship, and Run 到底是在干什么呢？

![](images\docker-build-ship-run.jpg)

- **Build（构建镜像）**：镜像就像是集装箱包括文件以及运行环境等等资源。
- **Ship（运输镜像）**：主机和仓库间运输，这里的仓库就像是超级码头一样。
- **Run （运行镜像）**：运行的镜像就是一个容器，容器就是运行程序的地方。

**Docker 运行过程也就是去仓库把镜像拉到本地，然后用一条命令把镜像运行起来变成容器。所以，我们也常常将 Docker 称为码头工人或码头装卸工，这和 Docker 的中文翻译搬运工人如出一辙。**

## 七 简单了解一下 Docker 底层原理

### 7.1 虚拟化技术

首先，Docker **容器虚拟化** 技术为基础的软件，那么什么是虚拟化技术呢？

简单点来说，虚拟化技术可以这样定义：

> 虚拟化技术是一种资源管理技术，是将计算机的各种[实体资源](https://zh.wikipedia.org/wiki/計算機科學))（[CPU](https://zh.wikipedia.org/wiki/CPU)、[内存](https://zh.wikipedia.org/wiki/内存)、[磁盘空间](https://zh.wikipedia.org/wiki/磁盘空间)、[网络适配器](https://zh.wikipedia.org/wiki/網路適配器)等），予以抽象、转换后呈现出来并可供分割、组合为一个或多个电脑配置环境。由此，打破实体结构间的不可切割的障碍，使用户可以比原本的配置更好的方式来应用这些电脑硬件资源。这些资源的新虚拟部分是不受现有资源的架设方式，地域或物理配置所限制。一般所指的虚拟化资源包括计算能力和数据存储。

### 7.2 Docker 基于 LXC 虚拟容器技术

Docker 技术是基于 LXC（Linux container- Linux 容器）虚拟容器技术的。

> LXC，其名称来自 Linux 软件容器（Linux Containers）的缩写，一种操作系统层虚拟化（Operating system–level virtualization）技术，为 Linux 内核容器功能的一个用户空间接口。它将应用软件系统打包成一个软件容器（Container），内含应用软件本身的代码，以及所需要的操作系统核心和库。通过统一的名字空间和共用 API 来分配不同软件容器的可用硬件资源，创造出应用程序的独立沙箱运行环境，使得 Linux 用户可以容易的创建和管理系统或应用容器。

LXC 技术主要是借助 Linux 内核中提供的 CGroup 功能和 namespace 来实现的，通过 LXC 可以为软件提供一个独立的操作系统运行环境。

**cgroup 和 namespace 介绍：**

- **namespace 是 Linux 内核用来隔离内核资源的方式。** 通过 namespace 可以让一些进程只能看到与自己相关的一部分资源，而另外一些进程也只能看到与它们自己相关的资源，这两拨进程根本就感觉不到对方的存在。具体的实现方式是把一个或多个进程的相关资源指定在同一个 namespace 中。Linux namespaces 是对全局系统资源的一种封装隔离，使得处于不同 namespace 的进程拥有独立的全局系统资源，改变一个 namespace 中的系统资源只会影响当前 namespace 里的进程，对其他 namespace 中的进程没有影响。

  （以上关于 namespace 介绍内容来自[https://www.cnblogs.com/sparkdev/p/9365405.html](https://www.cnblogs.com/sparkdev/p/9365405.html) ，更多关于 namespace 的呢内容可以查看这篇文章 ）。

- **CGroup 是 Control Groups 的缩写，是 Linux 内核提供的一种可以限制、记录、隔离进程组 (process groups) 所使用的物力资源 (如 cpu memory i/o 等等) 的机制。**

  （以上关于 CGroup 介绍内容来自 [https://www.ibm.com/developerworks/cn/linux/1506_cgroup/index.html](https://www.ibm.com/developerworks/cn/linux/1506_cgroup/index.html) ，更多关于 CGroup 的内容可以查看这篇文章 ）。

**cgroup 和 namespace 两者对比：**

两者都是将进程进行分组，但是两者的作用还是有本质区别。namespace 是为了隔离进程组之间的资源，而 cgroup 是为了对一组进程进行统一的资源监控和限制。

## 八 总结

本文主要把 Docker 中的一些常见概念做了详细的阐述，但是并不涉及 Docker 的安装、镜像的使用、容器的操作等内容。这部分东西，希望读者自己可以通过阅读书籍与官方文档的形式掌握。如果觉得官方文档阅读起来很费力的话，这里推荐一本书籍《Docker 技术入门与实战第二版》。

## 九 推荐阅读

- [10 分钟看懂 Docker 和 K8S](https://zhuanlan.zhihu.com/p/53260098)
- [从零开始入门 K8s：详解 K8s 容器基本概念](https://www.infoq.cn/article/te70FlSyxhltL1Cr7gzM)

## 十 参考

- [Linux Namespace 和 Cgroup](https://segmentfault.com/a/1190000009732550)
- [LXC vs Docker: Why Docker is Better](https://www.upguard.com/articles/docker-vs-lxc)
- [CGroup 介绍、应用实例及原理描述](https://www.ibm.com/developerworks/cn/linux/1506_cgroup/index.html)

# Docker实战

## Docker 介绍

开始之前，还是简单介绍一下 Docker，更多 Docker 概念介绍可以看前一篇文章[Docker 核心概念总结]()。

### 什么是 Docker？

说实话关于 Docker 是什么并不太好说，下面我通过四点向你说明 Docker 到底是个什么东西。

- Docker 是世界领先的软件容器平台，基于 **Go 语言** 进行开发实现。
- Docker 能够自动执行重复性任务，例如搭建和配置开发环境，从而解放开发人员。
- 用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。
- Docker 可以**对进程进行封装隔离，属于操作系统层面的虚拟化技术。** 由于隔离的进程独立于宿主和其它的隔离的进程，因此也称其为容器。

官网地址：[https://www.docker.com/](https://www.docker.com/) 。

![](images\container (1).png)

### 为什么要用 Docker?

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app），更重要的是容器性能开销极低。

传统的开发流程中，我们的项目通常需要使用 MySQL、Redis、FastDFS 等等环境，这些环境都是需要我们手动去进行下载并配置的，安装配置流程极其复杂，而且不同系统下的操作也不一样。

Docker 的出现完美地解决了这一问题，我们可以在容器中安装 MySQL、Redis 等软件环境，使得应用和环境架构分开，它的优势在于：

1. 一致的运行环境，能够更轻松地迁移
2. 对进程进行封装隔离，容器与容器之间互不影响，更高效地利用系统资源
3. 可以通过镜像复制多个一致的容器

另外，[《Docker 从入门到实践》](https://yeasy.gitbook.io/docker_practice/introduction/why) 这本开源书籍中也已经给出了使用 Docker 的原因。

<img src="images\20210412220015698.png" style="zoom:50%;" />

## Docker 的安装

### Windows

接下来对 Docker 进行安装，以 Windows 系统为例，访问 Docker 的官网：

![](images\docker-install-windows.png)

然后点击`Get Started`：

![](images\docker-install-windows-download.png)

在此处点击`Download for Windows`即可进行下载。

如果你的电脑是`Windows 10 64位专业版`的操作系统，则在安装 Docker 之前需要开启一下`Hyper-V`，开启方式如下。打开控制面板，选择程序：

![](images\docker-windows-hyperv.png)

点击`启用或关闭Windows功能`：

![](images\docker-windows-hyperv-enable.png)

勾选上`Hyper-V`，点击确定即可：

![](images\docker-windows-hyperv-check.png)

完成更改后需要重启一下计算机。

开启了`Hyper-V`后，我们就可以对 Docker 进行安装了，打开安装程序后，等待片刻点击`Ok`即可：

![](images\docker-windows-hyperv-install.png)

安装完成后，我们仍然需要重启计算机，重启后，若提示如下内容：

![](images\docker-windows-hyperv-wsl2.png)



它的意思是询问我们是否使用 WSL2，这是基于 Windows 的一个 Linux 子系统，这里我们取消即可，它就会使用我们之前勾选的`Hyper-V`虚拟机。

因为是图形界面的操作，这里就不介绍 Docker Desktop 的具体用法了。

### Mac

直接使用 Homebrew 安装即可

```bash
brew install --cask docker
```

### Linux

下面来看看 Linux 中如何安装 Docker，这里以 CentOS7 为例。

在测试或开发环境中，Docker 官方为了简化安装流程，提供了一套便捷的安装脚本，执行这个脚本后就会自动地将一切准备工作做好，并且把 Docker 的稳定版本安装在系统中。

```bash
curl -fsSL get.docker.com -o get-docker.sh
```

```bash
sh get-docker.sh --mirror Aliyun
```

安装完成后直接启动服务：

```bash
systemctl start docker
```

推荐设置开机自启，执行指令：

```bash
systemctl enable docker
```

## Docker 中的几个概念

在正式学习 Docker 之前，我们需要了解 Docker 中的几个核心概念：

### 镜像

镜像就是一个只读的模板，镜像可以用来创建 Docker 容器，一个镜像可以创建多个容器

### 容器

容器是用镜像创建的运行实例，Docker 利用容器独立运行一个或一组应用。它可以被启动、开始、停止、删除，每个容器都是相互隔离的、保证安全的平台。 可以把容器看作是一个简易的 Linux 环境和运行在其中的应用程序。容器的定义和镜像几乎一模一样，也是一堆层的统一视角，唯一区别在于容器的最上面那一层是可读可写的

### 仓库

仓库是集中存放镜像文件的场所。仓库和仓库注册服务器是有区别的，仓库注册服务器上往往存放着多个仓库，每个仓库中又包含了多个镜像，每个镜像有不同的标签。 仓库分为公开仓库和私有仓库两种形式，最大的公开仓库是 DockerHub，存放了数量庞大的镜像供用户下载，国内的公开仓库有阿里云、网易云等

### 总结

通俗点说，一个镜像就代表一个软件；而基于某个镜像运行就是生成一个程序实例，这个程序实例就是容器；而仓库是用来存储 Docker 中所有镜像的。

其中仓库又分为远程仓库和本地仓库，和 Maven 类似，倘若每次都从远程下载依赖，则会大大降低效率，为此，Maven 的策略是第一次访问依赖时，将其下载到本地仓库，第二次、第三次使用时直接用本地仓库的依赖即可，Docker 的远程仓库和本地仓库的作用也是类似的。

## Docker 初体验

下面我们来对 Docker 进行一个初步的使用，这里以下载一个 MySQL 的镜像为例`(在CentOS7下进行)`。

和 GitHub 一样，Docker 也提供了一个 DockerHub 用于查询各种镜像的地址和安装教程，为此，我们先访问 DockerHub：[https://hub.docker.com/](https://hub.docker.com/)

![](images\dockerhub-com.png)

在左上角的搜索框中输入`MySQL`并回车：

![](images\dockerhub-mysql.png)

可以看到相关 MySQL 的镜像非常多，若右上角有`OFFICIAL IMAGE`标识，则说明是官方镜像，所以我们点击第一个 MySQL 镜像：

![](images\dockerhub-mysql-official-image.png)



右边提供了下载 MySQL 镜像的指令为`docker pull MySQL`，但该指令始终会下载 MySQL 镜像的最新版本。

若是想下载指定版本的镜像，则点击下面的`View Available Tags`：

![](images\dockerhub-mysql-view-available-tags.png)

这里就可以看到各种版本的镜像，右边有下载的指令，所以若是想下载 5.7.32 版本的 MySQL 镜像，则执行：

```bash
docker pull MySQL:5.7.32
```

然而下载镜像的过程是非常慢的，所以我们需要配置一下镜像源加速下载，访问`阿里云`官网，点击控制台：

![](images\docker-aliyun-mirror-admin.png)

然后点击左上角的菜单，在弹窗的窗口中，将鼠标悬停在产品与服务上，并在右侧搜索容器镜像服务，最后点击容器镜像服务：

![](images\docker-aliyun-mirror-admin-accelerator.png)



点击左侧的镜像加速器，并依次执行右侧的配置指令即可。

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://679xpnpz.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Docker 镜像指令

Docker 需要频繁地操作相关的镜像，所以我们先来了解一下 Docker 中的镜像指令。

若想查看 Docker 中当前拥有哪些镜像，则可以使用 `docker images` 命令。

```bash
[root@izrcf5u3j3q8xaz ~]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
MySQL         5.7.32    f07dfa83b528   11 days ago     448MB
tomcat        latest    feba8d001e3f   2 weeks ago     649MB
nginx         latest    ae2feff98a0c   2 weeks ago     133MB
hello-world   latest    bf756fb1ae65   12 months ago   13.3kB
```

其中`REPOSITORY`为镜像名，`TAG`为版本标志，`IMAGE ID`为镜像 id(唯一的)，`CREATED`为创建时间，注意这个时间并不是我们将镜像下载到 Docker 中的时间，而是镜像创建者创建的时间，`SIZE`为镜像大小。

该指令能够查询指定镜像名：

```bash
docker image MySQL
```

若如此做，则会查询出 Docker 中的所有 MySQL 镜像：

```bash
[root@izrcf5u3j3q8xaz ~]# docker images MySQL
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
MySQL        5.6       0ebb5600241d   11 days ago     302MB
MySQL        5.7.32    f07dfa83b528   11 days ago     448MB
MySQL        5.5       d404d78aa797   20 months ago   205MB
```

该指令还能够携带`-q`参数：`docker images -q` ， `-q`表示仅显示镜像的 id：

```bash
[root@izrcf5u3j3q8xaz ~]# docker images -q
0ebb5600241d
f07dfa83b528
feba8d001e3f
d404d78aa797
```

若是要下载镜像，则使用：

```bash
docker pull MySQL:5.7
```

`docker pull`是固定的，后面写上需要下载的镜像名及版本标志；若是不写版本标志，而是直接执行`docker pull MySQL`，则会下载镜像的最新版本。

一般在下载镜像前我们需要搜索一下镜像有哪些版本才能对指定版本进行下载，使用指令：

```bash
docker search MySQL
```

![](images\docker-search-mysql-terminal.png)

不过该指令只能查看 MySQL 相关的镜像信息，而不能知道有哪些版本，若想知道版本，则只能这样查询：

```bash
docker search MySQL:5.5
```

![](images\docker-search-mysql-404-terminal.png)

删除镜像使用指令：

```bash
docker image rm MySQL:5.5
```

若是不指定版本，则默认删除的也是最新版本。

还可以通过指定镜像 id 进行删除：

```bash
docker image rm bf756fb1ae65
```

然而此时报错了：

```bash
[root@izrcf5u3j3q8xaz ~]# docker image rm bf756fb1ae65
Error response from daemon: conflict: unable to delete bf756fb1ae65 (must be forced) - image is being used by stopped container d5b6c177c151
```

这是因为要删除的`hello-world`镜像正在运行中，所以无法删除镜像，此时需要强制执行删除：

```bash
docker image rm -f bf756fb1ae65
```

该指令会将镜像和通过该镜像执行的容器全部删除，谨慎使用。

Docker 还提供了删除镜像的简化版本：`docker rmi 镜像名:版本标志` 。

此时我们即可借助`rmi`和`-q`进行一些联合操作，比如现在想删除所有的 MySQL 镜像，那么你需要查询出 MySQL 镜像的 id，并根据这些 id 一个一个地执行`docker rmi`进行删除，但是现在，我们可以这样：

```bash
docker rmi -f $(docker images MySQL -q)
```

首先通过`docker images MySQL -q`查询出 MySQL 的所有镜像 id，`-q`表示仅查询 id，并将这些 id 作为参数传递给`docker rmi -f`指令，这样所有的 MySQL 镜像就都被删除了。

## Docker 容器指令

掌握了镜像的相关指令之后，我们需要了解一下容器的指令，容器是基于镜像的。

若需要通过镜像运行一个容器，则使用：

```bash
docker run tomcat:8.0-jre8
```

当然了，运行的前提是你拥有这个镜像，所以先下载镜像：

```bash
docker pull tomcat:8.0-jre8
```

下载完成后就可以运行了，运行后查看一下当前运行的容器：`docker ps` 。

![](images\docker-ps-terminal.png)

其中`CONTAINER_ID`为容器的 id，`IMAGE`为镜像名，`COMMAND`为容器内执行的命令，`CREATED`为容器的创建时间，`STATUS`为容器的状态，`PORTS`为容器内服务监听的端口，`NAMES`为容器的名称。

通过该方式运行的 tomcat 是不能直接被外部访问的，因为容器具有隔离性，若是想直接通过 8080 端口访问容器内部的 tomcat，则需要对宿主机端口与容器内的**端口进行映射**：`-p 宿主机端口:容器内端口` 

```bash
docker run -p 8080:8080 tomcat:8.0-jre8
```

解释一下这两个端口的作用(`8080:8080`)，第一个 8080 为宿主机端口，第二个 8080 为容器内的端口，外部访问 8080 端口就会通过映射访问容器内的 8080 端口。

此时外部就可以访问 Tomcat 了：

![](images\docker-run-tomact-8080.png)

若是这样进行映射：

```bash
docker run -p 8088:8080 tomcat:8.0-jre8
```

则外部需访问 8088 端口才能访问 tomcat，需要注意的是，**每次运行的容器都是相互独立的，所以同时运行多个 tomcat 容器并不会产生端口的冲突**。

容器还能够以**后台的方式运行** `-d`，这样就不会占用终端：

```bash
docker run -d -p 8080:8080 tomcat:8.0-jre8
```

启动容器时默认会给容器一个名称，但这个名称其实是可以设置的，使用指令：`-name 名称` 

```bash
docker run -d -p 8080:8080 --name tomcat01 tomcat:8.0-jre8
```

此时的容器名称即为 tomcat01，**容器名称必须是唯一的**。

再来引申一下`docker ps`中的几个指令参数，比如`-a`：

```bash
docker ps -a
```

该参数会将运行和非运行的容器全部列举出来。

`-q`参数将只查询正在运行的容器 id：`docker ps -q` 。

```bash
[root@izrcf5u3j3q8xaz ~]# docker ps -q
f3aac8ee94a3
074bf575249b
1d557472a708
4421848ba294
```

若是组合使用，则查询运行和非运行的所有容器 id：`docker ps -qa` 。

```bash
[root@izrcf5u3j3q8xaz ~]# docker ps -aq
f3aac8ee94a3
7f7b0e80c841
074bf575249b
a1e830bddc4c
1d557472a708
4421848ba294
b0440c0a219a
c2f5d78c5d1a
5831d1bab2a6
d5b6c177c151
```

接下来是容器的停止、重启指令，因为非常简单，就不过多介绍了。

```bash
docker ps -a	                               # 查看容器状态
docker images                                  # 查看镜像
docker start 容器ID/容器名                       # 启动容器
docker update --restart=always 容器id           # 如果该容器已经启动，可以使用该命令，让Linux 重启之后 Docker 服务及容器自动启动
docker update --restart=no 容器id               # 取消容器自动启动
docker stop 容器ID/容器名                        # 停止容器
docker kill 容器ID/容器名                        # 杀死指定的容器
docker exec -it 容器名/容器ID /bin/bash          # 进入容器 (推荐)
docker attach 容器名/容器ID                      # 进入容器
Ctrl+p+q                                       # 退出容器且容器不被关闭
docker rm 容器名/容器ID                          # 删除容器
docker rm -f 容器名/容器ID                       # 强制删除容器
docker rmi 容器名/容器ID                         # 删除镜像
docker rm -f $(docker ps -qa)                  # 组合指令，删除所有容器：先通过`docker ps -qa`查询出所有容器的 id，然后通过`docker rm -f`进行删除。
docker logs 容器名/容器ID                        # 查看容器的运行日志
docker logs -f 容器名/容器ID                     # 查看容器的运行日志，实时显示
docker logs -ft 容器名/容器ID                    # 查看容器的运行日志，实时显示+显示日志的时间戳
docker cp 容器外路径 容器ID/名称:容器内路径         # 将文件从容器外拷贝到容器内
docker commit -m="提交信息" -a="作者信息" 容器名/容器ID 提交后的镜像名:Tag      # 将容器打包成一个镜像
例如：#### 直接用环境的python，并设置工作目录
docker commit -a 'zhj' -m 'This is a ADdiagnosis' -c 'WORKDIR /root/AD_diagnosis' -c 'CMD ["/opt/conda/envs/zhjcsp/bin/python", "/root/AD_diagnosis/diagnosis.py"]' test addiagnosis
# 根据镜像创建容器
docker run -it --name=ADdiagnosis -p 8001:8001 addiagnosis  # -it标志允许在容器中打开一个交互式会话，可以在其中执行命令，并且可以使用键盘输入与容器进行交互。
```

------

查看容器内运行了哪些进程，可以使用指令：

```bash
docker top 容器名/容器ID
```

若是想与容器进行交互，则使用指令：

```bash
docker exec -it 容器名/容器ID bash
```

此时终端将会**进入容器内部**，执行的指令都将在容器中生效，在容器内只能执行一些比较简单的指令，如：ls、cd 等，若是想退出容器终端，重新回到 CentOS 中，则执行`exit`即可。

现在我们已经能够进入容器终端执行相关操作了，那么该如何向 tomcat 容器中部署一个项目呢？

```bash
docker cp ./test.html 289cc00dc5ed:/usr/local/tomcat/webapps
```

通过`docker cp`指令能够将文件从 CentOS 复制到容器中，`./test.html`为 CentOS 中的资源路径，`289cc00dc5ed`为容器 id，`/usr/local/tomcat/webapps`为容器的资源路径，此时`test.html`文件将会被复制到该路径下。

```bash
[root@izrcf5u3j3q8xaz ~]# docker exec -it 289cc00dc5ed bash
root@289cc00dc5ed:/usr/local/tomcat# cd webapps
root@289cc00dc5ed:/usr/local/tomcat/webapps# ls
test.html
root@289cc00dc5ed:/usr/local/tomcat/webapps#
```

若是想将容器内的文件复制到 CentOS 中，则反过来写即可：

```bash
docker cp 289cc00dc5ed:/usr/local/tomcat/webapps/test.html ./
```

所以现在若是想要部署项目，则先将项目上传到 CentOS，然后将项目从 CentOS 复制到容器内，此时启动容器即可。

------

虽然使用 Docker 启动软件环境非常简单，但同时也面临着一个问题，我们无法知晓容器内部具体的细节，比如监听的端口、绑定的 ip 地址等等，好在这些 Docker 都帮我们想到了，只需使用指令：

```bash
docker inspect 923c969b0d91
```

![](images\docker-inspect-terminal.png)

## Docker 数据卷

学习了容器的相关指令之后，我们来了解一下 Docker 中的**数据卷**，它能够**实现宿主机与容器之间的文件共享，它的好处在于我们对宿主机的文件进行修改将直接影响容器，而无需再将宿主机的文件再复制到容器中**。

现在若是想将宿主机中`/opt/apps`目录与容器中`webapps`目录做一个数据卷，则应该这样编写指令：

```bash
docker run -d -p 8080:8080 --name tomcat01 -v /opt/apps:/usr/local/tomcat/webapps tomcat:8.0-jre8
```

然而此时访问 tomcat 会发现无法访问：

![](images\docker-data-volume-webapp-8080.png)

这就说明我们的数据卷设置成功了，Docker 会将容器内的`webapps`目录与`/opt/apps`目录进行同步，而此时`/opt/apps`目录是空的，导致`webapps`目录也会变成空目录，所以就访问不到了。

此时我们只需向`/opt/apps`目录下添加文件，就会使得`webapps`目录也会拥有相同的文件，达到文件共享，测试一下：

```bash
[root@centos-7 opt]# cd apps/
[root@centos-7 apps]# vim test.html
[root@centos-7 apps]# ls
test.html
[root@centos-7 apps]# cat test.html
<h1>This is a test html!</h1>
```

在`/opt/apps`目录下创建了一个 `test.html` 文件，那么容器内的`webapps`目录是否会有该文件呢？进入容器的终端：

```bash
[root@centos-7 apps]# docker exec -it tomcat01 bash
root@115155c08687:/usr/local/tomcat# cd webapps/
root@115155c08687:/usr/local/tomcat/webapps# ls
test.html
```

容器内确实已经有了该文件，那接下来我们编写一个简单的 Web 应用：

```java
public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println("Hello World!");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

这是一个非常简单的 Servlet，我们将其打包上传到`/opt/apps`中，那么容器内肯定就会同步到该文件，此时进行访问：

![](images\docker-data-volume-webapp-8080-hello-world.png)

这种方式设置的数据卷称为**自定义数据卷**，因为数据卷的目录是由我们自己设置的，Docker 还为我们提供了另外一种设置数据卷的方式：

```bash
docker run -d -p 8080:8080 --name tomcat01 -v aa:/usr/local/tomcat/webapps tomcat:8.0-jre8
```

此时的`aa`并不是数据卷的目录，而是**数据卷的别名**，Docker 会为我们自动创建一个名为`aa`的数据卷，并且会将容器内`webapps`目录下的所有内容复制到数据卷中，该数据卷的位置在`/var/lib/docker/volumes`目录下：

```bash
[root@centos-7 volumes]# pwd
/var/lib/docker/volumes
[root@centos-7 volumes]# cd aa/
[root@centos-7 aa]# ls
_data
[root@centos-7 aa]# cd _data/
[root@centos-7 _data]# ls
docs  examples  host-manager  manager  ROOT
```

此时我们只需修改该目录的内容就能能够影响到容器。

------

最后再介绍几个容器和镜像相关的指令：

```bash
docker commit -m "描述信息" -a "镜像作者" tomcat01 my_tomcat:1.0
```

该指令能够**将容器打包成一个镜像**，此时查询镜像：

```bash
[root@centos-7 _data]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
my_tomcat           1.0                 79ab047fade5        2 seconds ago       463MB
tomcat              8                   a041be4a5ba5        2 weeks ago         533MB
MySQL               latest              db2b37ec6181        2 months ago        545MB
```

若是想将镜像备份出来，则可以使用指令：

```bash
docker save my_tomcat:1.0 -o my-tomcat-1.0.tar
```

```bash
[root@centos-7 ~]# docker save my_tomcat:1.0 -o my-tomcat-1.0.tar
[root@centos-7 ~]# ls
anaconda-ks.cfg  initial-setup-ks.cfg  公共  视频  文档  音乐
get-docker.sh    my-tomcat-1.0.tar     模板  图片  下载  桌面
```

若是拥有`.tar`格式的镜像，该如何将其加载到 Docker 中呢？执行指令：

```bash
docker load -i my-tomcat-1.0.tar
```

```bash
root@centos-7 ~]# docker load -i my-tomcat-1.0.tar
b28ef0b6fef8: Loading layer [==================================================>]  105.5MB/105.5MB
0b703c74a09c: Loading layer [==================================================>]  23.99MB/23.99MB
......
Loaded image: my_tomcat:1.0
[root@centos-7 ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
my_tomcat           1.0                 79ab047fade5        7 minutes ago       463MB
```

