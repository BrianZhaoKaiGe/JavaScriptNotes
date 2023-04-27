<template><div><h1 id="现代javascript教程" tabindex="-1"><a class="header-anchor" href="#现代javascript教程" aria-hidden="true">#</a> <a href="https://zh.javascript.info/" target="_blank" rel="noopener noreferrer">现代JavaScript教程<ExternalLinkIcon/></a></h1>
<h1 id="书栈网" tabindex="-1"><a class="header-anchor" href="#书栈网" aria-hidden="true">#</a> <a href="https://www.bookstack.cn/" target="_blank" rel="noopener noreferrer">书栈网<ExternalLinkIcon/></a></h1>
<h1 id="来搜一下-网盘搜索" tabindex="-1"><a class="header-anchor" href="#来搜一下-网盘搜索" aria-hidden="true">#</a> <a href="https://www.laisoyixia.com/" target="_blank" rel="noopener noreferrer">来搜一下，网盘搜索<ExternalLinkIcon/></a></h1>
<h1 id="马克思主义文库" tabindex="-1"><a class="header-anchor" href="#马克思主义文库" aria-hidden="true">#</a> <a href="https://www.marxists.org/chinese/index.html" target="_blank" rel="noopener noreferrer">马克思主义文库<ExternalLinkIcon/></a></h1>
<h1 id="虫部落" tabindex="-1"><a class="header-anchor" href="#虫部落" aria-hidden="true">#</a> <a href="https://www.chongbuluo.com/" target="_blank" rel="noopener noreferrer">虫部落<ExternalLinkIcon/></a></h1>
<h1 id="develop" tabindex="-1"><a class="header-anchor" href="#develop" aria-hidden="true">#</a> <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">Develop<ExternalLinkIcon/></a></h1>
<h1 id="印记中文" tabindex="-1"><a class="header-anchor" href="#印记中文" aria-hidden="true">#</a> <a href="https://docschina.org/" target="_blank" rel="noopener noreferrer">印记中文<ExternalLinkIcon/></a></h1>
<h1 id="极简插件" tabindex="-1"><a class="header-anchor" href="#极简插件" aria-hidden="true">#</a> <a href="https://chrome.zzzmh.cn/#/index" target="_blank" rel="noopener noreferrer">极简插件<ExternalLinkIcon/></a></h1>
<h1 id="果核剥壳" tabindex="-1"><a class="header-anchor" href="#果核剥壳" aria-hidden="true">#</a> <a href="https://chrome.zzzmh.cn/#/index" target="_blank" rel="noopener noreferrer">果核剥壳<ExternalLinkIcon/></a></h1>
<h1 id="学习教育导航" tabindex="-1"><a class="header-anchor" href="#学习教育导航" aria-hidden="true">#</a> <a href="https://nav.guidebook.top/" target="_blank" rel="noopener noreferrer">学习教育导航<ExternalLinkIcon/></a></h1>
<h1 id="视频剪辑" tabindex="-1"><a class="header-anchor" href="#视频剪辑" aria-hidden="true">#</a> 视频剪辑</h1>
<h2 id="爱给网" tabindex="-1"><a class="header-anchor" href="#爱给网" aria-hidden="true">#</a> <a href="https://www.aigei.com/" target="_blank" rel="noopener noreferrer">爱给网<ExternalLinkIcon/></a></h2>
<h1 id="中国色" tabindex="-1"><a class="header-anchor" href="#中国色" aria-hidden="true">#</a> 中国色</h1>
<h2 id="中国色-1" tabindex="-1"><a class="header-anchor" href="#中国色-1" aria-hidden="true">#</a> <a href="http://zhongguose.com/" target="_blank" rel="noopener noreferrer">中国色<ExternalLinkIcon/></a></h2>
<h2 id="凌点视频素材网" tabindex="-1"><a class="header-anchor" href="#凌点视频素材网" aria-hidden="true">#</a> <a href="https://www.aigei.com/" target="_blank" rel="noopener noreferrer"> 凌点视频素材网 <ExternalLinkIcon/></a></h2>
<h2 id="新片场" tabindex="-1"><a class="header-anchor" href="#新片场" aria-hidden="true">#</a> <a href="https://stock.xinpianchang.com/" target="_blank" rel="noopener noreferrer">新片场<ExternalLinkIcon/></a></h2>
<h1 id="vscode插件" tabindex="-1"><a class="header-anchor" href="#vscode插件" aria-hidden="true">#</a> VScode插件</h1>
<p>auto rename tag</p>
<p>修改标签对</p>
<p>Color Picker</p>
<p>颜色选择</p>
<p>ES7+ React/Redux/React-Native snippets</p>
<p>react提示插件</p>
<p>GitLens — Git supercharged</p>
<p>显示git作者，提交时间</p>
<p>Image preview</p>
<p>图片显示插件</p>
<p>KoroFileHeader</p>
<p>注释插件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> 配置：
	<span class="token string-property property">"fileheader.customMade"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token string-property property">"module"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token comment">// 介绍文件的作用、文件的入参、出参。</span>
		<span class="token string-property property">"author"</span><span class="token operator">:</span> <span class="token string">"zhaokaige"</span><span class="token punctuation">,</span> <span class="token comment">// 用户名</span>
		<span class="token string-property property">"Date"</span><span class="token operator">:</span> <span class="token string">"Do not edit"</span><span class="token punctuation">,</span> <span class="token comment">// 文件创建时间(不变)</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token string-property property">"fileheader.cursorMode"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token string-property property">"description"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token comment">// 函数注释生成之后，光标移动到这里</span>
		<span class="token string-property property">"param"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token comment">// param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token string-property property">"fileheader.configObj"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token string-property property">"functionWideNum"</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
		<span class="token string-property property">"wideSame"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 设置为true开启</span>
		<span class="token string-property property">"wideNum"</span><span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token comment">// 字段长度 默认为13</span>
		<span class="token string-property property">"language"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// 普通后缀文件</span>
			<span class="token string-property property">"jsx/js/ts/tsx"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token string-property property">"head"</span><span class="token operator">:</span> <span class="token string">"/**"</span><span class="token punctuation">,</span>
				<span class="token string-property property">"middle"</span><span class="token operator">:</span> <span class="token string">" * @"</span><span class="token punctuation">,</span>
				<span class="token string-property property">"end"</span><span class="token operator">:</span> <span class="token string">" */"</span><span class="token punctuation">,</span>
				<span class="token comment">// 函数自定义注释符号：如果有此配置 会默认使用</span>
				<span class="token comment">// "functionSymbol": {</span>
				<span class="token comment">// 	"head": "/******* ", // 统一增加几个*号</span>
				<span class="token comment">// 	"middle": " * @",</span>
				<span class="token comment">// 	"end": " */"</span>
				<span class="token comment">//   }</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token string-property property">"dateFormat"</span><span class="token operator">:</span> <span class="token string">"YYYY-MM-DD"</span><span class="token punctuation">,</span>
		<span class="token string-property property">"autoAdd"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Import Cost</p>
<p>显示引入包大小</p>
<p>IntelliCode</p>
<p>代码提示</p>
<p>JavaScript (ES6) code snippets</p>
<p>js代码提示</p>
<p>Material Icon Theme</p>
<p>文件夹主题</p>
<p>open in browser</p>
<p>打开浏览器</p>
<p>Path Intellisense</p>
<p>路径提示</p>
<h1 id="好用的插件" tabindex="-1"><a class="header-anchor" href="#好用的插件" aria-hidden="true">#</a> 好用的插件</h1>
<p>Snipaste.exe</p>
<p>截图插件</p>
<p>utools</p>
<p>快捷打开</p>
</div></template>
