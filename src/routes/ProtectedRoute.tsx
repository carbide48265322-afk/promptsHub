import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Role } from '@/types/auth'
import { ROUTES } from '@/constants/routes'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: Role
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const userRole = useAuthStore((state) => state.user?.role)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-red-600">403 无权访问</h2>
        <p className="text-gray-600">您需要 {requiredRole} 权限才能访问此页面。</p>
      </div>
    )
  }

  return <>{children}</>
}
