[penguins.csv](https://flowus.cn/preview/8bca175f-4105-41bf-98e2-8d3f0d740b90)

![image.png](https://tc-cdn.flowus.cn/oss/11b4a047-a2bd-450f-8566-609a4ecc8083/image.png?time=1747467900&token=f7412d60751f92b752f04064a8e0dd6115c7a533454610bdb0a1f873d883dd4d&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

penguins = pd.read_csv('../Data/penguins.csv')
```


# Seaborn：stripplot

[seaborn.stripplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.stripplot.html)


`sns.stripplot(data=None, *, x=None, y=None, hue=None, order=None, hue_order=None, jitter=True, dodge=False, orient=None, color=None, palette=None, size=5, edgecolor=<default>, linewidth=0, hue_norm=None, log_scale=None, native_scale=False, formatter=None, legend='auto', ax=None, **kwargs)`

使用**抖动（jitter）**来减少重叠，以绘制一个分类散点图。该图可以单独绘制，但在需要同时展示所有观测值和底层分布的某些表示时，它也是箱形图或小提琴图的良好补充。

1. **jitter**：添加的抖动量（仅沿分类轴）。当有很多点且它们重叠时，这很有用，这样更容易看到分布。可以指定抖动量（支持均匀随机变量宽度的一半），或使用`True`作为默认值。

2. **dodge：**当分配 `hue` 变量时，将此设置为 `True` 将沿分类轴分离不同色调级别的条带并缩小每个条带的分配空间。否则，每个级别的点将绘制在同一条带中。

3. **size：**点的半径（以点为单位）。

4. **edgecolor：**每个点边缘线条的颜色。如果传递`"gray"` ，则亮度由点本身的颜色调色板确定。注意， `stripplot`默认`linewidth=0` ，因此只有非零线宽时边颜色才可见。

5. **linewidth：**边缘线条宽度。

`**kwargs`其他关键字参数传递给`matplotlib.axes.Axes.scatter()`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.stripplot(data=penguins,
              x='species',
              y='body_mass_g',
              orient="x",
              order=['Gentoo', 'Chinstrap', 'Adelie'],
              formatter=lambda x: x+" penguins",

              hue='sex',
              hue_order=['FEMALE', 'MALE'],
              palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},

              jitter=0.2,
              dodge=True,
              size=5,
              edgecolor='k',
              linewidth=1.5,

              log_scale=False,
              native_scale=True,

              ax=ax
              )
"""
<Axes: xlabel='species', ylabel='body_mass_g'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/6c35a791-5b21-424c-9eb7-b41aaa29275c/image.png?time=1747467900&token=055c0f1f6fcec7d55c4bf2d393e071ced6bc0460ebad06253ad7a2cf04de3cb1&role=sharePaid)

# Seaborn：swarmplot

[seaborn.swarmplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.swarmplot.html)


`sns.swarmplot(data=None, *, x=None, y=None, hue=None, order=None, hue_order=None, dodge=False, orient=None, color=None, palette=None, size=5, edgecolor=None, linewidth=0, hue_norm=None, log_scale=None, native_scale=False, formatter=None, legend='auto', warn_thresh=0.05, ax=None, **kwargs)`

绘制一个调整点以避免重叠的分类散点图。此函数与 `stripplot()`相似，但点（仅沿类别轴）被调整，以使它们不重叠。这可以更好地表示值的分布，但不适于大量观测值的缩放。这种类型的图表有时被称为**“蜂群图”（beeswarm）**。蜂群图可以单独绘制，但它在需要同时展示所有观测值和底层分布的箱形图或小提琴图的情况下也是一个很好的补充。

当点的局部密度过高时，它们将被迫在每个蜂群“缝隙”中重叠，并会发出警告。减小点的尺寸可以帮助避免这个问题。

`**kwargs`其他关键字参数传递给`matplotlib.axes.Axes.scatter()`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.swarmplot(data=penguins,
              x='species',
              y='body_mass_g',
              orient="x",
              order=['Gentoo', 'Chinstrap', 'Adelie'],
              formatter=lambda x: x+" penguins",

              hue='sex',
              hue_order=['FEMALE', 'MALE'],
              palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},

              dodge=True,
              size=5,
              edgecolor='k',
              linewidth=1.5,
              warn_thresh=0.05,

              log_scale=False,
              native_scale=True,

              ax=ax
              )
"""
<Axes: xlabel='species', ylabel='body_mass_g'>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/be58de24-f783-48a8-a61e-c98cab025278/image.png?time=1747467900&token=d94192545d0a3ae28eaa2bd925f78ea2a83527f5a17563fd5e13e3a85abc5d6e&role=sharePaid)

