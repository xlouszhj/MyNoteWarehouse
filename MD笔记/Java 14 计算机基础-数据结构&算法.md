[toc]



## [JavaGuide](https://javaguide.cn/)

# 数据结构

## 线性数据结构

### 数组

**数组（Array）** 是一种很常见的数据结构。它由相同类型的元素（element）组成，并且是使用一块**连续**的内存来存储。

我们直接可以利用元素的索引（index）可以计算出该元素对应的存储地址。

数组的特点是：**提供随机访问** 并且容量有限。

```java
假如数组的长度为 n。
访问：O（1）//访问特定位置的元素
插入：O（n ）//最坏的情况发生在插入发生在数组的首部并需要移动所有元素时
删除：O（n）//最坏的情况发生在删除数组的开头发生并需要移动第一元素后面所有的元素时
```

![](images\array.png)

### 链表

#### 链表简介

**链表（LinkedList）** 虽然是一种线性表，但是并不会按线性的顺序存储数据，使用的**不是连续**的内存空间来存储数据。

链表的插入和删除操作的复杂度为 $O(1)$ ，只需要知道目标位置元素的上一个元素即可。但是，在查找一个节点或者访问特定位置的节点的时候复杂度为 $O(n)$ 。

使用链表结构可以克服数组需要预先知道数据大小的缺点，链表结构可以充分利用计算机内存空间,实现灵活的内存动态管理。但链表不会节省空间，相比于数组会**占用更多的空间**，因为链表中每个节点存放的还有指向其他节点的指针。除此之外，链表**不具有数组随机读取的优点（无索引）即不支持快速随机访问**。

#### 链表分类

**常见链表分类：**

1. 单链表
2. 双向链表
3. 循环链表
4. 双向循环链表

```java
假如链表中有n个元素。
访问：O（n）//访问特定位置的元素
插入删除：O（1）//必须要要知道插入元素的位置
```

##### 单链表

**单链表** 单向链表只有一个方向，结点只有一个后继指针 next 指向后面的节点。因此，链表这种数据结构通常在物理内存上是不连续的。我们习惯性地把第一个结点叫作头结点，链表通常有一个不保存任何值的 head 节点(头结点)，通过头结点我们可以遍历整个链表。尾结点通常指向 null。

![](images\single-linkedlist.png)

##### 循环链表

**循环链表** 其实是一种特殊的单链表，和单链表不同的是循环链表的尾结点不是指向 null，而是指向链表的头结点。

![](images\circular-linkedlist.png)

##### 双向链表

**双向链表** 包含两个指针，一个 prev 指向前一个节点，一个 next 指向后一个节点。

![](images\bidirectional-linkedlist.png)

##### 双向循环链表

**双向循环链表** 最后一个节点的 next 指向 head，而 head 的 prev 指向最后一个节点，构成一个环。

![](images\bidirectional-circular-linkedlist.png)

#### 应用场景

- 如果需要支持随机访问的话，链表没办法做到。
- 如果需要存储的数据元素的个数不确定，并且需要经常添加和删除数据的话，使用链表比较合适。
- 如果需要存储的数据元素的个数确定，并且不需要经常添加和删除数据的话，使用数组比较合适。

#### 数组 vs 链表

- 数组支持随机访问，而链表不支持。
- 数组使用的是连续内存空间对 CPU 的缓存机制友好，链表则相反。
- 数组的大小固定，而链表则天然支持动态扩容。**如果声明的数组过小，需要另外申请一个更大的内存空间存放数组元素，然后将原数组拷贝进去，这个操作是比较耗时的！**

### 栈

#### 栈简介

**栈 (Stack)** 只允许在有序的线性数据集合的一端（称为栈顶 top）进行加入数据（push）和移除数据（pop）。因而按照 **后进先出（LIFO, Last In First Out）** 的原理运作。**在栈中，push 和 pop 的操作都发生在栈顶。**

栈常用一维数组或链表来实现，用**数组**实现的栈叫作 **顺序栈** ，用**链表**实现的栈叫作 **链式栈** 。

```java
假设堆栈中有n个元素。
访问：O（n）//最坏情况
插入删除：O（1）//顶端插入和删除元素
```

![](images\栈.png)

#### 栈的常见应用常见应用场景

当我们我们要处理的数据只涉及在一端插入和删除数据，并且满足 **后进先出（LIFO, Last In First Out）** 的特性时，我们就可以使用栈这个数据结构。

##### 实现浏览器的回退和前进功能

我们只需要使用两个栈(Stack1 和 Stack2)和就能实现这个功能。比如你按顺序查看了 1,2,3,4 这四个页面，我们依次把 1,2,3,4 这四个页面压入 Stack1 中。当你想回头看 2 这个页面的时候，你点击回退按钮，我们依次把 4,3 这两个页面从 Stack1 弹出，然后压入 Stack2 中。假如你又想回到页面 3，你点击前进按钮，我们将 3 页面从 Stack2 弹出，然后压入到 Stack1 中。示例图如下:

![](images\栈实现浏览器倒退和前进.png)

##### 检查符号是否成对出现

> 给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串，判断该字符串是否有效。
>
> 有效字符串需满足：
>
> 1. 左括号必须用相同类型的右括号闭合。
> 2. 左括号必须以正确的顺序闭合。
>
> 比如 "()"、"()[]{}"、"{[]}" 都是有效字符串，而 "(]"、"([)]" 则不是。

这个问题实际是 Leetcode 的一道题目，我们可以利用栈 `Stack` 来解决这个问题。

1. 首先我们将括号间的对应规则存放在 `Map` 中，这一点应该毋容置疑；
2. 创建一个栈。遍历字符串，如果字符是左括号就直接加入`stack`中，否则将`stack` 的栈顶元素与这个括号做比较，如果不相等就直接返回 false。遍历结束，如果`stack`为空，返回 `true`。

1. 

```java
public boolean isValid(String s){
    // 括号之间的对应规则
    HashMap<Character, Character> mappings = new HashMap<Character, Character>();
    mappings.put(')', '(');
    mappings.put('}', '{');
    mappings.put(']', '[');
    Stack<Character> stack = new Stack<Character>();
    char[] chars = s.toCharArray();
    for (int i = 0; i < chars.length; i++) {
        if (mappings.containsKey(chars[i])) {
            char topElement = stack.empty() ? '#' : stack.pop();
            if (topElement != mappings.get(chars[i])) {
                return false;
            }
        } else {
            stack.push(chars[i]);
        }
    }
    return stack.isEmpty();
}
```

##### 反转字符串

将字符串中的每个字符先入栈再出栈就可以了

##### 维护函数调用

最后一个被调用的函数必须先完成执行，符合栈的 **后进先出（LIFO, Last In First Out）** 特性。

##### 深度优先遍历（DFS）

在深度优先搜索过程中，栈被用来保存搜索路径，以便回溯到上一层。

#### 栈的实现

栈既可以通过数组实现，也可以通过链表来实现。不管基于数组还是链表，入栈、出栈的时间复杂度都为 O(1)。

下面我们使用数组来实现一个栈，并且这个栈具有`push()`、`pop()`（返回栈顶元素并出栈）、`peek()` （返回栈顶元素不出栈）、`isEmpty()`、`size()`这些基本的方法。

> 提示：每次入栈之前先判断栈的容量是否够用，如果不够用就用`Arrays.copyOf()`进行扩容；

```java
public class MyStack {
    private int[] storage;//存放栈中元素的数组
    private int capacity;//栈的容量
    private int count;//栈中元素数量
    private static final int GROW_FACTOR = 2;

    //不带初始容量的构造方法。默认容量为8
    public MyStack() {
        this.capacity = 8;
        this.storage=new int[8];
        this.count = 0;
    }

    //带初始容量的构造方法
    public MyStack(int initialCapacity) {
        if (initialCapacity < 1)
            throw new IllegalArgumentException("Capacity too small.");

        this.capacity = initialCapacity;
        this.storage = new int[initialCapacity];
        this.count = 0;
    }

    //入栈
    public void push(int value) {
        if (count == capacity) {
            ensureCapacity();
        }
        storage[count++] = value;
    }

    //确保容量大小
    private void ensureCapacity() {
        int newCapacity = capacity * GROW_FACTOR;
        storage = Arrays.copyOf(storage, newCapacity);
        capacity = newCapacity;
    }

    //返回栈顶元素并出栈
    private int pop() {
        if (count == 0)
            throw new IllegalArgumentException("Stack is empty.");
        count--;
        return storage[count];
    }

    //返回栈顶元素不出栈
    private int peek() {
        if (count == 0){
            throw new IllegalArgumentException("Stack is empty.");
        }else {
            return storage[count-1];
        }
    }

    //判断栈是否为空
    private boolean isEmpty() {
        return count == 0;
    }

    //返回栈中元素的个数
    private int size() {
        return count;
    }

}
```

验证

```java
MyStack myStack = new MyStack(3);
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.push(5);
myStack.push(6);
myStack.push(7);
myStack.push(8);
System.out.println(myStack.peek());//8
System.out.println(myStack.size());//8
for (int i = 0; i < 8; i++) {
    System.out.println(myStack.pop());
}
System.out.println(myStack.isEmpty());//true
myStack.pop();//报错：java.lang.IllegalArgumentException: Stack is empty.
```

### 队列

#### 队列简介

**队列（Queue）** 是 **先进先出 (FIFO，First In, First Out)** 的线性表。在具体应用中通常用**链表**或者**数组**来实现，用数组实现的队列叫作 **顺序队列** ，用链表实现的队列叫作 **链式队列** 。**队列只允许在后端（rear）进行插入操作也就是入队 enqueue，在前端（front）进行删除操作也就是出队 dequeue**

队列的操作方式和堆栈类似，唯一的区别在于队列只允许新数据在后端进行添加。

```java
假设队列中有n个元素。
访问：O（n）//最坏情况
插入删除：O（1）//后端插入前端删除元素
```

![](images\queue.png)

#### 队列分类

##### 单队列

单队列就是常见的队列, 每次添加元素时，都是添加到队尾。单队列又分为 **顺序队列（数组实现）** 和 **链式队列（链表实现）**。

**顺序队列存在“假溢出”的问题也就是明明有位置却不能添加的情况。**

假设下图是一个顺序队列，我们将前两个元素 1,2 出队，并入队两个元素 7,8。当进行入队、出队操作的时候，front 和 rear 都会持续往后移动，当 rear 移动到最后的时候,我们无法再往队列中添加数据，即使数组中还有空余空间，这种现象就是 **”假溢出“** 。除了假溢出问题之外，如下图所示，当添加元素 8 的时候，rear 指针移动到数组之外（越界）。

> 为了避免当只有一个元素的时候，队头和队尾重合使处理变得麻烦，所以引入两个指针，front 指针指向对头元素，rear 指针指向队列最后一个元素的下一个位置，这样当 front 等于 rear 时，此队列不是还剩一个元素，而是空队列。——From 《大话数据结构》

![](images\seq-queue-false-overflow.png)

##### 循环队列

循环队列可以解决顺序队列的假溢出和越界问题。解决办法就是：从头开始，这样也就会形成头尾相接的循环，这也就是循环队列名字的由来。

还是用上面的图，我们将 rear 指针指向数组下标为 0 的位置就不会有越界问题了。当我们再向队列中添加元素的时候， rear 向后移动。

![](images\circular-queue.png)

顺序队列中，我们说 `front==rear` 的时候队列为空，循环队列中则不一样，也可能为满，如上图所示。解决办法有两种：

1. 可以设置一个标志变量 `flag`,当 `front==rear` 并且 `flag=0` 的时候队列为空，当`front==rear` 并且 `flag=1` 的时候队列为满。
2. 队列为空的时候就是 `front==rear` ，队列满的时候，我们保证数组还有一个空闲的位置，rear 就指向这个空闲位置，如下图所示，那么现在判断队列是否为满的条件就是：`(rear+1) % QueueSize==front` 。

##### 双端队列

**双端队列 (Deque)** 是一种在队列的两端都可以进行插入和删除操作的队列，相比单队列来说更加灵活。

一般来说，我们可以对双端队列进行 `addFirst`、`addLast`、`removeFirst` 和 `removeLast` 操作。

##### 优先队列

**优先队列 (Priority Queue)** 从底层结构上来讲并非线性的数据结构，它一般是**由堆来实现**的。

1. 在每个元素入队时，优先队列会将新元素其插入堆中并调整堆。
2. 在队头出队时，优先队列会返回堆顶元素并调整堆。

关于堆的具体实现可以看[堆](https://javaguide.cn/cs-basics/data-structure/heap.html)这一节。

总而言之，不论我们进行什么操作，优先队列都能按照**某种排序方式**进行一系列堆的相关操作，从而保证整个集合的**有序性**。

虽然优先队列的底层并非严格的线性结构，但是在我们使用的过程中，我们是感知不到**堆**的，从使用者的眼中优先队列可以被认为是一种线性的数据结构：一种会自动排序的线性队列。

#### 队列的常见应用场景

当我们需要按照一定顺序来处理数据的时候可以考虑使用队列这个数据结构。

- **阻塞队列：** 阻塞队列可以看成在队列基础上加了阻塞操作的队列。当队列为空的时候，出队操作阻塞，当队列满的时候，入队操作阻塞。使用阻塞队列我们可以很容易实现“生产者 - 消费者“模型。
- **线程池中的请求/任务队列：** 线程池中没有空闲线程时，新的任务请求线程资源时，线程池该如何处理呢？答案是将这些请求放在队列中，当有空闲线程的时候，会循环中反复从队列中获取任务来执行。队列分为**无界队列**(基于链表)和**有界队列**(基于数组)。无界队列的特点就是可以一直入列，除非系统资源耗尽，比如：`FixedThreadPool` 使用无界队列 `LinkedBlockingQueue`。但是有界队列就不一样了，当队列满的话后面再有任务/请求就会拒绝，在 Java 中的体现就是会抛出`java.util.concurrent.RejectedExecutionException` 异常。
- 栈：双端队列天生便可以实现栈的全部功能（`push`、`pop` 和 `peek`），并且在 Deque 接口中已经实现了相关方法。Stack 类已经和 Vector 一样被遗弃，现在在 Java 中普遍**使用双端队列（Deque）来实现栈**。
- Linux 内核进程队列（按优先级排队）
- 现实生活中的派对，播放器上的播放列表
- 消息队列
- 等等……

## 图 ✅

图是一种较为复杂的非线性结构。 **为啥说其较为复杂呢？**

根据前面的内容，我们知道：

- 线性数据结构的元素满足唯一的线性关系，每个元素(除第一个和最后一个外)只有一个直接前趋和一个直接后继。
- 树形数据结构的元素之间有着明显的层次关系。

但是，图形结构的元素之间的关系是任意的。

**何为图呢？** 简单来说，图就是由顶点的有穷非空集合和顶点之间的边组成的集合。通常表示为：**G(V,E)**，其中，G 表示一个图，V 表示顶点的集合，E 表示边的集合。

下图所展示的就是图这种数据结构，并且还是一张有向图。

![](images\directed-graph.png)

### 图的基本概念

#### 顶点

图中的**数据元素**，我们称之为**顶点**，图至少有一个顶点（非空有穷集合）

对应到好友关系图，每一个用户就代表一个顶点。

#### 边

顶点之间的关系用**边**表示。

对应到好友关系图，两个用户是好友的话，那两者之间就存在一条边。

#### 度

**度**表示<u>一个顶点包含多少条边</u>，在有向图中，还分为**出度**和**入度**，出度表示从该顶点出去的边的条数，入度表示进入该顶点的边的条数。

对应到好友关系图，度就代表了某个人的好友数量。

#### 无向图和有向图

边表示的是顶点之间的关系，有的**关系是双向**的，比如同学关系，A 是 B 的同学，那么 B 也肯定是 A 的同学，那么在表示 A 和 B 的关系时，就不用关注方向，用不带箭头的边表示，这样的图就是**无向图**。

有的**关系是有方向**的，比如父子关系，师生关系，微博的关注关系，A 是 B 的爸爸，但 B 肯定不是 A 的爸爸，A 关注 B，B 不一定关注 A。在这种情况下，我们就用带箭头的边表示二者的关系，这样的图就是**有向图**。

#### 无权图和带权图

对于一个关系，如果我们只关心关系的有无，而不关心关系有多强，那么就可以用**无权图**表示二者的关系。

对于一个关系，如果我们既关心关系的有无，也关心关系的强度，比如描述地图上两个城市的关系，需要用到距离，那么就用**带权图**来表示，带权图中的每一条边一个数值表示**权值**，代表关系的强度。

下图就是一个带权有向图。

![](images\weighted-directed-graph.png)

### 图的存储

#### 邻接矩阵存储

==邻接矩阵==将图用二维矩阵存储，是一种较为直观的表示方式。

如果**第 i 个顶点和第 j 个顶点之间有关系，且关系权值为 n**，则 `A[i][j]=n` 。

在**无向图**中，我们只关心关系的有无，所以当顶点 i 和顶点 j 有关系时，`A[i][j]`=1，当顶点 i 和顶点 j 没有关系时，`A[i][j]`=0。如下图所示：

![](images\adjacency-matrix-representation-of-undirected-graph.png)

值得注意的是：**无向图的邻接矩阵是一个==对称矩阵==，因为在无向图中，顶点 i 和顶点 j 有关系，则顶点 j 和顶点 i 必有关系。**

![](images\adjacency-matrix-representation-of-directed-graph.png)

邻接矩阵存储的方式优点是简单直接（直接使用一个二维数组即可），并且，在获取两个定点之间的关系的时候也非常高效（直接获取指定位置的数组元素的值即可）。但是，这种存储方式的缺点也比较明显，那就是比较浪费空间

#### 邻接表存储

针对上面邻接矩阵比较浪费内存空间的问题，诞生了图的另外一种存储方法—==**邻接表**==。

邻接链表使用一个**链表**来存储某个顶点的所有后继相邻顶点。对于图中每个顶点 Vi，把所有邻接于 Vi 的顶点 Vj 链成一个单链表，这个单链表称为顶点 Vi 的 **邻接表**。如下图所示：

![](images\adjacency-list-representation-of-undirected-graph.png)

![](images\adjacency-list-representation-of-directed-graph.png)

大家可以数一数邻接表中所存储的元素的个数以及图中边的条数，你会发现：

- 在**无向图**中，**邻接表元素个数等于边的条数的两倍**，如左图所示的无向图中，边的条数为 7，邻接表存储的元素个数为 14。
- 在**有向图**中，**邻接表元素个数等于边的条数**，如右图所示的有向图中，边的条数为 8，邻接表存储的元素个数为 8。

### 图的搜索

#### 广度优先搜索

广度优先搜索就像水面上的波纹一样一层一层向外扩展，如下图所示：

![](images\breadth-first-search.png)

**广度优先搜索的具体实现方式用到了之前所学过的线性数据结构——==队列==** 。具体过程如下图所示：

**第 1 步：**

![](images\breadth-first-search1.png)

**第 2 步：**

![](images\breadth-first-search2.png)

**第 3 步：**

![](images\breadth-first-search3.png)

**第 4 步：**

![](images\breadth-first-search4.png)

**第 5 步：**

![](images\breadth-first-search5.png)

**第 6 步：**

![](images\breadth-first-search6.png)

#### 深度优先搜索

深度优先搜索就是“一条路走到黑”，从源顶点开始，一直走到没有后继节点，才回溯到上一顶点，然后继续“一条路走到黑”，如下图所示：

![](images\depth-first-search.png)

**和广度优先搜索类似，深度优先搜索的具体实现用到了另一种线性数据结构——==栈==** 。具体过程如下图所示：

**第 1 步：**

![](images\depth-first-search1.png)

**第 2 步：**

![](images\depth-first-search2.png)

**第 3 步：**

![](images\depth-first-search3.png)

**第 4 步：**

![](images\depth-first-search4.png)

**第 5 步：**

![](images\depth-first-search5.png)

**第 6 步：**

![](images\depth-first-search6.png)

## 堆 ✅

### 什么是堆

堆是一种满足以下条件的树：

**堆中的每一个节点值都大于等于（或小于等于）子树中所有节点的值**。或者说，任意一个节点的值都大于等于（或小于等于）所有子节点的值。

> 大家可以把堆(最大堆)理解为一个公司,这个公司很公平,谁能力强谁就当老大,不存在弱的人当老大,老大手底下的人一定不会比他强。这样有助于理解后续堆的操作。

**!!!特别提示：**

- 很多博客说堆是完全二叉树，其实并非如此，**堆不一定是完全二叉树**，只是为了方便存储和索引，我们通常用完全二叉树的形式来表示堆，事实上，广为人知的斐波那契堆和二项堆就不是完全二叉树,它们甚至都不是二叉树。
- （**二叉**）堆是一个数组，它可以被看成是一个 **近似的完全二叉树**。——《算法导论》第三版

大家可以尝试判断下面给出的图是否是堆？

![](images\堆1-XFna5NAD.png)

第 1 个和第 2 个是堆。第 1 个是**最大堆**，每个节点都比子树中所有节点大。第 2 个是**最小堆**，每个节点都比子树中所有节点小。

第 3 个不是，第三个中，根结点 1 比 2 和 15 小，而 15 却比 3 大，19 比 5 大，不满足堆的性质。

### 堆的用途

当我们只关心所有数据中的最大值或者最小值，存在多次获取最大值或者最小值，多次插入或删除数据时，就可以使用堆。

有小伙伴可能会想到用有序数组，初始化一个有序数组时间复杂度是 `O(nlog(n))`，查找最大值或者最小值时间复杂度都是 `O(1)`，但是，涉及到更新（插入或删除）数据时，时间复杂度为 `O(n)`，即使是使用复杂度为 `O(log(n))` 的二分法找到要插入或者删除的数据，在移动数据时也需要 `O(n)` 的时间复杂度。

**相对于有序数组而言，堆的主要优势在于插入和删除数据效率较高。** 因为堆是基于完全二叉树实现的，所以在插入和删除数据时，只需要在二叉树中上下移动节点，时间复杂度为 `O(log(n))`，相比有序数组的 `O(n)`，效率更高。

不过，需要注意的是：**Heap 初始化的时间复杂度为 `O(n)`**，而非`O(nlogn)`。

### 堆的分类

堆分为 **最大堆** 和 **最小堆**。二者的区别在于节点的排序方式。

- **最大堆**：堆中的每一个节点的值都大于等于子树中所有节点的值
- **最小堆**：堆中的每一个节点的值都小于等于子树中所有节点的值

如下图所示，图 1 是最大堆，图 2 是最小堆

![](images\堆2-m3vzmcJq.png)

### 堆的存储

之前介绍树的时候说过，由于完全二叉树的优秀性质，利用数组存储二叉树即节省空间，又方便索引（若根结点的序号为 0，那么对于树中任意节点 i，其左子节点序号为 `2*i+1`，右子节点序号为 `2*i+2`）。

为了方便存储和索引，（二叉）堆可以用完全二叉树的形式进行存储。存储的方式如下图所示：

![](images\堆的存储-ZtlPcDkw.png)

### 堆的操作

堆的更新操作主要包括两种 : **插入元素** 和 **删除堆顶元素**。操作过程需要**着重掌握和理解**。

> 在进入正题之前，再重申一遍，堆是一个公平的公司，有能力的人自然会走到与他能力所匹配的位置

#### 插入元素

> 插入元素，作为一个新入职的员工，初来乍到，这个员工需要从基层做起

**1.将要插入的元素放到最后**

![](images\堆-插入元素1-BPujJrza.png)

> 有能力的人会逐渐升职加薪，是金子总会发光的！！！

**2.从底向上，如果父结点比该元素小，则该节点和父结点交换，直到无法交换**

![](images\堆-插入元素2-BEh76gJ1.png)

![](images\堆-插入元素3-Cn6KG4Li.png)

#### 删除堆顶元素

根据堆的性质可知，最大堆的堆顶元素为所有元素中最大的，最小堆的堆顶元素是所有元素中最小的。当我们需要多次查找最大元素或者最小元素的时候，可以利用堆来实现。

删除堆顶元素后，为了保持堆的性质，需要对堆的结构进行调整，我们将这个过程称之为"**堆化**"，堆化的方法分为两种：

- 一种是自底向上的堆化，上述的插入元素所使用的就是自底向上的堆化，元素从最底部向上移动。
- 另一种是自顶向下堆化，元素由最顶部向下移动。在讲解删除堆顶元素的方法时，我将阐述这两种操作的过程，大家可以体会一下二者的不同。

##### 自底向上堆化

> 在堆这个公司中，会出现老大离职的现象，老大离职之后，他的位置就空出来了

首先删除堆顶元素，使得数组中下标为 1 的位置空出。

![](images\删除堆顶元素1-y1Q3jmob.png)

> 那么他的位置由谁来接替呢，当然是他的直接下属了，谁能力强就让谁上呗

比较根结点的左子节点和右子节点，也就是下标为 2,3 的数组元素，将较大的元素填充到根结点(下标为 1)的位置。

![](images\删除堆顶元素2-DCeYIHuE.png)

> 这个时候又空出一个位置了，老规矩，谁有能力谁上

一直循环比较空出位置的左右子节点，并将较大者移至空位，直到堆的最底部

![](images\删除堆顶元素3-DuCFYmPz.png)

这个时候已经完成了自底向上的堆化，没有元素可以填补空缺了，但是，我们可以看到数组中出现了“**气泡**”，这会导致存储空间的浪费。接下来我们试试自顶向下堆化。

##### 自顶向下堆化

自顶向下的堆化用一个词形容就是“石沉大海”，那么第一件事情，就是把石头抬起来，从海面扔下去。这个石头就是堆的最后一个元素，我们将最后一个元素移动到堆顶。

![](images\删除堆顶元素4-bmIZsQyc.png)

然后开始将这个石头沉入海底，不停与左右子节点的值进行比较，和较大的子节点交换位置，直到无法交换位置。

![](images\删除堆顶元素5-Dloq2ahz.png)

![](images\删除堆顶元素6-D4cLQTzP.png)

#### 堆的操作总结

- **插入元素**：先将元素放至数组末尾，再自底向上堆化，将末尾元素上浮
- **删除堆顶元素**：删除堆顶元素，将末尾元素放至堆顶，再自顶向下堆化，将堆顶元素下沉。也可以自底向上堆化，只是会产生“气泡”，浪费存储空间。最好采用自顶向下堆化的方式。

### 堆排序 ✅

堆排序的过程分为两步：

- 第一步是建堆，将一个无序的数组建立为一个堆
- 第二步是排序，将堆顶元素取出，然后对剩下的元素进行堆化，反复迭代，直到所有元素被取出为止。

#### 建堆

如果你已经足够了解堆化的过程，那么建堆的过程掌握起来就比较容易了。建堆的过程就是一个对**所有非叶节点的自顶向下堆化过程**。

首先要了解哪些是非叶节点，最后一个节点的父结点及它之前的元素，都是非叶节点。也就是说，如果节点个数为 n，那么我们需要对 n/2 到 1 的节点进行自顶向下（沉底）堆化。

具体过程如下图：

![](images\建堆1-Bfn9WEXK.png)

将初始的无序数组抽象为一棵树，图中的节点个数为 6，所以 4,5,6 节点为叶节点，1,2,3 节点为非叶节点，所以要对 1-3 号节点进行自顶向下（沉底）堆化，注意，顺序是从后往前堆化，从 3 号节点开始，一直到 1 号节点。
 3 号节点堆化结果：

![](images\建堆2-B2f1Atqe.png)

2 号节点堆化结果：

![](images\建堆3-BKxkjwaN.png)

1 号节点堆化结果：

![](images\建堆4-CiqR7HAx.png)

至此，数组所对应的树已经成为了一个最大堆，建堆完成！

#### 排序

由于堆顶元素是所有元素中最大的，所以我们重复取出堆顶元素，将这个最大的堆顶元素放至数组末尾，并对剩下的元素进行堆化即可。

现在思考两个问题：

- 删除堆顶元素后需要执行自顶向下（沉底）堆化还是自底向上（上浮）堆化？
- 取出的堆顶元素存在哪，新建一个数组存？

先回答第一个问题，我们需要执行**自顶向下（沉底）堆化**，这个堆化一开始要**将末尾元素移动至堆顶**，这个时候末尾的位置就空出来了，由于堆中元素已经减小，这个位置不会再被使用，所以我们可以将**取出的元素放在末尾**。

机智的小伙伴已经发现了，这其实是做了一次交换操作，将堆顶和末尾元素调换位置，从而将取出堆顶元素和堆化的第一步(将末尾元素放至根结点位置)进行合并。

详细过程如下图所示：

取出第一个元素并堆化：

![](images\堆排序1-DOA-64uz.png)

取出第二个元素并堆化：

![](images\堆排序2-BSboDRpH.png)

取出第三个元素并堆化：

![](images\堆排序3-BhAwxic8.png)

取出第四个元素并堆化：

![](images\堆排序4-5wURL9sM.png)

取出第五个元素并堆化：

![](images\下载 (3).png)

取出第六个元素并堆化：

![](images\下载 (4).png)

堆排序完成！

## 树 ✅

树就是一种类似现实生活中的树的数据结构（倒置的树）。任何一颗非空树只有一个根节点。

一棵树具有以下特点：

1. 一棵树中的任意两个结点有且仅有唯一的一条路径连通。
2. **一棵树如果有 n 个结点，那么它一定恰好有 n-1 条边**。
3. 一棵树不包含回路。

下图就是一颗树，并且是一颗二叉树。

![](images\二叉树-2.png)

如上图所示，通过上面这张图说明一下树中的常用概念：

- **节点**：树中的每个元素都可以统称为节点。
- **根节点**：顶层节点或者说没有父节点的节点。上图中 A 节点就是根节点。
- **父节点**：若一个节点含有子节点，则这个节点称为其子节点的父节点。上图中的 B 节点是 D 节点、E 节点的父节点。
- **子节点**：一个节点含有的子树的根节点称为该节点的子节点。上图中 D 节点、E 节点是 B 节点的子节点。
- **兄弟节点**：具有相同父节点的节点互称为兄弟节点。上图中 D 节点、E 节点的共同父节点是 B 节点，故 D 和 E 为兄弟节点。
- **叶子节点**：没有子节点的节点。上图中的 D、F、H、I 都是叶子节点。
- **节点的高度**：<u>该节点到叶子节点</u>的最长路径所包含的<u>边数</u>。
- **节点的深度**：<u>根节点到该节点</u>的路径所包含的<u>边数</u>
- **节点的层数**：节点的深度+1。
- **树的高度**：根节点的高度。

> 关于树的深度和高度的定义可以看 stackoverflow 上的这个问题：[What is the difference between tree depth and height?](https://stackoverflow.com/questions/2603692/what-is-the-difference-between-tree-depth-and-height)

### 二叉树的分类

**二叉树**（Binary tree）是每个节点最多只有两个分支（即不存在分支度大于 2 的节点）的树结构。

**二叉树** 的分支通常被称作“**左子树**”或“**右子树**”。并且，**二叉树** 的分支具有左右次序，不能随意颠倒。

**二叉树** 的第 i 层至多拥有 `2^(i-1)` 个节点，深度为 k 的二叉树至多总共有 `2^(k+1)-1` 个节点（满二叉树的情况），至少有 2^(k) 个节点（关于节点的深度的定义国内争议比较多，我个人比较认可维基百科对[节点深度的定义](https://zh.wikipedia.org/wiki/树_(数据结构)#/术语)）。

![](images\image-20220119112736158.png)

#### 满二叉树

一个二叉树，如果每一个层的结点数都达到最大值，则这个二叉树就是 **满二叉树**。也就是说，如果一个二叉树的层数为 K，且结点总数是(2^k) -1 ，则它就是 **满二叉树**。如下图所示：

![](images\full-binary-tree.png)

#### 完全二叉树

除最后一层外，若其余层都是满的，并且最后一层或者是满的，或者是在右边缺少连续若干节点，则这个二叉树就是 **完全二叉树** 。

大家可以想象为一棵树从根结点开始扩展，扩展完左子节点才能开始扩展右子节点，每扩展完一层，才能继续扩展下一层。如下图所示：

![](images\complete-binary-tree.png)

完全二叉树有一个很好的性质：**父结点和子节点的序号有着对应关系。**

细心的小伙伴可能发现了，**当根节点的值为 1 （0）的情况下，若父结点的序号是 i（i），那么左子节点的序号就是 2i（2i+1），右子节点的序号是 2i+1（2i+2）。**这个性质使得完全二叉树利用数组存储时可以极大地节省空间，以及利用序号找到某个节点的父结点和子节点，后续二叉树的存储会详细介绍。

#### 平衡二叉树

**平衡二叉树** 是一棵二叉排序树，且具有以下性质：

1. 可以是一棵空树
2. 如果不是空树，它的左右两个子树的**高度差的绝对值不超过 1**，并且左右两个子树都是一棵平衡二叉树。

平衡二叉树的常用实现方法有 **红黑树**、**AVL 树**、**替罪羊树**、**加权平衡树**、**伸展树** 等。

在给大家展示平衡二叉树之前，先给大家看一棵树：

![](images\oblique-tree (1).png)

**你管这玩意儿叫树？？？**

没错，这玩意儿还真叫树，只不过这棵树已经退化为一个链表了，我们管它叫 **斜树**。

**如果这样，那我为啥不直接用链表呢?**

谁说不是呢？

二叉树相比于链表，由于父子节点以及兄弟节点之间往往具有某种特殊的关系，这种关系使得我们在树中对数据进行**搜索**和**修改**时，相对于链表更加快捷便利。

但是，如果二叉树退化为一个链表了，那么那么树所具有的优秀性质就难以表现出来，效率也会大打折，为了避免这样的情况，我们希望每个做 “家长”（父结点） 的，都 **一碗水端平**，分给左儿子和分给右儿子的尽可能一样多，相差最多不超过一层，如下图所示：

![](images\balanced-binary-tree.png)

### 二叉树的存储

二叉树的存储主要分为 **链式存储** 和 **顺序存储** 两种：

#### 链式存储

和链表类似，二叉树的链式存储依靠指针将各个节点串联起来，不需要连续的存储空间。

每个节点包括三个属性：

- 数据 data。data 不一定是单一的数据，根据不同情况，可以是多个具有不同类型的数据。
- 左节点指针 left
- 右节点指针 right。

可是 JAVA 没有指针啊！

那就直接引用对象呗（别问我对象哪里找）

![](images\chain-store-binary-tree.png)

#### 顺序存储

顺序存储就是利用数组进行存储，数组中的每一个位置仅存储节点的 data，不存储左右子节点的指针，**子节点的索引通过数组下标完成**。根结点的序号为 1，对于每个节点 Node，假设它存储在数组中下标为 i 的位置，那么它的左子节点就存储在 2i 的位置，它的右子节点存储在下标为 2i+1 的位置。

一棵完全二叉树的数组顺序存储如下图所示：

![](images\sequential-storage.png)

大家可以试着填写一下存储如下二叉树的数组，比较一下和完全二叉树的顺序存储有何区别：

![](images\sequential-storage2.png)

可以看到，如果我们要存储的二叉树不是完全二叉树，在数组中就会出现空隙，导致内存利用率降低

### 二叉树的遍历

#### 先序遍历

![](images\preorder-traversal.png)

二叉树的先序遍历，就是先输出根结点，再遍历左子树，最后遍历右子树，遍历左子树和右子树的时候，同样遵循先序遍历的规则，也就是说，我们可以递归实现先序遍历。

代码如下：

```java
public void preOrder(TreeNode root){
	if(root == null){
		return;
	}
	system.out.println(root.data);
	preOrder(root.left);
	preOrder(root.right);
}
```

#### 中序遍历

![](images\inorder-traversal.png)

二叉树的中序遍历，就是先递归中序遍历左子树，再输出根结点的值，再递归中序遍历右子树，大家可以想象成一巴掌把树压扁，父结点被拍到了左子节点和右子节点的中间，如下图所示：

![](images\inorder-traversal2.png)

代码如下：

```java
public void inOrder(TreeNode root){
	if(root == null){
		return;
	}
	inOrder(root.left);
	system.out.println(root.data);
	inOrder(root.right);
}
```

#### 后序遍历

![](images\postorder-traversal.png)

二叉树的后序遍历，就是先递归后序遍历左子树，再递归后序遍历右子树，最后输出根结点的值

代码如下：

```java
public void postOrder(TreeNode root){
	if(root == null){
		return;
	}
 postOrder(root.left);
	postOrder(root.right);
	system.out.println(root.data);
}
```

## 红黑树

### 红黑树介绍

**红黑树（Red Black Tree）是一种自平衡二叉查找树**。它是在 1972 年由 Rudolf Bayer 发明的，当时被称为平衡二叉 B 树（symmetric binary B-trees）。后来，在 1978 年被 Leo J. Guibas 和 Robert Sedgewick 修改为如今的“红黑树”。

由于其自平衡的特性，保证了最坏情形下在 $O(logn)$ 时间复杂度内完成查找、增加、删除等操作，性能表现稳定。

在 JDK 中，`TreeMap`、`TreeSet` 以及 JDK1.8 的 `HashMap` 底层都用到了红黑树。

### 为什么需要红黑树？

红黑树的诞生就是为了解决二叉查找树的缺陷。

二叉查找树是一种基于比较的数据结构，它的每个节点都有一个键值，而且左子节点的键值小于父节点的键值，右子节点的键值大于父节点的键值。这样的结构可以方便地进行查找、插入和删除操作，因为只需要比较节点的键值就可以确定目标节点的位置。但是，二叉查找树有一个很大的问题，就是它的形状取决于节点插入的顺序。如果节点是按照升序或降序的方式插入的，那么二叉查找树就会退化成一个线性结构，也就是一个链表。这样的情况下，二叉查找树的性能就会大大降低，时间复杂度就会从 O(logn) 变为 O(n)。

红黑树的诞生就是为了解决二叉查找树的缺陷，因为二叉查找树在某些情况下会退化成一个线性结构。

### 红黑树特点

1. 每个节点非红即黑。黑色决定平衡，红色不决定平衡。这对应了 2-3 树中一个节点内可以存放 1~2 个节点。
2. 根节点总是黑色的。
3. 每个叶子节点都是黑色的空节点（NIL 节点）。这里指的是红黑树都会有一个空的叶子节点，是红黑树自己的规则。
4. 如果节点是红色的，则它的子节点必须是黑色的（反之不一定）。通常这条规则也叫不会有连续的红色节点。一个节点最多临时会有 3 个节点，中间是黑色节点，左右是红色节点。
5. 从根节点到叶节点或空子节点的每条路径，必须包含相同数目的黑色节点（即相同的黑色高度）。每一层都只是有一个节点贡献了树高决定平衡性，也就是对应红黑树中的黑色节点。

正是这些特点才保证了红黑树的平衡，让红黑树的高度不会超过 2log(n+1)。

### 红黑树数据结构

建立在 BST 二叉搜索树的基础上，AVL、2-3 树、红黑树都是自平衡二叉树（统称 B-树）。但相比于 AVL 树，高度平衡所带来的时间复杂度，红黑树对平衡的控制要宽松一些，红黑树只需要保证黑色节点平衡即可。

### 红黑树结构实现

```java
public class Node {

    public Class<?> clazz;
    public Integer value;
    public Node parent;
    public Node left;
    public Node right;

    // AVL 树所需属性
    public int height;
    // 红黑树所需属性
    public Color color = Color.RED;

}
```

#### 1.左倾染色

![](images\红黑树1-DBtcn6an.png)

- 染色时根据当前节点的爷爷节点，找到当前节点的叔叔节点。
- 再把父节点染黑、叔叔节点染黑，爷爷节点染红。但爷爷节点染红是临时的，当平衡树高操作后会把根节点染黑。

#### 2.右倾染色

![](images\红黑树2-5DKn1Vs2.png)

#### 3.左旋调衡

##### 一次左旋

![](images\红黑树3-BtbXNFrh.png)

##### 右旋+左旋

![](images\红黑树4-CO762S26.png)

#### 4.右旋调衡

##### 一次右旋

![](images\红黑树5-C2ncqkhW.png)

##### 左旋+右旋

![](images\红黑树6-Bx2lji_P.png)

### 文章推荐

- [《红黑树深入剖析及 Java 实现》 - 美团点评技术团队](https://zhuanlan.zhihu.com/p/24367771)
- [漫画：什么是红黑树？ - 程序员小灰](https://juejin.im/post/5a27c6946fb9a04509096248#comment)（也介绍到了二叉查找树，非常推荐）

## 布隆过滤器 ✅

布隆过滤器相信大家没用过的话，也已经听过了。

布隆过滤器主要是为了**解决海量数据的存在性问题**。对于海量数据中判定某个数据是否存在且容忍轻微误差这一场景（比如缓存穿透、海量数据去重）来说，非常适合。

文章内容概览：

1. 什么是布隆过滤器？
2. 布隆过滤器的原理介绍。
3. 布隆过滤器使用场景。
4. 通过 Java 编程手动实现布隆过滤器。
5. 利用 Google 开源的 Guava 中自带的布隆过滤器。
6. Redis 中的布隆过滤器。

### 什么是布隆过滤器？

首先，我们需要了解==布隆过滤器==的概念。

布隆过滤器（Bloom Filter，BF）是一个叫做 Bloom 的老哥于 1970 年提出的。我们可以把它看作由**二进制向量（或者说 位数组 ）**和**一系列随机映射函数（哈希函数）**两部分组成的数据结构。相比于我们平时常用的 List、Map、Set 等数据结构，它占用空间更少并且效率更高，但是缺点是其返回的结果是概率性的，而不是非常准确的。理论情况下添加到集合中的元素越多，误报的可能性就越大。并且，存放在布隆过滤器的数据不容易删除。

Bloom Filter 会使用一个较大的 bit 数组来保存所有的数据，数组中的每个元素都只占用 **1 bit** ，并且每个元素只能是 **0 或者 1**（代表 false 或者 true），这也是 Bloom Filter 节省内存的核心所在。这样来算的话，申请一个 100w 个元素的位数组只占用 1000000Bit / 8 = 125000 Byte = 125000/1024 KB ≈ 122KB 的空间。

![](images\bloom-filter-bit-table (1).png)

总结：一个名叫 Bloom 的人提出了一种来检索元素是否在给定大集合中的数据结构，这种数据结构是高效且性能很好的，但<u>缺点是具有一定的错误识别率和删除难度。并且，理论情况下，添加到集合中的元素越多，误报的可能性就越大</u>。

### 布隆过滤器的原理介绍

**当一个元素加入布隆过滤器中的时候，会进行如下操作：**

1. 使用布隆过滤器中的**哈希函数**对元素值进行计算，得到**哈希值**（有几个哈希函数得到几个哈希值）。
2. 根据得到的哈希值，在位数组中把**对应下标的值置为 1**。（复数的哈希值 可能对应 复数的下标位置）

当我们需要判断一个元素是否存在于布隆过滤器的时候，会进行如下操作：

1. 对给定元素再次进行相同的**哈希计算**；
2. 得到值之后**判断位数组中的每个元素是否都为 1**，如果值都为 1，那么说明这个值在布隆过滤器中，如果存在一个值不为 1，说明该元素不在布隆过滤器中。

Bloom Filter 的简单原理图如下：

![](images\bloom-filter-simple-schematic-diagram (1).png)

如图所示，当字符串存储要加入到布隆过滤器中时，该字符串首先由多个哈希函数生成不同的哈希值，然后将对应的位数组的下标设置为 1（当位数组初始化时，所有位置均为 0）。当第二次存储相同字符串时，因为先前的对应位置已设置为 1，所以很容易知道此值已经存在（去重非常方便）。

如果我们需要判断某个字符串是否在布隆过滤器中时，只需要对给定字符串再次进行相同的哈希计算，得到值之后判断位数组中的每个元素是否都为 1，如果值都为 1，那么说明这个值在布隆过滤器中，如果存在一个值不为 1，说明该元素不在布隆过滤器中。

<u>不同的字符串可能哈希出来的位置相同，这种情况我们可以适当增加位数组大小或者调整我们的哈希函数。</u>

综上，我们可以得出：**布隆过滤器说某个元素存在，小概率会误判。布隆过滤器说某个元素不在，那么这个元素一定不在**

### 布隆过滤器使用场景

1. 判断给定数据是否存在：比如判断一个数字是否存在于包含大量数字的数字集中（数字集很大，上亿）、 **防止缓存穿透**（判断请求的数据是否有效，避免直接绕过缓存请求数据库）等等、邮箱的垃圾邮件过滤（判断一个邮件地址是否在垃圾邮件列表中）、黑名单功能（判断一个 IP 地址或手机号码是否在黑名单中）等等。
2. 去重：比如爬给定网址的时候对已经爬取过的 URL 去重、对巨量的 QQ 号/订单号去重。

去重场景也需要用到判断给定数据是否存在，因此布隆过滤器主要是为了解决海量数据的存在性问题。

### 编码实战

#### 通过 Java 编程手动实现布隆过滤器  ✅

我们上面已经说了布隆过滤器的原理，知道了布隆过滤器的原理之后就可以自己手动实现一个了。

如果你想要手动实现一个的话，你需要：

1. 一个合适大小的位数组保存数据
2. 几个不同的哈希函数
3. 添加元素到位数组（布隆过滤器）的方法实现
4. 判断给定元素是否存在于位数组（布隆过滤器）的方法实现。

下面给出一个我觉得写的还算不错的代码（参考网上已有代码改进得到，对于所有类型对象皆适用）：

```java
import java.util.BitSet;

public class MyBloomFilter {

    /**
     * 位数组的大小
     */
    private static final int DEFAULT_SIZE = 2 << 24;
    /**
     * 通过这个数组可以创建 6 个不同的哈希函数
     */
    private static final int[] SEEDS = new int[]{3, 13, 46, 71, 91, 134};

    /**
     * 位数组。数组中的元素只能是 0 或者 1
     */
    private BitSet bits = new BitSet(DEFAULT_SIZE);

    /**
     * 存放包含 hash 函数的类的数组
     */
    private SimpleHash[] func = new SimpleHash[SEEDS.length];

    /**
     * 初始化多个包含 hash 函数的类的数组，每个类中的 hash 函数都不一样
     */
    public MyBloomFilter() {
        // 初始化多个不同的 Hash 函数
        for (int i = 0; i < SEEDS.length; i++) {
            func[i] = new SimpleHash(DEFAULT_SIZE, SEEDS[i]);
        }
    }

    /**
     * 添加元素到位数组
     */
    public void add(Object value) {
        for (SimpleHash f : func) {
            bits.set(f.hash(value), true);
        }
    }

    /**
     * 判断指定元素是否存在于位数组
     */
    public boolean contains(Object value) {
        boolean ret = true;
        for (SimpleHash f : func) {
            ret = ret && bits.get(f.hash(value));
        }
        return ret;
    }

    /**
     * 静态内部类。用于 hash 操作！
     */
    public static class SimpleHash {

        private int cap;
        private int seed;

        public SimpleHash(int cap, int seed) {
            this.cap = cap;
            this.seed = seed;
        }

        /**
         * 计算 hash 值
         */
        public int hash(Object value) {
            int h;
            return (value == null) ? 0 : Math.abs(seed * (cap - 1) & ((h = value.hashCode()) ^ (h >>> 16)));
        }

    }
}
```

测试：

```java
String value1 = "https://javaguide.cn/";
String value2 = "https://github.com/Snailclimb";
MyBloomFilter filter = new MyBloomFilter();
System.out.println(filter.contains(value1));
System.out.println(filter.contains(value2));
filter.add(value1);
filter.add(value2);
System.out.println(filter.contains(value1));
System.out.println(filter.contains(value2));
```

Output:

```plain
false
false
true
true
```

测试：

```java
Integer value1 = 13423;
Integer value2 = 22131;
MyBloomFilter filter = new MyBloomFilter();
System.out.println(filter.contains(value1));
System.out.println(filter.contains(value2));
filter.add(value1);
filter.add(value2);
System.out.println(filter.contains(value1));
System.out.println(filter.contains(value2));
```

Output:

```java
false
false
true
true
```

#### 利用 Google 开源的 Guava 中自带的布隆过滤器

自己实现的目的主要是为了让自己搞懂布隆过滤器的原理，Guava 中布隆过滤器的实现算是比较权威的，所以实际项目中我们不需要手动实现一个布隆过滤器。

首先我们需要在项目中引入 Guava 的依赖：

```java
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>28.0-jre</version>
</dependency>
```

实际使用如下：

我们创建了一个最多存放 最多 1500 个整数的布隆过滤器，并且我们可以容忍误判的概率为百分之（0.01）

```java
// 创建布隆过滤器对象
BloomFilter<Integer> filter = BloomFilter.create(
    Funnels.integerFunnel(),
    1500,
    0.01);
// 判断指定元素是否存在
System.out.println(filter.mightContain(1));
System.out.println(filter.mightContain(2));
// 将元素添加进布隆过滤器
filter.put(1);
filter.put(2);
System.out.println(filter.mightContain(1));
System.out.println(filter.mightContain(2));
```

在我们的示例中，当 `mightContain()` 方法返回 *true* 时，我们可以 99％确定该元素在过滤器中，当过滤器返回 *false* 时，我们可以 100％确定该元素不存在于过滤器中。

Guava 提供的布隆过滤器的实现还是很不错的（想要详细了解的可以看一下它的源码实现），但是它有一个重大的缺陷就是只能单机使用（另外，容量扩展也不容易），而现在互联网一般都是分布式的场景。为了解决这个问题，我们就需要用到 Redis 中的布隆过滤器了。

### Redis 中的布隆过滤器

#### 介绍

Redis v4.0 之后有了 Module（模块/插件） 功能，Redis Modules 让 Redis 可以使用外部模块扩展其功能 。布隆过滤器就是其中的 Module。详情可以查看 Redis 官方对 Redis Modules 的介绍：[https://redis.io/modules](https://redis.io/modules)

另外，官网推荐了一个 RedisBloom 作为 Redis 布隆过滤器的 Module，地址：[https://github.com/RedisBloom/RedisBloom](https://github.com/RedisBloom/RedisBloom)
 其他还有：

- redis-lua-scaling-bloom-filter（lua 脚本实现）：[https://github.com/erikdubbelboer/redis-lua-scaling-bloom-filter](https://github.com/erikdubbelboer/redis-lua-scaling-bloom-filter)
- pyreBloom（Python 中的快速 Redis 布隆过滤器）：[https://github.com/seomoz/pyreBloom](https://github.com/seomoz/pyreBloom)
- ……

RedisBloom 提供了多种语言的客户端支持，包括：Python、Java、JavaScript 和 PHP。

#### 使用 Docker 安装

如果我们需要体验 Redis 中的布隆过滤器非常简单，通过 Docker 就可以了！我们直接在 Google 搜索 **docker redis bloomfilter** 然后在排除广告的第一条搜素结果就找到了我们想要的答案（这是我平常解决问题的一种方式，分享一下），具体地址：[https://hub.docker.com/r/redislabs/rebloom/](https://hub.docker.com/r/redislabs/rebloom/) （介绍的很详细 ）。

**具体操作如下：**

```bash
➜  ~ docker run -p 6379:6379 --name redis-redisbloom redislabs/rebloom:latest
➜  ~ docker exec -it redis-redisbloom bash
root@21396d02c252:/data# redis-cli
127.0.0.1:6379>
```

**注意：当前 rebloom 镜像已经被废弃，官方推荐使用[redis-stack](https://hub.docker.com/r/redis/redis-stack)**

#### 常用命令一览

> 注意：key : 布隆过滤器的名称，item : 添加的元素。

1. `BF.ADD`：将元素添加到布隆过滤器中，如果该过滤器尚不存在，则创建该过滤器。格式：`BF.ADD {key} {item}`。
2. `BF.MADD` : 将一个或多个元素添加到“布隆过滤器”中，并创建一个尚不存在的过滤器。该命令的操作方式`BF.ADD`与之相同，只不过它允许多个输入并返回多个值。格式：`BF.MADD {key} {item} [item ...]` 。
3. `BF.EXISTS` : 确定元素是否在布隆过滤器中存在。格式：`BF.EXISTS {key} {item}`。
4. `BF.MEXISTS`：确定一个或者多个元素是否在布隆过滤器中存在格式：`BF.MEXISTS {key} {item} [item ...]`。

另外， `BF.RESERVE` 命令需要单独介绍一下：

这个命令的格式如下：

`BF.RESERVE {key} {error_rate} {capacity} [EXPANSION expansion]` 。

下面简单介绍一下每个参数的具体含义：

1. key：布隆过滤器的名称
2. error_rate : 期望的误报率。该值必须介于 0 到 1 之间。例如，对于期望的误报率 0.1％（1000 中为 1），error_rate 应该设置为 0.001。该数字越接近零，则每个项目的内存消耗越大，并且每个操作的 CPU 使用率越高。
3. capacity: 过滤器的容量。当实际存储的元素个数超过这个值之后，性能将开始下降。实际的降级将取决于超出限制的程度。随着过滤器元素数量呈指数增长，性能将线性下降。

可选参数：

- expansion：如果创建了一个新的子过滤器，则其大小将是当前过滤器的大小乘以`expansion`。默认扩展值为 2。这意味着每个后续子过滤器将是前一个子过滤器的两倍。

#### 实际使用

```bash
127.0.0.1:6379> BF.ADD myFilter java
(integer) 1
127.0.0.1:6379> BF.ADD myFilter javaguide
(integer) 1
127.0.0.1:6379> BF.EXISTS myFilter java
(integer) 1
127.0.0.1:6379> BF.EXISTS myFilter javaguide
(integer) 1
127.0.0.1:6379> BF.EXISTS myFilter github
(integer) 0
```

# 算法

## 经典算法思想总结（含LeetCode题目推荐）

### 贪心算法

#### 算法思想

贪心的本质是选择每一阶段的局部最优，从而达到全局最优。

#### 一般解题步骤

- 将问题分解为若干个子问题
- 找出适合的贪心策略
- 求解每一个子问题的最优解
- 将局部最优解堆叠成全局最优解

#### LeetCode

455.分发饼干：[https://leetcode.cn/problems/assign-cookies/](https://leetcode.cn/problems/assign-cookies/)

121.买卖股票的最佳时机：[https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)

122.买卖股票的最佳时机 II：[https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)

55.跳跃游戏：[https://leetcode.cn/problems/jump-game/](https://leetcode.cn/problems/jump-game/)

45.跳跃游戏 II：https://leetcode.cn/problems/jump-game-ii/

### 动态规划

#### 算法思想

动态规划中每一个状态一定是由上一个状态推导出来的，这一点就区分于贪心，贪心没有状态推导，而是从局部直接选最优的。

经典题目：01 背包、完全背包

#### 一般解题步骤

- 确定 dp 数组（dp table）以及下标的含义
- 确定递推公式
- dp 数组如何初始化
- 确定遍历顺序
- 举例推导 dp 数组

#### LeetCode

509.斐波那契数：[https://leetcode.cn/problems/fibonacci-number/](https://leetcode.cn/problems/fibonacci-number/)

746.使用最小花费爬楼梯：[https://leetcode.cn/problems/min-cost-climbing-stairs/](https://leetcode.cn/problems/min-cost-climbing-stairs/)

416.分割等和子集：[https://leetcode.cn/problems/partition-equal-subset-sum/](https://leetcode.cn/problems/partition-equal-subset-sum/)

518.零钱兑换：[https://leetcode.cn/problems/coin-change-ii/](https://leetcode.cn/problems/coin-change-ii/)

647.回文子串：[https://leetcode.cn/problems/palindromic-substrings/](https://leetcode.cn/problems/palindromic-substrings/)

516.最长回文子序列：https://leetcode.cn/problems/longest-palindromic-subsequence/

### 回溯算法

#### 算法思想

回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条

件时，就“回溯”返回，尝试别的路径。其本质就是穷举。

经典题目：8 皇后

#### 一般解题步骤

- 针对所给问题，定义问题的解空间，它至少包含问题的一个（最优）解。
- 确定易于搜索的解空间结构,使得能用回溯法方便地搜索整个解空间 。
- 以深度优先的方式搜索解空间，并且在搜索过程中用剪枝函数避免无效搜索。

#### leetcode

77.组合：[https://leetcode.cn/problems/combinations/](https://leetcode.cn/problems/combinations/)

39.组合总和：[https://leetcode.cn/problems/combination-sum/](https://leetcode.cn/problems/combination-sum/)

40.组合总和 II：[https://leetcode.cn/problems/combination-sum-ii/](https://leetcode.cn/problems/combination-sum-ii/)

78.子集：[https://leetcode.cn/problems/subsets/](https://leetcode.cn/problems/subsets/)

90.子集 II：[https://leetcode.cn/problems/subsets-ii/](https://leetcode.cn/problems/subsets-ii/)

51.N 皇后：https://leetcode.cn/problems/n-queens/

### 分治算法

#### 算法思想

将一个规模为 N 的问题分解为 K 个规模较小的子问题，这些子问题相互独立且与原问题性质相同。求出子问题的解，就可得到原问题的解。

经典题目：二分查找、汉诺塔问题

#### 一般解题步骤

- 将原问题分解为若干个规模较小，相互独立，与原问题形式相同的子问题；
- 若子问题规模较小而容易被解决则直接解，否则递归地解各个子问题
- 将各个子问题的解合并为原问题的解。

#### LeetCode

108.将有序数组转换成二叉搜索数：[https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)

148.排序列表：[https://leetcode.cn/problems/sort-list/](https://leetcode.cn/problems/sort-list/)

23.合并 k 个升序链表：https://leetcode.cn/problems/merge-k-sorted-lists/

## 常见数据结构经典LeetCode题目推荐

### 数组

704.二分查找：[https://leetcode.cn/problems/binary-search/](https://leetcode.cn/problems/binary-search/)

80.删除有序数组中的重复项 II：[https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii)

977.有序数组的平方：[https://leetcode.cn/problems/squares-of-a-sorted-array/](https://leetcode.cn/problems/squares-of-a-sorted-array/)

### 链表

707.设计链表：[https://leetcode.cn/problems/design-linked-list/](https://leetcode.cn/problems/design-linked-list/)

206.反转链表：[https://leetcode.cn/problems/reverse-linked-list/](https://leetcode.cn/problems/reverse-linked-list/)

92.反转链表 II：[https://leetcode.cn/problems/reverse-linked-list-ii/](https://leetcode.cn/problems/reverse-linked-list-ii/)

61.旋转链表：[https://leetcode.cn/problems/rotate-list/](https://leetcode.cn/problems/rotate-list/)

### 栈与队列

232.用栈实现队列：[https://leetcode.cn/problems/implement-queue-using-stacks/](https://leetcode.cn/problems/implement-queue-using-stacks/)

225.用队列实现栈：[https://leetcode.cn/problems/implement-stack-using-queues/](https://leetcode.cn/problems/implement-stack-using-queues/)

347.前 K 个高频元素：[https://leetcode.cn/problems/top-k-frequent-elements/](https://leetcode.cn/problems/top-k-frequent-elements/)

239.滑动窗口最大值：[https://leetcode.cn/problems/sliding-window-maximum/](https://leetcode.cn/problems/sliding-window-maximum/)

### 二叉树

105.从前序与中序遍历构造二叉树：[https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

117.填充每个节点的下一个右侧节点指针 II：[https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii)

236.二叉树的最近公共祖先：[https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)

129.求根节点到叶节点数字之和：[https://leetcode.cn/problems/sum-root-to-leaf-numbers/](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)

102.二叉树的层序遍历：[https://leetcode.cn/problems/binary-tree-level-order-traversal/](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

530.二叉搜索树的最小绝对差：[https://leetcode.cn/problems/minimum-absolute-difference-in-bst/](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/)

### 图

200.岛屿数量：[https://leetcode.cn/problems/number-of-islands/](https://leetcode.cn/problems/number-of-islands/)

207.课程表：[https://leetcode.cn/problems/course-schedule/](https://leetcode.cn/problems/course-schedule/)

210.课程表 II：[https://leetcode.cn/problems/course-schedule-ii/](https://leetcode.cn/problems/course-schedule-ii/)

### 堆

215.数组中的第 K 个最大元素:[https://leetcode.cn/problems/kth-largest-element-in-an-array/](https://leetcode.cn/problems/kth-largest-element-in-an-array/)

216.数据流的中位数:[https://leetcode.cn/problems/find-median-from-data-stream/](https://leetcode.cn/problems/find-median-from-data-stream/)

217.前 K 个高频元素：https://leetcode.cn/problems/top-k-frequent-elements/

## 几道常见的字符串算法题

### KMP 算法

谈到字符串问题，不得不提的就是 KMP 算法，它是用来解决字符串查找的问题，可以在一个字符串（S）中查找一个子串（W）出现的位置。KMP 算法把字符匹配的时间复杂度缩小到 O(m+n) ,而空间复杂度也只有 O(m)。因为“暴力搜索”的方法会反复回溯主串，导致效率低下，而 KMP 算法可以利用已经部分匹配这个有效信息，保持主串上的指针不回溯，通过修改子串的指针，让模式串尽量地移动到有效的位置。

具体算法细节请参考：

- [从头到尾彻底理解 KMP:](https://blog.csdn.net/v_july_v/article/details/7041827)
- [如何更好的理解和掌握 KMP 算法?](https://www.zhihu.com/question/21923021)
- [KMP 算法详细解析](https://blog.sengxian.com/algorithms/kmp)
- [图解 KMP 算法](http://blog.jobbole.com/76611/)
- [汪都能听懂的 KMP 字符串匹配算法【双语字幕】](https://www.bilibili.com/video/av3246487/?from=search&seid=17173603269940723925)
- [KMP 字符串匹配算法 1](https://www.bilibili.com/video/av11866460?from=search&seid=12730654434238709250)

**除此之外，再来了解一下 BM 算法！**

> BM 算法也是一种精确字符串匹配算法，它采用从右向左比较的方法，同时应用到了两种启发式规则，即坏字符规则 和好后缀规则 ，来决定向右跳跃的距离。基本思路就是从右往左进行字符匹配，遇到不匹配的字符后从坏字符表和好后缀表找一个最大的右移值，将模式串右移继续匹配。
>  《字符串匹配的 KMP 算法》:http://www.ruanyifeng.com/blog/2013/05/Knuth–Morris–Pratt_algorithm.html

### 替换空格

> 剑指 offer：请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为 We Are Happy.则经过替换之后的字符串为 We%20Are%20Happy。

这里我提供了两种方法：① 常规方法；② 利用 API 解决。

```java
//https://www.weiweiblog.cn/replacespace/
public class Solution {

  /**
   * 第一种方法：常规方法。利用String.charAt(i)以及String.valueOf(char).equals(" "
   * )遍历字符串并判断元素是否为空格。是则替换为"%20",否则不替换
   */
  public static String replaceSpace(StringBuffer str) {

    int length = str.length();
    // System.out.println("length=" + length);
    StringBuffer result = new StringBuffer();
    for (int i = 0; i < length; i++) {
      char b = str.charAt(i);
      if (String.valueOf(b).equals(" ")) {
        result.append("%20");
      } else {
        result.append(b);
      }
    }
    return result.toString();

  }

  /**
   * 第二种方法：利用API替换掉所用空格，一行代码解决问题
   */
  public static String replaceSpace2(StringBuffer str) {

    return str.toString().replaceAll("\\s", "%20");
  }
}
```

对于替换固定字符（比如空格）的情况，第二种方法其实可以使用 `replace` 方法替换，性能更好!

```java
str.toString().replace(" ","%20");
```

### 最长公共前缀

> Leetcode: 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。

示例 1:

```plain
输入: ["flower","flow","flight"]
输出: "fl"
```

示例 2:

```plain
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

思路很简单！先利用 Arrays.sort(strs)为数组排序，再将数组第一个元素和最后一个元素的字符从前往后对比即可！

```java
public class Main {
 public static String replaceSpace(String[] strs) {

  // 如果检查值不合法及就返回空串
  if (!checkStrs(strs)) {
   return "";
  }
  // 数组长度
  int len = strs.length;
  // 用于保存结果
  StringBuilder res = new StringBuilder();
  // 给字符串数组的元素按照升序排序(包含数字的话，数字会排在前面)
  Arrays.sort(strs);
  int m = strs[0].length();
  int n = strs[len - 1].length();
  int num = Math.min(m, n);
  for (int i = 0; i < num; i++) {
   if (strs[0].charAt(i) == strs[len - 1].charAt(i)) {
    res.append(strs[0].charAt(i));
   } else
    break;

  }
  return res.toString();

 }

 private static boolean checkStrs(String[] strs) {
  boolean flag = false;
  if (strs != null) {
   // 遍历strs检查元素值
   for (int i = 0; i < strs.length; i++) {
    if (strs[i] != null && strs[i].length() != 0) {
     flag = true;
    } else {
     flag = false;
     break;
    }
   }
  }
  return flag;
 }

 // 测试
 public static void main(String[] args) {
  String[] strs = { "customer", "car", "cat" };
  // String[] strs = { "customer", "car", null };//空串
  // String[] strs = {};//空串
  // String[] strs = null;//空串
  System.out.println(Main.replaceSpace(strs));// c
 }
}
```

### 回文串

#### 最长回文串

> LeetCode: 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。在构造过程中，请注意区分大小写。比如`"Aa"`不能当做一个回文字符串。注
>  意:假设字符串的长度不会超过 1010。
>
> 回文串：“回文串”是一个正读和反读都一样的字符串，比如“level”或者“noon”等等就是回文串。——百度百科 地址：[https://baike.baidu.com/item/回文串/1274921?fr=aladdin](https://baike.baidu.com/item/回文串/1274921?fr=aladdin)

示例 1:

```plain
输入:
"abccccdd"

输出:
7

解释:
我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
```

我们上面已经知道了什么是回文串？现在我们考虑一下可以构成回文串的两种情况：

- 字符出现次数为双数的组合
- **字符出现次数为偶数的组合+单个字符中出现次数最多且为奇数次的字符** （参见 **[issue665](https://github.com/Snailclimb/JavaGuide/issues/665)** ）

统计字符出现的次数即可，双数才能构成回文。因为允许中间一个数单独出现，比如“abcba”，所以如果最后有字母落单，总长度可以加 1。首先将字符串转变为字符数组。然后遍历该数组，判断对应字符是否在 hashset 中，如果不在就加进去，如果在就让 count++，然后移除该字符！这样就能找到出现次数为双数的字符个数。

```java
//https://leetcode-cn.com/problems/longest-palindrome/description/
class Solution {
  public  int longestPalindrome(String s) {
    if (s.length() == 0)
      return 0;
    // 用于存放字符
    HashSet<Character> hashset = new HashSet<Character>();
    char[] chars = s.toCharArray();
    int count = 0;
    for (int i = 0; i < chars.length; i++) {
      if (!hashset.contains(chars[i])) {// 如果hashset没有该字符就保存进去
        hashset.add(chars[i]);
      } else {// 如果有,就让count++（说明找到了一个成对的字符），然后把该字符移除
        hashset.remove(chars[i]);
        count++;
      }
    }
    return hashset.isEmpty() ? count * 2 : count * 2 + 1;
  }
}
```

#### 验证回文串

> LeetCode: 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。 说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:

```plain
输入: "A man, a plan, a canal: Panama"
输出: true
```

示例 2:

```plain
输入: "race a car"
输出: false
```

```java
//https://leetcode-cn.com/problems/valid-palindrome/description/
class Solution {
  public  boolean isPalindrome(String s) {
    if (s.length() == 0)
      return true;
    int l = 0, r = s.length() - 1;
    while (l < r) {
      // 从头和尾开始向中间遍历
      if (!Character.isLetterOrDigit(s.charAt(l))) {// 字符不是字母和数字的情况
        l++;
      } else if (!Character.isLetterOrDigit(s.charAt(r))) {// 字符不是字母和数字的情况
        r--;
      } else {
        // 判断二者是否相等
        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
          return false;
        l++;
        r--;
      }
    }
    return true;
  }
}
```

#### 最长回文子串

> Leetcode: LeetCode: 最长回文子串 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

```plain
输入: "babad"
输出: "bab"
注意: "aba"也是一个有效答案。
```

示例 2：

```plain
输入: "cbbd"
输出: "bb"
```

以某个元素为中心，分别计算偶数长度的回文最大长度和奇数长度的回文最大长度。

```java
//https://leetcode-cn.com/problems/longest-palindromic-substring/description/
class Solution {
  private int index, len;

  public String longestPalindrome(String s) {
    if (s.length() < 2)
      return s;
    for (int i = 0; i < s.length() - 1; i++) {
      PalindromeHelper(s, i, i);
      PalindromeHelper(s, i, i + 1);
    }
    return s.substring(index, index + len);
  }

  public void PalindromeHelper(String s, int l, int r) {
    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
      l--;
      r++;
    }
    if (len < r - l - 1) {
      index = l + 1;
      len = r - l - 1;
    }
  }
}
```

#### 最长回文子序列

> LeetCode: 最长回文子序列
>  给定一个字符串 s，找到其中最长的回文子序列。可以假设 s 的最大长度为 1000。
> **最长回文子序列和上一题最长回文子串的区别是，子串是字符串中连续的一个序列，而子序列是字符串中保持相对位置的字符序列，例如，"bbbb"可以是字符串"bbbab"的子序列但不是子串。**

给定一个字符串 s，找到其中最长的回文子序列。可以假设 s 的最大长度为 1000。

示例 1:

```plain
输入:
"bbbab"
输出:
4
```

一个可能的最长回文子序列为 "bbbb"。

示例 2:

```plain
输入:
"cbbd"
输出:
2
```

一个可能的最长回文子序列为 "bb"。

**动态规划：** `dp[i][j] = dp[i+1][j-1] + 2 if s.charAt(i) == s.charAt(j) otherwise, dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1])`

```java
class Solution {
    public int longestPalindromeSubseq(String s) {
        int len = s.length();
        int [][] dp = new int[len][len];
        for(int i = len - 1; i>=0; i--){
            dp[i][i] = 1;
            for(int j = i+1; j < len; j++){
                if(s.charAt(i) == s.charAt(j))
                    dp[i][j] = dp[i+1][j-1] + 2;
                else
                    dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
        return dp[0][len-1];
    }
}
```

### 括号匹配深度

> 爱奇艺 2018 秋招 Java：
>  一个合法的括号匹配序列有以下定义:
>
> 1. 空串""是一个合法的括号匹配序列
> 2. 如果"X"和"Y"都是合法的括号匹配序列,"XY"也是一个合法的括号匹配序列
> 3. 如果"X"是一个合法的括号匹配序列,那么"(X)"也是一个合法的括号匹配序列
> 4. 每个合法的括号序列都可以由以上规则生成。
>
> 例如: "","()","()()","((()))"都是合法的括号序列
>  对于一个合法的括号序列我们又有以下定义它的深度:
>
> 1. 空串""的深度是 0
> 2. 如果字符串"X"的深度是 x,字符串"Y"的深度是 y,那么字符串"XY"的深度为 max(x,y)
> 3. 如果"X"的深度是 x,那么字符串"(X)"的深度是 x+1
>
> 例如: "()()()"的深度是 1,"((()))"的深度是 3。牛牛现在给你一个合法的括号序列,需要你计算出其深度。

```plain
输入描述:
输入包括一个合法的括号序列s,s长度length(2 ≤ length ≤ 50),序列中只包含'('和')'。

输出描述:
输出一个正整数,即这个序列的深度。
```

示例：

```plain
输入:
(())
输出:
2
```

代码如下：

```java
import java.util.Scanner;

/**
 * https://www.nowcoder.com/test/8246651/summary
 *
 * @author Snailclimb
 * @date 2018年9月6日
 * @Description: TODO 求给定合法括号序列的深度
 */
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String s = sc.nextLine();
    int cnt = 0, max = 0, i;
    for (i = 0; i < s.length(); ++i) {
      if (s.charAt(i) == '(')
        cnt++;
      else
        cnt--;
      max = Math.max(max, cnt);
    }
    sc.close();
    System.out.println(max);
  }
}
```

### 把字符串转换成整数

> 剑指 offer: 将一个字符串转换成一个整数(实现 Integer.valueOf(string)的功能，但是 string 不符合数字要求时返回 0)，要求不能使用字符串转换整数的库函数。 数值为 0 或者字符串不是一个合法的数值则返回 0。

```java
//https://www.weiweiblog.cn/strtoint/
public class Main {

  public static int StrToInt(String str) {
    if (str.length() == 0)
      return 0;
    char[] chars = str.toCharArray();
    // 判断是否存在符号位
    int flag = 0;
    if (chars[0] == '+')
      flag = 1;
    else if (chars[0] == '-')
      flag = 2;
    int start = flag > 0 ? 1 : 0;
    int res = 0;// 保存结果
    for (int i = start; i < chars.length; i++) {
      if (Character.isDigit(chars[i])) {// 调用Character.isDigit(char)方法判断是否是数字，是返回True，否则False
        int temp = chars[i] - '0';
        res = res * 10 + temp;
      } else {
        return 0;
      }
    }
   return flag != 2 ? res : -res;

  }

  public static void main(String[] args) {
    // TODO Auto-generated method stub
    String s = "-12312312";
    System.out.println("使用库函数转换：" + Integer.valueOf(s));
    int res = Main.StrToInt(s);
    System.out.println("使用自己写的方法转换：" + res);

  }

}
```

## 几道常见的链表算法题

### 两数相加

#### 题目描述

> Leetcode:给定两个非空链表来表示两个非负整数。位数按照逆序方式存储，它们的每个节点只存储单个数字。将两数相加返回一个新的链表。
>
> 你可以假设除了数字 0 之外，这两个数字都不会以零开头。

示例：

```plain
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

#### 问题分析

Leetcode 官方详细解答地址：

[https://leetcode-cn.com/problems/add-two-numbers/solution/](https://leetcode-cn.com/problems/add-two-numbers/solution/)

> 要对头结点进行操作时，考虑创建哑节点 dummy，使用 dummy->next 表示真正的头节点。这样可以避免处理头节点为空的边界问题。

我们使用变量来跟踪进位，并从包含最低有效位的表头开始模拟逐
 位相加的过程。

![](images\34910956.jpg)

#### Solution

**我们首先从最低有效位也就是列表 l1 和 l2 的表头开始相加。注意需要考虑到进位的情况！**

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
 //https://leetcode-cn.com/problems/add-two-numbers/description/
class Solution {
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummyHead = new ListNode(0);
    ListNode p = l1, q = l2, curr = dummyHead;
    //carry 表示进位数
    int carry = 0;
    while (p != null || q != null) {
        int x = (p != null) ? p.val : 0;
        int y = (q != null) ? q.val : 0;
        int sum = carry + x + y;
        //进位数
        carry = sum / 10;
        //新节点的数值为sum % 10
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (p != null) p = p.next;
        if (q != null) q = q.next;
    }
    if (carry > 0) {
        curr.next = new ListNode(carry);
    }
    return dummyHead.next;
}
}
```

### 翻转链表

#### 题目描述

> 剑指 offer:输入一个链表，反转链表后，输出链表的所有元素。

![](images\81431871.jpg)

#### 问题分析

这道算法题，说直白点就是：如何让后一个节点指向前一个节点！在下面的代码中定义了一个 next 节点，该节点主要是保存要反转到头的那个节点，防止链表 “断裂”。

#### Solution

```java
public class ListNode {
  int val;
  ListNode next = null;

  ListNode(int val) {
    this.val = val;
  }
}
```

```java
/**
 *
 * @author Snailclimb
 * @date 2018年9月19日
 * @Description: TODO
 */
public class Solution {

  public ListNode ReverseList(ListNode head) {

    ListNode next = null;
    ListNode pre = null;

    while (head != null) {
      // 保存要反转到头的那个节点
      next = head.next;
      // 要反转的那个节点指向已经反转的上一个节点(备注:第一次反转的时候会指向null)
      head.next = pre;
      // 上一个已经反转到头部的节点
      pre = head;
      // 一直向链表尾走
      head = next;
    }
    return pre;
  }

}
```

测试方法：

```java
  public static void main(String[] args) {

    ListNode a = new ListNode(1);
    ListNode b = new ListNode(2);
    ListNode c = new ListNode(3);
    ListNode d = new ListNode(4);
    ListNode e = new ListNode(5);
    a.next = b;
    b.next = c;
    c.next = d;
    d.next = e;
    new Solution().ReverseList(a);
    while (e != null) {
      System.out.println(e.val);
      e = e.next;
    }
  }
```

输出：

```plain
5
4
3
2
1
```

### 链表中倒数第 k 个节点

#### 题目描述

> 剑指 offer: 输入一个链表，输出该链表中倒数第 k 个结点。

#### 问题分析

> **链表中倒数第 k 个节点也就是正数第(L-K+1)个节点，知道了只一点，这一题基本就没问题！**

首先两个节点/指针，一个节点 node1 先开始跑，指针 node1 跑到 k-1 个节点后，另一个节点 node2 开始跑，当 node1 跑到最后时，node2 所指的节点就是倒数第 k 个节点也就是正数第(L-K+1)个节点。

#### Solution

```java
/*
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/

// 时间复杂度O(n),一次遍历即可
// https://www.nowcoder.com/practice/529d3ae5a407492994ad2a246518148a?tpId=13&tqId=11167&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking
public class Solution {
  public ListNode FindKthToTail(ListNode head, int k) {
    // 如果链表为空或者k小于等于0
    if (head == null || k <= 0) {
      return null;
    }
    // 声明两个指向头结点的节点
    ListNode node1 = head, node2 = head;
    // 记录节点的个数
    int count = 0;
    // 记录k值，后面要使用
    int index = k;
    // p指针先跑，并且记录节点数，当node1节点跑了k-1个节点后，node2节点开始跑，
    // 当node1节点跑到最后时，node2节点所指的节点就是倒数第k个节点
    while (node1 != null) {
      node1 = node1.next;
      count++;
      if (k < 1) {
        node2 = node2.next;
      }
      k--;
    }
    // 如果节点个数小于所求的倒数第k个节点，则返回空
    if (count < index)
      return null;
    return node2;

  }
}
```

### 删除链表的倒数第 N 个节点

> Leetcode:给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

**示例：**

```plain
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

**说明：**

给定的 n 保证是有效的。

**进阶：**

你能尝试使用一趟扫描实现吗？

该题在 leetcode 上有详细解答，具体可参考 Leetcode.

#### 问题分析

我们注意到这个问题可以容易地简化成另一个问题：删除从列表开头数起的第 (L - n + 1)个结点，其中 L 是列表的长度。只要我们找到列表的长度 L，这个问题就很容易解决。

![](images\94354387.jpg)

#### Solution

**两次遍历法**

首先我们将添加一个 **哑结点** 作为辅助，该结点位于列表头部。哑结点用来简化某些极端情况，例如列表中只含有一个结点，或需要删除列表的头部。在第一次遍历中，我们找出列表的长度 L。然后设置一个指向哑结点的指针，并移动它遍历列表，直至它到达第 (L - n) 个结点那里。**我们把第 (L - n)个结点的 next 指针重新链接至第 (L - n + 2)个结点，完成这个算法。**

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
// https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
public class Solution {
  public ListNode removeNthFromEnd(ListNode head, int n) {
    // 哑结点，哑结点用来简化某些极端情况，例如列表中只含有一个结点，或需要删除列表的头部
    ListNode dummy = new ListNode(0);
    // 哑结点指向头结点
    dummy.next = head;
    // 保存链表长度
    int length = 0;
    ListNode len = head;
    while (len != null) {
      length++;
      len = len.next;
    }
    length = length - n;
    ListNode target = dummy;
    // 找到 L-n 位置的节点
    while (length > 0) {
      target = target.next;
      length--;
    }
    // 把第 (L - n)个结点的 next 指针重新链接至第 (L - n + 2)个结点
    target.next = target.next.next;
    return dummy.next;
  }
}
```

**进阶——一次遍历法：**

> 链表中倒数第 N 个节点也就是正数第(L - n + 1)个节点。

其实这种方法就和我们上面第四题找“链表中倒数第 k 个节点”所用的思想是一样的。**基本思路就是：** 定义两个节点 node1、node2;node1 节点先跑，node1 节点 跑到第 n+1 个节点的时候,node2 节点开始跑.当 node1 节点跑到最后一个节点时，node2 节点所在的位置就是第 （L - n ） 个节点（L 代表总链表长度，也就是倒数第 n + 1 个节点）

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
  public ListNode removeNthFromEnd(ListNode head, int n) {

    ListNode dummy = new ListNode(0);
    dummy.next = head;
    // 声明两个指向头结点的节点
    ListNode node1 = dummy, node2 = dummy;

    // node1 节点先跑，node1节点 跑到第 n 个节点的时候,node2 节点开始跑
    // 当node1 节点跑到最后一个节点时，node2 节点所在的位置就是第 （L-n ） 个节点，也就是倒数第 n+1（L代表总链表长度）
    while (node1 != null) {
      node1 = node1.next;
      if (n < 1 && node1 != null) {
        node2 = node2.next;
      }
      n--;
    }

    node2.next = node2.next.next;

    return dummy.next;

  }
}
```

### 合并两个排序的链表

#### 题目描述

> 剑指 offer:输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

#### 问题分析

我们可以这样分析:

1. 假设我们有两个链表 A,B；
2. A 的头节点 A1 的值与 B 的头结点 B1 的值比较，假设 A1 小，则 A1 为头节点；
3. A2 再和 B1 比较，假设 B1 小,则，A1 指向 B1；
4. A2 再和 B2 比较
    就这样循环往复就行了，应该还算好理解。

考虑通过递归的方式实现！

#### Solution

**递归版本：**

```java
/*
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/
//https://www.nowcoder.com/practice/d8b6b4358f774294a89de2a6ac4d9337?tpId=13&tqId=11169&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking
public class Solution {
  public ListNode Merge(ListNode list1, ListNode list2) {
    if (list1 == null) {
      return list2;
    }
    if (list2 == null) {
      return list1;
    }
    if (list1.val <= list2.val) {
      list1.next = Merge(list1.next, list2);
      return list1;
    } else {
      list2.next = Merge(list1, list2.next);
      return list2;
    }
  }
}
```

## 剑指offer部分编程题

### 斐波那契数列

**题目描述：**

大家都知道斐波那契数列，现在要求输入一个整数 n，请你输出斐波那契数列的第 n 项。
 n<=39

**问题分析：**

可以肯定的是这一题通过递归的方式是肯定能做出来，但是这样会有一个很大的问题，那就是递归大量的重复计算会导致内存溢出。另外可以使用迭代法，用 fn1 和 fn2 保存计算过程中的结果，并复用起来。下面我会把两个方法示例代码都给出来并给出两个方法的运行时间对比。

**示例代码：**

采用迭代法：

```java
int Fibonacci(int number) {
    if (number <= 0) {
        return 0;
    }
    if (number == 1 || number == 2) {
        return 1;
    }
    int first = 1, second = 1, third = 0;
    for (int i = 3; i <= number; i++) {
        third = first + second;
        first = second;
        second = third;
    }
    return third;
}
```

采用递归：

```java
public int Fibonacci(int n) {
    if (n <= 0) {
        return 0;
    }
    if (n == 1||n==2) {
        return 1;
    }

    return Fibonacci(n - 2) + Fibonacci(n - 1);
}
```

### 跳台阶问题

**题目描述：**

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

**问题分析：**

正常分析法：

> a.如果两种跳法，1 阶或者 2 阶，那么假定第一次跳的是一阶，那么剩下的是 n-1 个台阶，跳法是 f(n-1);
>  b.假定第一次跳的是 2 阶，那么剩下的是 n-2 个台阶，跳法是 f(n-2)
>  c.由 a，b 假设可以得出总跳法为: f(n) = f(n-1) + f(n-2)
>  d.然后通过实际的情况可以得出：只有一阶的时候 f(1) = 1 ,只有两阶的时候可以有 f(2) = 2

找规律分析法：

> f(1) = 1, f(2) = 2, f(3) = 3, f(4) = 5， 可以总结出 f(n) = f(n-1) + f(n-2)的规律。但是为什么会出现这样的规律呢？假设现在 6 个台阶，我们可以从第 5 跳一步到 6，这样的话有多少种方案跳到 5 就有多少种方案跳到 6，另外我们也可以从 4 跳两步跳到 6，跳到 4 有多少种方案的话，就有多少种方案跳到 6，其他的不能从 3 跳到 6 什么的啦，所以最后就是 f(6) = f(5) + f(4)；这样子也很好理解变态跳台阶的问题了。

**所以这道题其实就是斐波那契数列的问题。**

代码只需要在上一题的代码稍做修改即可。和上一题唯一不同的就是这一题的初始元素变为 1 2 3 5 8……而上一题为 1 1 2 3 5 ……。另外这一题也可以用递归做，但是递归效率太低，所以我这里只给出了迭代方式的代码。

**示例代码：**

```java
int jumpFloor(int number) {
    if (number <= 0) {
        return 0;
    }
    if (number == 1) {
        return 1;
    }
    if (number == 2) {
        return 2;
    }
    int first = 1, second = 2, third = 0;
    for (int i = 3; i <= number; i++) {
        third = first + second;
        first = second;
        second = third;
    }
    return third;
}
```

### 变态跳台阶问题

**题目描述：**

一只青蛙一次可以跳上 1 级台阶，也可以跳上 2 级……它也可以跳上 n 级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

**问题分析：**

假设 n>=2，第一步有 n 种跳法：跳 1 级、跳 2 级、到跳 n 级
 跳 1 级，剩下 n-1 级，则剩下跳法是 f(n-1)
 跳 2 级，剩下 n-2 级，则剩下跳法是 f(n-2)
 ……
 跳 n-1 级，剩下 1 级，则剩下跳法是 f(1)
 跳 n 级，剩下 0 级，则剩下跳法是 f(0)
 所以在 n>=2 的情况下：
 f(n)=f(n-1)+f(n-2)+...+f(1)
 因为 f(n-1)=f(n-2)+f(n-3)+...+f(1)
 所以 f(n)=2*f(n-1) 又 f(1)=1,所以可得**f(n)=2^(number-1)**

**示例代码：**

```java
int JumpFloorII(int number) {
    return 1 << --number;//2^(number-1)用位移操作进行，更快
}
```

**补充：**

java 中有三种移位运算符：

1. “<<” : **左移运算符**，等同于乘 2 的 n 次方
2. “>>”: **右移运算符**，等同于除 2 的 n 次方
3. “>>>” : **无符号右移运算符**，不管移动前最高位是 0 还是 1，右移后左侧产生的空位部分都以 0 来填充。与>>类似。

```java
int a = 16;
int b = a << 2;//左移2，等同于16 * 2的2次方，也就是16 * 4
int c = a >> 2;//右移2，等同于16 / 2的2次方，也就是16 / 4
```

### 二维数组查找

**题目描述：**

在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

**问题解析：**

这一道题还是比较简单的，我们需要考虑的是如何做，效率最快。这里有一种很好理解的思路：

> 矩阵是有序的，从左下角来看，向上数字递减，向右数字递增，
>  因此从左下角开始查找，当要查找数字比左下角数字大时。右移
>  要查找数字比左下角数字小时，上移。这样找的速度最快。

**示例代码：**

```java
public boolean Find(int target, int [][] array) {
    //基本思路从左下角开始找，这样速度最快
    int row = array.length-1;//行
    int column = 0;//列
    //当行数大于0，当前列数小于总列数时循环条件成立
    while((row >= 0)&& (column< array[0].length)){
        if(array[row][column] > target){
            row--;
        }else if(array[row][column] < target){
            column++;
        }else{
            return true;
        }
    }
    return false;
}
```

### 替换空格

**题目描述：**

请实现一个函数，将一个字符串中的空格替换成“%20”。例如，当字符串为 We Are Happy.则经过替换之后的字符串为 We%20Are%20Happy。

**问题分析：**

这道题不难，我们可以通过循环判断字符串的字符是否为空格，是的话就利用 append()方法添加追加“%20”，否则还是追加原字符。

或者最简单的方法就是利用：replaceAll(String regex,String replacement)方法了，一行代码就可以解决。

**示例代码：**

常规做法：

```java
public String replaceSpace(StringBuffer str) {
    StringBuffer out = new StringBuffer();
    for (int i = 0; i < str.toString().length(); i++) {
        char b = str.charAt(i);
        if(String.valueOf(b).equals(" ")){
            out.append("%20");
        }else{
            out.append(b);
        }
    }
    return out.toString();
}
```

一行代码解决：

```java
public String replaceSpace(StringBuffer str) {
    //return str.toString().replaceAll(" ", "%20");
    //public String replaceAll(String regex,String replacement)
    //用给定的替换替换与给定的regular expression匹配的此字符串的每个子字符串。
    //\ 转义字符. 如果你要使用 "\" 本身, 则应该使用 "\\". String类型中的空格用“\s”表示，所以我这里猜测"\\s"就是代表空格的意思
    return str.toString().replaceAll("\\s", "%20");
}
```

### 数值的整数次方

**题目描述：**

给定一个 double 类型的浮点数 base 和 int 类型的整数 exponent。求 base 的 exponent 次方。

**问题解析：**

这道题算是比较麻烦和难一点的一个了。我这里采用的是**二分幂**思想，当然也可以采用**快速幂**。
 更具剑指 offer 书中细节，该题的解题思路如下：1.当底数为 0 且指数<0 时，会出现对 0 求倒数的情况，需进行错误处理，设置一个全局变量； 2.判断底数是否等于 0，由于 base 为 double 型，所以不能直接用==判断 3.优化求幂函数（二分幂）。
 当 n 为偶数，a^n =（a^n/2）*（a^n/2）；
 当 n 为奇数，a^n = a[[1\]](#footnote1)* a[[2\]](#footnote2) * a。时间复杂度 O(logn)

**时间复杂度**：O(logn)

**示例代码：**

```java
public class Solution {
      boolean invalidInput=false;
      public double Power(double base, int exponent) {
          //如果底数等于0并且指数小于0
          //由于base为double型，不能直接用==判断
        if(equal(base,0.0)&&exponent<0){
            invalidInput=true;
            return 0.0;
        }
        int absexponent=exponent;
         //如果指数小于0，将指数转正
        if(exponent<0)
            absexponent=-exponent;
         //getPower方法求出base的exponent次方。
        double res=getPower(base,absexponent);
         //如果指数小于0，所得结果为上面求的结果的倒数
        if(exponent<0)
            res=1.0/res;
        return res;
  }
    //比较两个double型变量是否相等的方法
    boolean equal(double num1,double num2){
        if(num1-num2>-0.000001&&num1-num2<0.000001)
            return true;
        else
            return false;
    }
    //求出b的e次方的方法
    double getPower(double b,int e){
        //如果指数为0，返回1
        if(e==0)
            return 1.0;
        //如果指数为1，返回b
        if(e==1)
            return b;
        //e>>1相等于e/2，这里就是求a^n =（a^n/2）*（a^n/2）
        double result=getPower(b,e>>1);
        result*=result;
        //如果指数n为奇数，则要再乘一次底数base
        if((e&1)==1)
            result*=b;
        return result;
    }
}
```

当然这一题也可以采用笨方法：累乘。不过这种方法的时间复杂度为 O（n），这样没有前一种方法效率高。

```java
// 使用累乘
public double powerAnother(double base, int exponent) {
    double result = 1.0;
    for (int i = 0; i < Math.abs(exponent); i++) {
        result *= base;
    }
    if (exponent >= 0)
        return result;
    else
        return 1 / result;
}
```

### 调整数组顺序使奇数位于偶数前面

**题目描述：**

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。

**问题解析：**

这道题有挺多种解法的，给大家介绍一种我觉得挺好理解的方法：
 我们首先统计奇数的个数假设为 n,然后新建一个等长数组，然后通过循环判断原数组中的元素为偶数还是奇数。如果是则从数组下标 0 的元素开始，把该奇数添加到新数组；如果是偶数则从数组下标为 n 的元素开始把该偶数添加到新数组中。

**示例代码：**

时间复杂度为 O（n），空间复杂度为 O（n）的算法

```java
public class Solution {
    public void reOrderArray(int [] array) {
        //如果数组长度等于0或者等于1，什么都不做直接返回
        if(array.length==0||array.length==1)
            return;
        //oddCount：保存奇数个数
        //oddBegin：奇数从数组头部开始添加
        int oddCount=0,oddBegin=0;
        //新建一个数组
        int[] newArray=new int[array.length];
        //计算出（数组中的奇数个数）开始添加元素
        for(int i=0;i<array.length;i++){
            if((array[i]&1)==1) oddCount++;
        }
        for(int i=0;i<array.length;i++){
            //如果数为基数新数组从头开始添加元素
            //如果为偶数就从oddCount（数组中的奇数个数）开始添加元素
            if((array[i]&1)==1)
                newArray[oddBegin++]=array[i];
            else newArray[oddCount++]=array[i];
        }
        for(int i=0;i<array.length;i++){
            array[i]=newArray[i];
        }
    }
}
```

### 链表中倒数第 k 个节点

**题目描述：**

输入一个链表，输出该链表中倒数第 k 个结点

**问题分析：**

**一句话概括：**
 两个指针一个指针 p1 先开始跑，指针 p1 跑到 k-1 个节点后，另一个节点 p2 开始跑，当 p1 跑到最后时，p2 所指的指针就是倒数第 k 个节点。

**思想的简单理解：**
 前提假设：链表的结点个数(长度)为 n。
 规律一：要找到倒数第 k 个结点，需要向前走多少步呢？比如倒数第一个结点，需要走 n 步，那倒数第二个结点呢？很明显是向前走了 n-1 步，所以可以找到规律是找到倒数第 k 个结点，需要向前走 n-k+1 步。

**算法开始：**

1. 设两个都指向 head 的指针 p1 和 p2，当 p1 走了 k-1 步的时候，停下来。p2 之前一直不动。
2. p1 的下一步是走第 k 步，这个时候，p2 开始一起动了。至于为什么 p2 这个时候动呢？看下面的分析。
3. 当 p1 走到链表的尾部时，即 p1 走了 n 步。由于我们知道 p2 是在 p1 走了 k-1 步才开始动的，也就是说 p1 和 p2 永远差 k-1 步。所以当 p1 走了 n 步时，p2 走的应该是在 n-(k-1)步。即 p2 走了 n-k+1 步，此时巧妙的是 p2 正好指向的是规律一的倒数第 k 个结点处。
    这样是不是很好理解了呢？

**考察内容：**

链表+代码的鲁棒性

**示例代码：**

```java
/*
//链表类
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/

//时间复杂度O(n),一次遍历即可
public class Solution {
    public ListNode FindKthToTail(ListNode head,int k) {
        ListNode pre=null,p=null;
        //两个指针都指向头结点
        p=head;
        pre=head;
        //记录k值
        int a=k;
        //记录节点的个数
        int count=0;
        //p指针先跑，并且记录节点数，当p指针跑了k-1个节点后，pre指针开始跑，
        //当p指针跑到最后时，pre所指指针就是倒数第k个节点
        while(p!=null){
            p=p.next;
            count++;
            if(k<1){
                pre=pre.next;
            }
            k--;
        }
        //如果节点个数小于所求的倒数第k个节点，则返回空
        if(count<a) return null;
        return pre;

    }
}
```

### 反转链表

**题目描述：**

输入一个链表，反转链表后，输出链表的所有元素。

**问题分析：**

链表的很常规的一道题，这一道题思路不算难，但自己实现起来真的可能会感觉无从下手，我是参考了别人的代码。
 思路就是我们根据链表的特点，前一个节点指向下一个节点的特点，把后面的节点移到前面来。
 就比如下图：我们把 1 节点和 2 节点互换位置，然后再将 3 节点指向 2 节点，4 节点指向 3 节点，这样以来下面的链表就被反转了。

![](images\844773c7300e4373922bb1a6ae2a55a3~tplv-k3u1fbpfcp-zoom-1.png)

**考察内容：**

链表+代码的鲁棒性

**示例代码：**

```java
/*
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/
public class Solution {
    public ListNode ReverseList(ListNode head) {
       ListNode next = null;
       ListNode pre = null;
        while (head != null) {
              //保存要反转到头来的那个节点
               next = head.next;
               //要反转的那个节点指向已经反转的上一个节点
               head.next = pre;
               //上一个已经反转到头部的节点
               pre = head;
               //一直向链表尾走
               head = next;
        }
        return pre;
    }
}
```

### 合并两个排序的链表

**题目描述：**

输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

**问题分析：**

我们可以这样分析:

1. 假设我们有两个链表 A,B；
2. A 的头节点 A1 的值与 B 的头结点 B1 的值比较，假设 A1 小，则 A1 为头节点；
3. A2 再和 B1 比较，假设 B1 小,则，A1 指向 B1；
4. A2 再和 B2 比较。。。。。。。
    就这样循环往复就行了，应该还算好理解。

**考察内容：**

链表+代码的鲁棒性

**示例代码：**

非递归版本：

```java
/*
public class ListNode {
    int val;
    ListNode next = null;

    ListNode(int val) {
        this.val = val;
    }
}*/
public class Solution {
    public ListNode Merge(ListNode list1,ListNode list2) {
       //list1为空，直接返回list2
       if(list1 == null){
            return list2;
        }
        //list2为空，直接返回list1
        if(list2 == null){
            return list1;
        }
        ListNode mergeHead = null;
        ListNode current = null;
        //当list1和list2不为空时
        while(list1!=null && list2!=null){
            //取较小值作头结点
            if(list1.val <= list2.val){
                if(mergeHead == null){
                   mergeHead = current = list1;
                }else{
                   current.next = list1;
                    //current节点保存list1节点的值因为下一次还要用
                   current = list1;
                }
                //list1指向下一个节点
                list1 = list1.next;
            }else{
                if(mergeHead == null){
                   mergeHead = current = list2;
                }else{
                   current.next = list2;
                     //current节点保存list2节点的值因为下一次还要用
                   current = list2;
                }
                //list2指向下一个节点
                list2 = list2.next;
            }
        }
        if(list1 == null){
            current.next = list2;
        }else{
            current.next = list1;
        }
        return mergeHead;
    }
}
```

递归版本：

```java
public ListNode Merge(ListNode list1,ListNode list2) {
    if(list1 == null){
        return list2;
    }
    if(list2 == null){
        return list1;
    }
    if(list1.val <= list2.val){
        list1.next = Merge(list1.next, list2);
        return list1;
    }else{
        list2.next = Merge(list1, list2.next);
        return list2;
    }
}
```

### 用两个栈实现队列

**题目描述：**

用两个栈来实现一个队列，完成队列的 Push 和 Pop 操作。 队列中的元素为 int 类型。

**问题分析：**

先来回顾一下栈和队列的基本特点：
 **栈：**后进先出（LIFO）
**队列：** 先进先出
 很明显我们需要根据 JDK 给我们提供的栈的一些基本方法来实现。先来看一下 Stack 类的一些基本方法：

![](images\5985000.jpg)

既然题目给了我们两个栈，我们可以这样考虑当 push 的时候将元素 push 进 stack1，pop 的时候我们先把 stack1 的元素 pop 到 stack2，然后再对 stack2 执行 pop 操作，这样就可以保证是先进先出的。（负[pop]负[pop]得正[先进先出]）

**考察内容：**

队列+栈

示例代码：

```java
//左程云的《程序员代码面试指南》的答案
import java.util.Stack;

public class Solution {
    Stack<Integer> stack1 = new Stack<Integer>();
    Stack<Integer> stack2 = new Stack<Integer>();

    //当执行push操作时，将元素添加到stack1
    public void push(int node) {
        stack1.push(node);
    }

    public int pop() {
        //如果两个队列都为空则抛出异常,说明用户没有push进任何元素
        if(stack1.empty()&&stack2.empty()){
            throw new RuntimeException("Queue is empty!");
        }
        //如果stack2不为空直接对stack2执行pop操作，
        if(stack2.empty()){
            while(!stack1.empty()){
                //将stack1的元素按后进先出push进stack2里面
                stack2.push(stack1.pop());
            }
        }
          return stack2.pop();
    }
}
```

### 栈的压入,弹出序列

**题目描述：**

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列 1,2,3,4,5 是某栈的压入顺序，序列 4，5,3,2,1 是该压栈序列对应的一个弹出序列，但 4,3,5,1,2 就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）

**题目分析：**

这道题想了半天没有思路，参考了 [Alias 的答案](https://www.nowcoder.com/questionTerminal/d77d11405cc7470d82554cb392585106)，他的思路写的也很详细应该很容易看懂。

【思路】借用一个辅助的栈，遍历压栈顺序，先讲第一个放入栈中，这里是 1，然后判断栈顶元素是不是出栈顺序的第一个元素，这里是 4，很显然 1≠4，所以我们继续压栈，直到相等以后开始出栈，出栈一个元素，则将出栈顺序向后移动一位，直到不相等，这样循环等压栈顺序遍历完成，如果辅助栈还不为空，说明弹出序列不是该栈的弹出顺序。

举例：

入栈 1,2,3,4,5

出栈 4,5,3,2,1

首先 1 入辅助栈，此时栈顶 1≠4，继续入栈 2

此时栈顶 2≠4，继续入栈 3

此时栈顶 3≠4，继续入栈 4

此时栈顶 4 ＝ 4，出栈 4，弹出序列向后一位，此时为 5，,辅助栈里面是 1,2,3

此时栈顶 3≠5，继续入栈 5

此时栈顶 5=5，出栈 5,弹出序列向后一位，此时为 3，,辅助栈里面是 1,2,3

…….
 依次执行，最后辅助栈为空。如果不为空说明弹出序列不是该栈的弹出顺序。

**考察内容：**

栈

**示例代码：**

```java
import java.util.ArrayList;
import java.util.Stack;
//这道题没想出来，参考了Alias同学的答案：https://www.nowcoder.com/questionTerminal/d77d11405cc7470d82554cb392585106
public class Solution {
    public boolean IsPopOrder(int [] pushA,int [] popA) {
        if(pushA.length == 0 || popA.length == 0)
            return false;
        Stack<Integer> s = new Stack<Integer>();
        //用于标识弹出序列的位置
        int popIndex = 0;
        for(int i = 0; i< pushA.length;i++){
            s.push(pushA[i]);
            //如果栈不为空，且栈顶元素等于弹出序列
            while(!s.empty() &&s.peek() == popA[popIndex]){
                //出栈
                s.pop();
                //弹出序列向后一位
                popIndex++;
            }
        }
        return s.empty();
    }
}
```

## 十大经典排序算法总结

### 引言

所谓排序，就是使一串记录，按照其中的某个或某些关键字的大小，递增或递减的排列起来的操作。排序算法，就是如何使得记录按照要求排列的方法。排序算法在很多领域得到相当地重视，尤其是在大量数据的处理方面。一个优秀的算法可以节省大量的资源。在各个领域中考虑到数据的各种限制和规范，要得到一个符合实际的优秀算法，得经过大量的推理和分析。

两年前，我曾在[博客园](https://www.cnblogs.com/guoyaohua/)发布过一篇[《十大经典排序算法最强总结（含 JAVA 代码实现）》](https://www.cnblogs.com/guoyaohua/p/8600214.html)博文，简要介绍了比较经典的十大排序算法，不过在之前的博文中，仅给出了 Java 版本的代码实现，并且有一些细节上的错误。所以，今天重新写一篇文章，深入了解下十大经典排序算法的原理及实现。

### 简介

排序算法可以分为：

- **内部排序**：数据记录在内存中进行排序。
- **[外部排序](https://zh.wikipedia.org/wiki/外排序)**：因排序的数据很大，一次不能容纳全部的排序记录，在排序过程中需要访问外存。

常见的内部排序算法有：**插入排序**、**希尔排序**、**选择排序**、**冒泡排序**、**归并排序**、**快速排序**、**堆排序**、**基数排序**等，本文只讲解内部排序算法。用一张图概括：

![](images\sort1.png)

上图存在错误：

1. 插入排序的最好时间复杂度为 O(n) 而不是 O(n^2^)。
2. 希尔排序的平均时间复杂度为 O(nlogn)。

**图片名词解释：**

- **n**：数据规模
- **k**：“桶” 的个数
- **In-place**：占用常数内存，不占用额外内存
- **Out-place**：占用额外内存

#### 术语说明

- **稳定**：如果 A 原本在 B 前面，而 A=B，排序之后 A 仍然在 B 的前面。
- **不稳定**：如果 A 原本在 B 的前面，而 A=B，排序之后 A 可能会出现在 B 的后面。
- **内排序**：所有排序操作都在内存中完成。
- **外排序**：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行。
- **时间复杂度**：定性描述一个算法执行所耗费的时间。
- **空间复杂度**：定性描述一个算法执行所需内存的大小。

#### 算法分类

十种常见排序算法可以分类两大类别：**比较类排序**和**非比较类排序**。

![](images\sort2.png)

常见的**快速排序**、**归并排序**、**堆排序**以及**冒泡排序**等都属于**比较类排序算法**。比较类排序是通过比较来决定元素间的相对次序，由于其时间复杂度不能突破 `O(nlogn)`，因此也称为非线性时间比较类排序。在冒泡排序之类的排序中，问题规模为 `n`，又因为需要比较 `n` 次，所以平均时间复杂度为 `O(n²)`。在**归并排序**、**快速排序**之类的排序中，问题规模通过**分治法**消减为 `logn` 次，所以时间复杂度平均 `O(nlogn)`。

比较类排序的优势是，适用于各种规模的数据，也不在乎数据的分布，都能进行排序。可以说，比较排序适用于一切需要排序的情况。

而**计数排序**、**基数排序**、**桶排序**则属于**非比较类排序算法**。非比较排序不通过比较来决定元素间的相对次序，而是通过确定每个元素之前，应该有多少个元素来排序。由于它可以突破基于比较排序的时间下界，以线性时间运行，因此称为线性时间非比较类排序。 非比较排序只要确定每个元素之前的已有的元素个数即可，所有一次遍历即可解决。算法时间复杂度 O(n)。

非比较排序时间复杂度底，但由于非比较排序需要占用空间来确定唯一位置。所以对数据规模和数据分布有一定的要求。

### 冒泡排序 (Bubble Sort)   ✅

冒泡排序是一种简单的排序算法。它重复地遍历要排序的序列，依次比较两个元素，如果它们的顺序错误就把它们交换过来。遍历序列的工作是重复地进行直到没有再需要交换为止，此时说明该序列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢 “浮” 到数列的顶端。

#### 算法步骤

1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
3. 针对所有的元素重复以上的步骤，除了最后一个；
4. 重复步骤 1~3，直到排序完成。

#### 图解算法

![](images\bubble_sort.gif)

#### 代码实现

```java
package Test_Package_01;

import java.util.Scanner;

/**
 * ClassName: bubbleSort
 * Package: Test_Package_01
 * Description:
 *
 * @Author: ZHJ
 * @Creat: 2024/5/18 - 21:59
 * @Version:
 */
public class BubbleSort {
    public static void sort(int[] arr){
        boolean is_sorted;
        for(int i=0;i<arr.length-1;++i){
            is_sorted = true;
            for(int j=0;j<arr.length-1-i;++j){
                if(arr[j]>arr[j+1]){
                    int temp = arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                    is_sorted = false;
                }
            }
            if(is_sorted){  // 提前排序好了就直接退出，不用再继续比较了
                break;
            }
        }
    }
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0;i< arr.length;++i){
            arr[i] = sc.nextInt();
        }
        sort(arr);
        for (int val : arr) {
            System.out.print(val+" ");
        }
    }
}
```

**此处对代码做了一个小优化，加入了 `is_sorted` Flag，目的是将算法的最佳时间复杂度优化为 `O(n)`，即当原输入序列就是排序好的情况下，该算法的时间复杂度就是 `O(n)`。**

#### 算法分析

- **稳定性**：稳定
- **时间复杂度**：最佳：$O(n)$，最差：$O(n^2)$， 平均：$O(n^2)$
- **空间复杂度**：$O(1)$
- **排序方式**：$In-place$

### 选择排序 (Selection Sort)  ✅

选择排序是一种简单直观的排序算法，无论什么数据进去都是 $O(n^2)$ 的时间复杂度。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

#### 算法步骤

1. 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
2. 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
3. 重复第 2 步，直到所有元素均排序完毕。

#### 图解算法

![](images\selection_sort.gif)

#### 代码实现

```java
package Test_Package_01;

import javax.naming.PartialResultException;
import java.util.Scanner;

/**
 * ClassName: SelectionSort
 * Package: Test_Package_01
 * Description:
 *
 * @Author: ZHJ
 * @Creat: 2024/5/19 - 20:31
 * @Version:
 */
public class SelectionSort {
    public static int[] sort(int[] arr){
        for(int i=0;i<arr.length-1;++i){
            int minIndex = i;  // 从小到大排序
            for(int j=i+1;j<arr.length;++j){
                if(arr[minIndex]>arr[j]){
                    minIndex=j;
                }
            }
            if(minIndex!=i){
                int temp = arr[i];
                arr[i]=arr[minIndex];
                arr[minIndex]=temp;
            }
        }
        return arr;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0;i<n;++i){
            arr[i]=sc.nextInt();
        }
        int[] sortArr = sort(arr);
        for(int val:sortArr){
            System.out.print(val+" ");
        }
    }
}

```

#### 算法分析

- **稳定性**：稳定
- **时间复杂度**：最佳：$O(n^2)$，最差：$O(n^2)$， 平均：$O(n^2)$
- **空间复杂度**：$O(1)$
- **排序方式**：$In-place$

### 插入排序 (Insertion Sort)   ✅

插入排序是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用 in-place 排序（即只需用到 O(1) 的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

插入排序的代码实现虽然没有冒泡排序和选择排序那么简单粗暴，但它的原理应该是最容易理解的了，因为只要**打过扑克牌**的人都应该能够秒懂。插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入。

#### 算法步骤

1. 从第一个元素开始，该元素可以认为已经被排序；
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置；
4. 重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置；
5. 将新元素插入到该位置后；
6. 重复步骤 2~5。

#### 图解算法

![](images\insertion_sort.gif)

#### 代码实现

```java
package Test_Package_01;

import java.util.Scanner;

/**
 * ClassName: InsertionSort
 * Package: Test_Package_01
 * Description:
 *
 * @Author: ZHJ
 * @Creat: 2024/5/19 - 20:47
 * @Version:
 */
public class InsertionSort {
    public static int[] insertionSort(int[] arr){
        // i = 0 的值视为已排序
        for(int i=1;i<arr.length;++i){
            int preIndex = i-1;  // 已排序序列的最后一个下标
            int curVal = arr[i];  
            while(preIndex>=0 && arr[preIndex] > curVal){
                arr[preIndex+1] = arr[preIndex];  // 向后移
                preIndex-=1;
            }
            arr[preIndex+1] = curVal;  // 插入
        }
        return arr;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0;i<n;++i){
            arr[i]=sc.nextInt();
        }
        int[] sortArr = insertionSort(arr);
        for(int val : sortArr){
            System.out.print(val+" ");
        }
    }
}

```

#### 算法分析

- **稳定性**：稳定
- **时间复杂度**：最佳：$O(n)$，最差：$O(n^2)$， 平均：$O(n^2)$
- **空间复杂度**：$O(1)$
- **排序方式**：$In-place$

### 希尔排序 (Shell Sort)  ✅

希尔排序是希尔 (Donald Shell) 于 1959 年提出的一种排序算法。**希尔排序也是一种插入排序**，它是简单插入排序经过改进之后的一个更高效的版本，也称为递减增量排序算法，同时该算法是冲破 O(n2) 的第一批算法之一。

希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录 “基本有序” 时，再对全体记录进行依次直接插入排序。

#### 算法步骤

我们来看下希尔排序的基本步骤，在此我们选择**增量** gap=length/2，缩小增量继续以 gap=gap/2 的方式，这种增量选择我们可以用一个序列来表示，{n/2,(n/2)/2,…,1}，称为**增量序列**。希尔排序的增量序列的选择与证明是个数学难题，我们选择的这个增量序列是比较常用的，也是希尔建议的增量，称为希尔增量，但其实这个增量序列不是最优的。此处我们做示例使用希尔增量。

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：

- 选择一个增量序列 {t1,t2,…,tk}，其中 ti>tj,i<j,tk=1；
- 按增量序列个数 k，对序列进行 k 趟排序；
- 每趟排序，根据对应的增量 t，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

#### 图解算法

![](images\shell_sort.png)

#### 代码实现

```java
package Test_Package_01;

import java.util.Scanner;

/**
 * ClassName: ShellSort
 * Package: Test_Package_01
 * Description:
 *
 * @Author: ZHJ
 * @Creat: 2024/5/19 - 21:11
 * @Version:
 */
public class ShellSort {
    public static int[] shellSort(int[] arr){
        int len = arr.length;
        int gap = len / 2;
        while(gap > 0){
            for(int i=gap;i<len;++i){
                int curVal = arr[i];
                int preIndex = i - gap;
                while(preIndex>=0 && curVal < arr[preIndex]){
                    arr[preIndex + gap] = arr[preIndex];
                    preIndex -= gap;
                }
                arr[preIndex + gap] = curVal;
            }
            gap = gap / 2;
        }
        return arr;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0;i<n;++i){
            arr[i]=sc.nextInt();
        }
        int[] sortArr = shellSort(arr);
        for(int val : sortArr){
            System.out.print(val+" ");
        }
    }
}

```

#### 算法分析

- **稳定性**：不稳定
- **时间复杂度**：最佳：$O(nlogn)$，最差：$O(n^2)$， 平均：$O(nlogn)$
- **空间复杂度**：$O(1)$

### 归并排序 (Merge Sort)  ✅

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用**分治法** (Divide and Conquer) 的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为 2 - 路归并。

和**选择排序**一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是 O(nlogn) 的时间复杂度。代价是需要额外的内存空间。

#### 算法步骤

归并排序算法是一个递归过程，边界条件为当输入序列仅有一个元素时，直接返回，具体过程如下：

1. 如果输入内只有一个元素，则直接返回，否则将长度为 n 的输入序列分成两个长度为 n/2 的子序列；
2. 分别对这两个子序列进行归并排序，使子序列变为有序状态；
3. 设定两个指针，分别指向两个已经排序子序列的起始位置；
4. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间（用于存放排序结果），并移动指针到下一位置；
5. 重复步骤 3 ~ 4 直到某一指针达到序列尾；
6. 将另一序列剩下的所有元素直接复制到合并序列尾。

#### 图解算法

![](images\merge_sort.gif)

#### 代码实现

```java
package Test_Package_01;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Scanner;

/**
 * ClassName: MergeSort
 * Package: Test_Package_01
 * Description:  归并排序
 *
 * @Author: ZHJ
 * @Creat: 2024/5/19 - 21:32
 * @Version:
 */
public class MergeSort {
    public static int[] mergeSort(int[] arr){
        if(arr.length <= 1){
            return arr;
        }
        int middle = arr.length/2;  // 分成两块
        int[] arr_1 = Arrays.copyOfRange(arr,0,middle);
        int[] arr_2 = Arrays.copyOfRange(arr,middle,arr.length);
        return merge(mergeSort(arr_1),mergeSort(arr_2));   // 递归的不断分成两块，然后两块合成一块
    }
    public static int[] merge(int[] arr_1,int[] arr_2){
            int[] sortArr = new int[arr_1.length + arr_2.length];
            int index = 0, index_1 = 0, index_2 = 0;
            while(index_1< arr_1.length && index_2< arr_2.length){
                if(arr_1[index_1] < arr_2[index_2]){
                    sortArr[index] = arr_1[index_1];
                    index_1++;
                }else{
                    sortArr[index] = arr_2[index_2];
                    index_2++;
                }
                index++;
            }
            // 其中一个数组已经排完,另一个数组还有剩余的直接复制到后面
            if(index_1 < arr_1.length) {
                while (index_1 < arr_1.length) {
                    sortArr[index++] = arr_1[index_1++];
                }
            }else{
                while(index_2 < arr_2.length){
                    sortArr[index++] = arr_2[index_2++];
                }
            }
            return sortArr;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for(int i=0;i<n;++i){
            arr[i]=sc.nextInt();
        }
        int[] sortArr = mergeSort(arr);
        for(int val : sortArr){
            System.out.print(val+" ");
        }
    }
}

```

#### 算法分析

- **稳定性**：稳定
- **时间复杂度**：最佳：$O(nlogn)$，最差：$O(nlogn)$， 平均：$O(nlogn)$
- **空间复杂度**：$O(n)$

### 快速排序 (Quick Sort) ✅

快速排序用到了分治思想，同样的还有归并排序。乍看起来快速排序和归并排序非常相似，都是将问题变小，先排序子串，最后合并。不同的是快速排序在划分子问题的时候经过多一步处理，将划分的两组数据划分为一大一小，这样在最后合并的时候就不必像归并排序那样再进行比较。但也正因为如此，划分的不定性使得快速排序的时间复杂度并不稳定。

快速排序的基本思想：通过一趟排序将待排序列分隔成独立的两部分，其中一部分记录的元素均比另一部分的元素小，则可分别对这两部分子序列继续进行排序，以达到整个序列有序。

####  算法步骤

快速排序使用[分治法](https://zh.wikipedia.org/wiki/分治法)（Divide and conquer）策略来把一个序列分为较小和较大的 2 个子序列，然后递归地排序两个子序列。具体算法描述如下：

1. 从序列中**随机**挑出一个元素，做为 “**基准**”(`pivot`)；
2. 重新排列序列，将所有比基准值小的元素摆放在基准前面，所有比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个操作结束之后，该基准就处于数列的中间位置。这个称为**分区**（partition）操作；
3. 递归地把小于基准值元素的子序列和大于基准值元素的子序列进行快速排序。

#### 图解算法

![](images\random_quick_sort.gif)

#### 代码实现

> 来源：[使用 Java 实现快速排序（详解）](https://segmentfault.com/a/1190000040022056)

```java
public static int partition(int[] array, int low, int high) {
    int pivot = array[high];
    int pointer = low;
    for (int i = low; i < high; i++) {
        if (array[i] <= pivot) {
            int temp = array[i];
            array[i] = array[pointer];
            array[pointer] = temp;
            pointer++;
        }
        System.out.println(Arrays.toString(array));
    }
    int temp = array[pointer];
    array[pointer] = array[high];
    array[high] = temp;
    return pointer;
}
public static void quickSort(int[] array, int low, int high) {
    if (low < high) {
        int position = partition(array, low, high);
        quickSort(array, low, position - 1);
        quickSort(array, position + 1, high);
    }
}
```

#### 算法分析

- **稳定性**：不稳定
- **时间复杂度**：最佳：$O(nlogn)$，最差：$O(nlogn)$， 平均：$O(nlogn)$
- **空间复杂度**：$O(nlogn)$

### 堆排序 (Heap Sort) ✅

堆排序是指利用堆这种数据结构所设计的一种排序算法。堆是一个近似完全二叉树的结构，并同时满足**堆的性质**：即**子结点的值总是小于（或者大于）它的父节点**。

#### 算法步骤

1. 将初始待排序列 (R1,R2,…,Rn) 构建成大顶堆，此堆为初始的无序区；
2. 将堆顶元素 R1 与最后一个元素 Rn 交换，此时得到新的无序区 (R1,R2,…,Rn−1) 和新的有序区 Rn, 且满足 Ri⩽Rn(i∈1,2,…,n−1)；
3. 由于交换后新的堆顶 R1 可能违反堆的性质，因此需要对当前无序区 (R1,R2,…,Rn−1) 调整为新堆，然后再次将 R1 与无序区最后一个元素交换，得到新的无序区 (R1,R2,…,Rn−2) 和新的有序区 (Rn−1,Rn)。不断重复此过程直到有序区的元素个数为 n−1，则整个排序过程完成。

#### 图解算法

![](images\heap_sort.gif)

####  代码实现

```java
package Test_Package_01;

import java.util.Scanner;

/**
 * ClassName: HeapSort
 * Package: Test_Package_01
 * Description:  堆排序
 *
 * @Author: ZHJ
 * @Creat: 2024/5/16 - 17:16
 * @Version:
 */
public class HeapSort {
    // 全局变量，用于记录数组的长度
    static int heapLen;

    /**
     * 交换数组的两个元素
     * @param arr 数组
     * @param i 第一个元素的索引
     * @param j 第二个元素的索引
     */
    private static void swap(int[] arr, int i, int j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    /**
     * 构建最大堆，将初始的无序数组抽象为一棵树，并构建为一个最大堆
     * 建堆的过程就是一个对所有 非叶节点 的 自顶向下堆化 过程
     * 对于一个包含`n`个元素的完全二叉树：
     * - 叶子节点的位置从`n/2`到`n-1`（如果从0开始索引）
     * - 非叶子节点的位置从`0`到`n/2 - 1`
     * @param arr 数组
     */
    private static void buildMaxHeap(int[] arr) {
        // 从第一个非叶子结点开始，依次进行堆化
        for (int i = arr.length / 2 - 1; i >= 0; i--) {
            heapify(arr, i);
        }
    }

    /**
     * 自顶向下进行堆化：将当前节点和其左右子节点进行比较，最大的换上来，反复迭代，直到叶子节点
     * @param arr 数组
     * @param i 当前节点的索引
     */
    private static void heapify(int[] arr, int i) {
        int left = 2 * i + 1; // 当前节点的左子节点索引
        int right = 2 * i + 2; // 当前节点的右子节点索引
        int largest = i; // 假设当前节点是最大值

        // 如果右子节点存在且大于当前最大值
        if (right < heapLen && arr[right] > arr[largest]) {
            largest = right;
        }
        // 如果左子节点存在且大于当前最大值
        if (left < heapLen && arr[left] > arr[largest]) {
            largest = left;
        }
        // 如果最大值不是当前节点，说明上面进行比较时最大值换了
        if (largest != i) {
            swap(arr, largest, i); // 交换最大值与当前节点
            heapify(arr, largest); // 递归调整子树
        }
    }

    /**
     * 堆排序
     * @param arr 待排序的数组
     * @return 排序后的数组
     */
    public static int[] heapSort(int[] arr) {
        // 初始化堆长度
        heapLen = arr.length;
        // 构建最大堆
        buildMaxHeap(arr);
        // 逐步将最大值移到数组末尾，并调整堆
        for (int i = arr.length - 1; i > 0; i--) {
            // 将堆顶元素（最大值）移动到当前堆的末尾
            swap(arr, 0, i);
            heapLen -= 1;  // 减少堆的长度，防止放在末尾的元素重新参与堆化排序
            heapify(arr, 0);  // 调整堆顶元素的位置：堆化
        }
        return arr; // 返回排序后的数组
    }

    // 测试函数
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();  // 排序数量
        int[] arr = new int[n];
        for(int i=0;i<n;++i){
            arr[i]=sc.nextInt();
        }

        System.out.println("未排序数组: " + java.util.Arrays.toString(arr));

        arr = heapSort(arr);

        System.out.println("已排序数组: " + java.util.Arrays.toString(arr));
    }
}
```

#### 算法分析

- **稳定性**：不稳定
- **时间复杂度**：最佳：$O(nlogn)$，最差：$O(nlogn)$， 平均：$O(nlogn)$
- **空间复杂度**：$O(1)$

### 计数排序 (Counting Sort)

计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，**计数排序要求输入的数据必须是有确定范围的整数**。

计数排序 (Counting sort) 是一种稳定的排序算法。计数排序使用一个额外的数组 `C`，其中第 `i` 个元素是待排序数组 `A` 中值等于 `i` 的元素的个数。然后根据数组 `C` 来将 `A` 中的元素排到正确的位置。**它只能对整数进行排序**。

#### 算法步骤

1. 找出数组中的<u>最大值 `max`、最小值 `min`</u>；
2. 创建一个新数组 `C`，其长度是 `max-min+1`，其元素默认值都为 0；
3. 遍历原数组 `A` 中的元素 `A[i]`，以 `A[i] - min` 作为 `C` 数组的索引，以 `A[i]` 的值在 `A` 中元素**出现次数**作为 `C[A[i] - min]` 的值；
4. 对 `C` 数组变形，**新元素的值是该元素与前一个元素值的和**，即当 `i>1` 时 `C[i] = C[i] + C[i-1]`；
5. 创建结果数组 `R`，长度和原始数组一样。
6. **从后向前**遍历原始数组 `A` 中的元素 `A[i]`，使用 `A[i]` 减去最小值 `min` 作为索引，在计数数组 `C` 中找到对应的值 `C[A[i] - min]`，`C[A[i] - min] - 1` 就是 `A[i]` 在结果数组 `R` 中的位置，做完上述这些操作，将 `count[A[i] - min]` 减小 1。

#### 图解算法

![](images\counting_sort.gif)

#### 代码实现

```java
/**
 * Gets the maximum and minimum values in the array
 *
 * @param arr
 * @return
 */
private static int[] getMinAndMax(int[] arr) {
    int maxValue = arr[0];
    int minValue = arr[0];
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] > maxValue) {
            maxValue = arr[i];
        } else if (arr[i] < minValue) {
            minValue = arr[i];
        }
    }
    return new int[] { minValue, maxValue };
}

/**
 * Counting Sort
 *
 * @param arr
 * @return
 */
public static int[] countingSort(int[] arr) {
    if (arr.length < 2) {
        return arr;
    }
    int[] extremum = getMinAndMax(arr);
    int minValue = extremum[0];
    int maxValue = extremum[1];
    // 初始化计数数组
    int[] countArr = new int[maxValue - minValue + 1];
    // 初始化结果数值
    int[] result = new int[arr.length];

    // 填充计数数组
    // 遍历输入数组 arr，对于每个元素 arr[i]，在 countArr 中对应的位置增加计数。通过减去 minValue 来对齐数组下标。
	// 例如，如果 arr 是 [4, 6, 4, 5]，minValue 是 4，那么 countArr 会变成 [2, 1, 1]，分别表示 4 出现了两次，5 出现了一次，6 出现了一次。
    for (int i = 0; i < arr.length; i++) {
        countArr[arr[i] - minValue] += 1;
    }
    // 将 countArr 转换为累积计数数组。累积计数数组中的每个元素表示小于等于当前值的元素总数
    // 例如，上面的 countArr [2, 1, 1] 变成累积计数数组 [2, 3, 4]。这意味着：
	// 数值 4 及其以下的元素有 2 个。
	// 数值 5 及其以下的元素有 3 个。
	// 数值 6 及其以下的元素有 4 个。
    for (int i = 1; i < countArr.length; i++) {
        countArr[i] += countArr[i - 1];
    }
    // 倒序遍历保证排序的稳定性，即不改变相同元素原有的相对顺序
    for (int i = arr.length - 1; i >= 0; i--) {
        int idx = countArr[arr[i] - minValue] - 1;  // 减 1 是因为数组索引从 0 开始
        result[idx] = arr[i];              // 将元素放置到 result 数组中
        countArr[arr[i] - minValue] -= 1;  // 更新 countArr 以反映下一个相同元素的位置
    }
    return result;
}
```

#### 算法分析

当输入的元素是 `n` 个 `0` 到 `k` 之间的整数时，它的运行时间是 O(n+k)。计数排序不是比较排序，排序的速度快于任何比较排序算法。由于用来计数的数组 `C` 的长度取决于待排序数组中数据的范围（等于待排序数组的**最大值与最小值的差加上 1**），这使得计数排序对于数据范围很大的数组，需要大量额外内存空间。

- **稳定性**：稳定
- **时间复杂度**：最佳：$O(n+k)$ 最差：$O(n+k)$ 平均：$O(n+k)$
- **空间复杂度**：$O(k)$

### 桶排序 (Bucket Sort)

**桶排序是计数排序的升级版**。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。为了使桶排序更加高效，我们需要做到这两点：

1. 在额外空间充足的情况下，尽量增大桶的数量
2. 使用的映射函数能够将输入的 N 个数据均匀的分配到 K 个桶中

桶排序的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行。

#### 算法步骤

1. 设置一个 BucketSize，作为每个桶所能放置多少个不同数值；
2. 遍历输入数据，并且把数据依次映射到对应的桶里去；
3. 对每个非空的桶进行排序，可以使用其它排序方法，也可以递归使用桶排序；
4. 从非空桶里把排好序的数据拼接起来。

#### 图解算法

![](images\bucket_sort.gif)

#### 代码实现

```java
/**
 * 获取数组中的最大值和最小值
 *
 * @param arr 输入的整数列表
 * @return 包含最小值和最大值的数组，最小值在索引0，最大值在索引1
 */
private static int[] getMinAndMax(List<Integer> arr) {
    int maxValue = arr.get(0); // 用第一个元素初始化最大值
    int minValue = arr.get(0); // 用第一个元素初始化最小值
    for (int i : arr) {
        if (i > maxValue) {
            maxValue = i; // 如果当前元素大于最大值，更新最大值
        } else if (i < minValue) {
            minValue = i; // 如果当前元素小于最小值，更新最小值
        }
    }
    return new int[]{minValue, maxValue}; // 返回最小值和最大值
}

/**
 * 桶排序
 *
 * @param arr 输入的整数列表
 * @param bucket_size 每个桶的大小
 * @return 排序后的整数列表
 */
public static List<Integer> bucketSort(List<Integer> arr, int bucket_size) {
    // 如果数组长度小于2或桶大小为0，直接返回数组
    if (arr.size() < 2 || bucket_size == 0) {
        return arr;
    }

    // 获取数组中的最小值和最大值
    int[] extremum = getMinAndMax(arr);
    int minValue = extremum[0];
    int maxValue = extremum[1];

    // 计算桶的数量
    int bucket_cnt = (maxValue - minValue) / bucket_size + 1;

    // 初始化桶
    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i < bucket_cnt; i++) {
        buckets.add(new ArrayList<Integer>());
    }

    // 将元素分配到各个桶中
    for (int element : arr) {
        int idx = (element - minValue) / bucket_size;
        buckets.get(idx).add(element);
    }

    // 对每个非空桶递归地进行桶排序
    for (int i = 0; i < buckets.size(); i++) {
        if (buckets.get(i).size() > 1) {
            buckets.set(i, bucketSort(buckets.get(i), bucket_size / 2));
        }
    }

    // 将所有桶中的元素合并成一个有序列表
    ArrayList<Integer> result = new ArrayList<>();
    for (List<Integer> bucket : buckets) {
        for (int element : bucket) {
            result.add(element);
        }
    }
    return result; // 返回排序后的结果列表
}
```

#### 算法分析

- **稳定性**：稳定
- **时间复杂度**：最佳：$O(n+k)$   最差：$O(n^2)$   平均：$O(n+k)$
- **空间复杂度**：$O(n+k)$

### 基数排序 (Radix Sort)

基数排序也是非比较的排序算法，对元素中的每一位数字进行排序，从最低位开始排序，复杂度为 O(n×k)，n 为数组长度，k 为数组中元素的最大的位数；

基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。基数排序基于分别排序，分别收集，所以是**稳定**的。

#### 算法步骤

1. 取得数组中的最大数，并取得位数，即为<u>迭代次数 N</u>（例如：数组中最大数值为 1000，则 N=4）；
2. `A` 为原始数组，从最低位开始取每个位组成 `radix` 数组；
3. 对 `radix` 进行计数排序（利用计数排序适用于小范围数的特点）；
4. 将 `radix` 依次赋值给原数组；
5. 重复 2~4 步骤 N 次

#### 图解算法

![](images\radix_sort.gif)

#### 代码实现

```java
/**
 * 基数排序
 *
 * @param arr 输入的整数数组
 * @return 排序后的整数数组
 */
public static int[] radixSort(int[] arr) {
    // 如果数组长度小于2，直接返回数组
    if (arr.length < 2) {
        return arr;
    }

    int N = 1; // 用于计算最大值的位数
    int maxValue = arr[0]; // 用第一个元素初始化最大值

    // 找到数组中的最大值
    for (int element : arr) {
        if (element > maxValue) {
            maxValue = element;
        }
    }

    // 计算最大值的位数
    while (maxValue / 10 != 0) {
        maxValue = maxValue / 10;
        N += 1;
    }

    // 进行 N 次排序，N 是最大值的位数
    for (int i = 0; i < N; i++) {
        // 初始化桶，基数为0-9，共10个桶
        List<List<Integer>> radix = new ArrayList<>();
        for (int k = 0; k < 10; k++) {
            radix.add(new ArrayList<Integer>());
        }

        // 将元素按照当前位数的值放入相应的桶中
        for (int element : arr) {
            // 提取元素 element 的第 i 位数字（从右往左数，从0开始）
            int idx = (element / (int) Math.pow(10, i)) % 10;
            radix.get(idx).add(element);
        }

        // 将桶中的元素按顺序放回数组中
        int idx = 0;
        for (List<Integer> l : radix) {
            for (int n : l) {
                arr[idx++] = n;
            }
        }
    }

    // 返回排序后的数组
    return arr;
}
```

#### 详细解释

1. **数组长度检查**：
   - 如果数组长度小于2，直接返回数组，因为一个元素或空数组已经是有序的。
2. **找出最大值**：
   - 遍历数组找到最大值 `maxValue`，用于确定需要进行多少次排序（最大值的位数）。
3. **计算最大值的位数**：
   - 通过循环除以10，计算出最大值 `maxValue` 的位数 `N`。
4. **进行基数排序**：
   - 对数组进行 `N` 次排序，每次按从低位到高位的顺序（个位、十位、百位等）。
   - 每次排序时，初始化10个桶，每个桶对应一位的0-9。
5. **分配元素到桶**：
   - 根据当前位数 `i` 的值，将元素分配到相应的桶中。
   - 例如，如果 `i` 为0（个位），`element / (int) Math.pow(10, i) % 10` 计算出元素的个位数，将其放入对应的桶中。
6. **将桶中的元素放回数组**：
   - 按顺序遍历所有桶，将桶中的元素按顺序放回原数组中，完成当前位数的排序。
7. **返回排序后的数组**：
   - 所有位数排序完成后，返回最终排序好的数组。

8. `int idx = (element / (int) Math.pow(10, i)) % 10;` ：提取元素 `element` 的第 `i` 位数字（从右往左数，从0开始）

   - `Math.pow(10, i)`：这个函数返回 `10` 的 `i` 次方，即 `10^i`。

   - `(int) Math.pow(10, i)`：将 `10^i` 强制转换为整数，因为 `Math.pow()` 返回的是 `double` 类型。

   - `element / (int) Math.pow(10, i)`：这一步将 `element` 向右移动 `i` 位，丢弃小数部分，只保留整数部分。例如，如果 `element` 是 `7325`，`i` 是 `2`，则计算结果是 `73`。

   - `element / (int) Math.pow(10, i) % 10`：这一步获取 `element` 在第 `i` 位上的数字。例如，对于 `7325` 和 `i = 2`，计算结果是 `73 % 10 = 3`，即 `element` 的十位数字。

####  算法分析

- **稳定性**：稳定
- **时间复杂度**：最佳：$O(n×k)$ 最差：$O(n×k)$  平均：$O(n×k)$ 
- **空间复杂度**：$O(n×k)$ 

**基数排序 vs 计数排序 vs 桶排序**

这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：

- 基数排序：根据键值的每**位**数字来分配桶
- 计数排序：每个桶只存储单一键值
- 桶排序：每个桶存储一定范围的数值


## 参考文章

- [https://www.cnblogs.com/guoyaohua/p/8600214.html](https://www.cnblogs.com/guoyaohua/p/8600214.html)
- [https://en.wikipedia.org/wiki/Sorting_algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm)
- https://sort.hust.cc/















