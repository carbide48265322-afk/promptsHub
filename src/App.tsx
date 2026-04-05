import { AppProvider } from './providers/AppProvider'
import { AppRoutes } from './routes/AppRoutes'
import { AuthInitializer } from './components/auth/AuthInitializer'

function App() {
  return (
    <AppProvider>
      <AuthInitializer />
      <AppRoutes />
    </AppProvider>
  )
}

export default App
