# Admin

Admin 是借鉴 github 优秀后台项目[soybean-admin](https://github.com/honghuangdc/soybean-admin) 和 [dashboard](https://github.com/zce/dashboard) 写的后台雏形，它基于 Vue3、pinia、Vue Router 4、TypeScript、TDesign 实现。它可以帮助用户快速搭建后台产品原型, 部署在 nginx 服务器

## demo

[网站链接](http://codingfang.com/#/dashboard)

## 功能特性

- 实现功能点

  1. 登录界面

     > 引入 Tdesign 库，

  1. Pinia 引入
  1. 登录逻辑
  1. API 封装：API 错误处理，全局提示
  1. token 持久化方案
  1. 用户基本信息获取
  1. 退出登录逻辑编写
  1. 退出登录入口组件
  1. 权限集增加到 router 扩展
  1. 菜单栏组件封装
  1. pinia 管理 permissionRoutes
  1. 自定义组件 v-permission
  1. 用户管理业务组件，包括用户创建、编辑

- 技术栈

- 收获

- 扩展学习收获

- 登录/注销
- 权限验证
  - 动态路由
  - 权限指令
- 实用组件
  - ECharts
- 控制台
- 用户管理
- 角色管理
- 表格
  - 基础表格
  - 内联编辑
- 错误页面
  - 404 错误页面
  - 403 错误页面
  - 全局接口拦截、响应拦截和请求拦截，处理错误
