import { useEffect, useState, Children } from 'react'
import { NAVIGATION_EVENTS } from './events'
import Page404 from '../pages/Page404'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils'

export default function Router ({
  children,
  routes = [],
  defaultComponent: DefaultComponent = Page404
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    // Es necesario guardar referencia del callback en una constante, así
    // tanto para el addEventListener comopara el removeEventListener,
    // nos aseguramos de que es la misma función a la que referimos
    const onLocationChange = () => setCurrentPath(getCurrentPath())
    window.addEventListener(NAVIGATION_EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener(NAVIGATION_EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(NAVIGATION_EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  // add routes from children <Route /> components
  const routerFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routerFromChildren).filter(Boolean)

  let routeParams
  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    const matcherURL = match(path, { decode: decodeURIComponent })
    const matched = matcherURL(currentPath)
    if (!matched) return false

    // parámetros dinámicos extraidos con path-to-regexp
    // por ejemplo: para la ruta /search/:query,
    // matched.params.query === 'myQuery'
    routeParams = matched.params
    return true
  })?.Component

  return (
    Page
      ? <Page routeParams={routeParams} />
      : <DefaultComponent routeParams={routeParams} />
  )
}
