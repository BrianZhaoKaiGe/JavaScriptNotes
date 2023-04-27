# 浏览器同源限制

“三个”相同：

- 协议相同
- 域名相同
- 端口相同（这点可以忽略，详见下文）

- `http://www.example.com/dir2/other.html`：同源
- `http://example.com/dir/other.html`：不同源（域名不同）
- `http://v2.www.example.com/dir/other.html`：不同源（域名不同）
- `http://www.example.com:81/dir/other.html`：不同源（端口不同）
- `https://www.example.com/dir/page.html`：不同源（协议不同）

注意，标准规定端口不同的网址不是同源（比如8000端口和8001端口不是同源），但是浏览器没有遵守这条规定。实际上，同一个网域的不同端口，是可以互相读取 Cookie 的。

**如果不是同源会有三种行为受到限制：**

（1） 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。

（2） 无法接触非同源网页的 DOM。

（3） 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。

## 完全不同源两种解决跨域窗口通信问题

- 片段识别符（fragment identifier）

- 跨文档通信API（Cross-document messaging）

  

  **片段识别符**

   片段标识符（fragment identifier）指的是，URL 的`#`号后面的部分，比如`http://example.com/x.html#fragment`的`#fragment`。如果只是改变片段标识符，页面不会重新刷新。 

  父窗口可以把信息，写入子窗口的片段标识符。

  ```JavaScript
  var src = originURL + '#' + data;document.getElementById('myIFrame').src = src;
  ```

上面代码中，父窗口把所要传递的信息，写入 iframe 窗口的片段标识符。

子窗口通过监听`hashchange`事件得到通知。

```JavaScript
window.onhashchange = checkMessage;function checkMessage() {  var message = window.location.hash;  // ...}
```

同样的，子窗口也可以改变父窗口的片段标识符。

```JavaScript
parent.location.href = target + '#' + hash;
```

## **跨文档通信API**

### window.postMessage()

上面的这种方法属于破解，HTML5 为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）。

这个 API 为`window`对象新增了一个`window.postMessage`方法，允许跨窗口通信，不论这两个窗口是否同源。举例来说，父窗口`aaa.com`向子窗口`bbb.com`发消息，调用`postMessage`方法就可以了。

```javascript
// 父窗口打开一个子窗口var popup = window.open('http://bbb.com', 'title');// 父窗口向子窗口发消息popup.postMessage('Hello World!', 'http://bbb.com');
```

`postMessage`方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为`*`，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似。

```javascript
// 子窗口向父窗口发消息window.opener.postMessage('Nice to see you', 'http://aaa.com');
```

父窗口和子窗口都可以通过`message`事件，监听对方的消息。

```
// 父窗口和子窗口都可以用下面的代码，// 监听 message 消息window.addEventListener('message', function (e) {  console.log(e.data);},false);
```

`message`事件的参数是事件对象`event`，提供以下三个属性。

> - `event.source`：发送消息的窗口
> - `event.origin`: 消息发向的网址
> - `event.data`: 消息内容

下面的例子是，子窗口通过`event.source`属性引用父窗口，然后发送消息。

```javascript
window.addEventListener('message', receiveMessage);function receiveMessage(event) {  event.source.postMessage('Nice to see you!', '*');}
```

上面代码有几个地方需要注意。首先，`receiveMessage`函数里面没有过滤信息的来源，任意网址发来的信息都会被处理。其次，`postMessage`方法中指定的目标窗口的网址是一个星号，表示该信息可以向任意网址发送。通常来说，这两种做法是不推荐的，因为不够安全，可能会被恶意利用。

`event.origin`属性可以过滤不是发给本窗口的消息。

```javascript
window.addEventListener('message', receiveMessage);function receiveMessage(event) {  if (event.origin !== 'http://aaa.com') return;  if (event.data === 'Hello World') {    event.source.postMessage('Hello', event.origin);  } else {    console.log(event.data);  }}
```

