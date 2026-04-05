import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">PromptsHub</h1>
        <nav className="flex gap-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            首页
          </Link>
          <Link
            to="/prompts"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Prompts
          </Link>
          <Link
            to="/categories"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            分类
          </Link>
        </nav>
      </div>
    </header>
  )
}
