[tips.csv](https://flowus.cn/preview/edc7531c-be66-41f6-9f08-73d94a41f3f0)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

tips = pd.read_csv('../Data/tips.csv')
total_bill = tips.groupby("day").sum()['total_bill']
percentage = total_bill/total_bill.sum()
data = pd.concat([total_bill, percentage.rename('percentage')], axis=1).loc[['Thur', 'Fri', 'Sat', 'Sun']]
"""
      total_bill  percentage
day                         
Thur     1096.33    0.227088
Fri       325.88    0.067501
Sat      1778.40    0.368369
Sun      1627.16    0.337042
"""
```


![image.png](https://tc-cdn.flowus.cn/oss/54338892-e7f7-4215-b6b9-dde2910cca32/image.png?time=1747467900&token=e58a6ee658a8d6ec0ed3e62a4c4ee1817561848ee594e163085db74f19b497c2&role=sharePaid)

[matplotlib.axes.Axes.pie — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.pie.html)


[matplotlib.pyplot.pie — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.pie.html)


`pie(x, *, explode=None, labels=None, colors=None, autopct=None, pctdistance=0.6, shadow=False, labeldistance=1.1, startangle=0, radius=1, counterclock=True, wedgeprops=None, textprops=None, center=(0, 0), frame=False, rotatelabels=False, normalize=True, hatch=None, data=None)`

将一维数组`x`制作成饼图。每个扇区的面积分数由 `x/sum(x)`给出。扇区默认从x轴开始按逆时针方向绘制。如果提供`data`参数，以下参数也接受一个字符串`s`，如果`s`是`data`中的键，则解释为`data[s]`：*x*, *explode*, *labels*, *colors。*

饼图在figure和Axes都是正方形，或者Axes的纵横比相等时看起来最好。此方法将坐标轴的纵横比设置为`'equal'`。可以使用`Axes.set_aspect`来控制。

1. **normalize：**如果为True，则始终通过归一化`x`使得`sum(x)==1`来制作完整饼图。如果为False，当`sum(x) <= 1`时制作部分饼图；`sum(x)>1`时报错。默认True。

2. **frame：**如果为True，则绘制Axes边框。默认False。

3. **center：**饼图中心的坐标。默认(0, 0)。

4. **radius：**饼图的半径。默认为1。

5. **counterclock：**顺时针（False）或逆时针（True，默认）。

6. **startangle：**饼图相对x轴旋转的起始角度。默认为0°。

7. **explode：**如果不为 None，则是一个 `len(x)` 数组，用于指定每个扇形的半径偏移分数。

8. **colors：**饼图将循环的颜色序列。如果为 None，将使用当前活动循环中的颜色。

9. **hatch：**应用到所有饼图扇区的填充图案或饼图将循环的图案序列。

10. **shadow：**如果为布尔值，则表示是否在饼图下方绘制阴影。如果为字典，则通过将字典中的属性传递给`matplotlib.patches.Shadow`来绘制阴影。默认为False。

11. **wedgeprops：**将传递给每个饼图扇区的`patches.Wedge`的参数字典。默认情况下，`clip_on=False`。当这些属性与其他关键字属性冲突时，传递给`wedgeprops`的属性优先。

12. **labels：**提供每个扇形标签的字符串序列。

13. **labeldistance：**标签绘制的相对距离（沿半径）。要将标签绘制在饼图内部，设置`labeldistance`<1。如果设置为 `None`，则不绘制标签，但标签仍然存储以供`legend`使用。默认为1.1**。**

14. **rotatelabels：**如果为True，则将每个标签旋转到对应部分的角度。默认False**。**

15. **autopct：**如果不为 None，则应是一个格式化字符串或函数，用于为每个扇形标上它们的数值，根据`pctdistance`参数进行放置。如果是一个格式化字符串，则标签将为`fmt % pct`。如果是一个函数，则将调用该函数。

16. **pctdistance：**`autopct`生成的文本绘制的相对距离（沿半径）。要将文本绘制在饼图外部，设置`pctdistance` >1。如果`autopct`设置为`None`，则忽略此参数。默认为0.6。

17. **textprops：**传递给文本对象的参数字典。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.set_ylim(-0.2, 1.2)
ax.set_xlim(-0.2, 1.2)

ax.pie('total_bill',
       data=data,

       normalize=True,
       frame=True,
       center=(0.5, 0.5),
       radius=0.5,
       counterclock=False,
       startangle=90,
       explode=[0.1, 0, 0, 0],
       colors=['#95ff00', '#00fffb', '#ffbb00', '#ff0088'],
       hatch=['/', '\\', '-', '+'],
       shadow=True,
       wedgeprops={'width': 0.2},

       labels=data.index,
       labeldistance=1.13,
       rotatelabels=True,
       autopct=lambda x: f'{x:.2f}%',
       pctdistance=0.8,
       textprops={'fontsize': 15,
                  'color': 'b'}
       )
"""
([<matplotlib.patches.Wedge at 0x17a8e153d10>,
  <matplotlib.patches.Wedge at 0x17a8dbaa2d0>,
  <matplotlib.patches.Wedge at 0x17a8dc30c50>,
  <matplotlib.patches.Wedge at 0x17a8e1cd040>],
 [Text(0.9351910571961343, 1.0028257588235818, 'Thur'),
  Text(1.063690286679786, 0.4615518439602038, 'Fri'),
  Text(0.5751296518862099, -0.05998262062983428, 'Sat'),
  Text(0.007437772321641445, 0.7767805120750606, 'Sun')],
 [Text(0.827211321200101, 0.8780644803184827, '22.71%'),
  Text(0.899072769330822, 0.47278006652049825, '6.75%'),
  Text(0.5531891340787327, 0.10355212698772792, '36.84%'),
  Text(0.15128337863479036, 0.6959508050088925, '33.70%')])
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/9d38175d-5395-43ac-91b4-2f9b1774878d/image.png?time=1747467900&token=1dab320bcfb9617f28ded5f10ebd675bdcfab2ec5eb703be3f989157d8bbecfc&role=sharePaid)



