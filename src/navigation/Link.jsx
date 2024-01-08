import { MOUSE_BUTTONS, NAVIGATION_EVENTS } from './events'
// import { PropTypes } from 'prop-types'

function navigate (href) {
  // Aquí le decimos que sólo cambie la URL,
  // no queremos que refresque toda la página,
  window.history.pushState({}, '', href)

  // Creamos un evento personalizado porque no hay una forma nativa
  // de escuchar el evento pushState()
  const navgiationEvent = new Event(NAVIGATION_EVENTS.PUSHSTATE)
  window.dispatchEvent(navgiationEvent)
}

// Link.propTypes = {
//   target: PropTypes.string,
//   to: PropTypes.string.isRequired,
//   resetScroll: PropTypes.bool
// }

export function Link ({ target, to, resetScroll, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === MOUSE_BUTTONS.PRIMARY // primary click
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }

    if (resetScroll) window.scrollTo(0, 0)
  }

  return (
    <a
      onClick={handleClick}
      href={to}
      target={target}
      {...props} // esta manera de poner las props INCLUYE la prop children
                // es el equivalente de hacer children={props.children}
    />
  )
}
