# Blob 对象

Blob 对象表示一个二进制文件的数据内容。

浏览器提供blob（）构造函数，用来生成实例对象。

```javascript
new Blob(array [, options])
```

供blob（）构造函数接受两个参数，第一个参数是数组，表示新生成的blob对象的内容， 第二个参数是可选的，是一个配置对象，目前只有一个属性`type`，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串 

```javascript
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});
```

 `Blob`具有两个实例属性`size`和`type`，分别返回数据的大小和类型。 

```javascript
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});
myBlob.size // 32
myBlob.type // "text/html"
```

`Blob`具有一个实例方法`slice`，用来拷贝原来的数据，返回的也是一个`Blob`实例。

```javascript
myBlob.slice(start, end, contentType)
```

`slice`方法有三个参数，都是可选的。它们依次是起始的字节位置（默认为0）、结束的字节位置（默认为`size`属性的值，该位置本身将不包含在拷贝的数据之中）、新实例的数据类型（默认为空字符串）。

## 下载文件，导出文件

 AJAX 请求时，如果指定`responseType`属性为`blob`，下载下来的就是一个 Blob 对象。 

在做下载功能时，后端返回文件流，可以responseType属性

拿到文件流的Blob对象，然后使用 URL.createObjectURL() 创建临时URL，再创建a标签节点，触发点击下载

## 读取文件内容

 取得 Blob 对象以后，可以通过`FileReader`对象，读取 Blob 对象的内容，即文件内容。 

- `FileReader.readAsText()`：返回文本，需要指定文本编码，默认为 UTF-8。

- `FileReader.readAsArrayBuffer()`：返回 ArrayBuffer 对象。

- `FileReader.readAsDataURL()`：返回 Data URL。

- `FileReader.readAsBinaryString()`：返回原始的二进制字符串。

  读取文本文件

  ```javascript
  // HTML 代码如下
  // <input type=’file' onchange='readfile(this.files[0])'></input>
  // <pre id='output'></pre>
  function readfile(f) {
    var reader = new FileReader();
    reader.readAsText(f);
    reader.onload = function () {
      var text = reader.result;
      var out = document.getElementById('output');
      out.innerHTML = '';
      out.appendChild(document.createTextNode(text));
    }
    reader.onerror = function(e) {
      console.log('Error', e);
    };
  }
  ```



## 缩略图

```javascript
// HTML代码
<div id="outbox">
		<div id="dropbox">
			<input id="imgUpload" type="file" multiple>
			<span>点击或将单个/多个图片拖放到此处</span>
		</div>
	</div>
<div id="preview"></div>

	var dropbox, imgUpload;

	dropbox = document.getElementById("dropbox");
	dropbox.addEventListener("dragenter", dragenter, false);
	dropbox.addEventListener("dragover", dragover, false);
	dropbox.addEventListener("dragleave", dragleave, false);
	dropbox.addEventListener("drop", drop, false);

	imgUpload = document.getElementById("imgUpload");
	imgUpload.addEventListener("change", readFile, false)

	// 目标进入drop区域
	function dragenter(e) {
		e.stopPropagation();
		e.preventDefault();
		dropbox.style.background = '#666'
	}
	// 目标位于drop区域上方
	function dragover(e) {
		e.stopPropagation();
		e.preventDefault();
	}
	// 目标离开drop区域
	function dragleave(e) {
		e.stopPropagation();
		e.preventDefault();
		dropbox.style.background = '#fbfbfb';
	}
	// 目标在drop区域被释放/放置（松开鼠标）
	function drop(e) {
		e.stopPropagation();
		e.preventDefault();
		dropbox.style.background = '#fbfbfb';

		var dt = e.dataTransfer;
		var files = dt.files;

		handleFiles(files);
	}
	// 点击上传文件后的方法
	function readFile() {
		handleFiles(this.files);
	}
	// 显示缩略图的方法
	function handleFiles(files) {
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var imageType = /^image\//;
			// 自动过滤非图片文件
			if (!imageType.test(file.type)) {
				continue;
			}
			// 创建img对象并加入到页面中
			var img = document.createElement("img");
			preview.appendChild(img);
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (function (aImg) {
				return function (e) {
					aImg.src = e.target.result;
				};
			})(img);
		}
	}
```

