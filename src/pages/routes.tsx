import type { ReactNode } from 'react'

import HomePage from './HomePage'

export type RoutePath = '/'

export type AppRoute = {
  path: RoutePath
  label: string
  icon?: string
  element: ReactNode
  showInNav?: boolean
}

export const routes: AppRoute[] = [
  {
    path: '/',
    label: 'Home',
    icon: 'house',
    element: <HomePage />,
    showInNav: true,
  }
]