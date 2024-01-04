import { PropTypes } from 'prop-types'
import { useEffect } from 'react'

// console.log('se está importando SearchPage')

SearchPage.propTypes = {
  routeParams: PropTypes.shape({
    query: PropTypes.string
  })
}

export default function SearchPage ({ routeParams }) {
  useEffect(() => {
    document.title = `Búsqueda ${routeParams.query}`
  }, [routeParams])

  return (
    <>
      <h1>Has buscado:</h1>
      <h4>{routeParams.query}</h4>
    </>
  )
}
