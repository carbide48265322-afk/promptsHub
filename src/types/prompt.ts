import type { BaseEntity, SortOrder } from './common'

// Prompt 状态常量
export const PromptStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

export type PromptStatus = (typeof PromptStatus)[keyof typeof PromptStatus]

// Prompt 可见性常量
export const PromptVisibility = {
  PRIVATE: 'private',
  PUBLIC: 'public',
  SHARED: 'shared',
} as const

export type PromptVisibility = (typeof PromptVisibility)[keyof typeof PromptVisibility]

export interface Prompt extends BaseEntity {
  title: string
  content: string
  description: string
  status: PromptStatus
  visibility: PromptVisibility
  categoryId: string | null
  tags: string[]
  usageCount: number
  isFavorite: boolean
}

export type CreatePromptInput = Pick<Prompt, 'title' | 'content'> &
  Partial<Pick<Prompt, 'description' | 'categoryId' | 'tags' | 'status' | 'visibility'>>

export type UpdatePromptInput = Partial<CreatePromptInput>

// Prompt 筛选条件
export interface PromptFilters {
  search?: string
  categoryId?: string | null
  tags?: string[]
  status?: PromptStatus | null
  visibility?: PromptVisibility | null
  isFavorite?: boolean
}

// Prompt 排序字段
export type PromptSortField = 'title' | 'createdAt' | 'updatedAt' | 'usageCount'

export interface PromptSortParams {
  sortBy?: PromptSortField
  sortOrder?: SortOrder
}
