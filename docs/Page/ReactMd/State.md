# State 的更新是异步的

## 问题

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。 

因此，state的更新是异步的。

可以让setState（）  接收一个函数。 来解决这个问题

```javascript
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

上面使用了[箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，不过使用普通的函数也同样可以：

```javascript
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

## 原因和机制

调用setState时，组件的state并不会立即改变，setState只是把要修改的状态放入一个队列中，
React会优化真正的执行时机，并且出于性能原因，可能会将多次setState的状态修改合并成一次
状态修改。所以不要依赖当前的state,计算下一个state。当真正执行状态修改时，依赖的this.state
并不能保证是最新的state,因为React会把多次state的修改合并成一次，这时this.state还是这几
次state修改前的state。另外，需要注意的是，同样不能依赖当前的props计算下一个状态，因为
props的更新也是异步的。
举个例子，对于一个电商类应用，在购物车中，点击一次购买数量按钮，购买的数量就会加1，
如果连续点击两次按钮，就会连续调用两次this.setState({quantity:this.state.quantity+l}),在React
合并多次修改为一次的情况下，相当于等价执行了如下代码：

```javascript
object.assign(
    previousstate,
    (quantity:this.state.quantity 1},
    (quantity:this.state.quantity 1}
)
```

于是，后面的操作覆盖前面的操作，最终购买的数量只增加1。
如果有这样的需求，可以使用另一个接收一个函数作为参数的setState,这个函数有两个参数，
第一个是当前最新状态（本次组件状态修改生效后的状态）的前一个状态preState(本次组件状态
修改前的状态)，第二个参数是当前最新的属性props。代码如下：

```javascript
//正确
this.setstate((prestate,props)=>({
counter:prestate.quantity 1;
}))
```

## state的更新是一个合并的过程

当调用setState修改组件状态时，只需要传入发生改变的state,而不是组件完整的state,因为
组件state的更新是一个合并的过程。例如，一个组件的状态为：

```javascript
this.state = {
title :’React ’,
content :’React is an wonderful JS library !’
}
```

当只需要修改状态title时，将修改后的title传给setState即可：

```javascript
this.setstate((title:'Reactjs'));
```

React会合并新的title到原来的组件状态中，同时保留原有的状态content,合并后的state为：

```javascript
{
    title 'Reactjs',
    content 'React is an wonderful JS library!'
}
```

## state与不可变对象

React官方建议把state当作不可变对象，一方面，直接修改this.state,组件并不会重新render;
另一方面，state中包含的所有状态都应该是不可变对象。当state中的某个状态发生变化时，应该
重新创建这个状态对象，而不是直接修改原来的状态。那么，当状态发生变化时，如何创建新的状
态呢？根据状态的类型可以分成以下三种情况：

### 1.状态的类型是不可变类型（数字、字符串、布尔值、null、undefined)

这种情况最简单，因为状态是不可变类型，所以直接给要修改的状态赋一个新值即可。例如
要修改count(数字类型)、title(字符串类型)、success(布尔类型)三个状态：

```javascript
this.setstate({
    count:1,
    title:'React',
    success:true
})
```

### 2.状态的类型是数组

例如有一个数组类型的状态books,当向books中增加一本书时，可使用数组的concat方法或
ES6的数组扩展语法(spread syntax):

```javascript
//方法一：使用preState、concat创建新数组
this.setstate(prestate =(
    books:prestate.books.concat (['React Guide']);
}))

//方法二：ES6 spread syntax
this.setstate(prestate =(
	books:[...preState.books,'React Guide'];
}))
```

当从books中截取部分元素作为新状态时，可使用数组的slice方法：

```javascript
this.setstate(prestate =(
	books:prestate.books.slice(1,3);
}))
```

当从books中过滤部分元素后，作为新状态时，可使用数组的filter方法：

```javascript
this.setState(preState =>(
    books:prestate.books.filter(item =>
    return item !=='React';
    })
}))
```

注意，不要使用push、pop、shit、unshift、splice等方法修改数组类型的状态，因为这些方法
都是在原数组的基础上修改的，而concat、slice、filter会返回一个新的数组。

### 3.状态的类型是普通对象（不包含字符串、数组）

```javascript
//使用ES6的Object..assgin方法：
this.setstate(prestate =>(
	owner:Object.assign((},prestate.owner,(name:Jason'});
}))

//使用对象扩展语法(object spread properties):
this.setstate(prestate =>(
	owner:{...prestate.owner,name:Jason')
}))
```

