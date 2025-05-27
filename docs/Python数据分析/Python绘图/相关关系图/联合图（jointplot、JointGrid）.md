[penguins.csv](https://flowus.cn/preview/4a1e0769-a2dc-4b02-abe1-56505069df86)

![image.png](https://tc-cdn.flowus.cn/oss/11b4a047-a2bd-450f-8566-609a4ecc8083/image.png?time=1747467900&token=f7412d60751f92b752f04064a8e0dd6115c7a533454610bdb0a1f873d883dd4d&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

penguins = pd.read_csv('../Data/penguins.csv')
```


# jointplot

[seaborn.jointplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.jointplot.html)


`sns.jointplot(data=None, *, x=None, y=None, hue=None, kind='scatter', height=6, ratio=5, space=0.2, dropna=False, xlim=None, ylim=None, color=None, palette=None, hue_order=None, hue_norm=None, marginal_ticks=False, joint_kws=None, marginal_kws=None, **kwargs)`

绘制两个变量的双变量（联合，joint）和单变量（边缘，marginal）图表。此函数提供了一个方便的接口到`JointGrid`类，具有多种预定义的绘图类型。这是一个相对轻量级的包装器；如果需要更多灵活性，应直接使用`JointGrid`。返回对象是底层`JointGrid`，可用于进一步自定义图表。

`**kwargs`附加关键字参数传递给用于在联合Axes上绘制图表的函数，覆盖`joint_kws`字典中的项。

1. **kind：**绘图类型。可选`"scatter"`、`"kde"`、`"hist"`、`"hex"`、`"reg"`、`"resid"`。

2. **height：**Figure大小（正方形）。

3. **ratio：**联合Axes高度与边缘Axes高度的比率。

4. **space：**联合Axes和边缘Axes之间的空间。

5. **marginal_ticks：**如果为`False`，则不绘制边缘图的计数/密度轴上的刻度。

6. **joint_kws、marginal_kws：**图表组件的附加关键字参数。

```Python
jg = sns.jointplot(data=penguins,
                   x="culmen_length_mm",
                   y="culmen_depth_mm",
                   
                   xlim=(30, 60),
                   ylim=(12, 22),
                   dropna=True,

                   hue="sex",
                   hue_order=['FEMALE', 'MALE'],
                   palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},

                   height=8,
                   ratio=5,
                   space=0.5,
                   marginal_ticks=True,

                   kind="scatter",
                   joint_kws={'s': 100},
                   marginal_kws=None
                   )
# jg.plot(sns.kdeplot, sns.histplot)
jg.plot_joint(sns.kdeplot)
jg.plot_marginals(sns.histplot, kde=True)
"""
<seaborn.axisgrid.JointGrid at 0x1bbd9446900>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/72de9007-b9fe-4999-b108-7a00144adf1c/image.png?time=1747467900&token=32f2fe37995fa537f4f5629d29f79b210f787c6b86a063f8a4b69d17bb74e2d9&role=sharePaid)

# JointGrid

[seaborn.JointGrid — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.JointGrid.html)


`sns.JointGrid(data=None, *, x=None, y=None, hue=None, height=6, ratio=5, space=0.2, palette=None, hue_order=None, hue_norm=None, dropna=False, xlim=None, ylim=None, marginal_ticks=False)`

双变量绘图网格，边缘为单变量绘图。可以通过使用`jointplot()`绘制许多图表。当需要更多灵活性时，直接使用此类。

```Python
jg = sns.JointGrid(data=penguins,
                   x="culmen_length_mm",
                   y="culmen_depth_mm",

                   xlim=(30, 60),
                   ylim=(12, 22),
                   dropna=True,

                   hue="sex",
                   hue_order=['FEMALE', 'MALE'],
                   palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},

                   height=8,
                   ratio=5,
                   space=0.5,
                   marginal_ticks=True
                   )
jg.plot_joint(sns.scatterplot, s=100)
# sns.scatterplot(data=penguins, x="culmen_length_mm", y="culmen_depth_mm", s=100, ax=jg.ax_joint)
jg.plot_joint(sns.kdeplot)
# sns.kdeplot(data=penguins, x="culmen_length_mm", y="culmen_depth_mm", ax=jg.ax_joint)
jg.plot_marginals(sns.histplot, kde=True)
# sns.histplot(data=penguins, x="culmen_length_mm", kde=True, ax=jg.ax_marg_x)
# sns.histplot(data=penguins, y="culmen_depth_mm", kde=True, ax=jg.ax_marg_y)
jg.refline(x=45, y=18, joint=True, marginal=True, color='r', linestyle='--', linewidth=2)
"""
<seaborn.axisgrid.JointGrid at 0x1bbdb630890>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/a8c0d576-602f-4356-aebf-4fe16b70be73/image.png?time=1747467900&token=8dc031e022c0340cfb1c5bb74d201e1e422090c0fd1d133a212f980ee666f0d5&role=sharePaid)

