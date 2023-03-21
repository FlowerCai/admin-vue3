import axios, { AxiosError } from "axios"

import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios"
import type { ErrorResponse } from "@/api/types"
import { MessagePlugin } from "tdesign-vue-next"
import { useAppStore } from "@/store"

// 全局请求前缀url
const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // 60s没请求到就超时
  timeout: 60000,
})

const tokenPrefix = "Bearer "

// 请求拦截器
instance.interceptors.request.use((request: AxiosRequestConfig) => {
  const appStore = useAppStore()
  if (appStore.token && request.headers) {
    request.headers["Authorization"] = tokenPrefix + appStore.token
  }
  return request
})

// 响应拦截器，对全局错误做出提示
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // return response
    return response.data
  },
  async (error: AxiosError<ErrorResponse>): Promise<AxiosError> => {
    const responseData: ErrorResponse | undefined = error.response?.data
    responseData && (await MessagePlugin.error(responseData.message))

    if (error.response?.status === 401 || error.response?.status === 403) {
      const appStore = useAppStore()
      await appStore.logout()
    }
    return Promise.reject(error)
  }
)

export default instance
