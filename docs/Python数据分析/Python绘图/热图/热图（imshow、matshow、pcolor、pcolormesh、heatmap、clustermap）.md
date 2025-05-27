Heatmap(热图)是一种通过颜色编码二维数据的可视化图形，通常用于表示矩阵或表格中的数值关系。它使用不同的颜色来表示不同的数值大小，颜色的变化能够直观地显示数据的分布和模式。热图的每个单元格代表数据中的一个值，颜色强度与数据值的大小相关联。它能够帮助研究人员、分析师等从繁杂的数值中提取有价值的信息。

普通热图严格来说不属于热图，而是颜色图(Color Image)。其生成过程不涉及数据转换计算，而是将数据简单映射到一个网格矩阵中，然后根据预先指定的颜色序列为网格矩阵中的数据赋予不同的颜色，从而利用颜色深浅来表示数据的大小。这种普通热图借助于人眼对颜色的敏感度，可以快速发现统计特征（如颜色深浅与数据大小的关系），相比直接观察数据，具有显著优势。

[flights.csv](https://flowus.cn/preview/7a9b5489-73e3-4cf8-b133-2ae821d85cbc)

[penguins.csv](https://flowus.cn/preview/e4e34867-1d71-4dce-9862-638c4e892497)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

flights = pd.read_csv('../Data/flights.csv').pivot(index="year", columns="month", values="passengers")
"""
month  April  August  December  February  ...  May  November  October  September
year                                      ...                                   
1949     129     148       118       118  ...  121       104      119        136
1950     135     170       140       126  ...  125       114      133        158
1951     163     199       166       150  ...  172       146      162        184
1952     181     242       194       180  ...  183       172      191        209
1953     235     272       201       196  ...  229       180      211        237
1954     227     293       229       188  ...  234       203      229        259
1955     269     347       278       233  ...  270       237      274        312
1956     313     405       306       277  ...  318       271      306        355
1957     348     467       336       301  ...  355       305      347        404
1958     348     505       337       318  ...  363       310      359        404
1959     396     559       405       342  ...  420       362      407        463
1960     461     606       432       391  ...  472       390      461        508

[12 rows x 12 columns]
"""

flights_min = np.min(flights)
"""
np.int64(104)
"""

flights_max = np.max(flights)
"""
np.int64(622)
"""

flights_norm = mpl.colors.Normalize(vmin=flights_min, vmax=flights_max)

penguins = pd.read_csv('../Data/penguins.csv')
penguins_data = penguins.drop(columns=['species', 'island', 'sex']).fillna(1)
"""
     culmen_length_mm  culmen_depth_mm  flipper_length_mm  body_mass_g
0                39.1             18.7              181.0       3750.0
1                39.5             17.4              186.0       3800.0
2                40.3             18.0              195.0       3250.0
3                 1.0              1.0                1.0          1.0
4                36.7             19.3              193.0       3450.0
..                ...              ...                ...          ...
339               1.0              1.0                1.0          1.0
340              46.8             14.3              215.0       4850.0
341              50.4             15.7              222.0       5750.0
342              45.2             14.8              212.0       5200.0
343              49.9             16.1              213.0       5400.0

[344 rows x 4 columns]
"""

penguins_min = np.min(penguins_data)
"""
np.float64(0.0)
"""

penguins_max = np.max(penguins_data)
"""
np.float64(6300.0)
"""

penguins_norm = mpl.colors.LogNorm(vmin=penguins_min, vmax=penguins_max)

cmap = plt.cm.viridis
```


![image.png](https://tc-cdn.flowus.cn/oss/9fdff3a4-958d-44cf-bc67-f5782c4fd8da/image.png?time=1747468800&token=6f1e3c2ddbac9fc3e955e50efd7f93276fa18d168040b5e7e34cfab26558ae4c&role=sharePaid)

![image.png](https://tc-cdn.flowus.cn/oss/8694b426-1028-401e-a1a8-3cdef462815f/image.png?time=1747468800&token=6303c1ffab84c92842cf4d872a6287241b73e760a0c6120c806322f08f597946&role=sharePaid)

# Matplotlib：imshow

[matplotlib.axes.Axes.imshow — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.imshow.html)


[Interpolations for imshow — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/gallery/images_contours_and_fields/interpolation_methods.html)


`imshow(X, cmap=None, norm=None, *, aspect=None, interpolation=None, alpha=None, vmin=None, vmax=None, colorizer=None, origin=None, extent=None, interpolation_stage=None, filternorm=True, filterrad=4.0, resample=None, url=None, data=None, **kwargs)`

以图像形式（即在二维规则栅格上）显示数据。输入可以是实际的RGB(A)数据，也可以是二维标量数据，这些数据将被渲染为伪彩色图像。对于显示灰度图像，请使用参数`cmap='gray', vmin=0, vmax=255`设置颜色映射。

用于渲染图像的像素数量由Axes的大小和Figure的DPI设置。当图像重采样时，这可能导致混叠伪影，因为显示的图像大小通常不会与`X`的大小匹配。

1. **X：**图像数据。支持的数组形状包括：

  1. **(M, N)**：具有标量数据的图像。值通过`norm`和`cmap`映射到颜色。

  2. **(M, N, 3)**：一个具有RGB值（浮点数0-1或整数0-255）的图像。

  3. **(M, N, 4)**：一个具有RGBA值（浮点数0-1或整数0-255）的图像，即包括透明度。

2. **alpha：**透明度混合值，介于 0（透明）和 1（不透明）之间。如果是一个数组则形状必须与 X 相同，透明度混合值将依次应用于每个像素。

3. **aspect：**Axes的纵横比。此参数对于图像尤其相关，因为它决定了数据像素是否为正方形。此参数是显式调用`Axes.set_aspect`的快捷方式。通常为`None`（默认值），表示使用`rcParams["image.aspect"]`（默认值：`'equal'`）。然而，如果图像使用不包含Axes数据变换的变换，则`None`表示完全不修改轴宽高比（在这种情况下，如果需要，可以直接调用`Axes.set_aspect`）。

  1. **'equal'：**确保宽高比为 1。像素将是正方形（除非在数据坐标中使用`extent`显式地将像素大小设置为非正方形）。

  2. **'auto'：**保持Axes固定，并调整宽高比，使数据适合Axes。通常，这将导致非正方形像素。

4. **origin：**将数组的[0, 0]索引放置在Axes的左上角（`'upper'`）或左下角（`'lower'`）。可选约定（默认）`rcParams["image.origin"]='upper'`通常用于矩阵和图像。注意，对于`'lower'`，垂直轴向上，而对于`'upper'`，则向下。

5. **extent：**数据坐标中图像将填充的边界框。这些值可能是单位值，并且与轴的单位相匹配。图像将分别沿 x 轴和 y 轴拉伸以填充框。默认范围由以下条件确定。像素在数据坐标中具有单位大小。它们的中心位于整数坐标上，并且其中心坐标在水平方向上从 0 到 columns-1，在垂直方向上从 0 到 rows-1。请注意，垂直轴的方向以及顶部和底部的默认值取决于原点：

  1. 对于`origin == 'upper'`，默认是`extent=(-0.5, numcols-0.5, numrows-0.5, -0.5)`。

  2. 对于`origin == 'lower'`，默认是`extent=(-0.5, numcols-0.5, -0.5, numrows-0.5)`。

6. **resample：**当为`True`时，使用完整的重采样方法。当为`False`时，只有当输出图像大于输入图像时才进行重采样。默认`rcParams["image.resample"]=True`。

7. **interpolation：**使用的插值方法。支持的值有`'none'`, `'auto'`（默认，`rcParams["image.interpolation"]`）, `'nearest'`, `'bilinear'`, `'bicubic'`, `'spline16'`, `'spline36'`, `'hanning'`, `'hamming'`, `'hermite'`, `'kaiser'`, `'quadric'`, `'catrom'`, `'gaussian'`, `'bessel'`, `'mitchell'`, `'sinc'`, `'lanczos'`, `'blackman'`。使用插值方法将数据 X 重采样到图形画布上图像的像素大小，以对数据进行上采样或下采样。一些插值方法需要一个额外的半径参数，该参数可以通过`filterrad`设置。此外，抗锯齿图像缩放过滤器由参数`filternorm`控制。

  1. 如果设置为`'none'`，则对于 ps、pdf 和 svg 后端，不会发生下采样或上采样，图像数据将作为原生图像传递给后端。请注意，不同的 ps、pdf 和 svg 查看器可能以不同的方式显示这些原始像素。对于其它后端则和`'nearest'`相同。

  2. resam如果设置为默认的`'auto'`，则当图像上采样超过三倍因子时（即显示像素数至少是数据数组大小的三倍），将使用`'nearest'`插值。如果上采样率小于 3，或者图像下采样，则使用`'hanning'`插值作为抗锯齿滤波器，除非图像恰好以两倍或一倍因子上采样。

8. **interpolation_stage：**

  1. **'data'：**在用户提供的数据上执行插值。这在在上采样期间在像素之间进行插值时很有用。

  2. **'rgba'：**在应用颜色映射后，在 RGBA 空间内执行插值。这在下采样和视觉上组合像素时很有用。

  3. **'auto'（默认）：**自动选择合适的插值阶段。在下采样或者在采样率小于3的上采样时使用`'rgba'`，在采样率更高的上采样时使用`'data'`。

9. **filternorm：**这是一个用于抗锯齿图像缩放过滤器的参数。如果设置为`True`（默认），则过滤器将归一化整数值并纠正舍入误差。它不对源浮点值进行任何操作，它仅根据 1.0 的规则纠正整数，这意味着像素权重的总和必须等于 1.0。因此，过滤器函数必须产生正确形状的图形。

10. **filterrad：**过滤器的半径（默认4.0），适用于具有半径参数的过滤器，即当插值方式为：`'sinc'`、`'lanczos'`或`'blackman'`时。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.imshow(flights, cmap=cmap, norm=flights_norm, alpha=1,
          aspect='equal',
          origin='upper'
          )
"""
<matplotlib.image.AxesImage at 0x17451151880>
"""
fig.colorbar(mpl.cm.ScalarMappable(cmap=cmap, norm=flights_norm), shrink=0.79, label='Passengers', ax=ax)
ax.set_xticks(ticks=np.linspace(0, 11, 12), labels=flights.columns, rotation=45)
ax.set_yticks(ticks=np.linspace(0, 11, 12), labels=flights.index, rotation=45)
ax.set_xlabel('Months')
ax.set_ylabel('Years')

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/a2090199-27f0-486c-bddb-e7509996e59d/image.png?time=1747468800&token=e46b812ccab3419101ca14195d06753b0a12323e0f42415386af442d997bf878&role=sharePaid)

# Matplotlib：matshow

[matplotlib.axes.Axes.matshow — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.matshow.html)


`matshow(Z, **kwargs)`

将 2D 矩阵或数组的值绘制为彩色图像。矩阵将按照打印的方式显示，第一行在顶部。行和列的编号从零开始。这是一个封装`imshow`的便利函数，用于设置显示矩阵的有用默认值。特别是：

11. 设置`origin='upper'`。

12. 设置`interpolation='nearest'`。

13. 设置`aspect='equal'`。

14. 刻度线放置在左侧和上方。

15. 刻度线格式化为显示整数索引。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.matshow(flights, cmap=cmap, norm=flights_norm, alpha=1)
"""
<matplotlib.image.AxesImage at 0x17453202cf0>
"""
fig.colorbar(mpl.cm.ScalarMappable(cmap=cmap, norm=flights_norm), shrink=0.77, label='Passengers', ax=ax)
ax.set_xticks(ticks=np.linspace(0, 11, 12), labels=flights.columns, rotation=45)
ax.set_yticks(ticks=np.linspace(0, 11, 12), labels=flights.index, rotation=45)
ax.set_xlabel('Months')
ax.set_ylabel('Years')

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/43eb7aff-96c0-4bc1-9033-739522bbf355/image.png?time=1747468800&token=e9c0cebe1fcdfd7f5da5f0adf3c3d5843aa0134842127942237e70cbf95b3be9&role=sharePaid)

# Matplotlib：pcolor

[matplotlib.axes.Axes.pcolor — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.pcolor.html)


`pcolor(*args, shading=None, alpha=None, norm=None, cmap=None, vmin=None, vmax=None, colorizer=None, data=None, **kwargs)`

创建一个具有非规则矩形网格的伪彩色图。`X`和`Y`可以用来指定四边形的角。`X`、`Y`、`C`参数仅接受位置参数。对于大型数组，`pcolor()`可能非常慢。在大多数情况下应该使用类似但速度快的多的`pcolormesh`。

16. **X, Y：**四边形顶点坐标。如果`X`和/或`Y`是 1-D 数组或列向量，它们将根据需要扩展为适当的 2D 数组，形成一个矩形网格。

  1. 如果`shading='flat'`，`X`和`Y`的维度应比 `C` 大一个，并且四边形因`C[i, j]`的值而着色。如果`X`、`Y`和`C`的维度相等，将引发警告，并忽略`C`的最后一行和最后一列。

  2. 如果`shading='nearest'`，`X`和`Y`的维度应与`C`相同（如果不相同，将引发 ValueError）。颜色`C[i, j]`将位于`(X[i, j], Y[i, j])`的中心。

17. **C：**颜色映射的值。

18. **shading：**四边形的填充样式。可能的值：

  1. **'flat'：**每个四边形使用一种纯色。四边形(i, j)，(i+1, j)，(i, j+1)，(i+1, j+1)的颜色由`C[i, j]`给出。

  2. **'nearest'：**每个网格点将有一个颜色，颜色中心位于点上，延伸到相邻网格中心之间的一半。

  3. **'auto'：**如果`X`和`Y`的维度比`C`大一个，则选择`'flat'`。如果维度相同，则选择`'nearest'`。

19. **edgecolors：**边缘颜色。默认为`'none'`。单数形式`edgecolor`是一个别名。可能的值：

  1. **'none'**或**''：**无边缘。

  2. **None：**`rcParams["patch.edgecolor"]`（默认：`'black'`）将被使用。注意，目前`rcParams["patch.force_edgecolor"]`（默认：`False` ）必须为`True`才能使用。

  3. **'face'：**使用相邻的面颜色。

  4. **颜色或颜色序列**

20. **snap：**是否将网格捕捉到像素边界。

21. **antialiaseds：**默认情况下，如果使用默认的`edgecolors="none"`，则该参数为`False`。这消除了在补丁边界处的伪线，并且无论`alpha`的值如何都有效。否则该参数默认从`rcParams["patch.antialiased"]`（默认：`True`）获取。如果`alpha`为1，则可能更喜欢描边边缘，但会导致伪影。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

x = np.linspace(-0.5, 11.5, 13)
y = np.linspace(11.5, -0.5, 13)
X, Y = np.meshgrid(x, y)

ax.pcolor(X, Y, flights, cmap=cmap, norm=flights_norm, alpha=1,
          shading='flat'
          )
"""
<matplotlib.collections.PolyQuadMesh at 0x1745204c920>
"""
fig.colorbar(mpl.cm.ScalarMappable(cmap=cmap, norm=flights_norm), shrink=1, label='Passengers', ax=ax)
ax.set_xticks(ticks=np.linspace(0, 11, 12), labels=flights.columns, rotation=45)
ax.set_yticks(ticks=np.linspace(11, 0, 12), labels=flights.index, rotation=45)
ax.set_xlabel('Months')
ax.set_ylabel('Years')

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c11cc70e-85d9-43bb-8cdd-ab880901d825/image.png?time=1747468800&token=f70eb19521e8adddab560e05b2c8ad4de08f22d03647f72ad7041e96f3e99385&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

x = np.linspace(0, 11, 12)
y = np.linspace(11, 0, 12)
X, Y = np.meshgrid(x, y)

ax.pcolor(X, Y, flights, cmap=cmap, norm=flights_norm, alpha=1,
          shading='nearest'
          )
"""
<matplotlib.collections.PolyQuadMesh at 0x1745391d0d0>
"""
fig.colorbar(mpl.cm.ScalarMappable(cmap=cmap, norm=flights_norm), shrink=1, label='Passengers', ax=ax)
ax.set_xticks(ticks=np.linspace(0, 11, 12), labels=flights.columns, rotation=45)
ax.set_yticks(ticks=np.linspace(11, 0, 12), labels=flights.index, rotation=45)
ax.set_xlabel('Months')
ax.set_ylabel('Years')

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c11cc70e-85d9-43bb-8cdd-ab880901d825/image.png?time=1747468800&token=f70eb19521e8adddab560e05b2c8ad4de08f22d03647f72ad7041e96f3e99385&role=sharePaid)

# Matplotlib：pcolormesh

[matplotlib.axes.Axes.pcolormesh — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.pcolormesh.html)


`pcolormesh(*args, alpha=None, norm=None, cmap=None, vmin=None, vmax=None, colorizer=None, shading=None, antialiased=False, data=None, **kwargs)`

`pcolormesh` 与 `pcolor` 类似。它速度更快，在大多数情况下都是首选。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

x = np.linspace(0, 11, 12)
y = np.linspace(11, 0, 12)
X, Y = np.meshgrid(x, y)

ax.pcolormesh(X, Y, flights, cmap=cmap, norm=flights_norm, alpha=1,
              shading='nearest'
              )
"""
<matplotlib.collections.QuadMesh at 0x174533f1550>
"""
fig.colorbar(mpl.cm.ScalarMappable(cmap=cmap, norm=flights_norm), shrink=1, label='Passengers', ax=ax)
ax.set_xticks(ticks=np.linspace(0, 11, 12), labels=flights.columns, rotation=45)
ax.set_yticks(ticks=np.linspace(11, 0, 12), labels=flights.index, rotation=45)
ax.set_xlabel('Months')
ax.set_ylabel('Years')

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/7614dd9f-94b5-44d7-82f7-a33fe35732af/image.png?time=1747468800&token=2edb84819f3ebc5bd5804dd085b8508acb945bbf25f2b7e593474afd9ad0c6e0&role=sharePaid)

# Seaborn：heatmap

[seaborn.pydata.org](https://seaborn.pydata.org/generated/seaborn.heatmap.html)


`sns.heatmap(data, *, vmin=None, vmax=None, cmap=None, center=None, robust=False, annot=None, fmt='.2g', annot_kws=None, linewidths=0, linecolor='white', cbar=True, cbar_kws=None, cbar_ax=None, square=False, xticklabels='auto', yticklabels='auto', mask=None, ax=None, **kwargs)`

将矩形数据绘制为颜色编码矩阵。这是一个Axes级别函数，如果`ax`参数未提供，则将绘制热图到当前活动的Axes中。这部分Axes空间将被占用并用于绘制颜色条，除非`cbar`为`False`或`cbar_ax`提供了单独的Axes。

`**kwargs`其他所有关键字参数都传递给`matplotlib.axes.Axes.pcolormesh()`。

22. **robust：**如果为`True`且`vmin`或`vmax`缺失，则使用稳健分位数而不是极端值来计算颜色映射范围。默认为`False`。

23. **square：**如果为`True`，则将 Axes 的纵横比设置为`'equal'`，以便每个单元格都是方形。

24. **annot：**如果为`True`，则在每个单元格中写入数据值。如果是一个与`data`形状相同的数组，则使用它来注释热图，而不是使用数据。请注意，DataFrame 将根据位置而不是索引进行匹配。

25. **fmt：**添加注释时使用的字符串格式代码。默认为`'.2g'`。

26. **annot_kws：**当`annot`为`True`时，传递给`matplotlib.axes.Axes.text()`的关键字参数。

27. **linewidths：**用于分隔每个单元格的线的宽度。默认为0。

28. **linecolor：**分隔每个单元格的线条颜色。默认`'white'`。

29. **cbar：**是否绘制色条。默认为`True`。

30. **cbar_kws：**传递给`matplotlib.figure.Figure.colorbar()`的关键字参数。

31. **cbar_ax：**绘制色条的区域，否则占用主 Axes 的空间。

32. **xticklabels、yticklabels：**如果为`True`，则绘制数据框的列名或行名。如果为列表，则绘制这些替代标签。如果为整数，则使用列名或行名，但仅绘制每n个标签。如果为`'auto'`，则尝试密集绘制不重叠的标签。

33. **mask：**掩码数组**。**如果传入，对应`True`的单元格中不会显示数据。缺失值的单元格将自动被屏蔽。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.heatmap(flights, cmap=cmap, norm=flights_norm, square=True,

            mask=flights<204,

            annot=True,
            fmt='.2f',
            annot_kws={"fontsize": 8, 'color': 'r'},

            linewidths=2,
            linecolor='k',

            cbar=True,
            cbar_kws={"label": "Passengers", 'shrink': 0.855},
            cbar_ax=None,

            xticklabels='auto',
            yticklabels='auto',

            ax=ax
            )
"""
<Axes: xlabel='month', ylabel='year'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/1bd0fdd4-6643-4015-b21d-aa7e3d070e64/image.png?time=1747468800&token=49437a790a4dac60ad5d7916eda87abb7223493cde8793fc23c62eaa2dea308e&role=sharePaid)

# Seaborn：clustermap

[seaborn.clustermap — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.clustermap.html)


[linkage — SciPy v1.14.1 Manual](https://docs.scipy.org/doc/scipy/reference/generated/scipy.cluster.hierarchy.linkage.html#scipy.cluster.hierarchy.linkage)


[docs.scipy.org](https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.pdist.html#scipy.spatial.distance.pdist)


`sns.clustermap(data, *, pivot_kws=None, method='average', metric='euclidean', z_score=None, standard_scale=None, figsize=(10, 10), cbar_kws=None, row_cluster=True, col_cluster=True, row_linkage=None, col_linkage=None, row_colors=None, col_colors=None, mask=None, dendrogram_ratio=0.2, colors_ratio=0.03, cbar_pos=(0.02, 0.8, 0.05, 0.18), tree_kws=None, **kwargs)`

将矩阵数据集绘制为层次聚类热图。该函数需要 scipy 可用。`**kwargs`所有其他关键字参数都传递给`heatmap()`。

34. **data：**用于聚类的矩形数据。**不能包含空值**。

35. **pivot_kws：**如果`data`是整洁的 DataFrame，可以提供用于pivot的关键字参数来创建矩形DataFrame。

36. **row_cluster、col_cluster：**如果`True` ，对行或列进行聚类。

37. **method：**用于计算聚类的链接方法。参阅`scipy.cluster.hierarchy.linkage()`文档。

38. **metric：**用于数据的距离度量。参阅`scipy.spatial.distance.pdist()`文档。要使用不同的度量（或方法）用于行和列，可以分别构建链接矩阵，并将它们作为`{row,col}_linkage`参数提供。

39. **row_linkage、col_linkage：**行或列的预计算链接矩阵。参见`scipy.cluster.hierarchy.linkage()`了解具体格式。

40. **row_colors、col_colors：**用于标记行或列的颜色列表。可用于评估组内样本是否聚集在一起。可以使用嵌套列表或 DataFrame来表示多级颜色标记。如果作为`pandas.DataFrame`或`pandas.Series`提供，颜色标签将提取自DataFrames 的列名或Series 的名称。DataFrame/Series颜色也将通过其索引与数据匹配，确保颜色按正确顺序绘制。

41. **dendrogram_ratio、colors_ratio：**图形大小中用于两个边缘元素的比例。如果给出一对，则对应于（行，列）比例。

42. **z_score：**是否计算**行（0）**或**列（1）**的z分数。z分数为：z = (x - mean)/std。这确保了每行（列）的平均值为 0，方差为 1。

43. **standard_scale：**对每一**行（0）**或每一**列（1）**进行标准化，即(x - min)/ max。

44. **cbar_pos：**Figure中颜色条Axes的位置，形如`(left, bottom, width, height)`的元组。设置为`None`将禁用颜色条。

45. **tree_kws：**用于绘制树状图线的`matplotlib.collections.LineCollection`参数。

```Python
from matplotlib.patches import Patch
a = sns.clustermap(penguins_data, cmap=cmap, norm=penguins_norm,

                   mask=None,

                   annot=False,

                   linewidths=0,

                   cbar_kws=None,
                   cbar_pos=(1, 0.071, 0.05, 0.735),

                   xticklabels='auto',
                   yticklabels=[],

                   row_cluster=True,
                   col_cluster=False,
                   method='weighted',
                   metric='mahalanobis',
                   row_linkage=None,
                   col_linkage=None,
                   row_colors=penguins['species'].map({'Adelie': 'r', 'Chinstrap': 'g', 'Gentoo': 'b'}),
                   col_colors=None,
                   dendrogram_ratio=0.2,
                   colors_ratio=0.02,
                   tree_kws=None,

                   z_score=None,
                   standard_scale=None,

                   figsize=(10,10)
                   )
"""
<seaborn.matrix.ClusterGrid at 0x2a739377bc0>
"""
p1 = Patch(facecolor='r')
p2 = Patch(facecolor='g')
p3 = Patch(facecolor='b')
a.figure.legend([p1, p2, p3], ['Adelie', 'Chinstrap', 'Gentoo'], loc='center left')
```


![image.png](https://tc-cdn.flowus.cn/oss/a46e77f6-6ed8-42a4-a869-3d539f356401/image.png?time=1747468800&token=3d3a39445458436825f268d5a7190f3109483d3a90cc62736329e4e211a3980a&role=sharePaid)

