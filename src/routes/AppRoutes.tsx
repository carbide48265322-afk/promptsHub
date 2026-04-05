import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ROUTES } from '@/constants/routes'
import { Layout } from '@/components/layout/Layout'
import { ErrorFallback } from '@/components/feedback/ErrorFallback'
import { PageLoader } from '@/components/feedback/PageLoader'

// Lazy load pages with named exports
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const PromptsPage = lazy(() => import('@/pages/PromptsPage').then(m => ({ default: m.PromptsPage })))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.PROMPTS} element={<PromptsPage />} />
              <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
