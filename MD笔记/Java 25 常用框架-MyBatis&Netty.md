[toc]

# MyBatis基础

## MyBatis是什么？

可以看黑马视频：[Web开发：MyBatis](https://www.bilibili.com/video/BV1m84y1w7Tb?p=116) 

摘抄自 [CSDN：mybatis是什么？为什么要用mybatis？](https://blog.csdn.net/chaizepeng/article/details/119384531) 

`MyBatis`是一款用于**持久层**的、**轻量级**的**半自动化ORM框架**，封装了所有`JDBC(Java DataBase Connectivity)`操作以及设置查询参数和获取结果集的操作，支持自定义sql、存储过程和高级映射。（**简单理解就是：用来操控数据库，在 Dao持久层的一个框架**）

这句话大体是可以总结mybatis的，对于初学者来说，当看到这句话时是否会有一些问题在你脑海中产生呢？是否有如下疑问：

持久层是什么？轻量级什么概念？ORM什么意思？jdbc是什么？高级映射又是哪些映射？

接下来，一个个的解决这些问题。

持久层是什么意思呢，可以把层字去掉，持久，也就是”保持长久“的意思，他针对的是系统中数据存在的时限，而非其他。有一个基本问题大家应该知道，在内存中的数据是不持久的，如果计算机崩溃或者其他原因导致关机，数据就会丢失，但是磁盘上的数据是持久的，因此，用在持久层也就是这个框架是用来将内存中的数据写入到磁盘中的，再具体一点，就是写到数据库中。所以，总结一下，框架用于持久层，就是说这个框架是和数据库进行交互的，用于数据库中数据操作的框架。

轻量级框架的概念可以简单的理解为所用框架开发的程序启动时占用的资源少、对业务代码的侵入性不强、比较容易配置、使用和部署简单、独立部署即可使用无需依赖另外的框架，这种就是轻量级框架，相反的就是重量级。在互联网飞速发展和产品迭代更新速度如此之快的今天，轻量级的框架更容易被接受，这也是spring胜出，EJB退出的原因。

ORM，Object Relational Mapping， 直接翻译就是对象关系映射，我也没有更好的解释，看一下百科上是这样介绍的”用于实现面向对象编程语言里不同类型系统的数据之间的转换。从效果上说，它其实是创建了一个可在编程语言里使用的“虚拟对象数据库”。面向对象是从软件工程基本原则（如耦合、聚合、封装）的基础上发展起来的，而关系数据库则是从数学理论发展而来的，两套理论存在显著的区别。为了解决这个不匹配的现象，对象关系映射技术应运而生”。这里简单的可以这样理解，java中的数据类和数据库之间的类型系统不同，因此在使用java处理数据库时，需要进行对应的类型转化，而mybatis可以做这个事，可以将java中的类型一一映射到数据库的字段类型上，因此可以将其看作是一个ORM框架。那为什么又是半自动ORM框架呢？使用mybatis，需要手动配置pojo、sql和映射关系，用户可以自定义sql，这些sql是针对于处理数据库的，但是这些sql需要接受一些查询java类型的参数，或者是返回结果集封装到java类中，这些是需要配置的，因此mybatis是一个半自动ORM框架。说到底还是因为需要写sql，才能将数据库中的数据映射到java类中，而不是直接根据java类获取到对应数据库中数据。这里多说一下，hibernate是一个全自动的ORM框架，因为只需要提供pojo和映射关系即可，后期可以直接根据pojo获取到数据。

最后就是高级映射是什么，这里可以类比数据表之间的映射关系，也就是一对一、一对多、多对多。

## MyBatis快速入门 

引入Mybatis相关依赖------------>配置Mybatis（`application.properties`：数据库连接信息）-------->编写SQL语句（注解/xml）

![image-20240416193344801](images\Mybatis入门.png)

关注两点：

- `application.properties` 里的关于MyBatis的相关配置（数据库连接信息）。
- **`Mapper接口`** 以及 相关SQL语句：Mapper接口在运行时，会自动生成该接口的实现类对象（代理对象），并把该对象交给IOC容器管理。

## 数据库连接池

- **数据库连接池**是个容器，负责分配、管理数据库连接(Connection)
- 它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个
- 释放空闲时间超过最大空闲时间的连接，来避免因为没有释放连接而引起的数据库连接遗漏

SpringBoot默认使用 `Hikari（追光者）` 连接池。

`Druid(德鲁伊)` 阿里巴巴开源的数据库连接池项目。

## lombok

![image-20240416194506650](images\lombok.png)

在 `pom.xml` 中加上依赖即可使用：

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

原理：在编译时，根据对应注解生成对应方法。

## MyBatis基础操作

### 注解方式实现

*#{} 参数占位符*

- `@Delete`： 

```java
@Delete("delete from emp where id = #{id}") // #{id} 参数占位符
public void delete(Integer id);
```

- `@Insert`：

```java
@Options(keyProperty = "id",useGeneratedKeys = true) //获取返回的主键
@Insert ("insert into emp(username,name,gender,image,job,entrydate,dept_id,create_time,update_time)"+
"values (#{username},#{name},#{gender},#{image},#{job},#{entrydate},#{deptTd},#{createTime}, #{updateTime})")
public void insert(Emp emp);
```

- `@Update` ：

```java
@Update("update emp set username=#{username},name=#{name},gender=#{gender},image=#{image},job=#{job},entrydate=#{entrydate},dept_id=#{deptTd},create_time=#{createTime},update_time=#{updateTime} where id = #{id}")
public void update(Emp emp);
```

- `@Select`：

  注意：数据库中的字段与对象中的属性名不一致会对应不上，所以要进行数据封装。

```java
@Select("select * from emp where id = #{id}")  
public Emp getById(Integer id);
```

**数据封装**：将 数据库中的字段与对象中的属性 映射上：

1. 起别名：让别名与属性一致
2. 手动结果映射：@Results及@Result进行手动结果映射
3. 开启驼峰命名（推荐）：如果字段名与属性名符合驼峰命名规则，mybatis会自动通过驼峰命名规则映射

![image-20240416202402692](images\image-20240416202402692.png)

开启驼峰命名：在`application.properties`中加上

```properties
#开启驼峰命名自动映射，即从数据库字段名 a_column 映射到 Java 属性名 aColumn。
mybatis.configuration.map-underscore-to-camel-case=true
```

条件查询：

```java
// 条件查询员工
@Select("select * from emp where name like '%${name}%' and gender = #{gender} and " +
"entrydate between #{begin} and #{end} order by update_time desc")
public List<Emp> list(String name,Short gender,LocalDate begin,LocalDate end);
```

*`${}` 变量占位符*

### xml映射文件

规范：

- XML映射文件的名称与Mapper接口名称一致，并且将XML映射文件和Mapper接口放置在相同包下（同包同名)
- XML映射文件的namespace属性为Mapper接口全限定名一致。
- XML映射文件中sql语句的id与Mapper接口中的方法名一致，并保持返回类型一致。

![image-20240416204545515](images\image-20240416204545515.png)

**MyBatisX插件**：快速开发MyBatis

## 动态SQL

动态SQL：随着用户输入或外部条件变化而变化的SQL语句。

![image-20240416210055005](images\动态SQL.png)

动态SQL标签：

- `<if>` ：用于判断条件是否成立。使用 test 属性进行条件判断，如果条件为true，则拼接SQL。如上面的代码所示。

- `<where>`：去除<if>中多余的`and`和`or`...
- `<set>`：去除<if>中多余的`,`

- `<foreach>` ：

![image-20240416210935262](images\image-20240416210935262.png)

- `<sql>` 和 `<include>`：

![image-20240416211307540](images\image-20240416211307540.png)

## 黑马 MyBatisPlus

[黑马：MybatisPlus](https://www.bilibili.com/video/BV1Xu411A7tL?p=1)  

增强Mybatis;进一步简化代码;内置了很多增删改查的方法; 

基本步骤: 引入MybatisPlus依赖代替Mybatis依赖----->定义Mapper接口继承BaseMapper

1. 单表的增删改查（直接使用`BaseMapper`的方法）

2. 常见注解

   - `@TableName`
   - `@TableId`
   - `@TableField` 

3. 常见配置 yml

4. 条件构造器：`Wrapper` 

   - `QueryWrapper`     `UpdateWrapper` 
   - `LambdaQueryWrapper`    `LambdaUpdateWrapper`

5. 自定义SQL语句 

   - 1）基于Wrapper构建where条件

     ```java
     List<Long> ids = List.of(1L,2L,4L);
     int amount = 200;
     // 1. 构建条件
     LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>().in(User::getId,ids);
     // 2. 自定义SQL方法调用
     userMapper.updateBalanceIds(wrapper,amount);
     ```

   - 2）在mapper,方法参数中用Param注解声明wrapper变量名称，必须是ew

     ```java
     void updateBalanceByIds(@Param("ew") LambdaQueryWrapper<User> wrapper,@Param("amount") in amount);
     ```

   - 3）自定义SQL,并使用Wrapper条件

     ```xml
     <update id="updateBalanceByIds">
         UPDATE tb_user SET balance = balance - #{amount} ${ew.customSqlSegment}
     </update>
     ```

6. Service接口

   - `IService`    `IServiceImpl`   同样有各种增删改查方法，底层就是调用的 `BaseMapper` 的方法
   - `IService` 开发业务：简单业务、复杂业务
   - `IService`的`Lambda`方法：`LambdaQuery()`、`LambdaUpdate()` 
   - `IService`批量插入：开启rewriteBatchedStatements=true

7. MybatisX插件：代码生成

8. 静态工具：避免循环依赖（多个Service相互调用）

   使用 `Db` 带代替相互调用的 `Service` 

   `Db` 与 `Service`一样，只是使用时多一个字节码类型参数

9. 逻辑删除  `@TableLogic`

   - yml配置
     - logic-delete-field：flag  (逻辑删除字段)
     - logic-delete-value：1 (默认逻辑已删除值)
     - logic-not-delete-value：0  (默认逻辑未删除值)

10. 枚举处理器 

    - yml 配置 

      ```yml
      mybatis-plus:
      	configuration:
      		default-enum-type-handler: com.baomidou.mybatisplus.core.handelers.MybatisEnumTypeHandler
      ```

    - 创建枚举

    - `@EnumValue` 声明枚举中的那个值写入数据库

    - 实体类相应字段改成 枚举类型

    - `@JsonValue` 声明让spring返回枚举字段时返回哪个值

11. JSON处理器

    - Json类型的字段创建一个类
    - 没有 yml 全局配置，在需要Json类型的字段上使用: `@TableField(typeHandler=JacksonTypeHandler.class)`  
    - 加上自动结果映射: `@TableName(value"user",autoResultMap=true) ` 

12. 插件功能

    - 分页插件

      - 配置类config配置 分类插件

        ```java
        @Configuration
        @MapperScan("com.yupi.springbootinit.mapper")
        public class MyBatisPlusConfig {
        
            /**
             * 拦截器配置
             *
             * @return
             */
            @Bean
            public MybatisPlusInterceptor mybatisPlusInterceptor() {
                MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
                // 分页插件
                interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
                return interceptor;
            }
        }
        ```

      - 分页条件--->分页查询

        ```java
        Page<Diagnosis> diagnosisPage = diagnosisService.page(new Page<>(current, size),getQueryWrapper(diagnosisQueryRequest));
        ```

        `getQueryWrapper(diagnosisQueryRequest)` --- 分页查询条件

        `new Page<>(current, size)` --- 当前页，每页显示条数；

    - 通用分页实体

      ```java
      @Data
      public class PageRequest {
      
          /**
           * 当前页号
           */
          private int current = 1;
      
          /**
           * 页面大小
           */
          private int pageSize = 10;
      
          /**
           * 排序字段
           */
          private String sortField;
      
          /**
           * 排序顺序（默认升序）
           */
          private String sortOrder = CommonConstant.SORT_ORDER_ASC;
      }
      ```

      要查询的类继承通用分页实体类，比如：`public class DiagnosisQueryRequest extends PageRequest implements Serializable` 



# MyBatis常见面试题总结（更新中）

> 本篇文章由 JavaGuide 收集自网络，原出处不明。
>
> 比起这些枯燥的面试题，我更建议你看看文末推荐的 MyBatis 优质好文。

## #{} 和 ${} 的区别是什么？

注：这道题是面试官面试我同事的。

答：

- `${}`是 Properties 文件中的**变量占位符**，它可以用于标签属性值和 sql 内部，属于原样文本替换，可以替换任意内容，比如${driver}会被原样替换为`com.mysql.jdbc. Driver`。

一个示例：根据参数按任意字段排序：

```sql
select * from users order by ${orderCols}
```

`orderCols`可以是 `name`、`name desc`、`name,sex asc`等，实现灵活的排序。

- `#{}`是 sql 的**参数占位符**，MyBatis 会将 sql 中的`#{}`替换为? 号，在 sql 执行前会使用 PreparedStatement 的参数设置方法，按序给 sql 的 ? 号占位符设置参数值，比如 ps.setInt(0, parameterValue)，`#{item.name}` 的取值方式为使用反射从参数对象中获取 item 对象的 name 属性值，相当于 `param.getItem().getName()`。

## xml 映射文件中，除了常见的 select、insert、update、delete 标签之外，还有哪些标签？

注：这道题是京东面试官面试我时问的。

答：还有很多其他的标签， `<resultMap>`、 `<parameterMap>`、 `<sql>`、 `<include>`、 `<selectKey>` ，加上动态 sql 的 9 个标签， `trim|where|set|foreach|if|choose|when|otherwise|bind` 等，其中 `<sql>` 为 sql 片段标签，通过 `<include>` 标签引入 sql 片段， `<selectKey>` 为不支持自增的主键生成策略标签。

## Dao 接口的工作原理是什么？Dao 接口里的方法，参数不同时，方法能重载吗？

注：这道题也是京东面试官面试我被问的。

答：最佳实践中，通常一个 xml 映射文件，都会写一个 Dao 接口与之对应。Dao 接口就是人们常说的 `Mapper` 接口，接口的全限名，就是映射文件中的 namespace 的值，接口的方法名，就是映射文件中 `MappedStatement` 的 id 值，接口方法内的参数，就是传递给 sql 的参数。 `Mapper` 接口是没有实现类的，当调用接口方法时，**接口全限名+方法名拼接字符串作为 key 值，可唯一定位一个 `MappedStatement` ，**举例：`com.mybatis3.mappers. StudentDao.findStudentById` ，可以唯一找到 namespace 为 `com.mybatis3.mappers. StudentDao` 下面 `id = findStudentById` 的 `MappedStatement` 。在 MyBatis 中，每一个 `<select>`、 `<insert>`、 `<update>`、 `<delete>` 标签，都会被解析为一个 `MappedStatement` 对象。

~~Dao 接口里的方法，是不能重载的，因为是全限名+方法名的保存和寻找策略~~。

Dao 接口里的方法**可以重载**，但是 Mybatis 的 xml 里面的 **ID 不允许重复（xml文件里只有一个）**。

Mybatis 版本 3.3.0，亲测如下：

```java
/**
 * Mapper接口里面方法重载
 */
public interface StuMapper {

 List<Student> getAllStu();

 List<Student> getAllStu(@Param("id") Integer id);
}
```

然后在 `StuMapper.xml` 中利用 Mybatis 的动态 sql 就可以实现。

```xml
<select id="getAllStu" resultType="com.pojo.Student">
  select * from student
  <where>
    <if test="id != null">
      id = #{id}
    </if>
  </where>
</select>
```

能正常运行，并能得到相应的结果，这样就实现了在 Dao 接口中写重载方法。

**Mybatis 的 Dao 接口可以有多个重载方法，但是多个接口对应的映射必须只有一个，否则启动会报错。**

相关 issue：[更正：Dao 接口里的方法可以重载，但是 Mybatis 的 xml 里面的 ID 不允许重复！](https://github.com/Snailclimb/JavaGuide/issues/1122)。

**Dao 接口的工作原理是 JDK 动态代理**，MyBatis 运行时会使用 JDK 动态代理为 Dao 接口生成代理 proxy 对象，代理对象 proxy 会拦截接口方法，转而执行 `MappedStatement` 所代表的 sql，然后将 sql 执行结果返回。

**补充**：

Dao 接口方法可以重载，但是需要满足以下条件：

1. 仅有一个**无参**方法和一个**有参**方法
2. 多个有参方法时，参数数量必须一致。且使用相同的 `@Param` ，或者使用 `param1` 这种

**测试如下**：

`PersonDao.java`

```java
Person queryById();

Person queryById(@Param("id") Long id);

Person queryById(@Param("id") Long id, @Param("name") String name);
```

`PersonMapper.xml`

```xml
<select id="queryById" resultMap="PersonMap">
    select
      id, name, age, address
    from person
    <where>
        <if test="id != null">
            id = #{id}
        </if>
        <if test="name != null and name != ''">
            name = #{name}
        </if>
    </where>
    limit 1
</select>
```

`org.apache.ibatis.scripting.xmltags. DynamicContext. ContextAccessor#getProperty` 方法用于获取 `<if>` 标签中的条件值

```java
public Object getProperty(Map context, Object target, Object name) {
  Map map = (Map) target;

  Object result = map.get(name);
  if (map.containsKey(name) || result != null) {
    return result;
  }

  Object parameterObject = map.get(PARAMETER_OBJECT_KEY);
  if (parameterObject instanceof Map) {
    return ((Map)parameterObject).get(name);
  }

  return null;
}
```

`parameterObject` 为 map，存放的是 Dao 接口中参数相关信息。

`((Map)parameterObject).get(name)` 方法如下

```java
public V get(Object key) {
  if (!super.containsKey(key)) {
    throw new BindingException("Parameter '" + key + "' not found. Available parameters are " + keySet());
  }
  return super.get(key);
}
```

1. `queryById()`方法执行时，`parameterObject`为 null，`getProperty`方法返回 null 值，`<if>`标签获取的所有条件值都为 null，所有条件不成立，动态 sql 可以正常执行。
2. `queryById(1L)`方法执行时，`parameterObject`为 map，包含了`id`和`param1`两个 key 值。当获取`<if>`标签中`name`的属性值时，进入`((Map)parameterObject).get(name)`方法中，map 中 key 不包含`name`，所以抛出异常。
3. `queryById(1L,"1")`方法执行时，`parameterObject`中包含`id`,`param1`,`name`,`param2`四个 key 值，`id`和`name`属性都可以获取到，动态 sql 正常执行。

## MyBatis 是如何进行分页的？分页插件的原理是什么？

注：我出的。

答：**(1)** MyBatis 使用 RowBounds 对象进行分页，它是针对 ResultSet 结果集执行的内存分页，而非物理分页；**(2)** 可以在 sql 内直接书写带有物理分页的参数来完成物理分页功能，**(3)** 也可以使用分页插件来完成物理分页。

分页插件的基本原理是使用 MyBatis 提供的插件接口，实现自定义插件，在插件的拦截方法内拦截待执行的 sql，然后重写 sql，根据 dialect 方言，添加对应的物理分页语句和物理分页参数。

举例：`select _ from student` ，拦截 sql 后重写为：`select t._ from （select \* from student）t limit 0，10`

## 简述 MyBatis 的插件运行原理，以及如何编写一个插件

注：我出的。

答：MyBatis 仅可以编写针对 `ParameterHandler`、 `ResultSetHandler`、 `StatementHandler`、 `Executor` 这 4 种接口的插件，MyBatis 使用 JDK 的动态代理，为需要拦截的接口生成代理对象以实现接口方法拦截功能，每当执行这 4 种接口对象的方法时，就会进入拦截方法，具体就是 `InvocationHandler` 的 `invoke()` 方法，当然，只会拦截那些你指定需要拦截的方法。

实现 MyBatis 的 `Interceptor` 接口并复写 `intercept()` 方法，然后在给插件编写注解，指定要拦截哪一个接口的哪些方法即可，记住，别忘了在配置文件中配置你编写的插件。

## MyBatis 执行批量插入，能返回数据库主键列表吗？

注：我出的。

答：能，JDBC 都能，MyBatis 当然也能。

## MyBatis 动态 sql 是做什么的？都有哪些动态 sql？能简述一下动态 sql 的执行原理不？

注：我出的。

答：MyBatis 动态 sql 可以让我们在 xml 映射文件内，以标签的形式编写动态 sql，完成逻辑判断和动态拼接 sql 的功能。其执行原理为，使用 OGNL 从 sql 参数对象中计算表达式的值，根据表达式的值动态拼接 sql，以此来完成动态 sql 的功能。

MyBatis 提供了 9 种动态 sql 标签:

- `<if></if>`
- `<where></where>(trim,set)`
- `<choose></choose>（when, otherwise）`
- `<foreach></foreach>`
- `<bind/>`

关于 MyBatis 动态 SQL 的详细介绍，请看这篇文章：[Mybatis 系列全解（八）：Mybatis 的 9 大动态 SQL 标签你知道几个？](https://segmentfault.com/a/1190000039335704) 。

关于这些动态 SQL 的具体使用方法，请看这篇文章：[Mybatis【13】-- Mybatis 动态 sql 标签怎么使用？](https://cloud.tencent.com/developer/article/1943349)

## MyBatis 是如何将 sql 执行结果封装为目标对象并返回的？都有哪些映射形式？

注：我出的。

答：第一种是使用 `<resultMap>` 标签，逐一定义列名和对象属性名之间的映射关系。第二种是使用 sql 列的别名功能，将列别名书写为对象属性名，比如 T_NAME AS NAME，对象属性名一般是 name，小写，但是列名不区分大小写，MyBatis 会忽略列名大小写，智能找到与之对应对象属性名，你甚至可以写成 T_NAME AS NaMe，MyBatis 一样可以正常工作。

有了列名与属性名的映射关系后，MyBatis 通过反射创建对象，同时使用反射给对象的属性逐一赋值并返回，那些找不到映射关系的属性，是无法完成赋值的。

## MyBatis 能执行一对一、一对多的关联查询吗？都有哪些实现方式，以及它们之间的区别

注：我出的。

答：能，MyBatis 不仅可以执行一对一、一对多的关联查询，还可以执行多对一，多对多的关联查询，多对一查询，其实就是一对一查询，只需要把 `selectOne()` 修改为 `selectList()` 即可；多对多查询，其实就是一对多查询，只需要把 `selectOne()` 修改为 `selectList()` 即可。

关联对象查询，有两种实现方式，一种是单独发送一个 sql 去查询关联对象，赋给主对象，然后返回主对象。另一种是使用嵌套查询，嵌套查询的含义为使用 join 查询，一部分列是 A 对象的属性值，另外一部分列是关联对象 B 的属性值，好处是只发一个 sql 查询，就可以把主对象和其关联对象查出来。

那么问题来了，join 查询出来 100 条记录，如何确定主对象是 5 个，而不是 100 个？其去重复的原理是 `<resultMap>` 标签内的 `<id>` 子标签，指定了唯一确定一条记录的 id 列，MyBatis 根据 `<id>` 列值来完成 100 条记录的去重复功能， `<id>` 可以有多个，代表了联合主键的语意。

同样主对象的关联对象，也是根据这个原理去重复的，尽管一般情况下，只有主对象会有重复记录，关联对象一般不会重复。

举例：下面 join 查询出来 6 条记录，一、二列是 Teacher 对象列，第三列为 Student 对象列，MyBatis 去重复处理后，结果为 1 个老师 6 个学生，而不是 6 个老师 6 个学生。

| t_id | t_name  | s_id |
| ---- | ------- | ---- |
| 1    | teacher | 38   |
| 1    | teacher | 39   |
| 1    | teacher | 40   |
| 1    | teacher | 41   |
| 1    | teacher | 42   |
| 1    | teacher | 43   |

## MyBatis 是否支持延迟加载？如果支持，它的实现原理是什么？

注：我出的。

答：MyBatis 仅支持 association 关联对象和 collection 关联集合对象的延迟加载，association 指的就是一对一，collection 指的就是一对多查询。在 MyBatis 配置文件中，可以配置是否启用延迟加载 `lazyLoadingEnabled=true|false。`

它的原理是，使用 `CGLIB` 创建目标对象的代理对象，当调用目标方法时，进入拦截器方法，比如调用 `a.getB().getName()` ，拦截器 `invoke()` 方法发现 `a.getB()` 是 null 值，那么就会单独发送事先保存好的查询关联 B 对象的 sql，把 B 查询上来，然后调用 a.setB(b)，于是 a 的对象 b 属性就有值了，接着完成 `a.getB().getName()` 方法的调用。这就是**延迟加载的基本原理**。

当然了，不光是 MyBatis，几乎所有的包括 Hibernate，支持延迟加载的原理都是一样的。

## MyBatis 的 xml 映射文件中，不同的 xml 映射文件，id 是否可以重复？

注：我出的。

答：**不同的 xml 映射文件，如果配置了 namespace，那么 id 可以重复；如果没有配置 namespace，那么 id 不能重复**；毕竟 namespace 不是必须的，只是最佳实践而已。

原因就是 **namespace+id 是作为 `Map<String, MappedStatement>` 的 key 使用的，如果没有 namespace，就剩下 id，那么，id 重复会导致数据互相覆盖**。有了 namespace，自然 id 就可以重复，namespace 不同，namespace+id 自然也就不同。

## MyBatis 中如何执行批处理？

注：我出的。

答：使用 `BatchExecutor` 完成批处理。

## MyBatis 都有哪些 Executor 执行器？它们之间的区别是什么？

注：我出的

答：MyBatis 有三种基本的 `Executor` 执行器：

- **`SimpleExecutor`：** 每执行一次 update 或 select，就开启一个 Statement 对象，用完立刻关闭 Statement 对象。
- **`ReuseExecutor`：** 执行 update 或 select，以 sql 作为 key 查找 Statement 对象，存在就使用，不存在就创建，用完后，不关闭 Statement 对象，而是放置于 Map<String, Statement>内，供下一次使用。简言之，就是重复使用 Statement 对象。
- **`BatchExecutor`**：执行 update（没有 select，JDBC 批处理不支持 select），将所有 sql 都添加到批处理中（addBatch()），等待统一执行（executeBatch()），它缓存了多个 Statement 对象，每个 Statement 对象都是 addBatch()完毕后，等待逐一执行 executeBatch()批处理。与 JDBC 批处理相同。

作用范围：`Executor` 的这些特点，都严格限制在 SqlSession 生命周期范围内。

## MyBatis 中如何指定使用哪一种 Executor 执行器？

注：我出的

答：在 MyBatis 配置文件中，可以指定默认的 `ExecutorType` 执行器类型，也可以手动给 `DefaultSqlSessionFactory` 的创建 SqlSession 的方法传递 `ExecutorType` 类型参数。

## MyBatis 是否可以映射 Enum 枚举类？

注：我出的

答：MyBatis 可以映射枚举类，不单可以映射枚举类，MyBatis 可以映射任何对象到表的一列上。映射方式为自定义一个 `TypeHandler` ，实现 `TypeHandler` 的 `setParameter()` 和 `getResult()` 接口方法。 `TypeHandler` 有两个作用：

- 一是完成从 javaType 至 jdbcType 的转换；
- 二是完成 jdbcType 至 javaType 的转换，体现为 `setParameter()` 和 `getResult()` 两个方法，分别代表设置 sql 问号占位符参数和获取列查询结果。

## MyBatis 映射文件中，如果 A 标签通过 include 引用了 B 标签的内容，请问，B 标签能否定义在 A 标签的后面，还是说必须定义在 A 标签的前面？

注：我出的

答：虽然 MyBatis 解析 xml 映射文件是按照顺序解析的，但是，**被引用的 B 标签依然可以定义在任何地方**，MyBatis 都可以正确识别。

原理是，MyBatis 解析 A 标签，发现 A 标签引用了 B 标签，但是 B 标签尚未解析到，尚不存在，此时，MyBatis 会将 A 标签标记为未解析状态，然后继续解析余下的标签，包含 B 标签，待所有标签解析完毕，MyBatis 会重新解析那些被标记为未解析的标签，此时再解析 A 标签时，B 标签已经存在，A 标签也就可以正常解析完成了。

## 简述 MyBatis 的 xml 映射文件和 MyBatis 内部数据结构之间的映射关系？

注：我出的

答：**MyBatis 将所有 xml 配置信息都封装到 All-In-One 重量级对象 Configuration 内部**。在 xml 映射文件中， `<parameterMap>` 标签会被解析为 `ParameterMap` 对象，其每个子元素会被解析为 `ParameterMapping` 对象。 `<resultMap>` 标签会被解析为 `ResultMap` 对象，其每个子元素会被解析为 `ResultMapping` 对象。每一个 `<select>、<insert>、<update>、<delete>` 标签均会被解析为 `MappedStatement` 对象，标签内的 sql 会被解析为 `BoundSql` 对象。

## 为什么说 MyBatis 是半自动 ORM 映射工具？它与全自动的区别在哪里？

注：我出的

答：Hibernate 属于全自动 ORM 映射工具，使用 Hibernate 查询关联对象或者关联集合对象时，可以根据对象关系模型直接获取，所以它是全自动的。而 MyBatis 在查询关联对象或关联集合对象时，**需要手动编写 sql 来完成**，所以，称之为半自动 ORM 映射工具。

面试题看似都很简单，但是想要能正确回答上来，必定是研究过源码且深入的人，而不是仅会使用的人或者用的很熟的人，以上所有面试题及其答案所涉及的内容，在我的 MyBatis 系列博客中都有详细讲解和原理分析。

## 文章推荐

- [2W 字全面剖析 Mybatis 中的 9 种设计模式](https://juejin.cn/post/7273516671574687759)
- [从零开始实现一个 MyBatis 加解密插件](https://mp.weixin.qq.com/s/WUEAdFDwZsZ4EKO8ix0ijg)
- [MyBatis 最全使用指南](https://juejin.cn/post/7051910683264286750)
- [脑洞打开！第一次看到这样使用 MyBatis 的，看得我一愣一愣的。](https://juejin.cn/post/7269390456530190376)
- [MyBatis 居然也有并发问题](https://juejin.cn/post/7264921613551730722)



















# Netty常见面试题总结(付费)

暂无