```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

x = np.linspace(1, 10, 100)
"""
[ 1.          1.09090909  1.18181818  1.27272727  1.36363636  1.45454545
  1.54545455  1.63636364  1.72727273  1.81818182  1.90909091  2.
  2.09090909  2.18181818  2.27272727  2.36363636  2.45454545  2.54545455
  2.63636364  2.72727273  2.81818182  2.90909091  3.          3.09090909
  3.18181818  3.27272727  3.36363636  3.45454545  3.54545455  3.63636364
  3.72727273  3.81818182  3.90909091  4.          4.09090909  4.18181818
  4.27272727  4.36363636  4.45454545  4.54545455  4.63636364  4.72727273
  4.81818182  4.90909091  5.          5.09090909  5.18181818  5.27272727
  5.36363636  5.45454545  5.54545455  5.63636364  5.72727273  5.81818182
  5.90909091  6.          6.09090909  6.18181818  6.27272727  6.36363636
  6.45454545  6.54545455  6.63636364  6.72727273  6.81818182  6.90909091
  7.          7.09090909  7.18181818  7.27272727  7.36363636  7.45454545
  7.54545455  7.63636364  7.72727273  7.81818182  7.90909091  8.
  8.09090909  8.18181818  8.27272727  8.36363636  8.45454545  8.54545455
  8.63636364  8.72727273  8.81818182  8.90909091  9.          9.09090909
  9.18181818  9.27272727  9.36363636  9.45454545  9.54545455  9.63636364
  9.72727273  9.81818182  9.90909091 10.        ]
"""

y = np.logspace(1, 10, 100, base=10)
"""
[1.00000000e+01 1.23284674e+01 1.51991108e+01 1.87381742e+01
 2.31012970e+01 2.84803587e+01 3.51119173e+01 4.32876128e+01
 5.33669923e+01 6.57933225e+01 8.11130831e+01 1.00000000e+02
 1.23284674e+02 1.51991108e+02 1.87381742e+02 2.31012970e+02
 2.84803587e+02 3.51119173e+02 4.32876128e+02 5.33669923e+02
 6.57933225e+02 8.11130831e+02 1.00000000e+03 1.23284674e+03
 1.51991108e+03 1.87381742e+03 2.31012970e+03 2.84803587e+03
 3.51119173e+03 4.32876128e+03 5.33669923e+03 6.57933225e+03
 8.11130831e+03 1.00000000e+04 1.23284674e+04 1.51991108e+04
 1.87381742e+04 2.31012970e+04 2.84803587e+04 3.51119173e+04
 4.32876128e+04 5.33669923e+04 6.57933225e+04 8.11130831e+04
 1.00000000e+05 1.23284674e+05 1.51991108e+05 1.87381742e+05
 2.31012970e+05 2.84803587e+05 3.51119173e+05 4.32876128e+05
 5.33669923e+05 6.57933225e+05 8.11130831e+05 1.00000000e+06
 1.23284674e+06 1.51991108e+06 1.87381742e+06 2.31012970e+06
 2.84803587e+06 3.51119173e+06 4.32876128e+06 5.33669923e+06
 6.57933225e+06 8.11130831e+06 1.00000000e+07 1.23284674e+07
 1.51991108e+07 1.87381742e+07 2.31012970e+07 2.84803587e+07
 3.51119173e+07 4.32876128e+07 5.33669923e+07 6.57933225e+07
 8.11130831e+07 1.00000000e+08 1.23284674e+08 1.51991108e+08
 1.87381742e+08 2.31012970e+08 2.84803587e+08 3.51119173e+08
 4.32876128e+08 5.33669923e+08 6.57933225e+08 8.11130831e+08
 1.00000000e+09 1.23284674e+09 1.51991108e+09 1.87381742e+09
 2.31012970e+09 2.84803587e+09 3.51119173e+09 4.32876128e+09
 5.33669923e+09 6.57933225e+09 8.11130831e+09 1.00000000e+10]

"""
```


# 坐标轴系统（Projection）

## 笛卡尔坐标系（直角坐标系）

```Python
fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/0a609468-893f-4e04-aa7c-1d22d8a69c36/image.png?time=1747467000&token=83006b9f31f565a90e9b3933f77a5ceb7c24eb88bec3dc4a3a1f50a3736dc70c&role=sharePaid)

## 极坐标系

基于角度和半径，适用于表示旋转和周期性数据。与直角坐标系的转换：

1. $x = r\cos(\theta)$

2. $y = r\sin(\theta)$

```Python
theta = np.linspace(0, 2 * np.pi, 100)
r = 1 + np.sin(theta)

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111, projection="polar")

ax.plot(theta, r)

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/6f7dcb9c-eaf1-4623-8d35-c3f48bbf0712/image.png?time=1747467000&token=08636f7b015046944a687e05e0211274dda044ae87c2bc0279818f6359af2ee0&role=sharePaid)

## 3D坐标系

```Python
x = np.random.randn(100)
y = np.random.randn(100)
z = np.random.randn(100)

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111, projection="3d")

ax.plot(x, y, z)

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/e62062db-2a72-4de4-9f8f-df9552f3a945/image.png?time=1747467000&token=40e86154e7ff18ff10a8c3ceec6ba9d8a329f1f9b76c990f253c5cb51bd4e216&role=sharePaid)

# 边界（Spines）

[matplotlib.spines — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/spines_api.html#matplotlib.spines.Spine)


[Spines — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/gallery/spines/index.html#spines-examples)


在Matplotlib中，spines是围绕Axes边界的四条线（上下左右)，它们定义了数据绘图区域的边框。Spines可以用来设置图形的外框线，帮助强调不同的坐标轴。可以根据需要自定义这些边框，比如隐藏某些边框、调整它们的位置、更改颜色和线宽等

3. `Axes.spines.left/right/top/bottom`或`Axes.spines["left/right/top/bottom"]`：选择一个spine

4. `Axes.spines[["left/right/top/bottom", "...", "...", "..."]]`：选择多个spine

### 可见/隐藏（.set_visible）与位置(.set_position)

`.set_position((position type, amount))`传入一个元组或字符串，元组中position type包括：

5. **"outward"**：从数据区域向外（负值向内）移动指定点数

6. **"axes"**：放置在Axes坐标系中指定位置

7. **"data"**：放置在数据坐标系中指定位置

此外，字符串"center"等价于("axes", 0.5)；"zero"等价于("data", 0.0)

```Python
fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)

ax.spines[["top", "right"]].set_visible(False)
ax.spines["left"].set_position(("data", 5))
# ax.spines["left"].set_position(("axes", 0.5))
# ax.spines["left"].set_position(("outward", -275))

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/d3eb5b3a-068b-4ff3-a7d2-923305a0b940/image.png?time=1747467000&token=e99ca951eb814bcd1430d22f592a914c03a2cf13e71d107ead688758cc186eea&role=sharePaid)

## 其它（Patch父类参数）

```Python
fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)

ax.spines[["top", "right"]].set_visible(False)
ax.spines["left"].set(bounds=(0.2e10, 0.8e10),
                      linestyle="--",
                      linewidth=5,
                      capstyle="round",
                      color="red",
                      alpha=1)

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/82a8a14a-5dad-46b3-ac12-d856cb2f4ece/image.png?time=1747467000&token=35a285a447ff4551f2ae00cc140733d778c52178690483fea0fb21a52856c207&role=sharePaid)

## seaborn中的despine函数

[Controlling figure aesthetics — seaborn 0.13.2 documentation](https://seaborn.pydata.org/tutorial/aesthetics.html#removing-axes-spines)


[seaborn.despine — seaborn 0.13.2 documentation](https://seaborn.pydata.org/generated/seaborn.despine.html#seaborn.despine)


```Python
fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)

sns.despine(fig=None,                  # 针对指定Figure中所有Axes的spine
            ax=ax,                     # 针对指定Axes中的spine（指定fig参数时忽略）
            top=True,                  # 移除顶部spine
            right=True,                # 移除右侧spine
            left=False,                # 移除左侧spine
            bottom=False,              # 移除底部spine
            offset={"left": -275,      # spine偏离Axes的绝对距离（以点为单位，负值表示向内）：单值应用于所有spine，字典分别指定
                    "bottom": -275},
            trim=True                  # 将spine长度限制在最小和最大主刻度之间
            )

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/910edef2-8faa-474e-9423-8cab64c35cd7/image.png?time=1747467000&token=80060b0e430c33e68628930ab726e4deb7ec57f2a3f203f68fa410539aca5d81&role=sharePaid)

# 比例（Scales）

[Axis scales — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/users/explain/axes/axes_scales.html)


坐标轴比例(Axis Scales)的作用是控制数据在坐标轴上的展示方式。通过选择不同的比例，可以改变数据在图中的分布方式，从而更清晰地呈现出数据的特征。比如，使用线性比例会让数据均匀分布，而对数比例侧适合处理跨度较大的数据，突出细节变化。不同的比例能帮助更好地分析和解释数据。

**本质**：坐标轴进行缩放，而标签仍然显示原始数值（即轴压缩或拉伸）。如在默认的线性坐标轴中，坐标轴的点a对应数据点a；而进行对数转换后，坐标轴的点log(a)对应数据点a。

## 内置scales

```Python
mpl.scale.get_scale_names()
"""
['asinh', 'function', 'functionlog', 'linear', 'log', 'logit', 'symlog']
"""
```


|**类型**|**参数**|**描述**|
|-|-|-|
|**[log](https://matplotlib.org/stable/api/scale_api.html#matplotlib.scale.LogScale)**|base=10
subs=None
nonpositive='clip'|数据按对数方式缩放，适用于数据跨越多个数量级的场景，特别是**指数增长的数据**。|
|**[logit](https://matplotlib.org/stable/api/scale_api.html#matplotlib.scale.LogitScale)**|nonpositive='mask'
one_half='\frac{1}{2}'
use_overline=False|常用于显示概率或分类数据，在「0,1]区间内以逻辑函数缩放。适合处理百分比或概率数据的场景。|
|**[asinh](https://matplotlib.org/stable/api/scale_api.html#matplotlib.scale.AsinhScale)**|linear_width=1.0
base=10
subs='auto'|类似于对数比例，但能够处理正负数据，且对小数值更敏感。适用于范围较广的数据，尤其是正负值共存的情况。|
|**[symlog](https://matplotlib.org/stable/api/scale_api.html#matplotlib.scale.SymmetricalLogScale)**|base=10
linthresh=2
subs=None
linscale=1|能够同时处理正值和负值的对数缩放，适合跨越正负区间的数据|
|**linear**|无（默认）|数据按照线性方式映射到坐标轴，适合**数据值变化平稳、没有极端增长或减少的情况**。|
|**[function](https://matplotlib.org/stable/api/scale_api.html#matplotlib.scale.FuncScale)**|functions|可以让用户自定义数据的缩放方式，通过提供前向和逆向函数来自定义映身适合需要特殊转换的场景。|
|**[functionlog](https://matplotlib.org/stable/api/scale_api.html#matplotlib.scale.FuncScaleLog)**|functions
base=10|通过自定义的对数和逆对数函数来缩放数据，适用于需要灵活控制对数变换的情况，比如处理非常小的正数。|

```Python
fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/0a609468-893f-4e04-aa7c-1d22d8a69c36/image.png?time=1747467000&token=83006b9f31f565a90e9b3933f77a5ceb7c24eb88bec3dc4a3a1f50a3736dc70c&role=sharePaid)

```Python
fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)
ax.set_yscale('log', base=10)

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c53aafef-a36a-4d7f-8964-1b6330a9e320/image.png?time=1747467000&token=315955a027bd3834d3adbb367979c692cb7a71a996d2ef9f0fde1e7f35394701&role=sharePaid)

## 辅助函数

```Python
# ax.semilogy(x, y)
ax.plot(x, y)
ax.set_yscale('log')

# ax.semilogx(x, y)
ax.plot(x, y)
ax.set_xscale('log')

# ax.loglog(x, y)
ax.plot(x, y)
ax.set_yscale('log')
ax.set_xscale('log')
```


## scale类型获取

```Python
ax.xaxis.get_scale()
ax.yaxis.get_scale()
```


# 刻度（Ticks）

每个坐标轴(Axis)上的x轴和y轴都有默认的刻度(Ticks)和刻度标签(Tick labels)，刻度分为主刻度(major ticks)和次刻度(minor ticks),相应地，刻度标签也分为主刻度标签和次刻度标签。刻度用于标示坐标轴上的数据范围和间隔，而刻度标签则为这些刻度提供相应的文字或数值说明。

![image.png](https://tc-cdn.flowus.cn/oss/4c7a7c65-c1e6-4a27-9b55-bd86d9adcf8e/image.png?time=1747467000&token=2292c6f9eca6460c429ea3bdc2ad339d59d5b20e1065fb5c6ab4f7a8e4b90b23&role=sharePaid)

## 位置（ticks）与标签（ticklabels）

[matplotlib.axes.Axes.set_xticks — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.set_xticks.html#matplotlib.axes.Axes.set_xticks)


[matplotlib.axes.Axes.set_yticks — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.set_yticks.html#matplotlib.axes.Axes.set_yticks)


[matplotlib.axes.Axes.set_xticklabels — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.set_xticklabels.html#matplotlib.axes.Axes.set_xticklabels)


[matplotlib.axes.Axes.set_yticklabels — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.set_yticklabels.html#matplotlib.axes.Axes.set_yticklabels)


可以使用`set_xticks`来自定义x轴的刻度位置（基于数据），使用`set_xticklabels`自定义x轴的刻度标签；同样，使用`set_yticks`来自定义y轴的刻度位置（基于数据），而`set_yticklabels`则用于自定义y轴的刻度标签。

```Python
x = np.linspace(1, 10, 100)
y = np.logspace(1, 10, 100, base=10)

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)
ax.set_yscale('log', base=10)

ax.set_yticks(ticks=np.logspace(2, 10, 5, base=10),
              minor=False,                       # False仅设置主刻度
              labels=[2, 4, 6, 8, 10],           # 长度必须与刻度数量一致

              # Text参数：仅当设置labels参数时使用
              fontsize=20,
              rotation=45
              )
# ax.set_yticklabels(labels=[2, 4, 6, 8, 10],    # 长度必须与刻度数量一致
#                    minor=False,
#
#                    #Text参数
#                    fontsize=20,
#                    rotation=45
#                    )

ax.set_yticks(ticks=np.logspace(3, 9, 4, base=10),
              minor=True,                        # True仅设置副刻度
              labels=[3, 5, 7, 9],               # 长度必须与刻度数量一致

              # Text参数：仅当设置labels参数时使用
              fontsize=10,
              color="red",
              rotation=45
              )
# ax.set_yticklabels(labels=[3, 5, 7, 9],        # 长度必须与刻度数量一致
#                    minor=True,
#
#                    # Text参数
#                    fontsize=10,
#                    color="red",
#                    rotation=45
#                    )

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/1db8e6f5-e0be-47f4-87c8-c7c3a8f5e570/image.png?time=1747467000&token=453efbdb94efdfe1de49e67e4b4aa852e7194d50958fe37035416649e3236999&role=sharePaid)

## 外观（tick_params）

[matplotlib.axes.Axes.tick_params — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.tick_params.html#matplotlib.axes.Axes.tick_params)


```Python
x = np.linspace(1, 10, 100)
y = np.logspace(1, 10, 100, base=10)

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)
ax.set_yscale('log', base=10)

ax.set_yticks(ticks=np.logspace(2, 10, 5, base=10),
              minor=False,
              )
ax.set_yticks(ticks=np.logspace(3, 9, 4, base=10),
              minor=True,
              )
ax.tick_params(axis='both',                # 'x', 'y', 'both'(默认)
               which='major',              # 'major'(默认), 'minor', 'both'
               reset=False,                # 是否在更新之前将刻度重置为默认值

               # 刻度线
               direction='inout',          # 'in', 'out'(默认), 'inout'
               length=15,                  # 长度（以点为单位）
               width=5,                    # 宽度（以点为单位）
               color='r',                  # 颜色

               # 刻度标签
               labelfontfamily='serif',    # 字体
               labelsize=14,               # 字体大小
               labelcolor='b',             # 字体颜色
               labelrotation=45,           # 旋转角度

               # 刻度线和标签
               # colors="y",               # 颜色(未分别设置时)
               pad=20,                     # 间距（以点为单位）
               zorder=0,                   # 绘制优先级

               # 网格线
               grid_linestyle="--",        # 线型
               grid_linewidth=5,           # 宽度（以点为单位）
               grid_color="g",             # 颜色
               grid_alpha=1,               # 透明度

               # 对应边的刻度与刻度标签
               bottom=True, top=True, left=True, right=True,
               labelbottom=True, labeltop=True, labelleft=True, labelright=True
               )
ax.grid()

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/c7e43bde-543a-4049-9fd1-c6ac8f05620b/image.png?time=1747467000&token=3c57d18b805904b7d947f36b0353fd7df8ae1ffa74c347c2aa12cef23711c872&role=sharePaid)

```Python
ax.yaxis.get_tick_params(which='major')
# ax.xaxis.get_tick_params(which='major')
"""
{'length': 15, 
 'direction': 'inout', 
 'rotation': 45, 
 'left': True, 
 'right': True, 
 'labelleft': True, 
 'labelright': True, 
 'gridOn': True, 
 'width': 5, 
 'color': 'r', 
 'labelfontfamily': 'serif', 
 'labelsize': 14, 
 'labelcolor': 'b', 
 'pad': 20, 
 'zorder': 0, 
 'grid_linestyle': '--', 
 'grid_linewidth': 5, 
 'grid_color': 'g', 
 'grid_alpha': 1}
"""
```


## 刻度定位器（Locator）

[matplotlib.axis.Axis.set_major_locator — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axis.Axis.set_major_locator.html#matplotlib.axis.Axis.set_major_locator)


[matplotlib.axis.Axis.set_minor_locator — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axis.Axis.set_minor_locator.html#matplotlib.axis.Axis.set_minor_locator)


|**定位器**|**参数**|**描述**|
|-|-|-|
|[AutoLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.AutoLocator)|/|使用简单默认值（nbins = 'auto' 和 steps = [1, 2, 2.5, 5, 10]）的MaxNLocator，均匀放置刻度，步长和最大刻度数自动选择。这是大多数绘图中的默认刻度定位器。|
|[MaxNLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.MaxNLocator)|nbins=10
steps=[]
integer=False
symmetric=False
prune=None
min_n_ticks=2|找到在视图限制内不超过nbins+1个刻度的良好刻度位置，并在合适的位置均匀放置刻度。超出限制的位置被添加以支持自动缩放。|
|[LinearLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.LinearLocator)|numticks=11
presets=None|刻度从最小值到最大值均匀分布。|
|[LogLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.LogLocator)|base=10.0
subs=(1.0,)
numticks=None|刻度从最小值到最大值对数分布。将刻度放置在值 `subs[j] * base**i` 上。|
|[MultipleLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.MultipleLocator)|base=1.0
offset=0.0|将刻度放置在`n * base + offset`处。|
|[FixedLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.FixedLocator)|locs=[]
nbins=None|如果 nbins 为 None，则将所有值放置在locs指定位置上。否则，将对locs 进行子采样以保持刻度数量≤nbins+1。子采样将包括最小的绝对值；例如，如果0包含在locs中，则它将被包含在所选刻度中。|
|[IndexLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.IndexLocator)|base
offset|IndexLocator假设索引绘图，即刻度放置在 0 和 len(data)（包含）之间的整数值范围内。将刻度线放置在从offset开始的每个base数据点上。|
|[NullLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.NullLocator)|/|无刻度。|
|[SymmetricalLogLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.SymmetricalLogLocator)|transform=None
subs=[1]
linthresh=None
base=None|用于与 symlog 规范一起使用的定位器；将刻度设置为在0附近线性分布，在阈值以上对数分布。刻度放置在`[sub * base**i for i in ... for sub in subs]`。|
|[AsinhLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.AsinhLocator)|linear_width
numticks=11
symthresh=0.2
base=10
subs=None|用于与 asinh 规范一起使用的定位器，将刻度大致均匀地放置在反双曲正弦尺度上。|
|[LogitLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.LogitLocator)|minor=False
nbins='auto'|用于logit缩放的定位器。|
|[AutoMinorLocator](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.AutoMinorLocator)|n='auto'|当轴为线性且主刻度均匀分布时用于副刻度的定位器。将主刻度间隔细分为n间隔数，默认为 4 或 5，具体取决于主刻度间隔。|

```Python
import matplotlib.ticker as ticker

x = np.linspace(1, 10, 100)
y = np.logspace(1, 10, 100, base=10)

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)
ax.set_yscale('log')

ax.yaxis.set_major_locator(ticker.FixedLocator([1e5, 1e6, 1e7, 1e8, 1e9]))
ax.xaxis.set_minor_locator(ticker.AutoMinorLocator())

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/3d82968f-4fb6-4e28-b719-4568bfb2d37a/image.png?time=1747467000&token=c213a06b2724f006481ea82e9833341dc9035aee74d3785b210d473d54d1a6ab&role=sharePaid)

## 标签格式器（Formatter）

[matplotlib.axis.Axis.set_major_formatter — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axis.Axis.set_major_formatter.html#matplotlib.axis.Axis.set_major_formatter)


[matplotlib.axis.Axis.set_minor_formatter — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axis.Axis.set_minor_formatter.html#matplotlib.axis.Axis.set_minor_formatter)


|**格式器**|**参数**|**描述**|
|-|-|-|
|[NullFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.NullFormatter)||无刻度标签。|
|[FixedFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.FixedFormatter)|seq|手动设置标签的字符串。|
|[FuncFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.FuncFormatter)|func|自定义函数设置标签。函数应接受两个输入（一个刻度值 x 和一个位置 pos ），并返回一个包含相应刻度标签的字符串。|
|[StrMethodFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.StrMethodFormatter)|fmt|使用新式格式字符串（如 `str.format` 所用）来格式化刻度。通常没有必要显式构造 StrMethodFormatter 对象，因为 set_major_formatter 直接接受格式字符串本身。|
|[FormatStrFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.FormatStrFormatter)|fmt|使用旧式（'%' 操作符）格式字符串来格式化刻度。|
|[ScalarFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.ScalarFormatter)|useOffset=True
useMathText=False
useLocale=False
usetex=False|默认标量格式化器：自动选择格式字符串。|
|[LogFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.LogFormatter)|base=10.0
labelOnlyBase=False
minor_thresholds=None
linthresh=None
|log格式化器。|
|[LogFormatterExponent](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.LogFormatterExponent)||使用 `exponent = log_base(value)`格式化对数轴的值 。|
|[LogFormatterMathtext](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.LogFormatterMathtext)||使用 `exponent = log_base(value)` 格式化对数轴的值，并以数学文本格式显示。|
|[LogFormatterSciNotation](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.LogFormatterSciNotation)||使用科学记数法格式化对数轴的值。|
|[LogitFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.LogitFormatter)|use_overline=False
one_half='\frac{1}{2}'
minor=False
minor_threshold=25
minor_number=6| logit格式化器。|
|[EngFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.EngFormatter)|unit=''
places=None
sep=' '
usetex=None
useMathText=None
useOffset=False|格式化标签为工程记数法。使用工程前缀表示 1000 的幂次，加上指定的单位，例如，使用 10 MHz 而不是 1e7 表示轴值。|
|[PercentFormatter](https://matplotlib.org/stable/api/ticker_api.html#matplotlib.ticker.PercentFormatter)|xmax=100
decimals=None
symbol='%'
is_latex=False|格式化标签为百分比。|

```Python
import matplotlib.ticker as ticker

x = np.linspace(1, 10, 100)
y = np.logspace(1, 10, 100, base=10)

fig = plt.figure(figsize=(10, 10))
ax = fig.add_subplot(111)

ax.plot(x, y)
ax.set_yscale('log')

ax.yaxis.set_major_locator(ticker.FixedLocator([1e5, 1e6, 1e7, 1e8, 1e9]))
ax.xaxis.set_minor_locator(ticker.AutoMinorLocator())
ax.yaxis.set_major_formatter(ticker.EngFormatter(unit="MHz"))
ax.xaxis.set_minor_formatter(ticker.PercentFormatter(xmax=10))

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/e9b73732-782a-40d7-8272-afe7fd4818bc/image.png?time=1747467000&token=730edb4ff6f8c4478c2ae2d7b056befd8ca2c9f3e0c2612e4f2ecb2895625adc&role=sharePaid)

# 范围与反转（lim、bound、invert）

[matplotlib.axes.Axes.set_xlim — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.set_xlim.html#matplotlib.axes.Axes.set_xlim)


[matplotlib.axes.Axes.set_ylim — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.set_ylim.html#matplotlib.axes.Axes.set_ylim)


[matplotlib.axes.Axes.set_xbound — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.set_xbound.html#matplotlib.axes.Axes.set_xbound)


[matplotlib.axes.Axes.set_ybound — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.set_ybound.html#matplotlib.axes.Axes.set_ybound)


[matplotlib.axes.Axes.invert_xaxis — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.invert_xaxis.html#matplotlib.axes.Axes.invert_xaxis)


[matplotlib.axes.Axes.invert_yaxis — Matplotlib 3.10.1 documentation](https://matplotlib.org/stable/api/_as_gen/matplotlib.axes.Axes.invert_yaxis.html#matplotlib.axes.Axes.invert_yaxis)


```Python
x = np.linspace(1, 10, 100)
y = np.logspace(1, 10, 100, base=10)

fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

ax.plot(x, y)
ax.set_yscale('log')

ax.set_ylim(bottom=100,
            # ymin=100,
            top=1000,
            # ymax=1000,

            # emit=True,
            # auto=True
            )
# ax.set_ybound(lower=100, upper=1000)    # 不影响轴的方向
ax.invert_yaxis()

ax.set_xlim(left=2,
            # xmin=2,
            right=2.5,
            # xmax=2.5,

            # emit=True,
            # auto=True
            )
# ax.set_xbound(lower=2, upper=2.5)        # 不影响轴的方向
ax.invert_xaxis()

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/b19cca6b-80a1-4393-834f-b07ec91ffe2e/image.png?time=1747467000&token=0aeac3632ff0b2ba048efcabe2a5c5080dae57d3e24bf0dbb9822bf2ba6742c4&role=sharePaid)

