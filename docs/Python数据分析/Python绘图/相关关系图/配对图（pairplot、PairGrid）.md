[penguins.csv](https://flowus.cn/preview/f812de5d-c632-4e48-9d31-d9fff13cb972)

![image.png](https://tc-cdn.flowus.cn/oss/11b4a047-a2bd-450f-8566-609a4ecc8083/image.png?time=1747467900&token=f7412d60751f92b752f04064a8e0dd6115c7a533454610bdb0a1f873d883dd4d&role=sharePaid)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

penguins = pd.read_csv('../Data/penguins.csv')
```


# Seaborn：pairplot

[seaborn.pairplot — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.pairplot.html)


`sns.pairplot(data, *, hue=None, hue_order=None, palette=None, vars=None, x_vars=None, y_vars=None, kind='scatter', diag_kind='auto', markers=None, height=2.5, aspect=1, corner=False, dropna=False, plot_kws=None, diag_kws=None, grid_kws=None)`

在数据集中绘制成对关系。默认情况下，此函数将创建一个Axes的网格，使得`data`中每个数值型变量在单个行中共享 y 轴，在单个列中共享 x 轴。对角线图处理方式不同：绘制一个单变量分布图以显示每列数据的边缘分布。还可以显示变量的子集或在不同行和列上绘制不同的变量。这是一个用于绘制一些常见样式的`PairGrid`的高级接口。如果需要更多灵活性，应直接使用`PairGrid`。返回对象是底层`PairGrid` ，可用于进一步自定义图表。

1. **data：**整洁（长格式）数据框，其中每列是一个变量，每行是一个观测值。

2. **vars：**在`data`中要使用的变量，否则使用具有数值数据类型的每一列。优先于`x_vars`、`y_vars`参数。

3. **x_vars，y_vars：**图形的行和列分别要使用的`data`中的变量，即可制作非正方形图表。

4. **kind：**决定对角子图和非对角子图绘图类型。可选`'scatter'`（默认），`'kde'`，`'hist'`，`'reg'`。

5. **diag_kind：**对角子图类型，可选`'auto'`（默认），`'hist'`，`'kde'`，`None`。如果为`'auto'`，则根据是否使用 `hue` 来选择。

6. **markers：**要用于所有散点图点的标记，或者是一个与`hue`变量级别数量相同的标记列表，以便不同颜色的点也有不同的散点图标记。

7. **corner：**如果为`True`，则不在网格的上部三角形角落（非对角线）中添加Axes。

8. **dropna：**在绘图前从数据中删除缺失值。

9. **plot_kws，diag_kws，grid_kws：**`plot_kws`传递给双变量绘图函数，`diag_kws`传递给单变量绘图函数，`grid_kws` 传递给`PairGrid`构造函数。

```Python
pg = sns.pairplot(data=penguins,
                  vars=['culmen_length_mm', 'culmen_depth_mm', 'flipper_length_mm', 'body_mass_g'],
                  x_vars=None,
                  y_vars=None,

                  hue='sex',
                  hue_order=['FEMALE', 'MALE'],
                  palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},
                  markers=['o', '*'],

                  kind='scatter',
                  plot_kws={'s': 100},
                  diag_kind='hist',
                  diag_kws={'kde': True},

                  height=2,
                  aspect=1.5,
                  corner=True,
                  dropna=True,
                  grid_kws={'despine': True, 'layout_pad': 3}
                  )
pg.map_lower(sns.kdeplot)
"""
<seaborn.axisgrid.PairGrid at 0x1f136e47140>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/1d0395eb-c11a-483c-af53-84928e2cb8d9/image.png?time=1747467900&token=9681d9790ce621947e8dea2b23b6fb3a357c97ab6e198ca196e13d2ec8b32665&role=sharePaid)

# Seaborn：PairGrid

[seaborn.PairGrid — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.PairGrid.html)


`sns.PairGrid(data, *, hue=None, vars=None, x_vars=None, y_vars=None, hue_order=None, palette=None, hue_kws=None, corner=False, height=2.5, aspect=1, layout_pad=0.5, despine=True, dropna=False)`

数据集的成对关系图网格。此对象将数据集中的每个变量映射到网格中的列和行。可以使用不同的轴级绘图函数在上三角和下三角中绘制双变量图，并在对角线上显示每个变量的边缘分布。使用`pairplot()`可以在一行中生成几个不同的常见图。当需要更多灵活性时使用`PairGrid` 。

10. **hue_kws**：其他关键字参数可以插入到绘图调用中，以使其他绘图属性在色调变量的各个级别上变化（例如散点图中的标记）。

11. **layout_pad**：子图之间的间隔；传递给`fig.tight_layout`。

```Python
pg = sns.PairGrid(data=penguins,
                  vars=['culmen_length_mm', 'culmen_depth_mm', 'flipper_length_mm', 'body_mass_g'],
                  x_vars=None,
                  y_vars=None,

                  hue='sex',
                  hue_order=['FEMALE', 'MALE'],
                  palette={"FEMALE": "#facc87", "MALE": "#b1fa87"},
                  hue_kws=None,

                  height=2,
                  aspect=1.5,
                  corner=False,
                  dropna=True,
                  despine=True,
                  layout_pad=3
                  )
# pg.map(sns.scatterplot)
# pg.map_offdiag(sns.scatterplot)
pg.map_diag(sns.histplot, kde=True)
pg.map_lower(sns.scatterplot, s=100)
pg.map_upper(sns.kdeplot)
pg.add_legend()
"""
<seaborn.axisgrid.PairGrid at 0x1f132fa5880>
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/11042d82-5941-47aa-82c5-a2cc26534920/image.png?time=1747467900&token=ba884ae077ef5105bc137554d21482ccc6d986e0b6075badb86968aa5395fba9&role=sharePaid)



