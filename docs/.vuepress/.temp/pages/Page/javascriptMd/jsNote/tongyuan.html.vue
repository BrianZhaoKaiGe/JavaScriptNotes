<template><div><h1 id="浏览器同源限制" tabindex="-1"><a class="header-anchor" href="#浏览器同源限制" aria-hidden="true">#</a> 浏览器同源限制</h1>
<p>“三个”相同：</p>
<ul>
<li>
<p>协议相同</p>
</li>
<li>
<p>域名相同</p>
</li>
<li>
<p>端口相同（这点可以忽略，详见下文）</p>
</li>
<li>
<p><code v-pre>http://www.example.com/dir2/other.html</code>：同源</p>
</li>
<li>
<p><code v-pre>http://example.com/dir/other.html</code>：不同源（域名不同）</p>
</li>
<li>
<p><code v-pre>http://v2.www.example.com/dir/other.html</code>：不同源（域名不同）</p>
</li>
<li>
<p><code v-pre>http://www.example.com:81/dir/other.html</code>：不同源（端口不同）</p>
</li>
<li>
<p><code v-pre>https://www.example.com/dir/page.html</code>：不同源（协议不同）</p>
</li>
</ul>
<p>注意，标准规定端口不同的网址不是同源（比如8000端口和8001端口不是同源），但是浏览器没有遵守这条规定。实际上，同一个网域的不同端口，是可以互相读取 Cookie 的。</p>
<p><strong>如果不是同源会有三种行为受到限制：</strong></p>
<p>（1） 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。</p>
<p>（2） 无法接触非同源网页的 DOM。</p>
<p>（3） 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。</p>
<h2 id="完全不同源两种解决跨域窗口通信问题" tabindex="-1"><a class="header-anchor" href="#完全不同源两种解决跨域窗口通信问题" aria-hidden="true">#</a> 完全不同源两种解决跨域窗口通信问题</h2>
<ul>
<li>
<p>片段识别符（fragment identifier）</p>
</li>
<li>
<p>跨文档通信API（Cross-document messaging）</p>
<p><strong>片段识别符</strong></p>
<p>片段标识符（fragment identifier）指的是，URL 的<code v-pre>#</code>号后面的部分，比如<code v-pre>http://example.com/x.html#fragment</code>的<code v-pre>#fragment</code>。如果只是改变片段标识符，页面不会重新刷新。</p>
<p>父窗口可以把信息，写入子窗口的片段标识符。</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>var src = originURL + '#' + data;document.getElementById('myIFrame').src = src;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p>上面代码中，父窗口把所要传递的信息，写入 iframe 窗口的片段标识符。</p>
<p>子窗口通过监听<code v-pre>hashchange</code>事件得到通知。</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>window.onhashchange = checkMessage;function checkMessage() {  var message = window.location.hash;  // ...}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样的，子窗口也可以改变父窗口的片段标识符。</p>
<div class="language-JavaScript ext-JavaScript line-numbers-mode"><pre v-pre class="language-JavaScript"><code>parent.location.href = target + '#' + hash;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="跨文档通信api" tabindex="-1"><a class="header-anchor" href="#跨文档通信api" aria-hidden="true">#</a> <strong>跨文档通信API</strong></h2>
<h3 id="window-postmessage" tabindex="-1"><a class="header-anchor" href="#window-postmessage" aria-hidden="true">#</a> window.postMessage()</h3>
<p>上面的这种方法属于破解，HTML5 为了解决这个问题，引入了一个全新的API：跨文档通信 API（Cross-document messaging）。</p>
<p>这个 API 为<code v-pre>window</code>对象新增了一个<code v-pre>window.postMessage</code>方法，允许跨窗口通信，不论这两个窗口是否同源。举例来说，父窗口<code v-pre>aaa.com</code>向子窗口<code v-pre>bbb.com</code>发消息，调用<code v-pre>postMessage</code>方法就可以了。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 父窗口打开一个子窗口var popup = window.open('http://bbb.com', 'title');// 父窗口向子窗口发消息popup.postMessage('Hello World!', 'http://bbb.com');</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>postMessage</code>方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为<code v-pre>*</code>，表示不限制域名，向所有窗口发送。</p>
<p>子窗口向父窗口发送消息的写法类似。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 子窗口向父窗口发消息window.opener.postMessage('Nice to see you', 'http://aaa.com');</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>父窗口和子窗口都可以通过<code v-pre>message</code>事件，监听对方的消息。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// 父窗口和子窗口都可以用下面的代码，// 监听 message 消息window.addEventListener('message', function (e) {  console.log(e.data);},false);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>message</code>事件的参数是事件对象<code v-pre>event</code>，提供以下三个属性。</p>
<blockquote>
<ul>
<li><code v-pre>event.source</code>：发送消息的窗口</li>
<li><code v-pre>event.origin</code>: 消息发向的网址</li>
<li><code v-pre>event.data</code>: 消息内容</li>
</ul>
</blockquote>
<p>下面的例子是，子窗口通过<code v-pre>event.source</code>属性引用父窗口，然后发送消息。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span> receiveMessage<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">function</span> <span class="token function">receiveMessage</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  event<span class="token punctuation">.</span>source<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'Nice to see you!'</span><span class="token punctuation">,</span> <span class="token string">'*'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码有几个地方需要注意。首先，<code v-pre>receiveMessage</code>函数里面没有过滤信息的来源，任意网址发来的信息都会被处理。其次，<code v-pre>postMessage</code>方法中指定的目标窗口的网址是一个星号，表示该信息可以向任意网址发送。通常来说，这两种做法是不推荐的，因为不够安全，可能会被恶意利用。</p>
<p><code v-pre>event.origin</code>属性可以过滤不是发给本窗口的消息。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'message'</span><span class="token punctuation">,</span> receiveMessage<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">function</span> <span class="token function">receiveMessage</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>origin <span class="token operator">!==</span> <span class="token string">'http://aaa.com'</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>data <span class="token operator">===</span> <span class="token string">'Hello World'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    event<span class="token punctuation">.</span>source<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token string">'Hello'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>origin<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>
