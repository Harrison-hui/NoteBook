```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
```


[matplotlib.axes.Axes.stem — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.stem.html)


[matplotlib.pyplot.stem — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.stem.html)


`stem(*args, linefmt=None, markerfmt=None, basefmt=None, bottom=0, label=None, orientation='vertical', data=None)`

茎状图在每个位置`locs`处，从基线到头部 `heads`绘制与基线垂直的线，并在头部放置一个标记。对于垂直茎状图（默认），`locs`是x的位置，`heads`是y值；对于水平茎状图，`locs` 是y的位置，`heads`是x值。`locs`参数是可选的，默认为(0, 1, ..., `len(heads)`-1)。

```Python
stem([locs,] heads, linefmt=None, markerfmt=None, basefmt=None)
```


1. **bottom：**基准线的 y/x 位置（取决于`orientation`）。默认为0。

2. **orientation：**茎的朝向。可选'vertical'（默认）, 'horizontal'。

3. **linefmt：**定义垂直线的颜色和/或线型的字符串。默认'C0-'，即使用颜色循环的第一个颜色绘制实线。注意，通过此参数指定的标记（例如 'x'）将被静默忽略。相反，应使用`markerfmt`指定标记。

4. **markerfmt：**定义茎头处标记的颜色和/或形状的字符串。如果没有指定标记，则使用标记 'o'，即实心圆圈。如果没有指定颜色，则使用`linefmt`中的颜色。

5. **basefmt：**定义基线属性的格式字符串。默认'C3-'（经典模式中为'C2-'）。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

locs = np.arange(1, 11, 1)
heads = np.sin(locs) + 5

markerline, stemlines, baseline = ax.stem(locs, heads,
                                          bottom=2,
                                          orientation='vertical',
                                          linefmt='r--',
                                          markerfmt='g*',
                                          basefmt='b-',
                                          label="stem"
                                          )
"""
<StemContainer object of 3 artists>
-----------------------------------
markerline: <matplotlib.lines.Line2D at 0x1abcd089730>
stemlines: <matplotlib.collections.LineCollection at 0x1abcd02c680>
baseline: <matplotlib.lines.Line2D at 0x1abcd0899a0>
"""
markerline.set(markersize=20)
stemlines.set(linewidth=5)
baseline.set(linewidth=5)

ax.legend()
plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/8f514305-9eb2-44b4-b631-55056bb6f831/image.png?time=1747468800&token=63aebde705afcc120eba5fb79c1b1d56cf79c1d9c7bb5347db0f714c03ee2e79&role=sharePaid)

