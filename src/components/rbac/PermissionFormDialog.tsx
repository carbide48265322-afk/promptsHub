import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Permission } from '@/types/rbac'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const permissionSchema = z.object({
  code: z.string().min(1, '权限代码不能为空').max(100, '权限代码不能超过100个字符'),
  name: z.string().min(1, '权限名称不能为空').max(50, '权限名称不能超过50个字符'),
})

type PermissionFormData = z.infer<typeof permissionSchema>

interface PermissionFormDialogProps {
  open: boolean
  onClose: () => void
  onSave: (permission: Permission) => void
  initialData?: Permission | null
}

export function PermissionFormDialog({
  open,
  onClose,
  onSave,
  initialData,
}: PermissionFormDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PermissionFormData>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      code: initialData?.code ?? '',
      name: initialData?.name ?? '',
    },
  })

  useEffect(() => {
    if (open) {
      reset({
        code: initialData?.code ?? '',
        name: initialData?.name ?? '',
      })
    }
  }, [open, initialData, reset])

  const onSubmit = (data: PermissionFormData) => {
    const permission: Permission = {
      id: initialData?.id ?? crypto.randomUUID(),
      code: data.code,
      name: data.name,
    }
    onSave(permission)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {initialData ? '编辑权限' : '新增权限'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Code */}
          <div>
            <label htmlFor="perm-code" className="mb-1 block text-sm font-medium">
              权限代码 <span className="text-red-500">*</span>
            </label>
            <Input
              id="perm-code"
              {...register('code')}
              placeholder="例如: prompt:view"
              className={errors.code ? 'border-red-500' : ''}
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="perm-name" className="mb-1 block text-sm font-medium">
              权限名称 <span className="text-red-500">*</span>
            </label>
            <Input
              id="perm-name"
              {...register('name')}
              placeholder="例如: 查看 Prompt"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
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
