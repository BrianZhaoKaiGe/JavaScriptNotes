<template><div><h1 id="proxy代理" tabindex="-1"><a class="header-anchor" href="#proxy代理" aria-hidden="true">#</a> Proxy代理</h1>
<p>proxy可以包装一个对象，并拦截注入读取或写入属性和其他操作。</p>
<p>语法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>target</code> —— 是要包装的对象，可以是任何东西，包括函数。</li>
<li><code v-pre>handler</code> —— 代理配置：带有“捕捉器”（“traps”，即拦截操作的方法）的对象。比如 <code v-pre>get</code> 捕捉器用于读取 <code v-pre>target</code> 的属性，<code v-pre>set</code> 捕捉器用于写入 <code v-pre>target</code> 的属性，等等。</li>
</ul>
<p>一个没有任何捕捉器的代理（Proxy）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 空的 handler 对象</span>

proxy<span class="token punctuation">.</span>test <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token comment">// 写入 proxy 对象 (1)</span>
<span class="token function">alert</span><span class="token punctuation">(</span>target<span class="token punctuation">.</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5，test 属性出现在了 target 中！</span>

<span class="token function">alert</span><span class="token punctuation">(</span>proxy<span class="token punctuation">.</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 5，我们也可以从 proxy 对象读取它 (2)</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> proxy<span class="token punctuation">)</span> <span class="token function">alert</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// test，迭代也正常工作 (3)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于没有捕捉器，所有对 <code v-pre>proxy</code> 的操作都直接转发给了 <code v-pre>target</code>。</p>
<ol>
<li>写入操作 <code v-pre>proxy.test=</code> 会将值写入 <code v-pre>target</code>。</li>
<li>读取操作 <code v-pre>proxy.test</code> 会从 <code v-pre>target</code> 返回对应的值。</li>
<li>迭代 <code v-pre>proxy</code> 会从 <code v-pre>target</code> 返回对应的值。</li>
</ol>
<p><code v-pre>Proxy</code> 是一种特殊的“奇异对象（exotic object）”。它没有自己的属性。如果 <code v-pre>handler</code> 为空，则透明地将操作转发给 <code v-pre>target</code>。</p>
<p>捕捉器列表：</p>
<table>
<thead>
<tr>
<th style="text-align:left">内部方法</th>
<th style="text-align:left">Handler 方法</th>
<th style="text-align:left">何时触发</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>[[Get]]</code></td>
<td style="text-align:left"><code v-pre>get</code></td>
<td style="text-align:left">读取属性</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[Set]]</code></td>
<td style="text-align:left"><code v-pre>set</code></td>
<td style="text-align:left">写入属性</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[HasProperty]]</code></td>
<td style="text-align:left"><code v-pre>has</code></td>
<td style="text-align:left"><code v-pre>in</code> 操作符</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[Delete]]</code></td>
<td style="text-align:left"><code v-pre>deleteProperty</code></td>
<td style="text-align:left"><code v-pre>delete</code> 操作符</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[Call]]</code></td>
<td style="text-align:left"><code v-pre>apply</code></td>
<td style="text-align:left">函数调用</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[Construct]]</code></td>
<td style="text-align:left"><code v-pre>construct</code></td>
<td style="text-align:left"><code v-pre>new</code> 操作符</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[GetPrototypeOf]]</code></td>
<td style="text-align:left"><code v-pre>getPrototypeOf</code></td>
<td style="text-align:left"><a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf" target="_blank" rel="noopener noreferrer">Object.getPrototypeOf<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[SetPrototypeOf]]</code></td>
<td style="text-align:left"><code v-pre>setPrototypeOf</code></td>
<td style="text-align:left"><a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf" target="_blank" rel="noopener noreferrer">Object.setPrototypeOf<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[IsExtensible]]</code></td>
<td style="text-align:left"><code v-pre>isExtensible</code></td>
<td style="text-align:left"><a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible" target="_blank" rel="noopener noreferrer">Object.isExtensible<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[PreventExtensions]]</code></td>
<td style="text-align:left"><code v-pre>preventExtensions</code></td>
<td style="text-align:left"><a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions" target="_blank" rel="noopener noreferrer">Object.preventExtensions<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[DefineOwnProperty]]</code></td>
<td style="text-align:left"><code v-pre>defineProperty</code></td>
<td style="text-align:left"><a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" target="_blank" rel="noopener noreferrer">Object.defineProperty<ExternalLinkIcon/></a>, <a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties" target="_blank" rel="noopener noreferrer">Object.defineProperties<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[GetOwnProperty]]</code></td>
<td style="text-align:left"><code v-pre>getOwnPropertyDescriptor</code></td>
<td style="text-align:left"><a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor" target="_blank" rel="noopener noreferrer">Object.getOwnPropertyDescriptor<ExternalLinkIcon/></a>, <code v-pre>for..in</code>, <code v-pre>Object.keys/values/entries</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>[[OwnPropertyKeys]]</code></td>
<td style="text-align:left"><code v-pre>ownKeys</code></td>
<td style="text-align:left"><a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames" target="_blank" rel="noopener noreferrer">Object.getOwnPropertyNames<ExternalLinkIcon/></a>, <a href="https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols" target="_blank" rel="noopener noreferrer">Object.getOwnPropertySymbols<ExternalLinkIcon/></a>, <code v-pre>for..in</code>, <code v-pre>Object.keys/values/entries</code></td>
</tr>
</tbody>
</table>
<p><strong>不变量（Invariant）</strong></p>
<p>JavaScript 强制执行某些不变量 —— 内部方法和捕捉器必须满足的条件。</p>
<p>其中大多数用于返回值：</p>
<ul>
<li><code v-pre>[[Set]]</code> 如果值已成功写入，则必须返回 <code v-pre>true</code>，否则返回 <code v-pre>false</code>。</li>
<li><code v-pre>[[Delete]]</code> 如果已成功删除该值，则必须返回 <code v-pre>true</code>，否则返回 <code v-pre>false</code>。</li>
<li>……依此类推，我们将在下面的示例中看到更多内容。</li>
</ul>
<p>还有其他一些不变量，例如：</p>
<ul>
<li>应用于代理（proxy）对象的 <code v-pre>[[GetPrototypeOf]]</code>，必须返回与应用于被代理对象的 <code v-pre>[[GetPrototypeOf]]</code> 相同的值。换句话说，读取代理对象的原型必须始终返回被代理对象的原型。</li>
</ul>
<p>捕捉器可以拦截这些操作，但是必须遵循上面这些规则。</p>
<p>不变量确保语言功能的正确和一致的行为。完整的不变量列表在 <a href="https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots" target="_blank" rel="noopener noreferrer">规范<ExternalLinkIcon/></a> 中。如果你不做奇怪的事情，你可能就不会违反它们。</p>
<p>如何在实际示例中工作的。</p>
<h2 id="带有-get-捕捉器的默认值" tabindex="-1"><a class="header-anchor" href="#带有-get-捕捉器的默认值" aria-hidden="true">#</a> 带有 “get” 捕捉器的默认值</h2>
<p>最常见的捕捉器是用于读取/写入的属性。</p>
<p>要拦截读取操作，<code v-pre>handler</code> 应该有 <code v-pre>get(target, property, receiver)</code> 方法。</p>
<p>读取属性时触发该方法，参数如下：</p>
<ul>
<li><code v-pre>target</code> —— 是目标对象，该对象被作为第一个参数传递给 <code v-pre>new Proxy</code>，</li>
<li><code v-pre>property</code> —— 目标属性名，</li>
<li><code v-pre>receiver</code> —— 如果目标属性是一个 getter 访问器属性，则 <code v-pre>receiver</code> 就是本次读取属性所在的 <code v-pre>this</code> 对象。通常，这就是 <code v-pre>proxy</code> 对象本身（或者，如果我们从 proxy 继承，则是从该 proxy 继承的对象）。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>numbers<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prop <span class="token keyword">in</span> target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 默认值</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">alert</span><span class="token punctuation">(</span> numbers<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token function">alert</span><span class="token punctuation">(</span> numbers<span class="token punctuation">[</span><span class="token number">123</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0（没有这个数组项）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-set-捕捉器进行验证" tabindex="-1"><a class="header-anchor" href="#使用-set-捕捉器进行验证" aria-hidden="true">#</a> 使用 “set” 捕捉器进行验证</h2>
<p>假设我们想要一个专门用于数字的数组。如果添加了其他类型的值，则应该抛出一个错误。</p>
<p>当写入属性时 <code v-pre>set</code> 捕捉器被触发。</p>
<p><code v-pre>set(target, property, value, receiver)</code>：</p>
<ul>
<li><code v-pre>target</code> —— 是目标对象，该对象被作为第一个参数传递给 <code v-pre>new Proxy</code>，</li>
<li><code v-pre>property</code> —— 目标属性名称，</li>
<li><code v-pre>value</code> ——修改的属性值</li>
<li><code v-pre>receiver</code> —— 与 <code v-pre>get</code> 捕捉器类似，仅与 setter 访问器属性相关。</li>
</ul>
<p>如果写入操作（setting）成功，<code v-pre>set</code> 捕捉器应该返回 <code v-pre>true</code>，否则返回 <code v-pre>false</code>（触发 <code v-pre>TypeError</code>）。</p>
<p>让我们用它来验证新值：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

numbers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>numbers<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">// (*)</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 拦截写入属性操作</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> val <span class="token operator">==</span> <span class="token string">'number'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

numbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加成功</span>
numbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加成功</span>
<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"Length is: "</span> <span class="token operator">+</span> numbers<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>

numbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError（proxy 的 'set' 返回 false）</span>

<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"This line is never reached (error in the line above)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意：数组的内建方法依然有效！值被使用 <code v-pre>push</code> 方法添加到数组。当值被添加到数组后，数组的 <code v-pre>length</code> 属性会自动增加。我们的代理对象 proxy 不会破坏任何东西。</p>
<p>我们不必重写诸如 <code v-pre>push</code> 和 <code v-pre>unshift</code> 等添加元素的数组方法，就可以在其中添加检查，因为在内部它们使用代理所拦截的 <code v-pre>[[Set]]</code> 操作。</p>
<p><strong>别忘了返回 <code v-pre>true</code></strong></p>
<p>如上所述，要保持不变量。</p>
<p>对于 <code v-pre>set</code> 操作，它必须在成功写入时返回 <code v-pre>true</code>。</p>
<p>如果我们忘记这样做，或返回任何假（falsy）值，则该操作将触发 <code v-pre>TypeError</code>。</p>
<h2 id="使用-ownkeys-和-getownpropertydescriptor-进行迭代" tabindex="-1"><a class="header-anchor" href="#使用-ownkeys-和-getownpropertydescriptor-进行迭代" aria-hidden="true">#</a> 使用 “ownKeys” 和 “getOwnPropertyDescriptor” 进行迭代</h2>
<p><code v-pre>Object.keys</code>，<code v-pre>for..in</code> 循环和大多数其他遍历对象属性的方法都使用内部方法 <code v-pre>[[OwnPropertyKeys]]</code>（由 <code v-pre>ownKeys</code> 捕捉器拦截) 来获取属性列表。</p>
<p>这些方法在细节上有所不同：</p>
<ul>
<li><code v-pre>Object.getOwnPropertyNames(obj)</code> 返回非 symbol 键。</li>
<li><code v-pre>Object.getOwnPropertySymbols(obj)</code> 返回 symbol 键。</li>
<li><code v-pre>Object.keys/values()</code> 返回带有 <code v-pre>enumerable</code> 标志的非 symbol 键/值（属性标志在 <a href="https://zh.javascript.info/property-descriptors" target="_blank" rel="noopener noreferrer">属性标志和属性描述符<ExternalLinkIcon/></a> 一章有详细讲解)。</li>
<li><code v-pre>for..in</code> 循环遍历所有带有 <code v-pre>enumerable</code> 标志的非 symbol 键，以及原型对象的键。</li>
</ul>
<p>……但是所有这些都从该列表开始。</p>
<p>在下面这个示例中，我们使用 <code v-pre>ownKeys</code> 捕捉器拦截 <code v-pre>for..in</code> 对 <code v-pre>user</code> 的遍历，并使用 <code v-pre>Object.keys</code> 和 <code v-pre>Object.values</code> 来跳过以下划线 <code v-pre>_</code> 开头的属性：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"John"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
  <span class="token literal-property property">_password</span><span class="token operator">:</span> <span class="token string">"***"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">ownKeys</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token operator">!</span>key<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'_'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// "ownKeys" 过滤掉了 _password</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> user<span class="token punctuation">)</span> <span class="token function">alert</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// name，然后是 age</span>

<span class="token comment">// 对这些方法的效果相同：</span>
<span class="token function">alert</span><span class="token punctuation">(</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// name,age</span>
<span class="token function">alert</span><span class="token punctuation">(</span> Object<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// John,30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到目前为止，它仍然有效。</p>
<p>尽管如此，但如果我们返回对象中不存在的键，<code v-pre>Object.keys</code> 并不会列出这些键：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">ownKeys</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">alert</span><span class="token punctuation">(</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &lt;empty></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么？原因很简单：<code v-pre>Object.keys</code> 仅返回带有 <code v-pre>enumerable</code> 标志的属性。为了检查它，该方法会对每个属性调用内部方法 <code v-pre>[[GetOwnProperty]]</code> 来获取 <a href="https://zh.javascript.info/property-descriptors" target="_blank" rel="noopener noreferrer">它的描述符（descriptor）<ExternalLinkIcon/></a>。在这里，由于没有属性，其描述符为空，没有 <code v-pre>enumerable</code> 标志，因此它被略过。</p>
<p>为了让 <code v-pre>Object.keys</code> 返回一个属性，我们需要它要么存在于带有 <code v-pre>enumerable</code> 标志的对象，要么我们可以拦截对 <code v-pre>[[GetOwnProperty]]</code> 的调用（捕捉器 <code v-pre>getOwnPropertyDescriptor</code> 可以做到这一点)，并返回带有 <code v-pre>enumerable: true</code> 的描述符。</p>
<p>这是关于此的一个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">ownKeys</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 一旦要获取属性列表就会被调用</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 被每个属性调用</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token comment">/* ...其他标志，可能是 "value:..." */</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">alert</span><span class="token punctuation">(</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// a, b, c</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们再次注意：如果该属性在对象中不存在，那么我们只需要拦截 <code v-pre>[[GetOwnProperty]]</code>。</p>
<h2 id="具有-deleteproperty-和其他捕捉器的受保护属性" tabindex="-1"><a class="header-anchor" href="#具有-deleteproperty-和其他捕捉器的受保护属性" aria-hidden="true">#</a> 具有 “deleteProperty” 和其他捕捉器的受保护属性</h2>
<p>有一个普遍的约定，即以下划线 <code v-pre>_</code> 开头的属性和方法是内部的。不应从对象外部访问它们。</p>
<p>从技术上讲，我们也是能访问到这样的属性的：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"John"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">_password</span><span class="token operator">:</span> <span class="token string">"secret"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">alert</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>_password<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// secret</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们使用代理来防止对以 <code v-pre>_</code> 开头的属性的任何访问。</p>
<p>我们将需要以下捕捉器：</p>
<ul>
<li><code v-pre>get</code> 读取此类属性时抛出错误，</li>
<li><code v-pre>set</code> 写入属性时抛出错误，</li>
<li><code v-pre>deleteProperty</code> 删除属性时抛出错误，</li>
<li><code v-pre>ownKeys</code> 在使用 <code v-pre>for..in</code> 和像 <code v-pre>Object.keys</code> 这样的的方法时排除以 <code v-pre>_</code> 开头的属性。</li>
</ul>
<p>代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"John"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">_password</span><span class="token operator">:</span> <span class="token string">"***"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prop<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'_'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Access denied"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> value <span class="token operator">=</span> target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">value</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">:</span> value<span class="token punctuation">;</span> <span class="token comment">// (*)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 拦截属性写入</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prop<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'_'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Access denied"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">deleteProperty</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 拦截属性删除</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prop<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'_'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Access denied"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">delete</span> target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">ownKeys</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 拦截读取属性列表</span>
    <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token operator">!</span>key<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'_'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// "get" 不允许读取 _password</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>_password<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Error: Access denied</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">alert</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token comment">// "set" 不允许写入 _password</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  user<span class="token punctuation">.</span>_password <span class="token operator">=</span> <span class="token string">"test"</span><span class="token punctuation">;</span> <span class="token comment">// Error: Access denied</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">alert</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token comment">// "deleteProperty" 不允许删除 _password</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">delete</span> user<span class="token punctuation">.</span>_password<span class="token punctuation">;</span> <span class="token comment">// Error: Access denied</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">alert</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token comment">// "ownKeys" 将 _password 过滤出去</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> user<span class="token punctuation">)</span> <span class="token function">alert</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// name</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意在 <code v-pre>(*)</code> 行中 <code v-pre>get</code> 捕捉器的重要细节：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> prop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">let</span> value <span class="token operator">=</span> target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">value</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">:</span> value<span class="token punctuation">;</span> <span class="token comment">// (*)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么我们需要一个函数去调用 <code v-pre>value.bind(target)</code>？</p>
<p>原因是对象方法（例如 <code v-pre>user.checkPassword()</code>）必须能够访问 <code v-pre>_password</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token function">checkPassword</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//对象方法必须能读取 _password</span>
    <span class="token keyword">return</span> value <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_password<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对 <code v-pre>user.checkPassword()</code> 的调用会将被代理的对象 <code v-pre>user</code> 作为 <code v-pre>this</code>（点符号之前的对象会成为 <code v-pre>this</code>），因此，当它尝试访问 <code v-pre>this._password</code> 时，<code v-pre>get</code> 捕捉器将激活（在任何属性读取时，它都会被触发）并抛出错误。</p>
<p>因此，我们在 <code v-pre>(*)</code> 行中将对象方法的上下文绑定到原始对象 <code v-pre>target</code>。然后，它们将来的调用将使用 <code v-pre>target</code> 作为 <code v-pre>this</code>，不会触发任何捕捉器。</p>
<p>该解决方案通常可行，但并不理想，因为一个方法可能会将未被代理的对象传递到其他地方，然后我们就会陷入困境：原始对象在哪里，被代理的对象在哪里？</p>
<p>此外，一个对象可能会被代理多次（多个代理可能会对该对象添加不同的“调整”），并且如果我们将未包装的对象传递给方法，则可能会产生意想不到的后果。</p>
<p>因此，在任何地方都不应使用这种代理。</p>
<p><strong>类的私有属性</strong></p>
<p>现代 JavaScript 引擎原生支持 class 中的私有属性，这些私有属性以 <code v-pre>#</code> 为前缀。它们在 <a href="https://zh.javascript.info/private-protected-properties-methods" target="_blank" rel="noopener noreferrer">私有的和受保护的属性和方法<ExternalLinkIcon/></a> 一章中有详细描述。无需代理（proxy）。</p>
<p>但是，此类属性有其自身的问题。特别是，它们是不可继承的。</p>
<h2 id="带有-has-捕捉器的-in-range" tabindex="-1"><a class="header-anchor" href="#带有-has-捕捉器的-in-range" aria-hidden="true">#</a> 带有 “has” 捕捉器的 “in range”</h2>
<p>让我们来看更多示例。</p>
<p>我们有一个 range 对象：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> range <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">start</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">end</span><span class="token operator">:</span> <span class="token number">10</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们想使用 <code v-pre>in</code> 操作符来检查一个数字是否在 <code v-pre>range</code> 范围内。</p>
<p><code v-pre>has</code> 捕捉器会拦截 <code v-pre>in</code> 调用。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>has(target, property)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>target</code> —— 是目标对象，被作为第一个参数传递给 <code v-pre>new Proxy</code>，</li>
<li><code v-pre>property</code> —— 属性名称。</li>
</ul>
<p>示例如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> range <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">start</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">end</span><span class="token operator">:</span> <span class="token number">10</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

range <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>range<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">has</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> prop <span class="token operator">>=</span> target<span class="token punctuation">.</span>start <span class="token operator">&amp;&amp;</span> prop <span class="token operator">&lt;=</span> target<span class="token punctuation">.</span>end<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">alert</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token keyword">in</span> range<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token function">alert</span><span class="token punctuation">(</span><span class="token number">50</span> <span class="token keyword">in</span> range<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>漂亮的语法糖，不是吗？而且实现起来非常简单。</p>
<h2 id="包装函数-apply" tabindex="-1"><a class="header-anchor" href="#包装函数-apply" aria-hidden="true">#</a> 包装函数：&quot;apply&quot;</h2>
<p>我们也可以将代理（proxy）包装在函数周围。</p>
<p><code v-pre>apply(target, thisArg, args)</code> 捕捉器能使代理以函数的方式被调用：</p>
<ul>
<li><code v-pre>target</code> 是目标对象（在 JavaScript 中，函数就是一个对象），</li>
<li><code v-pre>thisArg</code> 是 <code v-pre>this</code> 的值。</li>
<li><code v-pre>args</code> 是参数列表。</li>
</ul>
<p>例如，让我们回忆一下我们在 <a href="https://zh.javascript.info/call-apply-decorators" target="_blank" rel="noopener noreferrer">装饰器模式和转发，call/apply<ExternalLinkIcon/></a> 一章中所讲的 <code v-pre>delay(f, ms)</code> 装饰器。</p>
<p>在该章中，我们没有用 proxy 来实现它。调用 <code v-pre>delay(f, ms)</code> 会返回一个函数，该函数会在 <code v-pre>ms</code> 毫秒后把所有调用转发给 <code v-pre>f</code>。</p>
<p>这是以前的基于函数的实现：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token parameter">f<span class="token punctuation">,</span> ms</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 返回一个包装器（wrapper），该包装器将在时间到了的时候将调用转发给函数 f</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// (*)</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">,</span> ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 在进行这个包装后，sayHi 函数会被延迟 3 秒后被调用</span>
sayHi <span class="token operator">=</span> <span class="token function">delay</span><span class="token punctuation">(</span>sayHi<span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token string">"John"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello, John! (after 3 seconds)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的那样，大多数情况下它都是可行的。包装函数 <code v-pre>(*)</code> 在到达延迟的时间后后执行调用。</p>
<p>但是包装函数不会转发属性读取/写入操作或者任何其他操作。进行包装后，就失去了对原始函数属性的访问，例如 <code v-pre>name</code>，<code v-pre>length</code> 和其他属性：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token parameter">f<span class="token punctuation">,</span> ms</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">,</span> ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">alert</span><span class="token punctuation">(</span>sayHi<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1（函数的 length 是函数声明中的参数个数）</span>

sayHi <span class="token operator">=</span> <span class="token function">delay</span><span class="token punctuation">(</span>sayHi<span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">alert</span><span class="token punctuation">(</span>sayHi<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0（在包装器声明中，参数个数为 0)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Proxy</code> 的功能要强大得多，因为它可以将所有东西转发到目标对象。</p>
<p>让我们使用 <code v-pre>Proxy</code> 来替换掉包装函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token parameter">f<span class="token punctuation">,</span> ms</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> thisArg<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">target</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>thisArg<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">,</span> ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

sayHi <span class="token operator">=</span> <span class="token function">delay</span><span class="token punctuation">(</span>sayHi<span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">alert</span><span class="token punctuation">(</span>sayHi<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 (*) proxy 将“获取 length”的操作转发给目标对象</span>

<span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token string">"John"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hello, John!（3 秒后）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果是相同的，但现在不仅仅调用，而且代理上的所有操作都能被转发到原始函数。所以在 <code v-pre>(*)</code> 行包装后的 <code v-pre>sayHi.length</code> 会返回正确的结果。</p>
<p>我们得到了一个“更丰富”的包装器。</p>
<p>还存在其他捕捉器：完整列表在本文的开头。它们的使用模式与上述类似。</p>
</div></template>
