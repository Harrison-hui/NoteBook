![image.png](https://tc-cdn.flowus.cn/oss/3db58f99-a74d-4294-a767-1f2daa1860d7/image.png?time=1747467900&token=f2923aa0e470088c8e845e976052a62d8b5e430fc47a16dcf721caa1587acb59&role=sharePaid)

[zhuanlan.zhihu.com](https://zhuanlan.zhihu.com/p/505763905)


[读文献先读图：小提琴图怎么看？](https://mp.weixin.qq.com/s/T_Xk09vpNHZotOtEy5mKhQ)


小提琴图是一种绘制连续型数据的方法，可以认为是箱形图与核密度图（KDE）的结合体。与箱形图相比，小提琴图的优势在于：除了显示统计数据外，它还显示了数据的整体分布。这个差异点很有意义，特别是在处理多模态数据时，即有多峰值的分布。

[penguins.csv](https://flowus.cn/preview/1fcdea6c-ff3a-4c53-8564-2aa4f3b020bd)

![image.png](https://tc-cdn.flowus.cn/oss/11b4a047-a2bd-450f-8566-609a4ecc8083/image.png?time=1747467900&token=f7412d60751f92b752f04064a8e0dd6115c7a533454610bdb0a1f873d883dd4d&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

penguins = pd.read_csv('../Data/penguins.csv')
```


# Matplotlib：violinplot

[matplotlib.axes.Axes.violinplot — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.violinplot.html)


[matplotlib.pyplot.violinplot — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.violinplot.html)


`violinplot(dataset, positions=None, *, orientation='vertical', widths=0.5, showmeans=False, showextrema=True, showmedians=False, quantiles=None, points=100, bw_method=None, side='both', data=None)`

绘制小提琴图。为数据集的每一列或序列数据集中的每个向量（同箱线图）绘制小提琴图。填充区域延伸以表示整个数据范围，可选地显示均值、中位数、最小值、最大值和用户指定的分位数。如果提供`data`参数，以下参数也接受一个字符串`s`，如果`s`是`data`中的键，则解释为`data[s]`：*dataset。*

1. **side：**`'both'`（默认）绘制标准小提琴图。`'low'`/`'high'`仅绘制`positions`参数值以下/以上的侧面。

2. **showmeans：**是否用线条显示平均值。默认`False`。

3. **showextrema：**是否用线条显示极值。默认`True`。

4. **showmedians：**是否用线条显示中位数。默认`False`。

5. **quantiles：**如果不为 `None`，则为每个小提琴设置一个范围在[0, 1]的浮点数列表，代表该小提琴将渲染的分位数。

6. **points：**在每个高斯核密度估计中评估的点数。默认`100`。影响曲线的平滑度。

7. **bw_method：**计算估计带宽所使用的方法名称或缩放因子。如果是一个浮点数，则直接用作`kde.factor` 。如果是一个可调用的函数，则它应该只接受一个 `matplotlib.mlab.GaussianKDE`实例作为其唯一参数，并返回一个浮点数。字符串可选`'scott'`（默认）, `'silverman'`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

np.random.seed(10)
data = np.random.normal((3, 5, 4), (1.25, 1.00, 1.25), (100, 3))

ax.violinplot(data,
              positions=[1, 2, 3],
              widths=[0.2, 0.5, 0.8],
              orientation='vertical',
              side='low',

              showmeans=True,
              showextrema=True,
              showmedians=True,
              quantiles=[[0.25, 0.75], [0.25, 0.75], [0.25, 0.75]],

              points=100,
              bw_method='scott'
              )
"""
{'bodies': [<matplotlib.collections.FillBetweenPolyCollection at 0x1b1c8babd70>,
            <matplotlib.collections.FillBetweenPolyCollection at 0x1b1c87bd160>,
            <matplotlib.collections.FillBetweenPolyCollection at 0x1b1c8a03b30>],
 'cmeans': <matplotlib.collections.LineCollection at 0x1b1c8bab620>,
 'cmaxes': <matplotlib.collections.LineCollection at 0x1b1cb3e6330>,
 'cmins': <matplotlib.collections.LineCollection at 0x1b1c88d3e00>,
 'cbars': <matplotlib.collections.LineCollection at 0x1b1cb40f4d0>,
 'cmedians': <matplotlib.collections.LineCollection at 0x1b1cb35fb00>,
 'cquantiles': <matplotlib.collections.LineCollection at 0x1b1cb390230>}
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/6a603771-524c-48cc-a81f-8f5e17e55d18/image.png?time=1747467900&token=f9f33cacbdbd23cb025eb714248475eeb2d91f24731d79f9368822c779c43ff2&role=sharePaid)

# Matplotlib：violin

[matplotlib.axes.Axes.violin — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.violin.html)


[matplotlib.cbook — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/cbook_api.html#matplotlib.cbook.violin_stats)


`violin(vpstats, positions=None, *, orientation='vertical', widths=0.5, showmeans=False, showextrema=True, showmedians=False, side='both')`

从已经计算好的统计数据中绘制小提琴图。

**vpstats**是一个包含每个小提琴图统计信息的字典列表。可以通过`matplotlib.cbook.violin_stats`函数对数据集进行计算。

必需的键包括：

8. `coords` : 包含小提琴核密度估计评估坐标的标量列表。

9. `vals` : 包含在`coords`给出的每个坐标处的核密度估计值的标量列表。

10. `mean` : 该小提琴数据集的平均值。

11. `min` : 该小提琴数据集的最小值。

12. `max` : 该小提琴数据集的最大值。

可选键包括：

13. `quantiles` ：包含此小提琴数据集分位数值的标量列表。

# Seaborn：violinplot

[seaborn.violinplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.violinplot.html)


`sns.violinplot(data=None, *, x=None, y=None, hue=None, order=None, hue_order=None, orient=None, color=None, palette=None, saturation=0.75, fill=True, inner='box', split=False, width=0.8, dodge='auto', gap=0, linewidth=None, linecolor='auto', cut=2, gridsize=100, bw_method='scott', bw_adjust=1, density_norm='area', common_norm=False, hue_norm=None, formatter=None, log_scale=None, native_scale=False, legend='auto', inner_kws=None, ax=None, **kwargs)`

14. **inner：**小提琴内部数据的表示。`"box"`（默认）绘制一个微型箱线图；`"quart"`显示数据的四分位数；`"point"`或`"stick"`显示每个观测值。

15. **inner_kws：**用于“内部”图绘制的关键词参数字典，传递给以下之一：`matplotlib.collections.LineCollection`(`inner="stick"`)、`matplotlib.axes.Axes.scatter()`(`inner="point"`)、`matplotlib.axes.Axes.plot()`(`inner="quart"`或`inner="box"`)。此外，当使用 `inner="box"` 时，关键词`box_width` 、`whis_width`和`marker`在“箱线图”的组成部分中会得到特殊处理。

16. **split：**使用 `hue` 时显示非镜像分布，**交替显示两侧**。默认False。

17. **cut：**在带宽单位中，扩展密度**超过极端数据点的距离**。默认为2。设置为 0 以限制小提琴图在数据范围内。

18. **gridsize：**用于评估核密度估计（KDE）的离散网格中的点数（同上`points`参数）。

19. **bw_adjust：**缩放带宽的因子，用于**调整平滑度**。默认为1。

20. **density_norm：**用于将每个密度归一化的方法，以确定小提琴的宽度。如果为`'area'`（默认），则每个小提琴将具有相同的面积。如果为`'count'`，则宽度将与观察值的数量成比例。如果为`'width'`，则每个小提琴将具有相同的宽度。

21. **common_norm：**当 `True` 时，对所有小提琴的密度进行归一化。默认False。

`**kwargs`其它用于小提琴图块的关键词参数传递给`matplotlib.axes.Axes.fill_between()`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.violinplot(data=penguins,
               x='species',
               y='body_mass_g',
               orient="x",
               order=['Gentoo', 'Chinstrap', 'Adelie'],
               formatter=lambda x: x+" penguins",

               hue='sex',
               hue_order=['FEMALE', 'MALE'],
               fill=True,
               palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},
               saturation=0.75,

               width=0.5,
               dodge='auto',
               gap=0.3,

               linecolor='k',
               linewidth=1.5,
               inner='box',
               inner_kws={'marker': '*',
                          'markersize': 10,
                          'color': 'r',
                          'box_width': 5,
                          'whis_width': 1},
               split=True,
               cut=0,
               gridsize=100,
               bw_method='scott',
               bw_adjust=1,
               density_norm='count',
               common_norm=False,

               log_scale=False,
               native_scale=True,

               ax=ax
               )
"""
<Axes: xlabel='species', ylabel='body_mass_g'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/e2160631-3830-4be2-9e9a-4e9b8b95a424/image.png?time=1747467900&token=f4a5a22cf94cd4bb3cdba5679216337e8e88c9b0a8af31b50766a0e3e110c39e&role=sharePaid)

