# 并发请求时，一个请求完成后再请求下一个（Promise）
```js
    function request(x){
      return new Promise( resolve => {
        // 定时器模拟请求
        const timer = setTimeout(() => {
        console.log(x);
        resolve(x)
        clearTimeout(timer)
        },1000)
      })
    }

    // promise请求队列
    const queue = []
    function promiseQueue(list) {
    //为什么取Promise.resolve?
      let sequence = Promise.resolve()
      list.forEach(item => {
      //Promise 的then方法，用来指定下一步的回调函数。
      sequence = sequence.then(item)
      });
      return sequence
    }
    //为什么push函数？
    queue.push(() => request(1) )
    queue.push(() => request(2) )
    queue.push(() => request(3) )
    queue.push(() => request(4) )
    promiseQueue(queue)
```