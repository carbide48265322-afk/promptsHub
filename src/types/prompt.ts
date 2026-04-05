export interface Prompt {
  id: string
  title: string
  content: string
  description: string
  categoryId: string | null
  tags: string[]
  isPublic: boolean
  usageCount: number
  createdAt: string
  updatedAt: string
}

export type CreatePromptInput = Pick<Prompt, 'title' | 'content'> &
  Partial<Pick<Prompt, 'description' | 'categoryId' | 'tags' | 'isPublic'>>

export type UpdatePromptInput = Partial<CreatePromptInput>

export interface PromptFilters {
  search?: string
  categoryId?: string
  tags?: string[]
  isPublic?: boolean
  sortBy?: 'createdAt' | 'updatedAt' | 'usageCount'
  sortOrder?: 'asc' | 'desc'
}
