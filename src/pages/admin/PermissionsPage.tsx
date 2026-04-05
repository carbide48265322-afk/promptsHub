import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import type { Permission } from '@/types/rbac'
import { useRBACStore } from '@/stores/useRBACStore'
import { Button } from '@/components/ui/button'
import { PermissionFormDialog } from '@/components/rbac/PermissionFormDialog'
import { PermissionGate } from '@/components/common/PermissionGate'

export function PermissionsPage() {
  const { permissions, addPermission, updatePermission, deletePermission } = useRBACStore()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)

  useEffect(() => {
    // Permissions are already loaded from localStorage on store init
  }, [])

  const handleAdd = useCallback(() => {
    setEditingPermission(null)
    setDialogOpen(true)
  }, [])

  const handleEdit = useCallback((permission: Permission) => {
    setEditingPermission(permission)
    setDialogOpen(true)
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    if (confirm('确定要删除此权限吗？')) {
      const result = await deletePermission(id)
      if (result.success) {
        toast.success('权限已删除')
      } else {
        toast.error(result.error ?? '删除失败')
      }
    }
  }, [deletePermission])

  const handleSave = useCallback(async (permission: Permission) => {
    if (editingPermission) {
      await updatePermission(permission)
      toast.success('权限已更新')
    } else {
      await addPermission(permission)
      toast.success('权限已创建')
    }
    setDialogOpen(false)
    setEditingPermission(null)
  }, [editingPermission, addPermission, updatePermission])

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false)
    setEditingPermission(null)
  }, [])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">权限列表</h2>
        <PermissionGate code="rbac:perm:create">
          <Button onClick={handleAdd}>新增权限</Button>
        </PermissionGate>
      </div>

      {permissions.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          暂无权限，请点击"新增权限"添加
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium">权限代码</th>
                <th className="px-4 py-3 font-medium">权限名称</th>
                <th className="px-4 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr key={permission.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{permission.code}</td>
                  <td className="px-4 py-3">{permission.name}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <PermissionGate code="rbac:perm:edit">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(permission)}
                        >
                          编辑
                        </Button>
                      </PermissionGate>
                      <PermissionGate code="rbac:perm:delete">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(permission.id)}
                        >
                          删除
                        </Button>
                      </PermissionGate>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PermissionFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        initialData={editingPermission}
      />
    </div>
  )
}
