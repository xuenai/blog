#博客客户端

[项目预览](http://justpeth.com "烟雨不尽夜流离")

项目采用[Create React App](https://github.com/facebook/create-react-app), 本来想用jss的，发现写起来不太顺手，就改成了使用scss

未做单元测试，自己手动测试了下

数据交互使用的是apollo-client;部分第三方接口使用的原生fetch

项目98%都是使用的Function Component实现（~~除了使用第三方接口的以外~~）

路由模式采用的history模式(~~不会说是因为看起来好看才用这个的~~)

## 博客实现的功能

**前台使用路由blog开头**

目前只实现了以下最简单的功能

1. 日志列表（按创建/更新时间降序）（*没有分页查询，Pagination组件都封装好了，但是最后在写前台的时候，还是放弃了，用graphQL一次性查出数据挺爽，详情快滴很*）
2. 日志归档（按年分组 按年降序）
3. 标签列表
4. 日志搜索（在日志标题、简介、内容中模糊匹配）
5. 按标签查询日志
6. 日志详情

**中台使用路由dashboard开头**

中台功能相对来说更简单一些，而且页面样式对比前台更加粗糙（~~我自己用的，我有说什么了么~~）

1. 日志的增删改查
2. 标签的增删改查
3. 登录页面

**项目中封装的组件**

1. Button
2. Input
3. Checkbox Checkbox.Group
4. Empty
5. Icon
6. Loading
7. Message
8. Popcomfirm
9. Popover
10. Spin
11. Timeline
12. Tooltip
13. Page(~~完全没用到~~)

## 项目中请求用的是[apollo-client](https://www.apollographql.com/docs/react/)

具体使用参展官网

## 项目中封装了一个简单的进度条插件

代码查看项目中 *src/config/Hpress.js*

使用方式

```js
// 进度条开始
Hpress.start();

// 设置进度条位置 number为0 到 1的数值
Hpress.set(number);

// 随机增加进度条长度
Hpress.trickle();

// 进度条完成
Hpress.done();

```

因为服务器比较渣，资源加载比较慢，我用一点骚操作，进度条js放在head中的，然后在body中调用
```js
Hpress.start();
```
然后在body标签后调用进度条结束功能
```js
Hpress.done()
```
这样做有啥好处呢，我不用自己去管资源加载状况，我们进度条随机增长进度，在页面上资源没加载完成前不会执行完成方法，而且页面在加载资源过程中会有动画存在，而不是一片白屏。

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

路由[react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)

路由代码分割[react-loadable](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)，为啥要使用代码分割，查看文章[code-splitting](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)

动画库 [react-transition-group](https://reactcommunity.org/react-transition-group/)