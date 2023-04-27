<template><div><h1 id="location-url对象" tabindex="-1"><a class="header-anchor" href="#location-url对象" aria-hidden="true">#</a> Location，URL对象</h1>
<h2 id="location属性" tabindex="-1"><a class="header-anchor" href="#location属性" aria-hidden="true">#</a> location属性</h2>
<p><code v-pre>Location</code>对象提供以下属性。</p>
<ul>
<li>
<p><code v-pre>Location.href</code>：整个 URL。</p>
</li>
<li>
<p><code v-pre>Location.protocol</code>：当前 URL 的协议，包括冒号（<code v-pre>:</code>）。</p>
</li>
<li>
<p><code v-pre>Location.host</code>：主机。如果端口不是协议默认的<code v-pre>80</code>和<code v-pre>433</code>，则还会包括冒号（<code v-pre>:</code>）和端口。</p>
</li>
<li>
<p><code v-pre>Location.hostname</code>：主机名，不包括端口。</p>
</li>
<li>
<p><code v-pre>Location.port</code>：端口号。</p>
</li>
<li>
<p><code v-pre>Location.pathname</code>：URL 的路径部分，从根路径<code v-pre>/</code>开始。</p>
</li>
<li>
<p><code v-pre>Location.search</code>：查询字符串部分，从问号<code v-pre>?</code>开始。</p>
</li>
<li>
<p><code v-pre>Location.hash</code>：片段字符串部分，从<code v-pre>#</code>开始。</p>
</li>
<li>
<p><code v-pre>Location.username</code>：域名前面的用户名。</p>
</li>
<li>
<p><code v-pre>Location.password</code>：域名前面的密码。</p>
</li>
<li>
<p><code v-pre>Location.origin</code>：URL 的协议、主机名和端口。</p>
<h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2>
<p><strong>（1）Location.assign()</strong></p>
<p><code v-pre>assign</code>方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。</p>
<p><strong>（2）Location.replace()</strong></p>
<p><code v-pre>replace</code>方法接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。</p>
<p><strong>（3）Location.reload()</strong></p>
<p><code v-pre>reload</code>方法使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。</p>
<p>它接受一个布尔值作为参数。如果参数为<code v-pre>true</code>，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即<code v-pre>scrollTop === 0</code>）。如果参数是<code v-pre>false</code>或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。</p>
<p><strong>（4）Location.toString()</strong></p>
<p><code v-pre>toString</code>方法返回整个 URL 字符串，相当于读取<code v-pre>Location.href</code>属性。</p>
</li>
</ul>
<h2 id="url-的编码和解码" tabindex="-1"><a class="header-anchor" href="#url-的编码和解码" aria-hidden="true">#</a> URL 的编码和解码</h2>
<p>网页的 URL 只能包含合法的字符。合法字符分成两类。</p>
<ul>
<li>URL 元字符：分号（<code v-pre>;</code>），逗号（<code v-pre>,</code>），斜杠（<code v-pre>/</code>），问号（<code v-pre>?</code>），冒号（<code v-pre>:</code>），at（<code v-pre>@</code>），<code v-pre>&amp;</code>，等号（<code v-pre>=</code>），加号（<code v-pre>+</code>），美元符号（<code v-pre>$</code>），井号（<code v-pre>#</code>）</li>
<li>语义字符：<code v-pre>a-z</code>，<code v-pre>A-Z</code>，<code v-pre>0-9</code>，连词号（<code v-pre>-</code>），下划线（<code v-pre>_</code>），点（<code v-pre>.</code>），感叹号（<code v-pre>!</code>），波浪线（<code v-pre>~</code>），星号（<code v-pre>*</code>），单引号（<code v-pre>'</code>），圆括号（<code v-pre>()</code>）</li>
</ul>
<p>除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（<code v-pre>%</code>）加上两个大写的十六进制字母。</p>
<p>比如，UTF-8 的操作系统上，<code v-pre>http://www.example.com/q=春节</code>这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成<code v-pre>http://www.example.com/q=%E6%98%A5%E8%8A%82</code>。其中，“春”转成了<code v-pre>%E6%98%A5</code>，“节”转成了<code v-pre>%E8%8A%82</code>。这是因为“春”和“节”的 UTF-8 编码分别是<code v-pre>E6 98 A5</code>和<code v-pre>E8 8A 82</code>，将每个字节前面加上百分号，就构成了 URL 编码。</p>
<p>JavaScript 提供四个 URL 的编码/解码方法。</p>
<ul>
<li><code v-pre>encodeURI()</code></li>
<li><code v-pre>encodeURIComponent()</code></li>
<li><code v-pre>decodeURI()</code></li>
<li><code v-pre>decodeURIComponent()</code></li>
</ul>
<h3 id="encodeuri" tabindex="-1"><a class="header-anchor" href="#encodeuri" aria-hidden="true">#</a> encodeURI()</h3>
<p><code v-pre>encodeURI()</code>方法用于转码整个 URL。它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">encodeURI</span><span class="token punctuation">(</span><span class="token string">'http://www.example.com/q=春节'</span><span class="token punctuation">)</span><span class="token comment">// "http://www.example.com/q=%E6%98%A5%E8%8A%82"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="encodeuricomponent" tabindex="-1"><a class="header-anchor" href="#encodeuricomponent" aria-hidden="true">#</a> encodeURIComponent()</h3>
<p><code v-pre>encodeURIComponent()</code>方法用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。所以，它不能用于转码整个 URL。它接受一个参数，就是 URL 的片段。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">encodeURIComponent</span><span class="token punctuation">(</span><span class="token string">'春节'</span><span class="token punctuation">)</span><span class="token comment">// "%E6%98%A5%E8%8A%82"encodeURIComponent('http://www.example.com/q=春节')// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>encodeURIComponent()</code>会连 URL 元字符一起转义，所以如果转码整个 URL 就会出错。</p>
<h3 id="decodeuri" tabindex="-1"><a class="header-anchor" href="#decodeuri" aria-hidden="true">#</a> decodeURI()</h3>
<p><code v-pre>decodeURI()</code>方法用于整个 URL 的解码。它是<code v-pre>encodeURI()</code>方法的逆运算。它接受一个参数，就是转码后的 URL。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">decodeURI</span><span class="token punctuation">(</span><span class="token string">'http://www.example.com/q=%E6%98%A5%E8%8A%82'</span><span class="token punctuation">)</span><span class="token comment">// "http://www.example.com/q=春节"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="decodeuricomponent" tabindex="-1"><a class="header-anchor" href="#decodeuricomponent" aria-hidden="true">#</a> decodeURIComponent()</h3>
<p><code v-pre>decodeURIComponent()</code>用于URL 片段的解码。它是<code v-pre>encodeURIComponent()</code>方法的逆运算。它接受一个参数，就是转码后的 URL 片段。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">decodeURIComponent</span><span class="token punctuation">(</span><span class="token string">'%E6%98%A5%E8%8A%82'</span><span class="token punctuation">)</span><span class="token comment">// "春节"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="url-接口" tabindex="-1"><a class="header-anchor" href="#url-接口" aria-hidden="true">#</a> URL 接口</h2>
<p><code v-pre>URL</code>接口是一个构造函数，浏览器原生提供，可以用来构造、解析和编码 URL。一般情况下，通过<code v-pre>window.URL</code>可以拿到这个构造函数。</p>
<h2 id="方法-1" tabindex="-1"><a class="header-anchor" href="#方法-1" aria-hidden="true">#</a> 方法</h2>
<p><strong>（1）URL.createObjectURL()</strong></p>
<p><code v-pre>URL.createObjectURL()</code>方法用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了<code v-pre>File</code>对象或<code v-pre>Blob</code>对象的 URL。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;div id="display"/></span>
<span class="token comment">// &lt;input</span>
<span class="token comment">//   type="file"</span>
<span class="token comment">//   id="fileElem"</span>
<span class="token comment">//   multiple</span>
<span class="token comment">//   accept="image/*"</span>
<span class="token comment">//   onchange="handleFiles(this.files)"//  ></span>

<span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'display'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">handleFiles</span><span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'img'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        img<span class="token punctuation">.</span>src <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        div<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>URL.createObjectURL()</code>方法用来为上传的文件生成一个 URL 字符串，作为``元素的图片来源。</p>
<p>该方法生成的 URL 就像下面的样子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">blob</span><span class="token operator">:</span>http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">/</span>c745ef73<span class="token operator">-</span>ece9<span class="token operator">-</span>46da<span class="token operator">-</span>8f66<span class="token operator">-</span>ebes574789b1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，每次使用<code v-pre>URL.createObjectURL()</code>方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用<code v-pre>URL.revokeObjectURL()</code>方法释放这个实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'display'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">handleFiles</span><span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'img'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        img<span class="token punctuation">.</span>src <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        div<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
        img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            window<span class="token punctuation">.</span><span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">revokeObjectURL</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>src<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，一旦图片加载成功以后，为本地文件生成的 URL 字符串就没用了，于是可以在<code v-pre>img.onload</code>回调函数里面，通过<code v-pre>URL.revokeObjectURL()</code>方法卸载这个 URL 实例。</p>
</div></template>
