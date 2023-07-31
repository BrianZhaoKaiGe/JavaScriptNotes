# 日常记录及踩坑日记

## 1.深拷贝DOM节点

```javascript
const node = document.querySelector("html");
//深拷贝DOM节点
const newNode = node.cloneNode(true);
```

## 2.原生js追加行内样式

```javascript
Node.querySelector('#id').setAttribute('style',`${Node.querySelector('#communityCircos').getAttribute("style")};transform:translate(-100px, 0px);`) //追加transform样式，不会更改原有样式，分号是为了防止前人样式没有分号结尾
```

## 3.dom节点转base64

```javascript
const Base64 = {
			_keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
			encode: function (input) {
				var output = '';
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				input = Base64._utf8_encode(input);
				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output =
						output +
						this._keyStr.charAt(enc1) +
						this._keyStr.charAt(enc2) +
						this._keyStr.charAt(enc3) +
						this._keyStr.charAt(enc4);
				}
				return output;
			},
			decode: function (input) {
				var output = '';
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
				while (i < input.length) {
					enc1 = this._keyStr.indexOf(input.charAt(i++));
					enc2 = this._keyStr.indexOf(input.charAt(i++));
					enc3 = this._keyStr.indexOf(input.charAt(i++));
					enc4 = this._keyStr.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}
				}
				output = Base64._utf8_decode(output);
				return output;
			},
			_utf8_encode: function (string) {
				string = string.replace(/\r\n/g, '\n');
				var utftext = '';
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if (c > 127 && c < 2048) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
				}
				return utftext;
			},
			_utf8_decode: function (utftext) {
				var string = '';
				var i = 0;
				var c = (c1 = c2 = 0);
				while (i < utftext.length) {
					c = utftext.charCodeAt(i);
					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					} else if (c > 191 && c < 224) {
						c2 = utftext.charCodeAt(i + 1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					} else {
						c2 = utftext.charCodeAt(i + 1);
						c3 = utftext.charCodeAt(i + 2);
						string += String.fromCharCode(
							((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63),
						);
						i += 3;
					}
				}
				return string;
			},
		};
```

## 4.导出的pdf有切割内容现象

//page-break-inside属性，避免在元素内部分页
page-break-inside: avoid !important;

## 5.git跳过eslint校验

```
git commit -m '提交信息' --no-verify
```

## 6.antd表单label右对齐不生效

原因：label标签的宽度被限制了

解决：给label标签添加宽度

## 7.antd表单DatePicker日期选择器只能选择今天及之后

引入moment

```javascript
import moment from 'moment';

//定义方法
const disabledDate = (current: any) => {
		return current < moment().startOf('day');
}


//组件使用
<DatePicker disabledDate={disabledDate} format="YYYY-MM-DD HH:mm:ss" />


```

## 8.路由跳转，页面没有在顶部解决方法



```react
useEffect(() => {
    
		window.scrollTo(0, 0)
    
})

```

## 9.antd表格表头右侧小竖线取消

```
.ant-table-cell::before{
			display: none;
		}
```

## 10.在全局样式中穿透第三方样式不需要加:global

## 11.antdTab组件改变底下那根线

```css
.ant-tabs-ink-bar {
		background-image: linear-gradient(to right, rgba(106, 236, 229, 1) 16.66%, rgba(13, 85, 225, 1) 16.66%, rgba(13, 85, 225, 1) 78.70%, rgba(48, 141, 224, 1) 78.70%, rgba(48, 141, 224, 1) 98.09%,rgba(106, 236, 229, 1) 98.09%, rgba(106, 236, 229, 1) 100.00%);
	}
```

