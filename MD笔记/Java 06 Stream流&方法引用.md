[toc]

# 不可变集合详解

[不可变集合详解](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=34&vd_source=6ef187124c74c452a2016ded88292617) 

不可变集合：不可以被修改的集合。定义完成后不可以修改，或者添加、删除。
## 创建不可变集合

List、Set、Map接口中，都存在 **`of `方法**可以创建不可变集合。

`List<E> List = List.of();`

 `set<E> set = Set.of(); ` 

`Map<K,V> map = Map.of(); `

三种方法的细节：
List：直接用
Set：元素不能重复
Map：元素不能重复、键值对数量最多是10个。超过10个用`ofEntries`方法，JDK版本大于10，可以用`copyof`方法。 

# Stream流

[Stream流](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=35&vd_source=6ef187124c74c452a2016ded88292617) 

## 使用步骤

### 获取Stream流

1. 先得到一个Stream流（流水线），把数据放入流水线。

```Java
/*
        单列集合      default Stream<E> stream()                           Collection中的默认方法
        双列集合      无                                                   无法直接使用stream流
        数组          public static <T> Stream<T> stream(T[] array)       Arrays工具类中的静态方法
        一堆零散数据   public static<T> Stream<T> of(T... values)          Stream接口中的静态方法
*/
// 单列集合获取Stream流
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list,"a","b","c","d","e");
Stream<String> stream1 = list.stream();
list.stream().forEach(s -> System.out.println(s));
// 双列集合获取Stream流
HashMap<String,Integer> hm = new HashMap<>();
hm.put("aaa",111);
hm.put("bbb",222);
hm.put("ccc",333);
hm.put("ddd",444);
hm.keySet().stream().forEach(s -> System.out.println(s));  // 第一种：双列集合无法直接获取，先获取单列集合，再获取Stream流
hm.entrySet().stream().forEach(s-> System.out.println(s)); // 第二种：双列集合无法直接获取，先获取单列集合，再获取Stream流
// 数组获取Stream流
int[] arr1 = {1,2,3,4,5,6,7,8,9,10};
String[] arr2 = {"a","b","c"};
Arrays.stream(arr1).forEach(s-> System.out.println(s)); // 基本数据类型
Arrays.stream(arr2).forEach(s-> System.out.println(s)); // 引用数据类型
// 零散数据获取Stream流
Stream.of(1,2,3,4,5).forEach(s-> System.out.println(s)); // 基本数据类型
Stream.of("a","b","c","d","e").forEach(s-> System.out.println(s)); // 引用数据类型
// Stream接口中静态方法of的细节
// 方法的形参是一个可变参数，可以传递一堆零散的数据，也可以传递数组
// 但是数组必须是引用数据类型的，如果传递基本数据类型，是会把整个数组当做一个元素，放到Stream当中。
Stream.of(arr1).forEach(s-> System.out.println(s)); //[I@41629346
```

### 中间方法

2. 使用**中间方法**对流水线上的数据进行操作

注意1：中间方法，返回新的Stream流，原来的Stream流**只能使用一次**，建议使用链式编程。

注意2：修改Stream流中的数据，**不会影响原来集合或者数组中的数据**。

```java
/*
    filter              过滤
    limit               获取前几个元素
    skip                跳过前几个元素
    distinct            元素去重，依赖(hashCode和equals方法)
    concat              合并a和b两个流为一个流
    map                 转换流中的数据类型
*/
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "张无忌", "周芷若", "赵敏", "张强", "张三丰", "张翠山", "张良", "王二麻子", "谢广坤");
// filter 过滤
list.stream().filter(new Predicate<String>() {
    @Override
    public boolean test(String s) {
        //如果返回值为true，表示当前数据留下
        //如果返回值为false，表示当前数据舍弃不要
        return s.startsWith("张");
	}
}).forEach(s -> System.out.println(s));

list.stream()
    .filter(s -> s.startsWith("张"))
    .filter(s -> s.length() == 3)
    .forEach(s -> System.out.println(s));
// limit 获取前几个元素
list.stream().limit(3).forEach(s -> System.out.println(s));
// skip 跳过前几个元素
list.stream().skip(4) .forEach(s -> System.out.println(s));
// limit + skip 
list.stream().limit(6).skip(3).forEach(s -> System.out.println(s));
// distinct 元素去重，依赖(hashCode和equals方法)
list1.stream().distinct().forEach(s -> System.out.println(s));
// concat 合并a和b两个流为一个流
 Stream.concat(list1.stream(),list2.stream()).forEach(s -> System.out.println(s));
// map 转换流中的数据类型
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "张无忌-15", "周芷若-14", "赵敏-13", "张强-20", "张三丰-100", "张翠山-40", "张良-35", "王二麻子-37", "谢广坤-41");
//需求：只获取里面的年龄并进行打印
list.stream().map(new Function<String, Integer>() {   // new Funcation<T,R>(){...}  函数式接口，T为输入类型，R为返回类型
    @Override
    public Integer apply(String s) {
        String[] arr = s.split("-");  // 根据"-"划分，返回数组
        String ageString = arr[1];
        int age = Integer.parseInt(ageString);
        return age;
    }
}).forEach(s-> System.out.println(s));
// 简化
list.stream()
    .map(s-> Integer.parseInt(s.split("-")[1]))
    .forEach(s-> System.out.println(s));
```

### 终结方法

3. 使用**终结方法**对流水线上的数据进行操作

注意：`collect()` 方法，如果我们要收集到Map集合当中，**键不能重复**，否则会报错；如果收集到Set集合中会**自动去重**。

```Java
/*
    void forEach(Consumer action)           遍历
    long count()                            统计
    toArray()                               收集流中的数据，放到数组中
    collect(Collector collector)            收集流中的数据，放到集合中 (List Set Map)
      注意点：如果我们要收集到Map集合当中，键不能重复，否则会报错；如果收集到Set集合中会自动去重。
*/
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "张无忌", "周芷若", "赵敏", "张强", "张三丰", "张翠山", "张良", "王二麻子", "谢广坤");
// void forEach(Consumer action)           遍历
list.stream().forEach(new Consumer<String>() {  // Consumer的泛型：表示流中数据的类型
    @Override
    public void accept(String s) {  // accept方法的形参s：依次表示流里面的每一个数据
        System.out.println(s);  // 方法体：对每一个数据的处理操作（打印）
    }
}); 
list.stream().forEach(s -> System.out.println(s));  // 简化
// long count()                            统计
long count = list.stream().count();
System.out.println(count);
// toArray()                               收集流中的数据，放到数组中
Object[] arr1 = list.stream().toArray();  // 默认的toArray()
System.out.println(Arrays.toString(arr1));
//toArray方法的参数的作用：负责创建一个指定类型的数组
//toArray方法的底层，会依次得到流里面的每一个数据，并把数据放到数组当中
//toArray方法的返回值：是一个装着流里面所有数据的数组
String[] arr = list.stream().toArray(new IntFunction<String[]>() {  // IntFunction的泛型：具体类型的数组
    @Override
    public String[] apply(int value) {  // apply的形参value:流中数据的个数，要跟数组的长度保持一致
        return new String[value];  // apply的返回值：具体类型的数组  //方法体：就是创建数组
    }
});
System.out.println(Arrays.toString(arr));
// 简化
String[] arr2 = list.stream().toArray(value -> new String[value]);  
System.out.println(Arrays.toString(arr2));
// collect(Collector collector)            收集流中的数据，放到集合中 (List Set Map)
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "张无忌-男-15", "周芷若-女-14", "赵敏-女-13", "张强-男-20","张三丰-男-100", "张翠山-男-40", "张良-男-35", "王二麻子-男-37", "谢广坤-男-41");
//收集List集合当中
//需求：我要把所有的男性收集起来
//返回的是一个ArrayList
List<String> newList1 = list.stream()   
    .filter(s -> "男".equals(s.split("-")[1]))
    .collect(Collectors.toList());
System.out.println(newList1);
//收集Set集合当中
//需求：我要把所有的男性收集起来
//返回的是一个HashSet，会自动去重
Set<String> newList2 = list.stream().filter(s -> "男".equals(s.split("-")[1]))
    .collect(Collectors.toSet());  
System.out.println(newList2);
//收集Map集合当中
//谁作为键,谁作为值.
//我要把所有的男性收集起来
//键：姓名。 值：年龄
Map<String, Integer> map = list.stream()
    .filter(s -> "男".equals(s.split("-")[1]))
    /*
    *   toMap : 参数一表示键的生成规则
    *           参数二表示值的生成规则
    * 参数一：
    *       Function泛型一：表示流中每一个数据的类型
    *               泛型二：表示Map集合中键的数据类型
    *        方法apply形参：依次表示流里面的每一个数据
    *               方法体：生成键的代码
    *               返回值：已经生成的键
    * 参数二：
    *        Function泛型一：表示流中每一个数据的类型
    *                泛型二：表示Map集合中值的数据类型
    *       方法apply形参：依次表示流里面的每一个数据
    *               方法体：生成值的代码
    *               返回值：已经生成的值
    * */
    .collect(Collectors.toMap(new Function<String, String>() {
                                @Override
                                public String apply(String s) {
                                    //张无忌-男-15
                                    return s.split("-")[0];
                                }
                            },
            new Function<String, Integer>() {
                @Override
                public Integer apply(String s) {
                return Integer.parseInt(s.split("-")[2]);}
        	}));
// 简化
Map<String, Integer> map2 = list.stream()
    .filter(s -> "男".equals(s.split("-")[1]))
    .collect(Collectors.toMap(
        s -> s.split("-")[0],
        s -> Integer.parseInt(s.split("-")[2])));
System.out.println(map2);
```

## Stream流综合练习

[Stream流综合练习](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=40&spm_id_from=pageDriver&vd_source=6ef187124c74c452a2016ded88292617) 

# 方法引用

## 方法引用概述

[方法引用概述](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=43) 

把已有的方法拿过来用，当作函数式接口中抽象方法的方法体。

**函数式接口**:  有且仅有一个抽象方法的接口叫做函数式接口，接口上方可以加@FunctionalInterface注解。

`::` 方法引用符。

方法引用要求：

1. 引用处需要是函数式接口
2. 被引用的方法需要已经存在
3. 被引用方法的形参和返回值需要跟抽象方法的形参和返回值保持一致
4. 被引用方法的功能需要满足当前的要求

```Java
//需求：创建一个数组，进行倒序排列
Integer[] arr = {3, 5, 4, 1, 6, 2};
//匿名内部类
/* Arrays.sort(arr, new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
    	return o2 - o1;
    }
});*/

//lambda表达式
//因为第二个参数的类型Comparator是一个函数式接口
/* Arrays.sort(arr, (Integer o1, Integer o2)->{
                return o2 - o1;
            });*/

//lambda表达式简化格式
//Arrays.sort(arr, (o1, o2)->o2 - o1 );

//方法引用
//1.引用处需要是函数式接口
//2.被引用的方法需要已经存在
//3.被引用方法的形参和返回值需要跟抽象方法的形参和返回值保持一致
//4.被引用方法的功能需要满足当前的要求

//表示引用FunctionDemo1类里面的subtraction方法
//把这个方法当做抽象方法的方法体
Arrays.sort(arr, FunctionDemo1::subtraction);
System.out.println(Arrays.toString(arr));
```

## 方法引用分类

[方法引用分类](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=44) 

### 引用静态方法

格式：`类名::方法名`    范例：`Integer::parseInt` 

```Java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list,"1","2","3","4","5");  // 集合中有以下数字，要求把他们都变成int类型
list.stream()
    .map(Integer::parseInt)
    .forEach(s-> System.out.println(s));
```

### 引用成员方法

格式：`对象::成员方法` 

其他类：`其他类对象::方法名`        

本类：`this::方法名`    (注意：**引用处不能是静态方法，静态中没有this和super，所以要创建一个 本类对象::方法名**)   

父类：`super::方法名`  

```Java
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list,"张无忌","周芷若","赵敏","张强","张三丰");
// 引用其他类的成员方法
StringOperation so = new StringOperation();  // 自己创建的一个类，其中有stringJudge方法
list.stream().filter(so::stringJudge)
    		.forEach(s-> System.out.println(s));
// 引用本类的和父类的成员方法
本类    this::方法名
父类    super::方法名
```

### 引用构造方法

格式：`类名::new`        范例：`Student::new` 

```Java
// 集合里面存储姓名和年龄，要求封装成Student对象并收集到List集合中
ArrayList<String> list = new ArrayList<>();
Collections.addAll(list, "张无忌,15", "周芷若,14", "赵敏,13", "张强,20", "张三丰,100", "张翠山,40", "张良,35", "王二麻子,37", "谢广坤,41");
// Student::new 引用Studentd的构造方法
List<Student> newList2 = list.stream().map(Student::new).collect(Collectors.toList());  
System.out.println(newList2);
// Student类中新加一个构造方法 即符合要求的被引用的构造方法
public Student (String str) {    
    String[] arr = str.split(",");
    this.name = arr[0];
    this.age = Integer.parseInt(arr[1]);   // 构造方法没有返回值，构造方法运行后就创造了一个对象
}
```

### 使用类名引用成员方法

格式：`类名::成员方法`        范例：`String::substring`   

[使用类名引用成员方法](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=48&vd_source=6ef187124c74c452a2016ded88292617) 

不能引用所有类中的成员方法，如果抽象方法的第一个参数是A类型的，则只能引用A类中的方法。而使用`对象::成员方法` 则可以引用所有类中的成员方法。

### 引用数组的构造方法

格式：`数据类型[]::new`        范例：`int[]::new`   数组的类型必须跟流数据的类型相同。

[引用数组的构造方法](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=49&spm_id_from=pageDriver&vd_source=6ef187124c74c452a2016ded88292617) 

### 方法引用练习

[方法引用练习](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=50&vd_source=6ef187124c74c452a2016ded88292617) 
