export const Role = {
  Admin: 'Admin',
  User: 'User',
} as const

export type Role = (typeof Role)[keyof typeof Role]

export interface User {
  id: string
  username: string
  role: Role
  roleIds: string[]
  token: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}
