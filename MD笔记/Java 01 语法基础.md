[toc]

# JAVA简介

## Java 特点

1.简单易学；

2.面向对象（封装，继承，多态）；

3.**平台无关性**（ Java 虚拟机实现平台无关性）；

4.支持多线程（ C++ 语言没有内置的多线程机制，因此必须调用操作系统的多线程功能来进行多线程程序设计，而 Java 语言却提供了多线程支持）；

5.可靠性（具备异常处理和**自动内存管理机制**）；

6.安全性（Java 语言本身的设计就提供了多重安全防护机制如访问权限修饰符、限制程序直接访问操作系统资源）；

7.高效性（通过 Just In Time 编译器等技术的优化，Java 语言的运行效率还是非常不错的）；

8.支持网络编程并且很方便；

9.**编译与解释并存**；

...

## Java 三大平台
Java SE : Java 语言的（标准版），用于桌面应用的开发，是其他两个版本的基础。
Java ME : Java 语言的（小型版），用于嵌入式消费类电子设备。（已被Android和Ios淘汰）
Java EE : Java 语言的（企业版），用于 Web 方向的网站开发。

## Java的跨平台性
在需要运行 Java 应用程序的操作系统上，安装一个与操作系统对应的 Java 虚拟机(JVM Java Virtual Machine)即可。
JVM 虚拟机本身不允许跨平台，允许跨平台的是 Java 程序，程序运行在JVM上，而不是操作系统上。

## Java程序开发三步骤

编译与解释并存

编写代码(xxx.java  源文件)--编译-->编译代码(xxx.class  字节码文件)--解释--->运行代码
## JDK组成
JVM（Java Virtual Machine）：Java虚拟机, 真正运行Java程序的地方
核心类库：Java自己写好的程序，给程序员自己的程序调用的
JRE（Java Runtime Environment）：Java的运行环境(JVM+核心类库+运行工具)
JDK（Java Development Kit）：Java开发工具包（JRE+开发工具：javac、Java、jdb、jhat）

# IDEA
IDEA全称IntelliJ IDEA，是用于Java语言开发的集成环境，它是业界公认的目前用于Java程序开发最好的工具。
## 快捷键
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

## IDEA项目结构介绍
project（项目、工程）
module（模块）
package（包）
class（类）

# Java和C++的区别

1.Java **不提供指针**来直接访问内存，程序内存更加安全

2.Java 的**类是单继承**的，C++ 支持多重继承；虽然 Java 的类不可以多继承，但是**接口可以多继承(多实现)**。

3.Java 有**自动内存管理垃圾回收机制**(GC)，不需要程序员手动释放无用内存。

4.C ++同时支持方法重载和操作符重载，但是 Java **只支持方法重载**（操作符重载增加了复杂性，这与 Java 最初的设计思想不符）

...

# JAVA基础语法

## HelloWorld代码

```java
// 通过class定义了一个类 类名称为HelloWorld  
public class HelloWorld {  
    /*  
        main方法 又称为主方法  
        这里是程序的入口，如果没有main方法，程序就不知道从哪里开始。  
    */    
    public static void main(String[] args) {  
        System.out.println("Hello World!!!");  //打印语句,又称输出语句  
    }  
}
```
## 关键字和字面量
### 关键字
有特殊含义的单词，共50个，其中48个可用，2个不可用(**goto, const**)。
### 字面量
字面量(常量，字面值常量，直接量)，在代码中直接表示特定值的常量或值。这些值可以是整数、浮点数、布尔值、字符、字符串或空值。

|类型       |写法                   |说明 |
|:-:|:-:|:-:|
|整型字面量           |100(默认int型)；123L(L结尾长整型)|整数|
|实型字面量 |3.14；  9.8F；   3.2E-3(科学计数法)    |小数|
|字符字面量|‘a’；     '\t'；    '\105'(大写字母E)  |必须使用单引号，有且仅能一个字符|
|字符串字面量 |"HelloWorld"|必须使用双引号，内容可有可无|
|布尔型字面量 |true；      false   |布尔值，表真假|
|引用字面量 |null(空值)|一个特殊的值，空值|
|类型字面量|int.class；String.class|  |

`\t` **制表符**：在打印时，把前面字符串的长度补齐到8，或8的倍数。最少补1个空格，最多补8个空格。

note：字面量的数据会在内存中找一个临时的空间储存起来，但此时字面量内存是无法被重复利用的，如果需重复利用，此时需要用到变量

## 变量

变量就在程序中临时存储数据的容器，但是这个容器中只能存一个值。
### 变量的定义格式
数据类型 变量名 = 数据值；
`int a = 16`
`double b = 3.14`

### 变量的注意事项
- 同一个域中变量名不能重复
- 在一条语句中，可以定义多个变量。但是这种方式影响代码的阅读，所以了解一下即可。
- 变量在使用之前必须要赋值
- 不同的域可以有同名变量
- 变量是可以重新赋值的
## 数据类型
### 基本数据类型
四类八种

|数据类型|关键字|内存占用|取值范围|
|:-:|:-:|:-:|:-:|
|整数 |byte |1|负的2的7次方 ~ 2的7次方-1(-128~127)|
|  |short |2|负的2的15次方 ~ 2的15次方-1(-32768~32767)|
|  |int|4|负的2的31次方 ~ 2的31次方-1|
|  |long |8|负的2的63次方 ~ 2的63次方-1 |
|浮点型|float |4|1.401298e-45 ~ 3.402823e+38  |
|  |double|8|4.9000000e-324 ~ 1.797693e+308|
|字符|char |2|0-65535(unicode)|
|布尔|boolean|1|true，false |

在java中**整数默认是int类型，浮点数默认是double类型**。

整数类型和小数类型的取值范围大小关系：	double > float > long > int > short > byte

如果要定义一个long类型的变量，那么在数据值的后面**需要加上L后缀**。

如果要定义一个float类型的变量，那么在数据值的后面**需要加上F后缀**。

注意：**基本数据类型存放在栈中是一个常见的误区！** 基本数据类型的存储位置取决于它们的作用域和声明方式。如果它们是局部变量，那么它们会存放在**栈**中；如果它们是成员变量，那么它们会存放在**堆**中。

### 枚举类型

符号常量
### 引用类型
引用类型: 数组  类对象  接口

只要是`new`出来的就是引用数据类型  比如数组 
**引用数据类型变量**中存储的是**地址值** 引用数据类型在**堆**中进行分配
**基本数据类型变量**中存储的是**真实的数据** 基本数据类型在**栈**中进行分配 (是局部变量，那么它们会存放在栈中；如果是成员变量，那么它们会存放在堆中。)
引用---使用其他空间(如堆)中的数据   `new`出来的**对象**都存储在**堆**空间中
**基本数据类型赋值给其他变量，赋的真实的值 (即创建新的基本数据类型值)**
**引用数据类型(对象)赋值给其他变量，赋的地址值 (不是创建新的对象(没有new) 只是复制了一个对象地址值的副本出来)**

Java中只有值传递: 所有方法的参数都是在传递**对象地址值的副本**而非本身的值(除了基本数据类型). 具体见[[##方法###方法的值传递]]

### 基本数据类型和包装类型的区别

**用途**：除了定义一些常量和局部变量之外，我们在其他地方比如方法参数、对象属性中很少会使用基本类型来定义变量。并且，包装类型可用于泛型，而基本类型不可以。

**存储方式**：基本数据类型的局部变量存放在 Java 虚拟机栈中的局部变量表中，基本数据类型的成员变量（未被 `static` 修饰 ）存放在 Java 虚拟机的堆中。包装类型属于对象类型，我们知道几乎所有对象实例都存在于堆中。

**占用空间**：相比于包装类型（对象类型）， 基本数据类型占用的空间往往非常小。

**默认值**：成员变量包装类型不赋值就是 `null` ，而基本类型有默认值且不是 `null`。

**比较方式**：对于基本数据类型来说，`==` 比较的是值。对于包装数据类型来说，`==` 比较的是对象的内存地址。所有整型包装类对象之间值的比较，全部使用 `equals()` 方法。

## 标识符
标识符：就是给类、方法、变量等起的名字。
硬性要求：必须要这么做，否则代码会报错。
			必须由 **数字、字母、下划线_、美元符号$** 组成。
					数字不能开头
					不能是关键字
					区分大小写的
软性建议：
			**小驼峰命名法**---变量名和方法名
					如果是一个单词，那么全部小写，比如：name
					如果是多个单词，那么从第二个单词开始，首字母大写，比如：firstName、maxAge
			**大驼峰命名法**---类名
					如果是一个单词，那么首字母大写。比如：Demo、Test。
					如果是多个单词，那么每一个单词首字母都需要大写。比如：HelloWorld

## 输出语句  print
`print`和`println`
`System.out.println(i);`    换行输出
`System.out.print(i);`        输出在同一行
`System.out.println();`         不打印，只换行
`printf`两部分参数：
第一部分参数：要输出的内容%s(占位)
第二部分参数：填充的数据
`System.out.printf("你好啊%s"，"张三")`  // 你好啊张三
注意`System.out.printf()` 没有换行

## 键盘录入 Scanner 
导包     `import java.util.Scanner`

创建对象    `Scanner sc = new Scanner(System.in)`

接收数据     `int i = sc.nextInt();`
注意：
**不同的数据有不同的接受方法**
`nextInt()---Int`  遇到空格时会停止读取，返回的结果为空格前读取到的部分。**不会释放回车**：如果`nextInt()`后面紧接`nextLine()`那么这个`nextLine()`会读取到回车。
`nextDouble()---double` 
`next()---String`    遇上空格，制表符，回车就停止接受。这些符号后面的数据就不会接受了
`nextLine()---String`    可以接受空格，制表符，遇到回车才停止接收数据。

`nextLine().split(" ")`以空格分割读取的字符串。

`Integer.parseInt("100")`  字符串转换为 int 整数

**但是没有单字符`char`类型的接受方法** 

```java
//导包，其实就是先找到Scanner这个类在哪
import java.util.Scanner;
public class ScannerDemo1{
	public static void main(String[] args){
		//2.创建对象，其实就是申明一下，我准备开始用Scanner这个类了。
		Scanner sc = new Scanner(System.in);
		//3.接收数据
		//当程序运行之后，我们在键盘输入的数据就会被变量i给接收了
		System.out.println("请输入一个数字");
		// 有nextLine() nextByte() nextShort() nextLong() nextDouble() nextFloat()  
        // 很奇怪 没有char类型的输入
		int i = sc.nextInt();
		System.out.println(i);
	}
     /**
     * 固定次数的循环输入
     */
    public void cyclicInput2(){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();  // 循环接收次数
        for(int i=0;i<n;++i){
            String str = sc.next();  
            int val = sc.nextInt();  
            System.out.println(str);
            System.out.println(val);
        }
    }
     /**
     * 不断的循环输入
     */
    public void cyclicInput(){
        Scanner sc = new Scanner(System.in);
        int n =0;
        while(sc.hasNext()){   // Ctrl+D或Ctrl+Z 才能停止
            n = sc.nextInt();
        }
        System.out.println(n);
    }
}
```
## 生成随机数 Random
导包     `import java.util.Random;`
创建对象	`Random r =new Random();`
接收数据	`int number = r.nextInt();`
**不同的数据有不同的生成方法** 

```java
package com.scu.demo1;  
  
import java.util.Random;  
  
public class RandomDemo {  
    public static void main(String[] args) {  
        Random r =new Random(); // 创建对象  
        int number = r.nextInt(100);  // 包左不包右，默认起点为0，生成范围为0~99的整数，不指定bound则默认范围为int的整个取值范围
        System.out.println(number);  
        for(int i =0;i<10;i++) {  
            int number1 = r.nextInt(6, 13); // 包左不包右，起点为6，生成范围为6~12的整数  
            System.out.println(number1);  
        }  
        for(int i =0;i<10;i++) {  
            double number2 = r.nextDouble(10);  // 生成范围为[0.0~10.0)的浮点数，不指定范围bound则默认[0.0~1.0)  
            System.out.println(number2);  
        }  
    }  
}
```

## 运算符
就是对常量或者变量进行操作的符号，比如： +  -  *  / 
### 算数运算符
`+ - * / %`
`+ - *` ：跟小学数学中一模一样没有任何区别
`/`：**整数相除结果只能得到整除，如果结果想要是小数，必须要有小数参数**。小数直接参与运算，得到的结果有可能是不精确的。
`%`：取模、取余

#### 隐式转换
也叫自动类型提升。就是把一个**取值范围小**的数据或者变量，赋值给另一个**取值范围大**的变量。此时不需要我们额外写代码单独实现，是程序自动帮我们完成的。
取值范围小的，和取值范围大的进行运算，小的会先提升为大的，再进行运算。
**byte、short、char三种类型的数据在运算的时候，都会直接先提升为int**，然后再进行运算。

#### 强制转换
如果要把一个**取值范围大**的数据或者变量赋值给另一个**取值范围小**的变量。是不允许直接操作。
​如果一定要这么干，就需要加入强制转换。
书写格式：目标数据类型 变量名 = （目标数据类型）被强转的数据；
简单理解：	**要转成什么类型的，那么就在小括号中写什么类型就可以了**。
Note：强制转换有可能会导致数据发生错误。（数据的精度丢失）

#### 字符串和字符的加操作
当+操作中出现字符串时，此时就是字符串的连接符，会将前后的数据进行拼接，并产生一个新的字符串。当连续进行+操作时，从左到右逐个执行的。
当字符串跟变量相加的时候，实际上是跟**变量里面的值**进行拼接。
当+操作中出现了**字符**，会拿着字符到计算机内置的ASCII码表中去查对应的数字，然后再进行计算。

```java
char c = 'a';
int result = c + 0;
System.out.println(result);  //97

System.out.println('a'+ "abc");  // aabc
```
ASCII码表中：'a'   -----    97       'A'   -----    65
### 自增自减运算符
`++`：自增运算符
`--`：自减运算符
放在变量的前面，我们叫做先++。 比如：++a
放在变量的后面，我们叫做后++。 比如：a++

### 赋值运算符
` = `：就是把等号右边的结果赋值给左边的变量
扩展赋值运算符：
`+=`、`-=`、`*=`、`/=`、`%=`
就是把左边跟右边进行运算，把最终的结果赋值给左边，对右边没有任何影响。
**扩展的赋值运算符中隐层还包含了一个强制转换**    `a += b ; 实际上相当于 a = (byte)(a + b);`

### 关系运算符
又叫比较运算符，其实就是拿着左边跟右边进行了判断而已。

| 符号 |解释|
|:-:|:-:|
| ==   | 就是判断左边跟右边是否相等，如果成立就是true，如果不成立就是false |
|!=| 就是判断左边跟右边是否不相等，如果成立就是true，如果不成立就是false |
|>| 就是判断左边是否大于右边，如果成立就是true，如果不成立就是false |
|>=| 就是判断左边是否大于等于右边，如果成立就是true，如果不成立就是false |
|<| 就是判断左边是否小于右边，如果成立就是true，如果不成立就是false |
| <=   | 就是判断左边是否小于等于右边，如果成立就是true，如果不成立就是false |
### 逻辑运算符

`&`：逻辑与（而且）​，两边都为真，结果才是真，只要有一个为假，那么结果就是假。
`|`：逻辑或（或者），两边都为假，结果才是假，只要有一个为真，那么结果就是真。
`^`：异或  ， 如果两边相同，结果为false，如果两边不同，结果为true。
`!`：取反  ， false取反就是true，true取反就是false。
短路逻辑运算符：
`&&`：运算结果跟&是一模一样的，只不过具有短路效果。
`||`：运算结果跟|是一模一样的。只不过具有短路效果。
当左边不能确定整个表达式的结果，右边才会执行。当左边能确定整个表达式的结果，那么右边就不会执行了。从而提高了代码的运行效率。

### 三元运算符
又叫做：三元表达式或者问号冒号表达式。
格式：关系表达式 ？ 表达式1 ：表达式2 ；
计算规则：
计算关系表达式的值。
如果关系表达式的值为真，那么执行表达式1。
如果关系表达式的值为假，那么执行表达式2。
三元运算符的最终结果**一定要被使用**，要么赋值给一个变量，要么直接打印出来。

### 移位运算符

`<<` :左移运算符，向左移若干位，高位丢弃，低位补零。`x << n`,相当于 x 乘以 2的n次方 (不溢出的情况下)。

`>>` :带符号右移，向右移若干位，高位补符号位，低位丢弃。正数高位补 0,负数高位补 1。`x >> n`,相当于 x 除以 2的n次方。

`>>>` :无符号右移，忽略符号位，空位都以 0 补齐。

由于 `double`，`float` 在二进制中的表现比较特殊，因此不能来进行移位操作。

移位操作符实际上支持的类型只有`int`和`long`，编译器在对`short`、`byte`、`char`类型进行移位前，都会将其转换为`int`类型再操作。

当 int 类型左移/右移位数大于等于 32 位操作时，会先求余（%）后再进行左移/右移操作。也就是说左移/右移 32 位相当于不进行移位操作（32%32=0），左移/右移 42 位相当于左移/右移 10 位（42%32=10）。当 long 类型进行左移/右移操作时，由于 long 对应的二进制是 64 位，因此求余操作的基数也变成了 64。

也就是说：`x<<42`等同于`x<<10`，`x>>42`等同于`x>>10`，`x >>>42`等同于`x >>> 10` 

## 流程控制语句
### 顺序结构
顺序结构是程序中最简单最基本的流程控制，没有特定的语法结构，按照代码的先后顺序，依次执行，程序中大多数的代码都是这样执行的。
### 判断语句
#### if 语句
```java 
if (关系表达式1) {
    语句体1;	
} else if (关系表达式2) {
    语句体2;	
} 
…
else {
    语句体n+1;
}
```

```Java
package com.scu.demo1;  
  
import java.util.Scanner;  
  
public class IfDemo {  
    public static void main(String[] args) {  
        /*95~100 自行车一辆  
        90~94   游乐场玩一天  
        80 ~ 89 变形金刚一个  
        80 以下  胖揍一顿*/  
  
        //1.键盘录入一个值表示小明的分数  
        Scanner sc = new Scanner(System.in);  
        System.out.println("请输入小明的成绩");  
        int score = sc.nextInt();  
        //2.对分数的有效性进行判断  
        if(score >= 0 && score <= 100){  
            //有效的分数  
            //3.对小明的分数进行判断，不同情况执行不同的代码  
            if(score >= 95 && score <= 100){  
                System.out.println("送自行车一辆");  
            }else if(score >= 90 && score <= 94){  
                System.out.println("游乐场玩一天");  
            }else if(score >= 80 && score <= 89){  
                System.out.println("变形金刚一个");  
            }else{  
                System.out.println("胖揍一顿");  
            }  
        }else{  
            //无效的分数  
            System.out.println("分数不合法");  
        }  
    }  
}

```
#### switch 语句
```java
switch (表达式) {
	case 1:
		语句体1;
		break;
	case 2:
		语句体2;
		break;
	...
	default:
		语句体n+1;
		break;
}
```
注意：
1. 表达式：(将要匹配的值)取值为**byte、short、int、char**。JDK5以后可以是**枚举**，JDK7以后可以是**String**。没有long、float、double、boolean。
2. case后面的值(被匹配的值)只能是字面量(常量)，不能是变量。**被匹配的值可以有多个**
3. case给出的值不能重复
4. default的位置和省略情况，default可以放在任意位置，也可以省略
5. **case穿透，不写break会引发case穿透现象，即会执行下一个case，直到遇到break或右大括号**。
6. switch在JDK12的**新特性**
```java
//分析：
//1.键盘录入星期数
Scanner sc = new Scanner(System.in);
System.out.println("请输入星期");
int week = sc.nextInt();//3
//2.利用switch进行匹配
//----------------------------------------------------
//利用case穿透简化代码
switch (week){
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        System.out.println("工作日");
        break;
    case 6:
    case 7:
        System.out.println("休息日");
        break;
    default:
        System.out.println("没有这个星期");
        break;
}
//----------------------------------------------------
//利用JDK12的switch新特性简化代码书写
switch (week) {
    case 1, 2, 3, 4, 5 -> System.out.println("工作日!");  //因为只有一行代码，所以省略了{}
    case 6, 7 -> System.out.println("休息日!");
    default -> System.out.println("没有这个星期!");
}

```

### 循环语句
#### for 循环
```java
for (初始化语句;条件判断语句;条件控制语句) {
	循环体语句;
}
```

```java
package com.scu.demo1;  
  
import java.util.Scanner;  
  
public class ForDemo {  
    public static void main(String[] args) {  
        /*  
         *需求：  
         * 键盘输入两个数字，表示一个范围  
         * 求在这个范围中，能被3整除，又能被5整除的数及个数  
         * */        
        Scanner sc = new Scanner(System.in);  
        System.out.println("请输入一个数表示范围的开始：");  
        int start = sc.nextInt();  
        System.out.println("请输入一个数表示范围的结束：");  
        int end = sc.nextInt();  
  
        int count = 0;  
  
        for (int i = start; i <= end; i++) {  
            if (i % 3 == 0 && i % 5 == 0) {  
                System.out.println(i);  
                count++;  
            }  
        }  
        System.out.println(count);  
    }  
}

```
注意：
for() 小括号内用`;`分隔
可用`break`结束循环
可用`continue`结束本次循环体语句执行，进行下一次循环体语句执行

#### 增强for循环

具体见 Java 05 集合进阶

```Java
for(String s:list){
    System.out.println(s);
}
```

#### while 语句

```java
初始化语句;
while(条件判断语句){
	循环体;
	条件控制语句;
}
```
for和while的对比：
【1】
在for中，控制循环的变量i，因为归属于for循环的语法结构中，在for循环结束后，就不能再次被访问了。本质上是因为变量i定义在for循环内，它的作用域在for循环内。
while循环中，控制循环的变量，对于while循环来说不归属器语法结构中，在while循环结束后，该变量还可以继续使用。
但不绝对，因为for还可以像下面这样写：

```java
int i = 0;
for(;i<=5;i++){
	System.out.println(i);
}
```
此时，循环变量i可以在循环结束后使用。本质上是因为i定义在for语句之外，它的作用域不局限在for循环内。
【2】
for循环中：知道循环次数或者循环范围
while循环中：不知道循环的次数和范围，只知道循环的结束条件

#### do...while 语句

```java
初始化语句;
do{
    循环体;
    条件控制语句;
}while(条件判断语句);
```
​	先执行，再判断
## 数组
指的是一种容器，可以同来存储**同种数据类型**的多个值。但是数组容器在存储数据的时候，需要结合隐式转换考虑。
注意：
数组下标都是从0开始的
数组内存空间的地址是连续的
**数组的元素在内存地址中是连续的，不能单独删除数组中的某个元素，只能覆盖** 

### 数组的静态初始化
完整定义格式：
`数据类型[] 数组名 = new 数据类型[]{元素1，元素2，元素3，元素4...};`
数据类型：限定了数组以后能存什么类型的数据。前面和后面的数据类型一定要保持一致。
方括号：表示现在定义的是一个数组。方法括号跟数组名，谁写在前面，谁写在后面都是一样的。习惯上 [] 写在前面。
数组名：就是一个名字而已，方便以后使用。遵循小驼峰命名法
new：就是给数组在内存中开辟了一个空间。
多个元素之间，一定要用逗号隔开。
**数组一旦创建之后，长度不能发生变化**。
简化定义格式：
`数据类型[] 数组名 = {元素1，元素2，元素3，元素4...};`

```java
package com.scu.demo1;  
  
public class ArrayDemo {  
    public static void main(String[] args) {  
        //格式：  
        //静态初始化  
        //完整格式：  
        //数据类型 [] 数组名 = new 数据类型[]{元素1，元素2....};  
        //简化格式：  
        //数据类型 [] 数组名 = {元素1，元素2....};  
  
        //需求1：定义数组存储5个学生的年龄  
        int[] arr1 = new int[]{11,12,13,14,15};  
        int[] arr2 = {11,12,13,14,15};  
  
        //需求2：定义数组存储3个学生的姓名  
        String[] arr3 = new String[]{"zhangsan","lisi","wangwu"};  
        String[] arr4 = {"zhangsan","lisi","wangwu"};  
  
        //需求3：定义数组存储4个学生的身高 1.93        
        double[] arr5 = new double[]{1.93,1.75,1.73,1.81};  
        double[] arr6 = {1.93,1.75,1.73,1.81};  
        //System.out.println(arr6);//[D@776ec8df  地址值  
  
        //扩展：  
        //解释一下地址值的格式含义  [D@776ec8df        //[ ：表示当前是一个数组  
        //D：表示当前数组里面的元素都是double类型的  
        //@：表示一个间隔符号。（固定格式）  
        //776ec8df：才是数组真正的地址值，（十六进制）  
        //平时我们习惯性的会把这个整体叫做数组的地址值。  
    }  
}
```
### 数组元素访问
`数组名[索引];`
`int number = arr[3];`     获取数组元素
`数组名[索引] = 具体数据/变量；`      修改/存储数据到数组中，一旦修改之后，原来的值就会被覆盖了。

### 数组的遍历
遍历：就是把数组里面所有的内容一个一个全部取出来。
数组的长度属性：数组名.length; 没有小括号
自动的快速生成数组的遍历方式---> `数组名.fori`

```java
for(int i = 0; i < arr.length; i++){
    System.out.println(arr[i]);
}
```
### 数组的动态初始化
`数据类型[] 数组名 = new 数据类型[数组的长度];`
数组的默认初始化值：
整数类型：0
小数类型：0.0
布尔类型：false
字符类型：'\u0000' 空格
引用类型：null

### 数组的内存图
[数组的内存图](https://www.bilibili.com/video/BV17F411T7Ao?p=62&vd_source=6ef187124c74c452a2016ded88292617)

### 数组练习题
#### 交换数组元素的顺序
```java
package com.itheima.test;  
  
public class ArrTest8 {  
    public static void main(String[] args) {  
        /*需求：定义一个数组，存入1,2,3,4,5。交换首尾索引对应的元素。  
            交换前：1,2,3,4,5  
            交换后：5,2,3,4,1*/  
        //1.定义数组存储数据  
        int[] arr = {1,2,3,4,5};  
        //2.利用循环去交换数据  
        for(int i = 0,j = arr.length - 1; i < j; i++,j--){  
            //交换变量i和变量j指向的元素  
            int temp = arr[i];  
            arr[i] = arr[j];  
            arr[j] = temp;  
        }  
        //当循环结束之后，那么数组中的数据就实现了头尾交换  
        for (int i = 0; i < arr.length; i++) {  
            System.out.print(arr[i] + " ");  
        }  
    }  
}
```
#### 随机打乱数组元素顺序
```java
package com.itheima.test;  
  
import java.util.Random;  
  
public class ArrTest9 {  
    public static void main(String[] args) {  
        //需求：定义一个数组，存入1~5。要求打乱数组中所有数据的顺序。  
        //难点：  
        //如何获取数组中的随机索引  
        //1.定义数组存储1~5  
        int[] arr = {1, 2, 3, 4, 5};  
        //2.循环遍历数组，从0索引开始打乱数据的顺序  
        Random r = new Random();  
        for (int i = 0; i < arr.length; i++) {  
            //生成一个随机索引  
            int randomIndex = r.nextInt(arr.length);  
            //拿着随机索引指向的元素 跟 i 指向的元素进行交换  
            int temp = arr[i];  
            arr[i] = arr[randomIndex];  
            arr[randomIndex] = temp;  
        }  
        //当循环结束之后，那么数组中所有的数据已经打乱顺序了  
        for (int i = 0; i < arr.length; i++) {  
            System.out.print(arr[i] + " ");  
        }  
    }  
}
```
## 二维数组
### 二维数组的静态初始化
```java
// 1. 二维数组的静态初始化  
int[][] arr1 = new int[][]{{1, 2, 3}, {4, 5, 6}}; // 完整静态初始化格式  
int[][] arr2 = {{1, 2, 3}, {1, 2, 3}}; // 简略格式  
int[][] arr3 = {   // 建议格式  
        {1, 2, 3},  
        {4, 5, 6, 7, 8}  
};
```
### 二维数组的元素访问
```java
// 2. 获取元素  
// arr[i][j]  
// arr----二维数组  
// i----二维数组的索引，获取的是里面的一维数组  
// j----一维数组中的索引，获取的是真正的元素  
System.out.println(arr3[0]);  // [I@776ec8df 获取的是二维数组中第一个一维数组的地址值  
// 上述情况说明 二维数组中保存的其实是一维数组的地址值  
// arr3[0]----二维数组中的第一个一维数组  
// arr3[0][0]----第一个一维数组中0索引的元素  
System.out.println(arr3[0][0]); // 1  
System.out.println(arr3[1][4]); // 8  
//System.out.println(arr3[2][0]); // ArrayIndexOutOfBoundsException
```
### 二维数组的遍历
```java
// 3. 遍历二维数组  
for (int i = 0; i < arr3.length; i++) {  
    for (int j = 0; j < arr3[i].length; j++) {  
        System.out.print(arr3[i][j] + " ");  
    }  
    System.out.println();  
}
```
### 二维数组的动态初始化
```java
// 4. 二维数组的动态初始化  
// 3----表示可以装三个一维数组  
// 5----表示每个一维数组可以装5个元素  
// 创建时，系统自动创建3个同样长度为5的一维数组(其中元素默认为0，因为是int类型的数组)，并且将3个一位数组的地址值保存到二维数组元素中。  
// 缺点：此时所有一维数组的长度都是一样的  
int[][] arr4 = new int[3][5];  
// 赋值  
arr4[0][0] = 5; // 其余元素默认为0  
// 遍历  
for (int i = 0; i < arr4.length; i++) {  
    for (int j = 0; j < arr4[i].length; j++) {  
        System.out.print(arr4[i][j] + " ");  
    }  
    System.out.println();  
}
```
### 二维数组的特殊情况
```java
// 5. 特殊情况1  
// 此时arr5有两个元素，未初始化则全为null  
int[][] arr5 = new int[2][];  
// 定义两个不同长度的一维数组  
int[] arr6 = {1, 2, 3};  
int[] arr7 = {1, 2, 3, 4, 5, 6};  
// 把两个一维数组的地址值赋值给二维数组的两个元素  
arr5[0] = arr6;  
arr5[1] = arr7;  
  
// 6. 特殊情况2  
int[][] arr8 = new int[2][3];  
int[] arr9 = {1,1,1};  
int[] arr10 = {2,2,2,2,2,2};  
arr8[0] = arr9; // 将arr9的地址值赋给arr8的0索引元素，原本创建的默认数组地址值就被覆盖了，之后会被系统自动清除。  
arr8[1] = arr10; // 同上理
```

## 🌟常见算法的API---Arrays(数组)🌟

![Arrays类的方法](H:/JAVA/JAVA MD笔记/images/Arrays类的方法.png)

#### Arrays.asList() 方法

[Arrays.asList() 方法](https://javaguide.cn/java/collection/java-collection-precautions-for-use.html#%E6%95%B0%E7%BB%84%E8%BD%AC%E9%9B%86%E5%90%88) 

`Arrays.asList()` **把数组转换成集合时，不能使用其修改集合相关的方法， 它的 `add/remove/clear` 方法会抛出 `UnsupportedOperationException` 异常。** 

```Java
String[] myArray = {"Apple", "Banana", "Orange"};
List<String> myList = Arrays.asList(myArray);
//上面两个语句等价于下面一条语句
List<String> myList = Arrays.asList("Apple","Banana", "Orange");
```

JDK源码：

```Java
/**
  *返回由指定数组支持的固定大小的列表。此方法作为基于数组和基于集合的API之间的桥梁，
  * 与 Collection.toArray() 结合使用。返回的List是可序列化并实现RandomAccess接口。
  */
public static <T> List<T> asList(T... a) {
    return new ArrayList<>(a);
}
```

注意：

1.**`Arrays.asList()`是泛型方法，传递的数组必须是<u>对象数组</u>，而不是基本类型数组。**

```Java
int[] myArray = {1, 2, 3};
List myList = Arrays.asList(myArray);
System.out.println(myList.size());//1
System.out.println(myList.get(0));//数组地址值
System.out.println(myList.get(1));//报错：ArrayIndexOutOfBoundsException
int[] array = (int[]) myList.get(0);
System.out.println(array[0]);//1
```

当传入一个原生数据类型数组时，`Arrays.asList()` 的真正得到的参数就不是数组中的元素，而是数组对象本身！此时 `List` 的唯一元素就是这个数组，这也就解释了上面的代码。

我们使用包装类型数组就可以解决这个问题。

```Java
Integer[] myArray = {1, 2, 3};
```

2.**使用集合的修改方法: `add()`、`remove()`、`clear()`会抛出异常** 

```Java
List myList = Arrays.asList(1, 2, 3);
myList.add(4);//运行时报错：UnsupportedOperationException
myList.remove(1);//运行时报错：UnsupportedOperationException
myList.clear();//运行时报错：UnsupportedOperationException
```

`Arrays.asList()` 方法返回的并不是 `java.util.ArrayList` ，而是 `java.util.Arrays` 的一个**内部类**(java.util.Arrays$ArrayList),这个内部类并没有实现集合的修改方法或者说并没有重写这些方法。

```Java
List myList = Arrays.asList(1, 2, 3);
System.out.println(myList.getClass());//class java.util.Arrays$ArrayList
```

如何正确的将数组转换为 `ArrayList` ?

java8的`Stream`(推荐)

```Java
Integer [] myArray = { 1, 2, 3 };
List myList = Arrays.stream(myArray).collect(Collectors.toList());
//基本类型也可以实现转换（依赖boxed的装箱操作）
int [] myArray2 = { 1, 2, 3 };
List myList = Arrays.stream(myArray2).boxed().collect(Collectors.toList());
```

其他参考：[集合使用注意事项总结](https://javaguide.cn/java/collection/java-collection-precautions-for-use.html#%E6%95%B0%E7%BB%84%E8%BD%AC%E9%9B%86%E5%90%88)  

#### Arrays.copyOf() 方法 与 System.arraycopy() 方法

[Arrays.copyOf() 方法 与 System.arraycopy() 方法](https://javaguide.cn/java/collection/arraylist-source-code.html#system-arraycopy-%E5%92%8C-arrays-copyof-%E6%96%B9%E6%B3%95) 

`System.arraycopy()` 源码：

```Java
    // 我们发现 arraycopy 是一个 native 方法,接下来我们解释一下各个参数的具体意义
    /**
    *   复制数组
    * @param src 源数组
    * @param srcPos 源数组中的起始位置
    * @param dest 目标数组
    * @param destPos 目标数组中的起始位置
    * @param length 要复制的数组元素的数量
    */
    public static native void arraycopy(Object src,  int  srcPos,
                                        Object dest, int destPos,
                                        int length);
```

`Array.copyOf()` 源码：

```Java
    public static int[] copyOf(int[] original, int newLength) {
      // 申请一个新的数组
        int[] copy = new int[newLength];
  // 调用System.arraycopy,将源数组中的数据进行拷贝,并返回新的数组
        System.arraycopy(original, 0, copy, 0,
                         Math.min(original.length, newLength));
        return copy;
    }
```

看两者源代码可以发现 `copyOf()`内部实际调用了 `System.arraycopy()` 方法。

`arraycopy()` 需要目标数组，将原数组拷贝到你自己定义的数组里或者原数组，而且可以选择拷贝的起点和长度以及放入新数组中的位置 `copyOf()` 是系统自动在内部新建一个数组，并返回该数组。

## 方法

  方法必须先创建才可以使用，该过程称为方法定义
  方法创建后并不是直接可以运行的，需要手动使用后，才执行，该过程成为方法调用

### 方法的定义和调用
```java
//无参方定义
  public static void 方法名 ( ) { 
  	//方法体
  }
// 带返回值的方法定义
  public static 返回值类型 方法名 ( 参数 ) { 
  	//方法体
  	return 数据 ;
  }
//不带返回值的方法定义 void表示无返回值
  public static void 方法名 ( 参数 ) { 
  	//方法体
  	return; // 不带返回值的方法一般不写return 但也可以写return 表示方法结束 但是其后不能跟任何返回值
  }
  
```
注意：
1.**方法不能嵌套定义**   方法之间是平级的，不能再方法里定义方法
2.

**实参（实际参数，Arguments）**：用于传递给函数/方法的参数，必须有确定的值。 

**形参（形式参数，Parameters）**：用于定义函数/方法，接收实参，不需要有确定的值

### 方法的重载
方法重载指同一个类中定义的多个方法之间的关系，满足下列条件的多个方法相互构成重载
1.多个方法在**同一个类中**
2.多个方法具有**相同的方法名**
3.多个方法的**参数不相同，类型不同或者数量不同**
注意：重载仅针对**同一个类中方法的名称与参数进行识别，与返回值无关**

```java
package com.scu.demo1;  
  
public class _10_MethodDemo {  
    public static void main(String[] args) {  
        // 方法的调用  
        Sum(10,20);  
        int sum1 = getSum(10,20,30);  
        double sum2 = getSum(5.2,3.8);  
    }  
    // 不带返回值的方法  
    public static void Sum(int num1, int num2){  
        int result = num1 + num2;  
        System.out.println(result);  
        return; // 不带返回值的方法也可以用return 表示方法结束 但是其后不能跟任何返回值  
    }  
    // 带返回值的方法 int---返回值类型  
    public static int getSum(int num1,int num2,int num3){  
        int result = num1 + num2 + num3;  
        return result;  //返回给方法的调用处  
    }  
    // 方法的重载  
    // 同一个类中定义的多个方法之间的关系，满足下列条件的多个方法相互构成重载  
    // 多个方法在同一个类中  
    // 多个方法具有相同的方法名  
    // 多个方法的参数不相同，类型不同或者数量不同  
    public static double getSum(double num1,double num2){  
        double result = num1 + num2 ;  
        return result;  //返回给方法的调用处  
    }  
}
```
### 方法的值传递  ✅

一般有两种传递：

- **值传递**：方法接收的是实参值的拷贝，会创建副本。
- **引用传递**：方法接收的直接是实参所引用的对象在堆中的地址，不会创建副本，对形参的修改将影响到实参。

==**在 Java 中只有值传递**== 

传递基本数据类型时，传递的就是**基本类型的字面量值的拷贝**，会*创建副本*，形参的改变不影响实际参数的值
传递引用数据类型时(如 数组)，传递的就是**实参所引用的对象在堆中地址值的拷贝**，同样*也会创建副本*，形参的改变(只是改变形参本身的值)不会影响实际参数的值。(如果改变的形参指向的对象的值，那还是会改变实际参数的)

为什么？ 可能是因为安全性问题。

### 方法的基本内存原理
[方法的基本内存原理](https://www.bilibili.com/video/BV17F411T7Ao?p=71&vd_source=6ef187124c74c452a2016ded88292617)

## 综合练习1
### 随机验证码
```java
package Practice;  
  
import java.util.Random;  
  
/*   需求：  
       定义方法实现随机产生一个5位的验证码  
       验证码格式：       长度为5  
       前四位是大写字母或者小写字母  
       最后一位是数字  
*/  
//方法：  
//在以后如果我们要在一堆没有什么规律的数据中随机抽取  
//可以先把这些数据放到数组当中  
//再随机抽取一个索引  
public class _04_YanZhengMa {  
    public static void main(String[] args) {  
        char[] arr = new char[52];  
        for (int i = 0; i < arr.length; i++) {  
            if (i < 26) { // 添加小写字母  
                arr[i] = (char) (97 + i); // ASCLL码  
            } else { // 添加大写字母  
                arr[i] = (char) (65 + i - 26);  
            }  
        }  
        for (int i = 0; i < arr.length; i++) {  
            System.out.println(arr[i]);  
        }  
        Random r = new Random();  
        String str = new String();  
        for (int i = 0; i < 4; i++) {  
            int index = r.nextInt(arr.length);  
            str = str + arr[index];  
        }  
        int number = r.nextInt(10);  
        str = str + number;  
        System.out.println(str);  
    }  
}
```
### 评委打分
```java
package Practice;  
  
import java.util.Scanner;  
  
//在唱歌比赛中，有6名评委给选手打分，分数范围是[0 - 100]之间的整数。  
// 选手的最后得分为：去掉最高分、最低分后的4个评委的平均分，请完成上述过程并计算出选手的得分。  
public class _05_PingWeiDaFen {  
    public static void main(String[] args) {  
        int[] arr = getArr();  
        for (int i = 0; i < arr.length; i++) {  
            System.out.print(arr[i] + " ");  // 在一行内打印分数  
        }  
        System.out.println();  
        int avg = getAvg(arr);  
        System.out.println(avg);  
    }  
  
    private static int[] getArr() {  
        int[] arr = new int[6];  
        Scanner sc = new Scanner(System.in);  
        for (int i = 0; i < arr.length; ) {  
            System.out.println("请输入第" + (i + 1) + "个评委的分数：");  
            int score = sc.nextInt();  
            if (score >= 0 && score <= 100) {  
                arr[i] = score;  
                i++; // 只有输入合法分数 i才递增  
            } else {  
                System.out.println("分数应在0~100内!");  
            }  
        }  
        return arr;  
    }  
  
    public static int getMax(int[] arr) {  
        int max = arr[0];  
        for (int i = 0; i < arr.length; i++) {  
            if (arr[i] > max) {  
                max = arr[i];  
            }  
        }  
        return max;  
    }  
  
    public static int getMin(int[] arr) {  
        int min = arr[0];  
        for (int i = 0; i < arr.length; i++) {  
            if (arr[i] < min) {  
                min = arr[i];  
            }  
        }  
        return min;  
    }  
  
    public static int getAvg(int[] arr) {  
        int sum = 0;  
        int max = getMax(arr);  
        System.out.println("最高分："+max);  
        int min = getMin(arr);  
        System.out.println("最低分："+min);  
        for (int i = 0; i < arr.length; i++) {  
            sum = sum + arr[i];  
        }  
        return (sum - max - min) / (arr.length - 2);  
    }  
}
```
### 数字加密
```java
package Practice;  
  
import java.util.Scanner;  
  
/*  
        某系统的数字密码（大于0）。比如1983，采用加密方式进行传输，  
        规则如下：            每位数加上5  
            再对10求余，  
            最后将数字顺序反转，            得到一串新数。  
*/  
public class _06_ShuZiJiaMi {  
    public static void main(String[] args) {  
        Scanner sc = new Scanner(System.in);  
        System.out.println("请输入一个数字进行加密：");  
        int password = sc.nextInt();  
        int temp = password;  
        int count = 0;  // 定义一个临时变量来获取密码的位数  
        while (temp != 0) { // 获取密码的位数  
            temp = temp / 10;  
            count++;  
        }  
        int[] arr = getArr(password, count); // 将密码的每位数存进数组  
        // 打印数组 检查数组是否正确  
        for (int i = 0; i < arr.length; i++) {  
            System.out.println(arr[i]);  
        }  
        // 将每位数加上5再对10求余  
        for (int i = 0; i < arr.length; i++) {  
            arr[i]=arr[i]+5;  
            arr[i]=arr[i]%10;  
        }  
        // 顺序反转  
        arr = reArr(arr);  
        int number = 0;  
        for (int i = 0; i < arr.length; i++) {  
            number = number * 10 + arr[i];  
        }  
        System.out.println(number);  
    }  
  
    public static int[] getArr(int number, int count) {  
        int[] arr = new int[count];  
        for (int i = 0; i < count; i++) {  
            arr[count-1-i] = number % 10; // 注意获取的顺序  
            number = number / 10;  
        }  
        return arr;  
    }  
  
    public static int[] reArr(int[] arr){  
        for (int i = 0, j = arr.length-1; i < j; i++,j--) {  
            int temp = arr[i];  
            arr[i]=arr[j];  
            arr[j]=temp;  
        }  
        return arr;  
        }  
}
```
### 数字解密
```java
package Practice;  
  
import java.util.Scanner;  
  
/*某系统的数字密码（大于0）。比如1983，采用加密方式进行传输，  
规则如下：  
    每位数加上5  
    再对10求余，  
    最后将所有数字反转，    得到一串新数。    按照以上规则进行解密：    比如1983加密之后变成8346，解密之后变成1983  
*/  
public class _07_ShuZiJieMi {  
    public static void main(String[] args) {  
        // 获取加密后的密码数字  
        Scanner sc = new Scanner(System.in);  
        System.out.println("请输入加密后的密码数字：");  
        int code = sc.nextInt();  
        int number = code;  
        int count = 0;  
        // 获取密码数字的位数  
        while (number != 0) {  
            number = number / 10;  
            count++;  
        }  
        // 将密码数字每位数存入数组  
        int[] arr = getArr(code, count);  
        for (int i = 0; i < arr.length; i++) {  
            System.out.print(arr[i] + " ");  
        }  
        System.out.println();  
        // 解密  
        // 反转  
        int[] reArr = reArr(arr);  
        for (int i = 0; i < reArr.length; i++) {  
            System.out.print(reArr[i] + " ");  
        }  
        System.out.println();  
        /*  
         * 分析：最初密码每位+5后，每位数范围只能在5~14，之后对10取余则5~9不变，10~14变为0~4。  
         * 反过来解密时，5~9不变，0~4则+10。  
         * */        for (int i = 0; i < reArr.length; i++) {  
            if (reArr[i] >= 0 && reArr[i] <= 4) {  
                reArr[i] = reArr[i] + 10;  
            }  
            reArr[i] = reArr[i] - 5;  
        }  
        int password = 0;  
        for (int i = 0; i < reArr.length; i++) {  
            password = password * 10 + reArr[i];  
        }  
        System.out.println("解密出来的密码为：" + password);  
    }  
  
    public static int[] getArr(int c1, int n1) {  
        int[] arr = new int[n1];  
        for (int i = 0; i < arr.length; i++) {  
            arr[arr.length - 1 - i] = c1 % 10;  
            c1 = c1 / 10;  
        }  
        return arr;  
    }  
  
    public static int[] reArr(int[] arr) {  
        for (int i = 0, j = arr.length - 1; i < j; i++, j--) {  
            int temp = arr[i];  
            arr[i] = arr[j];  
            arr[j] = temp;  
        }  
        return arr;  
    }  
}
```
### 抽奖
```java
package Practice;  
  
import java.util.Random;  
  
/* 需求：  
 一个大V直播抽奖，奖品是现金红包，分别有{2, 588 , 888, 1000, 10000}五个奖金。  
 请使用代码模拟抽奖，打印出每个奖项，奖项的出现顺序要随机且不重复。 打印效果如下：（随机顺序，不一定是下面的顺序）  
     888元的奖金被抽出  
     588元的奖金被抽出  
     10000元的奖金被抽出  
     1000元的奖金被抽出  
     2元的奖金被抽出  
 */public class _08_ChouJiang {  
    public static void main(String[] args){  
        // 定义奖池数组  
        int[] arr = {2, 588 , 888, 1000, 10000};  
        // 随机打乱奖池数组顺序  
        Random r = new Random();  
        for (int i = 0; i < arr.length; i++) {  
            int randomIndex = r.nextInt(arr.length);  
            int temp = arr[i];  
            arr[i] = arr[randomIndex];  
            arr[randomIndex] = temp;  
        }  
        for (int i = 0; i < arr.length; i++) {  
            System.out.println(arr[i]);  
        }  
    }  
}
```
### 双色球
```java
package Practice;  
  
import java.util.Random;  
import java.util.Scanner;  
  
public class _09_ShuangSeQiu {  
    public static void main(String[] args) {  
        // 随机生成中奖号码  
        int[] arr = createNumber();  
        System.out.println("=======================");  
        for (int i = 0; i < arr.length; i++) {  
            System.out.print(arr[i] + " ");  
        }  
        System.out.println();  
        System.out.println("=======================");  
        // 输入用户购买的彩票号码  
        int[] useInputArr = userInputNumber();  
        for (int i = 0; i < useInputArr.length; i++) {  
            System.out.print(useInputArr[i] + " ");  
        }  
        System.out.println();  
        System.out.println("=======================");  
        // 判断用户中奖情况  
        int redCount = 0;  
        int blueCount = 0;  
        // 判断红球  
        for (int i = 0; i < useInputArr.length-1; i++) {  
            for (int j = 0; j < arr.length; j++) {  
                if (useInputArr[i]==arr[j]){  
                    redCount++;  
                    break;                }  
            }  
        }  
        // 判断蓝球  
        if(useInputArr[useInputArr.length-1]==arr[arr.length-1]){  
            blueCount++;  
        }  
  
        System.out.println(redCount);  
        System.out.println(blueCount);  
  
        //根据红球的个数以及蓝球的个数来判断中奖情况  
        if(redCount == 6 && blueCount == 1){  
            System.out.println("恭喜你，中奖1000万");  
        }else if(redCount == 6 && blueCount == 0){  
            System.out.println("恭喜你，中奖500万");  
        }else if(redCount == 5 && blueCount == 1){  
            System.out.println("恭喜你，中奖3000");  
        }else if((redCount == 5 && blueCount == 0) ||  (redCount == 4 && blueCount == 1)){  
            System.out.println("恭喜你，中奖200");  
        }else if((redCount == 4 && blueCount == 0) ||  (redCount == 3 && blueCount == 1)){  
            System.out.println("恭喜你，中奖10");  
        }else if((redCount == 2 && blueCount == 1) ||  (redCount == 1 && blueCount == 1)|| (redCount == 0 && blueCount == 1)){  
            System.out.println("恭喜你，中奖5");  
        }else{  
            System.out.println("谢谢参与，谢谢惠顾");  
        }  
    }  
  
    public static int[] userInputNumber() {  
        int[] arr = new int[7];  
        // 用户输入红球号码  
        Scanner sc = new Scanner(System.in);  
        for (int i = 0; i < arr.length - 1; ) {  
            System.out.println("请输入第" + (i + 1) + "个红球号码：");  
            int redNumber = sc.nextInt();  
            if (redNumber >= 1 && redNumber <= 33) {  
                boolean flag = contains(arr, redNumber); // 判断红球号码是否重复  
                if (!flag) {  
                    arr[i] = redNumber;  
                    i++;  
                } else {  
                    System.out.println("当前红球号码重复，请重新输入：");  
                }  
            } else {  
                System.out.println("输入的红球号码超出范围，请重新输入：");  
            }  
        }  
        // 用户输入蓝球号码  
        System.out.println("请输入蓝球号码：");  
        while (true) {  
            int blueNumber = sc.nextInt();  
            if (blueNumber >= 1 && blueNumber <= 16) {  
                arr[arr.length - 1] = blueNumber;  
                break;            } else {  
                System.out.println("输入的蓝球号码超出范围，请重新输入：");  
            }  
        }  
        return arr;  
    }  
  
    public static int[] createNumber() {  
        Random r = new Random();  
        int[] arr = new int[7]; // 6个红球 1个蓝球  
        int redNumber = 0;  
        for (int i = 0; i < arr.length - 1; ) {  
            redNumber = r.nextInt(33) + 1;  
            if (!contains(arr, redNumber)) {  // 红球号码不可重复 范围在1~33  
                arr[i] = redNumber;  
                i++;  
            }  
        }  
        int blueNumber = r.nextInt(16) + 1; // 蓝球号码可以重复 范围在1~16  
        arr[arr.length - 1] = blueNumber;  
        return arr;  
    }  
  
    // 判断号码是否重复  
    public static boolean contains(int[] arr, int number) {  
        for (int i = 0; i < arr.length; i++) {  
            if (arr[i] == number) {  
                return true;  
            }  
        }  
        return false;  
    }  
}
```

