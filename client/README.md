#博客客户端

项目采用[Create React App](https://github.com/facebook/create-react-app)

**使用crlf格式，tab为2格空格**

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

状态管理[react-redux](https://github.com/reduxjs/react-redux),如果有兴趣可以去尝试另外一款状态管理工具[mobx](https://cn.mobx.js.org/)

redux中间件[redux-thunk](https://www.npmjs.com/package/redux-thunk)，`可以再action里面使用异步方法`

类名可以使用对象的方式赋值,同时使用css modules [classnames](https://www.npmjs.com/package/classnames)

热加载，不会刷新网页[react-hot-loader](https://github.com/gaearon/react-hot-loader)

动画库 [react-motion](https://github.com/chenglou/react-motion)