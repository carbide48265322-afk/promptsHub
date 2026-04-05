import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { RBACUser, Role } from '@/types/rbac'
import { Button } from '@/components/ui/button'

const userRoleSchema = z.object({
  roleIds: z.array(z.string()).min(1, '至少选择一个角色'),
})

type UserRoleFormData = z.infer<typeof userRoleSchema>

interface UserRoleDialogProps {
  open: boolean
  onClose: () => void
  onSave: (userId: string, roleIds: string[]) => void
  user: RBACUser | null
  roles: Role[]
}

export function UserRoleDialog({
  open,
  onClose,
  onSave,
  user,
  roles,
}: UserRoleDialogProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserRoleFormData>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      roleIds: user?.roleIds ?? [],
    },
  })

  useEffect(() => {
    if (open && user) {
      reset({
        roleIds: user.roleIds,
      })
    }
  }, [open, user, reset])

  const selectedRoleIds = watch('roleIds') ?? []

  const handleRoleToggle = (roleId: string) => {
    const updated = selectedRoleIds.includes(roleId)
      ? selectedRoleIds.filter((id: string) => id !== roleId)
      : [...selectedRoleIds, roleId]
    setValue('roleIds', updated, { shouldValidate: true })
  }

  const onSubmit = (data: UserRoleFormData) => {
    if (user) {
      onSave(user.id, data.roleIds)
    }
  }

  if (!open || !user) return null

  const roleMap = new Map(roles.map((r) => [r.id, r.name]))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">编辑用户角色</h2>

        <p className="mb-4 text-sm text-gray-600">
          用户：<span className="font-medium">{user.username}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Roles */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              角色 <span className="text-red-500">*</span>
            </label>
            <div className="max-h-48 space-y-2 overflow-y-auto rounded border p-3">
              {roles.map((role) => {
                const checked = selectedRoleIds.includes(role.id)
                return (
                  <label
                    key={role.id}
                    htmlFor={`role-${role.id}`}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={`role-${role.id}`}
                      checked={checked}
                      onChange={() => handleRoleToggle(role.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm">
                      {role.name}
                      {role.description && (
                        <span className="ml-1 text-xs text-gray-500">
                          ({role.description})
                        </span>
                      )}
                    </span>
                  </label>
                )
              })}
            </div>
            {errors.roleIds && (
              <p className="mt-1 text-sm text-red-500">
                {errors.roleIds.message}
              </p>
            )}
          </div>

          {/* Current roles display */}
          <div>
            <p className="text-sm text-gray-500">
              当前角色:{' '}
              {selectedRoleIds.length > 0
                ? selectedRoleIds.map((id: string) => roleMap.get(id) ?? id).join(', ')
                : '无'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">
              保存
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
