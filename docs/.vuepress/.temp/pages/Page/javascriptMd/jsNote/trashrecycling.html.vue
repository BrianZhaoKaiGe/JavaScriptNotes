<template><div><h1 id="垃圾回收" tabindex="-1"><a class="header-anchor" href="#垃圾回收" aria-hidden="true">#</a> 垃圾回收</h1>
<p>对于开发者来说，JavaScript 的内存管理是自动的、无形的。我们创建的原始值、对象、函数……这一切都会占用内存。</p>
<p>当我们不再需要某个东西时会发生什么？JavaScript 引擎如何发现它并清理它？</p>
<h2 id="可达性-reachability" tabindex="-1"><a class="header-anchor" href="#可达性-reachability" aria-hidden="true">#</a> 可达性（Reachability）</h2>
<p>JavaScript 中主要的内存管理概念是 <strong>可达性</strong>。</p>
<p>简而言之，“可达”值是那些以某种方式可访问或可用的值。它们一定是存储在内存中的。</p>
<ol>
<li>
<p>这里列出固有的可达值的基本集合，这些值明显不能被释放。</p>
<p>比方说：</p>
<ul>
<li>当前执行的函数，它的局部变量和参数。</li>
<li>当前嵌套调用链上的其他函数、它们的局部变量和参数。</li>
<li>全局变量。</li>
<li>（还有一些内部的）</li>
</ul>
<p>这些值被称作 <strong>根（roots）</strong>。</p>
</li>
<li>
<p>如果一个值可以通过引用链从根访问任何其他值，则认为该值是可达的。</p>
<p>比方说，如果全局变量中有一个对象，并且该对象有一个属性引用了另一个对象，则 <strong>该</strong> 对象被认为是可达的。而且它引用的内容也是可达的。下面是详细的例子。</p>
</li>
</ol>
<p>在 JavaScript 引擎中有一个被称作 <a href="https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)" target="_blank" rel="noopener noreferrer">垃圾回收器<ExternalLinkIcon/></a> 的东西在后台执行。它监控着所有对象的状态，并删除掉那些已经不可达的。</p>
<h2 id="一个简单的例子" tabindex="-1"><a class="header-anchor" href="#一个简单的例子" aria-hidden="true">#</a> 一个简单的例子</h2>
<p>这里是一个最简单的例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// user 具有对这个对象的引用</span>
<span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"John"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的箭头描述了一个对象引用。全局变量 <code v-pre>&quot;user&quot;</code> 引用了对象 <code v-pre>{name：&quot;John&quot;}</code>（为简洁起见，我们称它为 John）。John 的 <code v-pre>&quot;name&quot;</code> 属性存储一个原始值，所以它被写在对象内部。</p>
<p>如果 <code v-pre>user</code> 的值被重写了，这个引用就没了：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>user <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在 John 变成不可达的了。因为没有引用了，就不能访问到它了。垃圾回收器会认为它是垃圾数据并进行回收，然后释放内存。</p>
<h2 id="两个引用" tabindex="-1"><a class="header-anchor" href="#两个引用" aria-hidden="true">#</a> 两个引用</h2>
<p>现在让我们想象下，我们把 <code v-pre>user</code> 的引用复制给 <code v-pre>admin</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// user 具有对这个对象的引用</span>
<span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"John"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> admin <span class="token operator">=</span> user<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在如果执行刚刚的那个操作：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>user <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>……然后对象仍然可以被通过 <code v-pre>admin</code> 这个全局变量访问到，因此它必须被保留在内存中。如果我们又重写了 <code v-pre>admin</code>，对象就会被删除。</p>
<h2 id="相互关联的对象" tabindex="-1"><a class="header-anchor" href="#相互关联的对象" aria-hidden="true">#</a> 相互关联的对象</h2>
<p>现在来看一个更复杂的例子。这是个家庭：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">marry</span><span class="token punctuation">(</span><span class="token parameter">man<span class="token punctuation">,</span> woman</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  woman<span class="token punctuation">.</span>husband <span class="token operator">=</span> man<span class="token punctuation">;</span>
  man<span class="token punctuation">.</span>wife <span class="token operator">=</span> woman<span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">father</span><span class="token operator">:</span> man<span class="token punctuation">,</span>
    <span class="token literal-property property">mother</span><span class="token operator">:</span> woman
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> family <span class="token operator">=</span> <span class="token function">marry</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"John"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"Ann"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>marry</code> 函数通过让两个对象相互引用使它们“结婚”了，并返回了一个包含这两个对象的新对象。</p>
<p>由此产生的内存结构：</p>
<p>到目前为止，所有对象都是可达的。</p>
<p>现在让我们移除两个引用：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">delete</span> family<span class="token punctuation">.</span>father<span class="token punctuation">;</span>
<span class="token keyword">delete</span> family<span class="token punctuation">.</span>mother<span class="token punctuation">.</span>husband<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>仅删除这两个引用中的一个是不够的，因为所有的对象仍然都是可达的。</p>
<p>但是，如果我们把这两个都删除，那么我们可以看到再也没有对 John 的引用了：</p>
<p>对外引用不重要，只有传入引用才可以使对象可达。所以，John 现在是不可达的，并且将被从内存中删除，同时 John 的所有数据也将变得不可达。</p>
<p>经过垃圾回收：</p>
<h2 id="无法到达的岛屿" tabindex="-1"><a class="header-anchor" href="#无法到达的岛屿" aria-hidden="true">#</a> 无法到达的岛屿</h2>
<p>几个对象相互引用，但外部没有对其任意对象的引用，这些对象也可能是不可达的，并被从内存中删除。</p>
<p>源对象与上面相同。然后：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>family <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>内存内部状态将变成：</p>
<p>这个例子展示了可达性概念的重要性。</p>
<p>显而易见，John 和 Ann 仍然连着，都有传入的引用。但是，这样还不够。</p>
<p>前面说的 <code v-pre>&quot;family&quot;</code> 对象已经不再与根相连，没有了外部对其的引用，所以它变成了一座“孤岛”，并且将被从内存中删除。</p>
<h2 id="内部算法" tabindex="-1"><a class="header-anchor" href="#内部算法" aria-hidden="true">#</a> 内部算法</h2>
<p>垃圾回收的基本算法被称为 “mark-and-sweep”。</p>
<p>定期执行以下“垃圾回收”步骤：</p>
<ul>
<li>垃圾收集器找到所有的根，并“标记”（记住）它们。</li>
<li>然后它遍历并“标记”来自它们的所有引用。</li>
<li>然后它遍历标记的对象并标记 <strong>它们的</strong> 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象。</li>
<li>……如此操作，直到所有可达的（从根部）引用都被访问到。</li>
<li>没有被标记的对象都会被删除。</li>
</ul>
<p>例如，使我们的对象有如下的结构：</p>
<p>我们可以清楚地看到右侧有一个“无法到达的岛屿”。现在我们来看看“标记和清除”垃圾收集器如何处理它。</p>
<p>第一步标记所有的根：</p>
<p>然后，我们跟随它们的引用标记它们所引用的对象：</p>
<p>……如果还有引用的话，继续标记：</p>
<p>现在，无法通过这个过程访问到的对象被认为是不可达的，并且会被删除。</p>
<p>我们还可以将这个过程想象成从根溢出一大桶油漆，它流经所有引用并标记所有可到达的对象。然后移除未标记的。</p>
<p>这是垃圾收集工作的概念。JavaScript 引擎做了许多优化，使垃圾回收运行速度更快，并且不会对代码执行引入任何延迟。</p>
<p>一些优化建议：</p>
<ul>
<li><strong>分代收集（Generational collection）</strong>—— 对象被分成两组：“新的”和“旧的”。在典型的代码中，许多对象的生命周期都很短：它们出现、完成它们的工作并很快死去，因此在这种情况下跟踪新对象并将其从内存中清除是有意义的。那些长期存活的对象会变得“老旧”，并且被检查的频次也会降低。</li>
<li><strong>增量收集（Incremental collection）</strong>—— 如果有许多对象，并且我们试图一次遍历并标记整个对象集，则可能需要一些时间，并在执行过程中带来明显的延迟。因此，引擎将现有的整个对象集拆分为多个部分，然后将这些部分逐一清除。这样就会有很多小型的垃圾收集，而不是一个大型的。这需要它们之间有额外的标记来追踪变化，但是这样会带来许多微小的延迟而不是一个大的延迟。</li>
<li><strong>闲时收集（Idle-time collection）</strong>—— 垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响。</li>
</ul>
<p>还有其他垃圾回收算法的优化和风格。尽管我想在这里描述它们，但我必须打住了，因为不同的引擎会有不同的调整和技巧。而且，更重要的是，随着引擎的发展，情况会发生变化，所以在没有真实需求的时候，“提前”学习这些内容是不值得的。当然，除非你纯粹是出于兴趣。我在下面给你提供了一些相关链接。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>主要需要掌握的内容：</p>
<ul>
<li>垃圾回收是自动完成的，我们不能强制执行或是阻止执行。</li>
<li>当对象是可达状态时，它一定是存在于内存中的。</li>
<li>被引用与可访问（从一个根）不同：一组相互连接的对象可能整体都不可达，正如我们在上面的例子中看到的那样。</li>
</ul>
<p><a href="https://zh.javascript.info/garbage-collection" target="_blank" rel="noopener noreferrer">文章来源<ExternalLinkIcon/></a></p>
</div></template>
