import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ROUTES } from '@/constants/routes'
import { Layout } from '@/components/layout/Layout'
import { ErrorFallback } from '@/components/feedback/ErrorFallback'
import { PageLoader } from '@/components/feedback/PageLoader'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { Role } from '@/types/auth'

// Lazy load pages with named exports
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const LoginPage = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })))
const PromptsPage = lazy(() => import('@/pages/PromptsPage').then(m => ({ default: m.PromptsPage })))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))
const RbacLayout = lazy(() => import('@/pages/admin/RbacLayout').then(m => ({ default: m.RbacLayout })))
const PermissionsPage = lazy(() => import('@/pages/admin/PermissionsPage').then(m => ({ default: m.PermissionsPage })))
const RolesPage = lazy(() => import('@/pages/admin/RolesPage').then(m => ({ default: m.RolesPage })))
const UserRolesPage = lazy(() => import('@/pages/admin/UserRolesPage').then(m => ({ default: m.UserRolesPage })))

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Layout><HomePage /></Layout>} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route
              path={ROUTES.PROMPTS}
              element={
                <Layout>
                  <ProtectedRoute>
                    <PromptsPage />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path={ROUTES.CATEGORIES}
              element={
                <Layout>
                  <ProtectedRoute requiredRole={Role.Admin}>
                    <CategoriesPage />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path={ROUTES.ADMIN_RBAC}
              element={
                <Layout>
                  <ProtectedRoute requiredRole={Role.Admin}>
                    <RbacLayout />
                  </ProtectedRoute>
                </Layout>
              }
            >
              <Route index element={<Navigate to="roles" replace />} />
              <Route path="permissions" element={<PermissionsPage />} />
              <Route path="roles" element={<RolesPage />} />
              <Route path="users" element={<UserRolesPage />} />
            </Route>
            <Route path={ROUTES.NOT_FOUND} element={<Layout><NotFoundPage /></Layout>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
