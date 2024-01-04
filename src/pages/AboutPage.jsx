import Link from '../navigation/Link'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    description: 'Hola! Me llamo Fer Enoch y estoy creando un clon de React Router!',
    button: 'Volver a la página principal'
  },
  en: {
    title: 'About us',
    description: "Hi! My name is Fer Enoch and I'm creating a React Router clone!",
    button: 'Back to home page'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage ({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <div>
        <img src='https://scontent.fsfn6-1.fna.fbcdn.net/v/t39.30808-1/267943421_1095362621289275_6586457700119116795_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5740b7&_nc_ohc=u_aHOi8_0oYAX_vdToi&_nc_ht=scontent.fsfn6-1.fna&oh=00_AfBoaYkMPgoto1iif29N--S2RlP2Nrxg_rVJ1CpDTQ5a-A&oe=659A38BC' alt='Foto de Fer Enoch' />
      </div>
      <Link to='/'>
        {i18n.button}
      </Link>
    </>
  )
}
