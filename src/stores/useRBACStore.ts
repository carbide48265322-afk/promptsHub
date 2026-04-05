import { create } from 'zustand'
import type { Permission, Role, RBACUser } from '@/types/rbac'
import {
  getRoles,
  getPermissions,
  saveRole,
  deleteRole,
  savePermission,
  deletePermission,
  getUsers,
  updateUserRoles,
  initialRoles,
  initialPermissions,
  initialUsers,
} from '@/api/rbac'

const RBAC_STORAGE_KEY = 'rbac_data'

interface RBACState {
  roles: Role[]
  permissions: Permission[]
  users: RBACUser[]
  loading: boolean

  // Role Actions
  loadRoles: () => Promise<void>
  loadPermissions: () => Promise<void>
  loadUsers: () => Promise<void>
  addRole: (role: Role) => Promise<void>
  updateRole: (role: Role) => Promise<void>
  deleteRole: (id: string) => Promise<void>

  // Permission Actions
  addPermission: (permission: Permission) => Promise<void>
  updatePermission: (permission: Permission) => Promise<void>
  deletePermission: (id: string) => Promise<{ success: boolean; error?: string }>

  // User Actions
  updateUserRoles: (userId: string, roleIds: string[]) => Promise<void>

  // Utility
  resetToDefaults: () => void

  // Selector
  getUserPermissions: (roleIds: string[]) => string[]
}

function loadFromStorage(): { roles: Role[]; permissions: Permission[]; users: RBACUser[] } | null {
  try {
    const stored = localStorage.getItem(RBAC_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as { roles: Role[]; permissions: Permission[]; users: RBACUser[] }
    }
  } catch {
    // Ignore parse errors
  }
  return null
}

function saveToStorage(roles: Role[], permissions: Permission[], users: RBACUser[]): void {
  localStorage.setItem(RBAC_STORAGE_KEY, JSON.stringify({ roles, permissions, users }))
}

export const useRBACStore = create<RBACState>((set, get) => {
  const stored = loadFromStorage()

  return {
    roles: stored?.roles ?? initialRoles,
    permissions: stored?.permissions ?? initialPermissions,
    users: stored?.users ?? initialUsers,
    loading: false,

    loadRoles: async () => {
      set({ loading: true })
      try {
        const roles = await getRoles()
        set({ roles })
        const state = get()
        saveToStorage(roles, state.permissions, state.users)
      } finally {
        set({ loading: false })
      }
    },

    loadPermissions: async () => {
      const permissions = await getPermissions()
      set({ permissions })
      const state = get()
      saveToStorage(state.roles, permissions, state.users)
    },

    loadUsers: async () => {
      const users = await getUsers()
      set({ users })
      const state = get()
      saveToStorage(state.roles, state.permissions, users)
    },

    addRole: async (role: Role) => {
      await saveRole(role)
      const roles = [...get().roles, role]
      set({ roles })
      const state = get()
      saveToStorage(roles, state.permissions, state.users)
    },

    updateRole: async (role: Role) => {
      await saveRole(role)
      const roles = get().roles.map((r) => (r.id === role.id ? role : r))
      set({ roles })
      const state = get()
      saveToStorage(roles, state.permissions, state.users)
    },

    deleteRole: async (id: string) => {
      await deleteRole(id)
      const roles = get().roles.filter((r) => r.id !== id)
      set({ roles })
      const state = get()
      saveToStorage(roles, state.permissions, state.users)
    },

    addPermission: async (permission: Permission) => {
      await savePermission(permission)
      const permissions = [...get().permissions, permission]
      set({ permissions })
      const state = get()
      saveToStorage(state.roles, permissions, state.users)
    },

    updatePermission: async (permission: Permission) => {
      await savePermission(permission)
      const permissions = get().permissions.map((p) =>
        p.id === permission.id ? permission : p,
      )
      set({ permissions })
      const state = get()
      saveToStorage(state.roles, permissions, state.users)
    },

    deletePermission: async (id: string) => {
      const result = await deletePermission(id)
      if (result.success) {
        const permissions = get().permissions.filter((p) => p.id !== id)
        set({ permissions })
        const state = get()
        saveToStorage(state.roles, permissions, state.users)
      }
      return result
    },

    updateUserRoles: async (userId: string, roleIds: string[]) => {
      await updateUserRoles(userId, roleIds)
      const users = get().users.map((u) =>
        u.id === userId ? { ...u, roleIds } : u,
      )
      set({ users })
      const state = get()
      saveToStorage(state.roles, state.permissions, users)
    },

    resetToDefaults: () => {
      set({ roles: initialRoles, permissions: initialPermissions, users: initialUsers })
      saveToStorage(initialRoles, initialPermissions, initialUsers)
    },

    getUserPermissions: (roleIds: string[]): string[] => {
      const { roles, permissions } = get()
      const permissionIds = new Set<string>()
      for (const role of roles) {
        if (roleIds.includes(role.id)) {
          for (const id of role.permissionIds) {
            permissionIds.add(id)
          }
        }
      }
      return permissions
        .filter((p) => permissionIds.has(p.id))
        .map((p) => p.code)
    },
  }
})
