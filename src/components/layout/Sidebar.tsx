import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { Role } from '@/types/auth'

export function Sidebar() {
  const userRole = useAuthStore((state) => state.user?.role)
  const isAdmin = userRole === Role.Admin

  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
      <nav className="space-y-2">
        <Link
          to={ROUTES.HOME}
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          🏠 首页
        </Link>
        <Link
          to={ROUTES.PROMPTS}
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          📝 Prompts
        </Link>
        <Link
          to={ROUTES.CATEGORIES}
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          📂 分类
        </Link>
        {isAdmin && (
          <Link
            to={ROUTES.ADMIN_RBAC}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
          >
            🔒 权限配置
          </Link>
        )}
      </nav>
    </aside>
  )
}
