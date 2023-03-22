import type { RouteRecordName, RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"
// 登录界面
import LoginView from "@/views/login/index.vue"
//整体 框架
import LayoutView from "@/views/common/layout.vue"
import NotFoundView from "@/views/error/not-found.vue"
import NotAllowedView from "@/views/error/not-allowed.vue"
import PageLayoutView from "@/views/common/page-layout.vue"
import { useAppStore } from "@/store"
import { PermissionEnum } from "@/config/permission.config"
import { usePermissionStore } from "@/store/permission"

//增加Meta属性
declare module "vue-router" {
  interface RouteMeta extends Record<string | number | symbol, undefined> {
    permission?: string
    icon?: string //可选属性
    title?: string
  }
}

// 渲染菜单栏的方式
export const MENU_ROUTE_NAME = "menuRoot"

export const routes: Array<RouteRecordRaw> = [
  // start1
  {
    path: "/",
    name: MENU_ROUTE_NAME,
    component: LayoutView,
    redirect: "user",
    children: [
      {
        name: "dashboard",
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          // 枚举类统一管理
          permission: PermissionEnum.DASHBOARD,
          title: "控制台", //渲染到菜单栏里
          icon: "dashboard",
        },
      },

      {
        name: "user",
        path: "user",
        component: PageLayoutView,
        meta: {
          title: "用户",
          icon: "usergroup",
          permission: PermissionEnum.USER,
        },
        redirect: { name: "user-list" },
        children: [
          {
            name: "user-list",
            path: "list",
            component: () => import("@/views/user/index.vue"),
            meta: {
              title: "用户管理",
              icon: "user",
              permission: PermissionEnum.USER_LIST,
            },
          },
          {
            name: "role-list",
            path: "roles",
            component: () => import("@/views/user/roles.vue"),
            meta: {
              title: "角色管理",
              permission: PermissionEnum.USER_ROLES,
              icon: "secured",
            },
          },
        ],
      },
    ],
  },
  // end1
  // 登录界面
  { path: "/login", name: "login", component: LoginView },
  // 403界面
  { path: "/403", name: "not-allowed", component: NotAllowedView },
  // 未找到当前路由的页面
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundView },
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes,
  // 跳转页面时回到页面最上面
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

const whiteList: Array<RouteRecordName | undefined | null> = [
  "login",
  "not-found",
  "not-allowed",
]
// 导航守卫：每一个路由跳转之前都要验证
/**
 * to:跳转到哪里
 * from:从哪里来
 * next:继续执行下去
 */
router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  // console.log("to", to, Object.keys(to))
  // console.log(from)
  if (!appStore.token) {
    whiteList.indexOf(to.name) !== -1
      ? next()
      : next(`/login?redirect=${to.path}`)
  }

  if (appStore.token && to.path === "/login") {
    // 跳转到首页
    next({ name: "dashboard" })
  }
  // 判断token是否存在，判断当前访问的域名是否合法；
  // 如果不合法，跳转至403页面
  if (to.name) {
    const permissionStore = usePermissionStore()
    const hasNoPermission = !permissionStore.permissionRouteNamesList.includes(
      to.name
    )
    appStore.token &&
      hasNoPermission &&
      whiteList.indexOf(to.name) !== -1 &&
      next({ name: "not-allowed" })
  }
  next()
})

export default router
