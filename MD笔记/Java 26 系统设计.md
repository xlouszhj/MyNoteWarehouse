[toc]





## [JavaGuide](https://javaguide.cn/)

# ---------- 基础知识 ----------

# RestFul API 简明教程

这篇文章简单聊聊后端程序员必备的 RESTful API 相关的知识。

开始正式介绍 RESTful API 之前，我们需要首先搞清：API 到底是什么？

## 何为 API？

![](H:\JAVA\JAVA MD笔记\images\20210507153833945.png)



**API（Application Programming Interface）** 翻译过来是应用程序编程接口的意思。

我们在进行后端开发的时候，主要的工作就是为前端或者其他后端服务提供 API 比如查询用户数据的 API 。

![](H:\JAVA\JAVA MD笔记\images\20210507130629538.png)

但是， API 不仅仅代表后端系统暴露的接口，像框架中提供的方法也属于 API 的范畴。

为了方便大家理解，我再列举几个例子 🌰：

1. 你通过某电商网站搜索某某商品，电商网站的前端就调用了后端提供了搜索商品相关的 API。
2. 你使用 JDK 开发 Java 程序，想要读取用户的输入的话，你就需要使用 JDK 提供的 IO 相关的 API。
3. ……

你可以把 API 理解为程序与程序之间通信的桥梁，其本质就是一个函数而已。另外，API 的使用也不是没有章法的，它的规则由（比如数据输入和输出的格式）API 提供方制定。

## 何为 RESTful API？

**RESTful API** 经常也被叫做 **REST API**，它是基于 REST 构建的 API。这个 REST 到底是什么，我们后文在讲，涉及到的概念比较多。

如果你看 RESTful API 相关的文章的话一般都比较晦涩难懂，主要是因为 REST 涉及到的一些概念比较难以理解。但是，实际上，我们平时开发用到的 RESTful API 的知识非常简单也很容易概括！

举个例子，如果我给你下面两个 API 你是不是立马能知道它们是干什么用的！这就是 RESTful API 的强大之处！

```plain
GET    /classes：列出所有班级
POST   /classes：新建一个班级
```

**RESTful API 可以让你看到 URL+Http Method 就知道这个 URL 是干什么的，让你看到了 HTTP 状态码（status code）就知道请求结果如何。**

像咱们在开发过程中设计 API 的时候也应该至少要满足 RESTful API 的最基本的要求（比如接口中尽量使用名词，使用 `POST` 请求创建资源，`DELETE` 请求删除资源等等，示例：`GET /notes/id`：获取某个指定 id 的笔记的信息）。

## 解读 REST

**REST** 是 `REpresentational State Transfer` 的缩写。这个词组的翻译过来就是“**表现层状态转化**”。

这样理解起来甚是晦涩，实际上 REST 的全称是 **Resource Representational State Transfer** ，直白地翻译过来就是 **“资源”在网络传输中以某种“表现形式”进行“状态转移”** 。如果还是不能继续理解，请继续往下看，相信下面的讲解一定能让你理解到底啥是 REST 。

我们分别对上面涉及到的概念进行解读，以便加深理解，实际上你不需要搞懂下面这些概念，也能看懂我下一部分要介绍到的内容。不过，为了更好地能跟别人扯扯 “RESTful API”我建议你还是要好好理解一下！

- **资源（Resource）**：我们可以把真实的对象数据称为资源。一个资源既可以是一个集合，也可以是单个个体。比如我们的班级 classes 是代表一个集合形式的资源，而特定的 class 代表单个个体资源。每一种资源都有特定的 **URI（统一资源标识符）**与之对应，如果我们需要获取这个资源，访问这个 URI 就可以了，比如获取特定的班级：`/class/12`。另外，资源也可以包含子资源，比如 `/classes/classId/teachers`：列出某个指定班级的所有老师的信息
- **表现形式（Representational）**："资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式比如 `json`，`xml`，`image`,`txt` 等等叫做它的"表现层/表现形式"。
- **状态转移（State Transfer）**：大家第一眼看到这个词语一定会很懵逼？内心 BB：这尼玛是啥啊？ 大白话来说 REST 中的状态转移更多地描述的服务器端资源的状态，比如你通过增删改查（通过 HTTP 动词实现）引起资源状态的改变。ps:互联网通信协议 HTTP 协议，是一个无状态协议，所有的资源状态都保存在服务器端。

综合上面的解释，我们总结一下什么是 RESTful 架构：

1. 每一个 URI 代表一种资源；
2. 客户端和服务器之间，传递这种资源的某种表现形式比如 `json`，`xml`，`image`,`txt` 等等；
3. 客户端通过特定的 HTTP 动词，对服务器端资源进行操作，实现"表现层状态转化"。

## RESTful API 规范

![](H:\JAVA\JAVA MD笔记\images\20210507154007779.png)

### 动作

- `GET`：请求从服务器获取特定资源。举个例子：`GET /classes`（获取所有班级）
- `POST`：在服务器上创建一个新的资源。举个例子：`POST /classes`（创建班级）
- `PUT`：更新服务器上的资源（客户端提供更新后的整个资源）。举个例子：`PUT /classes/12`（更新编号为 12 的班级）
- `DELETE`：从服务器删除特定的资源。举个例子：`DELETE /classes/12`（删除编号为 12 的班级）
- `PATCH`：更新服务器上的资源（客户端提供更改的属性，可以看做作是部分更新），使用的比较少，这里就不举例子了。

### 路径（接口命名）

路径又称"终点"（endpoint），表示 API 的具体网址。实际开发中常见的规范如下：

1. **网址中不能有动词，只能有名词，API 中的名词也应该使用复数。** 因为 REST 中的资源往往和数据库中的表对应，而数据库中的表都是同种记录的"集合"（collection）。如果 API 调用并不涉及资源（如计算，翻译等操作）的话，可以用动词。比如：`GET /calculate?param1=11&param2=33` 。
2. **不用大写字母，建议用中杠 - 不用下杠 _** 。比如邀请码写成 `invitation-code`而不是 invitation_code 。
3. **善用版本化 API**。当我们的 API 发生了重大改变而不兼容前期版本的时候，我们可以通过 URL 来实现版本化，比如 `http://api.example.com/v1`、`http://apiv1.example.com` 。版本不必非要是数字，只是数字用的最多，日期、季节都可以作为版本标识符，项目团队达成共识就可。
4. **接口尽量使用名词，避免使用动词。** RESTful API 操作（HTTP Method）的是资源（名词）而不是动作（动词）。

Talk is cheap！来举个实际的例子来说明一下吧！现在有这样一个 API 提供班级（class）的信息，还包括班级中的学生和教师的信息，则它的路径应该设计成下面这样。

```plain
GET    /classes：列出所有班级
POST   /classes：新建一个班级
GET    /classes/{classId}：获取某个指定班级的信息
PUT    /classes/{classId}：更新某个指定班级的信息（一般倾向整体更新）
PATCH  /classes/{classId}：更新某个指定班级的信息（一般倾向部分更新）
DELETE /classes/{classId}：删除某个班级
GET    /classes/{classId}/teachers：列出某个指定班级的所有老师的信息
GET    /classes/{classId}/students：列出某个指定班级的所有学生的信息
DELETE /classes/{classId}/teachers/{ID}：删除某个指定班级下的指定的老师的信息
```

反例：

```plain
/getAllclasses
/createNewclass
/deleteAllActiveclasses
```

理清资源的层次结构，比如业务针对的范围是学校，那么学校会是一级资源:`/schools`，老师: `/schools/teachers`，学生: `/schools/students` 就是二级资源。

### 过滤信息（Filtering）

如果我们在查询的时候需要添加特定条件的话，建议使用 url 参数的形式。比如我们要查询 state 状态为 active 并且 name 为 guidegege 的班级：

```plain
GET    /classes?state=active&name=guidegege
```

比如我们要实现分页查询：

```plain
GET    /classes?page=1&size=10 //指定第1页，每页10个数据
```

### 状态码（Status Codes）

**状态码范围：**

| 2xx：成功 | 3xx：重定向    | 4xx：客户端错误  | 5xx：服务器错误 |
| --------- | -------------- | ---------------- | --------------- |
| 200 成功  | 301 永久重定向 | 400 错误请求     | 500 服务器错误  |
| 201 创建  | 304 资源未修改 | 401 未授权       | 502 网关错误    |
|           |                | 403 禁止访问     | 504 网关超时    |
|           |                | 404 未找到       |                 |
|           |                | 405 请求方法不对 |                 |

## RESTful 的极致 HATEOAS

> **RESTful 的极致是 hateoas ，但是这个基本不会在实际项目中用到。**

上面是 RESTful API 最基本的东西，也是我们平时开发过程中最容易实践到的。实际上，RESTful API 最好做到 Hypermedia，即返回结果中提供链接，连向其他 API 方法，使得用户不查文档，也知道下一步应该做什么。

比如，当用户向 `api.example.com` 的根目录发出请求，会得到这样一个返回结果

```javascript
{"link": {
  "rel":   "collection https://www.example.com/classes",
  "href":  "https://api.example.com/classes",
  "title": "List of classes",
  "type":  "application/vnd.yourformat+json"
}}
```

上面代码表示，文档中有一个 `link` 属性，用户读取这个属性就知道下一步该调用什么 API 了。`rel` 表示这个 API 与当前网址的关系（collection 关系，并给出该 collection 的网址），`href` 表示 API 的路径，title 表示 API 的标题，`type` 表示返回类型 `Hypermedia API` 的设计被称为[HATEOAS](http://en.wikipedia.org/wiki/HATEOAS)。

在 Spring 中有一个叫做 HATEOAS 的 API 库，通过它我们可以更轻松的创建出符合 HATEOAS 设计的 API。相关文章：

- [在 Spring Boot 中使用 HATEOAS](https://blog.aisensiy.me/2017/06/04/spring-boot-and-hateoas/)
- [Building REST services with Spring](https://spring.io/guides/tutorials/rest/) (Spring 官网 )
- [An Intro to Spring HATEOAS](https://www.baeldung.com/spring-hateoas-tutorial)
- [spring-hateoas-examples](https://github.com/spring-projects/spring-hateoas-examples/tree/master/hypermedia)
- [Spring HATEOAS](https://spring.io/projects/spring-hateoas#learn) (Spring 官网 )

## 参考

- [https://RESTfulapi.net/](https://RESTfulapi.net/)
- [https://www.ruanyifeng.com/blog/2014/05/restful_api.html](https://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [https://juejin.im/entry/59e460c951882542f578f2f0](https://juejin.im/entry/59e460c951882542f578f2f0)
- [https://phauer.com/2016/testing-RESTful-services-java-best-practices/](https://phauer.com/2016/testing-RESTful-services-java-best-practices/)
- [https://www.seobility.net/en/wiki/REST_API](https://www.seobility.net/en/wiki/REST_API)
- https://dev.to/duomly/rest-api-vs-graphql-comparison-3j6g



# 软件工程简明教程

大部分软件开发从业者，都会忽略软件开发中的一些最基础、最底层的一些概念。但是，这些软件开发的概念对于软件开发来说非常重要，就像是软件开发的基石一样。这也是我写这篇文章的原因。

## 何为软件工程？

1968 年 NATO（北大西洋公约组织）提出了**软件危机**（**Software crisis**）一词。同年，为了解决软件危机问题，“**软件工程**”的概念诞生了。一门叫做软件工程的学科也就应运而生。

随着时间的推移，软件工程这门学科也经历了一轮又一轮的完善，其中的一些核心内容比如软件开发模型越来越丰富实用！

**什么是软件危机呢？**

简单来说，软件危机描述了当时软件开发的一个痛点：我们很难高效地开发出质量高的软件。

Dijkstra（Dijkstra 算法的作者） 在 1972 年图灵奖获奖感言中也提高过软件危机，他是这样说的：“导致软件危机的主要原因是机器变得功能强大了几个数量级！坦率地说：只要没有机器，编程就完全没有问题。当我们有一些弱小的计算机时，编程成为一个温和的问题，而现在我们有了庞大的计算机，编程也同样成为一个巨大的问题”。

**说了这么多，到底什么是软件工程呢？**

工程是为了解决实际的问题将理论应用于实践。软件工程指的就是将工程思想应用于软件开发。

上面是我对软件工程的定义，我们再来看看比较权威的定义。IEEE 软件工程汇刊给出的定义是这样的：　(1)将系统化的、规范的、可量化的方法应用到软件的开发、运行及维护中，即将工程化方法应用于软件。　(2)在(1)中所述方法的研究。

总之，软件工程的终极目标就是：**在更少资源消耗的情况下，创造出更好、更容易维护的软件。**

## 软件开发过程

[维基百科是这样定义软件开发过程](https://zh.wikipedia.org/wiki/软件开发过程)的：

> 软件开发过程（英语：software development process），或软件过程（英语：software process），是软件开发的开发生命周期（software development life cycle），其各个阶段实现了软件的需求定义与分析、设计、实现、测试、交付和维护。软件过程是在开发与构建系统时应遵循的步骤，是软件开发的路线图。

- 需求分析：分析用户的需求，建立逻辑模型。
- 软件设计：根据需求分析的结果对软件架构进行设计。
- 编码：编写程序运行的源代码。
- 测试 : 确定测试用例，编写测试报告。
- 交付：将做好的软件交付给客户。
- 维护：对软件进行维护比如解决 bug，完善功能。

软件开发过程只是比较笼统的层面上，一定义了一个软件开发可能涉及到的一些流程。

软件开发模型更具体地定义了软件开发过程，对开发过程提供了强有力的理论支持。

## 软件开发模型

软件开发模型有很多种，比如瀑布模型（Waterfall Model）、快速原型模型（Rapid Prototype Model）、V 模型（V-model）、W 模型（W-model）、敏捷开发模型。其中最具有代表性的还是 **瀑布模型** 和 **敏捷开发** 。

**瀑布模型** 定义了一套完成的软件开发周期，完整地展示了一个软件的的生命周期。

![](H:\JAVA\JAVA MD笔记\images\up-264f2750a3d30366e36c375ec3a30ec2775.png)

**敏捷开发模型** 是目前使用的最多的一种软件开发模型。[MBA 智库百科对敏捷开发的描述](https://wiki.mbalib.com/wiki/敏捷开发)是这样的:

> **敏捷开发** 是一种以人为核心、迭代、循序渐进的开发方法。在敏捷开发中，软件项目的构建被切分成多个子项目，各个子项目的成果都经过测试，具备集成和可运行的特征。换言之，就是把一个大项目分为多个相互联系，但也可独立运行的小项目，并分别完成，在此过程中软件一直处于可使用状态。

像现在比较常见的一些概念比如 **持续集成**、**重构**、**小版本发布**、**低文档**、**站会**、**结对编程**、**测试驱动开发** 都是敏捷开发的核心。

## 软件开发的基本策略

### 软件复用

我们在构建一个新的软件的时候，不需要从零开始，通过复用已有的一些轮子（框架、第三方库等）、设计模式、设计原则等等现成的物料，我们可以更快地构建出一个满足要求的软件。

像我们平时接触的开源项目就是最好的例子。我想，如果不是开源，我们构建出一个满足要求的软件，耗费的精力和时间要比现在多的多！

### 分而治之

构建软件的过程中，我们会遇到很多问题。我们可以将一些比较复杂的问题拆解为一些小问题，然后，一一攻克。

我结合现在比较火的软件设计方法—领域驱动设计（Domain Driven Design，简称 DDD）来说说。

在领域驱动设计中，很重要的一个概念就是**领域（Domain）**，它就是我们要解决的问题。在领域驱动设计中，我们要做的就是把比较大的领域（问题）拆解为若干的小领域（子域）。

除此之外，分而治之也是一个比较常用的算法思想，对应的就是分治算法。如果你想了解分治算法的话，推荐你看一下北大的[《算法设计与分析 Design and Analysis of Algorithms》](https://www.coursera.org/learn/algorithms)。

### 逐步演进

软件开发是一个逐步演进的过程，我们需要不断进行迭代式增量开发，最终交付符合客户价值的产品。

这里补充一个在软件开发领域，非常重要的概念：**MVP（Minimum Viable Product，最小可行产品**）。

这个最小可行产品，可以理解为刚好能够满足客户需求的产品。下面这张图片把这个思想展示的非常精髓。

![](H:\JAVA\JAVA MD笔记\images\up-a99961ff7725106c0592abca845d555568a.png)

利用最小可行产品，我们可以也可以提早进行市场分析，这对于我们在探索产品不确定性的道路上非常有帮助。可以非常有效地指导我们下一步该往哪里走。

### 优化折中

软件开发是一个不断优化改进的过程。任何软件都有很多可以优化的点，不可能完美。我们需要不断改进和提升软件的质量。

但是，也不要陷入这个怪圈。要学会折中，在有限的投入内，以最有效的方式提高现有软件的质量。

## 参考

- 软件工程的基本概念-清华大学软件学院 刘强：[https://www.xuetangx.com/course/THU08091000367](https://www.xuetangx.com/course/THU08091000367)
- 软件开发过程-维基百科：https://zh.wikipedia.org/wiki/软件开发过程



# 代码命名指南

我还记得我刚工作那一段时间， 项目 Code Review 的时候，我经常因为变量命名不规范而被 “diss”!

究其原因还是自己那会经验不足，而且，大学那会写项目的时候不太注意这些问题，想着只要把功能实现出来就行了。

但是，工作中就不一样，为了代码的可读性、可维护性，项目组对于代码质量的要求还是很高的！

前段时间，项目组新来的一个实习生也经常在 Code Review 因为变量命名不规范而被 “diss”，这让我想到自己刚到公司写代码那会的日子。

于是，我就简单写了这篇关于变量命名规范的文章，希望能对同样有此困扰的小伙伴提供一些帮助。

确实，编程过程中，有太多太多让我们头疼的事情了，比如命名、维护其他人的代码、写测试、与其他人沟通交流等等。

据说之前在 Quora 网站，由接近 5000 名程序员票选出来的最难的事情就是“命名”。

大名鼎鼎的《重构》的作者老马（Martin Fowler）曾经在[TwoHardThings](https://martinfowler.com/bliki/TwoHardThings.html)这篇文章中提到过 CS 领域有两大最难的事情：一是 **缓存失效** ，一是 **程序命名** 。

![](H:\JAVA\JAVA MD笔记\images\marting-naming.png)

这个句话实际上也是老马引用别人的，类似的表达还有很多。比如分布式系统领域有两大最难的事情：一是 **保证消息顺序** ，一是 **严格一次传递** 。

![](H:\JAVA\JAVA MD笔记\images\20210629104844645.png)

今天咱们就单独拎出 “**命名**” 来聊聊！

这篇文章配合我之前发的 [《编码 5 分钟，命名 2 小时？史上最全的 Java 命名规范参考！》](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247486449&idx=1&sn=c3b502529ff991c7180281bcc22877af&chksm=cea2443af9d5cd2c1c87049ed15ccf6f88275419c7dbe542406166a703b27d0f3ecf2af901f8&token=999884676&lang=zh_CN#rd) 这篇文章阅读效果更佳哦！

## 为什么需要重视命名？

咱们需要先搞懂为什么要重视编程中的命名这一行为，它对于我们的编码工作有着什么意义。

**为什么命名很重要呢？** 这是因为 **好的命名即是注释，别人一看到你的命名就知道你的变量、方法或者类是做什么的！**

简单来说就是 **别人根据你的命名就能知道你的代码要表达的意思** （不过，前提这个人也要有基本的英语知识，对于一些编程中常见的单词比较熟悉）。

简单举个例子说明一下命名的重要性。

《Clean Code》这本书明确指出：

> **好的代码本身就是注释，我们要尽量规范和美化自己的代码来减少不必要的注释。**
>
> **若编程语言足够有表达力，就不需要注释，尽量通过代码来阐述。**
>
> 举个例子：
>
> 去掉下面复杂的注释，只需要创建一个与注释所言同一事物的函数即可
>
> ```java
> // check to see if the employee is eligible for full benefits
> if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))
> ```
>
> 应替换为
>
> ```java
> if (employee.isEligibleForFullBenefits())
> ```

## 常见命名规则以及适用场景

这里只介绍 3 种最常见的命名规范。

### 驼峰命名法（CamelCase）

驼峰命名法应该我们最常见的一个，这种命名方式使用大小写混合的格式来区别各个单词，并且单词之间不使用空格隔开或者连接字符连接的命名方式

#### 大驼峰命名法（UpperCamelCase）

**类名需要使用大驼峰命名法（UpperCamelCase）**

正例：

```java
ServiceDiscovery、ServiceInstance、LruCacheFactory
```

反例：

```java
serviceDiscovery、Serviceinstance、LRUCacheFactory
```

#### 小驼峰命名法（lowerCamelCase）

**方法名、参数名、成员变量、局部变量需要使用小驼峰命名法（lowerCamelCase）。**

正例：

```java
getUserInfo()
createCustomThreadPool()
setNameFormat(String nameFormat)
Uservice userService;
```

反例：

```java
GetUserInfo()、CreateCustomThreadPool()、setNameFormat(String NameFormat)
Uservice user_service
```

### 蛇形命名法（snake_case）

**测试方法名、常量、枚举名称需要使用蛇形命名法（snake_case）**

在蛇形命名法中，各个单词之间通过下划线“_”连接，比如`should_get_200_status_code_when_request_is_valid`、`CLIENT_CONNECT_SERVER_FAILURE`。

蛇形命名法的优势是命名所需要的单词比较多的时候，比如我把上面的命名通过小驼峰命名法给大家看一下：“shouldGet200StatusCodeWhenRequestIsValid”。

感觉如何？ 相比于使用蛇形命名法（snake_case）来说是不是不那么易读？

正例：

```java
@Test
void should_get_200_status_code_when_request_is_valid() {
  ......
}
```

反例：

```java
@Test
void shouldGet200StatusCodeWhenRequestIsValid() {
  ......
}
```

### 串式命名法（kebab-case）

在串式命名法中，各个单词之间通过连接符“-”连接，比如`dubbo-registry`。

建议项目文件夹名称使用串式命名法（kebab-case），比如 dubbo 项目的各个模块的命名是下面这样的。

![](H:\JAVA\JAVA MD笔记\images\dubbo-naming.png)

## 常见命名规范

### Java 语言基本命名规范

**1、类名需要使用大驼峰命名法（UpperCamelCase）风格。方法名、参数名、成员变量、局部变量需要使用小驼峰命名法（lowerCamelCase）。**

**2、测试方法名、常量、枚举名称需要使用蛇形命名法（snake_case）**，比如`should_get_200_status_code_when_request_is_valid`、`CLIENT_CONNECT_SERVER_FAILURE`。并且，**测试方法名称要求全部小写，常量以及枚举名称需要全部大写。**

**3、项目文件夹名称使用串式命名法（kebab-case），比如`dubbo-registry`。**

**4、包名统一使用小写，尽量使用单个名词作为包名，各个单词通过 "." 分隔符连接，并且各个单词必须为单数。**

正例：`org.apache.dubbo.common.threadlocal`

反例：`org.apache_dubbo.Common.threadLocals`

**5、抽象类命名使用 Abstract 开头**。

```java
//为远程传输部分抽象出来的一个抽象类（出处：Dubbo源码）
public abstract class AbstractClient extends AbstractEndpoint implements Client {

}
```

**6、异常类命名使用 Exception 结尾。**

```java
//自定义的 NoSuchMethodException（出处：Dubbo源码）
public class NoSuchMethodException extends RuntimeException {
    private static final long serialVersionUID = -2725364246023268766L;

    public NoSuchMethodException() {
        super();
    }

    public NoSuchMethodException(String msg) {
        super(msg);
    }
}
```

**7、测试类命名以它要测试的类的名称开始，以 Test 结尾。**

```java
//为 AnnotationUtils 类写的测试类（出处：Dubbo源码）
public class AnnotationUtilsTest {
  ......
}
```

POJO 类中布尔类型的变量，都不要加 is 前缀，否则部分框架解析会引起序列化错误。

如果模块、接口、类、方法使用了设计模式，在命名时需体现出具体模式。

### 命名易读性规范

**1、为了能让命名更加易懂和易读，尽量不要缩写/简写单词，除非这些单词已经被公认可以被这样缩写/简写。比如 `CustomThreadFactory` 不可以被写成 ~~`CustomTF` 。**

**2、命名不像函数一样要尽量追求短，可读性强的名字优先于简短的名字，虽然可读性强的名字会比较长一点。** 这个对应我们上面说的第 1 点。

**3、避免无意义的命名，你起的每一个名字都要能表明意思。**

正例：`UserService userService;` `int userCount`;

反例: `UserService service` `int count`

**4、避免命名过长（50 个字符以内最好），过长的命名难以阅读并且丑陋。**

**5、不要使用拼音，更不要使用中文。** 不过像 alibaba、wuhan、taobao 这种国际通用名词可以当做英文来看待。

正例：discount

反例：dazhe

## Codelf:变量命名神器?

这是一个由国人开发的网站，网上有很多人称其为变量命名神器， 我在实际使用了几天之后感觉没那么好用。小伙伴们可以自行体验一下，然后再给出自己的判断。

Codelf 提供了在线网站版本，网址：[https://unbug.github.io/codelf/](https://unbug.github.io/codelf/)，具体使用情况如下：

我选择了 Java 编程语言，然后搜索了“序列化”这个关键词，然后它就返回了很多关于序列化的命名。

![](H:\JAVA\JAVA MD笔记\images\Codelf-znCZDWxB.png)

并且，Codelf 还提供了 VS code 插件，看这个评价，看来大家还是很喜欢这款命名工具的。

![](H:\JAVA\JAVA MD笔记\images\vscode-codelf-DI_OUAYs.png)

## 相关阅读推荐

1. 《阿里巴巴 Java 开发手册》
2. 《Clean Code》
3. Google Java 代码指南：[https://google.github.io/styleguide/javaguide.html](https://google.github.io/styleguide/javaguide.html)
4. 告别编码 5 分钟，命名 2 小时！史上最全的 Java 命名规范参考：[https://www.cnblogs.com/liqiangchn/p/12000361.html](https://www.cnblogs.com/liqiangchn/p/12000361.html)

## 总结

作为一个合格的程序员，小伙伴们应该都知道代码表义的重要性。想要写出高质量代码，好的命名就是第一步！

好的命名对于其他人（包括你自己）理解你的代码有着很大的帮助！你的代码越容易被理解，可维护性就越强，侧面也就说明你的代码设计的也就越好！

在日常编码过程中，我们需要谨记常见命名规范比如类名需要使用大驼峰命名法、不要使用拼音，更不要使用中文……。

另外，国人开发的一个叫做 Codelf 的网站被很多人称为“变量命名神器”，当你为命名而头疼的时候，你可以去参考一下上面提供的一些命名示例。

最后，祝愿大家都不用再为命名而困扰!



# 代码重构指南

## 何谓重构？

学习重构必看的一本神书《重构：改善代码既有设计》从两个角度给出了重构的定义：

> - 重构（名词）：对软件内部结构的一种调整，目的是在不改变软件可观察行为的前提下，提高其可理解性，降低其修改成本。
> - 重构（动词）：使用一系列重构手法，在不改变软件可观察行为的前提下，调整其结构。

用更贴近工程师的语言来说：**重构就是利用设计模式(如组合模式、策略模式、责任链模式)、软件设计原则（如 SOLID 原则、YAGNI 原则、KISS 原则）和重构手段（如封装、继承、构建测试体系）来让代码更容易理解，更易于修改。**

软件设计原则指导着我们组织和规范代码，同时，重构也是为了能够尽量设计出尽量满足软件设计原则的软件。

正确重构的核心在于 **步子一定要小，每一步的重构都不会影响软件的正常运行，可以随时停止重构。**

**常见的设计模式如下**：

![](H:\JAVA\JAVA MD笔记\images\common-design-patterns.png)

更全面的设计模式总结，可以看 **[java-design-patterns](https://github.com/iluwatar/java-design-patterns)** 这个开源项目。

**常见的软件设计原则如下**：

![](H:\JAVA\JAVA MD笔记\images\programming-principles.png)

## 为什么要重构？

在上面介绍重构定义的时候，我从比较抽象的角度介绍了重构的好处：重构的主要目的主要是提升代码&架构的灵活性/可扩展性以及复用性。

如果对应到一个真实的项目，重构具体能为我们带来什么好处呢？

1. **让代码更容易理解**：通过添加注释、命名规范、逻辑优化等手段可以让我们的代码更容易被理解；
2. **避免代码腐化**：通过重构干掉坏味道代码；
3. **加深对代码的理解**：重构代码的过程会加深你对某部分代码的理解；
4. **发现潜在 bug**：是这样的，很多潜在的 bug ，都是我们在重构的过程中发现的；
5. ……

看了上面介绍的关于重构带来的好处之后，你会发现重构的最终目标是 **提高软件开发速度和质量** 。

重构并不会减慢软件开发速度，相反，如果代码质量和软件设计较差，当我们想要添加新功能的话，开发速度会越来越慢。到了最后，甚至都有想要重写整个系统的冲动。

![](H:\JAVA\JAVA MD笔记\images\bad&good-design.png)

《重构：改善代码既有设计》这本书中这样说：

> 重构的唯一目的就是让我们开发更快，用更少的工作量创造更大的价值。

## 何时进行重构？

重构在是开发过程中随时可以进行的，见机行事即可，并不需要单独分配一两天的时间专门用来重构。

### 提交代码之前

《重构：改善代码既有设计》这本书介绍了一个 **营地法则** 的概念:

> 编程时，需要遵循营地法则：保证你离开时的代码库一定比来时更健康。

这个概念表达的核心思想其实很简单：在你提交代码的之前，花一会时间想一想，我这次的提交是让项目代码变得更健康了，还是更腐化了，或者说没什么变化？

项目团队的每一个人只有保证自己的提交没有让项目代码变得更腐化，项目代码才会朝着健康的方向发展。

当我们离开营地（项目代码）的时候，请不要留下垃圾（代码坏味道）！尽量确保营地变得更干净了！

### 开发一个新功能之后&之前

在开发一个新功能之后，我们应该回过头看看是不是有可以改进的地方。在添加一个新功能之前，我们可以思考一下自己是否可以重构代码以让新功能的开发更容易。

一个新功能的开发不应该仅仅只有功能验证通过那么简单，我们还应该尽量保证代码质量。

有一个两顶帽子的比喻：在我开发新功能之前，我发现重构可以让新功能的开发更容易，于是我戴上了重构的帽子。重构之后，我换回原来的帽子，继续开发新能功能。新功能开发完成之后，我又发现自己的代码难以理解，于是我又戴上了重构帽子。比较好的开发状态就是就是这样在重构和开发新功能之间来回切换。

![](H:\JAVA\JAVA MD笔记\images\refractor-two-hats.png)

### Code Review 之后

Code Review 可以非常有效提高代码的整体质量，它会帮助我们发现代码中的坏味道以及可能存在问题的地方。并且， Code Review 可以帮助项目团队其他程序员理解你负责的业务模块，有效避免人员方面的单点风险。

经历一次 Code Review ，你的代码可能会收到很多改进建议。

### 捡垃圾式重构

当我们发现坏味道代码（垃圾）的时候，如果我们不想停下手头自己正在做的工作，但又不想放着垃圾不管，我们可以这样做：

- 如果这个垃圾很容易重构的话，我们可以立即重构它。
- 如果这个垃圾不太容易重构的话，我们可以先记录下来，当完成当下的任务再回来重构它。

### 阅读理解代码的时候

搞开发的小伙伴应该非常有体会：我们经常需要阅读项目团队中其他人写的代码，也经常需要阅读自己过去写的代码。阅读代码的时候，通常要比我们写代码的时间还要多很多。

我们在阅读理解代码的时候，如果发现一些坏味道的话，我们就可以对其进行重构。

就比如说你在阅读张三写的某段代码的时候，你发现这段代码逻辑过于复杂难以理解，你有更好的写法，那你就可以对张三的这段代码逻辑进行重构。

## 重构有哪些注意事项？

### 单元测试是重构的保护网

**单元测试可以为重构提供信心，降低重构的成本。我们要像重视生产代码那样，重视单元测试。**

另外，多提一句：持续集成也要依赖单元测试，当持续集成服务自动构建新代码之后，会自动运行单元测试来发现代码错误。

**怎样才能算单元测试呢？** 网上的定义很多，很抽象，很容易把人给看迷糊了。我觉得对于单元测试的定义主要取决于你的项目，一个函数甚至是一个类都可以看作是一个单元。就比如说我们写了一个计算个人股票收益率的方法，我们为了验证它的正确性专门为它写了一个单元测试。再比如说我们代码有一个类专门负责数据脱敏，我们为了验证脱敏是否符合预期专门为这个类写了一个单元测试。

**单元测试也是需要重构或者修改的。** [《代码整洁之道:敏捷软件开发手册》](https://book.douban.com/subject/4199741/)这本书这样写到：

> 测试代码需要随着生产代码的演进而修改，如果测试不能保持整洁，只会越来越难修改。

### 不要为了重构而重构

**重构一定是要为项目带来价值的！** 某些情况下我们不应该进行重构：

- 学习了某个设计模式/工程实践之后，不顾项目实际情况，刻意使用在项目上（避免货物崇拜编程）；
- 项目进展比较急的时候，重构项目调用的某个 API 的底层代码（重构之后对项目调用这个 API 并没有带来什么价值）；
- 重写比重构更容易更省事；
- ……

### 遵循方法

《重构：改善代码既有设计》这本书中列举除了代码常见的一些坏味道（比如重复代码、过长函数）和重构手段（如提炼函数、提炼变量、提炼类）。我们应该花时间去学习这些重构相关的理论知识，并在代码中去实践这些重构理论。

## 如何练习重构？

除了可以在重构项目代码的过程中练习精进重构之外，你还可以有下面这些手段：

- [重构实战练习](https://linesh.gitbook.io/refactoring/)：通过几个小案例一步一步带你学习重构！
- [设计模式+重构学习网站](https://refactoringguru.cn/)：免费在线学习代码重构、 设计模式、 SOLID 原则 （单一职责、 开闭原则、 里氏替换、 接口隔离以及依赖反转） 。
- [IDEA 官方文档的代码重构教程](https://www.jetbrains.com/help/idea/refactoring-source-code.html#popular-refactorings)：教你如何使用 IDEA 进行重构。

## 参考

- [再读《重构》- ThoughtWorks 洞见 - 2020](https://insights.thoughtworks.cn/reread-refactoring/)：详细介绍了重构的要点比如小步重构、捡垃圾式的重构，主要是重构概念相关的介绍。
- [常见代码重构技巧 - VectorJin - 2021](https://juejin.cn/post/6954378167947624484)：从软件设计原则、设计模式、代码分层、命名规范等角度介绍了如何进行重构，比较偏实战。



# 单元测试到底是什么？应该怎么做？

## 何谓单元测试？

维基百科是这样介绍单元测试的：

> 在计算机编程中，单元测试（Unit Testing）是针对程序模块（软件设计的最小单位）进行的正确性检验测试工作。
>
> 程序单元是应用的 **最小可测试部件** 。在过程化编程中，一个单元就是单个程序、函数、过程等；对于面向对象编程，最小单元就是方法，包括基类（超类）、抽象类、或者派生类（子类）中的方法。

由于每个单元有独立的逻辑，在做单元测试时，为了隔离外部依赖，确保这些依赖不影响验证逻辑，我们经常会用到 Fake、Stub 与 Mock 。

关于 Fake、Mock 与 Stub 这几个概念的解读，可以看看这篇文章：[测试中 Fakes、Mocks 以及 Stubs 概念明晰 - 王下邀月熊 - 2018](https://zhuanlan.zhihu.com/p/26942686) 。

## 为什么需要单元测试？

### 为重构保驾护航

我在[重构]()这篇文章中这样写到：

> 单元测试可以为重构提供信心，降低重构的成本。我们要像重视生产代码那样，重视单元测试。

每个开发者都会经历重构，重构后把代码改坏了的情况并不少见，很可能你只是修改了一个很简单的方法就导致系统出现了一个比较严重的错误。

如果有了单元测试的话，就不会存在这个隐患了。写完一个类，把单元测试写了，确保这个类逻辑正确；写第二个类，单元测试……写 100 个类，道理一样，每个类做到第一点“保证逻辑正确性”，100 个类拼在一起肯定不出问题。你大可以放心一边重构，一边运行 APP；而不是整体重构完，提心吊胆地 run。

### 提高代码质量

由于每个单元有独立的逻辑，做单元测试时需要隔离外部依赖，确保这些依赖不影响验证逻辑。因为要把各种依赖分离，单元测试会促进工程进行组件拆分，整理工程依赖关系，更大程度减少代码耦合。这样写出来的代码，更好维护，更好扩展，从而提高代码质量。

### 减少 bug

一个机器，由各种细小的零件组成，如果其中某件零件坏了，机器运行故障。必须保证每个零件都按设计图要求的规格，机器才能正常运行。

一个可单元测试的工程，会把业务、功能分割成规模更小、有独立的逻辑部件，称为单元。单元测试的目标，就是保证各个单元的逻辑正确性。单元测试保障工程各个“零件”按“规格”（需求）执行，从而保证整个“机器”（项目）运行正确，最大限度减少 bug。

### 快速定位 bug

如果程序有 bug，我们运行一次全部单元测试，找到不通过的测试，可以很快地定位对应的执行代码。修复代码后，运行对应的单元测试；如还不通过，继续修改，运行测试……直到测试通过。

### 持续集成依赖单元测试

持续集成需要依赖单元测试，当持续集成服务自动构建新代码之后，会自动运行单元测试来发现代码错误。

## 谁逼你写单元测试？

### 领导要求

有些经验丰富的领导，或多或少都会要求团队写单元测试。对于有一定工作经验的队友，这要求挺合理；对于经验尚浅的、毕业生，恐怕要死要活了，连代码都写不好，还要写单元测试，are you kidding me？

培训新人单元测试用法，是一项艰巨的任务。新人代码风格未形成，也不知道单元测试多重要，强制单元测试会让他们感到困惑，没办法按自己思路写代码。

### 大牛都写单元测试

国外很多家喻户晓的开源项目，都有大量单元测试。例如，[retrofit](https://link.jianshu.com?t=https://github.com/square/retrofit/tree/master/retrofit/src/test/java/retrofit2)、[okhttp](https://link.jianshu.com?t=https://github.com/square/okhttp/tree/master/okhttp-tests/src/test/java/okhttp3)、[butterknife](https://link.jianshu.com?t=https://github.com/JakeWharton/butterknife/tree/master/butterknife-compiler/src/test/java/butterknife)…… 国外大牛都写单元测试，我们也写吧！

很多读者都有这种想法，一开始满腔热血。当真要对自己项目单元测试时，便困难重重，很大原因是项目对单元测试不友好。最后只能对一些不痛不痒的工具类做单元测试，久而久之，当初美好愿望也不了了之。

### 保住面子

都是有些许年经验的老鸟，还天天被测试同学追 bug，好意思么？花多一点时间写单元测试，确保没低级 bug，还能彰显大牛风范，何乐而不为？

### 心虚

笔者也是个不太相信自己代码的人，总觉得哪里会突然冒出莫名其妙的 bug，也怕别人不小心改了自己的代码（被害妄想症），新版本上线提心吊胆……花点时间写单元测试，有事没事跑一下测试，确保原逻辑没问题，至少能睡安稳一点。

## TDD 测试驱动开发

### 何谓 TDD？

TDD 即 Test-Driven Development（ 测试驱动开发），这是敏捷开发的一项核心实践和技术，也是一种设计方法论。

TDD 原理是开发功能代码之前，先编写测试用例代码，然后针对测试用例编写功能代码，使其能够通过。

TDD 的节奏：“红 - 绿 - 重构”。

![](H:\JAVA\JAVA MD笔记\images\090e1fc6aff08b4aa66376f776c2337f.webp)

由于 TDD 对开发人员要求非常高，跟传统开发思维不一样，因此实施起来相当困难。

TDD 在很多人眼中是不实用的，一来他们并不理解测试“驱动”开发的含义，但更重要的是，他们很少会做任务分解。而任务分解是做好 TDD 的关键点。只有把任务分解到可以测试的地步，才能够有针对性地写测试。

### TDD 优缺点分析

测试驱动开发有好处也有坏处。因为每个测试用例都是根据需求来的，或者说把一个大需求分解成若干小需求编写测试用例，所以测试用例写出来后，开发者写的执行代码，必须满足测试用例。如果测试不通过，则修改执行代码，直到测试用例通过。

**优点**：

1. 帮你整理需求，梳理思路；
2. 帮你设计出更合理的接口（空想的话很容易设计出屎）；
3. 减小代码出现 bug 的概率；
4. 提高开发效率（前提是正确且熟练使用 TDD）。

**缺点**：

1. 能用好 TDD 的人非常少，看似简单，实则门槛很高；
2. 投入开发资源（时间和精力）通常会更多；
3. 由于测试用例在未进行代码设计前写；很有可能限制开发者对代码整体设计；
4. 可能引起开发人员不满情绪，我觉得这点很严重，毕竟不是人人都喜欢单元测试，尽管单元测试会带给我们相当多的好处。

相关阅读：[如何用正确的姿势打开 TDD？ - 陈天 - 2017](https://zhuanlan.zhihu.com/p/24997923) 。

## 单测框架如何选择？

对于单测来说，目前常用的单测框架有：**JUnit**、Mockito、Spock、PowerMock、JMockit、TestableMock 等等。

JUnit 几乎是默认选择，但是其不支持 Mock，因此我们还需要选择一个 Mock 工具。Mockito 和 Spock 是最主流的两款 Mock 工具，一般都是在这两者中选择。

究竟是选择 Mockito 还是 Spock 呢？我这里做了一些简单的对比分析：

- Spock 没办法 Mock 静态方法和私有方法 ，Mockito 3.4.0 以后，支持静态方法的 Mock，具体可以看这个 issue：[https://github.com/mockito/mockito/issues/1013，具体教程可以看这篇文章：https://www.baeldung.com/mockito-mock-static-methods。](https://github.com/mockito/mockito/issues/1013，具体教程可以看这篇文章：https://www.baeldung.com/mockito-mock-static-methods。)
- Spock 基于 Groovy，写出来的测试代码更清晰易读，比较规范(自带 given-when-then 的常用测试结构规范)。Mockito 没有具体的结构规范，需要项目组自己约定一个或者遵守比较好的测试代码实践。通常来说，同样的测试用例，Spock 的代码要更简洁。
- Mockito 使用的人群更广泛，稳定可靠。并且，Mockito 是 SpringBoot Test 默认集成的 Mock 工具。

Mockito 和 Spock 都是非常不错的 Mock 工具，相对来说，Mockito 的适用性更强一些。

## 总结

单元测试确实会带给你相当多的好处，但不是立刻体验出来。正如买重疾保险，交了很多保费，没病没痛，十几年甚至几十年都用不上，最好就是一辈子用不上理赔，身体健康最重要。单元测试也一样，写了可以买个放心，对代码的一种保障，有 bug 尽快测出来，没 bug 就最好，总不能说“写那么多单元测试，结果测不出 bug，浪费时间”吧？

以下是个人对单元测试一些建议：

> - 越重要的代码，越要写单元测试；
> - 代码做不到单元测试，多思考如何改进，而不是放弃；
> - 边写业务代码，边写单元测试，而不是完成整个新功能后再写；
> - 多思考如何改进、简化测试代码。
> - 测试代码需要随着生产代码的演进而重构或者修改，如果测试不能保持整洁，只会越来越难修改。

作为一名经验丰富的程序员，写单元测试更多的是**对自己的代码负责**。有测试用例的代码，别人更容易看懂，以后别人接手你的代码时，也可能放心做改动。

**多敲代码实践，多跟有单元测试经验的工程师交流**，你会发现写单元测试获得的收益会更多。

# --------- 认证授权 ----------

# 认证授权基础概念详解

## 认证 (Authentication) 和授权 (Authorization)的区别是什么？

这是一个绝大多数人都会混淆的问题。首先先从读音上来认识这两个名词，很多人都会把它俩的读音搞混，所以我建议你先先去查一查这两个单词到底该怎么读，他们的具体含义是什么。

说简单点就是：

- **认证 (Authentication)：** 你是谁。
- **授权 (Authorization)：** 你有权限干什么。

稍微正式点（啰嗦点）的说法就是：

- **Authentication（认证）** 是验证您的身份的凭据（例如用户名/用户 ID 和密码），通过这个凭据，系统得以知道你就是你，也就是说系统存在你这个用户。所以，Authentication 被称为身份/用户验证。
- **Authorization（授权）** 发生在 **Authentication（认证）** 之后。授权嘛，光看意思大家应该就明白，它主要掌管我们访问系统的权限。比如有些特定资源只能具有特定权限的人才能访问比如 admin，有些对系统资源操作比如删除、添加、更新只能特定人才具有。

认证：

![](H:\JAVA\JAVA MD笔记\images\authentication-login.png)

授权：

![](H:\JAVA\JAVA MD笔记\images\20210604161032412.png)

这两个一般在我们的系统中被结合在一起使用，目的就是为了保护我们系统的安全性。

## RBAC 模型了解吗？

系统权限控制最常采用的访问控制模型就是 **RBAC 模型** 。

**什么是 RBAC 呢？** RBAC 即**基于角色的权限访问控制**（Role-Based Access Control）。这是一种通过角色关联权限，角色同时又关联用户的授权的方式。

简单地说：一个用户可以拥有若干角色，每一个角色又可以被分配若干权限，这样就构造成“用户-角色-权限” 的授权模型。在这种模型中，用户与角色、角色与权限之间构成了多对多的关系。

![](H:\JAVA\JAVA MD笔记\images\rbac.png)

在 RBAC 权限模型中，权限与角色相关联，用户通过成为包含特定角色的成员而得到这些角色的权限，这就极大地简化了权限的管理。

为了实现 RBAC 权限模型，数据库表的常见设计如下（一共 5 张表，2 张用户建立表之间的联系）：

![](H:\JAVA\JAVA MD笔记\images\数据库设计-权限.png)

通过这个权限模型，我们可以创建不同的角色并为不同的角色分配不同的权限范围（菜单）。

![](H:\JAVA\JAVA MD笔记\images\books权限管理模块.png)

通常来说，如果系统对于权限控制要求比较严格的话，一般都会选择使用 RBAC 模型来做权限控制。

## 什么是 Cookie ? Cookie 的作用是什么?

![](H:\JAVA\JAVA MD笔记\images\cookie-sessionId.png)

`Cookie` 和 `Session` 都是用来跟踪浏览器用户身份的会话方式，但是两者的应用场景不太一样。

维基百科是这样定义 `Cookie` 的：

> `Cookies` 是某些网站为了辨别用户身份而储存在用户**本地**终端上的数据（通常经过加密）。

简单来说：**`Cookie` 存放在客户端，一般用来保存用户信息**。

下面是 `Cookie` 的一些应用案例：

1. 我们在 `Cookie` 中保存已经登录过的用户信息，下次访问网站的时候页面可以自动帮你登录的一些基本信息给填了。除此之外，`Cookie` 还能保存用户首选项，主题和其他设置信息。
2. 使用 `Cookie` 保存 `SessionId` 或者 `Token` ，向后端发送请求的时候带上 `Cookie`，这样后端就能取到 `Session` 或者 `Token` 了。这样就能记录用户当前的状态了，因为 HTTP 协议是无状态的。
3. `Cookie` 还可以用来记录和分析用户行为。举个简单的例子你在网上购物的时候，因为 HTTP 协议是没有状态的，如果服务器想要获取你在某个页面的停留状态或者看了哪些商品，一种常用的实现方式就是将这些信息存放在 `Cookie`
4. ……

## 如何在项目中使用 Cookie 呢？

我这里以 Spring Boot 项目为例。

**1)设置 `Cookie` 返回给客户端**

```java
@GetMapping("/change-username")
public String setCookie(HttpServletResponse response) {
    // 创建一个 cookie
    Cookie cookie = new Cookie("username", "Jovan");
    //设置 cookie过期时间
    cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
    //添加到 response 中
    response.addCookie(cookie);

    return "Username is changed!";
}
```

**2) 使用 Spring 框架提供的 `@CookieValue` 注解获取特定的 cookie 的值**

```java
@GetMapping("/")
public String readCookie(@CookieValue(value = "username", defaultValue = "Atta") String username) {
    return "Hey! My username is " + username;
}
```

**3) 读取所有的 `Cookie` 值**

```java
@GetMapping("/all-cookies")
public String readAllCookies(HttpServletRequest request) {

    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
        return Arrays.stream(cookies)
                .map(c -> c.getName() + "=" + c.getValue()).collect(Collectors.joining(", "));
    }

    return "No cookies";
}
```

更多关于如何在 Spring Boot 中使用 `Cookie` 的内容可以查看这篇文章：[How to use cookies in Spring Boot](https://attacomsian.com/blog/cookies-spring-boot) 。

## Cookie 和 Session 有什么区别？

**`Session` 的主要作用就是通过*服务端*记录用户的状态。** 典型的场景是购物车，当你要添加商品到购物车的时候，系统不知道是哪个用户操作的，因为 HTTP 协议是无状态的。服务端给特定的用户创建特定的 `Session` 之后就可以标识这个用户并且跟踪这个用户了。

`Cookie` 数据保存在*客户端(浏览器端)*，`Session` 数据保存在**服务器端**。相对来说 `Session` 安全性更高。如果使用 `Cookie` 的一些敏感信息不要写入 `Cookie` 中，最好能将 `Cookie` 信息加密然后使用到的时候再去服务器端解密。

**那么，如何使用 `Session` 进行身份验证？**

## 如何使用 Session-Cookie 方案进行身份验证？ ✅

很多时候我们都是通过 `SessionID` 来实现特定的用户，`SessionID` 一般会选择存放在 **Redis** 中。举个例子：

1. 用户成功登陆系统，然后返回给客户端具有 `SessionID` 的 `Cookie` 。
2. 当用户向后端发起请求的时候会把 `SessionID` 带上，这样后端就知道你的身份状态了。

关于这种认证方式更详细的过程如下：

![](H:\JAVA\JAVA MD笔记\images\session-cookie-authentication-process.png)

1. 用户向服务器发送用户名、密码、验证码用于登陆系统。
2. 服务器验证通过后，服务器为用户创建一个 `Session`，并将 `Session` 信息存储起来。
3. 服务器向用户返回一个 `SessionID`，写入用户的 `Cookie`。
4. 当用户保持登录状态时，`Cookie` 将与每个后续请求一起被发送出去。
5. 服务器可以将存储在 `Cookie` 上的 `SessionID` 与存储在内存中或者数据库中的 `Session` 信息进行比较，以验证用户的身份，返回给用户客户端响应信息的时候会附带用户当前的状态。

使用 `Session` 的时候需要注意下面几个点：

- 依赖 `Session` 的关键业务一定要确保客户端开启了 `Cookie`。
- 注意 `Session` 的过期时间。

另外，Spring Session 提供了一种跨多个应用程序或实例管理用户会话信息的机制。如果想详细了解可以查看下面几篇很不错的文章：

- [Getting Started with Spring Session](https://codeboje.de/spring-Session-tutorial/)
- [Guide to Spring Session](https://www.baeldung.com/spring-Session)
- [Sticky Sessions with Spring Session & Redis](https://medium.com/@gvnix/sticky-Sessions-with-spring-Session-redis-bdc6f7438cc3)

## 多服务器节点下 Session-Cookie 方案如何做？✅

Session-Cookie 方案在单体环境是一个非常好的身份认证方案。但是，当服务器水平拓展成多节点时，Session-Cookie 方案就要面临挑战了。

举个例子：<u>假如我们部署了两份相同的服务 A，B，用户第一次登陆的时候 ，Nginx 通过负载均衡机制将用户请求转发到 A 服务器，此时用户的 Session 信息保存在 A 服务器。结果，用户第二次访问的时候 Nginx 将请求路由到 B 服务器，由于 B 服务器没有保存 用户的 Session 信息，导致用户需要重新进行登陆</u>。

我们应该如何避免上面这种情况的出现呢？

有几个**方案**可供大家参考：

1. 某个用户的所有请求都通过特性的**哈希策略分配给同一个服务器**处理。这样的话，每个服务器都保存了一部分用户的 Session 信息。服务器宕机，其保存的所有 Session 信息就完全丢失了。
2. 每一个服务器保存的 **Session 信息都是互相同步**的，也就是说每一个服务器都保存了全量的 Session 信息。每当一个服务器的 Session 信息发生变化，我们就将其同步到其他服务器。这种方案成本太大，并且，节点越多时，同步成本也越高。
3. 单独使用一个所有服务器都能访问到的**数据节点**（比如缓存）来存放 Session 信息。为了保证高可用，数据节点尽量要避免是单点。
4. **Spring Session** 是一个用于在多个服务器之间管理会话的项目。它可以与多种后端存储（如 Redis、MongoDB 等）集成，从而实现分布式会话管理。通过 Spring Session，可以将会话数据存储在共享的外部存储中，以实现跨服务器的会话同步和共享。

## 如果没有 Cookie 的话 Session 还能用吗？✅

这是一道经典的面试题！

一般是通过 `Cookie` 来保存 `SessionID` ，假如你使用了 `Cookie` 保存 `SessionID` 的方案的话， 如果客户端禁用了 `Cookie`，那么 `Session` 就无法正常工作。

但是，并不是没有 `Cookie` 之后就不能用 `Session` 了，比如你可以将 `SessionID` **放在请求的 `url` 里**面`https://javaguide.cn/?Session_id=xxx` 。这种方案的话可行，但是**安全性和用户体验感降低**。当然，为了安全你也可以对 `SessionID` 进行一次**加密**之后再传入后端。

## 为什么 Cookie 无法防止 CSRF 攻击，而 Token 可以？✅

**CSRF(Cross Site Request Forgery)** 一般被翻译为 **跨站请求伪造** 。那么什么是 **跨站请求伪造** 呢？说简单点，就是用你的身份去发送一些对你不友好的请求。举个简单的例子：

小壮登录了某网上银行，他来到了网上银行的帖子区，看到一个帖子下面有一个链接写着“科学理财，年盈利率过万”，小壮好奇的点开了这个链接，结果发现自己的账户少了 10000 元。这是这么回事呢？原来黑客在链接中藏了一个请求，这个请求直接利用小壮的身份给银行发送了一个转账请求,也就是通过你的 Cookie 向银行发出请求。

```html
<a src=http://www.mybank.com/Transfer?bankId=11&money=10000>科学理财，年盈利率过万</>
```

上面也提到过，进行 `Session` 认证的时候，我们一般使用 `Cookie` 来存储 `SessionId`,当我们登陆后后端生成一个 `SessionId` 放在 Cookie 中返回给客户端，服务端通过 Redis 或者其他存储工具记录保存着这个 `SessionId`，客户端登录以后每次请求都会带上这个 `SessionId`，服务端通过这个 `SessionId` 来标示你这个人。如果别人通过 `Cookie` 拿到了 `SessionId` 后就可以代替你的身份访问系统了。

`Session` 认证中 `Cookie` 中的 `SessionId` 是由浏览器发送到服务端的，借助这个特性，攻击者就可以通过让用户误点攻击链接，达到攻击效果。

但是，我们使用 `Token` 的话就不会存在这个问题，在我们登录成功获得 `Token` 之后，一般会选择**存放在 `localStorage` （浏览器本地存储）**中。然后我们在**前端通过某些方式会给每个发到后端的请求加上这个 `Token`**,这样就不会出现 CSRF 漏洞的问题。因为，**即使你点击了非法链接发送了请求到服务端，这个非法请求是不会携带 `Token` 的，所以这个请求将是非法的**。

![](H:\JAVA\JAVA MD笔记\images\20210615161108272.png)

需要注意的是：不论是 `Cookie` 还是 `Token` 都无法避免 **跨站脚本攻击（Cross Site Scripting）XSS** 。

> 跨站脚本攻击（Cross Site Scripting）缩写为 CSS 但这会与层叠样式表（Cascading Style Sheets，CSS）的缩写混淆。因此，有人将跨站脚本攻击缩写为 XSS。

XSS 中攻击者会用各种方式将恶意代码注入到其他用户的页面中。就可以通过脚本盗用信息比如 `Cookie` 。

推荐阅读：[如何防止 CSRF 攻击？—美团技术团队](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)

## 什么是 JWT?JWT 由哪些部分组成？

[JavaGuide：JWT 基础概念详解](https://javaguide.cn/system-design/security/jwt-intro.html) 

[JWT 基础概念详解](# JWT 基础概念详解) 

## 如何基于 JWT 进行身份验证？ 如何防止 JWT 被篡改？

[JavaGuide：JWT 基础概念详解](https://javaguide.cn/system-design/security/jwt-intro.html) 

[JWT 基础概念详解](# JWT 基础概念详解) 

## 什么是 SSO(单点登录)?  

SSO(Single Sign On)即**单点登录**说的是**用户登陆多个子系统的其中一个就有权访问与其相关的其他系统**。举个例子我们在登陆了京东金融之后，我们同时也成功登陆京东的京东超市、京东国际、京东生鲜等子系统。

![](H:\JAVA\JAVA MD笔记\images\sso.png)

## SSO 有什么好处？

- **用户角度** :用户能够做到一次登录多次使用，无需记录多套用户名和密码，省心。
- **系统管理员角度** : 管理员只需维护好一个统一的账号中心就可以了，方便。
- **新系统开发角度:** 新系统开发时只需直接对接统一的账号中心即可，简化开发流程，省时。

## 如何设计实现一个 SSO 系统?

[JavaGuide：SSO 单点登录详解](https://javaguide.cn/system-design/security/sso-intro.html) 

[SSO 单点登录详解](# SSO 单点登录详解) 

## 什么是 OAuth 2.0？

OAuth 是一个行业的标准授权协议，主要**用来授权第三方应用获取有限的权限**。而 OAuth 2.0 是对 OAuth 1.0 的完全重新设计，OAuth 2.0 更快，更容易实现，OAuth 1.0 已经被废弃。详情请见：[rfc6749](https://tools.ietf.org/html/rfc6749)。

实际上它就是一种**授权机制**，它的最终目的是**为第三方应用颁发一个有时效性的令牌 Token，使得第三方应用能够通过该令牌获取相关的资源**。

OAuth 2.0 比较常用的场景就是第三方登录，当你的网站接入了第三方登录的时候一般就是使用的 OAuth 2.0 协议。

另外，现在 OAuth 2.0 也常见于支付场景（微信支付、支付宝支付）和开发平台（微信开放平台、阿里开放平台等等）。

下图是 [Slack OAuth 2.0 第三方登录](https://api.slack.com/legacy/oauth)的示意图：

![](H:\JAVA\JAVA MD笔记\images\20210615151716340.png)

**推荐阅读：**

- [OAuth 2.0 的一个简单解释](http://www.ruanyifeng.com/blog/2019/04/oauth_design.html)
- [10 分钟理解什么是 OAuth 2.0 协议](https://deepzz.com/post/what-is-oauth2-protocol.html)
- [OAuth 2.0 的四种方式](http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)
- [GitHub OAuth 第三方登录示例教程](http://www.ruanyifeng.com/blog/2019/04/github-oauth.html)

## 参考

- 不要用 JWT 替代 session 管理（上）：全面了解 Token,JWT,OAuth,SAML,SSO：[https://zhuanlan.zhihu.com/p/38942172](https://zhuanlan.zhihu.com/p/38942172)
- Introduction to JSON Web Tokens：[https://jwt.io/introduction](https://jwt.io/introduction)
- JSON Web Token Claims：https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-token-claims



# JWT 基础概念详解

## 什么是 JWT?

**JWT （JSON Web Token） 是目前最流行的跨域认证解决方案，是一种基于 Token 的认证授权机制**。 从 JWT 的全称可以看出，JWT 本身也是 Token，一种规范化之后的 JSON 结构的 Token。

JWT 自身包含了身份验证所需要的所有信息，因此，我们的**服务器不需要存储 Session 信息**。这显然增加了系统的可用性和伸缩性，大大减轻了服务端的压力。

可以看出，**JWT 更符合设计 RESTful API 时的「Stateless（无状态）」原则** 。

并且， 使用 JWT 认证可以有效避免 CSRF 攻击，因为 JWT 一般是**存在在 `localStorage` 中**，使用 JWT 进行身份验证的过程中是**不会涉及到 Cookie** 的。

我在 [JWT 优缺点分析]()这篇文章中有详细介绍到使用 JWT 做身份认证的优势和劣势。

下面是 [RFC 7519](https://tools.ietf.org/html/rfc7519) 对 JWT 做的较为正式的定义。

> JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted. ——[JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)

## JWT 由哪些部分组成？

![](H:\JAVA\JAVA MD笔记\images\jwt-composition.png)

JWT 本质上就是一组字串，通过（`.`）切分成三个为 **Base64 编码**的部分：

- **Header(头)**: 描述 JWT 的元数据，定义了生成签名的算法以及 `Token` 的类型。
- **Payload(有效荷载)** : 用来存放实际需要传递的数据
- **Signature（签名）**：服务器通过 Payload、Header 和一个密钥(Secret)使用 Header 里面指定的签名算法（默认是 **HMAC SHA256**）生成。

JWT 通常是这样的：`xxxxx.yyyyy.zzzzz`。

示例：

```plain
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

你可以在 [jwt.io](https://jwt.io/) 这个网站上对其 JWT 进行解码，解码之后得到的就是 Header、Payload、Signature 这三部分。

Header 和 Payload 都是 JSON 格式的数据，Signature 由 Payload、Header 和 Secret(密钥)通过特定的计算公式和加密算法得到。

![](H:\JAVA\JAVA MD笔记\images\jwt.io.png)

### Header

Header 通常由两部分组成：

- `typ`（Type）：**令牌类型**，也就是 JWT。
- `alg`（Algorithm）：**签名算法**，比如 HS256。

示例：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

JSON 形式的 Header 被转换成 Base64 编码，成为 JWT 的第一部分。

### Payload

Payload 也是 JSON 格式数据，其中包含了 Claims(声明，包含 JWT 的相关信息)。

Claims 分为三种类型：

- **Registered Claims（注册声明）**：预定义的一些声明，建议使用，但不是强制性的。
- **Public Claims（公有声明）**：JWT 签发方可以自定义的声明，但是为了避免冲突，应该在 [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) 中定义它们。
- **Private Claims（私有声明）**：JWT 签发方因为项目需要而自定义的声明，更符合实际项目场景使用。

下面是一些常见的注册声明：

- `iss`（issuer）：JWT 签发方。
- `iat`（issued at time）：JWT 签发时间。
- `sub`（subject）：JWT 主题。
- `aud`（audience）：JWT 接收方。
- `exp`（expiration time）：JWT 的过期时间。
- `nbf`（not before time）：JWT 生效时间，早于该定义的时间的 JWT 不能被接受处理。
- `jti`（JWT ID）：JWT 唯一标识。

示例：

```json
{
  "uid": "ff1212f5-d8d1-4496-bf41-d2dda73de19a",
  "sub": "1234567890",
  "name": "John Doe",
  "exp": 15323232,
  "iat": 1516239022,
  "scope": ["admin", "user"]
}
```

Payload 部分默认是不加密的，**一定不要将隐私信息存放在 Payload 当中！！！**

JSON 形式的 Payload 被转换成 Base64 编码，成为 JWT 的第二部分。

### Signature

Signature 部分是对前两部分的签名，作用是防止 JWT（主要是 payload） 被篡改。

这个签名的生成需要用到：

- Header + Payload。
- 存放在服务端的密钥(一定不要泄露出去)。
- 签名算法。

签名的计算公式如下：

```plain
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（`.`）分隔，这个字符串就是 JWT 。

## 如何基于 JWT 进行身份验证？✅

在基于 JWT 进行身份验证的的应用程序中，服务器通过 Payload、Header 和 Secret(密钥)创建 JWT 并将 JWT 发送给客户端。客户端接收到 JWT 之后，会将其保存在 Cookie 或者 **localStorage** 里面，以后客户端发出的所有请求都会携带这个令牌。

![](H:\JAVA\JAVA MD笔记\images\jwt-authentication process.png)

简化后的步骤如下：

1. 用户向服务器发送用户名、密码以及验证码用于登陆系统。
2. 如果用户用户名、密码以及验证码校验正确的话，服务端会返回已经签名的 Token，也就是 JWT。
3. 用户以后每次向后端发请求都在 Header 中带上这个 JWT 。
4. 服务端检查 JWT 并从中获取用户相关信息。

两点建议：

1. 建议将 JWT **存放在 localStorage 中**，放在 Cookie 中会有 CSRF 风险。
2. 请求服务端并携带 JWT 的常见做法是将其放在 **HTTP Header 的 `Authorization` 字段**中（`Authorization: Bearer Token`）。

**[spring-security-jwt-guide](https://github.com/Snailclimb/spring-security-jwt-guide)** 就是一个基于 JWT 来做身份认证的简单案例，感兴趣的可以看看。

## 如何防止 JWT 被篡改？✅

有了签名之后，即使 JWT 被泄露或者截获，黑客也没办法同时篡改 Signature、Header、Payload。

这是为什么呢？因为服务端拿到 JWT 之后，会解析出其中包含的 Header、Payload 以及 Signature 。服务端会根据 Header、Payload、密钥再次生成一个 Signature。拿新生成的 Signature 和 JWT 中的 Signature 作对比，如果一样就说明 Header 和 Payload 没有被修改。

不过，如果服务端的秘钥也被泄露的话，黑客就可以同时篡改 Signature、Header、Payload 了。黑客直接修改了 Header 和 Payload 之后，再重新生成一个 Signature 就可以了。

**密钥一定保管好，一定不要泄露出去。JWT 安全的核心在于签名，签名安全的核心在密钥。**

## 如何加强 JWT 的安全性？

1. 使用安全系数高的加密算法。
2. 使用成熟的开源库，没必要造轮子。
3. JWT 存放在 localStorage 中而不是 Cookie 中，避免 CSRF 风险。
4. 一定不要将隐私信息存放在 Payload 当中。
5. 密钥一定保管好，一定不要泄露出去。JWT 安全的核心在于签名，签名安全的核心在密钥。
6. **Payload 要加入 `exp` （JWT 的过期时间），永久有效的 JWT 不合理**。并且，JWT 的过期时间不易过长。
7. ……



# JWT 身份认证优缺点分析

在 [JWT 基本概念详解](https://javaguide.cn/system-design/security/jwt-intro.html)这篇文章中，我介绍了：

- 什么是 JWT?
- JWT 由哪些部分组成？
- 如何基于 JWT 进行身份验证？
- JWT 如何防止 Token 被篡改？
- 如何加强 JWT 的安全性？

这篇文章，我们一起探讨一下 JWT 身份认证的优缺点以及常见问题的解决办法。

## JWT 的优势

相比于 Session 认证的方式来说，使用 JWT 进行身份认证主要有下面 4 个优势。

### 无状态

JWT 自身包含了身份验证所需要的所有信息，因此，我们的服务器不需要存储 Session 信息。这显然增加了系统的可用性和伸缩性，大大减轻了服务端的压力。

不过，也正是由于 JWT 的无状态，也导致了它最大的缺点：**不可控！**

就比如说，**我们想要在 JWT 有效期内废弃一个 JWT 或者更改它的权限的话，并不会立即生效，通常需要等到有效期过后才可以**。再比如说，当用户 Logout 的话，JWT 也还有效。除非，我们在后端增加额外的处理逻辑比如将失效的 JWT 存储起来，后端先验证 JWT 是否有效再进行处理。具体的解决办法，我们会在后面的内容中详细介绍到，这里只是简单提一下。

### 有效避免了 CSRF 攻击  ✅

**CSRF（Cross Site Request Forgery）** 一般被翻译为 **跨站请求伪造**，属于网络攻击领域范围。相比于 SQL 脚本注入、XSS 等安全攻击方式，CSRF 的知名度并没有它们高。但是，它的确是我们开发系统时必须要考虑的安全隐患。就连业内技术标杆 Google 的产品 Gmail 也曾在 2007 年的时候爆出过 CSRF 漏洞，这给 Gmail 的用户造成了很大的损失。

那么究竟什么是跨站请求伪造呢？ 简单来说就是用你的身份去做一些不好的事情（发送一些对你不友好的请求比如恶意转账）。

举个简单的例子：小壮登录了某网上银行，他来到了网上银行的帖子区，看到一个帖子下面有一个链接写着“科学理财，年盈利率过万”，小壮好奇的点开了这个链接，结果发现自己的账户少了 10000 元。这是这么回事呢？原来黑客在链接中藏了一个请求，这个请求直接利用小壮的身份给银行发送了一个转账请求，也就是通过你的 Cookie 向银行发出请求。

```html
<a src="http://www.mybank.com/Transfer?bankId=11&money=10000"
  >科学理财，年盈利率过万</a
>
```

**CSRF 攻击需要依赖 Cookie** ，Session 认证中 Cookie 中的 `SessionID` 是由浏览器发送到服务端的，只要发出请求，Cookie 就会被携带。借助这个特性，即使黑客无法获取你的 `SessionID`，只要让你误点攻击链接，就可以达到攻击效果。

另外，并不是必须点击链接才可以达到攻击效果，很多时候，只要你打开了某个页面，CSRF 攻击就会发生。

```html
<img src="http://www.mybank.com/Transfer?bankId=11&money=10000" />
```

**那为什么 JWT 不会存在这种问题呢？**

一般情况下我们使用 JWT 的话，在我们登录成功获得 JWT 之后，一般会选择**存放在 `localStorage` 中**。前端的每一个请求后续都会附带上这个 JWT，整个过程压根不会涉及到 Cookie。因此，即使你点击了非法链接发送了请求到服务端，这个非法请求也是不会携带 JWT 的，所以这个请求将是非法的。

总结来说就一句话：**使用 JWT 进行身份验证不需要依赖 Cookie ，因此可以避免 CSRF 攻击。**

不过，这样也会存在 XSS 攻击的风险。为了避免 XSS 攻击，你可以选择将 JWT 存储在标记为`httpOnly` 的 Cookie 中。但是，这样又导致了你必须自己提供 CSRF 保护，因此，实际项目中我们通常也不会这么做。

常见的避免 XSS 攻击的方式是过滤掉请求中存在 XSS 攻击风险的可疑字符串。

在 Spring 项目中，我们一般是通过创建 XSS 过滤器来实现的。

```java
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class XSSFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
      FilterChain chain) throws IOException, ServletException {
        XSSRequestWrapper wrappedRequest =
          new XSSRequestWrapper((HttpServletRequest) request);
        chain.doFilter(wrappedRequest, response);
    }

    // other methods
}
```

### 适合移动端应用

使用 Session 进行身份认证的话，需要保存一份信息在服务器端，而且这种方式会依赖到 Cookie（需要 Cookie 保存 `SessionId`），所以不适合移动端。

但是，使用 JWT 进行身份认证就不会存在这种问题，因为只要 JWT 可以被客户端存储就能够使用，而且 JWT 还可以跨语言使用。

### 单点登录友好

使用 Session 进行身份认证的话，实现单点登录，需要我们把用户的 Session 信息保存在一台电脑上，并且还会遇到常见的 Cookie 跨域的问题。但是，使用 JWT 进行认证的话， JWT 被保存在客户端，不会存在这些问题。



## JWT 身份认证常见问题及解决办法

### 注销登录等场景下 JWT 还有效

与之类似的具体相关场景有：

- 退出登录;
- 修改密码;
- 服务端修改了某个用户具有的权限或者角色；
- 用户的帐户被封禁/删除；
- 用户被服务端强制注销；
- 用户被踢下线；
- ……

这个问题不存在于 Session 认证方式中，因为在 Session 认证方式中，遇到这种情况的话服务端删除对应的 Session 记录即可。但是，使用 JWT 认证的方式就不好解决了。我们也说过了，**JWT 一旦派发出去，如果后端不增加其他逻辑的话，它在失效之前都是有效的**。

那我们如何解决这个问题呢？查阅了很多资料，我简单总结了下面 4 种方案：

#### 将 JWT 存入内存数据库  (mallchat ✅)

将 JWT 存入 DB 中，Redis 内存数据库在这里是不错的选择。如果需要让某个 JWT 失效就直接从 Redis 中删除这个 JWT 即可。但是，这样会导致每次使用 JWT 发送请求都要先从 DB 中查询 JWT 是否存在的步骤，而且违背了 JWT 的无状态原则。

#### 黑名单机制  ✅

和上面的方式类似，使用内存数据库比如 Redis 维护一个黑名单，如果想让某个 JWT 失效的话就直接将这个 JWT 加入到 **黑名单** 即可。然后，每次使用 JWT 进行请求的话都会先判断这个 JWT 是否存在于黑名单中。

前两种方案的核心在于将有效的 JWT 存储起来或者将指定的 JWT 拉入黑名单。

虽然这两种方案都违背了 JWT 的无状态原则，但是一般实际项目中我们通常还是会使用这两种方案。

#### 修改密钥 (Secret)

我们为每个用户都创建一个专属密钥，如果我们想让某个 JWT 失效，我们直接修改对应用户的密钥即可。但是，这样相比于前两种引入内存数据库带来了危害更大：

- 如果服务是分布式的，则每次发出新的 JWT 时都必须在多台机器同步密钥。为此，你需要将密钥存储在数据库或其他外部服务中，这样和 Session 认证就没太大区别了。
- 如果用户同时在两个浏览器打开系统，或者在手机端也打开了系统，如果它从一个地方将账号退出，那么其他地方都要重新进行登录，这是不可取的。

#### 保持令牌的有效期限短并经常轮换

很简单的一种方式。但是，会导致用户登录状态不会被持久记录，而且需要用户经常登录。

另外，对于修改密码后 JWT 还有效问题的解决还是比较容易的。说一种我觉得比较好的方式：**使用用户的密码的哈希值对 JWT 进行签名。因此，如果密码更改，则任何先前的令牌将自动无法验证。**

### JWT 的续签问题

JWT 有效期一般都建议设置的不太长，那么 JWT 过期后如何认证，如何实现动态刷新 JWT，避免用户经常需要重新登录？

我们先来看看在 Session 认证中一般的做法：**假如 Session 的有效期 30 分钟，如果 30 分钟内用户有访问，就把 Session 有效期延长 30 分钟。**

JWT 认证的话，我们应该如何解决续签问题呢？查阅了很多资料，我简单总结了下面 4 种方案：

#### 类似于 Session 认证中的做法 （mallchat ✅）

这种方案满足于大部分场景。假设服务端给的 JWT 有效期设置为 30 分钟，服务端每次进行校验时，如果发现 JWT 的有效期马上快过期了，服务端就重新生成 JWT 给客户端。客户端每次请求都检查新旧 JWT，如果不一致，则更新本地的 JWT。这种做法的问题是仅仅在快过期的时候请求才会更新 JWT ,对客户端不是很友好。

#### 每次请求都返回新 JWT

这种方案的的思路很简单，但是，开销会比较大，尤其是在服务端要存储维护 JWT 的情况下。

#### JWT 有效期设置到半夜

这种方案是一种折衷的方案，保证了大部分用户白天可以正常登录，适用于对安全性要求不高的系统。

#### 用户登录返回两个 JWT  （双Token方案）✅

第一个是 accessJWT ，它的过期时间 JWT 本身的过期时间比如半个小时，另外一个是 refreshJWT 它的过期时间更长一点比如为 1 天。客户端登录后，将 accessJWT 和 refreshJWT 保存在本地，每次访问将 accessJWT 传给服务端。服务端校验 accessJWT 的有效性，如果过期的话，就将 refreshJWT 传给服务端。如果有效，服务端就生成新的 accessJWT 给客户端。否则，客户端就重新登录即可。

这种方案的不足是：

- 需要客户端来配合；
- 用户注销的时候需要同时保证两个 JWT 都无效；
- 重新请求获取 JWT 的过程中会有短暂 JWT 不可用的情况（可以通过在客户端设置定时器，当 accessJWT 快过期的时候，提前去通过 refreshJWT 获取新的 accessJWT）;
- 存在安全问题，只要拿到了未过期的 refreshJWT 就一直可以获取到 accessJWT。

## 总结

JWT 其中一个很重要的优势是**无状态**，但实际上，我们想要在实际项目中合理使用 JWT 的话，也还是需要保存 JWT 信息。

JWT 也不是银弹，也有很多缺陷，具体是选择 JWT 还是 Session 方案还是要看项目的具体需求。万万不可尬吹 JWT，而看不起其他身份认证方案。

**另外，不用 JWT 直接使用普通的 Token(随机生成，不包含具体的信息) 结合 Redis 来做身份认证也是可以的**。我在 [「优质开源项目推荐」](https://javaguide.cn/open-source-project/)的第 8 期推荐过的 [Sa-Token](https://github.com/dromara/sa-token) 这个项目是一个比较完善的 基于 JWT 的身份认证解决方案，支持自动续签、踢人下线、账号封禁、同端互斥登录等功能，感兴趣的朋友可以看看。

![](H:\JAVA\JAVA MD笔记\images\image-20220609170714725.png)

## 参考

- JWT 超详细分析：[https://learnku.com/articles/17883](https://learnku.com/articles/17883)
- How to log out when using JWT：[https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6](https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6)
- CSRF protection with JSON Web JWTs：[https://medium.com/@agungsantoso/csrf-protection-with-json-web-JWTs-83e0f2fcbcc](https://medium.com/@agungsantoso/csrf-protection-with-json-web-JWTs-83e0f2fcbcc)
- Invalidating JSON Web JWTs：https://stackoverflow.com/questions/21978658/invalidating-json-web-JWTs



# SSO 单点登录详解

## SSO 介绍

### 什么是 SSO？

SSO 英文全称 Single Sign On，单点登录。SSO 是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统。

例如你登录网易账号中心（[https://reg.163.com/](https://reg.163.com/) ）之后访问以下站点都是登录状态。

- 网易直播 [https://v.163.com](https://v.163.com/)
- 网易博客 [https://blog.163.com](https://blog.163.com/)
- 网易花田 [https://love.163.com](https://love.163.com/)
- 网易考拉 [https://www.kaola.com](https://www.kaola.com/)
- 网易 Lofter [http://www.lofter.com](http://www.lofter.com/)

### SSO 有什么好处？

1. **用户角度** :用户能够做到一次登录多次使用，无需记录多套用户名和密码，省心。
2. **系统管理员角度** : 管理员只需维护好一个统一的账号中心就可以了，方便。
3. **新系统开发角度:** 新系统开发时只需直接对接统一的账号中心即可，简化开发流程，省时。

## SSO 设计与实现  ✅

本篇文章也主要是为了探讨如何设计&实现一个 SSO 系统

以下为需要实现的核心功能：

- 单点登录
- 单点登出
- 支持跨域单点登录
- 支持跨域单点登出

### 核心应用与依赖

![](H:\JAVA\JAVA MD笔记\images\sso-system.png-kblb.png)

| 应用/模块/对象    | 说明                                |
| ----------------- | ----------------------------------- |
| 前台站点          | 需要登录的站点                      |
| SSO 站点-登录     | 提供登录的页面                      |
| SSO 站点-登出     | 提供注销登录的入口                  |
| SSO 服务-登录     | 提供登录服务                        |
| SSO 服务-登录状态 | 提供登录状态校验/登录信息查询的服务 |
| SSO 服务-登出     | 提供用户注销登录的服务              |
| 数据库            | 存储用户账户信息                    |
| 缓存              | 存储用户的登录信息，通常使用 Redis  |

### 用户登录状态的存储与校验

常见的 Web 框架对于 Session 的实现都是生成一个 SessionId 存储在浏览器 Cookie 中。然后将 Session 内容存储在服务器端内存中，这个 [ken.io](https://ken.io/) 在之前[Session 工作原理](https://ken.io/note/session-principle-skill)中也提到过。整体也是借鉴这个思路。

用户登录成功之后，生成 **AuthToken** 交给客户端保存。如果是浏览器，就保存在 **Cookie** 中。如果是手机 App 就保存在 **App 本地缓存**中。本篇主要探讨基于 Web 站点的 SSO。

用户在浏览需要登录的页面时，客户端将 AuthToken 提交给 SSO 服务校验登录状态/获取用户登录信息

对于登录信息的存储，建议采用 **Redis**，使用 Redis 集群来存储登录信息，既可以保证高可用，又可以线性扩充。同时也可以让 SSO 服务满足负载均衡/可伸缩的需求。

| 对象      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| AuthToken | 直接使用 UUID/GUID 即可，如果有验证 AuthToken 合法性需求，可以将 UserName+时间戳加密生成，服务端解密之后验证合法性 |
| 登录信息  | 通常是将 UserId，UserName 缓存起来                           |

### 用户登录/登录校验

**登录时序图**

![](H:\JAVA\JAVA MD笔记\images\sso-login-sequence.png-kbrb.png)



按照上图，用户登录后 **AuthToken 保存在 Cookie** 中。 [domain=test.com](http://domain=test.com)
 浏览器会将 domain 设置成 .test.com，

这样访问所有 *.test.com 的 web 站点，都会将 AuthToken 携带到服务器端。
然后通过 SSO 服务，完成对用户状态的校验/用户登录信息的获取

**登录信息获取/登录状态校验**

![](H:\JAVA\JAVA MD笔记\images\sso-logincheck-sequence.png-kbrb.png)

### 用户登出

用户登出时要做的事情很简单：

1. 服务端**清除缓存**（Redis）中的登录状态
2. 客户端**清除存储的 AuthToken**

**登出时序图**

![](H:\JAVA\JAVA MD笔记\images\sso-logout-sequence.png-kbrb.png)

### 跨域登录、登出

前面提到过，核心思路是客户端存储 AuthToken，服务器端通过 Redis 存储登录信息。由于客户端是将 AuthToken 存储在 Cookie 中的。所以跨域要解决的问题，就是如何解决 Cookie 的跨域读写问题。

解决跨域的核心思路就是：

- 登录完成之后通过回调的方式，将 AuthToken 传递给主域名之外的站点，该站点自行将 AuthToken 保存在当前域下的 Cookie 中。
- 登出完成之后通过回调的方式，调用非主域名站点的登出页面，完成设置 Cookie 中的 AuthToken 过期的操作。

**跨域登录（主域名已登录）**

![](H:\JAVA\JAVA MD笔记\images\sso-crossdomain-login-loggedin-sequence.png-kbrb.png)

**跨域登录（主域名未登录）**

![](H:\JAVA\JAVA MD笔记\images\sso-crossdomain-login-unlogin-sequence.png-kbrb.png)

**跨域登出**

![](H:\JAVA\JAVA MD笔记\images\sso-crossdomain-logout-sequence.png-kbrb.png)

## 说明

- 关于方案：这次设计方案更多是提供实现思路。如果涉及到 APP 用户登录等情况，在访问 SSO 服务时，增加对 APP 的签名验证就好了。当然，如果有无线网关，验证签名不是问题。
- 关于时序图：时序图中并没有包含所有场景，只列举了核心/主要场景，另外对于一些不影响理解思路的消息能省就省了。



# 权限系统设计详解

## 老权限系统的问题与现状

转转公司在过去并没有一个统一的权限管理系统，权限管理由各业务自行研发或是使用其他业务的权限系统，权限管理的不统一带来了不少问题：

1. 各业务重复造轮子，维护成本高
2. 各系统只解决部分场景问题，方案不够通用，新项目选型时没有可靠的权限管理方案
3. 缺乏统一的日志管理与审批流程，在授权信息追溯上十分困难

基于上述问题，去年底公司启动建设转转统一权限系统，目标是开发一套灵活、易用、安全的权限管理系统，供各业务使用。

## 业界权限系统的设计方式

目前业界主流的权限模型有两种，下面分别介绍下：

- **基于角色的访问控制（RBAC）**
- **基于属性的访问控制（ABAC）**

### RBAC 模型  (mallchat ✅)

**基于角色的访问控制（Role-Based Access Control，简称 RBAC）** 指的是通过用户的角色（Role）授权其相关权限，实现了灵活的访问控制，相比直接授予用户权限，要更加简单、高效、可扩展。

一个用户可以拥有若干角色，每一个角色又可以被分配若干权限这样，就构造成“用户-角色-权限” 的授权模型。在这种模型中，用户与角色、角色与权限之间构成了多对多的关系。

用一个图来描述如下：

![](H:\JAVA\JAVA MD笔记\images\rbac (1).png)

当使用 `RBAC模型` 时，通过分析用户的实际情况，基于共同的职责和需求，授予他们不同角色。这种 `用户 -> 角色 -> 权限` 间的关系，让我们可以不用再单独管理单个用户权限，用户从授予的角色里面获取所需的权限。

以一个简单的场景（Gitlab 的权限系统）为例，用户系统中有 `Admin`、`Maintainer`、`Operator` 三种角色，这三种角色分别具备不同的权限，比如只有 `Admin` 具备创建代码仓库、删除代码仓库的权限，其他的角色都不具备。我们授予某个用户 `Admin` 这个角色，他就具备了 **创建代码仓库** 和 **删除代码仓库** 这两个权限。

通过 `RBAC模型` ，当存在多个用户拥有相同权限时，我们只需要创建好拥有该权限的角色，然后给不同的用户分配不同的角色，后续只需要修改角色的权限，就能自动修改角色内所有用户的权限。

### ABAC 模型

**基于属性的访问控制（Attribute-Based Access Control，简称 ABAC）** 是一种比 `RBAC模型` 更加灵活的授权模型，它的原理是通过各种属性来动态判断一个操作是否可以被允许。这个模型在云系统中使用的比较多，比如 AWS，阿里云等。

考虑下面这些场景的权限控制：

1. 授权某个人具体某本书的编辑权限
2. 当一个文档的所属部门跟用户的部门相同时，用户可以访问这个文档
3. 当用户是一个文档的拥有者并且文档的状态是草稿，用户可以编辑这个文档
4. 早上九点前禁止 A 部门的人访问 B 系统
5. 在除了上海以外的地方禁止以管理员身份访问 A 系统
6. 用户对 2022-06-07 之前创建的订单有操作权限

可以发现上述的场景通过 `RBAC模型` 很难去实现，因为 `RBAC模型` 仅仅描述了用户可以做什么操作，但是操作的条件，以及操作的数据，`RBAC模型` 本身是没有这些限制的。但这恰恰是 `ABAC模型` 的长处，`ABAC模型` 的思想是基于用户、访问的数据的属性、以及各种环境因素去动态计算用户是否有权限进行操作。

#### ABAC 模型的原理

在 `ABAC模型` 中，一个操作是否被允许是基于对象、资源、操作和环境信息共同动态计算决定的。

- **对象**：对象是当前请求访问资源的用户。用户的属性包括 ID，个人资源，角色，部门和组织成员身份等
- **资源**：资源是当前用户要访问的资产或对象，例如文件，数据，服务器，甚至 API
- **操作**：操作是用户试图对资源进行的操作。常见的操作包括“读取”，“写入”，“编辑”，“复制”和“删除”
- **环境**：环境是每个访问请求的上下文。环境属性包含访问的时间和位置，对象的设备，通信协议和加密强度等

在 `ABAC模型` 的决策语句的执行过程中，决策引擎会根据定义好的决策语句，结合对象、资源、操作、环境等因素动态计算出决策结果。每当发生访问请求时，`ABAC模型` 决策系统都会分析属性值是否与已建立的策略匹配。如果有匹配的策略，访问请求就会被通过。

## 新权限系统的设计思想

结合转转的业务现状，`RBAC模型` 满足了转转绝大部分业务场景，并且开发成本远低于 `ABAC模型` 的权限系统，所以新权限系统选择了基于 `RBAC模型` 来实现。对于实在无法满足的业务系统，我们选择了暂时性不支持，这样可以保障新权限系统的快速落地，更快的让业务使用起来。

标准的 `RBAC模型` 是完全遵守 `用户 -> 角色 -> 权限` 这个链路的，也就是用户的权限完全由他所拥有的角色来控制，但是这样会有一个缺点，就是给用户加权限必须新增一个角色，导致实际操作起来效率比较低。所以我们在 `RBAC模型` 的基础上，新增了给用户直接增加权限的能力，也就是说既可以给用户添加角色，也可以给用户直接添加权限。最终用户的权限是由拥有的角色和权限点组合而成。

**新权限系统的权限模型**：用户最终权限 = 用户拥有的角色带来的权限 + 用户独立配置的权限，两者取并集。

新权限系统方案如下图：

![](H:\JAVA\JAVA MD笔记\images\new-authority-system-design.png)

- 首先，将集团所有的用户（包括外部用户），通过 **统一登录与注册** 功能实现了统一管理，同时与公司的组织架构信息模块打通，实现了同一个人员在所有系统中信息的一致，这也为后续基于组织架构进行权限管理提供了可行性。
- 其次，因为新权限系统需要服务集团所有业务，所以需要支持多系统权限管理。用户进行权限管理前，需要先选择相应的系统，然后配置该系统的 **菜单权限** 和 **数据权限** 信息，建立好系统的各个权限点。*PS：菜单权限和数据权限的具体说明，下文会详细介绍。*
- 最后，创建该系统下的不同角色，给不同角色配置好权限点。比如店长角色，拥有店员操作权限、本店数据查看权限等，配置好这个角色后，后续只需要给店长增加这个角色，就可以让他拥有对应的权限。

完成上述配置后，就可以进行用户的权限管理了。有两种方式可以给用户加权限：

1. 先选用户，然后添加权限。该方式可以给用户添加任意角色或是菜单/数据权限点。
2. 先选择角色，然后关联用户。该方式只可给用户添加角色，不能单独添加菜单/数据权限点。

这两种方式的具体设计方案，后文会详细说明。

### 权限系统自身的权限管理

对于权限系统来说，首先需要设计好系统自身的权限管理，也就是需要管理好 ”谁可以进入权限系统，谁可以管理其他系统的权限“，对于权限系统自身的用户，会分为三类：

1. **超级管理员**：拥有权限系统的全部操作权限，可以进行系统自身的任何操作，也可以管理接入权限的应用系统的管理操作。
2. **权限操作用户**：拥有至少一个已接入的应用系统的超级管理员角色的用户。该用户能进行的操作限定在所拥有的应用系统权限范围内。权限操作用户是一种身份，无需分配，而是根据规则自动获得的。
3. **普通用户**：普通用户也可以认为是一种身份，除去上述 2 类人，其余的都为普通用户。他们只能申请接入系统以及访问权限申请页面。

### 权限类型的定义

新权限系统中，我们把权限分为两大类，分别是：

- **菜单功能权限**：包括系统的目录导航、菜单的访问权限，以及按钮和 API 操作的权限
- **数据权限**：包括定义数据的查询范围权限，在不同系统中，通常叫做 “组织”、”站点“等，在新权限系统中，统一称作 ”组织“ 来管理数据权限

### 默认角色的分类

每个系统中设计了三个默认角色，用来满足基本的权限管理需求，分别如下：

- **超级管理员**：该角色拥有该系统的全部权限，可以修改系统的角色权限等配置，可以给其他用户授权。
- **系统管理员**：该角色拥有给其他用户授权以及修改系统的角色权限等配置能力，但角色本身不具有任何权限。
- **授权管理员**：该角色拥有给其他用户授权的能力。但是授权的范围不超出自己所拥有的权限。

> 举个栗子：授权管理员 A 可以给 B 用户添加权限，但添加的范围 小于等于 A 用户已拥有的权限。

经过这么区分，把 **拥有权限** 和 **拥有授权能力** ，这两部分给分隔开来，可以满足所有的权限控制的场景。

## 新权限系统的核心模块设计

上面介绍了新权限系统的整体设计思想，接下来分别介绍下核心模块的设计

### 系统/菜单/数据权限管理

把一个新系统接入权限系统有下列步骤：

1. 创建系统
2. 配置菜单功能权限
3. 配置数据权限（可选）
4. 创建系统的角色

其中，1、2、3 的步骤，都是在系统管理模块完成，具体流程如下图:

![](H:\JAVA\JAVA MD笔记\images\new-authority-system-design-access-flow-chart.png)

用户可以对系统的基本信息进行增删改查的操作，不同系统之间通过 **`系统编码`** 作为唯一区分。同时 `系统编码` 也会用作于菜单和数据权限编码的前缀，通过这样的设计保证权限编码全局唯一性。

例如系统的编码为 `test_online`，那么该系统的菜单编码格式便为 `test_online:m_xxx`。

系统管理界面设计如下：

![](H:\JAVA\JAVA MD笔记\images\new-authority-system-management-interface.png)

#### 菜单管理

新权限系统首先对菜单进行了分类，分别是 `目录`、`菜单` 和 `操作`，示意如下图

![](H:\JAVA\JAVA MD笔记\images\new-authority-system-menu.png)

它们分别代表的含义是：

- **目录**：指的是应用系统中最顶部的一级目录，通常在系统 Logo 的右边
- **菜单**：指的是应用系统左侧的多层级菜单，通常在系统 Logo 的下面，也是最常用的菜单结构
- **操作**：指页面中的按钮、接口等一系列可以定义为操作或页面元素的部分。

菜单管理界面设计如下：

![](H:\JAVA\JAVA MD笔记\images\new-authority-system-menu-management-interface.png)

菜单权限数据的使用，也提供两种方式：

- **动态菜单模式**：这种模式下，菜单的增删完全由权限系统接管。也就是说在权限系统增加菜单，应用系统会同步增加。这种模式好处是修改菜单无需项目上线。
- **静态菜单模式**：菜单的增删由应用系统的前端控制，权限系统只控制访问权限。这种模式下，权限系统只能标识出用户是否拥有当前菜单的权限，而具体的显示控制是由前端根据权限数据来决定。

### 角色与用户管理

角色与用户管理都是可以直接改变用户权限的核心模块，整个设计思路如下图：

![](H:\JAVA\JAVA MD笔记\images\role-and-user-management.png)

这个模块设计重点是需要考虑到批量操作。无论是通过角色关联用户，还是给用户批量增加/删除/重置权限，批量操作的场景都是系统需要设计好的。

### 权限申请

除了给其他用户添加权限外，新权限系统同时支持了用户自主申请权限。这个模块除了常规的审批流（申请、审批、查看）等，有一个比较特别的功能，就是如何让用户能选对自己要的权限。所以在该模块的设计上，除了直接选择角色外，还支持通过菜单/数据权限点，反向选择角色，如下图：

![](H:\JAVA\JAVA MD笔记\images\permission-application.png)

### 操作日志

系统操作日志会分为两大类：

1. **操作流水日志**：用户可看、可查的关键操作日志
2. **服务 Log 日志**：系统服务运行过程中产生的 Log 日志,其中，服务 Log 日志信息量大于操作流水日志，但是不方便搜索查看。所以权限系统需要提供操作流水日志功能。

在新权限系统中，用户所有的操作可以分为三类，分别为新增、更新、删除。所有的模块也可枚举，例如用户管理、角色管理、菜单管理等。明确这些信息后，那么一条日志就可以抽象为：什么人(Who)在什么时间(When)对哪些人(Target)的哪些模块做了哪些操作。
这样把所有的记录都入库，就可以方便的进行日志的查看和筛选了。

## 总结与展望

至此，新权限系统的核心设计思路与模块都已介绍完成，新系统在转转内部有大量的业务接入使用，权限管理相比以前方便了许多。权限系统作为每家公司的一个基础系统，灵活且完备的设计可以助力日后业务的发展更加高效。

后续两篇：

- [转转统一权限系统的设计与实现（后端实现篇）](https://mp.weixin.qq.com/s/hFTDckfxhSnoM_McP18Vkg)
- [转转统一权限系统的设计与实现（前端实现篇）](https://mp.weixin.qq.com/s/a_P4JAwxgunhfmJvpBnWYA)

## 参考

- 选择合适的权限模型：https://docs.authing.cn/v2/guides/access-control/choose-the-right-access-control-model.html



# ---------- 数据安全 ----------

# 常见加密算法总结

加密算法是一种用数学方法对数据进行变换的技术，目的是保护数据的安全，防止被未经授权的人读取或修改。加密算法可以分为三大类：**对称加密算法、非对称加密算法和哈希算法（也叫摘要算法）**。

日常开发中常见的需要用到的加密算法的场景：

1. 保存在数据库中的密码需要加盐之后使用哈希算法（比如 BCrypt）进行加密。
2. 保存在数据库中的银行卡号、身份号这类敏感数据需要使用对称加密算法（比如 AES）保存。
3. 网络传输的敏感数据比如银行卡号、身份号需要用 HTTPS + 非对称加密算法（如 RSA）来保证传输数据的安全性。
4. ……

ps: 严格上来说，哈希算法其实不属于加密算法，只是可以用到某些加密场景中（例如密码加密），两者可以看作是并列关系。加密算法通常指的是可以将明文转换为密文，并且能够通过某种方式（如密钥）再将密文还原为明文的算法。而哈希算法是一种单向过程，它将输入信息转换成一个固定长度的、看似随机的哈希值，但这个过程是不可逆的，也就是说，不能从哈希值还原出原始信息。

## 哈希算法

哈希算法也叫散列函数或摘要算法，它的作用是对任意长度的数据生成一个固定长度的唯一标识，也叫哈希值、散列值或消息摘要（后文统称为哈希值）。

![](H:\JAVA\JAVA MD笔记\images\hash-function-effect-demonstration.png)

哈希值的作用是可以用来验证数据的完整性和一致性。

举两个实际的例子：

- 保存密码到数据库时使用哈希算法进行加密，可以通过比较用户输入密码的哈希值和数据库保存的哈希值是否一致，来判断密码是否正确。
- 我们下载一个文件时，可以通过比较文件的哈希值和官方提供的哈希值是否一致，来判断文件是否被篡改或损坏；

这种算法的特点是**不可逆**：

- 不能从哈希值还原出原始数据。
- 原始数据的任何改变都会导致哈希值的巨大变化。

哈希算法分为两类：

- **加密哈希算法**：安全性较高的哈希算法，它可以提供一定的数据完整性保护和数据防篡改能力，能够抵御一定的攻击手段，安全性相对较高，适用于对安全性要求较高的场景。例如，SHA-256、SHA-512、SM3、Bcrypt 等等。
- **非加密哈希算法**：安全性相对较低的哈希算法，易受到暴力破解、冲突攻击等攻击手段的影响，但性能较高，适用于对安全性没有要求的业务场景。例如，CRC32、MurMurHash3 等等。

常见的哈希算法有：

- MD（Message Digest，消息摘要算法）：MD2、MD4、MD5 等，已经不被推荐使用。
- SHA（Secure Hash Algorithm，安全哈希算法）：SHA-1 系列安全性低，SHA2，SHA3 系列安全性较高。
- 国密算法：例如 SM2、SM3、SM4，其中 SM2 为非对称加密算法，SM4 为对称加密算法，SM3 为哈希算法（安全性及效率和 SHA-256 相当，但更适合国内的应用环境）。
- Bcrypt（密码哈希算法）：基于 Blowfish 加密算法的密码哈希算法，专门为密码加密而设计，安全性高。

- MAC（Message Authentication Code，消息认证码算法）：HMAC 是一种基于哈希的 MAC，可以与任何安全的哈希算法结合使用，例如 SHA-256。
- CRC：（Cyclic Redundancy Check，循环冗余校验）：CRC32 是一种 CRC 算法，它的特点是生成 32 位的校验值，通常用于数据完整性校验、文件校验等场景。
- SipHash：加密哈希算法，它的设计目的是在速度和安全性之间达到一个平衡，用于防御[哈希泛洪 DoS 攻击](https://aumasson.jp/siphash/siphashdos_29c3_slides.pdf)。Rust 默认使用 SipHash 作为哈希算法，从 Redis4.0 开始，哈希算法被替换为 SipHash。
- MurMurHash：经典快速的非加密哈希算法，目前最新的版本是 MurMurHash3，可以生成 32 位或者 128 位哈希值；
- ……

哈希算法一般是不需要密钥的，但也存在部分特殊哈希算法需要密钥。例如，MAC 和 SipHash 就是一种基于密钥的哈希算法，它在哈希算法的基础上增加了一个密钥，使得只有知道密钥的人才能验证数据的完整性和来源。

### MD (Message Digest，消息摘要算法)

MD 算法有多个版本，包括 MD2、MD4、MD5 等，其中 MD5 是最常用的版本，它可以生成一个 128 位（16 字节）的哈希值。从安全性上说：MD5 > MD4 > MD2。除了这些版本，还有一些基于 MD4 或 MD5 改进的算法，如 RIPEMD、HAVAL 等。

即使是最安全 MD 算法 MD5 也**存在被破解的风险**，攻击者可以通过暴力破解或彩虹表攻击等方式，找到与原始数据相同的哈希值，从而破解数据。

为了增加破解难度，通常可以选择加盐。**盐**（Salt）在密码学中，是指通过在密码任意固定位置插入特定的字符串，让哈希后的结果和使用原始密码的哈希结果不相符，这种过程称之为“加盐”。

加盐之后就安全了吗？并不一定，这只是增加了破解难度，不代表无法破解。而且，MD5 算法本身就存在**弱碰撞（Collision）问题**，即多个不同的输入产生相同的 MD5 值。

因此，MD 算法已经**不被推荐使用**，建议使用更安全的哈希算法比如 SHA-2、Bcrypt。

Java 提供了对 MD 算法系列的支持，包括 MD2、MD5。

MD5 代码示例（未加盐）：

```java
String originalString = "Java学习 + 面试指南：javaguide.cn";
// 创建MD5摘要对象
MessageDigest messageDigest = MessageDigest.getInstance("MD5");
messageDigest.update(originalString.getBytes(StandardCharsets.UTF_8));
// 计算哈希值
byte[] result = messageDigest.digest();
// 将哈希值转换为十六进制字符串
String hexString = new HexBinaryAdapter().marshal(result);
System.out.println("Original String: " + originalString);
System.out.println("MD5 Hash: " + hexString.toLowerCase());
```

输出：

```bash
Original String: Java学习 + 面试指南：javaguide.cn
MD5 Hash: fb246796f5b1b60d4d0268c817c608fa
```

### SHA (Secure Hash Algorithm，安全哈希算法)

SHA（Secure Hash Algorithm）系列算法是一组密码哈希算法，用于将任意长度的数据映射为固定长度的哈希值。SHA 系列算法由美国国家安全局（NSA）于 1993 年设计，目前共有 SHA-1、SHA-2、SHA-3 三种版本。

SHA-1 算法将任意长度的数据映射为 160 位的哈希值。然而，SHA-1 算法存在一些严重的缺陷，比如安全性低，容易受到碰撞攻击和长度扩展攻击。因此，SHA-1 算法已经不再被推荐使用。 SHA-2 家族（如 SHA-256、SHA-384、SHA-512 等）和 SHA-3 系列是 SHA-1 算法的替代方案，它们都提供了更高的安全性和更长的哈希值长度。

SHA-2 家族是在 SHA-1 算法的基础上改进而来的，它们采用了更复杂的运算过程和更多的轮次，使得攻击者更难以通过预计算或巧合找到碰撞。

为了寻找一种更安全和更先进的密码哈希算法，美国国家标准与技术研究院（National Institute of Standards and Technology，简称 NIST）在 2007 年公开征集 SHA-3 的候选算法。NIST 一共收到了 64 个算法方案，经过多轮的评估和筛选，最终在 2012 年宣布 Keccak 算法胜出，成为 SHA-3 的标准算法（SHA-3 与 SHA-2 算法没有直接的关系）。 Keccak 算法具有与 MD 和 SHA-1/2 完全不同的设计思路，即海绵结构（Sponge Construction），使得传统攻击方法无法直接应用于 SHA-3 的攻击中（能够抵抗目前已知的所有攻击方式包括碰撞攻击、长度扩展攻击、差分攻击等）。

由于 SHA-2 算法还没有出现重大的安全漏洞，而且在软件中的效率更高，所以大多数人还是倾向于使用 SHA-2 算法。

相比 MD5 算法，SHA-2 算法之所以更强，主要有两个原因：

- **哈希值长度更长**：例如 SHA-256 算法的哈希值长度为 **256 位**，而 MD5 算法的哈希值长度为 128 位，这就提高了攻击者暴力破解或者彩虹表攻击的难度。
- **更强的碰撞抗性**：SHA 算法采用了更复杂的运算过程和更多的轮次，使得攻击者更难以通过预计算或巧合找到碰撞。目前还没有找到任何两个不同的数据，它们的 SHA-256 哈希值相同。

当然，SHA-2 也不是绝对安全的，也有被暴力破解或者彩虹表攻击的风险，所以，在实际的应用中，**加盐还是必不可少**的。

Java 提供了对 SHA 算法系列的支持，包括 SHA-1、SHA-256、SHA-384 和 SHA-512。

SHA-256 代码示例（未加盐）：

```java
String originalString = "Java学习 + 面试指南：javaguide.cn";
// 创建SHA-256摘要对象
MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
messageDigest.update(originalString.getBytes());
// 计算哈希值
byte[] result = messageDigest.digest();
// 将哈希值转换为十六进制字符串
String hexString = new HexBinaryAdapter().marshal(result);
System.out.println("Original String: " + originalString);
System.out.println("SHA-256 Hash: " + hexString.toLowerCase());
```

输出：

```bash
Original String: Java学习 + 面试指南：javaguide.cn
SHA-256 Hash: 184eb7e1d7fb002444098c9bde3403c6f6722c93ecfac242c0e35cd9ed3b41cd
```

### Bcrypt (密码哈希算法)

Bcrypt 算法是一种基于 Blowfish 加密算法的密码哈希算法，专门为密码加密而设计，安全性高。

由于 Bcrypt 采用了 **salt（盐） 和 cost（成本）** 两种机制，它可以有效地防止彩虹表攻击和暴力破解攻击，从而保证密码的安全性。salt 是一个随机生成的字符串，用于和密码混合，增加密码的复杂度和唯一性。cost 是一个数值参数，用于控制 Bcrypt 算法的迭代次数，增加密码哈希的计算时间和资源消耗。

Bcrypt 算法可以根据实际情况进行调整加密的复杂度，可以设置不同的 cost 值和 salt 值，从而满足不同的安全需求，灵活性很高。

Java 应用程序的安全框架 Spring Security 支持多种密码编码器，其中 `BCryptPasswordEncoder` 是官方推荐的一种，它使用 BCrypt 算法对用户的密码进行加密存储。

```java
@Bean
public PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
}
```

## 对称加密

对称加密算法是指加密和解密使用同一个密钥的算法，也叫**共享密钥**加密算法。

![](H:\JAVA\JAVA MD笔记\images\symmetric-encryption.png)

常见的对称加密算法有 DES、3DES、AES 等。

### DES 和 3DES

DES（Data Encryption Standard）使用 **64 位的密钥(有效秘钥长度为 56 位,8 位奇偶校验位)**和 **64 位的明文**进行加密。

虽然 DES 一次只能加密 64 位，但我们只需要把明文划分成 64 位一组的块，就可以实现任意长度明文的加密。如果明文长度不是 64 位的倍数，必须进行填充，常用的模式有 PKCS5Padding, PKCS7Padding, NOPADDING。

DES 加密算法的基本思想是将 64 位的明文**分成两半**，然后**对每一半进行多轮的变换**，最后再合并成 64 位的密文。这些变换包括**置换、异或、选择、移位等**操作，每一轮都使用了一个子密钥，而这些**子密钥都是由同一个 56 位的主密钥生成**的。DES 加密算法总共进行了 **16 轮变换**，最后再进行一次**逆置换**，得到最终的密文。

![](H:\JAVA\JAVA MD笔记\images\des-steps.jpg)

这是一个经典的对称加密算法，但也有明显的缺陷，即 56 位的密钥安全性不足，已被证实可以在短时间内破解。

为了提高 DES 算法的安全性，人们提出了一些变种或者替代方案，例如 3DES（Triple DES）。

**3DES**（Triple DES）是 DES 向 AES 过渡的加密算法，它**使用 2 个或者 3 个 56 位的密钥对数据进行三次加密**。3DES 相当于是对每个数据块应用三次 DES 的对称加密算法。

为了兼容普通的 DES，3DES 并没有直接使用 加密->加密->加密 的方式，而是采用了**加密->解密->加密** 的方式。当三种密钥均相同时，前两步相互抵消，相当于仅实现了一次加密，因此可实现对普通 DES 加密算法的兼容。3DES 比 DES 更为安全，但其处理速度不高。

### AES

AES（Advanced Encryption Standard）算法是一种更先进的对称密钥加密算法，它使用 128 位、192 位或 256 位的密钥对数据进行加密或解密，密钥越长，安全性越高。

AES 也是一种分组(或者叫块)密码，分组长度只能是 **128 位**，也就是说，每个分组为 16 个字节。AES 加密算法有多种工作模式（mode of operation），如：ECB、CBC、OFB、CFB、CTR、XTS、OCB、GCM（目前使用最广泛的模式）。不同的模式参数和加密流程不同，但是核心仍然是 AES 算法。

和 DES 类似，对于不是 128 位倍数的明文需要进行填充，常用的填充模式有 PKCS5Padding, PKCS7Padding, NOPADDING。不过，AES-GCM 是流加密算法，可以对任意长度的明文进行加密，所以对应的填充模式为 NoPadding，即无需填充。

AES 的速度比 3DES 快，而且更安全。

![](H:\JAVA\JAVA MD笔记\images\aes-steps.jpg)

DES 算法和 AES 算法简单对比（图片来自于：[RSA vs. AES Encryption: Key Differences Explained](https://cheapsslweb.com/blog/rsa-vs-aes-encryption)）：

![](H:\JAVA\JAVA MD笔记\images\des-vs-aes.png)

基于 Java 实现 AES 算法代码示例：

```java
private static final String AES_ALGORITHM = "AES";
// AES密钥
private static final String AES_SECRET_KEY = "4128D9CDAC7E2F82951CBAF7FDFE675B";
// AES加密模式为GCM，填充方式为NoPadding
// AES-GCM 是流加密（Stream cipher）算法，所以对应的填充模式为 NoPadding，即无需填充。
private static final String AES_TRANSFORMATION = "AES/GCM/NoPadding";
// 加密器
private static Cipher encryptionCipher;
// 解密器
private static Cipher decryptionCipher;

/**
 * 完成一些初始化工作
 */
public static void init() throws Exception {
    // 将AES密钥转换为SecretKeySpec对象
    SecretKeySpec secretKeySpec = new SecretKeySpec(AES_SECRET_KEY.getBytes(), AES_ALGORITHM);
    // 使用指定的AES加密模式和填充方式获取对应的加密器并初始化
    encryptionCipher = Cipher.getInstance(AES_TRANSFORMATION);
    encryptionCipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
    // 使用指定的AES加密模式和填充方式获取对应的解密器并初始化
    decryptionCipher = Cipher.getInstance(AES_TRANSFORMATION);
    decryptionCipher.init(Cipher.DECRYPT_MODE, secretKeySpec, new GCMParameterSpec(128, encryptionCipher.getIV()));
}

/**
 * 加密
 */
public static String encrypt(String data) throws Exception {
    byte[] dataInBytes = data.getBytes();
    // 加密数据
    byte[] encryptedBytes = encryptionCipher.doFinal(dataInBytes);
    return Base64.getEncoder().encodeToString(encryptedBytes);
}

/**
 * 解密
 */
public static String decrypt(String encryptedData) throws Exception {
    byte[] dataInBytes = Base64.getDecoder().decode(encryptedData);
    // 解密数据
    byte[] decryptedBytes = decryptionCipher.doFinal(dataInBytes);
    return new String(decryptedBytes, StandardCharsets.UTF_8);
}

public static void main(String[] args) throws Exception {
    String originalString = "Java学习 + 面试指南：javaguide.cn";
    init();
    String encryptedData = encrypt(originalString);
    String decryptedData = decrypt(encryptedData);
    System.out.println("Original String: " + originalString);
    System.out.println("AES Encrypted Data : " + encryptedData);
    System.out.println("AES Decrypted Data : " + decryptedData);
}
```

输出：

```bash
Original String: Java学习 + 面试指南：javaguide.cn
AES Encrypted Data : E1qTkK91suBqToag7WCyoFP9uK5hR1nSfM6p+oBlYj71bFiIVnk5TsQRT+zpjv8stha7oyKi3jQ=
AES Decrypted Data : Java学习 + 面试指南：javaguide.cn
```

## 非对称加密

非对称加密算法是指**加密和解密使用不同的密钥**的算法，也叫**公开密钥**加密算法。这两个密钥互不相同，一个称为**公钥**，另一个称为**私钥**。公钥可以公开给任何人使用，私钥则要保密。

如果用公钥加密数据，只能用对应的私钥解密（加密）；如果用私钥加密数据，只能用对应的公钥解密（签名）。这样就可以实现数据的安全传输和身份认证。

![](H:\JAVA\JAVA MD笔记\images\asymmetric-encryption.png)

常见的非对称加密算法有 RSA、DSA、ECC 等。

### RSA

**RSA（Rivest–Shamir–Adleman algorithm）**算法是一种基于大数分解的困难性的非对称加密算法，它需要选择**两个大素数**作为私钥的一部分，然后计算出它们的**乘积作为公钥的一部分**（寻求两个大素数比较简单，而将它们的乘积进行因式分解却极其困难）。RSA 算法原理的详细介绍，可以参考这篇文章：[你真的了解 RSA 加密算法吗？ - 小傅哥](https://www.cnblogs.com/xiaofuge/p/16954187.html)。

RSA 算法的**安全性依赖于大数分解的难度**，目前已经有 512 位和 768 位的 RSA 公钥被成功分解，因此建议使用 2048 位或以上的密钥长度。

RSA 算法的优点是简单易用，可以用于数据加密和数字签名；缺点是运算速度慢，不适合大量数据的加密。

RSA 算法是是目前应用最广泛的非对称加密算法，像 SSL/TLS、SSH 等协议中就用到了 RSA 算法。

![](H:\JAVA\JAVA MD笔记\images\https-rsa-sha-256.png)

基于 Java 实现 RSA 算法代码示例：

```java
private static final String RSA_ALGORITHM = "RSA";

/**
 * 生成RSA密钥对
 */
public static KeyPair generateKeyPair() throws NoSuchAlgorithmException {
    KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(RSA_ALGORITHM);
    // 密钥大小为2048位
    keyPairGenerator.initialize(2048);
    return keyPairGenerator.generateKeyPair();
}

/**
 * 使用公钥加密数据
 */
public static String encrypt(String data, PublicKey publicKey) throws Exception {
    Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
    cipher.init(Cipher.ENCRYPT_MODE, publicKey);
    byte[] encryptedData = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
    return Base64.getEncoder().encodeToString(encryptedData);
}

/**
 * 使用私钥解密数据
 */
public static String decrypt(String encryptedData, PrivateKey privateKey) throws Exception {
    byte[] decodedData = Base64.getDecoder().decode(encryptedData);
    Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
    cipher.init(Cipher.DECRYPT_MODE, privateKey);
    byte[] decryptedData = cipher.doFinal(decodedData);
    return new String(decryptedData, StandardCharsets.UTF_8);
}

public static void main(String[] args) throws Exception {
    KeyPair keyPair = generateKeyPair();
    PublicKey publicKey = keyPair.getPublic();
    PrivateKey privateKey = keyPair.getPrivate();
    String originalString = "Java学习 + 面试指南：javaguide.cn";
    String encryptedData = encrypt(originalString, publicKey);
    String decryptedData = decrypt(encryptedData, privateKey);
    System.out.println("Original String: " + originalString);
    System.out.println("RSA Encrypted Data : " + encryptedData);
    System.out.println("RSA Decrypted Data : " + decryptedData);
}
```

输出：

```bash
Original String: Java学习 + 面试指南：javaguide.cn
RSA Encrypted Data : T9ey/CEPUAhZm4UJjuVNIg8RPd1fQ32S9w6+rvOKxmuMumkJY2daFfWuCn8A73Mk5bL6TigOJI0GHfKOt/W2x968qLM3pBGCcPX17n4pR43f32IIIz9iPdgF/INOqDxP5ZAtCDvTiuzcSgDHXqiBSK5TDjtj7xoGjfudYAXICa8pWitnqDgJYoo2J0F8mKzxoi8D8eLE455MEx8ZT1s7FUD/z7/H8CfShLRbO9zq/zFI06TXn123ufg+F4lDaq/5jaIxGVEUB/NFeX4N6OZCFHtAV32mw71BYUadzI9TgvkkUr1rSKmQ0icNhnRdKedJokGUh8g9QQ768KERu92Ibg==
RSA Decrypted Data : Java学习 + 面试指南：javaguide.cn
```

### DSA

**DSA（Digital Signature Algorithm）**算法是一种基于离散对数的困难性的非对称加密算法，它需要选择一个**素数 q 和一个 q 的倍数 p** 作为私钥的一部分，然后计算出一个**模 p 的原根 g 和一个模 q 的整数 y** 作为公钥的一部分。DSA 算法的**安全性依赖于离散对数的难度**，目前已经有 1024 位的 DSA 公钥被成功破解，因此建议使用 2048 位或以上的密钥长度。

DSA 算法的优点是数字签名速度快，**适合生成数字证书**；缺点是不能用于数据加密，且签名过程需要随机数。

DSA 算法签名过程：

1. 使用消息摘要算法对要发送的数据进行加密，生成一个信息摘要，也就是一个短的、唯一的、不可逆的数据表示。
2. 发送方用自己的 DSA 私钥对信息摘要再进行加密，形成一个数字签名，也就是一个可以证明数据来源和完整性的数据附加。
3. 将原始数据和数字签名一起通过互联网传送给接收方。
4. 接收方用发送方的公钥对数字签名进行解密，得到信息摘要。同时，接收方也用消息摘要算法对收到的原始数据进行加密，得到另一个信息摘要。接收方将两个信息摘要进行比较，如果两者一致，则说明在传送过程中数据没有被篡改或损坏；否则，则说明数据已经失去了安全性和保密性。

![](H:\JAVA\JAVA MD笔记\images\dsa-algorithm-signing-process.png)

## 总结

这篇文章介绍了三种加密算法：哈希算法、对称加密算法和非对称加密算法。

- 哈希算法是一种用数学方法对数据生成一个固定长度的唯一标识的技术，可以用来验证数据的完整性和一致性，常见的哈希算法有 MD、SHA、MAC 等。
- 对称加密算法是一种加密和解密使用同一个密钥的算法，可以用来保护数据的安全性和保密性，常见的对称加密算法有 DES、3DES、AES 等。
- 非对称加密算法是一种加密和解密使用不同的密钥的算法，可以用来实现数据的安全传输和身份认证，常见的非对称加密算法有 RSA、DSA、ECC 等。

## 参考

- 深入理解完美哈希 - 腾讯技术工程：[https://mp.weixin.qq.com/s/M8Wcj8sZ7UF1CMr887Puog](https://mp.weixin.qq.com/s/M8Wcj8sZ7UF1CMr887Puog)
- 写给开发人员的实用密码学（二）—— 哈希函数：[https://thiscute.world/posts/practical-cryptography-basics-2-hash/](https://thiscute.world/posts/practical-cryptography-basics-2-hash/)
- 奇妙的安全旅行之 DSA 算法：[https://zhuanlan.zhihu.com/p/347025157](https://zhuanlan.zhihu.com/p/347025157)
- AES-GCM 加密简介：[https://juejin.cn/post/6844904122676690951](https://juejin.cn/post/6844904122676690951)
- Java AES 256 GCM Encryption and Decryption Example | JCE Unlimited Strength：https://www.javainterviewpoint.com/java-aes-256-gcm-encryption-and-decryption/



# 敏感词过滤方案总结

系统需要对用户输入的文本进行敏感词过滤如色情、政治、暴力相关的词汇。

敏感词过滤用的使用比较多的 **Trie 树算法** 和 **DFA 算法**。

## 算法实现

### Trie 树 ✅

**Trie 树** 也称为字典树、单词查找树，哈系树的一种变种，通常被用于字符串匹配，用来解决在一组字符串集合中快速查找某个字符串的问题。像浏览器搜索的关键词提示就可以基于 Trie 树来做的。

![](H:\JAVA\JAVA MD笔记\images\brower-trie.png)

假如我们的敏感词库中有以下敏感词：

- 高清视频
- 高清 CV
- 东京冷
- 东京热

我们构造出来的敏感词 Trie 树就是下面这样的：

![](H:\JAVA\JAVA MD笔记\images\sensitive-word-trie.png)

当我们要查找对应的字符串“东京热”的话，我们会把这个字符串切割成单个的字符“东”、“京”、“热”，然后我们从 Trie 树的根节点开始匹配。

可以看出， **Trie 树的核心原理其实很简单，就是通过*公共前缀*来提高字符串匹配效率。**

[Apache Commons Collections](https://mvnrepository.com/artifact/org.apache.commons/commons-collections4) 这个库中就有 Trie 树实现：

![](H:\JAVA\JAVA MD笔记\images\common-collections-trie.png)

```java
Trie<String, String> trie = new PatriciaTrie<>();
trie.put("Abigail", "student");
trie.put("Abi", "doctor");
trie.put("Annabel", "teacher");
trie.put("Christina", "student");
trie.put("Chris", "doctor");
Assertions.assertTrue(trie.containsKey("Abigail"));
assertEquals("{Abi=doctor, Abigail=student}", trie.prefixMap("Abi").toString());
assertEquals("{Chris=doctor, Christina=student}", trie.prefixMap("Chr").toString());
```

Trie 树是一种利用**空间换时间**的数据结构，**占用的内存会比较大**。也正是因为这个原因，实际工程项目中都是使用的改进版 Trie 树例如**双数组 Trie 树（Double-Array Trie，DAT）**。

DAT 的设计者是日本的 Aoe Jun-ichi，Mori Akira 和 Sato Takuya，他们在 1989 年发表了一篇论文[《An Efficient Implementation of Trie Structures》](https://www.co-ding.com/assets/pdf/dat.pdf)，详细介绍了 DAT 的构造和应用，原作者写的示例代码地址：[https://github.com/komiya-atsushi/darts-java/blob/e2986a55e648296cc0a6244ae4a2e457cd89fb82/src/main/java/darts/DoubleArrayTrie.java](https://github.com/komiya-atsushi/darts-java/blob/e2986a55e648296cc0a6244ae4a2e457cd89fb82/src/main/java/darts/DoubleArrayTrie.java)。相比较于 Trie 树，DAT 的内存占用极低，可以达到 Trie 树内存的 1%左右。DAT 在中文分词、自然语言处理、信息检索等领域有广泛的应用，是一种非常优秀的数据结构。

### AC 自动机  (mallchat ✅)

Aho-Corasick（AC）自动机是一种建立在 Trie 树上的一种改进算法，是一种**多模式匹配算法**，由贝尔实验室的研究人员 Alfred V. Aho 和 Margaret J.Corasick 发明。

AC 自动机算法使用 Trie 树来存放模式串的前缀，通过**失败匹配指针**（失配指针）来处理匹配失败的跳转。关于 AC 自动机的详细介绍，可以查看这篇文章：[地铁十分钟 | AC 自动机](https://zhuanlan.zhihu.com/p/146369212)。

如果使用上面提到的 DAT 来表示 AC 自动机 ，就可以兼顾两者的优点，得到一种高效的多模式匹配算法。Github 上已经有了开源 Java 实现版本：[https://github.com/hankcs/AhoCorasickDoubleArrayTrie](https://github.com/hankcs/AhoCorasickDoubleArrayTrie) 。

### DFA  ✅

**DFA**（Deterministic Finite Automata)即**确定有穷自动机**，与之对应的是 NFA（Non-Deterministic Finite Automata，不确定有穷自动机)。

关于 DFA 的详细介绍可以看这篇文章：[有穷自动机 DFA&NFA (学习笔记) - 小蜗牛的文章 - 知乎](https://zhuanlan.zhihu.com/p/30009083) 。

[Hutool](https://hutool.cn/docs/#/dfa/概述) 提供了 DFA 算法的实现：

![](H:\JAVA\JAVA MD笔记\images\hutool-dfa.png)

```java
WordTree wordTree = new WordTree();
wordTree.addWord("大");
wordTree.addWord("大憨憨");
wordTree.addWord("憨憨");
String text = "那人真是个大憨憨！";
// 获得第一个匹配的关键字
String matchStr = wordTree.match(text);
System.out.println(matchStr);
// 标准匹配，匹配到最短关键词，并跳过已经匹配的关键词
List<String> matchStrList = wordTree.matchAll(text, -1, false, false);
System.out.println(matchStrList);
//匹配到最长关键词，跳过已经匹配的关键词
List<String> matchStrList2 = wordTree.matchAll(text, -1, false, true);
System.out.println(matchStrList2);
```

输出：

```plain
大
[大, 憨憨]
[大, 大憨憨]
```

## 开源项目

- [ToolGood.Words](https://github.com/toolgood/ToolGood.Words)：一款高性能敏感词(非法词/脏字)检测过滤组件，附带繁体简体互换，支持全角半角互换，汉字转拼音，模糊搜索等功能。
- [sensitive-words-filter](https://github.com/hooj0/sensitive-words-filter)：敏感词过滤项目，提供 TTMP、DFA、DAT、hash bucket、Tire 算法支持过滤。可以支持文本的高亮、过滤、判词、替换的接口支持。

## 论文

- [一种敏感词自动过滤管理系统](https://patents.google.com/patent/CN101964000B)
- [一种网络游戏中敏感词过滤方法及系统](https://patents.google.com/patent/CN103714160A/zh)



# 数据脱敏方案总结

## 什么是数据脱敏

### 数据脱敏的定义

数据脱敏百度百科中是这样定义的：

> 数据脱敏，指对某些敏感信息通过脱敏规则进行数据的变形，实现敏感隐私数据的可靠保护。这样就可以在开发、测试和其它非生产环境以及外包环境中安全地使用脱敏后的真实数据集。在涉及客户安全数据或者一些商业性敏感数据的情况下，在不违反系统规则条件下，对真实数据进行改造并提供测试使用，如身份证号、手机号、卡号、客户号等个人信息都需要进行数据脱敏。是数据库安全技术之一。

总的来说，数据脱敏是指对某些敏感信息通过脱敏规则进行数据的变形，实现敏感隐私数据的可靠保护。

在数据脱敏过程中，通常会采用不同的算法和技术，以根据不同的需求和场景对数据进行处理。例如，对于身份证号码，可以使用**掩码算法**（masking）将前几位数字保留，其他位用 “X” 或 "*" 代替；对于姓名，可以使用**伪造（pseudonymization）算法**，将真实姓名替换成随机生成的假名。

### 常用脱敏规则

常用脱敏规则是为了保护敏感数据的安全性，在处理和存储敏感数据时对其进行变换或修改。

下面是几种常见的脱敏规则：

- 替换(常用)：将敏感数据中的特定字符或字符序列替换为其他字符。例如，将信用卡号中的中间几位数字替换为星号（*）或其他字符。
- 删除：将敏感数据中的部分内容随机删除。比如，将电话号码的随机 3 位数字进行删除。
- 重排：将原始数据中的某些字符或字段的顺序打乱。例如，将身份证号码的随机位交错互换。
- 加噪：在数据中注入一些误差或者噪音，达到对数据脱敏的效果。例如，在敏感数据中添加一些随机生成的字符。
- 加密（常用）：使用加密算法将敏感数据转换为密文。例如，将银行卡号用 MD5 或 SHA-256 等哈希函数进行散列。常见加密算法总结可以参考这篇文章：[https://javaguide.cn/system-design/security/encryption-algorithms.html](https://javaguide.cn/system-design/security/encryption-algorithms.html) 。
- ……

## 常用脱敏工具

### Hutool

Hutool 一个 Java 基础工具类，对文件、流、加密解密、转码、正则、线程、XML 等 JDK 方法进行封装，组成各种 Util 工具类，同时提供以下组件：

|        模块        |                             介绍                             |
| :----------------: | :----------------------------------------------------------: |
|     hutool-aop     |          JDK 动态代理封装，提供非 IOC 下的切面支持           |
| hutool-bloomFilter |            布隆过滤，提供一些 Hash 算法的布隆过滤            |
|    hutool-cache    |                         简单缓存实现                         |
|  **hutool-core**   |           核心，包括 Bean 操作、日期、各种 Util 等           |
|    hutool-cron     |        定时任务模块，提供类 Crontab 表达式的定时任务         |
|   hutool-crypto    |         加密解密模块，提供对称、非对称和摘要算法封装         |
|     hutool-db      |        JDBC 封装后的数据操作，基于 ActiveRecord 思想         |
|     hutool-dfa     |                 基于 DFA 模型的多关键字查找                  |
|    hutool-extra    | 扩展模块，对第三方封装（模板引擎、邮件、Servlet、二维码、Emoji、FTP、分词等） |
|    hutool-http     |          基于 HttpUrlConnection 的 Http 客户端封装           |
|     hutool-log     |                  自动识别日志实现的日志门面                  |
|   hutool-script    |                脚本执行封装，例如 Javascript                 |
|   hutool-setting   |       功能更强大的 Setting 配置文件和 Properties 封装        |
|   hutool-system    |                系统参数调用封装（JVM 信息等）                |
|    hutool-json     |                          JSON 实现                           |
|   hutool-captcha   |                        图片验证码实现                        |
|     hutool-poi     |               针对 POI 中 Excel 和 Word 的封装               |
|   hutool-socket    |            基于 Java 的 NIO 和 AIO 的 Socket 封装            |
|     hutool-jwt     |                JSON Web Token (JWT) 封装实现                 |

可以根据需求对每个模块单独引入，也可以通过引入`hutool-all`方式引入所有模块，本文所使用的**数据脱敏工具就是在 `hutool.core` 模块**。

现阶段最新版本的 Hutool 支持的脱敏数据类型如下，基本覆盖了常见的敏感信息。

1. 用户 id
2. 中文姓名
3. 身份证号
4. 座机号
5. 手机号
6. 地址
7. 电子邮件
8. 密码
9. 中国大陆车牌，包含普通车辆、新能源车辆
10. 银行卡

#### 一行代码实现脱敏

Hutool 提供的脱敏方法如下图所示：

![](H:\JAVA\JAVA MD笔记\images\2023-08-01-10-2119fnVCIDozqHgRGx.png)

注意：Hutool 脱敏是通过 * 来代替敏感信息的，具体实现是在 StrUtil.hide 方法中，如果我们想要自定义隐藏符号，则可以把 Hutool 的源码拷出来，重新实现即可。

这里以手机号、银行卡号、身份证号、密码信息的脱敏为例，下面是对应的测试代码

```java
import cn.hutool.core.util.DesensitizedUtil;
import org.junit.Test;
import org.springframework.boot.test.context.Spring BootTest;

/**
 *
 * @description: Hutool实现数据脱敏
 */
@Spring BootTest
public class HuToolDesensitizationTest {

    @Test
    public void testPhoneDesensitization(){
        String phone="13723231234";
        System.out.println(DesensitizedUtil.mobilePhone(phone)); //输出：137****1234
    }
    @Test
    public void testBankCardDesensitization(){
        String bankCard="6217000130008255666";
        System.out.println(DesensitizedUtil.bankCard(bankCard)); //输出：6217 **** **** *** 5666
    }

    @Test
    public void testIdCardNumDesensitization(){
        String idCardNum="411021199901102321";
        //只显示前4位和后2位
        System.out.println(DesensitizedUtil.idCardNum(idCardNum,4,2)); //输出：4110************21
    }
    @Test
    public void testPasswordDesensitization(){
        String password="www.jd.com_35711";
        System.out.println(DesensitizedUtil.password(password)); //输出：****************
    }
}
```

以上就是使用 Hutool 封装好的工具类实现数据脱敏。

#### 配合 JackSon 通过注解方式实现脱敏

现在有了数据脱敏工具类，如果前端需要显示数据数据的地方比较多，我们不可能在每个地方都调用一个工具类，这样就显得代码太冗余了，那我们如何通过注解的方式优雅的完成数据脱敏呢？

如果项目是基于 Spring Boot 的 web 项目，则可以利用 Spring Boot 自带的 jackson 自定义序列化实现。它的实现原来其实就是在 json 进行序列化渲染给前端时，进行脱敏。

**第一步：脱敏策略的枚举。**

```java
/**
 * @author
 * @description:脱敏策略枚举
 */
public enum DesensitizationTypeEnum {
    //自定义
    MY_RULE,
    //用户id
    USER_ID,
    //中文名
    CHINESE_NAME,
    //身份证号
    ID_CARD,
    //座机号
    FIXED_PHONE,
    //手机号
    MOBILE_PHONE,
    //地址
    ADDRESS,
    //电子邮件
    EMAIL,
    //密码
    PASSWORD,
    //中国大陆车牌，包含普通车辆、新能源车辆
    CAR_LICENSE,
    //银行卡
    BANK_CARD
}
```

上面表示支持的脱敏类型。

**第二步：定义一个用于脱敏的 Desensitization 注解。**

- `@Retention (RetentionPolicy.RUNTIME)`：运行时生效。
- `@Target (ElementType.FIELD)`：可用在字段上。
- `@JacksonAnnotationsInside`：此注解可以点进去看一下是一个元注解，主要是用户打包其他注解一起使用。
- `@JsonSerialize`：上面说到过，该注解的作用就是可自定义序列化，可以用在注解上，方法上，字段上，类上，运行时生效等等，根据提供的序列化类里面的重写方法实现自定义序列化。

```java
/**
 * @author
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@JacksonAnnotationsInside
@JsonSerialize(using = DesensitizationSerialize.class)
public @interface Desensitization {
    /**
     * 脱敏数据类型，在MY_RULE的时候，startInclude和endExclude生效
     */
    DesensitizationTypeEnum type() default DesensitizationTypeEnum.MY_RULE;

    /**
     * 脱敏开始位置（包含）
     */
    int startInclude() default 0;

    /**
     * 脱敏结束位置（不包含）
     */
    int endExclude() default 0;
}
```

注：只有使用了自定义的脱敏枚举 `MY_RULE` 的时候，开始位置和结束位置才生效。

**第三步：创建自定的序列化类**

这一步是我们实现数据脱敏的关键。自定义序列化类继承 `JsonSerializer`，实现 `ContextualSerializer` 接口，并重写两个方法。

```java
/**
 * @author
 * @description: 自定义序列化类
 */
@AllArgsConstructor
@NoArgsConstructor
public class DesensitizationSerialize extends JsonSerializer<String> implements ContextualSerializer {
    private DesensitizationTypeEnum type;

    private Integer startInclude;

    private Integer endExclude;

    @Override
    public void serialize(String str, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        switch (type) {
            // 自定义类型脱敏
            case MY_RULE:
                jsonGenerator.writeString(CharSequenceUtil.hide(str, startInclude, endExclude));
                break;
            // userId脱敏
            case USER_ID:
                jsonGenerator.writeString(String.valueOf(DesensitizedUtil.userId()));
                break;
            // 中文姓名脱敏
            case CHINESE_NAME:
                jsonGenerator.writeString(DesensitizedUtil.chineseName(String.valueOf(str)));
                break;
            // 身份证脱敏
            case ID_CARD:
                jsonGenerator.writeString(DesensitizedUtil.idCardNum(String.valueOf(str), 1, 2));
                break;
            // 固定电话脱敏
            case FIXED_PHONE:
                jsonGenerator.writeString(DesensitizedUtil.fixedPhone(String.valueOf(str)));
                break;
            // 手机号脱敏
            case MOBILE_PHONE:
                jsonGenerator.writeString(DesensitizedUtil.mobilePhone(String.valueOf(str)));
                break;
            // 地址脱敏
            case ADDRESS:
                jsonGenerator.writeString(DesensitizedUtil.address(String.valueOf(str), 8));
                break;
            // 邮箱脱敏
            case EMAIL:
                jsonGenerator.writeString(DesensitizedUtil.email(String.valueOf(str)));
                break;
            // 密码脱敏
            case PASSWORD:
                jsonGenerator.writeString(DesensitizedUtil.password(String.valueOf(str)));
                break;
            // 中国车牌脱敏
            case CAR_LICENSE:
                jsonGenerator.writeString(DesensitizedUtil.carLicense(String.valueOf(str)));
                break;
            // 银行卡脱敏
            case BANK_CARD:
                jsonGenerator.writeString(DesensitizedUtil.bankCard(String.valueOf(str)));
                break;
            default:
        }

    }

    @Override
    public JsonSerializer<?> createContextual(SerializerProvider serializerProvider, BeanProperty beanProperty) throws JsonMappingException {
        if (beanProperty != null) {
            // 判断数据类型是否为String类型
            if (Objects.equals(beanProperty.getType().getRawClass(), String.class)) {
                // 获取定义的注解
                Desensitization desensitization = beanProperty.getAnnotation(Desensitization.class);
                // 为null
                if (desensitization == null) {
                    desensitization = beanProperty.getContextAnnotation(Desensitization.class);
                }
                // 不为null
                if (desensitization != null) {
                    // 创建定义的序列化类的实例并且返回，入参为注解定义的type,开始位置，结束位置。
                    return new DesensitizationSerialize(desensitization.type(), desensitization.startInclude(),
                            desensitization.endExclude());
                }
            }
            return serializerProvider.findValueSerializer(beanProperty.getType(), beanProperty);
        }
        return serializerProvider.findNullValueSerializer(null);
    }
}
```

经过上述三步，已经完成了通过注解实现数据脱敏了，下面我们来测试一下。

首先定义一个要测试的 pojo，对应的字段加入要脱敏的策略。

```java
/**
 *
 * @description:
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestPojo {

    private String userName;

    @Desensitization(type = DesensitizationTypeEnum.MOBILE_PHONE)
    private String phone;

    @Desensitization(type = DesensitizationTypeEnum.PASSWORD)
    private String password;

    @Desensitization(type = DesensitizationTypeEnum.MY_RULE, startInclude = 0, endExclude = 2)
    private String address;
}
```

接下来写一个测试的 controller

```java
@RestController
public class TestController {

    @RequestMapping("/test")
    public TestPojo testDesensitization(){
        TestPojo testPojo = new TestPojo();
        testPojo.setUserName("我是用户名");
        testPojo.setAddress("地球中国-北京市通州区京东总部2号楼");
        testPojo.setPhone("13782946666");
        testPojo.setPassword("sunyangwei123123123.");
        System.out.println(testPojo);
        return testPojo;
    }
}
```

![](H:\JAVA\JAVA MD笔记\images\2023-08-02-16-497DdCBy8vbf2D69g.png)

可以看到我们成功实现了数据脱敏。

### Apache ShardingSphere

ShardingSphere 是一套开源的分布式数据库中间件解决方案组成的生态圈，它由 Sharding-JDBC、Sharding-Proxy 和 Sharding-Sidecar（计划中）这 3 款相互独立的产品组成。 他们均提供标准化的数据分片、分布式事务和数据库治理功能 。

Apache ShardingSphere 下面存在一个数据脱敏模块，此模块集成的常用的数据脱敏的功能。其基本原理是对用户输入的 SQL 进行解析拦截，并依靠用户的脱敏配置进行 SQL 的改写，从而实现对原文字段的加密及加密字段的解密。最终实现对用户无感的加解密存储、查询。

通过 Apache ShardingSphere 可以自动化&透明化数据脱敏过程，用户无需关注脱敏中间实现细节。并且，提供了多种内置、第三方(AKS)的脱敏策略，用户仅需简单配置即可使用。

官方文档地址：[https://shardingsphere.apache.org/document/4.1.1/cn/features/orchestration/encrypt/](https://shardingsphere.apache.org/document/4.1.1/cn/features/orchestration/encrypt/) 。

### FastJSON

平时开发 Web 项目的时候，除了默认的 Spring 自带的序列化工具，FastJson 也是一个很常用的 Spring Web Restful 接口序列化的工具。

FastJSON 实现数据脱敏的方式主要有两种：

- 基于注解 `@JSONField` 实现：需要自定义一个用于脱敏的序列化的类，然后在需要脱敏的字段上通过 `@JSONField` 中的 `serializeUsing` 指定为我们自定义的序列化类型即可。
- 基于序列化过滤器：需要实现 `ValueFilter` 接口，重写 `process` 方法完成自定义脱敏，然后在 JSON 转换时使用自定义的转换策略。具体实现可参考这篇文章： [https://juejin.cn/post/7067916686141161479](https://juejin.cn/post/7067916686141161479)。

### Mybatis-mate

MybatisPlus 也提供了数据脱敏模块 mybatis-mate。mybatis-mate 为 MybatisPlus 企业级模块，使用之前需要配置授权码（付费），旨在更敏捷优雅处理数据。

配置内容如下所示：

```yaml
# Mybatis Mate 配置
mybatis-mate:
  cert:
    grant: jxftsdfggggx
    license: GKXP9r4MCJhGID/DTGigcBcLmZjb1YZGjE4GXaAoxbtGsPC20sxpEtiUr2F7Nb1ANTUekvF6Syo6DzraA4M4oacwoLVTglzfvaEfadfsd232485eLJK1QsskrSJmreMnEaNh9lsV7Lpbxy9JeGCeM0HPEbRvq8Y+8dUt5bQYLklsa3ZIBexir+4XykZY15uqn1pYIp4pEK0+aINTa57xjJNoWuBIqm7BdFIb4l1TAcPYMTsMXhF5hfMmKD2h391HxWTshJ6jbt4YqdKD167AgeoM+B+DE1jxlLjcpskY+kFs9piOS7RCcmKBBUOgX2BD/JxhR2gQ==
```

具体实现可参考 baomidou 提供的如下代码：[https://gitee.com/baomidou/mybatis-mate-examples](https://gitee.com/baomidou/mybatis-mate-examples) 。

### MyBatis-Flex

类似于 MybatisPlus，MyBatis-Flex 也是一个 MyBatis 增强框架。MyBatis-Flex 同样提供了数据脱敏功能，并且是可以免费使用的。

MyBatis-Flex 提供了 `@ColumnMask()` 注解，以及内置的 9 种脱敏规则，开箱即用：

- 用户名脱敏
- 手机号脱敏
- 固定电话脱敏
- 身份证号脱敏
- 车牌号脱敏
- 地址脱敏
- 邮件脱敏
- 密码脱敏
- 银行卡号脱敏

```java
/**
 * 内置的数据脱敏方式
 */
public class Masks {
    /**
     * 手机号脱敏
     */
    public static final String MOBILE = "mobile";
    /**
     * 固定电话脱敏
     */
    public static final String FIXED_PHONE = "fixed_phone";
    /**
     * 身份证号脱敏
     */
    public static final String ID_CARD_NUMBER = "id_card_number";
    /**
     * 中文名脱敏
     */
    public static final String CHINESE_NAME = "chinese_name";
    /**
     * 地址脱敏
     */
    public static final String ADDRESS = "address";
    /**
     * 邮件脱敏
     */
    public static final String EMAIL = "email";
    /**
     * 密码脱敏
     */
    public static final String PASSWORD = "password";
    /**
     * 车牌号脱敏
     */
    public static final String CAR_LICENSE = "car_license";
    /**
     * 银行卡号脱敏
     */
    public static final String BANK_CARD_NUMBER = "bank_card_number";
    //...
}
```

使用示例：

```java
@Table("tb_account")
public class Account {

    @Id(keyType = KeyType.Auto)
    private Long id;

    @ColumnMask(Masks.CHINESE_NAME)
    private String userName;

    @ColumnMask(Masks.EMAIL)
    private String email;

}
```

如果这些内置的脱敏规则不满足你的要求的话，你还可以自定义脱敏规则。

## 总结

本文主要介绍了数据脱敏的相关内容，首先介绍了数据脱敏的概念，在此基础上介绍了常用的数据脱敏规则；随后介绍了本文的重点 Hutool 工具及其使用方法，在此基础上进行了实操，分别演示了使用 DesensitizedUtil 工具类、配合 Jackson 通过注解的方式完成数据脱敏；最后，介绍了一些常见的数据脱敏方法，并附上了对应的教程链接供大家参考，本文内容如有不当之处，还请大家批评指正。

## 推荐阅读

- [Spring Boot 日志、配置文件、接口数据如何脱敏？老鸟们都是这样玩的！](https://mp.weixin.qq.com/s/59osrnjyPJ7BV070x6ABwQ)
- [大厂也在用的 6 种数据脱敏方案，严防泄露数据的“内鬼”](https://mp.weixin.qq.com/s/_Dgekk1AJsIx0TTlnH6kUA)

## 参考

- Hutool 工具官网： [https://hutool.cn/docs/#/](https://hutool.cn/docs/#/)
- 聊聊如何自定义数据脱敏：[https://juejin.cn/post/7046567603971719204](https://juejin.cn/post/7046567603971719204)
- FastJSON 实现数据脱敏：https://juejin.cn/post/7067916686141161479



# 系统设计常见面试题总结(付费)

暂无

# 设计模式常见面试题总结

暂无

# Java 定时任务详解

## 为什么需要定时任务？

我们来看一下几个非常常见的业务场景：

1. 某系统凌晨 1 点要进行数据备份。
2. 某电商平台，用户下单半个小时未支付的情况下需要自动取消订单。
3. 某媒体聚合平台，每 10 分钟动态抓取某某网站的数据为自己所用。
4. 某博客平台，支持定时发送文章。
5. 某基金平台，每晚定时计算用户当日收益情况并推送给用户最新的数据。
6. ……

这些场景往往都要求我们在某个特定的时间去做某个事情，也就是定时或者延时去做某个事情。

- 定时任务：在指定时间点执行特定的任务，例如每天早上 8 点，每周一下午 3 点等。定时任务可以用来做一些周期性的工作，如数据备份，日志清理，报表生成等。
- 延时任务：一定的延迟时间后执行特定的任务，例如 10 分钟后，3 小时后等。延时任务可以用来做一些异步的工作，如订单取消，推送通知，红包撤回等。

尽管二者的适用场景有所区别，但它们的核心思想都是将任务的执行时间安排在未来的某个点上，以达到预期的调度效果。

## 单机定时任务 ✅

### Timer

`java.util.Timer`是 JDK 1.3 开始就已经支持的一种定时任务的实现方式。

`Timer` 内部使用一个叫做 **`TaskQueue`** 的类存放定时任务，它是一个**基于最小堆实现的优先级队列**。`TaskQueue` 会按照任务距离下一次执行时间的大小将任务排序，保证在堆顶的任务最先执行。这样在需要执行任务时，每次只需要取出堆顶的任务运行即可！

`Timer` 使用起来比较简单，通过下面的方式我们就能创建一个 1s 之后执行的定时任务。

```java
// 示例代码：
TimerTask task = new TimerTask() {
    public void run() {
        System.out.println("当前时间: " + new Date() + "n" +
                "线程名称: " + Thread.currentThread().getName());
    }
};
System.out.println("当前时间: " + new Date() + "n" +
        "线程名称: " + Thread.currentThread().getName());
Timer timer = new Timer("Timer");
long delay = 1000L;
timer.schedule(task, delay);


//输出：
当前时间: Fri May 28 15:18:47 CST 2021n线程名称: main
当前时间: Fri May 28 15:18:48 CST 2021n线程名称: Timer
```

不过其缺陷较多，比如一个 `Timer` 一个线程，这就导致 `Timer` 的任务的执行只能**串行执行**，一个任务执行时间过长的话会影响其他任务（性能非常差），再比如**发生异常时任务直接停止**（`Timer` 只捕获了 `InterruptedException` ）。

`Timer` 类上的有一段注释是这样写的：

```
 * This class does not offer real-time guarantees: it schedules
 * tasks using the <tt>Object.wait(long)</tt> method.
 *Java 5.0 introduced the {@code java.util.concurrent} package and
 * one of the concurrency utilities therein is the {@link
 * java.util.concurrent.ScheduledThreadPoolExecutor
 * ScheduledThreadPoolExecutor} which is a thread pool for repeatedly
 * executing tasks at a given rate or delay.  It is effectively a more
 * versatile replacement for the {@code Timer}/{@code TimerTask}
 * combination, as it allows multiple service threads, accepts various
 * time units, and doesn't require subclassing {@code TimerTask} (just
 * implement {@code Runnable}).  Configuring {@code
 * ScheduledThreadPoolExecutor} with one thread makes it equivalent to
 * {@code Timer}.
```

大概的意思就是：`ScheduledThreadPoolExecutor` 支持多线程执行定时任务并且功能更强大，是 `Timer` 的替代品。

### ScheduledExecutorService  ✅

`ScheduledExecutorService` 是一个接口，有多个实现类，比较常用的是 `ScheduledThreadPoolExecutor` 。

![](H:\JAVA\JAVA MD笔记\images\20210607154324712.png)

`ScheduledThreadPoolExecutor` 本身就是一个**线程池**，支持任务**并发执行**。并且，其内部使用 **`DelayedWorkQueue` 作为任务队列**。

> `DelayedWorkQueue` 的内部元素并不是按照放入的时间排序，而是会按照延迟的时间长短对任务进行排序，内部采用的是“**堆**”的数据结构，可以保证每次出队的任务都是当前队列中执行时间最靠前的。`DelayedWorkQueue` 添加元素满了之后会**自动扩容原来容量的 1/2**，即永远不会阻塞，最大扩容可达 `Integer.MAX_VALUE`，**相当于无界队列**了；所以**最多只能创建核心线程数的线程**。所以 最大线程数是无效参数。

```java
// 示例代码：
TimerTask repeatedTask = new TimerTask() {
    @SneakyThrows
    public void run() {
        System.out.println("当前时间: " + new Date() + "n" +
                "线程名称: " + Thread.currentThread().getName());
    }
};
System.out.println("当前时间: " + new Date() + "n" +
        "线程名称: " + Thread.currentThread().getName());
ScheduledExecutorService executor = Executors.newScheduledThreadPool(3);
long delay  = 1000L;
long period = 1000L;
executor.scheduleAtFixedRate(repeatedTask, delay, period, TimeUnit.MILLISECONDS);
Thread.sleep(delay + period * 5);
executor.shutdown();
//输出：
当前时间: Fri May 28 15:40:46 CST 2021n线程名称: main
当前时间: Fri May 28 15:40:47 CST 2021n线程名称: pool-1-thread-1
当前时间: Fri May 28 15:40:48 CST 2021n线程名称: pool-1-thread-1
当前时间: Fri May 28 15:40:49 CST 2021n线程名称: pool-1-thread-2
当前时间: Fri May 28 15:40:50 CST 2021n线程名称: pool-1-thread-2
当前时间: Fri May 28 15:40:51 CST 2021n线程名称: pool-1-thread-2
当前时间: Fri May 28 15:40:52 CST 2021n线程名称: pool-1-thread-2
```

不论是使用 `Timer` 还是 `ScheduledExecutorService` 都**无法使用 Cron 表达式指定任务执行的具体时间**。

### DelayQueue

`DelayQueue` 是 JUC 包(`java.util.concurrent)`为我们提供的**延迟队列**，用于实现延时任务比如订单下单 15 分钟未支付直接取消。它是 `BlockingQueue` 的一种，底层是一个基于 `PriorityQueue` 实现的一个**无界队列**，是**线程安全**的。关于`PriorityQueue`可以参考笔者编写的这篇文章：[PriorityQueue 源码分析](https://javaguide.cn/java/collection/priorityqueue-source-code.html) 。

![](H:\JAVA\JAVA MD笔记\images\blocking-queue-hierarchy (1).png)

`DelayQueue` 和 `Timer/TimerTask` 都可以用于实现定时任务调度，但是它们的实现方式不同。`DelayQueue` 是基于**优先级队列**和**堆排序**算法实现的，可以实现多个任务按照时间先后顺序执行；而 `Timer/TimerTask` 是基于单线程实现的，只能按照任务的执行顺序依次执行，如果某个任务执行时间过长，会影响其他任务的执行。另外，`DelayQueue` 还支持动态添加和移除任务，而 `Timer/TimerTask` 只能在创建时指定任务。

关于 `DelayQueue` 的详细介绍，请参考我写的这篇文章：[`DelayQueue` 源码分析](https://javaguide.cn/java/collection/delayqueue-source-code.html)。

### Spring Task  (mallchat ✅)

我们直接通过 Spring 提供的 `@Scheduled` 注解即可定义定时任务，非常方便！

```java
/**
 * cron：使用Cron表达式。每分钟的1，2秒运行
 */
@Scheduled(cron = "1-2 * * * * ? ")
public void reportCurrentTimeWithCronExpression() {
  log.info("Cron Expression: The time is now {}", dateFormat.format(new Date()));
}
```

我在大学那会做的一个 SSM 的企业级项目，就是用的 Spring Task 来做的定时任务。

并且，Spring Task 还是支持 **Cron 表达式** 的。Cron 表达式主要**用于定时作业(定时任务)系统定义执行时间或执行频率的表达式**，非常厉害，你可以通过 Cron 表达式进行设置定时任务每天或者每个月什么时候执行等等操作。咱们要学习定时任务的话，Cron 表达式是一定是要重点关注的。推荐一个在线 Cron 表达式生成器：[http://cron.qqe2.com/](http://cron.qqe2.com/) 。

但是，Spring 自带的定时调度**只支持单机**，并且提供的功能比较单一。之前写过一篇文章:[《5 分钟搞懂如何在 Spring Boot 中 Schedule Tasks》](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247485563&idx=1&sn=7419341f04036a10b141b74624a3f8c9&chksm=cea247b0f9d5cea6440759e6d49b4e77d06f4c99470243a10c1463834e873ca90266413fbc92&token=2133161636&lang=zh_CN#rd) 🌟，不了解的小伙伴可以参考一下。

Spring Task 底层是**基于 JDK 的 `ScheduledThreadPoolExecutor` 线程池来实现**的。

**优缺点总结：**

- 优点：简单，轻量，支持 Cron 表达式
- 缺点：功能单一

### 时间轮  ✅

Kafka、Dubbo、ZooKeeper、Netty、Caffeine、Akka 中都有对时间轮的实现。

时间轮简单来说就是一个**环形的队列（底层一般基于数组实现），队列中的每一个元素（时间格）都可以存放一个定时任务列表**。

时间轮中的每个时间格代表了时间轮的基本时间跨度或者说时间精度，假如时间一秒走一个时间格的话，那么这个时间轮的最高精度就是 1 秒（也就是说 3s 和 3.9s 会在同一个时间格中）。

下图是一个有 12 个时间格的时间轮，转完一圈需要 12 s。当我们需要新建一个 3s 后执行的定时任务，只需要将定时任务放在下标为 3 的时间格中即可。当我们需要新建一个 9s 后执行的定时任务，只需要将定时任务放在下标为 9 的时间格中即可。

![](H:\JAVA\JAVA MD笔记\images\one-layers-of-time-wheel.png)

那当我们需要创建一个 13s 后执行的定时任务怎么办呢？这个时候可以引入一叫做 **圈数/轮数** 的概念，也就是说这个任务还是放在下标为 1 的时间格中， 不过它的圈数为 2 。

除了增加圈数这种方法之外，还有一种 **多层次时间轮** （类似手表），Kafka 采用的就是这种方案。

针对下图的时间轮，我来举一个例子便于大家理解。

![](H:\JAVA\JAVA MD笔记\images\three-layers-of-time-wheel.png)

上图的时间轮(ms -> s)，第 1 层的时间精度为 1 ，第 2 层的时间精度为 20 ，第 3 层的时间精度为 400。假如我们需要添加一个 350s 后执行的任务 A 的话（当前时间是 0s），这个任务会被放在第 2 层（因为第二层的时间跨度为 20*20=400>350）的第 350/20=17 个时间格子。

当第一层转了 17 圈之后，时间过去了 340s ，第 2 层的指针此时来到第 17 个时间格子。此时，第 2 层第 17 个格子的任务会被移动到第 1 层。

任务 A 当前是 10s 之后执行，因此它会被移动到第 1 层的第 10 个时间格子。

这里在层与层之间的移动也叫做**时间轮的升降级**。参考手表来理解就好！

**时间轮比较适合任务数量比较多的定时任务场景，它的任务写入和执行的时间复杂度都是 $O(1)$。**

## 分布式定时任务

### Redis

Redis 是可以用来做延时任务的，基于 Redis 实现延时任务的功能无非就下面两种方案：

1. Redis 过期事件监听
2. Redisson 内置的延时队列

这部分内容的详细介绍我放在了[《后端面试高频系统设计&场景题》](https://javaguide.cn/zhuanlan/back-end-interview-high-frequency-system-design-and-scenario-questions.html)中，有需要的同学可以进入星球后阅读学习。篇幅太多，这里就不重复分享了。

### MQ

大部分消息队列，例如 RocketMQ、RabbitMQ，都支持定时/延时消息。定时消息和延时消息本质其实是相同的，都是服务端根据消息设置的定时时间在某一固定时刻将消息投递给消费者消费。

不过，在使用 MQ 定时消息之前一定要看清楚其使用限制，以免不适合项目需求，例如 RocketMQ 定时时长最大值默认为 24 小时且不支持自定义修改、只支持 18 个 Level 的延时并不支持任意时间。

**优缺点总结：**

- **优点**：可以与 Spring 集成、支持分布式、支持集群、性能不错
- **缺点**：功能性较差、不灵活、需要保障消息可靠性

## 分布式任务调度框架

如果我们需要一些高级特性比如支持任务在分布式场景下的分片和高可用的话，我们就需要用到分布式任务调度框架了。

通常情况下，一个分布式定时任务的执行往往涉及到下面这些角色：

- **任务**：首先肯定是要执行的任务，这个任务就是具体的业务逻辑比如定时发送文章。
- **调度器**：其次是调度中心，调度中心主要负责任务管理，会分配任务给执行器。
- **执行器**：最后就是执行器，执行器接收调度器分派的任务并执行。

### Quartz

一个很火的开源任务调度框架，完全由 Java 写成。Quartz 可以说是 Java 定时任务领域的老大哥或者说参考标准，其他的任务调度框架基本都是基于 Quartz 开发的，比如当当网的`elastic-job`就是基于 Quartz 二次开发之后的分布式调度解决方案。

使用 Quartz 可以很方便地与 Spring 集成，并且支持动态添加任务和集群。但是，Quartz 使用起来也比较麻烦，API 繁琐。

并且，Quartz 并没有内置 UI 管理控制台，不过你可以使用 [quartzui](https://github.com/zhaopeiym/quartzui) 这个开源项目来解决这个问题。

另外，Quartz 虽然也支持分布式任务。但是，它是在数据库层面，通过数据库的锁机制做的，有非常多的弊端比如系统侵入性严重、节点负载不均衡。有点伪分布式的味道。

**优缺点总结：**

- 优点：可以与 Spring 集成，并且支持动态添加任务和集群。
- 缺点：分布式支持不友好，不支持任务可视化管理、使用麻烦（相比于其他同类型框架来说）

### Elastic-Job

ElasticJob 当当网开源的一个面向互联网生态和海量任务的分布式调度解决方案，由两个相互独立的子项目 ElasticJob-Lite 和 ElasticJob-Cloud 组成。

ElasticJob-Lite 和 ElasticJob-Cloud 两者的对比如下：

|          | ElasticJob-Lite | ElasticJob-Cloud  |
| :------- | :-------------- | ----------------- |
| 无中心化 | 是              | 否                |
| 资源分配 | 不支持          | 支持              |
| 作业模式 | 常驻            | 常驻 + 瞬时       |
| 部署依赖 | ZooKeeper       | ZooKeeper + Mesos |

`ElasticJob` 支持任务在分布式场景下的分片和高可用、任务可视化管理等功能。

![](H:\JAVA\JAVA MD笔记\images\elasticjob-feature-list.png)

ElasticJob-Lite 的架构设计如下图所示：

![](H:\JAVA\JAVA MD笔记\images\elasticjob-lite-architecture-design.png)

从上图可以看出，Elastic-Job 没有调度中心这一概念，而是使用 ZooKeeper 作为注册中心，注册中心负责协调分配任务到不同的节点上。

Elastic-Job 中的定时调度都是由执行器自行触发，这种设计也被称为**去中心化设计**（调度和处理都是执行器单独完成）。

```java
@Component
@ElasticJobConf(name = "dayJob", cron = "0/10 * * * * ?", shardingTotalCount = 2,
        shardingItemParameters = "0=AAAA,1=BBBB", description = "简单任务", failover = true)
public class TestJob implements SimpleJob {
    @Override
    public void execute(ShardingContext shardingContext) {
        log.info("TestJob任务名：【{}】, 片数：【{}】, param=【{}】", shardingContext.getJobName(), shardingContext.getShardingTotalCount(),
                shardingContext.getShardingParameter());
    }
}
```

**相关地址：**

- GitHub 地址：[https://github.com/apache/shardingsphere-elasticjob。](https://github.com/apache/shardingsphere-elasticjob。)
- 官方网站：[https://shardingsphere.apache.org/elasticjob/index_zh.html](https://shardingsphere.apache.org/elasticjob/index_zh.html) 。

**优缺点总结：**

- 优点：可以与 Spring 集成、支持分布式、支持集群、性能不错、支持任务可视化管理
- 缺点：依赖了额外的中间件比如 Zookeeper（复杂度增加，可靠性降低、维护成本变高）

### XXL-JOB

`XXL-JOB` 于 2015 年开源，是一款优秀的轻量级分布式任务调度框架，支持任务可视化管理、弹性扩容缩容、任务失败重试和告警、任务分片等功能，

![](H:\JAVA\JAVA MD笔记\images\xxljob-feature-list.png)

根据 `XXL-JOB` 官网介绍，其解决了很多 Quartz 的不足。

> Quartz 作为开源作业调度中的佼佼者，是作业调度的首选。但是集群环境中 Quartz 采用 API 的方式对任务进行管理，从而可以避免上述问题，但是同样存在以下问题：
>
> - 问题一：调用 API 的的方式操作任务，不人性化；
> - 问题二：需要持久化业务 QuartzJobBean 到底层数据表中，系统侵入性相当严重。
> - 问题三：调度逻辑和 QuartzJobBean 耦合在同一个项目中，这将导致一个问题，在调度任务数量逐渐增多，同时调度任务逻辑逐渐加重的情况下，此时调度系统的性能将大大受限于业务；
> - 问题四：quartz 底层以“抢占式”获取 DB 锁并由抢占成功节点负责运行任务，会导致节点负载悬殊非常大；而 XXL-JOB 通过执行器实现“协同分配式”运行任务，充分发挥集群优势，负载各节点均衡。
>
> XXL-JOB 弥补了 quartz 的上述不足之处。

`XXL-JOB` 的架构设计如下图所示：

![](H:\JAVA\JAVA MD笔记\images\xxljob-architecture-design-v2.1.0.png)

从上图可以看出，`XXL-JOB` 由 **调度中心** 和 **执行器** 两大部分组成。调度中心主要负责任务管理、执行器管理以及日志管理。执行器主要是接收调度信号并处理。另外，调度中心进行任务调度时，是通过自研 RPC 来实现的。

不同于 Elastic-Job 的去中心化设计， `XXL-JOB` 的这种设计也被称为**中心化设计**（调度中心调度多个执行器执行任务）。

和 `Quzrtz` 类似 `XXL-JOB` 也是基于数据库锁调度任务，存在性能瓶颈。不过，一般在任务量不是特别大的情况下，没有什么影响的，可以满足绝大部分公司的要求。

不要被 `XXL-JOB` 的架构图给吓着了，实际上，我们要用 `XXL-JOB` 的话，只需要重写 `IJobHandler` 自定义任务执行逻辑就可以了，非常易用！

```java
@JobHandler(value="myApiJobHandler")
@Component
public class MyApiJobHandler extends IJobHandler {

    @Override
    public ReturnT<String> execute(String param) throws Exception {
        //......
        return ReturnT.SUCCESS;
    }
}
```

还可以直接基于注解定义任务。

```java
@XxlJob("myAnnotationJobHandler")
public ReturnT<String> myAnnotationJobHandler(String param) throws Exception {
  //......
  return ReturnT.SUCCESS;
}
```

![](H:\JAVA\JAVA MD笔记\images\xxljob-admin-task-management.png)

**相关地址：**

- GitHub 地址：[https://github.com/xuxueli/xxl-job/。](https://github.com/xuxueli/xxl-job/。)
- 官方介绍：[https://www.xuxueli.com/xxl-job/](https://www.xuxueli.com/xxl-job/) 。

**优缺点总结：**

- 优点：开箱即用（学习成本比较低）、与 Spring 集成、支持分布式、支持集群、支持任务可视化管理。
- 缺点：不支持动态添加任务（如果一定想要动态创建任务也是支持的，参见：[xxl-job issue277](https://github.com/xuxueli/xxl-job/issues/277)）。

### PowerJob

非常值得关注的一个分布式任务调度框架，分布式任务调度领域的新星。目前，已经有很多公司接入比如 OPPO、京东、中通、思科。

这个框架的诞生也挺有意思的，PowerJob 的作者当时在阿里巴巴实习过，阿里巴巴那会使用的是内部自研的 SchedulerX（阿里云付费产品）。实习期满之后，PowerJob 的作者离开了阿里巴巴。想着说自研一个 SchedulerX，防止哪天 SchedulerX 满足不了需求，于是 PowerJob 就诞生了。

更多关于 PowerJob 的故事，小伙伴们可以去看看 PowerJob 作者的视频 [《我和我的任务调度中间件》](https://www.bilibili.com/video/BV1SK411A7F3/)。简单点概括就是：“游戏没啥意思了，我要扛起了新一代分布式任务调度与计算框架的大旗！”。

由于 SchedulerX 属于人民币产品，我这里就不过多介绍。PowerJob 官方也对比过其和 QuartZ、XXL-JOB 以及 SchedulerX。

|                | QuartZ                                      | xxl-job                                    | SchedulerX 2.0                                       | PowerJob                                                     |
| -------------- | ------------------------------------------- | ------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------ |
| 定时类型       | CRON                                        | CRON                                       | CRON、固定频率、固定延迟、OpenAPI                    | **CRON、固定频率、固定延迟、OpenAPI**                        |
| 任务类型       | 内置 Java                                   | 内置 Java、GLUE Java、Shell、Python 等脚本 | 内置 Java、外置 Java（FatJar）、Shell、Python 等脚本 | **内置 Java、外置 Java（容器）、Shell、Python 等脚本**       |
| 分布式计算     | 无                                          | 静态分片                                   | MapReduce 动态分片                                   | **MapReduce 动态分片**                                       |
| 在线任务治理   | 不支持                                      | 支持                                       | 支持                                                 | **支持**                                                     |
| 日志白屏化     | 不支持                                      | 支持                                       | 不支持                                               | **支持**                                                     |
| 调度方式及性能 | 基于数据库锁，有性能瓶颈                    | 基于数据库锁，有性能瓶颈                   | 不详                                                 | **无锁化设计，性能强劲无上限**                               |
| 报警监控       | 无                                          | 邮件                                       | 短信                                                 | **WebHook、邮件、钉钉与自定义扩展**                          |
| 系统依赖       | JDBC 支持的关系型数据库（MySQL、Oracle...） | MySQL                                      | 人民币                                               | **任意 Spring Data Jpa 支持的关系型数据库（MySQL、Oracle...）** |
| DAG 工作流     | 不支持                                      | 不支持                                     | 支持                                                 | **支持**                                                     |

## 定时任务方案总结  ✅

单机定时任务的常见解决方案有 `Timer`、`ScheduledExecutorService`、`DelayQueue`、`Spring Task` 和`时间轮`，其中最常用也是比较推荐使用的是**时间轮**。另外，这几种单机定时任务解决方案同样可以实现延时任务。

Redis 和 MQ 虽然可以实现分布式定时任务，但这两者本身不是专门用来做分布式定时任务的，它们并不提供较为完整和强大的分布式定时任务的功能。而且，两者不太适合执行周期性的定时任务，因为它们只能保证消息被消费一次，而不能保证消息被消费多次。因此，它们更适合执行一次性的延时任务，例如订单取消、红包撤回。实际项目中，MQ 延时任务用的更多一些，可以降低业务之间的耦合度。

Quartz、Elastic-Job、XXL-JOB 和 PowerJob 这几个是专门用来做分布式调度的框架，提供的分布式定时任务的功能更为完善和强大，更加适合执行周期性的定时任务。除了 Quartz 之外，另外三者都是支持任务可视化管理的。

XXL-JOB 2015 年推出，已经经过了很多年的考验。XXL-JOB 轻量级，并且使用起来非常简单。虽然存在性能瓶颈，但是，在绝大多数情况下，对于企业的基本需求来说是没有影响的。PowerJob 属于分布式任务调度领域里的新星，其稳定性还有待继续考察。ElasticJob 由于在架构设计上是基于 Zookeeper ，而 XXL-JOB 是基于数据库，性能方面的话，ElasticJob 略胜一筹。

这篇文章并没有介绍到实际使用，但是，并不代表实际使用不重要。我在写这篇文章之前，已经动手写过相应的 Demo。像 Quartz，我在大学那会就用过。不过，当时用的是 Spring 。为了能够更好地体验，我自己又在 Spring Boot 上实际体验了一下。如果你并没有实际使用某个框架，就直接说它并不好用的话，是站不住脚的。

# Web 实时消息推送详解

我有一个朋友做了一个小破站，现在要实现一个站内信 Web 消息推送的功能，对，就是下图这个小红点，一个很常用的功能。

![](H:\JAVA\JAVA MD笔记\images\1460000042192380.png)

不过他还没想好用什么方式做，这里我帮他整理了一下几种方案，并简单做了实现。

## 什么是消息推送？

推送的场景比较多，比如有人关注我的公众号，这时我就会收到一条推送消息，以此来吸引我点击打开应用。

消息推送通常是指网站的运营工作等人员，通过某种工具对用户当前网页或移动设备 APP 进行的主动消息推送。

消息推送一般又分为 Web 端消息推送和移动端消息推送。

移动端消息推送示例：

![](H:\JAVA\JAVA MD笔记\images\IKleJ9auR1Ojdicyr0bH.png)

Web 端消息推送示例：

![](H:\JAVA\JAVA MD笔记\images\image-20220819100512941.png)

在具体实现之前，咱们再来分析一下前边的需求，其实功能很简单，只要触发某个事件（主动分享了资源或者后台主动推送消息），Web 页面的通知小红点就会实时的 `+1` 就可以了。

通常在服务端会有若干张消息推送表，用来记录用户触发不同事件所推送不同类型的消息，前端主动查询（拉）或者被动接收（推）用户所有未读的消息数。

![](H:\JAVA\JAVA MD笔记\images\1460000042192384.png)

消息推送无非是推（push）和拉（pull）两种形式，下边我们逐个了解下。

## 消息推送常见方案

### 短轮询

**轮询(polling)** 应该是实现消息推送方案中最简单的一种，这里我们暂且将轮询分为短轮询和长轮询。

短轮询很好理解，指定的时间间隔，由浏览器向服务器发出 HTTP 请求，服务器实时返回未读消息数据给客户端，浏览器再做渲染显示。

一个简单的 JS 定时器就可以搞定，每秒钟请求一次未读消息数接口，返回的数据展示即可。

```typescript
setInterval(() => {
  // 方法请求
  messageCount().then((res) => {
    if (res.code === 200) {
      this.messageCount = res.data;
    }
  });
}, 1000);
```

效果还是可以的，短轮询实现固然简单，缺点也是显而易见，由于推送数据并不会频繁变更，无论后端此时是否有新的消息产生，客户端都会进行请求，势必会对服务端造成很大压力，浪费带宽和服务器资源。

### 长轮询

长轮询是对上边短轮询的一种改进版本，在尽可能减少对服务器资源浪费的同时，保证消息的相对实时性。长轮询在中间件中应用的很广泛，比如 Nacos 和 Apollo 配置中心，消息队列 Kafka、RocketMQ 中都有用到长轮询。

[Nacos 配置中心交互模型是 push 还是 pull？](https://mp.weixin.qq.com/s/94ftESkDoZI9gAGflLiGwg)一文中我详细介绍过 Nacos 长轮询的实现原理，感兴趣的小伙伴可以瞅瞅。

长轮询其实原理跟轮询差不多，都是采用轮询的方式。不过，如果服务端的数据没有发生变更，会 一直 hold 住请求，直到服务端的数据发生变化，或者等待一定时间超时才会返回。返回后，客户端又会立即再次发起下一次长轮询。

这次我使用 Apollo 配置中心实现长轮询的方式，应用了一个类`DeferredResult`，它是在 Servlet3.0 后经过 Spring 封装提供的一种异步请求机制，直意就是延迟结果。

![](H:\JAVA\JAVA MD笔记\images\1460000042192386.png)

`DeferredResult`可以允许容器线程快速释放占用的资源，不阻塞请求线程，以此接受更多的请求提升系统的吞吐量，然后启动异步工作线程处理真正的业务逻辑，处理完成调用`DeferredResult.setResult(200)`提交响应结果。

下边我们用长轮询来实现消息推送。

因为一个 ID 可能会被多个长轮询请求监听，所以我采用了 Guava 包提供的`Multimap`结构存放长轮询，一个 key 可以对应多个 value。一旦监听到 key 发生变化，对应的所有长轮询都会响应。前端得到非请求超时的状态码，知晓数据变更，主动查询未读消息数接口，更新页面数据。

```java
@Controller
@RequestMapping("/polling")
public class PollingController {

    // 存放监听某个Id的长轮询集合
    // 线程同步结构
    public static Multimap<String, DeferredResult<String>> watchRequests = Multimaps.synchronizedMultimap(HashMultimap.create());

    /**
     * 设置监听
     */
    @GetMapping(path = "watch/{id}")
    @ResponseBody
    public DeferredResult<String> watch(@PathVariable String id) {
        // 延迟对象设置超时时间
        DeferredResult<String> deferredResult = new DeferredResult<>(TIME_OUT);
        // 异步请求完成时移除 key，防止内存溢出
        deferredResult.onCompletion(() -> {
            watchRequests.remove(id, deferredResult);
        });
        // 注册长轮询请求
        watchRequests.put(id, deferredResult);
        return deferredResult;
    }

    /**
     * 变更数据
     */
    @GetMapping(path = "publish/{id}")
    @ResponseBody
    public String publish(@PathVariable String id) {
        // 数据变更 取出监听ID的所有长轮询请求，并一一响应处理
        if (watchRequests.containsKey(id)) {
            Collection<DeferredResult<String>> deferredResults = watchRequests.get(id);
            for (DeferredResult<String> deferredResult : deferredResults) {
                deferredResult.setResult("我更新了" + new Date());
            }
        }
        return "success";
    }
```

当请求超过设置的超时时间，会抛出`AsyncRequestTimeoutException`异常，这里直接用`@ControllerAdvice`全局捕获统一返回即可，前端获取约定好的状态码后再次发起长轮询请求，如此往复调用。

```kotlin
@ControllerAdvice
public class AsyncRequestTimeoutHandler {

    @ResponseStatus(HttpStatus.NOT_MODIFIED)
    @ResponseBody
    @ExceptionHandler(AsyncRequestTimeoutException.class)
    public String asyncRequestTimeoutHandler(AsyncRequestTimeoutException e) {
        System.out.println("异步请求超时");
        return "304";
    }
}
```

我们来测试一下，首先页面发起长轮询请求`/polling/watch/10086`监听消息更变，请求被挂起，不变更数据直至超时，再次发起了长轮询请求；紧接着手动变更数据`/polling/publish/10086`，长轮询得到响应，前端处理业务逻辑完成后再次发起请求，如此循环往复。

长轮询相比于短轮询在性能上提升了很多，但依然会产生较多的请求，这是它的一点不完美的地方。

### iframe 流 (强烈不推荐)

iframe 流就是在页面中插入一个隐藏的`<iframe>`标签，通过在`src`中请求消息数量 API 接口，由此在服务端和客户端之间创建一条长连接，服务端持续向`iframe`传输数据。

传输的数据通常是 HTML、或是内嵌的 JavaScript 脚本，来达到实时更新页面的效果。

![](H:\JAVA\JAVA MD笔记\images\1460000042192388.png)

这种方式实现简单，前端只要一个`<iframe>`标签搞定了

```html
<iframe src="/iframe/message" style="display:none"></iframe>
```

服务端直接组装 HTML、JS 脚本数据向 response 写入就行了

```java
@Controller
@RequestMapping("/iframe")
public class IframeController {
    @GetMapping(path = "message")
    public void message(HttpServletResponse response) throws IOException, InterruptedException {
        while (true) {
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            response.setHeader("Cache-Control", "no-cache,no-store");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(" <script type=\"text/javascript\">\n" +
                    "parent.document.getElementById('clock').innerHTML = \"" + count.get() + "\";" +
                    "parent.document.getElementById('count').innerHTML = \"" + count.get() + "\";" +
                    "</script>");
        }
    }
}
```

iframe 流的服务器开销很大，而且 IE、Chrome 等浏览器一直会处于 loading 状态，图标会不停旋转，简直是强迫症杀手。

![](H:\JAVA\JAVA MD笔记\images\1460000042192389.png)

iframe 流非常不友好，强烈不推荐。

### SSE (推荐)  ✅

很多人可能不知道，服务端向客户端推送消息，其实除了可以用`WebSocket`这种耳熟能详的机制外，还有一种**服务器发送事件(Server-Sent Events)**，简称 **SSE**。这是一种服务器端到客户端(浏览器)的**单向消息推送**。

大名鼎鼎的 **ChatGPT 就是采用的 SSE**。对于需要长时间等待响应的对话场景，ChatGPT 采用了一种巧妙的策略：它会将已经计算出的数据“推送”给用户，并利用 SSE 技术在计算过程中持续返回数据。这样做的好处是可以避免用户因等待时间过长而选择关闭页面。

![](H:\JAVA\JAVA MD笔记\images\chatgpt-sse.png)

SSE **基于 HTTP 协议**的，我们知道一般意义上的 HTTP 协议是无法做到服务端主动向客户端推送消息的，但 SSE 是个例外，它变换了一种思路。

![](H:\JAVA\JAVA MD笔记\images\1460000042192390.png)

SSE 在服务器和客户端之间打开一个**单向通道**，服务端响应的不再是一次性的数据包而是**`text/event-stream`类型的数据流信息**，在有数据变更时从服务器流式传输到客户端。

整体的实现思路有点**类似于在线视频播放**，视频流会连续不断的推送到浏览器，你也可以理解成，客户端在完成一次用时很长（网络不畅）的下载。

![](H:\JAVA\JAVA MD笔记\images\1460000042192391.png)

SSE 与 WebSocket 作用相似，都可以建立服务端与浏览器之间的通信，实现服务端向客户端推送消息，但还是有些许不同：

- SSE 是基于 HTTP 协议的，它们不需要特殊的协议或服务器实现即可工作；WebSocket 需单独服务器来处理协议。
- SSE 单向通信，只能由服务端向客户端单向通信；WebSocket 全双工通信，即通信的双方可以同时发送和接受信息。
- SSE 实现简单开发成本低，无需引入其他组件；WebSocket 传输数据需做二次解析，开发门槛高一些。
- SSE 默认支持断线重连；WebSocket 则需要自己实现。
- SSE 只能传送文本消息，二进制数据需要经过编码后传送；WebSocket 默认支持传送二进制数据。

**SSE 与 WebSocket 该如何选择？**

> 技术并没有好坏之分，只有哪个更合适

SSE 好像一直不被大家所熟知，一部分原因是出现了 WebSocket，这个提供了更丰富的协议来执行双向、全双工通信。对于游戏、即时通信以及需要双向近乎实时更新的场景，拥有双向通道更具吸引力。

但是，在某些情况下，不需要从客户端发送数据。而你只需要一些服务器操作的更新。比如：站内信、未读消息数、状态更新、股票行情、监控数量等场景，SEE 不管是从实现的难易和成本上都更加有优势。此外，SSE 具有 WebSocket 在设计上缺乏的多种功能，例如：自动重新连接、事件 ID 和发送任意事件的能力。

前端只需进行一次 HTTP 请求，带上唯一 ID，打开事件流，监听服务端推送的事件就可以了

```js
<script>
    let source = null;
    let userId = 7777
    if (window.EventSource) {
        // 建立连接
        source = new EventSource('http://localhost:7777/sse/sub/'+userId);
        setMessageInnerHTML("连接用户=" + userId);
        /**
         * 连接一旦建立，就会触发open事件
         * 另一种写法：source.onopen = function (event) {}
         */
        source.addEventListener('open', function (e) {
            setMessageInnerHTML("建立连接。。。");
        }, false);
        /**
         * 客户端收到服务器发来的数据
         * 另一种写法：source.onmessage = function (event) {}
         */
        source.addEventListener('message', function (e) {
            setMessageInnerHTML(e.data);
        });
    } else {
        setMessageInnerHTML("你的浏览器不支持SSE");
    }
</script>
```

服务端的实现更简单，创建一个`SseEmitter`对象放入`sseEmitterMap`进行管理

```java
private static Map<String, SseEmitter> sseEmitterMap = new ConcurrentHashMap<>();

/**
 * 创建连接
 */
public static SseEmitter connect(String userId) {
    try {
        // 设置超时时间，0表示不过期。默认30秒
        SseEmitter sseEmitter = new SseEmitter(0L);
        // 注册回调
        sseEmitter.onCompletion(completionCallBack(userId));
        sseEmitter.onError(errorCallBack(userId));
        sseEmitter.onTimeout(timeoutCallBack(userId));
        sseEmitterMap.put(userId, sseEmitter);
        count.getAndIncrement();
        return sseEmitter;
    } catch (Exception e) {
        log.info("创建新的sse连接异常，当前用户：{}", userId);
    }
    return null;
}

/**
 * 给指定用户发送消息
 */
public static void sendMessage(String userId, String message) {

    if (sseEmitterMap.containsKey(userId)) {
        try {
            sseEmitterMap.get(userId).send(message);
        } catch (IOException e) {
            log.error("用户[{}]推送异常:{}", userId, e.getMessage());
            removeUser(userId);
        }
    }
}
```

**注意：** SSE 不支持 IE 浏览器，对其他主流浏览器兼容性做的还不错。

![](H:\JAVA\JAVA MD笔记\images\1460000042192393.png)

### Websocket  (mallchat  ✅)

Websocket 应该是大家都比较熟悉的一种实现消息推送的方式，上边我们在讲 SSE 的时候也和 Websocket 进行过比较。

是一种在 **TCP** 连接上进行**全双工通信**的协议，建立客户端和服务器之间的通信渠道。浏览器和服务器仅需一次握手，两者之间就直接可以创建持久性的连接，并进行**双向**数据传输。

![](H:\JAVA\JAVA MD笔记\images\1460000042192394 (3).png)

WebSocket 的工作过程可以分为以下几个步骤：

1. 客户端向服务器发送一个 **HTTP 请求**，**请求头**中包含 `Upgrade: websocket` 和 `Sec-WebSocket-Key` 等字段，表示要求**升级协议**为 WebSocket；
2. 服务器收到这个请求后，会进行升级协议的操作，如果支持 WebSocket，它将回复一个 **HTTP 101 状态码**，响应头中包含 ，`Connection: Upgrade`和 `Sec-WebSocket-Accept: xxx` 等字段、表示成功升级到 WebSocket 协议。
3. 客户端和服务器之间建立了一个 **WebSocket 连接**，可以进行**双向**的数据传输。数据以**帧**（frames）的形式进行传送，而不是传统的 HTTP 请求和响应。WebSocket 的每条消息可能会被切分成多个数据帧（最小单位）。发送端会将消息切割成多个帧发送给接收端，接收端接收消息帧，并将关联的帧重新组装成完整的消息。
4. 客户端或服务器可以主动发送一个**关闭帧**，表示要断开连接。另一方收到后，也会回复一个关闭帧，然后双方关闭 TCP 连接。

另外，建立 WebSocket 连接之后，通过**心跳机制**来保持 WebSocket 连接的稳定性和活跃性。

SpringBoot 整合 Websocket，先引入 Websocket 相关的工具包，和 SSE 相比额外的开发成本。

```xml
<!-- 引入websocket -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

服务端使用`@ServerEndpoint`注解标注当前类为一个 WebSocket 服务器，客户端可以通过`ws://localhost:7777/webSocket/10086`来连接到 WebSocket 服务器端。

```java
@Component
@Slf4j
@ServerEndpoint("/websocket/{userId}")
public class WebSocketServer {
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;
    private static final CopyOnWriteArraySet<WebSocketServer> webSockets = new CopyOnWriteArraySet<>();
    // 用来存在线连接数
    private static final Map<String, Session> sessionPool = new HashMap<String, Session>();
    /**
     * 链接成功调用的方法
     */
    @OnOpen
    public void onOpen(Session session, @PathParam(value = "userId") String userId) {
        try {
            this.session = session;
            webSockets.add(this);
            sessionPool.put(userId, session);
            log.info("websocket消息: 有新的连接，总数为:" + webSockets.size());
        } catch (Exception e) {
        }
    }
    /**
     * 收到客户端消息后调用的方法
     */
    @OnMessage
    public void onMessage(String message) {
        log.info("websocket消息: 收到客户端消息:" + message);
    }
    /**
     * 此为单点消息
     */
    public void sendOneMessage(String userId, String message) {
        Session session = sessionPool.get(userId);
        if (session != null && session.isOpen()) {
            try {
                log.info("websocket消: 单点消息:" + message);
                session.getAsyncRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

前端初始化打开 WebSocket 连接，并监听连接状态，接收服务端数据或向服务端发送数据。

```js
<script>
    var ws = new WebSocket('ws://localhost:7777/webSocket/10086');
    // 获取连接状态
    console.log('ws连接状态：' + ws.readyState);
    //监听是否连接成功
    ws.onopen = function () {
        console.log('ws连接状态：' + ws.readyState);
        //连接成功则发送一个数据
        ws.send('test1');
    }
    // 接听服务器发回的信息并处理展示
    ws.onmessage = function (data) {
        console.log('接收到来自服务器的消息：');
        console.log(data);
        //完成通信后关闭WebSocket连接
        ws.close();
    }
    // 监听连接关闭事件
    ws.onclose = function () {
        // 监听整个过程中websocket的状态
        console.log('ws连接状态：' + ws.readyState);
    }
    // 监听并处理error事件
    ws.onerror = function (error) {
        console.log(error);
    }
    function sendMessage() {
        var content = $("#message").val();
        $.ajax({
            url: '/socket/publish?userId=10086&message=' + content,
            type: 'GET',
            data: { "id": "7777", "content": content },
            success: function (data) {
                console.log(data)
            }
        })
    }
</script>

```

页面初始化建立 WebSocket 连接，之后就可以进行双向通信了，效果还不错。

![img](https://oss.javaguide.cn/github/javaguide/system-design/web-real-time-message-push/1460000042192395.png)

### MQTT

**什么是 MQTT 协议？**

MQTT (Message Queue Telemetry Transport)是一种基于**发布/订阅（publish/subscribe）模式**的轻量级通讯协议，通过订阅相应的主题来获取消息，是物联网（Internet of Thing）中的一个标准传输协议。

该协议将消息的发布者（publisher）与订阅者（subscriber）进行分离，因此可以在不可靠的网络环境中，为远程连接的设备提供可靠的消息服务，使用方式与传统的 MQ 有点类似。

![MQTT 协议示例](https://oss.javaguide.cn/github/javaguide/system-design/web-real-time-message-push/1460000022986325.png)

TCP 协议位于传输层，**MQTT 协议位于应用层**，MQTT 协议构建于 TCP/IP 协议上，也就是说只要支持 TCP/IP 协议栈的地方，都可以使用 MQTT 协议。

**为什么要用 MQTT 协议？**

MQTT 协议为什么在物联网（IOT）中如此受偏爱？而不是其它协议，比如我们更为熟悉的 HTTP 协议呢？

- 首先 HTTP 协议它是一种同步协议，客户端请求后需要等待服务器的响应。而在物联网（IOT）环境中，设备会很受制于环境的影响，比如带宽低、网络延迟高、网络通信不稳定等，显然异步消息协议更为适合 IOT 应用程序。
- HTTP 是单向的，如果要获取消息客户端必须发起连接，而在物联网（IOT）应用程序中，设备或传感器往往都是客户端，这意味着它们无法被动地接收来自网络的命令。
- 通常需要将一条命令或者消息，发送到网络上的所有设备上。HTTP 要实现这样的功能不但很困难，而且成本极高。

具体的 MQTT 协议介绍和实践，这里我就不再赘述了，大家可以参考我之前的两篇文章，里边写的也都很详细了。

- MQTT 协议的介绍：[我也没想到 SpringBoot + RabbitMQ 做智能家居，会这么简单](https://mp.weixin.qq.com/s/udFE6k9pPetIWsa6KeErrA)
- MQTT 实现消息推送：[未读消息（小红点），前端 与 RabbitMQ 实时消息推送实践，贼简单~](https://mp.weixin.qq.com/s/U-fUGr9i1MVa4PoVyiDFCg)

## 总结 ✅

> 以下内容为 JavaGuide 补充

|           | 介绍                                                         | 优点                   | 缺点                                                 |
| --------- | ------------------------------------------------------------ | ---------------------- | ---------------------------------------------------- |
| 短轮询    | 客户端定时向服务端发送请求，服务端直接返回响应数据（即使没有数据更新） | 简单、易理解、易实现   | 实时性太差，无效请求太多，频繁建立连接太耗费资源     |
| 长轮询    | 与短轮询不同是，长轮询接收到客户端请求之后等到有数据更新才返回请求 | 减少了无效请求         | 挂起请求会导致资源浪费                               |
| iframe 流 | 服务端和客户端之间创建一条长连接，服务端持续向`iframe`传输数据。 | 简单、易理解、易实现   | 维护一个长连接会增加开销，效果太差（图标会不停旋转） |
| SSE       | 一种服务器端到客户端(浏览器)的`单向`消息推送。               | 简单、易实现，功能丰富 | 不支持双向通信                                       |
| WebSocket | 除了最初建立连接时用 HTTP 协议，其他时候都是直接基于 TCP 协议进行通信的，可以实现客户端和服务端的全双工通信。 | 性能高、开销小         | 对开发人员要求更高，实现相对复杂一些                 |
| MQTT      | 基于发布/订阅（publish/subscribe）模式的轻量级通讯协议，通过订阅相应的主题来获取消息。 | 成熟稳定，轻量级       | 对开发人员要求更高，实现相对复杂一些                 |