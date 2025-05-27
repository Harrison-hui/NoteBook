![image.png](https://tc-cdn.flowus.cn/oss/8bc0e869-0c6d-42b9-89ba-88335361c7c1/image.png?time=1747467900&token=7f372d3c556a05d46bfc08f6a324e83c0d4945f075a8e583fadf51981f318242&role=sharePaid)

**箱体（box）**显示数据集的四分位数，从第1四分位数（the first quartile，Q1）延伸到第3四分位数（the third quartile，Q3），并在**中位数（median）**处有一条线。**延长线（whisker）**显示分布的其余部分，从箱体延伸到距离箱体1.5 倍四分位距（inter-quartile range，IQR）范围内的最远数据点。**异常值（Flier）**是指超出延长线末端以外的点。

[penguins.csv](https://flowus.cn/preview/1f78303b-9bef-4f97-afc5-e8c264de22c2)

![image.png](https://tc-cdn.flowus.cn/oss/11b4a047-a2bd-450f-8566-609a4ecc8083/image.png?time=1747467900&token=f7412d60751f92b752f04064a8e0dd6115c7a533454610bdb0a1f873d883dd4d&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

penguins = pd.read_csv('../Data/penguins.csv')
```


# Matplotlib：boxplot

[matplotlib.axes.Axes.boxplot — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.boxplot.html)


[matplotlib.pyplot.boxplot — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.boxplot.html)


`boxplot(x, *, notch=None, sym=None, orientation='vertical', whis=None, positions=None, widths=None, patch_artist=None, bootstrap=None, usermedians=None, conf_intervals=None, meanline=None, showmeans=None, showcaps=None, showbox=None, showfliers=None, boxprops=None, tick_labels=None, flierprops=None, medianprops=None, meanprops=None, capprops=None, whiskerprops=None, manage_ticks=True, autorange=False, zorder=None, capwidths=None, label=None, data=None)`

绘制箱线图。如果输入数据`x`是一个二维数组，则为`x`的每一列数据绘制箱线图。如果`x`是一个一维数组的序列，则为 `x`的每个数组绘制箱线图。`data`参数同前。

## 基础绘制

1. **positions：**每个箱子的位置。刻度和范围会自动设置为与位置匹配。默认为 `range(1, N+1)` ，其中 `N` 是要绘制的箱子数。

2. **widths：**（每个）箱子的宽度。默认0.5，或者，如果 `0.15*(distance between extreme positions)`更小，则使用之 。

3. **orientation：**如果为 `'horizontal'`，则水平绘制。否则垂直（`'vertical'`，默认）绘制。

4. **tick_labels：**每个箱子的刻度标签。刻度始终放置在箱子的位置上。如果提供了`tick_labels`，则刻度将相应地标注。否则，它们保持其数值。

5. **manage_ticks：**如果为 True（默认），则刻度位置和标签将调整以匹配箱子位置。

6. **label**：图例标签。当所有箱子具有相同的样式且只想为它们添加单个图例条目时，请使用单个字符串。要单独标记所有箱子，请使用字符串列表。为了便于区分，箱子应单独进行样式设置，这目前只能通过修改返回的artists来实现。在单字符串情况下，图例条目将仅与第一个箱体相关联。默认情况下，图例将显示中位数线（`result["medians"]`）；如果 `patch_artist`参数为 True，则图例将显示箱体 `Patch`（`result["boxes"]`）。

7. **zorder：**绘制优先级。默认`Line2D.zorder=2`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

np.random.seed(10)
A = np.random.normal(3, 1.25, 100)
B = np.random.normal(5, 1.00, 100)
C = np.random.normal(4, 1.25, 100)

ax.boxplot([A, B, C],
           positions=[1, 2, 3],
           widths=[0.2, 0.5, 0.8],
           orientation='vertical',
           tick_labels=['A', 'B', 'C'],
           manage_ticks=True,
           label='box',
           zorder=2
           )
"""
{'whiskers': [<matplotlib.lines.Line2D at 0x2188a1c4080>,
              <matplotlib.lines.Line2D at 0x2188a1c4380>,
              <matplotlib.lines.Line2D at 0x2188a1c53d0>,
              <matplotlib.lines.Line2D at 0x2188a1c5640>,
              <matplotlib.lines.Line2D at 0x2188a1c6720>,
              <matplotlib.lines.Line2D at 0x2188a1c69f0>],
 'caps': [<matplotlib.lines.Line2D at 0x2188a1c46b0>,
          <matplotlib.lines.Line2D at 0x2188a1c4980>,
          <matplotlib.lines.Line2D at 0x2188a1c5940>,
          <matplotlib.lines.Line2D at 0x2188a1c5c10>,
          <matplotlib.lines.Line2D at 0x2188a1c6c90>,
          <matplotlib.lines.Line2D at 0x2188a1c6f30>],
 'boxes': [<matplotlib.lines.Line2D at 0x218896dbd40>,
           <matplotlib.lines.Line2D at 0x2188a1c50d0>,
           <matplotlib.lines.Line2D at 0x2188a1c6420>],
 'medians': [<matplotlib.lines.Line2D at 0x2188a1c4b30>,
             <matplotlib.lines.Line2D at 0x2188a1c5ee0>,
             <matplotlib.lines.Line2D at 0x2188a1c7200>],
 'fliers': [<matplotlib.lines.Line2D at 0x2188a1c4e60>,
            <matplotlib.lines.Line2D at 0x2188a1c6150>,
            <matplotlib.lines.Line2D at 0x2188a1c7500>],
 'means': []}
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/53fc9ebe-5e0a-4a5e-90f0-6169649569ae/image.png?time=1747467900&token=13ef6053ca09fe054c54ea1fd6effe00d0c4a7192ec56f9c4d9da75187d63c40&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

np.random.seed(10)
data = np.random.normal((3, 5, 4), (1.25, 1.00, 1.25), (100, 3))

ax.boxplot(data,
           positions=[1, 2, 3],
           widths=[0.2, 0.5, 0.8],
           orientation='vertical',
           tick_labels=['A', 'B', 'C'],
           manage_ticks=True,
           label='box',
           zorder=2
           )
"""
{'whiskers': [<matplotlib.lines.Line2D at 0x2188a1c4080>,
              <matplotlib.lines.Line2D at 0x2188a1c4380>,
              <matplotlib.lines.Line2D at 0x2188a1c53d0>,
              <matplotlib.lines.Line2D at 0x2188a1c5640>,
              <matplotlib.lines.Line2D at 0x2188a1c6720>,
              <matplotlib.lines.Line2D at 0x2188a1c69f0>],
 'caps': [<matplotlib.lines.Line2D at 0x2188a1c46b0>,
          <matplotlib.lines.Line2D at 0x2188a1c4980>,
          <matplotlib.lines.Line2D at 0x2188a1c5940>,
          <matplotlib.lines.Line2D at 0x2188a1c5c10>,
          <matplotlib.lines.Line2D at 0x2188a1c6c90>,
          <matplotlib.lines.Line2D at 0x2188a1c6f30>],
 'boxes': [<matplotlib.lines.Line2D at 0x218896dbd40>,
           <matplotlib.lines.Line2D at 0x2188a1c50d0>,
           <matplotlib.lines.Line2D at 0x2188a1c6420>],
 'medians': [<matplotlib.lines.Line2D at 0x2188a1c4b30>,
             <matplotlib.lines.Line2D at 0x2188a1c5ee0>,
             <matplotlib.lines.Line2D at 0x2188a1c7200>],
 'fliers': [<matplotlib.lines.Line2D at 0x2188a1c4e60>,
            <matplotlib.lines.Line2D at 0x2188a1c6150>,
            <matplotlib.lines.Line2D at 0x2188a1c7500>],
 'means': []}
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/1adfe0a5-3401-4b60-b528-d890ebe367cb/image.png?time=1747467900&token=a74c22b6c2bdd685b3f094845228293125ecaa1196d79793ee8f1ff072ce8463&role=sharePaid)

## 箱体（**box**）

8. **showbox：**显示箱体。默认`rcParams["boxplot.showbox"]=True`。

9. **patch_artist：**默认`rcParams["boxplot.patchartist"]=False`，使用 `Line2D`类绘制箱体。否则使用`Patch`类绘制。

10. **boxprops：**箱体样式。`Line2D`或`Patch`参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

np.random.seed(10)
data = np.random.normal((3, 5, 4), (1.25, 1.00, 1.25), (100, 3))

ax.boxplot(data,
           positions=[1, 2, 3],
           widths=[0.2, 0.5, 0.8],
           orientation='vertical',
           tick_labels=['A', 'B', 'C'],
           manage_ticks=True,
           label='box',
           zorder=2,

           # box
           showbox=True,
           patch_artist=True,
           boxprops={'facecolor': '#00faed'}
           )
"""
{'whiskers': [<matplotlib.lines.Line2D at 0x1c381135220>,
              <matplotlib.lines.Line2D at 0x1c38199c9e0>,
              <matplotlib.lines.Line2D at 0x1c38199d7f0>,
              <matplotlib.lines.Line2D at 0x1c38199dac0>,
              <matplotlib.lines.Line2D at 0x1c38199e9c0>,
              <matplotlib.lines.Line2D at 0x1c38199ecc0>],
 'caps': [<matplotlib.lines.Line2D at 0x1c38199cc80>,
          <matplotlib.lines.Line2D at 0x1c38199cf20>,
          <matplotlib.lines.Line2D at 0x1c38199dd90>,
          <matplotlib.lines.Line2D at 0x1c38199dfd0>,
          <matplotlib.lines.Line2D at 0x1c38199efc0>,
          <matplotlib.lines.Line2D at 0x1c38199f260>],
 'boxes': [<matplotlib.patches.PathPatch at 0x1c38199c440>,
           <matplotlib.patches.PathPatch at 0x1c38199c1a0>,
           <matplotlib.patches.PathPatch at 0x1c38199e5a0>],
 'medians': [<matplotlib.lines.Line2D at 0x1c38199d1c0>,
             <matplotlib.lines.Line2D at 0x1c38199e270>,
             <matplotlib.lines.Line2D at 0x1c38199f4d0>],
 'fliers': [<matplotlib.lines.Line2D at 0x1c38199d4c0>,
            <matplotlib.lines.Line2D at 0x1c38199e510>,
            <matplotlib.lines.Line2D at 0x1c38199f7d0>],
 'means': []}
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/86d053c5-e8cf-43bb-90e6-cfe18368fc7b/image.png?time=1747467900&token=8ef671dbfbbfecea95805f212928eebaaf367d5ad4df46c17af1117feb846d1e&role=sharePaid)

## 延长线（whisker）与帽（cap）

11. **whis：**绘制延长线的位置。如果是一个浮点数，则下线位于大于`Q1 - whis*(Q3-Q1)` 的最小数据点，上线位于小于 `Q3 + whis*(Q3-Q1)` 的最大数据点。 默认`whis = 1.5`对应于 Tukey 原始定义的箱线图。如果是一对浮点数，则表示绘制延长线到对应的百分位数（例如: (5, 95)）。特别是，将此设置为(0, 100)会导致延长线覆盖整个数据范围。在 `Q1 == Q3` 的边缘情况下，如果`autorange`参数为 True，则自动设置为(0, 100)。

12. **autorange：**当设置为True，且数据分布的`Q1 == Q3` ，`whis`参数自动设置为(0, 100)。默认False。

13. **whiskerprops：**延长线样式。`Line2D`参数。

14. **showcaps：**显示延长线末端的帽。默认`rcParams["boxplot.showcaps"]=True`。

15. **capwidths：**（每个）帽宽度。默认值为`0.5*(width of the box)`。

16. **capprops：**帽样式。`Line2D`参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

np.random.seed(10)
data = np.random.normal((3, 5, 4), (1.25, 1.00, 1.25), (100, 3))

ax.boxplot(data,
           positions=[1, 2, 3],
           widths=[0.2, 0.5, 0.8],
           orientation='vertical',
           tick_labels=['A', 'B', 'C'],
           manage_ticks=True,
           label='box',
           zorder=2,

           # box
           showbox=True,
           patch_artist=True,
           boxprops={'facecolor': '#00faed'},

           # whisker/cap
           whis=1.5,
           autorange=False,
           whiskerprops={'linestyle': '--',
                         'linewidth': 2,
                         'color': 'r'},
           showcaps=True,
           capwidths=[0.2, 0.3, 0.5],
           capprops={'linestyle': '--',
                     'linewidth': 2,
                     'color': 'b'}
           )
"""
{'whiskers': [<matplotlib.lines.Line2D at 0x1c381135220>,
              <matplotlib.lines.Line2D at 0x1c38199c9e0>,
              <matplotlib.lines.Line2D at 0x1c38199d7f0>,
              <matplotlib.lines.Line2D at 0x1c38199dac0>,
              <matplotlib.lines.Line2D at 0x1c38199e9c0>,
              <matplotlib.lines.Line2D at 0x1c38199ecc0>],
 'caps': [<matplotlib.lines.Line2D at 0x1c38199cc80>,
          <matplotlib.lines.Line2D at 0x1c38199cf20>,
          <matplotlib.lines.Line2D at 0x1c38199dd90>,
          <matplotlib.lines.Line2D at 0x1c38199dfd0>,
          <matplotlib.lines.Line2D at 0x1c38199efc0>,
          <matplotlib.lines.Line2D at 0x1c38199f260>],
 'boxes': [<matplotlib.patches.PathPatch at 0x1c38199c440>,
           <matplotlib.patches.PathPatch at 0x1c38199c1a0>,
           <matplotlib.patches.PathPatch at 0x1c38199e5a0>],
 'medians': [<matplotlib.lines.Line2D at 0x1c38199d1c0>,
             <matplotlib.lines.Line2D at 0x1c38199e270>,
             <matplotlib.lines.Line2D at 0x1c38199f4d0>],
 'fliers': [<matplotlib.lines.Line2D at 0x1c38199d4c0>,
            <matplotlib.lines.Line2D at 0x1c38199e510>,
            <matplotlib.lines.Line2D at 0x1c38199f7d0>],
 'means': []}
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/d0c9350e-13b5-41f4-a096-4d59862222c1/image.png?time=1747467900&token=e0b65957a881985c79dcf85b8784a4391eb21541b76468236ec414a3ce386d5c&role=sharePaid)

## 中位数（median）与均值（mean）

17. **usermedians：**一个长度为 `len(x)` 的一维数组。每个不是 `None` 的条目强制设置对应数据集的中位数。对于是 `None`的条目，中位数由 Matplotlib常规计算。

18. **medianprops：**中位数线样式。`Line2D`参数。

19. **notch：**是否绘制带缺口的箱线图。缺口代表中位数周围的置信区间（CI）。默认`rcParams["boxplot.notch"]=False`。默认情况下通过bootstrap计算，但也可以通过设置 `conf_intervals` 参数来覆盖。在 CI 值小于下四分位数或大于上四分位数的情况下，缺口将延伸到箱体之外，使其呈现出独特的“翻转”外观。这是预期行为，与其他统计可视化软件包保持一致。

20. **bootstrap：**指定是否对中位数进行自助法重采样以计算带缺口箱线图的置信区间。如果为 None，则不执行bootstrap重采样，缺口使用基于高斯函数的渐近逼近（$median \pm 1.57 \times {IQR \over \sqrt{N}}$）来计算。否则，bootstrap 指定重采样中位数以确定其 95%置信区间的次数。建议使用 1000 到 10000 之间的值。

21. **conf_intervals：**形状为 `(len(x), 2)`的二维数组。每个非 None 的条目强制设置对应缺口的位置。对于 `None` 的条目，缺口通过其他参数（例如`bootstrap`）指定的方法计算得出。

22. **showmeans：**显示算术平均值。默认`rcParams["boxplot.showmeans"]=False`。

23. **meanline：**如果 `True` （且 `showmeans=True`），将尝试根据`meanprops`参数渲染均值，以一条贯穿整个箱体的线表示。如果`notch`参数也为True，则不建议这样做。否则，将以点显示。默认`rcParams["boxplot.meanline"]=False`。

24. **meanprops：**均值线/点样式。`Line2D`参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

np.random.seed(10)
data = np.random.normal((3, 5, 4), (1.25, 1.00, 1.25), (100, 3))

ax.boxplot(data,
           positions=[1, 2, 3],
           widths=[0.2, 0.5, 0.8],
           orientation='vertical',
           tick_labels=['A', 'B', 'C'],
           manage_ticks=True,
           label='box',
           zorder=2,

           # box
           showbox=True,
           patch_artist=True,
           boxprops={'facecolor': '#00faed'},

           # whisker/cap
           whis=1.5,
           autorange=False,
           whiskerprops={'linestyle': '--',
                         'linewidth': 2,
                         'color': 'r'},
           showcaps=True,
           capwidths=[0.2, 0.3, 0.5],
           capprops={'linestyle': '--',
                     'linewidth': 2,
                     'color': 'b'},

           # median/mean
           usermedians=[3, 5, None],
           medianprops={'linestyle': '--',
                        'linewidth': 2,
                        'color': '#ff00e1'},
           notch=True,
           bootstrap=1000,
           conf_intervals=[[None, None], [None, None], [None, None]],
           showmeans=True,
           meanline=False,
           meanprops={'marker': '*',
                      'markersize': 15,
                      'markerfacecolor': '#66b5ff',
                      'markeredgecolor': '#66b5ff'}
           )
"""
{'whiskers': [<matplotlib.lines.Line2D at 0x1c38b57ca10>,
              <matplotlib.lines.Line2D at 0x1c38b57cd40>,
              <matplotlib.lines.Line2D at 0x1c38b57dfd0>,
              <matplotlib.lines.Line2D at 0x1c38b57e2a0>,
              <matplotlib.lines.Line2D at 0x1c38b57f530>,
              <matplotlib.lines.Line2D at 0x1c38b57f800>],
 'caps': [<matplotlib.lines.Line2D at 0x1c38b57d040>,
          <matplotlib.lines.Line2D at 0x1c38b57d220>,
          <matplotlib.lines.Line2D at 0x1c38b57e5d0>,
          <matplotlib.lines.Line2D at 0x1c38b57e900>,
          <matplotlib.lines.Line2D at 0x1c38b57fb30>,
          <matplotlib.lines.Line2D at 0x1c38b57fe30>],
 'boxes': [<matplotlib.patches.PathPatch at 0x1c38b480b90>,
           <matplotlib.patches.PathPatch at 0x1c38b57d8e0>,
           <matplotlib.patches.PathPatch at 0x1c38b57f140>],
 'medians': [<matplotlib.lines.Line2D at 0x1c38b57d520>,
             <matplotlib.lines.Line2D at 0x1c38b57ebd0>,
             <matplotlib.lines.Line2D at 0x1c38b5ac140>],
 'fliers': [<matplotlib.lines.Line2D at 0x1c38b57db20>,
            <matplotlib.lines.Line2D at 0x1c38b57f080>,
            <matplotlib.lines.Line2D at 0x1c38b5ac6e0>],
 'means': [<matplotlib.lines.Line2D at 0x1c38b57d820>,
           <matplotlib.lines.Line2D at 0x1c38b57ee70>,
           <matplotlib.lines.Line2D at 0x1c38b5ac470>]}
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c33d1c92-a78d-4964-bcb0-81ab9b4879e3/image.png?time=1747467900&token=b1af0454fc285612af9b10de2e449a25489e412978f1950d1c4a2ee9d32d4b26&role=sharePaid)

## 异常值（flier）

25. **showfliers：**显示异常值。默认`rcParams["boxplot.showfliers"]=True`。

26. **sym：**默认的异常值点符号字符串。空字符串（''）将隐藏异常值点。如果为`None`，则异常值点默认为'b+'（'b'指颜色，'+'指标记）。`flierprops` 参数提供了更多控制。`sym`参数优先。

27. **flierprops：**异常值点样式。`Line2D`参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

np.random.seed(10)
data = np.random.normal((3, 5, 4), (1.25, 1.00, 1.25), (100, 3))

ax.boxplot(data,
           positions=[1, 2, 3],
           widths=[0.2, 0.5, 0.8],
           orientation='vertical',
           tick_labels=['A', 'B', 'C'],
           manage_ticks=True,
           label='box',
           zorder=2,

           # box
           showbox=True,
           patch_artist=True,
           boxprops={'facecolor': '#00faed'},

           # whisker/cap
           whis=1.5,
           autorange=False,
           whiskerprops={'linestyle': '--',
                         'linewidth': 2,
                         'color': 'r'},
           showcaps=True,
           capwidths=[0.2, 0.3, 0.5],
           capprops={'linestyle': '--',
                     'linewidth': 2,
                     'color': 'b'},

           # median/mean
           usermedians=[3, 5, None],
           medianprops={'linestyle': '--',
                        'linewidth': 2,
                        'color': '#ff00e1'},
           notch=True,
           bootstrap=1000,
           conf_intervals=[[None, None], [None, None], [None, None]],
           showmeans=True,
           meanline=False,
           meanprops={'marker': '*',
                      'markersize': 15,
                      'markerfacecolor': '#66b5ff',
                      'markeredgecolor': '#66b5ff'},

           # flier
           showfliers=True,
           sym='go',
           flierprops={'markersize': 15}
           )
"""
{'whiskers': [<matplotlib.lines.Line2D at 0x1c38b57ca10>,
              <matplotlib.lines.Line2D at 0x1c38b57cd40>,
              <matplotlib.lines.Line2D at 0x1c38b57dfd0>,
              <matplotlib.lines.Line2D at 0x1c38b57e2a0>,
              <matplotlib.lines.Line2D at 0x1c38b57f530>,
              <matplotlib.lines.Line2D at 0x1c38b57f800>],
 'caps': [<matplotlib.lines.Line2D at 0x1c38b57d040>,
          <matplotlib.lines.Line2D at 0x1c38b57d220>,
          <matplotlib.lines.Line2D at 0x1c38b57e5d0>,
          <matplotlib.lines.Line2D at 0x1c38b57e900>,
          <matplotlib.lines.Line2D at 0x1c38b57fb30>,
          <matplotlib.lines.Line2D at 0x1c38b57fe30>],
 'boxes': [<matplotlib.patches.PathPatch at 0x1c38b480b90>,
           <matplotlib.patches.PathPatch at 0x1c38b57d8e0>,
           <matplotlib.patches.PathPatch at 0x1c38b57f140>],
 'medians': [<matplotlib.lines.Line2D at 0x1c38b57d520>,
             <matplotlib.lines.Line2D at 0x1c38b57ebd0>,
             <matplotlib.lines.Line2D at 0x1c38b5ac140>],
 'fliers': [<matplotlib.lines.Line2D at 0x1c38b57db20>,
            <matplotlib.lines.Line2D at 0x1c38b57f080>,
            <matplotlib.lines.Line2D at 0x1c38b5ac6e0>],
 'means': [<matplotlib.lines.Line2D at 0x1c38b57d820>,
           <matplotlib.lines.Line2D at 0x1c38b57ee70>,
           <matplotlib.lines.Line2D at 0x1c38b5ac470>]}
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/52a565c9-fc45-4235-9e58-705976890c11/image.png?time=1747467900&token=3c894fde6eef7ec5cda6e23b3d64d35edbb6265e48c59436ef5c200a167125b3&role=sharePaid)

# Matplotlib：bxp

[matplotlib.axes.Axes.bxp — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.bxp.html)


[matplotlib.cbook — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/cbook_api.html#matplotlib.cbook.boxplot_stats)


`bxp(bxpstats, positions=None, *, widths=None, orientation='vertical', patch_artist=False, shownotches=False, showmeans=False, showcaps=True, showbox=True, showfliers=True, boxprops=None, whiskerprops=None, flierprops=None, medianprops=None, capprops=None, meanprops=None, meanline=False, manage_ticks=True, zorder=None, capwidths=None, label=None)`

从已经计算好的统计数据中绘制箱线图。这是一个在已经拥有统计参数时使用的低级别绘图函数。

28. **bxpstats：**包含每个箱线图统计信息的字典列表。

  必需的键包括：

  1. `med`：中位数

  2. `q1`, `q3`：第1和第3四分位数

  3. `whislo`, `whishi`：上下延长线位置

  可选的键包括：

  4. `mean`：均值。`showmeans=True`时提供。

  5. `fliers`：异常值。`showfliers=True`时提供。

  6. `cilo`, `cihi`：置信区间。`shownotches=True`时提供。

  7. `label`：数据集名称。将被用作每个箱线图的刻度标签。

29. **shownotches：**是否绘制置信区间缺口。同上`notch`参数。

其它参数同上。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

np.random.seed(10)
data = np.random.normal((3, 5, 4), (1.25, 1.00, 1.25), (100, 3))

stats = mpl.cbook.boxplot_stats(data,
                                whis=1.5,
                                autorange=False,
                                bootstrap=1000,
                                labels=['A', 'B', 'C'])
"""
[{'label': 'A',
  'mean': np.float64(3.0992477906435965),
  'iqr': np.float64(1.6546248231599319),
  'cilo': np.float64(2.757938844185342),
  'cihi': np.float64(3.482041263953967),
  'whishi': np.float64(6.084563820543254),
  'whislo': np.float64(0.4778516841569793),
  'fliers': array([-0.72449596]),
  'q1': np.float64(2.262717909716479),
  'med': np.float64(3.23473960171136),
  'q3': np.float64(3.9173427328764108)},
 {'label': 'B',
  'mean': np.float64(4.9876702977642005),
  'iqr': np.float64(1.1147837701885175),
  'cilo': np.float64(4.766524585850899),
  'cihi': np.float64(5.244543976647989),
  'whishi': np.float64(6.672622213307828),
  'whislo': np.float64(2.868287891518396),
  'fliers': array([2.60442799, 7.40432561, 7.22504964]),
  'q1': np.float64(4.4272879740210636),
  'med': np.float64(5.044082233689844),
  'q3': np.float64(5.542071744209581)},
 {'label': 'C',
  'mean': np.float64(4.072049695076446),
  'iqr': np.float64(1.2382739322454008),
  'cilo': np.float64(3.925979529640628),
  'cihi': np.float64(4.25921072737811),
  'whishi': np.float64(6.481355739282164),
  'whislo': np.float64(1.8611610035571693),
  'fliers': array([1.52783965, 1.50700779, 1.61567889, 1.13112084, 6.98120916,
         6.99337958, 6.89890915]),
  'q1': np.float64(3.4824328690102218),
  'med': np.float64(4.128100811644375),
  'q3': np.float64(4.720706801255623)}]
"""

ax.bxp(stats,
       positions=[1, 2, 3],
       widths=[0.2, 0.5, 0.8],
       orientation='vertical',
       manage_ticks=True,
       label='box',
       zorder=2,

       # box
       showbox=True,
       patch_artist=True,
       boxprops={'facecolor': '#00faed'},

       # whisker/cap
       whiskerprops={'linestyle': '--',
                     'linewidth': 2,
                     'color': 'r'},
       showcaps=True,
       capwidths=[0.2, 0.3, 0.5],
       capprops={'linestyle': '--',
                 'linewidth': 2,
                 'color': 'b'},

       # median/mean
       medianprops={'linestyle': '--',
                    'linewidth': 2,
                    'color': '#ff00e1'},
       shownotches=True,
       showmeans=True,
       meanline=False,
       meanprops={'marker': '*',
                  'markersize': 15,
                  'markerfacecolor': '#66b5ff',
                  'markeredgecolor': '#66b5ff'},

       # flier
       showfliers=True,
       flierprops={'marker': 'o',
                   'markersize': 15,
                   'markerfacecolor': 'g',
                   'markeredgecolor': 'g'}
       )
"""
{'whiskers': [<matplotlib.lines.Line2D at 0x1c38b57ca10>,
              <matplotlib.lines.Line2D at 0x1c38b57cd40>,
              <matplotlib.lines.Line2D at 0x1c38b57dfd0>,
              <matplotlib.lines.Line2D at 0x1c38b57e2a0>,
              <matplotlib.lines.Line2D at 0x1c38b57f530>,
              <matplotlib.lines.Line2D at 0x1c38b57f800>],
 'caps': [<matplotlib.lines.Line2D at 0x1c38b57d040>,
          <matplotlib.lines.Line2D at 0x1c38b57d220>,
          <matplotlib.lines.Line2D at 0x1c38b57e5d0>,
          <matplotlib.lines.Line2D at 0x1c38b57e900>,
          <matplotlib.lines.Line2D at 0x1c38b57fb30>,
          <matplotlib.lines.Line2D at 0x1c38b57fe30>],
 'boxes': [<matplotlib.patches.PathPatch at 0x1c38b480b90>,
           <matplotlib.patches.PathPatch at 0x1c38b57d8e0>,
           <matplotlib.patches.PathPatch at 0x1c38b57f140>],
 'medians': [<matplotlib.lines.Line2D at 0x1c38b57d520>,
             <matplotlib.lines.Line2D at 0x1c38b57ebd0>,
             <matplotlib.lines.Line2D at 0x1c38b5ac140>],
 'fliers': [<matplotlib.lines.Line2D at 0x1c38b57db20>,
            <matplotlib.lines.Line2D at 0x1c38b57f080>,
            <matplotlib.lines.Line2D at 0x1c38b5ac6e0>],
 'means': [<matplotlib.lines.Line2D at 0x1c38b57d820>,
           <matplotlib.lines.Line2D at 0x1c38b57ee70>,
           <matplotlib.lines.Line2D at 0x1c38b5ac470>]}
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/727b4688-8b8f-4df1-9250-80534691fb4b/image.png?time=1747467900&token=fe1341c9b2640ac6cb6ff8a96b14e088685e732e0f264284f1d74ad715773f84&role=sharePaid)

# Seaborn：boxplot

[seaborn.boxplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.boxplot.html)


`sns.boxplot(data=None, *, x=None, y=None, hue=None, order=None, hue_order=None, orient=None, color=None, palette=None, saturation=0.75, fill=True, dodge='auto', width=0.8, gap=0, whis=1.5, linecolor='auto', linewidth=None, fliersize=None, hue_norm=None, native_scale=False, log_scale=None, formatter=None, legend='auto', ax=None, **kwargs)`

绘制箱线图以展示类别间的分布。箱线图（或箱型图）以便于比较变量或不同类别水平上的定量数据分布。

30. **linecolor：**当 `fill` 为 True 时**，**为线元素使用的颜色。

31. **linewidth：**图形元素的边框线条宽度。

32. **fliersize：**用于指示异常观测值的标记大小。

`**kwargs`其他关键字参数传递给`matplotlib.axes.Axes.boxplot()`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.boxplot(data=penguins,
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

            whis=1.5,
            linecolor='k',
            linewidth=1.5,
            fliersize=15,

            log_scale=False,
            native_scale=True,

            ax=ax
            )
"""
<Axes: xlabel='species', ylabel='body_mass_g'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c1279e1d-7809-4c41-8931-07584d1827f3/image.png?time=1747467900&token=dc5f6e660ed2934cd8e27f1ca7b28dd011d5461123c447e52b3d1064a08361d5&role=sharePaid)

# Seaborn：boxenplot

[seaborn.boxenplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.boxenplot.html)


`sns.boxenplot(data=None, *, x=None, y=None, hue=None, order=None, hue_order=None, orient=None, palette=None, saturation=0.75, fill=True, dodge='auto', width=0.8, gap=0, linewidth=None, linecolor=None, width_method='exponential', k_depth='tukey', outlier_prop=0.007, trust_alpha=0.05, showfliers=True, hue_norm=None, log_scale=None, native_scale=False, formatter=None, legend='auto', box_kws=None, flier_kws=None, line_kws=None, ax=None, **kwargs)`

绘制适用于大数据集的增强型箱线图。这种类型的图表最初被称为“字母值”（'letter value'）图，因为它显示了大量的“字母值”分位数。它在绘制一个分布的非参数表示时与箱线图相似，这种分布中所有特征都对应于实际观测值。通过绘制更多的分位数，它提供了更多关于分布形状的信息，尤其是在尾部。

33. **width：**决定最大箱子的宽度。

34. **width_method：**用于线宽的方法。`"exponential"`表示相应的百分位数；`"linear"`表示每个箱子等差递减；`"area"`表示该箱子中数据点的密度。

35. **k_depth：**每个尾部计算和绘制的层数。`"tukey"`表示使用 $(\log_{2}{n}-3)$层，覆盖与箱线图延长线相似的范围；`"proportion"`表示保留大约`outlier_prop`的异常值；`"trusthworthy"`表示至少有 `trust_alpha` 的置信度扩展到的层数；`"full"`表示使用 $(\log_{2}{n}+1)$ 层，并扩展到最极端的点。

36. **outlier_prop：**预期数据中异常值的比例；当使用 `k_depth="proportion"` 时使用。

37. **trust_alpha：**最极端层的置信度阈值；当使用 `k_depth="trustworthy"` 时使用。

38. **box_kws：**箱体样式参数，传递给`matplotlib.patches.Rectangle` 。

39. **line_kws：**中位数线样式参数，传递给`matplotlib.axes.Axes.plot()` 。

40. **flier_kws：**异常观测值点样式参数，传递给 `matplotlib.axes.Axes.scatter()` 。

`**kwargs`其他关键字参数传递给 `matplotlib.patches.Rectangle`，但将被 `box_kws` 中的参数覆盖。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.boxenplot(data=penguins,
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

              width=0.8,
              dodge='auto',
              gap=0.3,

              width_method='exponential',
              k_depth='tukey',
              # outlier_prop=0.007,
              # trust_alpha=0.05,

              linecolor='k',
              linewidth=1.5,

              # box_kws={},
              # flier_kws={},
              # line_kws={},

              log_scale=False,
              native_scale=True,

              ax=ax
              )
"""
<Axes: xlabel='species', ylabel='body_mass_g'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/865e67b3-925c-4051-8e8e-2ad8c2aa04b6/image.png?time=1747467900&token=cb9ae8cfa3ea064a7181ed1305b40b54a9908cc4efcd2ff1c37ed8164765862c&role=sharePaid)

