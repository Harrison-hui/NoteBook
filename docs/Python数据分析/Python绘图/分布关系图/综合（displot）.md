[tips.csv](https://flowus.cn/preview/74607c82-deb6-477c-8276-2ce98cfae4ab)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

tips = pd.read_csv('../Data/tips.csv')
```


![image.png](https://tc-cdn.flowus.cn/oss/54338892-e7f7-4215-b6b9-dde2910cca32/image.png?time=1747467900&token=e58a6ee658a8d6ec0ed3e62a4c4ee1817561848ee594e163085db74f19b497c2&role=sharePaid)

[seaborn.displot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.displot.html)


`sns.displot(data=None, *, x=None, y=None, hue=None, row=None, col=None, weights=None, kind='hist', rug=False, rug_kws=None, log_scale=None, legend=True, palette=None, hue_order=None, hue_norm=None, color=None, col_wrap=None, row_order=None, col_order=None, height=5, aspect=1, facet_kws=None, **kwargs)`

用于在FacetGrid上绘制Figure级分布关系图绘图函数。此函数提供了访问多种可视化单变量或双变量数据分布的方法，包括由语义映射定义的数据子集以及跨多个子图的分面。`kind`参数用于选择要使用的底层Axes级函数：

1. `histplot()`（`kind="hist"`，默认）

2. `kdeplot()`（`kind="kde"`）

3. `ecdfplot()`（`kind='ecdf'`，仅限单变量）

此外，还可以向任何类型的图表中添加`rugplot()`以显示单个观测值。额外的关键字参数`**kwargs`会被传递给这些底层函数。绘图后，返回与绘图相关的`FacetGrid`，可以直接用于调整辅助绘图细节或添加其他层。

4. **rug：**如果为`True`，则用`rugplot()`显示每个观测值。

5. **rug_kws：**`rugplot()`参数字典。

```Python
sns.displot(data=tips,
            x='total_bill',
            # y='total_bill',
            kind='hist',
            stat='density',
            kde=True,
            rug=True,

            hue='smoker',
            hue_order=['Yes', 'No'],
            palette={"Yes": "#facc87", "No": "#b1fa87"},

            row='time',
            row_order=["Lunch", "Dinner"],
            col='sex',
            col_order=['Female', 'Male'],

            height=6,
            aspect=1.5,
            facet_kws={'sharex': True,
                       'sharey': True,
                       'margin_titles': True,
                       'legend_out': True,
                       'despine': True}
            )
"""
<seaborn.axisgrid.FacetGrid at 0x1f6dc19e030>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/989ac0dd-7fd9-42fe-b43b-85cdfe3fbf52/image.png?time=1747468800&token=720f1e3e8dc91fdb39a242adf34164366fedfee5ae72b483aae5ac814d91a135&role=sharePaid)



