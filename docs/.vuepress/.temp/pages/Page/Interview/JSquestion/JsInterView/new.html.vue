<template><div><h1 id="new关键字在执行时干了什么" tabindex="-1"><a class="header-anchor" href="#new关键字在执行时干了什么" aria-hidden="true">#</a> new关键字在执行时干了什么？</h1>
<p>问：new在执行时做了什么？</p>
<p>答：1.创建一个新对象并分配给this</p>
<p>​		2.执行函数体</p>
<p>​		3.返回this值</p>
<p>代码示例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// this = {};（隐式创建）</span>

  <span class="token comment">// 添加属性到 this(执行函数体)</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>isAdmin <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

  <span class="token comment">// return this;（隐式返回）</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
