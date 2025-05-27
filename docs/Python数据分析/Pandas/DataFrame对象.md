# 图解

每一列每一行都是一个Series对象，多个Series对象合为DataFrame对象

![https://www.writebug.com/static/uploads/2023/7/4/eb3f08bd5ddf00c3f49cdd3ce87ad7bd.png](https://www.writebug.com/static/uploads/2023/7/4/eb3f08bd5ddf00c3f49cdd3ce87ad7bd.png)

![image.png](https://tc-cdn.flowus.cn/oss/6fbf7f7b-678c-4db1-a03c-699844d1b7e1/image.png?time=1747466100&token=26098d64ee5b9b58d0f30a545f925f48934d3dc7c0a60d0bced3b50e7067d713&role=sharePaid)

# 创建

`DataFrame(data=None, index=None, columns=None, dtype=None, copy=None)`

类似Series对象

1. **data**: 数据。可以是ndarray数组、series对象、列表、字典等

2. **index**: 行索引（标签）

3. **columns**: 列索引（标签）

4. dtype: 每一列数据类型

  |Pandas数据类型|Python数据类型|
|-|-|
|object |str |
|int64 |int|
|float64 |float|
|bool |bool |
|datetime64 |datetime64[ns]|
|timedelta[ns]|NA|
|category |NA|

5. copy: 用于复制数据

```Python
import pandas as pd

pd.set_option("display.unicode.east_asian_width", True)  # 输出列名对齐
pd.set_option("display.max_rows", 1000)  # 修改最大行数，防止行显示不全
pd.set_option("display.max_columns", 1000)  # 修改最大列数，防止列显示不全

# 二维数组创建: 行为单位
data = [[90, 70, 100], 
        [100, 80, 88], 
        [85, 90, 95]]
index = ["小明", "小红", "小亮"]
columns = ["语文", "数学", "英语"]
df1 = pd.DataFrame(data=data, index=index, columns=columns)
print(df1)
"""
      语文  数学  英语
小明    90    70   100
小红   100    80    88
小亮    85    90    95
"""
data = [[90, 70, 100], 
        [100, 80, 88], 
        [85, None, 95]]
index = ["小明", "小红", "小亮"]
df2 = pd.DataFrame(data=data, index=index, columns=[1, 2, 3])
print(df2)
"""
        1     2    3
小明   90  70.0  100
小红  100  80.0   88
小亮   85   NaN   95
"""



# 字典创建: 列为单位
data = {
    "语文": [90, 100, 85],
    "数学": [70, 80, 90],
    "英语": [100, 88, 95],
    "班级": "高一7班"        # 单一数据自动填充
}
index = ["小明", "小红", "小亮"]
df3 = pd.DataFrame(data=data, index=index)
print(df3)
"""
      语文  数学  英语     班级
小明    90    70   100  高一7班
小红   100    80    88  高一7班
小亮    85    90    95  高一7班
"""
```


# 操作

同Series对象

# 索引

6. 标签索引：行标签、列标签

7. 位置索引：行位置、列位置

## 单值索引：索引列

只能标签索引

```Python
print(df1.语文)    # 不推荐使用
"""
小明     90
小红    100
小亮     90
Name: 语文, dtype: int64
"""

print(df1["语文"]) # 推荐使用
"""
小明     90
小红    100
小亮     90
Name: 语文, dtype: int64
"""
```


## 多值索引：索引列

只能标签索引

```Python
print(df1[["语文", "数学"]])
"""
      语文  数学
小明    90    90
小红   100    80
小亮    90    90
"""
```


## 切片索引：索引行

```Python
# 标签切片：包头包尾
print(df1["小明":"小红"])
"""
      语文  数学  英语
小明    90    90   100
小红   100    80    80
"""

# 位置切片：包头不包尾
print(df1[0:2])
"""
      语文  数学  英语
小明    90    90   100
小红   100    80    80
"""
```


## 条件索引

```Python
print(df1[df1 >= 90])
"""
      语文  数学   英语
小明    90  90.0  100.0
小红   100   NaN    NaN
小亮    90  90.0    NaN
"""

print(df1[df1["数学"] >= 90])
"""
      语文  数学  英语
小明    90    90   100
小亮    90    90    80
"""
```


## loc[index, column]标签索引

行和列可以采用不同的方式索引

8. **单值索引**

  ```Python
print(df1.loc[:, "语文"]) # 行位置其实就是一个从头到尾的切片
"""
小明     90
小红    100
小亮     90
Name: 语文, dtype: int64
"""

print(df1.loc["小明"])    # 等价于df1.loc["小明", :]
"""
语文     90
数学     90
英语    100
Name: 小明, dtype: int64
"""

print(df1.loc["小明", "语文"])
"""
90
"""
```


9. **多值索引**

  ```Python
print(df1.loc[:, ["语文", "数学"]])
"""
      语文  数学
小明    90    90
小红   100    80
小亮    90    90
"""

print(df1.loc[["小明", "小亮"]])    # 等价于df1.loc[["小明", "小亮"], :]
"""
      语文  数学  英语
小明    90    90   100
小亮    90    90    80
"""

print(df1.loc[["小明", "小亮"], ["语文", "数学"]])
"""
      语文  数学
小明    90    90
小亮    90    90
"""
```


10. **切片索引：包头包尾**

  ```Python
print(df1.loc[:, "数学":"英语"])
"""
      数学  英语
小明    90   100
小红    80    80
小亮    90    80
"""

print(df1.loc["小红":"小亮"])    # 等价于df1.loc["小红":"小亮", :]
"""
      语文  数学  英语
小红   100    80    80
小亮    90    90    80
"""

print(df1.loc["小红":"小亮", "数学":"英语"])
"""
      数学  英语
小红    80    80
小亮    90    80
"""
```


11. **条件索引**

  ```Python
print(df1.loc[:, df1.loc["小明"] > 80])
"""
      语文  数学  英语
小明    90    90   100
小红   100    80    80
小亮    90    90    80
"""

print(df1.loc[df1["语文"] > 90])
"""
      语文  数学  英语
小红   100    80    80
"""

print(df1.loc[df1["语文"] > 90, df1.loc["小明"] > 80])
"""
      语文  数学  英语
小红   100    80    80
"""
```


## iloc[index, column]位置索引

行和列可以采用不同的方式索引

12. **单值索引**

  ```Python
print(df1.iloc[:, 0])
"""
小明     90
小红    100
小亮     90
Name: 语文, dtype: int64
"""

print(df1.iloc[0])    # 等价于df1.iloc[0, :]
"""
语文     90
数学     90
英语    100
Name: 小明, dtype: int64
"""

print(df1.iloc[0, 0])
"""
90
"""
```


13. **多值索引**

  ```Python
print(df1.iloc[:, [0, 1]])
"""
      语文  数学
小明    90    90
小红   100    80
小亮    90    90
"""

print(df1.iloc[[0, 2]])    # 等价于df1.iloc[[0, 2], :]
"""
      语文  数学  英语
小明    90    90   100
小亮    90    90    80
"""

print(df1.iloc[[0, 2], [0, 1]])
"""
      语文  数学
小明    90    90
小亮    90    90
"""
```


14. **切片索引：包头不包尾**

  ```Python
print(df1.iloc[:, :2])
"""
      语文  数学
小明    90    90
小红   100    80
小亮    90    90
"""

print(df1.iloc[:2])    # 等价于df1.iloc[:2, :]
"""
      语文  数学  英语
小明    90    90   100
小红   100    80    80
"""

print(df1.iloc[:2, :2])
"""
      语文  数学
小明    90    90
小红   100    80
"""
```


## iat[index, column]位置索引

```Python
print(df1.iat[0, 0])
"""
90
"""
```


# 属性

## values

`df.values`

查看所有数据

```Python
print(df1.values)
"""
[[ 90  70 100]
 [100  80  88]
 [ 85  90  95]]
"""
```


## dtypes

`df.dtypes`

查看所有数据的类型

```Python
print(df1.dtypes)
"""
语文    int64
数学    int64
英语    int64
dtype: object
"""

print(df2.dtypes)
"""
1      int64
2    float64
3      int64
dtype: object
"""

print(df3.dtypes)
"""
语文     int64
数学     int64
英语     int64
班级    object
dtype: object
"""
```


## index

`df.index`

查看所有行标签，赋值可修改

```Python
print(df1.index)
"""
Index(['小明', '小红', '小亮'], dtype='object')
"""

df1.index = [1, 2, 3]
print(df1)
print(df1.index)
"""
   语文  数学  英语
1    90    70   100
2   100    80    88
3    85    90    95

Index([1, 2, 3], dtype='int64')
"""

df1.index = ["小明", "小红", "小亮"]
```


## columns

`df.columns`

查看所有列标签，赋值可修改

```Python
print(df1.columns)
"""
Index(['语文', '数学', '英语'], dtype='object')
"""

df1.columns = [1, 2, 3]
print(df1)
print(df1.columns)
"""
        1   2    3
小明   90  70  100
小红  100  80   88
小亮   85  90   95

Index([1, 2, 3], dtype='int64')
"""

df1.columns = ["语文", "数学", "英语"]
```


## T

`df.T`

行列转置，返回副本

```Python
print(df1)
"""
      语文  数学  英语
小明    90    70   100
小红   100    80    88
小亮    85    90    95
"""

print(df1.T)
"""
      小明  小红  小亮
语文    90   100    85
数学    70    80    90
英语   100    88    95
"""

print(df1)
"""
      语文  数学  英语
小明    90    70   100
小红   100    80    88
小亮    85    90    95
"""
```


## head

`df.head(n=5)`

等价于`df[:n]`，n默认5。n为正数时指前n行，n为负数时指除去后|n|行

```Python
print(df1.head())
"""
      语文  数学  英语
小明    90    70   100
小红   100    80    88
小亮    85    90    95
"""

print(df1.head(2))
"""
      语文  数学  英语
小明    90    70   100
小红   100    80    88
"""

print(df1.head(-2))
"""
      语文  数学  英语
小明    90    70   100
"""
```


## tail

`df.tail(n=5)`

等价于`df[-n:]`，n默认5。n为正数时指后n行，n为负数时指除去前|n|行

```Python
print(df1.tail())
"""
       语文  数学  英语
小明    90    70   100
小红   100    80    88
小亮    85    90    95
"""

print(df1.tail(2))
"""
      语文  数学  英语
小红   100    80    88
小亮    85    90    95
"""

print(df1.tail(-2))
"""
      语文  数学  英语
小亮    85    90    95
"""
```


## shape

`df.shape`

查看行数和列数

```Python
print(df1.shape)
"""
(3, 3)
"""
```


## info

`df.info()`

查看索引、数据类型和内存信息

```Python
print(df1.info())
"""
<class 'pandas.core.frame.DataFrame'>
Index: 3 entries, 小明 to 小亮
Data columns (total 3 columns):
 #   Column  Non-Null Count  Dtype
---  ------  --------------  -----
 0   语文      3 non-null      int64
 1   数学      3 non-null      int64
 2   英语      3 non-null      int64
dtypes: int64(3)
memory usage: 204.0+ bytes
None
"""
```


# 增加

类似Series对象，通过索引赋值实现，索引不存在则增加数据，索引存在则修改数据。此外也有函数实现。

## insert

`df.insert(loc, column, value, allow_duplicates=False)`

在原DataFrame对象指定位置插入一列

15. **loc**: 插入的位置

16. **column**: 插入列的标签

17. **value**: 插入的数据，可以是数值、Series对象、数组

18. **allow_duplicates**: 是否允许列标签重复，默认False

```Python
df_inserted = df1.copy()
"""
      语文  数学  英语
小明    90    70   100
小红   100    80    88
小亮    85    90    95
"""

df_inserted.insert(1, "历史", [90, 89, 97])
"""
      语文  历史  数学  英语
小明    90    90    70   100
小红   100    89    80    88
小亮    85    97    90    95
"""

df_inserted.insert(1, "历史", [91, 79, 87], allow_duplicates=True)
"""
      语文  历史  历史  数学  英语
小明    90    91    90    70   100
小红   100    79    89    80    88
小亮    85    87    97    90    95
"""
```


## assign

`df.assign(**kwargs)`

追加任意列，返回副本；列标签存在则改写原有列

```Python
df_assigned = df1.assign(历史=[91, 79, 87], 政治=[90, 89, 97])
"""
      语文  数学  英语  历史  政治
小明    90    70   100    91    90
小红   100    80    88    79    89
小亮    85    90    95    87    97
"""

df_assigned = df1.assign(历史=[91, 79, 87], 语文=[90, 89, 97])
"""
      语文  数学  英语  历史
小明    90    90   100    91
小红    89    80    80    79
小亮    97    90    80    87
"""

df_assigned = df1.assign(总分=df1["语文"]+df1["数学"]+df1["英语"])
"""
      语文  数学  英语  总分
小明    90    70   100   260
小红   100    80    88   268
小亮    85    90    95   270
"""
```


# 修改

## rename

`df.rename(mapper, axis=0, copy=True, inplace=False, level=None, errors="ignore")`
`df.rename(index=index_mapper, columns=columns_mapper, copy=True, inplace=False, level=None, errors="ignore")`

指定修改行列标签

19. **mapper**: 规定如何修改，可以是字典或者函数，需搭配axis来确定修改行或列标签

20. **axis**: 0或"index"修改行标签（默认）；1或"columns"修改列标签

21. **index**: 规定如何修改行标签 <=> (mapper, axis=0)

22. **columns**: 规定如何修改列标签 <=> (mapper, axis=1)

23. copy: 是否同时复制基础数据作为副本，默认为True。若inplace=True，该参数将被忽略

24. inplace: 是否直接修改原对象，如果为False，将返回副本;如果为True则返回None，直接修改原对象。默认False

25. level: 指定索引级别

26. errors: 当字典的键并非已存在的标签时是引发报错还是忽略，可选"raise"和"ignore"，默认为"ignore"

```Python
df_rename = df1.copy()
print(df_rename)
"""
      语文  数学  英语
小明    90    70   100
小红   100    80    88
小亮    85    90    95
"""

df_rename_index = df_rename.rename(index={"小明": 1, "小亮": 3})
print(df_rename_index)
"""
      语文  数学  英语
1       90    70   100
小红   100    80    88
3       85    90    95
"""

df_rename_columns = df_rename.rename(columns={"语文": 1, "数学": 2})
print(df_rename_columns)
"""
        1   2  英语
小明   90  70   100
小红  100  80    88
小亮   85  90    95
"""

df_rename_index = df_rename.rename(index=str.upper)
print(df_rename_index)
"""
   语文  数学  英语
A    90    70   100
B   100    80    88
C    85    90    95
"""

df_rename_columns = df_rename.rename(columns={"语文": 1, "数学": 2, "历史": 10})
print(df_rename_columns)
"""
     1   2  英语
a   90  70   100
b  100  80    88
c   85  90    95
"""

df_rename_columns = df_rename.rename(columns={"语文": 1, "数学": 2, "历史": 10}, errors="raise")
print(df_rename_columns)
"""
KeyError: "['历史'] not found in axis"
"""
```


## set_index

`df.set_index(keys, *, drop=True, append=False, inplace=False, verify_integrity=False)`

将现有列或者新序列设置为索引列

27. **keys**：一个或多个现有列或者新序列

28. **drop**：是否移除作为新索引列的原列。默认True

29. **append**：是否仅在原索引列后追加新索引列，不删除原索引列。默认False

30. inplace：是否改变原对象。默认False

31. **verify_integrity**：是否检查索引列重复值，重复则报错。默认False

```Python
df_score = pd.DataFrame(data={"姓名": ["小郑", "小张", "小文", "小红", "小明", "小明"],
                              "学号2": ["07", "02", "08", "04", "01", "09"],
                              "语文": [90, 95, 91, 90, 85, 89],
                              "数学": [91, 90, 85, 80, 99, 97],
                              "英语": [95, 97, 98, 94, 92, 87],
                              "排名": [7, 2, 8, 4, 1, 9]})
print(df_score)
"""
   姓名 学号2  语文  数学  英语  排名
0  小郑    07    90    91    95     7
1  小张    02    95    90    97     2
2  小文    08    91    85    98     8
3  小红    04    90    80    94     4
4  小明    01    85    99    92     1
5  小明    09    89    97    87     9
"""

print(df_score.set_index("姓名"))
"""
     学号2  语文  数学  英语  排名
姓名
小郑    07    90    91    95     7
小张    02    95    90    97     2
小文    08    91    85    98     8
小红    04    90    80    94     4
小明    01    85    99    92     1
小明    09    89    97    87     9
"""

print(df_score.set_index("姓名", drop=False))
"""
      姓名 学号2  语文  数学  英语  排名
姓名
小郑  小郑    07    90    91    95     7
小张  小张    02    95    90    97     2
小文  小文    08    91    85    98     8
小红  小红    04    90    80    94     4
小明  小明    01    85    99    92     1
小明  小明    09    89    97    87     9
"""

print(df_score.set_index("姓名", append=True))
"""
       学号2  语文  数学  英语  排名
  姓名
0 小郑    07    90    91    95     7
1 小张    02    95    90    97     2
2 小文    08    91    85    98     8
3 小红    04    90    80    94     4
4 小明    01    85    99    92     1
5 小明    09    89    97    87     9
"""

print(df_score.set_index("姓名", verify_integrity=True))
"""
ValueError: Index has duplicate keys: Index(['小明'], dtype='object', name='姓名')
"""

print(df_score.set_index(["姓名", "学号2"]))
"""
            语文  数学  英语  排名
姓名 学号2
小郑 07       90    91    95     7
小张 02       95    90    97     2
小文 08       91    85    98     8
小红 04       90    80    94     4
小明 01       85    99    92     1
     09       89    97    87     9
"""

print(df_score.set_index(pd.Series([1, 2, 3, 4, 5, 6])))
"""
   姓名 学号2  语文  数学  英语  排名
1  小郑    07    90    91    95     7
2  小张    02    95    90    97     2
3  小文    08    91    85    98     8
4  小红    04    90    80    94     4
5  小明    01    85    99    92     1
6  小明    09    89    97    87     9
"""

print(df_score.set_index([pd.Series([1, 2, 3, 4, 5, 6]), "姓名"]))
"""
       学号2  语文  数学  英语  排名
  姓名
1 小郑    07    90    91    95     7
2 小张    02    95    90    97     2
3 小文    08    91    85    98     8
4 小红    04    90    80    94     4
5 小明    01    85    99    92     1
6 小明    09    89    97    87     9
"""

print(df_score.set_index([pd.Series([1, 2, 3, 4, 5, 6]), pd.Series([1, 2, 3, 4, 5, 6])*2]))
"""
      姓名 学号2  语文  数学  英语  排名
1 2   小郑    07    90    91    95     7
2 4   小张    02    95    90    97     2
3 6   小文    08    91    85    98     8
4 8   小红    04    90    80    94     4
5 10  小明    01    85    99    92     1
6 12  小明    09    89    97    87     9
"""
```


## reset_index

`df.reset_index(level=None, *, drop=False, inplace=False, col_level=0, col_fill='', allow_duplicates=<no_default>, names=None)`

重置索引列，并将原索引列插回数据列

32. **level**：指定重置的索引层级，可以是整数、字符串、元组、列表。默认None，即重置每一层索引

33. **drop**：是否删除原索引列而不插回原对象数据列。默认False，即插回数据列

34. inplace：同上

35. col_level：若列标签也有多个层级，指定将列标签插回的层级。默认0，插回第一层

36. col_fill：若列标签也有多个层级，则确定插回列其他级别的命名方式。默认""。如果 None ，则重复其名称

37. **allow_duplicates**：重置后，是否允许出现重复的列标签。默认不允许重复

38. **names**：重命名原索引层级再插回数据列，长度需与索引层数相同

```Python
df_info = pd.DataFrame(data={"姓名": ["小明", "小张", "小亮", "小红", "小白", "小李"],
                             "性别": ["男", "男", "女", "男", "女", "女"],
                             "年龄": [21, 22, 23, 20, 22, 25],
                             "学号1": ["01", "02", "03", "04", "05", "06"],
                             "排名": [1, 2, 3, 4, 5, 6]})
df_score = pd.DataFrame(data={"姓名": ["小郑", "小张", "小文", "小红", "小明", "小明"],
                              "学号2": ["07", "02", "08", "04", "01", "09"],
                              "语文": [90, 95, 91, 90, 85, 89],
                              "数学": [91, 90, 85, 80, 99, 97],
                              "英语": [95, 97, 98, 94, 92, 87],
                              "排名": [7, 2, 8, 4, 1, 9]})
df_index = pd.concat([df_info, df_score], keys=[("表1", "info"), ("表2", "score")], names=["表名", "content", "index"])
print(df_index)
"""
                    姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
表名 content index
表1  info    0      小明   男  21.0    01     1   NaN   NaN   NaN   NaN
             1      小张   男  22.0    02     2   NaN   NaN   NaN   NaN
             2      小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
             3      小红   男  20.0    04     4   NaN   NaN   NaN   NaN
             4      小白   女  22.0    05     5   NaN   NaN   NaN   NaN
             5      小李   女  25.0    06     6   NaN   NaN   NaN   NaN
             6      小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
表2  score   0      小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
             1      小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
             2      小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
             3      小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
             4      小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
             5      小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(df_index.reset_index())
"""
   表名 content  index  姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
0   表1    info      0  小明   男  21.0    01     1   NaN   NaN   NaN   NaN
1   表1    info      1  小张   男  22.0    02     2   NaN   NaN   NaN   NaN
2   表1    info      2  小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
3   表1    info      3  小红   男  20.0    04     4   NaN   NaN   NaN   NaN
4   表1    info      4  小白   女  22.0    05     5   NaN   NaN   NaN   NaN
5   表1    info      5  小李   女  25.0    06     6   NaN   NaN   NaN   NaN
6   表1    info      6  小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
7   表2   score      0  小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
8   表2   score      1  小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
9   表2   score      2  小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
10  表2   score      3  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
11  表2   score      4  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
12  表2   score      5  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(df_index.reset_index(drop=True))
"""
    姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
0   小明   男  21.0    01     1   NaN   NaN   NaN   NaN
1   小张   男  22.0    02     2   NaN   NaN   NaN   NaN
2   小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
3   小红   男  20.0    04     4   NaN   NaN   NaN   NaN
4   小白   女  22.0    05     5   NaN   NaN   NaN   NaN
5   小李   女  25.0    06     6   NaN   NaN   NaN   NaN
6   小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
7   小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
8   小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
9   小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
10  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
11  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
12  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(df_index.reset_index(names=["sheet", "program", "column"]))
"""
   sheet program  column  姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
0    表1    info       0  小明   男  21.0    01     1   NaN   NaN   NaN   NaN
1    表1    info       1  小张   男  22.0    02     2   NaN   NaN   NaN   NaN
2    表1    info       2  小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
3    表1    info       3  小红   男  20.0    04     4   NaN   NaN   NaN   NaN
4    表1    info       4  小白   女  22.0    05     5   NaN   NaN   NaN   NaN
5    表1    info       5  小李   女  25.0    06     6   NaN   NaN   NaN   NaN
6    表1    info       6  小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
7    表2   score       0  小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
8    表2   score       1  小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
9    表2   score       2  小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
10   表2   score       3  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
11   表2   score       4  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
12   表2   score       5  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(df_index.reset_index(names=["sheet", "sheet", "column"], allow_duplicates=True))
"""
   sheet  sheet  column  姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
0    表1   info       0  小明   男  21.0    01     1   NaN   NaN   NaN   NaN
1    表1   info       1  小张   男  22.0    02     2   NaN   NaN   NaN   NaN
2    表1   info       2  小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
3    表1   info       3  小红   男  20.0    04     4   NaN   NaN   NaN   NaN
4    表1   info       4  小白   女  22.0    05     5   NaN   NaN   NaN   NaN
5    表1   info       5  小李   女  25.0    06     6   NaN   NaN   NaN   NaN
6    表1   info       6  小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
7    表2  score       0  小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
8    表2  score       1  小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
9    表2  score       2  小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
10   表2  score       3  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
11   表2  score       4  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
12   表2  score       5  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(df_index.reset_index(level="content"))
print(df_index.reset_index(level=1))
"""
           content  姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
表名 index
表1  0        info  小明   男  21.0    01     1   NaN   NaN   NaN   NaN
     1        info  小张   男  22.0    02     2   NaN   NaN   NaN   NaN
     2        info  小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
     3        info  小红   男  20.0    04     4   NaN   NaN   NaN   NaN
     4        info  小白   女  22.0    05     5   NaN   NaN   NaN   NaN
     5        info  小李   女  25.0    06     6   NaN   NaN   NaN   NaN
     6        info  小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
表2  0       score  小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
     1       score  小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
     2       score  小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
     3       score  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
     4       score  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
     5       score  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(df_index.reset_index(level=["content", "index"]))
"""
     content  index  姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
表名
表1     info      0  小明   男  21.0    01     1   NaN   NaN   NaN   NaN
表1     info      1  小张   男  22.0    02     2   NaN   NaN   NaN   NaN
表1     info      2  小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
表1     info      3  小红   男  20.0    04     4   NaN   NaN   NaN   NaN
表1     info      4  小白   女  22.0    05     5   NaN   NaN   NaN   NaN
表1     info      5  小李   女  25.0    06     6   NaN   NaN   NaN   NaN
表1     info      6  小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
表2    score      0  小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
表2    score      1  小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
表2    score      2  小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
表2    score      3  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
表2    score      4  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
表2    score      5  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""




df_index = pd.concat([df_info, df_score], axis=1, keys=[("表1", "info"), ("表2", "score")], names=["表名", "content", "index"])
print(df_index)
"""
表名      表1                        表2
content  info                      score
index    姓名 性别 年龄 学号1 排名  姓名 学号2  语文  数学  英语 排名
0        小明   男   21    01    1  小郑    07  90.0  91.0  95.0  7.0
1        小张   男   22    02    2  小张    02  95.0  90.0  97.0  2.0
2        小亮   女   23    03    3  小文    08  91.0  85.0  98.0  8.0
3        小红   男   20    04    4  小红    04  90.0  80.0  94.0  4.0
4        小白   女   22    05    5  小明    01  85.0  99.0  92.0  1.0
5        小李   女   25    06    6  小明    09  89.0  97.0  87.0  9.0
6        小刘   男   23    10   10   NaN   NaN   NaN   NaN   NaN  NaN
"""

print(df_index.reset_index())
"""
表名    index   表1                        表2
content        info                      score
index          姓名 性别 年龄 学号1 排名  姓名 学号2  语文  数学  英语 排名
0           0  小明   男   21    01    1  小郑    07  90.0  91.0  95.0  7.0
1           1  小张   男   22    02    2  小张    02  95.0  90.0  97.0  2.0
2           2  小亮   女   23    03    3  小文    08  91.0  85.0  98.0  8.0
3           3  小红   男   20    04    4  小红    04  90.0  80.0  94.0  4.0
4           4  小白   女   22    05    5  小明    01  85.0  99.0  92.0  1.0
5           5  小李   女   25    06    6  小明    09  89.0  97.0  87.0  9.0
6           6  小刘   男   23    10   10   NaN   NaN   NaN   NaN   NaN  NaN
"""

print(df_index.reset_index(col_level=1))
"""
表名            表1                        表2
content index  info                      score
index          姓名 性别 年龄 学号1 排名  姓名 学号2  语文  数学  英语 排名
0           0  小明   男   21    01    1  小郑    07  90.0  91.0  95.0  7.0
1           1  小张   男   22    02    2  小张    02  95.0  90.0  97.0  2.0
2           2  小亮   女   23    03    3  小文    08  91.0  85.0  98.0  8.0
3           3  小红   男   20    04    4  小红    04  90.0  80.0  94.0  4.0
4           4  小白   女   22    05    5  小明    01  85.0  99.0  92.0  1.0
5           5  小李   女   25    06    6  小明    09  89.0  97.0  87.0  9.0
6           6  小刘   男   23    10   10   NaN   NaN   NaN   NaN   NaN  NaN
"""

print(df_index.reset_index(col_fill=None))
"""
表名    index   表1                        表2
content index  info                      score
index   index  姓名 性别 年龄 学号1 排名  姓名 学号2  语文  数学  英语 排名
0           0  小明   男   21    01    1  小郑    07  90.0  91.0  95.0  7.0
1           1  小张   男   22    02    2  小张    02  95.0  90.0  97.0  2.0
2           2  小亮   女   23    03    3  小文    08  91.0  85.0  98.0  8.0
3           3  小红   男   20    04    4  小红    04  90.0  80.0  94.0  4.0
4           4  小白   女   22    05    5  小明    01  85.0  99.0  92.0  1.0
5           5  小李   女   25    06    6  小明    09  89.0  97.0  87.0  9.0
6           6  小刘   男   23    10   10   NaN   NaN   NaN   NaN   NaN  NaN
"""

print(df_index.reset_index(col_fill=1))
"""
表名    index   表1                        表2
content     1  info                      score
index       1  姓名 性别 年龄 学号1 排名  姓名 学号2  语文  数学  英语 排名
0           0  小明   男   21    01    1  小郑    07  90.0  91.0  95.0  7.0
1           1  小张   男   22    02    2  小张    02  95.0  90.0  97.0  2.0
2           2  小亮   女   23    03    3  小文    08  91.0  85.0  98.0  8.0
3           3  小红   男   20    04    4  小红    04  90.0  80.0  94.0  4.0
4           4  小白   女   22    05    5  小明    01  85.0  99.0  92.0  1.0
5           5  小李   女   25    06    6  小明    09  89.0  97.0  87.0  9.0
6           6  小刘   男   23    10   10   NaN   NaN   NaN   NaN   NaN  NaN
"""
```


# 类型筛选

## select_dtypes

# 判断

## isna、isnull

`df.isnull()`

`df.isna()`

检查空值，空值为True，非空值为False

```Python
print(df2.isnull())
print(df2.isna())
"""
          1      2      3
小明  False  False  False
小红  False  False  False
小亮  False   True  False
"""
```


## notna、notnull

`df.notnull()`等价于`~df.isnull()`

`df.notna()`等价于`~df.isna()`

检查空值，非空值为True，空值为False

```Python
print(df2.notnull())
print(df2.notna())
print(~df2.isnull())
print(~df2.isna())
"""
         1      2     3
小明  True   True  True
小红  True   True  True
小亮  True  False  True
"""
```


## duplicated

`df.duplicated(subset=None, keep="first")`

判断每一行数据是否重复

39. **subset**: 可选，列标签或列标签列表，指定某些列来判断重复，默认使用所有列（即整行重复）

40. **keep**: 指定保留的重复项，标记为False，其余重复项标记为True。"first"指保留第一项，为默认；"last"指保留最后一项；False指不保留，全部标记为True

```Python
df5 = pd.DataFrame({
             'brand': ['Yum Yum', 'Yum Yum', 'Indomie', 'Indomie', 'Indomie'],
             'style': ['cup', 'cup', 'cup', 'pack', 'pack'],
             'rating': [4, 4, 3.5, 15, 5]
         })
print(df5)
"""
     brand style  rating
0  Yum Yum   cup     4.0
1  Yum Yum   cup     4.0
2  Indomie   cup     3.5
3  Indomie  pack    15.0
4  Indomie  pack     5.0
"""

is_duplicated = df5.duplicated()
print(is_duplicated)
"""
0    False
1     True
2    False
3    False
4    False
dtype: bool
"""

is_duplicated = df5.duplicated(subset="brand")
print(is_duplicated)
"""
0    False
1     True
2    False
3     True
4     True
dtype: bool
"""

is_duplicated = df5.duplicated(subset=["brand", "style"])
print(is_duplicated)
"""
0    False
1     True
2    False
3    False
4     True
dtype: bool
"""

is_duplicated = df5.duplicated(keep="last")
print(is_duplicated)
"""
0     True
1    False
2    False
3    False
4    False
dtype: bool
"""

is_duplicated = df5.duplicated(keep=False)
print(is_duplicated)
"""
0     True
1     True
2    False
3    False
4    False
dtype: bool
"""
```


## any、all

`df.any(*, axis=0, bool_only=False, skipna=True, **kwargs)`

沿axis，只要有一个值为True或其等效值（非空值、非0值等）则为True，否则False

`df.all(*, axis=0, bool_only=False, skipna=True, **kwargs)`

沿axis，所有值为True或其等效值（非空值、非0值等）则为True，否则False

41. **axis**：0或"index"每一列进行判断（默认）；1或"columns"每一行进行判断；None则判断所有元素

42. **bool_only**：若为True，则仅判断只有bool类型的行或列。默认False

43. **skipna**：是否跳过NaN，不跳过则NaN视为True。默认为True

```Python
import random
random.seed(2)
df1 = pd.DataFrame(data={"a": [random.randint(1, 100) for i in range(4)],
                         "b": [random.randint(1, 100) for i in range(4)],
                         "c": [random.randint(1, 100) for i in range(4)],
                         "d": [random.randint(1, 100) for i in range(4)]}, index=[1, 2, 3, 4])
print(df1)
"""
    a   b   c   d
1   8  22  33   5
2  12  95  78  75
3  11  86  28  88
4  47  40  78  21
"""

df2 = df1 % 5 == 0
print(df2)
"""
       a      b      c      d
1  False  False  False   True
2  False   True  False   True
3  False  False  False  False
4  False   True  False  False
"""

print(df2.any())
"""
a    False
b     True
c    False
d     True
dtype: bool
"""

print(df2.any(axis=1))
"""
1     True
2     True
3    False
4     True
dtype: bool
"""

print(df2.any(axis=None))
"""
True
"""

df1.loc[:, "a"] = [False, True, False, False]
print(df1)
"""
       a   b   c   d
1  False  22  33   5
2   True  95  78  75
3  False  86  28  88
4  False  40  78  21
"""

print(df1.any())
"""
a    True
b    True
c    True
d    True
dtype: bool
"""

print(df1.any(bool_only=True))
"""
a    True
dtype: bool
"""

df2.loc[3, "c"] = np.nan
print(df2)
"""
       a      b      c      d
1  False  False  False   True
2  False   True  False   True
3  False  False    NaN  False
4  False   True  False  False
"""

print(df2.any(skipna=False))
"""
a    False
b     True
c     True
d     True
dtype: bool
""""

df = pd.DataFrame(data={"a": [True, True, True, True],
                        "b": [True, False, False, False],
                        "c": [True, False, False, False],
                        "d": [True, False, False, False]}, index=[1, 2, 3, 4])
print(df)
"""
      a      b      c      d
1  True   True   True   True
2  True  False  False  False
3  True  False  False  False
4  True  False  False  False
"""

print(df.all())
"""
a     True
b    False
c    False
d    False
dtype: bool
"""

print(df.all(axis=1))
"""
1     True
2    False
3    False
4    False
dtype: bool
"""

print(df.all(axis=None))
"""
False
"""
```


# 删除

## drop

`df.drop(labels, axis=0, inplace=False, level=None, errors="raise")`
`df.drop(index=index_labels, columns=columns_labels, inplace=False, level=None, errors="raise")`

指定删除行列

44. **labels**: 待删除行或列的标签，可以是单标签或标签列表，需搭配axis来确定删除行或列

45. **axis**: 0或"index"删除行；1或"columns"删除列。默认为0

46. **index**: 待删除行的标签 <=> (labels, axis=0)

47. **columns**: 待删除列的标签 <=> (labels, axis=1)

48. inplace: 是否直接对原对象进行删除，如果为False，将返回副本;如果为True则返回None，直接对原对象进行删除。默认False

49. level: 指定索引级别

50. errors: 当所指定标签并非已存在的标签时是引发报错还是忽略，可选"raise"和"ignore"，默认为"raise"

```Python
df_drop = df1.copy()
print(df_drop)
"""
      语文  数学  英语
小明    90    70   100
小红   100    80    88
小亮    85    90    95
"""

df_drop_index = df_drop.drop(index="小红")
print(df_drop_index)
"""
      语文  数学  英语
小明    90    70   100
小亮    85    90    95
"""

df_drop_columns = df_drop.drop(columns="数学")
print(df_drop_columns)
"""
      语文  英语
小明    90   100
小红   100    88
小亮    85    95
"""

df_drop_index = df_drop.drop(index=["小明", "小亮"])
print(df_drop_index)
"""
      语文  数学  英语
小红   100    80    80
"""

df_drop_index = df_drop.drop(index=["小刚", "小明"])
print(df_drop_index)
"""
KeyError: "['小刚'] not found in axis"
"""

df_drop_index = df_drop.drop(index=["小刚", "小明"], errors="ignore")
print(df_drop_index)
"""
      语文  数学  英语
小红   100    80    80
小亮    90    90    80
"""
```


## dropna

`df.dropna(axis=0, how="any", thresh, subset, inplace=False, ignore_index=False)`

删除含空值的行列

51. **axis**: 0或"index"删除含空值的行（默认）；1或"columns"删除含空值的列

52. **how**: "any"表示出现任一空值即删除相应行或列；"all"表示整行或整列均为空值才删除相应行或列

53. **thresh**: 指定仅保留至少含有特定数量非空值的行或列。不能与how参数同时存在

54. **subset**: 仅删除指定列含有空值的行（axis=0）或者仅删除指定行含有空值的列（axis=1）

55. inplace: 是否直接对原对象进行删除，如果为False，将返回副本;如果为True则返回None，直接对原对象进行删除。默认False

56. ignore_index: 如果为True，将忽视原行标签，以位置索引替换

```Python
df_dropna = df2.copy()
print(df_dropna)
"""
        1     2    3
小明   90  70.0  100
小红  100  80.0   88
小亮   85   NaN   95
"""

df_dropna_index = df_dropna.dropna()
print(df_dropna_index)
"""
        1     2    3
小明   90  70.0  100
小红  100  80.0   88
"""

df_dropna_columns = df_dropna.dropna(axis=1)
print(df_dropna_columns)
"""
        1    3
小明   90  100
小红  100   88
小亮   85   95
"""

df_dropna_index_all = df_dropna.dropna(how="all")
print(df_dropna_index_all)
"""
        1     2    3
小明   90  70.0  100
小红  100  80.0   88
小亮   85   NaN   95
"""

df_dropna_index_thresh = df_dropna.dropna(thresh=3)
print(df_dropna_index_thresh)
df_dropna_index_thresh = df_dropna.dropna(thresh=1)
print(df_dropna_index_thresh)
"""
        1     2    3
小明   90  70.0  100
小红  100  80.0   88

        1     2    3
小明   90  70.0  100
小红  100  80.0   88
小亮   85   NaN   95
"""

df_dropna_index_subset = df_dropna.dropna(subset=[1, 2])
print(df_dropna_index_subset)
df_dropna_index_subset = df_dropna.dropna(axis=1, subset=["小明", "小亮"])
print(df_dropna_index_subset)
"""
        1     2    3
小明   90  70.0  100
小红  100  80.0   88

        1    3
小明   90  100
小红  100   88
小亮   85   95
"""

df_dropna_index_ignore = df_dropna.dropna(ignore_index=True)
print(df_dropna_index_ignore)
"""
     1     2    3
0   90  70.0  100
1  100  80.0   88
"""
```


## drop_duplicates

`df.drop_duplicates(subset=None, keep="first", inplace=False, ignore_index=False)`

指定列判断重复，并删除重复行

57. **subset**: 可选，列标签或列标签列表，指定某些列来判断重复，默认使用所有列（即整行重复）

58. **keep**: 指定保留的重复项

  1. **"first"**：保留第一项（默认）

  2. **"last"**：保留最后一项

  3. **False**：不保留，删除所有重复项

59. inplace: 是否直接对原对象进行删除，如果为False，将返回副本;如果为True则返回None，直接对原对象进行删除。默认False

60. ignore_index: 如果为True，将忽视原行标签，以位置索引替换

```Python
df5 = pd.DataFrame({
             'brand': ['Yum Yum', 'Yum Yum', 'Indomie', 'Indomie', 'Indomie'],
             'style': ['cup', 'cup', 'cup', 'pack', 'pack'],
             'rating': [4, 4, 3.5, 15, 5]
         })
print(df5)
"""
     brand style  rating
0  Yum Yum   cup     4.0
1  Yum Yum   cup     4.0
2  Indomie   cup     3.5
3  Indomie  pack    15.0
4  Indomie  pack     5.0
"""

df_drop_duplicates = df5.drop_duplicates()
print(df_drop_duplicates)
"""
     brand style  rating
0  Yum Yum   cup     4.0
2  Indomie   cup     3.5
3  Indomie  pack    15.0
4  Indomie  pack     5.0
"""

df_drop_duplicates = df5.drop_duplicates(subset="brand")
print(df_drop_duplicates)
"""
     brand style  rating
0  Yum Yum   cup     4.0
2  Indomie   cup     3.5
"""

df_drop_duplicates = df5.drop_duplicates(subset=["brand", "style"])
print(df_drop_duplicates)
"""
     brand style  rating
0  Yum Yum   cup     4.0
2  Indomie   cup     3.5
3  Indomie  pack    15.0
"""

df_drop_duplicates = df5.drop_duplicates(keep="last")
print(df_drop_duplicates)
"""
     brand style  rating
1  Yum Yum   cup     4.0
2  Indomie   cup     3.5
3  Indomie  pack    15.0
4  Indomie  pack     5.0
"""

df_drop_duplicates = df5.drop_duplicates(keep=False)
print(df_drop_duplicates)
"""
     brand style  rating
2  Indomie   cup     3.5
3  Indomie  pack    15.0
4  Indomie  pack     5.0
"""
```


# 计算

## describe

`df.describe(percentiles=[.25, .5, .75], include=None, exclude=None)`

查看每列的统计汇总信息，“NaN”值不计算在内

61. **percentiles**: 输出中要包含的百分位数，以数字列表表示，每个数字都介于0~1之间，默认为四分位数([.25, .5, .75])

62. include: 输出结果中包含的数据类型。默认包含全部(None | "all")

63. exclude: 输出结果中排除的数据类型。默认不排除(None)

```Python
print(df1.describe())
"""
             语文  数学        英语
count    3.000000   3.0    3.000000
mean    91.666667  80.0   94.333333
std      7.637626  10.0    6.027714
min     85.000000  70.0   88.000000
25%     87.500000  75.0   91.500000
50%     90.000000  80.0   95.000000
75%     95.000000  85.0   97.500000
max    100.000000  90.0  100.000000
"""

print(df1.describe([.2, .4, .6, .8]))
"""
             语文  数学        英语
count    3.000000   3.0    3.000000
mean    91.666667  80.0   94.333333
std      7.637626  10.0    6.027714
min     85.000000  70.0   88.000000
20%     87.000000  74.0   90.800000
40%     89.000000  78.0   93.600000
50%     90.000000  80.0   95.000000
60%     92.000000  82.0   96.000000
80%     96.000000  86.0   98.000000
max    100.000000  90.0  100.000000
"""
```


## count

`df.count(axis=0, numeric_only=False)`

返回非空值个数

64. **axis**: 0或"index"返回每一列求结果（默认）；1或"columns"返回每一行求结果

65. **numeric_only**: 是否仅计算数据为数字的列或行。默认为False

```Python
print(df1.count())
"""
语文    3
数学    3
英语    3
dtype: int64
"""

print(df1.count(axis=1))
"""
小明    3
小红    3
小亮    3
dtype: int64
"""

print(df3.count())
"""
语文    3
数学    3
英语    3
班级    3
dtype: int64
"""

print(df3.count(numeric_only=True))
"""
语文    3
数学    3
英语    3
dtype: int64
"""
```


## sum

`df.sum(axis=0, skipna=True, numericonly*=*False*,* min_count=0)`

求和

66. **axis**: 0或"index"指每一列求结果（默认）；1或"columns"指每一行求结果

67. **skipna**: 是否空值自动转换为0。默认自动转换，若不转换将导致无法计算，结果也为NaN

68. **numeric_only**: 仅包含 float、int、boolean 列。默认为False，字符串也将相加

69. **min_count**: 执行操作所需的最少有效值数，非NaN值＜min_count则结果为NaN

```Python
print(df1.sum())
"""
语文    280
数学    260
英语    260
dtype: int64
"""

print(df1.sum(axis=1))
"""
小明    280
小红    260
小亮    260
dtype: int64
"""

print(df2.sum())
"""
1    275.0
2    150.0
3    283.0
dtype: float64
"""

print(df2.sum(skipna=False))
"""
1    275.0
2      NaN
3    283.0
dtype: float64
"""

print(df3.sum())
"""
语文                      275
数学                      240
英语                      283
班级    高一7班高一7班高一7班
dtype: object
"""

print(df3.sum(numeric_only=True))
"""
语文    275
数学    240
英语    283
dtype: int64
"""

print(df1.sum(min_count=4))
"""
语文   NaN
数学   NaN
英语   NaN
dtype: float64
"""
```


## mean、median、var、std、max、min、idxmax、idxmin

`df.mean(axis=0, skipna=True, numeric_only=False)`：求均值

`df.median(axis=0, skipna=True, numeric_only=False)`：求中位数

`df.var(axis=0, skipna=True, ddof=1, numeric_only=False)`：求方差

`df.std(axis=0, skipna=True, ddof=1, numeric_only=False)`：求标准差

`df.max(axis=0, skipna=True, numeric_only=False)`：返回最大值

`df.min(axis=0, skipna=True, numeric_only=False)`：返回最小值

`df.idxmax(axis=0, skipna=True, numeric_only=False)`：返回最大值所在的索引标签

`df.idxmin(axis=0, skipna=True, numeric_only=False)`：返回最小值所在的索引标签

70. **axis**: 0或"index"每一列求结果（默认）；1或"columns"每一行求结果

71. **skipna**: 是否空值自动转换为0。默认自动转换，若不转换将导致无法计算，结果也为NaN（idmax和idmin未来版本将会报错）

72. ddof: 自由度，除数=N-ddof，N为元素总数。默认为1

73. **numeric_only**: 仅包含 float、int、boolean 列。默认为False，字符串也参与计算

```Python
print(pd.DataFrame({"mean": df1.mean(),
                    "median": df1.median(),
                    "var": df1.var(),
                    "std": df1.std(),
                    "max": df1.max(),
                    "min": df1.min(),
                    "idmax": df1.idxmax(),
                    "idmin": df1.idxmin(),
                    }))
"""
           mean  median         var        std  max  min idmax idmin
语文  93.333333    90.0   33.333333   5.773503  100   90  小红  小明
数学  86.666667    90.0   33.333333   5.773503   90   80  小明  小红
英语  86.666667    80.0  133.333333  11.547005  100   80  小明  小红
"""

print(pd.DataFrame({"mean": df1.mean(axis=1),
                    "median": df1.median(axis=1),
                    "var": df1.var(axis=1),
                    "std": df1.std(axis=1),
                    "max": df1.max(axis=1),
                    "min": df1.min(axis=1),
                    "idmax": df1.idxmax(axis=1),
                    "idmin": df1.idxmin(axis=1),
                    }))
"""
           mean  median         var        std  max  min idmax idmin
小明  93.333333    90.0   33.333333   5.773503  100   90  英语  语文
小红  86.666667    80.0  133.333333  11.547005  100   80  语文  数学
小亮  86.666667    90.0   33.333333   5.773503   90   80  语文  英语
"""

print(pd.DataFrame({"mean": df2.mean(),
                    "median": df2.median(),
                    "var": df2.var(),
                    "std": df2.std(),
                    "max": df2.max(),
                    "min": df2.min(),
                    "idmax": df2.idxmax(),
                    "idmin": df2.idxmin(),
                    }))
"""
        mean  median        var       std    max   min idmax idmin
1  91.666667    90.0  58.333333  7.637626  100.0  85.0  小红  小亮
2  75.000000    75.0  50.000000  7.071068   80.0  70.0  小红  小明
3  94.333333    95.0  36.333333  6.027714  100.0  88.0  小明  小红
"""

print(pd.DataFrame({"mean": df2.mean(skipna=False),
                    "median": df2.median(skipna=False),
                    "var": df2.var(skipna=False),
                    "std": df2.std(skipna=False),
                    "max": df2.max(skipna=False),
                    "min": df2.min(skipna=False),
                    "idmax": df2.idxmax(skipna=False),
                    "idmin": df2.idxmin(skipna=False),
                    }))
"""
        mean  median        var       std    max   min idmax idmin
1  91.666667    90.0  58.333333  7.637626  100.0  85.0  小红  小亮
2        NaN     NaN        NaN       NaN    NaN   NaN   NaN   NaN
3  94.333333    95.0  36.333333  6.027714  100.0  88.0  小明  小红
"""

print(pd.DataFrame({"mean": df3.mean(numeric_only=True),
                    "median": df3.median(numeric_only=True),
                    "var": df3.var(numeric_only=True),
                    "std": df3.std(numeric_only=True),
                    "max": df3.max(numeric_only=True),
                    "min": df3.min(numeric_only=True),
                    "idmax": df3.idxmax(numeric_only=True),
                    "idmin": df3.idxmin(numeric_only=True),
                    }))
"""
           mean  median         var        std  max  min idmax idmin
语文  91.666667    90.0   58.333333   7.637626  100   85  小红  小亮
数学  80.000000    80.0  100.000000  10.000000   90   70  小亮  小明
英语  94.333333    95.0   36.333333   6.027714  100   88  小明  小红
"""
```


## corr

`df.corr(method='pearson', min_periods=1, numeric_only=False)`

计算DatFrame对象各列的两两相关性，排除 NA/空值

74. **method**：

  1. **"pearson"【默认】**：标准相关系数

  2. **"kendall"**：Kendall-Tau相关系数

  3. **"spearman"**：Spearman等级相关

75. **min_periods**：每对列数据得出有效结果所需的最小观测值数量。目前仅适用于"pearson"和"spearman"。默认为1

76. numeric_only：同上

## corrwith

`df.corrwith(other, axis=0, drop=False, method='pearson', numeric_only=False)`

77. **other**：待与之计算相关性的另一个DataFrame对象或Series对象

78. **axis**：计算使用的轴。0或"index"求成对列相关性（默认）；1或"columns"求成对行相关性

79. drop：删除结果缺失值行或列。默认False

80. method：同上

81. numeric_only：同上

# 合并与拼接

## merge

`pd.merge(left, right, how='inner', on=None, sort=False, suffixes=('_x', '_y'), copy=None, indicator=False, validate=None)`

`pd.merge(left, right, how='inner', left_on=None, right_on=None, sort=False, suffixes=('_x', '_y'), copy=None, indicator=False, validate=None)`

`pd.merge(left, right, how='inner', left_index=False, right_index=False, sort=False, suffixes=('_x', '_y'), copy=None, indicator=False, validate=None)`

`df.merge(right, how='inner', on=None, sort=False, suffixes=('_x', '_y'), copy=None, indicator=False, validate=None)`

`df.merge(right, how='inner', left_on=None, right_on=None, sort=False, suffixes=('_x', '_y'), copy=None, indicator=False, validate=None)`

`df.merge(right, how='inner', left_index=False, right_index=False, sort=False, suffixes=('_x', '_y'), copy=None, indicator=False, validate=None)`

指定连接键列，通过连接键索引进行列（左右）的合并

**连接键**：
    用于索引两个DataFrame对象对应的行，从而将其连接起来，索引不到的数据以NaN填充

82. **left**：左侧待合并的DataFrame对象或已命名的Series对象

83. **right**：右侧待合并的DataFrame对象或已命名的Series对象

84. **how**

  1. **"left"**：使用左侧DataFrame对象的连接键索引（左侧表优先）

  2. **"right"**：使用右侧DataFrame对象的连接键索引（右侧表优先）

  3. **"outer"**：使用两侧DataFrame对象的连接键的并集索引（都要）

  4. **"inner"（默认）**：使用两侧DataFrame对象的连接键的交集索引（只要共有的）

  5. **"cross"**：从两个DataFrame对象创建笛卡尔积，保留左侧对象的顺序。不可传递on、left_on、right_on、left_index、right_index参数。

85. **on**：指定作为连接键列的列名（不会重复），该列名必须在两个DataFrame对象中都有。默认为两个DataFrame对象共同的列

86. **left_on**：左侧DataFrame对象中作为连接键列的列名
**right_on**：右侧DataFrame对象中作为连接键列的列名

87. **left_index**：使用左侧DataFrame对象的索引列作为连接键列，默认为False
**right_index**：使用右侧DataFrame对象的索引列作为连接键列， 默认为False

88. sort：在结果 DataFrame对象 中按字典顺序对连接键进行排序后再索引。默认为 False，顺序取决于how 参数

89. suffixes：为不作为连接键列的重复列名添加后缀，需是一个长度为2的序列，元素为后缀字符串，默认为（"_x", "_y"）。若不传字符串而是传None，则表示保留原列名，但至少有一个不为None。

90. copy：默认True

91. indicator：如果为 True，则向输出 DataFrame 添加一个名为 “_merge” 的列，其中包含有关每行来源于哪个DataFrame对象，可以通过提供字符串为该列指定不同的名称。默认为False

92. validate**：**检查连接键的唯一性，不符合则报错

  1. **"**one_to_one**"、"**1:1**"**：检查连接键在两侧DataFrame对象中是否唯一

  2. **"**one_to_many**"、"**1:m**"**：检查连接键在左侧DataFrame对象中是否唯一

  3. **"**many_to_one**"、"**m:1**"**：检查连接键在右侧DataFrame对象中是否唯一

  4. **"**many_to_many**"、"**m:m**"**：不检查唯一性

```Python
df_info = pd.DataFrame(data={"姓名": ["小明", "小张", "小亮", "小红", "小白", "小李"],
                             "性别": ["男", "男", "女", "男", "女", "女"],
                             "年龄": [21, 22, 23, 20, 22, 25],
                             "学号1": ["01", "02", "03", "04", "05", "06"],
                             "排名": [1, 2, 3, 4, 5, 6]})
df_score = pd.DataFrame(data={"姓名": ["小郑", "小张", "小文", "小红", "小明", "小明"],
                              "学号2": ["07", "02", "08", "04", "01", "09"],
                              "语文": [90, 95, 91, 90, 85, 89],
                              "数学": [91, 90, 85, 80, 99, 97],
                              "英语": [95, 97, 98, 94, 92, 87],
                              "排名": [7, 2, 8, 4, 1, 9]})
print(df_info)
"""
   姓名 性别  年龄 学号1  排名
0  小明   男    21    01     1
1  小张   男    22    02     2
2  小亮   女    23    03     3
3  小红   男    20    04     4
4  小白   女    22    05     5
5  小李   女    25    06     6
6  小刘   男    23    10    10
"""

print(df_score)
"""
   姓名 学号2  语文  数学  英语  排名
0  小郑    07    90    91    95     7
1  小张    02    95    90    97     2
2  小文    08    91    85    98     8
3  小红    04    90    80    94     4
4  小明    01    85    99    92     1
5  小明    09    89    97    87     9
"""

print(pd.merge(df_info, df_score, on="姓名", how="inner"))
"""
   姓名 性别  年龄 学号1  排名_x 学号2  语文  数学  英语  排名_y
0  小明   男    21    01       1    01    85    99    92       1
1  小明   男    21    01       1    09    89    97    87       9
2  小张   男    22    02       2    02    95    90    97       2
3  小红   男    20    04       4    04    90    80    94       4
"""

print(pd.merge(df_info, df_score, on="姓名", how="left"))
"""
   姓名 性别  年龄 学号1  排名_x 学号2  语文  数学  英语  排名_y
0  小明   男    21    01       1    01  85.0  99.0  92.0     1.0
1  小明   男    21    01       1    09  89.0  97.0  87.0     9.0
2  小张   男    22    02       2    02  95.0  90.0  97.0     2.0
3  小亮   女    23    03       3   NaN   NaN   NaN   NaN     NaN
4  小红   男    20    04       4    04  90.0  80.0  94.0     4.0
5  小白   女    22    05       5   NaN   NaN   NaN   NaN     NaN
6  小李   女    25    06       6   NaN   NaN   NaN   NaN     NaN
7  小刘   男    23    10      10   NaN   NaN   NaN   NaN     NaN
"""

print(pd.merge(df_info, df_score, on="姓名", how="right"))
"""
   姓名 性别  年龄 学号1  排名_x 学号2  语文  数学  英语  排名_y
0  小郑  NaN   NaN   NaN     NaN    07    90    91    95       7
1  小张   男  22.0    02     2.0    02    95    90    97       2
2  小文  NaN   NaN   NaN     NaN    08    91    85    98       8
3  小红   男  20.0    04     4.0    04    90    80    94       4
4  小明   男  21.0    01     1.0    01    85    99    92       1
5  小明   男  21.0    01     1.0    09    89    97    87       9
"""

print(pd.merge(df_info, df_score, on="姓名", how="outer"))
"""
   姓名 性别  年龄 学号1  排名_x 学号2  语文  数学  英语  排名_y
0  小明   男  21.0    01     1.0    01  85.0  99.0  92.0     1.0
1  小明   男  21.0    01     1.0    09  89.0  97.0  87.0     9.0
2  小张   男  22.0    02     2.0    02  95.0  90.0  97.0     2.0
3  小亮   女  23.0    03     3.0   NaN   NaN   NaN   NaN     NaN
4  小红   男  20.0    04     4.0    04  90.0  80.0  94.0     4.0
5  小白   女  22.0    05     5.0   NaN   NaN   NaN   NaN     NaN
6  小李   女  25.0    06     6.0   NaN   NaN   NaN   NaN     NaN
7  小刘   男  23.0    10    10.0   NaN   NaN   NaN   NaN     NaN
8  小郑  NaN   NaN   NaN     NaN    07  90.0  91.0  95.0     7.0
9  小文  NaN   NaN   NaN     NaN    08  91.0  85.0  98.0     8.0
"""

print(pd.merge(df_info, df_score, how="cross"))
"""
   姓名_x 性别  年龄 学号1  排名_x 姓名_y 学号2  语文  数学  英语  排名_y
0    小明   男    21    01       1   小郑    07    90    91    95       7
1    小明   男    21    01       1   小张    02    95    90    97       2
2    小明   男    21    01       1   小文    08    91    85    98       8
3    小明   男    21    01       1   小红    04    90    80    94       4
4    小明   男    21    01       1   小明    01    85    99    92       1
5    小明   男    21    01       1   小明    09    89    97    87       9
6    小张   男    22    02       2   小郑    07    90    91    95       7
7    小张   男    22    02       2   小张    02    95    90    97       2
8    小张   男    22    02       2   小文    08    91    85    98       8
9    小张   男    22    02       2   小红    04    90    80    94       4
10   小张   男    22    02       2   小明    01    85    99    92       1
11   小张   男    22    02       2   小明    09    89    97    87       9
12   小亮   女    23    03       3   小郑    07    90    91    95       7
13   小亮   女    23    03       3   小张    02    95    90    97       2
14   小亮   女    23    03       3   小文    08    91    85    98       8
15   小亮   女    23    03       3   小红    04    90    80    94       4
16   小亮   女    23    03       3   小明    01    85    99    92       1
17   小亮   女    23    03       3   小明    09    89    97    87       9
18   小红   男    20    04       4   小郑    07    90    91    95       7
19   小红   男    20    04       4   小张    02    95    90    97       2
20   小红   男    20    04       4   小文    08    91    85    98       8
21   小红   男    20    04       4   小红    04    90    80    94       4
22   小红   男    20    04       4   小明    01    85    99    92       1
23   小红   男    20    04       4   小明    09    89    97    87       9
24   小白   女    22    05       5   小郑    07    90    91    95       7
25   小白   女    22    05       5   小张    02    95    90    97       2
26   小白   女    22    05       5   小文    08    91    85    98       8
27   小白   女    22    05       5   小红    04    90    80    94       4
28   小白   女    22    05       5   小明    01    85    99    92       1
29   小白   女    22    05       5   小明    09    89    97    87       9
30   小李   女    25    06       6   小郑    07    90    91    95       7
31   小李   女    25    06       6   小张    02    95    90    97       2
32   小李   女    25    06       6   小文    08    91    85    98       8
33   小李   女    25    06       6   小红    04    90    80    94       4
34   小李   女    25    06       6   小明    01    85    99    92       1
35   小李   女    25    06       6   小明    09    89    97    87       9
36   小刘   男    23    10      10   小郑    07    90    91    95       7
37   小刘   男    23    10      10   小张    02    95    90    97       2
38   小刘   男    23    10      10   小文    08    91    85    98       8
39   小刘   男    23    10      10   小红    04    90    80    94       4
40   小刘   男    23    10      10   小明    01    85    99    92       1
41   小刘   男    23    10      10   小明    09    89    97    87       9
"""

print(pd.merge(df_info, df_score, left_on="学号1", right_on="学号2"))
"""
  姓名_x 性别  年龄 学号1  排名_x 姓名_y 学号2  语文  数学  英语  排名_y
0   小明   男    21    01       1   小明    01    85    99    92       1
1   小张   男    22    02       2   小张    02    95    90    97       2
2   小红   男    20    04       4   小红    04    90    80    94       4
"""

print(pd.merge(df_info, df_score, left_index=True, right_index=True))
"""
  姓名_x 性别  年龄 学号1  排名_x 姓名_y 学号2  语文  数学  英语  排名_y
0   小明   男    21    01       1   小郑    07    90    91    95       7
1   小张   男    22    02       2   小张    02    95    90    97       2
2   小亮   女    23    03       3   小文    08    91    85    98       8
3   小红   男    20    04       4   小红    04    90    80    94       4
4   小白   女    22    05       5   小明    01    85    99    92       1
5   小李   女    25    06       6   小明    09    89    97    87       9
"""

print(pd.merge(df_info, df_score, how="outer", left_on="学号1", right_on="学号2"))
"""
  姓名_x 性别  年龄 学号1  排名_x 姓名_y 学号2  语文  数学  英语  排名_y
0   小明   男  21.0    01     1.0   小明    01  85.0  99.0  92.0     1.0
1   小张   男  22.0    02     2.0   小张    02  95.0  90.0  97.0     2.0
2   小亮   女  23.0    03     3.0    NaN   NaN   NaN   NaN   NaN     NaN
3   小红   男  20.0    04     4.0   小红    04  90.0  80.0  94.0     4.0
4   小白   女  22.0    05     5.0    NaN   NaN   NaN   NaN   NaN     NaN
5   小李   女  25.0    06     6.0    NaN   NaN   NaN   NaN   NaN     NaN
6   小刘   男  23.0    10    10.0    NaN   NaN   NaN   NaN   NaN     NaN
7    NaN  NaN   NaN   NaN     NaN   小郑    07  90.0  91.0  95.0     7.0
8    NaN  NaN   NaN   NaN     NaN   小文    08  91.0  85.0  98.0     8.0
9    NaN  NaN   NaN   NaN     NaN   小明    09  89.0  97.0  87.0     9.0
"""

print(pd.merge(df_info, df_score, how="outer", left_on="学号1", right_on="学号2", sort=True))
"""
  姓名_x 性别  年龄 学号1  排名_x 姓名_y 学号2  语文  数学  英语  排名_y
0   小明   男  21.0    01     1.0   小明    01  85.0  99.0  92.0     1.0
1   小张   男  22.0    02     2.0   小张    02  95.0  90.0  97.0     2.0
2   小亮   女  23.0    03     3.0    NaN   NaN   NaN   NaN   NaN     NaN
3   小红   男  20.0    04     4.0   小红    04  90.0  80.0  94.0     4.0
4   小白   女  22.0    05     5.0    NaN   NaN   NaN   NaN   NaN     NaN
5   小李   女  25.0    06     6.0    NaN   NaN   NaN   NaN   NaN     NaN
6    NaN  NaN   NaN   NaN     NaN   小郑    07  90.0  91.0  95.0     7.0
7    NaN  NaN   NaN   NaN     NaN   小文    08  91.0  85.0  98.0     8.0
8    NaN  NaN   NaN   NaN     NaN   小明    09  89.0  97.0  87.0     9.0
9   小刘   男  23.0    10    10.0    NaN   NaN   NaN   NaN   NaN     NaN
"""

print(pd.merge(df_info, df_score, on="姓名"))
"""
   姓名 性别  年龄 学号1  排名_x 学号2  语文  数学  英语  排名_y
0  小明   男    21    01       1    01    85    99    92       1
1  小明   男    21    01       1    09    89    97    87       9
2  小张   男    22    02       2    02    95    90    97       2
3  小红   男    20    04       4    04    90    80    94       4
"""

print(pd.merge(df_info, df_score, on="姓名", suffixes=("1", "2")))
"""
   姓名 性别  年龄 学号1  排名1 学号2  语文  数学  英语  排名2
0  小明   男    21    01      1    01    85    99    92      1
1  小明   男    21    01      1    09    89    97    87      9
2  小张   男    22    02      2    02    95    90    97      2
3  小红   男    20    04      4    04    90    80    94      4
"""

print(pd.merge(df_info, df_score, on="姓名", suffixes=(None, "1")))
"""
   姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语  排名1
0  小明   男    21    01     1    01    85    99    92      1
1  小明   男    21    01     1    09    89    97    87      9
2  小张   男    22    02     2    02    95    90    97      2
3  小红   男    20    04     4    04    90    80    94      4
"""

print(pd.merge(df_info, df_score, on="姓名", how="outer", indicator=True))
"""
   姓名 性别  年龄 学号1  排名_x 学号2  语文  数学  英语  排名_y      _merge
0  小明   男  21.0    01     1.0    01  85.0  99.0  92.0     1.0        both
1  小明   男  21.0    01     1.0    09  89.0  97.0  87.0     9.0        both
2  小张   男  22.0    02     2.0    02  95.0  90.0  97.0     2.0        both
3  小亮   女  23.0    03     3.0   NaN   NaN   NaN   NaN     NaN   left_only
4  小红   男  20.0    04     4.0    04  90.0  80.0  94.0     4.0        both
5  小白   女  22.0    05     5.0   NaN   NaN   NaN   NaN     NaN   left_only
6  小李   女  25.0    06     6.0   NaN   NaN   NaN   NaN     NaN   left_only
7  小郑  NaN   NaN   NaN     NaN    07  90.0  91.0  95.0     7.0  right_only
8  小文  NaN   NaN   NaN     NaN    08  91.0  85.0  98.0     8.0  right_only
"""

print(pd.merge(df_info, df_score, on="姓名", how="outer", indicator="来源"))
"""
   姓名 性别  年龄 学号1  排名_x 学号2  语文  数学  英语  排名_y        来源
0  小明   男  21.0    01     1.0    01  85.0  99.0  92.0     1.0        both
1  小明   男  21.0    01     1.0    09  89.0  97.0  87.0     9.0        both
2  小张   男  22.0    02     2.0    02  95.0  90.0  97.0     2.0        both
3  小亮   女  23.0    03     3.0   NaN   NaN   NaN   NaN     NaN   left_only
4  小红   男  20.0    04     4.0    04  90.0  80.0  94.0     4.0        both
5  小白   女  22.0    05     5.0   NaN   NaN   NaN   NaN     NaN   left_only
6  小李   女  25.0    06     6.0   NaN   NaN   NaN   NaN     NaN   left_only
7  小郑  NaN   NaN   NaN     NaN    07  90.0  91.0  95.0     7.0  right_only
8  小文  NaN   NaN   NaN     NaN    08  91.0  85.0  98.0     8.0  right_only
"""

print(pd.merge(df_info, df_score, on="姓名", how="outer", validate="m:1"))
"""
pandas.errors.MergeError: Merge keys are not unique in right dataset; not a many-to-one merge
"""
```


## concat

`pd.concat(objs, *, axis=0, join='outer', ignore_index=False, keys=None, levels=None, names=None, verify_integrity=False, sort=False, copy=None)`

以行或列标签作为连接键，通过索引进行列或行的合并

93. **objs**：待合并的Series对象或DataFrame对象的序列或字典（≥2个对象）。若为字典，则字典的键序列将传给keys参数

94. **axis**：0/"index"（默认）以列标签作为连接键进行行（上下）的合并，1/"columns"以行标签作为连接键进行列（左右）的合并

95. **join**："inner"、"outer"（默认）。意义同上

96. **ignore_index**：是否忽略axis轴上原有标签，按位置重新定义索引。默认False

97. keys：传入一个序列，长度应与objs长度一致。为每个传入的对象axis轴外层再添加一层索引，添加多层索引时，序列元素应为元组。默认为None

98. levels：略

99. names：传入一个序列，序列长度应≤axis轴索引层数，为每一层索引标记名称。默认为None

100. verify_integrity：是否检查沿axis轴的重复索引，并报错。默认False

101. sort：是否对连接键进行排序后再索引。默认False

102. copy：略

```Python
df_info = pd.DataFrame(data={"姓名": ["小明", "小张", "小亮", "小红", "小白", "小李"],
                             "性别": ["男", "男", "女", "男", "女", "女"],
                             "年龄": [21, 22, 23, 20, 22, 25],
                             "学号1": ["01", "02", "03", "04", "05", "06"],
                             "排名": [1, 2, 3, 4, 5, 6]})
df_score = pd.DataFrame(data={"姓名": ["小郑", "小张", "小文", "小红", "小明", "小明"],
                              "学号2": ["07", "02", "08", "04", "01", "09"],
                              "语文": [90, 95, 91, 90, 85, 89],
                              "数学": [91, 90, 85, 80, 99, 97],
                              "英语": [95, 97, 98, 94, 92, 87],
                              "排名": [7, 2, 8, 4, 1, 9]})
print(df_info)
"""
   姓名 性别  年龄 学号1  排名
0  小明   男    21    01     1
1  小张   男    22    02     2
2  小亮   女    23    03     3
3  小红   男    20    04     4
4  小白   女    22    05     5
5  小李   女    25    06     6
6  小刘   男    23    10    10
"""

print(df_score)
"""
   姓名 学号2  语文  数学  英语  排名
0  小郑    07    90    91    95     7
1  小张    02    95    90    97     2
2  小文    08    91    85    98     8
3  小红    04    90    80    94     4
4  小明    01    85    99    92     1
5  小明    09    89    97    87     9
"""

print(pd.concat([df_info, df_score]))
"""
   姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
0  小明   男  21.0    01     1   NaN   NaN   NaN   NaN
1  小张   男  22.0    02     2   NaN   NaN   NaN   NaN
2  小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
3  小红   男  20.0    04     4   NaN   NaN   NaN   NaN
4  小白   女  22.0    05     5   NaN   NaN   NaN   NaN
5  小李   女  25.0    06     6   NaN   NaN   NaN   NaN
6  小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
0  小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
1  小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
2  小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
3  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
4  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
5  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(pd.concat({"表1": df_info, "表2": df_score}))
print(pd.concat([df_info, df_score], keys=["表1", "表2"]))
"""
       姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
表1 0  小明   男  21.0    01     1   NaN   NaN   NaN   NaN
    1  小张   男  22.0    02     2   NaN   NaN   NaN   NaN
    2  小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
    3  小红   男  20.0    04     4   NaN   NaN   NaN   NaN
    4  小白   女  22.0    05     5   NaN   NaN   NaN   NaN
    5  小李   女  25.0    06     6   NaN   NaN   NaN   NaN
    6  小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
表2 0  小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
    1  小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
    2  小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
    3  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
    4  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
    5  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(pd.concat([df_info, df_score], keys=[("表1", "info"), ("表2", "score")]))
"""
             姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
表1 info  0  小明   男  21.0    01     1   NaN   NaN   NaN   NaN
          1  小张   男  22.0    02     2   NaN   NaN   NaN   NaN
          2  小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
          3  小红   男  20.0    04     4   NaN   NaN   NaN   NaN
          4  小白   女  22.0    05     5   NaN   NaN   NaN   NaN
          5  小李   女  25.0    06     6   NaN   NaN   NaN   NaN
          6  小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
表2 score 0  小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
          1  小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
          2  小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
          3  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
          4  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
          5  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(pd.concat([df_info, df_score], keys=[("表1", "info"), ("表2", "score")], names=["表名", "content", "index"]))
"""
                    姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
表名 content index
表1  info    0      小明   男  21.0    01     1   NaN   NaN   NaN   NaN
             1      小张   男  22.0    02     2   NaN   NaN   NaN   NaN
             2      小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
             3      小红   男  20.0    04     4   NaN   NaN   NaN   NaN
             4      小白   女  22.0    05     5   NaN   NaN   NaN   NaN
             5      小李   女  25.0    06     6   NaN   NaN   NaN   NaN
             6      小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
表2  score   0      小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
             1      小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
             2      小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
             3      小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
             4      小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
             5      小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(pd.concat([df_info, df_score], axis=1))
"""
   姓名 性别  年龄 学号1  排名  姓名 学号2  语文  数学  英语  排名
0  小明   男    21    01     1  小郑    07  90.0  91.0  95.0   7.0
1  小张   男    22    02     2  小张    02  95.0  90.0  97.0   2.0
2  小亮   女    23    03     3  小文    08  91.0  85.0  98.0   8.0
3  小红   男    20    04     4  小红    04  90.0  80.0  94.0   4.0
4  小白   女    22    05     5  小明    01  85.0  99.0  92.0   1.0
5  小李   女    25    06     6  小明    09  89.0  97.0  87.0   9.0
6  小刘   男    23    10    10   NaN   NaN   NaN   NaN   NaN   NaN
"""

pd.concat([df_info, df_score], axis=1, keys=[("表1", "info"), ("表2", "score")], names=["表名", "content", "index"])
"""
表名      表1                        表2
content  info                      score
index    姓名 性别 年龄 学号1 排名  姓名 学号2  语文  数学  英语 排名
0        小明   男   21    01    1  小郑    07  90.0  91.0  95.0  7.0
1        小张   男   22    02    2  小张    02  95.0  90.0  97.0  2.0
2        小亮   女   23    03    3  小文    08  91.0  85.0  98.0  8.0
3        小红   男   20    04    4  小红    04  90.0  80.0  94.0  4.0
4        小白   女   22    05    5  小明    01  85.0  99.0  92.0  1.0
5        小李   女   25    06    6  小明    09  89.0  97.0  87.0  9.0
6        小刘   男   23    10   10   NaN   NaN   NaN   NaN   NaN  NaN
"""

print(pd.concat([df_info, df_score], join="inner"))
"""
   姓名  排名
0  小明     1
1  小张     2
2  小亮     3
3  小红     4
4  小白     5
5  小李     6
6  小刘    10
0  小郑     7
1  小张     2
2  小文     8
3  小红     4
4  小明     1
5  小明     9
"""

print(pd.concat([df_info, df_score], ignore_index=True))
"""
    姓名 性别  年龄 学号1  排名 学号2  语文  数学  英语
0   小明   男  21.0    01     1   NaN   NaN   NaN   NaN
1   小张   男  22.0    02     2   NaN   NaN   NaN   NaN
2   小亮   女  23.0    03     3   NaN   NaN   NaN   NaN
3   小红   男  20.0    04     4   NaN   NaN   NaN   NaN
4   小白   女  22.0    05     5   NaN   NaN   NaN   NaN
5   小李   女  25.0    06     6   NaN   NaN   NaN   NaN
6   小刘   男  23.0    10    10   NaN   NaN   NaN   NaN
7   小郑  NaN   NaN   NaN     7    07  90.0  91.0  95.0
8   小张  NaN   NaN   NaN     2    02  95.0  90.0  97.0
9   小文  NaN   NaN   NaN     8    08  91.0  85.0  98.0
10  小红  NaN   NaN   NaN     4    04  90.0  80.0  94.0
11  小明  NaN   NaN   NaN     1    01  85.0  99.0  92.0
12  小明  NaN   NaN   NaN     9    09  89.0  97.0  87.0
"""

print(pd.concat([df_info, df_score], sort=True))
"""
   姓名 学号1 学号2  年龄 性别  排名  数学  英语  语文
0  小明    01   NaN  21.0   男     1   NaN   NaN   NaN
1  小张    02   NaN  22.0   男     2   NaN   NaN   NaN
2  小亮    03   NaN  23.0   女     3   NaN   NaN   NaN
3  小红    04   NaN  20.0   男     4   NaN   NaN   NaN
4  小白    05   NaN  22.0   女     5   NaN   NaN   NaN
5  小李    06   NaN  25.0   女     6   NaN   NaN   NaN
6  小刘    10   NaN  23.0   男    10   NaN   NaN   NaN
0  小郑   NaN    07   NaN  NaN     7  91.0  95.0  90.0
1  小张   NaN    02   NaN  NaN     2  90.0  97.0  95.0
2  小文   NaN    08   NaN  NaN     8  85.0  98.0  91.0
3  小红   NaN    04   NaN  NaN     4  80.0  94.0  90.0
4  小明   NaN    01   NaN  NaN     1  99.0  92.0  85.0
5  小明   NaN    09   NaN  NaN     9  97.0  87.0  89.0
"""

# print(pd.concat([df_info, df_score], verify_integrity=True))
"""
ValueError: Indexes have overlapping values: Index([0, 1, 2, 3, 4, 5], dtype='int64')
"""
```


# 重塑

## pivot

`df.pivot(index, columns, value)`

重塑DataFrame对象，生成数据透视表。不应出现重复的行-列对

103. **index**：重塑为行的列标签或列标签列表（形成多级标签）

104. **columns**：重塑为列的列标签或列标签列表（形成多级标签）

105. **value**：展示的数据

```Python
df = pd.DataFrame({'foo': ['one', 'one', 'one', 'two', 'two','two'],
                   'bar': ['A', 'B', 'C', 'A', 'B', 'C'],
                   'baz': [1, 2, 3, 1, 2, 3],
                   'zoo': ['x', 'y', 'z', 'q', 'w', 't']})
print(df)
"""
   foo bar  baz zoo
0  one   A    1   x
1  one   B    2   y
2  one   C    3   z
3  two   A    1   q
4  two   B    2   w
5  two   C    3   t
"""

print(df.pivot(index="foo", columns="bar"))
"""
    baz       zoo
bar   A  B  C   A  B  C
foo
one   1  2  3   x  y  z
two   1  2  3   q  w  t
"""

print(df.pivot(index="foo", columns="bar", values="baz"))
print(df.pivot(index="foo", columns="bar")["baz"])
"""
bar  A  B  C
foo
one  1  2  3
two  1  2  3
"""

print(df.pivot(index=["foo", "baz"], columns="bar"))
"""
         zoo
bar        A    B    C
foo baz
one 1      x  NaN  NaN
    2    NaN    y  NaN
    3    NaN  NaN    z
two 1      q  NaN  NaN
    2    NaN    w  NaN
    3    NaN  NaN    t
"""

print(df.pivot(index="foo", columns=["bar", "baz"]))
"""
    zoo
bar   A  B  C
baz   1  2  3
foo
one   x  y  z
two   q  w  t
"""
```


# 分组

## groupby

`df.groupby(by=None, axis=<no_default>, level=None, as_index=True, sort=True, group_keys=True, observed=<no_default>, dropna=True)`

# 排序

## sort_values

`df.sort_values(by, axis=0, ascending=True, inplace=False, kind="quiksort", na_position="last", ignore_index=False, key=None)`

根据axis上指定列标签或行标签对应的列或行中的数据进行排序

106. by：指定列标签或行标签

107. axis：所沿的axis。默认"0/index"

108. ascending：升序。默认True

109. inplace：直接修改原对象。默认False

110. kind：排序类型。默认"quiksort"

111. na_position：NaN值的位置。默认"last"

112. ignore_index：忽略原对象中的index。默认False

113. key：

## sort_index

`df.sort_index(axis=0, level=None, ascending=True, inpace=False, kind="quicksort", na_position="last", sort_remaining=True, ignore_index=False, key=None)`

沿axis，根据行或列标签进行排序

114. axis：所沿的axis。默认"0/index"

115. level：索引等级。

116. sort_remaining：

117. ascending、inplace、kind、na_position、ignore_index：同上

118. key：

# 函数构造

## apply

`df.apply(func, axis=0, raw=False, result_type=None, args=(), by_row='compat', engine='python', engine_kwargs=None, **kwargs)`

对每一行或每一列应用函数

119. **func**：应用的函数

120. **axis**：0/"index"（默认）指函数应用于每一列；1/"column"指函数应用于每一行

121. raw：True则每行或每列作为ndarray对象传入；False（默认）则每行或每列作为Series对象传入

122. **result_type**：仅在axis=1时起作用

  1. "expand"：

  2. "reduce"：

  3. "broadcast"：

  4. None

123. **args**：额外要传给func的位置参数组成的元组

124. by_row：

125. engine："numba"或"python"（默认）。略

126. engine_kwargs：传递给engine的关键字参数，仅当engine="numba"使用

127. ****kwargs**：额外要传给func的关键字参数，注意应在其它参数之后传

# 文件读写

## read_csv和to_csv

## read_excel和to_excel



