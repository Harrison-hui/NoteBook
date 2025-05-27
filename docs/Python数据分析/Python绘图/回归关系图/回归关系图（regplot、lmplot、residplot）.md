[tips.csv](https://flowus.cn/preview/cf961f5b-4385-459e-8ac0-d3cdd731a65a)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

tips = pd.read_csv('../Data/tips.csv')
```


![image.png](https://tc-cdn.flowus.cn/oss/54338892-e7f7-4215-b6b9-dde2910cca32/image.png?time=1747467900&token=e58a6ee658a8d6ec0ed3e62a4c4ee1817561848ee594e163085db74f19b497c2&role=sharePaid)

# Seaborn：regplot

[seaborn.regplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.regplot.html)


`sns,regplot(data=None, *, x=None, y=None, x_estimator=None, x_bins=None, x_ci='ci', scatter=True, fit_reg=True, ci=95, n_boot=1000, units=None, seed=None, order=1, logistic=False, lowess=False, robust=False, logx=False, x_partial=None, y_partial=None, truncate=True, dropna=True, x_jitter=None, y_jitter=None, label=None, color=None, marker='o', scatter_kws=None, line_kws=None, ax=None)`

绘制数据和回归模型拟合。估计回归模型有多种互斥选项。

1. **x_estimator：**将此函数应用于`x`的唯一值，并绘制估计结果。当`x`为离散变量时，这很有用。如果提供了`x_ci`参数，此估计将进行自助法重采样，并绘制置信区间。

2. **x_bins：**将`x`变量分箱为离散箱，然后估计中心趋势和置信区间。此分箱仅影响散点图的绘制；回归仍然拟合原始数据。此参数可以是均匀大小（不一定是均匀间隔）的箱数量或箱中心的位置。当使用此参数时，意味着`x_estimator`的默认值为`numpy.mean`。

3. **x_ci：**绘制离散值中心趋势时使用的置信区间大小。如果`"ci"`（默认），则使用`ci`参数的值。如果`"sd"`，则跳过自助法，显示每个分箱中观测值的标准差。也可以直接设置为置信区间大小（[0, 100]内的整数）。

4. **ci：**回归估计的置信区间大小（[0, 100]内的整数）。这将在回归线周围绘制半透明带。置信区间使用自助法估计；对于大型数据集，为了避免该计算，建议将此参数设置为`None`。默认为95。

5. **scatter：**如果`True`（默认），绘制底层观测值（或`x_estimator`计算的值）的散点图。

6. **fit_reg：**如果`True`（默认），估计并绘制与`x`和`y`变量相关的回归模型。

7. **truncate：**如果`True`（默认），回归线被限制在数据范围内。

8. **order：**如果`order`大于1，则使用`numpy.polyfit`来估计**多项式回归**。默认为1，即估计**线性回归**。

9. **logistic：**如果`True`，则假设`y`是一个二元变量，并使用`statsmodels`来估计**逻辑回归**模型。请注意，这与线性回归相比计算量要大得多，因此可能要减少`n_boot`或将`ci`设置为`None`。默认`False`。

10. **lowess：**如果`True` ，则使用`statsmodels`估计**非参数lowess模型（局部加权线性回归）**。请注意，目前无法为此类模型绘制置信区间。默认`False`。

11. **robust：**如果`True` ，则使用`statsmodels`来估计**robust回归**。这将降低异常值的权重。请注意，这比标准线性回归计算量要大得多，因此同样要减少`n_boot`或将`ci`设置为`None`。默认`False`。

12. **logx：**如果`True`，则估计**形式为$y \sim log(x)$的线性回归**，但以输入空间绘制散点图和回归模型。请注意，`x` 必须为正数才能使用此功能。默认`False`。

13. **x_partial，y_partial：**在绘图之前，将混杂变量回归出`x`或`y`变量。

14. **x_jitter，y_jitter：**向`x`或`y`变量添加此大小的均匀随机噪声。噪声添加到拟合回归后的数据副本中，仅影响散点图的外观。当绘制取离散值的变量时，这可能很有帮助。

15. **label：**应用到散点图或回归线（如果`scatter`是`False`）的图例标签。

16. **color：**应用到所有绘图元素的颜色；将被传给`scatter_kws`或`line_kws`的颜色覆盖。

17. **marker：**用于散点图的标记。默认'o'。

18. **scatter_kws，line_kws：**传递给`plt.scatter`和`plt.plot`的额外关键字参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.regplot(data=tips,
            x='tip',
            y='total_bill',

            scatter=True,
            marker='o',
            scatter_kws={'color': 'red'},

            x_partial=None,
            y_partial=None,
            x_jitter=None,
            y_jitter=None,
            dropna=True,

            fit_reg=True,
            order=1,
            # logistic=True,
            # lowess=True,
            # robust=True,
            # logx=True,
            truncate=True,
            line_kws={'color': 'blue'},

            label='total_bill',
            ax=ax
            )
"""
<Axes: xlabel='tip', ylabel='total_bill'>
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/d5d00218-0572-430e-b73e-b539925bec07/image.png?time=1747468800&token=5a9c8f97f7fcb71491924694c68652be3b1b957701a4449232608de9f3359f32&role=sharePaid)

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.regplot(data=tips,
            x='tip',
            y='total_bill',

            scatter=True,
            marker='o',
            scatter_kws={'color': 'red'},

            x_estimator=np.mean,
            x_bins=20,
            x_ci='ci',
            ci=95,
            n_boot=1000,
            seed=0,
            units=None,

            x_partial=None,
            y_partial=None,
            x_jitter=None,
            y_jitter=None,
            dropna=True,

            fit_reg=True,
            order=1,
            # logistic=True,
            # lowess=True,
            # robust=True,
            # logx=True,
            truncate=True,
            line_kws={'color': 'blue'},

            label='total_bill',
            ax=ax
            )
"""
<Axes: xlabel='tip', ylabel='total_bill'>
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/93e7caef-3e35-4450-b27f-c289d535ce68/image.png?time=1747468800&token=e52a0294f3bc3932f8f9a4dabc86b174fd7fed536b408e977d041338841e7e9d&role=sharePaid)

# Seaborn：lmplot

[seaborn.lmplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.lmplot.html)


`sns.lmplot(data, *, x=None, y=None, hue=None, col=None, row=None, palette=None, col_wrap=None, height=5, aspect=1, markers='o', hue_order=None, col_order=None, row_order=None, legend=True, x_estimator=None, x_bins=None, x_ci='ci', scatter=True, fit_reg=True, ci=95, n_boot=1000, units=None, seed=None, order=1, logistic=False, lowess=False, robust=False, logx=False, x_partial=None, y_partial=None, truncate=True, x_jitter=None, y_jitter=None, scatter_kws=None, line_kws=None, facet_kws=None)`

在FacetGrid上绘制数据点和回归模型拟合。此函数结合了`regplot()`和`FacetGrid`。它旨在为在数据集的条件子集上拟合回归模型提供一个方便的接口。

在考虑如何将变量分配给不同facet时，一个普遍的规则是，对于最重要的比较，应使用`hue`，然后是`col`和`row`。然而，始终要考虑特定数据集和正在创建的可视化目标。

19. **markers：**散点图的标记。如果是一个列表，列表中的每个标记将用于`hue`变量的每个级别。

```Python
sns.lmplot(data=tips,
           x='tip',
           y='total_bill',

           hue='smoker',
           hue_order=['Yes', 'No'],
           palette={"Yes": "#facc87", "No": "#b1fa87"},

           row='time',
           row_order=["Lunch", "Dinner"],
           col='sex',
           col_order=['Female', 'Male'],

           scatter=True,
           markers=['o', '*'],
           scatter_kws=None,

           x_partial=None,
           y_partial=None,
           x_jitter=None,
           y_jitter=None,

           fit_reg=True,
           order=1,
           # logistic=True,
           # lowess=True,
           # robust=True,
           # logx=True,
           truncate=True,
           line_kws=None,

           legend=True,
           height=6,
           aspect=1.5,
           facet_kws={'sharex': True,
                      'sharey': True,
                      'margin_titles': True,
                      'legend_out': True,
                      'despine': True}
           )
"""
<seaborn.axisgrid.FacetGrid at 0x29fb55032c0>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/a145f7c4-d30a-46ba-a9c8-d212c3dcf4d4/image.png?time=1747468800&token=229f2484077f3a8e6c530c260017d42321486243c6e5865a911b2d8fcf053af3&role=sharePaid)

# Seaborn：residplot

[seaborn.residplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.residplot.html)


`sns.residplot(data=None, *, x=None, y=None, x_partial=None, y_partial=None, lowess=False, order=1, robust=False, dropna=True, label=None, color=None, scatter_kws=None, line_kws=None, ax=None)`

绘制线性回归的残差图。此函数将对`y`在`x`上进行回归（可能是robust回归或多项式回归），然后绘制残差散点图。可以可选地拟合一个lowess平滑器到残差图中，这有助于确定残差中是否存在结构。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

sns.residplot(data=tips,
              x='tip',
              y='total_bill',

              scatter_kws={'color': 'red'},

              x_partial=None,
              y_partial=None,
              dropna=True,

              order=1,
              # lowess=True,
              # robust=True,
              line_kws={'color': 'blue'},

              label='total_bill',
              ax=ax
              )
"""
<Axes: xlabel='tip', ylabel='total_bill'>
"""

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/f8a92a69-7830-418b-ae4b-764a685df6a4/image.png?time=1747468800&token=fa9b51f795a8b1df41250ba20737e422a583e271c3e4973a40ec4ca6a87e40d5&role=sharePaid)



