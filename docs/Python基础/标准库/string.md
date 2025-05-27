# 导入模块

```Python
import string
```


# 常量

| 类别    | 代码                                                                                                        | 含义                                                                                         | 结果                                                                                             |
|-------|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| 可打印字符 | [string.printable](https://docs.python.org/zh-cn/3.12/library/string.html#string.printable)               | 由被视为可打印符号的 ASCII 字符组成的字符串。 这是 `digits`, `ascii_letters`, `punctuation` 和 `whitespace` 的总和。 | "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{ |}~ \t\n\r\x0b\x0c"|
| 数字    | `[string.digits](https://docs.python.org/zh-cn/3.12/library/string.html#string.digits)`                   | 十进制数                                                                                       | "0123456789"                                                                                   |
|       | `[string.octdigits](https://docs.python.org/zh-cn/3.12/library/string.html#string.octdigits)`             | 八进制数                                                                                       | "01234567"                                                                                     |
|       | `[string.hexdigits](https://docs.python.org/zh-cn/3.12/library/string.html#string.hexdigits)`             | 十六进制数                                                                                      | "0123456789abcdefABCDEF"                                                                       |
| 字母    | `[string.ascii_letters](https://docs.python.org/zh-cn/3.12/library/string.html#string.ascii_letters)`     | 所有字母，`ascii_lowercase` 和 `ascii_uppercase` 常量的拼连                                           | "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"                                         |
|       | `[string.ascii_lowercase](https://docs.python.org/zh-cn/3.12/library/string.html#string.ascii_lowercase)` | 小写字母                                                                                       | "abcdefghijklmnopqrstuvwxyz"                                                                   |
|       | `[string.ascii_uppercase](https://docs.python.org/zh-cn/3.12/library/string.html#string.ascii_uppercase)` | 大写字母                                                                                       | "ABCDEFGHIJKLMNOPQRSTUVWXYZ"                                                                   |
| 标点符号  | `[string.punctuation](https://docs.python.org/zh-cn/3.12/library/string.html#string.punctuation)`         | 由在 C 区域设置中被视为标点符号的 ASCII 字符所组成的字符串                                                         | "!"#$%&\'()*+,-./:;<=>?@[\\]^_`{                                                               |}~"|
| 空白符   | `[string.whitespace](https://docs.python.org/zh-cn/3.12/library/string.html#string.whitespace)`           | 由被视为空白符号的 ASCII 字符组成的字符串。 其中包括空格、制表、换行、回车、进纸和纵向制表符。                                        | " \t\n\r\x0b\x0c"                                                                              |

# [Template类](https://docs.python.org/zh-cn/3.12/library/string.html#string.Template)

```Python
s = string.Template("${name}的语文成绩是${score}分。")

s.substitute(name="李明", score=98)
s.substitute({"name": "李明", "score": 98})
"""
李明的语文成绩是98分。
"""

s.substitute(name="李明")
"""
KeyError: 'score'
"""

s.safe_substitute(name="李明")
"""
李明的语文成绩是${score}分。
"""
```


# [capword函数](https://docs.python.org/zh-cn/3.12/library/string.html#string.capwords)

使用 `str.split()` 将参数拆分为单词，使用 `str.capitalize()` 将单词转为大写形式，使用 `str.join()` 将大写的单词进行拼接。 如果可选的第二个参数 *sep* 被省略或为 `None`，则连续的空白字符会被替换为单个空格符并且开头和末尾的空白字符会被移除，否则 *sep* 会被用来拆分和拼接单词。

```Python
string.capwords("hello world!please input: ")
"""
Hello World!please Input:
"""

string.capwords("hello world!please input: ", sep="!")
"""
Hello world!Please input: 
"""
```


