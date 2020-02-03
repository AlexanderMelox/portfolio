import React from 'react'
import { Global, css } from '@emotion/core'
import Helmet from 'react-helmet'

import Header from './header'

import useSiteMetadata from '../hooks/useSiteMetadata'

const globalStyles = css`
  :root {
    /* Typography */
    --body-font: 'Dank Mono', 'Courier Neue', monospace;
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

  html {
    font-size: 62.5%;
  }

  body,
  html {
    margin: 0;
    background-color: #000;
    color: #fcfcfc;
    font-family: 'Dank Mono';
  }

  body {
    font-size: 1.8rem;
    line-height: 1.6;
  }

  a:link,
  a:visited {
    color: #fff;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--heading-font);
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
