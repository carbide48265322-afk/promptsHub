export function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-gray-50 p-4">
      <nav className="space-y-2">
        <a
          href="/"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          🏠 首页
        </a>
        <a
          href="/prompts"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          📝 Prompts
        </a>
        <a
          href="/categories"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
        >
          📂 分类
        </a>
      </nav>
    </aside>
  )
}
