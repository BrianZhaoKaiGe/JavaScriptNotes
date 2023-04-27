# Location，URL对象

## location属性

`Location`对象提供以下属性。

- `Location.href`：整个 URL。

- `Location.protocol`：当前 URL 的协议，包括冒号（`:`）。

- `Location.host`：主机。如果端口不是协议默认的`80`和`433`，则还会包括冒号（`:`）和端口。

- `Location.hostname`：主机名，不包括端口。

- `Location.port`：端口号。

- `Location.pathname`：URL 的路径部分，从根路径`/`开始。

- `Location.search`：查询字符串部分，从问号`?`开始。

- `Location.hash`：片段字符串部分，从`#`开始。

- `Location.username`：域名前面的用户名。

- `Location.password`：域名前面的密码。

- `Location.origin`：URL 的协议、主机名和端口。

  ## 方法

  **（1）Location.assign()**

  `assign`方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。

  **（2）Location.replace()**

  `replace`方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。

  **（3）Location.reload()**

  `reload`方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。

  它接受一个布尔值作为参数。如果参数为`true`，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即`scrollTop === 0`）。如果参数是`false`或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。

  **（4）Location.toString()**

  `toString`方法返回整个 URL 字符串，相当于读取`Location.href`属性。

## URL 的编码和解码

网页的 URL 只能包含合法的字符。合法字符分成两类。

- URL 元字符：分号（`;`），逗号（`,`），斜杠（`/`），问号（`?`），冒号（`:`），at（`@`），`&`，等号（`=`），加号（`+`），美元符号（`$`），井号（`#`）
- 语义字符：`a-z`，`A-Z`，`0-9`，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`'`），圆括号（`()`）

除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（`%`）加上两个大写的十六进制字母。

比如，UTF-8 的操作系统上，`http://www.example.com/q=春节`这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成`http://www.example.com/q=%E6%98%A5%E8%8A%82`。其中，“春”转成了`%E6%98%A5`，“节”转成了`%E8%8A%82`。这是因为“春”和“节”的 UTF-8 编码分别是`E6 98 A5`和`E8 8A 82`，将每个字节前面加上百分号，就构成了 URL 编码。

JavaScript 提供四个 URL 的编码/解码方法。

- `encodeURI()`
- `encodeURIComponent()`
- `decodeURI()`
- `decodeURIComponent()`

### encodeURI()

`encodeURI()`方法用于转码整个 URL。它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。

```javascript
encodeURI('http://www.example.com/q=春节')// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
```

### encodeURIComponent()

`encodeURIComponent()`方法用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。所以，它不能用于转码整个 URL。它接受一个参数，就是 URL 的片段。

```javascript
encodeURIComponent('春节')// "%E6%98%A5%E8%8A%82"encodeURIComponent('http://www.example.com/q=春节')// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
```

上面代码中，`encodeURIComponent()`会连 URL 元字符一起转义，所以如果转码整个 URL 就会出错。

### decodeURI()

`decodeURI()`方法用于整个 URL 的解码。它是`encodeURI()`方法的逆运算。它接受一个参数，就是转码后的 URL。

```javascript
decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')// "http://www.example.com/q=春节"
```

### decodeURIComponent()

`decodeURIComponent()`用于URL 片段的解码。它是`encodeURIComponent()`方法的逆运算。它接受一个参数，就是转码后的 URL 片段。

```javascript
decodeURIComponent('%E6%98%A5%E8%8A%82')// "春节"
```

## URL 接口

 `URL`接口是一个构造函数，浏览器原生提供，可以用来构造、解析和编码 URL。一般情况下，通过`window.URL`可以拿到这个构造函数。 

## 方法

**（1）URL.createObjectURL()**

`URL.createObjectURL()`方法用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了`File`对象或`Blob`对象的 URL。

```javascript
// HTML 代码如下
// <div id="display"/>
// <input
//   type="file"
//   id="fileElem"
//   multiple
//   accept="image/*"
//   onchange="handleFiles(this.files)"//  >

var div = document.getElementById('display');
function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        var img = document.createElement('img');
        img.src = window.URL.createObjectURL(files[i]);
        div.appendChild(img);
    }}
```

上面代码中，`URL.createObjectURL()`方法用来为上传的文件生成一个 URL 字符串，作为``元素的图片来源。

该方法生成的 URL 就像下面的样子。

```javascript
blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1
```

注意，每次使用`URL.createObjectURL()`方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用`URL.revokeObjectURL()`方法释放这个实例。

```javascript
var div = document.getElementById('display');
function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        var img = document.createElement('img');
        img.src = window.URL.createObjectURL(files[i]);
        div.appendChild(img);
        img.onload = function() {
            window.URL.revokeObjectURL(this.src);
        }
    }}
```

上面代码中，一旦图片加载成功以后，为本地文件生成的 URL 字符串就没用了，于是可以在`img.onload`回调函数里面，通过`URL.revokeObjectURL()`方法卸载这个 URL 实例。