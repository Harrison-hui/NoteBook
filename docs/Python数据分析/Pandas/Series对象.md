# 定义

Series对象是一维标签数组，能够保存任何数据类型(整数、字符串、浮点数、Python对象等)。轴标签统称为索引。类似于字典，即索引标签相当于键，存在映射关系。

# 图解

![	https://www.writebug.com/static/uploads/2023/7/4/135a28a859d439e07ace4f8be2ce8b02.png](	https://www.writebug.com/static/uploads/2023/7/4/135a28a859d439e07ace4f8be2ce8b02.png)

# 创建

`pd.Series(data=None, index=None, name=None, dtype=None, copy=None, fastpath=False)`

1. **data**: 数据。支持数组、可迭代对象（列表、元组、range对象等）、字典、单一数值或字符串

2. **index**: 设置索引标签。长度必须与data长度一致, 即一一对应（data为字典除外）；如未设置将自动按索引位置创建数值索引。

3. **name**: 设置Series对象的名称

4. dtype: 略

5. copy: 是否复制原数据。默认为False。

6. fastpath: 略

```Python
import pandas as pd

# 数据为数组、可迭代对象（列表、元组、range对象等）。
s0 = pd.Series([90, 100, 85])
print(s0)
"""
0     90
1    100
2     85
dtype: int64
"""

s1 = pd.Series([90, 100, 85], name="语文")
print(s1)
"""
0     90
1    100
2     85
Name: 语文, dtype: int64
"""

s2 = pd.Series([90, 100, 85], index=[1, 2, 3], name="语文")
print(s2)
"""
1     90
2    100
3     85
Name: 语文, dtype: int64
"""

s3 = pd.Series([90, 100, 85], index=["小明", "小红", "小亮"], name="语文")
print(s3)
"""
小明     90
小红    100
小亮     85
Name: 语文, dtype: int64
"""



# 数据为字典。
# “键”即为索引标签。若设置index，将按index内索引取值创建，无对应值（即非字典的键）则为NaN
s4 = pd.Series({"小明": 90, "小红": 100, "小亮": 85})
print(s4)
"""
小明     90
小红    100
小亮     85
dtype: int64
"""

s5 = pd.Series({"小明": 90, "小红": 100, "小亮": 85}, index=["小红", "小亮", "小明"])
print(s5)
"""
小红    100
小亮     85
小明     90
dtype: int64
"""

s6 = pd.Series({"小明": 90, "小红": 100, "小亮": 85}, index=["小红", "小明", 1, 2])
print(s6)
"""
小红    100.0
小明     90.0
1       NaN
2       NaN
dtype: float64
"""



# 数据为单一数值或字符串。
# 若设置多个索引标签，该值将被重复并创建
s7 = pd.Series(5)
print(s7)
"""
0    5
dtype: int64
"""

s8 = pd.Series(5, index=[1, 2, 3, 4, 5])
print(s8)
"""
1    5
2    5
3    5
4    5
5    5
dtype: int64
"""

s9 = pd.Series("53")
print(s9)
"""
0    53
dtype: object
"""

s10 = pd.Series("53", index=[1, 2, 3, 4, 5])
print(s10)
"""
1    53
2    53
3    53
4    53
5    53
dtype: object
"""



# copy参数的设置
# copy = True: Series对象改变时，无论原数据为何种类型都不会改变
# copy = False: Series对象改变时，仅当原数据为数组时会发生改变
```


# 查询

```Python
print(s1.index, s1.values, s1.name)
print(s2.index, s2.values, s2.name)
print(s3.index, s3.values, s3.name)
"""
RangeIndex(start=0, stop=3, step=1) [ 90 100  85] 语文

Index([1, 2, 3], dtype='int64') [ 90 100  85] 语文

Index(['小明', '小红', '小亮'], dtype='object') [ 90 100  85] 语文
"""
```


# 操作

在Series对象整体进行操作，返回Series对象副本

```Python
print(s3 + 2)
"""
小明     92
小红    102
小亮     87
Name: 语文, dtype: int64
"""

print(s3 - 5)
"""
小明    85
小红    95
小亮    80
Name: 语文, dtype: int64
"""

print(s3 <= 90)          # 条件判断返回布尔型Series对象
"""
小明     True
小红    False
小亮     True
Name: 语文, dtype: bool
"""

import numpy as np
print(np.log(s3))
"""
小明    4.499810
小红    4.605170
小亮    4.442651
Name: 语文, dtype: float64
"""

print(s3)                 # 上述操作返回副本，原Series对象并未发生修改
"""
小明     90
小红    100
小亮     85
Name: 语文, dtype: int64
"""
```


# 索引

## 单值索引[]

返回数据

```Python
# 位置索引，同序列索引
print(s3[0], s3[1], s3[2], s3[-1])
"""
90 100 85 85
"""

# 标签索引
print(s1[0], s1[1], s1[2])
print(s2[1], s2[2], s2[3])
print(s3["小明"], s3["小红"], s3["小亮"])
"""
90 100 85

90 100 85

90 100 85
"""
```


## 切片索引[:]

返回Series对象

```Python
# 位置切片索引，包头不包尾
print(s1[0:2])
print(s2[0:2])
print(s3[0:2])
"""
0     90
1    100
dtype: int64

1     90
2    100
dtype: int64

小明     90
小红    100
dtype: int64
"""


# 标签切片索引，包头包尾
print(s3["小红": "小亮"])
"""
小红    100
小亮     85
dtype: int64
"""
```


## 多值索引[[,]]

返回Series对象

```Python
# 多值索引，使用[[]]包含多个位置索引或标签索引，无顺序要求
print(s1[[0, 1, 2]])
print(s2[[1, 2, 3]])
print(s3[["小明", "小红", "小亮"]])
print(s3[[0, 1, 2]])
"""
0     90
1    100
2     85
dtype: int64

1     90
2    100
3     85
dtype: int64

小明     90
小红    100
小亮     85
dtype: int64

小明     90
小红    100
小亮     85
dtype: int64
"""
```


## 条件索引[boolean Series]

通过传入布尔型Series对象实现。所传入布尔型Series对象的数据长度必须≥原Series对象长度，且所含轴标签必须包含原Series对象所有轴标签，顺序随意。传入后，比对原Series对象和布尔型Series对象对应标签的数据，按原Series对象标签顺序，输出原Series对象中对应布尔型Series对象中True的数据。

```Python
# 以输出分数≤90的数据为例
s_bool = pd.Series([True, False, True], index=["小明", "小红", "小亮"])    # 等价于s3 <= 90
print(s3[s_bool])
"""
小明    90
小亮    85
Name: 语文, dtype: int64
"""

print(s3[s3 <= 90])
"""
小明    90
小亮    85
Name: 语文, dtype: int64
"""

s_bool = pd.Series([True, True, False, True], index=["小白", "小亮", "小红", "小明"])
print(s3[s_bool])
"""
小明    90
小亮    85
Name: 语文, dtype: int64
"""
```


## iat[index]位置索引

```Python
print(s3.iat[1])
"""
100
"""
```


# 修改

类似字典，直接对原Series对象进行修改，新数据（可以是列表、元组、数组、Series对象等）的长度必须与索引取得的原数据长度一致或者是单值（将被复制重复应用），或者通过赋值运算进行修改。索引不存在则添加数据

```Python
s3["小亮"] = 95
print(s3)
"""
小明     90
小红    100
小亮     95
Name: 语文, dtype: int64
"""

s3["小红":"小亮"] = [90, 80]
print(s3)
"""
小明    90
小红    90
小亮    80
Name: 语文, dtype: int64
"""

s3[["小明", "小亮"]] = [80, 99]
print(s3)
"""
小明    80
小红    90
小亮    99
Name: 语文, dtype: int64
"""

s3[s_bool] = [95, 90]
print(s3)
"""
小明     95
小红    100
小亮     90
Name: 语文, dtype: int64
"""

s3[["小明", "小亮"]] = 60
print(s3)
"""
小明    60
小红    90
小亮    60
Name: 语文, dtype: int64
"""

s3[["小明", "小亮"]] += 6
print(s3)
"""
小明    66
小红    90
小亮    66
Name: 语文, dtype: int64
"""

s3["小刚"] = 80
print(s3)
"""
小明    66
小红    90
小亮    66
小刚    80
Name: 语文, dtype: int64
"""
```


# 函数

## unique

`Series.unique()`

对Series对象的数据进行去重，返回去重后数据的数组

```Python
s = pd.Series([90, 100, 85, 90, 85])
print(s)
"""
0     90
1    100
2     85
3     90
4     85
dtype: int64
"""

print(s.unique())
"""
[ 90 100  85]
"""
```


## value_counts

`Series.value_counts(normalize=False, sort=True, ascending=False, bins=None, dropna=True)`

返回原Series对象中唯一数据及其频数或频率组成的Series对象。

7. **normalize**：计算方式。True则返回频率，否则返回频数（默认）

8. **sort**：是否排序。True（默认）则按照频率或频数进行排序，否则保留原Series对象中唯一值第一次出现的顺序

9. **ascending**：排序方式。True则升序，否则降序（默认）

10. **bins**：分组计数。指定分组数（只能是整数），在最小值到最大值范围内平均分为bins个范围组进行计数

11. **dropna**：NaN值处理。True（默认）则结果不包含NaN值，否则包含

```Python
import numpy as np
s = pd.Series([85, 100, 90, np.nan, 90, 85, np.nan, 90])
print(s)
"""
0     85.0
1    100.0
2     90.0
3      NaN
4     90.0
5     85.0
6      NaN
7     90.0
dtype: float64
"""

print(s.value_counts())
"""
90.0     3
85.0     2
100.0    1
Name: count, dtype: int64
"""

print(s.value_counts(normalize=True))
"""
90.0     0.500000
85.0     0.333333
100.0    0.166667
Name: proportion, dtype: float64
"""

print(s.value_counts(sort=False))
"""
85.0     2
100.0    1
90.0     3
Name: count, dtype: int64
"""

print(s.value_counts(ascending=True))
"""
100.0    1
85.0     2
90.0     3
Name: count, dtype: int64
"""

print(s.value_counts(bins=2))
"""
(84.984, 92.5]    5
(92.5, 100.0]     1
Name: count, dtype: int64
"""

print(s.value_counts(dropna=False))
"""
90.0     3
85.0     2
NaN      2
100.0    1
Name: count, dtype: int64
"""
```


## dropna

`Series.dropna(axis=0, inplace=False, how=None, ignore_index=False)`

删除Series对象中的NaN值，默认返回副本

12. axis：不使用

13. **inplace**：是否在原Series对象上进行修改，默认False

14. how：不使用

15. **ignore_index**：是否忽略原Series对象的索引标签，默认False

```Python
label = ["a", "b", "c", "d", "e", "f", "g", "h"]
s = pd.Series([85, 100, 90, np.nan, 90, 85, np.nan, 90], index=label)
print(s)
"""
a     85.0
b    100.0
c     90.0
d      NaN
e     90.0
f     85.0
g      NaN
h     90.0
dtype: float64
"""

print(s.dropna())
"""
a     85.0
b    100.0
c     90.0
e     90.0
f     85.0
h     90.0
dtype: float64
"""

print(s.dropna(ignore_index=True))
"""
0     85.0
1    100.0
2     90.0
3     90.0
4     85.0
5     90.0
dtype: float64
"""

print(s)
"""
a     85.0
b    100.0
c     90.0
d      NaN
e     90.0
f     85.0
g      NaN
h     90.0
dtype: float64
"""

print(s.dropna(inplace=True))
"""
None
"""

print(s)
"""
a     85.0
b    100.0
c     90.0
e     90.0
f     85.0
h     90.0
dtype: float64
"""
```


## map

`Series.map(arg, na_action=None)`

遍历原Series对象，根据字典或Series对象的映射，或将数据应用于函数，将Series对象的数据进行替换，返回替换后的副本

16. **arg**：

  1. **字典或Series对象**：根据映射关系直接替换所有相应数据，无对应映射关系则替换为NaN

  2. **函数**：将数据传入函数，用返回结果替换数据

17. **na_action**：若为"ignore"，则NaN值不会参与映射或传参。默认为None

```Python
s = pd.Series(['cat', 'dog', np.nan, 'rabbit', 'cat'])
print(s)
"""
0       cat
1       dog
2       NaN
3    rabbit
4       cat
dtype: object
"""

print(s.map({'cat': 'kitten', 'dog': 'puppy'}))
"""
0    kitten
1     puppy
2       NaN
3       NaN
4    kitten
dtype: object
"""

print(s.map(pd.Series({'cat': 'kitten', 'dog': 'puppy'})))
"""
0    kitten
1     puppy
2       NaN
3       NaN
4    kitten
dtype: object
"""

print(s.map('This is a {}'.format))
"""
0       This is a cat
1       This is a dog
2       This is a nan
3    This is a rabbit
4       This is a cat
dtype: object
"""

print(s.map('This is a {}'.format, na_action="ignore"))
"""
0       This is a cat
1       This is a dog
2                 NaN
3    This is a rabbit
4       This is a cat
dtype: object
"""
```


## rename

`Series.rename(index=None, axis=0, copy=True, inplace=False, level=None, errors="ignore")`

改变Series对象的索引标签或名称

18. **index**：

  1. **数值、字符串、元组**：改变名称

  2. **字典、函数**：改变索引标签

19. axis：0 或 'index'，不需使用

20. copy：是否同时复制基础数据作为副本，默认为True。若inplace=True，该参数将被忽略

21. inplace：是否在原Series对象上进行修改。默认False

22. level：整数或索引的层级名称，适用于多层级索引

23. **errors：**当字典的键并非已存在的标签时是引发报错还是忽略

  1. **'ignore'（默认）**

  2. **'raise'**

```Python
label = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
s = pd.Series([85, 97, 90, np.nan, np.nan, np.nan, 83, 85, np.nan, 76], index=label)
print(s)
"""
a    85.0
b    97.0
c    90.0
d     NaN
e     NaN
f     NaN
g    83.0
h    85.0
i     NaN
j    76.0
dtype: float64
"""

print(s.rename("test"))
"""
a    85.0
b    97.0
c    90.0
d     NaN
e     NaN
f     NaN
g    83.0
h    85.0
i     NaN
j    76.0
Name: test, dtype: float64
"""

print(s.rename({"a": "A", "f": "F", "z": "Z"}))
"""
A    85.0
b    97.0
c    90.0
d     NaN
e     NaN
F     NaN
g    83.0
h    85.0
i     NaN
j    76.0
dtype: float64
"""

print(s.rename(lambda x: x.upper()))
"""
A    85.0
B    97.0
C    90.0
D     NaN
E     NaN
F     NaN
G    83.0
H    85.0
I     NaN
J    76.0
dtype: float64
"""

print(s.rename({"a": "A", "f": "F", "z": "Z"}, errors="raise"))
"""
KeyError: "['z'] not found in axis"
"""
```


## isin

`Series.isin(values)`

判断Series对象中的数据是否在values中，返回布尔型Series对象

24. **values**：用于测试的值的序列。类型可以是集合或列表、数组等，不能是单个字符串。

```Python
s = pd.Series([85, 100, 90, np.nan, 90, 85, np.nan, 90])
print(s)
"""
0     85.0
1    100.0
2     90.0
3      NaN
4     90.0
5     85.0
6      NaN
7     90.0
dtype: float64
"""

print(s.isin([85, 90]))
"""
0     True
1    False
2     True
3    False
4     True
5     True
6    False
7     True
dtype: bool
"""

print(s.isin(range(80, 96)))
"""
0     True
1    False
2     True
3    False
4     True
5     True
6    False
7     True
dtype: bool
"""
```


## isna、isnull

`Series.isna()`

`Series.isnull()`

判断Series对象中的数据是否为NaN，返回布尔型Series对象

```Python
s = pd.Series([85, 100, 90, np.nan, 90, 85, np.nan, 90])
print(s)
"""
0     85.0
1    100.0
2     90.0
3      NaN
4     90.0
5     85.0
6      NaN
7     90.0
dtype: float64
"""

print(s.isna())
print(s.isnull())
"""
0    False
1    False
2    False
3     True
4    False
5    False
6     True
7    False
dtype: bool
"""
```


## notna、notnull

`Series.notna()`等价于`~Series.isna()`（~表示非运算）

`Series.notnull()`等价于`~Series.isnull()`（~表示非运算）

判断Series对象中的数据是否为NaN，返回布尔型Series对象

```Python
s = pd.Series([85, 100, 90, np.nan, 90, 85, np.nan, 90])
print(s)
"""
0     85.0
1    100.0
2     90.0
3      NaN
4     90.0
5     85.0
6      NaN
7     90.0
dtype: float64
"""

print(s.notna())
print(s.notnull())
print(~s.isna())
print(~s.isnull())
"""
0     True
1     True
2     True
3    False
4     True
5     True
6    False
7     True
dtype: bool
"""
```


