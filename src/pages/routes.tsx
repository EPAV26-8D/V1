import type { ReactNode } from 'react'

import HomePage from './HomePage'

export type RoutePath = '/'

export type AppRoute = {
  path: RoutePath
  element: ReactNode
}

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <HomePage />,
  },
]
