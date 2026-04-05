import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import type { RBACUser } from '@/types/rbac'
import { useRBACStore } from '@/stores/useRBACStore'
import { Button } from '@/components/ui/button'
import { UserRoleDialog } from '@/components/rbac/UserRoleDialog'
import { PermissionGate } from '@/components/common/PermissionGate'

export function UserRolesPage() {
  const { users, roles, loadUsers, loadRoles, updateUserRoles } = useRBACStore()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<RBACUser | null>(null)

  useEffect(() => {
    loadUsers()
    loadRoles()
  }, [loadUsers, loadRoles])

  const handleEdit = useCallback((user: RBACUser) => {
    setEditingUser(user)
    setDialogOpen(true)
  }, [])

  const handleSave = useCallback(async (userId: string, roleIds: string[]) => {
    await updateUserRoles(userId, roleIds)
    toast.success('用户角色已更新')
    setDialogOpen(false)
    setEditingUser(null)
  }, [updateUserRoles])

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false)
    setEditingUser(null)
  }, [])

  const roleMap = new Map(roles.map((r) => [r.id, r.name]))

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">用户列表</h2>
      </div>

      {users.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          暂无用户数据
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium">用户名</th>
                <th className="px-4 py-3 font-medium">当前角色</th>
                <th className="px-4 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{user.username}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {user.roleIds.map((roleId) => (
                        <span
                          key={roleId}
                          className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                        >
                          {roleMap.get(roleId) ?? roleId}
                        </span>
                      ))}
                      {user.roleIds.length === 0 && (
                        <span className="text-gray-400">无角色</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <PermissionGate code="rbac:user:edit">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        编辑角色
                      </Button>
                    </PermissionGate>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <UserRoleDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        user={editingUser}
        roles={roles}
      />
    </div>
  )
}
