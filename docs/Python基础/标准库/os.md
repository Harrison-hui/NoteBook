# 导入模块

```Python
import os
import time
```


# 操作系统类型：name

`os.name`

返回操作系统类型

1. **Windows**："nt"

2. **Unix/Linux**："posix"

```Python
os.name
"""
nt
"""
```


# 当前工作目录：getcwd

`os.getcwd()`

即当前py文件运行后实现操作的目录，具体差别见后

![image.png](https://tc-cdn.flowus.cn/oss/472d371d-6770-4f80-b812-0a957783b78d/image.png?time=1747470600&token=a49680f0c11ed1c199e618b8810a3ad91739a8eeeb3622435c68eb61ab576d0b&role=sharePaid)

```Python
os.getcwd()
"""
D:\OneDrive\文档\8.Py_Project\Learning\系统学习\11.os
"""
```


# 改变工作目录：chdir

`os.chdir(path)`

改变当前py文件运行后实现操作的目录，但py文件实际位置不会移动，具体差别见后

![image.png](https://tc-cdn.flowus.cn/oss/f3b59b45-135d-4701-8521-4bb468d4151a/image.png?time=1747470600&token=78e2b068ffb5d3731a4e320ff4b6a1fb86b3eefe43061e100b11dd6388f4ed29&role=sharePaid)

![image.png](https://tc-cdn.flowus.cn/oss/31c918a9-aa9c-4f4c-aaf4-4acde886e797/image.png?time=1747470600&token=505c4d33bf54fefb9bd54a425fae323c852a7842e9b0901ebaec904e1bc423db&role=sharePaid)

```Python
os.chdir("D:/OneDrive/文档/8.Py_Project/Learning/系统学习/11.os/new dir")
os.getcwd()
"""
D:\OneDrive\文档\8.Py_Project\Learning\系统学习\11.os\new dir
"""
```


# 文件或目录列表：listdir

`os.listdir(path=".")`

列出指定目录下所有文件或目录名称并形成列表，默认列出当前工作目录（"."）下

```Python
os.listdir(path="D:/OneDrive/文档/8.Py_Project/Learning/系统学习/11.os/new dir")
"""
['新建 文本文档.txt', '新建文件夹']
"""

os.listdir()
"""
['11.os.py', 'new dir', 'os-shutil.py', 'os-创建临时文件和文件夹.py', 'os-压缩包.py']
"""

os.chdir("D:/OneDrive/文档/8.Py_Project/Learning/系统学习/11.os/new dir")
os.listdir()
"""
['新建 文本文档.txt', '新建文件夹']
"""
```


# 文件或目录状态：stat

`os.stat(path, dir_fd=None, follow_symlinks=True)`

获取一个文件或文件描述符的状态

3. **path**：路径

4. **dir_fd**：文件描述符

5. follow_symlinks：略

![image.png](https://tc-cdn.flowus.cn/oss/a7c4eaba-e1bf-4d9d-b9f1-4c9ae5ea2e37/image.png?time=1747470600&token=aa1a5075ac7f6491ec4c9407fe40ecf24ca961ad140a1327fe12707d9ea69860&role=sharePaid)

```Python
stat_info = os.stat("./os-shutil.py")
"""
os.stat_result(st_mode=33206,                 # 模式
               st_ino=281474976738329,        # 索引节点号：Unix（inode号），Windows（索引）
               st_dev=4943362207570832230,    # 所在设备标识符
               st_nlink=1,                    # 硬链接数量
               st_uid=0,                      # 所有者用户标识符
               st_gid=0,                      # 所有者组标识符
               st_size=598,                   # 大小
               st_atime=1735472086,           # 最近访问时间时间戳
               st_mtime=1633612744,           # 最近修改时间时间戳
               st_ctime=1705244584            # 创建时间时间戳
               )
"""

stat_info.st_size
"""
598
"""

time.ctime(stat_info.st_atime)
"""
Sun Dec 29 19:34:46 2024
"""

time.ctime(stat_info.st_mtime)
"""
Thu Oct  7 21:19:04 2021
"""

time.ctime(stat_info.st_ctime)
"""
Sun Jan 14 23:03:04 2024
"""
```


# 浏览目录：scandir

`os.scandir(path='.')`

返回指定目录中文件或目录的 `os.DirEntry` 对象的迭代器，默认浏览当前工作目录（"."）

```Python
entrys = list(os.scandir("./"))
"""
[<DirEntry '11.os.py'>, <DirEntry 'new dir'>, <DirEntry 'os-shutil.py'>, <DirEntry 'os-创建临时文件和文件夹.py'>, <DirEntry 'os-压缩包.py'>]
"""

entry = entrys[2]
entry.name
"""
os-shutil.py
"""

entry.path
"""
./os-shutil.py
"""

entry.inode()
"""
281474976738329
"""

entry.is_dir()
"""
False
"""

entry.is_file()
"""
True
"""

entry.stat()
"""
os.stat_result(st_mode=33206, 
               st_ino=0, 
               st_dev=0, 
               st_nlink=0, 
               st_uid=0, 
               st_gid=0, 
               st_size=598, 
               st_atime=1735471295, 
               st_mtime=1633612744, 
               st_ctime=1705244584)
"""
```


# 遍历目录：walk

`os.walk(top, topdown=True, onerror=None, followlinks=False)`

生成目录树中的文件名，方式是按上 → 下或下 → 上顺序遍历目录树。对于以 *top* 为根的目录树中的每个目录（包括 *top* 本身），它都会生成一个三元组 `(dirpath, dirnames, filenames)`。

6. **top**：根目录

7. **topdown**：遍历方式是否按上→下。默认True

8. onerror：略

9. followlinks：略

```Python
list(os.walk("./", topdown=True))
"""
[('./', ['new dir'], ['11.os.py', 'os-shutil.py', 'os-创建临时文件和文件夹.py', 'os-压缩包.py']), 
 ('./new dir', ['新建文件夹'], ['新建 文本文档.txt']), 
 ('./new dir\\新建文件夹', [], [])
]
"""

list(os.walk("./", topdown=False))
"""
[('./new dir\\新建文件夹', [], []), 
 ('./new dir', ['新建文件夹'], ['新建 文本文档.txt']), 
 ('./', ['new dir'], ['11.os.py', 'os-shutil.py', 'os-创建临时文件和文件夹.py', 'os-压缩包.py'])
]
"""
```


