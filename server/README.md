# blog-server 博客服务端

## 导航
<!-- TOC -->

- [blog-server 博客服务端](#blog-server-博客服务端)
  - [导航](#导航)
  - [简介](#简介)
  - [项目启动](#项目启动)
  - [项目结构](#项目结构)

<!-- /TOC -->

## 简介

> 项目栈 apollo-server-koa + koa + graphql + graphql-tools + mongoose


## 项目启动

本地调试：
```
# yarn
# yarn start
```

## 项目结构
```
|-- app.js   // 项目启动时babel es6语法
|-- package.json
|-- src
    |-- server.js // 入口程序
    |-- config  // 项目中用到的一些公共方法
    |   |-- auth.js
    |   |-- dataloader.js
    |   |-- formatError.js
    |   |-- index.js
    |   |-- utils.js
    |-- graphql // graphql项目文件
    |   |-- index.js
    |   |-- subscriptionName.js
    |   |-- typeDefs.js
    |   |-- resolvers
    |       |-- Mutation.js
    |       |-- Query.js
    |       |-- User.js
    |-- mongodb // mongodb相关文件
        |-- index.js
        |-- schema
            |-- index.js
            |-- user.js
```