import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import NotFoundPage from './pages/NotFoundPage'
import { routes, type RoutePath } from './pages/routes'
import './App.css'

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  function navigate(to: RoutePath) {
    if (window.location.pathname === to) {
      return
    }

    window.history.pushState({}, '', to)
    setCurrentPath(to)
  }

  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>, to: RoutePath) {
    event.preventDefault()
    navigate(to)
  }

  const pageContent = useMemo(() => {
    const currentRoute = routes.find((route) => route.path === currentPath)
    return currentRoute?.element ?? <NotFoundPage />
  }, [currentPath])

  return (
    <>
      <nav className="navbar">
        {routes
          .filter((route) => route.showInNav)
          .map((route) => (
            <a
              key={route.path}
              href={route.path}
              onClick={(event) => handleLinkClick(event, route.path)}
            >
              {route.icon && <i className={`bi bi-${route.icon}`}></i>} {route.label}
            </a>
          ))}
      </nav>

      <main>{pageContent}</main>
    </>
  )
}