# 导入模块

```Python
import math
```


# 常量

|代码|含义|值|
|-|-|-|
|`[math.pi](https://docs.python.org/zh-cn/3.12/library/math.html#math.pi)`|圆周率π|3.141592653589793|
|`[math.tau](https://docs.python.org/zh-cn/3.12/library/math.html#math.tau)`|圆周常数τ=2π|6.283185307179586|
|`[math.e](https://docs.python.org/zh-cn/3.12/library/math.html#math.e)`|自然常数e|2.718281828459045|
|`[math.inf](https://docs.python.org/zh-cn/3.12/library/math.html#math.inf)`|浮点正无穷大 （对于负无穷大，使用 `-math.inf` ）。相当于 `float('inf')` 的输出。|inf|
|`[math.nan](https://docs.python.org/zh-cn/3.12/library/math.html#math.nan)`|一个浮点数值 "Not a Number" (NaN)。 相当于 `float('nan')` 的输出。|nan|

# 数论与表示函数

|代码|含义|
|-|-|
|`[math.ceil(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.ceil)`|≥x的最小整数|
|`[math.floor(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.floor)`|≤x的最大整数|
|`[math.frexp(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.frexp)`|(m, e)，满足$x = m \times 2^{e}$|
|`[math.ldexp(m, e)](https://docs.python.org/zh-cn/3.12/library/math.html#math.ldexp)`|$m \times 2^{e}$|
|`[math.lcm(a, b, ...)](https://docs.python.org/zh-cn/3.12/library/math.html#math.lcm)`|最小公倍数，参数必须为整数|
|`[math.gcd(a, b, ...)](https://docs.python.org/zh-cn/3.12/library/math.html#math.gcd)`|最大公约数，参数必须为整数|
|`[math.fabs(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.fabs)`|$|x|$|
|`[math.factorial(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.factorial)`|$x!$|
|`[math.copysign(x, y)](https://docs.python.org/zh-cn/3.12/library/math.html#math.copysign)`|y的符号 + $|x|$|
|`[math.isqrt(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.isqrt)`|返回非负整数 x 的整数平方根，是对 x 的实际平方根向下取整，或者相当于使得 a² ≤ x 的最大整数 a|
|`[math.nextafter(x, y, steps=1)](https://docs.python.org/zh-cn/3.12/library/math.html#math.nextafter)`|从 x 到 y 以步长为steps的下一个可表示浮点数|
|`[math.comb(n, k)](https://docs.python.org/zh-cn/3.12/library/math.html#math.comb)`|从n项中不重复无顺序取k项的方式总数或多项式$(1+x)^{n}$展开中第k项的系数（二项式系数），$n! \over {k!(n-k)!}$|
|`[math.perm(n, k=n)](https://docs.python.org/zh-cn/3.12/library/math.html#math.perm)`|从n项中不重复有顺序取k项的方式总数，$n! \over (n-k)!$|
|`[math.fsum(iterable)](https://docs.python.org/zh-cn/3.12/library/math.html#math.fsum)`|对iterable（如列表等）求和|
|`[math.prod(iterable, start=1)](https://docs.python.org/zh-cn/3.12/library/math.html#math.prod)`|对iterable（如列表等）求积，初始值为start|
|`[math.sumprod(p, q)](https://docs.python.org/zh-cn/3.12/library/math.html#math.sumprod)`|对两个iterable（如列表等）一一对应求积后求和，二者长度必须相等|
|`[math.trunc(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.trunc)`|截取x的整数部分，带x的符号|
|`[math.modf(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.modf)`|截取x的小数部分和整数部分，均带x的符号|
|`[math.remainder(x, y)](https://docs.python.org/zh-cn/3.12/library/math.html#math.remainder)`|x/y的余数，$x-n \times y$，n为x/y最接近的整数，若为.5，则取最接近的偶数|
|`[math.fmod(x, y)](https://docs.python.org/zh-cn/3.12/library/math.html#math.fmod)`|x/y的余数，$x-n \times y$，n为≥x/y最小整数|
|`[math.isclose(a, b, rel_tol=1e-09, abs_tol=0.0)](https://docs.python.org/zh-cn/3.12/library/math.html#math.isclose)`|a 和 b 的值比较接近则返回 True，即`abs(a-b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)`。rel_tol（相对容差）∈(0, 1.0]；abs_tol（绝对容差）≥0.0|
|`[math.isfinite(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.isfinite)`|x 既不是无穷大也不是NaN，则返回 True |
|`[math.isinf(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.isinf)`|x 是正或负无穷大，则返回 True|
|`[math.isnan(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.isnan)`|x 是 NaN（不是数字），则返回 True|

# 幂函数

|代码|含义|
|-|-|
|`[math.pow(x, y)](https://docs.python.org/zh-cn/3.12/library/math.html#math.pow)`|$x ^ y$|
|`[math.sqrt(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.sqrt)`|$\sqrt{x}$|
|`[math.cbrt(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.cbrt)`|$\sqrt[3]{x}$|

# 指数函数

|代码|含义|
|-|-|
|`[math.exp(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.exp)`|$e ^ {x}$|
|`[math.expm1(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.expm1)`|$e^{x}-1$|
|`[math.exp2(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.exp2)`|$2 ^ {x}$|

# 对数函数

|代码|含义|
|-|-|
|`[math.log(x, base)](https://docs.python.org/zh-cn/3.12/library/math.html#math.log)`|$\log_{base}({x})$|
|`[math.log(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.log)`|$\ln(x)$|
|`[math.log1p(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.log1p)`|$\ln(1+x)$|
|`[math.log2(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.log2)`|$\log_{2}{x}$|
|`[math.log10(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.log10)`|$\lg{x}$|

# 角度转换

|代码|含义|
|-|-|
|`[math.radians(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.radians)`|度数 → 弧度|
|`[math.degrees(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.degrees)`|弧度 → 度数|

# 三角函数

|代码|含义|
|-|-|
|`[math.sin(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.sin)`|$\sin(x)$，x应为弧度|
|`[math.cos(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.cos)`|$\cos(x)$，x应为弧度|
|`[math.tan(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.tan)`|$\tan(x)$，x应为弧度|
|`[math.asin(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.asin)`|$\arcsin(x)$，返回弧度[$-{\pi \over 2}$, $\pi \over 2$]|
|`[math.acos(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.acos)`|$\arccos(x)$，返回弧度[$0$, $\pi$]|
|`[math.atan(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.atan)`|$\arctan(x)$，返回弧度($-{\pi \over 2}$, $\pi \over 2$)|
|`[math.atan2(y, x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.atan2)`|$\arctan({y \over x})$，返回弧度[$-\pi$, $-{\pi \over 2}$)∪($-{\pi \over 2}$, $\pi \over 2$)∪($\pi \over 2$, $\pi$]|

# 双曲函数

|代码|含义|
|-|-|
|`[math.sinh(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.sinh)`|$\sinh(x) = {{e^{x} - e^{-x}} \over {2}}$|
|`[math.cosh(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.cosh)`|$\cosh(x) = {{e^{x} + e^{-x}} \over {2}}$|
|`[math.tanh(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.tanh)`|$\tanh(x) = {\sinh(x) \over \cosh(x)} = {{e^{x} -e^{-x}} \over {{e^{x} + e^{-x}} }}$|
|`[math.asinh(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.asinh)`|$arc\sinh(x) = \ln(x + \sqrt{x^{2}+1})$|
|`[math.acosh(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.acosh)`|$arc\cosh(x) = \ln(x + \sqrt{x^{2}-1})$|
|`[math.atanh(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.atanh)`|$arc\tanh(x) = {1 \over 2} \ln({1+x \over 1-x})$|

# 距离函数

|代码|含义|
|-|-|
|`[math.dist(p, q)](https://docs.python.org/zh-cn/3.12/library/math.html#math.dist)`|返回任意维度中，两个坐标点之间的距离|
|`[math.hypot(x, y, ...)](https://docs.python.org/zh-cn/3.12/library/math.html#math.hypot)`|返回任意维度中，坐标点到原点的距离|

# 其他函数

|代码|函数|
|-|-|
|`[math.erf(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.erf)`|返回x处的误差函数值|
|`[math.erfc(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.erfc)`|返回x处的互补误差函数值|
|`[math.gamma(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.gamma)`|返回x处的gamma函数值|
|`[math.lgamma(x)](https://docs.python.org/zh-cn/3.12/library/math.html#math.lgamma)`|返回gamma函数在 x 绝对值的自然对数|



