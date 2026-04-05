import { useEffect } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'

export function AuthInitializer() {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return null
}
