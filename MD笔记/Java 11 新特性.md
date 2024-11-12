[toc]

# Java8 新特性实战

> 本文来自[cowbi](https://github.com/cowbi)的投稿~
>
> Oracle 于 2014 发布了 Java8（jdk1.8），诸多原因使它成为目前市场上使用最多的 jdk 版本。虽然发布距今已将近 7 年，但很多程序员对其新特性还是不够了解，尤其是用惯了 Java8 之前版本的老程序员，比如我。
>
> 为了不脱离队伍太远，还是有必要对这些新特性做一些总结梳理。它较 jdk.7 有很多变化或者说是优化，比如 interface 里可以有静态方法，并且可以有方法体，这一点就颠覆了之前的认知；`java.util.HashMap` 数据结构里增加了红黑树；还有众所周知的 Lambda 表达式等等。本文不能把所有的新特性都给大家一一分享，只列出比较常用的新特性给大家做详细讲解。更多相关内容请看[官网关于 Java8 的新特性的介绍](https://www.oracle.com/java/technologies/javase/8-whats-new.html)。

## Interface

interface 的设计初衷是面向抽象，提高扩展性。这也留有一点遗憾，Interface 修改的时候，实现它的类也必须跟着改。

为了解决接口的修改与现有的实现不兼容的问题。新 interface 的方法可以用`default` 或 `static`修饰，这样就可以有方法体，实现类也不必重写此方法。

一个 interface 中可以有多个方法被它们修饰，这 2 个修饰符的区别主要也是普通方法和静态方法的区别。

1. `default`修饰的方法，是普通实例方法，可以用`this`调用，可以被子类继承、重写。
2. `static`修饰的方法，使用上和一般类静态方法一样。但它不能被子类继承，只能用`Interface`调用。

我们来看一个实际的例子。

```java
public interface InterfaceNew {
    static void sm() {
        System.out.println("interface提供的方式实现");
    }
    static void sm2() {
        System.out.println("interface提供的方式实现");
    }

    default void def() {
        System.out.println("interface default方法");
    }
    default void def2() {
        System.out.println("interface default2方法");
    }
    //须要实现类重写
    void f();
}

public interface InterfaceNew1 {
    default void def() {
        System.out.println("InterfaceNew1 default方法");
    }
}
```

如果有一个类既实现了 `InterfaceNew` 接口又实现了 `InterfaceNew1`接口，它们都有`def()`，并且 `InterfaceNew` 接口和 `InterfaceNew1`接口没有继承关系的话，这时就必须重写`def()`。不然的话，编译的时候就会报错。

```java
public class InterfaceNewImpl implements InterfaceNew , InterfaceNew1{
    public static void main(String[] args) {
        InterfaceNewImpl interfaceNew = new InterfaceNewImpl();
        interfaceNew.def();
    }

    @Override
    public void def() {
        InterfaceNew1.super.def();
    }

    @Override
    public void f() {
    }
}
```

**在 Java 8 ，接口和抽象类有什么区别的？**

很多小伙伴认为：“既然 interface 也可以有自己的方法实现，似乎和 abstract class 没多大区别了。”

其实它们还是有区别的

1. interface 和 class 的区别，好像是废话，主要有：
   - 接口多实现，类单继承
   - 接口的方法是 public abstract 修饰，变量是 public static final 修饰。 abstract class 可以用其他修饰符
2. interface 的方法是更像是一个扩展插件。而 abstract class 的方法是要继承的。

开始我们也提到，interface 新增`default`和`static`修饰的方法，为了解决接口的修改与现有的实现不兼容的问题，并不是为了要替代`abstract class`。在使用上，该用 abstract class 的地方还是要用 abstract class，不要因为 interface 的新特性而将之替换。

**记住接口永远和类不一样**

## functional interface 函数式接口

**定义**：也称 SAM 接口，即 Single Abstract Method interfaces，有且只有一个抽象方法，但可以有多个非抽象方法的接口。

在 java 8 中专门有一个包放函数式接口`java.util.function`，该包下的所有接口都有 `@FunctionalInterface` 注解，提供函数式编程。

在其他包中也有函数式接口，其中一些没有`@FunctionalInterface` 注解，但是只要符合函数式接口的定义就是函数式接口，与是否有

`@FunctionalInterface`注解无关，注解只是在编译时起到强制规范定义的作用。其在 Lambda 表达式中有广泛的应用。

## Lambda 表达式

接下来谈众所周知的 Lambda 表达式。它是推动 Java 8 发布的最重要新特性。是继泛型(`Generics`)和注解(`Annotation`)以来最大的变化。

使用 Lambda 表达式可以使代码变的更加简洁紧凑。让 java 也能支持简单的*函数式编程*。

> Lambda 表达式是一个匿名函数，java 8 允许把函数作为参数传递进方法中

### 语法格式

```java
(parameters) -> expression 或
(parameters) ->{ statements; }
```

### Lambda 实战

我们用常用的实例来感受 Lambda 带来的便利

#### 替代匿名内部类

过去给方法传动态参数的唯一方法是使用内部类。比如

**1.`Runnable` 接口**

```java
new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("The runable now is using!");
            }
}).start();
//用lambda
new Thread(() -> System.out.println("It's a lambda function!")).start();
```

**2.`Comparator` 接口**

```java
List<Integer> strings = Arrays.asList(1, 2, 3);

Collections.sort(strings, new Comparator<Integer>() {
@Override
public int compare(Integer o1, Integer o2) {
    return o1 - o2;}
});

//Lambda
Collections.sort(strings, (Integer o1, Integer o2) -> o1 - o2);
//分解开
Comparator<Integer> comparator = (Integer o1, Integer o2) -> o1 - o2;
Collections.sort(strings, comparator);
```

**3.`Listener` 接口**

```java
JButton button = new JButton();
button.addItemListener(new ItemListener() {
@Override
public void itemStateChanged(ItemEvent e) {
   e.getItem();
}
});
//lambda
button.addItemListener(e -> e.getItem());
```

**4.自定义接口**

上面的 3 个例子是我们在开发过程中最常见的，从中也能体会到 Lambda 带来的便捷与清爽。它只保留实际用到的代码，把无用代码全部省略。那它对接口有没有要求呢？我们发现这些匿名内部类只重写了接口的一个方法，当然也只有一个方法须要重写。这就是我们上文提到的**函数式接口**，也就是说只要方法的参数是函数式接口都可以用 Lambda 表达式。

```java
@FunctionalInterface
public interface Comparator<T>{}

@FunctionalInterface
public interface Runnable{}
```

我们自定义一个函数式接口

```java
@FunctionalInterface
public interface LambdaInterface {
 void f();
}
//使用
public class LambdaClass {
    public static void forEg() {
        lambdaInterfaceDemo(()-> System.out.println("自定义函数式接口"));
    }
    //函数式接口参数
    static void lambdaInterfaceDemo(LambdaInterface i){
        i.f();
    }
}
```

#### 集合迭代

```java
void lamndaFor() {
        List<String> strings = Arrays.asList("1", "2", "3");
        //传统foreach
        for (String s : strings) {
            System.out.println(s);
        }
        //Lambda foreach
        strings.forEach((s) -> System.out.println(s));
        //or
        strings.forEach(System.out::println);
     //map
        Map<Integer, String> map = new HashMap<>();
        map.forEach((k,v)->System.out.println(v));
}
```

#### 方法的引用

Java 8 允许使用 `::` 关键字来传递方法或者构造函数引用，无论如何，表达式返回的类型必须是 functional-interface。

```java
public class LambdaClassSuper {
    LambdaInterface sf(){
        return null;
    }
}

public class LambdaClass extends LambdaClassSuper {
    public static LambdaInterface staticF() {
        return null;
    }

    public LambdaInterface f() {
        return null;
    }

    void show() {
        //1.调用静态函数，返回类型必须是functional-interface
        LambdaInterface t = LambdaClass::staticF;

        //2.实例方法调用
        LambdaClass lambdaClass = new LambdaClass();
        LambdaInterface lambdaInterface = lambdaClass::f;

        //3.超类上的方法调用
        LambdaInterface superf = super::sf;

        //4. 构造方法调用
        LambdaInterface tt = LambdaClassSuper::new;
    }
}
```

#### 访问变量

```java
int i = 0;
Collections.sort(strings, (Integer o1, Integer o2) -> o1 - i);
//i =3;
```

lambda 表达式可以引用外边变量，但是该变量默认拥有 final 属性，不能被修改，如果修改，编译时就报错

## Stream

java 新增了 `java.util.stream` 包，它和之前的流大同小异。之前接触最多的是资源流，比如`java.io.FileInputStream`，通过流把文件从一个地方输入到另一个地方，它只是内容搬运工，对文件内容不做任何*CRUD*。

`Stream`依然不存储数据，不同的是它可以检索(Retrieve)和逻辑处理集合数据、包括筛选、排序、统计、计数等。可以想象成是 Sql 语句。

它的源数据可以是 `Collection`、`Array` 等。由于它的方法参数都是函数式接口类型，所以一般和 Lambda 配合使用

### 流类型

1. stream 串行流
2. parallelStream 并行流，可多线程执行

### 常用方法

接下来我们看`java.util.stream.Stream`常用方法

```java
/**
* 返回一个串行流
*/
default Stream<E> stream()

/**
* 返回一个并行流
*/
default Stream<E> parallelStream()

/**
* 返回T的流
*/
public static<T> Stream<T> of(T t)

/**
* 返回其元素是指定值的顺序流。
*/
public static<T> Stream<T> of(T... values) {
    return Arrays.stream(values);
}


/**
* 过滤，返回由与给定predicate匹配的该流的元素组成的流
*/
Stream<T> filter(Predicate<? super T> predicate);

/**
* 此流的所有元素是否与提供的predicate匹配。
*/
boolean allMatch(Predicate<? super T> predicate)

/**
* 此流任意元素是否有与提供的predicate匹配。
*/
boolean anyMatch(Predicate<? super T> predicate);

/**
* 返回一个 Stream的构建器。
*/
public static<T> Builder<T> builder();

/**
* 使用 Collector对此流的元素进行归纳
*/
<R, A> R collect(Collector<? super T, A, R> collector);

/**
 * 返回此流中的元素数。
*/
long count();

/**
* 返回由该流的不同元素（根据 Object.equals(Object) ）组成的流。
*/
Stream<T> distinct();

/**
 * 遍历
*/
void forEach(Consumer<? super T> action);

/**
* 用于获取指定数量的流，截短长度不能超过 maxSize 。
*/
Stream<T> limit(long maxSize);

/**
* 用于映射每个元素到对应的结果
*/
<R> Stream<R> map(Function<? super T, ? extends R> mapper);

/**
* 根据提供的 Comparator进行排序。
*/
Stream<T> sorted(Comparator<? super T> comparator);

/**
* 在丢弃流的第一个 n元素后，返回由该流的 n元素组成的流。
*/
Stream<T> skip(long n);

/**
* 返回一个包含此流的元素的数组。
*/
Object[] toArray();

/**
* 使用提供的 generator函数返回一个包含此流的元素的数组，以分配返回的数组，以及分区执行或调整大小可能需要的任何其他数组。
*/
<A> A[] toArray(IntFunction<A[]> generator);

/**
* 合并流
*/
public static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)
```

### 实战

本文列出 `Stream` 具有代表性的方法之使用，更多的使用方法还是要看 Api。

```java
@Test
public void test() {
  List<String> strings = Arrays.asList("abc", "def", "gkh", "abc");
    //返回符合条件的stream
    Stream<String> stringStream = strings.stream().filter(s -> "abc".equals(s));
    //计算流符合条件的流的数量
    long count = stringStream.count();

    //forEach遍历->打印元素
    strings.stream().forEach(System.out::println);

    //limit 获取到1个元素的stream
    Stream<String> limit = strings.stream().limit(1);
    //toArray 比如我们想看这个limitStream里面是什么，比如转换成String[],比如循环
    String[] array = limit.toArray(String[]::new);

    //map 对每个元素进行操作返回新流
    Stream<String> map = strings.stream().map(s -> s + "22");

    //sorted 排序并打印
    strings.stream().sorted().forEach(System.out::println);

    //Collectors collect 把abc放入容器中
    List<String> collect = strings.stream().filter(string -> "abc".equals(string)).collect(Collectors.toList());
    //把list转为string，各元素用，号隔开
    String mergedString = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.joining(","));

    //对数组的统计，比如用
    List<Integer> number = Arrays.asList(1, 2, 5, 4);

    IntSummaryStatistics statistics = number.stream().mapToInt((x) -> x).summaryStatistics();
    System.out.println("列表中最大的数 : "+statistics.getMax());
    System.out.println("列表中最小的数 : "+statistics.getMin());
    System.out.println("平均数 : "+statistics.getAverage());
    System.out.println("所有数之和 : "+statistics.getSum());

    //concat 合并流
    List<String> strings2 = Arrays.asList("xyz", "jqx");
    Stream.concat(strings2.stream(),strings.stream()).count();

    //注意 一个Stream只能操作一次，不能断开，否则会报错。
    Stream stream = strings.stream();
    //第一次使用
    stream.limit(2);
    //第二次使用
    stream.forEach(System.out::println);
    //报错 java.lang.IllegalStateException: stream has already been operated upon or closed

    //但是可以这样, 连续使用
    stream.limit(2).forEach(System.out::println);
}
```

### 延迟执行

在执行返回 `Stream` 的方法时，并不立刻执行，而是等返回一个非 `Stream` 的方法后才执行。因为拿到 `Stream` 并不能直接用，而是需要处理成一个常规类型。这里的 `Stream` 可以想象成是二进制流（2 个完全不一样的东东），拿到也看不懂。

我们下面分解一下 `filter` 方法。

```java
@Test
public void laziness(){
  List<String> strings = Arrays.asList("abc", "def", "gkh", "abc");
  Stream<Integer> stream = strings.stream().filter(new Predicate() {
      @Override
      public boolean test(Object o) {
        System.out.println("Predicate.test 执行");
        return true;
        }
      });

   System.out.println("count 执行");
   stream.count();
}
/*-------执行结果--------*/
count 执行
Predicate.test 执行
Predicate.test 执行
Predicate.test 执行
Predicate.test 执行
```

按执行顺序应该是先打印 4 次「`Predicate.test` 执行」，再打印「`count` 执行」。实际结果恰恰相反。说明 filter 中的方法并没有立刻执行，而是等调用`count()`方法后才执行。

上面都是串行 `Stream` 的实例。并行 `parallelStream` 在使用方法上和串行一样。主要区别是 `parallelStream` 可多线程执行，是基于 ForkJoin 框架实现的，有时间大家可以了解一下 `ForkJoin` 框架和 `ForkJoinPool`。这里可以简单的理解它是通过线程池来实现的，这样就会涉及到线程安全，线程消耗等问题。下面我们通过代码来体验一下并行流的多线程执行。

```java
@Test
public void parallelStreamTest(){
   List<Integer> numbers = Arrays.asList(1, 2, 5, 4);
   numbers.parallelStream() .forEach(num->System.out.println(Thread.currentThread().getName()+">>"+num));
}
//执行结果
main>>5
ForkJoinPool.commonPool-worker-2>>4
ForkJoinPool.commonPool-worker-11>>1
ForkJoinPool.commonPool-worker-9>>2
```

从结果中我们看到，for-each 用到的是多线程。

### 小结

从源码和实例中我们可以总结出一些 stream 的特点

1. 通过简单的链式编程，使得它可以方便地对遍历处理后的数据进行再处理。
2. 方法参数都是函数式接口类型
3. 一个 Stream 只能操作一次，操作完就关闭了，继续使用这个 stream 会报错。
4. Stream 不保存数据，不改变数据源

## Optional

在[阿里巴巴开发手册关于 Optional 的介绍](https://share.weiyun.com/ThuqEbD5)中这样写到：

> 防止 NPE，是程序员的基本修养，注意 NPE 产生的场景：
>
> 1） 返回类型为基本数据类型，return 包装数据类型的对象时，自动拆箱有可能产生 NPE。
>
> 反例：public int f() { return Integer 对象}， 如果为 null，自动解箱抛 NPE。
>
> 2） 数据库的查询结果可能为 null。
>
> 3） 集合里的元素即使 isNotEmpty，取出的数据元素也可能为 null。
>
> 4） 远程调用返回对象时，一律要求进行空指针判断，防止 NPE。
>
> 5） 对于 Session 中获取的数据，建议进行 NPE 检查，避免空指针。
>
> 6） 级联调用 obj.getA().getB().getC()；一连串调用，易产生 NPE。
>
> 正例：使用 JDK8 的 Optional 类来防止 NPE 问题。

他建议使用 `Optional` 解决 NPE（`java.lang.NullPointerException`）问题，它就是为 NPE 而生的，其中可以包含空值或非空值。下面我们通过源码逐步揭开 `Optional` 的红盖头。

假设有一个 `Zoo` 类，里面有个属性 `Dog`，需求要获取 `Dog` 的 `age`。

```java
class Zoo {
   private Dog dog;
}

class Dog {
   private int age;
}
```

传统解决 NPE 的办法如下：

```java
Zoo zoo = getZoo();
if(zoo != null){
   Dog dog = zoo.getDog();
   if(dog != null){
      int age = dog.getAge();
      System.out.println(age);
   }
}
```

层层判断对象非空，有人说这种方式很丑陋不优雅，我并不这么认为。反而觉得很整洁，易读，易懂。你们觉得呢？

`Optional` 是这样的实现的：

```java
Optional.ofNullable(zoo).map(o -> o.getDog()).map(d -> d.getAge()).ifPresent(age ->
    System.out.println(age)
);
```

是不是简洁了很多呢？

### 如何创建一个 Optional

上例中`Optional.ofNullable`是其中一种创建 Optional 的方式。我们先看一下它的含义和其他创建 Optional 的源码方法。

```java
/**
* Common instance for {@code empty()}. 全局EMPTY对象
*/
private static final Optional<?> EMPTY = new Optional<>();

/**
* Optional维护的值
*/
private final T value;

/**
* 如果value是null就返回EMPTY，否则就返回of(T)
*/
public static <T> Optional<T> ofNullable(T value) {
   return value == null ? empty() : of(value);
}
/**
* 返回 EMPTY 对象
*/
public static<T> Optional<T> empty() {
   Optional<T> t = (Optional<T>) EMPTY;
   return t;
}
/**
* 返回Optional对象
*/
public static <T> Optional<T> of(T value) {
    return new Optional<>(value);
}
/**
* 私有构造方法，给value赋值
*/
private Optional(T value) {
  this.value = Objects.requireNonNull(value);
}
/**
* 所以如果of(T value) 的value是null，会抛出NullPointerException异常，这样貌似就没处理NPE问题
*/
public static <T> T requireNonNull(T obj) {
  if (obj == null)
         throw new NullPointerException();
  return obj;
}
```

`ofNullable` 方法和`of`方法唯一区别就是当 value 为 null 时，`ofNullable` 返回的是`EMPTY`，of 会抛出 `NullPointerException` 异常。如果需要把 `NullPointerException` 暴漏出来就用 `of`，否则就用 `ofNullable`。

**`map()` 和 `flatMap()` 有什么区别的？**

`map` 和 `flatMap` 都是将一个函数应用于集合中的每个元素，但不同的是`map`返回一个新的集合，`flatMap`是将每个元素都映射为一个集合，最后再将这个集合展平。

在实际应用场景中，如果`map`返回的是数组，那么最后得到的是一个二维数组，使用`flatMap`就是为了将这个二维数组展平变成一个一维数组。

```java
public class MapAndFlatMapExample {
    public static void main(String[] args) {
        List<String[]> listOfArrays = Arrays.asList(
                new String[]{"apple", "banana", "cherry"},
                new String[]{"orange", "grape", "pear"},
                new String[]{"kiwi", "melon", "pineapple"}
        );

        List<String[]> mapResult = listOfArrays.stream()
                .map(array -> Arrays.stream(array).map(String::toUpperCase).toArray(String[]::new))
                .collect(Collectors.toList());

        System.out.println("Using map:");
        System.out.println(mapResult);

        List<String> flatMapResult = listOfArrays.stream()
                .flatMap(array -> Arrays.stream(array).map(String::toUpperCase))
                .collect(Collectors.toList());

        System.out.println("Using flatMap:");
        System.out.println(flatMapResult);
    }
}
```

运行结果:

```plain
Using map:
[[APPLE, BANANA, CHERRY], [ORANGE, GRAPE, PEAR], [KIWI, MELON, PINEAPPLE]]

Using flatMap:
[APPLE, BANANA, CHERRY, ORANGE, GRAPE, PEAR, KIWI, MELON, PINEAPPLE]
```

最简单的理解就是`flatMap()`可以将`map()`的结果展开。

在`Optional`里面，当使用`map()`时，如果映射函数返回的是一个普通值，它会将这个值包装在一个新的`Optional`中。而使用`flatMap`时，如果映射函数返回的是一个`Optional`，它会将这个返回的`Optional`展平，不再包装成嵌套的`Optional`。

下面是一个对比的示例代码：

```java
public static void main(String[] args) {
        int userId = 1;

        // 使用flatMap的代码
        String cityUsingFlatMap = getUserById(userId)
                .flatMap(OptionalExample::getAddressByUser)
                .map(Address::getCity)
                .orElse("Unknown");

        System.out.println("User's city using flatMap: " + cityUsingFlatMap);

        // 不使用flatMap的代码
        Optional<Optional<Address>> optionalAddress = getUserById(userId)
                .map(OptionalExample::getAddressByUser);

        String cityWithoutFlatMap;
        if (optionalAddress.isPresent()) {
            Optional<Address> addressOptional = optionalAddress.get();
            if (addressOptional.isPresent()) {
                Address address = addressOptional.get();
                cityWithoutFlatMap = address.getCity();
            } else {
                cityWithoutFlatMap = "Unknown";
            }
        } else {
            cityWithoutFlatMap = "Unknown";
        }

        System.out.println("User's city without flatMap: " + cityWithoutFlatMap);
    }
```

在`Stream`和`Optional`中正确使用`flatMap`可以减少很多不必要的代码。

### 判断 value 是否为 null

```java
/**
* value是否为null
*/
public boolean isPresent() {
    return value != null;
}
/**
* 如果value不为null执行consumer.accept
*/
public void ifPresent(Consumer<? super T> consumer) {
   if (value != null)
    consumer.accept(value);
}
```

### 获取 value

```java
/**
* Return the value if present, otherwise invoke {@code other} and return
* the result of that invocation.
* 如果value != null 返回value，否则返回other的执行结果
*/
public T orElseGet(Supplier<? extends T> other) {
    return value != null ? value : other.get();
}

/**
* 如果value != null 返回value，否则返回T
*/
public T orElse(T other) {
    return value != null ? value : other;
}

/**
* 如果value != null 返回value，否则抛出参数返回的异常
*/
public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X {
        if (value != null) {
            return value;
        } else {
            throw exceptionSupplier.get();
        }
}
/**
* value为null抛出NoSuchElementException，不为空返回value。
*/
public T get() {
  if (value == null) {
      throw new NoSuchElementException("No value present");
  }
  return value;
}
```

### 过滤值

```java
/**
* 1. 如果是empty返回empty
* 2. predicate.test(value)==true 返回this，否则返回empty
*/
public Optional<T> filter(Predicate<? super T> predicate) {
        Objects.requireNonNull(predicate);
        if (!isPresent())
            return this;
        else
            return predicate.test(value) ? this : empty();
}
```

### 小结

看完 `Optional` 源码，`Optional` 的方法真的非常简单，值得注意的是如果坚决不想看见 `NPE`，就不要用 `of()`、 `get()`、`flatMap(..)`。最后再综合用一下 `Optional` 的高频方法。

```java
Optional.ofNullable(zoo).map(o -> o.getDog()).map(d -> d.getAge()).filter(v->v==1).orElse(3);
```

## Date-Time API

这是对`java.util.Date`强有力的补充，解决了 Date 类的大部分痛点：

1. 非线程安全
2. 时区处理麻烦
3. 各种格式化、和时间计算繁琐
4. 设计有缺陷，Date 类同时包含日期和时间；还有一个 java.sql.Date，容易混淆。

我们从常用的时间实例来对比 java.util.Date 和新 Date 有什么区别。用`java.util.Date`的代码该改改了。

### java.time 主要类

`java.util.Date` 既包含日期又包含时间，而 `java.time` 把它们进行了分离

```java
LocalDateTime.class //日期+时间 format: yyyy-MM-ddTHH:mm:ss.SSS
LocalDate.class //日期 format: yyyy-MM-dd
LocalTime.class //时间 format: HH:mm:ss
```

### 格式化

**Java 8 之前:**

```java
public void oldFormat(){
    Date now = new Date();
    //format yyyy-MM-dd
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String date  = sdf.format(now);
    System.out.println(String.format("date format : %s", date));

    //format HH:mm:ss
    SimpleDateFormat sdft = new SimpleDateFormat("HH:mm:ss");
    String time = sdft.format(now);
    System.out.println(String.format("time format : %s", time));

    //format yyyy-MM-dd HH:mm:ss
    SimpleDateFormat sdfdt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String datetime = sdfdt.format(now);
    System.out.println(String.format("dateTime format : %s", datetime));
}
```

**Java 8 之后:**

```java
public void newFormat(){
    //format yyyy-MM-dd
    LocalDate date = LocalDate.now();
    System.out.println(String.format("date format : %s", date));

    //format HH:mm:ss
    LocalTime time = LocalTime.now().withNano(0);
    System.out.println(String.format("time format : %s", time));

    //format yyyy-MM-dd HH:mm:ss
    LocalDateTime dateTime = LocalDateTime.now();
    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String dateTimeStr = dateTime.format(dateTimeFormatter);
    System.out.println(String.format("dateTime format : %s", dateTimeStr));
}
```

### 字符串转日期格式

**Java 8 之前:**

```java
//已弃用
Date date = new Date("2021-01-26");
//替换为
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
Date date1 = sdf.parse("2021-01-26");
```

**Java 8 之后:**

```java
LocalDate date = LocalDate.of(2021, 1, 26);
LocalDate.parse("2021-01-26");

LocalDateTime dateTime = LocalDateTime.of(2021, 1, 26, 12, 12, 22);
LocalDateTime.parse("2021-01-26 12:12:22");

LocalTime time = LocalTime.of(12, 12, 22);
LocalTime.parse("12:12:22");
```

**Java 8 之前** 转换都需要借助 `SimpleDateFormat` 类，而**Java 8 之后**只需要 `LocalDate`、`LocalTime`、`LocalDateTime`的 `of` 或 `parse` 方法。

### 日期计算

下面仅以**一周后日期**为例，其他单位（年、月、日、1/2 日、时等等）大同小异。另外，这些单位都在 *java.time.temporal.ChronoUnit* 枚举中定义

**Java 8 之前:**

```java
public void afterDay(){
     //一周后的日期
     SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
     Calendar ca = Calendar.getInstance();
     ca.add(Calendar.DATE, 7);
     Date d = ca.getTime();
     String after = formatDate.format(d);
     System.out.println("一周后日期：" + after);

   //算两个日期间隔多少天，计算间隔多少年，多少月方法类似
     String dates1 = "2021-12-23";
   String dates2 = "2021-02-26";
     SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
     Date date1 = format.parse(dates1);
     Date date2 = format.parse(dates2);
     int day = (int) ((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
     System.out.println(dates1 + "和" + dates2 + "相差" + day + "天");
     //结果：2021-02-26和2021-12-23相差300天
}
```

**Java 8 之后:**

```java
public void pushWeek(){
     //一周后的日期
     LocalDate localDate = LocalDate.now();
     //方法1
     LocalDate after = localDate.plus(1, ChronoUnit.WEEKS);
     //方法2
     LocalDate after2 = localDate.plusWeeks(1);
     System.out.println("一周后日期：" + after);

     //算两个日期间隔多少天，计算间隔多少年，多少月
     LocalDate date1 = LocalDate.parse("2021-02-26");
     LocalDate date2 = LocalDate.parse("2021-12-23");
     Period period = Period.between(date1, date2);
     System.out.println("date1 到 date2 相隔："
                + period.getYears() + "年"
                + period.getMonths() + "月"
                + period.getDays() + "天");
   //打印结果是 “date1 到 date2 相隔：0年9月27天”
     //这里period.getDays()得到的天是抛去年月以外的天数，并不是总天数
     //如果要获取纯粹的总天数应该用下面的方法
     long day = date2.toEpochDay() - date1.toEpochDay();
     System.out.println(date1 + "和" + date2 + "相差" + day + "天");
     //打印结果：2021-02-26和2021-12-23相差300天
}
```

### 获取指定日期

除了日期计算繁琐，获取特定一个日期也很麻烦，比如获取本月最后一天，第一天。

**Java 8 之前:**

```java
public void getDay() {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        //获取当前月第一天：
        Calendar c = Calendar.getInstance();
        c.set(Calendar.DAY_OF_MONTH, 1);
        String first = format.format(c.getTime());
        System.out.println("first day:" + first);

        //获取当前月最后一天
        Calendar ca = Calendar.getInstance();
        ca.set(Calendar.DAY_OF_MONTH, ca.getActualMaximum(Calendar.DAY_OF_MONTH));
        String last = format.format(ca.getTime());
        System.out.println("last day:" + last);

        //当年最后一天
        Calendar currCal = Calendar.getInstance();
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, currCal.get(Calendar.YEAR));
        calendar.roll(Calendar.DAY_OF_YEAR, -1);
        Date time = calendar.getTime();
        System.out.println("last day:" + format.format(time));
}
```

**Java 8 之后:**

```java
public void getDayNew() {
    LocalDate today = LocalDate.now();
    //获取当前月第一天：
    LocalDate firstDayOfThisMonth = today.with(TemporalAdjusters.firstDayOfMonth());
    // 取本月最后一天
    LocalDate lastDayOfThisMonth = today.with(TemporalAdjusters.lastDayOfMonth());
    //取下一天：
    LocalDate nextDay = lastDayOfThisMonth.plusDays(1);
    //当年最后一天
    LocalDate lastday = today.with(TemporalAdjusters.lastDayOfYear());
    //2021年最后一个周日，如果用Calendar是不得烦死。
    LocalDate lastMondayOf2021 = LocalDate.parse("2021-12-31").with(TemporalAdjusters.lastInMonth(DayOfWeek.SUNDAY));
}
```

`java.time.temporal.TemporalAdjusters` 里面还有很多便捷的算法，这里就不带大家看 Api 了，都很简单，看了秒懂

### JDBC 和 java8

现在 jdbc 时间类型和 java8 时间类型对应关系是

1. `Date` ---> `LocalDate`
2. `Time` ---> `LocalTime`
3. `Timestamp` ---> `LocalDateTime`

而之前统统对应 `Date`，也只有 `Date`。

### 时区

> 时区：正式的时区划分为每隔经度 15° 划分一个时区，全球共 24 个时区，每个时区相差 1 小时。但为了行政上的方便，常将 1 个国家或 1 个省份划在一起，比如我国幅员宽广，大概横跨 5 个时区，实际上只用东八时区的标准时即北京时间为准。

`java.util.Date` 对象实质上存的是 1970 年 1 月 1 日 0 点（ GMT）至 Date 对象所表示时刻所经过的毫秒数。也就是说不管在哪个时区 new Date，它记录的毫秒数都一样，和时区无关。但在使用上应该把它转换成当地时间，这就涉及到了时间的国际化。`java.util.Date` 本身并不支持国际化，需要借助 `TimeZone`。

```java
//北京时间：Wed Jan 27 14:05:29 CST 2021
Date date = new Date();

SimpleDateFormat bjSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//北京时区
bjSdf.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
System.out.println("毫秒数:" + date.getTime() + ", 北京时间:" + bjSdf.format(date));

//东京时区
SimpleDateFormat tokyoSdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
tokyoSdf.setTimeZone(TimeZone.getTimeZone("Asia/Tokyo"));  // 设置东京时区
System.out.println("毫秒数:" + date.getTime() + ", 东京时间:" + tokyoSdf.format(date));

//如果直接print会自动转成当前时区的时间
System.out.println(date);
//Wed Jan 27 14:05:29 CST 2021
```

在新特性中引入了 `java.time.ZonedDateTime` 来表示带时区的时间。它可以看成是 `LocalDateTime + ZoneId`。

```java
//当前时区时间
ZonedDateTime zonedDateTime = ZonedDateTime.now();
System.out.println("当前时区时间: " + zonedDateTime);

//东京时间
ZoneId zoneId = ZoneId.of(ZoneId.SHORT_IDS.get("JST"));
ZonedDateTime tokyoTime = zonedDateTime.withZoneSameInstant(zoneId);
System.out.println("东京时间: " + tokyoTime);

// ZonedDateTime 转 LocalDateTime
LocalDateTime localDateTime = tokyoTime.toLocalDateTime();
System.out.println("东京时间转当地时间: " + localDateTime);

//LocalDateTime 转 ZonedDateTime
ZonedDateTime localZoned = localDateTime.atZone(ZoneId.systemDefault());
System.out.println("本地时区时间: " + localZoned);

//打印结果
当前时区时间: 2021-01-27T14:43:58.735+08:00[Asia/Shanghai]
东京时间: 2021-01-27T15:43:58.735+09:00[Asia/Tokyo]
东京时间转当地时间: 2021-01-27T15:43:58.735
当地时区时间: 2021-01-27T15:53:35.618+08:00[Asia/Shanghai]
```

### 小结

通过上面比较新老 `Date` 的不同，当然只列出部分功能上的区别，更多功能还得自己去挖掘。总之 date-time-api 给日期操作带来了福利。在日常工作中遇到 date 类型的操作，第一考虑的是 date-time-api，实在解决不了再考虑老的 Date。

## 总结

我们梳理总结的 java 8 新特性有

- Interface & functional Interface
- Lambda
- Stream
- Optional
- Date time-api

这些都是开发当中比较常用的特性。梳理下来发现它们真香，而我却没有更早的应用。总觉得学习 java 8 新特性比较麻烦，一直使用老的实现方式。其实这些新特性几天就可以掌握，一但掌握，效率会有很大的提高。其实我们涨工资也是涨的学习的钱，不学习终究会被淘汰，35 岁危机会提前来临。

# 《Java8 指南》中文翻译

随着 Java 8 的普及度越来越高，很多人都提到面试中关于 Java 8 也是非常常问的知识点。应各位要求和需要，我打算对这部分知识做一个总结。本来准备自己总结的，后面看到 GitHub 上有一个相关的仓库，地址：
[https://github.com/winterbe/java8-tutorial](https://github.com/winterbe/java8-tutorial)。这个仓库是英文的，我对其进行了翻译并添加和修改了部分内容，下面是正文。

------

欢迎阅读我对 Java 8 的介绍。本教程将逐步指导您完成所有新语言功能。 在简短的代码示例的基础上，您将学习如何使用默认接口方法，lambda 表达式，方法引用和可重复注释。 在本文的最后，您将熟悉最新的 API 更改，如流，函数式接口(Functional Interfaces)，Map 类的扩展和新的 Date API。 没有大段枯燥的文字，只有一堆注释的代码片段。

## 接口的默认方法(Default Methods for Interfaces)

Java 8 使我们能够通过使用 `default` 关键字向接口添加非抽象方法实现。 此功能也称为[虚拟扩展方法](http://stackoverflow.com/a/24102730)。

第一个例子：

```java
interface Formula{

    double calculate(int a);

    default double sqrt(int a) {
        return Math.sqrt(a);
    }

}
```

Formula 接口中除了抽象方法计算接口公式还定义了默认方法 `sqrt`。 实现该接口的类只需要实现抽象方法 `calculate`。 默认方法`sqrt` 可以直接使用。当然你也可以直接通过接口创建对象，然后实现接口中的默认方法就可以了，我们通过代码演示一下这种方式。

```java
public class Main {

  public static void main(String[] args) {
    // 通过匿名内部类方式访问接口
    Formula formula = new Formula() {
        @Override
        public double calculate(int a) {
            return sqrt(a * 100);
        }
    };

    System.out.println(formula.calculate(100));     // 100.0
    System.out.println(formula.sqrt(16));           // 4.0

  }

}
```

formula 是作为匿名对象实现的。该代码非常容易理解，6 行代码实现了计算 `sqrt(a * 100)`。在下一节中，我们将会看到在 Java 8 中实现单个方法对象有一种更好更方便的方法。

**译者注：** 不管是抽象类还是接口，都可以通过匿名内部类的方式访问。不能通过抽象类或者接口直接创建对象。对于上面通过匿名内部类方式访问接口，我们可以这样理解：一个内部类实现了接口里的抽象方法并且返回一个内部类对象，之后我们让接口的引用来指向这个对象

## Lambda 表达式(Lambda expressions)

首先看看在老版本的 Java 中是如何排列字符串的：

```java
List<String> names = Arrays.asList("peter", "anna", "mike", "xenia");

Collections.sort(names, new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return b.compareTo(a);
    }
});
```

只需要给静态方法`Collections.sort` 传入一个 List 对象以及一个比较器来按指定顺序排列。通常做法都是创建一个匿名的比较器对象然后将其传递给 `sort` 方法。

在 Java 8 中你就没必要使用这种传统的匿名对象的方式了，Java 8 提供了更简洁的语法，lambda 表达式：

```java
Collections.sort(names, (String a, String b) -> {
    return b.compareTo(a);
});
```

可以看出，代码变得更短且更具有可读性，但是实际上还可以写得更短：

```java
Collections.sort(names, (String a, String b) -> b.compareTo(a));
```

对于函数体只有一行代码的，你可以去掉大括号{}以及 return 关键字，但是你还可以写得更短点：

```java
names.sort((a, b) -> b.compareTo(a));
```

List 类本身就有一个 `sort` 方法。并且 Java 编译器可以自动推导出参数类型，所以你可以不用再写一次类型。接下来我们看看 lambda 表达式还有什么其他用法。

## 函数式接口(Functional Interfaces)

**译者注：** 原文对这部分解释不太清楚，故做了修改！

Java 语言设计者们投入了大量精力来思考如何使现有的函数友好地支持 Lambda。最终采取的方法是：增加函数式接口的概念。**“函数式接口”是指仅仅只包含一个抽象方法,但是可以有多个非抽象方法(也就是上面提到的默认方法)的接口。** 像这样的接口，可以被隐式转换为 lambda 表达式。`java.lang.Runnable` 与 `java.util.concurrent.Callable` 是函数式接口最典型的两个例子。Java 8 增加了一种特殊的注解`@FunctionalInterface`,但是这个注解通常不是必须的(某些情况建议使用)，只要接口只包含一个抽象方法，虚拟机会自动判断该接口为函数式接口。一般建议在接口上使用`@FunctionalInterface` 注解进行声明，这样的话，编译器如果发现你标注了这个注解的接口有多于一个抽象方法的时候会报错的，如下图所示

![](images\@FunctionalInterface (1).png)

示例：

```java
@FunctionalInterface
public interface Converter<F, T> {
  T convert(F from);
}
```

```java
    // TODO 将数字字符串转换为整数类型
    Converter<String, Integer> converter = (from) -> Integer.valueOf(from);
    Integer converted = converter.convert("123");
    System.out.println(converted.getClass()); //class java.lang.Integer
```

**译者注：** 大部分函数式接口都不用我们自己写，Java8 都给我们实现好了，这些接口都在 java.util.function 包里。

## 方法和构造函数引用(Method and Constructor References)

前一节中的代码还可以通过静态方法引用来表示：

```java
    Converter<String, Integer> converter = Integer::valueOf;
    Integer converted = converter.convert("123");
    System.out.println(converted.getClass());   //class java.lang.Integer
```

Java 8 允许您通过`::`关键字传递方法或构造函数的引用。 上面的示例显示了如何引用静态方法。 但我们也可以引用对象方法：

```java
class Something {
    String startsWith(String s) {
        return String.valueOf(s.charAt(0));
    }
}
```

```java
Something something = new Something();
Converter<String, String> converter = something::startsWith;
String converted = converter.convert("Java");
System.out.println(converted);    // "J"
```

接下来看看构造函数是如何使用`::`关键字来引用的，首先我们定义一个包含多个构造函数的简单类：

```java
class Person {
    String firstName;
    String lastName;

    Person() {}

    Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```

接下来我们指定一个用来创建 Person 对象的对象工厂接口：

```java
interface PersonFactory<P extends Person> {
    P create(String firstName, String lastName);
}
```

我们只需要使用 `Person::new` 来获取 Person 类构造函数的引用，Java 编译器会自动根据`PersonFactory.create`方法的参数类型来选择合适的构造函数。

## Lambda 表达式作用域(Lambda Scopes)

### 访问局部变量

我们可以直接在 lambda 表达式中访问外部的局部变量：

```java
final int num = 1;
Converter<Integer, String> stringConverter =
        (from) -> String.valueOf(from + num);

stringConverter.convert(2);     // 3
```

但是和匿名对象不同的是，这里的变量 num 可以不用声明为 final，该代码同样正确：

```java
int num = 1;
Converter<Integer, String> stringConverter =
        (from) -> String.valueOf(from + num);

stringConverter.convert(2);     // 3
```

不过这里的 num 必须不可被后面的代码修改（即隐性的具有 final 的语义），例如下面的就无法编译：

```java
int num = 1;
Converter<Integer, String> stringConverter =
        (from) -> String.valueOf(from + num);
num = 3;//在lambda表达式中试图修改num同样是不允许的。
```

### 访问字段和静态变量

与局部变量相比，我们在 lambda 表达式中对实例字段和静态变量都有读写访问权限。 该行为和匿名对象是一致的。

```java
class Lambda4 {
    static int outerStaticNum;
    int outerNum;

    void testScopes() {
        Converter<Integer, String> stringConverter1 = (from) -> {
            outerNum = 23;
            return String.valueOf(from);
        };

        Converter<Integer, String> stringConverter2 = (from) -> {
            outerStaticNum = 72;
            return String.valueOf(from);
        };
    }
}
```

### 访问默认接口方法

还记得第一节中的 formula 示例吗？ `Formula` 接口定义了一个默认方法`sqrt`，可以从包含匿名对象的每个 formula 实例访问该方法。 这不适用于 lambda 表达式。

无法从 lambda 表达式中访问默认方法,故以下代码无法编译：

```java
Formula formula = (a) -> sqrt(a * 100);
```

## 内置函数式接口(Built-in Functional Interfaces)

JDK 1.8 API 包含许多内置函数式接口。 其中一些接口在老版本的 Java 中是比较常见的比如：`Comparator` 或`Runnable`，这些接口都增加了`@FunctionalInterface`注解以便能用在 lambda 表达式上。

但是 Java 8 API 同样还提供了很多全新的函数式接口来让你的编程工作更加方便，有一些接口是来自 [Google Guava](https://code.google.com/p/guava-libraries/) 库里的，即便你对这些很熟悉了，还是有必要看看这些是如何扩展到 lambda 上使用的。

### Predicate

Predicate 接口是只有一个参数的返回布尔类型值的 **断言型** 接口。该接口包含多种默认方法来将 Predicate 组合成其他复杂的逻辑（比如：与，或，非）：

**译者注：** Predicate 接口源码如下

```java
package java.util.function;
import java.util.Objects;

@FunctionalInterface
public interface Predicate<T> {

    // 该方法是接受一个传入类型,返回一个布尔值.此方法应用于判断.
    boolean test(T t);

    //and方法与关系型运算符"&&"相似，两边都成立才返回true
    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }
    // 与关系运算符"!"相似，对判断进行取反
    default Predicate<T> negate() {
        return (t) -> !test(t);
    }
    //or方法与关系型运算符"||"相似，两边只要有一个成立就返回true
    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }
   // 该方法接收一个Object对象,返回一个Predicate类型.此方法用于判断第一个test的方法与第二个test方法相同(equal).
    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
```

示例：

```java
Predicate<String> predicate = (s) -> s.length() > 0;

predicate.test("foo");              // true
predicate.negate().test("foo");     // false

Predicate<Boolean> nonNull = Objects::nonNull;
Predicate<Boolean> isNull = Objects::isNull;

Predicate<String> isEmpty = String::isEmpty;
Predicate<String> isNotEmpty = isEmpty.negate();
```

### Function

Function 接口接受一个参数并生成结果。默认方法可用于将多个函数链接在一起（compose, andThen）：

**译者注：** Function 接口源码如下

```java

package java.util.function;

import java.util.Objects;

@FunctionalInterface
public interface Function<T, R> {

    //将Function对象应用到输入的参数上，然后返回计算结果。
    R apply(T t);
    //将两个Function整合，并返回一个能够执行两个Function对象功能的Function对象。
    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }
    //
    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

```java
Function<String, Integer> toInteger = Integer::valueOf;
Function<String, String> backToString = toInteger.andThen(String::valueOf);
backToString.apply("123");     // "123"
```

### Supplier

Supplier 接口产生给定泛型类型的结果。 与 Function 接口不同，Supplier 接口不接受参数。

```java
Supplier<Person> personSupplier = Person::new;
personSupplier.get();   // new Person
```

### Consumer

Consumer 接口表示要对单个输入参数执行的操作。

```java
Consumer<Person> greeter = (p) -> System.out.println("Hello, " + p.firstName);
greeter.accept(new Person("Luke", "Skywalker"));
```

### Comparator

Comparator 是老 Java 中的经典接口， Java 8 在此之上添加了多种默认方法：

```java
Comparator<Person> comparator = (p1, p2) -> p1.firstName.compareTo(p2.firstName);

Person p1 = new Person("John", "Doe");
Person p2 = new Person("Alice", "Wonderland");

comparator.compare(p1, p2);             // > 0
comparator.reversed().compare(p1, p2);  // < 0
```

## Optional

Optional 不是函数式接口，而是用于防止 NullPointerException 的漂亮工具。这是下一节的一个重要概念，让我们快速了解一下 Optional 的工作原理。

Optional 是一个简单的容器，其值可能是 null 或者不是 null。在 Java 8 之前一般某个函数应该返回非空对象但是有时却什么也没有返回，而在 Java 8 中，你应该返回 Optional 而不是 null。

译者注：示例中每个方法的作用已经添加。

```java
//of()：为非null的值创建一个Optional
Optional<String> optional = Optional.of("bam");
// isPresent()：如果值存在返回true，否则返回false
optional.isPresent();           // true
//get()：如果Optional有值则将其返回，否则抛出NoSuchElementException
optional.get();                 // "bam"
//orElse()：如果有值则将其返回，否则返回指定的其它值
optional.orElse("fallback");    // "bam"
//ifPresent()：如果Optional实例有值则为其调用consumer，否则不做处理
optional.ifPresent((s) -> System.out.println(s.charAt(0)));     // "b"
```

推荐阅读：[[Java8\]如何正确使用 Optional](https://blog.kaaass.net/archives/764)

## Streams(流)

`java.util.Stream` 表示能应用在一组元素上一次执行的操作序列。Stream 操作分为中间操作或者最终操作两种，最终操作返回一特定类型的计算结果，而中间操作返回 Stream 本身，这样你就可以将多个操作依次串起来。Stream 的创建需要指定一个数据源，比如`java.util.Collection` 的子类，List 或者 Set， Map 不支持。Stream 的操作可以串行执行或者并行执行。

首先看看 Stream 是怎么用，首先创建实例代码需要用到的数据 List：

```java
List<String> stringList = new ArrayList<>();
stringList.add("ddd2");
stringList.add("aaa2");
stringList.add("bbb1");
stringList.add("aaa1");
stringList.add("bbb3");
stringList.add("ccc");
stringList.add("bbb2");
stringList.add("ddd1");
```

Java 8 扩展了集合类，可以通过 Collection.stream() 或者 Collection.parallelStream() 来创建一个 Stream。下面几节将详细解释常用的 Stream 操作：

### Filter(过滤)

过滤通过一个 predicate 接口来过滤并只保留符合条件的元素，该操作属于**中间操作**，所以我们可以在过滤后的结果来应用其他 Stream 操作（比如 forEach）。forEach 需要一个函数来对过滤后的元素依次执行。forEach 是一个最终操作，所以我们不能在 forEach 之后来执行其他 Stream 操作。

```java
        // 测试 Filter(过滤)
        stringList
                .stream()
                .filter((s) -> s.startsWith("a"))
                .forEach(System.out::println);//aaa2 aaa1
```

forEach 是为 Lambda 而设计的，保持了最紧凑的风格。而且 Lambda 表达式本身是可以重用的，非常方便

### Sorted(排序)

排序是一个 **中间操作**，返回的是排序好后的 Stream。**如果你不指定一个自定义的 Comparator 则会使用默认排序。**

```java
        // 测试 Sort (排序)
        stringList
                .stream()
                .sorted()
                .filter((s) -> s.startsWith("a"))
                .forEach(System.out::println);// aaa1 aaa2
```

需要注意的是，排序只创建了一个排列好后的 Stream，而不会影响原有的数据源，排序之后原数据 stringList 是不会被修改的：

```java
    System.out.println(stringList);// ddd2, aaa2, bbb1, aaa1, bbb3, ccc, bbb2, ddd1
```

### Map(映射)

中间操作 map 会将元素根据指定的 Function 接口来依次将元素转成另外的对象。

下面的示例展示了将字符串转换为大写字符串。你也可以通过 map 来将对象转换成其他类型，map 返回的 Stream 类型是根据你 map 传递进去的函数的返回值决定的。

```java
        // 测试 Map 操作
        stringList
                .stream()
                .map(String::toUpperCase)
                .sorted((a, b) -> b.compareTo(a))
                .forEach(System.out::println);// "DDD2", "DDD1", "CCC", "BBB3", "BBB2", "BBB1", "AAA2", "AAA1"
```

### Match(匹配)

Stream 提供了多种匹配操作，允许检测指定的 Predicate 是否匹配整个 Stream。所有的匹配操作都是 **最终操作** ，并返回一个 boolean 类型的值。

```java
        // 测试 Match (匹配)操作
        boolean anyStartsWithA =
                stringList
                        .stream()
                        .anyMatch((s) -> s.startsWith("a"));
        System.out.println(anyStartsWithA);      // true

        boolean allStartsWithA =
                stringList
                        .stream()
                        .allMatch((s) -> s.startsWith("a"));

        System.out.println(allStartsWithA);      // false

        boolean noneStartsWithZ =
                stringList
                        .stream()
                        .noneMatch((s) -> s.startsWith("z"));

        System.out.println(noneStartsWithZ);      // true
```

### Count(计数)

计数是一个 **最终操作**，返回 Stream 中元素的个数，**返回值类型是 long**。

```java
      //测试 Count (计数)操作
        long startsWithB =
                stringList
                        .stream()
                        .filter((s) -> s.startsWith("b"))
                        .count();
        System.out.println(startsWithB);    // 3
```

### Reduce(规约)

这是一个 **最终操作** ，允许通过指定的函数来将 stream 中的多个元素规约为一个元素，规约后的结果是通过 Optional 接口表示的：

```java
        //测试 Reduce (规约)操作
        Optional<String> reduced =
                stringList
                        .stream()
                        .sorted()
                        .reduce((s1, s2) -> s1 + "#" + s2);

        reduced.ifPresent(System.out::println);//aaa1#aaa2#bbb1#bbb2#bbb3#ccc#ddd1#ddd2
```

**译者注：** 这个方法的主要作用是把 Stream 元素组合起来。它提供一个起始值（种子），然后依照运算规则（BinaryOperator），和前面 Stream 的第一个、第二个、第 n 个元素组合。从这个意义上说，字符串拼接、数值的 sum、min、max、average 都是特殊的 reduce。例如 Stream 的 sum 就相当于`Integer sum = integers.reduce(0, (a, b) -> a+b);`也有没有起始值的情况，这时会把 Stream 的前面两个元素组合起来，返回的是 Optional。

```java
// 字符串连接，concat = "ABCD"
String concat = Stream.of("A", "B", "C", "D").reduce("", String::concat);
// 求最小值，minValue = -3.0
double minValue = Stream.of(-1.5, 1.0, -3.0, -2.0).reduce(Double.MAX_VALUE, Double::min);
// 求和，sumValue = 10, 有起始值
int sumValue = Stream.of(1, 2, 3, 4).reduce(0, Integer::sum);
// 求和，sumValue = 10, 无起始值
sumValue = Stream.of(1, 2, 3, 4).reduce(Integer::sum).get();
// 过滤，字符串连接，concat = "ace"
concat = Stream.of("a", "B", "c", "D", "e", "F").
 filter(x -> x.compareTo("Z") > 0).
 reduce("", String::concat);
```

上面代码例如第一个示例的 reduce()，第一个参数（空白字符）即为起始值，第二个参数（String::concat）为 BinaryOperator。这类有起始值的 reduce() 都返回具体的对象。而对于第四个示例没有起始值的 reduce()，由于可能没有足够的元素，返回的是 Optional，请留意这个区别。更多内容查看：[IBM：Java 8 中的 Streams API 详解](https://www.ibm.com/developerworks/cn/java/j-lo-java8streamapi/index.html)

## Parallel Streams(并行流)

前面提到过 Stream 有串行和并行两种，串行 Stream 上的操作是在一个线程中依次完成，而并行 Stream 则是在多个线程上同时执行。

下面的例子展示了是如何通过并行 Stream 来提升性能：

首先我们创建一个没有重复元素的大表：

```java
int max = 1000000;
List<String> values = new ArrayList<>(max);
for (int i = 0; i < max; i++) {
    UUID uuid = UUID.randomUUID();
    values.add(uuid.toString());
}
```

我们分别用串行和并行两种方式对其进行排序，最后看看所用时间的对比。

### Sequential Sort(串行排序)

```java
//串行排序
long t0 = System.nanoTime();
long count = values.stream().sorted().count();
System.out.println(count);

long t1 = System.nanoTime();

long millis = TimeUnit.NANOSECONDS.toMillis(t1 - t0);
System.out.println(String.format("sequential sort took: %d ms", millis));
```

```plain
1000000
sequential sort took: 709 ms//串行排序所用的时间
```

### Parallel Sort(并行排序)

```java
//并行排序
long t0 = System.nanoTime();

long count = values.parallelStream().sorted().count();
System.out.println(count);

long t1 = System.nanoTime();

long millis = TimeUnit.NANOSECONDS.toMillis(t1 - t0);
System.out.println(String.format("parallel sort took: %d ms", millis));
```

```java
1000000
parallel sort took: 475 ms//串行排序所用的时间
```

上面两个代码几乎是一样的，但是并行版的快了 50% 左右，唯一需要做的改动就是将 `stream()` 改为`parallelStream()`。

## Maps

前面提到过，Map 类型不支持 streams，不过 Map 提供了一些新的有用的方法来处理一些日常任务。Map 接口本身没有可用的 `stream()`方法，但是你可以在键，值上创建专门的流或者通过 `map.keySet().stream()`,`map.values().stream()`和`map.entrySet().stream()`。

此外,Maps 支持各种新的和有用的方法来执行常见任务。

```java
Map<Integer, String> map = new HashMap<>();

for (int i = 0; i < 10; i++) {
    map.putIfAbsent(i, "val" + i);
}

map.forEach((id, val) -> System.out.println(val));//val0 val1 val2 val3 val4 val5 val6 val7 val8 val9
```

`putIfAbsent` 阻止我们在 null 检查时写入额外的代码;`forEach`接受一个 consumer 来对 map 中的每个元素操作。

此示例显示如何使用函数在 map 上计算代码：

```java
map.computeIfPresent(3, (num, val) -> val + num);
map.get(3);             // val33

map.computeIfPresent(9, (num, val) -> null);
map.containsKey(9);     // false

map.computeIfAbsent(23, num -> "val" + num);
map.containsKey(23);    // true

map.computeIfAbsent(3, num -> "bam");
map.get(3);             // val33
```

接下来展示如何在 Map 里删除一个键值全都匹配的项：

```java
map.remove(3, "val3");
map.get(3);             // val33
map.remove(3, "val33");
map.get(3);             // null
```

另外一个有用的方法：

```java
map.getOrDefault(42, "not found");  // not found
```

对 Map 的元素做合并也变得很容易了：

```java
map.merge(9, "val9", (value, newValue) -> value.concat(newValue));
map.get(9);             // val9
map.merge(9, "concat", (value, newValue) -> value.concat(newValue));
map.get(9);             // val9concat
```

Merge 做的事情是如果键名不存在则插入，否则对原键对应的值做合并操作并重新插入到 map 中。

## Date API(日期相关 API)

Java 8 在 `java.time` 包下包含一个全新的日期和时间 API。新的 Date API 与 Joda-Time 库相似，但它们不一样。以下示例涵盖了此新 API 的最重要部分。译者对这部分内容参考相关书籍做了大部分修改。

**译者注(总结)：**

- Clock 类提供了访问当前日期和时间的方法，Clock 是时区敏感的，可以用来取代 `System.currentTimeMillis()` 来获取当前的微秒数。某一个特定的时间点也可以使用 `Instant` 类来表示，`Instant` 类也可以用来创建旧版本的`java.util.Date` 对象。
- 在新 API 中时区使用 ZoneId 来表示。时区可以很方便的使用静态方法 of 来获取到。 抽象类`ZoneId`（在`java.time`包中）表示一个区域标识符。 它有一个名为`getAvailableZoneIds`的静态方法，它返回所有区域标识符。
- jdk1.8 中新增了 LocalDate 与 LocalDateTime 等类来解决日期处理方法，同时引入了一个新的类 DateTimeFormatter 来解决日期格式化问题。可以使用 Instant 代替 Date，LocalDateTime 代替 Calendar，DateTimeFormatter 代替 SimpleDateFormat。

### Clock

Clock 类提供了访问当前日期和时间的方法，Clock 是时区敏感的，可以用来取代 `System.currentTimeMillis()` 来获取当前的微秒数。某一个特定的时间点也可以使用 `Instant` 类来表示，`Instant` 类也可以用来创建旧版本的`java.util.Date` 对象。

```java
Clock clock = Clock.systemDefaultZone();
long millis = clock.millis();
System.out.println(millis);//1552379579043
Instant instant = clock.instant();
System.out.println(instant);
Date legacyDate = Date.from(instant); //2019-03-12T08:46:42.588Z
System.out.println(legacyDate);//Tue Mar 12 16:32:59 CST 2019
```

### Timezones(时区)

在新 API 中时区使用 ZoneId 来表示。时区可以很方便的使用静态方法 of 来获取到。 抽象类`ZoneId`（在`java.time`包中）表示一个区域标识符。 它有一个名为`getAvailableZoneIds`的静态方法，它返回所有区域标识符。

```java
//输出所有区域标识符
System.out.println(ZoneId.getAvailableZoneIds());

ZoneId zone1 = ZoneId.of("Europe/Berlin");
ZoneId zone2 = ZoneId.of("Brazil/East");
System.out.println(zone1.getRules());// ZoneRules[currentStandardOffset=+01:00]
System.out.println(zone2.getRules());// ZoneRules[currentStandardOffset=-03:00]
```

### LocalTime(本地时间)

LocalTime 定义了一个没有时区信息的时间，例如 晚上 10 点或者 17:30:15。下面的例子使用前面代码创建的时区创建了两个本地时间。之后比较时间并以小时和分钟为单位计算两个时间的时间差：

```java
LocalTime now1 = LocalTime.now(zone1);
LocalTime now2 = LocalTime.now(zone2);
System.out.println(now1.isBefore(now2));  // false

long hoursBetween = ChronoUnit.HOURS.between(now1, now2);
long minutesBetween = ChronoUnit.MINUTES.between(now1, now2);

System.out.println(hoursBetween);       // -3
System.out.println(minutesBetween);     // -239
```

LocalTime 提供了多种工厂方法来简化对象的创建，包括解析时间字符串.

```java
LocalTime late = LocalTime.of(23, 59, 59);
System.out.println(late);       // 23:59:59
DateTimeFormatter germanFormatter =
    DateTimeFormatter
        .ofLocalizedTime(FormatStyle.SHORT)
        .withLocale(Locale.GERMAN);

LocalTime leetTime = LocalTime.parse("13:37", germanFormatter);
System.out.println(leetTime);   // 13:37
```

### LocalDate(本地日期)

LocalDate 表示了一个确切的日期，比如 2014-03-11。该对象值是不可变的，用起来和 LocalTime 基本一致。下面的例子展示了如何给 Date 对象加减天/月/年。另外要注意的是这些对象是不可变的，操作返回的总是一个新实例。

```java
LocalDate today = LocalDate.now();//获取现在的日期
System.out.println("今天的日期: "+today);//2019-03-12
LocalDate tomorrow = today.plus(1, ChronoUnit.DAYS);
System.out.println("明天的日期: "+tomorrow);//2019-03-13
LocalDate yesterday = tomorrow.minusDays(2);
System.out.println("昨天的日期: "+yesterday);//2019-03-11
LocalDate independenceDay = LocalDate.of(2019, Month.MARCH, 12);
DayOfWeek dayOfWeek = independenceDay.getDayOfWeek();
System.out.println("今天是周几:"+dayOfWeek);//TUESDAY
```

从字符串解析一个 LocalDate 类型和解析 LocalTime 一样简单,下面是使用 `DateTimeFormatter` 解析字符串的例子：

```java
    String str1 = "2014==04==12 01时06分09秒";
        // 根据需要解析的日期、时间字符串定义解析所用的格式器
        DateTimeFormatter fomatter1 = DateTimeFormatter
                .ofPattern("yyyy==MM==dd HH时mm分ss秒");

        LocalDateTime dt1 = LocalDateTime.parse(str1, fomatter1);
        System.out.println(dt1); // 输出 2014-04-12T01:06:09

        String str2 = "2014$$$四月$$$13 20小时";
        DateTimeFormatter fomatter2 = DateTimeFormatter
                .ofPattern("yyy$$$MMM$$$dd HH小时");
        LocalDateTime dt2 = LocalDateTime.parse(str2, fomatter2);
        System.out.println(dt2); // 输出 2014-04-13T20:00
```

再来看一个使用 `DateTimeFormatter` 格式化日期的示例

```java
LocalDateTime rightNow=LocalDateTime.now();
String date=DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(rightNow);
System.out.println(date);//2019-03-12T16:26:48.29
DateTimeFormatter formatter=DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss");
System.out.println(formatter.format(rightNow));//2019-03-12 16:26:48
```

**🐛 修正（参见：[issue#1157](https://github.com/Snailclimb/JavaGuide/issues/1157)）**：使用 `YYYY` 显示年份时，会显示当前时间所在周的年份，在跨年周会有问题。一般情况下都使用 `yyyy`，来显示准确的年份。

跨年导致日期显示错误示例：

```java
LocalDateTime rightNow = LocalDateTime.of(2020, 12, 31, 12, 0, 0);
String date= DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(rightNow);
// 2020-12-31T12:00:00
System.out.println(date);
DateTimeFormatter formatterOfYYYY = DateTimeFormatter.ofPattern("YYYY-MM-dd HH:mm:ss");
// 2021-12-31 12:00:00
System.out.println(formatterOfYYYY.format(rightNow));

DateTimeFormatter formatterOfYyyy = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
// 2020-12-31 12:00:00
System.out.println(formatterOfYyyy.format(rightNow));
```

从下图可以更清晰的看到具体的错误，并且 IDEA 已经智能地提示更倾向于使用 `yyyy` 而不是 `YYYY` 。

<img src="images\2021042717491413.png" style="zoom:50%;" />

### LocalDateTime(本地日期时间)

LocalDateTime 同时表示了时间和日期，相当于前两节内容合并到一个对象上了。LocalDateTime 和 LocalTime 还有 LocalDate 一样，都是不可变的。LocalDateTime 提供了一些能访问具体字段的方法。

```java
LocalDateTime sylvester = LocalDateTime.of(2014, Month.DECEMBER, 31, 23, 59, 59);

DayOfWeek dayOfWeek = sylvester.getDayOfWeek();
System.out.println(dayOfWeek);      // WEDNESDAY

Month month = sylvester.getMonth();
System.out.println(month);          // DECEMBER

long minuteOfDay = sylvester.getLong(ChronoField.MINUTE_OF_DAY);
System.out.println(minuteOfDay);    // 1439
```

只要附加上时区信息，就可以将其转换为一个时间点 Instant 对象，Instant 时间点对象可以很容易的转换为老式的`java.util.Date`。

```java
Instant instant = sylvester
        .atZone(ZoneId.systemDefault())
        .toInstant();

Date legacyDate = Date.from(instant);
System.out.println(legacyDate);     // Wed Dec 31 23:59:59 CET 2014
```

格式化 LocalDateTime 和格式化时间和日期一样的，除了使用预定义好的格式外，我们也可以自己定义格式：

```java
DateTimeFormatter formatter =
    DateTimeFormatter
        .ofPattern("MMM dd, yyyy - HH:mm");
LocalDateTime parsed = LocalDateTime.parse("Nov 03, 2014 - 07:13", formatter);
String string = formatter.format(parsed);
System.out.println(string);     // Nov 03, 2014 - 07:13
```

和 java.text.NumberFormat 不一样的是新版的 DateTimeFormatter 是不可变的，所以它是线程安全的。
 关于时间日期格式的详细信息在[这里](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)。

## Annotations(注解)

在 Java 8 中支持多重注解了，先看个例子来理解一下是什么意思。
 首先定义一个包装类 Hints 注解用来放置一组具体的 Hint 注解：

```java
@Retention(RetentionPolicy.RUNTIME)
@interface Hints {
    Hint[] value();
}
@Repeatable(Hints.class)
@interface Hint {
    String value();
}
```

Java 8 允许我们把同一个类型的注解使用多次，只需要给该注解标注一下`@Repeatable`即可。

例 1: 使用包装类当容器来存多个注解（老方法）

```java
@Hints({@Hint("hint1"), @Hint("hint2")})
class Person {}
```

例 2：使用多重注解（新方法）

```java
@Hint("hint1")
@Hint("hint2")
class Person {}
```

第二个例子里 java 编译器会隐性的帮你定义好@Hints 注解，了解这一点有助于你用反射来获取这些信息：

```java
Hint hint = Person.class.getAnnotation(Hint.class);
System.out.println(hint);                   // null
Hints hints1 = Person.class.getAnnotation(Hints.class);
System.out.println(hints1.value().length);  // 2

Hint[] hints2 = Person.class.getAnnotationsByType(Hint.class);
System.out.println(hints2.length);          // 2
```

即便我们没有在 `Person`类上定义 `@Hints`注解，我们还是可以通过 `getAnnotation(Hints.class)`来获取 `@Hints`注解，更加方便的方法是使用 `getAnnotationsByType` 可以直接获取到所有的`@Hint`注解。
 另外 Java 8 的注解还增加到两种新的 target 上了：

```java
@Target({ElementType.TYPE_PARAMETER, ElementType.TYPE_USE})
@interface MyAnnotation {}
```

## Where to go from here?

关于 Java 8 的新特性就写到这了，肯定还有更多的特性等待发掘。JDK 1.8 里还有很多很有用的东西，比如`Arrays.parallelSort`, `StampedLock`和`CompletableFuture`等等。

# Java 9 新特性概览

**Java 9** 发布于 2017 年 9 月 21 日 。作为 Java 8 之后 3 年半才发布的新版本，Java 9 带来了很多重大的变化其中最重要的改动是 Java 平台模块系统的引入，其他还有诸如集合、`Stream` 流……。

你可以在 [Archived OpenJDK General-Availability Releases](http://jdk.java.net/archive/) 上下载自己需要的 JDK 版本！官方的新特性说明文档地址：[https://openjdk.java.net/projects/jdk/](https://openjdk.java.net/projects/jdk/) 。

**概览（精选了一部分）**：

- [JEP 222: Java 命令行工具](https://openjdk.java.net/jeps/222)
- [JEP 261: 模块化系统](https://openjdk.java.net/jeps/261)
- [JEP 248：G1 成为默认垃圾回收器](https://openjdk.java.net/jeps/248)
- [JEP 193: 变量句柄](https://openjdk.java.net/jeps/193)
- [JEP 254：字符串存储结构优化](https://openjdk.java.net/jeps/254)

## JShell

JShell 是 Java 9 新增的一个实用工具。为 Java 提供了类似于 Python 的实时命令行交互工具。

在 JShell 中可以直接输入表达式并查看其执行结果。

![](images\image-20210816083417616.png)

**JShell 为我们带来了哪些好处呢？**

1. 降低了输出第一行 Java 版"Hello World！"的门槛，能够提高新手的学习热情。
2. 在处理简单的小逻辑，验证简单的小问题时，比 IDE 更有效率（并不是为了取代 IDE，对于复杂逻辑的验证，IDE 更合适，两者互补）。
3. ……

**JShell 的代码和普通的可编译代码，有什么不一样？**

1. 一旦语句输入完成，JShell 立即就能返回执行的结果，而不再需要编辑器、编译器、解释器。
2. JShell 支持变量的重复声明，后面声明的会覆盖前面声明的。
3. JShell 支持独立的表达式比如普通的加法运算 `1 + 1`。
4. ……

## 模块化系统

模块系统是[Jigsaw Project](https://openjdk.java.net/projects/jigsaw/)的一部分，把模块化开发实践引入到了 Java 平台中，可以让我们的代码可重用性更好！

**什么是模块系统？** 官方的定义是：

> A uniquely named, reusable group of related packages, as well as resources (such as images and XML files) and a module descriptor。

简单来说，你可以将一个模块看作是一组唯一命名、可重用的包、资源和模块描述文件（`module-info.java`）。

任意一个 jar 文件，只要加上一个模块描述文件（`module-info.java`），就可以升级为一个模块。

![](images\module-structure.png)

在引入了模块系统之后，JDK 被重新组织成 94 个模块。Java 应用可以通过新增的 **[jlink](http://openjdk.java.net/jeps/282) 工具** (Jlink 是随 Java 9 一起发布的新命令行工具。它允许开发人员为基于模块的 Java 应用程序创建自己的轻量级、定制的 JRE)，创建出只包含所依赖的 JDK 模块的自定义运行时镜像。这样可以极大的减少 Java 运行时环境的大小。

我们可以通过 `exports` 关键词精准控制哪些类可以对外开放使用，哪些类只能内部使用。

```java
module my.module {
    //exports 公开指定包的所有公共成员
    exports com.my.package.name;
}

module my.module {
     //exports…to 限制访问的成员范围
    export com.my.package.name to com.specific.package;
}
```

想要深入了解 Java 9 的模块化，可以参考下面这几篇文章：

- [《Project Jigsaw: Module System Quick-Start Guide》](https://openjdk.java.net/projects/jigsaw/quick-start)
- [《Java 9 Modules: part 1》](https://stacktraceguru.com/java9/module-introduction)
- [Java 9 揭秘（2. 模块化系统）](http://www.cnblogs.com/IcanFixIt/p/6947763.html)

## G1 成为默认垃圾回收器

在 Java 8 的时候，默认垃圾回收器是 Parallel Scavenge（新生代）+Parallel Old（老年代）。到了 Java 9, CMS 垃圾回收器被废弃了，**G1（Garbage-First Garbage Collector）** 成为了默认垃圾回收器。

G1 还是在 Java 7 中被引入的，经过两个版本优异的表现成为成为默认垃圾回收器。

## 快速创建不可变集合

增加了`List.of()`、`Set.of()`、`Map.of()` 和 `Map.ofEntries()`等工厂方法来创建不可变集合（有点参考 Guava 的味道）：

```java
List.of("Java", "C++");
Set.of("Java", "C++");
Map.of("Java", 1, "C++", 2);
```

使用 `of()` 创建的集合为不可变集合，不能进行添加、删除、替换、 排序等操作，不然会报 `java.lang.UnsupportedOperationException` 异常。

## String 存储结构优化

Java 8 及之前的版本，`String` 一直是用 `char[]` 存储。在 Java 9 之后，`String` 的实现改用 `byte[]` 数组存储字符串，节省了空间。

```java
public final class String implements java.io.Serializable,Comparable<String>, CharSequence {
    // @Stable 注解表示变量最多被修改一次，称为“稳定的”。
    @Stable
    private final byte[] value;
}
```

## 接口私有方法

Java 9 允许在接口中使用私有方法。这样的话，接口的使用就更加灵活了，有点像是一个简化版的抽象类。

```java
public interface MyInterface {
    private void methodPrivate(){
    }
}
```

## try-with-resources 增强

在 Java 9 之前，我们只能在 `try-with-resources` 块中声明变量：

```java
try (Scanner scanner = new Scanner(new File("testRead.txt"));
    PrintWriter writer = new PrintWriter(new File("testWrite.txt"))) {
    // omitted
}
```

在 Java 9 之后，在 `try-with-resources` 语句中可以使用 effectively-final 变量。

```java
final Scanner scanner = new Scanner(new File("testRead.txt"));
PrintWriter writer = new PrintWriter(new File("testWrite.txt"))
try (scanner;writer) {
    // omitted
}
```

**什么是 effectively-final 变量？** 简单来说就是没有被 `final` 修饰但是值在初始化后从未更改的变量。

正如上面的代码所演示的那样，即使 `writer` 变量没有被显示声明为 `final`，但它在第一次被赋值后就不会改变了，因此，它就是 effectively-final 变量。

## Stream & Optional 增强

`Stream` 中增加了新的方法 `ofNullable()`、`dropWhile()`、`takeWhile()` 以及 `iterate()` 方法的重载方法。

Java 9 中的 `ofNullable()` 方 法允许我们创建一个单元素的 `Stream`，可以包含一个非空元素，也可以创建一个空 `Stream`。 而在 Java 8 中则不可以创建空的 `Stream` 。

```java
Stream<String> stringStream = Stream.ofNullable("Java");
System.out.println(stringStream.count());// 1
Stream<String> nullStream = Stream.ofNullable(null);
System.out.println(nullStream.count());//0
```

`takeWhile()` 方法可以从 `Stream` 中依次获取满足条件的元素，直到不满足条件为止结束获取。

```java
List<Integer> integerList = List.of(11, 33, 66, 8, 9, 13);
integerList.stream().takeWhile(x -> x < 50).forEach(System.out::println);// 11 33
```

`dropWhile()` 方法的效果和 `takeWhile()` 相反。

```java
List<Integer> integerList2 = List.of(11, 33, 66, 8, 9, 13);
integerList2.stream().dropWhile(x -> x < 50).forEach(System.out::println);// 66 8 9 13
```

`iterate()` 方法的新重载方法提供了一个 `Predicate` 参数 (判断条件)来决定什么时候结束迭代

```java
public static<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f) {
}
// 新增加的重载方法
public static<T> Stream<T> iterate(T seed, Predicate<? super T> hasNext, UnaryOperator<T> next) {

}
```

两者的使用对比如下，新的 `iterate()` 重载方法更加灵活一些。

```java
// 使用原始 iterate() 方法输出数字 1~10
Stream.iterate(1, i -> i + 1).limit(10).forEach(System.out::println);
// 使用新的 iterate() 重载方法输出数字 1~10
Stream.iterate(1, i -> i <= 10, i -> i + 1).forEach(System.out::println);
```

`Optional` 类中新增了 `ifPresentOrElse()`、`or()` 和 `stream()` 等方法

`ifPresentOrElse()` 方法接受两个参数 `Consumer` 和 `Runnable` ，如果 `Optional` 不为空调用 `Consumer` 参数，为空则调用 `Runnable` 参数。

```java
public void ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction)

Optional<Object> objectOptional = Optional.empty();
objectOptional.ifPresentOrElse(System.out::println, () -> System.out.println("Empty!!!"));// Empty!!!
```

`or()` 方法接受一个 `Supplier` 参数 ，如果 `Optional` 为空则返回 `Supplier` 参数指定的 `Optional` 值。

```java
public Optional<T> or(Supplier<? extends Optional<? extends T>> supplier)

Optional<Object> objectOptional = Optional.empty();
objectOptional.or(() -> Optional.of("java")).ifPresent(System.out::println);//java
```

## 进程 API

Java 9 增加了 `java.lang.ProcessHandle` 接口来实现对原生进程进行管理，尤其适合于管理长时间运行的进程。

```java
// 获取当前正在运行的 JVM 的进程
ProcessHandle currentProcess = ProcessHandle.current();
// 输出进程的 id
System.out.println(currentProcess.pid());
// 输出进程的信息
System.out.println(currentProcess.info());
```

`ProcessHandle` 接口概览：

![](images\image-20210816104614414.png)

## 响应式流 （ Reactive Streams ）

在 Java 9 中的 `java.util.concurrent.Flow` 类中新增了反应式流规范的核心接口 。

`Flow` 中包含了 `Flow.Publisher`、`Flow.Subscriber`、`Flow.Subscription` 和 `Flow.Processor` 等 4 个核心接口。Java 9 还提供了`SubmissionPublisher` 作为`Flow.Publisher` 的一个实现。

关于 Java 9 响应式流更详细的解读，推荐你看 [Java 9 揭秘（17. Reactive Streams ）- 林本托](https://www.cnblogs.com/IcanFixIt/p/7245377.html) 这篇文章。

## 变量句柄

变量句柄是一个变量或一组变量的引用，包括静态域，非静态域，数组元素和堆外数据结构中的组成部分等。

变量句柄的含义类似于已有的方法句柄 `MethodHandle` ，由 Java 类 `java.lang.invoke.VarHandle` 来表示，可以使用类 `java.lang.invoke.MethodHandles.Lookup` 中的静态工厂方法来创建 `VarHandle` 对象。

`VarHandle` 的出现替代了 `java.util.concurrent.atomic` 和 `sun.misc.Unsafe` 的部分操作。并且提供了一系列标准的内存屏障操作，用于更加细粒度的控制内存排序。在安全性、可用性、性能上都要优于现有的 API。

## 其它

- **平台日志 API 改进**：Java 9 允许为 JDK 和应用配置同样的日志实现。新增了 `System.LoggerFinder` 用来管理 JDK 使 用的日志记录器实现。JVM 在运行时只有一个系统范围的 `LoggerFinder` 实例。我们可以通过添加自己的 `System.LoggerFinder` 实现来让 JDK 和应用使用 SLF4J 等其他日志记录框架。
- **`CompletableFuture`类增强**：新增了几个新的方法（`completeAsync` ，`orTimeout` 等）。
- **Nashorn 引擎的增强**：Nashorn 是从 Java8 开始引入的 JavaScript 引擎，Java9 对 Nashorn 做了些增强，实现了一些 ES6 的新特性（Java 11 中已经被弃用）。
- **I/O 流的新特性**：增加了新的方法来读取和复制 `InputStream` 中包含的数据。
- **改进应用的安全性能**：Java 9 新增了 4 个 SHA- 3 哈希算法，SHA3-224、SHA3-256、SHA3-384 和 SHA3-512。
- **改进方法句柄（Method Handle）**：方法句柄从 Java7 开始引入，Java9 在类`java.lang.invoke.MethodHandles` 中新增了更多的静态方法来创建不同类型的方法句柄。
- ……

## 参考

Java version history：[https://en.wikipedia.org/wiki/Java_version_history](https://en.wikipedia.org/wiki/Java_version_history)

Release Notes for JDK 9 and JDK 9 Update Releases : [https://www.oracle.com/java/technologies/javase/9-all-relnotes.html](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html)

《深入剖析 Java 新特性》-极客时间 - JShell：怎么快速验证简单的小问题？

New Features in Java 9: [https://www.baeldung.com/new-java-9](https://www.baeldung.com/new-java-9)

Java – Try with Resources：https://www.baeldung.com/java-try-with-resources

# Java 10 新特性概览

**Java 10** 发布于 2018 年 3 月 20 日，最知名的特性应该是 `var` 关键字（局部变量类型推断）的引入了，其他还有垃圾收集器改善、GC 改进、性能提升、线程管控等一批新特性。

**概览（精选了一部分）**：

- [JEP 286：局部变量类型推断](https://openjdk.java.net/jeps/286)
- [JEP 304：垃圾回收器接口](https://openjdk.java.net/jeps/304)
- [JEP 307：G1 并行 Full GC](https://openjdk.java.net/jeps/307)
- [JEP 310：应用程序类数据共享(扩展 CDS 功能)](https://openjdk.java.net/jeps/310)
- [JEP 317：实验性的基于 Java 的 JIT 编译器](https://openjdk.java.net/jeps/317)

## 局部变量类型推断(var)

由于太多 Java 开发者希望 Java 中引入局部变量推断，于是 Java 10 的时候它来了，也算是众望所归了！

Java 10 提供了 `var` 关键字声明局部变量。

```java
var id = 0;
var codefx = new URL("https://mp.weixin.qq.com/");
var list = new ArrayList<>();
var list = List.of(1, 2, 3);
var map = new HashMap<String, String>();
var p = Paths.of("src/test/java/Java9FeaturesTest.java");
var numbers = List.of("a", "b", "c");
for (var n : list)
    System.out.print(n+ " ");
```

var 关键字只能用于带有构造器的局部变量和 for 循环中。

```java
var count=null; //❌编译不通过，不能声明为 null
var r = () -> Math.random();//❌编译不通过,不能声明为 Lambda表达式
var array = {1,2,3};//❌编译不通过,不能声明数组
```

var 并不会改变 Java 是一门静态类型语言的事实，编译器负责推断出类型。

另外，Scala 和 Kotlin 中已经有了 `val` 关键字 ( `final var` 组合关键字)。

相关阅读：[《Java 10 新特性之局部变量类型推断》](https://zhuanlan.zhihu.com/p/34911982)。

## 垃圾回收器接口

在早期的 JDK 结构中，组成垃圾收集器 (GC) 实现的组件分散在代码库的各个部分。 Java 10 通过引入一套纯净的垃圾收集器接口来将不同垃圾收集器的源代码分隔开。

## G1 并行 Full GC

从 Java9 开始 G1 就了默认的垃圾回收器，G1 是以一种低延时的垃圾回收器来设计的，旨在避免进行 Full GC,但是 Java9 的 G1 的 FullGC 依然是使用单线程去完成标记清除算法,这可能会导致垃圾回收期在无法回收内存的时候触发 Full GC。

为了最大限度地减少 Full GC 造成的应用停顿的影响，从 Java10 开始，G1 的 FullGC 改为并行的标记清除算法，同时会使用与年轻代回收和混合回收相同的并行工作线程数量，从而减少了 Full GC 的发生，以带来更好的性能提升、更大的吞吐量。

## 集合增强

`List`，`Set`，`Map` 提供了静态方法`copyOf()`返回入参集合的一个不可变拷贝。

```java
static <E> List<E> copyOf(Collection<? extends E> coll) {
    return ImmutableCollections.listCopy(coll);
}
```

使用 `copyOf()` 创建的集合为不可变集合，不能进行添加、删除、替换、 排序等操作，不然会报 `java.lang.UnsupportedOperationException` 异常。 IDEA 也会有相应的提示。

![](images\image-20210816154125579.png)

并且，`java.util.stream.Collectors` 中新增了静态方法，用于将流中的元素收集为不可变的集合。

```java
var list = new ArrayList<>();
list.stream().collect(Collectors.toUnmodifiableList());
list.stream().collect(Collectors.toUnmodifiableSet());
```

## Optional 增强

`Optional` 新增了`orElseThrow()`方法来在没有值时抛出指定的异常。

```java
Optional.ofNullable(cache.getIfPresent(key))
        .orElseThrow(() -> new PrestoException(NOT_FOUND, "Missing entry found for key: " + key));
```

## 应用程序类数据共享(扩展 CDS 功能)

在 Java 5 中就已经引入了类数据共享机制 (Class Data Sharing，简称 CDS)，允许将一组类预处理为共享归档文件，以便在运行时能够进行内存映射以减少 Java 程序的启动时间，当多个 Java 虚拟机（JVM）共享相同的归档文件时，还可以减少动态内存的占用量，同时减少多个虚拟机在同一个物理或虚拟的机器上运行时的资源占用。CDS 在当时还是 Oracle JDK 的商业特性。

Java 10 在现有的 CDS 功能基础上再次拓展，以允许应用类放置在共享存档中。CDS 特性在原来的 bootstrap 类基础之上，扩展加入了应用类的 CDS 为 (Application Class-Data Sharing，AppCDS) 支持，大大加大了 CDS 的适用范围。其原理为：在启动时记录加载类的过程，写入到文本文件中，再次启动时直接读取此启动文本并加载。设想如果应用环境没有大的变化，启动速度就会得到提升。

## 实验性的基于 Java 的 JIT 编译器

Graal 是一个基于 Java 语言编写的 JIT 编译器，是 JDK 9 中引入的实验性 Ahead-of-Time (AOT) 编译器的基础。

Oracle 的 HotSpot VM 便附带两个用 C++ 实现的 JIT compiler：C1 及 C2。在 Java 10 (Linux/x64, macOS/x64) 中，默认情况下 HotSpot 仍使用 C2，但通过向 java 命令添加 `-XX:+UnlockExperimentalVMOptions -XX:+UseJVMCICompiler` 参数便可将 C2 替换成 Graal。

相关阅读：[深入浅出 Java 10 的实验性 JIT 编译器 Graal - 郑雨迪](https://www.infoq.cn/article/java-10-jit-compiler-graal)

## 其他

- **线程-局部管控**：Java 10 中线程管控引入 JVM 安全点的概念，将允许在不运行全局 JVM 安全点的情况下实现线程回调，由线程本身或者 JVM 线程来执行，同时保持线程处于阻塞状态，这种方式使得停止单个线程变成可能，而不是只能启用或停止所有线程
- **备用存储装置上的堆分配**：Java 10 中将使得 JVM 能够使用适用于不同类型的存储机制的堆，在可选内存设备上进行堆内存分配
- ……

## 参考

Java 10 Features and Enhancements : [https://howtodoinjava.com/java10/java10-features/](https://howtodoinjava.com/java10/java10-features/)

Guide to Java10 : [https://www.baeldung.com/java-10-overview](https://www.baeldung.com/java-10-overview)

4 Class Data Sharing : https://docs.oracle.com/javase/10/vm/class-data-sharing.htm#JSJVM-GUID-7EAA3411-8CF0-4D19-BD05-DF5E1780AA91

# Java 11 新特性概览

**Java 11** 于 2018 年 9 月 25 日正式发布，这是很重要的一个版本！Java 11 和 2017 年 9 月份发布的 Java 9 以及 2018 年 3 月份发布的 Java 10 相比，其最大的区别就是：在长期支持(Long-Term-Support)方面，**Oracle 表示会对 Java 11 提供大力支持，这一支持将会持续至 2026 年 9 月。这是据 Java 8 以后支持的首个长期版本**

下面这张图是 Oracle 官方给出的 Oracle JDK 支持的时间线。

<img src="images\4c1611fad59449edbbd6e233690e9fa7.png" style="zoom:80%;" />

**概览（精选了一部分）**：

- [JEP 321：HTTP Client 标准化](https://openjdk.java.net/jeps/321)
- [JEP 333：ZGC(可伸缩低延迟垃圾收集器)](https://openjdk.java.net/jeps/333)
- [JEP 323：Lambda 参数的局部变量语法](https://openjdk.java.net/jeps/323)
- [JEP 330：启动单文件源代码程序](https://openjdk.java.net/jeps/330)

## HTTP Client 标准化

Java 11 对 Java 9 中引入并在 Java 10 中进行了更新的 Http Client API 进行了标准化，在前两个版本中进行孵化的同时，Http Client 几乎被完全重写，并且现在完全支持异步非阻塞。

并且，Java 11 中，Http Client 的包名由 `jdk.incubator.http` 改为`java.net.http`，该 API 通过 `CompleteableFuture` 提供非阻塞请求和响应语义。使用起来也很简单，如下：

```java
var request = HttpRequest.newBuilder()
    .uri(URI.create("https://javastack.cn"))
    .GET()
    .build();
var client = HttpClient.newHttpClient();

// 同步
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());

// 异步
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println);
```

## String 增强

Java 11 增加了一系列的字符串处理方法：

```java
//判断字符串是否为空
" ".isBlank();//true
//去除字符串首尾空格
" Java ".strip();// "Java"
//去除字符串首部空格
" Java ".stripLeading();   // "Java "
//去除字符串尾部空格
" Java ".stripTrailing();  // " Java"
//重复字符串多少次
"Java".repeat(3);             // "JavaJavaJava"
//返回由行终止符分隔的字符串集合。
"A\nB\nC".lines().count();    // 3
"A\nB\nC".lines().collect(Collectors.toList());
```

## Optional 增强

新增了`isEmpty()`方法来判断指定的 `Optional` 对象是否为空。

```java
var op = Optional.empty();
System.out.println(op.isEmpty());//判断指定的 Optional 对象是否为空
```

## ZGC(可伸缩低延迟垃圾收集器)

**ZGC 即 Z Garbage Collector**，是一个可伸缩的、低延迟的垃圾收集器。

ZGC 主要为了满足如下目标进行设计：

- GC 停顿时间不超过 10ms
- 即能处理几百 MB 的小堆，也能处理几个 TB 的大堆
- 应用吞吐能力不会下降超过 15%（与 G1 回收算法相比）
- 方便在此基础上引入新的 GC 特性和利用 colored 针以及 Load barriers 优化奠定基础
- 当前只支持 Linux/x64 位平台

ZGC 目前 **处在实验阶段**，只支持 Linux/x64 平台。

与 CMS 中的 ParNew 和 G1 类似，ZGC 也采用标记-复制算法，不过 ZGC 对该算法做了重大改进。

在 ZGC 中出现 Stop The World 的情况会更少！

详情可以看：[《新一代垃圾回收器 ZGC 的探索与实践》](https://tech.meituan.com/2020/08/06/new-zgc-practice-in-meituan.html)

## Lambda 参数的局部变量语法

从 Java 10 开始，便引入了局部变量类型推断这一关键特性。类型推断允许使用关键字 var 作为局部变量的类型而不是实际类型，编译器根据分配给变量的值推断出类型。

Java 10 中对 var 关键字存在几个限制

- 只能用于局部变量上
- 声明时必须初始化
- 不能用作方法参数
- 不能在 Lambda 表达式中使用

Java11 开始允许开发者在 Lambda 表达式中使用 var 进行参数声明。

```java
// 下面两者是等价的
Consumer<String> consumer = (var i) -> System.out.println(i);
Consumer<String> consumer = (String i) -> System.out.println(i);
```

## 启动单文件源代码程序

这意味着我们可以运行单一文件的 Java 源代码。此功能允许使用 Java 解释器直接执行 Java 源代码。源代码在内存中编译，然后由解释器执行，不需要在磁盘上生成 `.class` 文件了。唯一的约束在于所有相关的类必须定义在同一个 Java 文件中。

对于 Java 初学者并希望尝试简单程序的人特别有用，并且能和 jshell 一起使用。一定能程度上增强了使用 Java 来写脚本程序的能力。

## 其他新特性

- **新的垃圾回收器 Epsilon**：一个完全消极的 GC 实现，分配有限的内存资源，最大限度的降低内存占用和内存吞吐延迟时间
- **低开销的 Heap Profiling**：Java 11 中提供一种低开销的 Java 堆分配采样方法，能够得到堆分配的 Java 对象信息，并且能够通过 JVMTI 访问堆信息
- **TLS1.3 协议**：Java 11 中包含了传输层安全性（TLS）1.3 规范（RFC 8446）的实现，替换了之前版本中包含的 TLS，包括 TLS 1.2，同时还改进了其他 TLS 功能，例如 OCSP 装订扩展（RFC 6066，RFC 6961），以及会话散列和扩展主密钥扩展（RFC 7627），在安全性和性能方面也做了很多提升
- **飞行记录器(Java Flight Recorder)**：飞行记录器之前是商业版 JDK 的一项分析工具，但在 Java 11 中，其代码被包含到公开代码库中，这样所有人都能使用该功能了。
- ……

## 参考

JDK 11 Release Notes：[https://www.oracle.com/java/technologies/javase/11-relnote-issues.html](https://www.oracle.com/java/technologies/javase/11-relnote-issues.html)

Java 11 – Features and Comparison：https://www.geeksforgeeks.org/java-11-features-and-comparison/

# Java 12 & 13 新特性概览

## Java12

### String 增强

Java 12 增加了两个的字符串处理方法，如以下所示。

`indent()` 方法可以实现字符串缩进。

```java
String text = "Java";
// 缩进 4 格
text = text.indent(4);
System.out.println(text);
text = text.indent(-10);
System.out.println(text);
```

输出：

```plain
     Java
Java
```

`transform()` 方法可以用来转变指定字符串。

```java
String result = "foo".transform(input -> input + " bar");
System.out.println(result); // foo bar
```

### Files 增强（文件比较）

Java 12 添加了以下方法来比较两个文件：

```java
public static long mismatch(Path path, Path path2) throws IOException
```

`mismatch()` 方法用于比较两个文件，并返回第一个不匹配字符的位置，如果文件相同则返回 -1L。

代码示例（两个文件内容相同的情况）：

```java
Path filePath1 = Files.createTempFile("file1", ".txt");
Path filePath2 = Files.createTempFile("file2", ".txt");
Files.writeString(filePath1, "Java 12 Article");
Files.writeString(filePath2, "Java 12 Article");

long mismatch = Files.mismatch(filePath1, filePath2);
assertEquals(-1, mismatch);
```

代码示例（两个文件内容不相同的情况）：

```java
Path filePath3 = Files.createTempFile("file3", ".txt");
Path filePath4 = Files.createTempFile("file4", ".txt");
Files.writeString(filePath3, "Java 12 Article");
Files.writeString(filePath4, "Java 12 Tutorial");

long mismatch = Files.mismatch(filePath3, filePath4);
assertEquals(8, mismatch);
```

### 数字格式化工具类

`NumberFormat` 新增了对复杂的数字进行格式化的支持

```java
NumberFormat fmt = NumberFormat.getCompactNumberInstance(Locale.US, NumberFormat.Style.SHORT);
String result = fmt.format(1000);
System.out.println(result);
```

输出:

```plain
1K
```

### Shenandoah GC

Redhat 主导开发的 Pauseless GC 实现，主要目标是 99.9% 的暂停小于 10ms，暂停与堆大小无关等

和 Java11 开源的 ZGC 相比（需要升级到 JDK11 才能使用），Shenandoah GC 有稳定的 JDK8u 版本，在 Java8 占据主要市场份额的今天有更大的可落地性。

### G1 收集器优化

Java12 为默认的垃圾收集器 G1 带来了两项更新:

- **可中止的混合收集集合**：JEP344 的实现，为了达到用户提供的停顿时间目标，JEP 344 通过把要被回收的区域集（混合收集集合）拆分为强制和可选部分，使 G1 垃圾回收器能中止垃圾回收过程。 G1 可以中止可选部分的回收以达到停顿时间目标
- **及时返回未使用的已分配内存**：JEP346 的实现，增强 G1 GC，以便在空闲时自动将 Java 堆内存返回给操作系统

### 预览新特性

作为预览特性加入，需要在`javac`编译和`java`运行时增加参数`--enable-preview` 。

#### 增强 Switch

传统的 `switch` 语法存在容易漏写 `break` 的问题，而且从代码整洁性层面来看，多个 break 本质也是一种重复。

Java12 增强了 `switch` 表达式，使用类似 lambda 语法条件匹配成功后的执行块，不需要多写 break 。

```java
switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> System.out.println(6);
    case TUESDAY                -> System.out.println(7);
    case THURSDAY, SATURDAY     -> System.out.println(8);
    case WEDNESDAY              -> System.out.println(9);
}
```

#### instanceof 模式匹配

`instanceof` 主要在类型强转前探测对象的具体类型。

之前的版本中，我们需要显示地对对象进行类型转换。

```java
Object obj = "我是字符串";
if(obj instanceof String){
   String str = (String) obj;
  System.out.println(str);
}
```

新版的 `instanceof` 可以在判断是否属于具体的类型同时完成转换。

```java
Object obj = "我是字符串";
if(obj instanceof String str){
  System.out.println(str);
}
```

## Java13

### 增强 ZGC(释放未使用内存)

在 Java 11 中实验性引入的 ZGC 在实际的使用中存在未能主动将未使用的内存释放给操作系统的问题。

ZGC 堆由一组称为 ZPages 的堆区域组成。在 GC 周期中清空 ZPages 区域时，它们将被释放并返回到页面缓存 **ZPageCache** 中，此缓存中的 ZPages 按最近最少使用（LRU）的顺序，并按照大小进行组织。

在 Java 13 中，ZGC 将向操作系统返回被标识为长时间未使用的页面，这样它们将可以被其他进程重用。

### SocketAPI 重构

Java Socket API 终于迎来了重大更新！

Java 13 将 Socket API 的底层进行了重写， `NioSocketImpl` 是对 `PlainSocketImpl` 的直接替代，它使用 `java.util.concurrent` 包下的锁而不是同步方法。如果要使用旧实现，请使用 `-Djdk.net.usePlainSocketImpl=true`。

并且，在 Java 13 中是默认使用新的 Socket 实现。

```java
public final class NioSocketImpl extends SocketImpl implements PlatformSocketImpl {
}
```

### FileSystems

`FileSystems` 类中添加了以下三种新方法，以便更容易地使用将文件内容视为文件系统的文件系统提供程序：

- `newFileSystem(Path)`
- `newFileSystem(Path, Map<String, ?>)`
- `newFileSystem(Path, Map<String, ?>, ClassLoader)`

### 动态 CDS 存档

Java 13 中对 Java 10 中引入的应用程序类数据共享(AppCDS)进行了进一步的简化、改进和扩展，即：**允许在 Java 应用程序执行结束时动态进行类归档**，具体能够被归档的类包括所有已被加载，但不属于默认基层 CDS 的应用程序类和引用类库中的类。

这提高了应用程序类数据共享（[AppCDS](https://openjdk.java.net/jeps/310)）的可用性。无需用户进行试运行来为每个应用程序创建类列表。

```bash
java -XX:ArchiveClassesAtExit=my_app_cds.jsa -cp my_app.jar
java -XX:SharedArchiveFile=my_app_cds.jsa -cp my_app.jar
```

### 预览新特性

#### 文本块

解决 Java 定义多行字符串时只能通过换行转义或者换行连接符来变通支持的问题，引入**三重双引号**来定义多行文本。

Java 13 支持两个 `"""` 符号中间的任何内容都会被解释为字符串的一部分，包括换行符。

未支持文本块之前的 HTML 写法：

```java
tring json ="{\n" +
              "   \"name\":\"mkyong\",\n" +
              "   \"age\":38\n" +
              "}\n";
```

支持文本块之后的 HTML 写法：

```java
 String json = """
                {
                    "name":"mkyong",
                    "age":38
                }
                """;
```

未支持文本块之前的 SQL 写法：

```sql
String query = "SELECT `EMP_ID`, `LAST_NAME` FROM `EMPLOYEE_TB`\n" +
               "WHERE `CITY` = 'INDIANAPOLIS'\n" +
               "ORDER BY `EMP_ID`, `LAST_NAME`;\n";
```

支持文本块之后的 SQL 写法：

```sql
String query = """
               SELECT `EMP_ID`, `LAST_NAME` FROM `EMPLOYEE_TB`
               WHERE `CITY` = 'INDIANAPOLIS'
               ORDER BY `EMP_ID`, `LAST_NAME`;
               """;
```

另外，`String` 类新增加了 3 个新的方法来操作文本块：

- `formatted(Object... args)`：它类似于 `String` 的`format()`方法。添加它是为了支持文本块的格式设置。
- `stripIndent()`：用于去除文本块中每一行开头和结尾的空格。
- `translateEscapes()`：转义序列如 `\\t` 转换为 `\t`

由于文本块是一项预览功能，可以在未来版本中删除，因此这些新方法被标记为弃用。

#### 增强 Switch(引入 yield 关键字到 Switch 中)

`Switch` 表达式中就多了一个关键字用于跳出 `Switch` 块的关键字 `yield`，主要用于返回一个值

`yield`和 `return` 的区别在于：`return` 会直接跳出当前循环或者方法，而 `yield` 只会跳出当前 `Switch` 块，同时在使用 `yield` 时，需要有 `default` 条件

```java
private static String descLanguage(String name) {
        return switch (name) {
            case "Java": yield "object-oriented, platform independent and secured";
            case "Ruby": yield "a programmer's best friend";
            default: yield name +" is a good language";
        };
 }
```

## 补充

### 关于预览特性

先贴一段 oracle 官网原文：`This is a preview feature, which is a feature whose design, specification, and implementation are complete, but is not permanent, which means that the feature may exist in a different form or not at all in future JDK releases. To compile and run code that contains preview features, you must specify additional command-line options.`

这是一个预览功能，该功能的设计，规格和实现是完整的，但不是永久性的，这意味着该功能可能以其他形式存在或在将来的 JDK 版本中根本不存在。 要编译和运行包含预览功能的代码，必须指定其他命令行选项。

就以`switch`的增强为例子，从 Java12 中推出，到 Java13 中将继续增强，直到 Java14 才正式转正进入 JDK 可以放心使用，不用考虑后续 JDK 版本对其的改动或修改

一方面可以看出 JDK 作为标准平台在增加新特性的严谨态度，另一方面个人认为是对于预览特性应该采取审慎使用的态度。特性的设计和实现容易，但是其实际价值依然需要在使用中去验证

### JVM 虚拟机优化

每次 Java 版本的发布都伴随着对 JVM 虚拟机的优化，包括对现有垃圾回收算法的改进，引入新的垃圾回收算法，移除老旧的不再适用于今天的垃圾回收算法等

整体优化的方向是**高效，低时延的垃圾回收表现**

对于日常的应用开发者可能比较关注新的语法特性，但是从一个公司角度来说，在考虑是否升级 Java 平台时更加考虑的是**JVM 运行时的提升**

## 参考

JDK Project Overview：[https://openjdk.java.net/projects/jdk/](https://openjdk.java.net/projects/jdk/)

Oracle Java12 ReleaseNote：[https://www.oracle.com/java/technologies/javase/12all-relnotes.htm](https://www.oracle.com/java/technologies/javase/12all-relnotes.htm)

What is new in Java 12：[https://mkyong.com/java/what-is-new-in-java-12/](https://mkyong.com/java/what-is-new-in-java-12/)

Oracle Java13 ReleaseNote [https://www.oracle.com/technetwork/java/javase/13all-relnotes-5461743.html#NewFeature](https://www.oracle.com/technetwork/java/javase/13all-relnotes-5461743.html#NewFeature)

New Java13 Features [https://www.baeldung.com/java-13-new-features](https://www.baeldung.com/java-13-new-features)

Java13 新特性概述 https://www.ibm.com/developerworks/cn/java/the-new-features-of-Java-13/index.html

# Java 14 & 15 新特性概览

## Java14

### 空指针异常精准提示

通过 JVM 参数中添加`-XX:+ShowCodeDetailsInExceptionMessages`，可以在空指针异常中获取更为详细的调用信息，更快的定位和解决问题。

```java
a.b.c.i = 99; // 假设这段代码会发生空指针
```

Java 14 之前：

```java
Exception in thread "main" java.lang.NullPointerException
    at NullPointerExample.main(NullPointerExample.java:5)
```

Java 14 之后：

```java
 // 增加参数后提示的异常中很明确的告知了哪里为空导致
Exception in thread "main" java.lang.NullPointerException:
        Cannot read field 'c' because 'a.b' is null.
    at Prog.main(Prog.java:5)
```

### switch 的增强(转正)

Java12 引入的 switch（预览特性）在 Java14 变为正式版本，不需要增加参数来启用，直接在 JDK14 中就能使用。

Java12 为 switch 表达式引入了类似 lambda 语法条件匹配成功后的执行块，不需要多写 break ，Java13 提供了 `yield` 来在 block 中返回值。

```java
String result = switch (day) {
            case "M", "W", "F" -> "MWF";
            case "T", "TH", "S" -> "TTS";
            default -> {
                if(day.isEmpty())
                    yield "Please insert a valid day.";
                else
                    yield "Looks like a Sunday.";
            }

        };
System.out.println(result);
```

### 预览新特性

#### record 关键字

`record` 关键字可以简化 **数据类**（一个 Java 类一旦实例化就不能再修改）的定义方式，使用 `record` 代替 `class` 定义的类，只需要声明属性，就可以在获得属性的访问方法，以及 `toString()`，`hashCode()`, `equals()`方法。

类似于使用 `class` 定义类，同时使用了 lombok 插件，并打上了`@Getter,@ToString,@EqualsAndHashCode`注解。

```java
/**
 * 这个类具有两个特征
 * 1. 所有成员属性都是final
 * 2. 全部方法由构造方法，和两个成员属性访问器组成（共三个）
 * 那么这种类就很适合使用record来声明
 */
final class Rectangle implements Shape {
    final double length;
    final double width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    double length() { return length; }
    double width() { return width; }
}
/**
 * 1. 使用record声明的类会自动拥有上面类中的三个方法
 * 2. 在这基础上还附赠了equals()，hashCode()方法以及toString()方法
 * 3. toString方法中包括所有成员属性的字符串表示形式及其名称
 */
record Rectangle(float length, float width) { }
```

#### 文本块

Java14 中，文本块依然是预览特性，不过，其引入了两个新的转义字符：

- `\` : 表示行尾，不引入换行符
- `\s`：表示单个空格

```java
String str = "凡心所向，素履所往，生如逆旅，一苇以航。";

String str2 = """
        凡心所向，素履所往， \
        生如逆旅，一苇以航。""";
System.out.println(str2);// 凡心所向，素履所往， 生如逆旅，一苇以航。
String text = """
        java
        c++\sphp
        """;
System.out.println(text);
//输出：
java
c++ php
```

#### instanceof 增强

依然是**预览特性** ，[Java 12 新特性]()中介绍过。

### 其他

- 从 Java11 引入的 ZGC 作为继 G1 过后的下一代 GC 算法，从支持 Linux 平台到 Java14 开始支持 MacOS 和 Windows（个人感觉是终于可以在日常开发工具中先体验下 ZGC 的效果了，虽然其实 G1 也够用）
- 移除了 CMS(Concurrent Mark Sweep) 垃圾收集器（功成而退）
- 新增了 jpackage 工具，标配将应用打成 jar 包外，还支持不同平台的特性包，比如 linux 下的`deb`和`rpm`，window 平台下的`msi`和`exe`

## Java15

### CharSequence

`CharSequence` 接口添加了一个默认方法 `isEmpty()` 来判断字符序列为空，如果是则返回 true。

```java
public interface CharSequence {
  default boolean isEmpty() {
      return this.length() == 0;
  }
}
```

### TreeMap

`TreeMap` 新引入了下面这些方法：

- `putIfAbsent()`
- `computeIfAbsent()`
- `computeIfPresent()`
- `compute()`
- `merge()`

### ZGC(转正)

Java11 的时候 ，ZGC 还在试验阶段。

当时，ZGC 的出现让众多 Java 开发者看到了垃圾回收器的另外一种可能，因此备受关注。

经过多个版本的迭代，不断的完善和修复问题，ZGC 在 Java 15 已经可以正式使用了！

不过，默认的垃圾回收器依然是 G1。你可以通过下面的参数启动 ZGC：

```bash
java -XX:+UseZGC className
```

### EdDSA(数字签名算法)

新加入了一个安全性和性能都更强的基于 Edwards-Curve Digital Signature Algorithm （EdDSA）实现的数字签名算法。

虽然其性能优于现有的 ECDSA 实现，不过，它并不会完全取代 JDK 中现有的椭圆曲线数字签名算法( ECDSA)。

```java
KeyPairGenerator kpg = KeyPairGenerator.getInstance("Ed25519");
KeyPair kp = kpg.generateKeyPair();

byte[] msg = "test_string".getBytes(StandardCharsets.UTF_8);

Signature sig = Signature.getInstance("Ed25519");
sig.initSign(kp.getPrivate());
sig.update(msg);
byte[] s = sig.sign();

String encodedString = Base64.getEncoder().encodeToString(s);
System.out.println(encodedString);
```

输出：

```plain
0Hc0lxxASZNvS52WsvnncJOH/mlFhnA8Tc6D/k5DtAX5BSsNVjtPF4R4+yMWXVjrvB2mxVXmChIbki6goFBgAg==
```

### 文本块(转正)

在 Java 15 ，文本块是正式的功能特性了。

### 隐藏类(Hidden Classes)

隐藏类是为框架（frameworks）所设计的，隐藏类不能直接被其他类的字节码使用，只能在运行时生成类并通过反射间接使用它们。

### 预览新特性

#### 密封类

**密封类（Sealed Classes）** 是 Java 15 中的一个预览新特性。

没有密封类之前，在 Java 中如果想让一个类不能被继承和修改，我们可以使用`final` 关键字对类进行修饰。不过，这种方式不太灵活，直接把一个类的继承和修改渠道给堵死了。

密封类可以对继承或者实现它们的类进行限制，这样这个类就只能被指定的类继承。

```java
// 抽象类 Person 只允许 Employee 和 Manager 继承。
public abstract sealed class Person
    permits Employee, Manager {

    //...
}
```

另外，任何扩展密封类的类本身都必须声明为 `sealed`、`non-sealed` 或 `final`。

```java
public final class Employee extends Person {
}

public non-sealed class Manager extends Person {
}
```

![](images\image-20210820153955587.png)

如果允许扩展的子类和封闭类在同一个源代码文件里，封闭类可以不使用 permits 语句，Java 编译器将检索源文件，在编译期为封闭类添加上许可的子类。

#### instanceof 模式匹配

Java 15 并没有对此特性进行调整，继续预览特性，主要用于接受更多的使用反馈。

在未来的 Java 版本中，Java 的目标是继续完善 `instanceof` 模式匹配新特性。

### 其他

**Nashorn JavaScript 引擎彻底移除**：Nashorn 从 Java8 开始引入的 JavaScript 引擎，Java9 对 Nashorn 做了些增强，实现了一些 ES6 的新特性。在 Java 11 中就已经被弃用，到了 Java 15 就彻底被删除了。

**DatagramSocket API 重构**

**禁用和废弃偏向锁（Biased Locking）**：偏向锁的引入增加了 JVM 的复杂性大于其带来的性能提升。不过，你仍然可以使用 `-XX:+UseBiasedLocking` 启用偏向锁定，但它会提示这是一个已弃用的 API。

……

# Java 16 新特性概览

Java 16 在 2021 年 3 月 16 日正式发布，非长期支持（LTS）版本。

相关阅读：[OpenJDK Java 16 文档](https://openjdk.java.net/projects/jdk/16/) 。

## JEP 338:向量 API(第一次孵化)

向量（Vector） API 最初由 [JEP 338](https://openjdk.java.net/jeps/338) 提出，并作为[孵化 API](http://openjdk.java.net/jeps/11)集成到 Java 16 中。第二轮孵化由 [JEP 414](https://openjdk.java.net/jeps/414) 提出并集成到 Java 17 中，第三轮孵化由 [JEP 417](https://openjdk.java.net/jeps/417) 提出并集成到 Java 18 中，第四轮由 [JEP 426](https://openjdk.java.net/jeps/426) 提出并集成到了 Java 19 中。

该孵化器 API 提供了一个 API 的初始迭代以表达一些向量计算，这些计算在运行时可靠地编译为支持的 CPU 架构上的最佳向量硬件指令，从而获得优于同等标量计算的性能，充分利用单指令多数据（SIMD）技术（大多数现代 CPU 上都可以使用的一种指令）。尽管 HotSpot 支持自动向量化，但是可转换的标量操作集有限且易受代码更改的影响。该 API 将使开发人员能够轻松地用 Java 编写可移植的高性能向量算法。

在 [Java 18 新特性概览]() 中，我有详细介绍到向量 API，这里就不再做额外的介绍了。

## JEP 347:启用 C++ 14 语言特性

Java 16 允许在 JDK 的 C++ 源代码中使用 C++14 语言特性，并提供在 HotSpot 代码中可以使用哪些特性的具体指导。

在 Java 15 中，JDK 中 C++ 代码使用的语言特性仅限于 C++98/03 语言标准。它要求更新各种平台编译器的最低可接受版本。

## JEP 376:ZGC 并发线程堆栈处理

Java16 将 ZGC 线程栈处理从安全点转移到一个并发阶段，甚至在大堆上也允许在毫秒内暂停 GC 安全点。消除 ZGC 垃圾收集器中最后一个延迟源可以极大地提高应用程序的性能和效率。

## JEP 387:弹性元空间

自从引入了 Metaspace 以来，根据反馈，Metaspace 经常占用过多的堆外内存，从而导致内存浪费。弹性元空间这个特性可将未使用的 HotSpot 类元数据（即元空间，metaspace）内存更快速地返回到操作系统，从而减少元空间的占用空间。

并且，这个提案还简化了元空间的代码以降低维护成本。

## JEP 390:对基于值的类发出警告

> 以下介绍摘自：[实操 | 剖析 Java16 新语法特性](https://xie.infoq.cn/article/8304c894c4e38318d38ceb116)，原文写的很不错，推荐阅读。

早在 Java9 版本时，Java 的设计者们就对 `@Deprecated` 注解进行了一次升级，增加了 `since` 和 `forRemoval` 等 2 个新元素。其中，since 元素用于指定标记了 `@Deprecated` 注解的 API 被弃用时的版本，而 `forRemoval` 则进一步明确了 API 标记 @Deprecated 注解时的语义，如果`forRemoval=true`时，则表示该 API 在未来版本中肯定会被删除，开发人员应该使用新的 API 进行替代，不再容易产生歧义（Java9 之前，标记 @Deprecated 注解的 API，语义上存在多种可能性，比如：存在使用风险、可能在未来存在兼容性错误、可能在未来版本中被删除，以及应该使用更好的替代方案等）。

仔细观察原始类型的包装类（比如：`java.lang.Integer`、`java.lang.Double`），不难发现，其构造函数上都已经标记有`@Deprecated(since="9", forRemoval = true)`注解，这就意味着其构造函数在将来会被删除，不应该在程序中继续使用诸如`new Integer();`这样的编码方式（建议使用`Integer a = 10;`或者`Integer.valueOf()`函数），如果继续使用，编译期将会产生'Integer(int)' is deprecated and marked for removal 告警。并且，值得注意的是，这些包装类型已经被指定为同 `java.util.Optional` 和 `java.time.LocalDateTime` 一样的值类型。

其次，如果继续在 `synchronized` 同步块中使用值类型，将会在编译期和运行期产生警告，甚至是异常。在此大家需要注意，就算编译期和运行期没有产生警告和异常，也不建议在 `synchronized` 同步块中使用值类型，举个自增的例子。示例 1-5：

```java
public void inc(Integer count) {
    for (int i = 0; i < 10; i++) {
        new Thread(() -> {
            synchronized (count) {
                count++;
            }
        }).start();
    }
}
```

当执行上述程序示例时，最终的输出结果一定会与你的期望产生差异，这是许多新人经常犯错的一个点，因为在并发环境下，`Integer` 对象根本无法通过 `synchronized` 来保证线程安全，这是因为每次的`count++`操作，所产生的 `hashcode` 均不同，简而言之，每次加锁都锁在了不同的对象上。因此，如果希望在实际的开发过程中保证其原子性，应该使用 `AtomicInteger`。

## JEP 392:打包工具

在 Java 14 中，JEP 343 引入了打包工具，命令是 `jpackage`。在 Java 15 中，继续孵化，现在在 Java 16 中，终于成为了正式功能。

这个打包工具允许打包自包含的 Java 应用程序。它支持原生打包格式，为最终用户提供自然的安装体验，这些格式包括 Windows 上的 msi 和 exe、macOS 上的 pkg 和 dmg，还有 Linux 上的 deb 和 rpm。它还允许在打包时指定启动时参数，并且可以从命令行直接调用，也可以通过 ToolProvider API 以编程方式调用。注意 jpackage 模块名称从 jdk.incubator.jpackage 更改为 jdk.jpackage。这将改善最终用户在安装应用程序时的体验，并简化了“应用商店”模型的部署。

关于这个打包工具的实际使用，可以看这个视频 [Playing with Java 16 jpackage](https://www.youtube.com/watch?v=KahYIVzRIkQ)（需要梯子）。

## JEP 393:外部内存访问 API(第三次孵化)

引入外部内存访问 API 以允许 Java 程序安全有效地访问 Java 堆之外的外部内存。

Java 14([JEP 370](https://openjdk.org/jeps/370)) 的时候，第一次孵化外部内存访问 API，Java 15 中进行了第二次复活（[JEP 383](https://openjdk.org/jeps/383)），在 Java 16 中进行了第三次孵化。

引入外部内存访问 API 的目的如下：

- 通用：单个 API 应该能够对各种外部内存（如本机内存、持久内存、堆内存等）进行操作。
- 安全：无论操作何种内存，API 都不应该破坏 JVM 的安全性。
- 控制：可以自由的选择如何释放内存（显式、隐式等）。
- 可用：如果需要访问外部内存，API 应该是 `sun.misc.Unsafe`

## JEP 394:instanceof 模式匹配(转正)

| JDK 版本   | 更新类型          | JEP                                     | 更新内容                                 |
| ---------- | ----------------- | --------------------------------------- | ---------------------------------------- |
| Java SE 14 | preview           | [JEP 305](https://openjdk.org/jeps/305) | 首次引入 instanceof 模式匹配。           |
| Java SE 15 | Second Preview    | [JEP 375](https://openjdk.org/jeps/375) | 相比较上个版本无变化，继续收集更多反馈。 |
| Java SE 16 | Permanent Release | [JEP 394](https://openjdk.org/jeps/394) | 模式变量不再隐式为 final。               |

从 Java 16 开始，你可以对 `instanceof` 中的变量值进行修改。

```java
// Old code
if (o instanceof String) {
    String s = (String)o;
    ... use s ...
}

// New code
if (o instanceof String s) {
    ... use s ...
}
```

## JEP 395:记录类型(转正)

记录类型变更历史：

| JDK 版本   | 更新类型          | JEP                                          | 更新内容                                                     |
| ---------- | ----------------- | -------------------------------------------- | ------------------------------------------------------------ |
| Java SE 14 | Preview           | [JEP 359](https://openjdk.java.net/jeps/359) | 引入 `record` 关键字，`record` 提供一种紧凑的语法来定义类中的不可变数据。 |
| Java SE 15 | Second Preview    | [JEP 384](https://openjdk.org/jeps/384)      | 支持在局部方法和接口中使用 `record`。                        |
| Java SE 16 | Permanent Release | [JEP 395](https://openjdk.org/jeps/395)      | 非静态内部类可以定义非常量的静态成员。                       |

从 Java SE 16 开始，非静态内部类可以定义非常量的静态成员。

```java
public class Outer {
  class Inner {
    static int age;
  }
}
```

> 在 JDK 16 之前，如果写上面这种代码，IDE 会提示你静态字段 age 不能在非静态的内部类中定义，除非它用一个常量表达式初始化。（The field age cannot be declared static in a non-static inner type, unless initialized with a constant expression）

## JEP 396:默认强封装 JDK 内部元素

此特性会默认强封装 JDK 的所有内部元素，但关键内部 API（例如 `sun.misc.Unsafe`）除外。默认情况下，使用早期版本成功编译的访问 JDK 内部 API 的代码可能不再起作用。鼓励开发人员从使用内部元素迁移到使用标准 API 的方法上，以便他们及其用户都可以无缝升级到将来的 Java 版本。强封装由 JDK 9 的启动器选项–illegal-access 控制，到 JDK 15 默认改为 warning，从 JDK 16 开始默认为 deny。（目前）仍然可以使用单个命令行选项放宽对所有软件包的封装，将来只有使用–add-opens 打开特定的软件包才行。

## JEP 397:密封类(预览)

密封类由 [JEP 360](https://openjdk.java.net/jeps/360) 提出预览，集成到了 Java 15 中。在 JDK 16 中， 密封类得到了改进（更加严格的引用检查和密封类的继承关系），由 [JEP 397](https://openjdk.java.net/jeps/397) 提出了再次预览。

在 [Java 14 & 15 新特性概览]() 中，我有详细介绍到密封类，这里就不再做额外的介绍了。

## 其他优化与改进

- **JEP 380:Unix-Domain 套接字通道**：Unix-domain 套接字一直是大多数 Unix 平台的一个特性，现在在 Windows 10 和 Windows Server 2019 也提供了支持。此特性为 java.nio.channels 包的套接字通道和服务器套接字通道 API 添加了 Unix-domain（AF_UNIX）套接字支持。它扩展了继承的通道机制以支持 Unix-domain 套接字通道和服务器套接字通道。Unix-domain 套接字用于同一主机上的进程间通信（IPC）。它们在很大程度上类似于 TCP/IP，区别在于套接字是通过文件系统路径名而不是 Internet 协议（IP）地址和端口号寻址的。对于本地进程间通信，Unix-domain 套接字比 TCP/IP 环回连接更安全、更有效

- **JEP 389:外部链接器 API(孵化)：** 该孵化器 API 提供了静态类型、纯 Java 访问原生代码的特性，该 API 将大大简化绑定原生库的原本复杂且容易出错的过程。Java 1.1 就已通过 Java 原生接口（JNI）支持了原生方法调用，但并不好用。Java 开发人员应该能够为特定任务绑定特定的原生库。它还提供了外来函数支持，而无需任何中间的 JNI 粘合代码。

- **JEP 357:从 Mercurial 迁移到 Git**：在此之前，OpenJDK 源代码是使用版本管理工具 Mercurial 进行管理，现在迁移到了 Git。

- **JEP 369:迁移到 GitHub**：和 JEP 357 从 Mercurial 迁移到 Git 的改变一致，在把版本管理迁移到 Git 之后，选择了在 GitHub 上托管 OpenJDK 社区的 Git 仓库。不过只对 JDK 11 以及更高版本 JDK 进行了迁移。

- **JEP 386:移植 Alpine Linux**：Alpine Linux 是一个独立的、非商业的 Linux 发行版，它十分的小，一个容器需要不超过 8MB 的空间，最小安装到磁盘只需要大约 130MB 存储空间，并且十分的简单，同时兼顾了安全性。此提案将 JDK 移植到了 Apline Linux，由于 Apline Linux 是基于 musl lib 的轻量级 Linux 发行版，因此其他 x64 和 AArch64 架构上使用 musl lib 的 Linux 发行版也适用。

- **JEP 388:Windows/AArch64 移植**：这些 JEP 的重点不是移植工作本身，而是将它们集成到 JDK 主线存储库中；JEP 386 将 JDK 移植到 Alpine Linux 和其他使用 musl 作为 x64 上主要 C 库的发行版上。此外，JEP 388 将 JDK 移植到 Windows AArch64（ARM64）

## 参考文献

- [Java Language Changes](https://docs.oracle.com/en/java/javase/16/language/java-language-changes.html)
- [Consolidated JDK 16 Release Notes](https://www.oracle.com/java/technologies/javase/16all-relnotes.html)
- [Java 16 正式发布，新特性一一解析](https://www.infoq.cn/article/IAkwhx7i9V7G8zLVEd4L)
- [实操 | 剖析 Java16 新语法特性](https://xie.infoq.cn/article/8304c894c4e38318d38ceb116)（写的很赞）

# Java 17 新特性概览（重要🌟）

Java 17 在 2021 年 9 月 14 日正式发布，是一个**长期支持（LTS）版本**。

下面这张图是 Oracle 官方给出的 Oracle JDK 支持的时间线。可以看得到，Java

17 最多可以支持到 2029 年 9 月份。

![](images\4c1611fad59449edbbd6e233690e9fa7 (1).png)

Java 17 将是继 Java 8 以来最重要的长期支持（LTS）版本，是 Java 社区八年努力的成果。Spring 6.x 和 Spring Boot 3.x 最低支持的就是 Java 17。

这次更新共带来 14 个新特性：

- [JEP 306:Restore Always-Strict Floating-Point Semantics（恢复始终严格的浮点语义）](https://openjdk.java.net/jeps/306)

- [JEP 356:Enhanced Pseudo-Random Number Generators（增强的伪随机数生成器）](https://openjdk.java.net/jeps/356)

- [JEP 382:New macOS Rendering Pipeline（新的 macOS 渲染管道）](https://openjdk.java.net/jeps/382)

- [JEP 391:macOS/AArch64 Port（支持 macOS AArch64）](https://openjdk.java.net/jeps/391)

- [JEP 398:Deprecate the Applet API for Removal（删除已弃用的 Applet API）](https://openjdk.java.net/jeps/398)

- [JEP 403:Strongly Encapsulate JDK Internals（更强大的封装 JDK 内部元素）](https://openjdk.java.net/jeps/403)

- [JEP 406:Pattern Matching for switch (switch 的类型匹配)](https://openjdk.java.net/jeps/406)（预览）

- [JEP 407:Remove RMI Activation（删除远程方法调用激活机制）](https://openjdk.java.net/jeps/407)

- [JEP 409:Sealed Classes（密封类）](https://openjdk.java.net/jeps/409)（转正）

- [JEP 410:Remove the Experimental AOT and JIT Compiler（删除实验性的 AOT 和 JIT 编译器）](https://openjdk.java.net/jeps/410)

- [JEP 411:Deprecate the Security Manager for Removal（弃用安全管理器以进行删除）](https://openjdk.java.net/jeps/411)

- [JEP 412:Foreign Function & Memory API (外部函数和内存 API)](https://openjdk.java.net/jeps/412)（孵化）

- [JEP 414:Vector（向量） API](https://openjdk.java.net/jeps/417)（第二次孵化）

- [JEP 415:Context-Specific Deserialization Filters](https://openjdk.java.net/jeps/415)

  

这里只对 356、398、413、406、407、409、410、411、412、414 这几个我觉得比较重要的新特性进行详细介绍。

相关阅读：[OpenJDK Java 17 文档](https://openjdk.java.net/projects/jdk/17/) 

## JEP 356:增强的伪随机数生成器

JDK 17 之前，我们可以借助 `Random`、`ThreadLocalRandom`和`SplittableRandom`来生成随机数。不过，这 3 个类都各有缺陷，且缺少常见的伪随机算法支持。

Java 17 为伪随机数生成器 （pseudorandom number generator，PRNG，又称为确定性随机位生成器）增加了新的接口类型和实现，使得开发者更容易在应用程序中互换使用各种 PRNG 算法。

> [PRNG](https://ctf-wiki.org/crypto/streamcipher/prng/intro/) 用来生成接近于绝对随机数序列的数字序列。一般来说，PRNG 会依赖于一个初始值，也称为种子，来生成对应的伪随机数序列。只要种子确定了，PRNG 所生成的随机数就是完全确定的，因此其生成的随机数序列并不是真正随机的。

使用示例：

```java
RandomGeneratorFactory<RandomGenerator> l128X256MixRandom = RandomGeneratorFactory.of("L128X256MixRandom");
// 使用时间戳作为随机数种子
RandomGenerator randomGenerator = l128X256MixRandom.create(System.currentTimeMillis());
// 生成随机数
randomGenerator.nextInt(10);
```

## JEP 398:弃用 Applet API 以进行删除

Applet API 用于编写在 Web 浏览器端运行的 Java 小程序，很多年前就已经被淘汰了，已经没有理由使用了。

Applet API 在 Java 9 时被标记弃用（[JEP 289](https://openjdk.java.net/jeps/289)），但不是为了删除。

## JEP 406:switch 的类型匹配（预览）

正如 `instanceof` 一样， `switch` 也紧跟着增加了类型匹配自动转换功能。

`instanceof` 代码示例：

```java
// Old code
if (o instanceof String) {
    String s = (String)o;
    ... use s ...
}

// New code
if (o instanceof String s) {
    ... use s ...
}
```

`switch` 代码示例：

```java
// Old code
static String formatter(Object o) {
    String formatted = "unknown";
    if (o instanceof Integer i) {
        formatted = String.format("int %d", i);
    } else if (o instanceof Long l) {
        formatted = String.format("long %d", l);
    } else if (o instanceof Double d) {
        formatted = String.format("double %f", d);
    } else if (o instanceof String s) {
        formatted = String.format("String %s", s);
    }
    return formatted;
}

// New code
static String formatterPatternSwitch(Object o) {
    return switch (o) {
        case Integer i -> String.format("int %d", i);
        case Long l    -> String.format("long %d", l);
        case Double d  -> String.format("double %f", d);
        case String s  -> String.format("String %s", s);
        default        -> o.toString();
    };
}
```

对于 `null` 值的判断也进行了优化。

```java
// Old code
static void testFooBar(String s) {
    if (s == null) {
        System.out.println("oops!");
        return;
    }
    switch (s) {
        case "Foo", "Bar" -> System.out.println("Great");
        default           -> System.out.println("Ok");
    }
}

// New code
static void testFooBar(String s) {
    switch (s) {
        case null         -> System.out.println("Oops");
        case "Foo", "Bar" -> System.out.println("Great");
        default           -> System.out.println("Ok");
    }
}
```

## JEP 407:删除远程方法调用激活机制

删除远程方法调用 (RMI) 激活机制，同时保留 RMI 的其余部分。RMI 激活机制已过时且不再使用。

## JEP 409:密封类（转正）

密封类由 [JEP 360](https://openjdk.java.net/jeps/360) 提出预览，集成到了 Java 15 中。在 JDK 16 中， 密封类得到了改进（更加严格的引用检查和密封类的继承关系），由 [JEP 397](https://openjdk.java.net/jeps/397) 提出了再次预览。

在 [Java 14 & 15 新特性概览]() 中，我有详细介绍到密封类，这里就不再做额外的介绍了。

## JEP 410:删除实验性的 AOT 和 JIT 编译器

在 Java 9 的 [JEP 295](https://openjdk.java.net/jeps/295) ,引入了实验性的提前 (AOT) 编译器，在启动虚拟机之前将 Java 类编译为本机代码。

Java 17，删除实验性的提前 (AOT) 和即时 (JIT) 编译器，因为该编译器自推出以来很少使用，维护它所需的工作量很大。保留实验性的 Java 级 JVM 编译器接口 (JVMCI)，以便开发人员可以继续使用外部构建的编译器版本进行 JIT 编译。

## JEP 411:弃用安全管理器以进行删除

弃用安全管理器以便在将来的版本中删除。

安全管理器可追溯到 Java 1.0，多年来，它一直不是保护客户端 Java 代码的主要方法，也很少用于保护服务器端代码。为了推动 Java 向前发展，Java 17 弃用安全管理器，以便与旧版 Applet API ( [JEP 398](https://openjdk.java.net/jeps/398) ) 一起移除。

## JEP 412:外部函数和内存 API（孵化）

Java 程序可以通过该 API 与 Java 运行时之外的代码和数据进行互操作。通过高效地调用外部函数（即 JVM 之外的代码）和安全地访问外部内存（即不受 JVM 管理的内存），该 API 使 Java 程序能够调用本机库并处理本机数据，而不会像 JNI 那样危险和脆弱。

外部函数和内存 API 在 Java 17 中进行了第一轮孵化，由 [JEP 412](https://openjdk.java.net/jeps/412) 提出。第二轮孵化由[JEP 419](https://openjdk.org/jeps/419) 提出并集成到了 Java 18 中，预览由 [JEP 424](https://openjdk.org/jeps/424) 提出并集成到了 Java 19 中。

在 [Java 19 新特性概览]() 中，我有详细介绍到外部函数和内存 API，这里就不再做额外的介绍了。

## JEP 414:向量 API（第二次孵化）

向量（Vector） API 最初由 [JEP 338](https://openjdk.java.net/jeps/338) 提出，并作为[孵化 API](http://openjdk.java.net/jeps/11)集成到 Java 16 中。第二轮孵化由 [JEP 414](https://openjdk.java.net/jeps/414) 提出并集成到 Java 17 中，第三轮孵化由 [JEP 417](https://openjdk.java.net/jeps/417) 提出并集成到 Java 18 中，第四轮由 [JEP 426](https://openjdk.java.net/jeps/426) 提出并集成到了 Java 19 中。

该孵化器 API 提供了一个 API 的初始迭代以表达一些向量计算，这些计算在运行时可靠地编译为支持的 CPU 架构上的最佳向量硬件指令，从而获得优于同等标量计算的性能，充分利用单指令多数据（SIMD）技术（大多数现代 CPU 上都可以使用的一种指令）。尽管 HotSpot 支持自动向量化，但是可转换的标量操作集有限且易受代码更改的影响。该 API 将使开发人员能够轻松地用 Java 编写可移植的高性能向量算法。

在 [Java 18 新特性概览]() 中，我有详细介绍到向量 API，这里就不再做额外的介绍了。

# Java 18 新特性概览

Java 18 在 2022 年 3 月 22 日正式发布，非长期支持版本。

Java 18 带来了 9 个新特性：

- [JEP 400:UTF-8 by Default（默认字符集为 UTF-8）](https://openjdk.java.net/jeps/400)

- [JEP 408:Simple Web Server（简易的 Web 服务器）](https://openjdk.java.net/jeps/408)

- [JEP 413:Code Snippets in Java API Documentation（Java API 文档中的代码片段）](https://openjdk.java.net/jeps/413)

- [JEP 416:Reimplement Core Reflection with Method Handles（使用方法句柄重新实现反射核心）](https://openjdk.java.net/jeps/416)

- [JEP 417:Vector（向量） API](https://openjdk.java.net/jeps/417)（第三次孵化）

- [JEP 418:Internet-Address Resolution（互联网地址解析）SPI](https://openjdk.java.net/jeps/418)

- [JEP 419:Foreign Function & Memory API（外部函数和内存 API）](https://openjdk.java.net/jeps/419)（第二次孵化）

- [JEP 420:Pattern Matching for switch（switch 模式匹配）](https://openjdk.java.net/jeps/420)（第二次预览）

- [JEP 421:Deprecate Finalization for Removal](https://openjdk.java.net/jeps/421)

Java 17 中包含 14 个特性，Java 16 中包含 17 个特性，Java 15 中包含 14 个特性，Java 14 中包含 16 个特性。相比于前面发布的版本来说，Java 18 的新特性少了很多。

这里只对 400、408、413、416、417、418、419 这几个我觉得比较重要的新特性进行详细介绍。

相关阅读：

- [OpenJDK Java 18 文档](https://openjdk.java.net/projects/jdk/18/)
- [IntelliJ IDEA | Java 18 功能支持](https://mp.weixin.qq.com/s/PocFKR9z9u7-YCZHsrA5kQ)

## JEP 400:默认字符集为 UTF-8

JDK 终于将 UTF-8 设置为默认字符集。

在 Java 17 及更早版本中，默认字符集是在 Java 虚拟机运行时才确定的，取决于不同的操作系统、区域设置等因素，因此存在潜在的风险。就比如说你在 Mac 上运行正常的一段打印文字到控制台的 Java 程序到了 Windows 上就会出现乱码，如果你不手动更改字符集的话。

## JEP 408:简易的 Web 服务器

Java 18 之后，你可以使用 `jwebserver` 命令启动一个简易的静态 Web 服务器。

```bash
$ jwebserver
Binding to loopback by default. For all interfaces use "-b 0.0.0.0" or "-b ::".
Serving /cwd and subdirectories on 127.0.0.1 port 8000
URL: http://127.0.0.1:8000/
```

这个服务器不支持 CGI 和 Servlet，只限于静态文件。

## JEP 413:优化 Java API 文档中的代码片段

在 Java 18 之前，如果我们想要在 Javadoc 中引入代码片段可以使用 `<pre>{@code ...}</pre>` 。

```java
<pre>{@code
    lines of source code
}</pre>
```

<pre>{@code ...}</pre> 这种方式生成的效果比较一般。

在 Java 18 之后，可以通过 `@snippet` 标签来做这件事情。

```java
/**
 * The following code shows how to use {@code Optional.isPresent}:
 * {@snippet :
 * if (v.isPresent()) {
 *     System.out.println("v: " + v.get());
 * }
 * }
 */
```

`@snippet` 这种方式生成的效果更好且使用起来更方便一些。

## JEP 416:使用方法句柄重新实现反射核心

Java 18 改进了 `java.lang.reflect.Method`、`Constructor` 的实现逻辑，使之性能更好，速度更快。这项改动不会改动相关 API ，这意味着开发中不需要改动反射相关代码，就可以体验到性能更好反射。

OpenJDK 官方给出了新老实现的反射性能基准测试结果。

<img src="images\JEP416Benchmark.png" style="zoom:50%;" />

## JEP 417: 向量 API（第三次孵化）

向量（Vector） API 最初由 [JEP 338](https://openjdk.java.net/jeps/338) 提出，并作为[孵化 API](http://openjdk.java.net/jeps/11)集成到 Java 16 中。第二轮孵化由 [JEP 414](https://openjdk.java.net/jeps/414) 提出并集成到 Java 17 中，第三轮孵化由 [JEP 417](https://openjdk.java.net/jeps/417) 提出并集成到 Java 18 中，第四轮由 [JEP 426](https://openjdk.java.net/jeps/426) 提出并集成到了 Java 19 中。

向量计算由对向量的一系列操作组成。向量 API 用来表达向量计算，该计算可以在运行时可靠地编译为支持的 CPU 架构上的最佳向量指令，从而实现优于等效标量计算的性能。

向量 API 的目标是为用户提供简洁易用且与平台无关的表达范围广泛的向量计算。

这是对数组元素的简单标量计算：

```java
void scalarComputation(float[] a, float[] b, float[] c) {
   for (int i = 0; i < a.length; i++) {
        c[i] = (a[i] * a[i] + b[i] * b[i]) * -1.0f;
   }
}
```

这是使用 Vector API 进行的等效向量计算：

```java
static final VectorSpecies<Float> SPECIES = FloatVector.SPECIES_PREFERRED;
void vectorComputation(float[] a, float[] b, float[] c) {
    int i = 0;
    int upperBound = SPECIES.loopBound(a.length);
    for (; i < upperBound; i += SPECIES.length()) {
        // FloatVector va, vb, vc;
        var va = FloatVector.fromArray(SPECIES, a, i);
        var vb = FloatVector.fromArray(SPECIES, b, i);
        var vc = va.mul(va)
                   .add(vb.mul(vb))
                   .neg();
        vc.intoArray(c, i);
    }
    for (; i < a.length; i++) {
        c[i] = (a[i] * a[i] + b[i] * b[i]) * -1.0f;
    }
}
```

在 JDK 18 中，向量 API 的性能得到了进一步的优化。

## JEP 418:互联网地址解析 SPI

Java 18 定义了一个全新的 SPI（service-provider interface），用于主要名称和地址的解析，以便 `java.net.InetAddress` 可以使用平台之外的第三方解析器。

## JEP 419:Foreign Function & Memory API（第二次孵化）

Java 程序可以通过该 API 与 Java 运行时之外的代码和数据进行互操作。通过高效地调用外部函数（即 JVM 之外的代码）和安全地访问外部内存（即不受 JVM 管理的内存），该 API 使 Java 程序能够调用本机库并处理本机数据，而不会像 JNI 那样危险和脆弱。

外部函数和内存 API 在 Java 17 中进行了第一轮孵化，由 [JEP 412](https://openjdk.java.net/jeps/412) 提出。第二轮孵化由[JEP 419](https://openjdk.org/jeps/419) 提出并集成到了 Java 18 中，预览由 [JEP 424](https://openjdk.org/jeps/424) 提出并集成到了 Java 19 中。

在 [Java 19 新特性概览]() 中，我有详细介绍到外部函数和内存 API，这里就不再做额外的介绍了。

# Java 19 新特性概览

JDK 19 定于 2022 年 9 月 20 日正式发布以供生产使用，非长期支持版本。不过，JDK 19 中有一些比较重要的新特性值得关注。

JDK 19 只有 7 个新特性：

- [JEP 405: Record Patterns（记录模式）](https://openjdk.org/jeps/405)（预览）
- [JEP 422: Linux/RISC-V Port](https://openjdk.org/jeps/422)
- [JEP 424: Foreign Function & Memory API（外部函数和内存 API）](https://openjdk.org/jeps/424)（预览）
- [JEP 425: Virtual Threads（虚拟线程）](https://openjdk.org/jeps/425)（预览）
- [JEP 426: Vector（向量）API](https://openjdk.java.net/jeps/426)（第四次孵化）
- [JEP 427: Pattern Matching for switch（switch 模式匹配）](https://openjdk.java.net/jeps/427)
- [JEP 428: Structured Concurrency（结构化并发）](https://openjdk.org/jeps/428)（孵化）

这里只对 424、425、426、428 这 4 个我觉得比较重要的新特性进行详细介绍。

相关阅读：[OpenJDK Java 19 文档](https://openjdk.org/projects/jdk/19/)

## JEP 424: 外部函数和内存 API（预览）

Java 程序可以通过该 API 与 Java 运行时之外的代码和数据进行互操作。通过高效地调用外部函数（即 JVM 之外的代码）和安全地访问外部内存（即不受 JVM 管理的内存），该 API 使 Java 程序能够调用本机库并处理本机数据，而不会像 JNI 那样危险和脆弱。

外部函数和内存 API 在 Java 17 中进行了第一轮孵化，由 [JEP 412](https://openjdk.java.net/jeps/412) 提出。第二轮孵化由[JEP 419](https://openjdk.org/jeps/419) 提出并集成到了 Java 18 中，预览由 [JEP 424](https://openjdk.org/jeps/424) 提出并集成到了 Java 19 中

在没有外部函数和内存 API 之前：

- Java 通过 [`sun.misc.Unsafe`](https://hg.openjdk.java.net/jdk/jdk/file/tip/src/jdk.unsupported/share/classes/sun/misc/Unsafe.java) 提供一些执行低级别、不安全操作的方法（如直接访问系统内存资源、自主管理内存资源等），`Unsafe` 类让 Java 语言拥有了类似 C 语言指针一样操作内存空间的能力的同时，也增加了 Java 语言的不安全性，不正确使用 `Unsafe` 类会使得程序出错的概率变大。
- Java 1.1 就已通过 Java 原生接口（JNI）支持了原生方法调用，但并不好用。JNI 实现起来过于复杂，步骤繁琐（具体的步骤可以参考这篇文章：[Guide to JNI (Java Native Interface)](https://www.baeldung.com/jni) ），不受 JVM 的语言安全机制控制，影响 Java 语言的跨平台特性。并且，JNI 的性能也不行，因为 JNI 方法调用不能从许多常见的 JIT 优化(如内联)中受益。虽然[JNA](https://github.com/java-native-access/jna)、[JNR](https://github.com/jnr/jnr-ffi)和[JavaCPP](https://github.com/bytedeco/javacpp)等框架对 JNI 进行了改进，但效果还是不太理想。

引入外部函数和内存 API 就是为了解决 Java 访问外部函数和外部内存存在的一些痛点。

Foreign Function & Memory API (FFM API) 定义了类和接口：

- 分配外部内存：`MemorySegment`、、`MemoryAddress`和`SegmentAllocator`）；
- 操作和访问结构化的外部内存：`MemoryLayout`, `VarHandle`；
- 控制外部内存的分配和释放：`MemorySession`；
- 调用外部函数：`Linker`、`FunctionDescriptor`和`SymbolLookup`。

下面是 FFM API 使用示例，这段代码获取了 C 库函数的 `radixsort` 方法句柄，然后使用它对 Java 数组中的四个字符串进行排序。

```java
// 1. 在C库路径上查找外部函数
Linker linker = Linker.nativeLinker();
SymbolLookup stdlib = linker.defaultLookup();
MethodHandle radixSort = linker.downcallHandle(
                             stdlib.lookup("radixsort"), ...);
// 2. 分配堆上内存以存储四个字符串
String[] javaStrings   = { "mouse", "cat", "dog", "car" };
// 3. 分配堆外内存以存储四个指针
SegmentAllocator allocator = implicitAllocator();
MemorySegment offHeap  = allocator.allocateArray(ValueLayout.ADDRESS, javaStrings.length);
// 4. 将字符串从堆上复制到堆外
for (int i = 0; i < javaStrings.length; i++) {
    // 在堆外分配一个字符串，然后存储指向它的指针
    MemorySegment cString = allocator.allocateUtf8String(javaStrings[i]);
    offHeap.setAtIndex(ValueLayout.ADDRESS, i, cString);
}
// 5. 通过调用外部函数对堆外数据进行排序
radixSort.invoke(offHeap, javaStrings.length, MemoryAddress.NULL, '\0');
// 6. 将(重新排序的)字符串从堆外复制到堆上
for (int i = 0; i < javaStrings.length; i++) {
    MemoryAddress cStringPtr = offHeap.getAtIndex(ValueLayout.ADDRESS, i);
    javaStrings[i] = cStringPtr.getUtf8String(0);
}
assert Arrays.equals(javaStrings, new String[] {"car", "cat", "dog", "mouse"});  // true
```

## JEP 425: 虚拟线程（预览）

虚拟线程（Virtual Thread-）是 JDK 而不是 OS 实现的轻量级线程(Lightweight Process，LWP），许多虚拟线程共享同一个操作系统线程，虚拟线程的数量可以远大于操作系统线程的数量。

虚拟线程在其他多线程语言中已经被证实是十分有用的，比如 Go 中的 Goroutine、Erlang 中的进程。

虚拟线程避免了上下文切换的额外耗费，兼顾了多线程的优点，简化了高并发程序的复杂，可以有效减少编写、维护和观察高吞吐量并发应用程序的工作量。

知乎有一个关于 Java 19 虚拟线程的讨论，感兴趣的可以去看看：[https://www.zhihu.com/question/536743167](https://www.zhihu.com/question/536743167) 。

Java 虚拟线程的详细解读和原理可以看下面这两篇文章：

- [虚拟线程原理及性能分析｜得物技术](https://mp.weixin.qq.com/s/vdLXhZdWyxc6K-D3Aj03LA)
- [Java19 正式 GA！看虚拟线程如何大幅提高系统吞吐量](https://mp.weixin.qq.com/s/yyApBXxpXxVwttr01Hld6Q)
- [虚拟线程 - VirtualThread 源码透视](https://www.cnblogs.com/throwable/p/16758997.html)

## JEP 426: 向量 API（第四次孵化）

向量（Vector） API 最初由 [JEP 338](https://openjdk.java.net/jeps/338) 提出，并作为[孵化 API](http://openjdk.java.net/jeps/11)集成到 Java 16 中。第二轮孵化由 [JEP 414](https://openjdk.java.net/jeps/414) 提出并集成到 Java 17 中，第三轮孵化由 [JEP 417](https://openjdk.java.net/jeps/417) 提出并集成到 Java 18 中，第四轮由 [JEP 426](https://openjdk.java.net/jeps/426) 提出并集成到了 Java 19 中。

在 [Java 18 新特性概览]() 中，我有详细介绍到向量 API，这里就不再做额外的介绍了。

## JEP 428: 结构化并发(孵化)

JDK 19 引入了结构化并发，一种多线程编程方法，目的是为了通过结构化并发 API 来简化多线程编程，并不是为了取代`java.util.concurrent`，目前处于孵化器阶段。

结构化并发将不同线程中运行的多个任务视为单个工作单元，从而简化错误处理、提高可靠性并增强可观察性。也就是说，结构化并发保留了单线程代码的可读性、可维护性和可观察性。

结构化并发的基本 API 是[`StructuredTaskScope`](https://download.java.net/java/early_access/loom/docs/api/jdk.incubator.concurrent/jdk/incubator/concurrent/StructuredTaskScope.html)。`StructuredTaskScope` 支持将任务拆分为多个并发子任务，在它们自己的线程中执行，并且子任务必须在主任务继续之前完成。

`StructuredTaskScope` 的基本用法如下：

```java
   try (var scope = new StructuredTaskScope<Object>()) {
        // 使用fork方法派生线程来执行子任务
        Future<Integer> future1 = scope.fork(task1);
        Future<String> future2 = scope.fork(task2);
        // 等待线程完成
        scope.join();
        // 结果的处理可能包括处理或重新抛出异常
        ... process results/exceptions ...
    } // close
```

结构化并发非常适合虚拟线程，虚拟线程是 JDK 实现的轻量级线程。许多虚拟线程共享同一个操作系统线程，从而允许非常多的虚拟线程。

# Java 20 新特性概览

JDK 20 于 2023 年 3 月 21 日发布，非长期支持版本。

根据开发计划，下一个 LTS 版本就是将于 2023 年 9 月发布的 JDK 21。

![](images\640.png)

JDK 20 只有 7 个新特性：

- [JEP 429：Scoped Values（作用域值）](https://openjdk.org/jeps/429)（第一次孵化）
- [JEP 432：Record Patterns（记录模式）](https://openjdk.org/jeps/432)（第二次预览）
- [JEP 433：switch 模式匹配](https://openjdk.org/jeps/433)（第四次预览）
- [JEP 434: Foreign Function & Memory API（外部函数和内存 API）](https://openjdk.org/jeps/434)（第二次预览）
- [JEP 436: Virtual Threads（虚拟线程）](https://openjdk.org/jeps/436)（第二次预览）
- [JEP 437:Structured Concurrency（结构化并发）](https://openjdk.org/jeps/437)(第二次孵化)
- [JEP 432:向量 API（](https://openjdk.org/jeps/438)第五次孵化）

## JEP 429：作用域值（第一次孵化）

作用域值（Scoped Values）它可以在线程内和线程间共享不可变的数据，优于线程局部变量，尤其是在使用大量虚拟线程时。

```java
final static ScopedValue<...> V = new ScopedValue<>();

// In some method
ScopedValue.where(V, <value>)
           .run(() -> { ... V.get() ... call methods ... });

// In a method called directly or indirectly from the lambda expression
... V.get() ...
```

作用域值允许在大型程序中的组件之间安全有效地共享数据，而无需求助于方法参数。

关于作用域值的详细介绍，推荐阅读[作用域值常见问题解答](https://www.happycoders.eu/java/scoped-values/)这篇文章。

## JEP 432：记录模式（第二次预览）

记录模式（Record Patterns） 可对 record 的值进行解构，也就是更方便地从记录类（Record Class）中提取数据。并且，还可以嵌套记录模式和类型模式结合使用，以实现强大的、声明性的和可组合的数据导航和处理形式。

记录模式不能单独使用，而是要与 instanceof 或 switch 模式匹配一同使用。

先以 instanceof 为例简单演示一下。

简单定义一个记录类：

```java
record Shape(String type, long unit){}
```

没有记录模式之前：

```java
Shape circle = new Shape("Circle", 10);
if (circle instanceof Shape shape) {

  System.out.println("Area of " + shape.type() + " is : " + Math.PI * Math.pow(shape.unit(), 2));
}
```

有了记录模式之后：

```java
Shape circle = new Shape("Circle", 10);
if (circle instanceof Shape(String type, long unit)) {
  System.out.println("Area of " + type + " is : " + Math.PI * Math.pow(unit, 2));
}
```

再看看记录模式与 switch 的配合使用。

定义一些类：

```java
interface Shape {}
record Circle(double radius) implements Shape { }
record Square(double side) implements Shape { }
record Rectangle(double length, double width) implements Shape { }
```

没有记录模式之前：

```java
Shape shape = new Circle(10);
switch (shape) {
    case Circle c:
        System.out.println("The shape is Circle with area: " + Math.PI * c.radius() * c.radius());
        break;

    case Square s:
        System.out.println("The shape is Square with area: " + s.side() * s.side());
        break;

    case Rectangle r:
        System.out.println("The shape is Rectangle with area: + " + r.length() * r.width());
        break;

    default:
        System.out.println("Unknown Shape");
        break;
}
```

有了记录模式之后：

```java
Shape shape = new Circle(10);
switch(shape) {

  case Circle(double radius):
    System.out.println("The shape is Circle with area: " + Math.PI * radius * radius);
    break;

  case Square(double side):
    System.out.println("The shape is Square with area: " + side * side);
    break;

  case Rectangle(double length, double width):
    System.out.println("The shape is Rectangle with area: + " + length * width);
    break;

  default:
    System.out.println("Unknown Shape");
    break;
}
```

记录模式可以避免不必要的转换，使得代码更建简洁易读。而且，用了记录模式后不必再担心 `null` 或者 `NullPointerException`，代码更安全可靠。

记录模式在 Java 19 进行了第一次预览， 由 [JEP 405](https://openjdk.org/jeps/405) 提出。JDK 20 中是第二次预览，由 [JEP 432](https://openjdk.org/jeps/432) 提出。这次的改进包括：

- 添加对通用记录模式类型参数推断的支持，
- 添加对记录模式的支持以出现在增强语句的标题中`for`
- 删除对命名记录模式的支持。

**注意**：不要把记录模式和 [JDK16]() 正式引入的记录类搞混了。

## JEP 433：switch 模式匹配（第四次预览）

正如 `instanceof` 一样， `switch` 也紧跟着增加了类型匹配自动转换功能。

`instanceof` 代码示例：

```java
// Old code
if (o instanceof String) {
    String s = (String)o;
    ... use s ...
}

// New code
if (o instanceof String s) {
    ... use s ...
}
```

`switch` 代码示例：

```java
// Old code
static String formatter(Object o) {
    String formatted = "unknown";
    if (o instanceof Integer i) {
        formatted = String.format("int %d", i);
    } else if (o instanceof Long l) {
        formatted = String.format("long %d", l);
    } else if (o instanceof Double d) {
        formatted = String.format("double %f", d);
    } else if (o instanceof String s) {
        formatted = String.format("String %s", s);
    }
    return formatted;
}

// New code
static String formatterPatternSwitch(Object o) {
    return switch (o) {
        case Integer i -> String.format("int %d", i);
        case Long l    -> String.format("long %d", l);
        case Double d  -> String.format("double %f", d);
        case String s  -> String.format("String %s", s);
        default        -> o.toString();
    };
}
```

`switch` 模式匹配分别在 Java17、Java18、Java19 中进行了预览，Java20 是第四次预览了。每一次的预览基本都会有一些小改进，这里就不细提了。

## JEP 434: 外部函数和内存 API（第二次预览）

Java 程序可以通过该 API 与 Java 运行时之外的代码和数据进行互操作。通过高效地调用外部函数（即 JVM 之外的代码）和安全地访问外部内存（即不受 JVM 管理的内存），该 API 使 Java 程序能够调用本机库并处理本机数据，而不会像 JNI 那样危险和脆弱。

外部函数和内存 API 在 Java 17 中进行了第一轮孵化，由 [JEP 412](https://openjdk.java.net/jeps/412) 提出。Java 18 中进行了第二次孵化，由[JEP 419](https://openjdk.org/jeps/419) 提出。Java 19 中是第一次预览，由 [JEP 424](https://openjdk.org/jeps/424) 提出。

JDK 20 中是第二次预览，由 [JEP 434](https://openjdk.org/jeps/434) 提出，这次的改进包括：

- `MemorySegment` 和 `MemoryAddress` 抽象的统一
- 增强的 `MemoryLayout` 层次结构
- `MemorySession`拆分为`Arena`和`SegmentScope`，以促进跨维护边界的段共享。

在 [Java 19 新特性概览]() 中，我有详细介绍到外部函数和内存 API，这里就不再做额外的介绍了。

## JEP 436: 虚拟线程（第二次预览）

虚拟线程（Virtual Thread）是 JDK 而不是 OS 实现的轻量级线程(Lightweight Process，LWP），由 JVM 调度。许多虚拟线程共享同一个操作系统线程，虚拟线程的数量可以远大于操作系统线程的数量。

在引入虚拟线程之前，`java.lang.Thread` 包已经支持所谓的平台线程，也就是没有虚拟线程之前，我们一直使用的线程。JVM 调度程序通过平台线程（载体线程）来管理虚拟线程，一个平台线程可以在不同的时间执行不同的虚拟线程（多个虚拟线程挂载在一个平台线程上），当虚拟线程被阻塞或等待时，平台线程可以切换到执行另一个虚拟线程。

虚拟线程、平台线程和系统内核线程的关系图如下所示（图源：[How to Use Java 19 Virtual Threads](https://medium.com/javarevisited/how-to-use-java-19-virtual-threads-c16a32bad5f7)）：

<img src="images\virtual-threads-platform-threads-kernel-threads-relationship (1).png" style="zoom:80%;" />

关于平台线程和系统内核线程的对应关系多提一点：在 Windows 和 Linux 等主流操作系统中，Java 线程采用的是一对一的线程模型，也就是一个平台线程对应一个系统内核线程。Solaris 系统是一个特例，HotSpot VM 在 Solaris 上支持多对多和一对一。具体可以参考 R 大的回答: [JVM 中的线程模型是用户级的么？](https://www.zhihu.com/question/23096638/answer/29617153)。

相比较于平台线程来说，虚拟线程是廉价且轻量级的，使用完后立即被销毁，因此它们不需要被重用或池化，每个任务可以有自己专属的虚拟线程来运行。虚拟线程暂停和恢复来实现线程之间的切换，避免了上下文切换的额外耗费，兼顾了多线程的优点，简化了高并发程序的复杂，可以有效减少编写、维护和观察高吞吐量并发应用程序的工作量。

虚拟线程在其他多线程语言中已经被证实是十分有用的，比如 Go 中的 Goroutine、Erlang 中的进程。

知乎有一个关于 Java 19 虚拟线程的讨论，感兴趣的可以去看看：[https://www.zhihu.com/question/536743167](https://www.zhihu.com/question/536743167) 。

Java 虚拟线程的详细解读和原理可以看下面这几篇文章：

- [虚拟线程极简入门](https://javaguide.cn/java/concurrent/virtual-thread.html)
- [Java19 正式 GA！看虚拟线程如何大幅提高系统吞吐量](https://mp.weixin.qq.com/s/yyApBXxpXxVwttr01Hld6Q)
- [虚拟线程 - VirtualThread 源码透视](https://www.cnblogs.com/throwable/p/16758997.html)

虚拟线程在 Java 19 中进行了第一次预览，由[JEP 425](https://openjdk.org/jeps/425)提出。JDK 20 中是第二次预览，做了一些细微变化，这里就不细提了。

最后，我们来看一下四种创建虚拟线程的方法：

```java

// 1、通过 Thread.ofVirtual() 创建
Runnable fn = () -> {
  // your code here
};

Thread thread = Thread.ofVirtual(fn)
                      .start();

// 2、通过 Thread.startVirtualThread() 、创建
Thread thread = Thread.startVirtualThread(() -> {
  // your code here
});

// 3、通过 Executors.newVirtualThreadPerTaskExecutor() 创建
var executorService = Executors.newVirtualThreadPerTaskExecutor();

executorService.submit(() -> {
  // your code here
});

class CustomThread implements Runnable {
  @Override
  public void run() {
    System.out.println("CustomThread run");
  }
}

//4、通过 ThreadFactory 创建
CustomThread customThread = new CustomThread();
// 获取线程工厂类
ThreadFactory factory = Thread.ofVirtual().factory();
// 创建虚拟线程
Thread thread = factory.newThread(customThread);
// 启动线程
thread.start();
```

通过上述列举的 4 种创建虚拟线程的方式可以看出，官方为了降低虚拟线程的门槛，尽力复用原有的 `Thread` 线程类，这样可以平滑的过渡到虚拟线程的使用。

## JEP 437: 结构化并发(第二次孵化)

Java 19 引入了结构化并发，一种多线程编程方法，目的是为了通过结构化并发 API 来简化多线程编程，并不是为了取代`java.util.concurrent`，目前处于孵化器阶段。

结构化并发将不同线程中运行的多个任务视为单个工作单元，从而简化错误处理、提高可靠性并增强可观察性。也就是说，结构化并发保留了单线程代码的可读性、可维护性和可观察性。

结构化并发的基本 API 是[`StructuredTaskScope`](https://download.java.net/java/early_access/loom/docs/api/jdk.incubator.concurrent/jdk/incubator/concurrent/StructuredTaskScope.html)。`StructuredTaskScope` 支持将任务拆分为多个并发子任务，在它们自己的线程中执行，并且子任务必须在主任务继续之前完成。

`StructuredTaskScope` 的基本用法如下：

```java
 try (var scope = new StructuredTaskScope<Object>()) {
        // 使用fork方法派生线程来执行子任务
        Future<Integer> future1 = scope.fork(task1);
        Future<String> future2 = scope.fork(task2);
        // 等待线程完成
        scope.join();
        // 结果的处理可能包括处理或重新抛出异常
        ... process results/exceptions ...
    } // close
```

结构化并发非常适合虚拟线程，虚拟线程是 JDK 实现的轻量级线程。许多虚拟线程共享同一个操作系统线程，从而允许非常多的虚拟线程。

JDK 20 中对结构化并发唯一变化是更新为支持在任务范围内创建的线程`StructuredTaskScope`继承范围值 这简化了跨线程共享不可变数据，详见[JEP 429](https://openjdk.org/jeps/429)。

## JEP 432：向量 API（第五次孵化）

向量计算由对向量的一系列操作组成。向量 API 用来表达向量计算，该计算可以在运行时可靠地编译为支持的 CPU 架构上的最佳向量指令，从而实现优于等效标量计算的性能。

向量 API 的目标是为用户提供简洁易用且与平台无关的表达范围广泛的向量计算。

向量（Vector） API 最初由 [JEP 338](https://openjdk.java.net/jeps/338) 提出，并作为[孵化 API](http://openjdk.java.net/jeps/11)集成到 Java 16 中。第二轮孵化由 [JEP 414](https://openjdk.java.net/jeps/414) 提出并集成到 Java 17 中，第三轮孵化由 [JEP 417](https://openjdk.java.net/jeps/417) 提出并集成到 Java 18 中，第四轮由 [JEP 426](https://openjdk.java.net/jeps/426) 提出并集成到了 Java 19 中。

Java20 的这次孵化基本没有改变向量 API ，只是进行了一些错误修复和性能增强，详见 [JEP 438](https://openjdk.org/jeps/438)。

# Java 21 新特性概览(重要🌟)

JDK 21 于 2023 年 9 月 19 日 发布，这是一个非常重要的版本，里程碑式。

JDK21 是 LTS（长期支持版），至此为止，目前有 JDK8、JDK11、JDK17 和 JDK21 这四个长期支持版了。

JDK 21 共有 15 个新特性，这篇文章会挑选其中较为重要的一些新特性进行详细介绍：

- [JEP 430：String Templates（字符串模板）](https://openjdk.org/jeps/430)（预览）
- [JEP 431：Sequenced Collections（序列化集合）](https://openjdk.org/jeps/431)
- [JEP 439：Generational ZGC（分代 ZGC）](https://openjdk.org/jeps/439)
- [JEP 440：Record Patterns（记录模式）](https://openjdk.org/jeps/440)
- [JEP 441：Pattern Matching for switch（switch 的模式匹配）](https://openjdk.org/jeps/442)
- [JEP 442：Foreign Function & Memory API（外部函数和内存 API）](https://openjdk.org/jeps/442)（第三次预览）
- [JEP 443：Unnamed Patterns and Variables（未命名模式和变量](https://openjdk.org/jeps/443)（预览）
- [JEP 444：Virtual Threads（虚拟线程）](https://openjdk.org/jeps/444)
- [JEP 445：Unnamed Classes and Instance Main Methods（未命名类和实例 main 方法 ）](https://openjdk.org/jeps/445)（预览）

## JEP 430：字符串模板（预览）

String Templates(字符串模板) 目前仍然是 JDK 21 中的一个预览功能。

String Templates 提供了一种更简洁、更直观的方式来动态构建字符串。通过使用占位符`${}`，我们可以将变量的值直接嵌入到字符串中，而不需要手动处理。在运行时，Java 编译器会将这些占位符替换为实际的变量值。并且，表达式支持局部变量、静态/非静态字段甚至方法、计算结果等特性。

实际上，String Templates（字符串模板）再大多数编程语言中都存在:

```typescript
"Greetings {{ name }}!";  //Angular
`Greetings ${ name }!`;    //Typescript
$"Greetings { name }!"    //Visual basic
f"Greetings { name }!"    //Python
```

Java 在没有 String Templates 之前，我们通常使用字符串拼接或格式化方法来构建字符串：

```java
//concatenation
message = "Greetings " + name + "!";

//String.format()
message = String.format("Greetings %s!", name);  //concatenation

//MessageFormat
message = new MessageFormat("Greetings {0}!").format(name);

//StringBuilder
message = new StringBuilder().append("Greetings ").append(name).append("!").toString();
```

这些方法或多或少都存在一些缺点，比如难以阅读、冗长、复杂。

Java 使用 String Templates 进行字符串拼接，可以直接在字符串中嵌入表达式，而无需进行额外的处理：

```java
String message = STR."Greetings \{name}!";
```

在上面的模板表达式中：

- STR 是模板处理器。
- `\{name}`为表达式，运行时，这些表达式将被相应的变量值替换。

Java 目前支持三种模板处理器：

- STR：自动执行字符串插值，即将模板中的每个嵌入式表达式替换为其值（转换为字符串）。
- FMT：和 STR 类似，但是它还可以接受格式说明符，这些格式说明符出现在嵌入式表达式的左边，用来控制输出的样式
- RAW：不会像 STR 和 FMT 模板处理器那样自动处理字符串模板，而是返回一个 `StringTemplate` 对象，这个对象包含了模板中的文本和表达式的信息

```java
String name = "Lokesh";

//STR
String message = STR."Greetings \{name}.";

//FMT
String message = STR."Greetings %-12s\{name}.";

//RAW
StringTemplate st = RAW."Greetings \{name}.";
String message = STR.process(st);
```

除了 JDK 自带的三种模板处理器外，你还可以实现 `StringTemplate.Processor` 接口来创建自己的模板处理器。

我们可以使用局部变量、静态/非静态字段甚至方法作为嵌入表达式：

```java
//variable
message = STR."Greetings \{name}!";

//method
message = STR."Greetings \{getName()}!";

//field
message = STR."Greetings \{this.name}!";
```

还可以在表达式中执行计算并打印结果：

```java
int x = 10, y = 20;
String s = STR."\{x} + \{y} = \{x + y}";  //"10 + 20 = 30"
```

为了提高可读性，我们可以将嵌入的表达式分成多行:

```java
String time = STR."The current time is \{
    //sample comment - current time in HH:mm:ss
    DateTimeFormatter
      .ofPattern("HH:mm:ss")
      .format(LocalTime.now())
  }.";
```

## JEP431：序列化集合

JDK 21 引入了一种新的集合类型：**Sequenced Collections（序列化集合，也叫有序集合）**，这是一种具有确定出现顺序（encounter order）的集合（无论我们遍历这样的集合多少次，元素的出现顺序始终是固定的）。序列化集合提供了处理集合的第一个和最后一个元素以及反向视图（与原始集合相反的顺序）的简单方法。

Sequenced Collections 包括以下三个接口：

- [`SequencedCollection`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/SequencedCollection.html)
- [`SequencedSet`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/SequencedSet.html)
- [`SequencedMap`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/SequencedMap.html)

`SequencedCollection` 接口继承了 `Collection`接口， 提供了在集合两端访问、添加或删除元素以及获取集合的反向视图的方法。

```java
interface SequencedCollection<E> extends Collection<E> {

  // New Method

  SequencedCollection<E> reversed();

  // Promoted methods from Deque<E>

  void addFirst(E);
  void addLast(E);

  E getFirst();
  E getLast();

  E removeFirst();
  E removeLast();
}
```

`List` 和 `Deque` 接口实现了`SequencedCollection` 接口。

这里以 `ArrayList` 为例，演示一下实际使用效果：

```java
ArrayList<Integer> arrayList = new ArrayList<>();

arrayList.add(1);   // List contains: [1]

arrayList.addFirst(0);  // List contains: [0, 1]
arrayList.addLast(2);   // List contains: [0, 1, 2]

Integer firstElement = arrayList.getFirst();  // 0
Integer lastElement = arrayList.getLast();  // 2

List<Integer> reversed = arrayList.reversed();
System.out.println(reversed); // Prints [2, 1, 0]
```

`SequencedSet`接口直接继承了 `SequencedCollection` 接口并重写了 `reversed()` 方法。

```java
interface SequencedSet<E> extends SequencedCollection<E>, Set<E> {

    SequencedSet<E> reversed();
}
```

`SortedSet` 和 `LinkedHashSet` 实现了`SequencedSet`接口。

这里以 `LinkedHashSet` 为例，演示一下实际使用效果：

```java
LinkedHashSet<Integer> linkedHashSet = new LinkedHashSet<>(List.of(1, 2, 3));

Integer firstElement = linkedHashSet.getFirst();   // 1
Integer lastElement = linkedHashSet.getLast();    // 3

linkedHashSet.addFirst(0);  //List contains: [0, 1, 2, 3]
linkedHashSet.addLast(4);   //List contains: [0, 1, 2, 3, 4]

System.out.println(linkedHashSet.reversed());   //Prints [5, 3, 2, 1, 0]
```

`SequencedMap` 接口继承了 `Map`接口， 提供了在集合两端访问、添加或删除键值对、获取包含 key 的 `SequencedSet`、包含 value 的 `SequencedCollection`、包含 entry（键值对） 的 `SequencedSet`以及获取集合的反向视图的方法。

```java
interface SequencedMap<K,V> extends Map<K,V> {

  // New Methods

  SequencedMap<K,V> reversed();

  SequencedSet<K> sequencedKeySet();
  SequencedCollection<V> sequencedValues();
  SequencedSet<Entry<K,V>> sequencedEntrySet();

  V putFirst(K, V);
  V putLast(K, V);


  // Promoted Methods from NavigableMap<K, V>

  Entry<K, V> firstEntry();
  Entry<K, V> lastEntry();

  Entry<K, V> pollFirstEntry();
  Entry<K, V> pollLastEntry();
}
```

`SortedMap` 和`LinkedHashMap` 实现了`SequencedMap` 接口。

这里以 `LinkedHashMap` 为例，演示一下实际使用效果：

```java
LinkedHashMap<Integer, String> map = new LinkedHashMap<>();

map.put(1, "One");
map.put(2, "Two");
map.put(3, "Three");

map.firstEntry();   //1=One
map.lastEntry();    //3=Three

System.out.println(map);  //{1=One, 2=Two, 3=Three}

Map.Entry<Integer, String> first = map.pollFirstEntry();   //1=One
Map.Entry<Integer, String> last = map.pollLastEntry();    //3=Three

System.out.println(map);  //{2=Two}

map.putFirst(1, "One");     //{1=One, 2=Two}
map.putLast(3, "Three");    //{1=One, 2=Two, 3=Three}

System.out.println(map);  //{1=One, 2=Two, 3=Three}
System.out.println(map.reversed());   //{3=Three, 2=Two, 1=One}
```

## JEP 439：分代 ZGC

JDK21 中对 ZGC 进行了功能扩展，增加了分代 GC 功能。不过，默认是关闭的，需要通过配置打开：

```bash
// 启用分代ZGC
java -XX:+UseZGC -XX:+ZGenerational ...
```

在未来的版本中，官方会把 ZGenerational 设为默认值，即默认打开 ZGC 的分代 GC。在更晚的版本中，非分代 ZGC 就被移除。

> In a future release we intend to make Generational ZGC the default, at which point -XX:-ZGenerational will select non-generational ZGC. In an even later release we intend to remove non-generational ZGC, at which point the ZGenerational option will become obsolete.
>
> 在将来的版本中，我们打算将 Generational ZGC 作为默认选项，此时-XX:-ZGenerational 将选择非分代 ZGC。在更晚的版本中，我们打算移除非分代 ZGC，此时 ZGenerational 选项将变得过时。

分代 ZGC 可以显著减少垃圾回收过程中的停顿时间，并提高应用程序的响应性能。这对于大型 Java 应用程序和高并发场景下的性能优化非常有价值。

## JEP 440：记录模式

记录模式在 Java 19 进行了第一次预览， 由 [JEP 405](https://openjdk.org/jeps/405) 提出。JDK 20 中是第二次预览，由 [JEP 432](https://openjdk.org/jeps/432) 提出。最终，记录模式在 JDK21 顺利转正。

[Java 20 新特性概览]()已经详细介绍过记录模式，这里就不重复了。

## JEP 441：switch 的模式匹配

增强 Java 中的 switch 表达式和语句，允许在 case 标签中使用模式。当模式匹配时，执行 case 标签对应的代码。

在下面的代码中，switch 表达式使用了类型模式来进行匹配。

```java
static String formatterPatternSwitch(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("int %d", i);
        case Long l    -> String.format("long %d", l);
        case Double d  -> String.format("double %f", d);
        case String s  -> String.format("String %s", s);
        default        -> obj.toString();
    };
}
```

## JEP 442: 外部函数和内存 API（第三次预览）

Java 程序可以通过该 API 与 Java 运行时之外的代码和数据进行互操作。通过高效地调用外部函数（即 JVM 之外的代码）和安全地访问外部内存（即不受 JVM 管理的内存），该 API 使 Java 程序能够调用本机库并处理本机数据，而不会像 JNI 那样危险和脆弱。

外部函数和内存 API 在 Java 17 中进行了第一轮孵化，由 [JEP 412](https://openjdk.java.net/jeps/412) 提出。Java 18 中进行了第二次孵化，由[JEP 419](https://openjdk.org/jeps/419) 提出。Java 19 中是第一次预览，由 [JEP 424](https://openjdk.org/jeps/424) 提出。JDK 20 中是第二次预览，由 [JEP 434](https://openjdk.org/jeps/434) 提出。JDK 21 中是第三次预览，由 [JEP 442](https://openjdk.org/jeps/442) 提出。

在 [Java 19 新特性概览]() 中，我有详细介绍到外部函数和内存 API，这里就不再做额外的介绍了。

## JEP 443：未命名模式和变量（预览）

未命名模式和变量使得我们可以使用下划线 `_` 表示未命名的变量以及模式匹配时不使用的组件，旨在提高代码的可读性和可维护性。

未命名变量的典型场景是 `try-with-resources` 语句、 `catch` 子句中的异常变量和`for`循环。当变量不需要使用的时候就可以使用下划线 `_`代替，这样清晰标识未被使用的变量。

```java
try (var _ = ScopedContext.acquire()) {
  // No use of acquired resource
}
try { ... }
catch (Exception _) { ... }
catch (Throwable _) { ... }

for (int i = 0, _ = runOnce(); i < arr.length; i++) {
  ...
}
```

未命名模式是一个无条件的模式，并不绑定任何值。未命名模式变量出现在类型模式中。

```java
if (r instanceof ColoredPoint(_, Color c)) { ... c ... }

switch (b) {
    case Box(RedBall _), Box(BlueBall _) -> processBox(b);
    case Box(GreenBall _)                -> stopProcessing();
    case Box(_)                          -> pickAnotherBox();
}
```

## JEP 444：虚拟线程

虚拟线程是一项重量级的更新，一定一定要重视！

虚拟线程在 Java 19 中进行了第一次预览，由[JEP 425](https://openjdk.org/jeps/425)提出。JDK 20 中是第二次预览。最终，虚拟线程在 JDK21 顺利转正。

[Java 20 新特性概览]()已经详细介绍过虚拟线程，这里就不重复了。

## JEP 445：未命名类和实例 main 方法 （预览）

这个特性主要简化了 `main` 方法的的声明。对于 Java 初学者来说，这个 `main` 方法的声明引入了太多的 Java 语法概念，不利于初学者快速上手。

没有使用该特性之前定义一个 `main` 方法：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

使用该新特性之后定义一个 `main` 方法：

```java
class HelloWorld {
    void main() {
        System.out.println("Hello, World!");
    }
}
```

进一步精简(未命名的类允许我们不定义类名)：

```java
void main() {
   System.out.println("Hello, World!");
}
```

## 参考

- Java 21 String Templates：[https://howtodoinjava.com/java/java-string-templates/](https://howtodoinjava.com/java/java-string-templates/)
- Java 21 Sequenced Collections：https://howtodoinjava.com/java/sequenced-collections/

