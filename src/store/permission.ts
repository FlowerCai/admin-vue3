// 权限状态管理
import { defineStore } from "pinia"
import type { RouteRecordName, RouteRecordRaw } from "vue-router"
import { MENU_ROUTE_NAME, routes } from "@/router"

type PermissionState = {
  routes: Array<RouteRecordRaw>
}

const filterRoutes = (
  routes: Array<RouteRecordRaw>,
  permissions: Array<string>
) => {
  console.log("hold on", routes, permissions)

  const newRoutes = routes.filter((route: RouteRecordRaw) => {
    console.log("yes", route)
    if (route.children) {
      route.children = filterRoutes(route.children, permissions)
    }
    // 1. 没有定义meta的路由 ： !route.meta
    // 2. 没有定义meta里面permission !route.meta.permission
    // 3. permission是否存在与当前permissions 里面
    return (
      !route.meta ||
      (route.meta &&
        (!route.meta.permission ||
          (route.meta.permission &&
            permissions.includes(route.meta.permission))))
    )
  })
  console.log("newRoutes", newRoutes)
  return newRoutes
}

const buildPermissionRoutesNameList = (routes: Array<RouteRecordRaw>) => {
  const nameList: Array<RouteRecordName> = []
  routes.forEach((route) => {
    if (route.children) {
      nameList.push(...buildPermissionRoutesNameList(route.children))
    }
    if (route.name) {
      nameList.push(route.name)
    }
  })
  return nameList
}

export const usePermissionStore = defineStore("permission", {
  state: (): PermissionState => {
    return {
      routes: [],
    }
  },
  persist: true,
  // 得到应该渲染的路由
  actions: {
    generateRoutes(permissions: Array<string>, admin = false) {
      this.routes = admin ? routes : filterRoutes(routes, permissions)
    },
  },
  getters: {
    menuRoutes(): Array<RouteRecordRaw> | undefined {
      const menu = this.routes.find(
        (route: RouteRecordRaw) => route.name === MENU_ROUTE_NAME
      )?.children
      console.log("menu", menu)
      return menu
    },
    permissionRouteNamesList(): Array<RouteRecordName> {
      return this.routes ? buildPermissionRoutesNameList(this.routes) : []
    },
  },
})
