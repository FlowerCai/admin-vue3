# Admin

Admin 是借鉴 github 优秀后台项目[soybean-admin](https://github.com/honghuangdc/soybean-admin) 和 [dashboard](https://github.com/zce/dashboard) 写的后台雏形，它基于 Vue3、pinia、Vue Router 4、TypeScript、TDesign 实现。它可以帮助用户快速搭建后台产品原型, 部署在 nginx 服务器

## demo

[网站链接](http://codingfang.com/#/dashboard)

## 功能特性

1. 登录界面

   > 引入 Tdesign 库, 在 main.ts 全局注入 Tdesign 组件库，之后在 vue 文件都可以使相应组件。
   >
   > 在编写 LoginView 时，采用 t-form 输入表单，绑定相应的用户名和密码，当点击登录时，首先会对 t-form 本身设置的规则进行验证，
   >
   > ```js
   > await appStore.login(loginForm)
   > await userStore.fetchCurrentUser()
   > await MessagePlugin.success("登录成功")
   > // 跳转到控制台
   > await router.push({ name: "dashboard" })
   > ```
   >
   > pinia 利用持久层保存 token,以及边侧栏的展开与否。同时发送请求获取当前用户信息，对 header.vue 头部区域基础信息进行渲染。同时默认跳转到控制台界面

2. Pinia 引入

   > 安装 pinia,同时 main.ts 全局注入 pinia
   >
   > ```ts
   > const pinia = createPinia()
   > pinia.use(piniaPluginPersistedstate)
   > ```
   >
   > 创建多个 store
   >
   > ```tsx
   > app.ts 从整个App创建store,创建存储token和menuCollapse(边侧栏展开与否的)，以及登录与登出界面
   > permission.ts 从权限层面定义store，根据权限得到左边能动态渲染的菜单栏
   > user.ts 从用户层面定义store,
   > ```

3. 登录逻辑
4. API 封装：API 错误处理，全局提示
5. token 持久化方案
6. 用户基本信息获取
7. 退出登录逻辑编写
8. 退出登录入口组件
9. 权限集增加到 router 扩展
10. 菜单栏组件封装
11. pinia 管理 permissionRoutes
12. 自定义组件 v-permission
13. 用户管理业务组件，包括用户创建、编辑

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
