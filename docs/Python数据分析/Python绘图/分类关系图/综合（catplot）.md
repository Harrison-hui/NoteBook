[tips.csv](https://flowus.cn/preview/d91a2e87-90d0-4b5a-9b13-a2c7cb7fedbc)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

tips = pd.read_csv('../Data/tips.csv')
```


![image.png](https://tc-cdn.flowus.cn/oss/54338892-e7f7-4215-b6b9-dde2910cca32/image.png?time=1747467900&token=e58a6ee658a8d6ec0ed3e62a4c4ee1817561848ee594e163085db74f19b497c2&role=sharePaid)

[seaborn.catplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.catplot.html)


`sns.catplot(data=None, *, x=None, y=None, hue=None, row=None, col=None, kind='strip', estimator='mean', errorbar=('ci', 95), n_boot=1000, seed=None, units=None, weights=None, order=None, hue_order=None, row_order=None, col_order=None, col_wrap=None, height=5, aspect=1, log_scale=None, native_scale=False, formatter=None, orient=None, color=None, palette=None, hue_norm=None, legend='auto', legend_out=True, sharex=True, sharey=True, margin_titles=False, facet_kws=None, **kwargs)`

用于在 FacetGrid 上绘制Figure级分类关系图绘图函数。此函数提供了访问多个不同Axes级函数的接口，这些函数通过子集的语义映射展示了数值变量与一个或多个分类变量之间的关系。 `kind` 参数用于选择要使用的底层Axes级函数：

1. `stripplot()`（`kind="strip"`，默认）

2. `swarmplot()`（`kind="swarm"`）

3. `boxplot()`（`kind="box"`）

4. `boxenplot()`（`kind="boxen"`）

5. `violinplot()`（`kind="violin"`）

6. `pointplot()`（`kind="point"`）

7. `barplot()`（`kind="bar"`）

8. `countplot()`（`kind="count"`）

额外的关键字参数`**kwargs`会被传递给这些底层函数。绘图后，返回与绘图相关的`FacetGrid`，可以直接用于调整辅助绘图细节或添加其他层。

```Python
sns.catplot(data=tips,
            x='day',
            y='total_bill',
            kind='box',
            orient="x",
            order=["Thur", "Fri", "Sat", "Sun"],
            formatter=lambda x: x+" day",

            hue='smoker',
            hue_order=['Yes', 'No'],
            palette={"Yes": "#facc87", "No": "#b1fa87"},

            row='time',
            row_order=["Lunch", "Dinner"],
            col='sex',
            col_order=['Female', 'Male'],

            height=6,
            aspect=1.5,
            legend_out=True,
            sharex=False,
            sharey=True,
            margin_titles=True,
            facet_kws={'despine': True}
            )
"""
<seaborn.axisgrid.FacetGrid at 0x201b2d52fc0>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/a08428e8-bdd7-4752-b9ad-4c11b33fff57/image.png?time=1747467900&token=22f33f0f60e63217b9bc4e6d6f5ffa926d2b61729b5cf3df30b431e2f8503fef&role=sharePaid)



