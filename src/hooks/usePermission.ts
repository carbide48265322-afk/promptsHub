import { useMemo, useCallback } from 'react'
import { useRBACStore } from '@/stores/useRBACStore'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Role, Permission } from '@/types/rbac'

/**
 * Pure function to compute permission codes from roles and permissions.
 * This makes it testable and ensures reactivity when used with useMemo.
 */
function getUserPermissionCodes(
  userRoleIds: string[] | undefined,
  roles: Role[],
  permissions: Permission[],
): string[] {
  if (!userRoleIds || userRoleIds.length === 0) return []

  const permissionIds = new Set<string>()
  for (const role of roles) {
    if (userRoleIds.includes(role.id)) {
      for (const id of role.permissionIds) {
        permissionIds.add(id)
      }
    }
  }
  return permissions
    .filter((p) => permissionIds.has(p.id))
    .map((p) => p.code)
}

export function usePermission() {
  const user = useAuthStore((state) => state.user)
  const roles = useRBACStore((state) => state.roles)
  const permissions = useRBACStore((state) => state.permissions)

  const permissionCodes = useMemo(
    () => getUserPermissionCodes(user?.roleIds, roles, permissions),
    [user?.roleIds, roles, permissions],
  )

  const hasPermission = useCallback(
    (code: string) => permissionCodes.includes(code),
    [permissionCodes],
  )

  return { hasPermission }
}
