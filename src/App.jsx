// import { HomePage } from './pages/HomePage'
// import { AboutPage } from './pages/AboutPage' // import estático
import Page404 from './pages/Page404'
import SearchPage from './pages/SearchPage'
import { Suspense, lazy } from 'react'
import { Router, Route } from './navigation'

const LazyAboutPage = lazy(() => import('./pages/AboutPage.jsx')) // import dinámico
const LazyHomePage = lazy(() => import('./pages/HomePage.jsx'))

// Esto puede hacerse también con el componente router
// pero lo dejamos así para ver que funciona también
// de esta manera
const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

export default function App () {
  return (
    <main>
      <Suspense fallback={<div>Loading</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}
