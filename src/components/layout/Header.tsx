export function Header() {
  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">PromptsHub</h1>
        <nav className="flex gap-4">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            首页
          </a>
          <a
            href="/prompts"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Prompts
          </a>
          <a
            href="/categories"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            分类
          </a>
        </nav>
      </div>
    </header>
  )
}
