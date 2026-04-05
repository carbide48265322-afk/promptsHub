import type { Permission, Role, RBACUser } from '@/types/rbac'

export const BUILTIN_ROLE_IDS: readonly string[] = ['role-admin'] as const

// Initial Mock Permissions
export const initialPermissions: Permission[] = [
  { id: 'perm-1', code: 'prompt:view', name: '查看 Prompt' },
  { id: 'perm-2', code: 'prompt:create', name: '创建 Prompt' },
  { id: 'perm-3', code: 'prompt:edit', name: '编辑 Prompt' },
  { id: 'perm-4', code: 'prompt:delete', name: '删除 Prompt' },
  { id: 'perm-5', code: 'category:manage', name: '管理分类' },
  { id: 'perm-6', code: 'rbac:manage', name: '管理权限' },
  // RBAC specific permissions for UI button guards
  { id: 'perm-7', code: 'rbac:perm:create', name: '创建权限' },
  { id: 'perm-8', code: 'rbac:perm:edit', name: '编辑权限' },
  { id: 'perm-9', code: 'rbac:perm:delete', name: '删除权限' },
  { id: 'perm-10', code: 'rbac:role:create', name: '创建角色' },
  { id: 'perm-11', code: 'rbac:role:edit', name: '编辑角色' },
  { id: 'perm-12', code: 'rbac:role:delete', name: '删除角色' },
  { id: 'perm-13', code: 'rbac:user:edit', name: '编辑用户角色' },
]

// Initial Mock Roles
export const initialRoles: Role[] = [
  {
    id: 'role-admin',
    name: 'Admin',
    description: '管理员，拥有所有权限',
    permissionIds: initialPermissions.map((p) => p.id),
  },
  {
    id: 'role-user',
    name: 'User',
    description: '普通用户，仅可查看和创建',
    permissionIds: ['perm-1', 'perm-2'],
  },
]

// Initial Mock Users
export const initialUsers: RBACUser[] = [
  { id: 'u1', username: 'admin', roleIds: ['role-admin'] },
  { id: 'u2', username: 'user', roleIds: ['role-user'] },
]

// --- LocalStorage Helpers ---

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored) as T
    }
  } catch {
    // ignore parse errors, use fallback
  }
  return fallback
}

function saveToStorage(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // ignore storage errors (e.g., quota exceeded)
  }
}

// --- In-memory state (initialized from LocalStorage) ---

let permissions: Permission[] = loadFromStorage('rbac_permissions', initialPermissions)
let roles: Role[] = loadFromStorage('rbac_roles', initialRoles)
let users: RBACUser[] = loadFromStorage('rbac_users', initialUsers)

export async function getRoles(): Promise<Role[]> {
  return roles
}

export async function getPermissions(): Promise<Permission[]> {
  return permissions
}

export async function savePermission(permission: Permission): Promise<Permission> {
  const existingIndex = permissions.findIndex((p) => p.id === permission.id)
  if (existingIndex >= 0) {
    permissions = permissions.map((p, i) => (i === existingIndex ? permission : p))
  } else {
    permissions = [...permissions, permission]
  }
  saveToStorage('rbac_permissions', permissions)
  return permission
}

export async function deletePermission(id: string): Promise<{ success: boolean; error?: string }> {
  // 删除守卫: 检查是否有角色正在引用此权限
  const referencingRoles = roles.filter((r) => r.permissionIds.includes(id))
  if (referencingRoles.length > 0) {
    return { success: false, error: '该权限正在被角色使用' }
  }
  permissions = permissions.filter((p) => p.id !== id)
  saveToStorage('rbac_permissions', permissions)
  return { success: true }
}

export async function saveRole(role: Role): Promise<Role> {
  const existingIndex = roles.findIndex((r) => r.id === role.id)
  if (existingIndex >= 0) {
    roles = roles.map((r, i) => (i === existingIndex ? role : r))
  } else {
    roles = [...roles, role]
  }
  saveToStorage('rbac_roles', roles)
  return role
}

export async function deleteRole(id: string): Promise<void> {
  if (BUILTIN_ROLE_IDS.includes(id)) {
    throw new Error('内置角色不可删除')
  }
  // 删除守卫: 检查是否有用户正在引用此角色
  const referencingUsers = users.filter((u) => u.roleIds.includes(id))
  if (referencingUsers.length > 0) {
    throw new Error('该角色正在被用户使用')
  }
  roles = roles.filter((r) => r.id !== id)
  saveToStorage('rbac_roles', roles)
}

export async function getUsers(): Promise<RBACUser[]> {
  return users
}

export async function updateUserRoles(userId: string, roleIds: string[]): Promise<RBACUser> {
  if (roleIds.length === 0) {
    throw new Error('用户必须至少拥有一个角色')
  }
  const existingIndex = users.findIndex((u) => u.id === userId)
  if (existingIndex >= 0) {
    users = users.map((u, i) => (i === existingIndex ? { ...u, roleIds } : u))
    saveToStorage('rbac_users', users)
  }
  return users.find((u) => u.id === userId)!
}
