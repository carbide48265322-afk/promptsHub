import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { PromptsPage } from '@/pages/PromptsPage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PROMPTS} element={<PromptsPage />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
