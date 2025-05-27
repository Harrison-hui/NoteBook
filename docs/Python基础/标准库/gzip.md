[NC_1.fastq.gz](https://flowus.cn/preview/81834935-3027-4aae-9a5c-4ece6ab9be5c)

![image.png](https://tc-cdn.flowus.cn/oss/7b6df6be-7a0d-4de8-bb4e-ac8d26b86fe4/image.png?time=1747470600&token=b42e30fc43e12ae66e68821f8c66e300b213280cae54a0b42b708f26adf750a2&role=sharePaid)

# 导入模块

```Python
import gzip
```


# GzipFile对象

`gzip.GzipFile(filename=None, mode=None, compresslevel=9, fileobj=None, mtime=None)`

1. **filename**：一个实际的文件名（一个 `str` 对象或者 `bytes` 对象），或者是一个用来读写的已存在的文件对象

2. **mode**：**只能是二进制模式**

```Python
with gzip.GzipFile("NC_1.fastq.gz", "rb") as file:
    print(file.readline())
    print(file.readline())
    print(file.readline())
    print(file.readline())
    
"""
b'@A00917:294:HC5KJDSXY:2:1101:2700:1689\n'
b'TTGAGAGGCTGAGGCAGGAGGATCACTGGGGCCCAGGAGGTTGAGCCTACAATGAGTTATGATCATGCCACTGCACTCCAGCCTGAGTAACAAAGTGAGACCTTGTGTCTTAAAAAAACAAAAACCACTAAAATAGCAACAAGAGCAGTA\n'
b'+\n'
b'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF:FFFFFFF:FFF\n
"""
```


# 函数

## open

`gzip.open(filename, mode='rb', compresslevel=9, encoding=None, errors=None, newline=None)`

以二进制方式或者**文本方式**打开一个 gzip 格式的压缩文件，返回一个 `file object`

二进制模式：`gzip.open(filename, mode='rb')`等价于`gzip.GzipFile(filename=None, mode=None)`
**文本模式**：相当于`file.open()`下的文本模式

3. **filename**：一个实际的文件名（一个 `str` 对象或者 `bytes` 对象），或者是一个用来读写的已存在的文件对象

4. **mode**：默认值是 'rb'

  1. 二进制模式：'r', 'rb', 'a', 'ab', 'w', 'wb', 'x' 或 'xb'

  2. **文本模式**：'rt', 'at', 'wt', 或 'xt'

5. compresslevel：同上

6. encoding：同`file.open()`，仅用于文本模式

7. errors：同`file.open()`，仅用于文本模式

8. newline：同`file.open()`，仅用于文本模式

```Python
with gzip.open("NC_1.fastq.gz", "rt") as file:
    print(file.readline())
    print(file.readline())
    print(file.readline())
    print(file.readline())
    
"""
@A00917:294:HC5KJDSXY:2:1101:2700:1689

TTGAGAGGCTGAGGCAGGAGGATCACTGGGGCCCAGGAGGTTGAGCCTACAATGAGTTATGATCATGCCACTGCACTCCAGCCTGAGTAACAAAGTGAGACCTTGTGTCTTAAAAAAACAAAAACCACTAAAATAGCAACAAGAGCAGTA

+

FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF:FFFFFFF:FFF


"""
```


## compress

`gzip.compress(data, compresslevel=9, *, mtime=None)`

压缩 data(必须是`bytes`对象)，返回一个包含已压缩数据的 `bytes` 对象

```Python
a = gzip.compress(b"ATTTTCCCGGCTCGCT")
print(a)

"""
b'\x1f\x8b\x08\x00\x82\x9a!g\x02\xffs\x0c\x01\x02gggww\xe7\x10g \x06\x00\x85]\x14\xd0\x10\x00\x00\x00'
"""
```


## decompress

`gzip.decompress(data)`

解压缩 data(必须是`bytes`对象)，返回一个包含已解压数据的 `bytes` 对象

```Python
a = gzip.decompress(b'\x1f\x8b\x08\x00\x82\x9a!g\x02\xffs\x0c\x01\x02gggww\xe7\x10g \x06\x00\x85]\x14\xd0\x10\x00\x00\x00')
print(a)

"""
b'ATTTTCCCGGCTCGCT'
"""
```


