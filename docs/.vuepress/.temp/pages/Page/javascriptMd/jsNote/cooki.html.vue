<template><div><h1 id="什么是cookie" tabindex="-1"><a class="header-anchor" href="#什么是cookie" aria-hidden="true">#</a> 什么是Cookie？</h1>
<p>Cookie 是服务器保存在浏览器的一小段文本信息，一般大小不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。</p>
<h2 id="主要用途" tabindex="-1"><a class="header-anchor" href="#主要用途" aria-hidden="true">#</a> 主要用途</h2>
<ul>
<li>对话（session）管理：保存登录、购物车等需要记录的信息。</li>
<li>个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。</li>
<li>追踪用户：记录和分析用户行为。</li>
</ul>
<h2 id="限制性" tabindex="-1"><a class="header-anchor" href="#限制性" aria-hidden="true">#</a> 限制性</h2>
<p>用户访问网址<code v-pre>www.example.com</code>，服务器在浏览器写入一个 Cookie。这个 Cookie 的所属域名为<code v-pre>www.example.com</code>，生效路径为根路径<code v-pre>/</code>。如果 Cookie 的生效路径设为<code v-pre>/forums</code>，那么这个 Cookie 只有在访问<code v-pre>www.example.com/forums</code>及其子路径时才有效。以后，浏览器访问某个路径之前，就会找出对该域名和路径有效，并且还没有到期的 Cookie，一起发送给服务器。</p>
<p><strong><code v-pre>document.cookie</code>属性可以读写当前网页的 Cookie。</strong></p>
</div></template>
