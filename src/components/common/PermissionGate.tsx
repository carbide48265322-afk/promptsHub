import type { ReactNode } from 'react'
import { usePermission } from '@/hooks/usePermission'

interface PermissionGateProps {
  code: string
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGate({ code, children, fallback }: PermissionGateProps) {
  const { hasPermission } = usePermission()

  if (!hasPermission(code)) {
    return <>{fallback ?? null}</>
  }

  return <>{children}</>
}
