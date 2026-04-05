import { create } from 'zustand'
import type { User } from '@/types/auth'
import { Role } from '@/types/auth'

// NOTE: 使用 localStorage 存储认证信息仅适用于 Mock/开发环境。生产环境应使用 HttpOnly Cookie。
const AUTH_STORAGE_KEY = 'promptsHub_auth'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => void
  logout: () => void
  checkAuth: () => void
}

// MOCK ONLY - 不应用于生产环境
function generateMockToken(username: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ sub: username, iat: Date.now() }))
  const signature = btoa(`mock-signature-${username}-${Date.now()}`)
  return `${header}.${payload}.${signature}`
}

function loadFromStorage(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as User
    }
  } catch {
    // Ignore parse errors
  }
  return null
}

function saveToStorage(user: User | null): void {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  checkAuth: () => {
    const storedUser = loadFromStorage()
    if (storedUser) {
      set({ user: storedUser, isAuthenticated: true })
    }
  },

  login: (username: string, _password: string) => {
    void _password // Mark as used to satisfy linter
    const role: Role = username.toLowerCase().includes('admin') ? Role.Admin : Role.User
    const roleIds: string[] = role === Role.Admin ? ['role-admin'] : ['role-user']
    const user: User = {
      id: crypto.randomUUID(),
      username,
      role,
      roleIds,
      token: generateMockToken(username),
    }
    saveToStorage(user)
    set({ user, isAuthenticated: true })
  },

  logout: () => {
    saveToStorage(null)
    set({ user: null, isAuthenticated: false })
  },
}))
