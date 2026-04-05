import { Link } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
      <nav className="space-y-2">
        <Link
          to="/"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          🏠 首页
        </Link>
        <Link
          to="/prompts"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          📝 Prompts
        </Link>
        <Link
          to="/categories"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          📂 分类
        </Link>
      </nav>
    </aside>
  )
}
