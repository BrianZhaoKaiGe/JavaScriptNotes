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

## 11.antd Tab 组件改变底下那根线

```css
.ant-tabs-ink-bar {
		background-image: linear-gradient(to right, rgba(106, 236, 229, 1) 16.66%, rgba(13, 85, 225, 1) 16.66%, rgba(13, 85, 225, 1) 78.70%, rgba(48, 141, 224, 1) 78.70%, rgba(48, 141, 224, 1) 98.09%,rgba(106, 236, 229, 1) 98.09%, rgba(106, 236, 229, 1) 100.00%);
	}
```

# 12.jspdf插件导出pdf问题

1.导出后文字被切割问题

解决：取出所有标签，判断当前页的最后一个元素是否超过了A4一页的高度，超过就在其前面添加一个空元素把其挤下去

代码：

```javascript

                const A4_WIDTH = 592.28;
                const A4_HEIGHT = 841.89;
                let imageWrapper = document.getElementById("printArea"); // 获取DOM

                let pageHeight = imageWrapper.scrollWidth / A4_WIDTH * A4_HEIGHT;
                let lableListID = imageWrapper.querySelectorAll(".exportMark");
            
		 // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
                    for (let i = 0; i < lableListID.length; i++) {
                        let multiple = Math.ceil((lableListID[i].offsetTop + lableListID[i].offsetHeight) / pageHeight);
                        
                        if (this.isSplit(lableListID, i, multiple * pageHeight)) {
                            let divParent = lableListID[i].parentNode; // 获取该div的父节点
                            let newNode = document.createElement('div');
                            newNode.className = 'emptyDiv';
                            newNode.style.background = '#ffffff';
                            let _H = multiple * pageHeight - (lableListID[i].offsetTop + lableListID[i].offsetHeight);
                            
                            //留白
                            newNode.style.height = _H + 40 + 'px';
                            newNode.style.width = '100%';
                            let next = lableListID[i].nextSibling; // 获取div的下一个兄弟节点
                            // 判断兄弟节点是否存在
                            if (next) {
                                // 存在则将新节点插入到div的下一个兄弟节点之前，即div之后
                                divParent.insertBefore(newNode, next);
                            } else {
                                // 不存在则直接添加到最后,appendChild默认添加到divParent的最后
                                divParent.appendChild(newNode);
                            }
                        }
                    }
```

2.添加页眉问题---图片,页脚问题

```javascript
 	//在html2canvas的then
 	// 创建一个新的 Image 对象
	var img = new Image();
	// 设置图像的 src 属性
    img.src = 'image/genEXportPDFLogo.png';
    // 添加 onload 事件处理程序--图片必须在onload中处理，否则会报错
   img.onload = function () {
     for (let i = 0; renderedHeight < canvas.height; i++) {
       let page = document.createElement("canvas");
          page.width = canvas.width;
         	//可能内容不足一页
         page.height = Math.min(imgHeight, canvas.height - renderedHeight);
         //用getImageData剪裁指定区域，并画到前面创建的canvas对象中
		 page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);
         //添加图像到页面，保留10mm边距，---10，x轴，20是y轴偏移量
         pdf.addImage(page.toDataURL('image/jpeg', 0.2), 'JPEG', 10, 20, a4w, Math.min(a4h, a4w * page.height / page.width));    

        //添加页眉的logo
    	pdf.addImage(img, 'PNG', 10, 0, a4w, 20);
		// 为每一页添加
         pdf.setPage(i + 1);
         //设置字体包--要引入
         pdf.setFont("simhei");
         //字体大小
         pdf.setFontSize(7);
         //添加页脚
         pdf.text('Sangon市场、法务部监制 文档编号: SGJY201607A 版本号: V1.0', 10, 285);
         renderedHeight += imgHeight;
         if (renderedHeight < canvas.height)
           pdf.addPage();//如果后面还有内容，添加一个空页
            }
       
         pdf.save(_this.pageData.code && _this.pageData.code + 'pdf');

       };
    
    
    
```

