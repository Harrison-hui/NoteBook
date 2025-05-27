直方图(Histogram)是一种常见的图表类型，用于展示数据的分布情况。它通过将数据范围分成若干个区间(bi)，然后计算每个区间内的数据点数量，并以条形的高度表示每个区间的数据频率或密度。直方图能够直观地反映出数据的分布特点，如集中趋势、偏斜程度、离散性等。

[iris.csv](https://flowus.cn/preview/5b0e9b63-47ff-424a-b5d8-05dc61169d5e)

![image.png](https://tc-cdn.flowus.cn/oss/fde6d3b8-acdf-45ba-b459-f8e88211b537/image.png?time=1747467000&token=d2b570c0a605d8d8ae3d9ce6cd8aea731e4722d3166929539a2f523526cba817&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

iris = pd.read_csv('../Data/iris.csv')
```


# Matplotlib：hist

[matplotlib.axes.Axes.hist — Matplotlib 3.7.0 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.hist.html)


[matplotlib.pyplot.hist — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.hist.html)


`hist(x, bins=None, *, range=None, density=False, weights=None, cumulative=False, bottom=None, histtype='bar', align='mid', orientation='vertical', rwidth=None, log=False, color=None, label=None, stacked=False, data=None, **kwargs)`

计算并绘制（单变量）直方图（histogram）。此方法使用`numpy.histogram`对x中的数据进行分箱并计算每个箱（bin）中的值数量，然后以`BarContainer`或`Polygon`的形式绘制数据分布。`bins`、`range`、`density`和`weights`参数将传递给`numpy.histogram`。不支持掩码数组。

数据输入`x`可以是一个一维数组、一个可能不同长度的一维数组的序列([x0, x1, ...])，或者一个二维数组（每一列是一个数据集）。如果输入是一个一维数组，则返回值是一个元组`(n, bins, patches)`；如果输入是一维数组序列或二维数组，则返回值是一个元组`([n0, n1, ...], bins, [patches0, patches1, ...])`。

如果提供`data`参数，以下参数也接受一个字符串`s`，如果`s`是`data`中的键，则解释为`data[s]`：*x*, *weights。*

1. **histtype：**要绘制的直方图类型。

  1. **'bar'（默认）：**传统的柱状直方图。如果提供了多个数据，则柱会并排排列。

  2. **'barstacked'：**一种多个数据堆叠在一起的柱状直方图。

  3. **'step'：**生成默认不填充的线图。

  4. **'stepfilled'：**生成默认填充的线图。

2. **orientation：**如果为`'horizontal'`，则`barh`将用于柱状直方图的绘制，且`bottom`参数将是左侧边缘。默认`'vertical'`。

3. **align：**直方图柱的水平对齐方式。`'left'`表示柱居中于箱左边缘；`'mid'`（默认）表示柱居中于箱边之间；`'right'`表示柱居中于箱右边缘。

4. **bottom：**（每个箱）的底部位置，即箱从`bottom`绘制到`bottom + hist(x, bins)`。如果是一个标量，则每个箱的底部都会向同一方向偏移相同的量。如果是一个数组（长度必须与箱的数量匹配），则每个箱可以独立偏移。如果为 None，则默认为0。

5. **rwidth：**柱宽度相对于箱宽度的比例。如果为`None`，则自动计算。如果`histtype`为'step'或'stepfilled'，则忽略该参数。

6. **color：**颜色或颜色序列（每个数据集一个）。默认（`None`）使用标准线颜色序列。

7. **log：**如果为`True`，则直方图轴将被设置为对数尺度。默认`False`。

8. **label：**字符串或字符串序列（匹配每个数据集）。

`**kwargs`其它参数传递给`Patch`类。以下属性还接受与`x`中的数据集对应的值序列：edgecolor、facecolor、linewidth、linestyle、hatch。

对于大量箱（数量>1000），可以通过使用`stairs`来绘制预计算的直方图（`plt.stairs(*np.histogram(data))`），或者将 `histtype`设置为'step'或'stepfilled'而不是'bar'或'barstacked'来显著加速绘图。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.hist('sepal_length',
        data=iris,

        histtype='bar',
        orientation='vertical',
        align='mid',
        bottom=5,
        rwidth=1,
        color='#00e8fd',
        log=False,
        label='sepal_length'
        )
"""
(array([ 9., 23., 14., 27., 16., 26., 18.,  6.,  5.,  6.]),
 array([4.3 , 4.66, 5.02, 5.38, 5.74, 6.1 , 6.46, 6.82, 7.18, 7.54, 7.9 ]),
 <BarContainer object of 10 artists>)
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/ef7ad455-329f-445f-8781-549ddabb5c3f/image.png?time=1747467900&token=57a3ccb24afb16dede80c127827e548702770eb5a2e5d2397c642d8072e3aae6&role=sharePaid)

## 分箱与计数

9. **bins：**默认`rcParams["hist.bins"]=10`。

  1. 如果是一个**整数**，它定义了`range`范围内的等宽箱数量。

  2. 如果是一个**序列**，它定义了箱边，包括第一个箱的左侧边和最后一个箱的右侧边；在这种情况下，箱可能是不均匀分布的。除了最后一个（最右侧）箱之外，所有箱都是左闭右开区间。即，如果`bins=[1, 2, 3, 4]`，那么第一个箱是 [1, 2)，第二个箱是[2, 3)。但最后一个箱是[3, 4] 。

  3. 如果是一个**字符串**，它是由`numpy.histogram_bin_edges`支持的分箱策略之一：`'auto'`、`'fd'`、`'doane'`、`'scott'`、`'stone'`、`'rice'`、`'sturges'`、`'sqrt'`。

10. **range：**箱的下限和上限范围。忽略下限和上限外的异常值。如果没有提供，则默认为极值`(x.min(), x.max())`。如果`bins` 是一个序列，则该参数没有效果。如果`bins`是一个序列或指定了该参数，则自动缩放是基于指定的箱范围，而不是`x`的范围。

11. **weights：**与`x`形状相同，为每个数据点的计数权重数组。`x`中的每个值对箱计数只贡献其对应的权重，而不再是1。

如果数据已经被分箱并计数，请使用`bar`或`stairs`来绘制分布；或者使用`hist()`，通过将每个分箱视为一个权重等于其计数的的单独点来绘制。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.hist('sepal_length',
        data=iris,

        bins=20,
        range=(4.3, 7.9),
        # bins = [4.3, 4.48, 4.66, 4.84, 5.02, 5.2, 5.38, 5.56, 5.74, 5.92, 6.1, 6.28, 6.46, 6.64, 6.82, 7., 7.18, 7.36, 7.54, 7.72, 7.9],
        weights=np.full(150, fill_value=2),

        histtype='bar',
        orientation='vertical',
        align='mid',
        bottom=0,
        rwidth=1,
        color='#00e8fd',
        log=False,
        label='sepal_length'
        )
"""
(array([ 8., 10., 14., 32., 18., 10., 26., 28., 20., 12., 20., 32., 14.,
        22.,  8.,  4.,  8.,  2., 10.,  2.]),
 array([4.3 , 4.48, 4.66, 4.84, 5.02, 5.2 , 5.38, 5.56, 5.74, 5.92, 6.1 ,
        6.28, 6.46, 6.64, 6.82, 7.  , 7.18, 7.36, 7.54, 7.72, 7.9 ]),
 <BarContainer object of 20 artists>)
"""

ax.legend()
plt.show()
```


```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

bins = [4.3, 4.48, 4.66, 4.84, 5.02, 5.2, 5.38, 5.56, 5.74, 5.92, 6.1, 6.28, 6.46, 6.64, 6.82, 7., 7.18, 7.36, 7.54, 7.72, 7.9]
counts = [8., 10., 14., 32., 18., 10., 26., 28., 20., 12., 20., 32., 14., 22., 8., 4., 8., 2., 10., 2.]

ax.hist(bins[:-1],

        bins=bins,
        weights=counts,

        histtype='bar',
        orientation='vertical',
        align='mid',
        bottom=0,
        rwidth=1,
        color='#00e8fd',
        log=False,
        label='sepal_length'
        )
"""
(array([ 8., 10., 14., 32., 18., 10., 26., 28., 20., 12., 20., 32., 14.,
        22.,  8.,  4.,  8.,  2., 10.,  2.]),
 array([4.3 , 4.48, 4.66, 4.84, 5.02, 5.2 , 5.38, 5.56, 5.74, 5.92, 6.1 ,
        6.28, 6.46, 6.64, 6.82, 7.  , 7.18, 7.36, 7.54, 7.72, 7.9 ]),
 <BarContainer object of 20 artists>)
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/fa638595-1824-4ac4-9abb-ba6f2765132b/image.png?time=1747467900&token=4a0e9d0f44f70ec837bdacd590504e66cc4c3a27c8d13b0da30f7b12f0b4b81c&role=sharePaid)

## 概率密度与累计

12. **density：**如果为`True`，则绘制并返回概率密度：每个箱将以箱原始计数除以总计数和箱宽度（`density=counts/(sum(counts)*np.diff(bins))`）展示，使**直方图下面积和（积分）为1**（`np.sum(density*np.diff(bins))==1`）。默认`False`。

13. **cumulative：**如果`True` ，则每个箱给出该箱及其所有较小值箱的计数总和，最后一个箱给出数据点的总数（**计数累计**）。如果`density`参数也是`True`，则直方图将归一化，使得最后一个箱等于1（**概率累计**）。如果该参数是一个小于0的数字（例如`-1`），则累积方向相反。默认`False`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.hist('sepal_length',
        data=iris,

        bins=20,
        range=(4.3, 7.9),
        weights=np.full(150, fill_value=2),

        density=True,
        cumulative=False,

        histtype='bar',
        orientation='vertical',
        align='mid',
        bottom=0,
        rwidth=1,
        color='#00e8fd',
        log=False,
        label='sepal_length'
        )
"""
(array([0.14814815, 0.18518519, 0.25925926, 0.59259259, 0.33333333,
        0.18518519, 0.48148148, 0.51851852, 0.37037037, 0.22222222,
        0.37037037, 0.59259259, 0.25925926, 0.40740741, 0.14814815,
        0.07407407, 0.14814815, 0.03703704, 0.18518519, 0.03703704]),
 array([4.3 , 4.48, 4.66, 4.84, 5.02, 5.2 , 5.38, 5.56, 5.74, 5.92, 6.1 ,
        6.28, 6.46, 6.64, 6.82, 7.  , 7.18, 7.36, 7.54, 7.72, 7.9 ]),
 <BarContainer object of 20 artists>)
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/d4f5b282-74a3-4616-aec4-26b0e87ce2a2/image.png?time=1747467900&token=12971aee7cf39fc08d79d822266f9412d4dff49d25f7981833c452db85dbcce6&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.hist('sepal_length',
        data=iris,

        bins=20,
        range=(4.3, 7.9),
        weights=np.full(150, fill_value=2),

        density=True,
        cumulative=True,

        histtype='bar',
        orientation='vertical',
        align='mid',
        bottom=0,
        rwidth=1,
        color='#00e8fd',
        log=False,
        label='sepal_length'
        )
"""
(array([0.02666667, 0.06      , 0.10666667, 0.21333333, 0.27333333,
        0.30666667, 0.39333333, 0.48666667, 0.55333333, 0.59333333,
        0.66      , 0.76666667, 0.81333333, 0.88666667, 0.91333333,
        0.92666667, 0.95333333, 0.96      , 0.99333333, 1.        ]),
 array([4.3 , 4.48, 4.66, 4.84, 5.02, 5.2 , 5.38, 5.56, 5.74, 5.92, 6.1 ,
        6.28, 6.46, 6.64, 6.82, 7.  , 7.18, 7.36, 7.54, 7.72, 7.9 ]),
 <BarContainer object of 20 artists>)
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c0d6c294-bb0c-4760-bca7-0c3b3dc32fa6/image.png?time=1747467900&token=64d3fe1ccab7ecae263b56aaa5d086156143e80e1b76f1c0dfa7d78edbb3021b&role=sharePaid)

## 多数据集

在多数据集情况下，所有数据集计算统计量使用的是**共同的分箱**，默认分箱范围是`(x.min(), x.max())`，以便区分不同数据集在同一范围内的集中趋势，而非每个数据集取各自的极值范围，同时也避免了不同数据集分箱宽度的不同。累计时各自累计。

**stacked：**如果为`True`，多个数据将堆叠在一起（如果此时`histtype='bar'`，则等同`histtype='barstacked'`），此时每个数据集的实际绘制的统计量会叠加前面数据集同一箱区间的统计量，以使图形堆叠在前面数据集的图形之上（所以图形展示的不是真实分布情况）；如果`False`（默认），多个数据将并排排列（`histtype='bar'`）或重叠在一起（`histtype='step'`/`histtype='stepfilled'`）。

计算概率或概率密度（归一化）时：在**堆叠情况**下，使用**共同的总计数**，为所有数据集的总计数和，而非每个数据集取各自总计数，最终使得堆叠图形总面积和为1。而**非堆叠情况**下，则使用**各自总计数**，使每个数据集各自的图形面积为1。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.hist(iris[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']],

        bins=20,
        density=True,

        histtype='bar',
        stacked=True,
        orientation='vertical',
        align='mid',
        bottom=0,
        rwidth=1,
        color=['#00e8fd', '#e021fd', '#fd806a', '#d3fd03'],
        log=False,
        label=['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
        )
"""
(array([[0.        , 0.        , 0.        , 0.        , 0.        ,
         0.        , 0.        , 0.        , 0.        , 0.        ,
         0.0042735 , 0.04273504, 0.12820513, 0.07692308, 0.1025641 ,
         0.10683761, 0.09401709, 0.03846154, 0.02136752, 0.02564103],
        [0.        , 0.        , 0.        , 0.        , 0.0042735 ,
         0.04273504, 0.15384615, 0.25641026, 0.11965812, 0.04700855,
         0.01709402, 0.04700855, 0.12820513, 0.07692308, 0.1025641 ,
         0.10683761, 0.09401709, 0.03846154, 0.02136752, 0.02564103],
        [0.        , 0.        , 0.01709402, 0.17094017, 0.02991453,
         0.04273504, 0.15384615, 0.26068376, 0.14102564, 0.06837607,
         0.07692308, 0.13247863, 0.21794872, 0.11538462, 0.16239316,
         0.13247863, 0.11111111, 0.04273504, 0.02136752, 0.02564103],
        [0.20512821, 0.00854701, 0.08119658, 0.32905983, 0.13675214,
         0.12820513, 0.16666667, 0.26068376, 0.14102564, 0.06837607,
         0.07692308, 0.13247863, 0.21794872, 0.11538462, 0.16239316,
         0.13247863, 0.11111111, 0.04273504, 0.02136752, 0.02564103]]),
 array([0.1 , 0.49, 0.88, 1.27, 1.66, 2.05, 2.44, 2.83, 3.22, 3.61, 4.  ,
        4.39, 4.78, 5.17, 5.56, 5.95, 6.34, 6.73, 7.12, 7.51, 7.9 ]),
 <a list of 4 BarContainer objects>)
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/0e538d26-e4ea-4451-ab83-51bc28e2468b/image.png?time=1747467900&token=291e57f756c9b87160be82fe6b64a953411080a7575a5e6c84b08ce7d282c5a3&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.hist(iris[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']],

        bins=20,
        density=True,

        histtype='step',
        stacked=False,
        orientation='vertical',
        align='mid',
        bottom=0,
        rwidth=1,
        color=['#00e8fd', '#e021fd', '#fd806a', '#d3fd03'],
        log=False,
        label=['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
        )
"""
(array([[0.        , 0.        , 0.        , 0.        , 0.        ,
         0.        , 0.        , 0.        , 0.        , 0.        ,
         0.01709402, 0.17094017, 0.51282051, 0.30769231, 0.41025641,
         0.42735043, 0.37606838, 0.15384615, 0.08547009, 0.1025641 ],
        [0.        , 0.        , 0.        , 0.        , 0.01709402,
         0.17094017, 0.61538462, 1.02564103, 0.47863248, 0.18803419,
         0.05128205, 0.01709402, 0.        , 0.        , 0.        ,
         0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.06837607, 0.68376068, 0.1025641 ,
         0.        , 0.        , 0.01709402, 0.08547009, 0.08547009,
         0.23931624, 0.34188034, 0.35897436, 0.15384615, 0.23931624,
         0.1025641 , 0.06837607, 0.01709402, 0.        , 0.        ],
        [0.82051282, 0.03418803, 0.25641026, 0.63247863, 0.42735043,
         0.34188034, 0.05128205, 0.        , 0.        , 0.        ,
         0.        , 0.        , 0.        , 0.        , 0.        ,
         0.        , 0.        , 0.        , 0.        , 0.        ]]),
 array([0.1 , 0.49, 0.88, 1.27, 1.66, 2.05, 2.44, 2.83, 3.22, 3.61, 4.  ,
        4.39, 4.78, 5.17, 5.56, 5.95, 6.34, 6.73, 7.12, 7.51, 7.9 ]),
 <a list of 4 list[Polygon] objects>)
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/b5b0340c-732f-49b1-ab66-2940e3d49d39/image.png?time=1747467900&token=74e5abb22f1c94e70eb2a0b9ed2bd98fd19acdf748203d64388c5033299bb63b&role=sharePaid)

# Matplotlib：ecdf

[matplotlib.axes.Axes.ecdf — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.ecdf.html)


[matplotlib.pyplot.ecdf — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.ecdf.html)


`ecdf(x, weights=None, *, complementary=False, orientation='vertical', compress=False, data=None, **kwargs)`

计算并绘制`x`的**经验累积分布函数（Empirical Cumulative Distribution Function）**。ECDF图可以被视为一个累积直方图，每个数据对应一个区间，即它报告了整个数据集，而**没有进行任何任意的区间划分**。

输入数据`x`为一维数组，其中的无限项（`inf`）将被保留（并将 ecdf 的相关端点从0/1移动），但`NaN`值和掩码值是错误。如果`x`包含`NaN`或掩码数据，则首先从数组中删除它们（如果它们不应被考虑），或者用`-inf`或`+inf`替换它们（如果它们应被排序在数组的开始或结束处）。

如果提供`data`参数，以下参数也接受一个字符串`s`，如果`s`是`data`中的键，则解释为`data[s]` :*x*, *weights*。

14. **weights：**必须与`x`具有相同的形状。对应于NaN数据点的权重将被丢弃，然后剩余的权重将被归一化，使其总和为 1。如果未设置，则所有数据点具有相同的权重。

15. **complementary：**是否绘制累积分布函数，该函数从0增加到1（默认，`False`），或者绘制补充累积分布函数，该函数从1减少到0（`True`）。

16. **compress：**是否在绘图前将具有相同值的多个条目分组在一起（权重将总和）。这在`x`包含许多相同数据点时非常有用，可以降低绘图渲染的复杂性。如果`x`不包含重复点，则此选项没有效果，只会消耗一些时间和内存。默认`False`。

`**kwargs`其它参数传递给`Line2D`类。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.hist('sepal_length',
        data=iris,

        bins=20,
        density=True,
        cumulative=True,
        
        color='#00e8fd',
        label='sepal_length'
        )
ax.ecdf('sepal_length',
        data=iris,

        weights=None,
        complementary=False,
        compress=True,
        orientation='vertical',

        linestyle='--',
        linewidth=2,
        color='#fa6000',
        label='ECDF'
        )
"""
<matplotlib.lines.Line2D at 0x1884453e7e0>
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/e1463a2d-67f1-4fdf-aa26-f5b9d9506bf9/image.png?time=1747467900&token=9295983ad4dafa12d73ce79be7db5f0530456feec874b7da2d6182692664e64e&role=sharePaid)

# Matplotlib：hist2d

[matplotlib.axes.Axes.hist2d — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.hist2d.html)


[matplotlib.pyplot.hist2d — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.hist2d.html)


`hist2d(x, y, bins=10, *, range=None, density=False, weights=None, cmin=None, cmax=None, data=None, **kwargs)`

绘制二维（双变量）直方图，表示在`x`和`y`（长度一致）每个分箱中的计数矩阵图。而对于概率密度则为原始计数除以总计数（`x`或`y`的长度）和两个分箱宽度。

2D直方图(2D histogram)，也叫做散点密度图。它通过将数据划分为多个区域，并用不同的颜色表示每个区域内的密度，可以清晰地展示数据的集中区域和稀疏区域。在数据分析中，特别是在处理大量散点数据时，2D直方图能有效避免散点图过于拥挤的问题，帮助我们更好地发现数据之间的潜在关系。

从抽象三维空间理解：对于数据点(x, y)，落到`x`某个分箱（宽=d1）同时落到`y`某个分箱（宽=d2）的计数为n，则绘制d1 x d2 x n的柱，高为n；但在实际绘制中，高n被渲染为某个颜色。在最后图片中，每个格子代表不同的`x`、`y`分箱，而其颜色的深浅差异代表不同的高度（计数）。
对概率密度，这里的目的是使所有的抽象柱体积和（积分）为1，即每个柱的体积代表概率，而不再是面积；高则代表概率密度，即不同颜色代表不同概率密度。所以每个箱的概率密度=概率 ÷ 底面积=（计数÷总计数）÷（`x`分箱宽 × `y`分箱宽）。

17. **bins：**默认值为 10。

  1. 如果是`int`，表示两个维度的bins数量（`nx = ny = bins`）。

  2. 如果是`[int, int]` ，表示每个维度的bins数量（`nx, ny = bins`）。

  3. 如果是一维数组，表示两个维度的bins区间（`x_edges = y_edges = bins`）。

  4. 如果是`[array, array]` ，表示每个维度的bins区间（`x_edges, y_edges = bins`）。

18. **range：**`[[xmin, xmax], [ymin, ymax]]`，表示每个维度的bin的左右边界（如果未在`bins`参数中明确指定）。所有超出此范围的值将被视为异常值，不计入直方图中。

19. **cmin, cmax：**所有计数小于 `cmin` 或大于 `cmax`的bins将不会显示（在传递给`pcolormesh`之前设置为 NaN）并且这些计数值在返回的计数直方图中也将设置为 nan。

`**kwargs`附加参数传递给`pcolormesh`方法和`QuadMesh`构造函数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.hist2d('sepal_length', 'sepal_width',
          data=iris,

          bins=[20, 20],
          range=[[4.3, 7.9], [2, 4.4]],
          weights=None,
          density=True,
          cmin=None,
          cmax=None,

          cmap='viridis',
          norm=mpl.colors.Normalize(vmin=0, vmax=1)
          )
"""
(array([[0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.61728395, 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.30864198, 0.30864198, 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.61728395, 0.30864198, 0.61728395, 0.61728395, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.30864198, 0.        , 0.30864198, 0.30864198, 0.30864198, 0.        , 0.        , 0.        , 0.61728395, 0.61728395, 0.61728395, 0.61728395, 0.61728395, 0.61728395, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.30864198, 0.61728395, 0.        , 1.2345679 , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.30864198, 0.        , 0.30864198, 0.        , 0.        , 0.30864198, 0.        , 0.        ],
        [0.        , 0.        , 0.30864198, 0.61728395, 0.30864198, 0.30864198, 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.61728395, 0.30864198, 0.        , 0.30864198, 0.61728395, 0.        , 0.        , 0.30864198, 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.61728395, 0.61728395, 0.92592593, 0.61728395, 0.92592593, 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.30864198],
        [0.        , 0.        , 0.        , 0.        , 0.        , 1.54320988, 0.30864198, 0.        , 0.61728395, 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        ],
        [0.        , 0.61728395, 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.30864198, 0.30864198, 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.30864198, 0.        , 0.        , 0.        , 0.30864198, 0.92592593, 0.61728395, 0.61728395, 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.30864198, 0.        , 0.61728395, 0.61728395, 0.92592593, 0.61728395, 0.        , 0.30864198, 1.2345679 , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.30864198, 1.2345679 , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.30864198, 0.        , 0.92592593, 0.92592593, 0.92592593, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.92592593, 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.30864198, 0.        , 0.30864198, 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.30864198, 0.        , 0.61728395, 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        ],
        [0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.        , 0.30864198, 0.        , 0.        , 0.        , 0.        , 0.        ]]),
 array([4.3 , 4.48, 4.66, 4.84, 5.02, 5.2 , 5.38, 5.56, 5.74, 5.92, 6.1 ,
        6.28, 6.46, 6.64, 6.82, 7.  , 7.18, 7.36, 7.54, 7.72, 7.9 ]),
 array([2.  , 2.12, 2.24, 2.36, 2.48, 2.6 , 2.72, 2.84, 2.96, 3.08, 3.2 ,
        3.32, 3.44, 3.56, 3.68, 3.8 , 3.92, 4.04, 4.16, 4.28, 4.4 ]),
 <matplotlib.collections.QuadMesh at 0x1dc122f4500>)
"""

ax.scatter('sepal_length', 'sepal_width', data=iris, c='r')

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/d7346663-bcdc-4551-8cfe-d055b6b7e27f/image.png?time=1747467900&token=5550e976a874fd3023dd692ffd9fd9da0c2617710b2d285c72741d71752b07f8&role=sharePaid)

# Seaborn：histplot

[seaborn.histplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.histplot.html)


`sns.histplot(data=None, *, x=None, y=None, hue=None, weights=None, stat='count', bins='auto', binwidth=None, binrange=None, discrete=None, cumulative=False, common_bins=True, common_norm=True, multiple='layer', element='bars', fill=True, shrink=1, kde=False, kde_kws=None, line_kws=None, thresh=0, pthresh=None, pmax=None, cbar=False, cbar_ax=None, cbar_kws=None, palette=None, hue_order=None, hue_norm=None, color=None, log_scale=None, legend=True, ax=None, **kwargs)`

绘制单变量或双变量直方图以显示数据集的分布。直方图是一种经典的可视化工具，通过计数落在离散区间内的观测值数量来表示一个或多个变量的分布。此函数可以将每个箱内计算的统计量进行归一化，以估计频率、密度或概率质量，并且可以添加使用核密度估计得到的平滑曲线，类似于`kdeplot()`。

20. **stat**：每个箱中计算的聚合统计量。

  1. `'count'`（默认）：显示每个箱中的观测值数量（**频数**）。

  2. `'frequency'`：显示每个箱中的观测值数量除以箱宽（**密度**）。

  3. `'probability'`/`'proportion'` ：归一化，使条形高度之和为1（即显示**小数概率**）。

  4. `'percent'` ：归一化，使条形高度之和为100（即显示**百分比概率**）。

  5. `'density'` ：归一化，使直方图的总面积为1（即显示**概率密度**）。

21. **binwidth：**每个分箱的宽度，覆盖`bins`，但可以与`binrange`一起使用。可以是一个数字（单变量）或一对数字（双变量）。

22. **binrange：**和`bins`或`binwidth`一起使用，以确定分箱。默认为数据极值。同上`range`参数。

23. **common_bins：**如果为`True`（默认），则在语义变量产生多个图表时**使用相同的bins**。如果使用参考规则来确定bins，它将使用完整数据集进行计算。

24. **common_norm：**如果为`True`（默认）并且使用归一化统计量，则**归一化将应用于整个数据集**。否则，独立地对每个直方图进行归一化。

`**kwargs`其他关键字参数将传递给以下 matplotlib 函数之一：`matplotlib.axes.Axes.bar()`（单变量，`element='bars'`）

、`matplotlib.axes.Axes.fill_between()`（单变量，其他`element`，`fill=True`）、`matplotlib.axes.Axes.plot()`（单变量，其他`element`，`fill=False`）、`matplotlib.axes.Axes.pcolormesh()`（双变量）。

## 单变量

25. **element：**分布统计图的可视化表示。**仅适用于单变量数据**。可选`'bars'`（默认）, `'step'`, `'poly'`。

26. **fill：**如果为`True`（默认），则填充直方图下的空间。**仅适用于单变量数据**。

27. **shrink：**将每个柱的宽度相对于箱宽按此因子缩放。**仅适用于单变量数据**。同上`rwidth`参数。默认为1。

28. **kde：**如果为`True`，则计算核密度估计以平滑分布，并在图中以（一条或多条）线显示。默认`False`。**仅适用于单变量数据**。

29. **kde_kws：**控制KDE计算的参数字典，见`kdeplot()`。

30. **line_kws：**控制KDE可视化的参数字典，传递给`matplotlib.axes.Axes.plot()`。

31. **multiple：**解决当语义映射创建子集时多个元素的方法。**仅适用于单变量数据**。可选`'layer'`（默认）, `'dodge'`, `'stack'`, `'fill'`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.histplot(data=iris,
             x="sepal_length",
             # y="sepal_length",

             stat="count",
             cumulative=False,

             bins=20,
             binwidth=None,
             binrange=(4.3, 7.9),
             weights=np.full(150, fill_value=2),

             element='bars',
             fill=True,
             color='#9673f9',
             shrink=1,

             kde=True,
             kde_kws=None,
             line_kws={'linestyle': '--',
                       'linewidth': 2},

             log_scale=False,
             ax=ax
             )
"""
<Axes: xlabel='sepal_length', ylabel='Count'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/fb318103-96e5-40ae-b284-184447f49b84/image.png?time=1747467900&token=17f6ff9bcf1d48fd1d09854de7bd6525e58a2e5634bb7a43251fa7f25154dcdc&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.histplot(data=iris,
             x="sepal_length",
             # y="sepal_length",

             stat="density",
             cumulative=False,

             hue="species",
             hue_order=["versicolor", "setosa", "virginica"],
             palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},
             multiple="layer",
             common_bins=True,
             common_norm=True,

             bins=20,
             binwidth=None,
             binrange=None,
             weights=None,

             element='bars',
             fill=True,
             shrink=1,

             kde=True,
             kde_kws=None,
             line_kws={'linestyle': '--',
                       'linewidth': 2},

             log_scale=False,
             legend=True,
             ax=ax
             )
"""
<Axes: xlabel='sepal_length', ylabel='Density'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/3c7f691c-76a5-4f08-9549-4b4c0f1d88f5/image.png?time=1747467900&token=a1b0e559bcb816ebff1a993bbf51f9962a3e771678b66a19d671b9fffbbf5134&role=sharePaid)

## 双变量

32. **thresh：**统计量小于或等于此值的单元格将变为透明。**仅适用于双变量数据**。

33. **pthresh：**与`thresh`相似，但取值[0, 1]区间。统计量小于或等于总和的这一比例的单元格将变为透明。**仅适用于双变量数据**。

34. **pmax：**一个位于[0, 1]之间的值，用于设置颜色映射的饱和度点，使得低于此值的单元格构成统计量总和的此比例。**仅适用于双变量数据**。

35. **cbar：**如果为`True`，则在双变量图中添加颜色条以注释颜色映射。注意：目前不支持具有`hue`变量的图表。**仅适用于双变量数据**。

36. **cbar_ax：**预先存在的放置颜色条的Axes。

37. **cbar_kws：**传递给`matplotlib.figure.Figure.colorbar()`的附加参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.histplot(data=iris,
             x="sepal_length",
             y="sepal_width",

             stat="density",

             bins=[20, 20],
             binwidth=None,
             binrange=None,
             weights=None,

             cmap='viridis',
             vmin=0,
             vmax=1,

             thresh=0.30864198,
             pthresh=None,
             pmax=None,
             
             cbar=True,
             cbar_ax=None,
             cbar_kws={'label': 'Density',
                       'orientation': 'horizontal'},

             log_scale=False,
             ax=ax
             )
"""
<Axes: xlabel='sepal_length', ylabel='sepal_width'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/de93cf22-773a-4175-8958-646955c87e1c/image.png?time=1747467900&token=17df18e730c839430ce7d20ea63f66196e3542cc7928dcd5edaf162e64487100&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.histplot(data=iris,
             x="sepal_length",
             y="sepal_width",

             stat="density",

             hue="species",
             hue_order=["versicolor", "setosa", "virginica"],
             palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},
             common_bins=True,
             common_norm=True,

             bins=[20, 20],
             binwidth=None,
             binrange=None,
             weights=None,
             
             vmin=0,
             vmax=1,

             thresh=0,
             pthresh=None,
             pmax=None,
             
             cbar=True,
             cbar_ax=None,
             cbar_kws={'label': 'Density',
                       'orientation': 'horizontal'},

             log_scale=False,
             legend=True,
             ax=ax
             )
"""
<Axes: xlabel='sepal_length', ylabel='sepal_width'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/e5a7042f-d816-47f9-ba71-0765fec014b0/image.png?time=1747467900&token=0a6fd5e0682e60fca707e25a5065ab72d77893431381a944d6aab4d8e70324a8&role=sharePaid)

## 离散变量

**discrete：**如果为`True`，则默认`binwidth=1`并将条形绘制在其对应数据点的中心，这样可以避免使用离散（整数）数据时可能出现的“间隙”。可适用于离散分布，如二项分布的绘制。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.histplot(x=np.linspace(0, 10, 11),

             stat="count",
             cumulative=False,
             discrete=True,

             weights=[0.00097656, 0.00976563, 0.04394531, 0.1171875 , 0.20507812, 0.24609375, 0.20507812, 0.1171875 , 0.04394531, 0.00976563, 0.00097656],

             element='bars',
             fill=True,
             color='#9673f9',
             shrink=1,

             kde=True,
             kde_kws=None,
             line_kws={'linestyle': '--',
                       'linewidth': 2},

             log_scale=False,
             ax=ax
             )
"""
<Axes: ylabel='Count'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/f5f57477-17ba-4337-9cd9-66d2a9d9c4a4/image.png?time=1747467900&token=7716cd7fc91e9d9556391c106cee2cbafa2e62ecead1c89161eff812fc83e586&role=sharePaid)

# Seaborn：kdeplot

[seaborn.kdeplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.kdeplot.html)


`sns.kdeplot(data=None, *, x=None, y=None, hue=None, weights=None, palette=None, hue_order=None, hue_norm=None, color=None, fill=None, multiple='layer', common_norm=True, common_grid=False, cumulative=False, bw_method='scott', bw_adjust=1, warn_singular=True, log_scale=None, levels=10, thresh=0.05, gridsize=200, cut=3, clip=None, legend=True, cbar=False, cbar_ax=None, cbar_kws=None, ax=None, **kwargs)`

使用核密度估计绘制单变量或双变量分布。核密度估计（KDE）图是一种可视化数据集中观测值分布的方法，类似于直方图。KDE 通过一个或多个维度的连续概率密度曲线来表示数据。相对于直方图，核密度估计（KDE）可以生成更清晰、更易理解的图表，尤其是在绘制多个分布时。但如果基础分布有界或不平滑，则有可能引入扭曲。与直方图一样，表示质量也取决于选择合适的平滑参数。

38. **bw_method：**计算估计带宽（bandwidth）所使用的方法名称或缩放因子，传递给`scipy.stats.gaussian_kde` 。如果是一个浮点数，则直接用作`kde.factor` 。如果是一个可调用的函数，则它应该只接受一个 `matplotlib.mlab.GaussianKDE`实例作为其唯一参数，并返回一个浮点数。字符串可选`'scott'`（默认）, `'silverman'`。

39. **cumulative：**如果为`True`，则估计累积分布函数。

40. **gridsize：**每个估计网格维度上的点数。

41. **bw_adjust：**用乘法对使用`bw_method`所选择的值进行缩放的因子。增加将使曲线更平滑。

42. **cut：**乘以平滑带宽的因子，决定了估计网格延伸到极端数据点外的距离。当设置为0时，在数据限制处截断曲线。

43. **clip：**估计与绘制范围。

44. **fill：**如果为`True`，则填充单变量密度曲线下的面积或双变量轮廓之间的面积。如果为`None`，则默认值取决于`multiple`参数。

45. **common_norm：**如果为`True`，则将每个条件密度按观测数缩放，使得所有密度下的总面积加起来为1。否则，独立地归一化每个密度。

46. **warn_singular：**如果为`True`，则在尝试估计具有零方差的数据密度时发出警告。

`**kwargs`其他关键字参数将传递给以下 matplotlib 函数之一：`matplotlib.axes.Axes.plot()`（单变量，`fill=False`）、`matplotlib.axes.Axes.fill_between()`（单变量，`fill=True`）、`matplotlib.axes.Axes.contour()`（双变量， `fill=False`）、`matplotlib.axes.contourf()`（双变量，`fill=True`）。

## 单变量

47. **multiple：**解决当语义映射创建子集时多个元素的方法。**仅适用于单变量数据**。可选`'layer'`（默认）, `'stack'`, `'fill'`。

48. **common_grid：**如果为`True`，则对每个核密度估计使用相同的估计网格。**仅适用于单变量数据**。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.histplot(data=iris,
             x="sepal_length",
             # y="sepal_length",

             stat="density",
             bins=20,
             color='#9673f9',
             ax=ax
             )
sns.kdeplot(data=iris,
            x="sepal_length",
            # y="sepal_length",

            bw_method='scott',
            cumulative=False,
            gridsize=1000,
            weights=None,
            bw_adjust=0.5,
            cut=0,
            clip=None,

            fill=True,
            color='#9673f9',

            warn_singular=True,
            log_scale=False,
            ax=ax
            )
"""
<Axes: xlabel='sepal_length', ylabel='Density'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/b77fe58b-51a8-4e33-83d3-7554857dc191/image.png?time=1747467900&token=d5854debaa6a2c794a232e3c3e4fb3ffe25b824f561f3b8f1cc934a5dc2960de&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.histplot(data=iris,
             x="sepal_length",
             # y="sepal_length",

             hue="species",
             hue_order=["versicolor", "setosa", "virginica"],
             palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},

             stat="density",
             bins=20,
             ax=ax
             )
sns.kdeplot(data=iris,
            x="sepal_length",
            # y="sepal_length",

            bw_method='scott',
            cumulative=False,
            gridsize=1000,
            weights=None,
            bw_adjust=0.5,
            cut=0,
            clip=None,

            hue="species",
            hue_order=["versicolor", "setosa", "virginica"],
            palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},
            multiple='layer',
            common_norm=True,
            common_grid=False,

            fill=True,

            warn_singular=True,
            log_scale=False,
            legend=True,
            ax=ax
            )
"""
<Axes: xlabel='sepal_length', ylabel='Density'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/2a32b769-feb2-463a-9fd8-21003e62d566/image.png?time=1747467900&token=7f980ff8a82d2939f5e1d7d321e4b163bc0bb8f9c32698f192cdf21df65c6ea1&role=sharePaid)

## 双变量

双变量的核密度估计图拟合的是概率密度的等高线（等密度）图。结合前面对双变量直方图的抽象三维空间理解，这里就是对三维空间柱绘制的等高线图，就像地理上对山丘等绘制的海拔等高线图，而这里每条等高线代表的是同一概率密度（三维空间柱的高度）。双变量密度等高线的含义不太直观。因为密度不能直接解释，等高线绘制在密度的等比例处，这意味着每条等高线都表示一个等值面，该比例是该等高面以下的体积总和（概率）。例如，对于等比例水平0.05的等高线，其高度值为对应的概率密度，而该高度以下的体积总和为0.05，以上为0.95，从二维平面来看，可以近似于认为，等高线外数据分布占5%，而线内占95%。

49. **levels：**等高线水平数量或要绘制的等高线等比例水平向量（必须在[0, 1]范围内递增）。**仅适用于双变量数据**。

50. **thresh：**绘制等高线的最低等比例水平。当`levels`为向量时将被忽略。**仅适用于双变量数据**。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

a = sns.kdeplot(data=iris,
                x="sepal_length",
                y="sepal_width",

                bw_method='scott',
                cumulative=False,
                gridsize=500,
                weights=None,
                bw_adjust=1,
                cut=3,
                clip=None,

                levels=10,
                thresh=0.05,
                cbar=True,
                cbar_ax=None,
                cbar_kws={'label': 'Density',
                          'orientation': 'horizontal'},

                fill=True,
                cmap='viridis',
                norm=mpl.colors.Normalize(vmin=0, vmax=0.5),

                warn_singular=True,
                log_scale=False,
                ax=ax
                )
"""
<Axes: xlabel='sepal_length', ylabel='sepal_width'>
"""
sns.scatterplot(data=iris, x="sepal_length", y="sepal_width", ax=ax)

ax.clabel(a.get_children()[0],
          fontsize=10,
          colors='r',
          inline=False,
          inline_spacing=5,
          fmt=lambda x: f'{x:.2f}',
          rightside_up=True,
          )

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c361db61-c953-4b1e-881b-6204a11546a1/image.png?time=1747467900&token=915ba0f134320ff6b14047e0b2b140a5d553023e71ab97f12039f5d13cbb3f94&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

a = sns.kdeplot(data=iris,
                x="sepal_length",
                y="sepal_width",

                bw_method='scott',
                cumulative=False,
                gridsize=500,
                weights=None,
                bw_adjust=1,
                cut=3,
                clip=None,

                hue="species",
                hue_order=["versicolor", "setosa", "virginica"],
                palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},
                common_norm=True,
                common_grid=False,

                levels=10,
                thresh=0.05,
                cbar=True,
                cbar_ax=None,
                cbar_kws={'label': 'Density',
                          'orientation': 'horizontal'},

                fill=True,
                alpha=0.5,

                warn_singular=True,
                log_scale=False,
                legend=True,
                ax=ax
                )
"""
<Axes: xlabel='sepal_length', ylabel='sepal_width'>
"""
sns.scatterplot(data=iris, x="sepal_length", y="sepal_width",
                hue='species',
                hue_order=["versicolor", "setosa", "virginica"],
                palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},
                ax=ax)

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/bcdde255-9f36-4385-8350-ba78a00066f5/image.png?time=1747467900&token=70dea7fbafae1acb2201496720f999eb2fec969aa5e18885ff5244f791b0af8b&role=sharePaid)

# Seaborn：ecdfplot

[seaborn.ecdfplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.ecdfplot.html)


`sns.ecdfplot(data=None, *, x=None, y=None, hue=None, weights=None, stat='proportion', complementary=False, palette=None, hue_order=None, hue_norm=None, log_scale=None, legend=True, ax=None, **kwargs)`

绘制经验累积分布函数。ECDF 表示落在数据集中每个唯一值以下的观测值的比例或计数。与直方图或密度图相比，它的优点是每个观测值都直接可视化，这意味着不需要调整任何分箱或平滑参数。它还有助于直接比较多个分布。缺点是，图表的外观与分布的基本属性（如中心趋势、方差和是否存在双峰性）之间的关系可能不那么直观。

**stat：**要计算的分布统计量。可选`"proportion"`（默认），`"percent"`，`"count"`。

`**kwargs`其他关键字参数传递给 `matplotlib.axes.Axes.plot()` 。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.ecdfplot(data=iris,
             x="sepal_length",
             # y="sepal_length",

             stat='proportion',
             weights=None,
             complementary=False,

             hue="species",
             hue_order=["versicolor", "setosa", "virginica"],
             palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},

             log_scale=False,
             legend=True,
             ax=ax
             )
"""
<Axes: xlabel='sepal_length', ylabel='Proportion'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/79329836-7428-4158-ab7c-fa989c9635ca/image.png?time=1747467900&token=9c874918859c72dddc49c499d3faeb933cc5ba79e92d1cccf83448522c27d601&role=sharePaid)



