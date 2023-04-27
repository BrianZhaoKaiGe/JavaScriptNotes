<template><div><h1 id="值的比较" tabindex="-1"><a class="header-anchor" href="#值的比较" aria-hidden="true">#</a> 值的比较</h1>
<p>JavaScript在进行值比较是会把两侧的值转化为数字进行比较</p>
<p>。字符串是根据Unicode编码顺序进行，数字字符串直接转化为数字。空字符串为0，布尔类型，true为1，false为0。</p>
<h2 id="需要注意的地方" tabindex="-1"><a class="header-anchor" href="#需要注意的地方" aria-hidden="true">#</a> <strong>需要注意的地方</strong></h2>
<p>有时候，以下两种情况会同时发生：</p>
<ul>
<li>若直接比较两个值，其结果是相等的。</li>
<li>若把两个值转为布尔值，它们可能得出完全相反的结果，即一个是 <code v-pre>true</code>，一个是 <code v-pre>false</code>。</li>
</ul>
<p>例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token function">alert</span><span class="token punctuation">(</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token string">"0"</span><span class="token punctuation">;</span>
<span class="token function">alert</span><span class="token punctuation">(</span> <span class="token function">Boolean</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token function">alert</span><span class="token punctuation">(</span>a <span class="token operator">==</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JavaScript 会把待比较的值转化为数字后再做比较（因此 <code v-pre>&quot;0&quot;</code> 变成了 <code v-pre>0</code>）。若只是将一个变量转化为 <code v-pre>Boolean</code> 值，则会使用其他的类型转换规则。</p>
<h2 id="严格的相等" tabindex="-1"><a class="header-anchor" href="#严格的相等" aria-hidden="true">#</a> 严格的相等</h2>
<p>普通的相等性检查 <code v-pre>==</code> 存在一个问题，它不能区分出 <code v-pre>0</code> 和 <code v-pre>false</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">alert</span><span class="token punctuation">(</span> <span class="token number">0</span> <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也同样无法区分空字符串和 <code v-pre>false</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">alert</span><span class="token punctuation">(</span> <span class="token string">''</span> <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是因为在比较不同类型的值时，处于相等判断符号 <code v-pre>==</code> 两侧的值会先被转化为数字。空字符串和 <code v-pre>false</code> 也是如此，转化后它们都为数字 0。</p>
<p><strong>严格相等运算符 <code v-pre>===</code> 在进行比较时不会做任何的类型转换。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">alert</span><span class="token punctuation">(</span> <span class="token number">0</span> <span class="token operator">===</span> <span class="token boolean">false</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false，因为被比较值的数据类型不同</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与“不相等”符号 <code v-pre>!=</code> 类似，“严格不相等”表示为 <code v-pre>!==</code>。</p>
<h2 id="对null和undefined的比较" tabindex="-1"><a class="header-anchor" href="#对null和undefined的比较" aria-hidden="true">#</a> 对null和undefined的比较</h2>
<p>在严格相等下，它们不相等</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">alert</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>当使用非严格相等</strong> <code v-pre>==</code> <strong>比较二者时</strong></p>
<p>它们等于对方而不等于其他任何值 （只在非严格相等下成立）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">alert</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token operator">==</span> <span class="token keyword">undefined</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="null-vs-0" tabindex="-1"><a class="header-anchor" href="#null-vs-0" aria-hidden="true">#</a> null  VS 0</h2>
<p>通过比较 <code v-pre>null</code> 和 0 可得：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">alert</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// (1) false</span>
<span class="token function">alert</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// (2) false</span>
<span class="token function">alert</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token operator">>=</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// (3) true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是的，上面的结果完全打破了你对数学的认识。在最后一行代码显示“<code v-pre>null</code> 大于等于 0”的情况下，前两行代码中一定会有一个是正确的，然而事实表明它们的结果都是 false。</p>
<p>为什么会出现这种反常结果，这是因为相等性检查 <code v-pre>==</code> 和普通比较符 <code v-pre>&gt; &lt; &gt;= &lt;=</code> 的代码逻辑是相互独立的。进行值的比较时，<code v-pre>null</code> 会被转化为数字，因此它被转化为了 <code v-pre>0</code>。这就是为什么（3）中 <code v-pre>null &gt;= 0</code> 返回值是 true，（1）中 <code v-pre>null &gt; 0</code> 返回值是 false。</p>
<p>另一方面，<code v-pre>undefined</code> 和 <code v-pre>null</code> 在相等性检查 <code v-pre>==</code> 中不会进行任何的类型转换，它们有自己独立的比较规则，</p>
<h2 id="undefined" tabindex="-1"><a class="header-anchor" href="#undefined" aria-hidden="true">#</a> undefined</h2>
<p><code v-pre>undefined</code> 只与 <code v-pre>null</code> 相等，不会与其他值相等。</p>
<p>在比较中undefined会转换为NaN， 而 <code v-pre>NaN</code> 是一个特殊的数值型值，它与任何值进行比较都会返回 <code v-pre>false</code>。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<ul>
<li>比较运算符始终返回布尔值。</li>
<li>字符串的比较，会按照“词典”顺序逐字符地比较大小。</li>
<li>当对不同类型的值进行比较时，它们会先被转化为数字（不包括严格相等检查）再进行比较。</li>
<li>在非严格相等 <code v-pre>==</code> 下，<code v-pre>null</code> 和 <code v-pre>undefined</code> 相等且各自不等于任何其他的值。</li>
<li>在使用 <code v-pre>&gt;</code> 或 <code v-pre>&lt;</code> 进行比较时，需要注意变量可能为 <code v-pre>null/undefined</code> 的情况。比较好的方法是单独检查变量是否等于 <code v-pre>null/undefined</code>。</li>
</ul>
</div></template>
