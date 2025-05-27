[fmri.csv](https://flowus.cn/preview/a8b79f9d-bbe2-4ee4-b262-0dc272ef8964)

[iris.csv](https://flowus.cn/preview/26a6e41b-0914-436b-9cc8-34ba4d3cc1c9)

![image.png](https://tc-cdn.flowus.cn/oss/ca2b4da6-dfb0-44fa-89b8-d579a5ea0935/image.png?time=1747467000&token=7b6382a0cbbbf60c9032444c524689d2e4952e9d9f594cb5df51c2fde290e40c&role=sharePaid)

![image.png](https://tc-cdn.flowus.cn/oss/e4415977-8004-4415-ba93-e3246c181189/image.png?time=1747467000&token=c571452ed2a79698f990934efd89879af82e5c3b79aa7eb4919c393601bb7ea8&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
```


```Python
fmri = pd.read_csv('../Data/fmri.csv')

timepoint = fmri['timepoint']
"""
0       18
1       14
2       18
3       18
4       18
        ..
1059     8
1060     7
1061     7
1062     7
1063     0
Name: timepoint, Length: 1064, dtype: int64
"""

signal = fmri['signal']
"""
0      -0.017552
1      -0.080883
2      -0.081033
3      -0.046134
4      -0.037970
          ...   
1059    0.018165
1060   -0.029130
1061   -0.004939
1062   -0.025367
1063   -0.006899
Name: signal, Length: 1064, dtype: float64
"""

fmri["region"].unique()
"""
['parietal' 'frontal']
"""
```


```Python
iris = pd.read_csv('../Data/iris.csv')

sepal_length = iris['sepal_length']
"""
0      5.1
1      4.9
2      4.7
3      4.6
4      5.0
      ... 
145    6.7
146    6.3
147    6.5
148    6.2
149    5.9
Name: sepal_length, Length: 150, dtype: float64
"""

sepal_width = iris['sepal_width']
"""
0      3.5
1      3.0
2      3.2
3      3.1
4      3.6
      ... 
145    3.0
146    2.5
147    3.0
148    3.4
149    3.0
Name: sepal_width, Length: 150, dtype: float64
"""

iris["species"].unique()
"""
['setosa' 'versicolor' 'virginica']
"""
```


# matplotlib：plot

[matplotlib.pyplot.plot — Matplotlib 3.9.0 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.plot.html)


[matplotlib.axes.Axes.plot — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.plot.html#matplotlib.axes.Axes.plot)


`plot(*args, scalex=True, scaley=True, data=None, **kwargs)`

绘制 y 与 x 的线图和/或标记图，**返回绘制图形的列表**。

该函数继承自`Line2D`类，kwargs是一个可用 `Line2D` 属性的列表，见线型和标记。如果在一次plot调用中进行了多组绘制，这些关键字参数将应用于所有这些绘制。

`scalex`和`scaley`参数控制自动对数据进行线性归一化映射到轴上，以便绘制的图形在视图范围内，一般不需要更改。

```Python
plot([x], y, [fmt], *, data=None, **kwargs)
plot([x], y, [fmt], [x2], y2, [fmt2], ..., **kwargs)
```


## 数据格式

数据点或线节点的水平/垂直坐标由 x, y 给出。x 值是可选的，若未给出，则默认为 `range(len(y))`。**这些参数不能作为关键字传递**。

有一个方便的方法来绘制带标签数据的对象（即可以通过索引`obj['y']`访问的数据），只需在 data 参数中提供对象，并给出 x 和 y 的标签。所有可索引的对象都受支持。例如，可以是 `dict` ，`pandas.DataFrame` 或结构化 NumPy 数组。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot(signal,    # y

        # Line2D参数
        linestyle="--",
        linewidth=2,
        color="red",
        marker="o",
        markersize=5,
        markerfacecolor="blue",
        )
"""
[<matplotlib.lines.Line2D at 0x273ef1dfbf0>]
"""

ax.set_ylabel("signal")
plt.show()
```


```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot("signal",     # y
        data=fmri,

        # Line2D参数
        linestyle="--",
        linewidth=2,
        color="red",
        marker="o",
        markersize=5,
        markerfacecolor="blue",
        )
"""
[<matplotlib.lines.Line2D at 0x21c1f892330>]
"""

ax.set_ylabel("signal")
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/98ed7592-04cd-4213-a47f-b9476465fdfb/image.png?time=1747467000&token=6717962fb616968b91120a1a61394aa921cdf6d241de94e217bdcc0418ab9d27&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot(timepoint,    # x
        signal,       # y

        # Line2D参数
        linestyle="--",
        linewidth=2,
        color="red",
        marker="o",
        markersize=5,
        markerfacecolor="blue",
        )
"""
[<matplotlib.lines.Line2D at 0x273f6d1b4d0>]
"""

ax.set_xlabel("timepoint")
ax.set_ylabel("signal")
plt.show()
```


```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot("timepoint",    # x
        "signal",       # y
        data=fmri,

        # Line2D参数
        linestyle="--",
        linewidth=2,
        color="red",
        marker="o",
        markersize=5,
        markerfacecolor="blue",
        )
"""
[<matplotlib.lines.Line2D at 0x273f453d700>]
"""

ax.set_xlabel("timepoint")
ax.set_ylabel("signal")
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/83b5de96-3e0f-4ef9-8b25-84be3eb3c70f/image.png?time=1747467000&token=ead6fe4155c958e1425807a39c1884b5c5a4e84f1566436dfe4c443d224358e3&role=sharePaid)

## 格式字符串

fmt参数设置格式字符串，由颜色、标记和线条的部分组成：`[marker][line][color]`。每个都是可选的。**如果没有提供，则使用属性循环中的值**。（例外：如果提供了 `line` ，但没有提供 `marker` ，则数据将是一条没有标记的线）。支持的颜色缩写是单字母代码（'r', 'g'等）和索引到默认颜色循环的 `'CN'` 颜色。如果颜色是格式字符串的唯一部分，还可以使用任何 `matplotlib.colors` 规范，例如完整名称（ `'green'` ）或十六进制字符串（ `'#008000'` ）。格式字符串只是快速设置基本线属性的一种缩写。所有这些以及更多都可以通过关键字参数来控制（**关键字参数优先）**。**此参数不能作为关键字传递**。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot("timepoint",    # x
        "signal",       # y
        "o--r",         # fmt
        data=fmri
        )
"""
[<matplotlib.lines.Line2D at 0x273f506cf20>]
"""

ax.set_xlabel("timepoint")
ax.set_ylabel("signal")
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/138dbd9c-547e-4eb2-bdce-d34a13005d24/image.png?time=1747467000&token=bdb41f38a3d17e30c5aff32e8273e35d31eb60b564e10ec44c8a8f66ff27a189&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot("timepoint",    # x
        "signal",       # y
        "red",          # fmt
        data=fmri
        )
"""
[<matplotlib.lines.Line2D at 0x273f3f81160>]
"""

ax.set_xlabel("timepoint")
ax.set_ylabel("signal")
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/538587b0-c482-48d2-9d29-8693c636c078/image.png?time=1747467000&token=45428b9575daf9fd2b00f043e0f647dabe2633ca903ad0aa420be8a6782fa2f5&role=sharePaid)

## 多组绘制

1. 最直接的方法就是多次调用 `plot` 。

2. 如果 x 和/或 y 是二维数组，**每一列将作为单独的数据集进行绘制**。如果 x 和 y 都是二维的，它们必须具有相同的形状，列与列一一对应。如果只有一个二维数组，形状为(N, m)，则另一个必须具有长度 N，并将为每个数据集 m 使用。

3. 第三种方法是指定多个[x], y, [fmt]组。在这种情况下，任何额外的关键字参数都适用于所有数据集。此外，**此语法不能与data参数结合使用**。

默认情况下，每条线都会被分配一个由 'style cycle' 指定的不同样式。fmt 和 line属性参数仅在想要明确偏离这些默认值时才是必要的。或者也可以使用 `rcParams["axes.prop_cycle"]` 来更改样式循环。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot("sepal_length",    # x
        "sepal_width",     # y1
        data=iris
        )
"""
[<matplotlib.lines.Line2D at 0x273f7e36c60>]
"""

ax.plot("sepal_length",    # x
        "petal_width",     # y2
        data=iris
        )
"""
[<matplotlib.lines.Line2D at 0x273f7e46ae0>]
"""

plt.show()
```


```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot(iris["sepal_length"],    # x
        iris["sepal_width"],     # y1
        iris["sepal_length"],    # x
        iris["petal_width"]      # y2
        )
"""
[<matplotlib.lines.Line2D at 0x21c225f1c10>,
 <matplotlib.lines.Line2D at 0x21c225f39b0>]
"""

plt.show()
```


```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot("sepal_length",                           # x
        iris[["sepal_width", "petal_width"]],     # y1，y2
        data=iris
        )
"""
[<matplotlib.lines.Line2D at 0x21c225c51f0>,
 <matplotlib.lines.Line2D at 0x21c225c6180>]
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/bd1b3b09-5dce-4e76-9007-eaac16063d06/image.png?time=1747467000&token=e7945dd683750a82c25eb0c88d1949eb1599c8f5d52b34592f3d3c0fcd807915&role=sharePaid)

## 误差线（errorbar）

[matplotlib.axes.Axes.errorbar — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.errorbar.html)


[matplotlib.pyplot.errorbar — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.errorbar.html)


[Different ways of specifying error bars — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/gallery/statistics/errorbar_features.html)


`errorbar(x, y, yerr=None, xerr=None, fmt='', *, ecolor=None, elinewidth=None, capsize=None, barsabove=False, lolims=False, uplims=False, xlolims=False, xuplims=False, errorevery=1, capthick=None, data=None, **kwargs)`

以线或标记的形式绘制`y`与`x`的关系，并附加误差线。`x`,`y`定义数据位置，`xerr`,`yerr`定义误差线大小。默认情况下，这将绘制数据标记/线条以及误差线。使用`fmt='none'`来绘制不带任何数据标记的误差线。`**kwargs`其他关键字参数都将传递给`plot`调用。`data`参数如果提供，以下参数也接受一个字符串`s`，如果`s`是`data` 中的键，则解释为`data[s]`：*x*, *y*, *xerr*, *yerr。*

4. **x, y：**数据位置。

5. **fmt：**数据点/数据线的格式，默认`''`。使用`'none'`（不区分大小写）来绘制不带数据标记的误差线。

6. **xerr, yerr：**误差线大小。所有值必须≥0。

  1. **标量**：所有数据点设置相同对称+/-值。

  2. **(N,)数组**：每个数据点设置不同对称+/-值。

  3. **(2, N)数组**：每个数据点设置独立-和+值。第一行包含下限误差(-)，第二行包含上限误差(+)。

  4. **None**：无误差线（默认）。

7. **lolims, uplims, xlolims, xuplims：**这些参数可以用来表示数据值本身是否为上限/下限。在这种情况下，使用一个箭头符号来表示。要在反转的Axes中使用，必须在`set_xlim` 或 `set_ylim` 之前调用`errorbar()`。默认均为False。

8. **errorevery：**在数据子集上绘制误差线。`errorevery=N`在点`(x[::N], y[::N])`上绘制误差线。`errorevery=(start, N)` 在点`(x[start::N], y[start::N])`上绘制误差线。用于避免两个序列共享 x 轴值时误差线的重叠。默认为1.

9. **barsabove：**如果为True，将在标记上方绘制误差线。默认为下方（False）。

10. **ecolor：**误差线的颜色。如果为`None`（默认），则使用连接标记的线的颜色。

11. **elinewidth：**误差线的线宽。如果为`None`（默认），则使用当前样式的线宽。

12. **capsize：**误差线帽的长度（以点为单位）。默认`rcParams["errorbar.capsize"]=0.0`。

13. **capthick：**这是关键字参数`markeredgewidth`的别名。此设置是用于控制误差线帽的厚度（以点为单位）的一个更合理的名称。为了向后兼容，如果提供了`mew`或 `markeredgewidth`参数，则它们将覆盖`capthick`参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

x = np.arange(1, 11, 1)
y = np.sin(x) + 5

ax.errorbar(x, y, fmt='b-o',
            
            xerr=[[0.3, 0.3, 0.3, 0.5, 0.3, 0.5, 0.3, 0.6, 0.3, 0.1],
                  [0.3, 0.7, 0.3, 0.1, 0.3, 0.5, 0.3, 0.1, 0.3, 0.5]],
            yerr=[0.2, 0.2, 0.2, 0.1, 0.2, 0.6, 0.2, 0.6, 0.2, 0.1],
            lolims=[True, True, True, False, False, False, True, False, True, False],
            uplims=[False, False, False, True, True, True, False, False, False, True],
            # xlolims=[False, False, False, False, False, True, True, True, True, True],
            # xuplims=[True, True, True, True, False, False, False, False, False, False],
            errorevery=(1, 2),

            barsabove=False,
            ecolor='r',
            elinewidth=2,
            capsize=10,
            capthick=2
            )
"""
<ErrorbarContainer object of 3 artists>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/9864f6a8-d70f-4e88-b9b5-d7ab07d8620e/image.png?time=1747467000&token=d57f81bcaaaf92029e4967c0e0ce9c7edf09439e63816968c737d9ab7cb3c389&role=sharePaid)

## 雷达图

雷达图(Radar Chart)，也称为蜘蛛图或蛛网图，是一种用于显示多变量数据的可视化工具。它通过将各变量表示为从中心点辐射出的轴，以封闭多边形的形式展示数据点之间的关系和趋势。

# Matplotlib：stairs

[matplotlib.axes.Axes.stairs — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.stairs.html)


[matplotlib.pyplot.stairs — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.stairs.html)


`stairs(values, edges=None, *, orientation='vertical', baseline=0, fill=False, data=None, **kwargs)`

绘制阶梯（stepwise）常数函数的线图或填充图。`edges`定义阶梯的x轴位置。`values`定义这些阶梯之间的函数值。根据`fill`的设置，函数可以绘制为带有垂直段的连续线，或者绘制为填充区域。如果提供`data`参数，所有参数也接受一个字符串`s`，如果`s`是`data`中的键，则解释为`data[s]`。**可以作为分布直方图绘制的一种形式**。

14. **values：**阶梯的高度。

15. **edges：**阶梯的位置，满足`len(edges) == len(values) + 1`，在每两点之间取`values`值。

16. **orientation：**阶梯的方向。可选`'vertical'`（默认）, `'horizontal'`。

17. **baseline：**边界的底部值或当`fill=True`时，下边缘的位置。如果`fill=True`或向`baseline`传递一个数组，则绘制一个闭合路径。如果为`None`，则绘制为未闭合的路径。默认为0，

18. **fill：**是否填充曲线下面积。默认`False`。同时传递`fill=True`和`baseline=None`可能会导致不期望的填充：第一个和最后一个点将通过直线连接，填充将在这条线和阶梯之间进行。

`**kwargs`其它参数传递给`StepPatch`类。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

bins = [4.3 , 4.66, 5.02, 5.38, 5.74, 6.1 , 6.46, 6.82, 7.18, 7.54, 7.9 ]
counts = [ 9., 23., 14., 27., 16., 26., 18.,  6.,  5.,  6.]

ax.stairs(values=counts, edges=bins,
          orientation='vertical',
          baseline=3,
          fill=True,

          facecolor='g',
          linestyle='--',
          linewidth=2,
          hatch='/',
          hatch_linewidth=2,
          edgecolor='r',
          alpha=0.5
          )
"""
<matplotlib.patches.StepPatch at 0x1451815c560>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/ca94afaa-6eb2-4b98-8741-f534a11292ad/image.png?time=1747467000&token=b68f089f16cb36751057feaf6a117eda5411ccea67867f247549cd2b534a59aa&role=sharePaid)

# seaborn：lineplot

[seaborn.lineplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.lineplot.html)


[Visualizing statistical relationships — seaborn 0.13.2 documentation](https://seaborn.pydata.org/tutorial/relational.html#emphasizing-continuity-with-line-plots)


[Statistical estimation and error bars — seaborn 0.13.2 documentation](https://seaborn.pydata.org/tutorial/error_bars.html)


`sns.lineplot(data=None, *, x=None, y=None, hue=None, size=None, style=None, units=None, weights=None, palette=None, hue_order=None, hue_norm=None, sizes=None, size_order=None, size_norm=None, dashes=True, markers=None, style_order=None, estimator='mean', errorbar=('ci', 95), n_boot=1000, seed=None, orient='x', sort=True, err_style='band', err_kws=None, legend='auto', ci='deprecated', ax=None, **kwargs)`

`legend`参数决定如何绘制图例。如果为"brief"，则数值变量 `hue` 和 `size` 将以等间距的样本值表示。如果为"full"，则每个组都会在图例中有一个条目。如果为"auto"，则根据级别数量在"brief"和"full"之间进行选择。如果为 `False` ，则不添加图例数据，也不绘制图例。`**kwargs`指定的其它关键字参数传递给 `matplotlib.axes.Axes.plot()` 。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.lineplot(data=fmri,
             x='timepoint',
             y='signal',
             
             sort=False,
             estimator=None,
             
             ax=ax
             )
"""
<Axes: xlabel='timepoint', ylabel='signal'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/07b16056-0455-4651-872f-0f0ed2ff168a/image.png?time=1747467000&token=0371e01836cdc02f11debca5fc215d16e368056d81911a62635ef6971a2d5f7b&role=sharePaid)

## sort

如果为 True（默认），则**按 x （默认）或 y 变量（由orient参数指定）对数据进行排序（即按x 或 y 变量的数据顺序连接数据点）**，否则将按照数据集中原出现的顺序连接（如上）。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.lineplot(data=fmri,
             x='timepoint',
             y='signal',
             
             sort=True,
             orient="x",
             estimator=None,
             
             ax=ax
             )
"""
<Axes: xlabel='timepoint', ylabel='signal'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/2b8a1763-451a-47c6-8cf4-88dfd36d39ba/image.png?time=1747467000&token=8293598e42a0534e2ebcb2953b4a8de1c3522285c6bfaedbc81a05e9ff6cbd4d&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.lineplot(data=fmri,
             x='signal',
             y='timepoint',

             sort=True,
             orient="y",
             estimator=None,

             ax=ax
             )
"""
<Axes: xlabel='signal', ylabel='timepoint'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/fc560a9c-da6b-48a6-afea-d9a41eee245d/image.png?time=1747467000&token=2c1668bf8769118ec564a5920d1a312408000ab0c1f4ff6e66911d0558e00f18&role=sharePaid)

## hue

19. **hue**：变量分组，将产生不同颜色的线条。可以是**分类变量**或**数值变量**，但后者颜色映射将有所不同。

20. **palette**：选择用于映射 `hue` 语义的颜色的方法。字符串值传递给 `color_palette()` 。**列表或字典值表示分类变量映射**，而**Colormap对象表示数值变量映射**。

21. **hue_order**：指定处理和绘图时对 `hue` 语义的**分类变量水平的顺序**。

22. **hue_norm**：设置数据单位中归一化范围的(vmin, vmax)元组，或者是一个将数据单位映射到 [0, 1] 区间的Normalize对象。**用于数值变量映射**。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.lineplot(data=fmri,
             x='timepoint',
             y='signal',

             hue='region',
             palette={"parietal": "r", "frontal": "g"},
             hue_order=["frontal", "parietal"],

             sort=True,
             orient="x",
             estimator=None,

             ax=ax
             )
"""
<Axes: xlabel='timepoint', ylabel='signal'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/02693172-acba-4bda-ae6d-a61f13659273/image.png?time=1747467000&token=c639df1dc4e65b057210fbd22f9f236465f304af008682d2660d88cfbbe6d390&role=sharePaid)

## size

23. **size**：变量分组，将产生不同宽度的线条。可以是**分类变量**或**数值变量**，但后者大小映射将有所不同。

24. **sizes**：当使用 `size` 时用于决定如何选择线宽的对象。列表或字典参数应提供每个唯一数据值的线宽，这强制进行分类解释。该参数也可以是一个最小值、最大值元组。

25. **size_order**：指定 `size` **分类变量水平的顺序**，否则它们将从数据中确定。当 `size` 变量为数值变量时，不相关。

26. **size_norm**：设置数据单位中归一化范围的(vmin, vmax)元组，或者是一个将数据单位映射到 [0, 1] 区间的Normalize对象。**用于数值变量映射**。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.lineplot(data=fmri,
             x='timepoint',
             y='signal',

             hue='region',
             palette={"parietal": "r", "frontal": "g"},
             hue_order=["frontal", "parietal"],

             size="region",
             sizes={"parietal": 2, "frontal": 5},
             # size_order=["frontal", "parietal"],

             sort=True,
             orient="x",
             estimator=None,

             ax=ax
             )
"""
<Axes: xlabel='timepoint', ylabel='signal'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/45b4d799-240c-43dc-8609-df8b3e9929fa/image.png?time=1747467000&token=6cad884b4cecfd88ecedaca5f846ef0dc55e98f6a1312630d0a1a6f04fe14b12&role=sharePaid)

## style

27. **style**：变量分组，将产生具有不同虚线和/或标记的线条。**可以是数值变量，但始终被视为分类变量**。

28. **dashes**：确定如何绘制`style` 变量不同分类水平的线条的对象。设置为 `True` 将使用默认的dash代码，或者可以传递一个dash代码列表或一个将 `style` 变量的分类映射到dash代码的字典。设置为 `False` 将为所有子集使用实线。dash代码的指定方式与 matplotlib相同：一个(segment, gap)长度元组，或一个空字符串以绘制实线。

29. **markers**：确定如何绘制 `style` 变量不同分类水平的标记的对象。设置为 `True` 将使用默认标记，或者可以传递一个标记列表或一个将 `style` 变量的分类映射到标记的字典。设置为 `False` 将绘制无标记的线条。标记的指定方式与 matplotlib 相同。

30. **style_order**：指定 `style` **分类变量水平的顺序**，否则它们将从数据中确定。当 `style` 变量为数值时，不相关。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.lineplot(data=fmri,
             x='timepoint',
             y='signal',

             hue='region',
             palette={"parietal": "r", "frontal": "g"},
             hue_order=["frontal", "parietal"],

             size="region",
             sizes={"parietal": 2, "frontal": 5},
             # size_order=["frontal", "parietal"],

             style="region",
             dashes={"parietal": (1, 0), "frontal": (1, 1)},
             markers={"parietal": "*", "frontal": "^"},
             # style_order=["frontal", "parietal"],
             markersize=10,

             sort=True,
             orient="x",
             estimator=None,

             ax=ax
             )
"""
<Axes: xlabel='timepoint', ylabel='signal'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/b3dd7616-026c-4f74-b3b8-13108381d25d/image.png?time=1747467000&token=0fd5a2aa8ca0d5023993331e662ef0f0175ead8dc1d2ddcb928e301c95439968&role=sharePaid)

## units

识别采样单位的变量分组。当使用时，将为每个单位绘制一条单独的线，并具有适当的语义，但不会添加图例条目。当不需要精确身份时，用于显示实验重复样本的分布。此时**estimator必须为None**。类似以上进行取子集绘制，但并不添加图例，仅绘制，这可以避免图例的杂乱。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.lineplot(data=fmri,
             x='timepoint',
             y='signal',

             hue='region',
             palette={"parietal": "r", "frontal": "g"},
             hue_order=["frontal", "parietal"],

             size="region",
             sizes={"parietal": 2, "frontal": 5},
             # size_order=["frontal", "parietal"],

             style="region",
             dashes={"parietal": (1, 0), "frontal": (1, 1)},
             markers={"parietal": "*", "frontal": "^"},
             # style_order=["frontal", "parietal"],
             markersize=10,

             units="subject",

             sort=True,
             orient="x",
             estimator=None,

             ax=ax
             )
"""
<Axes: xlabel='timepoint', ylabel='signal'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/f20f2124-1301-4eec-99f3-57d821bf9465/image.png?time=1747467000&token=2358b7f496b398b8561accee343423ee252cd143f83995b467f9ec485fe9b5d8&role=sharePaid)

## 参数估计

[一个例子搞懂Bootstrap方法](https://mp.weixin.qq.com/s/J0ZG6HkiTDNW030HC2yM_w)


31. **estimator**：用于对相同的 `x`或`y` 变量**（由orient参数指定）**水平上的多个观测值进行聚合的方法，并且只绘制聚合结果。可以是pandas的聚合方法名称或一个可调用的函数名。如果`None`，则将绘制所有观测值。

32. **errorbar**：误差棒方法名称（可以是**"ci"**、**"pi"**、**"se"**或**"sd"**），或一个包含方法名称和水平参数的元组，或一个将向量映射到(min, max)区间的函数，或 None 以隐藏误差棒。

33. **weights**：用于计算加权估计的数据值或列。请注意，目前使用weights时统计量的选择限制为**estimator='mean'**和**errorbar='ci'**。

34. **n_boot**：用于计算置信区间的bootstraps数量。

35. **seed**：种子或随机数生成器，用于可重复的bootstrapping。

36. **err_style**：是以半透明误差带(**"band"**)还是离散误差棒(**"bars"**)的形式绘制置信区间。

37. **err_kws**：控制误差棒美学的附加参数。参数传递给 `matplotlib.axes.Axes.fill_between()` 或 `matplotlib.axes.Axes.errorbar()` ，具体取决于`err_style`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.lineplot(data=fmri,
             x='timepoint',
             y='signal',

             hue='region',
             palette={"parietal": "r", "frontal": "g"},
             hue_order=["frontal", "parietal"],

             size="region",
             sizes={"parietal": 2, "frontal": 5},
             # size_order=["frontal", "parietal"],

             style="region",
             dashes={"parietal": (1, 0), "frontal": (1, 1)},
             markers={"parietal": "*", "frontal": "^"},
             # style_order=["frontal", "parietal"],
             markersize=10,

             sort=True,
             orient="x",
             estimator="mean",
             errorbar=('ci', 95),
             weights=None,
             n_boot=1000,
             seed=0,
             err_style='band',

             ax=ax
             )
"""
<Axes: xlabel='timepoint', ylabel='signal'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/279c0d29-f503-45ea-bb10-0c77f07867c7/image.png?time=1747467000&token=1707df7c2b6c9b164b6e03dc472950f540003b8f7ee83500dbb221061866ed17&role=sharePaid)

[https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.stairs.html](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.stairs.html)

