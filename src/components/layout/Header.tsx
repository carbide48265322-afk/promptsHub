import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { Button } from '@/components/ui/button'

export function Header() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate(ROUTES.HOME)
  }

  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">PromptsHub</h1>
        <nav className="flex items-center gap-4">
          <Link to={ROUTES.HOME} className="text-sm text-gray-600 hover:text-gray-900">
            首页
          </Link>
          <Link
            to={ROUTES.PROMPTS}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Prompts
          </Link>
          <Link
            to={ROUTES.CATEGORIES}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            分类
          </Link>

          {isAuthenticated && user ? (
            <>
              <span className="text-sm text-gray-700">欢迎, {user.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                登出
              </Button>
            </>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              登录
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
