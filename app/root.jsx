import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from 'remix'

import globalStylesUrl from '~/styles/global.css'
import FindYourNextBookLogo from '../public/FYNB-logo.png'

// https://remix.run/api/app#links
export const links = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl }
  ]
}

export const meta = () => {
  return {
    title: `Find your next book under 200/300/400/500 pages`,
    description: 'Find the next book by specifying genre, page count, book length and rating'
  }
}

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App () {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary ({ error }) {
  console.error(error)
  return (
    <Document title='Error!'>
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  )
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary () {
  const caught = useCatch()

  let message
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  )
}

function Document ({ children, title }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <Meta />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta name="google-site-verification" content="wAlOfIJ4rGkfxrynpxgX0fCgmobyZghnSIct-5ILGSo" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

function Layout ({ children }) {
  return (
    <div className='remix-app'>
      <header className='remix-app__header'>
        <div className='container remix-app__header-content'>
          <Link to='/' title='Find Your Next Book' className='remix-app__header-home-link'>
            <img src={FindYourNextBookLogo} alt='find-your-next-book-logo' height='35' />
          </Link>
          <nav aria-label='Main navigation' className='remix-app__header-nav'>
            <ul>
              <li>
                <Link to='/books'>Find Books</Link>
              </li>
              <li>
                <a href='/about'>About</a>
              </li>
              <li>
                <a href='https://github.com/paulmurphy105/Book-Finder-UI'>GitHub</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className='remix-app__main'>
        <div className='container remix-app__main-content'>{children}</div>
      </div>
      <footer className='remix-app__footer'>
        <div className='container remix-app__footer-content'>
          <p>Created by <a href='https://www.linkedin.com/in/paul-murphy-47237179/'>Paul Murphy</a></p>
        </div>
      </footer>
    </div>
  )
}
