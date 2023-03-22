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

   > 首先设置好 axios 请求的 base_url,创建请求实例
   >
   > ```
   > const instance: AxiosInstance = axios.create({
   >   baseURL: BASE_URL,
   >   // 60s没请求到就超时
   >   timeout: 60000,
   > })
   > ```
   >
   > 运用 axios 创建的实例，用 get 请求得到当前用户的基础信息
   >
   > ```tsx
   > const me = (): Promise<UserType> => {
   >   return request.get("/users/me")
   > }
   > ```
   >
   > 对 token 进行存储
   >
   > ```tsx
   > // 获取tokens
   > const createToken = (tokenRequest: TokenRequest): Promise<string> => {
   >   return request.post("/tokens", tokenRequest)
   > }
   >
   > async login(loginForm: TokenRequest): Promise<void> {
   >   this.token = await tokenApi.createToken(loginForm)
   >   const permissionStore = usePermissionStore()
   >   console.log("permission routes", typeof permissionStore.routes)
   >   console.log(Object.keys(permissionStore.routes))
   >   console.log(permissionStore.routes)
   > },
   > ```

4. API 封装：API 错误处理，全局提示

   > API 封装主要封装 axios 请求，全局请求前缀 url 进行设置，同时对请求和响应进行相应的拦截处理，
   >
   > 请求拦截器主要判断当前 token 的存在与否，如果存在 token,需要在请求的鉴权头部加上 appStore 当中的 token
   >
   > 响应拦截器对 API 响应错误做出处理，如果响应状态码是 401 403,此时执行 appStore 的登出操作

5. 权限集增加到 router 扩展

   > 项目中的权限指的是当前用户能获取到什么样的界面，以及是否具有创建用户、编辑用户信息的权限，项目中实现权限管理的方法是增加 routeMeta 的属性
   >
   > ```tsx
   > //增加Meta属性
   > declare module "vue-router" {
   >   interface RouteMeta extends Record<string | number | symbol, undefined> {
   >     permission?: string
   >     icon?: string //可选属性
   >     title?: string
   >   }
   > }
   >
   > export enum PermissionEnum {
   >   DASHBOARD = "dashboard", //控制台
   >   USER = "user", //
   >   USER_LIST = "user:list",
   >   USER_LIST_CREATE = "user:list:create",
   >   USER_LIST_EDIT = "user:list:edit",
   >   USER_ROLES = "user:roles",
   >   USER_ROLES_CREATE = "user:roles:create",
   >   USER_ROLES_EDIT = "user:roles:edit",
   > }
   > ```
   >
   > 通过 meta 属性可以在路由中控制左边菜单栏的渲染，实现菜单栏在左边的动态呈现
   >
   > 同时，采用自定义指令 v-permission 来控制创建和编辑用户、创建角色和编辑角色的按钮的呈现与否，如果 permissionEnum 含有当前权限，则显示创建和编辑的按钮
   >
   > 所以项目的权限集管理是通过 route 的 meta 属性和自定义指令来实现的
