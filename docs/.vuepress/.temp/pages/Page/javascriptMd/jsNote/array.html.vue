<template><div><h1 id="数组方法" tabindex="-1"><a class="header-anchor" href="#数组方法" aria-hidden="true">#</a> 数组方法</h1>
<h2 id="添加-删除元素" tabindex="-1"><a class="header-anchor" href="#添加-删除元素" aria-hidden="true">#</a> 添加/删除元素：</h2>
<ul>
<li><code v-pre>push(...items)</code> —— 向尾端添加元素，</li>
<li><code v-pre>pop()</code> —— 从尾端提取一个元素，</li>
<li><code v-pre>shift()</code> —— 从首端提取一个元素，</li>
<li><code v-pre>unshift(...items)</code> —— 向首端添加元素，</li>
<li><code v-pre>splice(pos, deleteCount, ...items)</code> —— 从 <code v-pre>pos</code> 开始删除 <code v-pre>deleteCount</code> 个元素，并插入 <code v-pre>items</code>。</li>
<li><code v-pre>slice(start, end)</code> —— 创建一个新数组，将从索引 <code v-pre>start</code> 到索引 <code v-pre>end</code>（但不包括 <code v-pre>end</code>）的元素复制进去。</li>
<li><code v-pre>concat(...items)</code> —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 <code v-pre>items</code>。如果 <code v-pre>items</code> 中的任意一项是一个数组，那么就取其元素。</li>
</ul>
<h2 id="搜索元素" tabindex="-1"><a class="header-anchor" href="#搜索元素" aria-hidden="true">#</a> 搜索元素：</h2>
<ul>
<li><code v-pre>indexOf/lastIndexOf(item, pos)</code> —— 从索引 <code v-pre>pos</code> 开始搜索 <code v-pre>item</code>，搜索到则返回该项的索引，否则返回 <code v-pre>-1</code>。</li>
<li><code v-pre>includes(value)</code> —— 如果数组有 <code v-pre>value</code>，则返回 <code v-pre>true</code>，否则返回 <code v-pre>false</code>。</li>
<li><code v-pre>find/filter(func)</code> —— 通过 <code v-pre>func</code> 过滤元素，返回使 <code v-pre>func</code> 返回 <code v-pre>true</code> 的第一个值/所有值。</li>
<li><code v-pre>findIndex</code> 和 <code v-pre>find</code> 类似，但返回索引而不是值。</li>
</ul>
<h2 id="遍历元素" tabindex="-1"><a class="header-anchor" href="#遍历元素" aria-hidden="true">#</a> 遍历元素：</h2>
<ul>
<li><code v-pre>forEach(func)</code> —— 对每个元素都调用 <code v-pre>func</code>，不返回任何内容。</li>
</ul>
<h2 id="转换数组" tabindex="-1"><a class="header-anchor" href="#转换数组" aria-hidden="true">#</a> 转换数组：</h2>
<ul>
<li><code v-pre>map(func)</code> —— 根据对每个元素调用 <code v-pre>func</code> 的结果创建一个新数组。</li>
<li><code v-pre>sort(func)</code> —— 对数组进行原位（in-place）排序，然后返回它。</li>
<li><code v-pre>reverse()</code> —— 原位（in-place）反转数组，然后返回它。</li>
<li><code v-pre>split/join</code> —— 将字符串转换为数组并返回。</li>
<li><code v-pre>reduce/reduceRight(func, initial)</code> —— 通过对每个元素调用 <code v-pre>func</code> 计算数组上的单个值，并在调用之间传递中间结果。</li>
</ul>
<h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他：</h2>
<ul>
<li><code v-pre>Array.isArray(value)</code> 检查 <code v-pre>value</code> 是否是一个数组，如果是则返回 <code v-pre>true</code>，否则返回 <code v-pre>false</code>。</li>
</ul>
<p>请注意，<code v-pre>sort</code>，<code v-pre>reverse</code> 和 <code v-pre>splice</code> 方法修改的是数组本身。</p>
<p>这些是最常用的方法，它们覆盖 99％ 的用例。但是还有其他几个：</p>
<ul>
<li>
<p>arr.some(fn)/arr.every(fn) 检查数组。</p>
<p>与 <code v-pre>map</code> 类似，对数组的每个元素调用函数 <code v-pre>fn</code>。如果任何/所有结果为 <code v-pre>true</code>，则返回 <code v-pre>true</code>，否则返回 <code v-pre>false</code>。</p>
<p>这两个方法的行为类似于 <code v-pre>||</code> 和 <code v-pre>&amp;&amp;</code> 运算符：如果 <code v-pre>fn</code> 返回一个真值，<code v-pre>arr.some()</code> 立即返回 <code v-pre>true</code> 并停止迭代其余数组项；如果 <code v-pre>fn</code> 返回一个假值，<code v-pre>arr.every()</code> 立即返回 <code v-pre>false</code> 并停止对其余数组项的迭代。</p>
<p>我们可以使用 <code v-pre>every</code> 来比较数组：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">arraysEqual</span><span class="token punctuation">(</span><span class="token parameter">arr1<span class="token punctuation">,</span> arr2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> arr1<span class="token punctuation">.</span>length <span class="token operator">===</span> arr2<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> arr1<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> value <span class="token operator">===</span> arr2<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">alert</span><span class="token punctuation">(</span> <span class="token function">arraysEqual</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>arr.fill(value, start, end)—— 从索引 <code v-pre>start</code> 到 <code v-pre>end</code>，用重复的 <code v-pre>value</code> 填充数组。</p>
</li>
<li>
<p>arr.copyWithin(target, start, end)—— 将从位置 <code v-pre>start</code> 到 <code v-pre>end</code> 的所有元素复制到 <strong>自身</strong> 的 <code v-pre>target</code> 位置（覆盖现有元素）。</p>
</li>
<li>
<p>arr.flat(depth)/arr.flatMap(fn)从多维数组创建一个新的扁平数组。</p>
</li>
<li>
<p>Array.of(element0[, element1[, …[, elementN]]]) 基于可变数量的参数创建一个新的 <code v-pre>Array</code> 实例，而不需要考虑参数的数量或类型。</p>
</li>
</ul>
</div></template>
