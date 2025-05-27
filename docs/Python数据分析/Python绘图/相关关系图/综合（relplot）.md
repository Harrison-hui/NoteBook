[tips.csv](https://flowus.cn/preview/d28e5b77-a953-4840-a791-6fdca671b246)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

tips = pd.read_csv('../Data/tips.csv')
```


![image.png](https://tc-cdn.flowus.cn/oss/54338892-e7f7-4215-b6b9-dde2910cca32/image.png?time=1747467900&token=e58a6ee658a8d6ec0ed3e62a4c4ee1817561848ee594e163085db74f19b497c2&role=sharePaid)

[seaborn.relplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.relplot.html)


[seaborn.FacetGrid — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.FacetGrid.html)


`sns.relplot(data=None, *, x=None, y=None, hue=None, size=None, style=None, units=None, weights=None, row=None, col=None, col_wrap=None, row_order=None, col_order=None, palette=None, hue_order=None, hue_norm=None, sizes=None, size_order=None, size_norm=None, markers=None, dashes=None, style_order=None, legend='auto', kind='scatter', height=5, aspect=1, facet_kws=None, **kwargs)`

用于在 FacetGrid 上绘制Figure级相关关系图绘图函数。此函数提供了访问多个不同Axes级函数的接口，这些函数通过子集的语义映射展示了两个变量之间的关系。 `kind` 参数用于选择要使用的底层Axes级函数：`"scatter"`(默认)、`"line"`。额外的关键字参数`**kwargs`会被传递给这些底层函数

1. **row、col**：定义要在不同分面（facet）上绘制的子集的变量。

2. **col_wrap**：超过此数量的列变量分面（facet）将换行绘制，以便列分面（facet）跨越多行。与 `row` 分面（facet）不兼容。

3. **row_order、col_order**：组织网格布局的行和/或列的顺序，否则顺序由数据对象推断。

4. **height**：每个分面（facet）的高度（英寸）。

5. **aspect**：每个分面（facet）的宽高比。因此 `aspect * height` 表示每个分面的宽度（英寸）。

6. **facet_kws**：传递给 `FacetGrid` 的其他关键字参数字典

  1. **sharex、sharey**：如果 `True` ，则分面（facet）将在列之间共享y轴和/或行之间共享x轴。

  2. **xlim、ylim**：每个分面（facet）每个轴的范围（仅在 sharex、sharey 为 True 时相关）。

  3. **legend_out**：如果 `True` ，则图尺寸将扩展，图例将在图的中心右侧外部绘制。

  4. **despine**：如果 `True` ，移除每个分面（facet）图表的顶部和右侧边框。

  5. **margin_titles：**如果 `True` ，行变量的标题将绘制在最后一列的右侧。

  6. **subplot_kws：**传递给 matplotlib subplot(s)方法的键值参数字典。

  7. **gridspec_kws：**传递给 `matplotlib.gridspec.GridSpec` （通过 `matplotlib.figure.Figure.subplots()` ）的键值参数字典。如果 `col_wrap` 不等于 `None` ，则忽略。

```Python
sns.relplot(data=tips,
            x='total_bill',
            y='tip',
            kind='scatter',

            hue='time',
            size='size',
            sizes=(50, 300),
            style='time',

            col='day',
            col_wrap=2,
            col_order=["Thur", "Fri", "Sat", "Sun"],

            height=6,
            aspect=1.5,
            facet_kws={"sharex": True, "sharey": True,
                       # "xlim": (10, 40), "ylim": (2, 8),
                       "legend_out": True,
                       "despine": True,
                       # "margin_titles": True,
                       "subplot_kws": None,
                       "gridspec_kws": None
                       }
            )
"""
<seaborn.axisgrid.FacetGrid at 0x1ea42c90e90>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/21bb97ee-34c2-465f-8650-1961af024da6/image.png?time=1747467900&token=7d8b28a9fdac96a66830d4a0c88ba135f96df73b1ce1b2bd4d4182dc4410c9cb&role=sharePaid)

```Python
sns.relplot(data=tips,
            x='total_bill',
            y='tip',
            kind='scatter',

            hue='day',
            hue_order=["Thur", "Fri", "Sat", "Sun"],
            size='size',
            sizes=(50, 300),
            style='day',

            row='sex',
            row_order=["Female", "Male"],
            col='time',
            col_order=["Lunch", "Dinner"],

            height=6,
            aspect=1.5,
            facet_kws={"sharex": True, "sharey": True,
                       # "xlim": (10, 40), "ylim": (2, 8),
                       "legend_out": True,
                       "despine": True,
                       "margin_titles": True,
                       "subplot_kws": None,
                       "gridspec_kws": None
                       },
            )
"""
<seaborn.axisgrid.FacetGrid at 0x207ed489370>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/0cdd63c7-1d64-4235-91d1-154e4ceccb91/image.png?time=1747467900&token=fc6f31ee0615d192f51159cd875ceddad1c9705b87a54b5e59cbba88915b9f18&role=sharePaid)



