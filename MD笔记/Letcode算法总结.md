[toc]

# 算法性能分析

[代码随想录-算法性能分析](https://www.programmercarl.com/%E5%89%8D%E5%BA%8F/%E5%85%B3%E4%BA%8E%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6%EF%BC%8C%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%E9%83%BD%E5%9C%A8%E8%BF%99%E9%87%8C%EF%BC%81.html#%E7%A9%B6%E7%AB%9F%E4%BB%80%E4%B9%88%E6%98%AF%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6) 

## 时间复杂度

## 空间复杂度

## 递归算法性能分析

## 内存对齐

**为什么会有内存对齐？**

主要是两个原因

1.平台原因：不是所有的硬件平台都能访问任意内存地址上的任意数据，某些硬件平台只能在某些地址处取某些特定类型的数据，否则抛出硬件异常。为了同一个程序可以在多平台运行，需要内存对齐。

2.硬件原因：经过内存对齐后，CPU访问内存的速度大大提升。

![内存对齐](images\内存对齐.png)

**大家可能会发现内存对齐岂不是浪费的内存资源么？**

是这样的，但事实上，相对来说计算机内存资源一般都是充足的，我们更希望的是提高运行速度。



# 数组

## 二分法
有序，无重复元素
两种：左闭右闭、左闭右开
`int middle = left + ((right - left) >> 1);`  `>>` 右移一位 相当于除以2

**数组排序(`Arrays.sort(arr1)`)**  

> [二分查找](https://leetcode.cn/problems/binary-search/)  简单
>
> [搜索插入位置](https://leetcode.cn/problems/search-insert-position/)  简单
>
> [在排序数组中查找元素的第一个和最后一个位置](https://programmercarl.com/0034.%E5%9C%A8%E6%8E%92%E5%BA%8F%E6%95%B0%E7%BB%84%E4%B8%AD%E6%9F%A5%E6%89%BE%E5%85%83%E7%B4%A0%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%92%8C%E6%9C%80%E5%90%8E%E4%B8%80%E4%B8%AA%E4%BD%8D%E7%BD%AE.html)    🌟中等：两个二分查找，找左边界和有边界
>
>  [x的平方根](https://leetcode.cn/problems/sqrtx/description/)  简单：二分查找  注意超限 用 long
>
> [有效的完全平方数](https://leetcode.cn/problems/valid-perfect-square/description/) 简单：二分查找  注意超限 用 long

## 双指针法
**通过一个快指针和慢指针在一个for循环下完成两个for循环的工作。**
快慢指针、相向指针、滑动窗口、螺旋矩阵

当想创建一个**不知道大小的数组**时，可以使用 **ArrayList** 集合  `List<Integer> list = new ArrayList<>();` 

集合转数组： Collection的方法 --- `toArray(T[] array)`  无参数默认返回 `object` 类型的数组

> ✅3.11  [移除数组元素](https://www.programmercarl.com/0027.%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0.html)  简单：快慢指针、相向指针
>
> ❌3.11  [删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)  简单：快慢指针
>
> ✅3.11  [移动零](https://leetcode.cn/problems/move-zeroes/)  简单：快慢指针
>
> ❌3.11  [比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/)   双指针法(🌟不简单 ❌3.11)   栈方法(简单✅3.11)
>
> ✅3.11  [有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)  简单：相向双指针

> 所谓**滑动窗口**，**就是不断的调节子序列的起始位置和终止位置，从而得出我们要想的结果**。
> [长度最小的子数组](https://www.programmercarl.com/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.html#%E6%80%9D%E8%B7%AF)   🌟  中等
>
> 1.滑动窗口
>
> 2.哈希表  **HashMap** ：key值不重复
>
> [水果成篮](https://leetcode.cn/problems/fruit-into-baskets/)  🌟🌟中等：最大滑动窗口   **哈希表**  ：`Map<String,Integer> map = new HashMap<>();` 
>
> [最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)  🌟🌟🌟 **困难**：滑动窗口  哈希表

> [螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii/)   中等：一层一层的填入元素
>
> [螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)  中等：一层一层的获取元素  比上一个更难一点
>
> [螺旋遍历二维数组](https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/)   简单：与上一个相同的题
>
> [有序矩阵中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)    中等 

# 链表

大多都用双指针可以解！

> [移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)    简单：添加虚拟头节点dumy

> [设计链表](https://leetcode.cn/problems/design-linked-list/)  🌟中等：操作链表的题目   单链表  双链表  链表的增删查

> ✅3.12   [反转链表](https://leetcode.cn/problems/reverse-linked-list/)   简单：双指针法  递归法

> [两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)  🌟  中等：后端面试高频题  两个指针保存要交换的两个节点  临时指针保存两个交换节点的后面节点 两两一轮  或者 递归法

> ✅3.12  [删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)  中等：快慢指针  fast快指针要先走 n+1 步 然后两个指针一起走，这样当fast指向null时，slow指向 倒数第 n+1 个节点

> ✅3.12   [面试题 02.07. 链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/)  简单：两个循环暴力破解；或者**哈希集合**对比是否已存在(最简单)；或者双指针。

> ❌3.12   [环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)  🌟🌟🌟 中等：**哈希表(简单)**  或者  双指针：最好看Krahets图解   数学知识   考得挺多! 
>
> [环形链表](https://leetcode.cn/problems/linked-list-cycle/)  简单： 判断是否有环  双指针 或者 **用哈希表**。

# 哈希表

`HashSet`   `HashMap` 

总结一下，**当我们遇到了要快速判断一个元素是否出现集合里的时候，就要考虑哈希法**。

但是哈希法也是**牺牲了空间换取了时间**，因为我们要使用额外的数组，set或者是map来存放数据，才能实现快速的查找。

如果在做面试题目的时候遇到需要**判断一个元素是否出现过的场景**也应该第一时间想到哈希法！

扩展1---**添加元素**：

Conllection 单列集合 List + Set 都用 **`add()`** 方法添加元素， Set中添加失败(重复了)返回 false ，否则返回 true；

Map 双列集合 才用 **`put()`** 方法添加元素 ，调用put方法时，如果已经存在一个相同的key，则返回的是前一个key对应的value(旧值)，同时该key的新value覆盖旧value；如果是新的一个key，则返回的是null；

扩展2---**长度**：

数组 长度用 `arr.length;` 

字符串 长度用 `str.length(); `

集合 长度用 `hm.size();` 

扩展3---**遍历**:

单列集合 Set 和 List 都可以直接用增强for循环(ForEach循环)来遍历  例如：`for(int val:list){...}` ；

双列集合 Map 也可以用增强for循环(ForEach循环)来遍历 但是要确定是 key 还是 value；

**`map.keySet()`** --- key集合     **`map.values()`** --- 值集合

例如1：`for (Integer key : map.keySet()){...}`  或者 `for (Integer value : map.values()){...}` 

**`map.entrySet()`** ---- 键值对对象集合

例如2：`for (Map.Entry<Integer, Integer> entry : map.entrySet()) {...}`  
			**`entry.getKey()`**  --- 键值对对象获取key      **`entry.getValue())`  -**-- 键值对对象获取value

扩展4---**其他方法**：

**`get(key)`** 

​		Map集合使用则获取 Key 对应的 value 值，没有这个键值对，则返回null；

​		List集合则根据 索引index 获取 value 值；

​		**Set集合没有索引也没有Key值所以没有get()方法**；

**`contains(Object o)`** 

​		底层是依赖equals方法来判断对象是否是一致的。如果存的是自定义对象，那么要重写equals方法

双列集合 Map 特有:

**`containsKey(Object key)`** --- 判断 当前集合中是否包含指定key值，存在返回ture，否则返回 false；

**`containsValue(Object value)`** --- 判断 当前集合中是否包含指定value值，存在返回ture，否则返回 false；

**`getOrDefault(key,defaultValue)`** --- 获取 key 对应的 value 值，**如果不存在则返回defaultValue**(就不会返回null了)；defaultValue的值是可以指定的； 

> [有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)   简单：哈希表：判断一个元素是否出现以及出现次数 ---> HashMap
>
> [字母异位词分组](https://leetcode.cn/problems/group-anagrams/)    中等：在上一题的基础上  要求分组； 方法：哈希表+排序，**字母异位词排序后是一样的**，用字母异位词的相同点做标记，进行分组；key---排序后一样的字符串,  value---存储字母异位词的list集合。 字符数组排序：**`Arrays.sort(arr1)`** 
>
> [找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)    🌟🌟中等：给定两个字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的 异位词 的子串，返回这些子串的起始索引。
>
> 思路：1.(暴力破解：时间复杂度高) 记住一点：字母异位词排序后是一样的，遍历 s ,取相同长度的子字符串排序后对比。不能直接对s排序。
>
> 2.滑动窗口：用**数组代替哈希表(数组可以直接用 `Arrays.equals(arr1,arr2)`判断相等)**，存放字符串中字母出现的词频，用数组来判断是否是字母异位词；同时数组也代表窗口，在滑动中维护窗口中每种字母的数量；当窗口中每种字母的数量与字符串 p 中每种字母的数量相同时，则说明当前窗口为字符串p的异位词。
>
> [赎金信](https://leetcode.cn/problems/ransom-note/)    简单：一个哈希表 HashMap   对比字符出现次数    或者  可以用**数组代替哈希表**  内存消耗上更小一些

> [两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)   简单：哈希集合 方法 ---> HashSet
>
> [两个数组的交集 II](https://leetcode.cn/problems/intersection-of-two-arrays-ii/)   简单：哈希集合 方法 ：与上一题相比 要考虑交集值出现的次数  可以用HashMap

> [快乐数](https://leetcode.cn/problems/happy-number/)    简单：无限循环 则说明 sum 重复出现 可以考虑哈希表方法  

> [两数之和](https://leetcode.cn/problems/two-sum/)    简单：(返回索引而不是值，返回值就可以用双指针)  可以用两个循环暴力破解  或者  哈希表方法：找 x 和 target-x 即可
>
> [四数相加 II](https://leetcode.cn/problems/4sum-ii/)    🌟  中等：分组+哈希表
>
> [三数之和](https://leetcode.cn/problems/3sum/)   🌟🌟🌟  中等：用哈希表会更难；**用双指针**会简单点   双指针降时间复杂度  从暴力O(n^3) 的解法，降为O(n^2)的解法
>
> ​									固定第一个数 k ，双指针 i=k+1、right=nums.length-1 放在区间 [k,end] 两端；
>
> ​									当 i < j 时循环计算s = nums[k] + nums[i] + nums[j]，并按照以下规则执行双指针移动：
>
> ​												首先判断 i 并跳过所有重复的nums[i]；
>
> ​												当s < 0时，i += 1；
> ​												当s > 0时，j -= 1；
> ​												当s == 0时，记录组合[k, i, j]至res，执行 i += 1和 j -= 1。
>
> ❌3.12   [四数之和](https://leetcode.cn/problems/4sum/)   🌟🌟🌟  中等：**双指针**  在上一题的基础上多加一层for循环(用来固定前两个数)    可以看代码随想录说明  从暴力O(n^4) 的解法，降为O(n^3)的解法

# 字符串

Java   String字符串不能修改

`StringBuilder` ：底层结构  字符数组 char[]

字符串内置方法: `public char[] toCharArray()` ---字符串转换为字符数组

字符串内置方法: `str.trim()` ---删除首尾空格

字符串内置方法: `str.indexOf()` ---查找子串/字符 出现位置的起始索引

字符串内置方法: `public String[] split(String regex, int limit)` ---以 正则表达式分隔符 分割字符串  

- regex -- 正则表达式分隔符。
- limit -- 分割的份数。

  . 、 $、 | 和 * 等转义字符，必须得加  `\\`。

StringBuilder内置方法：`sb.setCharAt(index,ch)` --- StringBuilder 修改指定索引位置的字符

StringBuilder内置方法：`sb.append(E e)`  --- 添加元素
`sb.reverse()`   反转  没有返回值
`sb.length()`     获取长度  返回int类型
`sb.toString()`  从**容器转为String** 
`sb.equals(s)` 方法，**没有重写**，继承了`Object` 类中的`equals()` ，默认使用 `==` 号比较对象的地址值

`sb.charAt(i)`       `deleteCharAt(i)`        `sb.capacity()`  返回当前容量

> ✅3.12   [ 反转字符串](https://leetcode.cn/problems/reverse-string/)    简单：相向双指针  两两交换即可。
>
> [反转字符串 II](https://leetcode.cn/problems/reverse-string-ii/)    简单
>
> 1.自己思路：双指针，按题目要求进行判断，有点复杂。  
>
> 2.官方题解：单指针，反转每个下标从 2k 的倍数开始的，长度为 k 的子串。若该子串长度不足 k，则反转整个子串。
>
> [替换数字](https://www.programmercarl.com/kama54.%E6%9B%BF%E6%8D%A2%E6%95%B0%E5%AD%97.html)    卡码网   
>
> ✅3.12   [反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)   中等  🌟🌟   字符串内置方法: `str.trim()` ---删除首尾空格
>
> 1. 双指针(删除首尾空格)：删除首尾空格->倒序遍历字符串->双指针记录单词左右索引边界->添加至单词列表->单词列表拼接为字符串返回->删除首尾空格
> 2. **双指针**(不用删除首尾空格)：先指向最后一个单词尾部->倒序遍历字符串->双指针记录单词左右索引边界->添加至单词列表->单词列表拼接为字符串返回->去除多出来的最后一个空格。这个方法最好。✅3.12
> 3. 代码随想录(**整体反转+局部反转**)：先删除首尾及中间多余空格->反转整个字符串->反转单个单词 
>
> [右旋字符串](https://www.programmercarl.com/kama55.%E5%8F%B3%E6%97%8B%E5%AD%97%E7%AC%A6%E4%B8%B2.html)  卡码网  整体反转+局部反转  即可
>
> [找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)    简单
>
> 1. 暴力破解：比较首字符 相同就`sbustring()`比较全字符并返回
> 2. **KMP算法**🌟🌟🌟：  [KMP算法思路](https://www.bilibili.com/video/BV1jb411V78H/?spm_id_from=333.337.search-card.all.click&vd_source=6ef187124c74c452a2016ded88292617)   [KMP算法思路+代码](https://www.bilibili.com/video/BV1AY4y157yL/?spm_id_from=333.337.search-card.all.click&vd_source=6ef187124c74c452a2016ded88292617)   很绕
>
> [重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/)    简单
>
> 1. 两个s拼接在一起，里面还出现一个s的话，就说明是由重复子串组成，判断里面是否有s时，刨除 s + s 的首字符和尾字符，这样避免在s+s中搜索出原来的s
> 2. KMP算法
>

# 栈与队列

`Stack<Integer> stack = new Stack<Integer>();`    Java **`Stack`** 类；   

栈 提供了      `pop()`  、 `push(E e)` 、  `peek()` 、  `empty()`   

`Queue<Integer> que = new LinkedList<Integer>(); `   **`Queue` 单端队列**     

`Deque<Character> deque = new LinkedList<>();`   **`Deque`  双端队列** 

两个都是 **接口** 。

`Queue` 是**单端队列**，只能从一端插入元素，另一端删除元素，实现上一般遵循 **先进先出（FIFO）** 规则。

`Queue` 继承了 `Collection` 接口，进行了扩展。

|  Queue 接口  | 抛出异常  | 返回特殊值 (返回相应值) |
| :----------: | :-------: | :---------------------: |
|   插入队尾   | add(E e)  |       offer(E e)        |
|   删除队首   | remove()  |         poll()          |
| 查询队首元素 | element() |         peek()          |

`Deque` 是**双端队列**，在队列的**两端**均可以插入或删除元素。

`Deque` **继承**扩展了 `Queue` 接口。除了上述的方法外，还有：

|  Deque 接口  |   抛出异常    | 返回特殊值 (返回相应值) |
| :----------: | :-----------: | :---------------------: |
|   插入队首   | addFirst(E e) |     offerFirst(E e)     |
|   插入队尾   | addLast(E e)  |     offerLast(E e)      |
|   删除队首   | removeFirst() |       pollFirst()       |
|   删除队尾   | removeLast()  |       pollLast()        |
| 查询队首元素 |  getFirst()   |       peekFirst()       |
| 查询队尾元素 |   getLast()   |       peekLast()        |

事实上，`Deque` 还提供了 `push()` `pop()` 等其他方法，可以用于 **模拟栈**。   `LinkedList` 还自带了 `isEmpty()` 

> [用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)    简单：使用两个栈来实现   输入栈、输出栈 
>
> [用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)   简单：用一个队列 `Queue` 实现  
>
> [有效的括号](https://leetcode.cn/problems/valid-parentheses/)    简单： 用 `栈 Stack` 或者 `双端队列 Deque` 模拟栈  来实现。  
>
> [删除字符串中的所有相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/)     简单：用 栈、或者 StringBuilder 代替栈。

> [逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)   中等：遇到数字则入栈；遇到运算符则取出栈顶两个数字进行计算，并将结果压入栈中。注意 减法和除法 的顺序。
>
> [滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)   🌟🌟🌟  困难：**单调队列**  
>
> [前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)  🌟🌟  中等：**优先队列**就是一个披着队列外衣的堆(实现**小根堆**)   重写 **comparator的compare方法**，小根堆：从小到大排；大根堆：从大到小排；

# 二叉树

[代码随想录：二叉树基础](https://www.programmercarl.com/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html#%E7%AE%97%E6%B3%95%E5%85%AC%E5%BC%80%E8%AF%BE)  

## 前中后序遍历

二叉树的前序、后序、中序遍历🌟🌟🌟  ：   **递归**最简单； **迭代** ：不同迭代法(官方：前、中好理解；后抽象) / 统一迭代法(代码随想录)   

> [二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)    简单
>
> [二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)    简单
>
> [二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)    简单
>
> [N 叉树的前序遍历](https://leetcode.cn/problems/n-ary-tree-preorder-traversal/)    简单
>
> [N 叉树的后序遍历](https://leetcode.cn/problems/n-ary-tree-postorder-traversal/)    简单

## 层序遍历---BFS+DFS

二叉树的层序遍历   **就是图论中的广度优先搜索在二叉树中的应用**，需要借助队列来实现

   **BFS  广度优先算法（迭代法）、  DFS  深度优先算法（递归）** 

用  BFS 一个模板 基本都能做，只是时间复杂度、空间复杂度高点；  DFS  有点抽象 （但是空间、时间复杂度都更小）

> [二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)    🌟中等   
>
> 1. BFS 迭代法（更好理解）
> 2. DFS  递归法
>
> [二叉树的层序遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/)    中等   
>
> 1. BFS  迭代法  与 102. 二叉树的层序遍历 的区别：在遍历完一层节点之后，将存储该层节点值的列表添加到结果列表的头部。或者 最后反转
>
> [二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)    中等    
>
> 1. BFS  迭代法 层序遍历  只记录每层遍历的最后一个节点
> 2. DFS  递归法  有点抽象
>
> [二叉树的层平均值](https://leetcode.cn/problems/average-of-levels-in-binary-tree/)     简单      
>
> 1. BFS
>
> 2. DFS
>
> [N 叉树的层序遍历](https://leetcode.cn/problems/n-ary-tree-level-order-traversal/)     中等   
>
> 1. BFS
>
> 2. DFS
>
> [在每个树行中找最大值](https://leetcode.cn/problems/find-largest-value-in-each-tree-row/)    中等   
>
> 1. BFS
>
> 2. DFS
>
> [填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/)    中等  
>
> 1. BFS
>
> 2. 巧用next指针
>
> [填充每个节点的下一个右侧节点指针 II](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii/)    中等    
>
> 1. BFS
>
> [二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)   简单  
>
> 1. BFS
>
> 2. DFS
>
> [二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)    简单  
>
> 1. BFS
>
> 2. DFS
>
> [N 叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-n-ary-tree/)     简单   
>
> 1. BFS
>
> 2. DFS

> [翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)    简单   
>
> 1. 递归
>
> 2. 层序遍历

> [对称二叉树](https://leetcode.cn/problems/symmetric-tree/)    🌟简单   
>
> 1. 递归
> 2. 单端队列迭代
> 3. 双端队列迭代（两个迭代其实都一样）
>
> [相同的树](https://leetcode.cn/problems/same-tree/)    简单  
>
> 1. 与 对称二叉树 一样
>
> [另一棵树的子树](https://leetcode.cn/problems/subtree-of-another-tree/)   🌟🌟简单   
>
> 1. 双递归暴力  与题：相同的树 相关    
> 2. 官方解法：双递归（简单）
> 3. **KMP（没看）**
> 4. **树哈希（没看）**  

> [完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/) 🌟   简单  
>
> 1. 层序遍历
>
> 2. 普通二叉树的通用递归
>
> 3. 利用**完全二叉树**特性的递归
>
> 4. 官解：**二分查找+位运算（没看）** 
>
> [平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)    🌟简单   
>
> 1. K神图解 ：**递归   后序遍历+剪枝**（更快更好）
> 2.  K神图解： 先序遍历 + 判断深度 （从顶至底）

> [二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/)    🌟简单   
>
> 1. 深度优先搜索---递归写法---回溯;  
> 2. 深度优先搜索---非递归(栈)写法,效率很差;   
> 3. 广度优先搜索---层序遍历;  
> 4. 递归
>
> [左叶子之和](https://leetcode.cn/problems/sum-of-left-leaves/)    🌟简单   
>
> 1. 递归 DFS;   
> 2. 迭代---层序遍历
>
> [找树左下角的值](https://leetcode.cn/problems/find-bottom-left-tree-value/)    中等   
>
> 1. 层序遍历    效率很差
>
> 2. 递归
>
> [路径总和](https://leetcode.cn/problems/path-sum/)    简单
>
> 1. 递归
>
> 2. 广度优先搜索 --- 层序遍历
>
> [路径总和 II](https://leetcode.cn/problems/path-sum-ii/)     🌟中等  
>
> 1. 深度优先搜索---递归---K神图解
> 2. 广度优先搜索---**哈希表**记录树中的每一个节点的父节点,每次找到一个满足条件的节点，我们就从该节点出发不断向父节点迭代，即可还原出从根节点到当前节点的路径
>

## 构造二叉树

> [从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)     中等 🌟🌟🌟
>
> 后序遍历最后一个元素必为根节点
>
> 在中序遍历序列中,根节点的左边为左子树，根节点的右边为右子树
>
> 1. 递归: 思路---官解---递归法 ---- 图解可看---房建斌学算法 
>
> 2. **迭代(未看)**
>
> [从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)     中等 🌟🌟🌟
>
> 前序遍历的首元素 为 树的根节点 `node` 的值。
>
> 在中序遍历中搜索根节点 `node` 的索引 ，可将 中序遍历 划分为 `[ 左子树 | 根节点 | 右子树 ]` 。
>
> 根据中序遍历中的左（右）子树的节点数量，可将 前序遍历 划分为 `[ 根节点 | 左子树 | 右子树 ]` 。
>
> 1. 递归---官解
>
> 2. **迭代(未看)**
>
> [根据前序和后序遍历构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)   中等 🌟🌟🌟
>
> 前序遍历的首元素 为 树的根节点
>
> 后序遍历最后一个元素必为根节点
>
> 1. **官解---递归（未看）** 

> [最大二叉树](https://leetcode.cn/problems/maximum-binary-tree/)   中等
>
> 1. 传统递归   空间 O(n^2)  时间 O(n)
>
> 2. **单调栈（未看）** 
>

> [合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/)    简单
>
> 1. 递归---深度优先搜索
>
> 2. 迭代---广度优先搜索：三个队列
>

## 二叉搜索树

**搜索二叉树中序遍历是升序的    也可以用递归实现中序遍历** 

> [二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/)    简单     二叉搜索树:左子树的值小于根节点;右子树的值大于根节点
>
> 1. 递归
>
> 2. 迭代
>
> [验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)   🌟 中等  
>
> 1. 递归-----更新上下界
>
> 2. 迭代----中序遍历：搜索二叉树中序遍历必定是升序的    也可以用递归实现中序遍历
>
> [二叉搜索树的最小绝对差](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/)    简单
>
> 1. 递归
>
> 2. 迭代
>
> [二叉搜索树中的众数](https://leetcode.cn/problems/find-mode-in-binary-search-tree/)    简单
>
> 1. 迭代中序遍历+哈希表 笨方法  
>
> 2. 递归中序遍历+全局变量+适时清空结果集
>
> [二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)  🌟🌟  中等  
>
> 若 root 是 p,q 的 最近公共祖先 ，则只可能为以下情况之一：
>
>  p 和 q 在 root 的子树中，且分列 root 的 异侧（即分别在左、右子树中）；
>
> p=root ，且 q 在 root 的左或右子树中；
>
> q=root ，且 p 在 root 的左或右子树中；
>
> 1. 递归先序遍历+哈希表记录父节点和访问过的节点    时间复杂度：O(N)    空间复杂度：O(N)
>
> 2. 根据最近公共父节点的特性：K神图解---递归    时间复杂度：O(N)    空间复杂度：O(N)
>
> [二叉搜索树的最近公共祖先 ](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)   中等
>
> 二叉搜索树的最近公共祖先特性：最近公共祖先的值处于p.val和q.val之间。
>
> 1. 通用的求最近公共节点方法
>
> 2. 利用二叉搜索树的特性：递归或者迭代
>
> [二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/)    中等
>
> 1. 迭代
>
> 2. 递归
>
> [删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/)    🌟🌟 中等
>
> 1. 递归：不改变树高/改变树高
>
> 2. 迭代 🌟🌟🌟 官方 不退化成链表的方法 没仔细看
>
> [修剪二叉搜索树](https://leetcode.cn/problems/trim-a-binary-search-tree/)    中等
>
> 1. 递归
>
> 2. 迭代：找到第一个在范围的节点，该节点就是要返回的根节点，然后修建该节点的左右子树，左子树必定<high，右子树必定大于>low。
>
> [将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)     简单
>
> 1. 递归+**分治**   
>
> [把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree/)     中等
>
> 中序遍历可以用 递归或者迭代实现
>
> 1. 笨方法：一次中序遍历把每个节点的新值记录下来，再中序遍历一次更新-----优化------>反序中序遍历，边遍历边更新。
>
> 2. Morris 遍历
>
> [将二叉搜索树变平衡](https://leetcode.cn/problems/balance-a-binary-search-tree/)    中等
>
> 该题与上面的 [将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/) 相似，可以先将它转换为有序序列，然后构造平衡二叉树。
>
> 1. 构造有序序列--->递归+分治构造平衡二叉树
>
> 

# 回溯算法

```java
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```

## 组合问题

时间复杂度：$O(n × 2^n)$，空间复杂度：$O(n)$，

> [组合](https://leetcode.cn/problems/combinations/)    中等
>
> 1. 回溯+剪枝（递归）
> 2. 字典序法（非递归）
>
> [组合总和 III](https://leetcode.cn/problems/combination-sum-iii/)   中等
>
> 1. 回溯+剪枝
> 2. 字典序法（非递归）：二进制子集枚举（就是所有可能组合枚举一次，时间复杂度太高，意义不大）
>
> [电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)    中等
>
> 1. 回溯
>
> [组合总和](https://leetcode.cn/problems/combination-sum/)   中等      **如果是一个集合来求组合的话，就需要startIndex，如果是多个集合取组合，各个集合之间相互不影响，那么就不用startIndex**
>
> 1. 回溯+剪枝    注意：**`res.add(new ArrayList<>(list))`  不能写成 `res.add(list)`** ，这样写的话res添加的是list的引用，其他地方修改list也会影响res里的值，所以要`res.add(new ArrayList<>(list))`  直接创建个副本添加进res，这样其他地方修改list也不会影响到res了。
>
> [组合总和 II](https://leetcode.cn/problems/combination-sum-ii/)   中等     此题的输入数组可能有重复元素，输出要求不含有重复子集，每个元素只能被选一次。
>
> 1. 回溯+剪枝：注意去重！ 可以每次递归 startindex+1 确保每个元素只被选中一次；数组排序后，同一层循环中跳过重复的元素（可以使用 starindex 或者 **used数组**实现）来确保不含有重复子集。
>
> 

## 切割问题

> [分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)   中等    
>
> 1. 回溯+双指针判断回文串
>
> [ 复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses/)   中等
>
> 1. 回溯
>
> 

## 子集问题

**求取子集问题，不需要任何剪枝！因为子集就是要遍历整棵树**。

时间复杂度：$O(n × 2^n)$，空间复杂度：$O(n)$

> [子集](https://leetcode.cn/problems/subsets/)   中等     遍历整颗树，添加所有节点
>
> 1. 回溯
>
> [子集 II](https://leetcode.cn/problems/subsets-ii/)   中等   数组有重复元素
>
> 1. 回溯：子集要去重，所以要跳过重复的元素，所以数组一定要先排序！
>
> [非递减子序列](https://leetcode.cn/problems/non-decreasing-subsequences/)    🌟🌟 中等     这道题的要求不能对数组进行排序，注意 同一层的去重 和 只能添加递增元素
>
> 1. 回溯+hashset去重：也可以用数组 代替 hashset
>
> **hashset 记录本层元素是否重复使用，新的一层hashset都会重新定义（清空），所以要知道hashset只负责本层！** 

## 排列问题

- 每层都是从0开始搜索而不是startIndex
- 需要used数组记录排列了哪些元素了
- 时间复杂度：$O(n!)$，空间复杂度：$O(n)$，

> [全排列](https://leetcode.cn/problems/permutations/)    中等    数组元素不重复
>
> 1. 回溯+used数组
>
> [全排列 II](https://leetcode.cn/problems/permutations-ii/)    中等    数组元素重复   要**去重**
>
> 1. 回溯+used数组：数组先排序
>
> 

## 去重问题

在同一树层中去重

在同一树枝中去重

可以用 Set 集合去重 但是效率不高  比不上使用数组

## 重新安排行程（图论：欧拉路径）（回溯：超时）

> [重新安排行程](https://leetcode.cn/problems/reconstruct-itinerary/)     🌟🌟🌟 困难
>
> 1. （代码随想录）回溯：超时！
> 2. **（图论）欧拉路径（未看）**  
>
> 

## 棋盘问题

> [ N 皇后](https://leetcode.cn/problems/n-queens/)   🌟🌟🌟  困难
>
> 1. 回溯：代码随想录
>
> 2. 回溯：官解方法1，用三个HasSet集合来记录 同列 同45度斜线 同135斜线 上是否有皇后
>
> [解数独](https://leetcode.cn/problems/sudoku-solver/)   🌟🌟🌟  困难    **二维递归回溯!**
>
> 1. 回溯：代码随想录
>
> 2. 回溯：官解1--->自己优化(删除变量vaild)--->官解2 **位运算优化**：将数组优化为一个数
>
> 用官解1(删除变量vaild) 就好，如果可以 学会 位运算优化 更好。

# 贪心算法

## 贪心简单题

> [分发饼干](https://leetcode.cn/problems/assign-cookies/)    简单
>
> 1. 贪心
>
> [K 次取反后最大化的数组和](https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/)    简单
>
> 1. 自己思路：先排序反转完所有负数，如果没反转完k次（此时数组全为正数），继续反转最小的那个正数；如果反转完了，累加求和即可
>
> [柠檬水找零](https://leetcode.cn/problems/lemonade-change/)    简单
>
> 1. 贪心

## 其他难题

> [摆动序列](https://leetcode.cn/problems/wiggle-subsequence/)   🌟🌟🌟  中等
>
> 1. 贪心：代码随想录  有点绕
>
> 2. 动态规划 
>
> dp数组：时间复杂度O(n)  空间复杂度O(n) ------优化------->两个变量记录长度即可：时间复杂度O(n)  空间复杂度O(1)
>
> [单调递增的数字](https://leetcode.cn/problems/monotone-increasing-digits/)   中等
>
> 1. 贪心（代码随想录）：从后向前遍历，如果遇到不 单调不减的 ，那么这个位数-1，后面的全变为9。
>
> [最大子数组和](https://leetcode.cn/problems/maximum-subarray/)   中等
>
> 1. 贪心：累计和<0则重新从nums[i+1]累加
>
> 2. 动规：状态转移方程
>
> [加油站](https://leetcode.cn/problems/gas-station/)   中等
>
> 1. 贪心：每个加油站的剩余量rest[i]为gas[i] - cost[i]。i从0开始累加rest[i]，和记为curSum，一旦curSum小于零，说明[0, i]区间都不能作为起始位置，因为这个区间选择任何一个位置作为起点，到i这里都会断油，那么起始位置从i+1算起，再从0计算curSum。
>
> [监控二叉树](https://leetcode.cn/problems/binary-tree-cameras/)    **困难**
>
> 1. 贪心：后序遍历，分状态讨论
> 2. 动规（官解）：没看，有点复杂

## 贪心解决股票问题

> [买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)  中等
>
> 1. 贪心：把整体利润拆为每天的利润，只收集正利润即可
>
> 2. 动规：dp [天数] [2]  ---- 2表示是否持有股票的两种状态；  可以优化空间---用两个变量代替数组
>

## 两个维度权衡

**先确定一个维度的条件，再确定另一个维度的条件**，不要两个维度条件一起满足。

> [分发糖果](https://leetcode.cn/problems/candy/)    困难  🌟🌟
>
> 1. 贪心（代码随想录+K神）
>
> [根据身高重建队列](https://leetcode.cn/problems/queue-reconstruction-by-height/)     中等
>
> 1. 贪心（代码随想录）：与 [分发糖果](https://leetcode.cn/problems/candy/)  一样，先确定一个维度的条件，再确定另一个维度的条件。先按从高到矮排，再按 ki 插入相应位置

## 区间问题

> [跳跃游戏](https://leetcode.cn/problems/jump-game/)   中等
>
> 1. 贪心：看最大跳跃范围
>
> [跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)    中等
>
> 1. 贪心：每次跳到跳跃范围内 具有下次最大跳跃范围的位置
>
> [用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)   中等
>
> 1. 贪心（代码随想录）：
>
> 此题不能直接用 lambd 表达式排序，会溢出；
>
> 三种方法解决：
>
> **Integer.compare(p1,p2)内置方法**；（最好用）
>
> 三目运算符 (p1,p2) -> p1<p2 ? -1 : 1;
>
> 重写匿名内部类Comparator<>()方法。
>
> [无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/)   中等
>
> 1. 贪心（代码随想录）：类似 [用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)  
>
> [划分字母区间](https://leetcode.cn/problems/partition-labels/)   中等
>
> 1. 代码随想录：很巧妙的方法，在遍历的过程中相当于是要找每一个字母的边界，如果找到之前遍历过的所有字母的最远边界，说明这个边界就是分割点了
>
> [合并区间](https://leetcode.cn/problems/merge-intervals/)   中等
>
> 1. 贪心（代码随想录）类似 [用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)  、[无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/) 

# 动态规划

动态规划中每一个状态一定是由上一个状态推导出来的。

1. 确定dp数组（dp table）以及下标的含义

2. 确定递推公式

3. dp数组如何初始化

4. 确定遍历顺序

5. 举例推导dp数组

## 动规基础

> [斐波那契数](https://leetcode.cn/problems/fibonacci-number/)    简单
>
> 1. 递归
>
> 2. 动规：dp[n+1]数组
>
> 3. 动规：优化空间---变量代替数组
>
> [爬楼梯](https://leetcode.cn/problems/climbing-stairs/)   简单
>
> 1. 动规：同样可以优化空间
>
> [使用最小花费爬楼梯](https://leetcode.cn/problems/min-cost-climbing-stairs/)     简单
>
> 1. 动规：同样可以优化空间；第一步可以不用花费体力
>
> [不同路径](https://leetcode.cn/problems/unique-paths/)    中等
>
> 1. 动规：可以优化空间，优化没看懂？
> 2. 数论？
>
> [不同路径 II](https://leetcode.cn/problems/unique-paths-ii/)   中等
>
> 1. 动规：可以优化空间，优化没看懂？
>
> 

## 背包系列

🌟🌟🌟 背包基础：01背包问题   [带你学透0-1背包问题！](https://www.bilibili.com/video/BV1cg411g7Y6/?spm_id_from=333.788&vd_source=6ef187124c74c452a2016ded88292617)  [带你学透01背包问题（滚动数组篇）](https://www.bilibili.com/video/BV1BU4y177kY/?spm_id_from=333.788&vd_source=6ef187124c74c452a2016ded88292617)  

> [携带研究材料（01背包）](https://kamacoder.com/problempage.php?pid=1046)    卡码网
>
> 1. 动规：二维dp数组  
>
>    **dp [i] [j]表示 [0-i] 号物品任放(可以放可以不放)后，背包容量为 j 的情况下的最大价值；**
>
>    **先遍历物品 i 或者 先遍历背包容量 j 都可以**
>
> 2. 动规：一维dp滚动数组  
>
>    **dp[j] 表示任放物品(可以放可以不放)后，背包容量为 j 的情况下的最大价值**
>
>    **将二维压缩为一行，j 倒序遍历(确保物品不会重复放入)**
>
>    **只能先遍历物品 i** 
>
> [分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)   中等
>
> 1. 动规：转化为01背包问题：target=sum/2，找到dp[target]==target
>
> [最后一块石头的重量 II](https://leetcode.cn/problems/last-stone-weight-ii/)   中等
>
> 1. 动规：转化为01背包问题     与 [分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)  一样的：将石头尽可能分为重量相同的两堆
>
> [目标和](https://leetcode.cn/problems/target-sum/)    中等
>
> 1. 动规（官解）：数学推导，转换为01背包问题
>
> [一和零](https://leetcode.cn/problems/ones-and-zeroes/)   中等   🌟🌟🌟  **三维dp数组**  此题每个字符串相当于一个物品，而每个物品有两个容量
>
> 1. 动规（官解）：三维dp数组   dp[i] [j] [k] 表示在前 i 个字符串中，使用 j 个 0 和 k 个 1 的情况下最多可以得到的字符串数量。
> 2. 动规（官解）：空间优化--->二维dp数组（滚动数组）
>
> [携带研究材料（完全背包）](https://kamacoder.com/problempage.php?pid=1052)    卡码网
>
> 1. 完全背包问题：与01背包的情况相比，就是物品可以重复选择；即 01背包一维数组情况相比，**内层循环不是倒序**了。
>
> [零钱兑换 II](https://leetcode.cn/problems/coin-change-ii/)    中等
>
> **如果求 组合数 就是外层for循环遍历物品，内层for遍历背包**。
>
> **如果求 排列数 就是外层for遍历背包，内层for循环遍历物品**。
>
> 1. 动规（完全背包问题）：注意求组合数要 先遍历物品再遍历背包容量
>
> [组合总和 Ⅳ](https://leetcode.cn/problems/combination-sum-iv/)    中等
>
> 1. 动规: 完全背包问题---求排列
>
> [爬楼梯（第八期模拟笔试）](https://kamacoder.com/problempage.php?pid=1067)   卡码网
>
> 1. 动规:完全背包问题---求排列
>
> [零钱兑换](https://leetcode.cn/problems/coin-change/)   中等
>
> 1. 动规:完全背包问题:求最小数---->**所以外层for遍历背包，内层for遍历物品，还是外层for遍历物品，内层for遍历背包，都是可以的！**
>
> [完全平方数](https://leetcode.cn/problems/perfect-squares/)   中等
>
> 1. 动规:完全背包问题: 容量是 n ; 物品是 完全平方数
>
> [单词拆分](https://leetcode.cn/problems/word-break/)  中等
>
> 1. 完全背包问题：字符串是背包，字典中的单词是物品，物品可重复用，求排列数
>
> [多重背包-携带矿石资源](https://kamacoder.com/problempage.php?pid=1066)   卡码网：多重背包问题面试基本不会考   了解一下即可
>
> 1. 多重背包：在01背包基础上，每件物品可以重复用Mi次，摊开来就是01背包

## 打家劫舍

>[打家劫舍](https://leetcode.cn/problems/house-robber/)   中等
>
>1. 动规基础，可优化空间
>
>[打家劫舍 II](https://leetcode.cn/problems/house-robber-ii/)   中等   在[打家劫舍](https://leetcode.cn/problems/house-robber/)的基础上，房间围成一圈，第一个房间和最后一个房间相邻
>
>1. 两种情况：选了第一个就不能选最后一个；选了最后一个就不能选择第一个
>
>[打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)   中等  所有房子是一个二叉树    **树形动规基础题** 
>
>1. 后序遍历+长度为2的dp数组
>
>

## 股票系列

>[买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)   简单   只能买卖一次股票
>
>1. 二维dp数组：dp[i] [0] --- 第i天不持有股票；dp[i] [0] --- 第i天持有股票；
>2. 可优化空间
>
>[买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)   中等   可以多次买卖股票
>
>1. 二维dp数组：dp[i] [0] --- 第i天不持有股票；dp[i] [0] --- 第i天持有股票；
>2. 可优化空间
>
>[买卖股票的最佳时机 III](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/)   **困难**    只能交易两次
>
>1. 二维dp数组：有五种状态：0-不操作；1-第一次持有股票；2-第一次不持有股票；3-第二次持有股票；4-第二次不持有股票
>2. 可以优化空间
>
>[买卖股票的最佳时机 IV](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/)   **困难**   最多K次交易
>
>与上一题一样，只不过有 2*k+1中状态：0-不操作；奇数-持有股票；偶数不持有股票；
>
>[买卖股票的最佳时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)   **中等**   这个比上面的还难一点
>
>动规：4种状态：0-持有股票；1-一直保持不持有股票；2-不持有股票，今天卖出；3-就不持有股票，今天是冷冻期
>
>可以优化空间
>
>[买卖股票的最佳时机含手续费](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)    中等   卖出股票时多减一个手续费即可
>
>

## 子序列系列

>[ 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)   中等   K神图解  🌟
>
>1. dp[i] 的值代表以 nums[i] **结尾**的最长递增子序列的长度
>
>   ```java
>   位置i的最长升序子序列等于j从0到i-1各个位置的最长升序子序列 + 1 的最大值。
>   for (int i = 1; i < nums.size(); i++) {
>       for (int j = 0; j < i; j++) {
>           if (nums[i] > nums[j]) dp[i] = max(dp[i], dp[j] + 1);
>       }
>       if (dp[i] > result) result = dp[i]; // 取长的子序列
>   }
>   ```
>
>2. 可优化
>
>[最长连续递增序列](https://leetcode.cn/problems/longest-continuous-increasing-subsequence/)    简单
>
>1. **dp[i]：以下标i为结尾的连续递增的子序列长度为dp[i]**。
>
>   ```java
>   如果 nums[i] > nums[i - 1]，那么以 i 为结尾的连续递增的子序列长度 一定等于 以i - 1为结尾的连续递增的子序列长度 + 1 。
>   即：dp[i] = dp[i - 1] + 1;
>   if (nums[i] > nums[i - 1]) {  // 连续记录
>       dp[i] = dp[i - 1] + 1;
>   }
>   ```
>
>2. 可以空间优化
>
>3. 可以用贪心
>
>[最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)   中等    重复子数组就是**连续**子序列  🌟
>
>1. dp[i] [j] ：以下标i - 1为**结尾**的A，和以下标j - 1为**结尾**的B，最长重复子数组长度为dp[i] [j]。**根据定义，最后的结果是dp数组的最大值**。
>
>   ```java
>   根据dp[i][j]的定义，dp[i][j]的状态只能由dp[i - 1][j - 1]推导出来。
>   即当A[i - 1] 和B[j - 1]相等的时候，dp[i][j] = dp[i - 1][j - 1] + 1;
>   if (nums1[i - 1] == nums2[j - 1]) {
>   	dp[i][j] = dp[i - 1][j - 1] + 1;
>   }
>   ```
>
>2. 可以优化空间
>
>[最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)   中等  🌟  子序列**不是连续**的
>
>1. dp[i] [j]：**长度为[0, i - 1]**（不一定是以i-1结尾）的字符串text1与**长度为[0, j - 1]**（不一定是以j-1结尾）的字符串text2的最长公共子序列为dp[i] [j]
>
>   ```java
>   主要就是两大情况： text1[i - 1] 与 text2[j - 1]相同，text1[i - 1] 与 text2[j - 1]不相同
>   if (text1[i - 1] == text2[j - 1]) {
>       如果text1[i - 1] 与 text2[j - 1]相同，那么找到了一个公共元素，所以:
>       dp[i][j] = dp[i - 1][j - 1] + 1;
>   } else {
>       如果text1[i - 1] 与 text2[j - 1]不相同，那就看看text1[0, i - 2]与text2[0, j - 1]的最长公共子序列 和 text1[0, i - 1]与text2[0, j - 2]的最长公共子序列，取最大的。
>       dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
>   }
>   ```
>
>[不相交的线](https://leetcode.cn/problems/uncrossed-lines/)   中等    就是[最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/) 
>
>1. dp[i] [j]：长度为[0, i - 1]的数组与长度为[0, j - 1]的数组的最长公共子序列为dp[i] [j]
>
>[最大子数组和](https://leetcode.cn/problems/maximum-subarray/)   中等   🌟
>
>1. dp[i]：以nums[i]为结尾的最大连续子序列和为dp[i]
>
>   ```java
>   dp[i]只有两个方向可以推出来：
>   (1) dp[i - 1] + nums[i]，即：nums[i]加入当前连续子序列和
>   (2) nums[i]，即：从头开始计算当前连续子序列和
>   一定是取最大的，所以dp[i] = max(dp[i - 1] + nums[i], nums[i]);
>   ```
>
>2. 贪心
>
>**# 编辑距离↓** 
>
>[判断子序列](https://leetcode.cn/problems/is-subsequence/)   简单    类似[最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/) 
>
>1. dp[i] [j] 表示以下标i-1为结尾的字符串s，和以下标j-1为结尾的字符串t，相同子序列的长度为dp[i] [j]。
>
>```java
>if (s[i - 1] == t[j - 1]){
>    t中找到了一个字符在s中也出现了
>    dp[i][j] = dp[i - 1][j - 1] + 1;  
>} 
>else {
>    相当于t要删除元素，继续匹配
>    dp[i][j] = dp[i][j - 1];
>}
>```
>
>2. 双指针
>
>[不同的子序列](https://leetcode.cn/problems/distinct-subsequences/)   **困难**   
>
>1. dp[i] [j]：以i-1为结尾的s子序列中出现以j-1为结尾的t的个数为dp[i] [j]
>
>```java
>if (s[i - 1] == t[j - 1]) {
>    当s[i - 1] 与 t[j - 1]相等时，dp[i][j]可以有两部分组成：
>	(1) 一部分是用s[i - 1]来匹配，那么个数为dp[i - 1][j - 1]。
>	(2) 一部分是不用s[i - 1]来匹配，个数为dp[i - 1][j]
>    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
>} else {
>    当s[i - 1] 与 t[j - 1]不相等时，dp[i][j]只有一部分组成，不用s[i - 1]来匹配，即：
>    dp[i][j] = dp[i - 1][j];
>}
>```
>
>[两个字符串的删除操作](https://leetcode.cn/problems/delete-operation-for-two-strings/)    中等  本题和 [不同的子序列](https://programmercarl.com/0115.不同的子序列.html) 相比，其实就是两个字符串可以都可以删除了，情况虽说复杂一些，但整体思路是不变的。
>
>1. dp[i] [j]：以i-1为结尾的字符串word1，和以j-1为结尾的字符串word2，想要达到相等，所需要删除元素的最少次数。
>
>```java
>if (word1[i - 1] == word2[j - 1]) {
>    dp[i][j] = dp[i - 1][j - 1];  
>} else {
>    (1) 删word1[i - 1]，最少操作次数为dp[i - 1][j] + 1;
>    (2) 删word2[j - 1]，最少操作次数为dp[i][j - 1] + 1
>    (3) 同时删word1[i - 1]和word2[j - 1]，操作的最少次数为dp[i - 1][j - 1] + 2
>    dp[i][j] = min({dp[i - 1][j - 1] + 2, dp[i - 1][j] + 1, dp[i][j - 1] + 1});
>}
>```
>
>2. 求出[最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/) ，然后用两个字符串的总长度减去两个最长公共子序列的长度就是删除的最少步数。
>
>[72. 编辑距离](https://leetcode.cn/problems/edit-distance/)   中等   🌟
>
>1. dp[i] [j] 表示以下标i-1为结尾的字符串word1，和以下标j-1为结尾的字符串word2，最近编辑距离为dp[i] [j]
>
>   ```java
>   if (word1[i - 1] == word2[j - 1])
>       不操作--->dp[i][j] = dp[i - 1][j - 1];
>   if (word1[i - 1] != word2[j - 1])
>       删--->word1删除一个元素，那么就是以下标i - 2为结尾的word1 与 j-1为结尾的word2的最近编辑距离 再加上一个操作,即 dp[i][j] = dp[i - 1][j] + 1;
>       增--->word1添加一个元素，相当于word2删除一个元素:dp[i][j] = dp[i][j - 1] + 1;
>       换--->dp[i][j] = dp[i - 1][j - 1] + 1;
>   	三种方式里选最小的：dp[i][j] = min({dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]}) + 1;
>   ```
>
>**# 编辑距离↑** 
>
>[647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)   中等：给你一个字符串 `s` ，请你统计并返回这个字符串中 **回文子串** 的数目。回文子串是连续的
>
>1. 布尔类型的dp[i] [j]：表示区间范围[i,j] （注意是左闭右闭）的子串是否是回文子串，如果是dp[i] [j]为true，否则为false。
>
>```java
>在确定递推公式时，就要分析如下几种情况。
>整体上是两种，就是s[i]与s[j]相等，s[i]与s[j]不相等这两种。
>当s[i]与s[j]不相等，那没啥好说的了，dp[i][j]一定是false。
>当s[i]与s[j]相等时，这就复杂一些了，有如下三种情况:
>	情况一：下标i 与 j相同，同一个字符例如a，当然是回文子串
>	情况二：下标i 与 j相差为1，例如aa，也是回文子串
>	情况三：下标：i 与 j相差大于1的时候，例如cabac，此时s[i]与s[j]已经相同了，我们看i到j区间是不是回文子串就看aba是不是回文就可以了，那么aba的区间就是 i+1 与 j-1区间，这个区间是不是回文就看dp[i + 1][j - 1]是否为true。
>for (int i = s.length() - 1; i >= 0; i--) {  // 注意遍历顺序
>    for (int j = i; j < s.length(); j++) {
>        if (s.charAt(i)==s.charAt(j)) {
>            if (j - i <= 1) { // 情况一 和 情况二
>                result++;
>                dp[i][j] = true;
>            } else if (dp[i + 1][j - 1]) { // 情况三
>                result++;
>                dp[i][j] = true;
>            }
>        }
>    }
>}
>result就是统计回文子串的数量。
>dp[i + 1][j - 1] 在 dp[i][j]的左下角,所以一定要从下到上，从左到右遍历，这样保证dp[i + 1][j - 1]都是经过计算的。
>```
>
>2. 双指针（中心扩散）
>
>   首先确定回文串，就是找中心然后向两边扩散看是不是对称的就可以了。
>
>   **在遍历中心点的时候，要注意中心点有两种情况**。
>
>   一个元素可以作为中心点，两个元素也可以作为中心点。
>
>   那么有人同学问了，三个元素还可以做中心点呢。其实三个元素就可以由一个元素左右添加元素得到，四个元素则可以由两个元素左右添加元素得到。
>
>   所以我们在计算的时候，要注意一个元素为中心点和两个元素为中心点的情况。
>
>   ```java
>   class Solution {
>       public int countSubstrings(String s) {
>           int len, ans = 0;
>           if (s == null || (len = s.length()) < 1) return 0;
>           //总共有 2 * len - 1 个中心点
>           for (int i = 0; i < 2 * len - 1; i++) {
>               //通过遍历每个回文中心，向两边扩散，并判断是否回文字串
>               //有两种情况，left == right，right = left + 1，这两种回文中心是不一样的
>               int left = i / 2, right = left + i % 2;
>               while (left >= 0 && right < len && s.charAt(left) == s.charAt(right)) {
>                   //如果当前是一个回文串，则记录数量
>                   ans++;
>                   left--;
>                   right++;
>               }
>           }
>           return ans;
>       }
>   }
>   ```
>
>   上述方法改一改可解决[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)   
>
>[516. 最长回文子序列](https://leetcode.cn/problems/longest-palindromic-subsequence/)   中等  **回文子序列**是不连续，只是相对顺序不变
>
>dp[i] [j]：字符串s在[i, j]范围内最长的回文子序列的长度为dp[i] [j]
>
>```java
>如果s[i]与s[j]相同，那么dp[i][j] = dp[i + 1][j - 1] + 2;
>如果s[i]与s[j]不相同，说明s[i]和s[j]的同时加入 并不能增加[i,j]区间回文子序列的长度，那么分别加入s[i]、s[j]看看哪一个可以组成最长的回文子序列。
>(1) 加入s[j]的回文子序列长度为dp[i + 1][j]。
>(2) 加入s[i]的回文子序列长度为dp[i][j - 1]。
>那么dp[i][j]一定是取最大的，即：dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
>if (s.charAt(i)==s.charAt(j)) {
>    dp[i][j] = dp[i + 1][j - 1] + 2;
>} else {
>    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
>}
>初始化：
>    (1) 当i与j相同，那么dp[i][j]一定是等于1的，即：一个字符的回文子序列长度就是1。
>    (2) 其他情况dp[i][j]初始为0就行，这样递推公式：dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]); 中dp[i][j]才不会被初始值覆盖。
>    
>class Solution {
>    public int longestPalindromeSubseq(String s) {
>        int len = s.length();
>        int[][] dp = new int[len][len];
>        for(int i=len-1;i>=0;--i){
>            dp[i][i]=1;  // 初始化
>            for(int j=i+1;j<len;++j){  // 从i+1开始,不用考虑j=i,因为j=i时,已经初始化dp[i][j]=1;当i=len-1时,j=len而循环要求j<len所以不会进入循环,不用考虑数组索引越界问题
>                if(s.charAt(i)==s.charAt(j)){
>                    dp[i][j]=dp[i+1][j-1]+2;
>                }else{
>                    dp[i][j]=Math.max(dp[i+1][j],dp[i][j-1]);
>                }
>            }
>        }
>        return dp[0][len-1];
>    }
>}
>```

# 单调栈

**通常是一维数组，要寻找任一个元素的右边或者左边第一个比自己大或者小的元素的位置，此时我们就要想到可以用单调栈了**

找第一个大的元素，单调栈就是栈头到栈尾递增；找第一个小的元素，单调栈就是栈头到栈尾递减；

>[739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)   中等
>
>1. 单调栈  栈头到栈尾递增
>
>[496. 下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/)   简单
>
>1. 暴力
>2. 单调栈   栈头到栈尾递增
>
>[503. 下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/)    中等 
>
>循环数组：把数组当成两个拼接起来即可
>
>1. 单调栈   栈头到栈尾递增
>
>[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)   **困难**   面试常见🌟🌟🌟🌟
>
>**按照列来计算的话，宽度一定是1了，我们再把每一列的雨水的高度求出来就可以了**
>
>每一列雨水的高度，等于该列 左侧最高的柱子和右侧最高的柱子中最矮的那个柱子的高度 减去 该列的高度。
>
>即 当前列雨水面积：min(左边柱子的最高高度，记录右边柱子的最高高度) - 当前柱子高度。
>
>1. 暴力超时
>
>2. 双指针优化    按**列**来计算雨水
>
>   思路：固定宽度，找左右两边第一个比自己高的位置，取两边高的中较低的那个 减去 本身高度 即为雨水高度，宽×高=雨水量，累计即可
>
>   ```java
>   class Solution {
>       public int trap(int[] height) {
>           int len = height.length;
>           int[] maxLeft = new int[len];
>           int[] maxRight = new int[len];
>           // 记录每列左侧和右侧的最大高度，第一列和最后一列不接雨水，不用记录
>           // 当前位置，左边的最高高度是前一个位置的左边最高高度和本高度的最大值
>           maxLeft[0]=height[0];
>           for(int i=1;i<len-1;++i){
>               maxLeft[i] = Math.max(height[i],maxLeft[i-1]);
>           }
>           maxRight[len-1]=height[len-1];
>           for(int j=len-2;j>0;--j){
>               maxRight[j] = Math.max(height[j],maxRight[j+1]);
>           }
>           // 累计雨水量
>           int sum = 0;
>           for(int i=1;i<len-1;++i){
>               int count = Math.min(maxLeft[i],maxRight[i]) - height[i];
>               sum+=count;
>           }
>           return sum;
>       }
>   }
>   ```
>
>3. **单调栈**    按**行**来计算雨水
>
>   同样的思路：固定宽度，找左右两边第一个比自己高的位置，取两边高的中较低的那个 减去 本身高度 即为雨水高度，宽×高=雨水量，累计即可
>
>   使用单调栈   栈头到栈尾递增；
>
>   一旦发现添加的柱子高度大于栈头元素了，此时就出现凹槽了，栈头元素就是凹槽底部的柱子，栈头到栈底第二个元素就是凹槽左边的柱子，而添加的元素就是凹槽右边的柱子。
>
>   使用单调栈，也是通过 长 * 宽 来计算雨水面积的。长就是通过柱子的高度来计算，宽是通过柱子之间的下标来计算，栈里存放下标即可。
>
>   ```java
>   class Solution {
>       public int trap(int[] height) {
>           int len = height.length;
>           int sum = 0;
>           Deque<Integer> stack = new LinkedList<>();
>           stack.push(0);
>           for(int i=1;i<len;++i){
>               // 单调栈  栈头到栈尾递增
>               if(height[i]<height[stack.peek()]){
>                   stack.push(i);  // 小的入栈
>               } else if(height[i]==height[stack.peek()]) {
>                   stack.pop();  
>                   stack.push(i);  // 相等的记录最右边的
>               }else{
>                   while(!stack.isEmpty() && height[i]>height[stack.peek()]){
>                       int mid = stack.pop();  // 中间凹槽的下标
>                       if(!stack.isEmpty()){
>                           int left = stack.peek();  // 左边柱子的下标
>                           int h = Math.min(height[i],height[left]) - height[mid];  // 雨水高度
>                           int w = i - left - 1;  // 雨水宽度 = 右边柱子下标 - 左边柱子的下标 - 1
>                           int count = h * w;  // 雨水量
>                           sum+=count;  // 累计
>                       }
>                   }
>                   stack.push(i);
>               }
>           }
>           return sum;
>       }
>   }
>   ```
>
>[84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/)   **困难**     🌟🌟🌟
>
>1. 暴力 超时
>
>   - 枚举一个固定高度，找左右两边第一个比他小的位置，计算出宽度，长×宽得到面积，记录最大的值
>
>2. 双指针优化
>
>   固定高度，找左右两边第一个比他小的位置，计算出宽度，长×宽得到面积，记录最大的值
>
>   ```Java
>   class Solution {
>       public int largestRectangleArea(int[] heights) {
>           int len = heights.length;
>           int[] minLeft = new int[len];
>           int[] minRight = new int[len];
>           // 记录每个柱子 左边第一个小于该柱子的下标
>           minLeft[0] = -1;  // 注意这里初始化，防止下面while死循环
>           for(int i=1;i<len;++i){
>               int t = i-1;
>               // 这里不是用if，而是不断向左寻找的过程
>               while(t>=0 && heights[t]>=heights[i]) t = minLeft[t];  
>               minLeft[i]=t;
>           }
>           minRight[len-1] = len;  // 注意这里初始化，防止下面while死循环
>           for(int i=len-2;i>=0;--i){
>               int t = i+1;
>               // 这里不是用if，而是不断向左寻找的过程
>               while(t <=len-1 && heights[t]>=heights[i]) t = minRight[t];  
>               minRight[i]=t;
>           }
>           // 求和
>           int area = 0;
>           for(int i=0;i<len;++i){
>               area = Math.max(area,heights[i] * (minRight[i] - minLeft[i] - 1)); 
>           }
>           return area;
>       }
>   }
>   ```
>
>3. 单调栈
>
>   同样的思路：固定高度，找左右两边第一个比他小的位置，计算出宽度，长×宽得到面积，记录最大的值
>
>   使用单调栈，从栈头到栈底递减
>
>   ```java
>   class Solution {
>       public int largestRectangleArea(int[] heights) {
>           // 在 newHeights 头尾各加一个0，确保heights在递增或递减时都可以触发计算面积
>           int[] newHeights = new int[heights.length+2];
>           for(int i=1;i<newHeights.length-1;++i){
>               newHeights[i] = heights[i-1];
>           }
>           int area = 0;
>           Deque<Integer> stack = new LinkedList<>();
>           stack.push(0);
>           for(int i=1;i<newHeights.length;++i){
>               // 高的入栈
>               if(newHeights[i]>newHeights[stack.peek()]){
>                   stack.push(i);
>               }else if(newHeights[i]==newHeights[stack.peek()]){  // 等于更新栈顶
>                   stack.pop();
>                   stack.push(i);
>               }else{
>                   // 找到小于的高度，此时newHeights[i]就是右侧第一个小的高度
>                   while(newHeights[i]<newHeights[stack.peek()]){
>                       // mid即为固定的高度的下标
>                       int mid = stack.pop();
>                       // left即为左边第一小的高度的下标
>                       int left = stack.peek();
>                       int right = i;
>                       int w = right - left - 1;
>                       int h = newHeights[mid];
>                       area = Math.max(area,h*w);
>                   }
>                   stack.push(i);
>               }
>           }
>           return area;
>       }
>   }
>   ```
>
>   

# 图论

## 深度优先搜索算法   （递归调用）

```java
void dfs(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本节点所连接的其他节点) {
        处理节点;
        dfs(图，选择的节点); // 递归
        回溯，撤销处理结果
    }
}
```

>[797. 所有可能的路径](https://leetcode.cn/problems/all-paths-from-source-to-target/)    中等
>
>1. 深度优先算法（回溯）

## 广度优先搜索算法   （队列）

```cpp
int dir[4][2] = {{0, -1},{0, 1}, {-1, 0}, {1, 0}}; // 表示四个方向：上下左右
// grid 是地图，也就是一个二维数组
// visited标记访问过的节点，不要重复访问
// x,y 表示开始搜索节点的下标
void bfs(vector<vector<char>>& grid, vector<vector<bool>>& visited, int x, int y) {
    queue<pair<int, int>> que; // 定义队列
    que.push({x, y}); // 起始节点加入队列
    visited[x][y] = true; // 只要加入队列，立刻标记为访问过的节点
    while(!que.empty()) { // 开始遍历队列里的元素
        pair<int ,int> cur = que.front(); que.pop(); // 从队列取元素
        int curx = cur.first;
        int cury = cur.second; // 当前节点坐标
        for (int i = 0; i < 4; i++) { // 开始想当前节点的四个方向左右上下去遍历
            int nextx = curx + dir[i][0];
            int nexty = cury + dir[i][1]; // 获取周边四个方向的坐标
            if (nextx < 0 || nextx >= grid.size() || nexty < 0 || nexty >= grid[0].size()) continue;  // 坐标越界了，直接跳过
            if (!visited[nextx][nexty]) { // 如果节点没被访问过
                que.push({nextx, nexty});  // 队列添加该节点为下一轮要遍历的节点
                visited[nextx][nexty] = true; // 只要加入队列立刻标记，避免重复访问
            }
        }
    }

}
```

>
>
>[200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)   中等
>
>1. 深度优先   递归调用    一条路走到黑
>
>```java
>class Solution {
>    public int numIslands(char[][] grid) {
>        int count = 0;
>        for(int i=0;i<grid.length;++i){
>            for(int j=0;j<grid[0].length;++j){
>                // 找到“1”，count加一，同时淹没这个岛(相当于标记它已被访问过)
>                if(grid[i][j] == '1'){
>                    count++;
>                    dfs(grid,i,j);
>                }
>            }
>        }
>        return count;
>    }
>    public void dfs(char[][] grid,int i,int j){
>        // 索引越界 或者 遍历的位置本身就是'0'，即海水，那必定没有连接的陆地
>        if(i<0 || i>=grid.length || j<0 || j>=grid[0].length || grid[i][j] == '0') return; 
>        // 淹没这个陆地
>        grid[i][j] = '0';
>        // 向 上下左右 继续搜索
>        dfs(grid,i,j-1);
>        dfs(grid,i,j+1);
>        dfs(grid,i-1,j);
>        dfs(grid,i+1,j);
>    }
>}
>```
>
>2. 广度优先  队列   一圈一圈的走   **只要加入队列，立即标记该节点走过**   
>
>```java
>class Solution {
>    boolean[][] visited;
>    int[][] move = {{0,-1},{0,1},{-1,0},{1,0}};
>    public int numIslands(char[][] grid) {
>        int count = 0;
>        visited = new boolean[grid.length][grid[0].length];
>        for(int i=0;i<grid.length;++i){
>            for(int j=0;j<grid[0].length;++j){
>                if(!visited[i][j] && grid[i][j] == '1'){
>                    count++;
>                    bfs(grid,i,j);
>                }
>            }
>        }
>        return count;
>    }
>    // 将这片岛屿上的所有陆地都访问到
>    public void bfs(char[][] grid,int i,int j){
>        Deque<int[]> que = new LinkedList<int[]>();
>        que.offer(new int[]{i,j});
>        visited[i][j] = true;
>        // 向 上下左右 继续搜索
>        while(!que.isEmpty()){
>            int[] cur = que.poll();
>            for(int index=0;index<4;++index){
>                int nextx = cur[0] + move[index][0];
>                int nexty = cur[1] + move[index][1];
>                // 索引越界
>                if(nextx<0 || nextx==grid.length || nexty<0 || nexty==grid[0].length ) continue;
>                if(grid[nextx][nexty] == '1' && !visited[nextx][nexty]){
>                    que.offer(new int[]{nextx,nexty});
>                    visited[nextx][nexty] = true;  //只要加入队列就标记为访问
>                }
>            }
>        }
>    }
>}
>```
>
>[695. 岛屿的最大面积](https://leetcode.cn/problems/max-area-of-island/)   中等    与上一题一样，只是换成记录面积
>
>1. DFS
>
> ```java
> class Solution {
>     boolean[][] visited;
>     int[][] move = new int[][]{{0,-1},{0,1},{-1,0},{1,0}};
>     int area;
>     public int maxAreaOfIsland(int[][] grid) {
>         int res = 0;
>         visited = new boolean[grid.length][grid[0].length];
>         for(int i=0;i<grid.length;++i){
>             for(int j=0;j<grid[0].length;++j){
>                 if(!visited[i][j] && grid[i][j] == 1){
>                     area = 0;
>                     dfs(grid,i,j);
>                     res =  Math.max(res,area);
>                 }
>             }
>         }
>         return res;
>     }
>     public void dfs(int[][] grid,int x,int y){
>         if(visited[x][y] || grid[x][y]==0){
>             return;
>         }
>         visited[x][y] = true;
>         area++;
>         for(int i=0;i<4;++i){
>             int nextx = x + move[i][0];
>             int nexty = y + move[i][1];
>             if(nextx<0 || nextx==grid.length || nexty<0 || nexty==grid[0].length){
>                 continue;
>             }
>             dfs(grid,nextx,nexty);
>         }
>     }
> }
> ```
>
>2. BFS
>
> ```java
> class Solution {
>     boolean[][] visited;
>     int[][] move = new int[][]{{0,-1},{0,1},{-1,0},{1,0}};
>     int area;
>     public int maxAreaOfIsland(int[][] grid) {
>         int res = 0;
>         visited = new boolean[grid.length][grid[0].length];
>         for(int i=0;i<grid.length;++i){
>             for(int j=0;j<grid[0].length;++j){
>                 if(!visited[i][j] && grid[i][j] == 1){
>                     area = 0;
>                     bfs(grid,i,j);
>                     res =  Math.max(res,area);
>                 }
>             }
>         }
>         return res;
>     }
>     public void bfs(int[][] grid,int x,int y){
>         Deque<int[]> que = new LinkedList<>();
>         que.offer(new int[]{x,y});
>         visited[x][y] = true;
>         area++;
>         while(!que.isEmpty()){
>             int[] cur = que.poll();
>             for(int i=0;i<4;++i){
>                 int nextx = cur[0] + move[i][0];
>                 int nexty = cur[1] + move[i][1];
>                 if(nextx<0 || nextx==grid.length || nexty<0 || nexty==grid[0].length){
>                     continue;
>                 }
>                 if(!visited[nextx][nexty] && grid[nextx][nexty] == 1){
>                     area++;
>                     que.offer(new int[]{nextx,nexty});
>                     visited[nextx][nexty]=true;
>                 }
>             }
>         }
>     }
> }
> ```
>
>[1020. 飞地的数量](https://leetcode.cn/problems/number-of-enclaves/)   中等    找不靠边的岛屿数量
>
>思路：先遍历四条边，找到靠边的岛屿，淹没掉之后，再找剩下的岛屿数量
>
>1. DFS
>
> ```java
> class Solution {
>     int count = 0;
>     int[][] move = new int[][]{{0,-1},{0,1},{-1,0},{1,0}};
>     public int numEnclaves(int[][] grid) {
>         // 处理靠边的岛屿
>         for(int i=0;i<grid.length;++i){
>             if(grid[i][0]==1){
>                 dfs(grid,i,0);
>             }
>             if(grid[i][grid[0].length-1]==1){
>                 dfs(grid,i,grid[0].length-1);
>             }
>         }
>         for(int j=1;j<grid[0].length-1;++j){
>             if(grid[0][j]==1){
>                 dfs(grid,0,j);
>             }
>             if(grid[grid.length-1][j]==1){
>                 dfs(grid,grid.length-1,j);
>             }
>         }
>         // 计算不靠边岛屿数量
>         count = 0;
>         for(int i=1;i<grid.length-1;++i){
>             for(int j=1;j<grid[0].length-1;++j){
>                 if(grid[i][j]==1){
>                     dfs(grid,i,j);
>                 }
>             }
>         }
>         return count;
>     }
>     public void dfs(int[][] grid,int x,int y){
>         if(grid[x][y]==0) return;
>         grid[x][y]=0;
>         count++;
>         for(int i=0;i<4;++i){
>             int nextx = x + move[i][0];
>             int nexty = y + move[i][1];
>             if(nextx<0 || nextx == grid.length || nexty<0 || nexty==grid[0].length){
>                 continue;
>             }
>             dfs(grid,nextx,nexty);
>         }
>     }
> }
> ```
>
>2. BFS
>
> ```java
> class Solution {
>     int count = 0;
>     int[][] move = new int[][]{{0,-1},{0,1},{-1,0},{1,0}};
>     public int numEnclaves(int[][] grid) {
>         for(int i=0;i<grid.length;++i){
>             if(grid[i][0]==1){
>                 bfs(grid,i,0);
>             }
>             if(grid[i][grid[0].length-1]==1){
>                 bfs(grid,i,grid[0].length-1);
>             }
>         }
>         for(int j=1;j<grid[0].length-1;++j){
>             if(grid[0][j]==1){
>                 bfs(grid,0,j);
>             }
>             if(grid[grid.length-1][j]==1){
>                 bfs(grid,grid.length-1,j);
>             }
>         }
>         count = 0;
>         for(int i=1;i<grid.length-1;++i){
>             for(int j=1;j<grid[0].length-1;++j){
>                 if(grid[i][j]==1){
>                     bfs(grid,i,j);
>                 }
>             }
>         }
>         return count;
>     }
>     public void bfs(int[][] grid,int x,int y){
>         Deque<int[]> que = new LinkedList<>();
>         que.offer(new int[]{x,y});
>         grid[x][y]=0;
>         count++;
>         while(!que.isEmpty()){
>             int[] cur = que.poll();
>             for(int i=0;i<4;++i){
>                 int nextx = cur[0] + move[i][0];
>                 int nexty = cur[1] + move[i][1];
>                 if(nextx<0 || nextx == grid.length || nexty<0 || nexty==grid[0].length){
>                     continue;
>                 }
>                 if(grid[nextx][nexty]==1){
>                     que.offer(new int[]{nextx,nexty});
>                     grid[nextx][nexty]=0;
>                     count++;
>                 }
>             }
>         }
>     }
> }
> ```
>
>[417. 太平洋大西洋水流问题](https://leetcode.cn/problems/pacific-atlantic-water-flow/)   中等
>
>其实就是找到哪些点 可以同时到达太平洋和大西洋。 流动的方式只能从高往低流。那么我们可以 反过来想，从太平洋边上的节点 逆流而上，将遍历过的节点都标记上。 从大西洋的边上节点 逆流而长，将遍历过的节点也标记上。 然后两方都标记过的节点就是既可以流太平洋也可以流大西洋的节点。
>
>1. DFS
>
>  ```java
>  class Solution {
>      int[][] move = {{0,-1},{0,1},{-1,0},{1,0}};
>      public List<List<Integer>> pacificAtlantic(int[][] heights) {
>          List<List<Integer>> res = new ArrayList<List<Integer>>();
>          int rowLen = heights.length;
>          int colLen = heights[0].length;
>          // 0 表示 太平洋；1 表示 大西洋
>          boolean[][][] visited = new boolean[rowLen][colLen][2];
>          for(int row=0;row<rowLen;++row){
>              visited[row][0][0] = true;
>              visited[row][colLen-1][1] = true;
>              dfs(heights,row,0,0,visited);
>              dfs(heights,row,colLen-1,1,visited);
>          }
>          for(int col=0;col<colLen;++col){
>              visited[0][col][0] = true;
>              visited[rowLen-1][col][1] = true;
>              dfs(heights,0,col,0,visited);
>              dfs(heights,rowLen-1,col,1,visited);
>          }
>          for(int row=0;row<rowLen;++row){
>              for(int col=0;col<colLen;++col){
>                  if(visited[row][col][0] && visited[row][col][1]){
>                      res.add(List.of(row,col));
>                  }
>              }
>          }
>          return res;
>      }
>      public void dfs(int[][] heights,int row,int col,int sea,boolean[][][] visited){
>          for(int[] cur : move){
>              int nextRow = row + cur[0];
>              int nextCol = col + cur[1];
>              if(nextRow < 0 || nextRow == heights.length || nextCol < 0 || nextCol == heights[0].length){
>                  continue;
>              }
>              if(!visited[nextRow][nextCol][sea] && heights[row][col] <= heights[nextRow][nextCol]){
>                  visited[nextRow][nextCol][sea] = true;
>                  dfs(heights,nextRow,nextCol,sea,visited);
>              }
>          }
>      }
>  }
>  ```
>
>2. BFS
>
>[827. 最大人工岛](https://leetcode.cn/problems/making-a-large-island/)   **困难**
>
>第一步：一次遍历地图，得出各个岛屿的面积，并做编号记录。可以使用map记录，key为岛屿编号，value为岛屿面积 第二步：在遍历地图，遍历0的方格（因为要将0变成1），并统计该1（由0变成的1）周边岛屿面积，将其相邻面积相加在一起，遍历所有 0 之后，就可以得出 选一个0变成1 之后的最大面积。
>
>1. DFS
>
>  ```java
>  class Solution {
>      int[][] move = {{0,-1},{0,1},{-1,0},{1,0}};
>      int area = 0;
>      public int largestIsland(int[][] grid) {
>          int len = grid.length;
>          int mark = 2; // 岛编号
>          int res = Integer.MIN_VALUE;
>          // map 记录每个岛的面积 key --- 岛编号  value --- 岛面积
>          Map<Integer,Integer> map = new HashMap<>();
>          // 第一次遍历，记录每个岛面积
>          for(int i=0;i<len;++i){
>              for(int j=0;j<len;++j){
>                  if(grid[i][j]==1){
>                      area = 0;
>                      dfs(grid,i,j,mark);
>                      map.put(mark++,area);  // 每记录一个岛编号加1   
>                  }
>              }
>          }
>          // 第二次遍历，把0变成1，计算它四周相邻的岛的面积之和+1
>          for(int i=0;i<len;++i){
>              for(int j=0;j<len;++j){
>                  if(grid[i][j]!=0) continue;        
>                  // 确保不会重复累计岛的面积        
>                  Set<Integer> set = new HashSet<>();
>                  int curArea = 1;  // 0变1后最小面积为1
>                  for(int[] cur : move){
>                      int nextx = i + cur[0];
>                      int nexty = j + cur[1];
>                      if(nextx<0 || nextx == grid.length || nexty<0 || nexty == grid.length){
>                          continue;
>                      }
>                      // 获取四周的岛的编号
>                      int curMark = grid[nextx][nexty];
>                      // 如果这个岛的面积已经在其他方向被累计过了 或者 没有这个岛编号（即这个位置不相邻岛） 跳过
>                      if(set.contains(curMark) || !map.containsKey(curMark)) continue;
>                      // 标记这个岛
>                      set.add(curMark);
>                      // 累计面积
>                      curArea+=map.get(curMark);   
>                  }
>                  // 取最大面积
>                  res = Math.max(res,curArea);
>              }
>          }
>          // 如果res == Integer.MIN_VALUE说明没有grid中没有0，全是陆地
>          return res == Integer.MIN_VALUE ? len*len : res;
>      }
>      public void dfs(int[][] grid,int x,int y,int mark){
>          grid[x][y] = mark; // 这样可以不使用visited数组
>          area++;
>          for(int[] cur : move){
>              int nextx = x + cur[0];
>              int nexty = y + cur[1];
>              if(nextx<0 || nextx == grid.length || nexty<0 || nexty == grid.length){
>                  continue;
>              }
>              if(grid[nextx][nexty]==1){
>                  dfs(grid,nextx,nexty,mark);
>              }
>          }
>      }
>  }
>  ```
>
>[127. 单词接龙](https://leetcode.cn/problems/word-ladder/)   **困难**  本题只需要求出最短路径的长度就可以了，不用找出路径。
>
>首先题目中并没有给出点与点之间的连线，而是要我们自己去连，条件是字符只能差一个，所以判断点与点之间的关系，要自己判断是不是差一个字符，如果差一个字符，那就是有链接。然后就是求起点和终点的最短路径长度，**这里无向图求最短路，广搜最为合适，广搜只要搜到了终点，那么一定是最短的路径**。
>
>1. DFS
>
>```java
>class Solution {
>    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
>        Set<String> wordSet = new HashSet<>(wordList);   //转换为hashset 加快速度
>        if (wordSet.size() == 0 || !wordSet.contains(endWord)) {  //特殊情况判断
>            return 0;
>        }
>        Deque<String> que = new LinkedList<>();
>        que.offer(beginWord);
>        Map<String,Integer> map = new HashMap<>();  //记录单词对应路径长度
>        map.put(beginWord,1);
>        while(!que.isEmpty()){
>            String word = que.poll();  //取出队头单词
>            Integer path = map.get(word);  //获取到该单词的路径长度
>            for(int i=0;i<word.length();i++){  //遍历单词的每个字符
>                char[] chars = word.toCharArray();   //将单词转换为char array，方便替换
>                for(char ch = 'a';ch<='z';ch++){  //从'a' 到 'z' 遍历替换
>                    chars[i] = ch;   //替换第i个字符
>                    String newWord = String.valueOf(chars);  //得到新的字符串
>                    if (newWord.equals(endWord)) {  //如果新的字符串值与endWord一致，返回当前长度+1
>                        return path + 1;
>                    }
>                    if (wordSet.contains(newWord) && !map.containsKey(newWord)) {  //如果新单词在set中，但是没有访问过
>                        map.put(newWord, path + 1);  // 记录单词对应的路径长度
>                        que.offer(newWord);  // 加入队尾
>                    }
>                }
>            }
>        }
>        return 0;
>    }
>}
>```
>
>[841. 钥匙和房间](https://leetcode.cn/problems/keys-and-rooms/)   中等  
>
>本题其实给我们是一个有向图， 意识到这是有向图很重要！
>
>1. DFS
>
>   ```java
>   class Solution {
>       public boolean canVisitAllRooms(List<List<Integer>> rooms) {
>           boolean[] visited = new boolean[rooms.size()];
>           dfs(0,rooms,visited);
>           for(boolean b : visited){
>               if(!b){
>                   return false;
>               }
>           }
>           return true;
>       }
>       public void dfs(int room,List<List<Integer>> rooms,boolean[] visited){
>           if(visited[room]){
>               return;
>           }
>           visited[room]=true;
>           for(int k : rooms.get(room)){
>               dfs(k,rooms,visited);
>           }
>       }
>   }
>   ```
>
>   [463. 岛屿的周长](https://leetcode.cn/problems/island-perimeter/)  简单   不用 用DFS或BFS
>
>   1. 遍历每一个空格，遇到岛屿，计算其上下左右的情况，遇到水域或者出界的情况，就可以计算边了
>
>      ```java
>      class Solution {
>          public int islandPerimeter(int[][] grid) {
>              int[][] move = {{0,-1},{0,1},{-1,0},{1,0}};
>              int res = 0;
>              for(int i=0;i<grid.length;++i){
>                  for(int j=0;j<grid[0].length;++j){
>                      if(grid[i][j]==1){
>                          for(int[] cur : move){
>                              int nextx = i + cur[0];
>                              int nexty = j + cur[1];
>                              if(nextx<0 || nextx==grid.length || nexty<0 || nexty==grid[0].length || grid[nextx][nexty]==0){
>                                  res++;
>                                  continue;
>                              }
>                          }
>                      }
>                  }
>              }
>              return res;
>          }
>      }
>      ```
>
>   2. 计算出总的岛屿数量，因为有一对相邻两个陆地，边的总数就减2，那么在计算出相邻岛屿的数量就可以了。result = 岛屿数量 * 4 - cover * 2;
>
>      ```java
>      class Solution {
>          public int islandPerimeter(int[][] grid) {
>              // 计算岛屿的周长 
>              // 方法二 : 遇到相邻的陆地总周长就-2
>              int landSum = 0; // 陆地数量 
>              int cover = 0; // 相邻陆地数量
>              for (int i = 0; i < grid.length; i++) {
>                  for (int j = 0; j < grid[0].length; j++) {
>                      if (grid[i][j] == 1) {
>                          landSum++;
>                          // 统计上面和左边的相邻陆地
>                          if(i - 1 >= 0 && grid[i-1][j] == 1) cover++;
>                          if(j - 1 >= 0 && grid[i][j-1] == 1) cover++;
>                      }
>                  }
>              }
>              return landSum * 4 - cover * 2;
>          }
>      }
>      ```
>
>      

## 并查集

模板

```java

    // 并查集初始化
    public void init() {
        for (int i = 0; i < father.length; i++) {
            father[i] = i;
        }
    }
    // 寻根
    public int find(int u){
        if(father[u] == u){
            return u;
        }else{
            return father[u] = find(father[u]);  // 路径压缩
        }
    }
    // 判断是否是同一个根
    public boolean isSame(int u,int v){
        u = find(u);
        v = find(v);
        return u == v;
    }
    // 链接
    public void join(int u,int v){
        u = find(u);
        v = find(v);
        if(u == v) return;
        father[v] = u;
    }
```

[1971. 寻找图中是否存在路径](https://leetcode.cn/problems/find-if-path-exists-in-graph/)   简单

并查集 / DFS / BFS

```java
// 并查集
class Solution {
    int[] father;
    public boolean validPath(int n, int[][] edges, int source, int destination) {
        father = new int[n];
        init();
        for(int i=0;i<edges.length;++i){
            join(edges[i][0],edges[i][1]);
        }
        return isSame(source,destination);  // 看 source 和 destination 是否在一个集合里
    }
    // 并查集初始化
    public void init() {
        for (int i = 0; i < father.length; i++) {
            father[i] = i;
        }
    }
    // 寻根
    public int find(int u){
        if(father[u] == u){
            return u;
        }else{
            return father[u] = find(father[u]);  // 路径压缩
        }
    }
    // 判断是否是同一个根
    public boolean isSame(int u,int v){
        u = find(u);
        v = find(v);
        return u == v;
    }
    // 链接
    public void join(int u,int v){
        u = find(u);
        v = find(v);
        if(u == v) return;
        father[v] = u;
    }
}
```

[684. 冗余连接](https://leetcode.cn/problems/redundant-connection/)   中等

如果边的两个节点已经出现在同一个集合(有同一个根)里，说明着边的两个节点已经连在一起了，再加入这条边一定就出现环了(说明这条边就是冗余链接，要删除的就是它)

```java
class Solution {
    int n;
    int[] father;
    public int[] findRedundantConnection(int[][] edges) {
        n = 1005;
        father = new int[n];
        init();
        for(int i=0;i<edges.length;++i){
            if(isSame(edges[i][0],edges[i][1])){  // 如果有同一个根即在一个集合中,则连在一起一定形成一个环,所以要删除的边就是它
                return edges[i];
            }else{
                join(edges[i][0],edges[i][1]);
            }
        }
        return null;

    }
    // 并查集初始化
    public void init() {
        for (int i = 0; i < father.length; i++) {
            father[i] = i;
        }
    }
    // 寻根
    public int find(int u){
        if(father[u] == u){
            return u;
        }else{
            return father[u] = find(father[u]);  // 路径压缩
        }
    }
    // 判断是否是同一个根
    public boolean isSame(int u,int v){
        u = find(u);
        v = find(v);
        return u == v;
    }
    // 链接
    public void join(int u,int v){
        u = find(u);
        v = find(v);
        if(u == v) return;
        father[v] = u;
    }
}
```

[685. 冗余连接 II](https://leetcode.cn/problems/redundant-connection-ii/)   **困难**  🌟🌟

有两种情况：

1. 有一个节点入度为2即有两条边（要删除的一定是两条边里的一个，看删哪个可以构成树）
2. 没有节点入度为2，那么一定有有向环，找到构成环的边返回就可以了([684. 冗余连接](https://leetcode.cn/problems/redundant-connection/))

```java
class Solution {
    int n;
    int[] father;
    public int[] findRedundantDirectedConnection(int[][] edges) {
        n = 1005;
        father = new int[n];

        int[] inDegree = new int[n]; // 记录节点入度
        for(int i=0;i<edges.length;++i){
            inDegree[edges[i][1]] += 1; // 统计每个节点的入度
        }
        // 找入度为2的节点所对应的边，注意要倒序，因为优先返回最后出现在二维数组中的答案
        ArrayList<Integer> twoDegree = new ArrayList<Integer>();  // 记录入度为2的节点对应的边
        for(int i = edges.length - 1; i >= 0; i--)  // 倒叙
        {
            if(inDegree[edges[i][1]] == 2) {
                twoDegree.add(i);  //记录入度为2的节点对应的边
            }
        }
        // 1.如果有入度为2的节点，那么一定是两条边里删一个，看删哪个可以构成树
        if(!twoDegree.isEmpty())
        {
            if(isTreeAfterRemoveEdge(edges, twoDegree.get(0))) {
                return edges[twoDegree.get(0)];
            }
            return edges[twoDegree.get(1)];
        }
        // 2.明确没有入度为2的情况，那么一定有有向环，找到构成环的边返回就可以了
        return getRemoveEdge(edges);
    }
    private int[] getRemoveEdge(int[][] edges) {
        init();  // 重新初始化
        for(int i = 0; i < edges.length; i++) {
            if(isSame(edges[i][0], edges[i][1])) {  // 两个节点有同一个根(它们本身还是一条边),构成有向环了，就是要删除的边
                return edges[i];
            }
            join(edges[i][0], edges[i][1]);
        }
        return null;
    }

    private Boolean isTreeAfterRemoveEdge(int[][] edges, int deleteEdge)
    {
        init();
        for(int i = 0; i < edges.length; i++)
        {
            if(i == deleteEdge) continue;  // 如果是删除的边,跳过不加入并查集,相当于删除了
            if(isSame(edges[i][0], edges[i][1])) { // 删除边后,还是构成有向环了，一定不是树
                return false;
            }
            join(edges[i][0], edges[i][1]);
        }
        return true;
    }

    // 并查集初始化
    public void init() {
        for (int i = 0; i < father.length; i++) {
            father[i] = i;
        }
    }
    // 寻根
    public int find(int u){
        if(father[u] == u){
            return u;
        }else{
            return father[u] = find(father[u]);  // 路径压缩
        }
    }
    // 判断是否是同一个根
    public boolean isSame(int u,int v){
        u = find(u);
        v = find(v);
        return u == v;
    }
    // 链接
    public void join(int u,int v){
        u = find(u);
        v = find(v);
        if(u == v) return;
        father[v] = u;
    }
}
```



# HOT 100

| 题目                                                         | 难度 | 一 刷 | 二 刷 | 备注                                                         |
| ------------------------------------------------------------ | ---- | ----- | ----- | ------------------------------------------------------------ |
| 哈希                                                         |      |       |       |                                                              |
| [1. 两数之和](https://leetcode.cn/problems/two-sum/)         | 🟩    | ✅     | ✅     | 哈希表                                                       |
| [49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/) | 🟨    | ❌     | ✅     | 排序后哈希表存储；**字母异位词排序后肯定是一样的**，排序后的字符串做key，原字符串的集合做value；遍历到相同的key则更新value |
| [128. 最长连续序列 ](https://leetcode.cn/problems/longest-consecutive-sequence/) | 🟨    | ❌     | ❌     | 题目要求时间复杂度$o(n)$ ，排序的时间复杂度为$o(nlog(n))$ ，所以不能先排序；哈希表存储数组中的数，这样查看一个数是否存在即能优化至 $O(1)$的时间复杂度；遍历哈希表计算连续长序列 |
| 双指针                                                       |      |       |       |                                                              |
| [283. 移动零](https://leetcode.cn/problems/move-zeroes/)     | 🟩    | ✅     | ✅     | 双指针                                                       |
| [11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/) | 🟨    | ❌     | ❌     | 初始化双指针分列水槽左右两端，循环每轮将短板向内移动一格，并更新面积最大值，直到两指针相遇时跳出；即可获得最大面积 |
| [15. 三数之和](https://leetcode.cn/problems/3sum/)           | 🟨    | ❌     | ✅     | 先遍历固定一个数i，再初始化双指针j=i+1和k=nums.length-1；while(j<k)时，和>0则k--；和<0则j++；注意i和j的去重；i固定要判断边界条件进行剪枝。四数之和同理，多加一个for循环进行固定。 |
| [42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/) | 🟥    | ❌     | ✅     | 记录每列左侧和右侧最大高度；                                 |
| 滑动窗口                                                     |      |       |       |                                                              |
| [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) | 🟨    | ❌     | ❌     | 滑动窗口 + 哈希表                                            |
| [438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/) | 🟨    | ❌     | ✅     | 滑动窗口 + 数组；数组记录异位词字符串的字母词频，相同异位词的词频数组一定相同 **Arrays.equals()** ； |
| 子串                                                         |      |       |       |                                                              |
| [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/) | 🟨    | ❌     | ✅     | 双循环暴力 √<br />前缀和 + 哈希表优化；前缀和：以i结尾的子数组的和；哈希表记录每个和 preSum 的出现次数； × |
| [239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/) | 🟥    | ❌     | ❌     | 单调递减队列：Deque<Integer>  que = new LinkedList<>(); 队列的头元素即为每次滑动窗的最大值 |
| [76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/) | 🟥    | ❌     | ❌     | 滑动窗口 + 哈希表                                            |
| 普通数组                                                     |      |       |       |                                                              |
| [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/) | 🟨    | ✅     | ✅     | 累计和 为负数了，就清零，从nums[i+1]重新开始累加             |
| [56. 合并区间](https://leetcode.cn/problems/merge-intervals/) | 🟨    | ❌     | ✅     | 先重写匿名Comparator排序，再合并                             |
| [189. 轮转数组](https://leetcode.cn/problems/rotate-array/)  | 🟨    | ✅     | ✅     | 使用额外的数组 或 三次反转数组                               |
| ***[238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)*** | 🟨    | ❌     | ❌     | 左边数的乘积合 *  右边数的乘积合                             |
| [41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/) | 🟥    | ✅     | ❌     | 缺失的最小正数必在[1,N+1]内，将给定的数组「恢复」成下面的形式：如果数组中包含 x∈[1,N]，那么恢复后，数组的第 x−1 个元素为 x。循环置换的方式恢复。 |
| 矩阵                                                         |      |       |       |                                                              |
| [73. 矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/) | 🟨    | ✅     | ✅     | $O(m+n)$的方法可以做出来 √ ；<br />$O(1)$的方法没做出来 ×；  |
| [54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)  | 🟨    | ✅     | ✅     | 剥洋葱：四个变量top  bottom  left  right代表四个边界，边界向内收缩，注意每次判断是否提前退出循环 |
| [48. 旋转图像](https://leetcode.cn/problems/rotate-image/)   | 🟨    | ❌     | ❌     | $O(1)$空间复杂度方法：置换规则 matrix [i] [j] → matrix [j] [n−1−i] ，从四个角开始置换 |
| [240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/) | 🟨    | ❌     | ❌     | 根据矩阵特性，从左下角开始比较                               |
| 链表                                                         |      |       |       |                                                              |
| [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/) | 🟩    | ✅     | ✅     | 哈希表：空间复杂度$O(m)$；双指针：空间复杂度$O(1)$ 。时间复杂度都是$O(m+n)$ |
| [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/) | 🟩    | ✅     | ✅     | 双指针                                                       |
| [234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/) | 🟩    | ✅     | ✅     | 列表存链表值，然后双指针判断列表是否回文：空间复杂度$O(n)$ ；将链表的后半部分反转（修改链表结构），然后将前半部分和后半部分进行比较，空间复杂度$O(1)$ |
| [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/) | 🟩    | ✅     | ✅     | 哈希表；或 快慢指针                                          |
| [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/) | 🟨    | ✅     | ✅     | 哈希表；或 快慢指针                                          |
| [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) | 🟩    | ❌     | ✅     | 引入 伪头节点；循环合并；合并剩余尾部                        |
| [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/) | 🟨    | ❌     | ✅     | 模拟加法即可，注意最后的进位也要考虑                         |
| [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) | 🟨    | ❌     | ❌     | 快慢指针，虚拟头节点，fast快指针要先走 n+1 步 因为这样当fast指向null时，slow指向 倒数第 n+1 个节点 |
| [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/) | 🟨    | ❌     | ❌     | pre指向本轮交换的第一个节点的前一个节点，firstnode 本轮交换的第一个节点，secondnode 本轮交换的第二个节点，tmp 临时节点，保存两个节点后面的节点；两种情况：1.两两交换后刚好交换完pre.next==null；2.两两交换后剩一个尾节点pre.next.next=null |
| [25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/) | 🟥    | ❌     | ❌     | 虚拟头节点，反转链表                                         |
| [138. 随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer/) | 🟨    | ❌     | ❌     | 构建 原链表节点 和 新链表对应节点 的键值对映射关系**哈希表**，再遍历构建新链表各节点的 `next` 和 `random` 引用指向即可，两次遍历 |
| [148. 排序链表](https://leetcode.cn/problems/sort-list/)  🌟  | 🟨    | ❌     | ❌     | **归并排序**（从底至顶直接合并）                             |
| [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/) | 🟥    | ❌     | ❌     | **优先队列** 或 [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/) 一样循环的两两合并 |
| ***[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/) 🌟*** | 🟨    | ❌     | ❌     | 自己实现==LRU缓存==：哈希表+双向链表                         |
| 二叉树                                                       |      |       |       |                                                              |
| [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/) | 🟩    | ✅     | ✅     | 递归   √ <br />迭代   ×                                      |
| [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/) | 🟩    | ✅     | ✅     | 层序遍历：队列 或 后序遍历：max（左子树深度+右子树深度）+1   |
| [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/) | 🟩    | ✅     | ✅     | 递归翻转                                                     |
| [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/) | 🟩    | ❌     | ✅     | 单端队列：先判断，然后先内侧入队，再外侧入队                 |
| [543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/) | 🟩    | ❌     | ❌     | 递归左子树和右子树                                           |
| [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/) | 🟩    | ✅     | ✅     | 队列                                                         |
| [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/) | 🟩    | ❌     | ❌     | 二分查找+递归：总是选择中间位置左边的数字作为根节点          |
| ***[98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)*** | 🟨    | ❌     | ❌     | 递归中序遍历，**搜索二叉树中序遍历必定是升序**的             |
| ***[230. 二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)*** | 🟨    | ❌     | ❌     | 二叉搜索树中序遍历必定是升序的                               |
| [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/) | 🟨    | ✅     | ✅     | 层序遍历 ，只记录每层遍历的最后一个节点；                    |
| [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/) | 🟨    | ✅     | ✅     | 先遍历二叉树记录到集合中，再遍历集合构建链表                 |
| [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | 🟨    | ❌     | ❌     | 前序遍历的首元素 为 树的根节点 node 的值；在中序遍历中搜索根节点 node 的索引 ，可将 中序遍历 划分为 [ 左子树 ]；根据中序遍历中的左（右）子树的节点数量，可将 前序遍历 划分为 [ 根节点 |
| ***[437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/) 🌟*** | 🟨    | ❌     | ❌     | 深度优先搜索：递归的穷举每一个节点                           |
| [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/) | 🟨    | ❌     | ✅     | 递归先序遍历用哈希表记录节点值和它的父节点的映射关系，然后再哈希表中从p开始不断找父节点并记录访问过的节点，q再循环找父节点，发现是访问过的即为最近公共父节点 |
| [***124. 二叉树中的最大路径和***](https://leetcode.cn/problems/binary-tree-maximum-path-sum/) | 🟥    | ❌     | ❌     | 递归：首先，考虑实现一个简化的函数 maxGain(node)，该函数计算二叉树中的一个节点的最大贡献值，具体而言，就是在以该节点为根节点的子树中寻找以该节点为起点的一条路径，使得该路径上的节点值之和最大<br />非空节点的最大贡献值等于节点值与其子节点中的最大贡献值之和（对于叶节点而言，最大贡献值等于节点值） |
| 图论                                                         |      |       |       |                                                              |
| [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/) | 🟩    | ❌     | ✅     |                                                              |
| ***[994. 腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/)*** | 🟨    | ❌     | ❌     | ==广搜/深搜==                                                |
| [207. 课程表](https://leetcode.cn/problems/course-schedule/)   🌟 | 🟨    | ❌     | ❌     | ==拓扑排序==                                                 |
| [208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)     🌟 | 🟨    | ❌     |       | ==前缀树==                                                   |
| 回溯                                                         |      |       |       |                                                              |
| [46. 全排列](https://leetcode.cn/problems/permutations/)     | 🟨    | ❌     | ✅     | 经典回溯：排列是区分顺序的，所以用 used 数组标记是否用过     |
| [78. 子集](https://leetcode.cn/problems/subsets/)            | 🟨    | ✅     | ❌     | 组合问题，for循环从start开始                                 |
| [17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/) | 🟨    | ❌     | ✅     | 组合问题                                                     |
| [39. 组合总和](https://leetcode.cn/problems/combination-sum/) | 🟨    | ❌     | ✅     | 可以重复读取当前的数,但不能读取之前的数,否则组合会重复       |
| [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/) | 🟨    | ❌     | ✅     | 如果左括号数量不大于 n，我们可以放一个左括号。如果右括号数量小于左括号的数量，我们可以放一个右括号。 |
| [79. 单词搜索](https://leetcode.cn/problems/word-search/)    | 🟨    | ❌     | ✅     | 深度优先搜索+剪枝 <br />`boolean res = dfs(board,word,i-1,j,k+1) || dfs(board,word,i+1,j,k+1) || dfs(board,word,i,j-1,k+1) || dfs(board,word,i,j+1,k+1)` |
| [131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/) | 🟨    | ❌     | ❌     | 回溯（组合问题，for循环从start开始）+双指针判断回文串        |
| **[51. N 皇后](https://leetcode.cn/problems/n-queens/)**     | 🟥    | ❌     | ❌     | 使用一个数组记录每行放置的皇后的列下标，依次在每一行放置一个皇后。每次新放置的皇后都不能和已经放置的皇后之间有攻击：即新放置的皇后不能和任何一个已经放置的皇后在同一列以及同一条斜线上，并更新数组中的当前行的皇后列下标。当 N 个皇后都放置完毕，则找到一个可能的解。用三个HasSet集合来记录 同列 同45度斜线 同135斜线 上是否有皇后 |
| 二分查找                                                     |      |       |       |                                                              |
| [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/) | 🟩    | ✅     | ✅     | 二分查找                                                     |
| [74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/) | 🟨    | ✅     | ✅     | （1）对矩阵的第一列的元素二分查找，找到最后一个不大于目标值的元素，然后在该元素所在行中二分查找目标值是否存在；（2）将矩阵每一行拼接在上一行的末尾，则会得到一个升序数组，我们可以在该数组上二分找到目标元素 |
| [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/) | 🟨    | ✅     | ✅     | 两次二分查找，分开查找第一个和最后一个；时间复杂度 O(log n), 空间复杂度 O(1) |
| [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/) | 🟨    | ✅     | ✅     | 分成两部分，分别进行二分查找                                 |
| [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/) | 🟨    | ✅     | ✅     | 旋转后的数组一定被分成了前后两部分且两半都是升序数组，且前一半的最小值一定大于后一半的最大值，只要用二分找到后一半的第一个元素即可 |
| [4. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/) 🌟 | 🟨    | ❌     | ❌     | 1）合并成一个数组再取中位数；2）由于两个数组的长度已知，因此中位数对应的两个数组的下标之和也是已知的。维护两个指针，初始时分别指向两个数组的下标 0 的位置，每次将指向较小值的指针后移一位（如果一个指针已经到达数组末尾，则只需要移动另一个数组的指针），直到到达中位数的位置；3）**二分查找** |
| 栈                                                           |      |       |       |                                                              |
| [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/) | 🟩    | ✅     | ✅     | 用栈：碰到左括号，就把相应的右括号入栈，遍历匹配             |
| [155. 最小栈](https://leetcode.cn/problems/min-stack/)       | 🟨    | ❌     | ✅     | 辅助栈：借用一个辅助栈 `min_stack`，用于存获取 `stack` 中最小值 |
| ***[394. 字符串解码](https://leetcode.cn/problems/decode-string/)**   🌟* | 🟨    | ❌     | ❌     | ==辅助栈==：stack_multi、stack_res                           |
| [739. 每日温度](https://leetcode.cn/problems/daily-temperatures/) | 🟨    | ✅     | ✅     | 单调栈：递减栈                                               |
| [84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/) | 🟥    | ❌     | ❌     | 与[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)相反  ==单调栈==：递增栈；或  两个数组分别记录左边第一个小于的下标，右边第一个小于的下标 |
| 堆                                                           |      |       |       |                                                              |
| *[215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)* | 🟨    | ❌     | ❌     | ==堆排序 / 快速选择（基于快排）== ；返回数组排序之后的倒数第 k 个位置 |
| [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/) | 🟨    | ❌     | ✅     | ==优先队列== ---> 小根堆                                     |
| [295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/) | 🟥    | ❌     | ✅     | 两个优先队列：左边降序，右边升序，小的加左边，大的加右边，平衡俩堆数，新加就弹出，堆顶给对家，奇数取多的，偶数取除2 |
| 贪心                                                         |      |       |       |                                                              |
| [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/) | 🟩    | ✅     | ❌     | 贪心 / 动规：持有和不持有                                    |
| [55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)      | 🟨    | ✅     | ✅     | 贪心：看最大跳跃范围是否大于等于len-1                        |
| [45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/) | 🟨    | ❌     | ✅     | 贪心：跳的时候选择跳到能跳的范围内下一次范围最大的位置       |
| [763. 划分字母区间](https://leetcode.cn/problems/partition-labels/) | 🟨    | ❌     | ❌     | 先记录每个字符出现的最大索引位置，然后遍历时判断分割         |
| 动规                                                         |      |       |       |                                                              |
| [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)  | 🟩    | ❌     | ✅     | 动规 ：斐波拉契数列  dp[i]：爬到有i个台阶的楼顶，有dp[i]种方法 |
| [118. 杨辉三角](https://leetcode.cn/problems/pascals-triangle/) | 🟩    | ❌     | ✅     | 找规律，`res.add(List.of(1))`                                |
| [198. 打家劫舍](https://leetcode.cn/problems/house-robber/)  | 🟨    | ❌     | ✅     | dp[i]表示到第i个房间,偷窃或不偷窃的最大金额；dp[i]=Math.max(dp[i-1],dp[i-2]+nums[i]) |
| [279. 完全平方数](https://leetcode.cn/problems/perfect-squares/) | 🟨    | ❌     | ✅     | 背包问题：dp[j]：和为j的完全平方数的最少数量为dp[j]，dp[j] = min(dp[j - i * i] + 1, dp[j]); |
| [322. 零钱兑换](https://leetcode.cn/problems/coin-change/)   | 🟨    | ❌     | ❌     |                                                              |
| [139. 单词拆分](https://leetcode.cn/problems/word-break/)    | 🟨    | ❌     | ❌     | dp[i] : 字符串长度为i的话，dp[i]为true，表示可以拆分为一个或多个在字典中出现的单词。如果确定dp[j] 是true，且 [j, i] 这个区间的子串出现在字典里，那么dp[i]一定是true。（j < i ）。所以递推公式是 if([j, i] 这个区间的子串出现在字典里 && dp[j]是true) 那么 dp[i] = true。 |
| [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/) | 🟨    | ✅     | ❌     | dp[i]：以下标i结尾的数组的最长严格递增子序列的长度           |
| [152. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/) | 🟨    | ❌     | ❌     | 遍历数组时计算当前最大值，不断更新；令imax为当前最大值，则当前最大值为 imax = max(imax * nums[i], nums[i])；由于存在负数，那么会导致最大的变最小的，最小的变最大的。因此还需要维护当前最小值imin，imin = min(imin * nums[i], nums[i])；当负数出现时则imax与imin进行交换再进行下一步计算 |
| [416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/) | 🟨    | ❌     | ❌     | dp[i] [j]表示从数组的 [0,i] 下标范围内选取若干个正整数（可以是 0 个），是否存在一种选取方案使得被选取的正整数的和等于 j；dp[i] [j] = dp[i-1] [j] 不能选这个数;  dp[i] [j] = dp[i-1] [j] \|\| dp[i-1] [j-num]选或不选这个数，只要有一个为true即可 |
| [32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/) | 🟥    | ❌     | ❌     | dp[i] 表示以下标 i 字符结尾的最长有效括号的长度              |
| 多维动规                                                     |      |       |       |                                                              |
| [62. 不同路径](https://leetcode.cn/problems/unique-paths/)   | 🟨    | ✅     | ✅     | 初始化：dp[i] [0]=1；dp[0] [j]=1。状态转移：dp[i] [j]=dp[i-1] [j]+dp[i] [j-1] |
| [64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/) | 🟨    | ✅     | ✅     | 动规                                                         |
| **[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)** | 🟨    | ❌     | ❌     | [647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)的基础上解题：布尔类型的dp[i] [j]：表示区间范围[i,j] （注意是左闭右闭）的子串是否是回文子串，如果是dp[i] [j]为true，否则为false。 |
| [1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/) | 🟨    | ❌     | ❌     | dp[i] [j]表示长度为i的text1前缀和长度为j的text2前缀的最长公共子序列的长度； |
| [72. 编辑距离](https://leetcode.cn/problems/edit-distance/)  | 🟨    | ❌     | ❌     | dp[i] [j] 表示长度为i的字符串word1，和长度为j的字符串word2，最近编辑距离为dp[i] [j]。 |
| 技巧                                                         |      |       |       |                                                              |
| [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/) | 🟩    | ❌     | ❌     | 数组中的全部元素的 `异或运算` 结果即为数组中只出现一次的数字 |
| [169. 多数元素](https://leetcode.cn/problems/majority-element/) | 🟩    | ✅     | ❌     | 时间复杂度为 O(n)、空间复杂度为 O(n) 的算法 √ ； 时间复杂度为 O(n)、空间复杂度为 O(1) 的算法：**摩尔投票法** × |
| [75. 颜色分类](https://leetcode.cn/problems/sort-colors/)    | 🟨    | ❌     | ❌     | 通过三个有包含关系的计数器，来分别动态算出0,1,2个数，并修改对应的值；i：代表目前为止(0 + 1 + 2) 的数量；n1: 代表目前为止 (0 + 1)的数量；n0: 代表目前为止 (0)的数量；一次判断当前数字属于哪一类，然后修改对应的nums[]（刷油漆) |
| [31. 下一个排列](https://leetcode.cn/problems/next-permutation/) | 🟨    | ❌     | ❌     | 从后向前找到第一个升序`nums[i]>nums[i+1]` --->  从后往前找到第一个大于nums[i]的数`nums[j]` ---> 交换nums[i]与nums[j] ---> 将i之后的数([i+1,end])倒置 |
| [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/) | 🟨    | ❌     | ❌     | 快慢指针（龟兔赛跑），将数组看作一个链表，转换为[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/) |

# 其他

| 题目                                                         | 描述                                                         |      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [468. 验证IP地址](https://leetcode.cn/problems/validate-ip-address/) | 判断ip是ipv4/6是否有效                                       |      |
| [9. 回文数](https://leetcode.cn/problems/palindrome-number/) | 判断整数是否是回文数                                         |      |
| [290. 单词规律](https://leetcode.cn/problems/word-pattern/)  | 字符 与 字符串 一一对应                                      |      |
| [下一个更大元素 III](https://leetcode.cn/problems/next-greater-element-iii/) | 给你一个正整数 `n` ，请你找出符合条件的最小整数，其由重新排列 `n` 中存在的每位数字组成，并且其值大于 `n` 。如果不存在这样的正整数，则返回 `-1` 。就是[31. 下一个排列](https://leetcode.cn/problems/next-permutation/) |      |
| [10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching/) |                                                              |      |
|                                                              |                                                              |      |

