[iris.csv](https://flowus.cn/preview/6e7baf56-3b6b-443b-a29d-b2f53959663b)

![image.png](https://tc-cdn.flowus.cn/oss/fde6d3b8-acdf-45ba-b459-f8e88211b537/image.png?time=1747467000&token=d2b570c0a605d8d8ae3d9ce6cd8aea731e4722d3166929539a2f523526cba817&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

iris = pd.read_csv('../Data/iris.csv')
```


# Matplotlib：scatter

[matplotlib.pyplot.scatter — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.scatter.html)


[matplotlib.axes.Axes.scatter — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.scatter.html)


`scatter(x, y, s=None, c=None, *, marker=None, cmap=None, norm=None, vmin=None, vmax=None, alpha=None, linewidths=None, edgecolors=None, colorizer=None, plotnonfinite=False, data=None, **kwargs)`

绘制y 与 x 的散点图，具有变化的散点大小和/或颜色（仅可绘制一组数据，多组数据仅可通过多次调用实现）。x, y, s, c, color, facecolor, facecolors, edgecolors, linewidths参数可由data标签指定。该函数继承自`PathCollection`类。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.scatter("sepal_length",
           "sepal_width",
           data=iris,

           marker="o",
           s=150,
           c="red",
           # color="red",
           # facecolor="red",    # facecolor/facecolors/fc

           linestyle="-",        # linestyle/dashes/linestyles/ls
           linewidth=2,          # linewidth/linewidths/lw
           edgecolor="g",        # edgecolor/ec/edgecolors
           alpha=0.6
           )
"""
<matplotlib.collections.PathCollection at 0x203c1992060>
"""

ax.set_xlabel("sepal_length")
ax.set_ylabel("sepal_width")

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/6331e9c3-782f-4c1b-b777-e94934f18e72/image.png?time=1747467900&token=e4dc1e9a600c5234a3fed34244d9f9e1d58c41dab02c0dd39d34830e9ac44b89&role=sharePaid)

## 散点大小

**`s`**为每个散点设置大小（以$点^{2}$为单位，1 点等于 1/72 英寸），可以是单一数值或与x和y相同长度（n）的数值数组。若为一个单一数值，则为每个散点设置相同大小。默认值为 `rcParams['lines.markersize'] ** 2` 。散点大小与边缘线宽和线色在视觉上交互，如果散点大小＜边缘线宽，则可能产生伪影。如果边缘线宽**＞**0 且线色不为'none'，则散点的有效大小将增加边缘线宽的一半，因为边缘线将居中于散点边缘。

将散点的大小与数据中的第三个变量关联的散点图称为**气泡图**。例如：x和y表示变量关系，点的大小表示权重或频率。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.scatter("sepal_length",
           "sepal_width",
           data=iris,

           marker="o",
           s=iris["petal_length"] * 100,
           c="red",
           # color="red",
           # facecolor="red",    # facecolor/facecolors/fc

           linestyle="-",        # linestyle/dashes/linestyles/ls
           linewidth=2,          # linewidth/linewidths/lw
           edgecolor="g",        # edgecolor/ec/edgecolors
           alpha=0.6
           )
"""
<matplotlib.collections.PathCollection at 0x203e35ee7b0>
"""

ax.set_xlabel("sepal_length")
ax.set_ylabel("sepal_width")

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c2136faf-c9cb-4f21-9aa3-8b0e86c6c868/image.png?time=1747467900&token=76c59791f09c20e9c8f6b5b890ce2f45dd1e932928b234119df76059984c0c24&role=sharePaid)

## 散点颜色

1. **c**：为每个散点设置颜色。默认为 `None` ，此时散点颜色由 color、facecolor 或 facecolors 决定。如果这些均未指定或均为 `None` ，则由 `Axes`当前颜色循环(`rcParams["axes.prop_cycle"]`)的下一个颜色决定。

  1. **含 n 个数值的序列**，用于通过 cmap 和 norm 映射来为每个散点设置颜色。

  2. **单个颜色格式字符串**、**长度为 n 的颜色序列**，或者**n行RGB(A)二维数组**，直接为每个散点设置颜色。注意，不应为单个 RGB(A) 序列，因为这无法与要进行颜色映射的数值序列区分开来。如果想为所有点指定相同的 RGB 或 RGBA 值，应使用单行二维数组。否则，在序列长度与 x 和 y 匹配的情况下，数值映射将具有优先级。如果想为所有点指定单个颜色，优先使用color关键字参数。

2. **cmap**：将数据映射到颜色的 **Colormap 对象**或**已注册的 Colormap 名称**。默认`rcParams["image.cmap"]='viridis'`。如果 c 是 RGB(A)，则忽略此参数。

3. **norm**：用于在将数据通过cmap映射到颜色之前将其缩放到[0, 1]范围的归一化方法。默认为线性缩放。如果 c 是 RGB(A)，则忽略此参数。

  1. **Normalize 对象**

  2. **缩放名称**，例如"linear", "log", "symlog", "logit"等。此时，将动态生成并实例化一个合适的 `Normalize` 对象。

4. **vmin, vmax**：当c提供了数据且没有显式指定norm时，vmin 和 vmax 定义了colormap覆盖的数据范围。默认情况下，colormap覆盖提供数据的完整范围。如果norm为Normalize 对象，使用 vmin/vmax 参数是错误的（但norm字符串名称可以与 vmin/vmax 一起使用）。如果 c 是 RGB(A)，则忽略此参数。

5. **colorizer**：用于将颜色映射到数据的 Colorizer 对象。如果为 None，则从norm和 cmap 创建 Colorizer 对象。如果 c 是 RGB(A)，则忽略此参数。

6. **color**：颜色或 RGBA 元组列表

7. **facecolor/facecolors/fc**：颜色或颜色列表

8. **plotnonfinite**：是否绘制具有非有限 c（即 `inf` 、 `-inf` 或 `nan` ）的点。如果 `True` ，则使用Colormap对象的bad颜色绘制这些点。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

cmap = plt.cm.viridis
norm = mpl.colors.Normalize(vmin=iris["sepal_length"].min(), 
                            vmax=iris["sepal_length"].max())

ax.scatter("sepal_length",
           "sepal_width",
           data=iris,

           marker="o",
           s=150,
           c="sepal_length",
           # color="red",
           # facecolor="red",    # facecolor/facecolors/fc
           cmap=cmap,
           norm=norm,

           linestyle="-",        # linestyle/dashes/linestyles/ls
           linewidth=2,          # linewidth/linewidths/lw
           edgecolor="g",        # edgecolor/ec/edgecolors
           alpha=0.6
           )
"""
<matplotlib.collections.PathCollection at 0x203e3519bb0>
"""

fig.colorbar(mpl.cm.ScalarMappable(norm=norm, cmap=cmap), 
             label="sepal_length",
             ax=ax)
ax.set_xlabel("sepal_length")
ax.set_ylabel("sepal_width")

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/444fa59f-501b-4d00-976d-bc3255f0237e/image.png?time=1747467900&token=25b894f2a4e6e429d69cbd306d65f8b5f92644c528f30965be126b18aaa35d37&role=sharePaid)

## 边缘线

移除散点边缘线可以设置linewidth=0或edgecolor='none'

9. **linestyle/dashes/linestyles/ls**：为每个散点设置边缘线型。可以是单一字符串、元组或相应列表

10. **linewidth/linewidths/lw**：为每个散点设置边缘线宽。可以是单一数值或与x和y相同长度（n）的数值数组。

11. **edgecolor/ec/edgecolors**：为每个散点设置边缘线色。对于非填充标记，忽略该参数，其颜色确定方式与 'face' 相同，即从 c、colors 或 facecolors 中获取。

  1. **'face'**：与填充色一致

  2. **'none'**：无边缘线

  3. **单一颜色或颜色序列**

# Seaborn：scatterplot

[seaborn.scatterplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.scatterplot.html)


[Visualizing statistical relationships — seaborn 0.13.2 documentation](https://seaborn.pydata.org/tutorial/relational.html#relating-variables-with-scatter-plots)


`sns.scatterplot(data=None, *, x=None, y=None, hue=None, size=None, style=None, palette=None, hue_order=None, hue_norm=None, sizes=None, size_order=None, size_norm=None, markers=True, style_order=None, legend='auto', ax=None, **kwargs)`

`**kwargs`指定的其它关键字参数传递给`matplotlib.axes.Axes.scatter()`

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.scatterplot(data=iris,
                x='sepal_length',
                y='sepal_width',

                hue='species',
                palette={"setosa": "r", "versicolor": "g", "virginica": "b"},
                hue_order=["versicolor", "setosa", "virginica"],

                size="species",
                sizes={"setosa": 50, "versicolor": 100, "virginica": 200},
                # size_order=["versicolor", "setosa", "virginica"],

                style="species",
                markers={"setosa": "*", "versicolor": "<", "virginica": "^"},
                # style_order=["versicolor", "setosa", "virginica"],

                ax=ax
                )
"""
<Axes: xlabel='sepal_length', ylabel='sepal_width'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/4eb6da29-3ffa-4d30-8cdf-fc14a2174f6b/image.png?time=1747467900&token=a028b8b54e89ec7c11854f90345efdcf961de88a85453ce45425df4b25a1e953&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

cmap=plt.cm.viridis
norm=mpl.colors.Normalize(vmin=iris["sepal_length"].min(), 
                          vmax=iris["sepal_length"].max())

sns.scatterplot(data=iris,
                x='sepal_length',
                y='sepal_width',

                hue='sepal_length',
                palette=cmap,
                hue_norm=norm,

                size="species",
                sizes={"setosa": 50, "versicolor": 100, "virginica": 200},
                # size_order=["versicolor", "setosa", "virginica"],

                style=None,
                markers="o",

                ax=ax
                )
"""
<Axes: xlabel='sepal_length', ylabel='sepal_width'>
"""

fig.colorbar(mpl.cm.ScalarMappable(norm=norm, cmap=cmap), 
             label="sepal_length",
             ax=ax)

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/5c0edc77-6d10-4c04-9038-3ccb8cff80f9/image.png?time=1747467900&token=7d593d20553e08869f6d1f505837511fdb523ca1477b662a9513fed5db0c57ad&role=sharePaid)

