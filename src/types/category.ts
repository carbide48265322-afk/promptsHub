export interface Category {
  id: string
  name: string
  description: string
  promptCount: number
  createdAt: string
  updatedAt: string
}

export type CreateCategoryInput = Pick<Category, 'name' | 'description'>
export type UpdateCategoryInput = Partial<CreateCategoryInput>
