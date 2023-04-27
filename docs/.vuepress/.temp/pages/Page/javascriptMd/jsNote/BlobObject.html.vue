<template><div><h1 id="blob-对象" tabindex="-1"><a class="header-anchor" href="#blob-对象" aria-hidden="true">#</a> Blob 对象</h1>
<p>Blob 对象表示一个二进制文件的数据内容。</p>
<p>浏览器提供blob（）构造函数，用来生成实例对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span>array <span class="token punctuation">[</span><span class="token punctuation">,</span> options<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>供blob（）构造函数接受两个参数，第一个参数是数组，表示新生成的blob对象的内容， 第二个参数是可选的，是一个配置对象，目前只有一个属性<code v-pre>type</code>，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> htmlFragment <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'&lt;a id="a">&lt;b id="b">hey!&lt;/b>&lt;/a>'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myBlob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span>htmlFragment<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span> <span class="token operator">:</span> <span class="token string">'text/html'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Blob</code>具有两个实例属性<code v-pre>size</code>和<code v-pre>type</code>，分别返回数据的大小和类型。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> htmlFragment <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'&lt;a id="a">&lt;b id="b">hey!&lt;/b>&lt;/a>'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myBlob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span>htmlFragment<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span> <span class="token operator">:</span> <span class="token string">'text/html'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myBlob<span class="token punctuation">.</span>size <span class="token comment">// 32</span>
myBlob<span class="token punctuation">.</span>type <span class="token comment">// "text/html"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Blob</code>具有一个实例方法<code v-pre>slice</code>，用来拷贝原来的数据，返回的也是一个<code v-pre>Blob</code>实例。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>myBlob<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end<span class="token punctuation">,</span> contentType<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>slice</code>方法有三个参数，都是可选的。它们依次是起始的字节位置（默认为0）、结束的字节位置（默认为<code v-pre>size</code>属性的值，该位置本身将不包含在拷贝的数据之中）、新实例的数据类型（默认为空字符串）。</p>
<h2 id="下载文件-导出文件" tabindex="-1"><a class="header-anchor" href="#下载文件-导出文件" aria-hidden="true">#</a> 下载文件，导出文件</h2>
<p>AJAX 请求时，如果指定<code v-pre>responseType</code>属性为<code v-pre>blob</code>，下载下来的就是一个 Blob 对象。</p>
<p>在做下载功能时，后端返回文件流，可以responseType属性</p>
<p>拿到文件流的Blob对象，然后使用 URL.createObjectURL() 创建临时URL，再创建a标签节点，触发点击下载</p>
<h2 id="读取文件内容" tabindex="-1"><a class="header-anchor" href="#读取文件内容" aria-hidden="true">#</a> 读取文件内容</h2>
<p>取得 Blob 对象以后，可以通过<code v-pre>FileReader</code>对象，读取 Blob 对象的内容，即文件内容。</p>
<ul>
<li>
<p><code v-pre>FileReader.readAsText()</code>：返回文本，需要指定文本编码，默认为 UTF-8。</p>
</li>
<li>
<p><code v-pre>FileReader.readAsArrayBuffer()</code>：返回 ArrayBuffer 对象。</p>
</li>
<li>
<p><code v-pre>FileReader.readAsDataURL()</code>：返回 Data URL。</p>
</li>
<li>
<p><code v-pre>FileReader.readAsBinaryString()</code>：返回原始的二进制字符串。</p>
<p>读取文本文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// HTML 代码如下</span>
<span class="token comment">// &lt;input type=’file' onchange='readfile(this.files[0])'>&lt;/input></span>
<span class="token comment">// &lt;pre id='output'>&lt;/pre></span>
<span class="token keyword">function</span> <span class="token function">readfile</span><span class="token punctuation">(</span><span class="token parameter">f</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  reader<span class="token punctuation">.</span><span class="token function">readAsText</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>
  reader<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> text <span class="token operator">=</span> reader<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
    <span class="token keyword">var</span> out <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'output'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    out<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    out<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">createTextNode</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  reader<span class="token punctuation">.</span><span class="token function-variable function">onerror</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Error'</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="缩略图" tabindex="-1"><a class="header-anchor" href="#缩略图" aria-hidden="true">#</a> 缩略图</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// HTML代码</span>
<span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"outbox"</span><span class="token operator">></span>
		<span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"dropbox"</span><span class="token operator">></span>
			<span class="token operator">&lt;</span>input id<span class="token operator">=</span><span class="token string">"imgUpload"</span> type<span class="token operator">=</span><span class="token string">"file"</span> multiple<span class="token operator">></span>
			<span class="token operator">&lt;</span>span<span class="token operator">></span>点击或将单个<span class="token operator">/</span>多个图片拖放到此处<span class="token operator">&lt;</span><span class="token operator">/</span>span<span class="token operator">></span>
		<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
	<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
<span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"preview"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>

	<span class="token keyword">var</span> dropbox<span class="token punctuation">,</span> imgUpload<span class="token punctuation">;</span>

	dropbox <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"dropbox"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	dropbox<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"dragenter"</span><span class="token punctuation">,</span> dragenter<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	dropbox<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"dragover"</span><span class="token punctuation">,</span> dragover<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	dropbox<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"dragleave"</span><span class="token punctuation">,</span> dragleave<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	dropbox<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"drop"</span><span class="token punctuation">,</span> drop<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	imgUpload <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"imgUpload"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	imgUpload<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"change"</span><span class="token punctuation">,</span> readFile<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>

	<span class="token comment">// 目标进入drop区域</span>
	<span class="token keyword">function</span> <span class="token function">dragenter</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		dropbox<span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token string">'#666'</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 目标位于drop区域上方</span>
	<span class="token keyword">function</span> <span class="token function">dragover</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 目标离开drop区域</span>
	<span class="token keyword">function</span> <span class="token function">dragleave</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		dropbox<span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token string">'#fbfbfb'</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 目标在drop区域被释放/放置（松开鼠标）</span>
	<span class="token keyword">function</span> <span class="token function">drop</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		dropbox<span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token string">'#fbfbfb'</span><span class="token punctuation">;</span>

		<span class="token keyword">var</span> dt <span class="token operator">=</span> e<span class="token punctuation">.</span>dataTransfer<span class="token punctuation">;</span>
		<span class="token keyword">var</span> files <span class="token operator">=</span> dt<span class="token punctuation">.</span>files<span class="token punctuation">;</span>

		<span class="token function">handleFiles</span><span class="token punctuation">(</span>files<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 点击上传文件后的方法</span>
	<span class="token keyword">function</span> <span class="token function">readFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">handleFiles</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>files<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 显示缩略图的方法</span>
	<span class="token keyword">function</span> <span class="token function">handleFiles</span><span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> files<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">var</span> file <span class="token operator">=</span> files<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
			<span class="token keyword">var</span> imageType <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^image\/</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
			<span class="token comment">// 自动过滤非图片文件</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>imageType<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">continue</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 创建img对象并加入到页面中</span>
			<span class="token keyword">var</span> img <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"img"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			preview<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">var</span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			reader<span class="token punctuation">.</span><span class="token function">readAsDataURL</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
			reader<span class="token punctuation">.</span>onload <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">aImg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					aImg<span class="token punctuation">.</span>src <span class="token operator">=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
