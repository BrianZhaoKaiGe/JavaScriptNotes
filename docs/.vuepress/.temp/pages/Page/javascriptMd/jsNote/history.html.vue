<template><div><h1 id="history-对象" tabindex="-1"><a class="header-anchor" href="#history-对象" aria-hidden="true">#</a> History 对象</h1>
<p><code v-pre>window.history</code>属性指向 History 对象，它表示当前窗口的浏览历史。</p>
<p>History 对象保存了当前窗口访问过的所有页面网址。下面代码表示当前窗口一共访问过3个网址。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>history<span class="token punctuation">.</span>length <span class="token comment">// 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。</p>
<h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性</h2>
<p>History 对象主要有两个属性。</p>
<ul>
<li><code v-pre>History.length</code>：当前窗口访问过的网址数量（包括当前网页）</li>
<li><code v-pre>History.state</code>：History 堆栈最上层的状态值（详见下文）</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 当前窗口访问过多少个网页</span>
window<span class="token punctuation">.</span>history<span class="token punctuation">.</span>length <span class="token comment">// 1</span>
<span class="token comment">// History 对象的当前状态// 通常是 undefined，即未设置window.history.state // undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2>
<ul>
<li><code v-pre>History.back()</code>：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。</li>
<li><code v-pre>History.forward()</code>：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。</li>
<li><code v-pre>History.go()</code>：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如<code v-pre>go(1)</code>相当于<code v-pre>forward()</code>，<code v-pre>go(-1)</code>相当于<code v-pre>back()</code>。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为<code v-pre>0</code>，相当于刷新当前页面。</li>
</ul>
</div></template>
