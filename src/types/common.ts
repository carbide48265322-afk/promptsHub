/**
 * 通用类型定义
 */

// 基础实体接口（所有数据模型的基础）
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// 创建者审计信息
export interface AuditInfo {
  createdBy?: string
  updatedBy?: string
}

// 软删除实体
export interface SoftDelete {
  isDeleted: boolean
  deletedAt?: string
}

// 通用分页参数
export interface PaginationParams {
  page: number
  pageSize: number
}

// 排序方向
export type SortOrder = 'asc' | 'desc'

// 通用排序参数
export interface SortParams {
  sortBy?: string
  sortOrder?: SortOrder
}

// 分页 + 排序组合参数
export interface PageableParams extends PaginationParams, SortParams {}

// 树形节点接口
export interface TreeNode<T = unknown> {
  id: string
  children?: T[]
}
