[iris.csv](https://flowus.cn/preview/250d3071-b746-465c-a7ee-982f4beeb091)

![image.png](https://tc-cdn.flowus.cn/oss/fde6d3b8-acdf-45ba-b459-f8e88211b537/image.png?time=1747467000&token=d2b570c0a605d8d8ae3d9ce6cd8aea731e4722d3166929539a2f523526cba817&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

iris = pd.read_csv('../Data/iris.csv')
```


# Matplotlib：eventplot

[matplotlib.axes.Axes.eventplot — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.eventplot.html)


`eventplot(positions, *, orientation='horizontal', lineoffsets=1, linelengths=1, linewidths=None, colors=None, alpha=None, linestyles='solid', data=None, **kwargs)`

在给定位置绘制相同的平行线。这种类型的图表在神经科学中常用于表示神经事件，通常被称为尖峰阵列、点阵列或阵列图。然而，在任何需要展示多组离散事件的时机或位置的情况下，它都是有用的，例如展示人们在每个月每天到达商家的到达时间或上个世纪每年飓风的日期。

如果提供`data`参数，以下参数也接受一个字符串`s`，如果`s`是`data`中的键，则解释为`data[s]`：*positions*, *lineoffsets*, *linelengths*, *linewidths*, *colors*, *linestyles*。

1. **positions：**一个一维数组定义了一个事件序列的位置。可以将多个事件组作为数组类型对象的列表传递。可以通过传递值列表给`lineoffsets`、`linelengths`、`linewidths`、`colors`和 `linestyles`来独立地设置每个组的样式。注意，该参数可以是二维数组，但在实际应用中，由于不同的事件组通常具有不同的数量，因此通常会使用不同长度的数组列表而不是二维数组。

2. **orientation：**事件序列的方向。`'horizontal'`（默认），事件水平排列，指示线垂直；`'vertical'`:，事件垂直排列，指示线水平。

3. **lineoffsets：**线的中心在垂直于`orientation`的方向上的偏移量。如果`positions`是二维的，则这可以是一个与`positions`长度匹配的序列。默认为1。

4. **linestyles：**线型。如果`positions`是二维的，则这可以是一个与`positions`长度匹配的序列。默认为`'solid'`。

5. **linelengths：**线的总高度（即线从`lineoffset - linelength/2`延伸到`lineoffset + linelength/2`）。如果`positions`是二维的，则这可以是一个与`positions`长度匹配的序列。默认为1。

6. **linewidths：**线宽（以点为单位）。如果`positions`是二维的，则这可以是一个与`positions`长度匹配的序列。默认`rcParams["lines.linewidth"]=1.5`。

7. **colors：**线的颜色。如果`positions`是二维的，则这可以是一个与`positions`长度匹配的序列。默认`rcParams["lines.color"]='C0'`。

8. **alpha：**线的透明度。如果`positions`是二维的，则这可以是一个与`positions`长度匹配的序列。默认为1。

`**kwargs`其他关键字参数传递给`matplotlib.collections.LineCollection()`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

a = ax.eventplot([iris['sepal_length'], iris['sepal_width'], iris['petal_length'], iris['petal_width']],

                 orientation='horizontal',
                 lineoffsets=[1, 2, 3, 4],
                 linestyles=['-', '--', '-.', ':'],
                 linelengths=[0.1, 0.2, 0.3, 0.4],
                 linewidths=[1, 2, 3, 4],
                 colors=['r', 'g', 'b', 'y'],
                 alpha=[0.3, 0.4, 0.5, 0.6],
                 )
"""
[<matplotlib.collections.EventCollection at 0x1674502ee40>,
 <matplotlib.collections.EventCollection at 0x16745060d10>,
 <matplotlib.collections.EventCollection at 0x16745062c60>,
 <matplotlib.collections.EventCollection at 0x16745078d70>]
"""
a[0].set_label('sepal length')
a[1].set_label('sepal width')
a[2].set_label('petal length')
a[3].set_label('petal width')
ax.legend()

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/8acd055d-151c-432d-9320-b3b1b8c619af/image.png?time=1747468800&token=9c21ca78adb046a15949fef17c2b83bfff4219550b3cbc281bf93fa7ecb02045&role=sharePaid)

# Seaborn：rugplot

[seaborn.rugplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.rugplot.html)


`rugplot(data=None, *, x=None, y=None, hue=None, height=0.025, expand_margins=True, palette=None, hue_order=None, hue_norm=None, legend=True, ax=None, **kwargs)`

通过在 x 轴和 y 轴上绘制刻度来绘制边缘分布图。此函数旨在通过以不显眼的方式显示单个观测值的位置来补充其他图表。

9. **height：**每个rug元素覆盖的轴范围比例。可以是负数。

10. **expand_margins：**如果为`True`，则通过rug的高度增加Axes的边距，以避免与其他元素重叠。

`**kwargs`其他关键字参数传递给`matplotlib.collections.LineCollection()`。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.rugplot(data=iris,
            x='sepal_length',
            y='sepal_width',

            hue="species",
            hue_order=["versicolor", "setosa", "virginica"],
            palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},

            height=0.025,
            expand_margins=False,

            ax=ax
            )
"""
<Axes: xlabel='sepal_length', ylabel='sepal_width'>
"""
sns.scatterplot(data=iris,
                x='sepal_length',
                y='sepal_width',

                hue="species",
                hue_order=["versicolor", "setosa", "virginica"],
                palette={"versicolor": '#9673f9', "setosa": '#00f9bb', "virginica": '#98f907'},

                ax=ax
                )
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/125f4f59-76b2-4242-a7cb-d676e2a55557/image.png?time=1747468800&token=64abd459e03634cbf4303371caf67185c4af062f18776600b8738f1b3a957ce9&role=sharePaid)



