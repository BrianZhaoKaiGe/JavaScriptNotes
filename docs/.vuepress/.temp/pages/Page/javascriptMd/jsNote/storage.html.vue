<template><div><h1 id="sessionstorage-和-localstorage" tabindex="-1"><a class="header-anchor" href="#sessionstorage-和-localstorage" aria-hidden="true">#</a> sessionStorage 和 localStorage</h1>
<p>Storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：<code v-pre>window.sessionStorage</code>和<code v-pre>window.localStorage</code>。</p>
<p><code v-pre>sessionStorage</code>保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空；</p>
<p><code v-pre>localStorage</code>保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。 IE8以上的IE版本才支持localStorage这个属性 。 localStorage在浏览器的隐私模式下面是不可读取的并且 不能被爬虫抓取到</p>
<p><code v-pre>localStorage</code>和<code v-pre>sessionStorage</code>在不同的浏览器存储的上限也不一样，但大多数浏览器把上限限制在5MB左右。</p>
<h2 id="属性和方法" tabindex="-1"><a class="header-anchor" href="#属性和方法" aria-hidden="true">#</a> 属性和方法</h2>
<p>Storage 接口只有一个属性。</p>
<ul>
<li><code v-pre>Storage.length</code>：返回保存的数据项个数。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

window<span class="token punctuation">.</span>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

window<span class="token punctuation">.</span>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'baz'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>



window<span class="token punctuation">.</span>localStorage<span class="token punctuation">.</span>length <span class="token comment">// 3</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5个方法。</p>
<h3 id="storage-setitem" tabindex="-1"><a class="header-anchor" href="#storage-setitem" aria-hidden="true">#</a> Storage.setItem()</h3>
<p><code v-pre>Storage.setItem()</code>方法用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。如果键名已经存在，该方法会更新已有的键值。该方法没有返回值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>sessionStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">,</span> <span class="token string">'value'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">,</span> <span class="token string">'value'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>Storage.setItem()</code>两个参数都是字符串。如果不是字符串，会自动转成字符串，再存入浏览器。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>sessionStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>sessionStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'3'</span><span class="token punctuation">)</span> <span class="token comment">// "[object Object]"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code v-pre>setItem</code>方法的两个参数都不是字符串，但是存入的值都是字符串。</p>
<p>如果储存空间已满，该方法会抛错。</p>
<h3 id="storage-getitem" tabindex="-1"><a class="header-anchor" href="#storage-getitem" aria-hidden="true">#</a> Storage.getItem()</h3>
<p><code v-pre>Storage.getItem()</code>方法用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回<code v-pre>null</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>sessionStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>键名应该是一个字符串，否则会被自动转为字符串。</p>
<h3 id="storage-removeitem" tabindex="-1"><a class="header-anchor" href="#storage-removeitem" aria-hidden="true">#</a> Storage.removeItem()</h3>
<p><code v-pre>Storage.removeItem()</code>方法用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>sessionStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="storage-key" tabindex="-1"><a class="header-anchor" href="#storage-key" aria-hidden="true">#</a> Storage.key()</h3>
<p><code v-pre>Storage.key()</code>接受一个整数作为参数（从零开始），返回该位置对应的键值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>sessionStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">,</span> <span class="token string">'value'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>sessionStorage<span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// "key"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>结合使用<code v-pre>Storage.length</code>属性和<code v-pre>Storage.key()</code>方法，可以遍历所有的键。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> window<span class="token punctuation">.</span>localStorage<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="storage-事件" tabindex="-1"><a class="header-anchor" href="#storage-事件" aria-hidden="true">#</a> storage 事件</h2>
<p>Storage 接口储存的数据发生变化时，会触发 storage 事件，可以指定这个事件的监听函数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'storage'</span><span class="token punctuation">,</span> onStorageChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>监听函数接受一个<code v-pre>event</code>实例对象作为参数。这个实例对象继承了 StorageEvent 接口，有几个特有的属性，都是只读属性。</p>
<ul>
<li><code v-pre>StorageEvent.key</code>：字符串，表示发生变动的键名。如果 storage 事件是由<code v-pre>clear()</code>方法引起，该属性返回<code v-pre>null</code>。</li>
<li><code v-pre>StorageEvent.newValue</code>：字符串，表示新的键值。如果 storage 事件是由<code v-pre>clear()</code>方法或删除该键值对引发的，该属性返回<code v-pre>null</code>。</li>
<li><code v-pre>StorageEvent.oldValue</code>：字符串，表示旧的键值。如果该键值对是新增的，该属性返回<code v-pre>null</code>。</li>
<li><code v-pre>StorageEvent.storageArea</code>：对象，返回键值对所在的整个对象。也说是说，可以从这个属性上面拿到当前域名储存的所有键值对。</li>
<li><code v-pre>StorageEvent.url</code>：字符串，表示原始触发 storage 事件的那个网页的网址。</li>
</ul>
<p>下面是<code v-pre>StorageEvent.key</code>属性的例子。</p>
<p>下面是<code v-pre>StorageEvent.key</code>属性的例子。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">onStorageChange</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'storage'</span><span class="token punctuation">,</span> onStorageChange<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，该事件有一个很特别的地方，就是它不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发。也就是说，如果浏览器只打开一个窗口，可能观察不到这个事件。比如同时打开多个窗口，当其中的一个窗口导致储存的数据发生改变时，只有在其他窗口才能观察到监听函数的执行。可以通过这种机制，实现多个窗口之间的通信。</p>
<hr>
<p>文章来源阮一峰JavaScript教程</p>
</div></template>
