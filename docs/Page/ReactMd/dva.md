# dva.js使用

## 创建UI组件

```javascript
const IndexPage = (props)=> {
  return (
    <div>
		
    </div>
  );
}

```

使用connect连接UI组件，从dva中引入，如果是项目使用的是umi则中umi中引入

```javascript
import { connect } from 'dva'
//或者
import { connect } from 'umi';

```

引入之后使用connect连接UI组件，这块注意不要导出UI组件，导出connect后的容器

```javascript
import { connect } from 'dva'
//或者
import { connect } from 'umi';

/* UI组件 */
const IndexPages = (props)=> {
  return (
    <div>
      
    </div>
  );
}

export default connect()(IndexPage)

```

connect()()的第一个括号中就是要从dva中取的数据，以及要传给UI组件的值。

## 定义 Model

 新建 model `models/products.js` 

```javascript
export default {
  namespace: 'products',
  state:{
      count：0
  },
  reducers: {},
};
```

- `namespace` 表示在全局 state 上的 key
- `state` 是初始值
- `reducers` 等同于 redux 里的 reducer，接收 action，同步更新 state

## 连接dva

```javascript
import { connect } from 'dva'
//或者
import { connect } from 'umi';

/* UI组件 */
const IndexPages = (props)=> {
  return (
    <div>
     {props.UICount}
    </div>
  );
}


/*
  这里是解构了state中的count
  这个count就是products.js中state，连接后 products.js中的state会映射到这里，所以能直接使用
  这里返回的值就是传给UI组件的值，在UI组件props中接受使用
*/
const getDvaData = ({count}) => {
  return {
    UICount:count
  }
}
export default connect(getDvaData)(IndexPage)

```

还有另一种写法，这种写法跟上面效果一样

```javascript
import { connect } from 'dva'
//或者
import { connect } from 'umi';

/* UI组件 */
const IndexPages = (props)=> {
  return (
    <div>
     {props.count}
    </div>
  );
}

export default connect(

 ({count}) => count
 
)(IndexPage)

```

