[statannotations-tutorials/Tutorial_1/Statannotations-Tutorial-1.ipynb at main · trevismd/statannotations-tutorials](https://github.com/trevismd/statannotations-tutorials/blob/main/Tutorial_1/Statannotations-Tutorial-1.ipynb)


[tips.csv](https://flowus.cn/preview/a891658f-ccc2-438a-bedc-abf6d951a0cb)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd
from statannotations.Annotator import Annotator

tips = pd.read_csv('../Data/tips.csv')
```


![image.png](https://tc-cdn.flowus.cn/oss/54338892-e7f7-4215-b6b9-dde2910cca32/image.png?time=1747467900&token=e58a6ee658a8d6ec0ed3e62a4c4ee1817561848ee594e163085db74f19b497c2&role=sharePaid)

# 自定义注释

`Annotator`类直接接受seaborn对应绘图函数的参数，最重要的是数据、分组、亚分组及分组顺序相关的参数，即`data`、`x`、`y`、`order`、`hue`、`hue_order`以及子图`ax`参数。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

plot_params = {'data': tips,
               'x': 'day',
               'y': 'total_bill',
               'order': ['Thur', 'Fri', 'Sat', 'Sun'],
               'hue': 'day',
               'palette': ['#ffa200', '#c8ff00', '#00ffe5', '#ee00ff'],
               'width': 0.5,
               'linecolor': 'k',
               'linewidth': 2,
               'ax': ax,
               }
pairs = [('Thur', 'Fri'),
         ('Thur', 'Sat'),
         ('Thur', 'Sun'),
         ('Fri', 'Sat'),
         ('Fri', 'Sun'),
         ('Sat', 'Sun')]
custom_annotations = [f"pvalue={p:.2e}" for p in [6.477e-01, 1.276e-01, 3.585e-01, 4.690e-02, 2.680e-02, 5.363e-03]]

sns.boxplot(**plot_params)

annotator = Annotator(pairs=pairs,                # 比对的组
                      engine='seaborn',           # 绘图引擎，目前仅支持seaborn
                      plot='boxplot',             # 绘图类型
                      verbose=True,               # 是否打印日志
                      **plot_params               # seaborn函数绘图参数
                      )
annotator.configure(color='r',                    # 线条颜色
                    line_height=0.02,             # 线条高度
                    line_width=1,                 # 线条宽度
                    loc='inside',                 # 'inside'绘制在Axes内; 'outside'绘制在Axes外
                    text_offset=1,                # 文本垂直偏移量
                    fontsize=15,                  # 字体大小
                    verbose=True
                    )
annotator.set_custom_annotations(custom_annotations)
annotator.annotate()
# annotator.annotate_custom_annotations(custom_annotations)
"""
p-value annotation legend:
      ns: 5.00e-02 < p <= 1.00e+00
       *: 1.00e-02 < p <= 5.00e-02
      **: 1.00e-03 < p <= 1.00e-02
     ***: 1.00e-04 < p <= 1.00e-03
    ****: p <= 1.00e-04

Thur vs. Fri: pvalue=6.48e-01
Fri vs. Sat: pvalue=4.69e-02
Sat vs. Sun: pvalue=5.36e-03
Thur vs. Sat: pvalue=1.28e-01
Fri vs. Sun: pvalue=2.68e-02
Thur vs. Sun: pvalue=3.58e-01

(<Axes: xlabel='day', ylabel='total_bill'>,
 [<statannotations.Annotation.Annotation at 0x1afb5a57980>,
  <statannotations.Annotation.Annotation at 0x1afbff4b530>,
  <statannotations.Annotation.Annotation at 0x1afc0867830>,
  <statannotations.Annotation.Annotation at 0x1afc0831130>,
  <statannotations.Annotation.Annotation at 0x1afc0951910>,
  <statannotations.Annotation.Annotation at 0x1afc11f8950>])
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/1ce7eacb-8444-47f1-91d6-ba2ca2f20836/image.png?time=1747467900&token=70344c546bdd1057fed4627867166ec27ed310fcfab2f1931ff454532b13ee3c&role=sharePaid)

# 自动格式化p值

p值的格式化有三种形式：`'full'`, `'simple'`, `'star'`。通过`text_format`参数设置。

1. `'full'`：注释格式为**'检验方法名 p = 输入p值的格式化形式'**。输入p值的格式化形式通过`pvalue_format_string`参数设置，默认为`'{:.3e}'`。

2. `'simple'`：对于小于或等于某个值（阈值）的p值注释格式为**'p ≤ 设定格式'**，而对于大于所设置阈值的最大值的p值注释格式为**'p = 输入p值的格式化形式'**。阈值及对应格式通过`pvalue_thresholds`参数设置，默认为`[[1e-5, "1e-5"], [1e-4, "1e-4"], [1e-3, "0.001"], [1e-2, "0.01"], [5e-2, "0.05"]]`，一般使用默认值即可。输入p值的格式化形式通过`pvalue_format_string`参数设置，默认为`'{:.2f}'`。

3. `'star'`**（默认）**：对于小于或等于某个值（阈值）的p值注释格式为**'设定格式'**，而对于大于所设置阈值的最大值的p值则不注释。阈值及对应格式通过`pvalue_thresholds`参数设置，默认为`[[1e-4, "****"], [1e-3, "***"], [1e-2, "**"], [0.05, "*"], [1, "ns"]]`，一般使用默认值即可。

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

plot_params = {'data': tips,
               'x': 'day',
               'y': 'total_bill',
               'order': ['Thur', 'Fri', 'Sat', 'Sun'],
               'hue': 'day',
               'palette': ['#ffa200', '#c8ff00', '#00ffe5', '#ee00ff'],
               'width': 0.5,
               'linecolor': 'k',
               'linewidth': 2,
               'ax': ax,
               }
pairs = [('Thur', 'Fri'),
         ('Thur', 'Sat'),
         ('Thur', 'Sun'),
         ('Fri', 'Sat'),
         ('Fri', 'Sun'),
         ('Sat', 'Sun')]
pvalues = [6.477e-01, 1.276e-01, 3.585e-01, 4.690e-02, 2.680e-02, 5.363e-03]

sns.boxplot(**plot_params)

annotator = Annotator(pairs=pairs, **plot_params)
annotator.configure(fontsize=15, 

                    text_format='simple',
                    pvalue_thresholds=[[1e-5, "1e-5"], [1e-4, "1e-4"], [1e-3, "0.001"], [1e-2, "0.01"], [5e-2, "0.05"]],
                    pvalue_format_string='{:.2f}',

                    alpha=0.05,                       # 显著性阈值
                    hide_non_significant=False,       # 隐藏无显著性的组间注释
                    p_capitalized=True,               # p字母是否大写
                    p_separators=(" ", " "),          # 等号前后间隔符号：'both'(True)==(" ", " "), 'after'==("", " "), 'none'(False)==("", "")

                    test_short_name='M.W.W'           # 计算p值所使用的检验方法名称
                    )
annotator.set_pvalues(pvalues)
annotator.annotate()
# annotator.set_pvalues_and_annotate(pvalues)
"""
Thur vs. Fri: Custom statistical test, P_val:6.477e-01
Fri vs. Sat: Custom statistical test, P_val:4.690e-02
Sat vs. Sun: Custom statistical test, P_val:5.363e-03
Thur vs. Sat: Custom statistical test, P_val:1.276e-01
Fri vs. Sun: Custom statistical test, P_val:2.680e-02
Thur vs. Sun: Custom statistical test, P_val:3.585e-01

(<Axes: xlabel='day', ylabel='total_bill'>,
 [<statannotations.Annotation.Annotation at 0x2651bdb1280>,
  <statannotations.Annotation.Annotation at 0x2651b4d98b0>,
  <statannotations.Annotation.Annotation at 0x2651b4cd7f0>,
  <statannotations.Annotation.Annotation at 0x2651b4cd190>,
  <statannotations.Annotation.Annotation at 0x2651bda3cb0>,
  <statannotations.Annotation.Annotation at 0x2651bda37a0>])
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/2c9c8069-279c-4f05-80a1-ef09711d697c/image.png?time=1747467900&token=50a9f9e539a90e1a77249354036c9aa96a43dea2963616da3a5a13c4776e0072&role=sharePaid)

# 带亚组（hue）的注释

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

plot_params = {'data': tips,
               'x': 'sex',
               'y': 'total_bill',
               'order': ['Female', 'Male'],
               'hue': 'day',
               'hue_order': ['Thur', 'Fri', 'Sat', 'Sun'],
               'palette': ['#ffa200', '#c8ff00', '#00ffe5', '#ee00ff'],
               'width': 0.5,
               'linecolor': 'k',
               'linewidth': 2,
               'ax': ax,
               }
pairs = [[('Female', 'Thur'), ('Female', 'Fri')],
         [('Female', 'Thur'), ('Female', 'Sat')],
         [('Female', 'Thur'), ('Female', 'Sun')],
         [('Female', 'Fri'), ('Female', 'Sat')],
         [('Female', 'Fri'), ('Female', 'Sun')],
         [('Female', 'Sat'), ('Female', 'Sun')],
         [('Male', 'Thur'), ('Male', 'Fri')],
         [('Male', 'Thur'), ('Male', 'Sat')],
         [('Male', 'Thur'), ('Male', 'Sun')],
         [('Male', 'Fri'), ('Male', 'Sat')],
         [('Male', 'Fri'), ('Male', 'Sun')],
         [('Male', 'Sat'), ('Male', 'Sun')]]
pvalues = [5.287e-01, 6.087e-02, 1.059e-01, 8.600e-02, 4.768e-02, 9.372e-01, 9.378e-01, 4.740e-01, 1.131e-01, 7.916e-01, 3.587e-01, 3.211e-01]

sns.boxplot(**plot_params)

annotator = Annotator(pairs=pairs, **plot_params)
annotator.configure(fontsize=15, text_format='simple', test_short_name='M.W.W')
annotator.set_pvalues_and_annotate(pvalues)
"""
Female_Thur vs. Female_Fri: Custom statistical test, P_val:5.287e-01
Female_Fri vs. Female_Sat: Custom statistical test, P_val:8.600e-02
Female_Sat vs. Female_Sun: Custom statistical test, P_val:9.372e-01
Male_Thur vs. Male_Fri: Custom statistical test, P_val:9.378e-01
Male_Fri vs. Male_Sat: Custom statistical test, P_val:7.916e-01
Male_Sat vs. Male_Sun: Custom statistical test, P_val:3.211e-01
Female_Thur vs. Female_Sat: Custom statistical test, P_val:6.087e-02
Female_Fri vs. Female_Sun: Custom statistical test, P_val:4.768e-02
Male_Thur vs. Male_Sat: Custom statistical test, P_val:4.740e-01
Male_Fri vs. Male_Sun: Custom statistical test, P_val:3.587e-01
Female_Thur vs. Female_Sun: Custom statistical test, P_val:1.059e-01
Male_Thur vs. Male_Sun: Custom statistical test, P_val:1.131e-01

(<Axes: xlabel='sex', ylabel='total_bill'>,
 [<statannotations.Annotation.Annotation at 0x265190c3530>,
  <statannotations.Annotation.Annotation at 0x2651b4b6480>,
  <statannotations.Annotation.Annotation at 0x2651bd71490>,
  <statannotations.Annotation.Annotation at 0x2651be640b0>,
  <statannotations.Annotation.Annotation at 0x2651be65d30>,
  <statannotations.Annotation.Annotation at 0x2651cf6d190>,
  <statannotations.Annotation.Annotation at 0x2651d79c9b0>,
  <statannotations.Annotation.Annotation at 0x2651a8cc0e0>,
  <statannotations.Annotation.Annotation at 0x2651cf1af30>,
  <statannotations.Annotation.Annotation at 0x2651aa2e090>,
  <statannotations.Annotation.Annotation at 0x2651a99c080>,
  <statannotations.Annotation.Annotation at 0x2651923ef60>])
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/5cbeb517-a3a3-4d9a-b77a-246783460d59/image.png?time=1747467900&token=fed363b4a4df86a92d08a85154b0a82f9859ad804ef047a9da633ca1e7b2d5f9&role=sharePaid)

# 自动应用假设检验

支持的检验方法包括：

"Brunner-Munzel"

4. **Mann-Whitney：**`"Mann-Whitney"`、`"Mann-Whitney-gt"`、`"Mann-Whitney-1s"`

5. **t-test：**`"t-test_ind"`、`"t-test_paired"`

6. **Welch's t-test：**`"t-test_welch"`

7. **Levene test：**`"Levene"`

8. **Wilcoxon test：**`"Wilcoxon"`

9. **Kruskal-Wallis test：**`"Kruskal"`

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

plot_params = {'data': tips,
               'x': 'sex',
               'y': 'total_bill',
               'order': ['Female', 'Male'],
               'hue': 'day',
               'hue_order': ['Thur', 'Fri', 'Sat', 'Sun'],
               'palette': ['#ffa200', '#c8ff00', '#00ffe5', '#ee00ff'],
               'width': 0.5,
               'linecolor': 'k',
               'linewidth': 2,
               'ax': ax,
               }
pairs = [[('Female', 'Thur'), ('Female', 'Fri')],
         [('Female', 'Thur'), ('Female', 'Sat')],
         [('Female', 'Thur'), ('Female', 'Sun')],
         [('Female', 'Fri'), ('Female', 'Sat')],
         [('Female', 'Fri'), ('Female', 'Sun')],
         [('Female', 'Sat'), ('Female', 'Sun')],
         [('Male', 'Thur'), ('Male', 'Fri')],
         [('Male', 'Thur'), ('Male', 'Sat')],
         [('Male', 'Thur'), ('Male', 'Sun')],
         [('Male', 'Fri'), ('Male', 'Sat')],
         [('Male', 'Fri'), ('Male', 'Sun')],
         [('Male', 'Sat'), ('Male', 'Sun')],]

sns.boxplot(**plot_params)

annotator = Annotator(pairs=pairs, **plot_params)
annotator.configure(fontsize=15, text_format='simple',
                    test='Mann-Whitney',
                    show_test_name=True
                    )
annotator.apply_test()    # 可以传入并设置scipy对应假设检验函数的对应参数
annotator.annotate()
# annotator.apply_and_annotate()

annotator.new_plot(pairs=[('Female', 'Male')], data=tips, x='sex', y='total_bill', order=['Female', 'Male'], ax=ax)
annotator.apply_and_annotate()
"""
Female_Thur vs. Female_Fri: Mann-Whitney-Wilcoxon test two-sided, P_val:5.287e-01 U_stat=1.645e+02
Female_Fri vs. Female_Sat: Mann-Whitney-Wilcoxon test two-sided, P_val:8.600e-02 U_stat=7.700e+01
Female_Sat vs. Female_Sun: Mann-Whitney-Wilcoxon test two-sided, P_val:9.372e-01 U_stat=2.480e+02
Male_Thur vs. Male_Fri: Mann-Whitney-Wilcoxon test two-sided, P_val:9.378e-01 U_stat=1.470e+02
Male_Fri vs. Male_Sat: Mann-Whitney-Wilcoxon test two-sided, P_val:7.916e-01 U_stat=2.790e+02
Male_Sat vs. Male_Sun: Mann-Whitney-Wilcoxon test two-sided, P_val:3.211e-01 U_stat=1.528e+03
Female_Thur vs. Female_Sat: Mann-Whitney-Wilcoxon test two-sided, P_val:6.087e-02 U_stat=3.210e+02
Female_Fri vs. Female_Sun: Mann-Whitney-Wilcoxon test two-sided, P_val:4.768e-02 U_stat=4.200e+01
Male_Thur vs. Male_Sat: Mann-Whitney-Wilcoxon test two-sided, P_val:4.740e-01 U_stat=8.020e+02
Male_Fri vs. Male_Sun: Mann-Whitney-Wilcoxon test two-sided, P_val:3.587e-01 U_stat=2.365e+02
Female_Thur vs. Female_Sun: Mann-Whitney-Wilcoxon test two-sided, P_val:1.059e-01 U_stat=2.075e+02
Male_Thur vs. Male_Sun: Mann-Whitney-Wilcoxon test two-sided, P_val:1.131e-01 U_stat=6.895e+02
Female vs. Male: Mann-Whitney-Wilcoxon test two-sided, P_val:2.135e-02 U_stat=5.614e+03

(<Axes: xlabel='sex', ylabel='total_bill'>,
 [<statannotations.Annotation.Annotation at 0x26521f06480>])
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/008269d0-0948-4433-bd59-99640b430527/image.png?time=1747467900&token=e0bf5f80192a433b881fced5cbce42381621b27e14101e6f5e5c32a0c1f88102&role=sharePaid)

# 多重检验p值校正

支持的校正方法包括：

10. **Bonferroni ("bonf")**

11. **Benjamini-Hochberg ("BH")**

12. **Holm-Bonferroni ("HB")**

13. **Benjamini-Yekutieli ("BY")**

```Python
fig = plt.figure(figsize=(8, 8), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

plot_params = {'data': tips,
               'x': 'sex',
               'y': 'total_bill',
               'order': ['Female', 'Male'],
               'hue': 'day',
               'hue_order': ['Thur', 'Fri', 'Sat', 'Sun'],
               'palette': ['#ffa200', '#c8ff00', '#00ffe5', '#ee00ff'],
               'width': 0.5,
               'linecolor': 'k',
               'linewidth': 2,
               'ax': ax,
               }
pairs = [[('Female', 'Thur'), ('Female', 'Fri')],
         [('Female', 'Thur'), ('Female', 'Sat')],
         [('Female', 'Thur'), ('Female', 'Sun')],
         [('Female', 'Fri'), ('Female', 'Sat')],
         [('Female', 'Fri'), ('Female', 'Sun')],
         [('Female', 'Sat'), ('Female', 'Sun')],
         [('Male', 'Thur'), ('Male', 'Fri')],
         [('Male', 'Thur'), ('Male', 'Sat')],
         [('Male', 'Thur'), ('Male', 'Sun')],
         [('Male', 'Fri'), ('Male', 'Sat')],
         [('Male', 'Fri'), ('Male', 'Sun')],
         [('Male', 'Sat'), ('Male', 'Sun')]]

sns.boxplot(**plot_params)

annotator = Annotator(pairs=pairs, **plot_params)
annotator.configure(fontsize=15, text_format='simple',
                    test='Mann-Whitney',
                    show_test_name=True,

                    comparisons_correction="bonferroni"
                    )
annotator.apply_and_annotate()

annotator.new_plot(pairs=[('Female', 'Male')], data=tips, x='sex', y='total_bill', order=['Female', 'Male'], ax=ax)
annotator.apply_and_annotate()
"""
Female_Thur vs. Female_Fri: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=1.645e+02
Female_Fri vs. Female_Sat: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=7.700e+01
Female_Sat vs. Female_Sun: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=2.480e+02
Male_Thur vs. Male_Fri: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=1.470e+02
Male_Fri vs. Male_Sat: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=2.790e+02
Male_Sat vs. Male_Sun: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=1.528e+03
Female_Thur vs. Female_Sat: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:7.305e-01 U_stat=3.210e+02
Female_Fri vs. Female_Sun: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:5.721e-01 U_stat=4.200e+01
Male_Thur vs. Male_Sat: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=8.020e+02
Male_Fri vs. Male_Sun: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=2.365e+02
Female_Thur vs. Female_Sun: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=2.075e+02
Male_Thur vs. Male_Sun: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:1.000e+00 U_stat=6.895e+02
Female vs. Male: Mann-Whitney-Wilcoxon test two-sided with Bonferroni correction, P_val:2.135e-02 U_stat=5.614e+03

(<Axes: xlabel='sex', ylabel='total_bill'>,
 [<statannotations.Annotation.Annotation at 0x26523cd4260>])
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/357db9ad-8f7f-4921-b31a-2d1f3015de40/image.png?time=1747467900&token=f08eff47f5f34eb90cdadd51ca9b11efaf4c150ed494ae860045416b9ec5107b&role=sharePaid)

