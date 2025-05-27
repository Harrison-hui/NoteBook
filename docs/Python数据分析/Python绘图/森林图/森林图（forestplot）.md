[GitHub - LSYS/forestplot: A Python package to make publication-ready but customizable coefficient plots.](https://github.com/LSYS/forestplot/tree/main)


[sleep75.csv](https://flowus.cn/preview/093833a7-0608-44e0-b27f-7712ab682bc2)

[sleep75-des.csv](https://flowus.cn/preview/081c79f6-538f-4999-957b-4b3c6b5ded04)

```Python
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import pandas as pd

import pingouin as pg
import forestplot as fp

pd.set_option("display.unicode.east_asian_width", True)    # 输出列名对齐
pd.set_option("display.max_columns", None)                 # 修改最大列数，防止列显示不全
pd.set_option('display.expand_frame_repr', False)          # 设置不折叠数据

sleep = pd.read_csv('../Data/sleep75.csv', index_col=0)
"""
          age  black  case  clerical  construc  educ  earns74  gdhlth  inlf  leis1  leis2  leis3  smsa   lhrwage    lothinc  male  marr  prot  rlxall  selfe  sleep  slpnaps  south  spsepay  spwrk75  totwrk  union  worknrm  workscnd  exper  yngkid  yrsmarr     hrwage  agesq
rownames                                                                                                                                                                                                                                                                         
1          32      0     1  0.000000  0.000000    12        0       0     1   3529   3479   3479     0  1.955861  10.075380     1     1     1    3163      0   3113     3163      0        0        0    3438      0     3438         0     14       0       13   7.070004   1024
2          31      0     2  0.000000  0.000000    14     9500       1     1   2140   2140   2140     0  0.357674   0.000000     1     0     1    2920      1   2920     2920      1        0        0    5020      0     5020         0     11       0        0   1.429999    961
3          44      0     3  0.000000  0.000000    17    42500       1     1   4595   4505   4227     1  3.021887   0.000000     1     1     0    3038      1   2670     2760      0    20000        1    2815      0     2815         0     21       0        0  20.529997   1936
4          30      0     4  0.000000  0.000000    12    42500       1     1   3211   3211   3211     0  2.263844   0.000000     0     1     1    3083      1   3083     3083      0     5000        1    3786      0     3786         0     12       0       12   9.619998    900
5          64      0     5  0.000000  0.000000    14     2500       1     1   4052   4007   4007     0  1.011601   9.328213     1     1     1    3493      0   3448     3493      0     2400        1    2580      0     2580         0     44       0       33   2.750000   4096
...       ...    ...   ...       ...       ...   ...      ...     ...   ...    ...    ...    ...   ...       ...        ...   ...   ...   ...     ...    ...    ...      ...    ...      ...      ...     ...    ...      ...       ...    ...     ...      ...        ...    ...
702        45      0   702  0.182331  0.030075    12     5500       1     0   5069   4669   4644     1       NaN   9.664660     0     1     1    3410      0   2985     3385      0    16000        1    2026      0     2026         0     27       0       18        NaN   2025
703        34      0   703  0.182331  0.030075    10     2500       0     0   5885   5870   5870     0       NaN   0.000000     1     1     0    3535      0   3520     3535      0        0        0     675      1      465       210     18       0        4        NaN   1156
704        37      0   704  0.182331  0.030075    12     3500       1     0   4719   4719   4584     0       NaN   9.235130     0     1     1    3645      0   3510     3510      0    12000        1    1851      0     1851         0     19       0       17        NaN   1369
705        54      0   705  0.182331  0.030075    17    32500       1     0   5149   5119   5031     0       NaN   9.210441     0     1     1    3088      1   2970     3000      1    35000        1    1961      1     1481       480     31       0       22        NaN   2916
706        30      0   706  0.182331  0.030075    16     6750       1     0   4747   4302   4302     0       NaN   9.940350     0     1     0    3415      0   2970     3415      1        0        0    2363      0     2363         0      8       1        9        NaN    900

[706 rows x 34 columns]

"""

sleep_label = pd.read_csv('../Data/sleep75-des.csv').rename(columns={'des': 'label'})
"""
         var                           label                group
0        age                        in years                  age
1      black                     =1 if black        other factors
2       case                      identifier        other factors
3   clerical           =1 if clerical worker           occupation
4   construc       =1 if construction worker           occupation
5       educ              years of schooling        labor factors
6    earns74            total earnings, 1974        labor factors
7     gdhlth  =1 if in good or excel. health       health factors
8       inlf            =1 if in labor force        labor factors
9      leis1                  sleep - totwrk        other factors
10     leis2                slpnaps - totwrk        other factors
11     leis3                 rlxall - totwrk        other factors
12      smsa              =1 if live in smsa    area of residence
13   lhrwage                 log hourly wage        labor factors
14   lothinc   log othinc, unless othinc < 0        labor factors
15      male                      =1 if male        other factors
16      marr                   =1 if married       family factors
17      prot                =1 if Protestant        other factors
18    rlxall       slpnaps + personal activs  other sleep factors
19     selfe             =1 if self employed        labor factors
20     sleep     mins sleep at night, per wk        other factors
21   slpnaps        minutes sleep, inc. naps  other sleep factors
22     south             =1 if live in south    area of residence
23   spsepay             spousal wage income        other factors
24   spwrk75              =1 if spouse works        other factors
25    totwrk            mins worked per week        labor factors
26     union           =1 if belong to union        labor factors
27   worknrm              mins work main job        labor factors
28  workscnd            mins work second job        labor factors
29     exper                  age - educ - 6        labor factors
30    yngkid      =1 if children < 3 present       family factors
31   yrsmarr                   years married       family factors
32    hrwage                     hourly wage        labor factors
33     agesq                           age^2                  age
"""

# 删除无关变量
sleep.drop(columns=['case', 'leis1', 'leis2', 'leis3'], inplace=True)
"""
          age  black  clerical  construc  educ  earns74  gdhlth  inlf  smsa   lhrwage    lothinc  male  marr  prot  rlxall  selfe  sleep  slpnaps  south  spsepay  spwrk75  totwrk  union  worknrm  workscnd  exper  yngkid  yrsmarr     hrwage  agesq
rownames                                                                                                                                                                                                                                              
1          32      0  0.000000  0.000000    12        0       0     1     0  1.955861  10.075380     1     1     1    3163      0   3113     3163      0        0        0    3438      0     3438         0     14       0       13   7.070004   1024
2          31      0  0.000000  0.000000    14     9500       1     1     0  0.357674   0.000000     1     0     1    2920      1   2920     2920      1        0        0    5020      0     5020         0     11       0        0   1.429999    961
3          44      0  0.000000  0.000000    17    42500       1     1     1  3.021887   0.000000     1     1     0    3038      1   2670     2760      0    20000        1    2815      0     2815         0     21       0        0  20.529997   1936
4          30      0  0.000000  0.000000    12    42500       1     1     0  2.263844   0.000000     0     1     1    3083      1   3083     3083      0     5000        1    3786      0     3786         0     12       0       12   9.619998    900
5          64      0  0.000000  0.000000    14     2500       1     1     0  1.011601   9.328213     1     1     1    3493      0   3448     3493      0     2400        1    2580      0     2580         0     44       0       33   2.750000   4096
...       ...    ...       ...       ...   ...      ...     ...   ...   ...       ...        ...   ...   ...   ...     ...    ...    ...      ...    ...      ...      ...     ...    ...      ...       ...    ...     ...      ...        ...    ...
702        45      0  0.182331  0.030075    12     5500       1     0     1       NaN   9.664660     0     1     1    3410      0   2985     3385      0    16000        1    2026      0     2026         0     27       0       18        NaN   2025
703        34      0  0.182331  0.030075    10     2500       0     0     0       NaN   0.000000     1     1     0    3535      0   3520     3535      0        0        0     675      1      465       210     18       0        4        NaN   1156
704        37      0  0.182331  0.030075    12     3500       1     0     0       NaN   9.235130     0     1     1    3645      0   3510     3510      0    12000        1    1851      0     1851         0     19       0       17        NaN   1369
705        54      0  0.182331  0.030075    17    32500       1     0     0       NaN   9.210441     0     1     1    3088      1   2970     3000      1    35000        1    1961      1     1481       480     31       0       22        NaN   2916
706        30      0  0.182331  0.030075    16     6750       1     0     0       NaN   9.940350     0     1     0    3415      0   2970     3415      1        0        0    2363      0     2363         0      8       1        9        NaN    900

[706 rows x 30 columns]
"""

sleep_label = sleep_label[~sleep_label['var'].isin(['case', 'leis1', 'leis2', 'leis3'])]
"""
         var                           label                group
0        age                        in years                  age
1      black                     =1 if black        other factors
3   clerical           =1 if clerical worker           occupation
4   construc       =1 if construction worker           occupation
5       educ              years of schooling        labor factors
6    earns74            total earnings, 1974        labor factors
7     gdhlth  =1 if in good or excel. health       health factors
8       inlf            =1 if in labor force        labor factors
12      smsa              =1 if live in smsa    area of residence
13   lhrwage                 log hourly wage        labor factors
14   lothinc   log othinc, unless othinc < 0        labor factors
15      male                      =1 if male        other factors
16      marr                   =1 if married       family factors
17      prot                =1 if Protestant        other factors
18    rlxall       slpnaps + personal activs  other sleep factors
19     selfe             =1 if self employed        labor factors
20     sleep     mins sleep at night, per wk        other factors
21   slpnaps        minutes sleep, inc. naps  other sleep factors
22     south             =1 if live in south    area of residence
23   spsepay             spousal wage income        other factors
24   spwrk75              =1 if spouse works        other factors
25    totwrk            mins worked per week        labor factors
26     union           =1 if belong to union        labor factors
27   worknrm              mins work main job        labor factors
28  workscnd            mins work second job        labor factors
29     exper                  age - educ - 6        labor factors
30    yngkid      =1 if children < 3 present       family factors
31   yrsmarr                   years married       family factors
32    hrwage                     hourly wage        labor factors
33     agesq                           age^2                  age
"""
```


# 基础绘制（单模型）

[forestplot/examples/get-sleep.ipynb at main · LSYS/forestplot](https://github.com/LSYS/forestplot/blob/main/examples/get-sleep.ipynb)


```Python
# 计算变量间的成对相关性（Pearson相关性）
sleep_corr = pg.pairwise_corr(sleep).rename(columns={'p-unc': 'p-val'})
"""
           X         Y   method alternative    n         r           CI95%         p-val       BF10     power
0        age     black  pearson   two-sided  706 -0.063647   [-0.14, 0.01]  9.105487e-02      0.196  0.394045
1        age  clerical  pearson   two-sided  706 -0.011861   [-0.09, 0.06]  7.530534e-01       0.05  0.061397
2        age  construc  pearson   two-sided  706  0.018473   [-0.06, 0.09]  6.241168e-01      0.053  0.077924
3        age      educ  pearson   two-sided  706 -0.265831   [-0.33, -0.2]  6.951621e-13  7.005e+09  1.000000
4        age   earns74  pearson   two-sided  706  0.070692    [-0.0, 0.14]  6.046985e-02      0.274  0.467639
..       ...       ...      ...         ...  ...       ...             ...           ...        ...       ...
430   yngkid    hrwage  pearson   two-sided  532 -0.005156   [-0.09, 0.08]  9.055532e-01      0.055  0.051585
431   yngkid     agesq  pearson   two-sided  706 -0.305331  [-0.37, -0.24]  1.063976e-16  3.906e+13  1.000000
432  yrsmarr    hrwage  pearson   two-sided  532  0.110267    [0.03, 0.19]  1.092447e-02      1.373  0.721959
433  yrsmarr     agesq  pearson   two-sided  706  0.583251    [0.53, 0.63]  1.406839e-65  1.139e+62  1.000000
434   hrwage     agesq  pearson   two-sided  532  0.086673     [0.0, 0.17]  4.569576e-02      0.398  0.516054

[435 rows x 10 columns]
"""

# 仅保留其他变量与sleep变量的相关性
sleep_corr.query("Y == 'sleep' | X == 'sleep'", inplace=True)
"""
            X         Y   method alternative    n         r           CI95%          p-val        BF10     power
15        age     sleep  pearson   two-sided  706  0.090373    [0.02, 0.16]   1.630887e-02       0.839  0.671578
43      black     sleep  pearson   two-sided  706 -0.027057    [-0.1, 0.05]   4.728889e-01       0.061  0.110805
70   clerical     sleep  pearson   two-sided  706  0.048081   [-0.03, 0.12]   2.019484e-01       0.106  0.247768
96   construc     sleep  pearson   two-sided  706  0.041229   [-0.03, 0.11]   2.739475e-01       0.086  0.194481
121      educ     sleep  pearson   two-sided  706 -0.095004  [-0.17, -0.02]   1.155151e-02       1.137  0.715052
145   earns74     sleep  pearson   two-sided  706 -0.076890   [-0.15, -0.0]   4.110934e-02       0.378  0.533501
168    gdhlth     sleep  pearson   two-sided  706 -0.102825  [-0.18, -0.03]   6.246660e-03       1.967  0.781649
190      inlf     sleep  pearson   two-sided  706 -0.027126    [-0.1, 0.05]   4.717698e-01       0.061  0.111121
211      smsa     sleep  pearson   two-sided  706 -0.066997   [-0.14, 0.01]   7.524015e-02       0.229  0.428720
231   lhrwage     sleep  pearson   two-sided  532 -0.067197   [-0.15, 0.02]   1.216222e-01       0.179  0.340792
250   lothinc     sleep  pearson   two-sided  706  0.036661   [-0.04, 0.11]   3.306971e-01       0.076  0.163499
268      male     sleep  pearson   two-sided  706 -0.035909   [-0.11, 0.04]   3.407214e-01       0.074  0.158760
285      marr     sleep  pearson   two-sided  706  0.053757   [-0.02, 0.13]   1.536188e-01        0.13  0.297561
301      prot     sleep  pearson   two-sided  706  0.027147    [-0.05, 0.1]   4.714176e-01       0.061  0.111220
316    rlxall     sleep  pearson   two-sided  706  0.867744    [0.85, 0.88]  6.051022e-216  6.697e+211  1.000000
330     selfe     sleep  pearson   two-sided  706  0.001782   [-0.07, 0.08]   9.623058e-01       0.047  0.050233
344     sleep   slpnaps  pearson   two-sided  706  0.893043    [0.88, 0.91]  2.339108e-246   1.38e+242  1.000000
345     sleep     south  pearson   two-sided  706  0.078600     [0.0, 0.15]   3.679946e-02       0.415  0.551599
346     sleep   spsepay  pearson   two-sided  706  0.007881   [-0.07, 0.08]   8.344125e-01       0.048  0.055000
347     sleep   spwrk75  pearson   two-sided  706  0.007868   [-0.07, 0.08]   8.346888e-01       0.048  0.054983
348     sleep    totwrk  pearson   two-sided  706 -0.321384  [-0.39, -0.25]   1.994095e-18   1.961e+15  1.000000
349     sleep     union  pearson   two-sided  706  0.009965   [-0.06, 0.08]   7.915440e-01       0.049  0.058021
350     sleep   worknrm  pearson   two-sided  706 -0.322300  [-0.39, -0.25]   1.577335e-18   2.471e+15  1.000000
351     sleep  workscnd  pearson   two-sided  706  0.001139   [-0.07, 0.07]   9.759034e-01       0.047  0.050082
352     sleep     exper  pearson   two-sided  706  0.104191    [0.03, 0.18]   5.587422e-03       2.175  0.792292
353     sleep    yngkid  pearson   two-sided  706 -0.013262   [-0.09, 0.06]   7.250012e-01        0.05  0.064278
354     sleep   yrsmarr  pearson   two-sided  706  0.063997   [-0.01, 0.14]   8.928507e-02       0.199  0.397636
355     sleep    hrwage  pearson   two-sided  532 -0.049450   [-0.13, 0.04]   2.548774e-01       0.104  0.206828
356     sleep     agesq  pearson   two-sided  706  0.099722    [0.03, 0.17]   8.010946e-03       1.574  0.756346
"""

# 提取变量名并删除部分无关参数
sleep_corr.insert(0, 'var', np.where(sleep_corr['X']=="sleep", sleep_corr['Y'], sleep_corr['X']))
sleep_corr.drop(columns=["X", "Y", "method", "alternative"], inplace=True)
"""
          var    n         r           CI95%          p-val        BF10     power
15        age  706  0.090373    [0.02, 0.16]   1.630887e-02       0.839  0.671578
43      black  706 -0.027057    [-0.1, 0.05]   4.728889e-01       0.061  0.110805
70   clerical  706  0.048081   [-0.03, 0.12]   2.019484e-01       0.106  0.247768
96   construc  706  0.041229   [-0.03, 0.11]   2.739475e-01       0.086  0.194481
121      educ  706 -0.095004  [-0.17, -0.02]   1.155151e-02       1.137  0.715052
145   earns74  706 -0.076890   [-0.15, -0.0]   4.110934e-02       0.378  0.533501
168    gdhlth  706 -0.102825  [-0.18, -0.03]   6.246660e-03       1.967  0.781649
190      inlf  706 -0.027126    [-0.1, 0.05]   4.717698e-01       0.061  0.111121
211      smsa  706 -0.066997   [-0.14, 0.01]   7.524015e-02       0.229  0.428720
231   lhrwage  532 -0.067197   [-0.15, 0.02]   1.216222e-01       0.179  0.340792
250   lothinc  706  0.036661   [-0.04, 0.11]   3.306971e-01       0.076  0.163499
268      male  706 -0.035909   [-0.11, 0.04]   3.407214e-01       0.074  0.158760
285      marr  706  0.053757   [-0.02, 0.13]   1.536188e-01        0.13  0.297561
301      prot  706  0.027147    [-0.05, 0.1]   4.714176e-01       0.061  0.111220
316    rlxall  706  0.867744    [0.85, 0.88]  6.051022e-216  6.697e+211  1.000000
330     selfe  706  0.001782   [-0.07, 0.08]   9.623058e-01       0.047  0.050233
344   slpnaps  706  0.893043    [0.88, 0.91]  2.339108e-246   1.38e+242  1.000000
345     south  706  0.078600     [0.0, 0.15]   3.679946e-02       0.415  0.551599
346   spsepay  706  0.007881   [-0.07, 0.08]   8.344125e-01       0.048  0.055000
347   spwrk75  706  0.007868   [-0.07, 0.08]   8.346888e-01       0.048  0.054983
348    totwrk  706 -0.321384  [-0.39, -0.25]   1.994095e-18   1.961e+15  1.000000
349     union  706  0.009965   [-0.06, 0.08]   7.915440e-01       0.049  0.058021
350   worknrm  706 -0.322300  [-0.39, -0.25]   1.577335e-18   2.471e+15  1.000000
351  workscnd  706  0.001139   [-0.07, 0.07]   9.759034e-01       0.047  0.050082
352     exper  706  0.104191    [0.03, 0.18]   5.587422e-03       2.175  0.792292
353    yngkid  706 -0.013262   [-0.09, 0.06]   7.250012e-01        0.05  0.064278
354   yrsmarr  706  0.063997   [-0.01, 0.14]   8.928507e-02       0.199  0.397636
355    hrwage  532 -0.049450   [-0.13, 0.04]   2.548774e-01       0.104  0.206828
356     agesq  706  0.099722    [0.03, 0.17]   8.010946e-03       1.574  0.756346
"""

# 添加或修改某些参数
sleep_corr['hl'] = [float(ci[1]) for ci in sleep_corr['CI95%']]
sleep_corr['ll'] = [float(ci[0]) for ci in sleep_corr['CI95%']]
sleep_corr['moerror'] = sleep_corr['hl'] - sleep_corr['r']
sleep_corr['power'] = sleep_corr['power'].round(decimals=2)
sleep_corr['n'] = sleep_corr['n'].map(str)
"""
          var    n         r           CI95%          p-val        BF10  power    hl    ll   moerror
15        age  706  0.090373    [0.02, 0.16]   1.630887e-02       0.839   0.67  0.16  0.02  0.069627
43      black  706 -0.027057    [-0.1, 0.05]   4.728889e-01       0.061   0.11  0.05 -0.10  0.077057
70   clerical  706  0.048081   [-0.03, 0.12]   2.019484e-01       0.106   0.25  0.12 -0.03  0.071919
96   construc  706  0.041229   [-0.03, 0.11]   2.739475e-01       0.086   0.19  0.11 -0.03  0.068771
121      educ  706 -0.095004  [-0.17, -0.02]   1.155151e-02       1.137   0.72 -0.02 -0.17  0.075004
145   earns74  706 -0.076890   [-0.15, -0.0]   4.110934e-02       0.378   0.53 -0.00 -0.15  0.076890
168    gdhlth  706 -0.102825  [-0.18, -0.03]   6.246660e-03       1.967   0.78 -0.03 -0.18  0.072825
190      inlf  706 -0.027126    [-0.1, 0.05]   4.717698e-01       0.061   0.11  0.05 -0.10  0.077126
211      smsa  706 -0.066997   [-0.14, 0.01]   7.524015e-02       0.229   0.43  0.01 -0.14  0.076997
231   lhrwage  532 -0.067197   [-0.15, 0.02]   1.216222e-01       0.179   0.34  0.02 -0.15  0.087197
250   lothinc  706  0.036661   [-0.04, 0.11]   3.306971e-01       0.076   0.16  0.11 -0.04  0.073339
268      male  706 -0.035909   [-0.11, 0.04]   3.407214e-01       0.074   0.16  0.04 -0.11  0.075909
285      marr  706  0.053757   [-0.02, 0.13]   1.536188e-01        0.13   0.30  0.13 -0.02  0.076243
301      prot  706  0.027147    [-0.05, 0.1]   4.714176e-01       0.061   0.11  0.10 -0.05  0.072853
316    rlxall  706  0.867744    [0.85, 0.88]  6.051022e-216  6.697e+211   1.00  0.88  0.85  0.012256
330     selfe  706  0.001782   [-0.07, 0.08]   9.623058e-01       0.047   0.05  0.08 -0.07  0.078218
344   slpnaps  706  0.893043    [0.88, 0.91]  2.339108e-246   1.38e+242   1.00  0.91  0.88  0.016957
345     south  706  0.078600     [0.0, 0.15]   3.679946e-02       0.415   0.55  0.15  0.00  0.071400
346   spsepay  706  0.007881   [-0.07, 0.08]   8.344125e-01       0.048   0.06  0.08 -0.07  0.072119
347   spwrk75  706  0.007868   [-0.07, 0.08]   8.346888e-01       0.048   0.05  0.08 -0.07  0.072132
348    totwrk  706 -0.321384  [-0.39, -0.25]   1.994095e-18   1.961e+15   1.00 -0.25 -0.39  0.071384
349     union  706  0.009965   [-0.06, 0.08]   7.915440e-01       0.049   0.06  0.08 -0.06  0.070035
350   worknrm  706 -0.322300  [-0.39, -0.25]   1.577335e-18   2.471e+15   1.00 -0.25 -0.39  0.072300
351  workscnd  706  0.001139   [-0.07, 0.07]   9.759034e-01       0.047   0.05  0.07 -0.07  0.068861
352     exper  706  0.104191    [0.03, 0.18]   5.587422e-03       2.175   0.79  0.18  0.03  0.075809
353    yngkid  706 -0.013262   [-0.09, 0.06]   7.250012e-01        0.05   0.06  0.06 -0.09  0.073262
354   yrsmarr  706  0.063997   [-0.01, 0.14]   8.928507e-02       0.199   0.40  0.14 -0.01  0.076003
355    hrwage  532 -0.049450   [-0.13, 0.04]   2.548774e-01       0.104   0.21  0.04 -0.13  0.089450
356     agesq  706  0.099722    [0.03, 0.17]   8.010946e-03       1.574   0.76  0.17  0.03  0.070278
"""

# 两表合并并删除无关参数
sleep_corr = pd.merge(sleep_corr, sleep_label, on='var', how='inner').drop(columns=['CI95%', 'BF10'])
"""
         var    n         r          p-val  power    hl    ll   moerror                           label                group
0        age  706  0.090373   1.630887e-02   0.67  0.16  0.02  0.069627                        in years                  age
1      black  706 -0.027057   4.728889e-01   0.11  0.05 -0.10  0.077057                     =1 if black        other factors
2   clerical  706  0.048081   2.019484e-01   0.25  0.12 -0.03  0.071919           =1 if clerical worker           occupation
3   construc  706  0.041229   2.739475e-01   0.19  0.11 -0.03  0.068771       =1 if construction worker           occupation
4       educ  706 -0.095004   1.155151e-02   0.72 -0.02 -0.17  0.075004              years of schooling        labor factors
5    earns74  706 -0.076890   4.110934e-02   0.53 -0.00 -0.15  0.076890            total earnings, 1974        labor factors
6     gdhlth  706 -0.102825   6.246660e-03   0.78 -0.03 -0.18  0.072825  =1 if in good or excel. health       health factors
7       inlf  706 -0.027126   4.717698e-01   0.11  0.05 -0.10  0.077126            =1 if in labor force        labor factors
8       smsa  706 -0.066997   7.524015e-02   0.43  0.01 -0.14  0.076997              =1 if live in smsa    area of residence
9    lhrwage  532 -0.067197   1.216222e-01   0.34  0.02 -0.15  0.087197                 log hourly wage        labor factors
10   lothinc  706  0.036661   3.306971e-01   0.16  0.11 -0.04  0.073339   log othinc, unless othinc < 0        labor factors
11      male  706 -0.035909   3.407214e-01   0.16  0.04 -0.11  0.075909                      =1 if male        other factors
12      marr  706  0.053757   1.536188e-01   0.30  0.13 -0.02  0.076243                   =1 if married       family factors
13      prot  706  0.027147   4.714176e-01   0.11  0.10 -0.05  0.072853                =1 if Protestant        other factors
14    rlxall  706  0.867744  6.051022e-216   1.00  0.88  0.85  0.012256       slpnaps + personal activs  other sleep factors
15     selfe  706  0.001782   9.623058e-01   0.05  0.08 -0.07  0.078218             =1 if self employed        labor factors
16   slpnaps  706  0.893043  2.339108e-246   1.00  0.91  0.88  0.016957        minutes sleep, inc. naps  other sleep factors
17     south  706  0.078600   3.679946e-02   0.55  0.15  0.00  0.071400             =1 if live in south    area of residence
18   spsepay  706  0.007881   8.344125e-01   0.06  0.08 -0.07  0.072119             spousal wage income        other factors
19   spwrk75  706  0.007868   8.346888e-01   0.05  0.08 -0.07  0.072132              =1 if spouse works        other factors
20    totwrk  706 -0.321384   1.994095e-18   1.00 -0.25 -0.39  0.071384            mins worked per week        labor factors
21     union  706  0.009965   7.915440e-01   0.06  0.08 -0.06  0.070035           =1 if belong to union        labor factors
22   worknrm  706 -0.322300   1.577335e-18   1.00 -0.25 -0.39  0.072300              mins work main job        labor factors
23  workscnd  706  0.001139   9.759034e-01   0.05  0.07 -0.07  0.068861            mins work second job        labor factors
24     exper  706  0.104191   5.587422e-03   0.79  0.18  0.03  0.075809                  age - educ - 6        labor factors
25    yngkid  706 -0.013262   7.250012e-01   0.06  0.06 -0.09  0.073262      =1 if children < 3 present       family factors
26   yrsmarr  706  0.063997   8.928507e-02   0.40  0.14 -0.01  0.076003                   years married       family factors
27    hrwage  532 -0.049450   2.548774e-01   0.21  0.04 -0.13  0.089450                     hourly wage        labor factors
28     agesq  706  0.099722   8.010946e-03   0.76  0.17  0.03  0.070278                           age^2                  age
"""
```


```Python
fig = plt.figure(figsize=(15, 20), dpi=100, layout="constrained")
ax = fig.add_subplot(1, 1, 1)

group_order = ["age factors", "labor factors", "occupation", "health factors", "family factors", "area of residence", "other factors", "other sleep factors"]

fp.forestplot(sleep_corr,

              # 绘制估计值与置信区间的errorbar和scatter√
              estimate="r",                                      # 估计值，传递给ax.errorbar和ax.scatter的x参数
              ll="ll",                                           # 置信区间下限，计算后传递给ax.errorbar的xerr参数
              hl="hl",                                           # 置信区间上限，计算后传递给ax.errorbar的xerr参数
              lw=2,                                              # 误差线宽，传递给ax.errorbar的elinewidth参数
              linecolor='r',                                     # 误差线色，传递给ax.errorbar的ecolor参数
              marker="*",                                        # 估计值标记类型，传递给ax.scatter的marker参数
              markersize=100,                                    # 估计值标记大小，传递给ax.scatter的s参数
              markercolor="k",                                   # 估计值标记颜色，传递给ax.scatter的color参数
              markeralpha=1,                                     # 估计值标记透明度，传递给ax.scatter的alpha参数
              logscale=False,                                    # 是否x轴进行对数化（以10为底）缩放【ax.set_xscale("log", base=10)】
              color_alt_rows=True,                               # 变量行交替显示颜色

              # 设置x轴刻度与范围√
              xticks=[-0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0],   # √x轴刻度位置【ax.set_xticks(xticks)】
              nticks=8,                                          # √xticks=None时x轴最大刻度数，自动设置刻度位置【ax.xaxis.set_major_locator(plt.MaxNLocator(nticks))】
              xticklabels=None,                                  # √x轴刻度标签文本【ax.set_xticklabels(xticklabels)】
              xtick_size=20,                                     # √x轴刻度标签大小【ax.tick_params(axis="x", labelsize=xtick_size)】
              xlim=[-0.4, 1],                                    # √x轴范围【ax.set_xlim(xlim[0], xlim[1])】

              # x轴标题√
              xlabel="Pearson correlation coefficient",          # √x轴标题文本内容，传递给ax.set_xlabel的xlabel参数
              xlabel_size=20,                                    # √x轴标题字体大小，传递给ax.set_xlabel的size参数
              xlabel_fontweight="bold",                          # √x轴标题字体粗细，传递给ax.set_xlabel的fontweight参数

              # 绘制参考线√
              xline=0,                                           # √参考线位置，传递给ax.vlines的x参数
              xlinestyle='--',                                   # √参考线线型，传递给ax.vlines的linestyle参数
              xlinecolor='r',                                    # √参考线颜色，传递给ax.vlines的color参数
              xlinewidth=2,                                      # √参考线线宽，传递给ax.vlines的linewidth参数

              # 绘制左侧y轴刻度标签yticklabel
              varlabel="var",                                    # √变量标签
              
              groupvar='group',                                  # √分组信息列。注意分组名尽量不与变量标签名重复，否则显示出问题。
              group_order=group_order,                           # √分组显示顺序
              grouplab_size=20,                                  # √分组文本字体大小
              # grouplab_fontweight="bold",                      # √分组文本和右侧表头字体粗细（rightannote!=None时）

              flush=True,                                        # √如果为True，则设置ax.set_yticklabels的ha参数为"left"，否则设置为"right"
              capitalize="title",                                # √变量标签和分组名的显示形式。可选"title", "capitalize", "lower", "upper", "swapcase"
              sort=True,                                         # √是否对变量根据sortby参数进行排序（降序），默认False。如果设置了groupvar参数，则在各自组内排序。
              sortby='r',                                        # √排序依据（若设置则默认设置sort=True），默认是estimate参数对应的列。

              form_ci_report=True,                               # √是否自动处理并形成置信区间报告"est_ci"列（默认为True）
              # ci_report=True,                                  # √是否在图左侧显示置信区间报告列（默认为True，若ll=None则设置为False），若设置为True则默认设置form_ci_report=True

              annote=['label', "est_ci"],                        # √图左侧显示的信息列，覆盖以上设置的置信区间报告列
              annoteheaders=["Label", "Est. (95% Conf. Int.)"],  # √图左侧显示的信息列的表头，覆盖以上设置的置信区间报告列
              variable_header="Variable",                        # √变量标签列表头
              # tableheader_fontweight="bold",                   # √图左侧显示的信息列的表头字体粗细

              # 绘制右侧y轴刻度标签yticklabel2
              pval='p-val',                                      # √变量p值信息列，添加'formatted_pval'列并显示在图右侧
              starpval=True,                                     # √是否根据thresholds参数提供的阈值，在p值后添加对应符号
              thresholds=[0.001, 0.01, 0.05],                    # √小于等于对应阈值的p值后添加symbols参数对应显著性符号
              symbols=[' ***', ' **', ' *'],                     # √为p值添加显著性符号
              # pval_title="P-value",                            # √p值列表头（rightannote=None时）
              # pval_title_fontsize=20,                          # √p值表头文本大小（rightannote=None且annoteheaders！=None时）
              # pval_title_fontweight="bold",                    # √p值表头文本粗细（rightannote=None且annoteheaders！=None时）

              rightannote=["formatted_pval", "n", "power"],      # √图右侧显示的信息列，覆盖以上设置的p值列
              right_annoteheaders=["P-value", "N", "Power"],     # √图右侧显示的信息列的表头，覆盖以上设置的p值列

              # 两侧y轴刻度标签
              table=True,                                        # √是否绘制表格线
              col_spacing=2,                                     # √列间距
              fontfamily="monospace",                            # √字体
              fontsize=20,                                       # √字体大小

              # y轴标题√
              ylabel="Variable Information",                     # √y轴标题，传递给ax.set_ylabel的ylabel参数
              ylabel1_size=18,                                   # √y轴标题字体大小，传递给ax.set_ylabel的size参数；p值表头文本大小（rightannote=None且annoteheaders=None时，默认设置字体粗细为"bold"）
              ylabel1_fontweight="bold",                         # √y轴标题字体粗细，传递给ax.set_ylabel的fontweight参数
              ylabel_loc="top",                                  # √y轴标题位置，传递给ax.set_ylabel的loc参数
              ylabel_angle="horizontal",                         # √y轴标题旋转角度，传递给ax.set_ylabel的rotation参数

              # 其它√
              decimal_precision=2,                               # √数据小数点精确位数
              return_df=True,                                    # √是否返回内部处理后的DataFrame结果
              despine=False,
              ax=ax
              )
"""
(                    var                group    n         r          p-val  power    hl    ll   moerror                           label formatted_r formatted_ll formatted_hl          ci_range                 est_ci formatted_pval                 formatted_label       formatted_est_ci                                         yticklabel formatted_formatted_pval formatted_n formatted_power          yticklabel2
 0                Rlxall  Other Sleep Factors  706  0.867744  6.051022e-216   1.00  0.88  0.85  0.012256       slpnaps + personal activs        0.87         0.85         0.88  ( 0.85 to  0.88)   0.87( 0.85 to  0.88)        0.0 ***  slpnaps + personal activs        0.87( 0.85 to  0.88)    Rlxall             slpnaps + personal activs...                  0.0 ***         706           1.0    0.0 ***  706  1.0  
 1               Slpnaps  Other Sleep Factors  706  0.893043  2.339108e-246   1.00  0.91  0.88  0.016957        minutes sleep, inc. naps        0.89         0.88         0.91  ( 0.88 to  0.91)   0.89( 0.88 to  0.91)        0.0 ***  minutes sleep, inc. naps         0.89( 0.88 to  0.91)    Slpnaps            minutes sleep, inc. naps ...                  0.0 ***         706           1.0    0.0 ***  706  1.0  
 2   Other Sleep Factors  Other Sleep Factors  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         nan          nan          nan  (  nan to   nan)    nan(  nan to   nan)                 nan                               nan(  nan to   nan)                                Other Sleep Factors                                  nan           nan                       
 3                  Male        Other Factors  706 -0.035909   3.407214e-01   0.16  0.04 -0.11  0.075909                      =1 if male       -0.04        -0.11         0.04  (-0.11 to  0.04)  -0.04(-0.11 to  0.04)           0.34  =1 if male                      -0.04(-0.11 to  0.04)    Male               =1 if male               ...                  0.34            706           0.16   0.34     706  0.16 
 4                 Black        Other Factors  706 -0.027057   4.728889e-01   0.11  0.05 -0.10  0.077057                     =1 if black       -0.03        -0.10         0.05  (-0.10 to  0.05)  -0.03(-0.10 to  0.05)           0.47  =1 if black                     -0.03(-0.10 to  0.05)    Black              =1 if black              ...                  0.47            706           0.11   0.47     706  0.11 
 5               Spwrk75        Other Factors  706  0.007868   8.346888e-01   0.05  0.08 -0.07  0.072132              =1 if spouse works        0.01        -0.07         0.08  (-0.07 to  0.08)   0.01(-0.07 to  0.08)           0.83  =1 if spouse works               0.01(-0.07 to  0.08)    Spwrk75            =1 if spouse works       ...                  0.83            706           0.05   0.83     706  0.05 
 6               Spsepay        Other Factors  706  0.007881   8.344125e-01   0.06  0.08 -0.07  0.072119             spousal wage income        0.01        -0.07         0.08  (-0.07 to  0.08)   0.01(-0.07 to  0.08)           0.83  spousal wage income              0.01(-0.07 to  0.08)    Spsepay            spousal wage income      ...                  0.83            706           0.06   0.83     706  0.06 
 7                  Prot        Other Factors  706  0.027147   4.714176e-01   0.11  0.10 -0.05  0.072853                =1 if Protestant        0.03        -0.05         0.10  (-0.05 to  0.10)   0.03(-0.05 to  0.10)           0.47  =1 if Protestant                 0.03(-0.05 to  0.10)    Prot               =1 if Protestant         ...                  0.47            706           0.11   0.47     706  0.11 
 8         Other Factors        Other Factors  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         nan          nan          nan  (  nan to   nan)    nan(  nan to   nan)                 nan                               nan(  nan to   nan)                                      Other Factors                                  nan           nan                       
 9                  Smsa    Area Of Residence  706 -0.066997   7.524015e-02   0.43  0.01 -0.14  0.076997              =1 if live in smsa       -0.07        -0.14         0.01  (-0.14 to  0.01)  -0.07(-0.14 to  0.01)           0.08  =1 if live in smsa              -0.07(-0.14 to  0.01)    Smsa               =1 if live in smsa       ...                  0.08            706           0.43   0.08     706  0.43 
 10                South    Area Of Residence  706  0.078600   3.679946e-02   0.55  0.15  0.00  0.071400             =1 if live in south        0.08         0.00         0.15  ( 0.00 to  0.15)   0.08( 0.00 to  0.15)         0.04 *  =1 if live in south              0.08( 0.00 to  0.15)    South              =1 if live in south      ...                  0.04 *          706           0.55   0.04 *   706  0.55 
 11    Area Of Residence    Area Of Residence  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         nan          nan          nan  (  nan to   nan)    nan(  nan to   nan)                 nan                               nan(  nan to   nan)                                  Area Of Residence                                  nan           nan                       
 12               Yngkid       Family Factors  706 -0.013262   7.250012e-01   0.06  0.06 -0.09  0.073262      =1 if children < 3 present       -0.01        -0.09         0.06  (-0.09 to  0.06)  -0.01(-0.09 to  0.06)           0.73  =1 if children < 3 present      -0.01(-0.09 to  0.06)    Yngkid             =1 if children < 3 presen...                  0.73            706           0.06   0.73     706  0.06 
 13                 Marr       Family Factors  706  0.053757   1.536188e-01   0.30  0.13 -0.02  0.076243                   =1 if married        0.05        -0.02         0.13  (-0.02 to  0.13)   0.05(-0.02 to  0.13)           0.15  =1 if married                    0.05(-0.02 to  0.13)    Marr               =1 if married            ...                  0.15            706           0.3    0.15     706  0.3  
 14              Yrsmarr       Family Factors  706  0.063997   8.928507e-02   0.40  0.14 -0.01  0.076003                   years married        0.06        -0.01         0.14  (-0.01 to  0.14)   0.06(-0.01 to  0.14)           0.09  years married                    0.06(-0.01 to  0.14)    Yrsmarr            years married            ...                  0.09            706           0.4    0.09     706  0.4  
 15       Family Factors       Family Factors  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         nan          nan          nan  (  nan to   nan)    nan(  nan to   nan)                 nan                               nan(  nan to   nan)                                     Family Factors                                  nan           nan                       
 16               Gdhlth       Health Factors  706 -0.102825   6.246660e-03   0.78 -0.03 -0.18  0.072825  =1 if in good or excel. health       -0.10        -0.18        -0.03  (-0.18 to -0.03)  -0.10(-0.18 to -0.03)        0.01 **  =1 if in good or excel. health  -0.10(-0.18 to -0.03)    Gdhlth             =1 if in good or excel. h...                  0.01 **         706           0.78   0.01 **  706  0.78 
 17       Health Factors       Health Factors  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         nan          nan          nan  (  nan to   nan)    nan(  nan to   nan)                 nan                               nan(  nan to   nan)                                     Health Factors                                  nan           nan                       
 18             Construc           Occupation  706  0.041229   2.739475e-01   0.19  0.11 -0.03  0.068771       =1 if construction worker        0.04        -0.03         0.11  (-0.03 to  0.11)   0.04(-0.03 to  0.11)           0.27  =1 if construction worker        0.04(-0.03 to  0.11)    Construc           =1 if construction worker...                  0.27            706           0.19   0.27     706  0.19 
 19             Clerical           Occupation  706  0.048081   2.019484e-01   0.25  0.12 -0.03  0.071919           =1 if clerical worker        0.05        -0.03         0.12  (-0.03 to  0.12)   0.05(-0.03 to  0.12)            0.2  =1 if clerical worker            0.05(-0.03 to  0.12)    Clerical           =1 if clerical worker    ...                  0.2             706           0.25   0.2      706  0.25 
 20           Occupation           Occupation  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         nan          nan          nan  (  nan to   nan)    nan(  nan to   nan)                 nan                               nan(  nan to   nan)                                         Occupation                                  nan           nan                       
 21              Worknrm        Labor Factors  706 -0.322300   1.577335e-18   1.00 -0.25 -0.39  0.072300              mins work main job       -0.32        -0.39        -0.25  (-0.39 to -0.25)  -0.32(-0.39 to -0.25)        0.0 ***  mins work main job              -0.32(-0.39 to -0.25)    Worknrm            mins work main job       ...                  0.0 ***         706           1.0    0.0 ***  706  1.0  
 22               Totwrk        Labor Factors  706 -0.321384   1.994095e-18   1.00 -0.25 -0.39  0.071384            mins worked per week       -0.32        -0.39        -0.25  (-0.39 to -0.25)  -0.32(-0.39 to -0.25)        0.0 ***  mins worked per week            -0.32(-0.39 to -0.25)    Totwrk             mins worked per week     ...                  0.0 ***         706           1.0    0.0 ***  706  1.0  
 23                 Educ        Labor Factors  706 -0.095004   1.155151e-02   0.72 -0.02 -0.17  0.075004              years of schooling       -0.10        -0.17        -0.02  (-0.17 to -0.02)  -0.10(-0.17 to -0.02)         0.01 *  years of schooling              -0.10(-0.17 to -0.02)    Educ               years of schooling       ...                  0.01 *          706           0.72   0.01 *   706  0.72 
 24              Earns74        Labor Factors  706 -0.076890   4.110934e-02   0.53 -0.00 -0.15  0.076890            total earnings, 1974       -0.08        -0.15        -0.00  (-0.15 to -0.00)  -0.08(-0.15 to -0.00)         0.04 *  total earnings, 1974            -0.08(-0.15 to -0.00)    Earns74            total earnings, 1974     ...                  0.04 *          706           0.53   0.04 *   706  0.53 
 25              Lhrwage        Labor Factors  532 -0.067197   1.216222e-01   0.34  0.02 -0.15  0.087197                 log hourly wage       -0.07        -0.15         0.02  (-0.15 to  0.02)  -0.07(-0.15 to  0.02)           0.12  log hourly wage                 -0.07(-0.15 to  0.02)    Lhrwage            log hourly wage          ...                  0.12            532           0.34   0.12     532  0.34 
 26               Hrwage        Labor Factors  532 -0.049450   2.548774e-01   0.21  0.04 -0.13  0.089450                     hourly wage       -0.05        -0.13         0.04  (-0.13 to  0.04)  -0.05(-0.13 to  0.04)           0.25  hourly wage                     -0.05(-0.13 to  0.04)    Hrwage             hourly wage              ...                  0.25            532           0.21   0.25     532  0.21 
 27                 Inlf        Labor Factors  706 -0.027126   4.717698e-01   0.11  0.05 -0.10  0.077126            =1 if in labor force       -0.03        -0.10         0.05  (-0.10 to  0.05)  -0.03(-0.10 to  0.05)           0.47  =1 if in labor force            -0.03(-0.10 to  0.05)    Inlf               =1 if in labor force     ...                  0.47            706           0.11   0.47     706  0.11 
 28             Workscnd        Labor Factors  706  0.001139   9.759034e-01   0.05  0.07 -0.07  0.068861            mins work second job        0.00        -0.07         0.07  (-0.07 to  0.07)   0.00(-0.07 to  0.07)           0.98  mins work second job             0.00(-0.07 to  0.07)    Workscnd           mins work second job     ...                  0.98            706           0.05   0.98     706  0.05 
 29                Selfe        Labor Factors  706  0.001782   9.623058e-01   0.05  0.08 -0.07  0.078218             =1 if self employed        0.00        -0.07         0.08  (-0.07 to  0.08)   0.00(-0.07 to  0.08)           0.96  =1 if self employed              0.00(-0.07 to  0.08)    Selfe              =1 if self employed      ...                  0.96            706           0.05   0.96     706  0.05 
 30                Union        Labor Factors  706  0.009965   7.915440e-01   0.06  0.08 -0.06  0.070035           =1 if belong to union        0.01        -0.06         0.08  (-0.06 to  0.08)   0.01(-0.06 to  0.08)           0.79  =1 if belong to union            0.01(-0.06 to  0.08)    Union              =1 if belong to union    ...                  0.79            706           0.06   0.79     706  0.06 
 31              Lothinc        Labor Factors  706  0.036661   3.306971e-01   0.16  0.11 -0.04  0.073339   log othinc, unless othinc < 0        0.04        -0.04         0.11  (-0.04 to  0.11)   0.04(-0.04 to  0.11)           0.33  log othinc, unless othinc < 0    0.04(-0.04 to  0.11)    Lothinc            log othinc, unless othinc...                  0.33            706           0.16   0.33     706  0.16 
 32                Exper        Labor Factors  706  0.104191   5.587422e-03   0.79  0.18  0.03  0.075809                  age - educ - 6        0.10         0.03         0.18  ( 0.03 to  0.18)   0.10( 0.03 to  0.18)        0.01 **  age - educ - 6                   0.10( 0.03 to  0.18)    Exper              age - educ - 6           ...                  0.01 **         706           0.79   0.01 **  706  0.79 
 33        Labor Factors        Labor Factors  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         nan          nan          nan  (  nan to   nan)    nan(  nan to   nan)                 nan                               nan(  nan to   nan)                                      Labor Factors                                  nan           nan                       
 34                  Age          Age Factors  706  0.090373   1.630887e-02   0.67  0.16  0.02  0.069627                        in years        0.09         0.02         0.16  ( 0.02 to  0.16)   0.09( 0.02 to  0.16)         0.02 *  in years                         0.09( 0.02 to  0.16)    Age                in years                 ...                  0.02 *          706           0.67   0.02 *   706  0.67 
 35                Agesq          Age Factors  706  0.099722   8.010946e-03   0.76  0.17  0.03  0.070278                           age^2        0.10         0.03         0.17  ( 0.03 to  0.17)   0.10( 0.03 to  0.17)        0.01 **  age^2                            0.10( 0.03 to  0.17)    Agesq              age^2                    ...                  0.01 **         706           0.76   0.01 **  706  0.76 
 36          Age Factors          Age Factors  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         nan          nan          nan  (  nan to   nan)    nan(  nan to   nan)                 nan                               nan(  nan to   nan)                                        Age Factors                                  nan           nan                       
 37                  NaN                  NaN  NaN       NaN            NaN    NaN   NaN   NaN       NaN                             NaN         NaN          NaN          NaN               NaN                    NaN            NaN                             NaN                    NaN  Variable             Label                    ...                      NaN         NaN             NaN  P-value  N    Power,
 <Axes: xlabel='Pearson correlation coefficient', ylabel='Variable Information'>)
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/85350ff6-6fcb-4d25-b3db-9414c63c3289/image.png?time=1747468800&token=13f7126792f2f155c6484c62449f4882315d955d0ffac4418c1161b01ada3f83&role=sharePaid)

# 多模型

[forestplot/examples/get-sleep-multmodel.ipynb at main · LSYS/forestplot](https://github.com/LSYS/forestplot/blob/main/examples/get-sleep-multmodel.ipynb)


```Python
# 回归参数
stdopts = {'relimp': False, 'remove_na': True}

# 保留变量
x = ["age", "black", "clerical", "construc", "educ", "gdhlth", "smsa", "lhrwage", "prot", "selfe", "south", "spsepay", "totwrk", "yrsmarr"]

# 所有样本变量与'sleep'变量的回归结果
lm_all = pg.linear_regression(sleep[x], sleep['sleep'], **stdopts).assign(model='all')
"""
        names         coef          se          T           pval        r2    adj_r2     CI[2.5%]    CI[97.5%] model
0   Intercept  3693.605849  136.823292  26.995446  8.489175e-101  0.127289  0.103656  3424.807860  3962.403839   all
1         age     0.994889    1.969249   0.505213   6.136249e-01  0.127289  0.103656    -2.873825     4.863603   all
2       black   -84.796612   82.150125  -1.032215   3.024539e-01  0.127289  0.103656  -246.185715    76.592491   all
3    clerical    22.505827   48.963263   0.459647   6.459627e-01  0.127289  0.103656   -73.685593   118.697248   all
4    construc   113.929558  105.045137   1.084577   2.786145e-01  0.127289  0.103656   -92.438240   320.297357   all
5        educ    -7.210558    7.516736  -0.959267   3.378725e-01  0.127289  0.103656   -21.977660     7.556543   all
6      gdhlth   -82.580434   58.204717  -1.418793   1.565620e-01  0.127289  0.103656  -196.927272    31.766405   all
7        smsa   -40.653557   39.507723  -1.029003   3.039595e-01  0.127289  0.103656  -118.268971    36.961857   all
8     lhrwage    21.605697   31.989301   0.675404   4.997212e-01  0.127289  0.103656   -41.239303    84.450696   all
9        prot    -9.249430   39.771462  -0.232564   8.161916e-01  0.127289  0.103656   -87.382976    68.884117   all
10      selfe   -21.274179   63.303918  -0.336064   7.369588e-01  0.127289  0.103656  -145.638720   103.090363   all
11      south    82.486980   46.377571   1.778596   7.589350e-02  0.127289  0.103656    -8.624685   173.598644   all
12    spsepay    -0.001005    0.002648  -0.379739   7.042954e-01  0.127289  0.103656    -0.006207     0.004196   all
13     totwrk    -0.151922    0.020366  -7.459430   3.698705e-13  0.127289  0.103656    -0.191934    -0.111911   all
14    yrsmarr    -0.075958    2.009356  -0.037802   9.698602e-01  0.127289  0.103656    -4.023464     3.871548   all
"""

# 男性样本变量与'sleep'变量的回归结果
lm_male = pg.linear_regression(sleep.query('male==1')[x], sleep.query('male==1')['sleep'], **stdopts).assign(model='men')
"""
        names         coef          se          T          pval        r2    adj_r2     CI[2.5%]    CI[97.5%] model
0   Intercept  3919.280072  191.619361  20.453466  2.284744e-57  0.180382  0.139106  3542.070849  4296.489295   men
1         age     1.482893    2.885462   0.513919  6.077171e-01  0.180382  0.139106    -4.197237     7.163023   men
2       black  -132.967109  132.581166  -1.002911  3.167759e-01  0.180382  0.139106  -393.957639   128.023420   men
3    clerical  -229.275962  102.888221  -2.228399  2.665377e-02  0.180382  0.139106  -431.814921   -26.737003   men
4    construc    65.696059  107.889208   0.608922  5.430737e-01  0.180382  0.139106  -146.687512   278.079631   men
5        educ    -7.545420    9.720341  -0.776250  4.382610e-01  0.180382  0.139106   -26.680241    11.589402   men
6      gdhlth  -188.284508   80.476539  -2.339620  2.001135e-02  0.180382  0.139106  -346.705309   -29.863707   men
7        smsa   -27.631427   52.418593  -0.527130  5.985235e-01  0.180382  0.139106  -130.819208    75.556354   men
8     lhrwage     3.544752   47.045923   0.075347  9.399931e-01  0.180382  0.139106   -89.066745    96.156249   men
9        prot   -20.967328   52.201060  -0.401665  6.882393e-01  0.180382  0.139106  -123.726888    81.792233   men
10      selfe     3.484094   77.585707   0.044906  9.642142e-01  0.180382  0.139106  -149.246005   156.214193   men
11      south    79.401694   64.439832   1.232183  2.189217e-01  0.180382  0.139106   -47.450305   206.253693   men
12    spsepay     0.003069    0.004924   0.623344  5.335697e-01  0.180382  0.139106    -0.006624     0.012762   men
13     totwrk    -0.191008    0.029765  -6.417152  5.964764e-10  0.180382  0.139106    -0.249602    -0.132414   men
14    yrsmarr     0.224116    2.934791   0.076365  9.391834e-01  0.180382  0.139106    -5.553120     6.001352   men
"""

# 女性样本变量与'sleep'变量的回归结果
lm_female = pg.linear_regression(sleep.query('male==0')[x], sleep.query('male==0')['sleep'], **stdopts).assign(model='women')
"""
        names         coef          se          T          pval        r2    adj_r2     CI[2.5%]    CI[97.5%]  model
0   Intercept  3599.064226  210.446560  17.102034  1.637481e-42  0.109105  0.053425  3184.355929  4013.772523  women
1         age     0.953200    2.943209   0.323864  7.463431e-01  0.109105  0.053425    -4.846721     6.753121  women
2       black   -68.350631  108.901754  -0.627636  5.308819e-01  0.109105  0.053425  -282.953621   146.252360  women
3    clerical   106.507258   61.127321   1.742384  8.281375e-02  0.109105  0.053425   -13.950911   226.965427  women
4    construc   361.756430  428.264834   0.844703  3.991782e-01  0.109105  0.053425  -482.186946  1205.699805  women
5        educ    -6.278397   11.869883  -0.528935  5.973743e-01  0.109105  0.053425   -29.669318    17.112525  women
6      gdhlth   -24.491583   87.716867  -0.279212  7.803399e-01  0.109105  0.053425  -197.347402   148.364236  women
7        smsa   -57.146400   61.521030  -0.928892  3.539449e-01  0.109105  0.053425  -178.380417    64.087616  women
8     lhrwage   -22.580482   53.782320  -0.419850  6.749978e-01  0.109105  0.053425  -128.564512    83.403547  women
9        prot     1.066643   61.898047   0.017232  9.862667e-01  0.109105  0.053425  -120.910327   123.043614  women
10      selfe   -90.685936  112.556497  -0.805693  4.212746e-01  0.109105  0.053425  -312.491002   131.119130  women
11      south   114.622934   69.300494   1.653999  9.952837e-02  0.109105  0.053425   -21.941379   251.187246  women
12    spsepay    -0.000508    0.003621  -0.140324  8.885302e-01  0.109105  0.053425    -0.007644     0.006628  women
13     totwrk    -0.125512    0.032713  -3.836783  1.621349e-04  0.109105  0.053425    -0.189977    -0.061048  women
14    yrsmarr    -1.414137    2.931985  -0.482314  6.300539e-01  0.109105  0.053425    -7.191939     4.363665  women
"""
# 儿童样本变量与'sleep'变量的回归结果
lm_kids = pg.linear_regression(sleep.query('yngkid==1')[x], sleep.query('yngkid==1')['sleep'], **stdopts).assign(model='young kids')
"""
        names         coef          se         T          pval        r2    adj_r2     CI[2.5%]    CI[97.5%]       model
0   Intercept  3496.301163  514.490634  6.795656  5.575797e-09  0.178147 -0.013619  2467.166669  4525.435657  young kids
1         age    22.634017   15.495320  1.460700  1.493148e-01  0.178147 -0.013619    -8.361238    53.629272  young kids
2       black  -119.741039  296.432953 -0.403940  6.876932e-01  0.178147 -0.013619  -712.695230   473.213151  young kids
3    clerical  -239.902574  211.760200 -1.132897  2.617642e-01  0.178147 -0.013619  -663.486040   183.680893  young kids
4    construc  -186.415201  358.223501 -0.520388  6.047082e-01  0.178147 -0.013619  -902.968890   530.138489  young kids
5        educ   -20.972116   26.974032 -0.777493  4.399230e-01  0.178147 -0.013619   -74.928213    32.983981  young kids
6      gdhlth  -141.814976  203.213022 -0.697864  4.879582e-01  0.178147 -0.013619  -548.301540   264.671589  young kids
7        smsa    43.429572  138.683089  0.313157  7.552474e-01  0.178147 -0.013619  -233.977910   320.837053  young kids
8     lhrwage    35.609317  122.323738  0.291107  7.719733e-01  0.178147 -0.013619  -209.074589   280.293223  young kids
9        prot   -24.173124  127.566497 -0.189494  8.503450e-01  0.178147 -0.013619  -279.344111   230.997863  young kids
10      selfe  -370.956512  241.153473 -1.538259  1.292427e-01  0.178147 -0.013619  -853.335279   111.422256  young kids
11      south    71.851381  136.010112  0.528280  5.992538e-01  0.178147 -0.013619  -200.209350   343.912111  young kids
12    spsepay    -0.004701    0.011443 -0.410849  6.826471e-01  0.178147 -0.013619    -0.027591     0.018188  young kids
13     totwrk    -0.112995    0.076363 -1.479712  1.441818e-01  0.178147 -0.013619    -0.265743     0.039753  young kids
14    yrsmarr   -31.211144   16.914011 -1.845283  6.993267e-02  0.178147 -0.013619   -65.044204     2.621915  young kids
"""

sleep_lm = pd.concat([lm_all, lm_female, lm_male, lm_kids]).query('names!="Intercept"')
sleep_lm.rename(columns={'names': 'var', 'CI[2.5%]': 'll', 'CI[97.5%]': 'hl'}, inplace=True)
sleep_lm = pd.merge(sleep_lm, sleep_label, on='var', how='left', validate='m:1')
sleep_lm.sort_values(['var', 'model', 'group'], inplace=True)
sleep_lm.reset_index(drop=True, inplace=True)
"""
         var        coef          se         T          pval        r2    adj_r2          ll           hl       model                           label              group
0        age    0.994889    1.969249  0.505213  6.136249e-01  0.127289  0.103656   -2.873825     4.863603         all                        in years        age factors
1        age    1.482893    2.885462  0.513919  6.077171e-01  0.180382  0.139106   -4.197237     7.163023         men                        in years        age factors
2        age    0.953200    2.943209  0.323864  7.463431e-01  0.109105  0.053425   -4.846721     6.753121       women                        in years        age factors
3        age   22.634017   15.495320  1.460700  1.493148e-01  0.178147 -0.013619   -8.361238    53.629272  young kids                        in years        age factors
4      black  -84.796612   82.150125 -1.032215  3.024539e-01  0.127289  0.103656 -246.185715    76.592491         all                     =1 if black      other factors
5      black -132.967109  132.581166 -1.002911  3.167759e-01  0.180382  0.139106 -393.957639   128.023420         men                     =1 if black      other factors
6      black  -68.350631  108.901754 -0.627636  5.308819e-01  0.109105  0.053425 -282.953621   146.252360       women                     =1 if black      other factors
7      black -119.741039  296.432953 -0.403940  6.876932e-01  0.178147 -0.013619 -712.695230   473.213151  young kids                     =1 if black      other factors
8   clerical   22.505827   48.963263  0.459647  6.459627e-01  0.127289  0.103656  -73.685593   118.697248         all           =1 if clerical worker         occupation
9   clerical -229.275962  102.888221 -2.228399  2.665377e-02  0.180382  0.139106 -431.814921   -26.737003         men           =1 if clerical worker         occupation
10  clerical  106.507258   61.127321  1.742384  8.281375e-02  0.109105  0.053425  -13.950911   226.965427       women           =1 if clerical worker         occupation
11  clerical -239.902574  211.760200 -1.132897  2.617642e-01  0.178147 -0.013619 -663.486040   183.680893  young kids           =1 if clerical worker         occupation
12  construc  113.929558  105.045137  1.084577  2.786145e-01  0.127289  0.103656  -92.438240   320.297357         all       =1 if construction worker         occupation
13  construc   65.696059  107.889208  0.608922  5.430737e-01  0.180382  0.139106 -146.687512   278.079631         men       =1 if construction worker         occupation
14  construc  361.756430  428.264834  0.844703  3.991782e-01  0.109105  0.053425 -482.186946  1205.699805       women       =1 if construction worker         occupation
15  construc -186.415201  358.223501 -0.520388  6.047082e-01  0.178147 -0.013619 -902.968890   530.138489  young kids       =1 if construction worker         occupation
16      educ   -7.210558    7.516736 -0.959267  3.378725e-01  0.127289  0.103656  -21.977660     7.556543         all              years of schooling      labor factors
17      educ   -7.545420    9.720341 -0.776250  4.382610e-01  0.180382  0.139106  -26.680241    11.589402         men              years of schooling      labor factors
18      educ   -6.278397   11.869883 -0.528935  5.973743e-01  0.109105  0.053425  -29.669318    17.112525       women              years of schooling      labor factors
19      educ  -20.972116   26.974032 -0.777493  4.399230e-01  0.178147 -0.013619  -74.928213    32.983981  young kids              years of schooling      labor factors
20    gdhlth  -82.580434   58.204717 -1.418793  1.565620e-01  0.127289  0.103656 -196.927272    31.766405         all  =1 if in good or excel. health     health factors
21    gdhlth -188.284508   80.476539 -2.339620  2.001135e-02  0.180382  0.139106 -346.705309   -29.863707         men  =1 if in good or excel. health     health factors
22    gdhlth  -24.491583   87.716867 -0.279212  7.803399e-01  0.109105  0.053425 -197.347402   148.364236       women  =1 if in good or excel. health     health factors
23    gdhlth -141.814976  203.213022 -0.697864  4.879582e-01  0.178147 -0.013619 -548.301540   264.671589  young kids  =1 if in good or excel. health     health factors
24   lhrwage   21.605697   31.989301  0.675404  4.997212e-01  0.127289  0.103656  -41.239303    84.450696         all                 log hourly wage      labor factors
25   lhrwage    3.544752   47.045923  0.075347  9.399931e-01  0.180382  0.139106  -89.066745    96.156249         men                 log hourly wage      labor factors
26   lhrwage  -22.580482   53.782320 -0.419850  6.749978e-01  0.109105  0.053425 -128.564512    83.403547       women                 log hourly wage      labor factors
27   lhrwage   35.609317  122.323738  0.291107  7.719733e-01  0.178147 -0.013619 -209.074589   280.293223  young kids                 log hourly wage      labor factors
28      prot   -9.249430   39.771462 -0.232564  8.161916e-01  0.127289  0.103656  -87.382976    68.884117         all                =1 if Protestant      other factors
29      prot  -20.967328   52.201060 -0.401665  6.882393e-01  0.180382  0.139106 -123.726888    81.792233         men                =1 if Protestant      other factors
30      prot    1.066643   61.898047  0.017232  9.862667e-01  0.109105  0.053425 -120.910327   123.043614       women                =1 if Protestant      other factors
31      prot  -24.173124  127.566497 -0.189494  8.503450e-01  0.178147 -0.013619 -279.344111   230.997863  young kids                =1 if Protestant      other factors
32     selfe  -21.274179   63.303918 -0.336064  7.369588e-01  0.127289  0.103656 -145.638720   103.090363         all             =1 if self employed      labor factors
33     selfe    3.484094   77.585707  0.044906  9.642142e-01  0.180382  0.139106 -149.246005   156.214193         men             =1 if self employed      labor factors
34     selfe  -90.685936  112.556497 -0.805693  4.212746e-01  0.109105  0.053425 -312.491002   131.119130       women             =1 if self employed      labor factors
35     selfe -370.956512  241.153473 -1.538259  1.292427e-01  0.178147 -0.013619 -853.335279   111.422256  young kids             =1 if self employed      labor factors
36      smsa  -40.653557   39.507723 -1.029003  3.039595e-01  0.127289  0.103656 -118.268971    36.961857         all              =1 if live in smsa  area of residence
37      smsa  -27.631427   52.418593 -0.527130  5.985235e-01  0.180382  0.139106 -130.819208    75.556354         men              =1 if live in smsa  area of residence
38      smsa  -57.146400   61.521030 -0.928892  3.539449e-01  0.109105  0.053425 -178.380417    64.087616       women              =1 if live in smsa  area of residence
39      smsa   43.429572  138.683089  0.313157  7.552474e-01  0.178147 -0.013619 -233.977910   320.837053  young kids              =1 if live in smsa  area of residence
40     south   82.486980   46.377571  1.778596  7.589350e-02  0.127289  0.103656   -8.624685   173.598644         all             =1 if live in south  area of residence
41     south   79.401694   64.439832  1.232183  2.189217e-01  0.180382  0.139106  -47.450305   206.253693         men             =1 if live in south  area of residence
42     south  114.622934   69.300494  1.653999  9.952837e-02  0.109105  0.053425  -21.941379   251.187246       women             =1 if live in south  area of residence
43     south   71.851381  136.010112  0.528280  5.992538e-01  0.178147 -0.013619 -200.209350   343.912111  young kids             =1 if live in south  area of residence
44   spsepay   -0.001005    0.002648 -0.379739  7.042954e-01  0.127289  0.103656   -0.006207     0.004196         all             spousal wage income      other factors
45   spsepay    0.003069    0.004924  0.623344  5.335697e-01  0.180382  0.139106   -0.006624     0.012762         men             spousal wage income      other factors
46   spsepay   -0.000508    0.003621 -0.140324  8.885302e-01  0.109105  0.053425   -0.007644     0.006628       women             spousal wage income      other factors
47   spsepay   -0.004701    0.011443 -0.410849  6.826471e-01  0.178147 -0.013619   -0.027591     0.018188  young kids             spousal wage income      other factors
48    totwrk   -0.151922    0.020366 -7.459430  3.698705e-13  0.127289  0.103656   -0.191934    -0.111911         all            mins worked per week      labor factors
49    totwrk   -0.191008    0.029765 -6.417152  5.964764e-10  0.180382  0.139106   -0.249602    -0.132414         men            mins worked per week      labor factors
50    totwrk   -0.125512    0.032713 -3.836783  1.621349e-04  0.109105  0.053425   -0.189977    -0.061048       women            mins worked per week      labor factors
51    totwrk   -0.112995    0.076363 -1.479712  1.441818e-01  0.178147 -0.013619   -0.265743     0.039753  young kids            mins worked per week      labor factors
52   yrsmarr   -0.075958    2.009356 -0.037802  9.698602e-01  0.127289  0.103656   -4.023464     3.871548         all                   years married     family factors
53   yrsmarr    0.224116    2.934791  0.076365  9.391834e-01  0.180382  0.139106   -5.553120     6.001352         men                   years married     family factors
54   yrsmarr   -1.414137    2.931985 -0.482314  6.300539e-01  0.109105  0.053425   -7.191939     4.363665       women                   years married     family factors
55   yrsmarr  -31.211144   16.914011 -1.845283  6.993267e-02  0.178147 -0.013619  -65.044204     2.621915  young kids                   years married     family factors
"""
```


```Python
fig = plt.figure(dpi=100, layout="constrained")

group_order = ["age factors", "labor factors", "occupation", "health factors", "family factors", "area of residence", "other factors"]

fp.mforestplot(sleep_lm,

               # 绘制估计值与置信区间的errorbar和scatter
               estimate="coef",                                   # 估计值列，传递给ax.errorbar和ax.scatter的x参数
               ll="ll",                                           # 置信区间下限，计算后传递给ax.errorbar的xerr参数
               hl="hl",                                           # 置信区间上限，计算后传递给ax.errorbar的xerr参数
               model_col='model',                                 # 模型信息列
               models=['men', 'women'],                           # 选择绘制的模型
               msymbols=['o', '*'],                               # 各模型估计值标记类型，分别传递给ax.scatter的marker参数
               mcolor=['r', 'b'],                                 # 各模型估计值标记和误差线颜色，分别传递给ax.scatter的c参数和ax.errorbar的ecolor参数
               lw=2,                                              # 误差线宽，传递给ax.errorbar的elinewidth参数
               markersize=100,                                    # 估计值标记大小，传递给ax.scatter的s参数
               offset=0.5,                                        # 模型绘图间距
               logscale=False,                                    # 是否x轴进行对数化（以10为底）缩放【ax.set_xscale("log", base=10)】
               color_alt_rows=True,                               # 变量行交替显示颜色

               # 绘制模型图例
               legend=True,                                       # √是否绘制模型图例
               modellabels=['M', 'WM'],                           # √各模型图例标签。传递给ax.legend的labels参数
               leg_loc='best',                                    # √模型图例位置。传递给ax.legend的loc参数
               bbox_to_anchor=None,                               # √模型图例bbox。传递给ax.legend的bbox_to_anchor参数
               leg_markersize=8,                                  # √模型图例标记大小。传递给Line2D的markersize参数
               leg_ncol=1,                                        # √模型图例条目列数。传递给ax.legend的ncol参数
               leg_fontsize=8,                                    # √模型图例字体大小。传递给ax.legend的fontsize参数

               # 设置x轴刻度与标签
               xticks=None,                                       # √设置x轴刻度位置【ax.set_xticks(xticks)】
               nticks=6,                                          # √xticks=None时设置x轴最大刻度数自动设置刻度位置【ax.xaxis.set_major_locator(plt.MaxNLocator(nticks))】
               xticklabels=None,                                  # √设置x轴刻度标签【ax.set_xticklabels(xticklabels)】
               xtick_size=12,                                     # √设置x轴刻度标签大小【ax.tick_params(axis="x", labelsize=xtick_size)】
               xlim=[-1000, 1500],                                # √设置x轴范围【ax.set_xlim(xlim[0], xlim[1])】

               # x轴标题√
               xlabel="Linear Regression coefficient",            # √x轴标题，传递给ax.set_xlabel的xlabel参数
               xlabel_size=20,                                    # √x轴标题字体大小，传递给ax.set_xlabel的size参数
               xlabel_fontweight="bold",                          # √x轴标题字体粗细，传递给ax.set_xlabel的fontweight参数

               # 绘制参考线
               xline=0,                                           # √参考线位置，传递给ax.vlines的x参数
               xlinestyle='--',                                   # √参考线线型，传递给ax.vlines的linestyle参数
               xlinecolor='r',                                    # √参考线颜色，传递给ax.vlines的color参数
               xlinewidth=2,                                      # √参考线线宽，传递给ax.vlines的linewidth参数

               # 绘制左侧y轴刻度标签yticklabel
               varlabel="var",                                    # √变量标签
               variable_header="Variable",                        # √变量标签列表头

               groupvar='group',                                  # √变量分组信息列。注意分组名尽量不与变量标签名重复，否则显示出问题。
               group_order=group_order,                           # √变量分组显示顺序
               grouplab_size=20,                                  # √分组文本字体大小
               # grouplab_fontweight="bold",                      # √分组文本和右侧表头字体粗细（rightannote!=None时）

               flush=True,                                        # √如果为True，则设置ax.set_yticklabels的ha参数为"left"，否则设置为"right"
               capitalize="title",                                # √变量标签和分组名的显示形式。可选"title", "capitalize", "lower", "upper", "swapcase"
               sort=True,                                         # √是否对变量根据sortby参数进行排序（降序），默认False。如果设置了groupvar参数，则在各自组内排序。
               sortby='coef',                                     # √排序依据（若设置则默认设置sort=True），默认是estimate参数对应的列。

               annote=['label'],                                  # √图左侧显示的信息列
               annoteheaders=["Label"],                           # √图左侧显示的信息列的表头
               # tableheader_fontweight="bold",                   # √图左侧显示的信息列的表头字体粗细

               # # 绘制右侧y轴刻度标签yticklabel2
               rightannote=["group"],                             # √图右侧显示的信息列
               right_annoteheaders=["Group"],                     # √图右侧显示的信息列的表头

               # # 两侧y轴刻度标签
               table=True,                                        # √是否绘制表格线
               col_spacing=5,                                     # √列间距
               fontfamily="monospace",                            # √字体
               fontsize=20,                                       # √字体大小

               # 其它
               return_df=True,                                    # √是否返回内部处理后的DataFrame结果
               despine=False,
               figsize=(5, 15)
               )
"""
(                  var              group  model        coef          se         T          pval        r2    adj_r2          ll           hl                           label                 formatted_label                                         yticklabel    formatted_group        yticklabel2
 0             Spsepay      other factors  women   -0.000508    0.003621 -0.140324  8.885302e-01  0.109105  0.053425   -0.007644     0.006628             spousal wage income  spousal wage income               Spsepay             spousal wage income     ...  other factors      other factors    
 1                Prot      other factors  women    1.066643   61.898047  0.017232  9.862667e-01  0.109105  0.053425 -120.910327   123.043614                =1 if Protestant  =1 if Protestant                  Prot                =1 if Protestant        ...  other factors      other factors    
 2               Black      other factors  women  -68.350631  108.901754 -0.627636  5.308819e-01  0.109105  0.053425 -282.953621   146.252360                     =1 if black  =1 if black                       Black               =1 if black             ...  other factors      other factors    
 3       Other Factors      other factors  women         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                 Other Factors  other factors                       
 4               South  area of residence  women  114.622934   69.300494  1.653999  9.952837e-02  0.109105  0.053425  -21.941379   251.187246             =1 if live in south  =1 if live in south               South               =1 if live in south     ...  area of residence  area of residence
 5                Smsa  area of residence  women  -57.146400   61.521030 -0.928892  3.539449e-01  0.109105  0.053425 -178.380417    64.087616              =1 if live in smsa  =1 if live in smsa                Smsa                =1 if live in smsa      ...  area of residence  area of residence
 6   Area Of Residence  area of residence  women         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                             Area Of Residence  area of residence                   
 7             Yrsmarr     family factors  women   -1.414137    2.931985 -0.482314  6.300539e-01  0.109105  0.053425   -7.191939     4.363665                   years married  years married                     Yrsmarr             years married           ...  family factors     family factors   
 8      Family Factors     family factors  women         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                Family Factors  family factors                      
 9              Gdhlth     health factors  women  -24.491583   87.716867 -0.279212  7.803399e-01  0.109105  0.053425 -197.347402   148.364236  =1 if in good or excel. health  =1 if in good or excel. health    Gdhlth              =1 if in good or excel. ...  health factors     health factors   
 10     Health Factors     health factors  women         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                Health Factors  health factors                      
 11           Clerical         occupation  women  106.507258   61.127321  1.742384  8.281375e-02  0.109105  0.053425  -13.950911   226.965427           =1 if clerical worker  =1 if clerical worker             Clerical            =1 if clerical worker   ...  occupation         occupation       
 12           Construc         occupation  women  361.756430  428.264834  0.844703  3.991782e-01  0.109105  0.053425 -482.186946  1205.699805       =1 if construction worker  =1 if construction worker         Construc            =1 if construction worke...  occupation         occupation       
 13         Occupation         occupation  women         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                    Occupation  occupation                          
 14               Educ      labor factors  women   -6.278397   11.869883 -0.528935  5.973743e-01  0.109105  0.053425  -29.669318    17.112525              years of schooling  years of schooling                Educ                years of schooling      ...  labor factors      labor factors    
 15              Selfe      labor factors  women  -90.685936  112.556497 -0.805693  4.212746e-01  0.109105  0.053425 -312.491002   131.119130             =1 if self employed  =1 if self employed               Selfe               =1 if self employed     ...  labor factors      labor factors    
 16             Totwrk      labor factors  women   -0.125512    0.032713 -3.836783  1.621349e-04  0.109105  0.053425   -0.189977    -0.061048            mins worked per week  mins worked per week              Totwrk              mins worked per week    ...  labor factors      labor factors    
 17            Lhrwage      labor factors  women  -22.580482   53.782320 -0.419850  6.749978e-01  0.109105  0.053425 -128.564512    83.403547                 log hourly wage  log hourly wage                   Lhrwage             log hourly wage         ...  labor factors      labor factors    
 18      Labor Factors      labor factors  women         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                 Labor Factors  labor factors                       
 19                Age        age factors  women    0.953200    2.943209  0.323864  7.463431e-01  0.109105  0.053425   -4.846721     6.753121                        in years  in years                          Age                 in years                ...  age factors        age factors      
 20        Age Factors        age factors  women         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                   Age Factors  age factors                         
 21                NaN                NaN  women         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN                             NaN  Variable              Label                   ...                NaN  Group            
 22            Spsepay      other factors    men    0.003069    0.004924  0.623344  5.335697e-01  0.180382  0.139106   -0.006624     0.012762             spousal wage income  spousal wage income               Spsepay             spousal wage income     ...  other factors      other factors    
 23               Prot      other factors    men  -20.967328   52.201060 -0.401665  6.882393e-01  0.180382  0.139106 -123.726888    81.792233                =1 if Protestant  =1 if Protestant                  Prot                =1 if Protestant        ...  other factors      other factors    
 24              Black      other factors    men -132.967109  132.581166 -1.002911  3.167759e-01  0.180382  0.139106 -393.957639   128.023420                     =1 if black  =1 if black                       Black               =1 if black             ...  other factors      other factors    
 25      Other Factors      other factors    men         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                 Other Factors  other factors                       
 26              South  area of residence    men   79.401694   64.439832  1.232183  2.189217e-01  0.180382  0.139106  -47.450305   206.253693             =1 if live in south  =1 if live in south               South               =1 if live in south     ...  area of residence  area of residence
 27               Smsa  area of residence    men  -27.631427   52.418593 -0.527130  5.985235e-01  0.180382  0.139106 -130.819208    75.556354              =1 if live in smsa  =1 if live in smsa                Smsa                =1 if live in smsa      ...  area of residence  area of residence
 28  Area Of Residence  area of residence    men         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                             Area Of Residence  area of residence                   
 29            Yrsmarr     family factors    men    0.224116    2.934791  0.076365  9.391834e-01  0.180382  0.139106   -5.553120     6.001352                   years married  years married                     Yrsmarr             years married           ...  family factors     family factors   
 30     Family Factors     family factors    men         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                Family Factors  family factors                      
 31             Gdhlth     health factors    men -188.284508   80.476539 -2.339620  2.001135e-02  0.180382  0.139106 -346.705309   -29.863707  =1 if in good or excel. health  =1 if in good or excel. health    Gdhlth              =1 if in good or excel. ...  health factors     health factors   
 32     Health Factors     health factors    men         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                Health Factors  health factors                      
 33           Clerical         occupation    men -229.275962  102.888221 -2.228399  2.665377e-02  0.180382  0.139106 -431.814921   -26.737003           =1 if clerical worker  =1 if clerical worker             Clerical            =1 if clerical worker   ...  occupation         occupation       
 34           Construc         occupation    men   65.696059  107.889208  0.608922  5.430737e-01  0.180382  0.139106 -146.687512   278.079631       =1 if construction worker  =1 if construction worker         Construc            =1 if construction worke...  occupation         occupation       
 35         Occupation         occupation    men         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                    Occupation  occupation                          
 36               Educ      labor factors    men   -7.545420    9.720341 -0.776250  4.382610e-01  0.180382  0.139106  -26.680241    11.589402              years of schooling  years of schooling                Educ                years of schooling      ...  labor factors      labor factors    
 37             Totwrk      labor factors    men   -0.191008    0.029765 -6.417152  5.964764e-10  0.180382  0.139106   -0.249602    -0.132414            mins worked per week  mins worked per week              Totwrk              mins worked per week    ...  labor factors      labor factors    
 38              Selfe      labor factors    men    3.484094   77.585707  0.044906  9.642142e-01  0.180382  0.139106 -149.246005   156.214193             =1 if self employed  =1 if self employed               Selfe               =1 if self employed     ...  labor factors      labor factors    
 39            Lhrwage      labor factors    men    3.544752   47.045923  0.075347  9.399931e-01  0.180382  0.139106  -89.066745    96.156249                 log hourly wage  log hourly wage                   Lhrwage             log hourly wage         ...  labor factors      labor factors    
 40      Labor Factors      labor factors    men         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                 Labor Factors  labor factors                       
 41                Age        age factors    men    1.482893    2.885462  0.513919  6.077171e-01  0.180382  0.139106   -4.197237     7.163023                        in years  in years                          Age                 in years                ...  age factors        age factors      
 42        Age Factors        age factors    men         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN  nan                                                                   Age Factors  age factors                         
 43                NaN                NaN    men         NaN         NaN       NaN           NaN       NaN       NaN         NaN          NaN                             NaN                             NaN  Variable              Label                   ...                NaN  Group            ,
 <Axes: xlabel='Linear Regression coefficient'>)
<Figure size 640x480 with 0 Axes>
"""

plt.show()
```


![image.png](https://tc-cdn.flowus.cn/oss/cbb89ff7-9e1a-4cb2-8d1d-eded6f572759/image.png?time=1747468800&token=05ac3f2a415415e01d2438cbd11d88a205ef6d025f90f9fed441f89453fcdc8e&role=sharePaid)



