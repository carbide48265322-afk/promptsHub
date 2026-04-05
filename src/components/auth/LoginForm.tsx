import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(6, '密码至少6位'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  function onSubmit(data: LoginFormValues) {
    login(data.username.trim(), data.password)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
          用户名
        </label>
        <Input
          id="username"
          type="text"
          placeholder="请输入用户名"
          {...register('username')}
          autoComplete="username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
          密码
        </label>
        <Input
          id="password"
          type="password"
          placeholder="请输入密码"
          {...register('password')}
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        登录
      </Button>
    </form>
  )
}
