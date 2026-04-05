import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import type { Role as RBACRole } from '@/types/rbac'
import { useRBACStore } from '@/stores/useRBACStore'
import { RoleList } from '@/components/rbac/RoleList'
import { RoleFormDialog } from '@/components/rbac/RoleFormDialog'

export function RolesPage() {
  const { roles, permissions, loadRoles, loadPermissions, addRole, updateRole, deleteRole } = useRBACStore()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<RBACRole | null>(null)

  useEffect(() => {
    loadRoles()
    loadPermissions()
  }, [loadRoles, loadPermissions])

  const handleAdd = useCallback(() => {
    setEditingRole(null)
    setDialogOpen(true)
  }, [])

  const handleEdit = useCallback((role: RBACRole) => {
    setEditingRole(role)
    setDialogOpen(true)
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    if (confirm('确定要删除此角色吗？')) {
      try {
        await deleteRole(id)
        toast.success('角色已删除')
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('删除失败')
        }
      }
    }
  }, [deleteRole])

  const handleSave = useCallback(async (role: RBACRole) => {
    if (editingRole) {
      await updateRole(role)
      toast.success('角色已更新')
    } else {
      await addRole(role)
      toast.success('角色已创建')
    }
    setDialogOpen(false)
    setEditingRole(null)
  }, [editingRole, addRole, updateRole])

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false)
    setEditingRole(null)
  }, [])

  return (
    <div>
      <RoleList
        roles={roles}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
      <RoleFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        permissions={permissions}
        initialData={editingRole}
      />
    </div>
  )
}
