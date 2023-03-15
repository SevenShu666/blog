# Node.js

[Node.js中文文档](https://www.nodeapp.cn/)

​		Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O的模型，使其轻量又高效。

## 事件驱动程序

​		大多数 Node.js 核心 API 都采用惯用的异步事件驱动架构，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器）。

​		根据设计模式中观察者模式实现，每个异步事件都生成一个事件的观察值，如果有事件发生就调用该回调函数，监听器函数可以使用 `setImmediate()` 或 `process.nextTick()` 方法切换到异步操作模式

## 非阻塞式 I/O

​		可以将一些相应的逻辑处理程序放入回调中去执行，这样就不会阻塞后面的代码。例如，可以一边读取文件，一边执行其他命令，在文件读取完毕后，将文件内容作为回调的参数给到回调函数，这样这样在执行代码时就没有阻塞或等待文件 `I/O` 操作

## Buffer (缓冲)

​		在ES6引入TypeArray之前，Javascript语言没有读取或操作二进制数据流的机制。Buffer被引入，用来在TCP流或文件系统操作等中处理二进制数据流。

​		Buffer类的实例类似于整数数组，大小是固定的、且在V8堆外分配物理内存，大小在被创建时确定，且无法调整。

~~~js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
~~~

​		为了使 `Buffer` 实例的创建更可靠、更不容易出错，各种 `new Buffer()` 构造函数已被 **废弃**，并由 `Buffer.from()`、`Buffer.alloc()`、和 `Buffer.allocUnsafe()` 方法替代。

- [`Buffer.from(array)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_from_array) 返回一个新建的包含所提供的字节数组的副本的 `Buffer`。
- \[`Buffer.from(arrayBuffer[, byteOffset [, length]])`\][`Buffer.from(arrayBuffer)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length) 返回一个新建的与给定的 [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 共享同一内存的 `Buffer`。
- [`Buffer.from(buffer)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_from_buffer) 返回一个新建的包含所提供的 `Buffer` 的内容的副本的 `Buffer`。
- [`Buffer.from(string[, encoding])`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_from_string_encoding) 返回一个新建的包含所提供的字符串的副本的 `Buffer`。
- \[`Buffer.alloc(size[, fill[, encoding]])`\][`Buffer.alloc()`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_alloc_size_fill_encoding) 返回一个指定大小的被填满的 `Buffer` 实例。 这个方法会明显地比 [`Buffer.allocUnsafe(size)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_allocunsafe_size) 慢，但可确保新创建的 `Buffer` 实例绝不会包含旧的和潜在的敏感数据。
- [`Buffer.allocUnsafe(size)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_allocunsafe_size) 与 [`Buffer.allocUnsafeSlow(size)`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_allocunsafeslow_size) 返回一个新建的指定 `size` 的 `Buffer`，但它的内容**必须**被初始化，可以使用 [`buf.fill(0)`](https://www.nodeapp.cn/buffer.html#buffer_buf_fill_value_offset_end_encoding) 或完全写满。

​		如果 `size` 小于或等于 [`Buffer.poolSize`](https://www.nodeapp.cn/buffer.html#buffer_class_property_buffer_poolsize) 的一半，则 [`Buffer.allocUnsafe()`](https://www.nodeapp.cn/buffer.html#buffer_class_method_buffer_allocunsafe_size) 返回的 `Buffer` 实例**可能**会被分配进一个共享的内部内存池。

## stream(流)

### 管道流

用于从一个流中获取数据，并将数据传输到另一个流中。

~~~js
const fs = require('fs');
// 创建可读流
const readerStream = fs.createReadStream('./package.json');
// 创建可写流
const writerStream = fs.createWriteStream('./test.txt');
// 设置编码为utf8
readerStream.pipe(writerStream);
console.log('执行完毕');
~~~

### 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。

~~~js
const fs = require('fs');
const zlib = require('zlib');
// 压缩test.txt为test.zip
fs.createReadStream('./test.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('test.txt.zip'));
console.log('文件压缩成功');
~~~

## 常用内置模块

### fs模块

#### 1.打开文件

异步地打开文件

~~~js
fs.open(path, flags[, mode], callback)
~~~

- path：string|Buffer|URL - 文件的路径

- flags - 文件打开的行为

- mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)

- callback - 回调函数，带有两个参数如：callback(err, fd)

flags 参数可以是以下值：

| **Flag** | **描述**                                               |
| -------- | ------------------------------------------------------ |
| **r**    | 以读取模式打开文件。如果文件不存在抛出异常。           |
| **r+**   | 以读写模式打开文件。如果文件不存在抛出异常。           |
| **rs**   | 以同步的方式读取文件。                                 |
| **rs+**  | 以同步的方式读取和写入文件。                           |
| **w**    | 以写入模式打开文件，如果文件不存在则创建。             |
| **wx**   | 类似 'w'，但是如果文件路径存在，则文件写入失败。       |
| **w+**   | 以读写模式打开文件，如果文件不存在则创建。             |
| **wx+**  | 类似 'w+'， 但是如果文件路径存在，则文件读写失败。     |
| **a**    | 以追加模式打开文件，如果文件不存在则创建。             |
| **ax**   | 类似 'a'， 但是如果文件路径存在，则文件追加失败。      |
| **a+**   | 以读取追加模式打开文件，如果文件不存在则创建。         |
| **ax+**  | 类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。 |

#### 2.写入文件

~~~js
fs.writeFile(file, data[, options], callback)
~~~

异步地写入数据到文件，如果文件已经存在，则替代文件。 `data` 可以是一个字符串或一个 buffer。

- **file** ：string|Buffer|URL|integer- 文件名或文件描述符。

- **data** - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。

- **options** - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'

- **callback** - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

如果 `data` 是一个 buffer，则忽略 `encoding` 选项。它默认为 `'utf8'`。

~~~js
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
~~~

> 注意：如果 `file` 指定为一个文件描述符，则它不会被自动关闭。多次对同一文件使用 `fs.writeFile` 且不等待回调，是不安全的。 对于这种情况，强烈推荐使用 `fs.createWriteStream`。

#### 3.读取文件

~~~js
fs.read(fd, buffer, offset, length, position, callback)
~~~

- `fd` 
- `buffer`
- `offset` 
- `length` 
- `position` 
- `callback`
  - `err` 
  - `bytesRead` 
  - `buffer` 

从 `fd` 指定的文件中读取数据。

`buffer` 是数据将被写入到的 buffer。

`offset` 是 buffer 中开始写入的偏移量。

`length` 是一个整数，指定要读取的字节数。

`position` 指定从文件中开始读取的位置。 如果 `position` 为 `null`，则数据从当前文件读取位置开始读取，且文件读取位置会被更新。 如果 `position` 为一个整数，则文件读取位置保持不变。

回调有三个参数 `(err, bytesRead, buffer)`。

如果调用该方法的 [`util.promisify()`](https://www.nodeapp.cn/util.html#util_util_promisify_original) 版本，将会返回一个包含 `bytesRead` 和 `buffer` 属性的 Promise。

#### 4.关闭文件

~~~js
fs.close(fd, callback)
~~~

- `fd` 
- `callback`
  - `err` 

 完成回调只有一个可能的异常参数。

#### 5.截取文件

~~~js
fs.ftruncate(fd[, len], callback)
~~~

- `fd` 
- `len` 默认 = `0`
- `callback`
  - `err` 

完成回调只有一个可能的异常参数。

如果文件描述符指向的文件大于 `len` 个字节，则只有前面 `len` 个字节会保留在文件中。

~~~js
console.log(fs.readFileSync('temp.txt', 'utf8'));
// 输出: Node.js

// 获取要截断的文件的文件描述符
const fd = fs.openSync('temp.txt', 'r+');

// 截断文件至前4个字节
fs.ftruncate(fd, 4, (err) => {
  assert.ifError(err);
  console.log(fs.readFileSync('temp.txt', 'utf8'));
});
// 输出: Node
~~~

如果前面的文件小于 `len` 个字节，则扩展文件，且扩展的部分用空字节（'\0'）填充。

~~~js
console.log(fs.readFileSync('temp.txt', 'utf8'));
// 输出: Node.js

// 获取要截断的文件的文件描述符
const fd = fs.openSync('temp.txt', 'r+');

// 截断文件至前10个字节，但实际大小是7个字节
fs.ftruncate(fd, 10, (err) => {
  assert.ifError(err);
  console.log(fs.readFileSync('temp.txt'));
});
// 输出: <Buffer 4e 6f 64 65 2e 6a 73 00 00 00>
// ('Node.js\0\0\0' in UTF8)
~~~

#### 6.删除文件

~~~js
fs.unlink(path, callback)
~~~

#### 7.创建目录

~~~js
fs.mkdir(path[, mode], callback)
~~~

- `path` 
- `mode`  **Default:** `0o777`
- `callback`
  - `err` 

异步地创建目录。 完成回调只有一个可能的异常参数。 `mode` 默认为 `0o777`。

#### 8.读取目录

~~~js
fs.readdir(path[, options], callback)
~~~

- `path` 
- `options`
  - `encoding`  默认 = `'utf8'`
- `callback`
  - `err`
  - `files` 

读取一个目录的内容。 回调有两个参数 `(err, files)`，其中 `files` 是目录中不包括 `'.'` 和 `'..'` 的文件名的数组

#### 9.删除目录

~~~js
fs.rmdir(path, callback)
~~~

- **path** - 文件路径。
- **callback** - 回调函数，没有参数
  - err

完成回调只有一个可能的异常参数。

#### 异步代码同步化

##### 1.promise

~~~js
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
readFile('./01-runnode.js').then(data=>console.log(data));
~~~

##### 2.Promises API（node版本在10.0以上）

~~~js
const {promises} = require('fs');
promises.readFile('./01-runnode.js').then(data => console.log(data));
~~~

##### 3.generator

~~~js
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

function* read() {
    yield readFile('./01-runnode.js');
}
let ge = read();
ge.next().value.then(data=>{
    console.log(data);
})
~~~

##### 4.async

~~~js
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

async function asyncReadFile() {
    let a = await readFile('./01-runnode.js');
    console.log(a.toString());
}
asyncReadFile();
~~~

### os模块

~~~js
const os = require('os');
// 系统内存总量
console.log(os.totalmem());
// 操作系统空闲内存量
console.log(os.freemem());

const mem = os.freemem() / os.totalmem() * 100;
console.log(`内存占有率${mem}%`);
~~~

### http模块

~~~js
const http = require('http');
http.createServer((req,res)=>{
    res.end('响应完成了');
}).listen(3000);
~~~

