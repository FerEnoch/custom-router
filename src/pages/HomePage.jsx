import Link from '../navigation/Link'

export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una página de ejemplo para crear un React Router desde cero</p>
      <Link to='/es/about'>
        Is a Sobre Nosotros
      </Link>
    </>
  )
}
