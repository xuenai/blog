#博客客户端

项目采用[Create React App](https://github.com/facebook/create-react-app), 本来想用jss的，发现写起来不太顺手，就改成了使用module scss

**使用crlf格式，tab为2格空格**

## 关于z-index

```
--zspin           : 8;
--zaffix          : 10;
--zbackTop        : 10;
--zselect         : 900;
--zmodal          : 1000;
--zdrawer         : 1000;
--zmessage        : 1010;
--znotification   : 1010;
--ztooltip        : 1060;
--zloadingbar     : 2000;
--zfullscreen     : 2010;
```

## 关于状态管理

使用的是 [hooks](https://zh-hans.reactjs.org/docs/hooks-intro.html) 自己乱封装的类似vuex action风格的简易版， 只能在function component中使用；

使用时需要在单独创建单独的model文件, 本项目中类似 src/store/modules中的文件：

格式必须为下面这种格式：其中 model()获取当前的state; model(name) 获取名为name中的state; setState是改变当前state
```
{
  name: string;
  model: {
    state: object;
    actions: ({model, setState}) => object;
  }
}
```
示例代码：
```
export default {
  name: 'counter',
  model: {
    state: {
      count: 0
    },
    actions: ({ model, setState }) => ({
      increment() {
        const { count } = model();
        setState({ count: count + 1 });
      },
      decrement() {
        const { count } = model();
        setState({ count: count - 1 });
      },
      async incrementAsync() {
        const { increment } = model();
        await new Promise(resolve => setTimeout(resolve, 1000));
        increment();
      }
    })
  }
};
```
使用时可以使用 initStore 方法统一设置全局状态，如src/store/index.js中的那样

```
import counterModule from './modules/counterModule'
import {initStore} from '@config'

const store = () => {
  // 多个参数直接正常穿进去就行
  // initStore(counterModule, counterModule, counterModule)
  initStore(counterModule)
}
export default store;
```

之后在src/index.js或者src/app.js中引用src/store/index.js中的store方法并执行,完成全局注册状态

```
import store from '@store';
store();
```
在组件中使用的时候，*只能用在react function Component中*，使用方法如下：

```
import React from "react";
import {useStore } from '@config';

function Counter() {
  const { count, increment, decrement, incrementAsync } = useStore('counter');
  return (
    <>
      <h1>Counter</h1>
      <p>
        Count: <code>{count}</code>
      </p>
      <footer>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={incrementAsync}>
          + Async{incrementAsync.loading && "..."}
        </button>
      </footer>
    </>
  );
}

export default Counter;

```

## 可用命令

在项目中可以运行以下命令

### `npm start`

在开发模式下打开应用<br>
在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### `npm test`

以交互监视模式启动测试运行器，参阅[running tests](https://facebook.github.io/create-react-app/docs/running-tests) 了解更多

### `npm run build`

生产打包到`build`目录

参阅[deployment](https://facebook.github.io/create-react-app/docs/deployment) 了解更多.

## 项目中用到的相关依赖

脚手架[create-react-app](https://github.com/facebook/create-react-app)

不可改变数据结构[immutable](https://www.npmjs.com/package/immutable)

路由[react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)

路由代码分割[react-loadable](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)，为啥要使用代码分割，查看文章[code-splitting](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)

动画库 [react-motion](https://github.com/chenglou/react-motion)