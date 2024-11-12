# 数据库基础知识总结

数据库知识基础，这部分内容一定要理解记忆。虽然这部分内容只是理论知识，但是非常重要，这是后面学习 MySQL 数据库的基础。PS: 这部分内容由于涉及太多概念性内容，所以参考了维基百科和百度百科相应的介绍。

## 什么是数据库, 数据库管理系统, 数据库系统, 数据库管理员?

- **数据库** : 数据库(DataBase 简称 DB)就是信息的集合或者说数据库是由数据库管理系统管理的数据的集合。
- **数据库管理系统** : 数据库管理系统(Database Management System 简称 DBMS)是一种操纵和管理数据库的大型软件，通常用于建立、使用和维护数据库。
- **数据库系统** : 数据库系统(Data Base System，简称 DBS)通常由软件、数据库和数据管理员(DBA)组成。
- **数据库管理员** : 数据库管理员(Database Administrator, 简称 DBA)负责全面管理和控制数据库系统。

## 什么是元组, 码, 候选码, 主码, 外码, 主属性, 非主属性？

- **元组**：元组（tuple）是关系数据库中的基本概念，关系是一张表，表中的每行（即数据库中的每条记录）就是一个元组，每列就是一个属性。 在二维表里，元组也称为行。
- **码**：码就是能**唯一标识实体的属性**，对应表中的列。
- **候选码**：若关系中的某一属性或属性组的值能唯一的标识一个元组，而其任何、子集都不能再标识，则称该属性组为候选码。例如：在学生实体中，“学号”是能唯一的区分学生实体的，同时又假设“姓名”、“班级”的属性组合足以区分学生实体，那么{学号}和{姓名，班级}都是候选码。
- **主码** : 主码也叫**主键**。主码是从候选码中选出来的。 一个实体集中**只能有一个主码**，但可以有多个候选码。
- **外码** : 外码也叫**外键**。如果一个关系中的一个属性是另外一个关系中的主码则这个属性为外码。
- **主属性**：候选码中出现过的属性称为主属性。比如关系 工人（工号，身份证号，姓名，性别，部门），显然工号和身份证号都能够唯一标示这个关系，所以都是候选码。工号、身份证号这两个属性就是主属性。如果主码是一个属性组，那么属性组中的属性都是主属性。
- **非主属性：** 不包含在任何一个候选码中的属性称为非主属性。比如在关系——学生（学号，姓名，年龄，性别，班级）中，主码是“学号”，那么其他的“姓名”、“年龄”、“性别”、“班级”就都可以称为非主属性。

## 什么是 ER 图？

我们做一个项目的时候一定要试着画 ER 图来捋清数据库设计，这个也是面试官问你项目的时候经常会被问到的。

**ER 图** 全称是 Entity Relationship Diagram（**实体联系图**），提供了表示实体类型、属性和联系的方法。

ER 图由下面 3 个要素组成：

- **实体**：通常是现实世界的业务对象，当然使用一些逻辑对象也可以。比如对于一个校园管理系统，会涉及学生、教师、课程、班级等等实体。在 ER 图中，实体使用**矩形框**表示。
- **属性**：即某个实体拥有的属性，属性用来描述组成实体的要素，对于产品设计来说可以理解为字段。在 ER 图中，属性使用**椭圆形**表示。
- **联系**：即实体与实体之间的关系，在 ER 图中用**菱形**表示，这个关系不仅有业务关联关系，还能通过数字表示实体之间的数量对照关系。例如，一个班级会有多个学生就是一种实体间的联系。

下图是一个学生选课的 ER 图，每个学生可以选若干门课程，同一门课程也可以被若干人选择，所以它们之间的关系是多对多（M: N）。另外，还有其他两种实体之间的关系是：1 对 1（1:1）、1 对多（1: N）。

<img src="images\c745c87f6eda9a439e0eea52012c7f4a.png" style="zoom: 80%;" />

## 数据库范式了解吗?

数据库范式有 3 种：

- **1NF(第一范式)**：属性不可再分。
- **2NF(第二范式)**：1NF 的基础之上，消除了非主属性对于码的部分函数依赖。
- **3NF(第三范式)**：3NF 在 2NF 的基础之上，消除了非主属性对于码的传递函数依赖 。

### 1NF(第一范式)

属性（对应于表中的字段）不能再被分割，也就是这个字段只能是一个值，不能再分为多个其他的字段了。**1NF 是所有关系型数据库的最基本要求** ，也就是说关系型数据库中创建的表一定满足第一范式。

### 2NF(第二范式)

2NF 在 1NF 的基础之上，**消除了非主属性对于码的部分函数依赖**。如下图所示，展示了第一范式到第二范式的过渡。第二范式在第一范式的基础上增加了一个列，这个列称为主键，非主属性都依赖于主键。（这里的主键应该就是 商品ID和供应商ID）

![](images\bd1d31be3779342427fc9e462bf7f05c.png)

一些重要的概念：

- **函数依赖（functional dependency）**：若在一张表中，在属性（或属性组）X 的值确定的情况下，必定能确定属性 Y 的值，那么就可以说 Y 函数依赖于 X，写作 X → Y。
- **部分函数依赖（partial functional dependency）**：如果 X→Y，并且存在 X 的一个真子集 X0，使得 X0→Y，则称 Y 对 X 部分函数依赖。比如学生基本信息表 R 中（学号，身份证号，姓名）当然学号属性取值是唯一的，在 R 关系中，（学号，身份证号）->（姓名），（学号）->（姓名），（身份证号）->（姓名）；所以姓名部分函数依赖于（学号，身份证号）；

- **完全函数依赖(Full functional dependency)**：在一个关系中，若某个非主属性数据项依赖于全部关键字称之为完全函数依赖。比如学生基本信息表 R（学号，班级，姓名）假设不同的班级学号有相同的，班级内学号不能相同，在 R 关系中，（学号，班级）->（姓名），但是（学号）->(姓名)不成立，（班级）->(姓名)不成立，所以姓名完全函数依赖与（学号，班级）；

- **传递函数依赖**：在关系模式 R(U)中，设 X，Y，Z 是 U 的不同的属性子集，如果 X 确定 Y、Y 确定 Z，且有 X 不包含 Y，Y 不确定 X，（X∪Y）∩Z=空集合，则称 Z 传递函数依赖(transitive functional dependency) 于 X。传递函数依赖会导致数据冗余和异常。传递函数依赖的 Y 和 Z 子集往往同属于某一个事物，因此可将其合并放到一个表中。比如在关系 R(学号 , 姓名, 系名，系主任)中，学号 → 系名，系名 → 系主任，所以存在非主属性系主任对于学号的传递函数依赖。

### 3NF(第三范式)

3NF 在 2NF 的基础之上，**消除了非主属性对于码的传递函数依赖** 。符合 3NF 要求的数据库设计，**基本**上解决了数据冗余过大，插入异常，修改异常，删除异常的问题。比如在关系 R(学号 , 姓名, 系名，系主任)中，学号 → 系名，系名 → 系主任，所以存在非主属性系主任对于学号的传递函数依赖，所以该表的设计，不符合 3NF 的要求。

## 主键和外键有什么区别?

- **主键(主码)**：主键用于唯一标识一个元组，不能有重复，不允许为空。一个表只能有一个主键。
- **外键(外码)**：外键用来和其他表建立联系用，外键是另一表的主键，外键是可以有重复的，可以是空值。一个表可以有多个外键。

## 为什么不推荐使用外键与级联？

对于外键和级联，阿里巴巴开发手册这样说到：

> 【强制】不得使用外键与级联，一切外键概念必须在应用层解决。
>
> 说明: 以学生和成绩的关系为例，学生表中的 student_id 是主键，那么成绩表中的 student_id 则为外键。如果更新学生表中的 student_id，同时触发成绩表中的 student_id 更新，即为级联更新。外键与级联更新适用于单机低并发，不适合分布式、高并发集群；级联更新是强阻塞，存在数据库更新风暴的风险；外键影响数据库的插入速度

为什么不要用外键呢？大部分人可能会这样回答：

1. **增加了复杂性：** a. 每次做 DELETE 或者 UPDATE 都必须考虑外键约束，会导致开发的时候很痛苦, 测试数据极为不方便; b. 外键的主从关系是定的，假如那天需求有变化，数据库中的这个字段根本不需要和其他表有关联的话就会增加很多麻烦。
2. **增加了额外工作**：数据库需要增加维护外键的工作，比如当我们做一些涉及外键字段的增，删，更新操作之后，需要触发相关操作去检查，保证数据的的一致性和正确性，这样会不得不消耗资源；（个人觉得这个不是不用外键的原因，因为即使你不使用外键，你在应用层面也还是要保证的。所以，我觉得这个影响可以忽略不计。）
3. **对分库分表不友好**：因为分库分表下外键是无法生效的。
4. ……

我个人觉得上面这种回答不是特别的全面，只是说了外键存在的一个常见的问题。实际上，我们知道外键也是有很多好处的，比如：

1. 保证了数据库数据的一致性和完整性；
2. 级联操作方便，减轻了程序代码量；
3. ……

所以说，不要一股脑的就抛弃了外键这个概念，既然它存在就有它存在的道理，如果系统不涉及分库分表，并发量不是很高的情况还是可以考虑使用外键的。

## 什么是存储过程?

我们可以把存储过程看成是**一些 SQL 语句的集合，中间加了点逻辑控制语句**。存储过程在业务比较复杂的时候是非常实用的，比如很多时候我们完成一个操作可能需要写一大串 SQL 语句，这时候我们就可以写有一个存储过程，这样也方便了我们下一次的调用。存储过程一旦调试完成通过后就能稳定运行，另外，使用存储过程比单纯 SQL 语句执行要快，因为存储过程是**预编译**过的。

存储过程在互联网公司应用不多，因为存储过程难以调试和扩展，而且没有移植性，还会消耗数据库资源。

阿里巴巴 Java 开发手册里要求**禁止使用存储过程**。

![](images\0fa082bc4d4f919065767476a41b2156.png)

## drop、delete 与 truncate 区别？

### 用法不同

- `drop`(丢弃数据): `drop table 表名` ，直接将表都删除掉，在删除表的时候使用。
- `truncate` (清空数据) : `truncate table 表名` ，只删除表中的数据，再插入数据的时候自增长 id 又从 1 开始，在清空表中数据的时候使用。
- `delete`（删除数据） : `delete from 表名 where 列名=值`，删除某一行的数据，如果不加 `where` 子句和`truncate table 表名`作用类似。

`truncate` 和不带 `where`子句的 `delete`、以及 `drop` 都会删除表内的数据，但是 **`truncate` 和 `delete` 只删除数据不删除表的结构(定义)，执行 `drop` 语句，此表的结构也会删除，也就是执行`drop` 之后对应的表不复存在。**

### 属于不同的数据库语言

`truncate` 和 `drop` 属于 DDL(数据定义语言)语句，操作立即生效，原数据不放到 rollback segment 中，不能回滚，操作不触发 trigger。而 `delete` 语句是 DML (数据库操作语言)语句，这个操作会放到 rollback segment 中，事务提交之后才生效。

**DML 语句和 DDL 语句区别：**

- DML 是数据库操作语言（Data Manipulation Language）的缩写，是指对数据库中表记录的操作，主要包括表记录的插入、更新、删除和查询，是开发人员日常使用最频繁的操作。
- DDL （Data Definition Language）是数据定义语言的缩写，简单来说，就是对数据库内部的对象进行创建、删除、修改的操作语言。它和 DML 语言的最大区别是 DML 只是对表内部数据的操作，而不涉及到表的定义、结构的修改，更不会涉及到其他对象。DDL 语句更多的被数据库管理员（DBA）所使用，一般的开发人员很少使用。

另外，由于`select`不会对表进行破坏，所以有的地方也会把`select`单独区分开叫做数据库查询语言 DQL（Data Query Language）。

### 执行速度不同

一般来说：`drop` > `truncate` > `delete`（这个我没有实际测试过）。

- `delete`命令执行的时候会产生数据库的`binlog`日志，而日志记录是需要消耗时间的，但是也有个好处方便数据回滚恢复。
- `truncate`命令执行的时候不会产生数据库日志，因此比`delete`要快。除此之外，还会把表的自增值重置和索引恢复到初始大小等。
- `drop`命令会把表占用的空间全部释放掉。

Tips：你应该更多地关注在使用场景上，而不是执行效率。

## 数据库设计通常分为哪几步?

1. **需求分析** : 分析用户的需求，包括数据、功能和性能需求。
2. **概念结构设计** : 主要采用 E-R 模型进行设计，包括画 E-R 图。
3. **逻辑结构设计** : 通过将 E-R 图转换成表，实现从 E-R 模型到关系模型的转换。
4. **物理结构设计** : 主要是为所设计的数据库选择合适的存储结构和存取路径。
5. **数据库实施** : 包括编程、测试和试运行
6. **数据库的运行和维护** : 系统的运行与数据库的日常维护。

## 参考

- [https://blog.csdn.net/rl529014/article/details/48391465](https://blog.csdn.net/rl529014/article/details/48391465)
- [https://www.zhihu.com/question/24696366/answer/29189700](https://www.zhihu.com/question/24696366/answer/29189700)
- [https://blog.csdn.net/bieleyang/article/details/77149954](https://blog.csdn.net/bieleyang/article/details/77149954)

# NoSQL基础知识总结

## NoSQL 是什么？

NoSQL（Not Only SQL 的缩写）泛指**非关系型的数据库**，主要针对的是键值、文档以及图形类型数据存储。并且，NoSQL 数据库天生支持分布式，数据冗余和数据分片等特性，旨在提供可扩展的高可用高性能数据存储解决方案。

一个常见的误解是 NoSQL 数据库或非关系型数据库不能很好地存储关系型数据。**NoSQL 数据库可以存储关系型数据**—它们与关系型数据库的存储方式不同。

NoSQL 数据库代表：HBase、Cassandra、MongoDB、**Redis**。

![](images\sql-nosql-tushi.png)

## SQL 和 NoSQL 有什么区别？

|              | SQL 数据库                                                   | NoSQL 数据库                                                 |
| :----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 数据存储模型 | 结构化存储，具有固定行和列的表格                             | 非结构化存储。文档：JSON 文档，键值：键值对，宽列：包含行和动态列的表，图：节点和边 |
| 发展历程     | 开发于 1970 年代，重点是减少数据重复                         | 开发于 2000 年代后期，重点是提升可扩展性，减少大规模数据的存储成本 |
| 例子         | Oracle、**MySQL**、Microsoft SQL Server、PostgreSQL          | 文档：**MongoDB**、CouchDB，键值：**Redis**、DynamoDB，宽列：Cassandra、 HBase，图表：Neo4j、 Amazon Neptune、Giraph |
| ACID 属性    | 提供<u>原子性、一致性、隔离性和持久性</u> (**ACID**) 属性    | 通常**不支持 ACID 事务**，为了可扩展、高性能进行了权衡，少部分支持比如 MongoDB 。不过，MongoDB 对 ACID 事务 的支持和 MySQL 还是有所区别的。 |
| 性能         | 性能通常取决于**磁盘**子系统。要获得最佳性能，通常需要优化查询、索引和表结构。 | 性能通常由底层硬件集群大小、网络延迟以及调用应用程序来决定。 |
| 扩展         | 垂直（使用性能更强大的服务器进行扩展）、读写分离、分库分表   | 横向（增加服务器的方式横向扩展，通常是基于分片机制）         |
| 用途         | 普通企业级的项目的数据存储                                   | 用途广泛比如图数据库支持分析和遍历连接数据之间的关系、键值数据库可以处理大量数据扩展和极高的状态变化 |
| 查询语法     | 结构化查询语言 (SQL)                                         | 数据访问语法可能因数据库而异                                 |

## NoSQL 数据库有什么优势？

NoSQL 数据库非常适合许多现代应用程序，例如移动、Web 和游戏等应用程序，它们需要灵活、可扩展、高性能和功能强大的数据库以提供卓越的用户体验。

- **灵活性：** NoSQL 数据库通常提供灵活的架构，以实现更快速、更多的迭代开发。灵活的数据模型使 NoSQL 数据库成为半结构化和非结构化数据的理想之选。
- **可扩展性：** NoSQL 数据库通常被设计为通过使用分布式硬件集群来横向扩展，而不是通过添加昂贵和强大的服务器来纵向扩展。
- **高性能：** NoSQL 数据库针对特定的数据模型和访问模式进行了优化，这与尝试使用关系数据库完成类似功能相比可实现更高的性能。
- **强大的功能：** NoSQL 数据库提供功能强大的 API 和数据类型，专门针对其各自的数据模型而构建。

## NoSQL 数据库有哪些类型？

NoSQL 数据库主要可以分为下面四种类型：

- **键值**：键值数据库是一种较简单的数据库，其中每个项目都包含键和值。这是极为灵活的 NoSQL 数据库类型，因为应用可以完全控制 value 字段中存储的内容，没有任何限制。Redis 和 DynanoDB 是两款非常流行的键值数据库。
- **文档**：文档数据库中的数据被存储在类似于 JSON（JavaScript 对象表示法）对象的文档中，非常清晰直观。每个文档包含成对的字段和值。这些值通常可以是各种类型，包括字符串、数字、布尔值、数组或对象等，并且它们的结构通常与开发者在代码中使用的对象保持一致。MongoDB 就是一款非常流行的文档数据库。
- **图形**：图形数据库旨在轻松构建和运行与高度连接的数据集一起使用的应用程序。图形数据库的典型使用案例包括社交网络、推荐引擎、欺诈检测和知识图形。Neo4j 和 Giraph 是两款非常流行的图形数据库。
- **宽列**：宽列存储数据库非常适合需要存储大量的数据。Cassandra 和 HBase 是两款非常流行的宽列存储数据库。

下面这张图片来源于 [微软的官方文档 | 关系数据与 NoSQL 数据](https://learn.microsoft.com/en-us/dotnet/architecture/cloud-native/relational-vs-nosql-data)。

![](images\types-of-nosql-datastores.png)

## 参考

- NoSQL 是什么？- MongoDB 官方文档：[https://www.mongodb.com/zh-cn/nosql-explained](https://www.mongodb.com/zh-cn/nosql-explained)
- 什么是 NoSQL? - AWS：[https://aws.amazon.com/cn/nosql/](https://aws.amazon.com/cn/nosql/)
- NoSQL vs. SQL Databases - MongoDB 官方文档：https://www.mongodb.com/zh-cn/nosql-explained/nosql-vs-sql

# 字符集详解

MySQL 字符编码集中有两套 UTF-8 编码实现：**`utf8`** 和 **`utf8mb4`**。

如果使用 **`utf8`** 的话，存储 emoji 符号和一些比较复杂的汉字、繁体字就会出错。

为什么会这样呢？这篇文章可以从源头给你解答。

## 字符集是什么？

字符是各种文字和符号的统称，包括各个国家文字、标点符号、表情、数字等等。 **字符集** 就是一系列字符的集合。字符集的种类较多，每个字符集可以表示的字符范围通常不同，就比如说有些字符集是无法表示汉字的。

**计算机只能存储二进制的数据，那英文、汉字、表情等字符应该如何存储呢？**

我们要将这些字符和二进制的数据一一对应起来，比如说字符“a”对应“01100001”，反之，“01100001”对应 “a”。我们将字符对应二进制数据的过程称为"**字符编码**"，反之，二进制数据解析成字符的过程称为“**字符解码**”。

## 字符编码是什么？

**字符编码**是一种将字符集中的字符与计算机中的二进制数据相互转换的方法，可以看作是一种**映射规则**。也就是说，字符编码的目的是为了让计算机能够存储和传输各种文字信息。

每种字符集都有自己的字符编码规则，常用的字符集编码规则有 ASCII 编码、 GB2312 编码、GBK 编码、GB18030 编码、Big5 编码、UTF-8 编码、UTF-16 编码等。

## 有哪些常见的字符集？

常见的字符集有：ASCII、GB2312、GB18030、GBK、Unicode……。

不同的字符集的主要区别在于：

- 可以表示的字符范围
- 编码方式

### ASCII

**ASCII** (**A**merican **S**tandard **C**ode for **I**nformation **I**nterchange，美国信息交换标准代码) 是一套主要用于现代美国英语的字符集（这也是 ASCII 字符集的局限性所在）。**一个字节一个字符**，不足一个字节的补0凑足一个字节。

**为什么 ASCII 字符集没有考虑到中文等其他字符呢？** 因为计算机是美国人发明的，当时，计算机的发展还处于比较雏形的时代，还未在其他国家大规模使用。因此，美国发布 ASCII 字符集的时候没有考虑兼容其他国家的语言。

ASCII 字符集至今为止共定义了 128 个字符，其中有 33 个控制字符（比如回车、删除）无法显示。

一个 ASCII 码长度是**一个字节**也就是 **8 个 bit**，比如“a”对应的 ASCII 码是“01100001”。不过，最高位是 0 仅仅作为校验位，其余 7 位使用 0 和 1 进行组合，所以，ASCII 字符集可以定义 **128（2^7）**个字符。

由于，ASCII 码可以表示的字符实在是太少了。后来，人们对其进行了扩展得到了 **ASCII 扩展字符集** 。ASCII 扩展字符集使用 **8 位（bits）**表示一个字符，所以，ASCII 扩展字符集可以定义 **256（2^8）**个字符。

<img src="images\c1c6375d08ca268690cef2b13591a5b4.png"  />

### GB2312

我们上面说了，ASCII 字符集是一种现代美国英语适用的字符集。因此，很多国家都捣鼓了一个适合自己国家语言的字符集。

GB2312 字符集是一种对汉字比较友好的字符集，共收录 6700 多个汉字，基本涵盖了绝大部分常用汉字。不过，GB2312 字符集不支持绝大部分的生僻字和繁体字。

对于**英语字符**，GB2312 编码和 ASCII 码是相同的，**1 字节**编码即可。对于**非英字符**，需要 **2 字节**编码。

### GBK

GBK 字符集可以看作是 GB2312 字符集的扩展，兼容 GB2312 字符集，共收录了 20000 多个汉字。

GBK 中 K 是汉语拼音 Kuo Zhan（扩展）中的“Kuo”的首字母。

GBK编码规则中，**一个英文字母一个字节**(完全兼容ASCLL)，二进制**第一位是0**；**一个中文汉字两个字节**，二进制高位**第一位是1**。

### GB18030

GB18030 完全兼容 GB2312 和 GBK 字符集，纳入中国国内少数民族的文字，且收录了日韩汉字，是目前为止最全面的汉字字符集，共收录汉字 70000 多个。

### BIG5

BIG5 主要针对的是繁体中文，收录了 13000 多个汉字。

### Unicode & UTF-8

为了更加适合本国语言，诞生了很多种字符集。

我们上面也说了不同的字符集可以表示的字符范围以及编码规则存在差异。这就导致了一个非常严重的问题：**使用错误的编码方式查看一个包含字符的文件就会产生乱码现象。**

就比如说你使用 UTF-8 编码方式打开 GB2312 编码格式的文件就会出现乱码。示例：“牛”这个汉字 GB2312 编码后的十六进制数值为 “C5A3”，而 “C5A3” 用 UTF-8 解码之后得到的却是 “ţ”。

你可以通过这个网站在线进行编码和解码：https://www.haomeili.net/HanZi/ZiFuBianMaZhuanHuan

![](images\836c49b117ee4408871b0020b74c991d.png)

这样我们就搞懂了乱码的本质：**编码和解码时用了不同或者不兼容的字符集** 。

![](images\a8808cbabeea49caa3af27d314fa3c02-1.jpg)

为了解决这个问题，人们就想：“如果我们能够有一种字符集将世界上所有的字符都纳入其中就好了！”。

然后，**Unicode** 带着这个使命诞生了。

Unicode 字符集中包含了世界上几乎所有已知的字符。不过，Unicode 字符集并没有规定如何存储这些字符（也就是如何使用二进制数据表示这些字符）。

然后，就有了 **UTF-8**（**8**-bit **U**nicode **T**ransformation **F**ormat）。类似的还有 UTF-16、 UTF-32。

UTF-8 使用 1 到 4 个字节为每个字符编码， UTF-16 使用 2 或 4 个字节为每个字符编码，UTF-32 固定位 4 个字节为每个字符编码。

UTF-8 可以根据不同的符号自动选择编码的长短，像英文字符只需要 1 个字节就够了，这一点 ASCII 字符集一样 。因此，对于英语字符，UTF-8 编码和 ASCII 码是相同的。

UTF-8编码规则中，**英文1个字节保存**，不足补0，所以二进制**第一位是0**，**转成十进制是正数**；**中文3个字节保存**，高位前面补1110，中位前面补10，低位前面补10，所以二进制**第一位是1**，**转成十进制是负数**。

UTF-32 的规则最简单，不过缺陷也比较明显，对于英文字母这类字符消耗的空间是 UTF-8 的 4 倍之多。

**UTF-8** 是目前使用最广的一种字符编码。

<img src="images\1280px-Utf8webgrowth.svg.png" style="zoom:50%;" />

## MySQL 字符集

MySQL 支持很多种字符集的方式，比如 GB2312、GBK、BIG5、多种 Unicode 字符集（UTF-8 编码、UTF-16 编码、UCS-2 编码、UTF-32 编码等等）。

### 查看支持的字符集

你可以通过 `SHOW CHARSET` 命令来查看，支持 like 和 where 子句。

![](images\image-20211008164229671.png)

### 默认字符集

在 MySQL5.7 中，默认字符集是 `latin1` ；在 MySQL8.0 中，默认字符集是 `utf8mb4`

### 字符集的层次级别

MySQL 中的字符集有以下的层次级别：

- `server`（MySQL 实例级别）
- `database`（库级别）
- `table`（表级别）
- `column`（字段级别）

它们的优先级可以简单的认为是从上往下依次增大，也即 `column` 的优先级会大于 `table` 等其余层次的。如指定 MySQL 实例级别字符集是`utf8mb4`，指定某个表字符集是`latin1`，那么这个表的所有字段如果不指定的话，编码就是`latin1`。

#### server

不同版本的 MySQL 其 `server` 级别的字符集默认值不同，在 MySQL5.7 中，其默认值是 `latin1` ；在 MySQL8.0 中，其默认值是 `utf8mb4` 。

当然也可以通过在启动 `mysqld` 时指定 `--character-set-server` 来设置 `server` 级别的字符集。

```bash
mysqld
mysqld --character-set-server=utf8mb4
mysqld --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_0900_ai_ci
```

或者如果你是通过源码构建的方式启动的 MySQL，你可以在 `cmake` 命令中指定选项：

```bash
cmake . -DDEFAULT_CHARSET=latin1
或者
cmake . -DDEFAULT_CHARSET=latin1 \
  -DDEFAULT_COLLATION=latin1_german1_ci
```

此外，你也可以在运行时改变 `character_set_server` 的值，从而达到修改 `server` 级别的字符集的目的。

`server` 级别的字符集是 MySQL 服务器的全局设置，它不仅会作为创建或修改数据库时的默认字符集（如果没有指定其他字符集），还会影响到客户端和服务器之间的连接字符集，具体可以查看 [MySQL Connector/J 8.0 - 6.7 Using Character Sets and Unicode](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-charsets.html)。

#### database

`database` 级别的字符集是我们在创建数据库和修改数据库时指定的：

```sql
CREATE DATABASE db_name
    [[DEFAULT] CHARACTER SET charset_name]
    [[DEFAULT] COLLATE collation_name]

ALTER DATABASE db_name
    [[DEFAULT] CHARACTER SET charset_name]
    [[DEFAULT] COLLATE collation_name]
```

如前面所说，如果在执行上述语句时未指定字符集，那么 MySQL 将会使用 `server` 级别的字符集。

可以通过下面的方式查看某个数据库的字符集：

```sql
USE db_name;
SELECT @@character_set_database, @@collation_database;
```

```sql
SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME
FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'db_name';
```

#### table

`table` 级别的字符集是在创建表和修改表时指定的：

```sql
CREATE TABLE tbl_name (column_list)
    [[DEFAULT] CHARACTER SET charset_name]
    [COLLATE collation_name]]

ALTER TABLE tbl_name
    [[DEFAULT] CHARACTER SET charset_name]
    [COLLATE collation_name]
```

如果在创建表和修改表时未指定字符集，那么将会使用 `database` 级别的字符集。

#### column

`column` 级别的字符集同样是在创建表和修改表时指定的，只不过它是定义在列中。下面是个例子：

```sql
CREATE TABLE t1
(
    col1 VARCHAR(5)
      CHARACTER SET latin1
      COLLATE latin1_german1_ci
);
```

如果未指定列级别的字符集，那么将会使用表级别的字符集。

### 连接字符集

前面说到了字符集的层次级别，它们是和存储相关的。而连接字符集涉及的是和 MySQL 服务器的通信。

连接字符集与下面这几个变量息息相关：

- `character_set_client` ：描述了客户端发送给服务器的 SQL 语句使用的是什么字符集。
- `character_set_connection` ：描述了服务器接收到 SQL 语句时使用什么字符集进行翻译。
- `character_set_results` ：描述了服务器返回给客户端的结果使用的是什么字符集。

它们的值可以通过下面的 SQL 语句查询：

```sql
SELECT * FROM performance_schema.session_variables
WHERE VARIABLE_NAME IN (
'character_set_client', 'character_set_connection',
'character_set_results', 'collation_connection'
) ORDER BY VARIABLE_NAME;
```

```sql
SHOW SESSION VARIABLES LIKE 'character\_set\_%';
```

如果要想修改前面提到的几个变量的值，有以下方式：

1. 修改配置文件

```properties
[mysql]
# 只针对MySQL客户端程序
default-character-set=utf8mb4
```

2. 使用 SQL 语句

```sql
set names utf8mb4
# 或者一个个进行修改
# SET character_set_client = utf8mb4;
# SET character_set_results = utf8mb4;
# SET collation_connection = utf8mb4;
```

### JDBC 对连接字符集的影响

不知道你们有没有碰到过存储 emoji 表情正常，但是使用类似 Navicat 之类的软件的进行查询的时候，发现 emoji 表情变成了问号的情况。这个问题很有可能就是 JDBC 驱动引起的。

根据前面的内容，我们知道连接字符集也是会影响我们存储的数据的，而 JDBC 驱动会影响连接字符集。

`mysql-connector-java` （JDBC 驱动）主要通过这几个属性影响连接字符集：

- `characterEncoding`
- `characterSetResults`

以 `DataGrip 2023.1.2` 来说，在它配置数据源的高级对话框中，可以看到 `characterSetResults` 的默认值是 `utf8` ，在使用 `mysql-connector-java 8.0.25` 时，连接字符集最后会被设置成 `utf8mb3` 。那么这种情况下 emoji 表情就会被显示为问号，并且当前版本驱动还不支持把 `characterSetResults` 设置为 `utf8mb4` ，不过换成 `mysql-connector-java driver 8.0.29` 却是允许的。

具体可以看一下 StackOverflow 的 [DataGrip MySQL stores emojis correctly but displays them as?](https://stackoverflow.com/questions/54815419/datagrip-mysql-stores-emojis-correctly-but-displays-them-as)这个回答。

### UTF-8 使用

通常情况下，我们建议使用 UTF-8 作为默认的字符编码方式。

不过，这里有一个小坑。

MySQL 字符编码集中有两套 UTF-8 编码实现：

- **`utf8`**：`utf8`编码只支持`1-3`个字节 。 在 `utf8` 编码中，中文<u>是占 3 个字节</u>，其他数字、英文、符号占一个字节。但 <u>emoji 符号占 4 个字节</u>，一些较复杂的文字、繁体字也是 4 个字节。
- **`utf8mb4`**：UTF-8 的完整实现，正版！最多支持使用 4 个字节表示字符，因此，可以用来存储 emoji 符号。

**为什么有两套 UTF-8 编码实现呢？** 原因如下：

![](images\image-20211008164542347.png)

因此，如果你需要存储`emoji`类型的数据或者一些比较复杂的文字、繁体字到 MySQL 数据库的话，数据库的编码一定要指定为`utf8mb4` 而不是`utf8` ，要不然存储的时候就会报错了。

演示一下吧！（环境：MySQL 5.7+）

建表语句如下，我们指定数据库 CHARSET 为 `utf8` 。

```sql
CREATE TABLE `user` (
  `id` varchar(66) CHARACTER SET utf8mb3 NOT NULL,
  `name` varchar(33) CHARACTER SET utf8mb3 NOT NULL,
  `phone` varchar(33) CHARACTER SET utf8mb3 DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb3 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

当我们执行下面的 insert 语句插入数据到数据库时，果然报错！

```sql
INSERT INTO `user` (`id`, `name`, `phone`, `password`)
VALUES
 ('A00003', 'guide哥😘😘😘', '181631312312', '123456');
```

报错信息如下：

```plain
Incorrect string value: '\xF0\x9F\x98\x98\xF0\x9F...' for column 'name' at row 1
```

## 参考

- 字符集和字符编码（Charset & Encoding）：[https://www.cnblogs.com/skynet/archive/2011/05/03/2035105.html](https://www.cnblogs.com/skynet/archive/2011/05/03/2035105.html)
- 十分钟搞清字符集和字符编码：[http://cenalulu.github.io/linux/character-encoding/](http://cenalulu.github.io/linux/character-encoding/)
- Unicode-维基百科：[https://zh.wikipedia.org/wiki/Unicode](https://zh.wikipedia.org/wiki/Unicode)
- GB2312-维基百科：[https://zh.wikipedia.org/wiki/GB_2312](https://zh.wikipedia.org/wiki/GB_2312)
- UTF-8-维基百科：https://zh.wikipedia.org/wiki/UTF-8

- GB18030-维基百科: [https://zh.wikipedia.org/wiki/GB_18030](https://zh.wikipedia.org/wiki/GB_18030)

- MySQL8 文档：[https://dev.mysql.com/doc/refman/8.0/en/charset.html](https://dev.mysql.com/doc/refman/8.0/en/charset.html)

- MySQL5.7 文档：[https://dev.mysql.com/doc/refman/5.7/en/charset.html](https://dev.mysql.com/doc/refman/5.7/en/charset.html)

- MySQL Connector/J 文档：https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-charsets.html

# SQL语法基础知识总结

> 本文整理完善自下面这两份资料：
>
> - [SQL 语法速成手册](https://juejin.cn/post/6844903790571700231)
> - [MySQL 超全教程](https://www.begtut.com/mysql/mysql-tutorial.html)

## 基本概念

### 数据库术语

- `数据库（database）` - 保存有组织的数据的容器（通常是一个文件或一组文件）。
- `数据表（table）` - 某种特定类型数据的结构化清单。
- `模式（schema）` - 关于数据库和表的布局及特性的信息。模式定义了数据在表中如何存储，包含存储什么样的数据，数据如何分解，各部分信息如何命名等信息。数据库和表都有模式。
- `列（column）` - 表中的一个字段。所有表都是由一个或多个列组成的。
- `行（row）` - 表中的一个记录（元组）。
- `主键（primary key）` - 一列（或一组列），其值能够唯一标识表中每一行。

### SQL 语法

SQL（Structured Query Language)，标准 SQL 由 ANSI 标准委员会管理，从而称为 ANSI SQL。各个 DBMS 都有自己的实现，如 PL/SQL、Transact-SQL 等。

#### SQL 语法结构

![](H:/JAVA/JAVA MD笔记/images/cb684d4c75fc430e92aaee226069c7da~tplv-k3u1fbpfcp-zoom-1.png)

SQL 语法结构包括：

- **`子句`** - 是语句和查询的组成成分。（在某些情况下，这些都是可选的。）
- **`表达式`** - 可以产生任何标量值，或由列和行的数据库表
- **`谓词`** - 给需要评估的 SQL 三值逻辑（3VL）（true/false/unknown）或布尔真值指定条件，并限制语句和查询的效果，或改变程序流程。
- **`查询`** - 基于特定条件检索数据。这是 SQL 的一个重要组成部分。
- **`语句`** - 可以持久地影响纲要和数据，也可以控制数据库事务、程序流程、连接、会话或诊断。

#### SQL 语法要点

- **SQL 语句不区分大小写**，但是数据库表名、列名和值是否区分，依赖于具体的 DBMS 以及配置。例如：`SELECT` 与 `select`、`Select` 是相同的。
- **多条 SQL 语句必须以分号（`;`）分隔**。
- 处理 SQL 语句时，**所有空格都被忽略**。

SQL 语句可以写成一行，也可以分写为多行。

```sql
-- 一行 SQL 语句
UPDATE user SET username='robot', password='robot' WHERE username = 'root';
-- 多行 SQL 语句
UPDATE user
SET username='robot', password='robot'
WHERE username = 'root';
```

SQL 支持三种注释：

```sql
## 注释1
-- 注释2
/* 注释3 */
```

### SQL 分类

#### 数据定义语言（DDL）

数据定义语言（Data Definition Language，DDL）是 SQL 语言集中负责数据结构定义与数据库对象定义的语言。

DDL 的主要功能是**定义数据库对象**。

DDL 的核心指令是 `CREATE ` 创建、`ALTER`  改变、`DROP` 丢弃。  `DROP` 与 `DELETE`  、`TRUNCATE`的区别可参考 [drop、delete 与 truncate 区别？](# drop、delete 与 truncate 区别？)

#### 数据操纵语言（DML）

数据操纵语言（Data Manipulation Language, DML）是用于数据库操作，对数据库其中的对象和数据运行访问工作的编程语句。

DML 的主要功能是 **访问数据**，因此其语法都是以**读写数据库**为主。

DML 的核心指令是 `INSERT`  插入、`DELETE`   删除、`UPDATE`  更新、`SELECT`  选择。这四个指令合称 CRUD(Create, Read, Update, Delete)，即**增删改查**。

#### 事务控制语言（TCL）

事务控制语言 (Transaction  Control  Language, TCL) 用于**管理数据库中的事务**。这些用于管理由 DML 语句所做的更改。它还允许将语句分组为逻辑事务。

TCL 的核心指令是 `COMMIT`   提交、`ROLLBACK`  回滚 。

#### 数据控制语言（DCL）

数据控制语言 (Data Control Language, DCL) 是一种可对数据访问权进行控制的指令，它可以控制特定用户账户对数据表、查看表、预存程序、用户自定义函数等数据库对象的控制权。

DCL 的核心指令是 `GRANT`  授予、`REVOKE`  撤销。

DCL 以**控制用户的访问权限**为主，因此其指令作法并不复杂，可利用 DCL 控制的权限有：`CONNECT`、`SELECT`、`INSERT`、`UPDATE`、`DELETE`、`EXECUTE`、`USAGE`、`REFERENCES`。

根据不同的 DBMS 以及不同的安全性实体，其支持的权限控制也有所不同。

**我们先来介绍 DML 语句用法。 DML 的主要功能是读写数据库实现增删改查。**

## 增删改查

增删改查，又称为 CRUD，数据库基本操作中的基本操作。

### 插入数据 INSERT INTO

`INSERT INTO` 语句用于向表中插入新记录。

**插入完整的行**

```sql
# 插入一行
INSERT INTO user
VALUES (10, 'root', 'root', 'xxxx@163.com');
# 插入多行
INSERT INTO user
VALUES (10, 'root', 'root', 'xxxx@163.com'), (12, 'user1', 'user1', 'xxxx@163.com'), (18, 'user2', 'user2', 'xxxx@163.com');
```

**插入行的一部分**

```sql
INSERT INTO user(username, password, email)
VALUES ('admin', 'admin', 'xxxx@163.com');
```

**插入查询出来的数据**

```sql
INSERT INTO user(username)
SELECT name
FROM account;
```

### 删除数据 DELETE FROM

- `DELETE` 语句用于删除表中的记录。
- `TRUNCATE TABLE` 可以清空表，也就是删除所有行。

**删除表中的指定数据**

```sql
DELETE FROM user
WHERE username = 'robot';
```

**清空表中的数据**

```sql
TRUNCATE TABLE user;
```

注意：`truncate` 和 `drop` 属于 DDL(数据定义语言)语句。

### 更新数据 UPDATE

`UPDATE` 语句用于更新表中的记录。

```sql
UPDATE user
SET username='robot', password='robot'
WHERE username = 'root';
```

### 查询数据 SELECT FROM

`SELECT` 语句用于从数据库中**查询数据**。

`DISTINCT` 用于返回唯一不同的值。它作用于所有列，也就是说所有列的值都相同才算相同。**去掉列的重复值**。

`LIMIT` **限制返回的行数**。可以有两个参数，<u>第一个参数为起始行，从 0 开始；第二个参数为返回的总行数</u>。

- `ASC`：<u>**升序**（默认）</u>
- `DESC`：**降序**

**查询单列**

```sql
SELECT prod_name
FROM products;
```

**查询多列**

```sql
SELECT prod_id, prod_name, prod_price
FROM products;
```

**查询所有列**

```sql
SELECT *
FROM products;
```

**查询不同的值**

```sql
SELECT DISTINCT
vend_id FROM products;
```

**限制查询结果**

```sql
-- 返回前 5 行
SELECT * FROM mytable LIMIT 5;
SELECT * FROM mytable LIMIT 0, 5;
-- 返回第 3 ~ 5 行
SELECT * FROM mytable LIMIT 2, 3;
```

## 排序 ORDER BY

`order by` 用于对结果集按照一个列或者多个列进行**排序**。**默认按照升序**对记录进行排序，如果需要按照降序对记录进行排序，可以使用 `desc` 关键字。

`order by` 对多列排序的时候，先排序的列放前面，后排序的列放后面。并且，不同的列可以有不同的排序规则。

- `ASC`：<u>升序（默认）</u>
- `DESC`：降序

```sql
SELECT * FROM products
ORDER BY prod_price DESC, prod_name ASC;
```

*`ORDER BY` 语句必须放在 `WHERE` 之后。*

## 分组 GROUP BY

**`group by`**：

- `group by` 子句将记录**分组**到汇总行中。
- `group by` 为每个组返回一个记录。
- `group by` 通常还涉及聚合[`count`，`max`，`sum`，`avg`](# 汇总) 等。
- `group by` 可以按一列或多列进行分组。
- `group by` 按分组字段进行排序后，`order by` 可以以汇总字段来进行排序。

**分组**

```sql
SELECT cust_name, COUNT(cust_address) AS addr_num
FROM Customers GROUP BY cust_name;
```

注意：`GROUP BY cust_name;` ：会以`cust_name`进行**分组，因为一个客户可能会有多个`cust_address`**。

汇总函数如：`COUNT()`与`GROUP BY`连用时是对分组后的每一个组进行计算：`COUNT(cust_address)` **对分组后的每一个小组**，计算`cust_address` 的列数。

**分组后排序**

```sql
SELECT cust_name, COUNT(cust_address) AS addr_num
FROM Customers GROUP BY cust_name
ORDER BY cust_name DESC;
```

**`having`**：

- `having` 用于对汇总的 `group by` 结果进行**过滤**。
- `having` 一般都是和 `group by` **连用**。
- `where` 和 `having` 可以在相同的查询中。

**使用 WHERE 和 HAVING 过滤数据**

```sql
SELECT cust_name, COUNT(*) AS num
FROM Customers
WHERE cust_email IS NOT NULL
GROUP BY cust_name
HAVING COUNT(*) >= 1;
```

**`having` vs `where`**：

- `where`：过滤指定的行，后面**不能加聚合函数（分组函数）**。<u>`where` 在`group by` 前。</u>
- `having`：过滤分组，一般都是和 `group by` 连用，**不能单独使用**。<u>`having` 在 `group by` 之后</u>。

## 子查询

子查询是嵌套在较大查询中的 SQL 查询，也称内部查询或内部选择，包含子查询的语句也称为外部查询或外部选择。简单来说，子查询就是指将一个 `select` 查询（子查询）的结果作为另一个 SQL 语句（主查询）的数据来源或者判断条件。

子查询可以嵌入 `SELECT`、`INSERT`、`UPDATE` 和 `DELETE` 语句中，也可以和 `=`、`<`、`>`、`IN`、`BETWEEN`、`EXISTS` 等运算符一起使用。

子查询常用在 `WHERE` 子句和 `FROM` 子句后边：

- 当用于 `WHERE` 子句时，根据不同的运算符，子查询可以返回单行单列、多行单列、单行多列数据。子查询就是要<u>返回能够作为 `WHERE` 子句查询条件的值</u>。
- 当用于 `FROM` 子句时，一般返回多行多列数据，相当于<u>返回一张临时表</u>，这样才符合 `FROM` 后面是表的规则。这种做法能够实现多表联合查询。

> 注意：MYSQL 数据库从 4.1 版本才开始支持子查询，早期版本是不支持的。

用于 `WHERE` 子句的子查询的基本语法如下：

```sql
select column_name [, column_name ]
from   table1 [, table2 ]
where  column_name operator
    (select column_name [, column_name ]
    from table1 [, table2 ]
    [where])
```

- 子查询需要放在**括号`( )`内**。
- `operator` 表示用于 where 子句的**运算符**。

GPT 解释一下这个查询语句的各个部分：

- `SELECT column_name [, column_name]`: 这部分指定了你想要从表中检索的列。你可以列出多个列名，用逗号分隔，以检索多个列的值。
- `FROM table1 [, table2]`: 这部分指定了你要检索数据的表。你可以指定一个或多个表，用逗号分隔。如果你从多个表中检索数据，通常需要在这些表之间建立连接。
- `WHERE column_name operator (select column_name [, column_name] from table1 [, table2] [where])`: 这是查询的条件部分。它使用了一个逻辑运算符（如等于、大于、小于等）来比较列的值。在括号内部，可以包含一个子查询，该子查询返回一个列值列表，用于与主查询中的列进行比较。这样的子查询可以帮助你筛选出符合特定条件的行。

以下是一个简单示例：

```sql
SELECT first_name, last_name
FROM employees
WHERE department_id = (SELECT department_id FROM departments WHERE department_name = 'Engineering');
```



用于 `FROM` 子句的子查询的基本语法如下：

```sql
select column_name [, column_name ]
from (select column_name [, column_name ]
      from table1 [, table2 ]
      [where]) as temp_table_name
where  condition
```

用于 `FROM` 的子查询返回的结果相当于一张临时表，所以需要使用 **AS 关键字** 为该临时表起一个名字。

**子查询的子查询**

```sql
SELECT cust_name, cust_contact
FROM customers
WHERE cust_id IN (SELECT cust_id
                  FROM orders
                  WHERE order_num IN (SELECT order_num
                                      FROM orderitems
                                      WHERE prod_id = 'RGAN01'));
```

内部查询首先在其父查询之前执行，以便可以将内部查询的结果传递给外部查询。执行过程可以参考下图：

![](images\c439da1f5d4e4b00bdfa4316b933d764~tplv-k3u1fbpfcp-zoom-1.png)

### WHERE

- `WHERE` 子句用于过滤记录，即缩小访问数据的范围。
- `WHERE` 后跟一个返回 `true` 或 `false` 的条件。
- `WHERE` 可以与 `SELECT`，`UPDATE` 和 `DELETE` 一起使用。
- 可以在 `WHERE` 子句中使用的操作符。

| 运算符  | 描述                                                   |
| ------- | ------------------------------------------------------ |
| =       | 等于                                                   |
| <>      | 不等于。注释：在 SQL 的一些版本中，该操作符可被写成 != |
| >       | 大于                                                   |
| <       | 小于                                                   |
| >=      | 大于等于                                               |
| <=      | 小于等于                                               |
| BETWEEN | 在某个范围内                                           |
| LIKE    | 搜索某种模式                                           |
| IN      | 指定针对某个列的多个可能值                             |

**`SELECT` 语句中的 `WHERE` 子句**

```ini
SELECT * FROM Customers
WHERE cust_name = 'Kids Place';
```

**`UPDATE` 语句中的 `WHERE` 子句**

```ini
UPDATE Customers
SET cust_name = 'Jack Jones'
WHERE cust_name = 'Kids Place';
```

**`DELETE` 语句中的 `WHERE` 子句**

```ini
DELETE FROM Customers
WHERE cust_name = 'Kids Place';
```

### IN 和 BETWEEN

- `IN` 操作符在 `WHERE` 子句中使用，作用是在指定的几个特定值中任选一个值。
- `BETWEEN` 操作符在 `WHERE` 子句中使用，作用是选取介于某个范围内的值，包括最大值和最小值。

**IN 示例**

```sql
SELECT *
FROM products
WHERE vend_id IN ('DLL01', 'BRS01');
```

**BETWEEN 示例**

```sql
SELECT *
FROM products
WHERE prod_price BETWEEN 3 AND 5;  # 包括 3 和 5
```

### AND、OR、NOT

- `AND`、`OR`、`NOT` 是用于对过滤条件的逻辑处理指令。
- `AND` 优先级高于 `OR`，为了明确处理顺序，可以使用 `()`。
- `AND` 操作符表示左右条件都要满足。
- `OR` 操作符表示左右条件满足任意一个即可。
- `NOT` 操作符用于否定一个条件。

**AND 示例**

```sql
SELECT prod_id, prod_name, prod_price
FROM products
WHERE vend_id = 'DLL01' AND prod_price <= 4;
```

**OR 示例**

```sql
SELECT prod_id, prod_name, prod_price
FROM products
WHERE vend_id = 'DLL01' OR vend_id = 'BRS01';
```

**NOT 示例**

```sql
SELECT *
FROM products
WHERE prod_price NOT BETWEEN 3 AND 5;
```

### LIKE

- `LIKE` 操作符在 `WHERE` 子句中使用，作用是确定字符串是否匹配模式。
- 只有**字段是文本值**时才使用 `LIKE`。
- `LIKE` 支持两个**通配符**匹配选项：**`%` 和 `_`**。
- 不要滥用通配符，通配符位于开头处匹配会非常慢。
- `%` 表示任何字符出现任意次数。
- `_` 表示任何字符出现一次。

**% 示例**

```sql
SELECT prod_id, prod_name, prod_price
FROM products
WHERE prod_name LIKE '%bean bag%';
```

**_ 示例**

```sql
SELECT prod_id, prod_name, prod_price
FROM products
WHERE prod_name LIKE '__ inch teddy bear';
```

在 SQL 中，可使用以下**通配符**：

| 通配符                           | 描述                       |
| :------------------------------- | :------------------------- |
| `%`                              | 代表零个或多个字符         |
| `_`                              | 仅替代一个字符             |
| `[charlist]`                     | 字符列中的任何单一字符     |
| `[^charlist]` 或者 `[!charlist]` | 不在字符列中的任何单一字符 |

## 连接 JOIN

`JOIN` 是“连接”的意思，顾名思义，SQL  JOIN 子句用于将两个或者多个表**联合起来进行查询**。

连接表时需要在每个表中选择一个字段，并对这些字段的值进行比较，值相同的两条记录将合并为一条。**连接表的本质就是将不同表的记录合并起来，形成一张新表。当然，这张新表只是临时的，它仅存在于本次查询期间**。

使用 `JOIN` 连接两个表的基本语法如下：

```sql
select table1.column1, table2.column2...
from table1
join table2
on table1.common_column1 = table2.common_column2;
```

`table1.common_column1 = table2.common_column2` 是**连接条件**，只有满足此条件的记录才会合并为一行。您可以使用多个运算符来连接表，例如 =、>、<、<>、<=、>=、!=、`between`、`like` 或者 `not`，但是最常见的是使用 =。

当两个表中有同名的字段时，为了帮助数据库引擎区分是哪个表的字段，在**书写同名字段名时需要加上表名**。当然，如果书写的字段名在两个表中是唯一的，也可以不使用以上格式，只写字段名即可。

另外，如果两张表的**关联字段名相同**，也可以使用 `USING`子句来代替 `ON`，举个例子：

```sql
# join....on
select c.cust_name, o.order_num
from Customers c
inner join Orders o
on c.cust_id = o.cust_id
order by c.cust_name;

# 如果两张表的关联字段名相同，也可以使用USING子句：
# join....using()
select c.cust_name, o.order_num
from Customers c
inner join Orders o
using(cust_id)
order by c.cust_name;
```

**`ON` 和 `WHERE` 的区别**：

- 连接表时，SQL 会根据连接条件生成一张新的临时表。**`ON` 就是连接条件**，它决定临时表的生成。
- `WHERE` 是在临时表生成以后，再对临时表中的数据进行过滤，生成最终的结果集，这个时候已经没有 JOIN-ON 了。

所以总结来说就是：**SQL 先根据 ON 生成一张临时表，然后再根据 WHERE 对临时表进行筛选**。

SQL 允许在 `JOIN` 左边加上一些修饰性的关键词，从而形成不同类型的连接，如下表所示：

| 连接类型                                 | 说明                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| INNER JOIN 内连接                        | （默认连接方式）只有当两个表都存在满足条件的记录时才会返回行。 |
| LEFT JOIN / LEFT OUTER JOIN 左(外)连接   | 返回左表中的所有行，即使右表中没有满足条件的行也是如此。     |
| RIGHT JOIN / RIGHT OUTER JOIN 右(外)连接 | 返回右表中的所有行，即使左表中没有满足条件的行也是如此。     |
| FULL JOIN / FULL OUTER JOIN 全(外)连接   | 只要其中有一个表存在满足条件的记录，就返回左右表的所有行。   |
| SELF JOIN                                | 将一个表连接到自身，就像该表是两个表一样。为了区分两个表，在 SQL 语句中需要至少重命名一个表。 |
| CROSS JOIN                               | 交叉连接，从两个或者多个连接表中返回记录集的笛卡尔积。       |

下图展示了 LEFT JOIN、RIGHT JOIN、INNER JOIN、OUTER JOIN 相关的 7 种用法。

<img src="images\701670942f0f45d3a3a2187cd04a12ad~tplv-k3u1fbpfcp-zoom-1.png" style="zoom: 80%;" />

如果不加任何修饰词，只写 `JOIN`，那么默认为 `INNER JOIN`

对于 `INNER JOIN` 来说，还有一种隐式的写法，称为 “**隐式内连接**”，也就是没有 `INNER JOIN` 关键字，使用 `WHERE` 语句实现内连接的功能

```sql
# 隐式内连接
select c.cust_name, o.order_num
from Customers c, Orders o
where c.cust_id = o.cust_id  # 消除无效的笛卡尔积
order by c.cust_name;

# 显式内连接
select c.cust_name, o.order_num
from Customers c inner join Orders o
using(cust_id)
order by c.cust_name;
```

## 组合 UNION

`UNION` 运算符将两个或更多查询的结果组合起来，并生成一个结果集，其中包含来自 `UNION` 中参与查询的提取行。

`UNION` 基本规则：

- 所有查询的**列数和列顺序必须相同**。
- 每个查询中涉及表的列的**数据类型必须相同或兼容**。
- 通常返回的**列名取自第一个查询**。

默认地，*`UNION` 操作符选取不同的值。如果允许重复的值，请使用 `UNION ALL`。*

```sql
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

`UNION` 结果集中的列名总是等于 `UNION` 中第一个 `SELECT` 语句中的列名。

`JOIN` vs `UNION`：

- `JOIN` 中连接表的列可能不同，但在 `UNION` 中，所有查询的列数和列顺序必须相同。
- `UNION` 将查询之后的行放在一起（**垂直放置**），但 `JOIN` 将查询之后的列放在一起（**水平放置**），即它构成一个笛卡尔积。

## 函数

不同数据库的函数往往各不相同，因此不可移植。本节主要以 `MySQL` 的函数为例。

### 文本处理

| 函数                 | 说明                   |
| -------------------- | ---------------------- |
| `LEFT()`、`RIGHT()`  | 左边或者右边的字符     |
| `LOWER()`、`UPPER()` | 转换为小写或者大写     |
| `LTRIM()`、`RTRIM()` | 去除左边或者右边的空格 |
| `LENGTH()`           | 长度，以**字节**为单位 |
| `SOUNDEX()`          | 转换为语音值           |

其中， **`SOUNDEX()`** 可以将一个字符串转换为描述其语音表示的字母数字模式。

```sql
SELECT *
FROM mytable
WHERE SOUNDEX(col1) = SOUNDEX('apple')
```

### 日期和时间处理

- 日期格式：`YYYY-MM-DD`
- 时间格式：`HH:MM:SS`

| 函 数           | 说 明                          |
| --------------- | ------------------------------ |
| `AddDate()`     | 增加一个日期（天、周等）       |
| `AddTime()`     | 增加一个时间（时、分等）       |
| `CurDate()`     | 返回当前日期                   |
| `CurTime()`     | 返回当前时间                   |
| `Date()`        | 返回日期时间的日期部分         |
| `DateDiff()`    | 计算两个日期之差               |
| `Date_Add()`    | 高度灵活的日期运算函数         |
| `Date_Format()` | 返回一个格式化的日期或时间串   |
| `Day()`         | 返回一个日期的天数部分         |
| `DayOfWeek()`   | 对于一个日期，返回对应的星期几 |
| `Hour()`        | 返回一个时间的小时部分         |
| `Minute()`      | 返回一个时间的分钟部分         |
| `Month()`       | 返回一个日期的月份部分         |
| `Now()`         | 返回当前日期和时间             |
| `Second()`      | 返回一个时间的秒部分           |
| `Time()`        | 返回一个日期时间的时间部分     |
| `Year()`        | 返回一个日期的年份部分         |

### 数值处理

| 函数     | 说明   |
| -------- | ------ |
| `SIN()`  | 正弦   |
| `COS()`  | 余弦   |
| `TAN()`  | 正切   |
| `ABS()`  | 绝对值 |
| `SQRT()` | 平方根 |
| `MOD()`  | 余数   |
| `EXP()`  | 指数   |
| `PI()`   | 圆周率 |
| `RAND()` | 随机数 |

### 汇总

null不参与所有聚合函数的运算

| 函 数     | 说 明              |
| --------- | ------------------ |
| `AVG()`   | 返回某列的平均值   |
| `COUNT()` | 返回**某列的行数** |
| `MAX()`   | 返回某列的最大值   |
| `MIN()`   | 返回某列的最小值   |
| `SUM()`   | 返回某列值之和     |

`AVG()` 会**忽略 NULL 行**。

使用 `DISTINCT` 可以让汇总函数值汇总不同的值。`DISTINCT`---去除重复值

```sql
SELECT AVG(DISTINCT col1) AS avg_col
FROM mytable
```

**接下来，我们来介绍 DDL 语句用法。DDL 的主要功能是定义数据库对象（如：数据库、数据表、视图、索引等）**。

## 数据定义 DDL

### 数据库（DATABASE）

#### 创建数据库 CREATE

```sql
CREATE DATABASE test;
```

#### 删除数据库 DROP

```sql
DROP DATABASE test;
```

#### 选择数据库 USE

```sql
USE test;
```

### 数据表（TABLE）

#### 创建数据表 CREATE

**普通创建**

```sql
CREATE TABLE user (
  id int(10) unsigned NOT NULL COMMENT 'Id',
  username varchar(64) NOT NULL DEFAULT 'default' COMMENT '用户名',
  password varchar(64) NOT NULL DEFAULT 'default' COMMENT '密码',
  email varchar(64) NOT NULL DEFAULT 'default' COMMENT '邮箱'
) COMMENT='用户表';
```

**根据已有的表创建新表**

```sql
CREATE TABLE vip_user AS
SELECT * FROM user;
```

#### 删除数据表 DROP

```sql
DROP TABLE user;
```

#### 修改数据表 ALTER

**添加列 ** `ADD`

```sql
ALTER TABLE user
ADD age int(3);
```

**删除列** `DROP COLUMN`

```sql
ALTER TABLE user
DROP COLUMN age;
```

**修改列 ** `MODIFY COLUMN`

```sql
ALTER TABLE user
MODIFY COLUMN age tinyint;
```

**添加主键 ** `ADD PRIMARY KEY `

```sql
ALTER TABLE user
ADD PRIMARY KEY (id);
```

**删除主键**  `DROP PRIMARY KEY`

```sql
ALTER TABLE user
DROP PRIMARY KEY;
```

### 视图（VIEW）

定义：

- 视图是基于 SQL 语句的结果集的可视化的表。
- 视图是虚拟的表，本身不包含数据，也就不能对其进行索引操作。对视图的操作和对普通表的操作一样。

作用：

- 简化复杂的 SQL 操作，比如复杂的联结；
- 只使用实际表的一部分数据；
- 通过只给用户访问视图的权限，保证数据的安全性；
- 更改数据格式和表示。

![](images\ec4c975296ea4a7097879dac7c353878~tplv-k3u1fbpfcp-zoom-1.jpeg)

#### 创建视图

```sql
CREATE VIEW top_10_user_view AS
SELECT id, username
FROM user
WHERE id < 10;
```

#### 删除视图

```sql
DROP VIEW top_10_user_view;
```

### 索引（INDEX）

**索引是一种用于快速查询和检索数据的数据结构，其本质可以看成是一种排序好的数据结构。**

**索引的作用就相当于书的目录**。打个比方: 我们在查字典的时候，如果没有目录，那我们就只能一页一页的去找我们需要查的那个字，速度很慢。如果有目录了，我们只需要先去目录里查找字的位置，然后直接翻到那一页就行了。

**优点**：

- 使用索引可以**大大加快 数据的检索速度**（大大减少检索的数据量）, 这也是创建索引的最主要的原因。
- 通过创建唯一性索引，可以**保证数据库表中每一行数据的唯一性**。

**缺点**：

- 创建索引和维护索引需要耗费许多时间。当对表中的数据进行增删改的时候，如果数据有索引，那么索引也需要动态的修改，会降低 SQL 执行效率。
- 索引需要使用物理文件存储，也会耗费一定空间。

但是，**使用索引一定能提高查询性能吗?**

大多数情况下，索引查询都是比全表扫描要快的。但是如果数据库的数据量不大，那么使用索引也不一定能够带来很大提升。

关于索引的详细介绍，请看我写的 [MySQL 索引详解](https://javaguide.cn/database/mysql/mysql-index.html) 这篇文章。

创建表时：

- 主键字段，在建表时，会自动创建主键索引。

- 添加唯一约束时，数据库实际上会添加唯一索引。

#### 创建索引 CREATE INDEX

```sql
CREATE INDEX user_index ON user(id);
```

#### 添加索引

```sql
ALTER table user 
ADD INDEX user_index(id)
```

#### 创建唯一索引

```sql
CREATE UNIQUE INDEX user_index ON user (id);
```

#### 删除索引

```sql
ALTER TABLE user
DROP INDEX user_index
```

### 约束

**SQL 约束用于规定表中的数据规则**。

如果存在违反约束的数据行为，行为会被约束终止。

约束可以在创建表时规定（通过 CREATE TABLE 语句），或者在表创建之后规定（通过 ALTER TABLE 语句）。

约束类型：

- `NOT NULL` - 指示某列不能存储 NULL 值。
- `UNIQUE` - 保证某列的每行必须有唯一的值。
- `PRIMARY KEY` - NOT NULL 和 UNIQUE 的结合。确保某列（或两个列多个列的结合）有唯一标识，有助于更容易更快速地找到表中的一个特定的记录。
- `FOREIGN KEY` - 保证一个表中的数据匹配另一个表中的值的参照完整性。
- `CHECK` - 保证列中的值符合指定的条件。
- `DEFAULT` - 规定没有给列赋值时的默认值。

创建表时使用约束条件：

```sql
CREATE TABLE Users (
  Id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  Username VARCHAR(64) NOT NULL UNIQUE DEFAULT 'default' COMMENT '用户名',
  Password VARCHAR(64) NOT NULL DEFAULT 'default' COMMENT '密码',
  Email VARCHAR(64) NOT NULL DEFAULT 'default' COMMENT '邮箱地址',
  Enabled TINYINT(4) DEFAULT NULL COMMENT '是否有效',
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
## 表的引擎为 InnoDB，这是 MySQL 中常用的存储引擎，支持事务和外键约束。
## 表中的 Id 列被指定为自增列，初始值为 2，每次插入一行数据时，Id 的值会自动增加。
## 该表的字符集为 utf8mb4，支持存储 4 字节的 Unicode 字符，适合存储多种语言的数据。
```

**接下来，我们来介绍 TCL 语句用法。TCL 的主要功能是管理数据库中的事务。**

## 事务处理 TCL

**不能回退 `SELECT` 语句，回退 `SELECT` 语句也没意义；<u>也不能回退 `CREATE` 和 `DROP` 语句</u>**。

**MySQL 默认是隐式提交**，每执行一条语句就把这条语句当成一个事务然后进行提交。当出现 `START TRANSACTION` 语句时，会关闭隐式提交；当 `COMMIT` 或 `ROLLBACK` 语句执行后，事务会自动关闭，重新恢复隐式提交。

通过 `set autocommit=0` 可以取消自动提交，直到 `set autocommit=1` 才会提交；**`autocommit`** 标记是针对每个连接而不是针对服务器的。

指令：

- `START TRANSACTION / begin` - 指令用于标记事务的起始点。
- `SAVEPOINT` - 指令用于创建保留点。
- `ROLLBACK TO` - 指令用于回滚到指定的保留点；如果没有设置保留点，则回退到 `START TRANSACTION` 语句处。
- `COMMIT` - 提交事务。

```sql
-- 开始事务
START TRANSACTION;  # 或者 begin

-- 插入操作 A
INSERT INTO user
VALUES (1, 'root1', 'root1', 'xxxx@163.com');

-- 创建保留点 updateA
SAVEPOINT updateA;

-- 插入操作 B
INSERT INTO `user`
VALUES (2, 'root2', 'root2', 'xxxx@163.com');

-- 回滚到保留点 updateA
ROLLBACK TO updateA;

-- 提交事务，只有操作 A 生效
COMMIT;
```

**接下来，我们来介绍 DCL 语句用法。DCL 的主要功能是控制用户的访问权限。**

## 权限控制 DCL

要授予用户帐户权限，可以用**`GRANT`**命令。要撤销用户的权限，可以用**`REVOKE`**命令。这里以 MySQL 为例，介绍权限控制实际应用。

`GRANT`授予权限语法：

```sql
GRANT privilege,[privilege],.. ON privilege_level
TO user [IDENTIFIED BY password]
[REQUIRE tsl_option]
[WITH [GRANT_OPTION | resource_option]];
```

简单解释一下：

1. 在`GRANT`关键字后指定一个或多个权限。如果授予用户多个权限，则每个权限由逗号分隔。
2. `ON privilege_level` 确定权限应用级别。MySQL 支持 global（`*.*`），database（`database.*`），table（`database.table`）和列级别。如果使用列权限级别，则必须在每个权限之后指定一个或逗号分隔列的列表。
3. `user` 是要授予权限的用户。如果用户已存在，则`GRANT`语句将修改其权限。否则，`GRANT`语句将创建一个新用户。可选子句`IDENTIFIED BY`允许您为用户设置新的密码。
4. `REQUIRE tsl_option`指定用户是否必须通过 SSL，X059 等安全连接连接到数据库服务器。
5. 可选 `WITH GRANT OPTION` 子句允许您授予其他用户或从其他用户中删除您拥有的权限。此外，您可以使用`WITH`子句分配 MySQL 数据库服务器的资源，例如，设置用户每小时可以使用的连接数或语句数。这在 MySQL 共享托管等共享环境中非常有用。

`REVOKE` 撤销权限语法：

```sql
REVOKE   privilege_type [(column_list)]
        [, priv_type [(column_list)]]...
ON [object_type] privilege_level
FROM user [, user]...
```

简单解释一下：

1. 在 `REVOKE` 关键字后面指定要从用户撤消的权限列表。您需要用逗号分隔权限。
2. 指定在 `ON` 子句中撤销特权的特权级别。
3. 指定要撤消 `FROM` 子句中的权限的用户帐户。

`GRANT` 和 `REVOKE` 可在几个层次上控制访问权限：

- 整个服务器，使用 `GRANT ALL` 和 `REVOKE ALL`；
- 整个数据库，使用 `ON database.*`；
- 特定的表，使用 `ON database.table`；
- 特定的列；
- 特定的存储过程。

新创建的账户没有任何权限。账户用 `username@host` 的形式定义，`username@%` 使用的是默认主机名。MySQL 的账户信息保存在 mysql 这个数据库中。

```sql
USE mysql;
SELECT user FROM user;
```

下表说明了可用于`GRANT`和`REVOKE`语句的所有允许权限：

| **特权**                | **说明**                                                     | **级别** |        |          |          |      |      |
| :---------------------- | ------------------------------------------------------------ | -------- | ------ | -------- | -------- | ---- | ---- |
| **全局**                | 数据库                                                       | **表**   | **列** | **程序** | **代理** |      |      |
| ALL [PRIVILEGES]        | 授予除 GRANT OPTION 之外的指定访问级别的所有权限             |          |        |          |          |      |      |
| ALTER                   | 允许用户使用 ALTER TABLE 语句                                | X        | X      | X        |          |      |      |
| ALTER ROUTINE           | 允许用户更改或删除存储的例程                                 | X        | X      |          |          | X    |      |
| CREATE                  | 允许用户创建数据库和表                                       | X        | X      | X        |          |      |      |
| CREATE ROUTINE          | 允许用户创建存储的例程                                       | X        | X      |          |          |      |      |
| CREATE TABLESPACE       | 允许用户创建，更改或删除表空间和日志文件组                   | X        |        |          |          |      |      |
| CREATE TEMPORARY TABLES | 允许用户使用 CREATE TEMPORARY TABLE 创建临时表               | X        | X      |          |          |      |      |
| CREATE USER             | 允许用户使用 CREATE USER，DROP USER，RENAME USER 和 REVOKE ALL PRIVILEGES 语句。 | X        |        |          |          |      |      |
| CREATE VIEW             | 允许用户创建或修改视图。                                     | X        | X      | X        |          |      |      |
| DELETE                  | 允许用户使用 DELETE                                          | X        | X      | X        |          |      |      |
| DROP                    | 允许用户删除数据库，表和视图                                 | X        | X      | X        |          |      |      |
| EVENT                   | 启用事件计划程序的事件使用。                                 | X        | X      |          |          |      |      |
| EXECUTE                 | 允许用户执行存储的例程                                       | X        | X      | X        |          |      |      |
| FILE                    | 允许用户读取数据库目录中的任何文件。                         | X        |        |          |          |      |      |
| GRANT OPTION            | 允许用户拥有授予或撤消其他帐户权限的权限。                   | X        | X      | X        |          | X    | X    |
| INDEX                   | 允许用户创建或删除索引。                                     | X        | X      | X        |          |      |      |
| INSERT                  | 允许用户使用 INSERT 语句                                     | X        | X      | X        | X        |      |      |
| LOCK TABLES             | 允许用户对具有 SELECT 权限的表使用 LOCK TABLES               | X        | X      |          |          |      |      |
| PROCESS                 | 允许用户使用 SHOW PROCESSLIST 语句查看所有进程。             | X        |        |          |          |      |      |
| PROXY                   | 启用用户代理。                                               |          |        |          |          |      |      |
| REFERENCES              | 允许用户创建外键                                             | X        | X      | X        | X        |      |      |
| RELOAD                  | 允许用户使用 FLUSH 操作                                      | X        |        |          |          |      |      |
| REPLICATION CLIENT      | 允许用户查询以查看主服务器或从属服务器的位置                 | X        |        |          |          |      |      |
| REPLICATION SLAVE       | 允许用户使用复制从属从主服务器读取二进制日志事件。           | X        |        |          |          |      |      |
| SELECT                  | 允许用户使用 SELECT 语句                                     | X        | X      | X        | X        |      |      |
| SHOW DATABASES          | 允许用户显示所有数据库                                       | X        |        |          |          |      |      |
| SHOW VIEW               | 允许用户使用 SHOW CREATE VIEW 语句                           | X        | X      | X        |          |      |      |
| SHUTDOWN                | 允许用户使用 mysqladmin shutdown 命令                        | X        |        |          |          |      |      |
| SUPER                   | 允许用户使用其他管理操作，例如 CHANGE MASTER TO，KILL，PURGE BINARY LOGS，SET GLOBAL 和 mysqladmin 命令 | X        |        |          |          |      |      |
| TRIGGER                 | 允许用户使用 TRIGGER 操作。                                  | X        | X      | X        |          |      |      |
| UPDATE                  | 允许用户使用 UPDATE 语句                                     | X        | X      | X        | X        |      |      |
| USAGE                   | 相当于“没有特权”                                             |          |        |          |          |      |      |

### 创建账户

```sql
CREATE USER myuser IDENTIFIED BY 'mypassword';
```

这条 SQL 语句创建了一个名为 `myuser` 的用户，并设置了对应的密码为 `'mypassword'`。`IDENTIFIED BY` 关键字用于指定用户的密码。

### 修改账户名

```sql
UPDATE user SET user='newuser' WHERE user='myuser';
FLUSH PRIVILEGES;
```

`FLUSH PRIVILEGES;` 这条语句用于刷新 MySQL 的权限缓存，使最新的授权或者权限更改立即生效。在你修改了用户权限或者新建了用户之后，通常需要执行这条语句来确保修改立即生效。不过，需要注意的是，修改了用户的权限或者新建了用户时，不一定总是需要执行 `FLUSH PRIVILEGES;`，这取决于 MySQL 服务器的配置。

### 删除账户

```sql
DROP USER myuser;
```

### 查看权限

```sql
SHOW GRANTS FOR myuser;
```

### 授予权限

```sql
GRANT SELECT, INSERT ON *.* TO myuser;
```

这条 SQL 语句授予了 `myuser` 用户对所有数据库和所有表的 `SELECT` 和 `INSERT` 权限。这意味着 `myuser` 用户可以查询和插入任何数据库中的任何表中的数据。

### 删除权限

```sql
REVOKE SELECT, INSERT ON *.* FROM myuser;
```

这条 SQL 语句用于撤销 `myuser` 用户对所有数据库和所有表的 `SELECT` 和 `INSERT` 权限。

### 更改密码

```sql
SET PASSWORD FOR myuser = 'mypass';
```

这条 SQL 语句用于为 `myuser` 用户设置新密码为 `'mypass'`。

## 存储过程 PROCEDURE

存储过程可以看成是**对一系列 SQL 操作的批处理(就像一个方法)**。存储过程可以由触发器，其他存储过程以及 Java， Python，PHP 等应用程序调用。

![](images\60afdc9c9a594f079727ec64a2e698a3~tplv-k3u1fbpfcp-zoom-1.jpeg)

使用存储过程的好处：

- 代码封装，保证了一定的安全性；
- 代码复用；
- 由于是预先编译，因此具有很高的性能。

创建存储过程：

- 命令行中创建存储过程需要自定义分隔符，因为命令行是以 `;` 为结束符，而存储过程中也包含了分号，因此会错误把这部分分号当成是结束符，造成语法错误。
- 包含 `in`、`out` 和 `inout` 三种参数。
- 给变量赋值都需要用 `select into` 语句。
- 每次只能给一个变量赋值，不支持集合的操作。

需要注意的是：**阿里巴巴《Java 开发手册》强制禁止使用存储过程。因为存储过程难以调试和扩展，更没有移植性。**

![](images\93a5e011ade4450ebfa5d82057532a49~tplv-k3u1fbpfcp-zoom-1.png)

至于到底要不要在项目中使用，还是要看项目实际需求，权衡好利弊即可！

### 创建存储过程

```sql
DROP PROCEDURE IF EXISTS proc_adder;
DELIMITER ;;
CREATE DEFINER=root@localhost PROCEDURE proc_adder(IN a int, IN b int, OUT sum int)
BEGIN
    DECLARE c int;
    if a is null then set a = 0;
    end if;

    if b is null then set b = 0;
    end if;

    set sum  = a + b;
END
;;
DELIMITER ;
```

`PROCEDURE`---过程

**`DELIMITER`---定义分隔符**

`BEGIN ... END`：存储过程的主体开始和结束。

下面是这段代码的解释：

1. `DROP PROCEDURE IF EXISTS proc_adder;`：如果存在名为 `proc_adder` 的存储过程，则删除它。
2. `DELIMITER ;;`：将语句分隔符设置为 `;;`，这样在存储过程中可以使用分号（`;`）。
3. `CREATE DEFINER=root@localhost PROCEDURE proc_adder(IN a int, IN b int, OUT sum int)`：创建名为 `proc_adder` 的存储过程，该存储过程接受两个输入参数 `a` 和 `b`，以及一个输出参数 `sum`。
4. `BEGIN ... END`：存储过程的主体开始和结束。
5. `DECLARE c int;`：声明一个局部变量 `c`，用于存储计算结果。
6. `if a is null then set a = 0; end if;` 和 `if b is null then set b = 0; end if;`：如果输入参数 `a` 或 `b` 为 `NULL`，则将其设置为 `0`。
7. `set sum = a + b;`：计算输入参数 `a` 和 `b` 的和，并将结果存储在输出参数 `sum` 中。
8. `DELIMITER ;`：将语句分隔符设置回默认值 `;`。

### 使用存储过程

`call proc_adder()`

```less
set @b=5;
call proc_adder(2,@b,@s);
select @s as sum;
```

## 游标 CURSOR

游标（cursor）是一个存储在 DBMS 服务器上的数据库查询，它不是一条 `SELECT` 语句，而是被该语句检索出来的结果集。

在存储过程中使用游标可以对一个结果集进行移动遍历。

游标主要用于交互式应用，其中用户需要滚动屏幕上的数据，并对数据进行浏览或做出更改。

使用游标的几个明确步骤：

- 在使用游标前，必须声明(定义)它。这个过程实际上没有检索数据， 它只是定义要使用的 `SELECT` 语句和游标选项。

- 一旦声明，就必须打开游标以供使用。这个过程用前面定义的 SELECT 语句把数据实际检索出来。

- 对于填有数据的游标，根据需要取出(检索)各行。

- 在结束游标使用时，必须关闭游标，可能的话，释放游标(有赖于具体的 DBMS)。

```sql
DELIMITER $
CREATE PROCEDURE getTotal()
BEGIN
	-- 创建总数变量
    DECLARE total INT;
    -- 创建接收游标数据的变量
    DECLARE sid INT;
    DECLARE sname VARCHAR(10);
    DECLARE sage INT;
    -- 创建结束标志变量
    DECLARE done INT DEFAULT false;
    -- 创建游标
    DECLARE cur CURSOR FOR SELECT id,name,age from cursor_table where age>30;
    -- 指定游标循环结束时的返回值
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = true;
    SET total = 0;
    OPEN cur;
    FETCH cur INTO sid, sname, sage;
    WHILE(NOT done)
    DO
        SET total = total + 1;
        FETCH cur INTO sid, sname, sage;
    END WHILE;

    CLOSE cur;
    SELECT total;
END $
DELIMITER ;

-- 调用存储过程
call getTotal();
```

这段 SQL 代码创建了一个名为 `getTotal` 的存储过程，该存储过程用于计算表 `cursor_table` 中年龄大于 30 的记录总数。

存储过程的主要逻辑如下：

- 首先，声明了一些变量，包括 `total`（用于存储记录总数）、`sid`、`sname`、`sage`（用于接收游标数据的变量）、`done`（用于标志游标循环是否结束）。
- 然后，声明了一个游标 `cur`，用于遍历表 `cursor_table` 中年龄大于 30 的记录。
- 使用 `DECLARE CONTINUE HANDLER FOR NOT FOUND` 声明了一个处理程序，用于在游标遍历结束时设置 `done` 标志为 true。
- 在循环中，逐行遍历游标，并将 `total` 变量递增。
- 最后，关闭游标，并且返回 `total` 变量的值。

`DELIMITER $` 和 `DELIMITER ;` 之间的部分用于设置自定义分隔符，以便在存储过程定义中使用多条 SQL 语句。在这个例子中，`$` 被用作新的分隔符，`DELIMITER ;` 用于将分隔符重置为默认值。

最后，通过 `call getTotal();` 来调用存储过程，计算并返回记录的总数。

## 触发器 TRIGGER

触发器是一种与表操作有关的数据库对象，当触发器所在表上出现指定事件时，将调用该对象，即表的操作事件触发表上的触发器的执行。

我们可以使用触发器来进行审计跟踪，把修改记录到另外一张表中。

使用触发器的优点：

- SQL 触发器提供了另一种检查数据完整性的方法。
- SQL 触发器可以捕获数据库层中业务逻辑中的错误。
- SQL 触发器提供了另一种运行计划任务的方法。通过使用 SQL 触发器，您不必等待运行计划任务，因为在对表中的数据进行更改之前或之后会自动调用触发器。
- SQL 触发器对于审计表中数据的更改非常有用。

使用触发器的缺点：

- SQL 触发器只能提供扩展验证，并且不能替换所有验证。必须在应用程序层中完成一些简单的验证。例如，您可以使用 JavaScript 在客户端验证用户的输入，或者使用服务器端脚本语言（如 JSP，PHP，[ASP.NET](http://ASP.NET)，Perl）在服务器端验证用户的输入。
- 从客户端应用程序调用和执行 SQL 触发器是不可见的，因此很难弄清楚数据库层中发生了什么。
- SQL 触发器可能会增加数据库服务器的开销。

**MySQL 不允许在触发器中使用 CALL 语句 ，也就是不能调用存储过程**。

> 注意：在 MySQL 中，分号 `;` 是语句结束的标识符，遇到分号表示该段语句已经结束，MySQL 可以开始执行了。因此，解释器遇到触发器执行动作中的分号后就开始执行，然后会报错，因为没有找到和 BEGIN 匹配的 END。
>
> 这时就会用到 `DELIMITER` 命令（DELIMITER 是定界符，分隔符的意思）。它是一条命令，不需要语句结束标识，语法为：`DELIMITER new_delimiter`。`new_delimiter` 可以设为 1 个或多个长度的符号，默认的是分号 `;`，我们可以把它修改为其他符号，如 `$` - `DELIMITER $` 。在这之后的语句，以分号结束，解释器不会有什么反应，只有遇到了 `$`，才认为是语句结束。注意，使用完之后，我们还应该记得把它给修改回来。

在 MySQL 5.7.2 版之前，可以为每个表定义最多六个触发器。

- `BEFORE INSERT` - 在将数据插入表格之前激活。
- `AFTER INSERT` - 将数据插入表格后激活。
- `BEFORE UPDATE` - 在更新表中的数据之前激活。
- `AFTER UPDATE` - 更新表中的数据后激活。
- `BEFORE DELETE` - 在从表中删除数据之前激活。
- `AFTER DELETE` - 从表中删除数据后激活。

但是，从 MySQL 版本 5.7.2+开始，可以为同一触发事件和操作时间定义多个触发器。

**`NEW` 和 `OLD`**：

- MySQL 中定义了 `NEW` 和 `OLD` 关键字，用来表示触发器的所在表中，触发了触发器的那一行数据。
- 在 `INSERT` 型触发器中，`NEW` 用来表示将要（`BEFORE`）或已经（`AFTER`）插入的新数据；
- 在 `UPDATE` 型触发器中，`OLD` 用来表示将要或已经被修改的原数据，`NEW` 用来表示将要或已经修改为的新数据；
- 在 `DELETE` 型触发器中，`OLD` 用来表示将要或已经被删除的原数据；
- 使用方法：`NEW.columnName` （columnName 为相应数据表某一列名）

### 创建触发器

> 提示：为了理解触发器的要点，有必要先了解一下创建触发器的指令。

`CREATE TRIGGER` 指令用于创建触发器。

语法：

```sql
CREATE TRIGGER trigger_name
trigger_time
trigger_event
ON table_name
FOR EACH ROW
BEGIN
  trigger_statements
END;
```

说明：

- `trigger_name`：触发器名
- `trigger_time` : 触发器的触发时机。取值为 `BEFORE` 或 `AFTER`。
- `trigger_event` : 触发器的监听事件。取值为 `INSERT`、`UPDATE` 或 `DELETE`。
- `table_name` : 触发器的监听目标。指定在哪张表上建立触发器。
- `FOR EACH ROW`: 行级监视，Mysql 固定写法，其他 DBMS 不同。
- `trigger_statements`: 触发器执行动作。是一条或多条 SQL 语句的**列表**，**列表内的每条语句都必须用分号 `;` 来结尾**。

当触发器的触发条件满足时，将会执行 `BEGIN` 和 `END` 之间的触发器执行动作。

示例：

```sql
DELIMITER $
CREATE TRIGGER trigger_insert_user
AFTER INSERT ON user
FOR EACH ROW
BEGIN
    INSERT INTO user_history(user_id, operate_type, operate_time)
    VALUES (NEW.id, 'add a user',  now());
END $
DELIMITER ;
```

1. `DELIMITER $`: 这是 MySQL 中用于改变语句分隔符的语法。在这里，我们将分隔符更改为 `$`，以便在创建触发器时使用多个语句。
2. `CREATE TRIGGER trigger_insert_user`: 这是创建触发器的语法。`trigger_insert_user` 是触发器的名称。
3. `AFTER INSERT ON user`: 这是指定触发器应该在哪个事件发生后触发。在这种情况下，它是在 `user` 表插入新记录之后触发。
4. `FOR EACH ROW`: 这是触发器类型的一部分，指定触发器在每次受影响的行上执行。
5. `BEGIN` 和 `END`: 这是触发器体的开始和结束标记。在这之间是触发器的实际操作。
6. `INSERT INTO user_history`: 这是在触发器中执行的操作之一。它将一条新记录插入到 `user_history` 表中，记录了刚刚插入到 `user` 表中的新用户的相关信息。
7. `VALUES (NEW.id, 'add a user', now())`: 这是将插入到 `user_history` 表中的值。`NEW.id` 表示新插入的用户的 `id`，`'add a user'` 是操作类型，`now()` 是当前时间戳，表示操作发生的时间。
8. `DELIMITER ;`: 最后，将分隔符改回默认的分号。

### 查看触发器

```sql
SHOW TRIGGERS;
```

### 删除触发器

```sql
DROP TRIGGER IF EXISTS trigger_insert_user;
```

## 文章推荐

- [后端程序员必备：SQL 高性能优化指南！35+条优化建议立马 GET!](https://mp.weixin.qq.com/s/I-ZT3zGTNBZ6egS7T09jyQ)
- [后端程序员必备：书写高质量 SQL 的 30 条建议](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247486461&idx=1&sn=60a22279196d084cc398936fe3b37772&chksm=cea24436f9d5cd20a4fa0e907590f3e700d7378b3f608d7b33bb52cfb96f503b7ccb65a1deed&token=1987003517&lang=zh_CN#rd)

# SQL常见面试题总结（1）

> 题目来源于：[牛客题霸 - SQL 必知必会open in new window](https://www.nowcoder.com/exam/oj?page=1&tab=SQL篇&topicId=298)

## 检索数据 (SELECT)

`SELECT` 用于从数据库中查询数据。

### 从 Customers 表中检索所有的 ID

现有表 `Customers` 如下：

| cust_id |
| ------- |
| A       |
| B       |
| C       |

编写 SQL 语句，从 `Customers` 表中检索所有的 `cust_id`。

答案：

```sql
SELECT cust_id
FROM Customers
```

### 检索并列出已订购产品的清单

表 `OrderItems` 含有非空的列 `prod_id` 代表商品 id，包含了所有已订购的商品（有些已被订购多次）。

| prod_id |
| ------- |
| a1      |
| a2      |
| a3      |
| a4      |
| a5      |
| a6      |
| a7      |

编写 SQL 语句，检索并列出所有已订购商品（`prod_id`）的去重后的清单。

答案：

```sql
SELECT DISTINCT prod_id
FROM OrderItems
```

知识点：`DISTINCT` 用于返回列中的唯一不同值。

### 检索所有列

现在有 `Customers` 表（表中含有列 `cust_id` 代表客户 id，`cust_name` 代表客户姓名）

| cust_id | cust_name |
| ------- | --------- |
| a1      | andy      |
| a2      | ben       |
| a3      | tony      |
| a4      | tom       |
| a5      | an        |
| a6      | lee       |
| a7      | hex       |

需要编写 SQL 语句，检索所有列。

答案：

```sql
SELECT cust_id, cust_name
FROM Customers
```

## 排序检索数据 (ORDER BY)

`ORDER BY` 用于对结果集按照一个列或者多个列进行排序。默认按照升序对记录进行排序，如果需要按照降序对记录进行排序，可以使用 `DESC` 关键字。

### 检索顾客名称并且排序

有表 `Customers`：`cust_id` 代表客户 id，`cust_name` 代表客户姓名。

| cust_id | cust_name |
| ------- | --------- |
| a1      | andy      |
| a2      | ben       |
| a3      | tony      |
| a4      | tom       |
| a5      | an        |
| a6      | lee       |
| a7      | hex       |

从 `Customers` 中检索所有的顾客名称（`cust_name`），并按从 Z 到 A 的顺序显示结果。

答案：

```sql
SELECT cust_name
FROM Customers
ORDER BY cust_name DESC
```

### 对顾客 ID 和日期排序

有 `Orders` 表：

| cust_id | order_num | order_date          |
| ------- | --------- | ------------------- |
| andy    | aaaa      | 2021-01-01 00:00:00 |
| andy    | bbbb      | 2021-01-01 12:00:00 |
| bob     | cccc      | 2021-01-10 12:00:00 |
| dick    | dddd      | 2021-01-11 00:00:00 |

编写 SQL 语句，从 `Orders` 表中检索顾客 ID（`cust_id`）和订单号（`order_num`），并先按顾客 ID 对结果进行排序，再按订单日期倒序排列。

答案：

```sql
# 根据列名排序
# 注意：是 order_date 降序，而不是 order_num
SELECT cust_id, order_num
FROM Orders
ORDER BY cust_id,order_date DESC  // cust_id 默认 升序 AS 排序
```

知识点：`order by` 对多列排序的时候，先排序的列放前面，后排序的列放后面。并且，不同的列可以有不同的排序规则。

### 按照数量和价格排序

假设有一个 `OrderItems` 表：

| quantity | item_price |
| -------- | ---------- |
| 1        | 100        |
| 10       | 1003       |
| 2        | 500        |

编写 SQL 语句，显示 `OrderItems` 表中的数量（`quantity`）和价格（`item_price`），并按数量由多到少、价格由高到低排序。

答案：

```sql
SELECT quantity, item_price
FROM OrderItems
ORDER BY quantity DESC,item_price DESC
```

### 检查 SQL 语句

有 `Vendors` 表：

| vend_name |
| --------- |
| 海底捞    |
| 小龙坎    |
| 大龙燚    |

下面的 SQL 语句有问题吗？尝试将它改正确，使之能够正确运行，并且返回结果根据`vend_name` 逆序排列。

```sql
SELECT vend_name,
FROM Vendors
ORDER vend_name DESC
```

改正后：

```sql
SELECT vend_name
FROM Vendors
ORDER BY vend_name DESC
```

知识点：

- 逗号作用是用来隔开列与列之间的。
- ORDER BY 是有 BY 的，需要撰写完整，且位置正确。

## 过滤数据 (WHERE)

`WHERE` 可以过滤返回的数据。

下面的运算符可以在 `WHERE` 子句中使用：

| 运算符  | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| =       | 等于                                                         |
| <>      | 不等于。 **注释：** 在 SQL 的一些版本中，该操作符可被写成 != |
| >       | 大于                                                         |
| <       | 小于                                                         |
| >=      | 大于等于                                                     |
| <=      | 小于等于                                                     |
| BETWEEN | 在某个范围内                                                 |
| LIKE    | 搜索某种模式                                                 |
| IN      | 指定针对某个列的多个可能值                                   |

### 返回固定价格的产品

有表 `Products`：

| prod_id | prod_name      | prod_price |
| ------- | -------------- | ---------- |
| a0018   | sockets        | 9.49       |
| a0019   | iphone13       | 600        |
| b0018   | gucci t-shirts | 1000       |

【问题】从 `Products` 表中检索产品 ID（`prod_id`）和产品名称（`prod_name`），只返回价格为 9.49 美元的产品。

答案：

```sql
SELECT prod_id, prod_name
FROM Products
WHERE prod_price = 9.49
```

### 返回更高价格的产品

有表 `Products`：

| prod_id | prod_name      | prod_price |
| ------- | -------------- | ---------- |
| a0018   | sockets        | 9.49       |
| a0019   | iphone13       | 600        |
| b0019   | gucci t-shirts | 1000       |

【问题】编写 SQL 语句，从 `Products` 表中检索产品 ID（`prod_id`）和产品名称（`prod_name`），只返回价格为 9 美元或更高的产品。

答案：

```sql
SELECT prod_id, prod_name
FROM Products
WHERE prod_price >= 9
```

### 返回产品并且按照价格排序

有表 `Products`：

| prod_id | prod_name | prod_price |
| ------- | --------- | ---------- |
| a0011   | egg       | 3          |
| a0019   | sockets   | 4          |
| b0019   | coffee    | 15         |

【问题】编写 SQL 语句，返回 `Products` 表中所有价格在 3 美元到 6 美元之间的产品的名称（`prod_name`）和价格（`prod_price`），然后按价格对结果进行排序。

答案：

```sql
SELECT prod_name, prod_price
FROM Products
WHERE prod_price BETWEEN 3 AND 6
ORDER BY prod_price

# 或者
SELECT prod_name, prod_price
FROM Products
WHERE prod_price >= 3 AND prod_price <= 6
ORDER BY prod_price
```

### 返回更多的产品

`OrderItems` 表含有：订单号 `order_num`，`quantity`产品数量

| order_num | quantity |
| --------- | -------- |
| a1        | 105      |
| a2        | 1100     |
| a2        | 200      |
| a4        | 1121     |
| a5        | 10       |
| a2        | 19       |
| a7        | 5        |

【问题】从 `OrderItems` 表中检索出所有不同且不重复的订单号（`order_num`），其中每个订单都要包含 100 个或更多的产品。

答案：

```sql
SELECT order_num
FROM OrderItems
GROUP BY order_num
HAVING SUM(quantity) >= 100
```

## 高级数据过滤 (AND、OR)

`AND` 和 `OR` 运算符用于基于一个以上的条件对记录进行过滤，两者可以结合使用。`AND` 必须 2 个条件都成立，`OR`只要 2 个条件中的一个成立即可。

### 检索供应商名称

`Vendors` 表有字段供应商名称（`vend_name`）、供应商国家（`vend_country`）、供应商州（`vend_state`）

| vend_name | vend_country | vend_state |
| --------- | ------------ | ---------- |
| apple     | USA          | CA         |
| vivo      | CNA          | shenzhen   |
| huawei    | CNA          | xian       |

【问题】编写 SQL 语句，从 `Vendors` 表中检索供应商名称（`vend_name`），仅返回加利福尼亚州的供应商（这需要按国家[USA]和州[CA]进行过滤，没准其他国家也存在一个 CA）

答案：

```sql
SELECT vend_name
FROM Vendors
WHERE vend_country = 'USA' AND vend_state = 'CA'
```

### 检索并列出已订购产品的清单

`OrderItems` 表包含了所有已订购的产品（有些已被订购多次）。

| prod_id | order_num | quantity |
| ------- | --------- | -------- |
| BR01    | a1        | 105      |
| BR02    | a2        | 1100     |
| BR02    | a2        | 200      |
| BR03    | a4        | 1121     |
| BR017   | a5        | 10       |
| BR02    | a2        | 19       |
| BR017   | a7        | 5        |

【问题】编写 SQL 语句，查找所有订购了数量至少 100 个的 `BR01`、`BR02` 或 `BR03` 的订单。你需要返回 `OrderItems` 表的订单号（`order_num`）、产品 ID（`prod_id`）和数量（`quantity`），并按产品 ID 和数量进行过滤。

答案：

```sql
SELECT order_num, prod_id, quantity
FROM OrderItems
WHERE prod_id IN ('BR01', 'BR02', 'BR03') AND quantity >= 100
```

### 返回所有价格在 3 美元到 6 美元之间的产品的名称和价格

有表 `Products`：

| prod_id | prod_name | prod_price |
| ------- | --------- | ---------- |
| a0011   | egg       | 3          |
| a0019   | sockets   | 4          |
| b0019   | coffee    | 15         |

【问题】编写 SQL 语句，返回所有价格在 3 美元到 6 美元之间的产品的名称（`prod_name`）和价格（`prod_price`），使用 AND 操作符，然后按价格对结果进行升序排序。

答案：

```sql
SELECT prod_name, prod_price
FROM Products
WHERE prod_price >= 3 and prod_price <= 6
ORDER BY prod_price
```

### 检查 SQL 语句

供应商表 `Vendors` 有字段供应商名称 `vend_name`、供应商国家 `vend_country`、供应商省份 `vend_state`

| vend_name | vend_country | vend_state |
| --------- | ------------ | ---------- |
| apple     | USA          | CA         |
| vivo      | CNA          | shenzhen   |
| huawei    | CNA          | xian       |

【问题】修改正确下面 sql，使之正确返回。

```sql
SELECT vend_name
FROM Vendors
ORDER BY vend_name
WHERE vend_country = 'USA' AND vend_state = 'CA';
```

修改后：

```sql
SELECT vend_name
FROM Vendors
WHERE vend_country = 'USA' AND vend_state = 'CA'
ORDER BY vend_name
```

**`ORDER BY` 语句必须放在 `WHERE` 之后**。

## 用通配符进行过滤 (%、_、...)

SQL **通配符必须与 `LIKE` 运算符一起使用**

在 SQL 中，可使用以下通配符：

| 通配符                           | 描述                       |
| :------------------------------- | :------------------------- |
| `%`                              | 代表零个或多个任意字符     |
| `_`                              | 仅替代一个任意字符         |
| `[charlist]`                     | 字符列中的任何单一字符     |
| `[^charlist]` 或者 `[!charlist]` | 不在字符列中的任何单一字符 |

### 检索产品名称和描述（一）

`Products` 表如下：

| prod_name | prod_desc      |
| --------- | -------------- |
| a0011     | usb            |
| a0019     | iphone13       |
| b0019     | gucci t-shirts |
| c0019     | gucci toy      |
| d0019     | lego toy       |

【问题】编写 SQL 语句，从 `Products` 表中检索产品名称（`prod_name`）和描述（`prod_desc`），仅返回描述中包含 `toy` 一词的产品名称。

答案：

```sql
SELECT prod_name, prod_desc
FROM Products
WHERE prod_desc LIKE '%toy%'
```

### 检索产品名称和描述（二）

`Products` 表如下：

| prod_name | prod_desc      |
| --------- | -------------- |
| a0011     | usb            |
| a0019     | iphone13       |
| b0019     | gucci t-shirts |
| c0019     | gucci toy      |
| d0019     | lego toy       |

【问题】编写 SQL 语句，从 `Products` 表中检索产品名称（`prod_name`）和描述（`prod_desc`），仅返回描述中未出现 `toy` 一词的产品，最后按”产品名称“对结果进行排序。

答案：

```sql
SELECT prod_name, prod_desc
FROM Products
WHERE prod_desc NOT LIKE '%toy%'
ORDER BY prod_name
```

### 检索产品名称和描述（三）

`Products` 表如下：

| prod_name | prod_desc        |
| --------- | ---------------- |
| a0011     | usb              |
| a0019     | iphone13         |
| b0019     | gucci t-shirts   |
| c0019     | gucci toy        |
| d0019     | lego carrots toy |

【问题】编写 SQL 语句，从 `Products` 表中检索产品名称（`prod_name`）和描述（`prod_desc`），仅返回描述中同时出现 `toy` 和 `carrots` 的产品。有好几种方法可以执行此操作，但对于这个挑战题，请使用 `AND` 和两个 `LIKE` 比较。

答案：

```sql
SELECT prod_name, prod_desc
FROM Products
WHERE prod_desc LIKE '%toy%' AND prod_desc LIKE "%carrots%"
```

### 检索产品名称和描述（四）

`Products` 表如下：

| prod_name | prod_desc        |
| --------- | ---------------- |
| a0011     | usb              |
| a0019     | iphone13         |
| b0019     | gucci t-shirts   |
| c0019     | gucci toy        |
| d0019     | lego toy carrots |

【问题】编写 SQL 语句，从 Products 表中检索产品名称（prod_name）和描述（prod_desc），仅返回在描述中以**先后顺序**同时出现 toy 和 carrots 的产品。提示：只需要用带有三个 `%` 符号的 `LIKE` 即可。

答案：

```sql
SELECT prod_name, prod_desc
FROM Products
WHERE prod_desc LIKE '%toy%carrots%'
```

## 创建计算字段 (别名 AS)

### 别名

别名的常见用法是在检索出的结果中重命名表的列字段（为了符合特定的报表要求或客户需求）。有表 `Vendors` 代表供应商信息，`vend_id` 供应商 id、`vend_name` 供应商名称、`vend_address` 供应商地址、`vend_city` 供应商城市。

**`AS` 关键字**

| vend_id | vend_name     | vend_address | vend_city |
| ------- | ------------- | ------------ | --------- |
| a001    | tencent cloud | address1     | shenzhen  |
| a002    | huawei cloud  | address2     | dongguan  |
| a003    | aliyun cloud  | address3     | hangzhou  |
| a003    | netease cloud | address4     | guangzhou |

【问题】编写 SQL 语句，从 `Vendors` 表中检索 `vend_id`、`vend_name`、`vend_address` 和 `vend_city`，将 `vend_name` 重命名为 `vname`，将 `vend_city` 重命名为 `vcity`，将 `vend_address` 重命名为 `vaddress`，按供应商名称对结果进行升序排序。

答案：

```sql
SELECT vend_id, vend_name AS vname, vend_address AS vaddress, vend_city AS vcity
FROM Vendors
ORDER BY vname
# as 可以省略
SELECT vend_id, vend_name vname, vend_address vaddress, vend_city vcity
FROM Vendors
ORDER BY vname
```

### 打折

我们的示例商店正在进行打折促销，所有产品均降价 10%。`Products` 表包含 `prod_id` 产品 id、`prod_price` 产品价格。

【问题】编写 SQL 语句，从 `Products` 表中返回 `prod_id`、`prod_price` 和 `sale_price`。`sale_price` 是一个包含促销价格的**计算字段**。提示：可以乘以 0.9，得到原价的 90%（即 10%的折扣）。

答案：

```sql
SELECT prod_id, prod_price, prod_price * 0.9 AS sale_price
FROM Products
```

注意：`sale_price` 是对计算结果的命名，而不是原有的列名。

## 使用函数处理数据

### 顾客登录名

我们的商店已经上线了，正在创建顾客账户。所有用户都需要登录名，默认登录名是其名称和所在城市的组合。

给出 `Customers` 表 如下：

| cust_id | cust_name | cust_contact | cust_city |
| ------- | --------- | ------------ | --------- |
| a1      | Andy Li   | Andy Li      | Oak Park  |
| a2      | Ben Liu   | Ben Liu      | Oak Park  |
| a3      | Tony Dai  | Tony Dai     | Oak Park  |
| a4      | Tom Chen  | Tom Chen     | Oak Park  |
| a5      | An Li     | An Li        | Oak Park  |
| a6      | Lee Chen  | Lee Chen     | Oak Park  |
| a7      | Hex Liu   | Hex Liu      | Oak Park  |

【问题】编写 SQL 语句，返回顾客 ID（`cust_id`）、顾客名称（`cust_name`）和登录名（`user_login`），其中登录名全部为大写字母，并由顾客联系人的前两个字符（`cust_contact`）和其所在城市的前三个字符（`cust_city`）组成。提示：需要使用函数、拼接和别名。

答案：

```sql
SELECT cust_id, cust_name, UPPER(CONCAT(SUBSTRING(cust_contact, 1, 2), SUBSTRING(cust_city, 1, 3))) AS user_login
FROM Customers
```

知识点：

- **截取函数`SUBSTRING()`**：截取字符串，`substring(str ,n ,m)`（n 表示**起始截取位置（从1开始）**，m 表示要截取的字符个数）表示返回字符串 str 从第 n 个字符开始截取 m 个字符；
- **拼接函数`CONCAT()`**：将两个或多个字符串连接成一个字符串，select concat(A,B)：连接字符串 A 和 B。
- **大写函数 `UPPER()`**：将指定字符串转换为大写。

### 返回 2020 年 1 月的所有订单的订单号和订单日期

`Orders` 订单表如下：

| order_num | order_date          |
| --------- | ------------------- |
| a0001     | 2020-01-01 00:00:00 |
| a0002     | 2020-01-02 00:00:00 |
| a0003     | 2020-01-01 12:00:00 |
| a0004     | 2020-02-01 00:00:00 |
| a0005     | 2020-03-01 00:00:00 |

【问题】编写 SQL 语句，返回 2020 年 1 月的所有订单的订单号（`order_num`）和订单日期（`order_date`），并按订单日期升序排序

答案：

```sql
SELECT order_num, order_date
FROM Orders
WHERE month(order_date) = '01' AND YEAR(order_date) = '2020'
ORDER BY order_date
```

也可以用通配符来做：

```sql
SELECT order_num, order_date
FROM Orders
WHERE order_date LIKE '2020-01%'
ORDER BY order_date
```

知识点：

- 日期格式：`YYYY-MM-DD`
- 时间格式：`HH:MM:SS`

日期和时间处理相关的常用函数：

| 函 数           | 说 明                          |
| --------------- | ------------------------------ |
| `ADDDATE()`     | 增加一个日期（天、周等）       |
| `ADDTIME()`     | 增加一个时间（时、分等）       |
| `CURDATE()`     | 返回当前日期                   |
| `CURTIME()`     | 返回当前时间                   |
| `DATE()`        | 返回日期时间的日期部分         |
| `DATEDIFF`      | 计算两个日期之差               |
| `DATE_FORMAT()` | 返回一个格式化的日期或时间串   |
| `DAY()`         | 返回一个日期的天数部分         |
| `DAYOFWEEK()`   | 对于一个日期，返回对应的星期几 |
| `HOUR()`        | 返回一个时间的小时部分         |
| `MINUTE()`      | 返回一个时间的分钟部分         |
| `MONTH()`       | 返回一个日期的月份部分         |
| `NOW()`         | 返回当前日期和时间             |
| `SECOND()`      | 返回一个时间的秒部分           |
| `TIME()`        | 返回一个日期时间的时间部分     |
| `YEAR()`        | 返回一个日期的年份部分         |

## 汇总数据 (COUNT()...)

汇总数据相关的函数：

| 函 数     | 说 明              |
| --------- | ------------------ |
| `AVG()`   | 返回某列的平均值   |
| `COUNT()` | 返回**某列的行数** |
| `MAX()`   | 返回某列的最大值   |
| `MIN()`   | 返回某列的最小值   |
| `SUM()`   | 返回某列值之和     |

### 确定已售出产品的总数

`OrderItems` 表代表售出的产品，`quantity` 代表售出商品数量。

| quantity |
| -------- |
| 10       |
| 100      |
| 1000     |
| 10001    |
| 2        |
| 15       |

【问题】编写 SQL 语句，确定已售出产品的总数。

答案：

```sql
SELECT Sum(quantity) AS items_ordered
FROM OrderItems
```

### 确定已售出产品项 BR01 的总数

`OrderItems` 表代表售出的产品，`quantity` 代表售出商品数量，产品项为 `prod_id`。

| quantity | prod_id |
| -------- | ------- |
| 10       | AR01    |
| 100      | AR10    |
| 1000     | BR01    |
| 10001    | BR01    |

【问题】修改创建的语句，确定已售出产品项（`prod_id`）为"BR01"的总数。

答案：

```sql
SELECT Sum(quantity) AS items_ordered
FROM OrderItems
WHERE prod_id = 'BR01'
```

### 确定 Products 表中价格不超过 10 美元的最贵产品的价格

`Products` 表如下，`prod_price` 代表商品的价格。

| prod_price |
| ---------- |
| 9.49       |
| 600        |
| 1000       |

【问题】编写 SQL 语句，确定 `Products` 表中价格不超过 10 美元的最贵产品的价格（`prod_price`）。将计算所得的字段命名为 `max_price`。

答案：

```sql
SELECT Max(prod_price) AS max_price
FROM Products
WHERE prod_price <= 10
```

## 分组数据 (GROUP BY)

`GROUP BY`：

- `GROUP BY` 子句将记录分组到汇总行中。
- `GROUP BY` 为每个组返回一个记录。
- `GROUP BY` 通常还涉及聚合`COUNT`，`MAX`，`SUM`，`AVG` 等。
- `GROUP BY` 可以按一列或多列进行分组。
- `GROUP BY` 按分组字段进行排序后，`ORDER BY` 可以以汇总字段来进行排序。

`HAVING`：

- `HAVING` 用于对汇总的 `GROUP BY` 结果进行过滤。
- `HAVING` 必须要与 `GROUP BY` 连用。
- `WHERE` 和 `HAVING` 可以在相同的查询中。

`HAVING` vs `WHERE`：

- `WHERE`：过滤指定的行，后面不能加聚合函数（分组函数）。
- `HAVING`：过滤分组，必须要与 `GROUP BY` 连用，不能单独使用。

### 返回每个订单号各有多少行数

`OrderItems` 表包含每个订单的每个产品

| order_num |
| --------- |
| a002      |
| a002      |
| a002      |
| a004      |
| a007      |

【问题】编写 SQL 语句，返回每个订单号（`order_num`）各有多少行数（`order_lines`），并按 `order_lines` 对结果进行升序排序。

答案：

```sql
SELECT order_num, Count(order_num) AS order_lines
FROM OrderItems
GROUP BY order_num
ORDER BY order_lines
```

知识点：

1. **`count(*)`,`count(列名)`都可以，区别在于，`count(列名)`是统计非 NULL 的行数**；
2. **`order by` 最后执行，所以可以使用列别名**；
3. **分组聚合一定不要忘记加上 `group by` ,不然只会有一行结果**。

### 每个供应商成本最低的产品

有 `Products` 表，含有字段 `prod_price` 代表产品价格，`vend_id` 代表供应商 id

| vend_id | prod_price |
| ------- | ---------- |
| a0011   | 100        |
| a0019   | 0.1        |
| b0019   | 1000       |
| b0019   | 6980       |
| b0019   | 20         |

【问题】编写 SQL 语句，返回名为 `cheapest_item` 的字段，该字段包含每个供应商成本最低的产品（使用 `Products` 表中的 `prod_price`），然后从最低成本到最高成本对结果进行升序排序。

答案：

```sql
SELECT vend_id, Min(prod_price) AS cheapest_item
FROM Products
GROUP BY vend_id
ORDER BY cheapest_item
```

### 返回订单数量总和不小于 100 的所有订单的订单号

`OrderItems` 代表订单商品表，包括：订单号 `order_num` 和订单数量 `quantity`。

| order_num | quantity |
| --------- | -------- |
| a1        | 105      |
| a2        | 1100     |
| a2        | 200      |
| a4        | 1121     |
| a5        | 10       |
| a2        | 19       |
| a7        | 5        |

【问题】请编写 SQL 语句，返回订单数量总和不小于 100 的所有订单号，最后结果按照订单号升序排序。

答案：

```sql
# 直接聚合  GROUP BY 与 HAVING 连用
SELECT order_num
FROM OrderItems
GROUP BY order_num
HAVING Sum(quantity) >= 100
ORDER BY order_num

# 子查询
SELECT a.order_num
FROM (SELECT order_num, Sum(quantity) AS sum_num
    FROM OrderItems
    GROUP BY order_num
    HAVING sum_num >= 100) a
ORDER BY a.order_num
```

知识点：

- **`where`：过滤指定的行，后面不能加聚合函数（分组函数）**。
- **`having`：过滤分组，与 `group by` 连用，不能单独使用**。
- a 是子查询结果的**别名**，如果不省略 AS ： (...) AS a 。

### 计算总和

`OrderItems` 表代表订单信息，包括字段：订单号 `order_num` 和 `item_price` 商品售出价格、`quantity` 商品数量。

| order_num | item_price | quantity |
| --------- | ---------- | -------- |
| a1        | 10         | 105      |
| a2        | 1          | 1100     |
| a2        | 1          | 200      |
| a4        | 2          | 1121     |
| a5        | 5          | 10       |
| a2        | 1          | 19       |
| a7        | 7          | 5        |

【问题】编写 SQL 语句，根据订单号聚合，返回订单总价不小于 1000 的所有订单号，最后的结果按订单号进行升序排序。

提示：总价 = item_price 乘以 quantity

答案：

```sql
SELECT order_num, Sum(item_price * quantity) AS total_price
FROM OrderItems
GROUP BY order_num
HAVING total_price >= 1000
ORDER BY order_num
```

### 检查 SQL 语句

`OrderItems` 表含有 `order_num` 订单号

| order_num |
| --------- |
| a002      |
| a002      |
| a002      |
| a004      |
| a007      |

【问题】将下面代码修改正确后执行

```sql
SELECT order_num, COUNT(*) AS items
FROM OrderItems
GROUP BY items
HAVING COUNT(*) >= 3
ORDER BY items, order_num;
```

修改后：

```sql
SELECT order_num, COUNT(*) AS items
FROM OrderItems
GROUP BY order_num
HAVING items >= 3
ORDER BY items, order_num;
```

## 使用子查询

子查询是嵌套在较大查询中的 SQL 查询，也称内部查询或内部选择，包含子查询的语句也称为外部查询或外部选择。简单来说，子查询就是指将一个 `SELECT` 查询（子查询）的结果作为另一个 SQL 语句（主查询）的数据来源或者判断条件。

子查询可以嵌入 `SELECT`、`INSERT`、`UPDATE` 和 `DELETE` 语句中，也可以和 `=`、`<`、`>`、`IN`、`BETWEEN`、`EXISTS` 等运算符一起使用。

子查询常用在 `WHERE` 子句和 `FROM` 子句后边：

- 当用于 `WHERE` 子句时，根据不同的运算符，子查询可以返回单行单列、多行单列、单行多列数据。子查询就是要返回能够作为 WHERE 子句查询条件的值。
- 当用于 `FROM` 子句时，一般返回多行多列数据，相当于返回一张临时表，这样才符合 `FROM` 后面是表的规则。这种做法能够实现多表联合查询。

> 注意：MySQL 数据库从 4.1 版本才开始支持子查询，早期版本是不支持的。

用于 `WHERE` 子句的子查询的基本语法如下：

```sql
SELECT column_name [, column_name ]
FROM table1 [, table2 ]
WHERE column_name operator
(SELECT column_name [, column_name ]
FROM table1 [, table2 ]
[WHERE])
```

- 子查询需要放在括号`( )`内。
- `operator` 表示用于 `WHERE` 子句的运算符，可以是比较运算符（如 `=`, `<`, `>`, `<>` 等）或逻辑运算符（如 `IN`, `NOT IN`, `EXISTS`, `NOT EXISTS` 等），具体根据需求来确定。

用于 `FROM` 子句的子查询的基本语法如下：

```sql
SELECT column_name [, column_name ]
FROM (SELECT column_name [, column_name ]
      FROM table1 [, table2 ]
      [WHERE]) AS temp_table_name [, ...]
[JOIN type JOIN table_name ON condition]
WHERE condition;
```

- 用于 `FROM` 的子查询返回的结果相当于一张临时表，所以需要**使用 AS 关键字为该临时表起一个名字**。
- 子查询需要**放在括号 `( )` 内**。
- 可以指定多个临时表名，并**使用 `JOIN` 语句连接**这些表。

### 返回购买价格为 10 美元或以上产品的顾客列表

`OrderItems` 表示订单商品表，含有字段订单号：`order_num`、订单价格：`item_price`；

`Orders` 表代表订单信息表，含有顾客 `id：cust_id` 和订单号：`order_num`。

`OrderItems` 表:

| order_num | item_price |
| --------- | ---------- |
| a1        | 10         |
| a2        | 1          |
| a2        | 1          |
| a4        | 2          |
| a5        | 5          |
| a2        | 1          |
| a7        | 7          |

`Orders` 表：

| order_num | cust_id |
| --------- | ------- |
| a1        | cust10  |
| a2        | cust1   |
| a2        | cust1   |
| a4        | cust2   |
| a5        | cust5   |
| a2        | cust1   |
| a7        | cust7   |

【问题】使用子查询，返回购买价格为 10 美元或以上产品的顾客列表，结果无需排序。

答案：

```sql
SELECT cust_id
FROM Orders
WHERE order_num IN (SELECT DISTINCT order_num
    FROM OrderItems
    where item_price >= 10)
```

### 确定哪些订单购买了 prod_id 为 BR01 的产品（一）

表 `OrderItems` 代表订单商品信息表，`prod_id` 为产品 id；

`Orders` 表代表订单表有 `cust_id` 代表顾客 id 和订单日期 `order_date`

`OrderItems` 表：

| prod_id | order_num |
| ------- | --------- |
| BR01    | a0001     |
| BR01    | a0002     |
| BR02    | a0003     |
| BR02    | a0013     |

`Orders` 表：

| order_num | cust_id | order_date          |
| --------- | ------- | ------------------- |
| a0001     | cust10  | 2022-01-01 00:00:00 |
| a0002     | cust1   | 2022-01-01 00:01:00 |
| a0003     | cust1   | 2022-01-02 00:00:00 |
| a0013     | cust2   | 2022-01-01 00:20:00 |

【问题】

编写 SQL 语句，使用子查询来确定哪些订单（在 `OrderItems` 中）购买了 `prod_id` 为 "BR01" 的产品，然后从 `Orders` 表中返回每个产品对应的顾客 ID（`cust_id`）和订单日期（`order_date`），按订购日期对结果进行升序排序。

答案：

```sql
# 写法 1：子查询
SELECT cust_id,order_date
FROM Orders
WHERE order_num IN
    (SELECT order_num
     FROM OrderItems
     WHERE prod_id = 'BR01' )
ORDER BY order_date;

# 写法 2: 连接表（隐式连接）
SELECT b.cust_id, b.order_date
FROM OrderItems a,Orders b  # 省略了 AS
WHERE a.order_num = b.order_num AND a.prod_id = 'BR01'
ORDER BY order_date
```

### 返回购买 prod_id 为 BR01 的产品的所有顾客的电子邮件（一）

你想知道订购 BR01 产品的日期，有表 `OrderItems` 代表订单商品信息表，`prod_id` 为产品 id；

`Orders` 表代表订单表有 `cust_id` 代表顾客 id 和订单日期 `order_date`；

`Customers` 表含有 `cust_email` 顾客邮件和 `cust_id` 顾客 id

`OrderItems` 表：

| prod_id | order_num |
| ------- | --------- |
| BR01    | a0001     |
| BR01    | a0002     |
| BR02    | a0003     |
| BR02    | a0013     |

`Orders` 表：

| order_num | cust_id | order_date          |
| --------- | ------- | ------------------- |
| a0001     | cust10  | 2022-01-01 00:00:00 |
| a0002     | cust1   | 2022-01-01 00:01:00 |
| a0003     | cust1   | 2022-01-02 00:00:00 |
| a0013     | cust2   | 2022-01-01 00:20:00 |

`Customers` 表代表顾客信息，`cust_id` 为顾客 id，`cust_email` 为顾客 email

| cust_id | cust_email                                |
| ------- | ----------------------------------------- |
| cust10  | [cust10@cust.com](mailto:cust10@cust.com) |
| cust1   | [cust1@cust.com](mailto:cust1@cust.com)   |
| cust2   | [cust2@cust.com](mailto:cust2@cust.com)   |

【问题】返回购买 `prod_id` 为 `BR01` 的产品的所有顾客的电子邮件（`Customers` 表中的 `cust_email`），结果无需排序。

提示：这涉及 `SELECT` 语句，最内层的从 `OrderItems` 表返回 `order_num`，中间的从 `Customers` 表返回 `cust_id`。

答案：

```sql
# 写法 1：子查询
SELECT cust_email
FROM Customers
WHERE cust_id IN (SELECT cust_id
    FROM Orders
    WHERE order_num IN (SELECT order_num
        FROM OrderItems
        WHERE prod_id = 'BR01'))

# 写法 2: 连接表（inner join）
SELECT c.cust_email
FROM OrderItems a,Orders b,Customers c
WHERE a.order_num = b.order_num AND b.cust_id = c.cust_id AND a.prod_id = 'BR01'

# 写法 3：连接表（left join）
SELECT c.cust_email
FROM Orders a LEFT JOIN
  OrderItems b ON a.order_num = b.order_num LEFT JOIN
  Customers c ON a.cust_id = c.cust_id
WHERE b.prod_id = 'BR01'
```

解释以下 写法 3：连接表（left join）

- `SELECT c.cust_email`：这部分指定了你要返回的结果，即客户的电子邮件地址。
- `FROM Orders a`：这部分指定了查询的主要表为 `Orders` 表，并使用别名 `a`。
- `LEFT JOIN OrderItems b ON a.order_num = b.order_num`：这部分是左连接，将 `Orders` 表与 `OrderItems` 表进行连接，连接条件是订单号（`order_num`）。别名 `b` 用于引用 `OrderItems` 表。
- `LEFT JOIN Customers c ON a.cust_id = c.cust_id`：这部分是另一个左连接，将 `Orders` 表与 `Customers` 表进行连接，连接条件是客户ID（`cust_id`）。别名 `c` 用于引用 `Customers` 表。
- `WHERE b.prod_id = 'BR01'`：这部分是筛选条件，它限制了只返回产品ID为 'BR01' 的订单项。这样，只有购买了产品 'BR01' 的订单才会被包括在结果中。

### 返回每个顾客不同订单的总金额

我们需要一个顾客 ID 列表，其中包含他们已订购的总金额。

`OrderItems` 表代表订单信息，`OrderItems` 表有订单号：`order_num` 和商品售出价格：`item_price`、商品数量：`quantity`。

| order_num | item_price | quantity |
| --------- | ---------- | -------- |
| a0001     | 10         | 105      |
| a0002     | 1          | 1100     |
| a0002     | 1          | 200      |
| a0013     | 2          | 1121     |
| a0003     | 5          | 10       |
| a0003     | 1          | 19       |
| a0003     | 7          | 5        |

`Orders` 表订单号：`order_num`、顾客 id：`cust_id`

| order_num | cust_id |
| --------- | ------- |
| a0001     | cust10  |
| a0002     | cust1   |
| a0003     | cust1   |
| a0013     | cust2   |

【问题】

编写 SQL 语句，返回顾客 ID（`Orders` 表中的 `cust_id`），并使用子查询返回 `total_ordered` 以便返回每个顾客的订单总数，将结果按金额从大到小排序。

答案：

```sql
# 写法 1：子查询
SELECT o.cust_id AS cust_id, tb.total_ordered AS total_ordered
FROM (SELECT order_num, Sum(item_price * quantity) AS total_ordered
    FROM OrderItems
    GROUP BY order_num) AS tb,
  Orders o
WHERE tb.order_num = o.order_num
ORDER BY total_ordered DESC

# 写法 2：连接表
SELECT b.cust_id, Sum(a.quantity * a.item_price) AS total_ordered
FROM OrderItems a,Orders b
WHERE a.order_num = b.order_num
GROUP BY cust_id
ORDER BY total_ordered DESC
```

### 从 Products 表中检索所有的产品名称以及对应的销售总数

`Products` 表中检索所有的产品名称：`prod_name`、产品 id：`prod_id`。

| prod_id | prod_name |
| ------- | --------- |
| a0001   | egg       |
| a0002   | sockets   |
| a0013   | coffee    |
| a0003   | cola      |

`OrderItems` 代表订单商品表，订单产品：`prod_id`、售出数量：`quantity`

| prod_id | quantity |
| ------- | -------- |
| a0001   | 105      |
| a0002   | 1100     |
| a0002   | 200      |
| a0013   | 1121     |
| a0003   | 10       |
| a0003   | 19       |
| a0003   | 5        |

【问题】

编写 SQL 语句，从 `Products` 表中检索所有的产品名称（`prod_name`），以及名为 `quant_sold` 的计算列，其中包含所售产品的总数（在 `OrderItems` 表上使用子查询和 `SUM(quantity)` 检索）。

答案：

```sql
# 写法 1：子查询
SELECT p.prod_name, tb.quant_sold
FROM (SELECT prod_id, Sum(quantity) AS quant_sold
    FROM OrderItems
    GROUP BY prod_id) AS tb,
  Products p
WHERE tb.prod_id = p.prod_id

# 写法 2：连接表
SELECT p.prod_name, Sum(o.quantity) AS quant_sold
FROM Products p,
  OrderItems o
WHERE p.prod_id = o.prod_id
GROUP BY p.prod_name  #（这里不能用 p.prod_id，会报错）
```

## 连接表 (JOIN)

JOIN 是“连接”的意思，顾名思义，SQL  JOIN 子句用于将两个或者多个表联合起来进行查询。

连接表时需要在每个表中选择一个字段，并对这些字段的值进行比较，值相同的两条记录将合并为一条。**连接表的本质就是将不同表的记录合并起来，形成一张新表。当然，这张新表只是临时的，它仅存在于本次查询期间**。

使用 `JOIN` 连接两个表的基本语法如下：

```sql
SELECT table1.column1, table2.column2...
FROM table1
JOIN table2
ON table1.common_column1 = table2.common_column2;
```

`table1.common_column1 = table2.common_column2` 是连接条件，只有满足此条件的记录才会合并为一行。您可以使用多个运算符来连接表，例如 =、>、<、<>、<=、>=、!=、`between`、`like` 或者 `not`，但是最常见的是使用 =。

当两个表中有同名的字段时，为了帮助数据库引擎区分是哪个表的字段，在**书写同名字段名时需要加上表名**。当然，如果书写的字段名在两个表中是唯一的，也可以不使用以上格式，只写字段名即可。

另外，如果**两张表的关联字段名相同**，也可以使用 `USING`子句来代替 `ON`，举个例子：

```sql
# join....on
SELECT c.cust_name, o.order_num
FROM Customers c
INNER JOIN Orders o
ON c.cust_id = o.cust_id
ORDER BY c.cust_name

# 如果两张表的关联字段名相同，也可以使用USING子句：JOIN....USING()
SELECT c.cust_name, o.order_num
FROM Customers c
INNER JOIN Orders o
USING(cust_id)
ORDER BY c.cust_name
```

**`ON` 和 `WHERE` 的区别**：

- 连接表时，SQL 会根据连接条件生成一张新的临时表。`ON` 就是**连接条件**，它决定临时表的生成。
- `WHERE` 是在临时表生成以后，再对临时表中的数据进行过滤，生成最终的结果集，这个时候已经没有 JOIN-ON 了。

所以总结来说就是：**SQL 先根据 ON 生成一张临时表，然后再根据 WHERE 对临时表进行筛选**。

SQL 允许在 `JOIN` 左边加上一些修饰性的关键词，从而形成不同类型的连接，如下表所示：

| 连接类型                                 | 说明                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| INNER JOIN 内连接                        | （默认连接方式）只有当两个表都存在满足条件的记录时才会返回行。 |
| LEFT JOIN / LEFT OUTER JOIN 左(外)连接   | 返回左表中的所有行，即使右表中没有满足条件的行也是如此。     |
| RIGHT JOIN / RIGHT OUTER JOIN 右(外)连接 | 返回右表中的所有行，即使左表中没有满足条件的行也是如此。     |
| FULL JOIN / FULL OUTER JOIN 全(外)连接   | 只要其中有一个表存在满足条件的记录，就返回行。               |
| SELF JOIN                                | 将一个表连接到自身，就像该表是两个表一样。为了区分两个表，在 SQL 语句中需要至少重命名一个表。 |
| CROSS JOIN                               | 交叉连接，从两个或者多个连接表中返回记录集的笛卡尔积。       |

下图展示了 LEFT JOIN、RIGHT JOIN、INNER JOIN、OUTER JOIN 相关的 7 种用法。

<img src="images\d1794312b448516831369f869814ab39.png" style="zoom: 80%;" />

如果不加任何修饰词，只写 `JOIN`，那么默认为 `INNER JOIN`

对于 `INNER JOIN` 来说，还有一种隐式的写法，称为 “**隐式内连接**”，也就是没有 `INNER JOIN` 关键字，使用 `WHERE` 语句实现内连接的功能

```sql
# 隐式内连接
SELECT c.cust_name, o.order_num
FROM Customers c,Orders o
WHERE c.cust_id = o.cust_id
ORDER BY c.cust_name

# 显式内连接
SELECT c.cust_name, o.order_num
FROM Customers c
INNER JOIN Orders o
USING(cust_id)
ORDER BY c.cust_name;
```

### 返回顾客名称和相关订单号

`Customers` 表有字段顾客名称 `cust_name`、顾客 id `cust_id`

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |

`Orders` 订单信息表，含有字段 `order_num` 订单号、`cust_id` 顾客 id

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

【问题】编写 SQL 语句，返回 `Customers` 表中的顾客名称（`cust_name`）和 `Orders` 表中的相关订单号（`order_num`），并按顾客名称再按订单号对结果进行升序排序。你可以尝试用两个不同的写法，一个使用简单的等连接语法，另外一个使用 INNER JOIN。

答案：

```sql
# 隐式内连接
SELECT c.cust_name, o.order_num
FROM Customers c,Orders o
WHERE c.cust_id = o.cust_id
ORDER BY c.cust_name,o.order_num

# 显式内连接
SELECT c.cust_name, o.order_num
FROM Customers c
INNER JOIN Orders o
USING(cust_id)
ORDER BY c.cust_name,o.order_num;
```

### 🌟返回顾客名称和相关订单号以及每个订单的总价

`Customers` 表有字段，顾客名称：`cust_name`、顾客 id：`cust_id`

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |

`Orders` 订单信息表，含有字段，订单号：`order_num`、顾客 id：`cust_id`

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

`OrderItems` 表有字段，商品订单号：`order_num`、商品数量：`quantity`、商品价格：`item_price`

| order_num | quantity | item_price |
| --------- | -------- | ---------- |
| a1        | 1000     | 10         |
| a2        | 200      | 10         |
| a3        | 10       | 15         |
| a4        | 25       | 50         |
| a5        | 15       | 25         |
| a7        | 7        | 7          |

【问题】除了返回顾客名称和订单号，返回 `Customers` 表中的顾客名称（`cust_name`）和 `Orders` 表中的相关订单号（`order_num`），添加第三列 `OrderTotal`，其中包含每个订单的总价，并按顾客名称再按订单号对结果进行升序排序。

```sql
# 简单的等连接语法
SELECT c.cust_name, o.order_num, SUM(quantity * item_price) AS OrderTotal
FROM Customers c,Orders o,OrderItems oi
WHERE c.cust_id = o.cust_id AND o.order_num = oi.order_num
GROUP BY c.cust_name, o.order_num
ORDER BY c.cust_name, o.order_num
```

注意，可能有小伙伴会这样写：

```sql
SELECT c.cust_name, o.order_num, SUM(quantity * item_price) AS OrderTotal
FROM Customers c,Orders o,OrderItems oi
WHERE c.cust_id = o.cust_id AND o.order_num = oi.order_num
GROUP BY c.cust_name
ORDER BY c.cust_name,o.order_num
```

**这是错误的！只对 `cust_name` 进行聚类确实符合题意，但是不符合 `GROUP BY` 的语法。**

select 语句中，如果没有 `GROUP BY` 语句，那么 `cust_name`、`order_num` 会返回若干个值，而 `sum(quantity * item_price)` 只返回一个值，通过 `group by cust_name` 可以让 `cust_name` 和 `sum(quantity * item_price)` 一一对应起来，或者说**聚类**，所以同样的，也要对 `order_num` 进行聚类。

> <u>**一句话，select 中的字段要么都聚类，要么都不聚类**</u>

> GPT 示例：
>
> **Customers 表**
>
> ```sql
> | cust_id | cust_name |
> |---------|-----------|
> |    1    |   Alice   |
> |    2    |   Bob     |
> ```
>
> **Orders 表**
>
> ```sql
> | order_num | cust_id |
> |-----------|---------|
> |    101    |    1    |
> |    102    |    1    |
> |    103    |    2    |
> ```
>
> **OrderItems 表**
>
> ```sql
> | order_num | quantity | item_price |
> |-----------|----------|------------|
> |    101    |    2     |     10     |
> |    101    |    1     |     20     |
> |    102    |    3     |     15     |
> |    103    |    4     |     8      |
> ```
>
> 现在，我们来执行以下查询：
>
> ```sql
> SELECT c.cust_name, o.order_num, SUM(quantity * item_price) AS OrderTotal
> FROM Customers c, Orders o, OrderItems oi
> WHERE c.cust_id = o.cust_id AND o.order_num = oi.order_num
> GROUP BY c.cust_name, o.order_num
> ORDER BY c.cust_name, o.order_num;
> ```
>
> 查询的结果将会是：
>
> ```sql
> | cust_name | order_num | OrderTotal |
> |-----------|-----------|------------|
> |   Alice   |    101    |     50     |
> |   Alice   |    102    |     75     |
> |    Bob    |    103    |     32     |
> ```
>
> 这个结果是如何得到的呢？
>
> 1. **分组过程**：首先，根据 `GROUP BY` 子句，数据被分为几个小组。对于我们的示例，数据根据 `cust_name` 和 `order_num` 进行分组，**先对`cust_name` 进行分组，然后进一步以`order_num` 进行分组**。因此，有三个小组：Alice 的订单 101 和 102，以及 Bob 的订单 103。
> 2. **聚合计算**：**对于每个小组**，执行聚合函数 `SUM(quantity * item_price)`，计算每个订单的总金额。在我们的示例中，对于 Alice 的订单 101，总金额是 `(2 * 10) + (1 * 20) = 50`；对于 Alice 的订单 102，总金额是 `3 * 15 = 75`；对于 Bob 的订单 103，总金额是 `4 * 8 = 32`。
> 3. **排序结果**：最后，按照 `ORDER BY` 子句对分组后的结果进行排序，按照客户姓名和订单号进行升序排序：先对客户姓名进行排序，然后再对订单号进行排序。

### 确定哪些订单购买了 prod_id 为 BR01 的产品（二）

表 `OrderItems` 代表订单商品信息表，`prod_id` 为产品 id；

`Orders` 表代表订单表有 `cust_id` 代表顾客 id 和订单日期 `order_date`

`OrderItems` 表：

| prod_id | order_num |
| ------- | --------- |
| BR01    | a0001     |
| BR01    | a0002     |
| BR02    | a0003     |
| BR02    | a0013     |

`Orders` 表：

| order_num | cust_id | order_date          |
| --------- | ------- | ------------------- |
| a0001     | cust10  | 2022-01-01 00:00:00 |
| a0002     | cust1   | 2022-01-01 00:01:00 |
| a0003     | cust1   | 2022-01-02 00:00:00 |
| a0013     | cust2   | 2022-01-01 00:20:00 |

【问题】编写 SQL 语句，使用子查询来确定哪些订单（在 `OrderItems` 中）购买了 `prod_id` 为 "BR01" 的产品，然后从 `Orders` 表中返回每个产品对应的顾客 ID（`cust_id`）和订单日期（`order_date`），按订购日期对结果进行升序排序。

提示：这一次使用连接和简单的等连接语法。

```sql
# 写法 1：子查询
SELECT cust_id, order_date
FROM Orders
WHERE order_num IN (SELECT order_num
    FROM OrderItems
    WHERE prod_id = 'BR01')
ORDER BY order_date

# 写法 2：连接表 inner join
SELECT cust_id, order_date
FROM Orders o INNER JOIN
  (SELECT order_num
    FROM OrderItems
    WHERE prod_id = 'BR01') tb ON o.order_num = tb.order_num
ORDER BY order_date

# 写法 3：写法 2 的简化版
SELECT cust_id, order_date
FROM Orders
INNER JOIN OrderItems USING(order_num)
WHERE OrderItems.prod_id = 'BR01'
ORDER BY order_date
```

### 返回购买 prod_id 为 BR01 的产品的所有顾客的电子邮件（二）

有表 `OrderItems` 代表订单商品信息表，`prod_id` 为产品 id；

`Orders` 表代表订单表有 `cust_id` 代表顾客 id 和订单日期 `order_date`；

`Customers` 表含有 `cust_email` 顾客邮件和 cust_id 顾客 id。

`OrderItems` 表：

| prod_id | order_num |
| ------- | --------- |
| BR01    | a0001     |
| BR01    | a0002     |
| BR02    | a0003     |
| BR02    | a0013     |

`Orders` 表：

| order_num | cust_id | order_date          |
| --------- | ------- | ------------------- |
| a0001     | cust10  | 2022-01-01 00:00:00 |
| a0002     | cust1   | 2022-01-01 00:01:00 |
| a0003     | cust1   | 2022-01-02 00:00:00 |
| a0013     | cust2   | 2022-01-01 00:20:00 |

`Customers` 表代表顾客信息，`cust_id` 为顾客 id，`cust_email` 为顾客 email

| cust_id | cust_email                                |
| ------- | ----------------------------------------- |
| cust10  | [cust10@cust.com](mailto:cust10@cust.com) |
| cust1   | [cust1@cust.com](mailto:cust1@cust.com)   |
| cust2   | [cust2@cust.com](mailto:cust2@cust.com)   |

【问题】返回购买 `prod_id` 为 BR01 的产品的所有顾客的电子邮件（`Customers` 表中的 `cust_email`），结果无需排序。

提示：涉及到 `SELECT` 语句，最内层的从 `OrderItems` 表返回 `order_num`，中间的从 `Customers` 表返回 `cust_id`，但是必须使用 INNER JOIN 语法。

```sql
SELECT cust_email
FROM Customers
INNER JOIN Orders using(cust_id)
INNER JOIN OrderItems using(order_num)
WHERE OrderItems.prod_id = 'BR01'
```

### 确定最佳顾客的另一种方式（二）

`OrderItems` 表代表订单信息，确定最佳顾客的另一种方式是看他们花了多少钱，`OrderItems` 表有订单号 `order_num` 和 `item_price` 商品售出价格、`quantity` 商品数量。

| order_num | item_price | quantity |
| --------- | ---------- | -------- |
| a1        | 10         | 105      |
| a2        | 1          | 1100     |
| a2        | 1          | 200      |
| a4        | 2          | 1121     |
| a5        | 5          | 10       |
| a2        | 1          | 19       |
| a7        | 7          | 5        |

`Orders` 表含有字段 `order_num` 订单号、`cust_id` 顾客 id。

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

顾客表 `Customers` 有字段 `cust_id` 客户 id、`cust_name` 客户姓名。

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |

【问题】编写 SQL 语句，返回订单总价不小于 1000 的客户名称和总额（`OrderItems` 表中的 `order_num`）。

提示：需要计算总和（`item_price` 乘以 `quantity`）。按总额对结果进行排序，请使用 `INNER JOIN`语法。

```sql
SELECT cust_name, SUM(item_price * quantity) AS total_price
FROM Customers
INNER JOIN Orders USING(cust_id)
INNER JOIN OrderItems USING(order_num)
GROUP BY cust_name
HAVING total_price >= 1000
ORDER BY total_price
```

## 创建高级连接 (JOIN)

### 检索每个顾客的名称和所有的订单号（一）

`Customers` 表代表顾客信息含有顾客 id `cust_id` 和 顾客名称 `cust_name`

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |

`Orders` 表代表订单信息含有订单号 `order_num` 和顾客 id `cust_id`

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

【问题】使用 INNER JOIN 编写 SQL 语句，检索每个顾客的名称（`Customers` 表中的 `cust_name`）和所有的订单号（`Orders` 表中的 `order_num`），最后根据顾客姓名 `cust_name` 升序返回。

```sql
SELECT cust_name, order_num
FROM Customers
INNER JOIN Orders
USING(cust_id)
ORDER BY cust_name
```

### 检索每个顾客的名称和所有的订单号（二）

`Orders` 表代表订单信息含有订单号 `order_num` 和顾客 id `cust_id`

| order_num | cust_id  |
| --------- | -------- |
| a1        | cust10   |
| a2        | cust1    |
| a3        | cust2    |
| a4        | cust22   |
| a5        | cust221  |
| a7        | cust2217 |

`Customers` 表代表顾客信息含有顾客 id `cust_id` 和 顾客名称 `cust_name`

| cust_id  | cust_name |
| -------- | --------- |
| cust10   | andy      |
| cust1    | ben       |
| cust2    | tony      |
| cust22   | tom       |
| cust221  | an        |
| cust2217 | hex       |
| cust40   | ace       |

【问题】检索每个顾客的名称（`Customers` 表中的 `cust_name`）和所有的订单号（Orders 表中的 `order_num`），列出所有的顾客，即使他们没有下过订单。最后根据顾客姓名 `cust_name` 升序返回。

```sql
SELECT cust_name, order_num
FROM Customers
LEFT JOIN Orders  # 返回左表的所有行
USING(cust_id)
ORDER BY cust_name
```

### 返回产品名称和与之相关的订单号

`Products` 表为产品信息表含有字段 `prod_id` 产品 id、`prod_name` 产品名称

| prod_id | prod_name |
| ------- | --------- |
| a0001   | egg       |
| a0002   | sockets   |
| a0013   | coffee    |
| a0003   | cola      |
| a0023   | soda      |

`OrderItems` 表为订单信息表含有字段 `order_num` 订单号和产品 id `prod_id`

| prod_id | order_num |
| ------- | --------- |
| a0001   | a105      |
| a0002   | a1100     |
| a0002   | a200      |
| a0013   | a1121     |
| a0003   | a10       |
| a0003   | a19       |
| a0003   | a5        |

【问题】使用外连接（left join、 right join、full join）联结 `Products` 表和 `OrderItems` 表，返回产品名称（`prod_name`）和与之相关的订单号（`order_num`）的列表，并按照产品名称升序排序。

```sql
SELECT prod_name, order_num
FROM Products
LEFT JOIN OrderItems # 返回左表的所有行
USING(prod_id)
ORDER BY prod_name
```

### 返回产品名称和每一项产品的总订单数

`Products` 表为产品信息表含有字段 `prod_id` 产品 id、`prod_name` 产品名称

| prod_id | prod_name |
| ------- | --------- |
| a0001   | egg       |
| a0002   | sockets   |
| a0013   | coffee    |
| a0003   | cola      |
| a0023   | soda      |

`OrderItems` 表为订单信息表含有字段 `order_num` 订单号和产品 id `prod_id`

| prod_id | order_num |
| ------- | --------- |
| a0001   | a105      |
| a0002   | a1100     |
| a0002   | a200      |
| a0013   | a1121     |
| a0003   | a10       |
| a0003   | a19       |
| a0003   | a5        |

【问题】使用 OUTER  JOIN 联结 `Products` 表和 `OrderItems` 表，返回产品名称（`prod_name`）和每一项产品的总订单数（不是订单号），并按产品名称升序排序。

```sql
SELECT prod_name, COUNT(order_num) AS orders  # COUNT 会在分组后的每一个组里进行统计
FROM Products
LEFT JOIN OrderItems
USING(prod_id)
GROUP BY prod_name  # 一个产品会有多个订单 所以要分组
ORDER BY prod_name
```

### 列出供应商及其可供产品的数量

有 `Vendors` 表含有 `vend_id` （供应商 id）

| vend_id |
| ------- |
| a0002   |
| a0013   |
| a0003   |
| a0010   |

有 `Products` 表含有 `vend_id`（供应商 id）和 prod_id（供应产品 id）

| vend_id | prod_id              |
| ------- | -------------------- |
| a0001   | egg                  |
| a0002   | prod_id_iphone       |
| a00113  | prod_id_tea          |
| a0003   | prod_id_vivo phone   |
| a0010   | prod_id_huawei phone |

【问题】列出供应商（`Vendors` 表中的 `vend_id`）及其可供产品的数量，包括没有产品的供应商。你需要使用 OUTER  JOIN 和 COUNT()聚合函数来计算 `Products` 表中每种产品的数量，最后根据 vend_id 升序排序。

注意：`vend_id` 列会显示在多个表中，因此在每次引用它时都需要完全限定它。

```sql
SELECT vend_id, COUNT(prod_id) AS prod_id
FROM Vendors
LEFT JOIN Products
USING(vend_id)
GROUP BY vend_id
ORDER BY vend_id
```

## 组合查询 (UNION)

`UNION` 运算符将两个或更多查询的结果组合起来，并生成一个结果集，其中包含来自 `UNION` 中参与查询的提取行。

`UNION` 基本规则：

- 所有查询的列数和列顺序必须相同。
- 每个查询中涉及表的列的数据类型必须相同或兼容。
- 通常返回的列名取自第一个查询。

默认地，`UNION` 操作符选取不同的值。如果允许重复的值，请使用 `UNION ALL`。

```sql
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

`UNION` 结果集中的列名总是等于 `UNION` 中第一个 `SELECT` 语句中的列名。

`JOIN` vs `UNION`：

- `JOIN` 中连接表的列可能不同，但在 `UNION` 中，所有查询的列数和列顺序必须相同。
- `UNION` 将查询之后的行放在一起（垂直放置），但 `JOIN` 将查询之后的列放在一起（水平放置），即它构成一个笛卡尔积。

### 将两个 SELECT 语句结合起来（一）

表 `OrderItems` 包含订单产品信息，字段 `prod_id` 代表产品 id、`quantity` 代表产品数量

| prod_id | quantity |
| ------- | -------- |
| a0001   | 105      |
| a0002   | 100      |
| a0002   | 200      |
| a0013   | 1121     |
| a0003   | 10       |
| a0003   | 19       |
| a0003   | 5        |
| BNBG    | 10002    |

【问题】将两个 `SELECT` 语句结合起来，以便从 `OrderItems` 表中检索产品 id（`prod_id`）和 `quantity`。其中，一个 `SELECT` 语句过滤数量为 100 的行，另一个 `SELECT` 语句过滤 id 以 BNBG 开头的产品，最后按产品 id 对结果进行升序排序。

```sql
SELECT prod_id, quantity
FROM OrderItems
WHERE quantity = 100
UNION
SELECT prod_id, quantity
FROM OrderItems
WHERE prod_id LIKE 'BNBG%'
```

### 将两个 SELECT 语句结合起来（二）

表 `OrderItems` 包含订单产品信息，字段 `prod_id` 代表产品 id、`quantity` 代表产品数量。

| prod_id | quantity |
| ------- | -------- |
| a0001   | 105      |
| a0002   | 100      |
| a0002   | 200      |
| a0013   | 1121     |
| a0003   | 10       |
| a0003   | 19       |
| a0003   | 5        |
| BNBG    | 10002    |

【问题】将两个 `SELECT` 语句结合起来，以便从 `OrderItems` 表中检索产品 id（`prod_id`）和 `quantity`。其中，一个 `SELECT` 语句过滤数量为 100 的行，另一个 `SELECT` 语句过滤 id 以 BNBG 开头的产品，最后按产品 id 对结果进行升序排序。 注意：**这次仅使用单个 SELECT 语句。**

答案：

要求只用一条 select 语句，那就用 `or` 不用 `union` 了。

```sql
SELECT prod_id, quantity
FROM OrderItems
WHERE quantity = 100 OR prod_id LIKE 'BNBG%'
```

### 组合 Products 表中的产品名称和 Customers 表中的顾客名称

`Products` 表含有字段 `prod_name` 代表产品名称

| prod_name |
| --------- |
| flower    |
| rice      |
| ring      |
| umbrella  |

Customers 表代表顾客信息，cust_name 代表顾客名称

| cust_name |
| --------- |
| andy      |
| ben       |
| tony      |
| tom       |
| an        |
| lee       |
| hex       |

【问题】编写 SQL 语句，组合 `Products` 表中的产品名称（`prod_name`）和 `Customers` 表中的顾客名称（`cust_name`）并返回，然后按产品名称对结果进行升序排序。

```sql
# UNION 结果集中的列名总是等于 UNION 中第一个 SELECT 语句中的列名。
SELECT prod_name
FROM Products
UNION
SELECT cust_name
FROM Customers
ORDER BY prod_name
```

### 检查 SQL 语句

表 `Customers` 含有字段 `cust_name` 顾客名、`cust_contact` 顾客联系方式、`cust_state` 顾客州、`cust_email` 顾客 `email`

| cust_name | cust_contact | cust_state | cust_email                                |
| --------- | ------------ | ---------- | ----------------------------------------- |
| cust10    | 8695192      | MI         | [cust10@cust.com](mailto:cust10@cust.com) |
| cust1     | 8695193      | MI         | [cust1@cust.com](mailto:cust1@cust.com)   |
| cust2     | 8695194      | IL         | [cust2@cust.com](mailto:cust2@cust.com)   |

【问题】修正下面错误的 SQL

```sql
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state = 'MI'
ORDER BY cust_name;
UNION
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state = 'IL'ORDER BY cust_name;
```

修正后：

```sql
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state = 'MI'
UNION
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state = 'IL'
ORDER BY cust_name;
```

**使用 `union` 组合查询时，只能使用一条 `order by` 字句，他必须位于最后一条 `select` 语句之后**

或者直接用 `or` 来做：

```sql
SELECT cust_name, cust_contact, cust_email
FROM Customers
WHERE cust_state = 'MI' or cust_state = 'IL'
ORDER BY cust_name;
```

# SQL常见面试题总结（2）

## 增删改操作

SQL 插入记录的方式汇总：

- **普通插入（全字段）** ：`INSERT INTO table_name VALUES (value1, value2, ...)`
- **普通插入（限定字段）** ：`INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)`
- **多条一次性插入** ：`INSERT INTO table_name (column1, column2, ...) VALUES (value1_1, value1_2, ...), (value2_1, value2_2, ...), ...`
- **从另一个表导入** ：`INSERT INTO table_name SELECT * FROM table_name2 [WHERE key=value]`
- **带更新的插入** ：`REPLACE INTO table_name VALUES (value1, value2, ...)`（注意这种原理是检测到主键或唯一性索引键重复就删除原记录后重新插入）

### 插入记录（一）

**描述**：牛客后台会记录每个用户的试卷作答记录到 `exam_record` 表，现在有两个用户的作答记录详情如下：

- 用户 1001 在 2021 年 9 月 1 日晚上 10 点 11 分 12 秒开始作答试卷 9001，并在 50 分钟后提交，得了 90 分；
- 用户 1002 在 2021 年 9 月 4 日上午 7 点 1 分 2 秒开始作答试卷 9002，并在 10 分钟后退出了平台。

试卷作答记录表`exam_record`中，表已建好，其结构如下，请用一条语句将这两条记录插入表中。

| Filed       | Type       | Null | Key  | Extra          | Default | Comment  |
| ----------- | ---------- | ---- | ---- | -------------- | ------- | -------- |
| id          | int(11)    | NO   | PRI  | auto_increment | (NULL)  | 自增 ID  |
| uid         | int(11)    | NO   |      |                | (NULL)  | 用户 ID  |
| exam_id     | int(11)    | NO   |      |                | (NULL)  | 试卷 ID  |
| start_time  | datetime   | NO   |      |                | (NULL)  | 开始时间 |
| submit_time | datetime   | YES  |      |                | (NULL)  | 提交时间 |
| score       | tinyint(4) | YES  |      |                | (NULL)  | 得分     |

**答案**：

```sql
// 存在自增主键，无需手动赋值
INSERT INTO exam_record (uid, exam_id, start_time, submit_time, score) 
VALUES (1001, 9001, '2021-09-01 22:11:12', '2021-09-01 23:01:12', 90),
(1002, 9002, '2021-09-04 07:01:02', NULL, NULL);
```

### 插入记录（二）

**描述**：现有一张试卷作答记录表`exam_record`，结构如下表，其中包含多年来的用户作答试卷记录，由于数据越来越多，维护难度越来越大，需要对数据表内容做精简，历史数据做备份。

表`exam_record`：

| Filed       | Type       | Null | Key  | Extra          | Default | Comment  |
| ----------- | ---------- | ---- | ---- | -------------- | ------- | -------- |
| id          | int(11)    | NO   | PRI  | auto_increment | (NULL)  | 自增 ID  |
| uid         | int(11)    | NO   |      |                | (NULL)  | 用户 ID  |
| exam_id     | int(11)    | NO   |      |                | (NULL)  | 试卷 ID  |
| start_time  | datetime   | NO   |      |                | (NULL)  | 开始时间 |
| submit_time | datetime   | YES  |      |                | (NULL)  | 提交时间 |
| score       | tinyint(4) | YES  |      |                | (NULL)  | 得分     |

我们已经创建了一张新表`exam_record_before_2021`用来备份 2021 年之前的试题作答记录，结构和`exam_record`表一致，请将 2021 年之前的已完成了的试题作答纪录导入到该表。

**答案**：

```sql
INSERT INTO exam_record_before_2021 (uid, exam_id, start_time, submit_time, score)
SELECT uid,exam_id,start_time,submit_time,score
FROM exam_record
WHERE YEAR(submit_time) < 2021;
```

### 插入记录（三）

**描述**：现在有一套 ID 为 9003 的高难度 SQL 试卷，时长为一个半小时，请你将 2021-01-01 00:00:00 作为发布时间插入到试题信息表`examination_info`，不管该 ID 试卷是否存在，都要插入成功，请尝试插入它。

试题信息表`examination_info`：

| Filed        | Type        | Null | Key  | Extra          | Default | Comment      |
| ------------ | ----------- | ---- | ---- | -------------- | ------- | ------------ |
| id           | int(11)     | NO   | PRI  | auto_increment | (NULL)  | 自增 ID      |
| exam_id      | int(11)     | NO   | UNI  |                | (NULL)  | 试卷 ID      |
| tag          | varchar(32) | YES  |      |                | (NULL)  | 类别标签     |
| difficulty   | varchar(8)  | YES  |      |                | (NULL)  | 难度         |
| duration     | int(11)     | NO   |      |                | (NULL)  | 时长(分钟数) |
| release_time | datetime    | YES  |      |                | (NULL)  | 发布时间     |

**答案**：

```sql
REPLACE INTO examination_info 
VALUES (NULL, 9003, "SQL", "hard", 90, "2021-01-01 00:00:00");
```

### 更新记录（一）

**描述**：现在有一张试卷信息表 `examination_info`, 表结构如下图所示：

| Filed        | Type     | Null | Key  | Extra          | Default | Comment  |
| ------------ | -------- | ---- | ---- | -------------- | ------- | -------- |
| id           | int(11)  | NO   | PRI  | auto_increment | (NULL)  | 自增 ID  |
| exam_id      | int(11)  | NO   | UNI  |                | (NULL)  | 试卷 ID  |
| tag          | char(32) | YES  |      |                | (NULL)  | 类别标签 |
| difficulty   | char(8)  | YES  |      |                | (NULL)  | 难度     |
| duration     | int(11)  | NO   |      |                | (NULL)  | 时长     |
| release_time | datetime | YES  |      |                | (NULL)  | 发布时间 |

请把`examination_info`表中`tag`为`PYTHON`的`tag`字段全部修改为`Python`。

**思路**：这题有两种解题思路，最容易想到的是直接`update + where`来指定条件更新，第二种就是根据要修改的字段进行查找**替换**

**答案一**：

```sql
UPDATE examination_info SET tag = 'Python' WHERE tag='PYTHON'
```

**答案二**：

```sql
UPDATE examination_info
SET tag = REPLACE(tag,'PYTHON','Python')

# REPLACE (目标字段，"查找内容","替换内容")
```

### 更新记录（二）

**描述**：现有一张试卷作答记录表 exam_record，其中包含多年来的用户作答试卷记录，结构如下表：作答记录表 `exam_record`： `submit_time` 为 完成时间 （注意这句话）

| Filed       | Type       | Null | Key  | Extra          | Default | Comment  |
| ----------- | ---------- | ---- | ---- | -------------- | ------- | -------- |
| id          | int(11)    | NO   | PRI  | auto_increment | (NULL)  | 自增 ID  |
| uid         | int(11)    | NO   |      |                | (NULL)  | 用户 ID  |
| exam_id     | int(11)    | NO   |      |                | (NULL)  | 试卷 ID  |
| start_time  | datetime   | NO   |      |                | (NULL)  | 开始时间 |
| submit_time | datetime   | YES  |      |                | (NULL)  | 提交时间 |
| score       | tinyint(4) | YES  |      |                | (NULL)  | 得分     |

**题目要求**：请把 `exam_record` 表中 2021 年 9 月 1 日n 之前开始作答的未完成记录全部改为被动完成，即：将完成时间改为'2099-01-01 00:00:00'，分数改为 0。

**思路**：注意题干中的关键字 `" xxx 时间 "`之前这个条件， 那么这里马上就要想到要进行时间的比较 可以直接 `xxx_time < "2021-09-01 00:00:00",` 也可以采用`date()`函数来进行比较；第二个条件就是 `"未完成"`， 即完成时间为 NULL，也就是题目中的提交时间 ----- `submit_time 为 NULL`。

**答案**：

```sql
UPDATE exam_record SET submit_time = '2099-01-01 00:00:00', score = 0 WHERE DATE(start_time) < "2021-09-01" AND submit_time IS null
```

### 删除记录（一）(时间函数使用)

**描述**：现有一张试卷作答记录表 `exam_record`，其中包含多年来的用户作答试卷记录，结构如下表：

作答记录表 `exam_record`： **`start_time`** 是试卷开始时间 `submit_time` 是交卷，即结束时间。

| Filed       | Type       | Null | Key  | Extra          | Default | Comment  |
| ----------- | ---------- | ---- | ---- | -------------- | ------- | -------- |
| id          | int(11)    | NO   | PRI  | auto_increment | (NULL)  | 自增 ID  |
| uid         | int(11)    | NO   |      |                | (NULL)  | 用户 ID  |
| exam_id     | int(11)    | NO   |      |                | (NULL)  | 试卷 ID  |
| start_time  | datetime   | NO   |      |                | (NULL)  | 开始时间 |
| submit_time | datetime   | YES  |      |                | (NULL)  | 提交时间 |
| score       | tinyint(4) | YES  |      |                | (NULL)  | 得分     |

**要求**：请删除`exam_record`表中作答时间小于 5 分钟整且分数不及格（及格线为 60 分）的记录；

**思路**：这一题虽然是练习删除，仔细看确是考察对时间函数的用法，这里提及的分钟数比较，常用的函数有 **`TIMEDIFF`**和**`TIMESTAMPDIFF`** ，两者用法稍有区别，后者更为灵活，这都是看个人习惯。

1.　 `TIMEDIFF`：两个时间之间的差值

```sql
TIMEDIFF(time1, time2)
```

两者参数都是必须的，都是一个时间或者日期时间表达式。如果指定的参数不合法或者是 NULL，那么函数将返回 NULL。

对于这题而言，可以用在 minute 函数里面，因为 TIMEDIFF 计算出来的是时间的差值，在外面套一个 MINUTE 函数，计算出来的就是分钟数。

2. `TIMESTAMPDIFF`：用于计算两个日期的时间差

```sql
TIMESTAMPDIFF(unit,datetime_expr1,datetime_expr2)
# 参数说明
#unit: 日期比较返回的时间差单位，常用可选值如下:
SECOND：秒
MINUTE：分钟
HOUR：小时
DAY：天
WEEK：星期
MONTH：月
QUARTER：季度
YEAR：年
# TIMESTAMPDIFF函数返回datetime_expr2 - datetime_expr1的结果（人话： 后面的 - 前面的  即2-1），其中datetime_expr1和datetime_expr2可以是DATE或DATETIME类型值（人话：可以是“2023-01-01”， 也可以是“2023-01-01- 00:00:00”）
```

这题需要进行分钟的比较，那么就是 TIMESTAMPDIFF(MINUTE, 开始时间， 结束时间) < 5

**答案**：

```sql
DELETE FROM exam_record WHERE MINUTE (TIMEDIFF(submit_time , start_time)) < 5 AND score < 60
```

```sql
DELETE FROM exam_record WHERE TIMESTAMPDIFF(MINUTE, start_time, submit_time) < 5 AND score < 60
```

### 删除记录（二）

**描述**：现有一张试卷作答记录表`exam_record`，其中包含多年来的用户作答试卷记录，结构如下表：

作答记录表`exam_record`：`start_time` 是试卷开始时间，`submit_time` 是交卷时间，即结束时间，如果未完成的话，则为空。

| Filed       | Type       | Null | Key  | Extra          | Default | Comment  |
| ----------- | ---------- | :--: | ---- | -------------- | ------- | -------- |
| id          | int(11)    |  NO  | PRI  | auto_increment | (NULL)  | 自增 ID  |
| uid         | int(11)    |  NO  |      |                | (NULL)  | 用户 ID  |
| exam_id     | int(11)    |  NO  |      |                | (NULL)  | 试卷 ID  |
| start_time  | datetime   |  NO  |      |                | (NULL)  | 开始时间 |
| submit_time | datetime   | YES  |      |                | (NULL)  | 提交时间 |
| score       | tinyint(4) | YES  |      |                | (NULL)  | 分数     |

**要求**：请删除`exam_record`表中未完成作答或作答时间小于 5 分钟整的记录中，开始作答时间最早的 3 条记录。

**思路**：这题比较简单，但是要注意题干中给出的信息，结束时间，如果未完成的话，则为空，这个其实就是一个条件

还有一个条件就是小于 5 分钟，跟上题类似，但是这里是**或**，即两个条件满足一个就行；另外就是稍微考察到了排序和 limit 的用法。

**答案**：

```sql
DELETE FROM exam_record WHERE submit_time IS null OR TIMESTAMPDIFF(MINUTE, start_time, submit_time) < 5
ORDER BY start_time
LIMIT 3
# 默认就是asc， desc是降序排列
```

### 删除记录（三）(DROP、TRUNCATE、DELETE)

**描述**：现有一张试卷作答记录表 exam_record，其中包含多年来的用户作答试卷记录，结构如下表：

| Filed       | Type       | Null | Key  | Extra          | Default | Comment  |
| ----------- | ---------- | :--: | ---- | -------------- | ------- | -------- |
| id          | int(11)    |  NO  | PRI  | auto_increment | (NULL)  | 自增 ID  |
| uid         | int(11)    |  NO  |      |                | (NULL)  | 用户 ID  |
| exam_id     | int(11)    |  NO  |      |                | (NULL)  | 试卷 ID  |
| start_time  | datetime   |  NO  |      |                | (NULL)  | 开始时间 |
| submit_time | datetime   | YES  |      |                | (NULL)  | 提交时间 |
| score       | tinyint(4) | YES  |      |                | (NULL)  | 分数     |

**要求**：请删除`exam_record`表中所有记录，并重置自增主键

**思路**：这题考察对三种删除语句的区别，注意高亮部分，要求重置主键；

- `DROP`: 清空表，删除表结构，不可逆
- `TRUNCATE`: 格式化表，不删除表结构，不可逆
- `DELETE`：删除数据，可逆

这里选用`TRUNCATE`的原因是：**`TRUNCATE` 只能作用于表**；`TRUNCATE`会清空表中的所有行，但表结构及其约束、索引等保持不变；`TRUNCATE`会重置表的自增值；使用`TRUNCATE`后会使表和索引所占用的空间会恢复到初始大小。

这题也可以采用`DELETE`来做，但是在删除后，还需要手动`ALTER`表结构来设置主键初始值；

同理也可以采用`DROP`来做，直接删除整张表，包括表结构，然后再新建表即可。

**答案**：

```sql
TRUNCATE  exam_record;
```

## 表与索引操作

### 创建一张新表

**描述**：现有一张用户信息表，其中包含多年来在平台注册过的用户信息，随着牛客平台的不断壮大，用户量飞速增长，为了高效地为高活跃用户提供服务，现需要将部分用户拆分出一张新表。

原来的用户信息表：

| Filed         | Type        | Null | Key  | Default           | Extra          | Comment  |
| ------------- | ----------- | ---- | ---- | ----------------- | -------------- | -------- |
| id            | int(11)     | NO   | PRI  | (NULL)            | auto_increment | 自增 ID  |
| uid           | int(11)     | NO   | UNI  | (NULL)            |                | 用户 ID  |
| nick_name     | varchar(64) | YES  |      | (NULL)            |                | 昵称     |
| achievement   | int(11)     | YES  |      | 0                 |                | 成就值   |
| level         | int(11)     | YES  |      | (NULL)            |                | 用户等级 |
| job           | varchar(32) | YES  |      | (NULL)            |                | 职业方向 |
| register_time | datetime    | YES  |      | CURRENT_TIMESTAMP |                | 注册时间 |

作为数据分析师，请**创建一张优质用户信息表 user_info_vip**，表结构和用户信息表一致。

你应该返回的输出如下表格所示，请写出建表语句将表格中所有限制和说明记录到表里。

| Filed         | Type        | Null | Key  | Default           | Extra          | Comment  |
| ------------- | ----------- | ---- | ---- | ----------------- | -------------- | -------- |
| id            | int(11)     | NO   | PRI  | (NULL)            | auto_increment | 自增 ID  |
| uid           | int(11)     | NO   | UNI  | (NULL)            |                | 用户 ID  |
| nick_name     | varchar(64) | YES  |      | (NULL)            |                | 昵称     |
| achievement   | int(11)     | YES  |      | 0                 |                | 成就值   |
| level         | int(11)     | YES  |      | (NULL)            |                | 用户等级 |
| job           | varchar(32) | YES  |      | (NULL)            |                | 职业方向 |
| register_time | datetime    | YES  |      | CURRENT_TIMESTAMP |                | 注册时间 |

**思路**：如果这题给出了旧表的名称，可直接`create table 新表 as select * from 旧表;` 但是这题并没有给出旧表名称，所以需要自己创建，注意默认值和键的创建即可，比较简单。（注意：如果是在牛客网上面执行，请注意 comment 中要和题目中的 comment 保持一致，包括大小写，否则不通过，还有字符也要设置）

PRI --- PRIMARY KEY 主键；UNI --- UNIQUE 唯一标识：某列的每行必须有唯一的值

答案：

```sql
CREATE TABLE IF NOT EXISTS user_info_vip(
    id INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT'自增ID',
    uid INT(11) UNIQUE NOT NULL COMMENT '用户ID',
    nick_name VARCHAR(64) COMMENT'昵称',
    achievement INT(11) DEFAULT 0 COMMENT '成就值',
    level INT(11) COMMENT '用户等级',
    job VARCHAR(32) COMMENT '职业方向',
    register_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间'
)CHARACTER SET UTF8
```

### 修改表

**描述**： 现有一张用户信息表`user_info`，其中包含多年来在平台注册过的用户信息。

**用户信息表 `user_info`：**

| Filed         | Type        | Null | Key  | Default           | Extra          | Comment  |
| ------------- | ----------- | ---- | ---- | ----------------- | -------------- | -------- |
| id            | int(11)     | NO   | PRI  | (NULL)            | auto_increment | 自增 ID  |
| uid           | int(11)     | NO   | UNI  | (NULL)            |                | 用户 ID  |
| nick_name     | varchar(64) | YES  |      | (NULL)            |                | 昵称     |
| achievement   | int(11)     | YES  |      | 0                 |                | 成就值   |
| level         | int(11)     | YES  |      | (NULL)            |                | 用户等级 |
| job           | varchar(32) | YES  |      | (NULL)            |                | 职业方向 |
| register_time | datetime    | YES  |      | CURRENT_TIMESTAMP |                | 注册时间 |

**要求：**请在用户信息表，字段 `level` 的后面增加一列最多可保存 15 个汉字的字段 `school`；并将表中 `job` 列名改为 `profession`，同时 `varchar` 字段长度变为 10；`achievement` 的默认值设置为 0。

**思路**：首先做这题之前，需要了解 ALTER 语句的基本用法：

- 添加一列：`ALTER TABLE 表名 ADD COLUMN 列名 类型 【first | after 字段名】;`（first ： 在某列之前添加，after 反之）
- 修改列的类型或约束：`ALTER TABLE 表名 MODIFY COLUMN 列名 新类型 【新约束】;`
- 修改列名：`ALTER TABLE 表名 change COLUMN 旧列名 新列名 类型;`
- 删除列：`ALTER TABLE 表名 drop COLUMN 列名;`
- 修改表名：`ALTER TABLE 表名 rename 【to】 新表名;`
- 将某一列放到第一列：`ALTER TABLE 表名 MODIFY COLUMN 列名 类型 first;`

`COLUMN` 关键字其实可以省略不写，这里基于规范还是罗列出来了。

在修改时，如果有多个修改项，可以写到一起，但要注意格式

**答案**：

```sql
ALTER TABLE user_info
    ADD school VARCHAR(15) AFTER level,
    CHANGE job profession VARCHAR(10),
    MODIFY achievement INT(11) DEFAULT 0;
```

### 删除表

**描述**：现有一张试卷作答记录表 `exam_record`，其中包含多年来的用户作答试卷记录。一般每年都会为 `exam_record` 表建立一张备份表 `exam_record_{YEAR}，{YEAR}` 为对应年份。

现在随着数据越来越多，存储告急，请你把很久前的（2011 到 2014 年）备份表都删掉（如果存在的话）。

**思路**：这题很简单，直接删就行，如果嫌麻烦，可以将要删除的表用逗号隔开，写到一行；这里肯定会有小伙伴问：如果要删除很多张表呢？放心，如果要删除很多张表，可以写脚本来进行删除。

**答案**：

```sql
DROP TABLE IF EXISTS exam_record_2011;
DROP TABLE IF EXISTS exam_record_2012;
DROP TABLE IF EXISTS exam_record_2013;
DROP TABLE IF EXISTS exam_record_2014;
```

### 创建索引

**描述**：现有一张试卷信息表 `examination_info`，其中包含各种类型试卷的信息。为了对表更方便快捷地查询，需要在 `examination_info` 表创建以下索引，

规则如下：在 `duration` 列创建普通索引 `idx_duration`、在 `exam_id` 列创建唯一性索引 `uniq_idx_exam_id`、在 `tag` 列创建全文索引 `full_idx_tag`。

根据题意，将返回如下结果：

| examination_info | 0    | PRIMARY          | 1    | id       | A    | 0    |      |      |      | BTREE    |
| ---------------- | ---- | ---------------- | ---- | -------- | ---- | ---- | ---- | ---- | ---- | -------- |
| examination_info | 0    | uniq_idx_exam_id | 1    | exam_id  | A    | 0    |      |      | YES  | BTREE    |
| examination_info | 1    | idx_duration     | 1    | duration | A    | 0    |      |      |      | BTREE    |
| examination_info | 1    | full_idx_tag     | 1    | tag      |      | 0    |      |      | YES  | FULLTEXT |

备注：后台会通过 `SHOW INDEX FROM examination_info` 语句来对比输出结果

**思路**：做这题首先需要了解常见的索引类型：

- **B-Tree 索引**：B-Tree（或称为平衡树）索引是最常见和默认的索引类型。它适用于各种查询条件，可以快速定位到符合条件的数据。B-Tree 索引适用于普通的查找操作，支持等值查询、范围查询和排序。
- **唯一索引**：唯一索引与普通的 B-Tree 索引类似，不同之处在于它要求被索引的列的值是唯一的。这意味着在插入或更新数据时，MySQL 会验证索引列的唯一性。
- **主键索引**：主键索引是一种特殊的唯一索引，它用于唯一标识表中的每一行数据。每个表只能有一个主键索引，它可以帮助提高数据的访问速度和数据完整性。
- **全文索引**：全文索引用于在文本数据中进行全文搜索。它支持在文本字段中进行关键字搜索，而不仅仅是简单的等值或范围查找。全文索引适用于需要进行全文搜索的应用场景。

```sql
-- 示例：
-- 添加B-Tree索引：
	CREATE INDEX idx_name ON 表名 (字段名);   -- idx_name为索引名，以下都是
-- 创建唯一索引：
	CREATE UNIQUE INDEX idx_name ON 表名 (字段名);
-- 创建一个主键索引：
	ALTER TABLE 表名 ADD PRIMARY KEY (字段名);
-- 创建一个全文索引
	ALTER TABLE 表名 ADD FULLTEXT INDEX idx_name (字段名);

-- 通过以上示例，可以看出create 和 alter 都可以添加索引
```

有了以上的基础知识之后，该题答案也就浮出水面了。

**答案**：

```sql
ALTER TABLE examination_info
    ADD INDEX idx_duration(duration),
    ADD UNIQUE INDEX uniq_idx_exam_id(exam_id),
    ADD FULLTEXT INDEX full_idx_tag(tag);
```

### 删除索引

**描述**：请删除`examination_info`表上的唯一索引 `uniq_idx_exam_id` 和全文索引 `full_idx_tag`。

**思路**：该题考察删除索引的基本语法：

```sql
-- 使用 DROP INDEX 删除索引
DROP INDEX idx_name ON 表名;

-- 使用 ALTER TABLE 删除索引
ALTER TABLE employees DROP INDEX idx_email;
```

这里需要注意的是：**在 MySQL 中，一次删除多个索引的操作是不支持的。每次删除索引时，只能指定一个索引名称进行删除**。

而且 **DROP** 命令需要慎用！！！

**答案**：

```sql
DROP INDEX uniq_idx_exam_id ON examination_info;
DROP INDEX full_idx_tag ON examination_info;
```





















