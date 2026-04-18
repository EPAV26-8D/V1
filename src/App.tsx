import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import ContatoPage from './pages/ContatoPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import SobrePage from './pages/SobrePage'

type RoutePath = '/' | '/sobre' | '/contato'

const routeEntries: Record<RoutePath, ReactNode> = {
  '/': <HomePage />,
  '/sobre': <SobrePage />,
  '/contato': <ContatoPage />,
}

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
    return routeEntries[currentPath as RoutePath] ?? <NotFoundPage />
  }, [currentPath])

  return (
    <>
      <nav>
        <a href="/" onClick={(event) => handleLinkClick(event, '/')}>
          Home
        </a>{' '}
        |{' '}
        <a href="/sobre" onClick={(event) => handleLinkClick(event, '/sobre')}>
          Sobre
        </a>{' '}
        |{' '}
        <a href="/contato" onClick={(event) => handleLinkClick(event, '/contato')}>
          Contato
        </a>
      </nav>

      <main>{pageContent}</main>
    </>
  )
}
