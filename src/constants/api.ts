export const API_ENDPOINTS = {
  prompts: '/prompts',
  prompt: (id: string) => `/prompts/${id}`,
  categories: '/categories',
  category: (id: string) => `/categories/${id}`,
} as const

export const DEFAULT_PAGE_SIZE = 20
