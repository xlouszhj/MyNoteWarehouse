[toc]

# 反射

[反射的概述](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=191) 

赋予了我们在运行时分析类以及执行类中方法的能力

通过反射你可以获取任意一个类的所有属性和方法，你还可以调用这些方法和属性。

## 反射的优缺点

1.反射可以让我们的代码更加灵活、为各种框架提供开箱即用的功能提供了便利。

2.不过，反射让我们在运行时有了分析操作类的能力的同时，也**增加了安全问题**，比如可以无视泛型参数的安全检查（泛型参数的安全检查发生在编译时）。另外，反射的性能也要稍差点，不过，对于框架来说实际是影响不大的。

像咱们平时大部分时候都是在写业务代码，很少会接触到直接使用反射机制的场景。但是！这并不代表反射没有用。相反，正是因为反射，你才能这么轻松地使用各种框架。像 Spring/Spring Boot、MyBatis 等等**框架中都大量使用了反射机制**。

这些框架中也大量使用了动态代理，而**动态代理的实现也依赖反射**。

## 获取class对象的四种方式  ✅

[获取class对象的三种方式](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=192)

1.`Class.forName("全类名")`

2.`类名.class` 此方式获取 Class 对象不会进行初始化

3.`对象.getClass()`

4.通过类加载器`xxxClassLoader.loadClass()`传入类路径获取  通过类加载器获取 Class 对象不会进行初始化，意味着不进行包括初始化等一系列步骤，静态代码块和静态对象不会得到执行

```Java
/*
        * 获取class对象的三种方式：
        *   1. Class.forName("全类名");
        *   2. 类名.class
        *   3. 对象.getClass();
        *   4. 类加载器 xxxClassLoader.loadClass()
        * */


//1. 第一种方式
//全类名 ： 包名 + 类名
//最为常用的
Class clazz1 = Class.forName("com.itheima.myreflect1.Student");

//2. 第二种方式
//一般更多的是当做参数进行传递
Class clazz2 = Student.class;

//3.第三种方式
//当我们已经有了这个类的对象时，才可以使用。
Student s = new Student();
Class clazz3 = s.getClass();

//4.第四种方式
//类加载器 xxxClassLoader.loadClass() 传入类路径获取
ClassLoader.getSystemClassLoader().loadClass("cn.javaguide.TargetObject");

System.out.println(clazz1 == clazz2); // true
System.out.println(clazz2 == clazz3); // true
```

## 反射获取构造方法

[反射获取构造方法](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=193)

```Java
/*
        Class类中用于获取构造方法的方法
            Constructor<?>[] getConstructors()                                返回所有公共构造方法对象的数组
            Constructor<?>[] getDeclaredConstructors()                        返回所有构造方法对象的数组(包括私有、保护)
            Constructor<T> getConstructor(Class<?>... parameterTypes)         返回单个公共构造方法对象
            Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes) 返回单个构造方法对象(包括私有、保护)


        Constructor类中用于创建对象的方法
            T newInstance(Object... initargs)                                 根据指定的构造方法创建对象
            setAccessible(boolean flag)                                       设置为true,表示取消访问检查
*/

//1.获取class字节码文件对象
Class clazz = Class.forName("com.itheima.myreflect2.Student");

//2.获取构造方法
//2.1 获取所有公共构造方法对象的数组
Constructor[] cons1 = clazz.getConstructors();
for (Constructor con : cons1) {
    System.out.println(con);
}
//2.2 返回所有构造方法对象的数组(包括私有、保护)
Constructor[] cons2 = clazz.getDeclaredConstructors();
for (Constructor con : cons2) {
    System.out.println(con);
}
//2.3 返回指定的单个构造方法对象(包括私有、保护)  形参与构造方法的形参一致
Constructor con1 = clazz.getDeclaredConstructor();
System.out.println(con1);

Constructor con2 = clazz.getDeclaredConstructor(String.class);
System.out.println(con2);

Constructor con3 = clazz.getDeclaredConstructor(int.class);
System.out.println(con3);

Constructor con4 = clazz.getDeclaredConstructor(String.class,int.class);
//根据构造方法对象获取构造方法权限修饰符  返回值是整数：1、2、4、8...代表不同权限修饰符
int modifiers = con4.getModifiers();
System.out.println(modifiers);
//根据构造方法对象获取构造方法参数
Parameter[] parameters = con4.getParameters();
for (Parameter parameter : parameters) {
    System.out.println(parameter);
}
//暴力反射：表示临时取消权限校验   此时可用私有的构造方法创建对象
con4.setAccessible(true);
Student stu = (Student) con4.newInstance("张三", 23);
System.out.println(stu);
```

## 反射获取成员变量

[反射获取成员变量](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=194)

```Java
/*
       Class类中用于获取成员变量的方法
            Field[] getFields()：                返回所有公共成员变量对象的数组
            Field[] getDeclaredFields()：        返回所有成员变量对象的数组
            Field getField(String name)：        返回单个公共成员变量对象
            Field getDeclaredField(String name)：返回单个成员变量对象

       Field类中用于创建对象的方法
            void set(Object obj, Object value)：赋值
            Object get(Object obj)              获取值
*/

//1.获取class字节码文件的对象
Class clazz = Class.forName("com.itheima.myreflect3.Student");

//2.获取所有的成员变量
Field[] fields = clazz.getDeclaredFields();
for (Field field : fields) {
    System.out.println(field);
}

//获取单个的成员变量 name
Field name = clazz.getDeclaredField("name");
System.out.println(name);

//获取权限修饰符
int modifiers = name.getModifiers();
System.out.println(modifiers);

//获取成员变量的名字
String n = name.getName();
System.out.println(n);

//获取成员变量的数据类型
Class<?> type = name.getType();
System.out.println(type);

//获取成员变量记录的值
Student s = new Student("zhangsan",23,"男");
name.setAccessible(true);
String value = (String) name.get(s);
System.out.println(value); //zhangsan

//修改对象里面记录的值
name.set(s,"lisi");
System.out.println(s);
```

## 反射获取成员方法  ✅

[反射获取成员方法](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=195)

 ```Java
 /*
        Class类中用于获取成员方法的方法
             Method[] getMethods()：  返回所有公共成员方法对象的数组，包括从父类继承的
             Method[] getDeclaredMethods()：  返回所有成员方法对象的数组，不包括继承的
             Method getMethod(String name, Class<?>... parameterTypes) ：  返回单个公共成员方法对象
             Method getDeclaredMethod(String name, Class<?>... parameterTypes)：  返回单个成员方法对象
 
 
        Method类中用于创建对象的方法
             Object invoke(Object obj, Object... args)：运行方法
             参数一：用obj对象调用该方法
             参数二：调用方法的传递的参数（如果没有就不写）
             返回值：方法的返回值（如果没有就不写）
 
         获取方法的修饰符
         获取方法的名字
         获取方法的形参
         获取方法的返回值
         获取方法的抛出的异常
 
 */
 
 //1. 获取class字节码文件对象
 Class clazz = Class.forName("com.itheima.myreflect4.Student");
 
 //2. 获取里面所有的方法对象(包含父类中所有的公共方法)
 Method[] methods = clazz.getMethods();
 for (Method method : methods) {
     System.out.println(method);
 }
 
 // 获取里面所有的方法对象(不能获取父类的，但是可以获取本类中私有的方法)
 Method[] methods = clazz.getDeclaredMethods();
 for (Method method : methods) {
     System.out.println(method);
 }
 
 // 获取指定的单一方法
 Method m = clazz.getDeclaredMethod("eat", String.class);
 System.out.println(m);
 
 // 获取方法的修饰符
 int modifiers = m.getModifiers();
 System.out.println(modifiers);
 
 // 获取方法的名字
 String name = m.getName();
 System.out.println(name); // eat
 
 // 获取方法的形参
 Parameter[] parameters = m.getParameters();
 for (Parameter parameter : parameters) {
     System.out.println(parameter);
 }
 
 //获取方法的抛出的异常
 Class[] exceptionTypes = m.getExceptionTypes();
 for (Class exceptionType : exceptionTypes) {
     System.out.println(exceptionType);
 }
 
 //方法运行
 /*Method类中用于创建对象的方法
         Object invoke(Object obj, Object... args)：运行方法
         参数一：用obj对象调用该方法
         参数二：调用方法的传递的参数（如果没有就不写）
         返回值：方法的返回值（如果没有就不写）*/
 
 Student s = new Student();
 m.setAccessible(true);
 //参数一s：表示方法的调用者
 //参数二"汉堡包"：表示在调用方法的时候传递的实际参数
 String result = (String) m.invoke(s, "汉堡包");
 System.out.println(result);
 ```

## 反射的作用

1.获取一个类里面所有的信息，获取之后，再执行其他业务逻辑。

2.结合配置文件，动态的创建对象并调用方法。

### 反射的综合练习

[反射的综合练习--保存任意对象数据](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=196)

[反射的综合练习--利用反射动态的创建对象和运行方法](https://www.bilibili.com/video/BV1yW4y1Y7Ms?p=197)

# Java 代理模式 

[JavaGuide：Java 代理模式详解](https://javaguide.cn/java/basis/proxy.html) 

## 代理模式

代理模式是一种比较好理解的设计模式。简单来说就是 **我们使用代理对象来代替对真实对象(real object)的访问，这样就可以在不修改原目标对象的前提下，提供额外的功能操作，扩展目标对象的功能。** 无侵入式的给对象增加额外的功能。

**代理模式的主要作用是扩展目标对象的功能，比如说在目标对象的某个方法执行前后你可以增加一些自定义的操作。**

举个例子：新娘找来了自己的姨妈来代替自己处理新郎的提问，新娘收到的提问都是经过姨妈处理过滤之后的。姨妈在这里就可以看作是代理你的代理对象，代理的行为（方法）是接收和回复新郎的提问。

![](H:\JAVA\JAVA MD笔记\images\1_DjWCgTFm-xqbhbNQVsaWQw.png)

代理模式有静态代理和动态代理两种实现方式，我们 先来看一下静态代理模式的实现。

## 静态代理  ✅

**静态代理中，我们对目标对象的每个方法的增强都是手动完成的（后面会具体演示代码），非常不灵活（比如接口一旦新增加方法，目标对象和代理对象都要进行修改）且麻烦(需要对每个目标类都单独写一个代理类）。** 实际应用场景非常非常少，日常开发几乎看不到使用静态代理的场景。

上面我们是从实现和应用角度来说的静态代理，从 JVM 层面来说， **静态代理在编译时就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。**

静态代理实现步骤:

1. 定义一个接口及其实现类；
2. 创建一个代理类同样实现这个接口；
3. 将目标对象注入进代理类，然后在代理类的对应方法调用目标类中的对应方法。这样的话，我们就可以通过代理类屏蔽对目标对象的访问，并且可以在目标方法执行前后做一些自己想做的事情。

下面通过代码展示！

**1.定义发送短信的接口**

```java
public interface SmsService {
    String send(String message);
}
```

**2.实现发送短信的接口**

```java
public class SmsServiceImpl implements SmsService {
    public String send(String message) {
        System.out.println("send message:" + message);
        return message;
    }
}
```

**3.创建代理类并同样实现发送短信的接口**

```java
public class SmsProxy implements SmsService {

    private final SmsService smsService;

    public SmsProxy(SmsService smsService) {
        this.smsService = smsService;
    }

    @Override
    public String send(String message) {
        //调用方法之前，我们可以添加自己的操作
        System.out.println("before method send()");
        smsService.send(message);
        //调用方法之后，我们同样可以添加自己的操作
        System.out.println("after method send()");
        return null;
    }
}
```

**4.实际使用**

```java
public class Main {
    public static void main(String[] args) {
        SmsService smsService = new SmsServiceImpl();
        SmsProxy smsProxy = new SmsProxy(smsService);
        smsProxy.send("java");
    }
}
```

运行上述代码之后，控制台打印出：

```bash
before method send()
send message:java
after method send()
```

可以输出结果看出，我们已经增加了 `SmsServiceImpl` 的`send()`方法。

## 动态代理   ✅

相比于静态代理来说，动态代理**更加灵活**。我们不需要针对每个目标类都单独创建一个代理类，并且也不需要我们必须实现接口，我们可以直接代理实现类( CGLIB 动态代理机制)。

**从 JVM 角度来说，动态代理是在*运行时动态*生成类字节码，并加载到 JVM 中的。**

说到动态代理，<u>Spring AOP、RPC 框架应该是两个不得不提的，它们的实现都依赖了动态代理</u>。动态代理在我们日常开发中使用的相对较少，但是在框架中的几乎是必用的一门技术。学会了动态代理之后，对于我们理解和学习各种框架的原理也非常有帮助。

就 Java 来说，动态代理的实现方式有很多种，比如 **JDK 动态代理**、**CGLIB 动态代理**等等。

### JDK 动态代理机制 

#### 介绍

代理里面就是对象要被代理的方法。**对象**和**代理**要实现同一个**接口**，**接口中就是被代理的所有方法**。

在 Java 动态代理机制中**`InvocationHandler` 接口**和 **`Proxy` 类**是核心。

`Proxy` 类中使用频率最高的方法是：**`newProxyInstance()`** ，这个方法主要用来生成一个代理对象。

```java
public static Object newProxyInstance(ClassLoader loader,
                                      Class<?>[] interfaces,
                                      InvocationHandler h)  throws IllegalArgumentException
{
    ......
}
```

这个方法一共有 3 个参数：

1. **loader** :类加载器，用于加载代理对象。
2. **interfaces** : 被代理类实现的一些接口；
3. **h** : 实现了 `InvocationHandler` 接口的对象（即 自定义的 InvocationHandler ）；

要实现动态代理的话，还必须需要实现**`InvocationHandler`** 来自定义处理逻辑。 当我们的动态代理对象调用一个方法时，这个方法的调用就会被转发到实现`InvocationHandler` 接口的类的 `invoke` 方法来调用。

**JDK 动态代理有一个最致命的问题是其只能代理实现了接口的类**。

```Java
public interface InvocationHandler {
    /**
     * 当你使用代理对象调用方法的时候实际会调用到这个方法
     */
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
}
```

`invoke()` 方法有下面三个参数：

1. **proxy** :动态生成的代理类
2. **method** : 与代理类对象调用的方法相对应
3. **args** : 当前 method 方法的参数

也就是说：**你通过`Proxy` 类的 `newProxyInstance()` 创建的代理对象在调用方法的时候，实际会调用到实现`InvocationHandler` 接口的类的 `invoke()`方法。** 你可以在 `invoke()` 方法中自定义处理逻辑，比如在方法执行前后做什么事情。

#### 实现步骤  ✅

1. 定义一个接口及其实现类；

2. **自定义 `InvocationHandler` 并重写`invoke`方法**，在 `invoke` 方法中我们会调用原生方法（被代理类的方法）并自定义一些处理逻辑；

3. 通过 `Proxy.newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h)` 方法创建代理对象；

**1.定义发送短信的接口**

```java
public interface SmsService {
    String send(String message);  //接口中就是被代理的所有方法
}
```

**2.实现发送短信的接口(被代理的目标对象)**

```java
public class SmsServiceImpl implements SmsService {  //被代理的目标对象 要实现接口
    public String send(String message) {
        System.out.println("send message:" + message);
        return message;
    }
}
```

**3.自定义`InvocationHandler` 并重写`invoke`方法 **

```java
InvocationHandlerimport java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author shuang.kou
 * @createTime 2020年05月11日 11:23:00
 */
public class DebugInvocationHandler implements InvocationHandler {  // 自定义的 InvocationHandler
    /**
     * 代理类中的真实对象（被代理的对象）
     */
    private final Object target;
    
    public DebugInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws InvocationTargetException, IllegalAccessException {
        //调用方法之前，我们可以添加自己的操作
        System.out.println("before method " + method.getName());
        
        Object result = method.invoke(target, args);
        
        //调用方法之后，我们同样可以添加自己的操作
        System.out.println("after method " + method.getName());
        return result;
    }
}
```

`invoke()` 方法: 当我们的动态代理对象调用原生方法的时候，最终实际上调用到的是 `invoke()` 方法，然后 `invoke()` 方法代替我们去调用了被代理对象的原生方法。

**4.工厂类----用于获取代理对象**

```java
// 工厂类----用于获取代理对象
public class JdkProxyFactory {
    public static Object getProxy(Object target) {// target---被代理的目标类
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(), // 目标类的类加载器
                target.getClass().getInterfaces(),  // 代理需要实现的接口，可指定多个（这里代理就会与目标对象实现同样的接口）
                new DebugInvocationHandler(target)   // 代理对象对应的自定义 InvocationHandler
        );
    }
}
```

`getProxy()`：主要通过`Proxy.newProxyInstance（）`方法获取某个类的代理对象

**5.实际使用**

工厂类获取代理对象，代理类型强转为实现的接口类型 ------> 调用原生方法

```java
SmsService smsService = (SmsService) JdkProxyFactory.getProxy(new SmsServiceImpl());// 工厂类获取代理对象
smsService.send("java");// 代理对象调用原生方法--->实际上调用到的是 `invoke()` 方法
```

运行上述代码之后，控制台打印出：

```plain
before method send
send message:java
after method send
```

### CGLIB 动态代理机制

#### 介绍

**JDK 动态代理有一个最致命的问题是其只能代理实现了接口的类。**

**为了解决这个问题，我们可以用 CGLIB 动态代理机制来避免。**

[CGLIB](https://github.com/cglib/cglib)(Code Generation Library)是一个基于[ASM](http://www.baeldung.com/java-asm)的字节码生成库，它允许我们在运行时对字节码进行修改和动态生成。

CGLIB 通过*继承*方式实现代理：CGLIB 动态代理是通过生成一个被代理类的**子类**来拦截被代理类的方法调用，因此*不能代理声明为 final 类型的类和方法*。

很多知名的开源框架都使用到了[CGLIB](https://github.com/cglib/cglib)， 例如 ==Spring 中的 AOP 模块中：如果目标对象实现了接口，则默认采用 JDK 动态代理，否则采用 CGLIB 动态代理==。

在 CGLIB 动态代理机制中 **`MethodInterceptor` 接口**和 **`Enhancer` 类**是核心。

你需要**自定义 `MethodInterceptor` 并重写 `intercept` 方法**，`intercept` 用于拦截增强被代理类的方法。

```java
public interface MethodInterceptor extends Callback{
    // 拦截被代理类中的方法
    public Object intercept(Object obj, java.lang.reflect.Method method, Object[] args, MethodProxy proxy) throws Throwable;
}
```

1. **obj** : 被代理的对象（需要增强的对象）
2. **method** : 被拦截的方法（需要增强的方法）
3. **args** : 方法入参
4. **proxy** : 用于调用原始方法

你可以通过 `Enhancer`类来动态获取被代理类，当代理类调用方法的时候，实际调用的是 `MethodInterceptor` 中的 `intercept` 方法。

#### 实现步骤  ✅

1. 定义一个类；

2. **自定义 `MethodInterceptor` 并重写 `intercept` 方法**，`intercept` 用于拦截增强被代理类的方法，和 JDK 动态代理中的 `invoke` 方法类似；

3. 通过 `Enhancer` 类的 `create()`创建代理类；

不同于 JDK 动态代理不需要额外的依赖。[CGLIB](https://github.com/cglib/cglib)(Code Generation Library) 实际是属于一个开源项目，如果你要使用它的话，需要**手动添加相关依赖**。

```xml
<dependency>
  <groupId>cglib</groupId>
  <artifactId>cglib</artifactId>
  <version>3.3.0</version>
</dependency>
```

**1.实现一个使用阿里云发送短信的类（被代理对象）**

```java
package github.javaguide.dynamicProxy.cglibDynamicProxy;

public class AliSmsService {
    public String send(String message) {
        System.out.println("send message:" + message);
        return message;
    }
}
```

**2.自定义 `MethodInterceptor`（方法拦截器）**

```java
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * 自定义MethodInterceptor
 */
public class DebugMethodInterceptor implements MethodInterceptor { 
    /**
     * @param o           被代理的对象（需要增强的对象）
     * @param method      被拦截的方法（需要增强的方法）---用到了 反射
     * @param args        方法入参
     * @param methodProxy 用于调用原始方法
     */
    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        //调用方法之前，我们可以添加自己的操作
        System.out.println("before method " + method.getName());
        
        Object object = methodProxy.invokeSuper(o, args);
        
        //调用方法之后，我们同样可以添加自己的操作
        System.out.println("after method " + method.getName());
        return object;
    }
}
```

**3.获取代理类**

```java
import net.sf.cglib.proxy.Enhancer;

public class CglibProxyFactory {
    public static Object getProxy(Class<?> clazz) {
        // 创建动态代理增强类
        Enhancer enhancer = new Enhancer();
        // 设置类加载器
        enhancer.setClassLoader(clazz.getClassLoader());
        // 设置被代理类
        enhancer.setSuperclass(clazz);
        // 设置方法拦截器
        enhancer.setCallback(new DebugMethodInterceptor());
        // 创建代理类
        return enhancer.create();
    }
}
```

**4.实际使用**

工厂类获取代理对象，代理类型强转为被代理对象类型 ------> 调用原生方法

```java
AliSmsService aliSmsService = (AliSmsService) CglibProxyFactory.getProxy(AliSmsService.class);
aliSmsService.send("java");
```

运行上述代码之后，控制台打印出：

```bash
before method send
send message:java
after method send
```

### JDK 动态代理和 CGLIB 动态代理对比  ✅

1.**JDK 动态代理只能代理实现了接口的类或者直接代理接口，而 CGLIB 可以代理未实现任何接口的类。** 另外， **CGLIB 动态代理是通过生成一个被代理类的子类来拦截被代理类的方法调用，因此不能代理声明为 final 类型的类和方法**。

2.就二者的效率来说，大部分情况都是 JDK 动态代理更优秀，随着 JDK 版本的升级，这个优势更加明显。

## 静态代理和动态代理的对比

1. **灵活性**：**动态代理更加灵活**，不需要必须实现接口，可以直接代理实现类，并且可以不需要针对每个目标类都创建一个代理类。另外，静态代理中，接口一旦新增加方法，目标对象和代理对象都要进行修改，这是非常麻烦的！
2. **JVM 层面**：静态代理在**编译时**就将接口、实现类、代理类这些都变成了一个个实际的 class 文件。而动态代理是在**运行时动态**生成类字节码，并加载到 JVM 中的。

# SPI 机制

SPI 即 Service Provider Interface ，字面意思就是：“服务提供者的接口”

SPI 将服务接口和具体的服务实现分离开来，将服务调用方和服务实现者解耦，能够提升程序的扩展性、可维护性。修改或者替换服务实现并不需要修改调用方

很多框架都使用了 Java 的 SPI 机制，比如：Spring 框架、数据库加载驱动、日志接口、以及 Dubbo 的扩展实现等等

SPI 机制的具体实现本质上还是**通过反射完成的** 

## SPI与API区别

![SPI与API区别](H:/JAVA/JAVA MD笔记/images/SPI与API区别.png)

一般模块之间都是通过接口进行通讯，那我们在服务调用方和服务实现方（也称服务提供者）之间引入一个“接口”。

当实现方提供了接口和实现，我们可以通过调用实现方的接口从而拥有实现方给我们提供的能力，这就是 API ，这种接口和实现都是放在实现方的。

当接口存在于调用方这边时，就是 SPI ，由接口调用方确定接口规则，然后由不同的厂商去根据这个规则对这个接口进行实现，从而提供服务。

举个通俗易懂的例子：公司 H 是一家科技公司，新设计了一款芯片，然后现在需要量产了，而市面上有好几家芯片制造业公司，这个时候，只要 H 公司指定好了这芯片生产的标准（定义好了接口标准），那么这些合作的芯片公司（服务提供者）就按照标准交付自家特色的芯片（提供不同方案的实现，但是给出来的结果是一样的）

Java 中的 SPI 机制就是在每次类加载的时候会先去找到 class 相对目录下的 `META-INF` 文件夹下的 services 文件夹下的文件，将这个文件夹下面的所有文件先加载到内存中，然后根据这些文件的文件名和里面的文件内容找到相应接口的具体实现类，找到实现类后就可以通过反射去生成对应的对象，保存在一个 list 列表里面，所以可以通过迭代或者遍历的方式拿到对应的实例对象，生成不同的实现。

所以会提出一些规范要求：文件名一定要是接口的全类名，然后里面的内容一定要是实现类的全类名，实现类可以有多个，直接换行就好了，多个实现类的时候，会一个一个的迭代加载。

## 实战演示

[实战演示](https://javaguide.cn/java/basis/spi.html#%E5%AE%9E%E6%88%98%E6%BC%94%E7%A4%BA)

## ServiceLoader

[ServiceLoader](https://javaguide.cn/java/basis/spi.html#serviceloader) 

主要的流程就是：

1.通过 URL 工具类从 jar 包的 `/META-INF/services` 目录下面找到对应的文件，

2.读取这个文件的名称找到对应的 spi 接口，

3.通过 `InputStream` 流将文件里面的具体实现类的全类名读取出来，

4.根据获取到的全类名，先判断跟 spi 接口是否为同一类型，如果是的，那么就通过反射的机制构造对应的实例对象，

5.将构造出来的实例对象添加到 `Providers` 的列表中。

## SPI 的优缺点

通过 SPI 机制能够大大地提高接口设计的灵活性，但是 SPI 机制也存在一些缺点，比如：

1.需要遍历加载所有的实现类，不能做到按需加载，这样效率还是相对较低的。

2.当多个 `ServiceLoader` 同时 `load` 时，会有并发问题



# Unsafe

[Unsafe详解](https://javaguide.cn/java/basis/unsafe.html) 



