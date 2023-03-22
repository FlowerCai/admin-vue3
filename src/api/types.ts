// 用户名和密码类型
export type TokenRequest = {
  username: string
  password: string
}

// 响应错误体
export type ErrorResponse = {
  code: number
  message: string
}

//
export type AppState = {
  token: string
  menuCollapse: boolean
}

// 用户类型
export type UserType = {
  id: string
  username: string
  nickname: string
  roles: Array<string>
  permissions: Array<string>
}

export type RoleType = {
  id: string
  name: string
  label: string
  permissions: Array<string>
}

// 表格下数据分析数据

export interface Paging {
  page?: number
  size?: number
  total?: number
}

// 模版
export type ListResult<T> = {
  paging: Paging
  data: Array<T>
}

export interface UserFilter extends Paging {
  name: string
}

export interface RoleFilter extends Paging {
  name: string
  label: string
}

export interface Searchable<T> {
  list(filter: object): Promise<ListResult<T>>
}

export interface Editable<R, T> {
  create(request: R): Promise<T>

  edit(id: string, request: R): Promise<T>
}

export interface UserCreateRequest {
  username: string
  nickname: string
  roles?: Array<string>
}

export interface RoleCreateRequest {
  name: string
  label: string
  permission: Array<string>
}
