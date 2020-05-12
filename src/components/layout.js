import React, { useMemo } from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import Helmet from 'react-helmet'
import { normalize } from 'polished'

import Header from './header'

import useSiteMetadata from '../hooks/useSiteMetadata'

const globalStyles = css`
  ${normalize()};

  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,700,900&display=swap');
  @font-face {
    font-family: 'Dank Mono';
    src: url('../fonts/DankMono-Regular.otf');
  }

  :root {
    /* Typography */
    --default-font-size: 1.6rem;
    --code-font-family: 'Dank Mono', monospace;
    --body-font-family: -apple-system, BlinkMacSystemFont, 'Montserrat',
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    --primary-font-family: 'Montserrat', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;

    /* Colors */
    --licorice: #131217;
    --onyx: #424145;
    --gainsboro: #d9d7e0;
    --light-blue: #dacffc;
    --just-white: rgba(255, 255, 255, 0.8);

    --page-background-color: var(--licorice);
    /* Text colors */
    --text-01: #f1f1f1;

    --text-inverted: #6d6d6d;
    --text-inverted-darker: #373737;
    --text-inverted-dark-a11y: rgba(24, 24, 24, 0.6);

    --primary-color: var(--light-blue);

    /* Theme color that changes */
    --color: #e699a6;
  }

  ::selection {
    background-color: #131217;
    color: #d9e699;
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
    color: var(--text-color-lighter);
    font-family: var(--body-font-family);
  }

  body {
    font-size: 1.8rem;
    line-height: 1.6;
    font-weight: 300;
    background: var(--page-background-color);
  }

  a {
    color: var(--text-color-lighter);
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--primary-font-family);
    font-weight: 700;
    line-height: 1.1;
  }

  ul {
    list-style: none;
  }
`

const Main = styled.main``

const Layout = ({ children, navFixed }) => {
  const { title, author, description } = useSiteMetadata()

  const favicons = useMemo(() => [
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />,
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />,
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />,
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />,
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/apple-icon-114x114.png"
    />,
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/apple-icon-120x120.png"
    />,
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/apple-icon-144x144.png"
    />,
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/apple-icon-152x152.png"
    />,
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-icon-180x180.png"
    />,
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/android-icon-192x192.png"
    />,
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />,
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/favicon-96x96.png"
    />,
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />,
  ])

  return (
    <>
      <Global styles={globalStyles} />
      <Helmet>
        <html lang="en"></html>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        {favicons}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#e699a6" />
      </Helmet>
      <Header navFixed={navFixed} />
      <Main>{children}</Main>
    </>
  )
}

export default Layout
