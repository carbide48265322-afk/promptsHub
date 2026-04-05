import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import type { Role, Permission } from '@/types/rbac'
import { useAuthStore } from '@/stores/useAuthStore'
import { Role as AuthRole } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const roleSchema = z.object({
  name: z.string().min(1, '角色名称不能为空').max(50, '角色名称不能超过50个字符'),
  description: z.string().max(200, '描述不能超过200个字符').optional(),
  permissionIds: z.array(z.string()).min(1, '至少选择一个权限'),
})

type RoleFormData = z.infer<typeof roleSchema>

interface RoleFormDialogProps {
  open: boolean
  onClose: () => void
  onSave: (role: Role) => void
  permissions: Permission[]
  initialData?: Role | null
}

export function RoleFormDialog({
  open,
  onClose,
  onSave,
  permissions,
  initialData,
}: RoleFormDialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      permissionIds: initialData?.permissionIds ?? [],
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
        permissionIds: initialData?.permissionIds ?? [],
      })
    }
  }, [open, initialData, reset])

  const selectedPermissions = watch('permissionIds')

  const handlePermissionToggle = (permId: string) => {
    const current = selectedPermissions ?? []
    const updated = current.includes(permId)
      ? current.filter((id: string) => id !== permId)
      : [...current, permId]
    setValue('permissionIds', updated, { shouldValidate: true })
  }

  const onSubmit = (data: RoleFormData) => {
    const userRole = useAuthStore.getState().user?.role
    if (userRole !== AuthRole.Admin) {
      toast.error('无权限')
      return
    }

    const role: Role = {
      id: initialData?.id ?? `role-${crypto.randomUUID()}`,
      name: data.name,
      description: data.description ?? '',
      permissionIds: data.permissionIds,
    }
    onSave(role)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {initialData ? '编辑角色' : '新增角色'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Role Name */}
          <div>
            <label htmlFor="role-name" className="mb-1 block text-sm font-medium">
              角色名称 <span className="text-red-500">*</span>
            </label>
            <Input
              id="role-name"
              {...register('name')}
              placeholder="请输入角色名称"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="role-desc" className="mb-1 block text-sm font-medium">
              描述
            </label>
            <Input
              id="role-desc"
              {...register('description')}
              placeholder="请输入描述"
            />
          </div>

          {/* Permissions */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              权限 <span className="text-red-500">*</span>
            </label>
            <div className="max-h-48 space-y-2 overflow-y-auto rounded border p-3">
              {permissions.map((perm) => {
                const checked = selectedPermissions?.includes(perm.id) ?? false
                return (
                  <label
                    key={perm.id}
                    htmlFor={`perm-${perm.id}`}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={`perm-${perm.id}`}
                      checked={checked}
                      onChange={() => handlePermissionToggle(perm.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm">
                      {perm.name}
                      <span className="ml-1 text-xs text-gray-500">
                        ({perm.code})
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>
            {errors.permissionIds && (
              <p className="mt-1 text-sm text-red-500">
                {errors.permissionIds.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">
              {initialData ? '保存' : '创建'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
