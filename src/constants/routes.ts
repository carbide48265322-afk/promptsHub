/**
 * 路由常量定义
 * 所有路由路径和名称集中管理，避免硬编码
 */

// 路由路径常量（仅静态路径字符串）
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROMPTS: '/prompts',
  PROMPT_CREATE: '/prompts/new',
  CATEGORIES: '/categories',
  ADMIN_RBAC: '/admin/rbac',
  RBAC_PERMISSIONS: '/admin/rbac/permissions',
  RBAC_ROLES: '/admin/rbac/roles',
  RBAC_USERS: '/admin/rbac/users',
  NOT_FOUND: '*',
} as const

// 动态路由辅助函数
export const getPromptDetailPath = (id: string) => `/prompts/${id}`
export const getPromptEditPath = (id: string) => `/prompts/${id}/edit`
export const getCategoryDetailPath = (id: string) => `/categories/${id}`

// 路由名称常量
export const RouteNames = {
  Home: 'Home',
  Prompts: 'Prompts',
  PromptDetail: 'PromptDetail',
  PromptEdit: 'PromptEdit',
  PromptCreate: 'PromptCreate',
  Categories: 'Categories',
  CategoryDetail: 'CategoryDetail',
  NotFound: 'NotFound',
} as const

export type RouteName = (typeof RouteNames)[keyof typeof RouteNames]
