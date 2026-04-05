import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function Sidebar() {
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
      </nav>
    </aside>
  )
}
