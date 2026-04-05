import type { PaginationParams as BasePaginationParams } from './common'

// 通用 API 响应格式
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
  code?: string
}

// 错误响应格式
export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
  timestamp: string
}

// 分页响应
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// 分页参数
export type PaginationParams = BasePaginationParams

// 分页元数据
export interface PaginationMeta {
  total: number
  page: number
  pageSize: number
  totalPages: number
}

