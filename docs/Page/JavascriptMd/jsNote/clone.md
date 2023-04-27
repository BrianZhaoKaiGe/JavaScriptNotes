# 浅拷贝，深拷贝

## 一、理解

1、**浅拷贝：**只是**拷贝一层**，更深层次对象级别的**只拷贝了地址**。

​    [浅拷贝](https://so.csdn.net/so/search?q=浅拷贝&spm=1001.2101.3001.7020)的时候如果数据是基本数据类型，那么就如同直接赋值那种，会拷贝其本身，如果除了基本数据类型之外还有一层对象，那么对于**浅拷贝而言就只能拷贝其引用，对象的改变会反应到拷贝对象上**。

2、**深拷贝：**[深拷贝](https://so.csdn.net/so/search?q=深拷贝&spm=1001.2101.3001.7020)就会**拷贝多层**，即使是嵌套了对象，也会都拷贝出来，内容和原对象一样，**更改原对象，拷贝对象不会发生变化**。

## 浅拷贝

```javascript
var obj = {
	id:1,
	name:'Andy',
}
 
var newObj = {}
for(var key in obj) {
	//key是当前属性名， obj[k]是当前属性值
	newObj[key] = obj[key]
}
 
console.log(newObj)

//语法糖
Object.assign(target,  ...sources)

// target：要拷贝给谁
// source：要拷贝的对象
```

## 深拷贝

```javascript
var obj = {
	id:1,
	name:'Andy',
	msg: {
		age:18
	},
	color:['pink','red']
}
 
var newObj = {}
//封装函数
function deepCopy(newObj,obj) {
	for(var key in obj) {
		//判断属性值属于哪种数据类型
		//属性值 obj[key]
		//1.判断这个值是否为数组(数组也属于特殊对象，也是引用类型数据)
		if(obj[key] instanceof Array) {
			newObj[key] = []
			deepCopy(newObj[key],obj[key]) //运用递归，把原对象属性值给新对象
			//判断这个值是否为对象
		} else if(obj[key] instanceof Object) {
			newObj[key] = {}
			deepCopy(newObj[key],obj[key]) //运用递归，把原对象属性值给新对象
		} else {
			//若是普通数据类型
			newObj[key] = obj[key]
		}
		
	}
}
deepCopy(newObj,obj)
```

 例如 [lodash](https://lodash.com/) 库的 [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep)。 

## JSON.parse(JSON.stringify(obj))

```javascript
var obj = {
	id:1,
	name:'Andy',
	msg: {
		age:18
	},
	color:['pink','red']
}

let deepCopy = JSON.parse(JSON.stringify(obj))这种方法有缺陷
```

​     **1.如果json里面有时间对象，则序列化后会将时间对象转换为字符串格式** 

```javascript
let obj = {
  motto:'行则将至',
  date:new Date()
}
let deepCopy = JSON.parse(JSON.stringify(obj))
console.log(obj)//{motto: '行则将至', date: Tue Mar 29 2022 16:47:33 GMT+0800 (中国标准时间)}
console.log(deepCopy)//{motto: '行则将至', date: '2022-03-29T08:47:33.399Z'}
console.log(typeof obj.date);
console.log(typeof deepCopy.date);
```

  **2.如果json里有 function,undefined，则序列化后会将 function,undefined 丢失** 

```javascript
let obj = {
  motto: '行则将至',
  typeU: undefined,
  fun: function () {
    console.log('fun');
  },
}
let deepCopy = JSON.parse(JSON.stringify(obj))
console.log(obj)//{motto: '行则将至', typeU: undefined, fun: ƒ}
console.log(deepCopy)//{motto: '行则将至'}
```

  **3.如果json里有NaN、Infinity和-Infinity，则序列化后会变成null** 

```javascript
let obj = {
  motto: '行则将至',
  type1: NaN,
  infinity1: 1.7976931348623157E+10308,
  infiniteSimal: -1.7976931348623157E+10308
}
let deepCopy = JSON.parse(JSON.stringify(obj))
console.log(obj)//{motto: '行则将至', type1: NaN, infinity1: Infinity, infiniteSimal: -Infinity}
console.log(deepCopy)//{motto: '行则将至', type1: null, infinity1: null, infiniteSimal: null}
```

   **4.如果json里有对象是由构造函数生成的，则序列化的结果会丢弃对象的 constructor** 

```javascript
function Person(name) {
  this.name = name;
}
let obj = {
  p1: new Person('喜陈'),
  motto: '行则将至'
};
let deepCopy = JSON.parse(JSON.stringify(obj));
console.log('obj', obj);
console.log('deepCopy', deepCopy);
// 查看原型链
console.log(obj.p1.__proto__.constructor === Person); // true
console.log(deepCopy.p1.__proto__.constructor === Object); // true
```

  **5.如果对象中存在循环引用的情况将抛出错误** 

```javascript
let obj = {
  motto: '行则将至',
}
obj.obj = obj
let deepCopy = JSON.parse(JSON.stringify(obj))
//这样会报错
```

