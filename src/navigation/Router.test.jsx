import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Router from './Router'
import Route from './Route'

import { getCurrentPath } from './utils.js'
import Link from './Link'

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn()
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('Should work', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('Should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => (<h1>404</h1>)} />)
    expect(screen.getByText(/404/)).toBeTruthy()
    // console.log(screen.debug())
  })

  it('Should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')

    const routes = [
      {
        path: '/',
        Component: () => (<h1>Home</h1>)
      },
      {
        path: '/about',
        Component: () => (<h1>About</h1>)
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText(/about/i)).toBeTruthy()
    // console.log(screen.debug())
  })

  it('Should navigate using Links', async () => {
    getCurrentPath.mockReturnValue('/')

    render(
      <Router>
        <Route
          path='/' Component={() =>
            (
              <>
                <h1>Home</h1>
                <Link to='/about'>Go To About</Link>
              </>
            )}
        />
        <Route path='/about' Component={<h1>About</h1>} />
      </Router>
    )

    // click on the Link
    const button = screen.getByText(/about/i)
    fireEvent.click(button)

    // Chech if the route is rendered
    const aboutTitle = await screen.getByText(/about/i)
    expect(aboutTitle).toBeTruthy()
  })
})
