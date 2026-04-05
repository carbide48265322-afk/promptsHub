// 通用 API 响应格式
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 分页响应
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 分页参数
export interface PaginationParams {
  page?: number
  pageSize?: number
}
