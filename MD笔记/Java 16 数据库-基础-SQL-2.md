# SQL常见面试题总结（3）

> 题目来源于：[牛客题霸 - SQL 进阶挑战open in new window](https://www.nowcoder.com/exam/oj?page=1&tab=SQL篇&topicId=240)

较难或者困难的题目可以根据自身实际情况和面试需要来决定是否要跳过。

## 聚合函数

### SQL 类别高难度试卷得分的截断平均值（较难）

**描述**： 牛客的运营同学想要查看大家在 SQL 类别中高难度试卷的得分情况。

请你帮她从`exam_record`数据表中计算所有用户完成 SQL 类别高难度试卷得分的截断平均值（去掉一个最大值和一个最小值后的平均值）。

示例数据：`examination_info`（`exam_id` 试卷 ID, tag 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | 算法 | medium     | 80       | 2020-08-02 10:00:00 |

示例数据：`exam_record`（uid 用户 ID, exam_id 试卷 ID, start_time 开始作答时间, submit_time 交卷时间, score 得分）

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:01 | 80     |
| 2    | 1001 | 9001    | 2021-05-02 10:01:01 | 2021-05-02 10:30:01 | 81     |
| 3    | 1001 | 9001    | 2021-06-02 19:01:01 | 2021-06-02 19:31:01 | 84     |
| 4    | 1001 | 9002    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 89     |
| 5    | 1001 | 9001    | 2021-09-02 12:01:01 | (NULL)              | (NULL) |
| 6    | 1001 | 9002    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 7    | 1002 | 9002    | 2021-02-02 19:01:01 | 2021-02-02 19:30:01 | 87     |
| 8    | 1002 | 9001    | 2021-05-05 18:01:01 | 2021-05-05 18:59:02 | 90     |
| 9    | 1003 | 9001    | 2021-09-07 12:01:01 | 2021-09-07 10:31:01 | 50     |
| 10   | 1004 | 9001    | 2021-09-06 10:01:01 | (NULL)              | (NULL) |

根据输入你的查询结果如下：

| tag  | difficulty | clip_avg_score |
| ---- | ---------- | -------------- |
| SQL  | hard       | 81.7           |

从`examination_info`表可知，试卷 9001 为高难度 SQL 试卷，该试卷被作答的得分有[80,81,84,90,50]，去除最高分和最低分后为[80,81,84]，平均分为 81.6666667，保留一位小数后为 81.7

**输入描述：**

输入数据中至少有 3 个有效分数

**思路一：** 要找出高难度 sql 试卷，肯定需要联 examination_info 这张表，然后找出高难度的课程，由 examination_info 得知，高难度 sql 的 exam_id 为 9001，那么等下就以 exam_id = 9001 作为条件去查询；

先找出 9001 号考试 `select * from exam_record where exam_id = 9001`

然后，找出最高分 `select max(score) 最高分 from exam_record where exam_id = 9001`

接着，找出最低分 `select min(score) 最低分 from exam_record where exam_id = 9001`

在查询出来的分数结果集当中，去掉最高分和最低分，最直观能想到的就是 NOT IN 或者 用 NOT EXISTS 也行，这里以 NOT IN 来做

首先将主体写出来`select tag, difficulty, round(avg(score), 1) clip_avg_score from examination_info info INNER JOIN exam_record record`

**小 tips** : MYSQL 的 `ROUND()` 函数 ,`ROUND(X)`返回参数 X 最近似的整数 `ROUND(X,D)`返回 X ,其值保留到小数点后 D 位,第 D 位的保留方式为四舍五入。

再将上面的 "碎片" 语句拼凑起来即可， 注意在 NOT IN 中两个子查询用 UNION ALL 来关联，用 union 把 max 和 min 的结果集中在一行当中，这样形成一列多行的效果。

**答案一：**

```sql
SELECT tag, difficulty, ROUND(AVG(score), 1) clip_avg_score
	FROM examination_info info  INNER JOIN exam_record record
		WHERE info.exam_id = record.exam_id
			AND  record.exam_id = 9001
				AND record.score NOT IN(
					SELECT MAX(score)
						FROM exam_record
							WHERE exam_id = 9001
								UNION ALL
					SELECT MIN(score)
						FROM exam_record
							WHERE exam_id = 9001
				)
```

这是最直观，也是最容易想到的解法，但是还有待改进，这算是投机取巧过关，其实严格按照题目要求应该这么写：

```sql
SELECT tag,
       difficulty,
       ROUND(AVG(score), 1) clip_avg_score
FROM examination_info info
INNER JOIN exam_record record
WHERE info.exam_id = record.exam_id
  AND record.exam_id =
    (SELECT examination_info.exam_id
     FROM examination_info
     WHERE tag = 'SQL'
       AND difficulty = 'hard' )
  AND record.score NOT IN
    (SELECT MAX(score)
     FROM exam_record
     WHERE exam_id =
         (SELECT examination_info.exam_id
          FROM examination_info
          WHERE tag = 'SQL'
            AND difficulty = 'hard' )
     UNION ALL SELECT MIN(score)
     FROM exam_record
     WHERE exam_id =
         (SELECT examination_info.exam_id
          FROM examination_info
          WHERE tag = 'SQL'
            AND difficulty = 'hard' ) )
```

然而你会发现，重复的语句非常多，所以可以利用`WITH`来抽取公共部分

**`WITH` 子句介绍**：

`WITH` 子句，也称为公共表表达式（Common Table Expression，CTE），是在 SQL 查询中定义临时表的方式。它可以让我们在查询中创建一个临时命名的结果集，并且可以在同一查询中引用该结果集。

基本用法：

```sql
WITH cte_name (column1, column2, ..., columnN) AS (
    -- 查询体
    SELECT ...
    FROM ...
    WHERE ...
)
-- 主查询
SELECT ...
FROM cte_name
WHERE ...
```

`WITH` 子句由以下几个部分组成：

- `cte_name`: 给临时表起一个名称，可以在主查询中引用。
- `(column1, column2, ..., columnN)`: 可选，指定临时表的列名。
- `AS`: 必需，表示开始定义临时表。
- `CTE 查询体`: 实际的查询语句，用于定义临时表中的数据。

`WITH` 子句的主要用途之一是增强查询的可读性和可维护性，尤其在涉及多个嵌套子查询或需要重复使用相同的查询逻辑时。通过将这些逻辑放在一个命名的临时表中，我们可以更清晰地组织查询，并消除重复代码。

此外，`WITH` 子句还可以在复杂的查询中实现递归查询。递归查询允许我们在单个查询中执行对同一表的多次迭代，逐步构建结果集。这在处理层次结构数据、组织结构和树状结构等场景中非常有用。

**小细节**：MySQL 5.7 版本以及之前的版本不支持在 `WITH` 子句中直接使用别名。

下面是改进后的答案：

```sql
WITH t1 AS
  (SELECT record.*,
          info.tag,
          info.difficulty
   FROM exam_record record
   INNER JOIN examination_info info ON record.exam_id = info.exam_id
   WHERE info.tag = "SQL"
     AND info.difficulty = "hard" )
SELECT tag,
       difficulty,
       ROUND(AVG(score), 1)
FROM t1
WHERE score NOT IN
    (SELECT max(score)
     FROM t1
     UNION SELECT min(score)
     FROM t1)
```

**思路二：**

- 筛选 SQL 高难度试卷：`where tag="SQL" and difficulty="hard"`

- 计算截断平均值：`(和-最大值-最小值) / (总个数-2)`：

  - `(sum(score) - max(score) - min(score)) / (count(score) - 2)`
  - 有一个缺点就是，如果最大值和最小值有多个，这个方法就很难筛选出来, 但是题目中说了----->**`去掉一个最大值和一个最小值后的平均值`**, 所以这里可以用这个公式。

**答案二：**

```sql
SELECT info.tag,
       info.difficulty,
       ROUND((SUM(record.score)- MIN(record.score)- MAX(record.score)) / (COUNT(record.score)- 2), 1) AS clip_avg_score
FROM examination_info info,
     exam_record record
WHERE info.exam_id = record.exam_id
  AND info.tag = "SQL"
  AND info.difficulty = "hard";
```

### 统计作答次数

有一个试卷作答记录表 `exam_record`，请从中统计出总作答次数 `total_pv`、试卷已完成作答数 `complete_pv`、已完成的试卷数 `complete_exam_cnt`。

示例数据 `exam_record` 表（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:01 | 80     |
| 2    | 1001 | 9001    | 2021-05-02 10:01:01 | 2021-05-02 10:30:01 | 81     |
| 3    | 1001 | 9001    | 2021-06-02 19:01:01 | 2021-06-02 19:31:01 | 84     |
| 4    | 1001 | 9002    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 89     |
| 5    | 1001 | 9001    | 2021-09-02 12:01:01 | (NULL)              | (NULL) |
| 6    | 1001 | 9002    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 7    | 1002 | 9002    | 2021-02-02 19:01:01 | 2021-02-02 19:30:01 | 87     |
| 8    | 1002 | 9001    | 2021-05-05 18:01:01 | 2021-05-05 18:59:02 | 90     |
| 9    | 1003 | 9001    | 2021-09-07 12:01:01 | 2021-09-07 10:31:01 | 50     |
| 10   | 1004 | 9001    | 2021-09-06 10:01:01 | (NULL)              | (NULL) |

示例输出：

| total_pv | complete_pv | complete_exam_cnt |
| -------- | ----------- | ----------------- |
| 11       | 7           | 2                 |

解释：表示截止当前，有 11 次试卷作答记录，已完成的作答次数为 7 次（中途退出的为未完成状态，其交卷时间和份数为 NULL），已完成的试卷有 9001 和 9002 两份。

**思路**： 这题一看到统计次数，肯定第一时间就要想到用`COUNT`这个函数来解决，问题是要统计不同的记录，该怎么来写？使用子查询就能解决这个题目(这题用 case when 也能写出来，解法类似，逻辑不同而已)；首先在做这个题之前，让我们先来了解一下`COUNT`的基本用法；

`COUNT()` 函数的基本语法如下所示：

```sql
COUNT(expression)
```

其中，`expression` 可以是列名、表达式、常量或通配符。下面是一些常见的用法示例：

1. 计算表中所有行的数量：

```sql
SELECT COUNT(*) FROM table_name;
```

2. 计算特定列非空（不为 NULL）值的数量：

```sql
SELECT COUNT(column_name) FROM table_name;
```

3. 计算满足条件的行数：

```sql
SELECT COUNT(*) FROM table_name WHERE condition;
```

4. 结合 `GROUP BY` 使用，计算分组后每个组的行数：

```sql
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name;
```

5. 计算不同列组合的唯一组合数：

```sql
SELECT COUNT(DISTINCT column_name1, column_name2) FROM table_name;
```

在使用 `COUNT()` 函数时，如果不指定任何参数或者使用 `COUNT(*)`，将会计算所有行的数量。而如果使用列名，则只会计算该列非空值的数量。

另外，`COUNT()` 函数的结果是一个整数值。即使结果是零，也不会返回 NULL，这点需要谨记。

**答案**：



```sql
SELECT
	count(*) total_pv,
	( SELECT count(*) FROM exam_record WHERE submit_time IS NOT NULL ) complete_pv,
	( SELECT COUNT( DISTINCT exam_id, score IS NOT NULL OR NULL ) FROM exam_record ) complete_exam_cnt
FROM
	exam_record
```

这里着重说一下`COUNT( DISTINCT exam_id, score IS NOT NULL OR NULL )`这一句，判断 score 是否为 null ，如果是即为真，如果不是返回 null；注意这里如果不加 `or null` 在不是 null 的情况下只会返回 false 也就是返回 0；

`COUNT`本身是不可以对多列求行数的，`distinct`的加入是的多列成为一个整体，可以求出现的行数了;`count distinct`在计算时只返回非 null 的行, 这个也要注意；

另外通过本题 get 到了------>count 加条件常用句式`count( 列判断 or null)`

### 得分不小于平均分的最低分

**描述**： 请从试卷作答记录表中找到 SQL 试卷得分不小于该类试卷平均得分的用户最低得分。

示例数据 exam_record 表（uid 用户 ID, exam_id 试卷 ID, start_time 开始作答时间, submit_time 交卷时间, score 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:01 | 80     |
| 2    | 1002 | 9001    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 89     |
| 3    | 1002 | 9002    | 2021-09-02 12:01:01 | (NULL)              | (NULL) |
| 4    | 1002 | 9003    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 5    | 1002 | 9001    | 2021-02-02 19:01:01 | 2021-02-02 19:30:01 | 87     |
| 6    | 1002 | 9002    | 2021-05-05 18:01:01 | 2021-05-05 18:59:02 | 90     |
| 7    | 1003 | 9002    | 2021-02-06 12:01:01 | (NULL)              | (NULL) |
| 8    | 1003 | 9003    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 86     |
| 9    | 1004 | 9003    | 2021-09-06 12:01:01 | (NULL)              | (NULL) |

`examination_info` 表（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | SQL  | easy       | 60       | 2020-02-01 10:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2020-08-02 10:00:00 |

示例输出数据：

| min_score_over_avg |
| ------------------ |
| 87                 |

**解释**：试卷 9001 和 9002 为 SQL 类别，作答这两份试卷的得分有[80,89,87,90]，平均分为 86.5，不小于平均分的最小分数为 87

**思路**：这类题目第一眼看确实很复杂， 因为不知道从哪入手，但是当我们仔细读题审题后，要学会抓住题干中的关键信息。以本题为例：`请从试卷作答记录表中找到SQL试卷得分不小于该类试卷平均得分的用户最低得分。`你能一眼从中提取哪些有效信息来作为解题思路？

第一条：找到==SQL==试卷得分

第二条：该类试卷==平均得分==

第三条：该类试卷的==用户最低得分==

然后中间的 “桥梁” 就是==不小于==

将条件拆分后，先逐步完成

```sql
-- 找出tag为‘SQL’的得分   【80, 89,87,90】
-- 再算出这一组的平均得分
select  ROUND(AVG(score), 1) from  examination_info info INNER JOIN exam_record record
	where info.exam_id = record.exam_id
	and tag= 'SQL'
```

然后再找出该类试卷的最低得分，接着将结果集`【80, 89,87,90】` 去和平均分数作比较，方可得出最终答案。

**答案**：

```sql
SELECT MIN(score) AS min_score_over_avg
FROM examination_info info
INNER JOIN exam_record record
WHERE info.exam_id = record.exam_id
  AND tag= 'SQL'
  AND score >=
    (SELECT ROUND(AVG(score), 1)
     FROM examination_info info
     INNER JOIN exam_record record
     WHERE info.exam_id = record.exam_id
       AND tag= 'SQL' )
```

其实这类题目给出的要求看似很 “绕”，但其实仔细梳理一遍，将大条件拆分成小条件，逐个拆分完以后，最后将所有条件拼凑起来。反正只要记住：**抓主干，理分支**，问题便迎刃而解。

## 分组查询

### 平均活跃天数和月活人数

**描述**：用户在牛客试卷作答区作答记录存储在表 `exam_record` 中，内容如下：

`exam_record` 表（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-07-02 09:01:01 | 2021-07-02 09:21:01 | 80     |
| 2    | 1002 | 9001    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 81     |
| 3    | 1002 | 9002    | 2021-09-02 12:01:01 | (NULL)              | (NULL) |
| 4    | 1002 | 9003    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 5    | 1002 | 9001    | 2021-07-02 19:01:01 | 2021-07-02 19:30:01 | 82     |
| 6    | 1002 | 9002    | 2021-07-05 18:01:01 | 2021-07-05 18:59:02 | 90     |
| 7    | 1003 | 9002    | 2021-07-06 12:01:01 | (NULL)              | (NULL) |
| 8    | 1003 | 9003    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 86     |
| 9    | 1004 | 9003    | 2021-09-06 12:01:01 | (NULL)              | (NULL) |
| 10   | 1002 | 9003    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 81     |
| 11   | 1005 | 9001    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 88     |
| 12   | 1006 | 9002    | 2021-09-02 12:11:01 | 2021-09-02 12:31:01 | 89     |
| 13   | 1007 | 9002    | 2020-09-02 12:11:01 | 2020-09-02 12:31:01 | 89     |

请计算 2021 年每个月里试卷作答区用户平均月活跃天数 `avg_active_days` 和月度活跃人数 `mau`，上面数据的示例输出如下：

| month  | avg_active_days | mau  |
| ------ | --------------- | ---- |
| 202107 | 1.50            | 2    |
| 202109 | 1.25            | 4    |

**解释**：2021 年 7 月有 2 人活跃，共活跃了 3 天（1001 活跃 1 天，1002 活跃 2 天），平均活跃天数 1.5；2021 年 9 月有 4 人活跃，共活跃了 5 天，平均活跃天数 1.25，结果保留 2 位小数。

注：此处活跃指有==交卷==行为。

**思路**：读完题先注意高亮部分；一般求天数和月活跃人数马上就要想到相关的日期函数；这一题我们同样来进行拆分，把问题细化再解决；首先求活跃人数，肯定要用到`COUNT()`，那这里首先就有一个坑，不知道大家注意了没有？用户 1002 在 9 月份做了两种不同的试卷，所以这里要注意去重，不然在统计的时候，活跃人数是错的；第二个就是要知道日期的格式化，如上表，题目要求以`202107`这种日期格式展现，要用到`DATE_FORMAT`来进行格式化。

基本用法：

```
DATE_FORMAT(date_value, format)
```

- `date_value` 参数是待格式化的日期或时间值。
- `format` 参数是指定的日期或时间格式（这个和 Java 里面的日期格式一样）。

**答案**：

```sql
SELECT DATE_FORMAT(submit_time, '%Y%m') MONTH,
                                        round(count(DISTINCT UID, DATE_FORMAT(submit_time, '%Y%m%d')) / count(DISTINCT UID), 2) avg_active_days,
                                        COUNT(DISTINCT UID) mau
FROM exam_record
WHERE YEAR (submit_time) = 2021
GROUP BY MONTH
```

这里多说一句, 使用`COUNT(DISTINCT uid, DATE_FORMAT(submit_time, '%Y%m%d'))` 可以统计在 `uid` 列和 `submit_time` 列按照年份、月份和日期进行格式化后的组合值的数量。

### 月总刷题数和日均刷题数

**描述**：现有一张题目练习记录表 `practice_record`，示例内容如下：

| id   | uid  | question_id | submit_time         | score |
| ---- | ---- | ----------- | ------------------- | ----- |
| 1    | 1001 | 8001        | 2021-08-02 11:41:01 | 60    |
| 2    | 1002 | 8001        | 2021-09-02 19:30:01 | 50    |
| 3    | 1002 | 8001        | 2021-09-02 19:20:01 | 70    |
| 4    | 1002 | 8002        | 2021-09-02 19:38:01 | 70    |
| 5    | 1003 | 8002        | 2021-08-01 19:38:01 | 80    |

请从中统计出 2021 年每个月里用户的月总刷题数 `month_q_cnt` 和日均刷题数 `avg_day_q_cnt`（按月份升序排序）以及该年的总体情况，示例数据输出如下：

| submit_month | month_q_cnt | avg_day_q_cnt |
| ------------ | ----------- | ------------- |
| 202108       | 2           | 0.065         |
| 202109       | 3           | 0.100         |
| 2021 汇总    | 5           | 0.161         |

**解释**：2021 年 8 月共有 2 次刷题记录，日均刷题数为 2/31=0.065（保留 3 位小数）；2021 年 9 月共有 3 次刷题记录，日均刷题数为 3/30=0.100；2021 年共有 5 次刷题记录（年度汇总平均无实际意义，这里我们按照 31 天来算 5/31=0.161）

> 牛客已经采用最新的 Mysql 版本，如果您运行结果出现错误：ONLY_FULL_GROUP_BY，意思是：对于 GROUP BY 聚合操作，如果在 SELECT 中的列，没有在 GROUP BY 中出现，那么这个 SQL 是不合法的，因为列不在 GROUP BY 从句中，也就是说查出来的列必须在 group by 后面出现否则就会报错，或者这个字段出现在聚合函数里面。

**思路：**

看到实例数据就要马上联想到相关的函数，比如`submit_month`就要用到`DATE_FORMAT`来格式化日期。然后查出每月的刷题数量。

每月的刷题数量

```sql
SELECT MONTH ( submit_time ), COUNT( question_id )
FROM
	practice_record
GROUP BY
	MONTH (submit_time)
```

接着第三列这里要用到`DAY(LAST_DAY(date_value))`函数来查找给定日期的月份中的天数。

示例代码如下：

```sql
SELECT DAY(LAST_DAY('2023-07-08')) AS days_in_month;
-- 输出：31

SELECT DAY(LAST_DAY('2023-02-01')) AS days_in_month;
-- 输出：28 (闰年中的二月份)

SELECT DAY(LAST_DAY(NOW())) AS days_in_current_month;
-- 输出：31 （当前月份的天数）
```

使用 `LAST_DAY()` 函数获取给定日期的当月最后一天，然后使用 `DAY()` 函数提取该日期的天数。这样就能获得指定月份的天数。

需要注意的是，`LAST_DAY()` 函数返回的是日期值，而 `DAY()` 函数用于提取日期值中的天数部分。

有了上述的分析之后，即可马上写出答案，这题复杂就复杂在处理日期上，其中的逻辑并不难。

**答案**：

```sql
SELECT DATE_FORMAT(submit_time, '%Y%m') submit_month,
       count(question_id) month_q_cnt,
       ROUND(COUNT(question_id) / DAY (LAST_DAY(submit_time)), 3) avg_day_q_cnt
FROM practice_record
WHERE DATE_FORMAT(submit_time, '%Y') = '2021'
GROUP BY submit_month
UNION ALL
SELECT '2021汇总' AS submit_month,
       count(question_id) month_q_cnt,
       ROUND(COUNT(question_id) / 31, 3) avg_day_q_cnt
FROM practice_record
WHERE DATE_FORMAT(submit_time, '%Y') = '2021'
ORDER BY submit_month
```

在实例数据输出中因为最后一行需要得出汇总数据，所以这里要 `UNION ALL`加到结果集中；别忘了最后要排序！

### 未完成试卷数大于 1 的有效用户（较难）

**描述**：现有试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分），示例数据如下：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-07-02 09:01:01 | 2021-07-02 09:21:01 | 80     |
| 2    | 1002 | 9001    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 81     |
| 3    | 1002 | 9002    | 2021-09-02 12:01:01 | (NULL)              | (NULL) |
| 4    | 1002 | 9003    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 5    | 1002 | 9001    | 2021-07-02 19:01:01 | 2021-07-02 19:30:01 | 82     |
| 6    | 1002 | 9002    | 2021-07-05 18:01:01 | 2021-07-05 18:59:02 | 90     |
| 7    | 1003 | 9002    | 2021-07-06 12:01:01 | (NULL)              | (NULL) |
| 8    | 1003 | 9003    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 86     |
| 9    | 1004 | 9003    | 2021-09-06 12:01:01 | (NULL)              | (NULL) |
| 10   | 1002 | 9003    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 81     |
| 11   | 1005 | 9001    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 88     |
| 12   | 1006 | 9002    | 2021-09-02 12:11:01 | 2021-09-02 12:31:01 | 89     |
| 13   | 1007 | 9002    | 2020-09-02 12:11:01 | 2020-09-02 12:31:01 | 89     |

还有一张试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间），示例数据如下：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | SQL  | easy       | 60       | 2020-02-01 10:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2020-08-02 10:00:00 |

请统计 2021 年每个未完成试卷作答数大于 1 的有效用户的数据（有效用户指完成试卷作答数至少为 1 且未完成数小于 5），输出用户 ID、未完成试卷作答数、完成试卷作答数、作答过的试卷 tag 集合，按未完成试卷数量由多到少排序。示例数据的输出结果如下：

| uid  | incomplete_cnt | complete_cnt | detail                                                       |
| ---- | -------------- | ------------ | ------------------------------------------------------------ |
| 1002 | 2              | 4            | 2021-09-01:算法;2021-07-02:SQL;2021-09-02:SQL;2021-09-05:SQL;2021-07-05:SQL |

**解释**：2021 年的作答记录中，除了 1004，其他用户均满足有效用户定义，但只有 1002 未完成试卷数大于 1，因此只输出 1002，detail 中是 1002 作答过的试卷{日期:tag}集合，日期和 tag 间用 **:** 连接，多元素间用 **;** 连接。

**思路：**

仔细读题后，分析出：首先要联表，因为后面要输出`tag`；

筛选出 2021 年的数据

```sql
SELECT *
FROM exam_record er
LEFT JOIN examination_info ei ON er.exam_id = ei.exam_id
WHERE YEAR (er.start_time)= 2021
```

根据 uid 进行分组，然后对每个用户进行条件进行判断，题目中要求`完成试卷数至少为1,未完成试卷数要大于1，小于5`

那么等会儿写 sql 的时候条件应该是：`未完成 > 1 and 已完成 >=1 and 未完成 < 5`

因为最后要用到字符串的拼接，而且还要组合拼接，这个可以用`GROUP_CONCAT`函数，下面简单介绍一下该函数的用法：

基本格式：

```sql
GROUP_CONCAT([DISTINCT] expr [ORDER BY {unsigned_integer | col_name | expr} [ASC | DESC] [, ...]]             [SEPARATOR sep])
```

- `expr`：要连接的列或表达式。
- `DISTINCT`：可选参数，用于去重。当指定了 `DISTINCT`，相同的值只会出现一次。
- `ORDER BY`：可选参数，用于排序连接后的值。可以选择升序 (`ASC`) 或降序 (`DESC`) 排序。
- `SEPARATOR sep`：可选参数，用于设置连接后的值的分隔符。（本题要用这个参数设置 ; 号 ）

`GROUP_CONCAT()` 函数常用于 `GROUP BY` 子句中，将一组行的值连接为一个字符串，并在结果集中以聚合的形式返回。

**答案**：

```sql
SELECT a.uid,
       SUM(CASE
               WHEN a.submit_time IS NULL THEN 1
           END) AS incomplete_cnt,
       SUM(CASE
               WHEN a.submit_time IS NOT NULL THEN 1
           END) AS complete_cnt,
       GROUP_CONCAT(DISTINCT CONCAT(DATE_FORMAT(a.start_time, '%Y-%m-%d'), ':', b.tag)
                    ORDER BY start_time SEPARATOR ";") AS detail
FROM exam_record a
LEFT JOIN examination_info b ON a.exam_id = b.exam_id
WHERE YEAR (a.start_time)= 2021
GROUP BY a.uid
HAVING incomplete_cnt > 1
AND complete_cnt >= 1
AND incomplete_cnt < 5
ORDER BY incomplete_cnt DESC
```

- `SUM(CASE WHEN a.submit_time IS NULL THEN 1 END)` 统计了每个用户未完成的记录数量。

- `SUM(CASE WHEN a.submit_time IS NOT NULL THEN 1 END)` 统计了每个用户已完成的记录数量。

- `GROUP_CONCAT(DISTINCT CONCAT(DATE_FORMAT(a.start_time, '%Y-%m-%d'), ':', b.tag) ORDER BY a.start_time SEPARATOR ';')` 将每个用户的考试日期和标签以逗号分隔的形式连接成一个字符串，并按考试开始时间进行排序。

## 嵌套子查询

### 月均完成试卷数不小于 3 的用户爱作答的类别（较难）

**描述**：现有试卷作答记录表 `exam_record`（`uid`：用户 ID, `exam_id`：试卷 ID, `start_time`：开始作答时间, `submit_time`：交卷时间，没提交的话为 NULL, `score`：得分），示例数据如下：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-07-02 09:01:01 | (NULL)              | (NULL) |
| 2    | 1002 | 9003    | 2021-09-01 12:01:01 | 2021-09-01 12:21:01 | 60     |
| 3    | 1002 | 9002    | 2021-09-02 12:01:01 | 2021-09-02 12:31:01 | 70     |
| 4    | 1002 | 9001    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 81     |
| 5    | 1002 | 9002    | 2021-07-06 12:01:01 | (NULL)              | (NULL) |
| 6    | 1003 | 9003    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 86     |
| 7    | 1003 | 9003    | 2021-09-08 12:01:01 | 2021-09-08 12:11:01 | 40     |
| 8    | 1003 | 9001    | 2021-09-08 13:01:01 | (NULL)              | (NULL) |
| 9    | 1003 | 9002    | 2021-09-08 14:01:01 | (NULL)              | (NULL) |
| 10   | 1003 | 9003    | 2021-09-08 15:01:01 | (NULL)              | (NULL) |
| 11   | 1005 | 9001    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 88     |
| 12   | 1005 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 88     |
| 13   | 1005 | 9002    | 2021-09-02 12:11:01 | 2021-09-02 12:31:01 | 89     |

试卷信息表 `examination_info`（`exam_id`：试卷 ID, `tag`：试卷类别, `difficulty`：试卷难度, `duration`：考试时长, `release_time`：发布时间），示例数据如下：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | C++  | easy       | 60       | 2020-02-01 10:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2020-08-02 10:00:00 |

请从表中统计出 “当月均完成试卷数”不小于 3 的用户们爱作答的类别及作答次数，按次数降序输出，示例输出如下：

| tag  | tag_cnt |
| ---- | ------- |
| C++  | 4       |
| SQL  | 2       |
| 算法 | 1       |

**解释**：用户 1002 和 1005 在 2021 年 09 月的完成试卷数目均为 3，其他用户均小于 3；然后用户 1002 和 1005 作答过的试卷 tag 分布结果按作答次数降序排序依次为 C++、SQL、算法。

**思路**：这题考察联合子查询，重点在于`月均回答>=3`, 但是个人认为这里没有表述清楚，应该直接说查 9 月的就容易理解多了；这里不是每个月都要>=3 或者是所有答题次数/答题月份。不要理解错误了。

先查询出哪些用户月均答题大于三次

```sql
SELECT UID
FROM exam_record record
GROUP BY UID,
         MONTH (start_time)
HAVING count(submit_time) >= 3
```

有了这一步之后再进行深入，只要能理解上一步(我的意思是不被题目中的月均所困扰)，然后再套一个子查询，查哪些用户包含其中，然后查出题目中所需的列即可。记得排序！！

```sql
SELECT tag,
       count(start_time) AS tag_cnt
FROM exam_record record
INNER JOIN examination_info info ON record.exam_id = info.exam_id
WHERE UID IN
    (SELECT UID
     FROM exam_record record
     GROUP BY UID,
              MONTH (start_time)
     HAVING count(submit_time) >= 3)
GROUP BY tag
ORDER BY tag_cnt DESC
```

### 试卷发布当天作答人数和平均分

**描述**：现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间），示例数据如下：

| id   | uid  | nick_name | achievement | level | job  | register_time       |
| ---- | ---- | --------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号 | 3100        | 7     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号 | 2100        | 6     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 | 1500        | 5     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号 | 1100        | 4     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 5 号 | 1600        | 6     | C++  | 2020-01-01 10:00:00 |
| 6    | 1006 | 牛客 6 号 | 3000        | 6     | C++  | 2020-01-01 10:00:00 |

**释义**：用户 1001 昵称为牛客 1 号，成就值为 3100，用户等级是 7 级，职业方向为算法，注册时间 2020-01-01 10:00:00

试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间） 示例数据如下：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2021-09-01 06:00:00 |
| 2    | 9002    | C++  | easy       | 60       | 2020-02-01 10:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2020-08-02 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分） 示例数据如下：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-07-02 09:01:01 | 2021-09-01 09:41:01 | 70     |
| 2    | 1002 | 9003    | 2021-09-01 12:01:01 | 2021-09-01 12:21:01 | 60     |
| 3    | 1002 | 9002    | 2021-09-02 12:01:01 | 2021-09-02 12:31:01 | 70     |
| 4    | 1002 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | 80     |
| 5    | 1002 | 9003    | 2021-08-01 12:01:01 | 2021-08-01 12:21:01 | 60     |
| 6    | 1002 | 9002    | 2021-08-02 12:01:01 | 2021-08-02 12:31:01 | 70     |
| 7    | 1002 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | 85     |
| 8    | 1002 | 9002    | 2021-07-06 12:01:01 | (NULL)              | (NULL) |
| 9    | 1003 | 9002    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 86     |
| 10   | 1003 | 9003    | 2021-09-08 12:01:01 | 2021-09-08 12:11:01 | 40     |
| 11   | 1003 | 9003    | 2021-09-01 13:01:01 | 2021-09-01 13:41:01 | 70     |
| 12   | 1003 | 9001    | 2021-09-08 14:01:01 | (NULL)              | (NULL) |
| 13   | 1003 | 9002    | 2021-09-08 15:01:01 | (NULL)              | (NULL) |
| 14   | 1005 | 9001    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 90     |
| 15   | 1005 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 88     |
| 16   | 1005 | 9002    | 2021-09-02 12:11:01 | 2021-09-02 12:31:01 | 89     |

请计算每张 SQL 类别试卷发布后，当天 5 级以上的用户作答的人数 `uv` 和平均分 `avg_score`，按人数降序，相同人数的按平均分升序，示例数据结果输出如下：

| exam_id | uv   | avg_score |
| ------- | ---- | --------- |
| 9001    | 3    | 81.3      |

解释：只有一张 SQL 类别的试卷，试卷 ID 为 9001，发布当天（2021-09-01）有 1001、1002、1003、1005 作答过，但是 1003 是 5 级用户，其他 3 位为 5 级以上，他们三的得分有[70,80,85,90]，平均分为 81.3（保留 1 位小数）。

**思路**：这题看似很复杂，但是先逐步将“外边”条件拆分，然后合拢到一起，答案就出来，多表查询反正记住：由外向里，抽丝剥茧。

先把三种表连起来，同时给定一些条件，比如题目中要求`等级> 5`的用户，那么可以先查出来

```sql
SELECT DISTINCT u_info.uid
FROM examination_info e_info
INNER JOIN exam_record record
INNER JOIN user_info u_info
WHERE e_info.exam_id = record.exam_id
  AND u_info.uid = record.uid
  AND u_info.LEVEL > 5
```

接着注意题目中要求：`每张sql类别试卷发布后，当天作答用户`，注意其中的==当天==，那我们马上就要想到要用到时间的比较。

对试卷发布日期和开始考试日期进行比较：`DATE(e_info.release_time) = DATE(record.start_time)`；不用担心`submit_time` 为 null 的问题，后续在 where 中会给过滤掉。

**答案**：

```sql
SELECT record.exam_id AS exam_id,
       COUNT(DISTINCT u_info.uid) AS uv,
       ROUND(SUM(record.score) / COUNT(u_info.uid), 1) AS avg_score
FROM examination_info e_info
INNER JOIN exam_record record
INNER JOIN user_info u_info
WHERE e_info.exam_id = record.exam_id
  AND u_info.uid = record.uid
  AND DATE (e_info.release_time) = DATE (record.start_time)
  AND submit_time IS NOT NULL
  AND tag = 'SQL'
  AND u_info.LEVEL > 5
GROUP BY record.exam_id
ORDER BY uv DESC,
         avg_score ASC
```

注意最后的分组排序！先按人数排，若一致，按平均分排。

### 作答试卷得分大于过 80 的人的用户等级分布

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name | achievement | level | job  | register_time       |
| ---- | ---- | --------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号 | 3100        | 7     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号 | 2100        | 6     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 | 1500        | 5     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号 | 1100        | 4     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 5 号 | 1600        | 6     | C++  | 2020-01-01 10:00:00 |
| 6    | 1006 | 牛客 6 号 | 3000        | 6     | C++  | 2020-01-01 10:00:00 |

试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2021-09-01 06:00:00 |
| 2    | 9002    | C++  | easy       | 60       | 2021-09-01 06:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2021-09-01 10:00:00 |

试卷作答信息表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:41:01 | 79     |
| 2    | 1002 | 9003    | 2021-09-01 12:01:01 | 2021-09-01 12:21:01 | 60     |
| 3    | 1002 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 70     |
| 4    | 1002 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | 80     |
| 5    | 1002 | 9003    | 2021-08-01 12:01:01 | 2021-08-01 12:21:01 | 60     |
| 6    | 1002 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 70     |
| 7    | 1002 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | 85     |
| 8    | 1002 | 9002    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 9    | 1003 | 9002    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 86     |
| 10   | 1003 | 9003    | 2021-09-08 12:01:01 | 2021-09-08 12:11:01 | 40     |
| 11   | 1003 | 9003    | 2021-09-01 13:01:01 | 2021-09-01 13:41:01 | 81     |
| 12   | 1003 | 9001    | 2021-09-01 14:01:01 | (NULL)              | (NULL) |
| 13   | 1003 | 9002    | 2021-09-08 15:01:01 | (NULL)              | (NULL) |
| 14   | 1005 | 9001    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 90     |
| 15   | 1005 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 88     |
| 16   | 1005 | 9002    | 2021-09-02 12:11:01 | 2021-09-02 12:31:01 | 89     |

统计作答 SQL 类别的试卷得分大于过 80 的人的用户等级分布，按数量降序排序（保证数量都不同）。示例数据结果输出如下：

| level | level_cnt |
| ----- | --------- |
| 6     | 2         |
| 5     | 1         |

解释：9001 为 SQL 类试卷，作答该试卷大于 80 分的人有 1002、1003、1005 共 3 人，6 级两人，5 级一人。

**思路：**这题和上一题都是一样的数据，只是查询条件改变了而已，上一题理解了，这题分分钟做出来。

**答案**：

```sql
SELECT u_info.LEVEL AS LEVEL,
       count(u_info.uid) AS level_cnt
FROM examination_info e_info
INNER JOIN exam_record record
INNER JOIN user_info u_info
WHERE e_info.exam_id = record.exam_id
  AND u_info.uid = record.uid
  AND record.score > 80
  AND submit_time IS NOT NULL
  AND tag = 'SQL'
GROUP BY LEVEL
ORDER BY level_cnt DESC
```

## 合并查询

### 每个题目和每份试卷被作答的人数和次数

**描述**：

现有试卷作答记录表 exam_record（uid 用户 ID, exam_id 试卷 ID, start_time 开始作答时间, submit_time 交卷时间, score 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:41:01 | 81     |
| 2    | 1002 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 70     |
| 3    | 1002 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | 80     |
| 4    | 1002 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 70     |
| 5    | 1004 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | 85     |
| 6    | 1002 | 9002    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |

题目练习表 practice_record（uid 用户 ID, question_id 题目 ID, submit_time 提交时间, score 得分）：

| id   | uid  | question_id | submit_time         | score |
| ---- | ---- | ----------- | ------------------- | ----- |
| 1    | 1001 | 8001        | 2021-08-02 11:41:01 | 60    |
| 2    | 1002 | 8001        | 2021-09-02 19:30:01 | 50    |
| 3    | 1002 | 8001        | 2021-09-02 19:20:01 | 70    |
| 4    | 1002 | 8002        | 2021-09-02 19:38:01 | 70    |
| 5    | 1003 | 8001        | 2021-08-02 19:38:01 | 70    |
| 6    | 1003 | 8001        | 2021-08-02 19:48:01 | 90    |
| 7    | 1003 | 8002        | 2021-08-01 19:38:01 | 80    |

请统计每个题目和每份试卷被作答的人数和次数，分别按照"试卷"和"题目"的 uv & pv 降序显示，示例数据结果输出如下：

| tid  | uv   | pv   |
| ---- | ---- | ---- |
| 9001 | 3    | 3    |
| 9002 | 1    | 3    |
| 8001 | 3    | 5    |
| 8002 | 2    | 2    |

**解释**：“试卷”有 3 人共练习 3 次试卷 9001，1 人作答 3 次 9002；“刷题”有 3 人刷 5 次 8001，有 2 人刷 2 次 8002

**思路**：这题的难点和易错点在于`UNION`和`ORDER BY` 同时使用的问题

有以下几种情况：使用`union`和多个`order by`不加括号，报错！

`order by`在`union`连接的子句中不起作用；

比如不加括号：

```sql
SELECT exam_id AS tid,
       COUNT(DISTINCT UID) AS uv,
       COUNT(UID) AS pv
FROM exam_record
GROUP BY exam_id
ORDER BY uv DESC,
         pv DESC
UNION
SELECT question_id AS tid,
       COUNT(DISTINCT UID) AS uv,
       COUNT(UID) AS pv
FROM practice_record
GROUP BY question_id
ORDER BY uv DESC,
         pv DESC
```

直接报语法错误，如果没有括号，只能有一个`order by`

还有一种`order by`不起作用的情况，但是能在子句的子句中起作用，这里的解决方案就是在外面再套一层查询。

**答案**：

```sql
SELECT *
FROM
  (SELECT exam_id AS tid,
          COUNT(DISTINCT exam_record.uid) uv,
          COUNT(*) pv
   FROM exam_record
   GROUP BY exam_id
   ORDER BY uv DESC, pv DESC) t1
UNION
SELECT *
FROM
  (SELECT question_id AS tid,
          COUNT(DISTINCT practice_record.uid) uv,
          COUNT(*) pv
   FROM practice_record
   GROUP BY question_id
   ORDER BY uv DESC, pv DESC) t2;
```

### 分别满足两个活动的人

**描述**： 为了促进更多用户在牛客平台学习和刷题进步，我们会经常给一些既活跃又表现不错的用户发放福利。假使以前我们有两拨运营活动，分别给每次试卷得分都能到 85 分的人（activity1）、至少有一次用了一半时间就完成高难度试卷且分数大于 80 的人（activity2）发了福利券。

现在，需要你一次性将这两个活动满足的人筛选出来，交给运营同学。请写出一个 SQL 实现：输出 2021 年里，所有每次试卷得分都能到 85 分的人以及至少有一次用了一半时间就完成高难度试卷且分数大于 80 的人的 id 和活动号，按用户 ID 排序输出。

现有试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2021-09-01 06:00:00 |
| 2    | 9002    | C++  | easy       | 60       | 2021-09-01 06:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2021-09-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:31:00 | 81     |
| 2    | 1002 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 70     |
| 3    | 1003 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | **86** |
| 4    | 1003 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 89     |
| 5    | 1004 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:30:01 | 85     |

示例数据输出结果：

| uid  | activity  |
| ---- | --------- |
| 1001 | activity2 |
| 1003 | activity1 |
| 1004 | activity1 |
| 1004 | activity2 |

**解释**：用户 1001 最小分数 81 不满足活动 1，但 29 分 59 秒完成了 60 分钟长的试卷得分 81，满足活动 2；1003 最小分数 86 满足活动 1，完成时长都大于试卷时长的一半，不满足活动 2；用户 1004 刚好用了一半时间（30 分钟整）完成了试卷得分 85，满足活动 1 和活动 2。

**思路**： 这一题需要涉及到时间的减法，需要用到 `TIMESTAMPDIFF()` 函数计算两个时间戳之间的分钟差值。

下面我们来看一下基本用法

示例：

```sql
TIMESTAMPDIFF(MINUTE, start_time, end_time)
```

`TIMESTAMPDIFF()` 函数的第一个参数是时间单位，这里我们选择 `MINUTE` 表示返回分钟差值。第二个参数是较早的时间戳，第三个参数是较晚的时间戳。函数会返回它们之间的分钟差值

了解了这个函数的用法之后，我们再回过头来看`activity1`的要求，求分数大于 85 即可，那我们还是先把这个写出来，后续思路就会清晰很多

```sql
SELECT DISTINCT UID
FROM exam_record
WHERE score >= 85
  AND YEAR (start_time) = '2021'
```

根据条件 2，接着写出`在一半时间内完成高难度试卷且分数大于80的人`

```sql
SELECT UID
FROM examination_info info
INNER JOIN exam_record record
WHERE info.exam_id = record.exam_id
  AND (TIMESTAMPDIFF(MINUTE, start_time, submit_time)) < (info.duration / 2)
  AND difficulty = 'hard'
  AND score >= 80
```

然后再把两者`UNION` 起来即可。（这里特别要注意括号问题和`order by`位置，具体用法在上一篇中已提及）

**答案**：

```sql
SELECT DISTINCT UID UID,
                    'activity1' activity
FROM exam_record
WHERE UID not in
    (SELECT UID
     FROM exam_record
     WHERE score<85
       AND YEAR(submit_time) = 2021 )
UNION
SELECT DISTINCT UID UID,
                    'activity2' activity
FROM exam_record e_r
LEFT JOIN examination_info e_i ON e_r.exam_id = e_i.exam_id
WHERE YEAR(submit_time) = 2021
  AND difficulty = 'hard'
  AND TIMESTAMPDIFF(SECOND, start_time, submit_time) <= duration *30
  AND score>80
ORDER BY UID
```

## 连接查询

### 满足条件的用户的试卷完成数和题目练习数（困难）

**描述**：

现有用户信息表 user_info（uid 用户 ID，nick_name 昵称, achievement 成就值, level 等级, job 职业方向, register_time 注册时间）：

| id   | uid  | nick_name | achievement | level | job  | register_time       |
| ---- | ---- | --------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号 | 3100        | 7     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号 | 2300        | 7     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 | 2500        | 7     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号 | 1200        | 5     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 5 号 | 1600        | 6     | C++  | 2020-01-01 10:00:00 |
| 6    | 1006 | 牛客 6 号 | 2000        | 6     | C++  | 2020-01-01 10:00:00 |

试卷信息表 examination_info（exam_id 试卷 ID, tag 试卷类别, difficulty 试卷难度, duration 考试时长, release_time 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2021-09-01 06:00:00 |
| 2    | 9002    | C++  | hard       | 60       | 2021-09-01 06:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2021-09-01 10:00:00 |

试卷作答记录表 exam_record（uid 用户 ID, exam_id 试卷 ID, start_time 开始作答时间, submit_time 交卷时间, score 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score |
| ---- | ---- | ------- | ------------------- | ------------------- | ----- |
| 1    | 1001 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:31:00 | 81    |
| 2    | 1002 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 81    |
| 3    | 1003 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | 86    |
| 4    | 1003 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:51 | 89    |
| 5    | 1004 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:30:01 | 85    |
| 6    | 1005 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:02 | 85    |
| 7    | 1006 | 9003    | 2021-09-07 10:01:01 | 2021-09-07 10:21:01 | 84    |
| 8    | 1006 | 9001    | 2021-09-07 10:01:01 | 2021-09-07 10:21:01 | 80    |

题目练习记录表 practice_record（uid 用户 ID, question_id 题目 ID, submit_time 提交时间, score 得分）：

| id   | uid  | question_id | submit_time         | score |
| ---- | ---- | ----------- | ------------------- | ----- |
| 1    | 1001 | 8001        | 2021-08-02 11:41:01 | 60    |
| 2    | 1002 | 8001        | 2021-09-02 19:30:01 | 50    |
| 3    | 1002 | 8001        | 2021-09-02 19:20:01 | 70    |
| 4    | 1002 | 8002        | 2021-09-02 19:38:01 | 70    |
| 5    | 1004 | 8001        | 2021-08-02 19:38:01 | 70    |
| 6    | 1004 | 8002        | 2021-08-02 19:48:01 | 90    |
| 7    | 1001 | 8002        | 2021-08-02 19:38:01 | 70    |
| 8    | 1004 | 8002        | 2021-08-02 19:48:01 | 90    |
| 9    | 1004 | 8002        | 2021-08-02 19:58:01 | 94    |
| 10   | 1004 | 8003        | 2021-08-02 19:38:01 | 70    |
| 11   | 1004 | 8003        | 2021-08-02 19:48:01 | 90    |
| 12   | 1004 | 8003        | 2021-08-01 19:38:01 | 80    |

请你找到高难度 SQL 试卷得分平均值大于 80 并且是 7 级的红名大佬，统计他们的 2021 年试卷总完成次数和题目总练习次数，只保留 2021 年有试卷完成记录的用户。结果按试卷完成数升序，按题目练习数降序。

示例数据输出如下：

| uid  | exam_cnt | question_cnt |
| ---- | -------- | ------------ |
| 1001 | 1        | 2            |
| 1003 | 2        | 0            |

解释：用户 1001、1003、1004、1006 满足高难度 SQL 试卷得分平均值大于 80，但只有 1001、1003 是 7 级红名大佬；1001 完成了 1 次试卷 1001，练习了 2 次题目；1003 完成了 2 次试卷 9001、9002，未练习题目（因此计数为 0）

**思路：**

先将条件进行初步筛选，比如先查出做过高难度 sql 试卷的用户

```sql
SELECT
	record.uid
FROM
	exam_record record
	INNER JOIN examination_info e_info ON record.exam_id = e_info.exam_id
	JOIN user_info u_info ON record.uid = u_info.uid
WHERE
	e_info.tag = 'SQL'
	AND e_info.difficulty = 'hard'
```

然后根据题目要求，接着再往里叠条件即可；

但是这里又要注意：

第一：不能`YEAR(submit_time)= 2021`这个条件放到最后，要在`ON`条件里，因为左连接存在返回左表全部行，右表为 null 的情形，放在 `JOIN`条件的 `ON` 子句中的目的是为了确保在连接两个表时，只有满足年份条件的记录会进行连接。这样可以避免其他年份的记录被包含在结果中。即 1001 做过 2021 年的试卷，但没有练习过，如果把条件放到最后，就会排除掉这种情况。

第二，必须是`COUNT(distinct er.exam_id) exam_cnt, COUNT(distinct pr.id) question_cnt，`要加 distinct，因为有左连接产生很多重复值。

**答案**：

```sql
SELECT er.uid AS UID,
       count(DISTINCT er.exam_id) AS exam_cnt,
       count(DISTINCT pr.id) AS question_cnt
FROM exam_record er
LEFT JOIN practice_record pr ON er.uid = pr.uid
AND YEAR (er.submit_time)= 2021
AND YEAR (pr.submit_time)= 2021
WHERE er.uid IN
    (SELECT er.uid
     FROM exam_record er
     LEFT JOIN examination_info ei ON er.exam_id = ei.exam_id
     LEFT JOIN user_info ui ON er.uid = ui.uid
     WHERE tag = 'SQL'
       AND difficulty = 'hard'
       AND LEVEL = 7
     GROUP BY er.uid
     HAVING avg(score) > 80)
GROUP BY er.uid
ORDER BY exam_cnt,
         question_cnt DESC
```

可能细心的小伙伴会发现，为什么明明将条件限制了`tag = 'SQL' AND difficulty = 'hard'`，但是用户 1003 仍然能查出两条考试记录，其中一条的考试`tag`为 `C++`; 这是由于`LEFT JOIN`的特性，即使没有与右表匹配的行，左表的所有记录仍然会被保留。

### 每个 6/7 级用户活跃情况（困难）

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name | achievement | level | job  | register_time       |
| ---- | ---- | --------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号 | 3100        | 7     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号 | 2300        | 7     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 | 2500        | 7     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号 | 1200        | 5     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 5 号 | 1600        | 6     | C++  | 2020-01-01 10:00:00 |
| 6    | 1006 | 牛客 6 号 | 2600        | 7     | C++  | 2020-01-01 10:00:00 |

试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2021-09-01 06:00:00 |
| 2    | 9002    | C++  | easy       | 60       | 2021-09-01 06:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2021-09-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ------- | ------------------- | ------------------- | ------ |
| 1001 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:31:00 | 78     |
| 1001 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:31:00 | 81     |
| 1005 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:30:01 | 85     |
| 1005 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:02 | 85     |
| 1006 | 9003    | 2021-09-07 10:01:01 | 2021-09-07 10:21:59 | 84     |
| 1006 | 9001    | 2021-09-07 10:01:01 | 2021-09-07 10:21:01 | 81     |
| 1002 | 9001    | 2020-09-01 13:01:01 | 2020-09-01 13:41:01 | 81     |
| 1005 | 9001    | 2021-09-01 14:01:01 | (NULL)              | (NULL) |

题目练习记录表 `practice_record`（`uid` 用户 ID, `question_id` 题目 ID, `submit_time` 提交时间, `score` 得分）：

| uid  | question_id | submit_time         | score |
| ---- | ----------- | ------------------- | ----- |
| 1001 | 8001        | 2021-08-02 11:41:01 | 60    |
| 1004 | 8001        | 2021-08-02 19:38:01 | 70    |
| 1004 | 8002        | 2021-08-02 19:48:01 | 90    |
| 1001 | 8002        | 2021-08-02 19:38:01 | 70    |
| 1004 | 8002        | 2021-08-02 19:48:01 | 90    |
| 1006 | 8002        | 2021-08-04 19:58:01 | 94    |
| 1006 | 8003        | 2021-08-03 19:38:01 | 70    |
| 1006 | 8003        | 2021-08-02 19:48:01 | 90    |
| 1006 | 8003        | 2020-08-01 19:38:01 | 80    |

请统计每个 6/7 级用户总活跃月份数、2021 年活跃天数、2021 年试卷作答活跃天数、2021 年答题活跃天数，按照总活跃月份数、2021 年活跃天数降序排序。由示例数据结果输出如下：

| uid  | act_month_total | act_days_2021 | act_days_2021_exam |
| ---- | --------------- | ------------- | ------------------ |
| 1006 | 3               | 4             | 1                  |
| 1001 | 2               | 2             | 1                  |
| 1005 | 1               | 1             | 1                  |
| 1002 | 1               | 0             | 0                  |
| 1003 | 0               | 0             | 0                  |

**解释**：6/7 级用户共有 5 个，其中 1006 在 202109、202108、202008 共 3 个月活跃过，2021 年活跃的日期有 20210907、20210804、20210803、20210802 共 4 天，2021 年在试卷作答区 20210907 活跃 1 天，在题目练习区活跃了 3 天。

**思路：**

这题的关键在于`CASE WHEN THEN`的使用，不然要写很多的`left join` 因为会产生很多的结果集。

`CASE WHEN THEN`语句是一种条件表达式，用于在 SQL 中根据条件执行不同的操作或返回不同的结果。

语法结构如下：

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ...
    ELSE result
END
```

在这个结构中，可以根据需要添加多个`WHEN`子句，每个`WHEN`子句后面跟着一个条件（condition）和一个结果（result）。条件可以是任何逻辑表达式，如果满足条件，将返回对应的结果。

最后的`ELSE`子句是可选的，用于指定当所有前面的条件都不满足时的默认返回结果。如果没有提供`ELSE`子句，则默认返回`NULL`。

例如：

```sql
SELECT score,
    CASE
        WHEN score >= 90 THEN '优秀'
        WHEN score >= 80 THEN '良好'
        WHEN score >= 60 THEN '及格'
        ELSE '不及格'
    END AS grade
FROM student_scores;
```

在上述示例中，根据学生成绩（score）的不同范围，使用 CASE WHEN THEN 语句返回相应的等级（grade）。如果成绩大于等于 90，则返回"优秀"；如果成绩大于等于 80，则返回"良好"；如果成绩大于等于 60，则返回"及格"；否则返回"不及格"。

那了解到了上述的用法之后，回过头看看该题，要求列出不同的活跃天数。

```sql
count(distinct act_month) as act_month_total,
count(distinct case when year(act_time)='2021'then act_day end) as act_days_2021,
count(distinct case when year(act_time)='2021' and tag='exam' then act_day end) as act_days_2021_exam,
count(distinct case when year(act_time)='2021' and tag='question'then act_day end) as act_days_2021_question
```

这里的 tag 是先给标记，方便对查询进行区分，将考试和答题分开。

找出试卷作答区的用户

```sql
SELECT
		uid,
		exam_id AS ans_id,
		start_time AS act_time,
		date_format( start_time, '%Y%m' ) AS act_month,
		date_format( start_time, '%Y%m%d' ) AS act_day,
		'exam' AS tag
	FROM
		exam_record
```

紧接着就是答题作答区的用户

```sql
SELECT
		uid,
		question_id AS ans_id,
		submit_time AS act_time,
		date_format( submit_time, '%Y%m' ) AS act_month,
		date_format( submit_time, '%Y%m%d' ) AS act_day,
		'question' AS tag
	FROM
		practice_record
```

最后将两个结果进行`UNION` 最后别忘了将结果进行排序 （这题有点类似于分治法的思想）

**答案**：

```sql
SELECT user_info.uid,
       count(DISTINCT act_month) AS act_month_total,
       count(DISTINCT CASE
                          WHEN YEAR (act_time)= '2021' THEN act_day
                      END) AS act_days_2021,
       count(DISTINCT CASE
                          WHEN YEAR (act_time)= '2021'
                               AND tag = 'exam' THEN act_day
                      END) AS act_days_2021_exam,
       count(DISTINCT CASE
                          WHEN YEAR (act_time)= '2021'
                               AND tag = 'question' THEN act_day
                      END) AS act_days_2021_question
FROM
  (SELECT UID,
          exam_id AS ans_id,
          start_time AS act_time,
          date_format(start_time, '%Y%m') AS act_month,
          date_format(start_time, '%Y%m%d') AS act_day,
          'exam' AS tag
   FROM exam_record
   UNION ALL SELECT UID,
                    question_id AS ans_id,
                    submit_time AS act_time,
                    date_format(submit_time, '%Y%m') AS act_month,
                    date_format(submit_time, '%Y%m%d') AS act_day,
                    'question' AS tag
   FROM practice_record) total
RIGHT JOIN user_info ON total.uid = user_info.uid
WHERE user_info.LEVEL IN (6,
                          7)
GROUP BY user_info.uid
ORDER BY act_month_total DESC,
         act_days_2021 DESC
```

# SQL常见面试题总结（4）

> 题目来源于：[牛客题霸 - SQL 进阶挑战open in new window](https://www.nowcoder.com/exam/oj?page=1&tab=SQL篇&topicId=240)

较难或者困难的题目可以根据自身实际情况和面试需要来决定是否要跳过。

## 专用窗口函数

MySQL 8.0 版本引入了窗口函数的支持，下面是 MySQL 中常见的窗口函数及其用法：

1. `ROW_NUMBER()`: 为查询结果集中的每一行分配一个唯一的整数值。

```sql
SELECT col1, col2, ROW_NUMBER() OVER (ORDER BY col1) AS row_num
FROM table;
```

2. RANK()`: 计算每一行在排序结果中的排名。

```sql
SELECT col1, col2, RANK() OVER (ORDER BY col1 DESC) AS ranking
FROM table;
```

3. `DENSE_RANK()`: 计算每一行在排序结果中的排名，保留相同的排名。

```sql
SELECT col1, col2, DENSE_RANK() OVER (ORDER BY col1 DESC) AS ranking
FROM table;
```

4. `NTILE(n)`: 将结果分成 n 个基本均匀的桶，并为每个桶分配一个标识号。

```sql
SELECT col1, col2, NTILE(4) OVER (ORDER BY col1) AS bucket
FROM table;
```

5. `SUM()`, `AVG()`,`COUNT()`, `MIN()`, `MAX()`: 这些聚合函数也可以与窗口函数结合使用，计算窗口内指定列的汇总、平均值、计数、最小值和最大值。

```sql
SELECT col1, col2, SUM(col1) OVER () AS sum_col
FROM table;
```

6. `LEAD()` 和 `LAG()`: LEAD 函数用于获取当前行之后的某个偏移量的行的值，而 LAG 函数用于获取当前行之前的某个偏移量的行的值。

```sql
SELECT col1, col2, LEAD(col1, 1) OVER (ORDER BY col1) AS next_col1,
                 LAG(col1, 1) OVER (ORDER BY col1) AS prev_col1
FROM table;
```

7. `FIRST_VALUE()` 和 `LAST_VALUE()`: FIRST_VALUE 函数用于获取窗口内指定列的第一个值，LAST_VALUE 函数用于获取窗口内指定列的最后一个值。

```sql
SELECT col1, col2, FIRST_VALUE(col2) OVER (PARTITION BY col1 ORDER BY col2) AS first_val,
                 LAST_VALUE(col2) OVER (PARTITION BY col1 ORDER BY col2) AS last_val
FROM table;
```

窗口函数通常需要配合 OVER 子句一起使用，用于定义窗口的大小、排序规则和分组方式。

### 每类试卷得分前三名

**描述**：

现有试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2021-09-01 06:00:00 |
| 2    | 9002    | SQL  | hard       | 60       | 2021-09-01 06:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2021-09-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, score 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:31:00 | 78     |
| 2    | 1002 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:31:00 | 81     |
| 3    | 1002 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 81     |
| 4    | 1003 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:40:01 | 86     |
| 5    | 1003 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:51 | 89     |
| 6    | 1004 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:30:01 | 85     |
| 7    | 1005 | 9003    | 2021-09-01 12:01:01 | 2021-09-01 12:31:02 | 85     |
| 8    | 1006 | 9003    | 2021-09-07 10:01:01 | 2021-09-07 10:21:01 | 84     |
| 9    | 1003 | 9003    | 2021-09-08 12:01:01 | 2021-09-08 12:11:01 | 40     |
| 10   | 1003 | 9002    | 2021-09-01 14:01:01 | (NULL)              | (NULL) |

找到每类试卷得分的前 3 名，如果两人最大分数相同，选择最小分数大者，如果还相同，选择 uid 大者。由示例数据结果输出如下：

| tid  | uid  | ranking |
| ---- | ---- | ------- |
| SQL  | 1003 | 1       |
| SQL  | 1004 | 2       |
| SQL  | 1002 | 3       |
| 算法 | 1005 | 1       |
| 算法 | 1006 | 2       |
| 算法 | 1003 | 3       |

**解释**：有作答得分记录的试卷 tag 有 SQL 和算法，SQL 试卷用户 1001、1002、1003、1004 有作答得分，最高得分分别为 81、81、89、85，最低得分分别为 78、81、86、40，因此先按最高得分排名再按最低得分排名取前三为 1003、1004、1002。

**答案**：

```sql
SELECT tag,
       UID,
       ranking
FROM
  (SELECT b.tag AS tag,
          a.uid AS UID,
          ROW_NUMBER() OVER (PARTITION BY b.tag
                             ORDER BY b.tag,
                                      max(a.score) DESC,
                                      min(a.score) DESC,
                                      a.uid DESC) AS ranking
   FROM exam_record a
   LEFT JOIN examination_info b ON a.exam_id = b.exam_id
   GROUP BY b.tag,
            a.uid) t
WHERE ranking <= 3
```

### 第二快/慢用时之差大于试卷时长一半的试卷（较难）

**描述**：

现有试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2021-09-01 06:00:00 |
| 2    | 9002    | C++  | hard       | 60       | 2021-09-01 06:00:00 |
| 3    | 9003    | 算法 | medium     | 80       | 2021-09-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2021-09-01 09:01:01 | 2021-09-01 09:51:01 | 78     |
| 2    | 1001 | 9002    | 2021-09-01 09:01:01 | 2021-09-01 09:31:00 | 81     |
| 3    | 1002 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:01 | 81     |
| 4    | 1003 | 9001    | 2021-09-01 19:01:01 | 2021-09-01 19:59:01 | 86     |
| 5    | 1003 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:31:51 | 89     |
| 6    | 1004 | 9002    | 2021-09-01 19:01:01 | 2021-09-01 19:30:01 | 85     |
| 7    | 1005 | 9001    | 2021-09-01 12:01:01 | 2021-09-01 12:31:02 | 85     |
| 8    | 1006 | 9001    | 2021-09-07 10:01:01 | 2021-09-07 10:21:01 | 84     |
| 9    | 1003 | 9001    | 2021-09-08 12:01:01 | 2021-09-08 12:11:01 | 40     |
| 10   | 1003 | 9002    | 2021-09-01 14:01:01 | (NULL)              | (NULL) |
| 11   | 1005 | 9001    | 2021-09-01 14:01:01 | (NULL)              | (NULL) |
| 12   | 1003 | 9003    | 2021-09-08 15:01:01 | (NULL)              | (NULL) |

找到第二快和第二慢用时之差大于试卷时长的一半的试卷信息，按试卷 ID 降序排序。由示例数据结果输出如下：

| exam_id | duration | release_time        |
| ------- | -------- | ------------------- |
| 9001    | 60       | 2021-09-01 06:00:00 |

**解释**：试卷 9001 被作答用时有 50 分钟、50 分钟、30 分 1 秒、11 分钟、10 分钟，第二快和第二慢用时之差为 50 分钟-11 分钟=39 分钟，试卷时长为 60 分钟，因此满足大于试卷时长一半的条件，输出试卷 ID、时长、发布时间。

**思路：**

第一步，找到每张试卷完成时间的顺序排名和倒序排名 也就是表 a；

第二步，与通过试卷信息表 b 建立内连接，并根据试卷 id 分组，利用`having`筛选排名为第二个数据，将秒转化为分钟并进行比较，最后再根据试卷 id 倒序排序就行

**答案**：

```sql
SELECT a.exam_id,
       b.duration,
       b.release_time
FROM
  (SELECT exam_id,
          row_number() OVER (PARTITION BY exam_id
                             ORDER BY timestampdiff(SECOND, start_time, submit_time) DESC) rn1,
          row_number() OVER (PARTITION BY exam_id
                            ORDER BY timestampdiff(SECOND, start_time, submit_time) ASC) rn2,
                                              timestampdiff(SECOND, start_time, submit_time) timex
   FROM exam_record
   WHERE score IS NOT NULL ) a
INNER JOIN examination_info b ON a.exam_id = b.exam_id
GROUP BY a.exam_id
HAVING (max(IF (rn1 = 2, a.timex, 0))- max(IF (rn2 = 2, a.timex, 0)))/ 60 > b.duration / 2
ORDER BY a.exam_id DESC
```

### 连续两次作答试卷的最大时间窗（较难）

**描述**

现有试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score |
| ---- | ---- | ------- | ------------------- | ------------------- | ----- |
| 1    | 1006 | 9003    | 2021-09-07 10:01:01 | 2021-09-07 10:21:02 | 84    |
| 2    | 1006 | 9001    | 2021-09-01 12:11:01 | 2021-09-01 12:31:01 | 89    |
| 3    | 1006 | 9002    | 2021-09-06 10:01:01 | 2021-09-06 10:21:01 | 81    |
| 4    | 1005 | 9002    | 2021-09-05 10:01:01 | 2021-09-05 10:21:01 | 81    |
| 5    | 1005 | 9001    | 2021-09-05 10:31:01 | 2021-09-05 10:51:01 | 81    |

请计算在 2021 年至少有两天作答过试卷的人中，计算该年连续两次作答试卷的最大时间窗 `days_window`，那么根据该年的历史规律他在 `days_window` 天里平均会做多少套试卷，按最大时间窗和平均做答试卷套数倒序排序。由示例数据结果输出如下：

| uid  | days_window | avg_exam_cnt |
| ---- | ----------- | ------------ |
| 1006 | 6           | 2.57         |

**解释**：用户 1006 分别在 20210901、20210906、20210907 作答过 3 次试卷，连续两次作答最大时间窗为 6 天（1 号到 6 号），他 1 号到 7 号这 7 天里共做了 3 张试卷，平均每天 3/7=0.428571 张，那么 6 天里平均会做 0.428571*6=2.57 张试卷（保留两位小数）；用户 1005 在 20210905 做了两张试卷，但是只有一天的作答记录，过滤掉。

**思路：**

上面这个解释中提示要对作答记录去重，千万别被骗了，不要去重！去重就通不过测试用例。注意限制时间是 2021 年；

而且要注意时间差要+1 天；还要注意==没交卷也算在内==！！！！ （反正感觉这题描述不清，出的不是很好）

**答案**：

```sql
SELECT UID,
       max(datediff(next_time, start_time)) + 1 AS days_window,
       round(count(start_time)/(datediff(max(start_time), min(start_time))+ 1) * (max(datediff(next_time, start_time))+ 1), 2) AS avg_exam_cnt
FROM
  (SELECT UID,
          start_time,
          lead(start_time, 1) OVER (PARTITION BY UID
                                    ORDER BY start_time) AS next_time
   FROM exam_record
   WHERE YEAR (start_time) = '2021' ) a
GROUP BY UID
HAVING count(DISTINCT date(start_time)) > 1
ORDER BY days_window DESC,
         avg_exam_cnt DESC
```

### 近三个月未完成为 0 的用户完成情况

**描述**：

现有试卷作答记录表 `exam_record`（`uid`:用户 ID, `exam_id`:试卷 ID, `start_time`:开始作答时间, `submit_time`:交卷时间，为空的话则代表未完成, `score`:得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1006 | 9003    | 2021-09-06 10:01:01 | 2021-09-06 10:21:02 | 84     |
| 2    | 1006 | 9001    | 2021-08-02 12:11:01 | 2021-08-02 12:31:01 | 89     |
| 3    | 1006 | 9002    | 2021-06-06 10:01:01 | 2021-06-06 10:21:01 | 81     |
| 4    | 1006 | 9002    | 2021-05-06 10:01:01 | 2021-05-06 10:21:01 | 81     |
| 5    | 1006 | 9001    | 2021-05-01 12:01:01 | (NULL)              | (NULL) |
| 6    | 1001 | 9001    | 2021-09-05 10:31:01 | 2021-09-05 10:51:01 | 81     |
| 7    | 1001 | 9003    | 2021-08-01 09:01:01 | 2021-08-01 09:51:11 | 78     |
| 8    | 1001 | 9002    | 2021-07-01 09:01:01 | 2021-07-01 09:31:00 | 81     |
| 9    | 1001 | 9002    | 2021-07-01 12:01:01 | 2021-07-01 12:31:01 | 81     |
| 10   | 1001 | 9002    | 2021-07-01 12:01:01 | (NULL)              | (NULL) |

找到每个人近三个有试卷作答记录的月份中没有试卷是未完成状态的用户的试卷作答完成数，按试卷完成数和用户 ID 降序排名。由示例数据结果输出如下：

| uid  | exam_complete_cnt |
| ---- | ----------------- |
| 1006 | 3                 |

**解释**：用户 1006 近三个有作答试卷的月份为 202109、202108、202106，作答试卷数为 3，全部完成；用户 1001 近三个有作答试卷的月份为 202109、202108、202107，作答试卷数为 5，完成试卷数为 4，因为有未完成试卷，故过滤掉。

**思路:**

1. `找到每个人近三个有试卷作答记录的月份中没有试卷是未完成状态的用户的试卷作答完成数`首先看这句话，肯定要先根据人进行分组
2. 最近三个月，可以采用连续重复排名，倒序排列，排名<=3
3. 统计作答数
4. 拼装剩余条件
5. 排序

**答案**：

```sql
SELECT UID,
       count(score) exam_complete_cnt
FROM
  (SELECT *, DENSE_RANK() OVER (PARTITION BY UID
                             ORDER BY date_format(start_time, '%Y%m') DESC) dr
   FROM exam_record) t1
WHERE dr <= 3
GROUP BY UID
HAVING count(dr)= count(score)
ORDER BY exam_complete_cnt DESC,
         UID DESC
```

### 未完成率较高的 50%用户近三个月答卷情况（困难）

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name   | achievement | level | job  | register_time       |
| ---- | ---- | ----------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号   | 3200        | 7     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号   | 2500        | 6     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 ♂ | 2200        | 5     | 算法 | 2020-01-01 10:00:00 |

试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag    | difficulty | duration | release_time        |
| ---- | ------- | ------ | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL    | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | SQL    | hard       | 80       | 2020-01-01 10:00:00 |
| 3    | 9003    | 算法   | hard       | 80       | 2020-01-01 10:00:00 |
| 4    | 9004    | PYTHON | medium     | 70       | 2020-01-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score |
| ---- | ---- | ------- | ------------------- | ------------------- | ----- |
| 1    | 1001 | 9001    | 2020-01-01 09:01:01 | 2020-01-01 09:21:59 | 90    |
| 15   | 1002 | 9001    | 2020-01-01 18:01:01 | 2020-01-01 18:59:02 | 90    |
| 13   | 1001 | 9001    | 2020-01-02 10:01:01 | 2020-01-02 10:31:01 | 89    |
| 2    | 1002 | 9001    | 2020-01-20 10:01:01 |                     |       |
| 3    | 1002 | 9001    | 2020-02-01 12:11:01 |                     |       |
| 5    | 1001 | 9001    | 2020-03-01 12:01:01 |                     |       |
| 6    | 1002 | 9001    | 2020-03-01 12:01:01 | 2020-03-01 12:41:01 | 90    |
| 4    | 1003 | 9001    | 2020-03-01 19:01:01 |                     |       |
| 7    | 1002 | 9001    | 2020-05-02 19:01:01 | 2020-05-02 19:32:00 | 90    |
| 14   | 1001 | 9002    | 2020-01-01 12:11:01 |                     |       |
| 8    | 1001 | 9002    | 2020-01-02 19:01:01 | 2020-01-02 19:59:01 | 69    |
| 9    | 1001 | 9002    | 2020-02-02 12:01:01 | 2020-02-02 12:20:01 | 99    |
| 10   | 1002 | 9002    | 2020-02-02 12:01:01 |                     |       |
| 11   | 1002 | 9002    | 2020-02-02 12:01:01 | 2020-02-02 12:43:01 | 81    |
| 12   | 1002 | 9002    | 2020-03-02 12:11:01 |                     |       |
| 17   | 1001 | 9002    | 2020-05-05 18:01:01 |                     |       |
| 16   | 1002 | 9003    | 2020-05-06 12:01:01 |                     |       |

请统计 SQL 试卷上未完成率较高的 50%用户中，6 级和 7 级用户在有试卷作答记录的近三个月中，每个月的答卷数目和完成数目。按用户 ID、月份升序排序。

由示例数据结果输出如下：

| uid  | start_month | total_cnt | complete_cnt |
| ---- | ----------- | --------- | ------------ |
| 1002 | 202002      | 3         | 1            |
| 1002 | 202003      | 2         | 1            |
| 1002 | 202005      | 2         | 1            |

解释：各个用户对 SQL 试卷的未完成数、作答总数、未完成率如下：

| uid  | incomplete_cnt | total_cnt | incomplete_rate |
| ---- | -------------- | --------- | --------------- |
| 1001 | 3              | 7         | 0.4286          |
| 1002 | 4              | 8         | 0.5000          |
| 1003 | 1              | 1         | 1.0000          |

1001、1002、1003 分别排在 1.0、0.5、0.0 的位置，因此较高的 50%用户（排位<=0.5）为 1002、1003；

1003 不是 6 级或 7 级；

有试卷作答记录的近三个月为 202005、202003、202002；

这三个月里 1002 的作答题数分别为 3、2、2，完成数目分别为 1、1、1。

**思路：**

注意点：这题注意求的是所有的答题次数和完成次数，而 sql 类别的试卷是限制未完成率排名，6, 7 级用户限制的是做题记录。

先求出未完成率的排名

```sql
SELECT UID,
       count(submit_time IS NULL
             OR NULL)/ count(start_time) AS num,
       PERCENT_RANK() OVER (
                            ORDER BY count(submit_time IS NULL
                                           OR NULL)/ count(start_time)) AS ranking
FROM exam_record
LEFT JOIN examination_info USING (exam_id)
WHERE tag = 'SQL'
GROUP BY UID
```

再求出最近三个月的练习记录

```sql
SELECT UID,
       date_format(start_time, '%Y%m') AS month_d,
       submit_time,
       exam_id,
       dense_rank() OVER (PARTITION BY UID
                          ORDER BY date_format(start_time, '%Y%m') DESC) AS ranking
FROM exam_record
LEFT JOIN user_info USING (UID)
WHERE LEVEL IN (6,7)
```

**答案**：

```sql
SELECT t1.uid,
       t1.month_d,
       count(*) AS total_cnt,
       count(t1.submit_time) AS complete_cnt
FROM-- 先求出未完成率的排名

  (SELECT UID,
          count(submit_time IS NULL OR NULL)/ count(start_time) AS num,
          PERCENT_RANK() OVER (
                               ORDER BY count(submit_time IS NULL OR NULL)/ count(start_time)) AS ranking
   FROM exam_record
   LEFT JOIN examination_info USING (exam_id)
   WHERE tag = 'SQL'
   GROUP BY UID) t
INNER JOIN
  (-- 再求出近三个月的练习记录
 SELECT UID,
        date_format(start_time, '%Y%m') AS month_d,
        submit_time,
        exam_id,
        dense_rank() OVER (PARTITION BY UID
                           ORDER BY date_format(start_time, '%Y%m') DESC) AS ranking
   FROM exam_record
   LEFT JOIN user_info USING (UID)
   WHERE LEVEL IN (6,7) ) t1 USING (UID)
WHERE t1.ranking <= 3 AND t.ranking >= 0.5 -- 使用限制找到符合条件的记录

GROUP BY t1.uid,
         t1.month_d
ORDER BY t1.uid,
         t1.month_d
```

### 试卷完成数同比 2020 年的增长率及排名变化（困难）

**描述**：

现有试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag    | difficulty | duration | release_time        |
| ---- | ------- | ------ | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL    | hard       | 60       | 2021-01-01 10:00:00 |
| 2    | 9002    | C++    | hard       | 80       | 2021-01-01 10:00:00 |
| 3    | 9003    | 算法   | hard       | 80       | 2021-01-01 10:00:00 |
| 4    | 9004    | PYTHON | medium     | 70       | 2021-01-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score |
| ---- | ---- | ------- | ------------------- | ------------------- | ----- |
| 1    | 1001 | 9001    | 2020-08-02 10:01:01 | 2020-08-02 10:31:01 | 89    |
| 2    | 1002 | 9001    | 2020-04-01 18:01:01 | 2020-04-01 18:59:02 | 90    |
| 3    | 1001 | 9001    | 2020-04-01 09:01:01 | 2020-04-01 09:21:59 | 80    |
| 5    | 1002 | 9001    | 2021-03-02 19:01:01 | 2021-03-02 19:32:00 | 20    |
| 8    | 1003 | 9001    | 2021-05-02 12:01:01 | 2021-05-02 12:31:01 | 98    |
| 13   | 1003 | 9001    | 2020-01-02 10:01:01 | 2020-01-02 10:31:01 | 89    |
| 9    | 1001 | 9002    | 2020-02-02 12:01:01 | 2020-02-02 12:20:01 | 99    |
| 10   | 1002 | 9002    | 2021-02-02 12:01:01 | 2020-02-02 12:43:01 | 81    |
| 11   | 1001 | 9002    | 2020-01-02 19:01:01 | 2020-01-02 19:59:01 | 69    |
| 16   | 1002 | 9002    | 2020-02-02 12:01:01 |                     |       |
| 17   | 1002 | 9002    | 2020-03-02 12:11:01 |                     |       |
| 18   | 1001 | 9002    | 2021-05-05 18:01:01 |                     |       |
| 4    | 1002 | 9003    | 2021-01-20 10:01:01 | 2021-01-20 10:10:01 | 81    |
| 6    | 1001 | 9003    | 2021-04-02 19:01:01 | 2021-04-02 19:40:01 | 89    |
| 15   | 1002 | 9003    | 2021-01-01 18:01:01 | 2021-01-01 18:59:02 | 90    |
| 7    | 1004 | 9004    | 2020-05-02 12:01:01 | 2020-05-02 12:20:01 | 99    |
| 12   | 1001 | 9004    | 2021-09-02 12:11:01 |                     |       |
| 14   | 1002 | 9004    | 2020-01-01 12:11:01 | 2020-01-01 12:31:01 | 83    |

请计算 2021 年上半年各类试卷的做完次数相比 2020 年上半年同期的增长率（百分比格式，保留 1 位小数），以及做完次数排名变化，按增长率和 21 年排名降序输出。

由示例数据结果输出如下：

| tag  | exam_cnt_20 | exam_cnt_21 | growth_rate | exam_cnt_rank_20 | exam_cnt_rank_21 | rank_delta |
| ---- | ----------- | ----------- | ----------- | ---------------- | ---------------- | ---------- |
| SQL  | 3           | 2           | -33.3%      | 1                | 2                | 1          |

解释：2020 年上半年有 3 个 tag 有作答完成的记录，分别是 C++、SQL、PYTHON，它们被做完的次数分别是 3、3、2，做完次数排名为 1、1（并列）、3；

2021 年上半年有 2 个 tag 有作答完成的记录，分别是算法、SQL，它们被做完的次数分别是 3、2，做完次数排名为 1、2；具体如下：

| tag    | start_year | exam_cnt | exam_cnt_rank |
| ------ | ---------- | -------- | ------------- |
| C++    | 2020       | 3        | 1             |
| SQL    | 2020       | 3        | 1             |
| PYTHON | 2020       | 2        | 3             |
| 算法   | 2021       | 3        | 1             |
| SQL    | 2021       | 2        | 2             |

因此能输出同比结果的 tag 只有 SQL，从 2020 到 2021 年，做完次数 3=>2，减少 33.3%（保留 1 位小数）；排名 1=>2，后退 1 名。

**思路：**

本题难点在于长整型的数据类型要求不能有负号产生，用 cast 函数转换数据类型为 signed。

以及用到的`增长率计算公式：(exam_cnt_21-exam_cnt_20)/exam_cnt_20`

做完次数排名变化（2021 年和 2020 年比排名升了或者降了多少）

计算公式：`exam_cnt_rank_21 - exam_cnt_rank_20`

在 MySQL 中，`CAST()` 函数用于将一个表达式的数据类型转换为另一个数据类型。它的基本语法如下：

```sql
CAST(expression AS data_type)

-- 将一个字符串转换成整数
SELECT CAST('123' AS INT);
```

示例就不一一举例了，这个函数很简单。

**答案**：

```sql
SELECT
  tag,
  exam_cnt_20,
  exam_cnt_21,
  concat(
    round(
      100 * (exam_cnt_21 - exam_cnt_20) / exam_cnt_20,
      1
    ),
    '%'
  ) AS growth_rate,
  exam_cnt_rank_20,
  exam_cnt_rank_21,
  cast(exam_cnt_rank_21 AS signed) - cast(exam_cnt_rank_20 AS signed) AS rank_delta
FROM
  (
    #2020年、2021年上半年各类试卷的做完次数和做完次数排名
    SELECT
      tag,
      count(
        IF (
          date_format(start_time, '%Y%m%d') BETWEEN '20200101'
          AND '20200630',
          start_time,
          NULL
        )
      ) AS exam_cnt_20,
      count(
        IF (
          substring(start_time, 1, 10) BETWEEN '2021-01-01'
          AND '2021-06-30',
          start_time,
          NULL
        )
      ) AS exam_cnt_21,
      rank() over (
        ORDER BY
          count(
            IF (
              date_format(start_time, '%Y%m%d') BETWEEN '20200101'
              AND '20200630',
              start_time,
              NULL
            )
          ) DESC
      ) AS exam_cnt_rank_20,
      rank() over (
        ORDER BY
          count(
            IF (
              substring(start_time, 1, 10) BETWEEN '2021-01-01'
              AND '2021-06-30',
              start_time,
              NULL
            )
          ) DESC
      ) AS exam_cnt_rank_21
    FROM
      examination_info
      JOIN exam_record USING (exam_id)
    WHERE
      submit_time IS NOT NULL
    GROUP BY
      tag
  ) main
WHERE
  exam_cnt_21 * exam_cnt_20 <> 0
ORDER BY
  growth_rate DESC,
  exam_cnt_rank_21 DESC
```

## 聚合窗口函数

### 对试卷得分做 min-max 归一化

**描述**：

现有试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag    | difficulty | duration | release_time        |
| ---- | ------- | ------ | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL    | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | C++    | hard       | 80       | 2020-01-01 10:00:00 |
| 3    | 9003    | 算法   | hard       | 80       | 2020-01-01 10:00:00 |
| 4    | 9004    | PYTHON | medium     | 70       | 2020-01-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 6    | 1003 | 9001    | 2020-01-02 12:01:01 | 2020-01-02 12:31:01 | 68     |
| 9    | 1001 | 9001    | 2020-01-02 10:01:01 | 2020-01-02 10:31:01 | 89     |
| 1    | 1001 | 9001    | 2020-01-01 09:01:01 | 2020-01-01 09:21:59 | 90     |
| 12   | 1002 | 9002    | 2021-05-05 18:01:01 | (NULL)              | (NULL) |
| 3    | 1004 | 9002    | 2020-01-01 12:01:01 | 2020-01-01 12:11:01 | 60     |
| 2    | 1003 | 9002    | 2020-01-01 19:01:01 | 2020-01-01 19:30:01 | 75     |
| 7    | 1001 | 9002    | 2020-01-02 12:01:01 | 2020-01-02 12:43:01 | 81     |
| 10   | 1002 | 9002    | 2020-01-01 12:11:01 | 2020-01-01 12:31:01 | 83     |
| 4    | 1003 | 9002    | 2020-01-01 12:01:01 | 2020-01-01 12:41:01 | 90     |
| 5    | 1002 | 9002    | 2020-01-02 19:01:01 | 2020-01-02 19:32:00 | 90     |
| 11   | 1002 | 9004    | 2021-09-06 12:01:01 | (NULL)              | (NULL) |
| 8    | 1001 | 9005    | 2020-01-02 12:11:01 | (NULL)              | (NULL) |

在物理学及统计学数据计算时，有个概念叫 min-max 标准化，也被称为离差标准化，是对原始数据的线性变换，使结果值映射到[0 - 1]之间。

转换函数为：

![img](images\29A377601170AB822322431FCDF7EDFE.png)

请你将用户作答高难度试卷的得分在每份试卷作答记录内执行 min-max 归一化后缩放到[0,100]区间，并输出用户 ID、试卷 ID、归一化后分数平均值；最后按照试卷 ID 升序、归一化分数降序输出。（注：得分区间默认为[0,100]，如果某个试卷作答记录中只有一个得分，那么无需使用公式，归一化并缩放后分数仍为原分数）。

由示例数据结果输出如下：

| uid  | exam_id | avg_new_score |
| ---- | ------- | ------------- |
| 1001 | 9001    | 98            |
| 1003 | 9001    | 0             |
| 1002 | 9002    | 88            |
| 1003 | 9002    | 75            |
| 1001 | 9002    | 70            |
| 1004 | 9002    | 0             |

解释：高难度试卷有 9001、9002、9003；

作答了 9001 的记录有 3 条，分数分别为 68、89、90，按给定公式归一化后分数为：0、95、100，而后两个得分都是用户 1001 作答的，因此用户 1001 对试卷 9001 的新得分为(95+100)/2≈98（只保留整数部分），用户 1003 对于试卷 9001 的新得分为 0。最后结果按照试卷 ID 升序、归一化分数降序输出。

**思路：**

注意点：

1. 将高难度的试卷，按每类试卷的得分，利用 max/min (col) over()窗口函数求得各组内最大最小值，然后进行归一化公式计算，缩放区间为[0,100]，即 min_max*100
2. 若某类试卷只有一个得分，则无需使用归一化公式，因只有一个分 max_score=min_score,score，公式后结果可能会变成 0。
3. 最后结果按 uid、exam_id 分组求归一化后均值，score 为 NULL 的要过滤掉。

最后就是仔细看上面公式 （说实话，这题看起来就很绕）

**答案**：

```sql
SELECT
  uid,
  exam_id,
  round(sum(min_max) / count(score), 0) AS avg_new_score
FROM
  (
    SELECT
      *,
      IF (
        max_score = min_score,
        score,
        (score - min_score) / (max_score - min_score) * 100
      ) AS min_max
    FROM
      (
        SELECT
          uid,
          a.exam_id,
          score,
          max(score) over (PARTITION BY a.exam_id) AS max_score,
          min(score) over (PARTITION BY a.exam_id) AS min_score
        FROM
          exam_record a
          LEFT JOIN examination_info b USING (exam_id)
        WHERE
          difficulty = 'hard'
      ) t
    WHERE
      score IS NOT NULL
  ) t1
GROUP BY
  uid,
  exam_id
ORDER BY
  exam_id ASC,
  avg_new_score DESC;
```

### 每份试卷每月作答数和截止当月的作答总数

**描述:**

现有试卷作答记录表 exam_record（uid 用户 ID, exam_id 试卷 ID, start_time 开始作答时间, submit_time 交卷时间, score 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-01 09:01:01 | 2020-01-01 09:21:59 | 90     |
| 2    | 1002 | 9001    | 2020-01-20 10:01:01 | 2020-01-20 10:10:01 | 89     |
| 3    | 1002 | 9001    | 2020-02-01 12:11:01 | 2020-02-01 12:31:01 | 83     |
| 4    | 1003 | 9001    | 2020-03-01 19:01:01 | 2020-03-01 19:30:01 | 75     |
| 5    | 1004 | 9001    | 2020-03-01 12:01:01 | 2020-03-01 12:11:01 | 60     |
| 6    | 1003 | 9001    | 2020-03-01 12:01:01 | 2020-03-01 12:41:01 | 90     |
| 7    | 1002 | 9001    | 2020-05-02 19:01:01 | 2020-05-02 19:32:00 | 90     |
| 8    | 1001 | 9002    | 2020-01-02 19:01:01 | 2020-01-02 19:59:01 | 69     |
| 9    | 1004 | 9002    | 2020-02-02 12:01:01 | 2020-02-02 12:20:01 | 99     |
| 10   | 1003 | 9002    | 2020-02-02 12:01:01 | 2020-02-02 12:31:01 | 68     |
| 11   | 1001 | 9002    | 2020-02-02 12:01:01 | 2020-02-02 12:43:01 | 81     |
| 12   | 1001 | 9002    | 2020-03-02 12:11:01 | (NULL)              | (NULL) |

请输出每份试卷每月作答数和截止当月的作答总数。
 由示例数据结果输出如下：

| exam_id | start_month | month_cnt | cum_exam_cnt |
| ------- | ----------- | --------- | ------------ |
| 9001    | 202001      | 2         | 2            |
| 9001    | 202002      | 1         | 3            |
| 9001    | 202003      | 3         | 6            |
| 9001    | 202005      | 1         | 7            |
| 9002    | 202001      | 1         | 1            |
| 9002    | 202002      | 3         | 4            |
| 9002    | 202003      | 1         | 5            |

解释：试卷 9001 在 202001、202002、202003、202005 共 4 个月有被作答记录，每个月被作答数分别为 2、1、3、1，截止当月累积作答总数为 2、3、6、7。

**思路：**

这题就两个关键点：统计截止当月的作答总数、输出每份试卷每月作答数和截止当月的作答总数

这个是关键`**sum(count(*)) over(partition by exam_id order by date_format(start_time,'%Y%m'))**`

**答案**：

```sql
SELECT exam_id,
       date_format(start_time, '%Y%m') AS start_month,
       count(*) AS month_cnt,
       sum(count(*)) OVER (PARTITION BY exam_id
                           ORDER BY date_format(start_time, '%Y%m')) AS cum_exam_cnt
FROM exam_record
GROUP BY exam_id,
         start_month
```

### 每月及截止当月的答题情况（较难）

**描述**：现有试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-01 09:01:01 | 2020-01-01 09:21:59 | 90     |
| 2    | 1002 | 9001    | 2020-01-20 10:01:01 | 2020-01-20 10:10:01 | 89     |
| 3    | 1002 | 9001    | 2020-02-01 12:11:01 | 2020-02-01 12:31:01 | 83     |
| 4    | 1003 | 9001    | 2020-03-01 19:01:01 | 2020-03-01 19:30:01 | 75     |
| 5    | 1004 | 9001    | 2020-03-01 12:01:01 | 2020-03-01 12:11:01 | 60     |
| 6    | 1003 | 9001    | 2020-03-01 12:01:01 | 2020-03-01 12:41:01 | 90     |
| 7    | 1002 | 9001    | 2020-05-02 19:01:01 | 2020-05-02 19:32:00 | 90     |
| 8    | 1001 | 9002    | 2020-01-02 19:01:01 | 2020-01-02 19:59:01 | 69     |
| 9    | 1004 | 9002    | 2020-02-02 12:01:01 | 2020-02-02 12:20:01 | 99     |
| 10   | 1003 | 9002    | 2020-02-02 12:01:01 | 2020-02-02 12:31:01 | 68     |
| 11   | 1001 | 9002    | 2020-01-02 19:01:01 | 2020-02-02 12:43:01 | 81     |
| 12   | 1001 | 9002    | 2020-03-02 12:11:01 | (NULL)              | (NULL) |

请输出自从有用户作答记录以来，每月的试卷作答记录中月活用户数、新增用户数、截止当月的单月最大新增用户数、截止当月的累积用户数。结果按月份升序输出。

由示例数据结果输出如下：

| start_month | mau  | month_add_uv | max_month_add_uv | cum_sum_uv |
| ----------- | ---- | ------------ | ---------------- | ---------- |
| 202001      | 2    | 2            | 2                | 2          |
| 202002      | 4    | 2            | 2                | 4          |
| 202003      | 3    | 0            | 2                | 4          |
| 202005      | 1    | 0            | 2                | 4          |

| month  | 1001 | 1002 | 1003 | 1004 |
| ------ | ---- | ---- | ---- | ---- |
| 202001 | 1    | 1    |      |      |
| 202002 | 1    | 1    | 1    | 1    |
| 202003 | 1    |      | 1    | 1    |
| 202005 |      | 1    |      |      |

由上述矩阵可以看出，2020 年 1 月有 2 个用户活跃（mau=2），当月新增用户数为 2；

2020 年 2 月有 4 个用户活跃，当月新增用户数为 2，最大单月新增用户数为 2，当前累积用户数为 4。

**思路：**

难点：

1.如何求每月新增用户

2.截至当月的答题情况

大致流程：

（1）统计每个人的首次登陆月份 `min()`

（2）统计每月的月活和新增用户数：先得到每个人的首次登陆月份，再对首次登陆月份分组求和是该月份的新增人数

（3）统计截止当月的单月最大新增用户数、截止当月的累积用户数 ，最终按照按月份升序输出

**答案**：

```sql
-- 截止当月的单月最大新增用户数、截止当月的累积用户数，按月份升序输出
SELECT
	start_month,
	mau,
	month_add_uv,
	max( month_add_uv ) over ( ORDER BY start_month ),
	sum( month_add_uv ) over ( ORDER BY start_month )
FROM
	(
	-- 统计每月的月活和新增用户数
	SELECT
		date_format( a.start_time, '%Y%m' ) AS start_month,
		count( DISTINCT a.uid ) AS mau,
		count( DISTINCT b.uid ) AS month_add_uv
	FROM
		exam_record a
		LEFT JOIN (
         -- 统计每个人的首次登陆月份
		SELECT uid, min( date_format( start_time, '%Y%m' )) AS first_month FROM exam_record GROUP BY uid ) b ON date_format( a.start_time, '%Y%m' ) = b.first_month
	GROUP BY
		start_month
	) main
ORDER BY
	start_month
```

# SQL常见面试题总结（5）

> 题目来源于：[牛客题霸 - SQL 进阶挑战open in new window](https://www.nowcoder.com/exam/oj?page=1&tab=SQL篇&topicId=240)

较难或者困难的题目可以根据自身实际情况和面试需要来决定是否要跳过。

## 空值处理

### 统计有未完成状态的试卷的未完成数和未完成率

**描述**：

现有试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分），数据如下：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:01 | 80     |
| 2    | 1001 | 9001    | 2021-05-02 10:01:01 | 2021-05-02 10:30:01 | 81     |
| 3    | 1001 | 9001    | 2021-09-02 12:01:01 | (NULL)              | (NULL) |

请统计有未完成状态的试卷的未完成数 incomplete_cnt 和未完成率 incomplete_rate。由示例数据结果输出如下：

| exam_id | incomplete_cnt | complete_rate |
| ------- | -------------- | ------------- |
| 9001    | 1              | 0.333         |

解释：试卷 9001 有 3 次被作答的记录，其中两次完成，1 次未完成，因此未完成数为 1，未完成率为 0.333（保留 3 位小数）

**思路**：

这题只需要注意一个是有条件限制，一个是没条件限制的；要么分别查询条件，然后合并；要么直接在 select 里面进行条件判断。

**答案**：

写法 1：

```sql
SELECT exam_id,
       count(submit_time IS NULL OR NULL) incomplete_cnt,
       ROUND(count(submit_time IS NULL OR NULL) / count(*), 3) complete_rate
FROM exam_record
GROUP BY exam_id
HAVING incomplete_cnt <> 0
```

写法 2：

```sql
SELECT exam_id,
       count(submit_time IS NULL OR NULL) incomplete_cnt,
       ROUND(count(submit_time IS NULL OR NULL) / count(*), 3) complete_rate
FROM exam_record
GROUP BY exam_id
HAVING incomplete_cnt <> 0
```

两种写法都可以，只有中间的写法不一样，一个是对符合条件的才`COUNT`，一个是直接上`IF`,后者更为直观，最后这个`having`解释一下， 无论是 `complete_rate` 还是 `incomplete_cnt`，只要不为 0 即可，不为 0 就意味着有未完成的。

### 0 级用户高难度试卷的平均用时和平均得分

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间），数据如下：

| id   | uid  | nick_name | achievement | level | job  | register_time       |
| ---- | ---- | --------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号 | 10          | 0     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号 | 2100        | 6     | 算法 | 2020-01-01 10:00:00 |

试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间），数据如下：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | SQL  | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | SQL  | easy       | 60       | 2020-01-01 10:00:00 |
| 3    | 9004    | 算法 | medium     | 80       | 2020-01-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分），数据如下：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:59 | 80     |
| 2    | 1001 | 9001    | 2021-05-02 10:01:01 | (NULL)              | (NULL) |
| 3    | 1001 | 9002    | 2021-02-02 19:01:01 | 2021-02-02 19:30:01 | 87     |
| 4    | 1001 | 9001    | 2021-06-02 19:01:01 | 2021-06-02 19:32:00 | 20     |
| 5    | 1001 | 9002    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 89     |
| 6    | 1001 | 9002    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 7    | 1002 | 9002    | 2021-05-05 18:01:01 | 2021-05-05 18:59:02 | 90     |

请输出每个 0 级用户所有的高难度试卷考试平均用时和平均得分，未完成的默认试卷最大考试时长和 0 分处理。由示例数据结果输出如下：

| uid  | avg_score | avg_time_took |
| ---- | --------- | ------------- |
| 1001 | 33        | 36.7          |

解释：0 级用户有 1001，高难度试卷有 9001，1001 作答 9001 的记录有 3 条，分别用时 20 分钟、未完成（试卷时长 60 分钟）、30 分钟（未满 31 分钟），分别得分为 80 分、未完成（0 分处理）、20 分。因此他的平均用时为 110/3=36.7（保留一位小数），平均得分为 33 分（取整）

**思路**：这题用`IF`是判断的最方便的，因为涉及到 NULL 值的判断。当然 `case when`也可以，大同小异。这题的难点就在于空值的处理，其他的这些查询条件什么的，我相信难不倒大家。

**答案**：

```sql
SELECT UID,
       round(avg(new_socre)) AS avg_score,
       round(avg(time_diff), 1) AS avg_time_took
FROM
  (SELECT er.uid,
          IF (er.submit_time IS NOT NULL, TIMESTAMPDIFF(MINUTE, start_time, submit_time), ef.duration) AS time_diff,
          IF (er.submit_time IS NOT NULL,er.score,0) AS new_socre
   FROM exam_record er
   LEFT JOIN user_info uf ON er.uid = uf.uid
   LEFT JOIN examination_info ef ON er.exam_id = ef.exam_id
   WHERE uf.LEVEL = 0 AND ef.difficulty = 'hard' ) t
GROUP BY UID
ORDER BY UID
```

## 高级条件语句

### 筛选限定昵称成就值活跃日期的用户（较难）

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name   | achievement | level | job  | register_time       |
| ---- | ---- | ----------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号   | 1000        | 2     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号   | 1200        | 3     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 进击的 3 号 | 2200        | 5     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号   | 2500        | 6     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 5 号   | 3000        | 7     | C++  | 2020-01-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:59 | 80     |
| 3    | 1001 | 9002    | 2021-02-02 19:01:01 | 2021-02-02 19:30:01 | 87     |
| 2    | 1001 | 9001    | 2021-05-02 10:01:01 | (NULL)              | (NULL) |
| 4    | 1001 | 9001    | 2021-06-02 19:01:01 | 2021-06-02 19:32:00 | 20     |
| 6    | 1001 | 9002    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 5    | 1001 | 9002    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 89     |
| 11   | 1002 | 9001    | 2020-01-01 12:01:01 | 2020-01-01 12:31:01 | 81     |
| 12   | 1002 | 9002    | 2020-02-01 12:01:01 | 2020-02-01 12:31:01 | 82     |
| 13   | 1002 | 9002    | 2020-02-02 12:11:01 | 2020-02-02 12:31:01 | 83     |
| 7    | 1002 | 9002    | 2021-05-05 18:01:01 | 2021-05-05 18:59:02 | 90     |
| 16   | 1002 | 9001    | 2021-09-06 12:01:01 | 2021-09-06 12:21:01 | 80     |
| 17   | 1002 | 9001    | 2021-09-06 12:01:01 | (NULL)              | (NULL) |
| 18   | 1002 | 9001    | 2021-09-07 12:01:01 | (NULL)              | (NULL) |
| 8    | 1003 | 9003    | 2021-02-06 12:01:01 | (NULL)              | (NULL) |
| 9    | 1003 | 9001    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 89     |
| 10   | 1004 | 9002    | 2021-08-06 12:01:01 | (NULL)              | (NULL) |
| 14   | 1005 | 9001    | 2021-02-01 11:01:01 | 2021-02-01 11:31:01 | 84     |
| 15   | 1006 | 9001    | 2021-02-01 11:01:01 | 2021-02-01 11:31:01 | 84     |

题目练习记录表 `practice_record`（`uid` 用户 ID, `question_id` 题目 ID, `submit_time` 提交时间, `score` 得分）：

| id   | uid  | question_id | submit_time         | score |
| ---- | ---- | ----------- | ------------------- | ----- |
| 1    | 1001 | 8001        | 2021-08-02 11:41:01 | 60    |
| 2    | 1002 | 8001        | 2021-09-02 19:30:01 | 50    |
| 3    | 1002 | 8001        | 2021-09-02 19:20:01 | 70    |
| 4    | 1002 | 8002        | 2021-09-02 19:38:01 | 70    |
| 5    | 1003 | 8002        | 2021-09-01 19:38:01 | 80    |

请找到昵称以『牛客』开头『号』结尾、成就值在 1200~2500 之间，且最近一次活跃（答题或作答试卷）在 2021 年 9 月的用户信息。

由示例数据结果输出如下：

| uid  | nick_name | achievement |
| ---- | --------- | ----------- |
| 1002 | 牛客 2 号 | 1200        |

**解释**：昵称以『牛客』开头『号』结尾且成就值在 1200~2500 之间的有 1002、1004；

1002 最近一次试卷区活跃为 2021 年 9 月，最近一次题目区活跃为 2021 年 9 月；1004 最近一次试卷区活跃为 2021 年 8 月，题目区未活跃。

因此最终满足条件的只有 1002。

**思路**：

先根据条件列出主要查询语句

昵称以『牛客』开头『号』结尾: `nick_name LIKE "牛客%号"`

成就值在 1200~2500 之间：`achievement BETWEEN 1200 AND 2500`

第三个条件因为限定了为 9 月，所以直接写就行：`( date_format( record.submit_time, '%Y%m' )= 202109 OR date_format( pr.submit_time, '%Y%m' )= 202109 )`

**答案**：



```sql
SELECT DISTINCT u_info.uid,
                u_info.nick_name,
                u_info.achievement
FROM user_info u_info
LEFT JOIN exam_record record ON record.uid = u_info.uid
LEFT JOIN practice_record pr ON u_info.uid = pr.uid
WHERE u_info.nick_name LIKE "牛客%号"
  AND u_info.achievement BETWEEN 1200
  AND 2500
  AND (date_format(record.submit_time, '%Y%m')= 202109
       OR date_format(pr.submit_time, '%Y%m')= 202109)
GROUP BY u_info.uid
```

### 筛选昵称规则和试卷规则的作答记录（较难）

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name   | achievement | level | job  | register_time       |
| ---- | ---- | ----------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号   | 1900        | 2     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号   | 1200        | 3     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 ♂ | 2200        | 5     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号   | 2500        | 6     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 555 号 | 2000        | 7     | C++  | 2020-01-01 10:00:00 |
| 6    | 1006 | 666666      | 3000        | 6     | C++  | 2020-01-01 10:00:00 |

试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | C++  | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | c#   | hard       | 80       | 2020-01-01 10:00:00 |
| 3    | 9003    | SQL  | medium     | 70       | 2020-01-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:59 | 80     |
| 2    | 1001 | 9001    | 2021-05-02 10:01:01 | (NULL)              | (NULL) |
| 4    | 1001 | 9001    | 2021-06-02 19:01:01 | 2021-06-02 19:32:00 | 20     |
| 3    | 1001 | 9002    | 2021-02-02 19:01:01 | 2021-02-02 19:30:01 | 87     |
| 5    | 1001 | 9002    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 89     |
| 6    | 1001 | 9002    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 11   | 1002 | 9001    | 2020-01-01 12:01:01 | 2020-01-01 12:31:01 | 81     |
| 16   | 1002 | 9001    | 2021-09-06 12:01:01 | 2021-09-06 12:21:01 | 80     |
| 17   | 1002 | 9001    | 2021-09-06 12:01:01 | (NULL)              | (NULL) |
| 18   | 1002 | 9001    | 2021-09-07 12:01:01 | (NULL)              | (NULL) |
| 7    | 1002 | 9002    | 2021-05-05 18:01:01 | 2021-05-05 18:59:02 | 90     |
| 12   | 1002 | 9002    | 2020-02-01 12:01:01 | 2020-02-01 12:31:01 | 82     |
| 13   | 1002 | 9002    | 2020-02-02 12:11:01 | 2020-02-02 12:31:01 | 83     |
| 9    | 1003 | 9001    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 89     |
| 8    | 1003 | 9003    | 2021-02-06 12:01:01 | (NULL)              | (NULL) |
| 10   | 1004 | 9002    | 2021-08-06 12:01:01 | (NULL)              | (NULL) |
| 14   | 1005 | 9001    | 2021-02-01 11:01:01 | 2021-02-01 11:31:01 | 84     |
| 15   | 1006 | 9001    | 2021-02-01 11:01:01 | 2021-09-01 11:31:01 | 84     |

找到昵称以"牛客"+纯数字+"号"或者纯数字组成的用户对于字母 c 开头的试卷类别（如 C,C++,c#等）的已完成的试卷 ID 和平均得分，按用户 ID、平均分升序排序。由示例数据结果输出如下：

| uid  | exam_id | avg_score |
| ---- | ------- | --------- |
| 1002 | 9001    | 81        |
| 1002 | 9002    | 85        |
| 1005 | 9001    | 84        |
| 1006 | 9001    | 84        |

解释：昵称满足条件的用户有 1002、1004、1005、1006；

c 开头的试卷有 9001、9002；

满足上述条件的作答记录中，1002 完成 9001 的得分有 81、80，平均分为 81（80.5 取整四舍五入得 81）；

1002 完成 9002 的得分有 90、82、83，平均分为 85；

**思路**：

还是老样子，既然给出了条件，就先把各个条件先写出来

找到昵称以"牛客"+纯数字+"号"或者纯数字组成的用户： 我最开始是这么写的：`nick_name LIKE '牛客%号' OR nick_name REGEXP '^[0-9]+$'`，如果表中有个 “牛客 H 号” ，那也能通过。

所以这里还得用正则： `nick_name LIKE '^牛客[0-9]+号'`

对于字母 c 开头的试卷类别： `e_info.tag LIKE 'c%'` 或者 `tag regexp '^c|^C'` 第一个也能匹配到大写 C

**答案**：

```sql
SELECT UID,
       exam_id,
       ROUND(AVG(score), 0) avg_score
FROM exam_record
WHERE UID IN
    (SELECT UID
     FROM user_info
     WHERE nick_name RLIKE "^牛客[0-9]+号 $"
       OR nick_name RLIKE "^[0-9]+$")
  AND exam_id IN
    (SELECT exam_id
     FROM examination_info
     WHERE tag RLIKE "^[cC]")
  AND score IS NOT NULL
GROUP BY UID,exam_id
ORDER BY UID,avg_score;
```

### 根据指定记录是否存在输出不同情况（困难）

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name   | achievement | level | job  | register_time       |
| ---- | ---- | ----------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号   | 19          | 0     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号   | 1200        | 3     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 进击的 3 号 | 22          | 0     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号   | 25          | 0     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 555 号 | 2000        | 7     | C++  | 2020-01-01 10:00:00 |
| 6    | 1006 | 666666      | 3000        | 6     | C++  | 2020-01-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:59 | 80     |
| 2    | 1001 | 9001    | 2021-05-02 10:01:01 | (NULL)              | (NULL) |
| 3    | 1001 | 9002    | 2021-02-02 19:01:01 | 2021-02-02 19:30:01 | 87     |
| 4    | 1001 | 9002    | 2021-09-01 12:01:01 | (NULL)              | (NULL) |
| 5    | 1001 | 9003    | 2021-09-02 12:01:01 | (NULL)              | (NULL) |
| 6    | 1001 | 9004    | 2021-09-03 12:01:01 | (NULL)              | (NULL) |
| 7    | 1002 | 9001    | 2020-01-01 12:01:01 | 2020-01-01 12:31:01 | 99     |
| 8    | 1002 | 9003    | 2020-02-01 12:01:01 | 2020-02-01 12:31:01 | 82     |
| 9    | 1002 | 9003    | 2020-02-02 12:11:01 | (NULL)              | (NULL) |
| 10   | 1002 | 9002    | 2021-05-05 18:01:01 | (NULL)              | (NULL) |
| 11   | 1002 | 9001    | 2021-09-06 12:01:01 | (NULL)              | (NULL) |
| 12   | 1003 | 9003    | 2021-02-06 12:01:01 | (NULL)              | (NULL) |
| 13   | 1003 | 9001    | 2021-09-07 10:01:01 | 2021-09-07 10:31:01 | 89     |

请你筛选表中的数据，当有任意一个 0 级用户未完成试卷数大于 2 时，输出每个 0 级用户的试卷未完成数和未完成率（保留 3 位小数）；若不存在这样的用户，则输出所有有作答记录的用户的这两个指标。结果按未完成率升序排序。

由示例数据结果输出如下：

| uid  | incomplete_cnt | incomplete_rate |
| ---- | -------------- | --------------- |
| 1004 | 0              | 0.000           |
| 1003 | 1              | 0.500           |
| 1001 | 4              | 0.667           |

**解释**：0 级用户有 1001、1003、1004；他们作答试卷数和未完成数分别为：6:4、2:1、0:0；

存在 1001 这个 0 级用户未完成试卷数大于 2，因此输出这三个用户的未完成数和未完成率（1004 未作答过试卷，未完成率默认填 0，保留 3 位小数后是 0.000）；

结果按照未完成率升序排序。

附：如果 1001 不满足『未完成试卷数大于 2』，则需要输出 1001、1002、1003 的这两个指标，因为试卷作答记录表里只有这三个用户的作答记录。

**思路**：

先把可能满足条件**“0 级用户未完成试卷数大于 2”**的 SQL 写出来

```sql
SELECT ui.uid UID
FROM user_info ui
LEFT JOIN exam_record er ON ui.uid = er.uid
WHERE ui.uid IN
    (SELECT ui.uid
     FROM user_info ui
     LEFT JOIN exam_record er ON ui.uid = er.uid
     WHERE er.submit_time IS NULL
       AND ui.LEVEL = 0 )
GROUP BY ui.uid
HAVING sum(IF(er.submit_time IS NULL, 1, 0)) > 2
```

然后再分别写出两种情况的 SQL 查询语句：

情况 1. 查询存在条件要求的 0 级用户的试卷未完成率

```sql
SELECT
	tmp1.uid uid,
	sum(
	IF
	( er.submit_time IS NULL AND er.start_time IS NOT NULL, 1, 0 )) incomplete_cnt,
	round(
		sum(
		IF
		( er.submit_time IS NULL AND er.start_time IS NOT NULL, 1, 0 ))/ count( tmp1.uid ),
		3
	) incomplete_rate
FROM
	(
	SELECT DISTINCT
		ui.uid
	FROM
		user_info ui
		LEFT JOIN exam_record er ON ui.uid = er.uid
	WHERE
		er.submit_time IS NULL
		AND ui.LEVEL = 0
	) tmp1
	LEFT JOIN exam_record er ON tmp1.uid = er.uid
GROUP BY
	tmp1.uid
ORDER BY
	incomplete_rate
```

情况 2. 查询不存在条件要求时所有有作答记录的 yong 用户的试卷未完成率

```sql
SELECT
	ui.uid uid,
	sum( CASE WHEN er.submit_time IS NULL AND er.start_time IS NOT NULL THEN 1 ELSE 0 END ) incomplete_cnt,
	round(
		sum(
		IF
		( er.submit_time IS NULL AND er.start_time IS NOT NULL, 1, 0 ))/ count( ui.uid ),
		3
	) incomplete_rate
FROM
	user_info ui
	JOIN exam_record er ON ui.uid = er.uid
GROUP BY
	ui.uid
ORDER BY
	incomplete_rate
```

拼在一起，就是答案

```sql
WITH host_user AS
  (SELECT ui.uid UID
   FROM user_info ui
   LEFT JOIN exam_record er ON ui.uid = er.uid
   WHERE ui.uid IN
       (SELECT ui.uid
        FROM user_info ui
        LEFT JOIN exam_record er ON ui.uid = er.uid
        WHERE er.submit_time IS NULL
          AND ui.LEVEL = 0 )
   GROUP BY ui.uid
   HAVING sum(IF (er.submit_time IS NULL, 1, 0))> 2),
     tt1 AS
  (SELECT tmp1.uid UID,
                   sum(IF (er.submit_time IS NULL
                           AND er.start_time IS NOT NULL, 1, 0)) incomplete_cnt,
                   round(sum(IF (er.submit_time IS NULL
                                 AND er.start_time IS NOT NULL, 1, 0))/ count(tmp1.uid), 3) incomplete_rate
   FROM
     (SELECT DISTINCT ui.uid
      FROM user_info ui
      LEFT JOIN exam_record er ON ui.uid = er.uid
      WHERE er.submit_time IS NULL
        AND ui.LEVEL = 0 ) tmp1
   LEFT JOIN exam_record er ON tmp1.uid = er.uid
   GROUP BY tmp1.uid
   ORDER BY incomplete_rate),
     tt2 AS
  (SELECT ui.uid UID,
                 sum(CASE
                         WHEN er.submit_time IS NULL
                              AND er.start_time IS NOT NULL THEN 1
                         ELSE 0
                     END) incomplete_cnt,
                 round(sum(IF (er.submit_time IS NULL
                               AND er.start_time IS NOT NULL, 1, 0))/ count(ui.uid), 3) incomplete_rate
   FROM user_info ui
   JOIN exam_record er ON ui.uid = er.uid
   GROUP BY ui.uid
   ORDER BY incomplete_rate)
  (SELECT tt1.*
   FROM tt1
   LEFT JOIN
     (SELECT UID
      FROM host_user) t1 ON 1 = 1
   WHERE t1.uid IS NOT NULL )
UNION ALL
  (SELECT tt2.*
   FROM tt2
   LEFT JOIN
     (SELECT UID
      FROM host_user) t2 ON 1 = 1
   WHERE t2.uid IS NULL)
```

V2 版本（根据上面做出的改进，答案缩短了，逻辑更强）：

```sql
SELECT
	ui.uid,
	SUM(
	IF
	( start_time IS NOT NULL AND score IS NULL, 1, 0 )) AS incomplete_cnt,#3.试卷未完成数
	ROUND( AVG( IF ( start_time IS NOT NULL AND score IS NULL, 1, 0 )), 3 ) AS incomplete_rate #4.未完成率

FROM
	user_info ui
	LEFT JOIN exam_record USING ( uid )
WHERE
CASE

		WHEN (#1.当有任意一个0级用户未完成试卷数大于2时
		SELECT
			MAX( lv0_incom_cnt )
		FROM
			(
			SELECT
				SUM(
				IF
				( score IS NULL, 1, 0 )) AS lv0_incom_cnt
			FROM
				user_info
				JOIN exam_record USING ( uid )
			WHERE
				LEVEL = 0
			GROUP BY
				uid
			) table1
			)> 2 THEN
			uid IN ( #1.1找出每个0级用户
			SELECT uid FROM user_info WHERE LEVEL = 0 ) ELSE uid IN ( #2.若不存在这样的用户，找出有作答记录的用户
			SELECT DISTINCT uid FROM exam_record )
		END
		GROUP BY
			ui.uid
	ORDER BY
	incomplete_rate #5.结果按未完成率升序排序
```

### 各用户等级的不同得分表现占比（较难）

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name   | achievement | level | job  | register_time       |
| ---- | ---- | ----------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号   | 19          | 0     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号   | 1200        | 3     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 ♂ | 22          | 0     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号   | 25          | 0     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 555 号 | 2000        | 7     | C++  | 2020-01-01 10:00:00 |
| 6    | 1006 | 666666      | 3000        | 6     | C++  | 2020-01-01 10:00:00 |

试卷作答记录表 exam_record（uid 用户 ID, exam_id 试卷 ID, start_time 开始作答时间, submit_time 交卷时间, score 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:59 | 80     |
| 2    | 1001 | 9001    | 2021-05-02 10:01:01 | (NULL)              | (NULL) |
| 3    | 1001 | 9002    | 2021-02-02 19:01:01 | 2021-02-02 19:30:01 | 75     |
| 4    | 1001 | 9002    | 2021-09-01 12:01:01 | 2021-09-01 12:11:01 | 60     |
| 5    | 1001 | 9003    | 2021-09-02 12:01:01 | 2021-09-02 12:41:01 | 90     |
| 6    | 1001 | 9001    | 2021-06-02 19:01:01 | 2021-06-02 19:32:00 | 20     |
| 7    | 1001 | 9002    | 2021-09-05 19:01:01 | 2021-09-05 19:40:01 | 89     |
| 8    | 1001 | 9004    | 2021-09-03 12:01:01 | (NULL)              | (NULL) |
| 9    | 1002 | 9001    | 2020-01-01 12:01:01 | 2020-01-01 12:31:01 | 99     |
| 10   | 1002 | 9003    | 2020-02-01 12:01:01 | 2020-02-01 12:31:01 | 82     |
| 11   | 1002 | 9003    | 2020-02-02 12:11:01 | 2020-02-02 12:41:01 | 76     |

为了得到用户试卷作答的定性表现，我们将试卷得分按分界点[90,75,60]分为优良中差四个得分等级（分界点划分到左区间），请统计不同用户等级的人在完成过的试卷中各得分等级占比（结果保留 3 位小数），未完成过试卷的用户无需输出，结果按用户等级降序、占比降序排序。

由示例数据结果输出如下：

| level | score_grade | ratio |
| ----- | ----------- | ----- |
| 3     | 良          | 0.667 |
| 3     | 优          | 0.333 |
| 0     | 良          | 0.500 |
| 0     | 中          | 0.167 |
| 0     | 优          | 0.167 |
| 0     | 差          | 0.167 |

解释：完成过试卷的用户有 1001、1002；完成了的试卷对应的用户等级和分数等级如下：

| uid  | exam_id | score | level | score_grade |
| ---- | ------- | ----- | ----- | ----------- |
| 1001 | 9001    | 80    | 0     | 良          |
| 1001 | 9002    | 75    | 0     | 良          |
| 1001 | 9002    | 60    | 0     | 中          |
| 1001 | 9003    | 90    | 0     | 优          |
| 1001 | 9001    | 20    | 0     | 差          |
| 1001 | 9002    | 89    | 0     | 良          |
| 1002 | 9001    | 99    | 3     | 优          |
| 1002 | 9003    | 82    | 3     | 良          |
| 1002 | 9003    | 76    | 3     | 良          |

因此 0 级用户（只有 1001）的各分数等级比例为：优 1/6，良 1/6，中 1/6，差 3/6；3 级用户（只有 1002）各分数等级比例为：优 1/3，良 2/3。结果保留 3 位小数。

**思路**：

先把 **“将试卷得分按分界点[90,75,60]分为优良中差四个得分等级”**这个条件写出来，这里可以用到`case when`

```sql
CASE
		WHEN a.score >= 90 THEN
		'优'
		WHEN a.score < 90 AND a.score >= 75 THEN
		'良'
		WHEN a.score < 75 AND a.score >= 60 THEN
	'中' ELSE '差'
END
```

这题的关键点就在于这，其他剩下的就是条件拼接了

**答案**：

```sql
SELECT a.LEVEL,
       a.score_grade,
       ROUND(a.cur_count / b.total_num, 3) AS ratio
FROM
  (SELECT b.LEVEL AS LEVEL,
          (CASE
               WHEN a.score >= 90 THEN '优'
               WHEN a.score < 90
                    AND a.score >= 75 THEN '良'
               WHEN a.score < 75
                    AND a.score >= 60 THEN '中'
               ELSE '差'
           END) AS score_grade,
          count(1) AS cur_count
   FROM exam_record a
   LEFT JOIN user_info b ON a.uid = b.uid
   WHERE a.submit_time IS NOT NULL
   GROUP BY b.LEVEL,
            score_grade) a
LEFT JOIN
  (SELECT b.LEVEL AS LEVEL,
          count(b.LEVEL) AS total_num
   FROM exam_record a
   LEFT JOIN user_info b ON a.uid = b.uid
   WHERE a.submit_time IS NOT NULL
   GROUP BY b.LEVEL) b ON a.LEVEL = b.LEVEL
ORDER BY a.LEVEL DESC,
         ratio DESC
```

## 限量查询

### 注册时间最早的三个人

**描述**：

现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name   | achievement | level | job  | register_time       |
| ---- | ---- | ----------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1 号   | 19          | 0     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号   | 1200        | 3     | 算法 | 2020-02-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 ♂ | 22          | 0     | 算法 | 2020-01-02 10:00:00 |
| 4    | 1004 | 牛客 4 号   | 25          | 0     | 算法 | 2020-01-02 11:00:00 |
| 5    | 1005 | 牛客 555 号 | 4000        | 7     | C++  | 2020-01-11 10:00:00 |
| 6    | 1006 | 666666      | 3000        | 6     | C++  | 2020-11-01 10:00:00 |

请从中找到注册时间最早的 3 个人。由示例数据结果输出如下：

| uid  | nick_name   | register_time       |
| ---- | ----------- | ------------------- |
| 1001 | 牛客 1      | 2020-01-01 10:00:00 |
| 1003 | 牛客 3 号 ♂ | 2020-01-02 10:00:00 |
| 1004 | 牛客 4 号   | 2020-01-02 11:00:00 |

解释：按注册时间排序后选取前三名，输出其用户 ID、昵称、注册时间。

**答案**：

```sql
SELECT uid, nick_name, register_time
    FROM user_info
    ORDER BY register_time
    LIMIT 3
```

### 注册当天就完成了试卷的名单第三页（较难）

**描述**：现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name   | achievement | level | job  | register_time       |
| ---- | ---- | ----------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1      | 19          | 0     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号   | 1200        | 3     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 ♂ | 22          | 0     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号   | 25          | 0     | 算法 | 2020-01-01 10:00:00 |
| 5    | 1005 | 牛客 555 号 | 4000        | 7     | 算法 | 2020-01-11 10:00:00 |
| 6    | 1006 | 牛客 6 号   | 25          | 0     | 算法 | 2020-01-02 11:00:00 |
| 7    | 1007 | 牛客 7 号   | 25          | 0     | 算法 | 2020-01-02 11:00:00 |
| 8    | 1008 | 牛客 8 号   | 25          | 0     | 算法 | 2020-01-02 11:00:00 |
| 9    | 1009 | 牛客 9 号   | 25          | 0     | 算法 | 2020-01-02 11:00:00 |
| 10   | 1010 | 牛客 10 号  | 25          | 0     | 算法 | 2020-01-02 11:00:00 |
| 11   | 1011 | 666666      | 3000        | 6     | C++  | 2020-01-02 10:00:00 |

试卷信息表 examination_info（exam_id 试卷 ID, tag 试卷类别, difficulty 试卷难度, duration 考试时长, release_time 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | 算法 | hard       | 60       | 2020-01-01 10:00:00 |
| 2    | 9002    | 算法 | hard       | 80       | 2020-01-01 10:00:00 |
| 3    | 9003    | SQL  | medium     | 70       | 2020-01-01 10:00:00 |

试卷作答记录表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score |
| ---- | ---- | ------- | ------------------- | ------------------- | ----- |
| 1    | 1001 | 9001    | 2020-01-02 09:01:01 | 2020-01-02 09:21:59 | 80    |
| 2    | 1002 | 9003    | 2020-01-20 10:01:01 | 2020-01-20 10:10:01 | 81    |
| 3    | 1002 | 9002    | 2020-01-01 12:11:01 | 2020-01-01 12:31:01 | 83    |
| 4    | 1003 | 9002    | 2020-01-01 19:01:01 | 2020-01-01 19:30:01 | 75    |
| 5    | 1004 | 9002    | 2020-01-01 12:01:01 | 2020-01-01 12:11:01 | 60    |
| 6    | 1005 | 9002    | 2020-01-01 12:01:01 | 2020-01-01 12:41:01 | 90    |
| 7    | 1006 | 9001    | 2020-01-02 19:01:01 | 2020-01-02 19:32:00 | 20    |
| 8    | 1007 | 9002    | 2020-01-02 19:01:01 | 2020-01-02 19:40:01 | 89    |
| 9    | 1008 | 9003    | 2020-01-02 12:01:01 | 2020-01-02 12:20:01 | 99    |
| 10   | 1008 | 9001    | 2020-01-02 12:01:01 | 2020-01-02 12:31:01 | 98    |
| 11   | 1009 | 9002    | 2020-01-02 12:01:01 | 2020-01-02 12:31:01 | 82    |
| 12   | 1010 | 9002    | 2020-01-02 12:11:01 | 2020-01-02 12:41:01 | 76    |
| 13   | 1011 | 9001    | 2020-01-02 10:01:01 | 2020-01-02 10:31:01 | 89    |

![](images\D2B491866B85826119EE3474F10D3636.png)

找到求职方向为算法工程师，且注册当天就完成了算法类试卷的人，按参加过的所有考试最高得分排名。排名榜很长，我们将采用分页展示，每页 3 条，现在需要你取出第 3 页（页码从 1 开始）的人的信息。

由示例数据结果输出如下：

| uid  | level | register_time       | max_score |
| ---- | ----- | ------------------- | --------- |
| 1010 | 0     | 2020-01-02 11:00:00 | 76        |
| 1003 | 0     | 2020-01-01 10:00:00 | 75        |
| 1004 | 0     | 2020-01-01 11:00:00 | 60        |

解释：除了 1011 其他用户的求职方向都为算法工程师；算法类试卷有 9001 和 9002，11 个用户注册当天都完成了算法类试卷；计算他们的所有考试最大分时，只有 1002 和 1008 完成了两次考试，其他人只完成了一场考试，1002 两场考试最高分为 81，1008 最高分为 99。

按最高分排名如下：

| uid  | level | register_time       | max_score |
| ---- | ----- | ------------------- | --------- |
| 1008 | 0     | 2020-01-02 11:00:00 | 99        |
| 1005 | 7     | 2020-01-01 10:00:00 | 90        |
| 1007 | 0     | 2020-01-02 11:00:00 | 89        |
| 1002 | 3     | 2020-01-01 10:00:00 | 83        |
| 1009 | 0     | 2020-01-02 11:00:00 | 82        |
| 1001 | 0     | 2020-01-01 10:00:00 | 80        |
| 1010 | 0     | 2020-01-02 11:00:00 | 76        |
| 1003 | 0     | 2020-01-01 10:00:00 | 75        |
| 1004 | 0     | 2020-01-01 11:00:00 | 60        |
| 1006 | 0     | 2020-01-02 11:00:00 | 20        |

每页 3 条，第三页也就是第 7~9 条，返回 1010、1003、1004 的行记录即可。

**思路**：

1. 每页三条，即需要取出第三页的人的信息，要用到`limit`
2. 统计求职方向为算法工程师且注册当天就完成了算法类试卷的人的**信息和每次记录的得分**，先求满足条件的用户，后用 left join 做连接查找信息和每次记录的得分

**答案**：

```sql
SELECT t1.uid,
       LEVEL,
       register_time,
       max(score) AS max_score
FROM exam_record t
JOIN examination_info USING (exam_id)
JOIN user_info t1 ON t.uid = t1.uid
AND date(t.submit_time) = date(t1.register_time)
WHERE job = '算法'
  AND tag = '算法'
GROUP BY t1.uid,
         LEVEL,
         register_time
ORDER BY max_score DESC
LIMIT 6,3
```

## 文本转换函数

### 修复串列了的记录

**描述**：现有试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag            | difficulty | duration | release_time        |
| ---- | ------- | -------------- | ---------- | -------- | ------------------- |
| 1    | 9001    | 算法           | hard       | 60       | 2021-01-01 10:00:00 |
| 2    | 9002    | 算法           | hard       | 80       | 2021-01-01 10:00:00 |
| 3    | 9003    | SQL            | medium     | 70       | 2021-01-01 10:00:00 |
| 4    | 9004    | 算法,medium,80 |            | 0        | 2021-01-01 10:00:00 |

录题同学有一次手误将部分记录的试题类别 tag、难度、时长同时录入到了 tag 字段，请帮忙找出这些录错了的记录，并拆分后按正确的列类型输出。

由示例数据结果输出如下：

| exam_id | tag  | difficulty | duration |
| ------- | ---- | ---------- | -------- |
| 9004    | 算法 | medium     | 80       |

**思路**：

先来学习下本题要用到的函数

`SUBSTRING_INDEX` 函数用于提取字符串中指定分隔符的部分。它接受三个参数：原始字符串、分隔符和指定要返回的部分的数量。

以下是 `SUBSTRING_INDEX` 函数的语法：

```sql
SUBSTRING_INDEX(str, delimiter, count)
```

- `str`：要进行分割的原始字符串。
- `delimiter`：用作分割的字符串或字符。
- `count`：指定要返回的部分的数量。 
  - 如果 `count` 大于 0，则返回从左边开始的前 `count` 个部分（以分隔符为界）。
  - 如果 `count` 小于 0，则返回从右边开始的前 `count` 个部分（以分隔符为界），即从右侧向左计数。

下面是一些示例，演示了 `SUBSTRING_INDEX` 函数的使用：

1. 提取字符串中的第一个部分：

```sql
SELECT SUBSTRING_INDEX('apple,banana,cherry', ',', 1);
-- 输出结果：'apple'
```

2. 提取字符串中的最后一个部分：

```sql
SELECT SUBSTRING_INDEX('apple,banana,cherry', ',', -1);
-- 输出结果：'cherry'
```

3. 提取字符串中的前两个部分：

```sql
SELECT SUBSTRING_INDEX('apple,banana,cherry', ',', 2);
-- 输出结果：'apple,banana'
```

4. 提取字符串中的最后两个部分：

```sql
SELECT SUBSTRING_INDEX('apple,banana,cherry', ',', -2);
-- 输出结果：'banana,cherry'
```

**答案**：

```sql
SELECT
	exam_id,
	substring_index( tag, ',', 1 ) tag,
	substring_index( substring_index( tag, ',', 2 ), ',',- 1 ) difficulty,
	substring_index( tag, ',',- 1 ) duration
FROM
	examination_info
WHERE
	difficulty = ''
```

### 对过长的昵称截取处理

**描述**：现有用户信息表 `user_info`（`uid` 用户 ID，`nick_name` 昵称, `achievement` 成就值, `level` 等级, `job` 职业方向, `register_time` 注册时间）：

| id   | uid  | nick_name              | achievement | level | job  | register_time       |
| ---- | ---- | ---------------------- | ----------- | ----- | ---- | ------------------- |
| 1    | 1001 | 牛客 1                 | 19          | 0     | 算法 | 2020-01-01 10:00:00 |
| 2    | 1002 | 牛客 2 号              | 1200        | 3     | 算法 | 2020-01-01 10:00:00 |
| 3    | 1003 | 牛客 3 号 ♂            | 22          | 0     | 算法 | 2020-01-01 10:00:00 |
| 4    | 1004 | 牛客 4 号              | 25          | 0     | 算法 | 2020-01-01 11:00:00 |
| 5    | 1005 | 牛客 5678901234 号     | 4000        | 7     | 算法 | 2020-01-11 10:00:00 |
| 6    | 1006 | 牛客 67890123456789 号 | 25          | 0     | 算法 | 2020-01-02 11:00:00 |

有的用户的昵称特别长，在一些展示场景会导致样式混乱，因此需要将特别长的昵称转换一下再输出，请输出字符数大于 10 的用户信息，对于字符数大于 13 的用户输出前 10 个字符然后加上三个点号：『...』。

由示例数据结果输出如下：

| uid  | nick_name          |
| ---- | ------------------ |
| 1005 | 牛客 5678901234 号 |
| 1006 | 牛客 67890123...   |

解释：字符数大于 10 的用户有 1005 和 1006，长度分别为 13、17；因此需要对 1006 的昵称截断输出。

**思路**：

这题涉及到字符的计算，要计算字符串的字符数（即字符串的长度），可以使用 `LENGTH` 函数或 `CHAR_LENGTH` 函数。这两个函数的区别在于对待多字节字符的方式。

1. `LENGTH` 函数：它返回给定字符串的字节数。对于包含多字节字符的字符串，每个字符都会被当作一个字节来计算。

示例：

```sql
SELECT LENGTH('你好'); -- 输出结果：6，因为 '你好' 中的每个汉字每个占3个字节
```

2. `CHAR_LENGTH` 函数：它返回给定字符串的字符数。对于包含多字节字符的字符串，每个字符会被当作一个字符来计算。

示例：

```sql
SELECT CHAR_LENGTH('你好'); -- 输出结果：2，因为 '你好' 中有两个字符，即两个汉字
```

**答案**：

```sql
SELECT
	uid,
CASE

		WHEN CHAR_LENGTH( nick_name ) > 13 THEN
		CONCAT( SUBSTR( nick_name, 1, 10 ), '...' ) ELSE nick_name
	END AS nick_name
FROM
	user_info
WHERE
	CHAR_LENGTH( nick_name ) > 10
GROUP BY
	uid;
```

### 大小写混乱时的筛选统计（较难）

**描述**：

现有试卷信息表 `examination_info`（`exam_id` 试卷 ID, `tag` 试卷类别, `difficulty` 试卷难度, `duration` 考试时长, `release_time` 发布时间）：

| id   | exam_id | tag  | difficulty | duration | release_time        |
| ---- | ------- | ---- | ---------- | -------- | ------------------- |
| 1    | 9001    | 算法 | hard       | 60       | 2021-01-01 10:00:00 |
| 2    | 9002    | C++  | hard       | 80       | 2021-01-01 10:00:00 |
| 3    | 9003    | C++  | hard       | 80       | 2021-01-01 10:00:00 |
| 4    | 9004    | sql  | medium     | 70       | 2021-01-01 10:00:00 |
| 5    | 9005    | C++  | hard       | 80       | 2021-01-01 10:00:00 |
| 6    | 9006    | C++  | hard       | 80       | 2021-01-01 10:00:00 |
| 7    | 9007    | C++  | hard       | 80       | 2021-01-01 10:00:00 |
| 8    | 9008    | SQL  | medium     | 70       | 2021-01-01 10:00:00 |
| 9    | 9009    | SQL  | medium     | 70       | 2021-01-01 10:00:00 |
| 10   | 9010    | SQL  | medium     | 70       | 2021-01-01 10:00:00 |

试卷作答信息表 `exam_record`（`uid` 用户 ID, `exam_id` 试卷 ID, `start_time` 开始作答时间, `submit_time` 交卷时间, `score` 得分）：

| id   | uid  | exam_id | start_time          | submit_time         | score  |
| ---- | ---- | ------- | ------------------- | ------------------- | ------ |
| 1    | 1001 | 9001    | 2020-01-01 09:01:01 | 2020-01-01 09:21:59 | 80     |
| 2    | 1002 | 9003    | 2020-01-20 10:01:01 | 2020-01-20 10:10:01 | 81     |
| 3    | 1002 | 9002    | 2020-02-01 12:11:01 | 2020-02-01 12:31:01 | 83     |
| 4    | 1003 | 9002    | 2020-03-01 19:01:01 | 2020-03-01 19:30:01 | 75     |
| 5    | 1004 | 9002    | 2020-03-01 12:01:01 | 2020-03-01 12:11:01 | 60     |
| 6    | 1005 | 9002    | 2020-03-01 12:01:01 | 2020-03-01 12:41:01 | 90     |
| 7    | 1006 | 9001    | 2020-05-02 19:01:01 | 2020-05-02 19:32:00 | 20     |
| 8    | 1007 | 9003    | 2020-01-02 19:01:01 | 2020-01-02 19:40:01 | 89     |
| 9    | 1008 | 9004    | 2020-02-02 12:01:01 | 2020-02-02 12:20:01 | 99     |
| 10   | 1008 | 9001    | 2020-02-02 12:01:01 | 2020-02-02 12:31:01 | 98     |
| 11   | 1009 | 9002    | 2020-02-02 12:01:01 | 2020-01-02 12:43:01 | 81     |
| 12   | 1010 | 9001    | 2020-01-02 12:11:01 | (NULL)              | (NULL) |
| 13   | 1010 | 9001    | 2020-02-02 12:01:01 | 2020-01-02 10:31:01 | 89     |

试卷的类别 tag 可能出现大小写混乱的情况，请先筛选出试卷作答数小于 3 的类别 tag，统计将其转换为大写后对应的原本试卷作答数。

如果转换后 tag 并没有发生变化，不输出该条结果。

由示例数据结果输出如下：

| tag  | answer_cnt |
| ---- | ---------- |
| C++  | 6          |

解释：被作答过的试卷有 9001、9002、9003、9004，他们的 tag 和被作答次数如下：

| exam_id | tag  | answer_cnt |
| ------- | ---- | ---------- |
| 9001    | 算法 | 4          |
| 9002    | C++  | 6          |
| 9003    | c++  | 2          |
| 9004    | sql  | 2          |

作答次数小于 3 的 tag 有 c++和 sql，而转为大写后只有 C++本来就有作答数，于是输出 c++转化大写后的作答次数为 6。

**思路**：

首先，这题有点混乱，9004 根据示例数据查出来只有 1 次，这里显示有 2 次。

先看一下大小写转换函数：

1.`UPPER(s)`或`UCASE(s)`函数可以将字符串 s 中的字母字符全部转换成大写字母；

2.`LOWER(s)`或者`LCASE(s)`函数可以将字符串 s 中的字母字符全部转换成小写字母。

难点在于相同表做连接要查询不同的值

**答案**：

```sql
WITH a AS
  (SELECT tag,
          COUNT(start_time) AS answer_cnt
   FROM exam_record er
   JOIN examination_info ei ON er.exam_id = ei.exam_id
   GROUP BY tag)
SELECT a.tag,
       b.answer_cnt
FROM a
INNER JOIN a AS b ON UPPER(a.tag)= b.tag #a小写 b大写
AND a.tag != b.tag
WHERE a.answer_cnt < 3;
```





