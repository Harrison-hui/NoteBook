[penguins.csv](https://flowus.cn/preview/a0e91306-f284-48a4-9e27-6e5b89c8f174)

![image.png](https://tc-cdn.flowus.cn/oss/11b4a047-a2bd-450f-8566-609a4ecc8083/image.png?time=1747467900&token=f7412d60751f92b752f04064a8e0dd6115c7a533454610bdb0a1f873d883dd4d&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

penguins = pd.read_csv('../Data/penguins.csv')
```


# Matplotlib：bar/barh

[matplotlib.axes.Axes.bar — Matplotlib 3.7.0 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.bar.html)


[matplotlib.axes.Axes.bar — Matplotlib 3.7.0 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.bar.html)


[matplotlib.axes.Axes.barh — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.barh.html)


[matplotlib.pyplot.barh — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.barh.html)


`bar(x, height, width=0.8, bottom=0, *, align='center', data=None, **kwargs)`

`barh(y, width, height=0.8, left=0, *, align='center', data=None, **kwargs)`

该函数继承自`Rectangle`类，`**kwargs`是一个可用`Rectangle`属性的列表，锚点参数`xy`是每个柱的左下角坐标，且旋转锚点设置也只能是`'xy'`（默认）。

绘制垂直/水平条形/柱状图。柱的位置由 `x`/`y` 和给定的`align`确定，尺寸由`height`和`width`给出。垂直/水平基线是 `bottom`/`left`（默认为 0）。**许多参数可以接受单个值，应用于所有柱，或者接受一个序列值，每个柱一个值。**

## 基础绘制

条形/柱状图常用于分类数据，例如条形底部/左侧的字符串标签。可以直接将字符串列表提供给 `x`/`y` 。 `bar(['A', 'B', 'C'], [1, 2, 3])`/`barh(['A', 'B', 'C'], [1, 2, 3])` 通常比 `bar(range(3), [1, 2, 3], tick_label=['A', 'B', 'C'])`/`barh(range(3), [1, 2, 3], tick_label=['A', 'B', 'C'])`简短且方便。只要名称唯一，它们是等效的。显式的 `tick_label` 标记会按照给定的顺序绘制名称。然而，**当分类 `x`/`y` 数据中有重复值时，这些值映射到相同的数值 `x`/`y`  坐标**，因此相应的条形会重叠绘制。

1. `height`表示（每个）柱的**高度**。注意，如果`bottom`/`y`有单位（例如日期时间），则`height`应以`bottom`/`y`值的差值为单位（例如时间差）。

2. `width`表示（每个）柱的**宽度**。注意，如果 `x`/`left`有单位（例如日期时间），则`width`应以`x`/`left`值的差值为单位（例如时间差）。

3. `bottom`/`left`表示（每个）柱的**底边y坐标/左侧边x坐标**。注意，如果`bottom`/`left`有单位，则 y / x轴将获得适合这些单位的定位器和格式化器（例如日期或分类）。

4. `align`表示（每个）柱**与`x`**/`y`**坐标的对齐方式。**`'center'`将基线居中对齐到 `x`/`y`位置。`'edge'`将柱的左侧边缘与 `x`/`y`位置对齐。要将柱对齐到右侧边缘，应传入一个负`width`/`height`并使用 `align='edge'` 。

如果设置`log`参数为True，则对y轴进行对数缩放。`data`参数同前。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.bar(x=[0, 1, 2],
       align='center',
       bottom=[1, 2, 3],
       height=[1, 2, 3],
       width=[0.2, 0.4, 0.8]
       )
"""
<BarContainer object of 3 artists>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/90250b76-3e06-4514-a235-43ead85ceab8/image.png?time=1747467900&token=a057b44f6f2d8cb7d74f11621d3e3716881221b428dd42933d55067e728dde0b&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.bar(x=[0, 1, 2],
       align='center',
       bottom=[1, 2, 3],
       height=[1, 2, 3],
       width=[0.2, 0.4, 0.8],
       tick_label=["A", "B", "C"]
       )
# ax.bar(x=["A", "B", "C"],
#        align='center',
#        bottom=[1, 2, 3],
#        height=[1, 2, 3],
#        width=[0.2, 0.4, 0.8]
#        )
"""
<BarContainer object of 3 artists>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/d24261b3-09d9-456f-8717-0476cf401d53/image.png?time=1747467900&token=6aa5494254750e8a6db5999a6a8e7f76fb5255ce293b86f2ed3bdbf780deeefc&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.barh(y=[0, 1, 2],
        align='center',
        left=[1, 2, 3],
        width=[1, 2, 3],
        height=[0.2, 0.4, 0.8]
        )
"""
<BarContainer object of 3 artists>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/5898227c-416a-42d1-aceb-5752e62e35a1/image.png?time=1747467900&token=e9be14b972c7630e7eefcf430301a76fdf96c905e23d5f8a597223d5522a8a94&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.barh(y=[0, 1, 2],
        align='center',
        left=[1, 2, 3],
        width=[1, 2, 3],
        height=[0.2, 0.4, 0.8],
        tick_label=["A", "B", "C"]
        )
# ax.barh(y=["A", "B", "C"],
#         align='center',
#         left=[1, 2, 3],
#         width=[1, 2, 3],
#         height=[0.2, 0.4, 0.8]
#         )
"""
<BarContainer object of 3 artists>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/86dc674e-d411-4b37-b8c8-26c1d6c233f7/image.png?time=1747467900&token=377d25256f0fcd66990072c4e7a0af9b786835201e757ae8b932a8a31046c2d5&role=sharePaid)

## 柱外观

参考`Rectangle`类参数。

5. **angle**：绕锚点旋转角度。

6. **fill**：是否填充。

7. **facecolor/color**：（每个）柱的填充色。如果两者都给出，则 facecolor 优先。

8. **linestyle**：边缘线型。

9. **linewidth**：（每个）柱的边缘线宽度。如果为 0，则不绘制边缘。

10. **hatch**：（每个）柱的框内线型。

11. **hatch_linewidth**：框内线宽。

12. **edgecolor**：（每个）柱的边缘色。

13. **alpha**：透明度。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.bar(x=["A", "B", "C"],
       align='center',
       bottom=[1, 2, 3],
       height=[1, 2, 3],
       width=[0.2, 0.4, 0.8],

       # Rectangle参数
       angle=45,
       fill=True,
       facecolor=['r', 'g', 'b'],
       linestyle='--',
       linewidth=[2, 6, 10],
       hatch=['/', '-', '+'],
       hatch_linewidth=2,
       edgecolor=['c', 'k', 'm'],
       alpha=0.5
       )
"""
<BarContainer object of 3 artists>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/5186a5f0-957d-402e-938b-94a11e4769b7/image.png?time=1747467900&token=d02cbe04d69b864b869f9b99c9a01964b71ccfb3b8e9875d5364bea18a1e8158&role=sharePaid)

## 图例标签

单个标签附加到结果 `BarContainer` 上，作为整个数据集的标签。如果提供标签列表，则必须与 `x` 的长度相同，即为每个柱添加标签。重复的标签不会去重，会导致重复的标签条目，因此最好在每个柱具有不同样式（例如，通过传递颜色列表）时使用。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.bar(x=["A", "B", "C"],
       align='center',
       bottom=0,
       height=[1, 2, 3],
       width=0.2,

       label="bar"
       )
"""
<BarContainer object of 3 artists>
"""
ax.legend()

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/d6e6a502-3cc7-41a4-bd7b-0b65c75db8bc/image.png?time=1747467900&token=065a1220cbe5b6bfcbcb39a689e50b3bea50e7fb57c123ccabbc4a4f4d41add7&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

width = 0.2
inner = width + 0.08

ax.bar(x=[i + n * inner for i in range(3) for n in range(3)],
       align='center',
       bottom=0,
       height=range(1, 10),
       width=width,
       tick_label=["", "A", "", "", "B", "", "", "C", ""],
       
       facecolor=['r', 'g', 'b'] * 3,
       label=['r', 'g', 'b', '_r', '_g', '_b', '_r', '_g', '_b']
       )
"""
<BarContainer object of 3 artists>
"""
ax.legend()

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/04a4ed96-71f7-455c-adaf-ff5e65cc7e2c/image.png?time=1747467900&token=b817dd9b5564a9969d6c0b9d5a78547c4018d29d7901cd37b0ab6d1c56e30593&role=sharePaid)

## 误差线

**error_kw：**传递给`errorbar`函数的关键字参数字典。在此处定义的 ecolor 或 capsize 值优先于独立的关键字参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.bar(x=["A", "B", "C"],
       align='center',
       bottom=0,
       height=[1, 2, 3],
       width=0.2,

       xerr=[0.1, 0.2, 0.3],
       yerr=[0.2, 0.3, 0.4],
       error_kw={'ecolor': 'r',
                 'elinewidth': 2,
                 'capsize': 10,
                 'capthick': 2}
       )
"""
<BarContainer object of 3 artists>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/e5bc9871-0ac3-42af-9a52-fa6720b8268e/image.png?time=1747467900&token=3853f83d3ea00232899906dd15354e771832ed9de87564112a355e7c65d26fdb&role=sharePaid)

## 柱标签（bar_label）

[matplotlib.axes.Axes.bar_label — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.bar_label.html)


[matplotlib.pyplot.bar_label — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.bar_label.html)


[Bar chart with labels — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/gallery/lines_bars_and_markers/bar_label_demo.html)


`bar_label(container, labels=None, *, fmt='%g', label_type='edge', padding=0, **kwargs)`

为给定`BarContainer`的每个柱添加标签。`**kwargs`任何剩余的关键字参数都将传递给 `Axes.annotate` 。由于标签会自动对齐到条形，因此不支持对齐参数的设置。

14. **container：**包含所有条形图和可选误差线的容器，通常由 `bar` 或 `barh` 返回。可以通过`ax.containers`来查看Axes中拥有的`BarContainer`列表。

15. **labels：**要显示的标签文本列表。如果未提供，则标签文本为使用 `fmt`格式化的数据值。

16. **label_type：**`'edge'`，标签放置在柱段的端点处，默认显示的值将是该端点的位置；`'center'`，标签放置在柱段的中心，默认显示的值将是该段的长度（适用于堆叠条形图）。

17. **fmt：**用于标签的%或{}格式化字符串，或一个带有值作为第一个参数的函数。当 fmt 是字符串且可以同时解释这两种格式时，%优先于{}。

18. **padding：**标签与柱末端或中心的距离（以点为单位）。

```Python
ax.containers
"""
[<BarContainer object of 3 artists>, <BarContainer object of 3 artists>]
"""
```


```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.bar(x=["A", "B", "C"],
       align='center',
       bottom=0,
       height=[1, 2, 3],
       width=0.2
       )
"""
<BarContainer object of 3 artists>
"""
ax.bar(x=["A", "B", "C"],
       align='center',
       bottom=[1, 2, 3],
       height=[3, 2, 1],
       width=0.2
       )
"""
<BarContainer object of 3 artists>
"""

ax.bar_label(ax.containers[0],
             labels=['I', 'II', 'III'],
             label_type='center',
             fmt=None,
             padding=0,

             # Annotate参数
             fontsize=20,
             color='r',
             )
ax.bar_label(ax.containers[1],
             labels=None,
             label_type='edge',
             fmt='{:.2f}',
             padding=0,

             # Annotate参数
             fontsize=20,
             color='g',
             )

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/82e47ae6-648d-4037-827a-f7febb73236e/image.png?time=1747467900&token=e231f9515ab972b9f91964743e7b722ae66798920623a0a7a43b07354f62577a&role=sharePaid)

## 极坐标柱状图（玫瑰图）

极坐标柱状图是一种特殊形式的柱状图，又称南丁格尔玫瑰图(Nightingale Rose Chart)，它以南丁格尔(Florence Nightingale)命名，她在1858年首次使用这种图表来展示战争期间士兵死亡原因的数据。它将数据绘制在极坐标系中，而不是传统的笛卡尔坐标系中。图中的柱形通过角度（对应极坐标的角度变量θ）分布在圆周上，高度表示某一变量的数值。它适合展示周期性、环状或者分类数据。

# Seaborn：barplot

[seaborn.barplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.barplot.html)


`sns.barplot(data=None, *, x=None, y=None, hue=None, order=None, hue_order=None, estimator='mean', errorbar=('ci', 95), n_boot=1000, seed=None, units=None, weights=None, orient=None, color=None, palette=None, saturation=0.75, fill=True, hue_norm=None, width=0.8, dodge='auto', gap=0, log_scale=None, native_scale=False, formatter=None, legend='auto', capsize=0, err_kws=None, ax=None, **kwargs)`

以矩形条形图显示点估计和误差。条形图表示数值变量的汇总或统计估计，每个矩形的高度表示估计值，并使用误差线表示该估计值的不确定性。条形图包括轴范围中的 0，当 0 是该变量有意义的取值时，这是一个很好的选择。

默认情况下，此函数将其中一个变量视为分类变量，并在相关轴上以序数位置（0，1，… n）绘制数据，可以通过设置 `native_scale=True` 来禁用此功能。

`**kwargs`其他参数传递给`matplotlib.patches.Rectangle` ，同上。

19. **orient：**'v' / 'x' 或 'h' / 'y'

20. **width：**分配给 orient 轴上每个元素的宽度。当 `native_scale=True` 时，它与原始尺度中两个值之间的最小距离相对。

21. **dodge：**当使用色调映射时，元素是否应该沿 orient 轴变窄并移动以消除重叠。如果 `"auto"` ，当 orient轴变量与分类变量交叉时设置为 `True` ，否则设置为 `False` 。

22. **gap**：通过此因子在 orient 轴上缩小，以在 dodged 元素之间添加间隙。

23. **log_scale：**设置坐标轴缩放为对数缩放。单个值（bool值或数值）设置图中的所有数值轴。一对值（bool值或数值）独立设置每个轴。数值被解释为所需的底数（默认为 10）。当为 `None` 或 `False` 时，seaborn 将使用现有的 Axes缩放。

24. **native_scale：**当为 True 时，分类轴上的数值或日期时间值将保持其原始刻度，而不是转换为固定索引。

25. **formatter：**将分类数据转换为字符串的函数。影响分组和刻度标签。

26. **capsize：**误差线'帽'的宽度，相对于条形间距。

27. **err_kws：**用于误差线绘制的 `matplotlib.lines.Line2D` 参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

data = pd.Series([1, 2, 3], index=["A", "B", "C"])
"""
A    1
B    2
C    3
dtype: int64
"""

sns.barplot(data=data,
            width=0.2,
            ax=ax
            )
"""
<Axes: >
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/44bc8f62-7915-41e4-aedb-8a4be5374bba/image.png?time=1747467900&token=be7f32f7d2fcea2ae9f11068bdcf6166e034b28b3069ee27446a7cae8631649e&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

data = pd.DataFrame({"A": np.linspace(1, 100, 50),
                     "B": np.linspace(1, 50, 50),
                     "C": np.linspace(1, 200, 50)})
"""
             A     B           C
0     1.000000   1.0    1.000000
1     3.020408   2.0    5.061224
2     5.040816   3.0    9.122449
3     7.061224   4.0   13.183673
4     9.081633   5.0   17.244898
...
45   91.918367  46.0  183.755102
46   93.938776  47.0  187.816327
47   95.959184  48.0  191.877551
48   97.979592  49.0  195.938776
49  100.000000  50.0  200.000000
"""

sns.barplot(data=data,
            width=0.2,
            ax=ax
            )
"""
<Axes: >
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/7b344a11-941a-421f-ae0a-a0084be8cde5/image.png?time=1747467900&token=ef6c3eacb3ae9087214af8f5ff198d60f86fe8232d9731de319e1a028d26b1a0&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.barplot(data=penguins,
            x="species",
            y="body_mass_g",
            orient="x",
            order=['Gentoo', 'Chinstrap', 'Adelie'],
            formatter=lambda x: x+" penguins",

            hue='sex',
            hue_order=['FEMALE', 'MALE'],
            fill=True,
            palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},
            saturation=0.75,

            estimator='mean',
            errorbar=('ci', 95),
            capsize=0.2,
            err_kws={"linestyle": "--",
                     "linewidth": 2,
                     "color": "r"},
            n_boot=1000,
            seed=0,
            units=None,
            weights=None,

            width=0.5,
            dodge='auto',
            gap=0.3,

            log_scale=False,
            native_scale=True,
            
            ax=ax
            )
"""
<Axes: xlabel='species', ylabel='body_mass_g'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/848af10b-e0ae-4677-a529-621106599e4a/image.png?time=1747467900&token=54abde39ed4a09d35fc3ba9e6ca5899a82e32e2aa2bf8d0800d76dc33d4030b9&role=sharePaid)

# Seaborn：countplot

[seaborn.countplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.countplot.html)


`sns.countplot(data=None, *, x=None, y=None, hue=None, order=None, hue_order=None, palette=None, saturation=0.75, fill=True, hue_norm=None, stat='count', width=0.8, dodge='auto', gap=0, log_scale=None, native_scale=False, formatter=None, legend='auto', ax=None, **kwargs)`

使用条形图显示每个分类区间中观测值的数量。对于该函数，`x`和`y`参数不能同时传递，方向根据传递的是`x`还是`y`参数来决定。可以将计数图视为在分类变量上而不是在定量变量上的直方图。其基本 API 和选项与 `barplot()` 相同，因此可以比较嵌套变量之间的计数。

**stat：**统计量计算。当不是 `'count'` 时，柱状图的高度将归一化，使得它们在图中和为 100（`'percent'` ）或 1（`'proportion'`, `'probability'`）。

`kwargs`其他参数传递给`matplotlib.patches.Rectangle` ，同上。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.countplot(data=penguins,
              x="species",
              # y="species",
              order=['Gentoo', 'Chinstrap', 'Adelie'],
              formatter=lambda x: x+" penguins",
              stat="count",

              hue='sex',
              hue_order=['FEMALE', 'MALE'],
              fill=True,
              palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},
              saturation=0.75,

              width=0.5,
              dodge='auto',
              gap=0.3,

              log_scale=False,
              native_scale=True,

              ax=ax
              )
"""
<Axes: xlabel='species', ylabel='count'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/f750d7f8-96f1-4b37-a0ec-fc203784e1fe/image.png?time=1747467900&token=88f86829ad1131bca6dad1277ffc5c3ab12d64d0690ac796f07b5f680afebd8e&role=sharePaid)

# Seaborn：pointplot

[seaborn.pointplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.pointplot.html)


`sns.pointplot(data=None, *, x=None, y=None, hue=None, order=None, hue_order=None, estimator='mean', errorbar=('ci', 95), n_boot=1000, seed=None, units=None, weights=None, color=None, palette=None, hue_norm=None, markers=<default>, linestyles=<default>, dodge=False, log_scale=None, native_scale=False, orient=None, capsize=0, formatter=None, legend='auto', err_kws=None, ax=None, **kwargs)`

使用线条和标记显示点估计和误差。点图通过点的位置表示数值变量的集中趋势估计，并使用误差线提供对该估计不确定性的指示。点图比条形图更有助于集中比较一个或多个分类变量的不同水平。它们特别擅长展示交互作用：一个分类变量的水平与另一个分类变量的水平之间的关系如何变化。连接来自同一水平 `hue` 的每个点的线条允许通过斜率差异来判断交互作用，这比比较几个点组或条形的高度更容易为眼睛所接受。

28. **markers：**为每个`hue`水平使用的标记。

29. **linestyles：**为每个`hue`水平使用的线型。

30. **dodge：**沿着分类轴为每个级别的 `hue` 变量分离点的数量。设置为`True`将应用默认的小值。

`**kwargs`其他参数传递给`matplotlib.lines.Line2D`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.pointplot(data=penguins,
              x="species",
              y="body_mass_g",
              orient="x",
              order=['Gentoo', 'Chinstrap', 'Adelie'],
              formatter=lambda x: x+" penguins",

              hue='sex',
              hue_order=['FEMALE', 'MALE'],
              palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},

              estimator='mean',
              errorbar=('ci', 95),
              capsize=0.2,
              err_kws={"linestyle": "--",
                       "linewidth": 2,
                       "color": "r"},
              n_boot=1000,
              seed=0,
              units=None,
              weights=None,

              dodge=False,
              markers=['o', '*'],
              markersize=15,
              linestyles=['--', '-'],
              linewidth=2,

              log_scale=False,
              native_scale=True,

              ax=ax
              )
"""
<Axes: xlabel='species', ylabel='body_mass_g'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/125303f9-e7ff-4443-bb74-1c036b25da1e/image.png?time=1747467900&token=b7844424cce8c794fedc93d602235270973fb081e51e6e7b9bf88ad72feca782&role=sharePaid)

