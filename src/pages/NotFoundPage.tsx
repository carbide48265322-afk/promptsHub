import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-gray-600 mb-6">页面未找到</p>
      <Link
        to="/"
        className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
      >
        返回首页
      </Link>
    </div>
  )
}
