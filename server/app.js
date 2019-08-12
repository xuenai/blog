// 使用babel插件 让node.js能够使用 import;
require('@babel/register')
require('@babel/polyfill')
require('./src/server')