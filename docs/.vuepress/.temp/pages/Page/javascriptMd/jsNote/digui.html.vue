<template><div><h1 id="递归和堆栈" tabindex="-1"><a class="header-anchor" href="#递归和堆栈" aria-hidden="true">#</a> 递归和堆栈</h1>
<p>让我们回到函数，进行更深入的研究。</p>
<p>我们的第一个主题是 <strong>递归（recursion）</strong>。</p>
<p>如果你不是刚接触编程，那么你可能已经很熟悉它了，那么你可以跳过这一章。</p>
<p>递归是一种编程模式，在一个任务可以自然地拆分成多个相同类型但更简单的任务的情况下非常有用。或者，在一个任务可以简化为一个简单的行为加上该任务的一个更简单的变体的时候可以使用。或者，就像我们很快会看到的那样，处理某些数据结构。</p>
<p>当一个函数解决一个任务时，在解决的过程中它可以调用很多其它函数。在部分情况下，函数会调用 <strong>自身</strong>。这就是所谓的 <strong>递归</strong>。</p>
<h2 id="两种思考方式" tabindex="-1"><a class="header-anchor" href="#两种思考方式" aria-hidden="true">#</a> 两种思考方式</h2>
<p>简单起见，让我们写一个函数 <code v-pre>pow(x, n)</code>，它可以计算 <code v-pre>x</code> 的 <code v-pre>n</code> 次方。换句话说就是，<code v-pre>x</code> 乘以自身 <code v-pre>n</code> 次。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">4</span>
<span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">8</span>
<span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">16</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有两种实现方式。</p>
<ol>
<li>
<p>迭代思路：使用 <code v-pre>for</code> 循环：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token comment">// 再循环中，用 x 乘以 result n 次</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">*=</span> x<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">alert</span><span class="token punctuation">(</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>递归思路：简化任务，调用自身：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">*</span> <span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">alert</span><span class="token punctuation">(</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>请注意，递归变体在本质上是不同的。</p>
<p>当 <code v-pre>pow(x, n)</code> 被调用时，执行分为两个分支：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>              <span class="token keyword">if</span> n<span class="token operator">==</span><span class="token number">1</span>  <span class="token operator">=</span> x
             <span class="token operator">/</span>
<span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> n<span class="token punctuation">)</span> <span class="token operator">=</span>
             \
              <span class="token keyword">else</span>     <span class="token operator">=</span> x <span class="token operator">*</span> <span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>如果 <code v-pre>n == 1</code>，所有事情都会很简单，这叫做 <strong>基础</strong> 的递归，因为它会立即产生明显的结果：<code v-pre>pow(x, 1)</code> 等于 <code v-pre>x</code>。</li>
<li>否则，我们可以用 <code v-pre>x * pow(x, n - 1)</code> 表示 <code v-pre>pow(x, n)</code>。在数学里，可能会写为 <code v-pre>xn = x * xn-1</code>。这叫做 <strong>一个递归步骤</strong>：我们将任务转化为更简单的行为（<code v-pre>x</code> 的乘法）和更简单的同类任务的调用（带有更小的 <code v-pre>n</code> 的 <code v-pre>pow</code> 运算）。接下来的步骤将其进一步简化，直到 <code v-pre>n</code> 达到 <code v-pre>1</code>。</li>
</ol>
<p>我们也可以说 <code v-pre>pow</code> <strong>递归地调用自身</strong> 直到 <code v-pre>n == 1</code>。</p>
<p>比如，为了计算 <code v-pre>pow(2, 4)</code>，递归变体经过了下面几个步骤：</p>
<ol>
<li><code v-pre>pow(2, 4) = 2 * pow(2, 3)</code></li>
<li><code v-pre>pow(2, 3) = 2 * pow(2, 2)</code></li>
<li><code v-pre>pow(2, 2) = 2 * pow(2, 1)</code></li>
<li><code v-pre>pow(2, 1) = 2</code></li>
</ol>
<p>因此，递归将函数调用简化为一个更简单的函数调用，然后再将其简化为一个更简单的函数，以此类推，直到结果变得显而易见。</p>
<p><strong>递归通常更短</strong></p>
<p>递归解通常比迭代解更短。</p>
<p>在这儿，我们可以使用条件运算符 <code v-pre>?</code> 而不是 <code v-pre>if</code> 语句，从而使 <code v-pre>pow(x, n)</code> 更简洁并且可读性依然很高：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">?</span> x <span class="token operator">:</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> <span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最大的嵌套调用次数（包括首次）被称为 <strong>递归深度</strong>。在我们的例子中，它正好等于 <code v-pre>n</code>。</p>
<p>最大递归深度受限于 JavaScript 引擎。对我们来说，引擎在最大迭代深度为 10000 及以下时是可靠的，有些引擎可能允许更大的最大深度，但是对于大多数引擎来说，100000 可能就超出限制了。有一些自动优化能够帮助减轻这种情况（尾部调用优化），但目前它们还没有被完全支持，只能用于简单场景。</p>
<p>这就限制了递归的应用，但是递归仍然被广泛使用。有很多任务中，递归思维方式会使代码更简单，更容易维护。</p>
<h2 id="执行上下文和堆栈" tabindex="-1"><a class="header-anchor" href="#执行上下文和堆栈" aria-hidden="true">#</a> 执行上下文和堆栈</h2>
<p>现在我们来研究一下递归调用是如何工作的。为此，我们会先看看函数底层的工作原理。</p>
<p>有关正在运行的函数的执行过程的相关信息被存储在其 <strong>执行上下文</strong> 中。</p>
<p>执行上下文 是一个内部数据结构，它包含有关函数执行时的详细细节：当前控制流所在的位置，当前的变量，<code v-pre>this</code> 的值（此处我们不使用它），以及其它的一些内部细节。</p>
<p>一个函数调用仅具有一个与其相关联的执行上下文。</p>
<p>当一个函数进行嵌套调用时，将发生以下的事儿：</p>
<ul>
<li>当前函数被暂停；</li>
<li>与它关联的执行上下文被一个叫做 <strong>执行上下文堆栈</strong> 的特殊数据结构保存；</li>
<li>执行嵌套调用；</li>
<li>嵌套调用结束后，从堆栈中恢复之前的执行上下文，并从停止的位置恢复外部函数。</li>
</ul>
<p>让我们看看 <code v-pre>pow(2, 3)</code> 调用期间都发生了什么。</p>
<h3 id="pow-2-3" tabindex="-1"><a class="header-anchor" href="#pow-2-3" aria-hidden="true">#</a> pow(2, 3)</h3>
<p>在调用 <code v-pre>pow(2, 3)</code> 的开始，执行上下文（context）会存储变量：<code v-pre>x = 2, n = 3</code>，执行流程在函数的第 <code v-pre>1</code> 行。</p>
<p>我们将其描绘如下：</p>
<ul>
<li>Context: { x: 2, n: 3, at line 1 } pow(2, 3)</li>
</ul>
<p>这是函数开始执行的时候。条件 <code v-pre>n == 1</code> 结果为假，所以执行流程进入 <code v-pre>if</code> 的第二分支。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">*</span> <span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">alert</span><span class="token punctuation">(</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量相同，但是行改变了，因此现在的上下文是：</p>
<ul>
<li>Context: { x: 2, n: 3, at line 5 } pow(2, 3)</li>
</ul>
<p>为了计算 <code v-pre>x * pow(x, n - 1)</code>，我们需要使用带有新参数的新的 <code v-pre>pow</code> 子调用 <code v-pre>pow(2, 2)</code>。</p>
<h3 id="pow-2-2" tabindex="-1"><a class="header-anchor" href="#pow-2-2" aria-hidden="true">#</a> pow（2, 2)</h3>
<p>为了执行嵌套调用，JavaScript 会在 <strong>执行上下文堆栈</strong> 中记住当前的执行上下文。</p>
<p>这里我们调用相同的函数 <code v-pre>pow</code>，但这绝对没问题。所有函数的处理都是一样的：</p>
<ol>
<li>当前上下文被“记录”在堆栈的顶部。</li>
<li>为子调用创建新的上下文。</li>
<li>当子调用结束后 —— 前一个上下文被从堆栈中弹出，并继续执行。</li>
</ol>
<p>下面是进入子调用 <code v-pre>pow(2, 2)</code> 时的上下文堆栈：</p>
<ul>
<li>Context: { x: 2, n: 2, at line 1 } pow(2, 2)</li>
<li>Context: { x: 2, n: 3, at line 5 } pow(2, 3)</li>
</ul>
<p>新的当前执行上下文位于顶部（粗体显示），之前记住的上下文位于下方。</p>
<p>当我们完成子调用后 —— 很容易恢复上一个上下文，因为它既保留了变量，也保留了当时所在代码的确切位置。</p>
<p><strong>请注意：</strong></p>
<p>在上面的图中，我们使用“行（line）”一词，因为在我们的示例中，每一行只有一个子调用，但通常一行代码可能会包含多个子调用，例如 <code v-pre>pow(…) + pow(…) + somethingElse(…)</code>。</p>
<p>因此，更准确地说，执行是“在子调用之后立即恢复”的。</p>
<h3 id="pow-2-1" tabindex="-1"><a class="header-anchor" href="#pow-2-1" aria-hidden="true">#</a> pow(2, 1)</h3>
<p>重复该过程：在第 <code v-pre>5</code> 行生成新的子调用，现在的参数是 <code v-pre>x=2</code>, <code v-pre>n=1</code>。</p>
<p>新的执行上下文被创建，前一个被压入堆栈顶部：</p>
<ul>
<li>Context: { x: 2, n: 1, at line 1 } pow(2, 1)</li>
<li>Context: { x: 2, n: 2, at line 5 } pow(2, 2)</li>
<li>Context: { x: 2, n: 3, at line 5 } pow(2, 3)</li>
</ul>
<p>此时，有 2 个旧的上下文和 1 个当前正在运行的 <code v-pre>pow(2, 1)</code> 的上下文。</p>
<h3 id="出口" tabindex="-1"><a class="header-anchor" href="#出口" aria-hidden="true">#</a> 出口</h3>
<p>在执行 <code v-pre>pow(2, 1)</code> 时，与之前的不同，条件 <code v-pre>n == 1</code> 为真，因此 <code v-pre>if</code> 的第一个分支生效：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">*</span> <span class="token function">pow</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时不再有更多的嵌套调用，所以函数结束，返回 <code v-pre>2</code>。</p>
<p>函数完成后，就不再需要其执行上下文了，因此它被从内存中移除。前一个上下文恢复到堆栈的顶部：</p>
<ul>
<li>Context: { x: 2, n: 2, at line 5 } pow(2, 2)</li>
<li>Context: { x: 2, n: 3, at line 5 } pow(2, 3)</li>
</ul>
<p>恢复执行 <code v-pre>pow(2, 2)</code>。它拥有子调用 <code v-pre>pow(2, 1)</code> 的结果，因此也可以完成 <code v-pre>x * pow(x, n - 1)</code> 的执行，并返回 <code v-pre>4</code>。</p>
<p>然后，前一个上下文被恢复：</p>
<ul>
<li>Context: { x: 2, n: 3, at line 5 } pow(2, 3)</li>
</ul>
<p>当它结束后，我们得到了结果 <code v-pre>pow(2, 3) = 8</code>。</p>
<p>本示例中的递归深度为：<strong>3</strong>。</p>
<p>从上面的插图我们可以看出，递归深度等于堆栈中上下文的最大数量。</p>
<p>请注意内存要求。上下文占用内存，在我们的示例中，求 <code v-pre>n</code> 次方需要存储 <code v-pre>n</code> 个上下文，以供更小的 <code v-pre>n</code> 值进行计算使用。</p>
<p>而循环算法更节省内存：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">pow</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">*=</span> x<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迭代 <code v-pre>pow</code> 的过程中仅使用了一个上下文用于修改 <code v-pre>i</code> 和 <code v-pre>result</code>。它的内存要求小，并且是固定了，不依赖于 <code v-pre>n</code>。</p>
<p><strong>任何递归都可以用循环来重写。通常循环变体更有效。</strong></p>
<p>……但有时重写很难，尤其是函数根据条件使用不同的子调用，然后合并它们的结果，或者分支比较复杂时。而且有些优化可能没有必要，完全不值得。</p>
<p>递归可以使代码更短，更易于理解和维护。并不是每个地方都需要优化，大多数时候我们需要一个好代码，这就是为什么要使用它。</p>
<h2 id="递归遍历" tabindex="-1"><a class="header-anchor" href="#递归遍历" aria-hidden="true">#</a> 递归遍历</h2>
<p>递归的另一个重要应用就是递归遍历。</p>
<p>假设我们有一家公司。人员结构可以表示为一个对象：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> company <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">sales</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'John'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">1000</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Alice'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">1600</span>
  <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token literal-property property">development</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">sites</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Peter'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">2000</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Alex'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">1800</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token literal-property property">internals</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">1300</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>换句话说，一家公司有很多部门。</p>
<ul>
<li>
<p>一个部门可能有一 <strong>数组</strong> 的员工，比如，<code v-pre>sales</code> 部门有 2 名员工：John 和 Alice。</p>
</li>
<li>
<p>或者，一个部门可能会划分为几个子部门，比如 <code v-pre>development</code> 有两个分支：<code v-pre>sites</code> 和 <code v-pre>internals</code>，它们都有自己的员工。</p>
</li>
<li>
<p>当一个子部门增长时，它也有可能被拆分成几个子部门（或团队）。</p>
<p>例如，<code v-pre>sites</code> 部门在未来可能会分为 <code v-pre>siteA</code> 和 <code v-pre>siteB</code>。并且，它们可能会被再继续拆分。没有图示，脑补一下吧。</p>
</li>
</ul>
<p>现在，如果我们需要一个函数来获取所有薪资的总数。我们该怎么做？</p>
<p>迭代方式并不容易，因为结构比较复杂。首先想到的可能是在 <code v-pre>company</code> 上使用 <code v-pre>for</code> 循环，并在第一层部分上嵌套子循环。但是，之后我们需要更多的子循环来遍历像 <code v-pre>sites</code> 这样的二级部门的员工…… 然后，将来可能会出现在三级部门上的另一个子循环？如果我们在代码中写 3-4 级嵌套的子循环来遍历单个对象， 那代码得多丑啊。</p>
<p>我们试试递归吧。</p>
<p>我们可以看到，当我们的函数对一个部门求和时，有两种可能的情况：</p>
<ol>
<li>要么是由一 <strong>数组</strong> 的人组成的“简单”的部门 —— 这样我们就可以通过一个简单的循环来计算薪资的总和。</li>
<li>或者它是一个有 <code v-pre>N</code> 个子部门的 <strong>对象</strong> —— 那么我们可以通过 <code v-pre>N</code> 层递归调用来求每一个子部门的薪资，然后将它们合并起来。</li>
</ol>
<p>第一种情况是由一数组的人组成的部门，这种情况很简单，是最基础的递归。</p>
<p>第二种情况是我们得到的是对象。那么可将这个复杂的任务拆分成适用于更小部门的子任务。它们可能会被继续拆分，但很快或者不久就会拆分到第一种情况那样。</p>
<p>这个算法从代码来看可能会更简单：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> company <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token comment">// 是同一个对象，简洁起见被压缩了</span>
  <span class="token literal-property property">sales</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'John'</span><span class="token punctuation">,</span> <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">1000</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Alice'</span><span class="token punctuation">,</span> <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">1600</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">development</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">sites</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Peter'</span><span class="token punctuation">,</span> <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">2000</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Alex'</span><span class="token punctuation">,</span> <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">1800</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">internals</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Jack'</span><span class="token punctuation">,</span> <span class="token literal-property property">salary</span><span class="token operator">:</span> <span class="token number">1300</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 用来完成任务的函数</span>
<span class="token keyword">function</span> <span class="token function">sumSalaries</span><span class="token punctuation">(</span><span class="token parameter">department</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>department<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 情况（1）</span>
    <span class="token keyword">return</span> department<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> current</span><span class="token punctuation">)</span> <span class="token operator">=></span> prev <span class="token operator">+</span> current<span class="token punctuation">.</span>salary<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 求数组的和</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// 情况（2）</span>
    <span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> subdep <span class="token keyword">of</span> Object<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span>department<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      sum <span class="token operator">+=</span> <span class="token function">sumSalaries</span><span class="token punctuation">(</span>subdep<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 递归调用所有子部门，对结果求和</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">alert</span><span class="token punctuation">(</span><span class="token function">sumSalaries</span><span class="token punctuation">(</span>company<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 7700</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码很短也容易理解（希望是这样？）。这就是递归的能力。它适用于任何层次的子部门嵌套。</p>
<p>下面是调用图：</p>
<p>我们可以很容易地看到其原理：对于对象 <code v-pre>{...}</code> 会生成子调用，而数组 <code v-pre>[...]</code> 是递归树的“叶子”，它们会立即给出结果。</p>
<p>请注意，该代码使用了我们之前讲过的智能特性（smart features）：</p>
<ul>
<li>在 <a href="https://zh.javascript.info/array-methods" target="_blank" rel="noopener noreferrer">数组方法<ExternalLinkIcon/></a> 中我们介绍过的数组求和方法 <code v-pre>arr.reduce</code>。</li>
<li>使用循环 <code v-pre>for(val of Object.values(obj))</code> 遍历对象的（属性）值：<code v-pre>Object.values</code> 返回它们组成的数组。</li>
</ul>
<h2 id="递归结构" tabindex="-1"><a class="header-anchor" href="#递归结构" aria-hidden="true">#</a> 递归结构</h2>
<p>递归（递归定义的）数据结构是一种部分复制自身的结构。</p>
<p>我们刚刚在上面的公司结构的示例中看过了它。</p>
<p>一个公司的 <strong>部门</strong> 是：</p>
<ul>
<li>一数组的人。</li>
<li>或一个 <strong>部门</strong> 对象。</li>
</ul>
<p>对于 Web 开发者而言，有更熟知的例子：HTML 和 XML 文档。</p>
<p>在 HTML 文档中，一个 <strong>HTML 标签</strong> 可能包括以下内容：</p>
<ul>
<li>文本片段。</li>
<li>HTML 注释。</li>
<li>其它 <strong>HTML 标签</strong>（它有可能又包括文本片段、注释或其它标签等）。</li>
</ul>
<p>这又是一个递归定义。</p>
<p>为了更好地理解递归，我们再讲一个递归结构的例子“链表”，在某些情况下，它可能是优于数组的选择。</p>
<h3 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h3>
<p>想象一下，我们要存储一个有序的对象列表。</p>
<p>正常的选择会是一个数组：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span>obj1<span class="token punctuation">,</span> obj2<span class="token punctuation">,</span> obj3<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>……但是用数组有个问题。“删除元素”和“插入元素”的操作代价非常大。例如，<code v-pre>arr.unshift(obj)</code> 操作必须对所有元素重新编号以便为新的元素 <code v-pre>obj</code> 腾出空间，而且如果数组很大，会很耗时。<code v-pre>arr.shift()</code> 同理。</p>
<p>唯一对数组结构做修改而不需要大量重排的操作就是对数组末端的操作：<code v-pre>arr.push/pop</code>。因此，对于大队列来说，当我们必须对数组首端的元素进行操作时，数组会很慢。（译注：此处的首端操作其实指的是在尾端以外的数组内的元素进行插入/删除操作。）</p>
<p>如果我们确实需要快速插入/删除，则可以选择另一种叫做 <a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank" rel="noopener noreferrer">链表<ExternalLinkIcon/></a> 的数据结构。</p>
<p><strong>链表元素</strong> 是一个使用以下元素通过递归定义的对象：</p>
<ul>
<li><code v-pre>value</code>。</li>
<li><code v-pre>next</code> 属性引用下一个 <strong>链表元素</strong> 或者代表末尾的 <code v-pre>null</code>。</li>
</ul>
<p>例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> list <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">next</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">next</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token literal-property property">next</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
        <span class="token literal-property property">next</span><span class="token operator">:</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>链表的图形表示：</p>
<p>一段用来创建链表的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> list <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这儿我们可以清楚地看到，这里有很多个对象，每一个都有 <code v-pre>value</code> 和指向邻居的 <code v-pre>next</code>。变量 <code v-pre>list</code> 是链条中的第一个对象，因此顺着 <code v-pre>next</code> 指针，我们可以抵达任何元素。</p>
<p>该链表可以很容易被拆分为多个部分，然后再重新组装回去：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> secondList <span class="token operator">=</span> list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>合并：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> secondList<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，我们可以在任何位置插入或移除元素。</p>
<p>比如，要添加一个新值，我们需要更新链表的头：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> list <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 将新值添加到链表头部</span>
list <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"new item"</span><span class="token punctuation">,</span> <span class="token literal-property property">next</span><span class="token operator">:</span> list <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要从中间删除一个值，可以修改前一个元素的 <code v-pre>next</code>：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>list<span class="token punctuation">.</span>next <span class="token operator">=</span> list<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们让 <code v-pre>list.next</code> 从 <code v-pre>1</code> 跳到值 <code v-pre>2</code>。现在值 <code v-pre>1</code> 就被从链表中移除了。如果它没有被存储在其它任何地方，那么它会被自动从内存中删除。</p>
<p>与数组不同，链表没有大规模重排，我们可以很容易地重新排列元素。</p>
<p>当然，链表也不总是优于数组的。不然大家就都去使用链表了。</p>
<p>链表主要的缺点就是我们无法很容易地通过元素的编号获取元素。但在数组中却很容易：<code v-pre>arr[n]</code> 是一个直接引用。而在链表中，我们需要从起点元素开始，顺着 <code v-pre>next</code> 找 <code v-pre>N</code> 次才能获取到第 N 个元素。</p>
<p>……但是我们也并不是总需要这样的操作。比如，当我们需要一个队列甚至一个 <a href="https://en.wikipedia.org/wiki/Double-ended_queue" target="_blank" rel="noopener noreferrer">双向队列<ExternalLinkIcon/></a> —— 有序结构必须可以快速地从两端添加/移除元素，但是不需要访问的元素。</p>
<p>链表可以得到增强：</p>
<ul>
<li>我们可以在 <code v-pre>next</code> 之外，再添加 <code v-pre>prev</code> 属性来引用前一个元素，以便轻松地往回移动。</li>
<li>我们还可以添加一个名为 <code v-pre>tail</code> 的变量，该变量引用链表的最后一个元素（并在从末尾添加/删除元素时对该引用进行更新）。</li>
<li>……数据结构可能会根据我们的需求而变化。</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>术语：</p>
<ul>
<li>
<p><strong>递归</strong> 是编程的一个术语，表示从自身调用函数（译注：也就是自调用）。递归函数可用于以更优雅的方式解决问题。</p>
<p>当一个函数调用自身时，我们称其为 <strong>递归步骤</strong>。递归的 <strong>基础</strong> 是函数参数使任务简单到该函数不再需要进行进一步调用。</p>
</li>
<li>
<p><a href="https://en.wikipedia.org/wiki/Recursive_data_type" target="_blank" rel="noopener noreferrer">递归定义<ExternalLinkIcon/></a> 的数据结构是指可以使用自身来定义的数据结构。</p>
<p>例如，链表可以被定义为由对象引用一个列表（或 <code v-pre>null</code>）而组成的数据结构。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>list <span class="token operator">=</span> <span class="token punctuation">{</span> value<span class="token punctuation">,</span> next <span class="token operator">-</span><span class="token operator">></span> list <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>像 HTML 元素树或者本章中的 <code v-pre>department</code> 树等，本质上也是递归：它们有分支，而且分支又可以有其他分支。</p>
<p>就像我们在示例 <code v-pre>sumSalary</code> 中看到的那样，可以使用递归函数来遍历它们。</p>
</li>
</ul>
<p>任何递归函数都可以被重写为迭代（译注：也就是循环）形式。有时这是在优化代码时需要做的。但对于大多数任务来说，递归方法足够快，并且容易编写和维护。</p>
<p>​</p>
<p>​															文章来源--<a href="https://zh.javascript.info/recursion" target="_blank" rel="noopener noreferrer">现代JavaScript教程<ExternalLinkIcon/></a></p>
</div></template>
