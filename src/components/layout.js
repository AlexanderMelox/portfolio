import React from 'react'
import { Global, css } from '@emotion/core'
import Helmet from 'react-helmet'

import Header from './header'

import useSiteMetadata from '../hooks/useSiteMetadata'

const globalStyles = css`
  :root {
    /* spacing */
    --space-small: 3rem;
  }

  @font-face {
    font-family: 'Dank Mono';
    src: url('../fonts/DankMono-Regular.otf');
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  * + * {
    margin-top: 1rem;
  }

  html {
    font-size: 62.5%;
  }

  body,
  html {
    margin: 0;
    background-color: #000;
    color: #fcfcfc;
    font-family: 'Dank Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

  body {
    font-size: 1.8rem;
  }

  a:link,
  a:visited {
    color: #fff;
    text-decoration: none;
  }
`

const Layout = ({ children }) => {
  const { title, author, description } = useSiteMetadata()

  return (
    <>
      <Global styles={globalStyles} />
      <Helmet>
        <html lang="en"></html>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default Layout
