import { Outlet, Link, useLocation } from 'react-router-dom'

const TABS = [
  { label: '权限管理', path: 'permissions' },
  { label: '角色管理', path: 'roles' },
  { label: '用户管理', path: 'users' },
]

export function RbacLayout() {
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">权限配置</h1>

      {/* Tab Navigation */}
      <nav className="mb-6 flex gap-1 border-b">
        {TABS.map((tab) => {
          const isActive = currentPath === tab.path
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`rounded-t px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-b-2 border-primary bg-white text-primary'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>

      {/* Content */}
      <Outlet />
    </div>
  )
}
