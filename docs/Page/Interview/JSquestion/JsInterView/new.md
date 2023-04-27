# new关键字在执行时干了什么？

问：new在执行时做了什么？

答：1.创建一个新对象并分配给this

​		2.执行函数体

​		3.返回this值

代码示例：

```javascript
function User(name) {
  // this = {};（隐式创建）

  // 添加属性到 this(执行函数体)
  this.name = name;
  this.isAdmin = false;

  // return this;（隐式返回）
}
```

