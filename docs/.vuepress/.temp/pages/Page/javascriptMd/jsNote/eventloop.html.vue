<template><div><h1 id="事件循环-微任务和宏任务" tabindex="-1"><a class="header-anchor" href="#事件循环-微任务和宏任务" aria-hidden="true">#</a> 事件循环：微任务和宏任务</h1>
<h2 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环" aria-hidden="true">#</a> 事件循环</h2>
<p><strong>事件循环</strong> 的概念非常简单。它是一个在 JavaScript 引擎等待任务，执行任务和进入休眠状态等待更多任务这几个状态之间转换的无限循环。</p>
<p>引擎的一般算法：</p>
<ol>
<li>当有任务时：
<ul>
<li>从最先进入的任务开始执行。</li>
</ul>
</li>
<li>休眠直到出现任务，然后转到第 1 步。</li>
</ol>
<p>当我们浏览一个网页时就是上述这种形式。JavaScript 引擎大多数时候不执行任何操作，它仅在脚本/处理程序/事件激活时执行。</p>
<p>任务示例：</p>
<ul>
<li>当外部脚本 `` 加载完成时，任务就是执行它。</li>
<li>当用户移动鼠标时，任务就是派生出 <code v-pre>mousemove</code> 事件和执行处理程序。</li>
<li>当安排的（scheduled）<code v-pre>setTimeout</code> 时间到达时，任务就是执行其回调。</li>
<li>……诸如此类。</li>
</ul>
<p>设置任务 —— 引擎处理它们 —— 然后等待更多任务（即休眠，几乎不消耗 CPU 资源）。</p>
<p>一个任务到来时，引擎可能正处于繁忙状态，那么这个任务就会被排入队列。</p>
<p>多个任务组成了一个队列，即所谓的“宏任务队列”（v8 术语）：</p>
<p>例如，当引擎正在忙于执行一段 <code v-pre>script</code> 时，用户可能会移动鼠标而产生 <code v-pre>mousemove</code> 事件，<code v-pre>setTimeout</code> 或许也刚好到期，以及其他任务，这些任务组成了一个队列，如上图所示。</p>
<p>队列中的任务基于“先进先出”的原则执行。当浏览器引擎执行完 <code v-pre>script</code> 后，它会处理 <code v-pre>mousemove</code> 事件，然后处理 <code v-pre>setTimeout</code> 处理程序，依此类推。</p>
<p>到目前为止，很简单，对吧？</p>
<p>两个细节：</p>
<ol>
<li>引擎执行任务时永远不会进行渲染（render）。如果任务执行需要很长一段时间也没关系。仅在任务完成后才会绘制对 DOM 的更改。</li>
<li>如果一项任务执行花费的时间过长，浏览器将无法执行其他任务，例如处理用户事件。因此，在一定时间后，浏览器会抛出一个如“页面未响应”之类的警报，建议你终止这个任务。这种情况常发生在有大量复杂的计算或导致死循环的程序错误时。</li>
</ol>
<h2 id="宏任务和微任务" tabindex="-1"><a class="header-anchor" href="#宏任务和微任务" aria-hidden="true">#</a> 宏任务和微任务</h2>
<p>微任务仅来自于我们的代码。它们通常是由 promise 创建的：对 <code v-pre>.then/catch/finally</code> 处理程序的执行会成为微任务。微任务也被用于 <code v-pre>await</code> 的“幕后”，因为它是 promise 处理的另一种形式。</p>
<p>还有一个特殊的函数 <code v-pre>queueMicrotask(func)</code>，它对 <code v-pre>func</code> 进行排队，以在微任务队列中执行。</p>
<p><strong>每个宏任务之后，引擎会立即执行微任务队列中的所有任务，然后再执行其他的宏任务，或渲染，或进行其他任何操作。</strong></p>
<p>例如，看看下面这个示例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"timeout"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"promise"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的执行顺序是怎样的？</p>
<ol>
<li><code v-pre>code</code> 首先显示，因为它是常规的同步调用。</li>
<li><code v-pre>promise</code> 第二个出现，因为 <code v-pre>then</code> 会通过微任务队列，并在当前代码之后执行。</li>
<li><code v-pre>timeout</code> 最后显示，因为它是一个宏任务。</li>
</ol>
<p>更详细的事件循环图示如下（顺序是从上到下，即：首先是脚本，然后是微任务，渲染等）：</p>
<p>微任务会在执行任何其他事件处理，或渲染，或执行任何其他宏任务之前完成。</p>
</div></template>
