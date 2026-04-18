import { useMemo } from 'react'
import NotFoundPage from './pages/NotFoundPage'
import { routes } from './pages/routes'
import './App.css'

export default function App() {
  const currentPath = window.location.pathname

  const pageContent = useMemo(() => {
    const currentRoute = routes.find((route) => route.path === currentPath)
    return currentRoute?.element ?? <NotFoundPage />
  }, [currentPath])

  return <main>{pageContent}</main>
}
