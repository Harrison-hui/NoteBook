# 导入模块

```Python
import time
```


# 基本概念

## UTC（Coordinated Universal Time）

也被称为**格林威治标准时间（GMT）**。使用UTC而不是CUT作为缩写是英语与法语（Temps Universel Coordonné）之间妥协的结果。

## epoch（纪元）

起始的时间点， 这在所有平台上都是 **1970-01-01, 00:00:00 (UTC)**（北京时间1970年01月01日08时00分00秒）。

## 时间戳（纪元秒数）

指自 epoch （纪元）时间点以来经过的总秒数。属于一个绝对概念。

## DST（Daylight Saving Time）

**夏令时**。也称为日光节约时制，是一种季节性的时间调整制度，旨在通过在夏季将时间调快一小时，以充分利用自然光，从而节约能源‌。‌

## [struct_time对象](https://docs.python.org/zh-cn/3.12/library/time.html#time.struct_time)

属于一个相对概念。

```Python
time.struct_time(tm_year=2024,    # 年 
                 tm_mon=12,       # 月：[1, 12]
                 tm_mday=29,      # 日：[1, 31]
                 tm_hour=21,      # 时：[0, 23]
                 tm_min=33,       # 分：[0, 59]
                 tm_sec=37,       # 秒：[0, 61]
                 tm_wday=6,       # 星期：[0, 6]，0为周一
                 tm_yday=364,     # 当年第几天：[1, 366]
                 tm_isdst=0       # 是否夏令时：0（否）, 1（是）, -1（未知）
                 )
```


# 当前时间戳：time

`[time.time()](https://docs.python.org/zh-cn/3.12/library/time.html#time.time)`

```Python
time.time()
"""
1735480695.425197
"""
```


# 时间格式转换

## 时间戳 → struct_time对象

### UTC对应struct_time对象：gmtime

`[time.gmtime([secs])](https://docs.python.org/zh-cn/3.12/library/time.html#time.gmtime)`

将一个时间戳转化为UTC对应的struct_time对象，默认使用当前时间戳（即`time.time()`）

```Python
time.gmtime()
time.gmtime(1735480695.425197)
time.gmtime(time.time())
"""
time.struct_time(tm_year=2024, 
                 tm_mon=12, 
                 tm_mday=29, 
                 tm_hour=13, 
                 tm_min=58, 
                 tm_sec=15, 
                 tm_wday=6, 
                 tm_yday=364, 
                 tm_isdst=0)
"""
```


### 本地时间对应struct_time对象：localtime

`[time.localtime([secs])](https://docs.python.org/zh-cn/3.12/library/time.html#time.localtime)`

将一个时间戳转化为本地时间对应的struct_time对象，默认使用当前时间戳（即`time.time()`）

```Python
time.localtime()
time.localtime(1735480695.425197)
time.localtime(time.time())
"""
time.struct_time(tm_year=2024, 
                 tm_mon=12, 
                 tm_mday=29, 
                 tm_hour=21, 
                 tm_min=58, 
                 tm_sec=15, 
                 tm_wday=6, 
                 tm_yday=364, 
                 tm_isdst=0)
"""
```


## struct_time对象 → 易读字符串：asctime

`[time.asctime([t])](https://docs.python.org/zh-cn/3.12/library/time.html#time.asctime)`

将一个struct_time对象转化为易读字符串，默认使用当前本地时间对应struct_time对象（即`time.localtime()`）

```Python
time.asctime()
time.asctime(localtime())
"""
Sun Dec 29 21:58:15 2024
"""

time.asctime(gmtime())
"""
Sun Dec 29 13:58:15 2024
"""
```


## 本地时间struct_time对象 → 时间戳：mktime

`[time.mktime(t)](https://docs.python.org/zh-cn/3.12/library/time.html#time.mktime)`

将一个本地时间对应的struct_time对象转化为时间戳

```Python
time.mktime(localtime())
"""
1735480695.0
"""
```


## 时间戳 → 本地时间易读字符串：ctime

`[time.ctime([secs])](https://docs.python.org/zh-cn/3.12/library/time.html#time.ctime)`

将一个时间戳转化为本地时间对应的易读字符串，默认使用当前时间戳（即`time.time()`）

```Python
time.ctime()
time.ctime(1735480695.425197)
time.ctime(time.time())
"""
Sun Dec 29 21:58:15 2024
"""
```


# 时间格式化

|控制符
||含义|
|-|-|-|
|年|%y|无世纪年份，[00, 99]|
||%Y|有世纪年份，[0001, 9999]|
|月|%b|月份名缩写，Jan~Dec|
||%B|月份名全名，January~December|
||%m|月份号，[01, 12]|
|日|%d|月中日，[01, 31]|
||%j|年中日，[001, 366]|
|时|%H|24小时制，[00, 23]|
||%I|12小时制，[01, 12]|
|分|%M|分钟，[00, 59]|
|秒|%S|秒，[00, 61]|
|上下午|%p|AM, PM|
|星期|%a|星期名缩写，Mon~Sun|
||%A|星期名全名，Monday~Sunday|
||%u|星期号，[1, 7]，1代表星期一|
||%w|星期号，[0, 6]，0代表星期日|
|周数|%U|[00, 53]，一年中的周数（星期日作为一周的第一天）。 在第一个星期日之前的新年中的所有日子都被认为是在第 0 周。|
||%W|[00, 53]，一年中的周数（星期一作为一周的第一天）。 在第一个星期一之前的新年中的所有日子都被认为是在第 0 周。|
|时区|%z|时区偏移，以格式 +HHMM 或 -HHMM 形式的 UTC/GMT 的正或负时差指示，其中H表示十进制小时数字，M表示小数分钟数字 [-23:59, +23:59] 。|
||%Z|时区名称（如果不存在时区，则不包含字符）。|
|其它|%c|适当日期和时间，例：Sun Dec 29 23:53:50 2024|
||%x|适当日期，例：12/29/24|
||%X|适当时间，例：23:58:21|
||%f|微秒数，[000000, 999999]。只应用于 `strptime()`|
||%G|ISO 8601 年份（类似于 %Y 但遵循针对 ISO 8601 日历年份的规则）。 此年份从包含日历年份的第一个星期六的星期开始。|
||%V|ISO 8601 星期序号（以十进制数 [01,53] 表示）。 每年的第一个星期是包含该年的第一个星期六的星期。 每星期的第一天为星期一。|
||%%|"%"字符|

## struct_time对象 → 格式化对象：strftime

`[time.strftime(format[, t])](https://docs.python.org/zh-cn/3.12/library/time.html#time.strftime)`

将一个struct_time对象转化为format 参数指定的格式化字符串，默认使用当前本地时间对应struct_time对象（即`time.localtime()`）

```Python
time.strftime("今天是%Y年%m月%d日 今年第%j天第%U周 现在是%H时%M分%S秒%p %A 时区：%Z%z", time.localtime())
"""
今天是2024年12月29日 今年第364天第52周 现在是21时58分15秒PM Sunday 时区：中国标准时间+0800
"""
```


## 格式化对象 → struct_time对象：strptime

`[time.strptime(string[, format])](https://docs.python.org/zh-cn/3.12/library/time.html#time.strptime)`

将一个格式化字符串按照format 参数指定的格式转化为struct_time对象

```Python
time.strptime("今天是2024年12月29日 今年第364天第52周 现在是21时58分15秒PM Sunday 时区：中国标准时间+0800", "今天是%Y年%m月%d日 今年第%j天第%U周 现在是%H时%M分%S秒%p %A 时区：%Z%z")
"""
time.struct_time(tm_year=2024, 
                 tm_mon=12, 
                 tm_mday=29, 
                 tm_hour=21, 
                 tm_min=58, 
                 tm_sec=15, 
                 tm_wday=6, 
                 tm_yday=364, 
                 tm_isdst=0
                 )
"""
```


# 程序休眠：sleep

`[time.sleep(secs)](https://docs.python.org/zh-cn/3.12/library/time.html#time.sleep)`

使程序休眠指定秒数后再继续运行

```Python
time.sleep(10)
```


