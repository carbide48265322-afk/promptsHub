import type { BaseEntity, TreeNode } from './common'

export interface Category extends BaseEntity, TreeNode<Category> {
  name: string
  description: string
  parentId: string | null
  promptCount: number
  sortOrder: number
  icon?: string
}

export type CreateCategoryInput = Pick<Category, 'name' | 'description'> &
  Partial<Pick<Category, 'parentId' | 'sortOrder' | 'icon'>>

export type UpdateCategoryInput = Partial<CreateCategoryInput>

// 树形分类结构
export interface CategoryTree {
  categories: Category[]
  rootIds: string[]  // 根节点 ID 列表
}
