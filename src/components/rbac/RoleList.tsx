import type { Role } from '@/types/rbac'
import { BUILTIN_ROLE_IDS } from '@/api/rbac'
import { Button } from '@/components/ui/button'
import { PermissionGate } from '@/components/common/PermissionGate'

interface RoleListProps {
  roles: Role[]
  onEdit: (role: Role) => void
  onDelete: (id: string) => void
  onAdd: () => void
}

export function RoleList({ roles, onEdit, onDelete, onAdd }: RoleListProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">角色列表</h2>
        <PermissionGate code="rbac:role:create">
          <Button onClick={onAdd}>新增角色</Button>
        </PermissionGate>
      </div>

      {roles.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          暂无角色，请点击"新增角色"添加
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium">角色名称</th>
                <th className="px-4 py-3 font-medium">描述</th>
                <th className="px-4 py-3 font-medium">权限数量</th>
                <th className="px-4 py-3 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{role.name}</td>
                  <td className="px-4 py-3 text-gray-600">{role.description}</td>
                  <td className="px-4 py-3">{role.permissionIds.length}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <PermissionGate code="rbac:role:edit">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(role)}
                        >
                          编辑
                        </Button>
                      </PermissionGate>
                      {!BUILTIN_ROLE_IDS.includes(role.id) && (
                        <PermissionGate code="rbac:role:delete">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(role.id)}
                          >
                            删除
                          </Button>
                        </PermissionGate>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
