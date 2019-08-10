import * as http from 'http';
import app from './app';

// app.callback() 会返回一个能够通过http.createServer创建server的函数，类似express和connect。
let currentApp = app.callback();
// 创建server
const server = http.createServer(currentApp);
server.listen(3000);

// 热加载
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}